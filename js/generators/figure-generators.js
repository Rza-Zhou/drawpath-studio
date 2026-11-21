/**
 * DrawPath Studio · Figure Track Composite Worksheets & Exact 3D Geometric Panels
 * Combines verified transparent anatomical lineart plates (assets/plates/figure/*.webp)
 * with mathematically exact rulers, perspective floor grids, 3D-projected foot wedges,
 * foreshortened limb cylinders, and 3D pentagonal hand starter prisms.
 */

import { wrapTemplateSVG, SVG_FONT } from '../curriculum/svg-helpers.js';
import {
  createCamera,
  projectPolyMesh,
  renderPolyMeshToSvg,
  projectTaperedCylinder,
  pointsToSvgPath,
  fmt,
} from './math-3d.js';

function lineEl(a, b, attrs = '') {
  return `<line x1="${fmt(a.x)}" y1="${fmt(a.y)}" x2="${fmt(b.x)}" y2="${fmt(b.y)}" ${attrs}/>`;
}

function renderCylinder(cyl, {
  stroke = '#0284c7',
  ringStroke = '#4f46e5',
  strokeWidth = 1.8,
  showAxis = false,
  fillBody = false,
} = {}) {
  const out = [];
  if (showAxis) {
    out.push(lineEl(cyl.botCenter, cyl.topCenter, 'stroke="#6366f1" stroke-opacity="0.45" stroke-width="1.3" stroke-dasharray="5 4"'));
  }
  if (fillBody) {
    const [e1, e2] = cyl.sideEdges;
    const poly = `M${fmt(e1.a.x)} ${fmt(e1.a.y)} L${fmt(e1.b.x)} ${fmt(e1.b.y)} L${fmt(e2.b.x)} ${fmt(e2.b.y)} L${fmt(e2.a.x)} ${fmt(e2.a.y)} Z`;
    out.push(`<path d="${poly}" fill="#e0f2fe" fill-opacity="0.32" stroke="none"/>`);
  }
  if (!cyl.topCapVisible) {
    for (const d of cyl.topHiddenPaths) {
      out.push(`<path d="${d}" fill="none" stroke="${stroke}" stroke-opacity="0.26" stroke-width="1.2" stroke-dasharray="4 4"/>`);
    }
  }
  if (!cyl.botCapVisible) {
    for (const d of cyl.botHiddenPaths) {
      out.push(`<path d="${d}" fill="none" stroke="${stroke}" stroke-opacity="0.26" stroke-width="1.2" stroke-dasharray="4 4"/>`);
    }
  }
  for (const ring of cyl.midRings) {
    for (const d of ring.hiddenPaths) {
      out.push(`<path d="${d}" fill="none" stroke="${ringStroke}" stroke-opacity="0.22" stroke-width="1.2" stroke-dasharray="3 3"/>`);
    }
  }
  for (const e of cyl.sideEdges) {
    out.push(lineEl(e.a, e.b, `stroke="${stroke}" stroke-width="${fmt(strokeWidth)}" stroke-linecap="round"`));
  }
  if (cyl.topCapVisible) {
    out.push(`<path d="${cyl.topFullPath}" fill="${fillBody ? '#f0f9ff' : 'none'}" fill-opacity="0.7" stroke="${stroke}" stroke-width="${fmt(strokeWidth)}"/>`);
  } else {
    for (const d of cyl.topVisiblePaths) {
      out.push(`<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${fmt(strokeWidth)}" stroke-linecap="round"/>`);
    }
  }
  if (cyl.botCapVisible) {
    out.push(`<path d="${cyl.botFullPath}" fill="${fillBody ? '#f0f9ff' : 'none'}" fill-opacity="0.7" stroke="${stroke}" stroke-width="${fmt(strokeWidth)}"/>`);
  } else {
    for (const d of cyl.botVisiblePaths) {
      out.push(`<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${fmt(strokeWidth)}" stroke-linecap="round"/>`);
    }
  }
  for (const ring of cyl.midRings) {
    for (const d of ring.visiblePaths) {
      out.push(`<path d="${d}" fill="none" stroke="${ringStroke}" stroke-opacity="0.82" stroke-width="${fmt(strokeWidth * 0.92)}" stroke-linecap="round"/>`);
    }
  }
  return out.join('\n');
}

// ---------------------------------------------------------------------------
// 3D Anatomical Geometric Primitives (Foot Wedge Mesh & Pentagonal Palm Prism)
// ---------------------------------------------------------------------------

/**
 * Exact 3D Planar Anatomical Foot Wedge (Right foot, toes pointing +Z, medial/inner side = -X, lateral/outer side = +X, ground = y=0).
 * Proportional adult ratio: ankle height ~68, total length ~180 (1 : 2.65), inner edge thicker than outer edge.
 */
function createFootWedgeMesh() {
  const vertices = [
    // Heel base (y=0)
    { x: -24, y: 0, z: -88 },   // 0: heel medial bottom
    { x: 24, y: 0, z: -88 },    // 1: heel lateral bottom
    // Mid-arch / instep base
    { x: -26, y: 12, z: -14 },  // 2: medial arch lifted! (y=12 off floor)
    { x: 28, y: 0, z: -14 },    // 3: lateral border flat on floor (y=0)
    // Ball of foot base (y=0)
    { x: -32, y: 0, z: 46 },    // 4: ball medial bottom
    { x: 32, y: 0, z: 36 },     // 5: ball lateral bottom (angled back per natural toe taper)
    // Toe tips bottom (y=0)
    { x: -28, y: 0, z: 92 },    // 6: big toe tip bottom
    { x: 24, y: 0, z: 72 },     // 7: pinky toe tip bottom
    // Ankle collar top (y=66..60)
    { x: -22, y: 66, z: -64 },  // 8: ankle medial back
    { x: 22, y: 60, z: -64 },   // 9: ankle lateral back (slightly lower outer slope)
    { x: -24, y: 64, z: -26 },  // 10: ankle medial front
    { x: 24, y: 54, z: -26 },   // 11: ankle lateral front
    // Ball top ridge (sloping down toward toes; medial thicker than lateral)
    { x: -30, y: 24, z: 46 },   // 12: ball medial top
    { x: 30, y: 16, z: 36 },    // 13: ball lateral top
    // Toe box top front
    { x: -26, y: 14, z: 90 },   // 14: big toe top
    { x: 22, y: 10, z: 70 },    // 15: pinky toe top
  ];

  // CCW outward winding for right-handed Y-up coordinates
  const faces = [
    // Back heel ramp
    { name: 'heel-back', tone: 'side', indices: [0, 8, 9, 1] },
    // Top ankle opening
    { name: 'ankle-top', tone: 'ankle', indices: [8, 10, 11, 9] },
    // Main sloping instep dorsum plane (key teaching plane!)
    { name: 'instep-top', tone: 'top', indices: [10, 12, 13, 11] },
    // Toe wedge top plane
    { name: 'toe-top', tone: 'toe', indices: [12, 14, 15, 13] },
    // Front toe cap
    { name: 'toe-front', tone: 'toe', indices: [14, 6, 7, 15] },
    // Inner medial arch wall (shows lifted arch!)
    { name: 'medial-back', tone: 'medial', indices: [0, 2, 10, 8] },
    { name: 'medial-mid', tone: 'medial', indices: [2, 4, 12, 10] },
    { name: 'medial-toe', tone: 'toe', indices: [4, 6, 14, 12] },
    // Outer lateral straight wall
    { name: 'lateral-back', tone: 'side', indices: [1, 9, 11, 3] },
    { name: 'lateral-mid', tone: 'side', indices: [3, 11, 13, 5] },
    { name: 'lateral-toe', tone: 'toe', indices: [5, 13, 15, 7] },
    // Grounded sole planes
    { name: 'sole-back', tone: 'sole', indices: [0, 1, 3, 2] },
    { name: 'sole-mid', tone: 'sole', indices: [2, 3, 5, 4] },
    { name: 'sole-toe', tone: 'sole', indices: [4, 5, 7, 6] },
  ];
  return { vertices, faces };
}

/**
 * Exact 3D Beveled Pentagonal Palm Prism (wrist at bottom -Y, arched knuckles at top +Y, thickness along Z).
 */
function createPalmBoxMesh(w = 68, h = 76, d = 22) {
  const hw = w / 2, hh = h / 2, hd = d / 2;
  // Front (+z) and back (-z) pentagons: wrist-L, wrist-R, index-knuckle, middle-peak, pinky-knuckle
  const profile = [
    { x: -hw * 0.78, y: -hh },       // 0: wrist pinky side
    { x: hw * 0.78, y: -hh },        // 1: wrist thumb side
    { x: hw * 1.04, y: hh * 0.62 },  // 2: index knuckle
    { x: hw * 0.14, y: hh * 1.02 },  // 3: middle knuckle peak
    { x: -hw * 1.0, y: hh * 0.42 },  // 4: pinky knuckle (lower than index!)
  ];
  const vertices = [
    ...profile.map((p) => ({ x: p.x, y: p.y, z: hd })),  // 0..4 front
    ...profile.map((p) => ({ x: p.x, y: p.y, z: -hd })), // 5..9 back
  ];
  const faces = [
    { name: 'front', tone: 'front', indices: [0, 1, 2, 3, 4] },
    { name: 'back', tone: 'side', indices: [9, 8, 7, 6, 5] },
    { name: 'wrist', tone: 'side', indices: [5, 6, 1, 0] },
    { name: 'thumb-edge', tone: 'thumb', indices: [1, 6, 7, 2] },
    { name: 'knuckle-in', tone: 'top', indices: [2, 7, 8, 3] },
    { name: 'knuckle-out', tone: 'top', indices: [3, 8, 9, 4] },
    { name: 'pinky-edge', tone: 'side', indices: [4, 9, 5, 0] },
  ];
  return { vertices, faces };
}

// ---------------------------------------------------------------------------
// Standalone 3D-Projected Teaching Panels (for Diagram Deck Cards)
// ---------------------------------------------------------------------------

/**
 * Figure-4 Panel: Exact 3D Foreshortened Arm Reaching Toward Viewer (overlapping coil rings).
 */
export function generateFigure4ForeshorteningPanelSvg() {
  const cam = createCamera({ cx: 200, cy: 170, focal: 520, dist: 380, pitch: 8, yaw: -10 });
  const upperArm = projectTaperedCylinder({
    rTop: 28,
    rBot: 34,
    height: 110,
    rings: [0.35, 0.7],
    xform: { rx: 68, rz: -14, tx: -34, ty: 26, tz: -65 },
    cam,
  });
  const forearm = projectTaperedCylinder({
    rTop: 32,
    rBot: 42,
    height: 118,
    rings: [0.35, 0.7],
    xform: { rx: 82, rz: 10, tx: 22, ty: -14, tz: 58 },
    cam,
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" font-family="${SVG_FONT}">
    <rect x="0" y="0" width="400" height="320" fill="none"/>
    ${lineEl(upperArm.topCenter, forearm.botCenter, 'stroke="#e11d48" stroke-opacity="0.5" stroke-width="1.6" stroke-dasharray="5 4"')}
    ${renderCylinder(upperArm, { stroke: '#0284c7', ringStroke: '#6366f1', strokeWidth: 1.7, fillBody: true })}
    ${renderCylinder(forearm, { stroke: '#0f172a', ringStroke: '#0284c7', strokeWidth: 2.3, fillBody: true })}
    <circle cx="${fmt(forearm.botCenter.x)}" cy="${fmt(forearm.botCenter.y)}" r="4.5" fill="#e11d48"/>
    <text x="200" y="294" font-size="12" font-weight="700" fill="#4f46e5" text-anchor="middle">近端截面圆大且实压远端（T 字叠压 + 近大远小）</text>
  </svg>`;
}

/**
 * Figure-6 Panel A: Exact 3D Projected Front View Foot showing Asymmetric Ankle (Inner High, Outer Low).
 */
export function generateFigure6FrontAnkleSvg() {
  const cam = createCamera({ cx: 200, cy: 214, focal: 760, dist: 495, pitch: 12, yaw: 6 });
  const foot = projectPolyMesh(createFootWedgeMesh(), cam, { tx: 0, ty: -24, tz: 0 });
  const shin = projectTaperedCylinder({
    rTop: 22,
    rBot: 20,
    height: 92,
    rings: [],
    xform: { tx: 0, ty: 82, tz: -46 },
    cam,
  });

  // Exact anatomical ankle bone 3D points: Inner (-X) HIGHER (y=46), Outer (+X) LOWER (y=34)
  const innerAnkle = cam.project({ x: -24, y: 46, z: -42 });
  const outerAnkle = cam.project({ x: 25, y: 34, z: -48 });
  const groundL = cam.project({ x: -75, y: -24, z: 30 });
  const groundR = cam.project({ x: 75, y: -24, z: 30 });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" font-family="${SVG_FONT}">
    ${lineEl(groundL, groundR, 'stroke="#94a3b8" stroke-opacity="0.6" stroke-width="1.5"')}
    ${renderCylinder(shin, { stroke: '#0f172a', strokeWidth: 1.9, fillBody: false })}
    ${renderPolyMeshToSvg(foot, {
      stroke: '#0f172a',
      strokeWidth: 2,
      hiddenStroke: '#0284c7',
      hiddenOpacity: 0.25,
      faceFills: {
        top: { fill: '#e0f2fe', fillOpacity: 0.52 },
        toe: { fill: '#dcfce7', fillOpacity: 0.45 },
        medial: { fill: '#ffe4e6', fillOpacity: 0.42 },
      },
    })}
    ${lineEl(
      { x: innerAnkle.x - 24, y: innerAnkle.y - 6 },
      { x: outerAnkle.x + 24, y: outerAnkle.y + 6 },
      'stroke="#e11d48" stroke-width="2.3" stroke-dasharray="5 3"'
    )}
    <circle cx="${fmt(innerAnkle.x)}" cy="${fmt(innerAnkle.y)}" r="5.5" fill="#e11d48"/>
    <circle cx="${fmt(outerAnkle.x)}" cy="${fmt(outerAnkle.y)}" r="5.5" fill="#e11d48"/>
    <text x="${fmt(innerAnkle.x - 16)}" y="${fmt(innerAnkle.y - 12)}" font-size="12.5" font-weight="700" fill="#e11d48" text-anchor="end">内踝高</text>
    <text x="${fmt(outerAnkle.x + 16)}" y="${fmt(outerAnkle.y + 5)}" font-size="12.5" font-weight="700" fill="#e11d48" text-anchor="start">外踝低</text>
  </svg>`;
}

/**
 * Figure-6 Panel B: Exact 3D Projected 3/4 Perspective Wedge Foot resting on a 3D Perspective Floor Grid.
 */
export function generateFigure6Wedge3QSvg() {
  const cam = createCamera({ cx: 204, cy: 202, focal: 740, dist: 465, pitch: 20, yaw: -42 });
  const foot = projectPolyMesh(createFootWedgeMesh(), cam, { tx: 0, ty: -24, tz: 0 });
  const shin = projectTaperedCylinder({
    rTop: 22,
    rBot: 20,
    height: 88,
    rings: [0.5],
    xform: { tx: 0, ty: 80, tz: -46 },
    cam,
  });

  // Exact 3D floor grid at y = -24
  const gridLines = [];
  for (let gx = -90; gx <= 90; gx += 45) {
    gridLines.push(lineEl(cam.project({ x: gx, y: -24, z: -110 }), cam.project({ x: gx, y: -24, z: 115 }), 'stroke="#38bdf8" stroke-opacity="0.3" stroke-width="1.1"'));
  }
  for (let gz = -110; gz <= 115; gz += 45) {
    gridLines.push(lineEl(cam.project({ x: -90, y: -24, z: gz }), cam.project({ x: 90, y: -24, z: gz }), 'stroke="#38bdf8" stroke-opacity="0.3" stroke-width="1.1"'));
  }

  // Big-toe block divider on toe-top face
  const bigToeA = cam.project({ x: -12, y: -24 + 21, z: 44 });
  const bigToeB = cam.project({ x: -10, y: -24 + 13, z: 86 });
  const innerAnkle = cam.project({ x: -24, y: -24 + 66, z: -44 });
  const archApex = cam.project({ x: -26, y: -24 + 12, z: -14 });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" font-family="${SVG_FONT}">
    ${gridLines.join('\n')}
    ${renderCylinder(shin, { stroke: '#0f172a', ringStroke: '#0284c7', strokeWidth: 1.9 })}
    ${renderPolyMeshToSvg(foot, {
      stroke: '#0f172a',
      strokeWidth: 2,
      hiddenStroke: '#0284c7',
      hiddenOpacity: 0.28,
      faceFills: {
        top: { fill: '#e0f2fe', fillOpacity: 0.56 },
        medial: { fill: '#ffe4e6', fillOpacity: 0.45 },
        toe: { fill: '#dcfce7', fillOpacity: 0.5 },
        ankle: { fill: '#f1f5f9', fillOpacity: 0.6 },
      },
    })}
    ${lineEl(bigToeA, bigToeB, 'stroke="#0284c7" stroke-width="1.6" stroke-dasharray="4 3"')}
    <circle cx="${fmt(innerAnkle.x)}" cy="${fmt(innerAnkle.y)}" r="5" fill="#e11d48"/>
    <circle cx="${fmt(archApex.x)}" cy="${fmt(archApex.y)}" r="4.5" fill="#059669"/>
  </svg>`;
}

// ---------------------------------------------------------------------------
// 8 COMPOSITE FIGURE PRACTICE TEMPLATES (1200x900 Canvas Specs)
// Each returns { kind: 'composite', renderScaffoldSvg(), plates: [{src,x,y,w,h,alignY}] }
// ---------------------------------------------------------------------------

export function getFigureTemplateSpec(templateId) {
  switch (templateId) {
    // 1. Gesture & Balance
    case 'tpl-figure-gesture':
      return {
        id: 'tpl-figure-gesture',
        kind: 'composite',
        plates: [
          {
            src: './assets/plates/figure/fig1-standing-balance.webp',
            x: 84,
            y: 162,
            w: 276,
            h: 614,
            alignY: 'bottom',
            opacity: 0.95,
          },
          {
            src: './assets/plates/figure/fig1-dynamic-action.webp',
            x: 438,
            y: 158,
            w: 320,
            h: 408,
            alignY: 'center',
            opacity: 0.95,
          },
        ],
        renderScaffoldSvg: () =>
          wrapTemplateSVG(
            'FIGURE-1 · 动作线 (Line of Action) 与重心平衡练习',
            '口诀：一笔甩出贯穿全身的 C/S 主弧线，静态站姿锁骨窝垂线必落入足底支撑区',
            `
            <!-- Zone 1: Standing Balance + Exact Plumb Line -->
            <rect x="48" y="92" width="348" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="66" y="120" font-size="13.5" font-weight="700" fill="#0284c7">区 1 · 静态站姿与重心垂线示范</text>
            <text x="66" y="140" font-size="11.5" fill="#475569">观察锁骨窝垂线正落入承重脚足底支撑椭圆</text>
            <line x1="82" y1="776" x2="362" y2="776" stroke="#94a3b8" stroke-opacity="0.6" stroke-width="1.5"/>
            <ellipse cx="220" cy="776" rx="68" ry="14" fill="#10b981" fill-opacity="0.1" stroke="#059669" stroke-opacity="0.55" stroke-dasharray="5 4"/>
            <line x1="216" y1="262" x2="216" y2="768" stroke="#059669" stroke-opacity="0.68" stroke-width="1.8" stroke-dasharray="6 5" marker-end="url(#tpl-arrow-emerald)"/>
            <circle cx="216" cy="262" r="4.5" fill="#059669"/>
            <text x="220" y="814" font-size="11.5" font-weight="600" fill="#059669" text-anchor="middle">足底支撑面（重心必落此区）</text>

            <!-- Zone 2: Dynamic Action Demo + Lower Practice C-Arc -->
            <rect x="420" y="92" width="356" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="438" y="120" font-size="13.5" font-weight="700" fill="#0284c7">区 2 · 动态 C 弧与拉伸/挤压示范</text>
            <text x="438" y="140" font-size="11.5" fill="#475569">上方参考冲刺动势，下方沿虚线 C 弧补全腾空体块</text>
            <line x1="448" y1="578" x2="748" y2="578" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="4 4"/>
            <path d="M664 612 C562 638, 514 708, 548 802" fill="none" stroke="#4f46e5" stroke-opacity="0.6" stroke-width="3" stroke-dasharray="8 6" stroke-linecap="round"/>
            <circle cx="664" cy="612" r="22" fill="none" stroke="#0284c7" stroke-opacity="0.52" stroke-width="1.5"/>
            <text x="598" y="836" font-size="11.5" fill="#4f46e5" text-anchor="middle">练 1 · 沿虚线 C 弧补全腾空跃起火柴体块</text>

            <!-- Zone 3: Independent Sprint & Twist Practice -->
            <rect x="800" y="92" width="352" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="818" y="120" font-size="13.5" font-weight="700" fill="#0284c7">区 3 · 自主脱稿动态练习区</text>
            <text x="818" y="140" font-size="11.5" fill="#475569">奔跑时重心故意落在脚掌前方，制造速度势能</text>
            <line x1="836" y1="472" x2="1122" y2="472" stroke="#94a3b8" stroke-opacity="0.55" stroke-width="1.5"/>
            <path d="M1050 226 C1002 288, 956 364, 888 466" fill="none" stroke="#4f46e5" stroke-opacity="0.6" stroke-width="3" stroke-dasharray="8 6" stroke-linecap="round"/>
            <ellipse cx="1062" cy="214" rx="24" ry="31" fill="none" stroke="#0284c7" stroke-opacity="0.5" stroke-width="1.5" transform="rotate(32 1062 214)"/>
            <line x1="1032" y1="258" x2="1032" y2="464" stroke="#d97706" stroke-opacity="0.68" stroke-width="1.8" stroke-dasharray="5 4" marker-end="url(#tpl-arrow-amber)"/>
            <text x="1044" y="456" font-size="11" font-weight="600" fill="#d97706">重心超前 = 冲刺势能</text>
            <circle cx="888" cy="468" r="5.5" fill="#0284c7" fill-opacity="0.65"/>
            <text x="876" y="492" font-size="11" fill="#475569">蹬地脚点</text>

            <line x1="836" y1="812" x2="1122" y2="812" stroke="#94a3b8" stroke-opacity="0.55" stroke-width="1.5"/>
            <path d="M902 556 C968 606, 1020 682, 962 808" fill="none" stroke="#4f46e5" stroke-opacity="0.58" stroke-width="3" stroke-dasharray="8 6" stroke-linecap="round"/>
            <circle cx="902" cy="556" r="22" fill="none" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.5"/>
            <path d="M886 632 L1068 600" fill="none" stroke="#0284c7" stroke-opacity="0.55" stroke-width="1.6" marker-end="url(#tpl-arrow)"/>
            <text x="976" y="838" font-size="11.5" fill="#4f46e5" text-anchor="middle">练 2 · 顺势补全扭转挥臂或出拳全身动势</text>
            `
          ),
      };

    // 2. 7.5-Head Proportions & Key Landmarks
    case 'tpl-figure-proportions': {
      const y0 = 128;
      const step = 94; // 7.5 * 94 = 705px -> ground at y = 833
      const marks = [
        { h: 0, label: '0 · 头顶', color: '#0284c7', bold: true },
        { h: 1, label: '1 · 下巴', color: '#0284c7', bold: false },
        { h: 1.5, label: '1.5 · 肩线', color: '#64748b', dashed: true },
        { h: 2, label: '2 · 胸线', color: '#0284c7', bold: false },
        { h: 3, label: '3 · 肚脐 / 肘', color: '#4f46e5', bold: true },
        { h: 3.75, label: '3.75 · 耻骨(中点)', color: '#d97706', bold: true, dashed: true },
        { h: 5.5, label: '5.5 · 膝盖', color: '#4f46e5', bold: true, dashed: true },
        { h: 7, label: '7 · 脚踝', color: '#64748b', dashed: true },
        { h: 7.5, label: '7.5 · 脚底', color: '#0284c7', bold: true },
      ];
      const gridSvg = marks
        .map((m) => {
          const y = y0 + m.h * step;
          return `
            <line x1="158" y1="${fmt(y)}" x2="1148" y2="${fmt(y)}" stroke="${m.color}" stroke-opacity="${m.bold ? 0.42 : 0.24}" stroke-width="${m.h === 3.75 || m.h === 7.5 ? 1.5 : 1}" ${m.dashed ? 'stroke-dasharray="6 4"' : ''}/>
            <text x="50" y="${fmt(y + 4)}" font-size="11" font-weight="${m.bold ? 700 : 500}" fill="${m.color}">${m.label}</text>
          `;
        })
        .join('\n');

      return {
        id: 'tpl-figure-proportions',
        kind: 'composite',
        plates: [
          {
            src: './assets/plates/figure/fig2-proportions-front.webp',
            x: 204,
            y: y0,
            w: 258,
            h: 705,
            alignY: 'bottom',
            opacity: 0.94,
          },
          {
            src: './assets/plates/figure/fig2-proportions-side.webp',
            x: 560,
            y: y0,
            w: 210,
            h: 705,
            alignY: 'bottom',
            opacity: 0.94,
          },
        ],
        renderScaffoldSvg: () =>
          wrapTemplateSVG(
            'FIGURE-2 · 通用 7.5 头身比例标尺与关键骨点定位',
            '口诀：耻骨为全身 1/2 中点 · 肩宽约 2 头 · 肘齐腰(3H) · 腕齐裆(3.8H) · 膝居 5.5H',
            `
            ${gridSvg}
            <line x1="333" y1="106" x2="333" y2="844" stroke="#6366f1" stroke-opacity="0.28" stroke-dasharray="5 5"/>
            <text x="333" y="106" font-size="12" font-weight="700" fill="#0284c7" text-anchor="middle">正面 7.5 头身结构示范</text>

            <line x1="665" y1="106" x2="665" y2="844" stroke="#10b981" stroke-opacity="0.38" stroke-width="1.3" stroke-dasharray="5 5"/>
            <text x="665" y="106" font-size="12" font-weight="700" fill="#059669" text-anchor="middle">侧面脊柱 S 曲线与重心轴</text>
            <text x="665" y="852" font-size="11" fill="#059669" text-anchor="middle">耳垂 → 肩峰 → 股骨大转子 → 外踝</text>

            <rect x="846" y="96" width="298" height="752" rx="10" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="5 5"/>
            <text x="995" y="114" font-size="12" font-weight="700" fill="#4f46e5" text-anchor="middle">默写区 · 对照标尺画出正/侧蛋盒人偶</text>
            <line x1="995" y1="128" x2="995" y2="833" stroke="#6366f1" stroke-opacity="0.32" stroke-dasharray="5 5"/>
            <ellipse cx="995" cy="${fmt(y0 + step * 0.5)}" rx="31" ry="47" fill="none" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.5" stroke-dasharray="4 4"/>
            <g fill="#d97706" fill-opacity="0.72">
              <circle cx="995" cy="${fmt(y0 + step * 1.5)}" r="4"/>
              <circle cx="995" cy="${fmt(y0 + step * 3.0)}" r="4"/>
              <circle cx="995" cy="${fmt(y0 + step * 3.75)}" r="4.5"/>
              <circle cx="970" cy="${fmt(y0 + step * 5.5)}" r="3.5"/>
              <circle cx="1020" cy="${fmt(y0 + step * 5.5)}" r="3.5"/>
            </g>
            `
          ),
      };
    }

    // 3. Ribcage Egg + Pelvis Box Contrapposto
    case 'tpl-figure-torso': {
      // Exact 3D tilted pelvis box starter for Zone 3 bottom practice box
      const camPelvis = createCamera({ cx: 976, cy: 736, focal: 580, dist: 480, pitch: 26, yaw: -26 });
      const pelvisStarter = projectPolyMesh(
        {
          vertices: [
            { x: -58, y: -26, z: -34 }, { x: 58, y: -26, z: -34 },
            { x: 64, y: 26, z: -34 }, { x: -64, y: 26, z: -34 },
            { x: -58, y: -26, z: 34 }, { x: 58, y: -26, z: 34 },
            { x: 64, y: 26, z: 34 }, { x: -64, y: 26, z: 34 },
          ],
          faces: [
            { name: 'front', indices: [4, 5, 6, 7] },
            { name: 'back', indices: [1, 0, 3, 2] },
            { name: 'right', indices: [5, 1, 2, 6] },
            { name: 'left', indices: [0, 4, 7, 3] },
            { name: 'top', indices: [7, 6, 2, 3] },
            { name: 'bottom', indices: [0, 1, 5, 4] },
          ],
        },
        camPelvis
      );

      return {
        id: 'tpl-figure-torso',
        kind: 'composite',
        plates: [
          {
            src: './assets/plates/figure/fig3-torso-3q-eggbox.webp',
            x: 68,
            y: 158,
            w: 304,
            h: 642,
            alignY: 'center',
            opacity: 0.94,
          },
          {
            src: './assets/plates/figure/fig3-torso-contrapposto.webp',
            x: 432,
            y: 158,
            w: 328,
            h: 642,
            alignY: 'center',
            opacity: 0.94,
          },
        ],
        renderScaffoldSvg: () =>
          wrapTemplateSVG(
            'FIGURE-3 · 胸腔蛋 + 骨盆盒倾斜与扭转 (Contrapposto)',
            '口诀：胸腔像微倾的蛋，骨盆像带厚度的斜切盒；肩胯反向倾斜、腰部一挤一拉才自然',
            `
            <rect x="48" y="92" width="344" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="66" y="120" font-size="13.5" font-weight="700" fill="#0284c7">区 1 · 3/4 蛋盒结构转面示范</text>
            <text x="66" y="140" font-size="11.5" fill="#475569">看清蓝胸腔前中线、倒 U 肋弓与红骨盆盒厚度</text>
            <text x="220" y="834" font-size="11.5" fill="#0369a1" text-anchor="middle">蓝卵胸腔 + 柔软腰段 + 红盒骨盆</text>

            <rect x="416" y="92" width="360" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="434" y="120" font-size="13.5" font-weight="700" fill="#0284c7">区 2 · Contrapposto 肩胯反倾示范</text>
            <text x="434" y="140" font-size="11.5" fill="#475569">红肩线↘ 与 蓝胯线↗ 反向倾斜，右侧腰部自然挤压</text>
            <text x="596" y="834" font-size="11.5" fill="#4f46e5" text-anchor="middle">左腰拉长舒展 · 右腰挤压折叠</text>

            <rect x="800" y="92" width="352" height="368" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="818" y="120" font-size="13" font-weight="700" fill="#0284c7">练 1 · 扭腰转身（胸向右、胯向左）</text>
            <path d="M976 168 C958 242, 992 326, 976 410" fill="none" stroke="#6366f1" stroke-opacity="0.52" stroke-width="2.2" stroke-dasharray="5 4"/>
            <path d="M904 236 Q976 266 1052 224" fill="none" stroke="#0284c7" stroke-width="2" marker-end="url(#tpl-arrow)"/>
            <text x="1062" y="228" font-size="11" fill="#0284c7">胸朝右</text>
            <path d="M1046 356 Q976 382 900 344" fill="none" stroke="#059669" stroke-width="2" marker-end="url(#tpl-arrow-emerald)"/>
            <text x="836" y="348" font-size="11" fill="#059669">胯朝左</text>
            <text x="976" y="438" font-size="11" fill="#475569" text-anchor="middle">在此画胸腔与骨盆呈 45° 扭转的 3D 蛋盒</text>

            <rect x="800" y="484" width="352" height="372" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="818" y="512" font-size="13" font-weight="700" fill="#0284c7">练 2 · 前倾俯视透视（看到顶面）</text>
            <path d="M944 568 C960 622, 972 678, 976 742" fill="none" stroke="#6366f1" stroke-opacity="0.45" stroke-width="2" stroke-dasharray="5 4"/>
            <ellipse cx="944" cy="596" rx="58" ry="24" fill="none" stroke="#4f46e5" stroke-opacity="0.55" stroke-width="1.6" transform="rotate(-10 944 596)"/>
            <text x="1016" y="590" font-size="11" fill="#4f46e5">俯视胸腔顶面</text>
            ${renderPolyMeshToSvg(pelvisStarter, { stroke: '#e11d48', strokeWidth: 1.5, hiddenStroke: '#e11d48', hiddenOpacity: 0.24 })}
            <text x="976" y="836" font-size="11" fill="#475569" text-anchor="middle">把前倾胸腔蛋压在下方红盒骨盆前方体现叠压</text>
            `
          ),
      };
    }

    // 4. Cylindrical Limbs & Foreshortening
    case 'tpl-figure-limbs': {
      // Exact 3D foreshortened reaching arm cylinder stack in top-center
      const camArm = createCamera({ cx: 598, cy: 274, focal: 520, dist: 380, pitch: 8, yaw: -10 });
      const reachUp = projectTaperedCylinder({ rTop: 26, rBot: 32, height: 102, rings: [0.35, 0.7], xform: { rx: 68, rz: -14, tx: -30, ty: 24, tz: -60 }, cam: camArm });
      const reachFore = projectTaperedCylinder({ rTop: 30, rBot: 39, height: 112, rings: [0.35, 0.7], xform: { rx: 82, rz: 10, tx: 22, ty: -12, tz: 54 }, cam: camArm });

      // Exact 3D bent foreshortened leg in bottom-center
      const camLeg = createCamera({ cx: 582, cy: 676, focal: 560, dist: 440, pitch: 12, yaw: -16 });
      const bentThigh = projectTaperedCylinder({ rTop: 34, rBot: 28, height: 132, rings: [0.35, 0.7], xform: { rx: 64, rz: 20, tx: -34, ty: 38, tz: 18 }, cam: camLeg });
      const bentCalf = projectTaperedCylinder({ rTop: 26, rBot: 17, height: 142, rings: [0.4, 0.75], xform: { rx: -28, rz: -12, tx: 16, ty: -58, tz: -28 }, cam: camLeg });

      return {
        id: 'tpl-figure-limbs',
        kind: 'composite',
        plates: [
          {
            src: './assets/plates/figure/fig4-arm-cylinders.webp',
            x: 68,
            y: 136,
            w: 368,
            h: 286,
            alignY: 'center',
            opacity: 0.95,
          },
          {
            src: './assets/plates/figure/fig4-leg-s-rhythm.webp',
            x: 112,
            y: 526,
            w: 220,
            h: 308,
            alignY: 'center',
            opacity: 0.95,
          },
        ],
        renderScaffoldSvg: () =>
          wrapTemplateSVG(
            'FIGURE-4 · 四肢圆柱透视与肘/膝关节衔接',
            '口诀：四肢是带方向截面环的锥形圆柱，近段轮廓用 T 字叠压切在远段前方',
            `
            <!-- Top Half: Arms -->
            <rect x="48" y="92" width="1104" height="368" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="68" y="120" font-size="13.5" font-weight="700" fill="#0284c7">上区 · 手臂锥形圆柱示范（左）、3D 前伸叠压（中）与屈肘练习轴（右）</text>
            <text x="252" y="442" font-size="11.5" fill="#475569" text-anchor="middle">三角肌球 → 上臂锥筒 → 红肘球 → 扁腕盒</text>

            ${renderCylinder(reachUp, { stroke: '#0284c7', ringStroke: '#6366f1', strokeWidth: 1.6, fillBody: true })}
            ${renderCylinder(reachFore, { stroke: '#0f172a', ringStroke: '#0284c7', strokeWidth: 2.1, fillBody: true })}
            <text x="598" y="442" font-size="11.5" font-weight="600" fill="#4f46e5" text-anchor="middle">前伸透视：近端圆柱大且压住远端</text>

            <g transform="translate(806, 152)">
              <line x1="34" y1="42" x2="146" y2="118" stroke="#6366f1" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="5 4"/>
              <line x1="146" y1="118" x2="286" y2="62" stroke="#6366f1" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="5 4"/>
              <circle cx="34" cy="42" r="18" fill="none" stroke="#0284c7" stroke-opacity="0.52" stroke-width="1.6"/>
              <circle cx="146" cy="118" r="16" fill="none" stroke="#e11d48" stroke-opacity="0.62" stroke-width="1.6"/>
              <ellipse cx="286" cy="62" rx="12" ry="18" fill="none" stroke="#059669" stroke-opacity="0.6" stroke-width="1.6"/>
              <text x="164" y="290" font-size="11.5" fill="#0284c7" text-anchor="middle">练 1 · 沿中轴补全屈肘圆柱与截面绕线</text>
            </g>

            <!-- Bottom Half: Legs -->
            <rect x="48" y="484" width="1104" height="372" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="68" y="512" font-size="13.5" font-weight="700" fill="#0284c7">下区 · 腿部侧面 S 型韵律（左）、3D 屈膝叠压（中）与跨步腿练习轴（右）</text>
            <text x="222" y="844" font-size="11.5" fill="#475569" text-anchor="middle">大腿前拱 → 膝盖方切 → 小腿后弓</text>

            ${renderCylinder(bentCalf, { stroke: '#64748b', ringStroke: '#94a3b8', strokeWidth: 1.5, fillBody: false })}
            ${renderCylinder(bentThigh, { stroke: '#0284c7', ringStroke: '#4f46e5', strokeWidth: 2, fillBody: true })}
            <text x="582" y="844" font-size="11.5" font-weight="600" fill="#4f46e5" text-anchor="middle">屈膝叠压：前伸大腿与膝盖完整挡住后退小腿</text>

            <g transform="translate(808, 536)">
              <line x1="68" y1="30" x2="150" y2="148" stroke="#6366f1" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="5 4"/>
              <line x1="150" y1="148" x2="96" y2="280" stroke="#6366f1" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="5 4"/>
              <circle cx="68" cy="30" r="20" fill="none" stroke="#0284c7" stroke-opacity="0.5" stroke-width="1.5"/>
              <rect x="134" y="132" width="32" height="32" rx="6" fill="none" stroke="#d97706" stroke-opacity="0.62" stroke-width="1.6"/>
              <circle cx="96" cy="280" r="12" fill="none" stroke="#059669" stroke-opacity="0.6" stroke-width="1.6"/>
              <line x1="248" y1="30" x2="236" y2="158" stroke="#6366f1" stroke-opacity="0.48" stroke-width="2" stroke-dasharray="5 4"/>
              <line x1="236" y1="158" x2="246" y2="282" stroke="#6366f1" stroke-opacity="0.48" stroke-width="2" stroke-dasharray="5 4"/>
              <rect x="222" y="144" width="28" height="28" rx="5" fill="none" stroke="#d97706" stroke-opacity="0.55" stroke-width="1.5"/>
              <text x="156" y="308" font-size="11.5" fill="#0284c7" text-anchor="middle">练 2 · 补全跨步与直立腿锥形圆柱 + 截面弧</text>
            </g>
            `
          ),
      };
    }

    // 5. Hand Geometry & Finger Grouping
    case 'tpl-figure-hands': {
      // Exact 3D Pentagonal Palm Starter Boxes for Right Practice Zones!
      const palmMesh = createPalmBoxMesh(72, 82, 22);
      const p1 = projectPolyMesh(palmMesh, createCamera({ cx: 710, cy: 318, focal: 560, dist: 420, pitch: 10, yaw: -22 }));
      const p2 = projectPolyMesh(palmMesh, createCamera({ cx: 882, cy: 318, focal: 560, dist: 420, pitch: 18, yaw: 28 }));
      const p3 = projectPolyMesh(palmMesh, createCamera({ cx: 1054, cy: 318, focal: 560, dist: 420, pitch: -16, yaw: -32 }));

      const s1 = projectPolyMesh(palmMesh, createCamera({ cx: 710, cy: 712, focal: 560, dist: 420, pitch: 8, yaw: -16, roll: -12 }));
      const s2 = projectPolyMesh(palmMesh, createCamera({ cx: 882, cy: 712, focal: 560, dist: 420, pitch: 22, yaw: 34, roll: 8 }));
      const s3 = projectPolyMesh(palmMesh, createCamera({ cx: 1054, cy: 712, focal: 560, dist: 420, pitch: -14, yaw: 24, roll: 14 }));

      const palmStyle = {
        stroke: '#e11d48',
        strokeWidth: 1.6,
        hiddenStroke: '#e11d48',
        hiddenOpacity: 0.24,
        faceFills: {
          front: { fill: '#ffe4e6', fillOpacity: 0.22 },
          thumb: { fill: '#e0f2fe', fillOpacity: 0.35 },
        },
      };

      return {
        id: 'tpl-figure-hands',
        kind: 'composite',
        plates: [
          {
            src: './assets/plates/figure/fig5-hand-open-grouped.webp',
            x: 138,
            y: 134,
            w: 356,
            h: 312,
            alignY: 'center',
            opacity: 0.95,
          },
          {
            src: './assets/plates/figure/fig5-hand-fist-box.webp',
            x: 158,
            y: 530,
            w: 316,
            h: 304,
            alignY: 'center',
            opacity: 0.95,
          },
        ],
        renderScaffoldSvg: () =>
          wrapTemplateSVG(
            'FIGURE-5 · 手部五边形掌盒、1+2+1 分组与 3D 握拳阶梯方块',
            '口诀：掌长 ≈ 中指长 · 先定五边形掌盒与大鱼际球座，再按 1+2+1 / 1+3 手套分组画指节',
            `
            <rect x="48" y="92" width="540" height="372" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="68" y="120" font-size="13.5" font-weight="700" fill="#0284c7">区 1 · 五边形掌盒 + 1+2+1 舒展分组示范</text>
            <text x="318" y="454" font-size="11.5" fill="#475569" text-anchor="middle">五边形掌盒 · 大鱼际椭圆座 · 指尖同心扇形弧</text>

            <rect x="48" y="488" width="540" height="368" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="68" y="516" font-size="13.5" font-weight="700" fill="#0284c7">区 2 · 握拳 3D 阶梯斜面与拇指扣锁示范</text>
            <text x="318" y="846" font-size="11.5" fill="#4f46e5" text-anchor="middle">指根从食指到小指阶梯下滑 · 拇指横扣前下方</text>

            <rect x="612" y="92" width="540" height="372" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="632" y="120" font-size="13.5" font-weight="700" fill="#0284c7">练 1 · 三个 3D 掌盒角度补画「1+2+1 / 1+3」手套分组</text>
            ${renderPolyMeshToSvg(p1, palmStyle)}
            <path d="M652 246 Q710 170 768 240" fill="none" stroke="#10b981" stroke-opacity="0.58" stroke-width="1.5" stroke-dasharray="5 4"/>
            <text x="710" y="424" font-size="11" fill="#059669" text-anchor="middle">① 1+2+1 舒展张手</text>

            ${renderPolyMeshToSvg(p2, palmStyle)}
            <path d="M830 232 Q884 182 938 242" fill="none" stroke="#4f46e5" stroke-opacity="0.55" stroke-width="1.5" stroke-dasharray="5 4"/>
            <text x="882" y="424" font-size="11" fill="#4f46e5" text-anchor="middle">② 1+3 指向手势</text>

            ${renderPolyMeshToSvg(p3, palmStyle)}
            <path d="M998 248 Q1054 196 1110 250" fill="none" stroke="#d97706" stroke-opacity="0.55" stroke-width="1.5" stroke-dasharray="5 4"/>
            <text x="1054" y="424" font-size="11" fill="#d97706" text-anchor="middle">③ 仰角微蜷手势</text>

            <rect x="612" y="488" width="540" height="368" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="632" y="516" font-size="13.5" font-weight="700" fill="#0284c7">练 2 · 互动手势起手掌盒（先画拇指三角座，再切四指）</text>
            ${renderPolyMeshToSvg(s1, palmStyle)}
            <text x="710" y="814" font-size="11" fill="#475569" text-anchor="middle">① 挥手 / 托腮</text>
            ${renderPolyMeshToSvg(s2, palmStyle)}
            <circle cx="886" cy="642" r="22" fill="none" stroke="#6366f1" stroke-opacity="0.4" stroke-dasharray="4 4"/>
            <text x="882" y="814" font-size="11" fill="#475569" text-anchor="middle">② 握持杯子 / 剑柄</text>
            ${renderPolyMeshToSvg(s3, palmStyle)}
            <text x="1054" y="814" font-size="11" fill="#475569" text-anchor="middle">③ 捏取 / 比心</text>
            `
          ),
      };
    }

    // 6. Foot Wedge Structure & Grounded Weight
    case 'tpl-figure-feet': {
      // Exact 3D Front & 3/4 Foot Wedge projected directly into top-center & top-right!
      const camFront = createCamera({ cx: 590, cy: 332, focal: 620, dist: 520, pitch: 12, yaw: 6 });
      const frontFoot = projectPolyMesh(createFootWedgeMesh(), camFront, { tx: 0, ty: -24, tz: 0 });
      const frontShin = projectTaperedCylinder({ rTop: 20, rBot: 18, height: 84, rings: [], xform: { tx: 0, ty: 78, tz: -46 }, cam: camFront });
      const inAnk = camFront.project({ x: -24, y: 44, z: -42 });
      const outAnk = camFront.project({ x: 25, y: 32, z: -48 });

      const cam3Q = createCamera({ cx: 948, cy: 326, focal: 600, dist: 480, pitch: 20, yaw: -42 });
      const qFoot = projectPolyMesh(createFootWedgeMesh(), cam3Q, { tx: 0, ty: -24, tz: 0 });
      const qShin = projectTaperedCylinder({ rTop: 20, rBot: 18, height: 82, rings: [0.5], xform: { tx: 0, ty: 76, tz: -46 }, cam: cam3Q });

      return {
        id: 'tpl-figure-feet',
        kind: 'composite',
        plates: [
          {
            src: './assets/plates/figure/fig6-foot-medial-side.webp',
            x: 82,
            y: 146,
            w: 328,
            h: 256,
            alignY: 'bottom',
            opacity: 0.95,
          },
        ],
        renderScaffoldSvg: () =>
          wrapTemplateSVG(
            'FIGURE-6 · 脚部三角楔形结构与地面透视承重',
            '口诀：脚是带内侧足弓的三角楔子，内踝高外踝低，先在地面踩实脚印再往上长出楔体',
            `
            <!-- Top Half: 3-Angle Wedge Foot Reference -->
            <rect x="48" y="92" width="1104" height="368" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="68" y="120" font-size="13.5" font-weight="700" fill="#0284c7">上区 · 内侧足弓（左）· 3D 正视踝斜角（中）· 3D 3/4 楔形块面（右）</text>
            <line x1="72" y1="402" x2="1126" y2="402" stroke="#94a3b8" stroke-opacity="0.58" stroke-width="1.5"/>
            <text x="246" y="438" font-size="11.5" fill="#059669" text-anchor="middle">内侧视（高长比 1:2.6）：后跟+前掌着地，挑起足弓</text>

            ${renderCylinder(frontShin, { stroke: '#0f172a', strokeWidth: 1.6 })}
            ${renderPolyMeshToSvg(frontFoot, {
              stroke: '#0f172a',
              strokeWidth: 1.7,
              hiddenStroke: '#0284c7',
              hiddenOpacity: 0.24,
              faceFills: { top: { fill: '#e0f2fe', fillOpacity: 0.45 }, toe: { fill: '#dcfce7', fillOpacity: 0.4 } },
            })}
            ${lineEl({ x: inAnk.x - 18, y: inAnk.y - 4 }, { x: outAnk.x + 18, y: outAnk.y + 4 }, 'stroke="#e11d48" stroke-width="2" stroke-dasharray="5 3"')}
            <circle cx="${fmt(inAnk.x)}" cy="${fmt(inAnk.y)}" r="4.5" fill="#e11d48"/>
            <circle cx="${fmt(outAnk.x)}" cy="${fmt(outAnk.y)}" r="4.5" fill="#e11d48"/>
            <text x="590" y="438" font-size="11.5" fill="#e11d48" text-anchor="middle">正视：内踝高、外踝低 · 脚背内厚外薄</text>

            ${renderCylinder(qShin, { stroke: '#0f172a', ringStroke: '#0284c7', strokeWidth: 1.6 })}
            ${renderPolyMeshToSvg(qFoot, {
              stroke: '#0f172a',
              strokeWidth: 1.7,
              hiddenStroke: '#0284c7',
              hiddenOpacity: 0.24,
              faceFills: { top: { fill: '#e0f2fe', fillOpacity: 0.5 }, medial: { fill: '#ffe4e6', fillOpacity: 0.4 }, toe: { fill: '#dcfce7', fillOpacity: 0.45 } },
            })}
            <text x="948" y="438" font-size="11.5" fill="#4f46e5" text-anchor="middle">3/4 视：脚背斜面 + 内侧足弓墙 + 梯形趾盒</text>

            <!-- Bottom Half: Perspective Floor Grid + Sole Footprints Practice -->
            <rect x="48" y="484" width="1104" height="372" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="68" y="512" font-size="13.5" font-weight="700" fill="#0284c7">下区 · 地面透视网格与双脚承重实操（先踩实脚印，再往上长出 3D 楔子）</text>
            <g stroke="#38bdf8" stroke-opacity="0.26" stroke-width="1.2">
              <line x1="90" y1="628" x2="1110" y2="628"/>
              <line x1="76" y1="684" x2="1124" y2="684"/>
              <line x1="64" y1="748" x2="1136" y2="748"/>
              <line x1="56" y1="818" x2="1144" y2="818"/>
              <line x1="280" y1="628" x2="140" y2="836"/>
              <line x1="490" y1="628" x2="430" y2="836"/>
              <line x1="710" y1="628" x2="770" y2="836"/>
              <line x1="920" y1="628" x2="1060" y2="836"/>
            </g>

            <g transform="translate(150, 560)" fill="none">
              <path d="M52 214 C44 182, 58 158, 86 158 C108 158, 114 184, 102 214 C94 234, 60 236, 52 214 Z" fill="#10b981" fill-opacity="0.09" stroke="#059669" stroke-opacity="0.62" stroke-width="1.6" stroke-dasharray="5 4"/>
              <path d="M168 192 C192 178, 224 184, 240 202 C250 214, 232 232, 206 232 C176 232, 152 204, 168 192 Z" fill="#10b981" fill-opacity="0.09" stroke="#059669" stroke-opacity="0.62" stroke-width="1.6" stroke-dasharray="5 4"/>
              <circle cx="80" cy="116" r="14" stroke="#e11d48" stroke-opacity="0.58" stroke-width="1.5"/>
              <circle cx="176" cy="110" r="14" stroke="#e11d48" stroke-opacity="0.58" stroke-width="1.5"/>
              <text x="148" y="276" font-size="11.5" fill="#0284c7" text-anchor="middle">练 1 · 丁字步双脚落地</text>
            </g>

            <g transform="translate(514, 560)" fill="none">
              <ellipse cx="148" cy="212" rx="44" ry="18" fill="#10b981" fill-opacity="0.1" stroke="#059669" stroke-opacity="0.65" stroke-width="1.6" stroke-dasharray="5 4"/>
              <line x1="78" y1="64" x2="78" y2="128" stroke="#4f46e5" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="5 4"/>
              <line x1="78" y1="128" x2="148" y2="212" stroke="#4f46e5" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="5 4"/>
              <circle cx="78" cy="128" r="14" stroke="#e11d48" stroke-opacity="0.6" stroke-width="1.5"/>
              <text x="116" y="276" font-size="11.5" fill="#0284c7" text-anchor="middle">练 2 · 踮脚蹬地（脚跟抬起、前掌折弯）</text>
            </g>

            <g transform="translate(842, 560)" fill="none">
              <path d="M56 218 C64 176, 128 164, 186 174 C216 180, 224 202, 198 220 C158 242, 48 248, 56 218 Z" fill="#10b981" fill-opacity="0.09" stroke="#059669" stroke-opacity="0.62" stroke-width="1.6" stroke-dasharray="5 4"/>
              <circle cx="94" cy="114" r="16" stroke="#e11d48" stroke-opacity="0.58" stroke-width="1.5"/>
              <text x="134" y="276" font-size="11.5" fill="#0284c7" text-anchor="middle">练 3 · 3/4 视角透视楔形脚</text>
            </g>
            `
          ),
      };
    }

    // 7. Core Surface Muscle Interlocking
    case 'tpl-figure-muscles':
      return {
        id: 'tpl-figure-muscles',
        kind: 'composite',
        plates: [
          {
            src: './assets/plates/figure/fig7-muscles-front.webp',
            x: 62,
            y: 138,
            w: 320,
            h: 642,
            alignY: 'center',
            opacity: 0.94,
          },
          {
            src: './assets/plates/figure/fig7-muscles-back.webp',
            x: 436,
            y: 138,
            w: 324,
            h: 642,
            alignY: 'center',
            opacity: 0.94,
          },
          {
            src: './assets/plates/figure/fig3-torso-3q-eggbox.webp',
            x: 840,
            y: 162,
            w: 272,
            h: 590,
            alignY: 'center',
            opacity: 0.34, // Faint underlying 3D egg-box skeleton for tracing muscles over!
          },
        ],
        renderScaffoldSvg: () =>
          wrapTemplateSVG(
            'FIGURE-7 · 躯干与四肢核心肌群起止穿插练习底图',
            '口诀：肌肉是跨关节的橡皮筋——先找锁骨/肩峰/肋弓/髂嵴红点，再叠画肌群穿插',
            `
            <rect x="48" y="92" width="348" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="66" y="120" font-size="13.5" font-weight="700" fill="#0284c7">区 1 · 正面核心肌群示范</text>
            <text x="222" y="810" font-size="11.5" fill="#4f46e5" text-anchor="middle">胸大肌末端钻入三角肌下方止于大臂骨</text>
            <text x="222" y="832" font-size="11.5" fill="#059669" text-anchor="middle">腹直肌收束于耻骨 · 腹外斜肌扣住髂嵴</text>

            <rect x="420" y="92" width="356" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="438" y="120" font-size="13.5" font-weight="700" fill="#0284c7">区 2 · 背面斜方菱形与背阔倒三角</text>
            <text x="598" y="810" font-size="11.5" fill="#4f46e5" text-anchor="middle">斜方肌呈风筝菱形 · 肩胛骨随抬臂旋转</text>
            <text x="598" y="832" font-size="11.5" fill="#059669" text-anchor="middle">背阔肌包绕胸腔拉出上宽下窄倒三角</text>

            <rect x="800" y="92" width="352" height="764" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.34" stroke-dasharray="6 6"/>
            <text x="818" y="120" font-size="13.5" font-weight="700" fill="#4f46e5">区 3 · 淡底 3/4 蛋盒挂肌群实操区</text>
            <text x="976" y="790" font-size="11.5" fill="#4f46e5" text-anchor="middle">直接在浅色 3/4 骨架上勾画：</text>
            <text x="976" y="812" font-size="11" fill="#475569" text-anchor="middle">① 胸锁乳突肌 V 字 ② 胸大肌钻三角肌</text>
            <text x="976" y="832" font-size="11" fill="#475569" text-anchor="middle">③ 腹直肌中线与腹外斜肌扣骨盆</text>
            `
          ),
      };

    // 8. Body Types & Silhouettes Comparison
    case 'tpl-figure-bodytypes':
      return {
        id: 'tpl-figure-bodytypes',
        kind: 'composite',
        plates: [
          {
            src: './assets/plates/figure/fig8-body-male-athletic.webp',
            x: 64,
            y: 152,
            w: 224,
            h: 660,
            alignY: 'bottom',
            opacity: 0.94,
          },
          {
            src: './assets/plates/figure/fig8-body-female-hourglass.webp',
            x: 346,
            y: 204,
            w: 224,
            h: 608,
            alignY: 'bottom',
            opacity: 0.94,
          },
          {
            src: './assets/plates/figure/fig8-body-youth-slender.webp',
            x: 628,
            y: 244,
            w: 224,
            h: 568,
            alignY: 'bottom',
            opacity: 0.94,
          },
        ],
        renderScaffoldSvg: () =>
          wrapTemplateSVG(
            'FIGURE-8 · 不同体型（男女 / 健壮 / 纤细）比例与剪影对比底图',
            '口诀：去细节只看纯黑剪影就能分辨性别与年龄——核心差异在头身比、肩宽、腰位与胯宽',
            `
            <line x1="56" y1="812" x2="1144" y2="812" stroke="#0284c7" stroke-opacity="0.58" stroke-width="1.8"/>

            <rect x="48" y="92" width="256" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="176" y="120" font-size="13" font-weight="700" fill="#0284c7" text-anchor="middle">1 · 健壮男体（8头 · 倒梯形）</text>
            <text x="176" y="140" font-size="11" fill="#475569" text-anchor="middle">肩宽 ≈ 2.2 头 · 胯宽 ≈ 1.4 头</text>
            <line x1="176" y1="152" x2="176" y2="812" stroke="#6366f1" stroke-opacity="0.24" stroke-dasharray="5 5"/>
            <text x="176" y="842" font-size="11" fill="#4f46e5" text-anchor="middle">直线硬朗转折 · 低腰线</text>

            <rect x="330" y="92" width="256" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="458" y="120" font-size="13" font-weight="700" fill="#059669" text-anchor="middle">2 · 标准女体（7头 · 沙漏形）</text>
            <text x="458" y="140" font-size="11" fill="#475569" text-anchor="middle">柔斜肩 ≈ 1.6 头 · 胯宽 ≈ 1.75 头</text>
            <line x1="458" y1="196" x2="458" y2="812" stroke="#10b981" stroke-opacity="0.24" stroke-dasharray="5 5"/>
            <text x="458" y="842" font-size="11" fill="#059669" text-anchor="middle">高腰线 · 柔和 S 曲线</text>

            <rect x="612" y="92" width="256" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
            <text x="740" y="120" font-size="13" font-weight="700" fill="#0284c7" text-anchor="middle">3 · 纤细少年（6.5头 · 修长柱）</text>
            <text x="740" y="140" font-size="11" fill="#475569" text-anchor="middle">头偏大 · 肩胯近等宽 · 四肢细长</text>
            <line x1="740" y1="238" x2="740" y2="812" stroke="#0284c7" stroke-opacity="0.24" stroke-dasharray="5 5"/>
            <text x="740" y="842" font-size="11" fill="#0284c7" text-anchor="middle">关节骨感清晰 · 肌肉起伏平缓</text>

            <rect x="894" y="92" width="258" height="764" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.38" stroke-dasharray="6 6"/>
            <text x="1023" y="120" font-size="13" font-weight="700" fill="#4f46e5" text-anchor="middle">4 · 自由体型剪影设计栏</text>
            <text x="1023" y="140" font-size="11" fill="#475569" text-anchor="middle">尝试壮汉 / 丰腴 / Q版等剪影对比</text>
            <line x1="1023" y1="160" x2="1023" y2="812" stroke="#6366f1" stroke-opacity="0.34" stroke-dasharray="5 5"/>
            <g stroke="#6366f1" stroke-opacity="0.34" stroke-width="1.2">
              <line x1="998" y1="212" x2="1048" y2="212"/>
              <line x1="998" y1="298" x2="1048" y2="298"/>
              <line x1="998" y1="384" x2="1048" y2="384"/>
              <line x1="998" y1="470" x2="1048" y2="470"/>
              <line x1="998" y1="556" x2="1048" y2="556"/>
              <line x1="998" y1="642" x2="1048" y2="642"/>
              <line x1="998" y1="728" x2="1048" y2="728"/>
            </g>
            <rect x="936" y="212" width="174" height="584" rx="10" fill="none" stroke="#38bdf8" stroke-opacity="0.24" stroke-dasharray="4 4"/>
            <text x="1023" y="842" font-size="11" fill="#4f46e5" text-anchor="middle">先用马克笔涂实黑剪影，再切体块</text>
            `
          ),
      };

    default:
      return null;
  }
}

export const FIGURE_TEMPLATE_IDS = [
  'tpl-figure-gesture',
  'tpl-figure-proportions',
  'tpl-figure-torso',
  'tpl-figure-limbs',
  'tpl-figure-hands',
  'tpl-figure-feet',
  'tpl-figure-muscles',
  'tpl-figure-bodytypes',
];
