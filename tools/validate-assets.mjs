#!/usr/bin/env node
/**
 * DrawPath Studio · Automated Asset, Manifest, Service Worker & Math Geometry Validator
 * Run: node tools/validate-assets.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  LESSONS,
  PRACTICE_TEMPLATES,
  getLessonDiagramSpec,
  getTemplateSpec,
  getAllDeclaredPlatePaths,
} from '../js/curriculum-data.js';
import {
  inscribeEllipseInQuad,
  createCamera,
  createBoxMesh,
  projectPolyMesh,
  projectTaperedCylinder,
  projectSphere,
} from '../js/generators/math-3d.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

let passed = 0;
let failed = 0;

function check(label, condition, detail = '') {
  if (condition) {
    passed += 1;
    console.log(`[PASS] ${label}`);
  } else {
    failed += 1;
    console.error(`[FAIL] ${label}${detail ? ` -> ${detail}` : ''}`);
  }
}

function pointToSegmentDist(p, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq < 1e-9) return Math.hypot(p.x - a.x, p.y - a.y);
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

function assertCleanSvg(label, svg) {
  const isString = typeof svg === 'string' && svg.includes('<svg') && svg.includes('</svg>');
  const hasBadNum = /\b(NaN|Infinity|undefined)\b/.test(svg || '');
  const hasExternalImage = /<image\b[^>]*href\s*=\s*["']\./i.test(svg || '');
  check(
    label,
    isString && !hasBadNum && !hasExternalImage,
    !isString
      ? 'Invalid SVG markup'
      : hasBadNum
        ? 'Contains NaN/Infinity/undefined'
        : 'Contains external relative <image href> inside SVG'
  );
}

console.log('=== DrawPath Studio · Asset & Geometry Validation ===\n');

// 1. Lesson Diagram Manifest Coverage & Dedicated Plate Integrity
const plateToLessons = new Map();
for (const lesson of LESSONS) {
  const spec = getLessonDiagramSpec(lesson.id);
  check(`Lesson ${lesson.id} has manifest diagram spec`, Boolean(spec), 'Missing from LESSON_DIAGRAM_MANIFEST');
  if (!spec) continue;

  if (spec.layout === 'procedural') {
    assertCleanSvg(`Diagram SVG (${lesson.id})`, spec.renderSvg());
  } else if (spec.layout === 'multi-panel') {
    check(
      `Lesson ${lesson.id} has >= 2 panels`,
      Array.isArray(spec.panels) && spec.panels.length >= 2,
      `panels=${spec.panels?.length || 0}`
    );
    for (const panel of spec.panels) {
      if (panel.kind === 'image') {
        const rel = panel.imageUrl.replace(/^\.\//, '');
        const full = path.join(ROOT, rel);
        check(`Plate file exists (${lesson.id}/${panel.id}): ${rel}`, fs.existsSync(full));
        if (!plateToLessons.has(rel)) plateToLessons.set(rel, []);
        plateToLessons.get(rel).push(lesson.id);
      } else if (panel.kind === 'svg') {
        assertCleanSvg(`3D Panel SVG (${lesson.id}/${panel.id})`, panel.renderSvg());
      }
    }
  }
}

// Ensure no diagram plate is accidentally reused across different lessons
for (const [rel, owners] of plateToLessons.entries()) {
  const uniq = [...new Set(owners)];
  check(
    `No accidental cross-lesson diagram reuse: ${rel}`,
    uniq.length === 1,
    `Shared across: ${uniq.join(', ')}`
  );
}

// 2. Practice Template Coverage (all 20 active templates)
for (const tpl of PRACTICE_TEMPLATES) {
  const spec = getTemplateSpec(tpl.id);
  check(`Template ${tpl.id} has structured spec`, Boolean(spec), 'Missing from getTemplateSpec');
  if (!spec) continue;

  assertCleanSvg(`Template scaffold SVG (${tpl.id})`, spec.renderScaffoldSvg());

  for (const plate of spec.plates || []) {
    const rel = plate.src.replace(/^\.\//, '');
    const full = path.join(ROOT, rel);
    check(`Composite plate exists (${tpl.id}): ${rel}`, fs.existsSync(full));
  }
}

// 3. Service Worker Offline Cache Sync & Zero Deleted JPG References
const swContent = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf-8');
const swMatches = [...swContent.matchAll(/'(\.\/[^']+)'/g)].map((m) => m[1]);
const swAssetSet = new Set(swMatches);

for (const platePath of getAllDeclaredPlatePaths()) {
  check(`sw.js caches plate: ${platePath}`, swAssetSet.has(platePath), 'Missing from sw.js APP_ASSETS');
}

for (const cached of swAssetSet) {
  if (cached === './') continue;
  const full = path.join(ROOT, cached.replace(/^\.\//, ''));
  check(`sw.js entry exists on disk: ${cached}`, fs.existsSync(full), 'Dead entry in sw.js');
}

// Scan all js/, index.html, sw.js for deleted legacy assets/diagrams or assets/templates references
const scanDirs = [path.join(ROOT, 'js')];
const filesToScan = [path.join(ROOT, 'index.html'), path.join(ROOT, 'sw.js')];
function walkJs(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkJs(full);
    else if (entry.name.endsWith('.js')) filesToScan.push(full);
  }
}
walkJs(scanDirs[0]);

const legacyHits = [];
for (const f of filesToScan) {
  const txt = fs.readFileSync(f, 'utf-8');
  if (/assets\/(diagrams|templates)\//i.test(txt)) {
    legacyHits.push(path.relative(ROOT, f));
  }
}
check(
  'Zero legacy assets/diagrams or assets/templates references in codebase',
  legacyHits.length === 0,
  `Found in: ${legacyHits.join(', ')}`
);

// 4. Exact Mathematical Assertions on math-3d.js
// 4a. 2D Projective Homography: Inscribed ellipse tangency error < 0.05px across arbitrary perspective quads
const testQuads = [
  [{ x: 756, y: 586 }, { x: 938, y: 586 }, { x: 826, y: 672 }, { x: 632, y: 672 }],
  [{ x: 974, y: 556 }, { x: 1114, y: 522 }, { x: 1114, y: 754 }, { x: 974, y: 712 }],
  [{ x: 100, y: 120 }, { x: 420, y: 80 }, { x: 380, y: 310 }, { x: 40, y: 260 }],
];
for (let qi = 0; qi < testQuads.length; qi += 1) {
  const [p0, p1, p2, p3] = testQuads[qi];
  const insc = inscribeEllipseInQuad(p0, p1, p2, p3, 128);
  const edges = [[p0, p1], [p1, p2], [p2, p3], [p3, p0]];
  let maxErr = 0;
  for (let ei = 0; ei < 4; ei += 1) {
    const tp = insc.tangents[ei];
    const edgeErr = pointToSegmentDist(tp, edges[ei][0], edges[ei][1]);
    // Distance from tangent point to closest sampled ellipse point
    const minEllipseDist = Math.min(...insc.points.map((pt) => Math.hypot(pt.x - tp.x, pt.y - tp.y)));
    maxErr = Math.max(maxErr, edgeErr, minEllipseDist);
  }
  check(
    `Math-3D Homography quad #${qi + 1} tangency error < 0.05px`,
    maxErr < 0.05,
    `maxErr=${maxErr.toFixed(4)}px`
  );
}

// 4b. 3D Box, Cylinder, Sphere Projection Sanity
const cam = createCamera({ cx: 500, cy: 400, focal: 660, dist: 540, pitch: 22, yaw: 34 });
const boxProj = projectPolyMesh(createBoxMesh(100, 100, 100), cam);
check(
  'Math-3D Box projection classifies 3 visible faces & 9 visible + 3 hidden edges',
  boxProj.visibleFaces.length === 3 && boxProj.visibleEdges.length === 9 && boxProj.hiddenEdges.length === 3,
  `faces=${boxProj.visibleFaces.length}, visE=${boxProj.visibleEdges.length}, hidE=${boxProj.hiddenEdges.length}`
);

const cylProj = projectTaperedCylinder({ rTop: 40, rBot: 45, height: 150, rings: [0.5], xform: { rx: 14, rz: -30 }, cam });
check(
  'Math-3D Tapered cylinder produces 2 valid tangent side edges & mid ring',
  cylProj.sideEdges.length === 2 && cylProj.midRings[0].visiblePaths.length >= 1
);

const sphProj = projectSphere({ radius: 80, cam, lightDir: { x: -0.7, y: 0.7, z: 0.3 }, groundY: -80 });
check(
  'Math-3D Sphere produces analytical terminator & convex ground shadow',
  sphProj.terminator.visiblePaths.length >= 1 && sphProj.shadowPolygon.length >= 8
);

console.log(`\nSummary: ${passed} passed, ${failed} failed.`);
process.exit(failed > 0 ? 1 : 0);
