/**
 * DrawPath Studio · Core Track & Challenge Framing Procedural Generators
 * Replaces all hand-estimated SVGs in core-track.js and challenges-data.js
 * with exact 2D projective homography and 3D camera projection geometry.
 */

import { wrapTemplateSVG, wrapCheatSheetSVG } from '../curriculum/svg-helpers.js';
import {
  createCamera,
  createBoxMesh,
  projectPolyMesh,
  renderPolyMeshToSvg,
  projectTaperedCylinder,
  projectSphere,
  projectGroundShadowFromPoints,
  inscribeEllipseInQuad,
  pointsToSvgPath,
  transformPoint,
  fmt,
} from './math-3d.js';

// ---------------------------------------------------------------------------
// Shared Math SVG Helpers
// ---------------------------------------------------------------------------

function lineEl(a, b, attrs = '') {
  return `<line x1="${fmt(a.x)}" y1="${fmt(a.y)}" x2="${fmt(b.x)}" y2="${fmt(b.y)}" ${attrs}/>`;
}

function dotEl(p, r = 4.2, fill = '#4f46e5', opacity = 0.8) {
  return `<circle cx="${fmt(p.x)}" cy="${fmt(p.y)}" r="${fmt(r)}" fill="${fill}" fill-opacity="${opacity}"/>`;
}

function renderCylinderSvg(cyl, {
  stroke = '#0284c7',
  ringStroke = '#4f46e5',
  strokeWidth = 1.8,
  showAxis = true,
  fillBody = false,
} = {}) {
  const out = [];
  if (showAxis) {
    out.push(
      lineEl(
        cyl.botCenter,
        cyl.topCenter,
        `stroke="#6366f1" stroke-opacity="0.48" stroke-width="1.3" stroke-dasharray="5 4"`
      )
    );
  }
  if (fillBody) {
    const [e1, e2] = cyl.sideEdges;
    const bodyPoly = `M${fmt(e1.a.x)} ${fmt(e1.a.y)} L${fmt(e1.b.x)} ${fmt(e1.b.y)} L${fmt(e2.b.x)} ${fmt(e2.b.y)} L${fmt(e2.a.x)} ${fmt(e2.a.y)} Z`;
    out.push(`<path d="${bodyPoly}" fill="#e0f2fe" fill-opacity="0.28" stroke="none"/>`);
  }

  // Hidden back halves of end caps & intermediate contour rings
  if (!cyl.topCapVisible) {
    for (const d of cyl.topHiddenPaths) {
      out.push(`<path d="${d}" fill="none" stroke="${stroke}" stroke-opacity="0.3" stroke-width="${fmt(strokeWidth * 0.78)}" stroke-dasharray="4 4"/>`);
    }
  }
  if (!cyl.botCapVisible) {
    for (const d of cyl.botHiddenPaths) {
      out.push(`<path d="${d}" fill="none" stroke="${stroke}" stroke-opacity="0.3" stroke-width="${fmt(strokeWidth * 0.78)}" stroke-dasharray="4 4"/>`);
    }
  }
  for (const ring of cyl.midRings) {
    for (const d of ring.hiddenPaths) {
      out.push(`<path d="${d}" fill="none" stroke="${ringStroke}" stroke-opacity="0.22" stroke-width="1.2" stroke-dasharray="3 3"/>`);
    }
  }

  // Exact silhouette tangent edges
  for (const e of cyl.sideEdges) {
    out.push(lineEl(e.a, e.b, `stroke="${stroke}" stroke-width="${fmt(strokeWidth)}" stroke-linecap="round"`));
  }

  // Visible caps & front C-contour rings
  if (cyl.topCapVisible) {
    out.push(`<path d="${cyl.topFullPath}" fill="${fillBody ? '#f0f9ff' : 'none'}" fill-opacity="0.65" stroke="${stroke}" stroke-width="${fmt(strokeWidth)}"/>`);
  } else {
    for (const d of cyl.topVisiblePaths) {
      out.push(`<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${fmt(strokeWidth)}" stroke-linecap="round"/>`);
    }
  }
  if (cyl.botCapVisible) {
    out.push(`<path d="${cyl.botFullPath}" fill="${fillBody ? '#f0f9ff' : 'none'}" fill-opacity="0.65" stroke="${stroke}" stroke-width="${fmt(strokeWidth)}"/>`);
  } else {
    for (const d of cyl.botVisiblePaths) {
      out.push(`<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${fmt(strokeWidth)}" stroke-linecap="round"/>`);
    }
  }
  for (const ring of cyl.midRings) {
    for (const d of ring.visiblePaths) {
      out.push(`<path d="${d}" fill="none" stroke="${ringStroke}" stroke-opacity="0.82" stroke-width="${fmt(strokeWidth * 0.95)}" stroke-linecap="round"/>`);
    }
  }
  return out.join('\n');
}

function renderSphereSvg(sph, {
  outlineStroke = '#0284c7',
  gridStroke = '#10b981',
  strokeWidth = 1.8,
  showPole = true,
  fill = 'none',
  terminatorStroke = null,
} = {}) {
  const out = [];
  if (sph.shadowPathD) {
    out.push(`<path d="${sph.shadowPathD}" fill="#64748b" fill-opacity="0.2" stroke="#6366f1" stroke-opacity="0.45" stroke-width="1.4" stroke-dasharray="5 4"/>`);
  }
  out.push(
    `<circle cx="${fmt(sph.center.x)}" cy="${fmt(sph.center.y)}" r="${fmt(sph.apparentRadius)}" fill="${fill}" stroke="${outlineStroke}" stroke-width="${fmt(strokeWidth)}"/>`
  );
  for (const c of [...sph.latCurves, ...sph.lonCurves]) {
    for (const d of c.hiddenPaths) {
      out.push(`<path d="${d}" fill="none" stroke="${gridStroke}" stroke-opacity="0.22" stroke-width="1.2" stroke-dasharray="4 4"/>`);
    }
    for (const d of c.visiblePaths) {
      out.push(`<path d="${d}" fill="none" stroke="${gridStroke}" stroke-opacity="0.78" stroke-width="${fmt(strokeWidth * 0.9)}" stroke-linecap="round"/>`);
    }
  }
  if (sph.terminator && terminatorStroke) {
    for (const d of sph.terminator.visiblePaths) {
      out.push(`<path d="${d}" fill="none" stroke="${terminatorStroke}" stroke-width="${fmt(strokeWidth * 1.15)}" stroke-dasharray="6 4" stroke-linecap="round"/>`);
    }
  }
  if (showPole && sph.pole.visible) {
    out.push(dotEl(sph.pole, 4.5, gridStroke, 0.88));
  }
  return out.join('\n');
}

/** Intersects line (a1->a2) with line (b1->b2) in 2D. */
function intersect2D(a1, a2, b1, b2) {
  const x1 = a1.x, y1 = a1.y, x2 = a2.x, y2 = a2.y;
  const x3 = b1.x, y3 = b1.y, x4 = b2.x, y4 = b2.y;
  const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denom) < 1e-9) return { x: (a1.x + b1.x) / 2, y: (a1.y + b1.y) / 2 };
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
  return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
}

function lerp2D(a, b, t) {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

/** Builds an exact 2-point perspective box given front vertical edge (top, bot), left/right VPs, and depth ratios. */
function build2PtBox(vpL, vpR, frontX, topY, botY, depthL = 0.24, depthR = 0.24) {
  const fT = { x: frontX, y: topY };
  const fB = { x: frontX, y: botY };
  const lT = lerp2D(fT, vpL, depthL);
  const lB = { x: lT.x, y: intersect2D(fB, vpL, lT, { x: lT.x, y: lT.y + 100 }).y };
  const rT = lerp2D(fT, vpR, depthR);
  const rB = { x: rT.x, y: intersect2D(fB, vpR, rT, { x: rT.x, y: rT.y + 100 }).y };
  const bT = intersect2D(lT, vpR, rT, vpL);
  const bB = intersect2D(lB, vpR, rB, vpL);
  return { fT, fB, lT, lB, rT, rB, bT, bB };
}

function createChamferedBoxMesh(w = 110, h = 110, d = 110, cut = 38) {
  // Cuts top-front-right corner cleanly with an exact planar chamfer face
  const hw = w / 2, hh = h / 2, hd = d / 2;
  const vertices = [
    { x: -hw, y: -hh, z: -hd },        // 0: L B Back
    { x: hw, y: -hh, z: -hd },         // 1: R B Back
    { x: hw, y: hh, z: -hd },          // 2: R T Back
    { x: -hw, y: hh, z: -hd },         // 3: L T Back
    { x: -hw, y: -hh, z: hd },         // 4: L B Front
    { x: hw, y: -hh, z: hd },          // 5: R B Front
    { x: -hw, y: hh, z: hd },          // 6: L T Front
    // 3 chamfer vertices replacing (hw, hh, hd)
    { x: hw - cut, y: hh, z: hd },     // 7: top-front cut
    { x: hw, y: hh, z: hd - cut },     // 8: top-right cut
    { x: hw, y: hh - cut, z: hd },     // 9: front-right cut
  ];
  const faces = [
    { name: 'front', indices: [4, 5, 9, 7, 6] },
    { name: 'back', indices: [1, 0, 3, 2] },
    { name: 'right', indices: [5, 1, 2, 8, 9] },
    { name: 'left', indices: [0, 4, 6, 3] },
    { name: 'top', indices: [6, 7, 8, 2, 3] },
    { name: 'bottom', indices: [0, 1, 5, 4] },
    { name: 'chamfer', tone: 'chamfer', indices: [7, 9, 8] },
  ];
  return { vertices, faces };
}

// ---------------------------------------------------------------------------
// CORE PRACTICE TEMPLATES (1200x900 Exact Procedural Worksheets)
// ---------------------------------------------------------------------------

export function generateCoreLinesTemplate() {
  const rows = [
    { y: 156, x2: 290 },
    { y: 200, x2: 400 },
    { y: 244, x2: 548 },
    { y: 292, x2: 548 },
    { y: 340, x2: 548 },
    { y: 388, x2: 548 },
  ];
  const rowLines = rows
    .map((r) => `<line x1="80" y1="${r.y}" x2="${r.x2}" y2="${r.y}"/>`)
    .join('\n');
  const rowDots = rows
    .map((r) => `<circle cx="80" cy="${r.y}" r="4.5"/><circle cx="${r.x2}" cy="${r.y}" r="4.5"/>`)
    .join('\n');

  // Zone 2 exact star-grid centered at (882, 282), radius 150/230
  const starCx = 882, starCy = 282;
  const starAngles = [0, 30, 60, 90, 120, 150];
  const starLines = [];
  const starDots = [];
  for (const deg of starAngles) {
    const rad = (deg * Math.PI) / 180;
    const rx = deg === 90 ? 136 : deg === 0 ? 228 : 196;
    const ry = deg === 90 ? 136 : 134;
    const dx = Math.cos(rad) * rx;
    const dy = Math.sin(rad) * ry;
    const p1 = { x: starCx - dx, y: starCy - dy };
    const p2 = { x: starCx + dx, y: starCy + dy };
    starLines.push(lineEl(p1, p2));
    starDots.push(dotEl(p1, 4.2, '#0284c7', 0.65), dotEl(p2, 4.2, '#0284c7', 0.65));
  }

  // Zone 3 faint spacing ticks for parallel lines
  const vTicks = Array.from({ length: 7 }, (_, i) => 110 + (i + 1) * 32)
    .map((x) => `<line x1="${x}" y1="538" x2="${x}" y2="552" stroke="#0ea5e9" stroke-opacity="0.35" stroke-width="1.3"/>`)
    .join('');

  return wrapTemplateSVG(
    'CORE-1 · 握笔姿势与定点长直线靶纸',
    '口诀：锁定手腕用手肘带动笔尖 · 悬空预演 2 次 · 眼盯终点一笔拉通',
    `
    <rect x="48" y="92" width="540" height="360" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
    <text x="66" y="118" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.82">区 1 · 短/中/长水平定点连线（一笔穿过两圆点）</text>
    <g stroke="#38bdf8" stroke-opacity="0.36" stroke-width="1.4" stroke-dasharray="5 5">${rowLines}</g>
    <g fill="#4f46e5" fill-opacity="0.68">${rowDots}</g>

    <rect x="612" y="92" width="540" height="360" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-dasharray="6 6"/>
    <text x="630" y="118" font-size="13" font-weight="700" fill="#4f46e5" fill-opacity="0.82">区 2 · 30° 步进米字格斜向长直线（测试顺手发力角）</text>
    <g stroke="#6366f1" stroke-opacity="0.34" stroke-width="1.35" stroke-dasharray="5 5">${starLines.join('\n')}</g>
    ${starDots.join('\n')}
    <circle cx="${starCx}" cy="${starCy}" r="3.5" fill="#4f46e5" fill-opacity="0.5"/>

    <rect x="48" y="476" width="1104" height="380" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3"/>
    <text x="66" y="504" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.82">区 3 · 垂直线与等距平行排线挑战（先沿深蓝基准线，再向右/下平行复制 8 条）</text>
    <g stroke="#0284c7" stroke-opacity="0.62" stroke-width="2.1">
      <line x1="110" y1="538" x2="110" y2="818"/>
      <line x1="410" y1="538" x2="520" y2="818"/>
      <line x1="740" y1="558" x2="1100" y2="558"/>
    </g>
    ${vTicks}
    <g font-size="11.5" fill="#475569" fill-opacity="0.78">
      <text x="150" y="685">→ 间隔 32px 向右复制平行竖线</text>
      <text x="515" y="685">→ 保持相同倾角复制平行斜线</text>
      <text x="920" y="605" text-anchor="middle">↓ 向下等距复制 8 条平行水平线</text>
    </g>
    `
  );
}

export function generateCoreCurvesTemplate() {
  const envelopes = [
    { y: 170, amp: 18 },
    { y: 226, amp: 22 },
    { y: 282, amp: 16 },
  ]
    .map(
      (e) =>
        `<path d="M85 ${e.y} Q600 ${e.y - e.amp} 1115 ${e.y} Q600 ${e.y + e.amp} 85 ${e.y} Z"/>`
    )
    .join('\n');

  const cArcs = [
    { x1: 100, y1: 582, x2: 340, y2: 582, h: 74 },
    { x1: 90, y1: 668, x2: 430, y2: 668, h: 108 },
    { x1: 80, y1: 768, x2: 525, y2: 768, h: 144 },
  ];
  const cPaths = cArcs
    .map(
      (a) =>
        `<path d="M${a.x1} ${a.y1} C${fmt(a.x1 + (a.x2 - a.x1) * 0.25)} ${a.y1 - a.h}, ${fmt(a.x2 - (a.x2 - a.x1) * 0.25)} ${a.y1 - a.h}, ${a.x2} ${a.y2}"/>`
    )
    .join('\n');
  const cDots = cArcs
    .map((a) => `<circle cx="${a.x1}" cy="${a.y1}" r="4"/><circle cx="${a.x2}" cy="${a.y2}" r="4"/>`)
    .join('\n');

  return wrapTemplateSVG(
    'CORE-2 · 压感轻重渐变线与 C/S 弧线靶纸',
    '口诀：空中入笔轻 → 中段加压实 → 顺势抬笔收尖 · C/S 弧线一气呵成',
    `
    <rect x="48" y="92" width="1104" height="330" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-dasharray="6 6"/>
    <text x="66" y="118" font-size="13" font-weight="700" fill="#4f46e5" fill-opacity="0.82">区 1 ·「轻 - 重 - 轻」压感控制跑道（用 G 笔或铅笔沿包络线拉出两端尖、中段实的渐变线）</text>
    <g stroke="#6366f1" stroke-opacity="0.38" stroke-width="1.35" fill="#6366f1" fill-opacity="0.06">
      ${envelopes}
      <path d="M85 338 Q350 322 600 338 Q850 354 1115 338" fill="none" stroke-dasharray="5 5"/>
    </g>
    <text x="100" y="388" font-size="11.5" fill="#4f46e5" fill-opacity="0.78">轻起笔 →</text>
    <text x="600" y="388" font-size="11.5" fill="#4f46e5" fill-opacity="0.82" text-anchor="middle">▲ 中段最重实（压力 ~70%）</text>
    <text x="1100" y="388" font-size="11.5" fill="#4f46e5" fill-opacity="0.78" text-anchor="end">→ 空中顺势收尖</text>

    <rect x="48" y="446" width="536" height="410" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3"/>
    <text x="66" y="474" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.82">区 2 · C 形顺手弧线轨道（由小到大扫弧）</text>
    <g stroke="#0284c7" stroke-opacity="0.52" stroke-width="1.8" fill="none" stroke-dasharray="6 5">${cPaths}</g>
    <g fill="#0284c7" fill-opacity="0.65">${cDots}</g>

    <rect x="616" y="446" width="536" height="410" rx="12" fill="none" stroke="#10b981" stroke-opacity="0.3"/>
    <text x="634" y="474" font-size="13" font-weight="700" fill="#059669" fill-opacity="0.82">区 3 · S 形波浪流线（经过绿点拐点时顺畅换向）</text>
    <g stroke="#10b981" stroke-opacity="0.52" stroke-width="1.8" fill="none" stroke-dasharray="6 5">
      <path d="M665 556 C740 486, 810 626, 885 556 C960 486, 1030 626, 1105 556"/>
      <path d="M685 785 C670 700, 800 665, 825 588"/>
      <path d="M915 808 C1018 765, 950 660, 1085 620"/>
    </g>
    <g fill="#059669" fill-opacity="0.72">
      <circle cx="775" cy="556" r="4.5"/><circle cx="995" cy="556" r="4.5"/>
      <circle cx="755" cy="684" r="4.5"/><circle cx="998" cy="712" r="4.5"/>
    </g>
    `
  );
}

export function generateCoreCirclesTemplate() {
  // Zone 2: exact degree ellipses rx = ry * sin(deg), spaced cleanly with zero overlap
  const degreeItems = [
    { x: 664, deg: 15, label: '15° 极扁' },
    { x: 768, deg: 30, label: '30° 微斜' },
    { x: 896, deg: 50, label: '50° 半开' },
    { x: 1054, deg: 75, label: '75° 近圆' },
  ];
  const ry = 74;
  const degreeSvg = degreeItems
    .map((item) => {
      const rx = ry * Math.sin((item.deg * Math.PI) / 180);
      return `
        <line x1="${item.x}" y1="184" x2="${item.x}" y2="368" stroke="#6366f1" stroke-opacity="0.24" stroke-width="1.2"/>
        <ellipse cx="${item.x}" cy="276" rx="${fmt(rx)}" ry="${ry}" fill="none" stroke="#4f46e5" stroke-opacity="0.55" stroke-width="1.6" stroke-dasharray="4 4"/>
        <text x="${item.x}" y="414" font-size="11" fill="#4f46e5" fill-opacity="0.78" text-anchor="middle">${item.label}</text>
      `;
    })
    .join('\n');

  // Zone 3: Exact Projective Homography Inscribed Ellipses in 3 arbitrary perspective quads!
  const quads = [
    {
      pts: [
        { x: 756, y: 586 },
        { x: 938, y: 586 },
        { x: 826, y: 672 },
        { x: 632, y: 672 },
      ],
      showEllipse: true,
    },
    {
      pts: [
        { x: 974, y: 556 },
        { x: 1114, y: 522 },
        { x: 1114, y: 754 },
        { x: 974, y: 712 },
      ],
      showEllipse: true,
    },
    {
      pts: [
        { x: 760, y: 726 },
        { x: 938, y: 726 },
        { x: 820, y: 816 },
        { x: 632, y: 816 },
      ],
      showEllipse: false, // Practice quad: shows exact diagonal center + 4 tangent dots only!
    },
  ];

  const quadSvg = quads
    .map((q) => {
      const [p0, p1, p2, p3] = q.pts;
      const inscribed = inscribeEllipseInQuad(p0, p1, p2, p3, 72);
      const quadPoly = pointsToSvgPath(q.pts, true);
      const tangDots = inscribed.tangents.map((t) => dotEl(t, 3.2, '#e11d48', 0.72)).join('');
      return `
        <path d="${quadPoly}" fill="none" stroke="#0284c7" stroke-opacity="0.56" stroke-width="1.6"/>
        ${lineEl(p0, p2, 'stroke="#0284c7" stroke-opacity="0.28" stroke-width="1.1" stroke-dasharray="4 4"')}
        ${lineEl(p1, p3, 'stroke="#0284c7" stroke-opacity="0.28" stroke-width="1.1" stroke-dasharray="4 4"')}
        ${lineEl(inscribed.tangents[0], inscribed.tangents[2], 'stroke="#6366f1" stroke-opacity="0.22" stroke-width="1" stroke-dasharray="3 3"')}
        ${lineEl(inscribed.tangents[1], inscribed.tangents[3], 'stroke="#6366f1" stroke-opacity="0.22" stroke-width="1" stroke-dasharray="3 3"')}
        ${q.showEllipse ? `<path d="${inscribed.pathD}" fill="none" stroke="#4f46e5" stroke-opacity="0.72" stroke-width="1.7" stroke-dasharray="5 4"/>` : ''}
        ${tangDots}
        ${dotEl(inscribed.center, 3.4, '#4f46e5', 0.65)}
      `;
    })
    .join('\n');

  return wrapTemplateSVG(
    'CORE-3 · 透视椭圆与一笔封口圆练习纸（精确射影切圆）',
    '口诀：长短轴严格十字垂直 90° · 椭圆两端圆润饱满 · 切点严格落在四边透视中点',
    `
    <rect x="48" y="92" width="516" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
    <text x="66" y="118" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.82">区 1 · 一笔画封口正圆阵（空画两圈顺势落笔）</text>
    <g stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.6" fill="none">
      <circle cx="155" cy="220" r="76" stroke-dasharray="5 5"/><line x1="155" y1="138" x2="155" y2="302" stroke-opacity="0.24"/><line x1="73" y1="220" x2="237" y2="220" stroke-opacity="0.24"/>
      <circle cx="345" cy="220" r="76" stroke-dasharray="5 5"/><line x1="345" y1="138" x2="345" y2="302" stroke-opacity="0.24"/><line x1="263" y1="220" x2="427" y2="220" stroke-opacity="0.24"/>
      <circle cx="495" cy="220" r="46" stroke-dasharray="5 5"/>
      <circle cx="155" cy="405" r="76" stroke-dasharray="5 5"/>
      <circle cx="345" cy="405" r="76" stroke-dasharray="5 5"/>
      <circle cx="495" cy="405" r="46" stroke-dasharray="5 5"/>
    </g>
    <path d="M155 144 A76 76 0 0 1 200 158" stroke="#4f46e5" stroke-opacity="0.72" stroke-width="2" fill="none" marker-end="url(#tpl-arrow-indigo)"/>
    <rect x="74" y="535" width="464" height="295" rx="10" fill="none" stroke="#38bdf8" stroke-opacity="0.28"/>
    <text x="306" y="562" font-size="11.5" fill="#475569" fill-opacity="0.78" text-anchor="middle">空白盲画区：不靠参考虚线画 6 个封口正圆</text>

    <rect x="592" y="92" width="560" height="360" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-dasharray="6 6"/>
    <text x="610" y="118" font-size="13" font-weight="700" fill="#4f46e5" fill-opacity="0.82">区 2 · 渐进椭圆度数阵（短轴严格等于 R·sin θ）</text>
    <line x1="620" y1="276" x2="1124" y2="276" stroke="#6366f1" stroke-opacity="0.24" stroke-width="1.2"/>
    ${degreeSvg}

    <rect x="592" y="476" width="560" height="380" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
    <text x="610" y="504" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.82">区 3 · 透视四边形精确内切椭圆（红点为四边精确切点）</text>
    ${quadSvg}
    <text x="634" y="842" font-size="11.5" fill="#475569" fill-opacity="0.78">▲ 在下方透视方框内顺着 4 个红点切出精确内切透视椭圆</text>
    `
  );
}

export function generateCoreFormsTemplate() {
  // Cube adjacency lookup for picking true nearest front 3D Y / inverted-Y starter corner
  const BOX_ADJ = {
    0: [1, 3, 4], 1: [0, 2, 5], 2: [1, 3, 6], 3: [0, 2, 7],
    4: [0, 5, 7], 5: [1, 4, 6], 6: [2, 5, 7], 7: [3, 4, 6],
  };
  const renderNearestYStarter = (projectedBox, candidateIndices) => {
    let bestIdx = candidateIndices[0];
    for (const idx of candidateIndices) {
      if (projectedBox.projVerts[idx].depth < projectedBox.projVerts[bestIdx].depth) {
        bestIdx = idx;
      }
    }
    const center = projectedBox.projVerts[bestIdx];
    return BOX_ADJ[bestIdx]
      .map((nb) => lineEl(center, projectedBox.projVerts[nb], 'stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round"'))
      .join('');
  };

  // Column 1: Exact 3D Boxes (top-down demo + upright Y starter + bottom-up inverted Y starter)
  const boxMesh = createBoxMesh(92, 92, 92);
  const camBox1 = createCamera({ cx: 223, cy: 224, focal: 640, dist: 540, pitch: 24, yaw: 34 });
  const box1 = projectPolyMesh(boxMesh, camBox1);
  const box1Svg = renderPolyMeshToSvg(box1, {
    stroke: '#4f46e5',
    strokeWidth: 1.8,
    hiddenStroke: '#4f46e5',
    hiddenOpacity: 0.3,
    faceFills: {
      top: { fill: '#e0e7ff', fillOpacity: 0.35 },
      front: { fill: '#eef2ff', fillOpacity: 0.22 },
      left: { fill: '#c7d2fe', fillOpacity: 0.28 },
    },
  });

  // Starter Box 2: Top-down upright Y (true nearest top vertex -> 3 obtuse angles > 90°)
  const camBox2 = createCamera({ cx: 223, cy: 465, focal: 620, dist: 520, pitch: 22, yaw: -38 });
  const box2 = projectPolyMesh(createBoxMesh(94, 94, 94), camBox2);
  const y2Edges = renderNearestYStarter(box2, [2, 3, 6, 7]);

  // Starter Box 3: Bottom-up inverted Y (true nearest bottom vertex -> exposes bottom face)
  const camBox3 = createCamera({ cx: 223, cy: 695, focal: 620, dist: 520, pitch: -22, yaw: 32 });
  const box3 = projectPolyMesh(createBoxMesh(94, 94, 94), camBox3);
  const y3Edges = renderNearestYStarter(box3, [0, 1, 4, 5]);

  // Column 2: Exact 3D Tilted Cylinders with True Tangents & Front/Back C-Contour Rings
  const camCyl1 = createCamera({ cx: 600, cy: 250, focal: 660, dist: 540, pitch: 18, yaw: 20 });
  const cyl1 = projectTaperedCylinder({
    rTop: 42,
    rBot: 42,
    height: 154,
    rings: [0.33, 0.67],
    xform: { rx: 14, rz: -42 },
    cam: camCyl1,
  });

  const camCyl2 = createCamera({ cx: 600, cy: 486, focal: 660, dist: 540, pitch: 10, yaw: -12 });
  const cyl2 = projectTaperedCylinder({
    rTop: 34,
    rBot: 34,
    height: 170,
    rings: [],
    xform: { rx: -10, rz: 74 },
    cam: camCyl2,
  });
  // For Practice Cylinder 2, only render axis + starting cap ellipse so user completes the body!
  const cyl2Starter = `
    ${lineEl(cyl2.botCenter, cyl2.topCenter, 'stroke="#6366f1" stroke-opacity="0.58" stroke-width="1.6" stroke-dasharray="5 4"')}
    <path d="${cyl2.topFullPath}" fill="#e0f2fe" fill-opacity="0.22" stroke="#0284c7" stroke-width="1.8"/>
    ${dotEl(cyl2.botCenter, 4, '#4f46e5', 0.65)}
  `;

  const camCyl3 = createCamera({ cx: 600, cy: 716, focal: 660, dist: 540, pitch: 22, yaw: 16 });
  const cyl3 = projectTaperedCylinder({
    rTop: 40,
    rBot: 46,
    height: 150,
    rings: [],
    xform: { rx: 16, rz: 24 },
    cam: camCyl3,
  });
  const cyl3Starter = `
    ${lineEl(cyl3.botCenter, cyl3.topCenter, 'stroke="#6366f1" stroke-opacity="0.58" stroke-width="1.6" stroke-dasharray="5 4"')}
    <path d="${cyl3.topFullPath}" fill="#e0f2fe" fill-opacity="0.22" stroke="#0284c7" stroke-width="1.8"/>
    ${dotEl(cyl3.botCenter, 4, '#4f46e5', 0.65)}
  `;

  // Column 3: Exact 3D Spheres with True Great-Circle Meridians & Parallels
  const camSph1 = createCamera({ cx: 977, cy: 242, focal: 680, dist: 560 });
  const sph1 = projectSphere({ radius: 78, xform: { rx: -18, ry: 28 }, cam: camSph1, latitudes: [0], longitudes: [0] });

  const camSph2 = createCamera({ cx: 977, cy: 482, focal: 680, dist: 560 });
  const sph2 = projectSphere({ radius: 78, xform: { rx: -24, ry: -32 }, cam: camSph2, latitudes: [], longitudes: [] });

  const camSph3 = createCamera({ cx: 977, cy: 720, focal: 680, dist: 560 });
  const sph3 = projectSphere({ radius: 78, xform: { rx: 24, ry: 32 }, cam: camSph3, latitudes: [], longitudes: [] });

  return wrapTemplateSVG(
    'CORE-4 · 2D 转 3D：方体、圆柱与球体朝向骨架（精确 3D 投影）',
    '口诀：Y字三棱夹角均大于 90° · 画出背面透视 X 光线防扭曲 · C字绕线贴合圆柱曲面',
    `
    <rect x="48" y="92" width="350" height="764" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-dasharray="6 6"/>
    <text x="66" y="118" font-size="13" font-weight="700" fill="#4f46e5" fill-opacity="0.82">一 · 方体 Y 字起手与透视 X 光线</text>
    ${box1Svg}
    <text x="223" y="346" font-size="11" fill="#4f46e5" fill-opacity="0.78" text-anchor="middle">示范：真实 3D 俯视方体 + 透明背面棱</text>
    ${y2Edges}
    <text x="223" y="566" font-size="11" fill="#4f46e5" fill-opacity="0.78" text-anchor="middle">练 1 · 俯视 Y 起手（补全外轮廓与背面 X 光线）</text>
    ${y3Edges}
    <text x="223" y="806" font-size="11" fill="#4f46e5" fill-opacity="0.78" text-anchor="middle">练 2 · 倒 Y 仰视起手（补全露出的底面）</text>

    <rect x="425" y="92" width="350" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
    <text x="443" y="118" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.82">二 · 圆柱体中心轴、真切线与 C 型绕线</text>
    ${renderCylinderSvg(cyl1, { fillBody: true })}
    <text x="600" y="362" font-size="11" fill="#0284c7" fill-opacity="0.78" text-anchor="middle">示范：侧边精准切于两端椭圆 + 2 道 C 绕线</text>
    ${cyl2Starter}
    <text x="600" y="568" font-size="11" fill="#0284c7" fill-opacity="0.78" text-anchor="middle">练 1 · 沿斜轴拉出切线侧边、远端椭圆与 3 道绕线</text>
    ${cyl3Starter}
    <text x="600" y="822" font-size="11" fill="#0284c7" fill-opacity="0.78" text-anchor="middle">练 2 · 画出近大远小斜置圆柱体与 C 型绕线</text>

    <rect x="802" y="92" width="350" height="764" rx="12" fill="none" stroke="#10b981" stroke-opacity="0.3" stroke-dasharray="6 6"/>
    <text x="820" y="118" font-size="13" font-weight="700" fill="#059669" fill-opacity="0.82">三 · 球体经纬十字线（转向定位）</text>
    ${renderSphereSvg(sph1, { fill: '#f0fdf4' })}
    <text x="977" y="352" font-size="11" fill="#059669" fill-opacity="0.78" text-anchor="middle">示范：经纬弧线贴球面包裹，绿点即朝向极点</text>
    ${renderSphereSvg(sph2)}
    <text x="977" y="592" font-size="11" fill="#059669" fill-opacity="0.78" text-anchor="middle">练 1 · 画出让交点朝「左上方」的经纬十字弧</text>
    ${renderSphereSvg(sph3)}
    <text x="977" y="832" font-size="11" fill="#059669" fill-opacity="0.78" text-anchor="middle">练 2 · 画出让交点朝「右下方」的经纬十字弧</text>
    `
  );
}

export function generateCorePerspectiveTemplate() {
  // Zone 1: Exact 1-point perspective (VP at 600, 256)
  const vp1 = { x: 600, y: 256 };
  const rayTargets1 = [
    { x: 68, y: 108 }, { x: 280, y: 98 }, { x: 920, y: 98 }, { x: 1132, y: 108 },
    { x: 68, y: 438 }, { x: 320, y: 444 }, { x: 880, y: 444 }, { x: 1132, y: 438 },
  ];
  const rays1Svg = rayTargets1
    .map((pt) => lineEl(vp1, pt, 'stroke="#38bdf8" stroke-opacity="0.26" stroke-width="1.2"'))
    .join('\n');

  // Demo completed 1-pt box on left (below HL -> exposes top face)
  const demoRect = { x: 120, y: 318, w: 124, h: 92 };
  const c0 = { x: demoRect.x, y: demoRect.y };
  const c1 = { x: demoRect.x + demoRect.w, y: demoRect.y };
  const c2 = { x: demoRect.x + demoRect.w, y: demoRect.y + demoRect.h };
  const c3 = { x: demoRect.x, y: demoRect.y + demoRect.h };
  const d0 = lerp2D(c0, vp1, 0.28);
  const d1 = lerp2D(c1, vp1, 0.28);
  const d2 = lerp2D(c2, vp1, 0.28);
  const d3 = lerp2D(c3, vp1, 0.28);
  const demo1PtSvg = `
    <path d="${pointsToSvgPath([c0, c1, d1, d0], true)}" fill="#e0f2fe" fill-opacity="0.4" stroke="#0284c7" stroke-width="1.6"/>
    <path d="${pointsToSvgPath([c1, c2, d2, d1], true)}" fill="#bae6fd" fill-opacity="0.28" stroke="#0284c7" stroke-width="1.6"/>
    <rect x="${demoRect.x}" y="${demoRect.y}" width="${demoRect.w}" height="${demoRect.h}" fill="none" stroke="#0284c7" stroke-width="2"/>
    ${lineEl(c3, d3, 'stroke="#0284c7" stroke-opacity="0.3" stroke-dasharray="4 4"')}
    ${lineEl(d0, d3, 'stroke="#0284c7" stroke-opacity="0.3" stroke-dasharray="4 4"')}
    ${lineEl(d3, d2, 'stroke="#0284c7" stroke-opacity="0.3" stroke-dasharray="4 4"')}
  `;

  // Zone 2: Exact 2-point perspective (VP1 = 92, 652; VP2 = 1108, 652)
  const vpL = { x: 92, y: 652 };
  const vpR = { x: 1108, y: 652 };
  const rays2Svg = [498, 574, 730, 836]
    .map(
      (y) =>
        lineEl(vpL, { x: 980, y }, 'stroke="#38bdf8" stroke-opacity="0.22" stroke-width="1.15"') +
        lineEl(vpR, { x: 220, y }, 'stroke="#38bdf8" stroke-opacity="0.22" stroke-width="1.15"')
    )
    .join('\n');

  // Exact completed demo 2-pt box at x=600 straddling HL
  const demo2 = build2PtBox(vpL, vpR, 600, 588, 720, 0.2, 0.2);
  const demo2Svg = `
    <path d="${pointsToSvgPath([demo2.fT, demo2.lT, demo2.lB, demo2.fB], true)}" fill="#e0e7ff" fill-opacity="0.32" stroke="#4f46e5" stroke-width="1.8"/>
    <path d="${pointsToSvgPath([demo2.fT, demo2.rT, demo2.rB, demo2.fB], true)}" fill="#c7d2fe" fill-opacity="0.24" stroke="#4f46e5" stroke-width="1.8"/>
    ${lineEl(demo2.lT, demo2.bT, 'stroke="#4f46e5" stroke-opacity="0.28" stroke-dasharray="4 4"')}
    ${lineEl(demo2.rT, demo2.bT, 'stroke="#4f46e5" stroke-opacity="0.28" stroke-dasharray="4 4"')}
    ${lineEl(demo2.lB, demo2.bB, 'stroke="#4f46e5" stroke-opacity="0.28" stroke-dasharray="4 4"')}
    ${lineEl(demo2.rB, demo2.bB, 'stroke="#4f46e5" stroke-opacity="0.28" stroke-dasharray="4 4"')}
    ${lineEl(demo2.bT, demo2.bB, 'stroke="#4f46e5" stroke-opacity="0.28" stroke-dasharray="4 4"')}
  `;

  return wrapTemplateSVG(
    'CORE-5 · 一点透视 & 两点透视空间射线网格（精确灭点推导）',
    '口诀：高于视平线露底面 · 低于视平线露顶面 · 竖直棱始终保持 90° 垂直',
    `
    <rect x="48" y="92" width="1104" height="360" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3"/>
    <text x="64" y="118" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.82">区 1 · 一点透视（纵深边全部收向中心灭点 VP）</text>
    <line x1="60" y1="256" x2="1140" y2="256" stroke="#4f46e5" stroke-opacity="0.62" stroke-width="1.6"/>
    <text x="70" y="248" font-size="11" fill="#4f46e5">视平线 HL</text>
    ${rays1Svg}
    ${demo1PtSvg}
    <text x="182" y="428" font-size="11" fill="#0284c7" text-anchor="middle">示范：低于视平线露顶面</text>
    <circle cx="${vp1.x}" cy="${vp1.y}" r="5.5" fill="#4f46e5"/>
    <text x="${vp1.x}" y="${vp1.y - 12}" font-size="11" font-weight="700" fill="#4f46e5" text-anchor="middle">中心灭点 VP</text>
    <g stroke="#0284c7" stroke-opacity="0.65" stroke-width="1.9" fill="none">
      <rect x="330" y="132" width="118" height="78"/>
      <rect x="895" y="206" width="136" height="98"/>
      <rect x="740" y="316" width="132" height="90"/>
    </g>
    <text x="389" y="124" font-size="11" fill="#0284c7" text-anchor="middle">练 1 · 高于视平线（补底面）</text>
    <text x="963" y="198" font-size="11" fill="#0284c7" text-anchor="middle">练 2 · 跨视平线（仅露侧面）</text>
    <text x="806" y="424" font-size="11" fill="#0284c7" text-anchor="middle">练 3 · 低于视平线（补顶面）</text>

    <rect x="48" y="476" width="1104" height="380" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.3"/>
    <text x="64" y="504" font-size="13" font-weight="700" fill="#4f46e5" fill-opacity="0.82">区 2 · 两点透视（左右横边严密飞向 VP1 与 VP2，竖棱永远垂直）</text>
    <line x1="60" y1="652" x2="1140" y2="652" stroke="#4f46e5" stroke-opacity="0.62" stroke-width="1.6"/>
    ${rays2Svg}
    ${demo2Svg}
    <circle cx="${vpL.x}" cy="${vpL.y}" r="5.5" fill="#4f46e5"/><text x="${vpL.x}" y="638" font-size="11" font-weight="700" fill="#4f46e5" text-anchor="middle">左灭点 VP1</text>
    <circle cx="${vpR.x}" cy="${vpR.y}" r="5.5" fill="#4f46e5"/><text x="${vpR.x}" y="638" font-size="11" font-weight="700" fill="#4f46e5" text-anchor="middle">右灭点 VP2</text>
    <line x1="335" y1="518" x2="335" y2="594" stroke="#0284c7" stroke-width="2.5"/>
    <line x1="855" y1="712" x2="855" y2="812" stroke="#0284c7" stroke-width="2.5"/>
    <text x="335" y="612" font-size="11" fill="#0284c7" text-anchor="middle">练 1 · 仰视竖棱（连向 VP1/VP2 露底面）</text>
    <text x="600" y="746" font-size="11" fill="#4f46e5" text-anchor="middle">示范 · 平视方体（左右边严密收向两灭点）</text>
    <text x="855" y="832" font-size="11" fill="#0284c7" text-anchor="middle">练 2 · 俯视竖棱（连向 VP1/VP2 露顶面）</text>
    `
  );
}

export function generateCoreIntersectionsTemplate() {
  // Col 1 Top: Exact 3D box + vertical cylinder piercing top face (true projected top-face seam!)
  const cam1 = createCamera({ cx: 223, cy: 312, focal: 660, dist: 540, pitch: 24, yaw: 34 });
  const boxTop = projectPolyMesh(createBoxMesh(124, 112, 124), cam1);
  const cylPierce = projectTaperedCylinder({
    rTop: 34,
    rBot: 34,
    height: 98,
    rings: [],
    xform: { ty: 56 + 49 }, // bottom sits EXACTLY on y = +56 (box top face!)
    cam: cam1,
  });

  // Col 1 Bottom: Practice empty box + side piercing axis
  const cam1b = createCamera({ cx: 215, cy: 678, focal: 660, dist: 540, pitch: 22, yaw: 32 });
  const boxPrac = projectPolyMesh(createBoxMesh(116, 110, 116), cam1b);
  const pAxisStart = cam1b.project({ x: 58, y: 0, z: 0 });
  const pAxisEnd = cam1b.project({ x: 152, y: 0, z: 0 });

  // Col 2 Top: Exact 3D Chamfered Box (cut corner!)
  const cam2 = createCamera({ cx: 600, cy: 300, focal: 660, dist: 540, pitch: 22, yaw: -30 });
  const chamferMesh = createChamferedBoxMesh(120, 118, 120, 44);
  const chamferProj = projectPolyMesh(chamferMesh, cam2);
  const origCorner = cam2.project({ x: 60, y: 59, z: 60 });
  const cutA = chamferProj.projVerts[7];
  const cutB = chamferProj.projVerts[8];
  const cutC = chamferProj.projVerts[9];
  const ghostCorner = `
    ${lineEl(cutA, origCorner, 'stroke="#94a3b8" stroke-dasharray="4 4" stroke-width="1.3"')}
    ${lineEl(cutB, origCorner, 'stroke="#94a3b8" stroke-dasharray="4 4" stroke-width="1.3"')}
    ${lineEl(cutC, origCorner, 'stroke="#94a3b8" stroke-dasharray="4 4" stroke-width="1.3"')}
  `;

  // Col 2 Bottom: Practice intact box for L-notch carving
  const cam2b = createCamera({ cx: 600, cy: 678, focal: 660, dist: 540, pitch: 22, yaw: -32 });
  const boxCarve = projectPolyMesh(createBoxMesh(118, 112, 118), cam2b);

  // Col 3 Top: Exact 3D Overlapping foreground sphere + background box (clear T-overlap!)
  const cam3 = createCamera({ cx: 977, cy: 290, focal: 660, dist: 540, pitch: 18, yaw: 24 });
  const bgBox = projectPolyMesh(createBoxMesh(112, 118, 96), cam3, { tx: 34, ty: 8, tz: -60 });
  const fgSph = projectSphere({ radius: 56, xform: { tx: -34, ty: -14, tz: 54, rx: -12, ry: 22 }, cam: cam3, latitudes: [0], longitudes: [0] });

  // Col 3 Bottom: Practice overlap cluster (sphere + tilted box + cylinder silhouettes)
  const cam3b = createCamera({ cx: 977, cy: 675, focal: 660, dist: 540, pitch: 18, yaw: -22 });
  const clBox = projectPolyMesh(createBoxMesh(104, 116, 92), cam3b, { tx: 32, ty: 10, tz: -40 });
  const clSph = projectSphere({ radius: 46, xform: { tx: -44, ty: 24, tz: 45 }, cam: cam3b, latitudes: [], longitudes: [] });

  return wrapTemplateSVG(
    'CORE-6 · 体块穿插、切割与前后叠压底图（精确 3D 穿插交线）',
    '口诀：交界线必须顺着「被穿插表面」的透视方向贴着走 · 前实后轻用 T 字叠压拉开前后',
    `
    <rect x="48" y="92" width="350" height="764" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-dasharray="6 6"/>
    <text x="66" y="118" font-size="13" font-weight="700" fill="#4f46e5" fill-opacity="0.82">一 · 圆柱插入方体表面交线</text>
    ${renderPolyMeshToSvg(boxTop, { stroke: '#0284c7', hiddenStroke: '#0284c7', faceFills: { top: { fill: '#e0f2fe', fillOpacity: 0.35 } } })}
    ${renderCylinderSvg(cylPierce, { stroke: '#4f46e5', showAxis: false, fillBody: true })}
    <path d="${cylPierce.botFullPath}" fill="none" stroke="#e11d48" stroke-width="2.1"/>
    <text x="223" y="468" font-size="11" fill="#4f46e5" text-anchor="middle">示范：红色接口椭圆严丝合缝贴在顶面透视上</text>
    ${renderPolyMeshToSvg(boxPrac, { stroke: '#0284c7', hiddenStroke: '#0284c7' })}
    ${lineEl(pAxisStart, pAxisEnd, 'stroke="#10b981" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#tpl-arrow-emerald)"')}
    ${dotEl(pAxisStart, 4, '#e11d48', 0.8)}
    <text x="223" y="828" font-size="11" fill="#0284c7" text-anchor="middle">▲ 从右侧斜面垂直穿出圆柱并画出红点接口椭圆</text>

    <rect x="425" y="92" width="350" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
    <text x="443" y="118" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.82">二 · 方体切斜角（减法造型）</text>
    ${renderPolyMeshToSvg(chamferProj, {
      stroke: '#0284c7',
      hiddenStroke: '#0284c7',
      faceFills: { chamfer: { fill: '#ffe4e6', fillOpacity: 0.65 }, top: { fill: '#e0f2fe', fillOpacity: 0.3 } },
    })}
    ${ghostCorner}
    <text x="600" y="468" font-size="11" fill="#0284c7" text-anchor="middle">示范：虚线为被切角，粉色三角为真实截平面</text>
    ${renderPolyMeshToSvg(boxCarve, { stroke: '#0284c7', hiddenStroke: '#0284c7' })}
    <text x="600" y="828" font-size="11" fill="#0284c7" text-anchor="middle">▲ 在下方方体上切出一个 L 型阶梯凹槽并留透视线</text>

    <rect x="802" y="92" width="350" height="764" rx="12" fill="none" stroke="#10b981" stroke-opacity="0.3" stroke-dasharray="6 6"/>
    <text x="820" y="118" font-size="13" font-weight="700" fill="#059669" fill-opacity="0.82">三 · T 字叠压与线稿前后粗细</text>
    ${renderPolyMeshToSvg(bgBox, { stroke: '#64748b', strokeWidth: 1.4, hiddenStroke: '#94a3b8' })}
    ${renderSphereSvg(fgSph, { outlineStroke: '#059669', gridStroke: '#10b981', strokeWidth: 2.6, fill: '#ffffff' })}
    <text x="977" y="452" font-size="11" fill="#059669" text-anchor="middle">示范：粗线实压前景球体，细线退让后方方盒</text>
    ${renderPolyMeshToSvg(clBox, { stroke: '#0284c7', strokeWidth: 1.4, hiddenOpacity: 0.2 })}
    ${renderSphereSvg(clSph, { outlineStroke: '#0284c7', strokeWidth: 1.4, showPole: false })}
    <text x="977" y="828" font-size="11" fill="#059669" text-anchor="middle">▲ 用重线加实前景、轻线虚化后景勾出 T 字叠压</text>
    `
  );
}

export function generateCoreLightingTemplate() {
  const lightLeft = { x: -0.78, y: 0.62, z: 0.08 };
  // Top Row: 45° Top-Left Light -> Exact Analytical Terminator + Ground Cast Shadows
  const camSph = createCamera({ cx: 230, cy: 360, focal: 760, dist: 640, pitch: 18, yaw: 0 });
  const sph = projectSphere({
    radius: 108,
    cam: camSph,
    latitudes: [],
    longitudes: [],
    lightDir: lightLeft,
    groundY: -108,
  });

  const camBox = createCamera({ cx: 615, cy: 356, focal: 740, dist: 620, pitch: 20, yaw: 34 });
  const boxMesh = createBoxMesh(124, 124, 124);
  const box = projectPolyMesh(boxMesh, camBox);
  const boxShadow = projectGroundShadowFromPoints(box.worldVerts, lightLeft, -62, camBox);

  const camCyl = createCamera({ cx: 970, cy: 356, focal: 740, dist: 620, pitch: 20, yaw: 16 });
  const cyl = projectTaperedCylinder({ rTop: 58, rBot: 58, height: 158, rings: [], cam: camCyl });
  const cylShadowPts = [
    ...cyl.midRings,
  ];
  // Compute exact cylinder shadow hull from top & bottom rim 3D circles
  const cylRimWorld = [];
  for (let i = 0; i < 36; i += 1) {
    const a = (i / 36) * Math.PI * 2;
    cylRimWorld.push({ x: Math.cos(a) * 58, y: 79, z: Math.sin(a) * 58 });
    cylRimWorld.push({ x: Math.cos(a) * 58, y: -79, z: Math.sin(a) * 58 });
  }
  const cylShadow = projectGroundShadowFromPoints(cylRimWorld, lightLeft, -79, camCyl);
  // Exact cylinder terminator vertical generator where normal · lightDir = 0
  // L = (-0.72, 0.72, 0.32) -> horizontal tangent angle phi where cos(phi)*Lx + sin(phi)*Lz = 0 -> tan(phi) = -Lx/Lz
  const termAng = Math.atan2(lightLeft.z, -lightLeft.x); // normal perpendicular to horizontal light on front-right side
  const termTop = camCyl.project({ x: Math.sin(termAng) * 58, y: 79, z: Math.cos(termAng) * 58 });
  const termBot = camCyl.project({ x: Math.sin(termAng) * 58, y: -79, z: Math.cos(termAng) * 58 });

  // Bottom Row: Blank practice primitives for reverse top-right light
  const camP1 = createCamera({ cx: 245, cy: 722, focal: 740, dist: 620, pitch: 18 });
  const pSph = projectSphere({ radius: 78, cam: camP1, latitudes: [], longitudes: [] });
  const camP2 = createCamera({ cx: 615, cy: 718, focal: 740, dist: 620, pitch: 20, yaw: -32 });
  const pBox = projectPolyMesh(createBoxMesh(98, 98, 98), camP2);
  const camP3 = createCamera({ cx: 955, cy: 718, focal: 740, dist: 620, pitch: 20, yaw: -12 });
  const pCyl = projectTaperedCylinder({ rTop: 46, rBot: 46, height: 126, rings: [], cam: camP3 });

  return wrapTemplateSVG(
    'CORE-7 · 素描二分与明暗交界线实战底图（精确光线投影）',
    '口诀：先用马克笔一次性铺平暗面和投影 · 交界线卡在光切边界 · 反光永远暗于亮面',
    `
    <path d="M72 104 L132 152" stroke="#f59e0b" stroke-width="2.6" marker-end="url(#tpl-arrow-amber)"/>
    <text x="146" y="130" font-size="13" font-weight="700" fill="#d97706">主光源 45° 左上方斜射</text>

    ${renderSphereSvg(sph, { outlineStroke: '#0284c7', showPole: false, terminatorStroke: '#4f46e5' })}
    <g font-size="11.5" fill="#475569">
      <text x="164" y="324">① 受光亮面</text>
      <text x="272" y="366" fill="#4f46e5" font-weight="700">② 明暗交界线</text>
      <text x="266" y="438">③ 地面反光</text>
      <text x="372" y="492">④ 地面投影</text>
    </g>

    <path d="${boxShadow.pathD}" fill="#64748b" fill-opacity="0.2" stroke="#6366f1" stroke-opacity="0.45" stroke-width="1.4" stroke-dasharray="5 4"/>
    ${renderPolyMeshToSvg(box, {
      stroke: '#0284c7',
      hiddenOpacity: 0.22,
      faceFills: {
        top: { fill: '#f8fafc', fillOpacity: 0.7 },
        left: { fill: '#e2e8f0', fillOpacity: 0.45 },
        front: { fill: '#cbd5e1', fillOpacity: 0.55 },
      },
    })}
    <text x="615" y="492" font-size="11.5" fill="#475569" text-anchor="middle">顶面亮 · 左面灰 · 背光面与投影一次铺暗</text>

    <path d="${cylShadow.pathD}" fill="#64748b" fill-opacity="0.2" stroke="#6366f1" stroke-opacity="0.45" stroke-width="1.4" stroke-dasharray="5 4"/>
    ${renderCylinderSvg(cyl, { stroke: '#0284c7', showAxis: false })}
    ${lineEl(termTop, termBot, 'stroke="#4f46e5" stroke-width="2.1" stroke-dasharray="6 4"')}
    <text x="970" y="492" font-size="11.5" fill="#4f46e5" text-anchor="middle">圆柱交界线位于光切线而非最右侧轮廓</text>

    <rect x="48" y="556" width="1104" height="300" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-dasharray="6 6"/>
    <text x="66" y="584" font-size="13" font-weight="700" fill="#0284c7">实战区 · 换成「右上方主光」，自主切出三大体块的明暗交界线与左侧地面投影</text>
    <path d="M1125 588 L1065 636" stroke="#f59e0b" stroke-width="2.6" marker-end="url(#tpl-arrow-amber)"/>
    ${renderSphereSvg(pSph, { outlineStroke: '#0284c7', showPole: false })}
    ${renderPolyMeshToSvg(pBox, { stroke: '#0284c7', hiddenOpacity: 0.22 })}
    ${renderCylinderSvg(pCyl, { stroke: '#0284c7', showAxis: false })}
    `
  );
}

export function generateCoreColorTemplate() {
  const lightLeft = { x: -0.78, y: 0.62, z: 0.08 };
  const camA = createCamera({ cx: 316, cy: 590, focal: 760, dist: 640, pitch: 18 });
  const sphA = projectSphere({ radius: 118, cam: camA, latitudes: [], longitudes: [], lightDir: lightLeft, groundY: -118 });

  const camB1 = createCamera({ cx: 790, cy: 596, focal: 760, dist: 640, pitch: 18 });
  const sphB = projectSphere({ radius: 86, cam: camB1, latitudes: [], longitudes: [], lightDir: lightLeft, groundY: -86 });

  const camB2 = createCamera({ cx: 1015, cy: 598, focal: 760, dist: 640, pitch: 20, yaw: 32 });
  const boxB = projectPolyMesh(createBoxMesh(104, 108, 104), camB2);
  const boxBShadow = projectGroundShadowFromPoints(boxB.worldVerts, lightLeft, -54, camB2);

  return wrapTemplateSVG(
    'CORE-8 · 固有色、光源色与环境色冷暖练习底图',
    '口诀：亮面吃光源色（暖黄阳光），暗面吃环境天光（冷蓝紫）· 严禁直接往暗部加纯黑',
    `
    <rect x="48" y="92" width="1104" height="226" rx="12" fill="none" stroke="#f59e0b" stroke-opacity="0.34"/>
    <text x="66" y="120" font-size="13" font-weight="700" fill="#d97706">光色公式：受光亮面 = 固有色 × 暖光源色 ｜ 背光暗面 = 固有色 × 冷环境色 ｜ 底部反光 = 地面反弹色</text>
    <g transform="translate(80, 150)" font-size="12" fill="#475569">
      <rect x="0" y="0" width="240" height="126" rx="10" fill="#fef3c7" fill-opacity="0.6" stroke="#f59e0b" stroke-opacity="0.55"/>
      <text x="120" y="54" text-anchor="middle" font-weight="700" fill="#b45309">1. 暖阳照射区</text>
      <text x="120" y="80" text-anchor="middle">色相微偏黄/橙，高光清亮</text>
      <text x="275" y="68" font-size="22" font-weight="700" fill="#64748b" text-anchor="middle">+</text>
      <rect x="310" y="0" width="260" height="126" rx="10" fill="#e0e7ff" fill-opacity="0.62" stroke="#6366f1" stroke-opacity="0.55"/>
      <text x="440" y="54" text-anchor="middle" font-weight="700" fill="#4338ca">2. 背光冷阴影区</text>
      <text x="440" y="80" text-anchor="middle">吸收蓝天漫反射，偏冷蓝/冷紫</text>
      <text x="605" y="68" font-size="22" font-weight="700" fill="#64748b" text-anchor="middle">+</text>
      <rect x="640" y="0" width="280" height="126" rx="10" fill="#d1fae5" fill-opacity="0.58" stroke="#10b981" stroke-opacity="0.55"/>
      <text x="780" y="54" text-anchor="middle" font-weight="700" fill="#047857">3. 桌面/草地反光底缘</text>
      <text x="780" y="80" text-anchor="middle">在暗部最底缘轻扫克制环境色</text>
    </g>

    <rect x="48" y="346" width="536" height="510" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.3"/>
    <text x="66" y="374" font-size="13" font-weight="700" fill="#0284c7">练手 A · 蓝色桌面白石膏球（暖阳亮面 + 蓝紫暗部 + 青蓝底反光）</text>
    <path d="M84 405 L140 448" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#tpl-arrow-amber)"/>
    ${renderSphereSvg(sphA, { outlineStroke: '#0284c7', showPole: false, terminatorStroke: '#4f46e5' })}
    <text x="316" y="828" font-size="11.5" fill="#475569" text-anchor="middle">用马克笔：先铺淡暖白亮面 → 叠加冷紫暗部 → 底部轻扫天蓝反光</text>

    <rect x="616" y="346" width="536" height="510" rx="12" fill="none" stroke="#10b981" stroke-opacity="0.3"/>
    <text x="634" y="374" font-size="13" font-weight="700" fill="#059669">练手 B · 暖红木桌苹果球与方盒（固有色叠加色相冷暖偏移）</text>
    <path d="M652 405 L708 448" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#tpl-arrow-amber)"/>
    ${renderSphereSvg(sphB, { outlineStroke: '#0284c7', showPole: false, terminatorStroke: '#4f46e5' })}
    <path d="${boxBShadow.pathD}" fill="#64748b" fill-opacity="0.18" stroke="#6366f1" stroke-opacity="0.4" stroke-dasharray="5 4"/>
    ${renderPolyMeshToSvg(boxB, { stroke: '#0284c7', hiddenOpacity: 0.22 })}
    <text x="884" y="828" font-size="11.5" fill="#059669" text-anchor="middle">红球阴影往「冷紫红」偏，绿盒阴影往「冷青蓝」偏！</text>
    `
  );
}

// ---------------------------------------------------------------------------
// CHALLENGE FRAMING TEMPLATES (4 Exact Composition Frames)
// ---------------------------------------------------------------------------

export function generateFramePortraitTemplate() {
  return wrapTemplateSVG(
    'FRAME-1 · 头像特写黄金构图框',
    '构图口诀：主视点眼睛落在上三分线交点 · 脸朝向哪边就在哪边多留呼吸空间',
    `
    <rect x="260" y="96" width="680" height="756" rx="14" fill="none" stroke="#4f46e5" stroke-opacity="0.55" stroke-width="2"/>
    <g stroke="#0284c7" stroke-opacity="0.36" stroke-width="1.3" stroke-dasharray="6 5">
      <line x1="486.7" y1="96" x2="486.7" y2="852"/>
      <line x1="713.3" y1="96" x2="713.3" y2="852"/>
      <line x1="260" y1="348" x2="940" y2="348"/>
      <line x1="260" y1="600" x2="940" y2="600"/>
    </g>
    <line x1="280" y1="158" x2="920" y2="158" stroke="#10b981" stroke-opacity="0.48" stroke-dasharray="4 4"/>
    <text x="292" y="148" font-size="11.5" fill="#059669">▲ 头顶/发饰呼吸安全线（避免顶到画框上沿）</text>
    <circle cx="486.7" cy="348" r="10" fill="none" stroke="#4f46e5" stroke-opacity="0.65" stroke-width="1.8"/>
    <circle cx="713.3" cy="348" r="10" fill="none" stroke="#4f46e5" stroke-opacity="0.65" stroke-width="1.8"/>
    <ellipse cx="600" cy="378" rx="148" ry="188" fill="none" stroke="#0284c7" stroke-opacity="0.28" stroke-dasharray="6 6" stroke-width="1.6"/>
    <path d="M542 562 L530 665 L355 775 M658 562 L670 665 L845 775" fill="none" stroke="#0284c7" stroke-opacity="0.28" stroke-dasharray="6 6" stroke-width="1.6"/>
    <text x="600" y="832" font-size="12" fill="#475569" text-anchor="middle">建议：把主视点眼睛放在上方圆环交点附近，肩膀微斜打破死板</text>
    `
  );
}

export function generateFrameHalfbodyTemplate() {
  const ticks = [
    { y: 155, label: '0 · 头顶安全线' },
    { y: 315, label: '1 · 下巴' },
    { y: 475, label: '2 · 胸线' },
    { y: 635, label: '3 · 肚脐 / 手肘' },
    { y: 795, label: '4 · 胯骨裁切线' },
  ];
  const tickLines = ticks
    .map(
      (t) =>
        `<line x1="226" y1="${t.y}" x2="974" y2="${t.y}" stroke="#0284c7" stroke-opacity="0.34" stroke-width="1.2" stroke-dasharray="4 4"/>` +
        `<text x="234" y="${t.y - 6}" font-size="11" fill="#0284c7" fill-opacity="0.8">${t.label}</text>`
    )
    .join('\n');

  return wrapTemplateSVG(
    'FRAME-2 · 半身人像胸腰构图框（精确 4 头高裁切）',
    '构图口诀：避开切在「手肘、手腕、腰最细」关节正中处，留出斜向肩胯韵律',
    `
    <rect x="210" y="92" width="780" height="768" rx="14" fill="none" stroke="#4f46e5" stroke-opacity="0.55" stroke-width="2"/>
    <g stroke="#0284c7" stroke-opacity="0.28" stroke-width="1.2" stroke-dasharray="6 5">
      <line x1="470" y1="92" x2="470" y2="860"/>
      <line x1="730" y1="92" x2="730" y2="860"/>
      <line x1="210" y1="348" x2="990" y2="348"/>
      <line x1="210" y1="604" x2="990" y2="604"/>
    </g>
    ${tickLines}
    <ellipse cx="600" cy="235" rx="56" ry="76" fill="none" stroke="#0284c7" stroke-opacity="0.3" stroke-dasharray="5 5"/>
    <line x1="475" y1="365" x2="725" y2="395" stroke="#e11d48" stroke-opacity="0.4" stroke-dasharray="5 5" stroke-width="1.8"/>
    <line x1="505" y1="735" x2="695" y2="710" stroke="#4f46e5" stroke-opacity="0.4" stroke-dasharray="5 5" stroke-width="1.8"/>
    <text x="600" y="840" font-size="12" fill="#475569" text-anchor="middle">提示：胸口与手臂动作可大胆穿出左右三分线，制造纵深张力</text>
    `
  );
}

export function generateFrameFullbodyTemplate() {
  // Exact 7.5-head ruler: y0 = 130, step = 90px -> 7.5 * 90 = 675px -> ground at y = 805
  const y0 = 130;
  const hUnit = 90;
  const headTicks = [
    { h: 0, label: '0 头顶' },
    { h: 1, label: '1 下巴' },
    { h: 2, label: '2 胸线' },
    { h: 3, label: '3 肚脐 / 肘' },
    { h: 3.75, label: '3.75 耻骨（中点）' },
    { h: 5.5, label: '5.5 膝盖' },
    { h: 7, label: '7 脚踝' },
    { h: 7.5, label: '7.5 落脚地线' },
  ];
  const tickSvg = headTicks
    .map((t) => {
      const y = y0 + t.h * hUnit;
      const highlight = t.h === 3.75 || t.h === 7.5;
      return `
        <line x1="156" y1="${fmt(y)}" x2="${highlight ? 1044 : 365}" y2="${fmt(y)}" stroke="${t.h === 3.75 ? '#d97706' : '#059669'}" stroke-opacity="${highlight ? 0.48 : 0.36}" stroke-width="${highlight ? 1.5 : 1.15}" stroke-dasharray="4 4"/>
        <text x="162" y="${fmt(y - 5)}" font-size="10.5" font-weight="${highlight ? 700 : 500}" fill="${t.h === 3.75 ? '#d97706' : '#059669'}">${t.label}</text>
      `;
    })
    .join('\n');

  // True 1-point perspective floor grid converging to (600, 540)
  const vp = { x: 600, y: 540 };
  const floorRays = [170, 385, 600, 815, 1030]
    .map((x) => lineEl(vp, { x, y: 860 }, 'stroke="#0284c7" stroke-opacity="0.28" stroke-width="1.2"'))
    .join('\n');
  // Perspective foreshortened depth horizontals (harmonic spacing toward horizon)
  const depthYs = [640, 692, 748, 805];
  const floorHoriz = depthYs
    .map((y) => `<line x1="140" y1="${y}" x2="1060" y2="${y}" stroke="#0284c7" stroke-opacity="0.22" stroke-width="1.15"/>`)
    .join('\n');

  return wrapTemplateSVG(
    'FRAME-3 · 全身动态精确 7.5 头身与地面透视框',
    '构图口诀：脚踩进地面透视网格 + 投影贴紧脚掌 · 耻骨正好落在全身 1/2 中点',
    `
    <rect x="140" y="92" width="920" height="768" rx="14" fill="none" stroke="#4f46e5" stroke-opacity="0.52" stroke-width="2"/>
    <line x1="140" y1="540" x2="1060" y2="540" stroke="#4f46e5" stroke-opacity="0.38" stroke-dasharray="6 5" stroke-width="1.4"/>
    <text x="1048" y="532" font-size="11" fill="#4f46e5" text-anchor="end">参考视平线 HL</text>
    ${floorRays}
    ${floorHoriz}
    ${tickSvg}
    <text x="600" y="846" font-size="11.5" fill="#475569" text-anchor="middle">画完骨架后，务必在地面透视网格内补出脚底投影锚定重量感</text>
    `
  );
}

export function generateFrameSheetTemplate() {
  return wrapTemplateSVG(
    'FRAME-4 · 四格表情 / 多角度角色设定排版框',
    '排版口诀：用跨格参考线保持四个画面的「头大小与眼睛基线」统一',
    `
    <g stroke="#4f46e5" stroke-opacity="0.48" stroke-width="1.8" fill="none">
      <rect x="76" y="96" width="504" height="364" rx="12"/>
      <rect x="620" y="96" width="504" height="364" rx="12"/>
      <rect x="76" y="492" width="504" height="364" rx="12"/>
      <rect x="620" y="492" width="504" height="364" rx="12"/>
    </g>
    <g stroke="#0284c7" stroke-opacity="0.36" stroke-width="1.3" stroke-dasharray="5 5">
      <line x1="76" y1="248" x2="1124" y2="248"/>
      <line x1="76" y1="286" x2="1124" y2="286"/>
      <line x1="76" y1="644" x2="1124" y2="644"/>
      <line x1="76" y1="682" x2="1124" y2="682"/>
    </g>
    <g stroke="#0284c7" stroke-opacity="0.3" stroke-width="1.5" stroke-dasharray="6 5" fill="none">
      <circle cx="328" cy="252" r="88"/>
      <circle cx="872" cy="252" r="88"/>
      <circle cx="328" cy="648" r="88"/>
      <circle cx="872" cy="648" r="88"/>
    </g>
    <g font-size="12" font-weight="700" fill="#4f46e5" fill-opacity="0.78">
      <text x="96" y="122">格 01 · 正面 / 常态</text>
      <text x="640" y="122">格 02 · 3/4 半侧面 / 开心大笑</text>
      <text x="96" y="518">格 03 · 侧面或微仰 / 愤怒咬牙</text>
      <text x="640" y="518">格 04 · 自由角度 / 委屈或惊慌</text>
    </g>
    `
  );
}

// ---------------------------------------------------------------------------
// CORE TEACHING DIAGRAMS (Exact Wrong vs Right Math SVGs for core-1 ~ core-8)
// ---------------------------------------------------------------------------

export function generateCoreDiagramSvg(lessonId) {
  switch (lessonId) {
    case 'core-1':
      return wrapCheatSheetSVG(
        '翻车：短线反复蹭毛刺',
        '正确：眼盯终点一笔拉通',
        `
        <text x="10" y="22" font-size="12" font-weight="700" fill="#dc2626">反复磨蹭短线，线条肮脏不自信</text>
        <path d="M20 75 L72 70 M60 80 L118 73 M105 82 L166 72 M152 80 L218 75 M202 82 L272 71 M258 78 L330 74" stroke="#ef4444" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M22 142 L95 148 M85 138 L168 146 M158 136 L248 144 M235 150 L330 142" stroke="#ef4444" stroke-width="2.4" stroke-linecap="round"/>
        <text x="175" y="218" font-size="11.5" fill="#b91c1c" text-anchor="middle">手指捏死画短线，接缝处全是毛边</text>
        `,
        `
        <text x="10" y="22" font-size="12" font-weight="700" fill="#16a34a">悬空预演 2 遍后，用前臂一气呵成</text>
        <circle cx="24" cy="75" r="5" fill="#4f46e5"/><circle cx="330" cy="75" r="5" fill="#4f46e5"/>
        <line x1="24" y1="75" x2="330" y2="75" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>
        <path d="M90 105 L265 105" stroke="#4f46e5" stroke-width="1.6" marker-end="url(#cs-arrow-indigo)"/>
        <text x="178" y="124" font-size="11" fill="#4f46e5" text-anchor="middle">视线提前锁在终点圆点</text>
        <line x1="24" y1="158" x2="330" y2="158" stroke="#16a34a" stroke-width="2.4" stroke-linecap="round"/>
        <text x="175" y="218" font-size="11.5" fill="#15803d" text-anchor="middle">画歪宁可 Ctrl+Z 重拉，绝不蹭第二笔</text>
        `
      );

    case 'core-2':
      return wrapCheatSheetSVG(
        '翻车：等粗铁丝 & 折角弯线',
        '正确：轻重轻渐变 & 流畅 S 韵律',
        `
        <text x="10" y="22" font-size="12" font-weight="700" fill="#dc2626">死按到底像铁丝，S 形中间折出顿角</text>
        <line x1="25" y1="68" x2="328" y2="68" stroke="#ef4444" stroke-width="5" stroke-linecap="butt"/>
        <path d="M35 168 L110 105 L220 175 L315 112" stroke="#ef4444" stroke-width="2.5" fill="none"/>
        <circle cx="110" cy="105" r="4" fill="#dc2626"/><circle cx="220" cy="175" r="4" fill="#dc2626"/>
        <text x="175" y="218" font-size="11.5" fill="#b91c1c" text-anchor="middle">两头平齐僵硬，拐弯处突兀卡顿</text>
        `,
        `
        <text x="10" y="22" font-size="12" font-weight="700" fill="#16a34a">空中轻落轻起，S 曲线平滑过渡</text>
        <path d="M24 68 Q176 58 330 68 Q176 78 24 68 Z" fill="#16a34a"/>
        <path d="M35 162 C95 95, 160 95, 180 140 C200 185, 265 185, 322 115" stroke="#16a34a" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="180" cy="140" r="4.5" fill="#4f46e5"/>
        <text x="175" y="218" font-size="11.5" fill="#15803d" text-anchor="middle">两端尖细、中段实，拐点平滑换向</text>
        `
      );

    case 'core-3': {
      const qPts = [
        { x: 96, y: 42 },
        { x: 298, y: 42 },
        { x: 256, y: 172 },
        { x: 52, y: 172 },
      ];
      const insc = inscribeEllipseInQuad(...qPts, 64);
      return wrapCheatSheetSVG(
        '翻车：尖角橄榄球 & 脱边椭圆',
        '正确：长短轴 90° 垂直 & 精准四边相切',
        `
        <path d="M45 108 Q175 44 305 108 Q175 172 45 108 Z" fill="#fee2e2" fill-opacity="0.55" stroke="#ef4444" stroke-width="2.4"/>
        <circle cx="45" cy="108" r="4.5" fill="#dc2626"/><circle cx="305" cy="108" r="4.5" fill="#dc2626"/>
        <text x="175" y="212" font-size="11.5" fill="#b91c1c" text-anchor="middle">两端捏出尖角折痕，上下弧线像两片弯括号</text>
        `,
        `
        <path d="${pointsToSvgPath(qPts, true)}" fill="none" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="4 3"/>
        ${lineEl(qPts[0], qPts[2], 'stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"')}
        ${lineEl(qPts[1], qPts[3], 'stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"')}
        <path d="${insc.pathD}" fill="#dcfce7" fill-opacity="0.45" stroke="#16a34a" stroke-width="2.4"/>
        ${lineEl(insc.tangents[0], insc.tangents[2], 'stroke="#4f46e5" stroke-width="1.3" stroke-dasharray="4 3"')}
        ${lineEl(insc.tangents[1], insc.tangents[3], 'stroke="#4f46e5" stroke-width="1.3" stroke-dasharray="4 3"')}
        ${insc.tangents.map((t) => dotEl(t, 3.3, '#15803d', 0.85)).join('')}
        <text x="175" y="212" font-size="11.5" fill="#15803d" text-anchor="middle">两端饱满圆润，严格切于透视四边中点</text>
        `
      );
    }

    case 'core-4': {
      const camBox = createCamera({ cx: 92, cy: 102, focal: 520, dist: 460, pitch: 22, yaw: 34 });
      const box = projectPolyMesh(createBoxMesh(82, 86, 82), camBox);
      const camCyl = createCamera({ cx: 256, cy: 104, focal: 520, dist: 460, pitch: 20, yaw: 12 });
      const cyl = projectTaperedCylinder({ rTop: 38, rBot: 38, height: 112, rings: [0.35, 0.68], cam: camCyl });
      return wrapCheatSheetSVG(
        '翻车：扁平纸片 & 平直腰带',
        '正确：精确 3D Y字盒子 & C型曲面绕线',
        `
        <rect x="28" y="26" width="76" height="76" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
        <rect x="52" y="46" width="76" height="76" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 3"/>
        <rect x="215" y="24" width="76" height="145" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
        <line x1="215" y1="74" x2="291" y2="74" stroke="#dc2626" stroke-width="2.4"/>
        <line x1="215" y1="118" x2="291" y2="118" stroke="#dc2626" stroke-width="2.4"/>
        <text x="175" y="218" font-size="11.5" fill="#b91c1c" text-anchor="middle">横线拉直 = 告诉大脑这是平面纸片</text>
        `,
        `
        ${renderPolyMeshToSvg(box, {
          stroke: '#16a34a',
          strokeWidth: 2,
          hiddenStroke: '#16a34a',
          faceFills: { top: { fill: '#dcfce7', fillOpacity: 0.6 }, front: { fill: '#f0fdf4', fillOpacity: 0.5 } },
        })}
        ${renderCylinderSvg(cyl, { stroke: '#16a34a', ringStroke: '#4f46e5', strokeWidth: 2, showAxis: false, fillBody: true })}
        <text x="175" y="218" font-size="11.5" fill="#15803d" text-anchor="middle">Y字立面 + C型曲面绕线 = 立刻拥有三维体积</text>
        `
      );
    }

    case 'core-5': {
      const vp = { x: 294, y: 46 };
      const f = [
        { x: 58, y: 104 },
        { x: 162, y: 104 },
        { x: 162, y: 184 },
        { x: 58, y: 184 },
      ];
      const b = f.map((pt) => lerp2D(pt, vp, 0.36));
      return wrapCheatSheetSVG(
        '翻车：反透视远端炸开变大',
        '正确：纵深边严密聚向同一灭点 VP',
        `
        <line x1="10" y1="46" x2="342" y2="46" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="4 4"/>
        <polygon points="65,100 165,100 165,180 65,180" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
        <polygon points="105,60 252,60 252,138 105,138" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="4 4"/>
        <line x1="65" y1="100" x2="105" y2="60" stroke="#dc2626" stroke-width="2"/>
        <line x1="165" y1="100" x2="252" y2="60" stroke="#dc2626" stroke-width="2"/>
        <line x1="165" y1="180" x2="252" y2="138" stroke="#dc2626" stroke-width="2"/>
        <text x="175" y="218" font-size="11.5" fill="#b91c1c" text-anchor="middle">后方线条向外散开，盒子看起来像爆炸变形</text>
        `,
        `
        <line x1="10" y1="${vp.y}" x2="342" y2="${vp.y}" stroke="#4f46e5" stroke-width="1.5"/>
        <circle cx="${vp.x}" cy="${vp.y}" r="5" fill="#4f46e5"/>
        <text x="${vp.x}" y="${vp.y - 10}" font-size="11" font-weight="700" fill="#4f46e5" text-anchor="middle">VP</text>
        ${f.slice(0, 3).map((pt) => lineEl(pt, vp, 'stroke="#16a34a" stroke-opacity="0.35" stroke-dasharray="4 3"')).join('')}
        <path d="${pointsToSvgPath([f[0], f[1], b[1], b[0]], true)}" fill="#bbf7d0" fill-opacity="0.55" stroke="#16a34a" stroke-width="1.8"/>
        <path d="${pointsToSvgPath([f[1], f[2], b[2], b[1]], true)}" fill="#dcfce7" fill-opacity="0.65" stroke="#16a34a" stroke-width="1.8"/>
        <path d="${pointsToSvgPath(f, true)}" fill="#f0fdf4" fill-opacity="0.7" stroke="#16a34a" stroke-width="2"/>
        <path d="${pointsToSvgPath([b[0], b[3], b[2]], false)}" fill="none" stroke="#16a34a" stroke-opacity="0.35" stroke-dasharray="4 3"/>
        ${lineEl(f[3], b[3], 'stroke="#16a34a" stroke-opacity="0.35" stroke-dasharray="4 3"')}
        <text x="175" y="218" font-size="11.5" fill="#15803d" text-anchor="middle">纵深边精准交汇到同一个 VP，越近越宽大</text>
        `
      );
    }

    case 'core-6': {
      const cam = createCamera({ cx: 175, cy: 116, focal: 540, dist: 460, pitch: 24, yaw: 34 });
      const box = projectPolyMesh(createBoxMesh(86, 70, 86), cam);
      const cyl = projectTaperedCylinder({ rTop: 23, rBot: 23, height: 58, rings: [], xform: { ty: 35 + 29 }, cam });
      return wrapCheatSheetSVG(
        '翻车：扁平直缝 & 前后无主次',
        '正确：精确贴面交界椭圆 & T字叠压',
        `
        <rect x="45" y="45" width="120" height="120" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
        <circle cx="165" cy="105" r="52" fill="#fee2e2" fill-opacity="0.7" stroke="#ef4444" stroke-width="2"/>
        <line x1="165" y1="53" x2="165" y2="157" stroke="#dc2626" stroke-width="2.5"/>
        <text x="175" y="218" font-size="11.5" fill="#b91c1c" text-anchor="middle">接缝画成生硬直线且线条等粗，分不出前后贴合</text>
        `,
        `
        ${renderPolyMeshToSvg(box, {
          stroke: '#16a34a',
          strokeWidth: 1.9,
          hiddenStroke: '#16a34a',
          faceFills: { top: { fill: '#dcfce7', fillOpacity: 0.65 }, front: { fill: '#f0fdf4', fillOpacity: 0.45 } },
        })}
        ${renderCylinderSvg(cyl, { stroke: '#16a34a', showAxis: false, fillBody: true })}
        <path d="${cyl.botFullPath}" fill="none" stroke="#4f46e5" stroke-width="2.4"/>
        <text x="175" y="218" font-size="11.5" fill="#15803d" text-anchor="middle">紫色交界椭圆紧贴顶面透视，前景轮廓实压后方</text>
        `
      );
    }

    case 'core-7': {
      const lightDir = { x: -0.78, y: 0.62, z: 0.08 };
      const cam = createCamera({ cx: 126, cy: 108, focal: 620, dist: 540, pitch: 18 });
      const sph = projectSphere({ radius: 62, cam, latitudes: [], longitudes: [], lightDir, groundY: -62 });
      const r = sph.apparentRadius;
      const cx = sph.center.x, cy = sph.center.y;
      const clipId = 'cs-core7-sphere-clip';
      const termVis = sph.terminator.visiblePaths[0] || '';
      const darkCrescent = sph.terminator.darkCrescentPathD || '';
      return wrapCheatSheetSVG(
        '翻车：枕头阴影四周涂黑',
        '正确：明确光源 & 精确黑白二分',
        `
        <defs>
          <radialGradient id="cs-core7-bad" cx="50%" cy="50%" r="50%">
            <stop offset="52%" stop-color="#f8fafc"/>
            <stop offset="100%" stop-color="#334155"/>
          </radialGradient>
        </defs>
        <circle cx="116" cy="108" r="66" fill="url(#cs-core7-bad)" stroke="#ef4444" stroke-width="2"/>
        <text x="268" y="88" font-size="11.5" font-weight="700" fill="#dc2626" text-anchor="middle">❌ 光从哪来看不清</text>
        <text x="268" y="112" font-size="11" fill="#b91c1c" text-anchor="middle">盲目绕着边缘喷黑</text>
        <text x="268" y="136" font-size="11" fill="#b91c1c" text-anchor="middle">缺乏地面投影锚点</text>
        <text x="175" y="218" font-size="11.5" fill="#b91c1c" text-anchor="middle">边缘涂黑一圈会让画面脏平发灰</text>
        `,
        `
        <defs><clipPath id="${clipId}"><circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(r)}"/></clipPath></defs>
        <path d="M18 22 L54 50" stroke="#f59e0b" stroke-width="2.4" marker-end="url(#cs-arrow-amber)"/>
        <text x="62" y="32" font-size="11" font-weight="700" fill="#d97706">主光 45°</text>
        <path d="${sph.shadowPathD}" fill="#64748b" fill-opacity="0.38"/>
        <circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(r)}" fill="#f8fafc"/>
        <g clip-path="url(#${clipId})">
          <path d="${darkCrescent}" fill="#475569" fill-opacity="0.88"/>
          <path d="${termVis}" fill="none" stroke="#1e293b" stroke-width="5.5" stroke-linecap="round"/>
          <circle cx="${fmt(cx + r * 0.45)}" cy="${fmt(cy + r * 0.48)}" r="${fmt(r * 0.42)}" fill="#cbd5e1" fill-opacity="0.24"/>
        </g>
        <circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(r)}" fill="none" stroke="#16a34a" stroke-width="2"/>
        <text x="276" y="84" font-size="11" font-weight="700" fill="#15803d" text-anchor="middle">✅ 亮面干干净净</text>
        <text x="276" y="110" font-size="11" fill="#4f46e5" font-weight="700" text-anchor="middle">交界线贴弧度压深</text>
        <text x="276" y="136" font-size="11" fill="#475569" text-anchor="middle">反光克制暗于亮面</text>
        <text x="175" y="218" font-size="11.5" fill="#15803d" text-anchor="middle">先硬边二分色块，瞬间通透立体</text>
        `
      );
    }

    case 'core-8': {
      const lightDir = { x: -0.78, y: 0.62, z: 0.08 };
      const cam = createCamera({ cx: 120, cy: 108, focal: 620, dist: 540, pitch: 18 });
      const sph = projectSphere({ radius: 62, cam, latitudes: [], longitudes: [], lightDir, groundY: -62 });
      const r = sph.apparentRadius;
      const cx = sph.center.x, cy = sph.center.y;
      const darkCrescent = sph.terminator.darkCrescentPathD || '';
      return wrapCheatSheetSVG(
        '翻车：阴影直拉纯黑发木',
        '正确：暖光冷影色相偏移 + 环境反光',
        `
        <defs><clipPath id="cs-core8-bad"><circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(r)}"/></clipPath></defs>
        <circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(r)}" fill="#fca5a5"/>
        <g clip-path="url(#cs-core8-bad)">
          <path d="${darkCrescent}" fill="#451a1a" fill-opacity="0.88"/>
        </g>
        <circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(r)}" fill="none" stroke="#ef4444" stroke-width="2"/>
        <text x="268" y="96" font-size="11.5" font-weight="700" fill="#dc2626" text-anchor="middle">❌ 纯黑调暗</text>
        <text x="268" y="122" font-size="11" fill="#b91c1c" text-anchor="middle">色相不动直接加黑</text>
        <text x="268" y="146" font-size="11" fill="#b91c1c" text-anchor="middle">阴影宛如烧焦炭块</text>
        <text x="175" y="218" font-size="11.5" fill="#b91c1c" text-anchor="middle">无冷暖对比，红球涂暗后直接变脏褐黑泥</text>
        `,
        `
        <defs><clipPath id="cs-core8-good"><circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(r)}"/></clipPath></defs>
        <path d="${sph.shadowPathD}" fill="#6366f1" fill-opacity="0.34"/>
        <circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(r)}" fill="#fed7aa"/>
        <g clip-path="url(#cs-core8-good)">
          <path d="${darkCrescent}" fill="#7e22ce" fill-opacity="0.62"/>
          <path d="M${fmt(cx - r * 0.22)} ${fmt(cy + r * 0.88)} A${fmt(r * 0.86)} ${fmt(r * 0.86)} 0 0 0 ${fmt(cx + r * 0.86)} ${fmt(cy + r * 0.24)}" stroke="#38bdf8" stroke-width="5.5" fill="none" stroke-linecap="round"/>
        </g>
        <circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(r)}" fill="none" stroke="#16a34a" stroke-width="2"/>
        <text x="272" y="88" font-size="11" font-weight="700" fill="#d97706" text-anchor="middle">☀ 亮部吃暖黄光</text>
        <text x="272" y="114" font-size="11" font-weight="700" fill="#6366f1" text-anchor="middle">🌙 暗面偏冷紫蓝</text>
        <text x="272" y="140" font-size="11" fill="#0284c7" text-anchor="middle">💧 底缘扫天蓝反光</text>
        <text x="175" y="218" font-size="11.5" fill="#15803d" text-anchor="middle">用色相冷暖对撞代替加黑，阴影立马清透！</text>
        `
      );
    }

    default:
      return '';
  }
}

export const CORE_TEMPLATE_GENERATORS = {
  'tpl-core-lines': generateCoreLinesTemplate,
  'tpl-core-curves': generateCoreCurvesTemplate,
  'tpl-core-circles': generateCoreCirclesTemplate,
  'tpl-core-forms': generateCoreFormsTemplate,
  'tpl-core-perspective': generateCorePerspectiveTemplate,
  'tpl-core-intersections': generateCoreIntersectionsTemplate,
  'tpl-core-lighting': generateCoreLightingTemplate,
  'tpl-core-color': generateCoreColorTemplate,
  'tpl-frame-portrait': generateFramePortraitTemplate,
  'tpl-frame-halfbody': generateFrameHalfbodyTemplate,
  'tpl-frame-fullbody': generateFrameFullbodyTemplate,
  'tpl-frame-sheet': generateFrameSheetTemplate,
};
