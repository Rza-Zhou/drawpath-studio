/**
 * DrawPath Studio · Nano Banana (image-generator) 高清红蓝结构线稿图集包装器
 * 将 AI 生成的无字高清红蓝结构线稿与清晰的中文 SVG 标题/要点标注结合
 */

import { SVG_FONT, escapeXML, wrapRedBlueCheatSheetSVG } from './svg-helpers.js';

function wrapNanoBananaSheet({ title, badge, imageUrl, tags = [], tone = 'blue' }) {
  const palettes = {
    blue: { border: '#bae6fd', headerBg: '#e0f2fe', text: '#0369a1', tagBg: '#f0f9ff', tagText: '#0369a1' },
    red: { border: '#fecdd3', headerBg: '#ffe4e6', text: '#be123c', tagBg: '#fff1f2', tagText: '#be123c' },
    ink: { border: '#cbd5e1', headerBg: '#f1f5f9', text: '#0f172a', tagBg: '#f8fafc', tagText: '#1e293b' },
  };
  const p = palettes[tone] || palettes.blue;

  const tagItems = tags.slice(0, 3);
  const tagWidth = 242;
  const tagsSvg = tagItems
    .map((t, i) => {
      const x = 22 + i * (tagWidth + 15);
      return `
        <rect x="${x}" y="392" width="${tagWidth}" height="28" rx="7" fill="${p.tagBg}" stroke="${p.border}" stroke-width="1"/>
        <text x="${x + tagWidth / 2}" y="410" font-size="11.5" font-weight="700" fill="${p.tagText}" text-anchor="middle">${escapeXML(t)}</text>
      `;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 432" font-family="${SVG_FONT}">
  <rect x="8" y="8" width="784" height="416" rx="14" fill="#ffffff" stroke="${p.border}" stroke-width="1.5"/>
  <rect x="18" y="16" width="764" height="32" rx="8" fill="${p.headerBg}"/>
  <text x="32" y="37" font-size="13.5" font-weight="700" fill="${p.text}">${escapeXML(title)}</text>
  <text x="768" y="37" font-size="11.5" font-weight="700" fill="${p.text}" text-anchor="end">${escapeXML(badge)}</text>
  <image href="${escapeXML(imageUrl)}" x="20" y="54" width="760" height="332" preserveAspectRatio="xMidYMid meet"/>
  ${tagsSvg}
</svg>`;
}

// ============================================================================
// 1. 日系 Kemono 兽人头部结构（犬狼 + 猫科，正 / 3/4 / 侧）
// ============================================================================
export const PLATE_FURRY_KEMONO_MUZZLE = wrapNanoBananaSheet({
  title: '🇯🇵 日系 Kemono 兽人头部结构（上排：犬狼三视图 · 下排：猫科三视图）',
  badge: 'Nano Banana 红蓝结构线稿',
  imageUrl: './assets/diagrams/furry-kemono-muzzle.jpg',
  tone: 'blue',
  tags: [
    '① 大颅球 + 短圆吻（约0.4球径）',
    '② 动漫大眼坐落中线偏下',
    '③ 猫科吻更短圆 + 饱满ω嘴与腮毛',
  ],
});

// ============================================================================
// 2. 美系 Furry 头部结构对比（长吻狼犬 + 棱角西方龙）
// ============================================================================
export const PLATE_FURRY_WESTERN_MUZZLE = wrapNanoBananaSheet({
  title: '🇺🇸 美系 Furry 头部结构对比（左：长梯形吻狼犬 · 右：多面棱角西方龙）',
  badge: 'Nano Banana 红蓝结构线稿',
  imageUrl: './assets/diagrams/furry-western-muzzle.jpg',
  tone: 'red',
  tags: [
    '① 美系狼吻长挺（约0.85球径）',
    '② 额鼻台阶转折锐利 + 骨相分明',
    '③ 龙类切多面硬棱 + 椭圆角座向后弯',
  ],
});

// ============================================================================
// 3. 日系 Kemono 兽耳斜座 + Q弹肉垫兽爪 + 6头身 Z 字趾行腿全身
// ============================================================================
export const PLATE_FURRY_KEMONO_EARS_BODY = wrapNanoBananaSheet({
  title: '🇯🇵 日系 Kemono 核心解剖：斜向椭圆耳座 · Q弹心形肉垫掌 · 6头身Z字趾行腿',
  badge: 'Nano Banana 红蓝结构线稿',
  imageUrl: './assets/diagrams/furry-kemono-ears-body.jpg',
  tone: 'blue',
  tags: [
    '左：头骨两侧斜椭圆耳座 + 耳毛',
    '中：心形主掌垫 + 4颗圆润指豆与弯爪',
    '右：6头身 + Z腿脚掌正落红重心垂线',
  ],
});

// ============================================================================
// 4. 二次元 Loomis 十字球四角度（正 / 3/4 / 仰视 / 俯视）
// ============================================================================
export const PLATE_ANIME_HEAD_LOOMIS = wrapNanoBananaSheet({
  title: '✨ 二次元 Loomis 十字球四角度推导（正面 · 3/4侧面 · 仰视 · 俯视）',
  badge: 'Nano Banana 红蓝结构线稿',
  imageUrl: './assets/diagrams/anime-head-loomis.jpg',
  tone: 'blue',
  tags: [
    '正/3/4：颞部切面椭圆定耳位',
    '仰视：纬线向上拱∩ · 露下巴底面',
    '俯视：纬线向下弯∪ · 颅顶大耳朵抬高',
  ],
});

// ============================================================================
// 5. 二次元极简高自由度五官定位 + 三区大发束分组（anime-2 / anime-3）
// ============================================================================
export const PLATE_ANIME_FACE_HAIR = wrapNanoBananaSheet({
  title: '✨ 二次元极简高自由度眼框定位（左） + 发旋放射三区大块发束（右）',
  badge: 'Nano Banana 红蓝结构线稿',
  imageUrl: './assets/diagrams/anime-face-hair.jpg',
  tone: 'blue',
  tags: [
    '左：厚上睑弧 + 留白简椭圆虹膜（高自由度）',
    '中：3/4 远侧眼随球面横向压缩',
    '右：发旋起点 + 离颅骨蓬松三区大发束',
  ],
});

// ============================================================================
// 6. 二次元头身比例 + S型对立重心动态 + 半身像大衣褶（anime-4 ~ anime-7）
// ============================================================================
export const PLATE_ANIME_BODY_POSE = wrapNanoBananaSheet({
  title: '✨ 二次元全身头身比例（左） · S型反斜重心动态（中） · 半身胸像与拉力衣褶（右）',
  badge: 'Nano Banana 红蓝结构线稿',
  imageUrl: './assets/diagrams/anime-body-pose.jpg',
  tone: 'blue',
  tags: [
    '左：耻骨定全身1/2 · 窄肩收腰修长腿',
    '中：红肩线↘ 与 蓝胯线↗ 反斜破立正',
    '右：极简眼半身像 + 肩肘支点Y/X大衣褶',
  ],
});

// ============================================================================
// 7. 二次元赛璐璐二分上色与线稿层级半身图（极简高自由度版）
// ============================================================================
export const PLATE_ANIME_CEL_SHEET = wrapNanoBananaSheet({
  title: '✨ 极简高自由度日系半身清稿线 + 赛璐璐二分阴影边界（浅蓝虚线为暗面区）',
  badge: 'Nano Banana 极简练习底图',
  imageUrl: './assets/templates/tpl-anime-cel-lineart.jpg',
  tone: 'ink',
  tags: [
    '① 极简留白椭圆眼框，自由加瞳孔高光',
    '② 5~6束大块概括发束，告别碎发AI感',
    '③ 浅蓝虚线标出刘海/颈部/领口二分暗面',
  ],
});

export const PLATE_TPL_ANIME_CEL = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" font-family="${SVG_FONT}">
  <image href="./assets/templates/tpl-anime-cel-lineart.jpg" x="0" y="0" width="1200" height="900" preserveAspectRatio="xMidYMid meet"/>
</svg>`;

// ============================================================================
// 6. 人体练习：3D 胸腔蛋+骨盆盒扭转 & 五边形手掌手指分组
// ============================================================================
export const PLATE_FIGURE_TORSO_HAND = wrapRedBlueCheatSheetSVG({
  leftTitle: '🏃 躯干红蓝体块：胸腔蛋 + 骨盆盒对立平衡',
  rightTitle: '✋ 手部结构：五边形掌盒 + 1+2+1 分组指柱',
  leftTone: 'blue',
  rightTone: 'ink',
  connector: 'vs',
  leftBody: `
    <g transform="translate(174, 114)">
      <!-- Counter-tilted shoulder & hip plane axes -->
      <line x1="-88" y1="-64" x2="88" y2="-40" stroke="#e11d48" stroke-width="1.5" stroke-dasharray="4 3"/>
      <line x1="-88" y1="62" x2="88" y2="38" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4 3"/>

      <!-- 3/4 Ribcage Egg (+8 deg tilt) -->
      <g transform="translate(-2, -32) rotate(8)">
        <ellipse cx="0" cy="-42" rx="16" ry="6" fill="none" stroke="#0284c7" stroke-width="1.4"/>
        <path d="M 0 -46 C 30 -46, 40 -20, 36 14 C 33 34, 16 44, -2 44 C -24 44, -38 28, -38 2 C -38 -24, -24 -46, 0 -46 Z"
          fill="#e0f2fe" fill-opacity="0.42" stroke="#0284c7" stroke-width="1.7"/>
        <!-- Front curved sternum centerline + thoracic arch -->
        <path d="M 10 -44 C 22 -16, 22 18, 12 42" fill="none" stroke="#0284c7" stroke-width="1.6"/>
        <path d="M -12 38 Q 14 8 32 30" fill="none" stroke="#0284c7" stroke-width="1.3" stroke-dasharray="3 2"/>
      </g>

      <!-- Compact Lumbar Waist Connector (~18px soft waist) -->
      <path d="M -34 10 C -36 22, -34 32, -30 42 M 30 6 C 22 18, 22 28, 34 38"
        fill="none" stroke="#0284c7" stroke-width="1.4" stroke-dasharray="3 2"/>

      <!-- 3/4 Pelvis 3D Box (-8 deg counter-tilt) -->
      <g transform="translate(2, 54) rotate(-8)">
        <polygon points="-36,-18 28,-18 40,-6 -22,-6" fill="#ffe4e6" fill-opacity="0.58" stroke="#e11d48" stroke-width="1.5"/>
        <polygon points="-22,-6 40,-6 34,26 10,34 -8,34 -20,20" fill="#ffe4e6" fill-opacity="0.32" stroke="#e11d48" stroke-width="1.6"/>
        <polygon points="-36,-18 -22,-6 -20,20 -34,8" fill="#fecdd3" fill-opacity="0.44" stroke="#e11d48" stroke-width="1.5"/>
        <line x1="10" y1="-6" x2="2" y2="34" stroke="#e11d48" stroke-width="1.5"/>
        <ellipse cx="-27" cy="6" rx="6" ry="11" fill="none" stroke="#e11d48" stroke-width="1.3"/>
      </g>

      <!-- Ink Anatomical Overlay: Neck Cylinder, Clavicle S-bar, Deltoid Caps, Stretch/Pinch Waist -->
      <path d="M -14 -98 L -13 -74 M 15 -98 L 14 -72" fill="none" stroke="#0f172a" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M -14 -84 Q -32 -76 -52 -66 M 14 -82 Q 34 -72 56 -56" fill="none" stroke="#0f172a" stroke-width="1.7" stroke-linecap="round"/>
      <path d="M 8 -70 Q -26 -78 -54 -64 M 8 -70 Q 34 -72 58 -52" fill="none" stroke="#0f172a" stroke-width="2.3" stroke-linecap="round"/>
      <!-- Deltoid caps tapering into arm cylinders -->
      <path d="M -54 -64 C -70 -50, -68 -24, -56 -8 C -46 -22, -44 -44, -54 -64 Z" fill="none" stroke="#0f172a" stroke-width="2.1"/>
      <path d="M 58 -52 C 72 -36, 70 -10, 56 6 C 48 -8, 48 -34, 58 -52 Z" fill="none" stroke="#0f172a" stroke-width="2.1"/>
      <path d="M -60 -12 L -64 26 M -44 -20 L -48 24 M 62 -2 L 66 34 M 46 -12 L 48 32" fill="none" stroke="#0f172a" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Pectoral & pinch/stretch waist lines -->
      <path d="M 10 -66 L 12 -22 C -12 -18, -34 -24, -46 -40 M 12 -22 C 30 -14, 44 -18, 50 -32" fill="none" stroke="#0f172a" stroke-width="1.8"/>
      <path d="M -36 -6 C -42 14, -40 30, -34 44" fill="none" stroke="#0f172a" stroke-width="2.3" stroke-linecap="round"/>
      <path d="M 32 6 C 20 18, 22 28, 35 36" fill="none" stroke="#0f172a" stroke-width="2.3" stroke-linecap="round"/>
    </g>
    <text x="12" y="42" font-size="11" font-weight="700" fill="#e11d48">肩线 ↘</text>
    <text x="12" y="168" font-size="11" font-weight="700" fill="#0284c7">胯线 ↗</text>
    <text x="256" y="108" font-size="11" font-weight="700" fill="#0f172a">右腰挤压折叠</text>
    <text x="178" y="226" font-size="11" fill="#0369a1" text-anchor="middle">蓝卵胸腔 + 紧凑腰段 + 红盒骨盆 = 稳固对立平衡</text>
  `,
  rightBody: `
    <g transform="translate(174, 122)">
      <!-- Concentric finger tip & MCP knuckle arches -->
      <path d="M -60 -60 Q 0 -116 62 -64" fill="none" stroke="#0284c7" stroke-width="1.4" stroke-dasharray="4 3"/>
      <path d="M -46 -38 Q 2 -74 52 -42" fill="none" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="3 3"/>
      <path d="M -42 -12 Q 2 -32 42 -12" fill="none" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4 3"/>

      <!-- 3D Beveled Pentagonal Palm Block (Height ~76px ≈ Middle Finger Length) -->
      <polygon points="-32,64 26,64 40,-12 0,-26 -38,-12" fill="#ffe4e6" fill-opacity="0.38" stroke="#e11d48" stroke-width="1.7" stroke-linejoin="round"/>
      <!-- Ulnar side thickness facet -->
      <polygon points="-38,-12 -47,-4 -39,58 -32,64" fill="#fecdd3" fill-opacity="0.48" stroke="#e11d48" stroke-width="1.4"/>
      <!-- Wrist cylinder -->
      <path d="M -28 64 L -30 88 M 24 64 L 26 88" fill="none" stroke="#0f172a" stroke-width="2.2"/>
      <path d="M -29 66 Q 0 72 25 66" fill="none" stroke="#e11d48" stroke-width="1.3"/>

      <!-- Abducted 3D Thenar Muscle Wedge + Articulated Thumb -->
      <ellipse cx="38" cy="34" rx="14" ry="22" transform="rotate(24 38 34)" fill="#e0f2fe" fill-opacity="0.58" stroke="#0284c7" stroke-width="1.5"/>
      <path d="M 32 54 C 48 42, 62 24, 72 4 C 78 -6, 66 -12, 58 -2 L 42 24"
        fill="#ffffff" fill-opacity="0.9" stroke="#0f172a" stroke-width="2.3" stroke-linejoin="round"/>
      <path d="M 54 14 Q 60 18 65 15" fill="none" stroke="#0f172a" stroke-width="1.3"/>

      <!-- 1 + 2 + 1 Articulated Tapered Finger Cylinders -->
      <!-- Pinky (1, slightly angled out) -->
      <path d="M -36 -12 L -53 -54 C -55 -60, -45 -63, -42 -56 L -26 -16" fill="#ffffff" fill-opacity="0.9" stroke="#0f172a" stroke-width="2.1" stroke-linejoin="round"/>
      <path d="M -47 -36 Q -41 -39 -36 -36" fill="none" stroke="#0f172a" stroke-width="1.1"/>
      <!-- Ring + Middle Paired (2) -->
      <path d="M -22 -18 L -20 -78 C -20 -84, -8 -84, -7 -78 L -6 -24" fill="#ffffff" fill-opacity="0.9" stroke="#0f172a" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M -19 -52 L -9 -52 M -18 -66 L -10 -66" fill="none" stroke="#0f172a" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M -5 -24 L -3 -96 C -3 -102, 10 -102, 11 -96 L 12 -22" fill="#ffffff" fill-opacity="0.9" stroke="#0f172a" stroke-width="2.3" stroke-linejoin="round"/>
      <path d="M -2 -62 L 9 -62 M -1 -80 L 8 -80" fill="none" stroke="#0f172a" stroke-width="1.1" stroke-linecap="round"/>
      <!-- Index Separate (1) -->
      <path d="M 18 -18 L 36 -74 C 38 -81, 49 -78, 47 -70 L 32 -12" fill="#ffffff" fill-opacity="0.9" stroke="#0f172a" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M 27 -48 L 38 -45 M 32 -62 L 42 -59" fill="none" stroke="#0f172a" stroke-width="1.1" stroke-linecap="round"/>
      <!-- Dorsal knuckle tendons cue -->
      <path d="M -22 22 Q 4 12 22 24" fill="none" stroke="#0f172a" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <text x="12" y="42" font-size="11" font-weight="700" fill="#0284c7">指尖/指根同心弧</text>
    <text x="12" y="168" font-size="11" font-weight="700" fill="#e11d48">五边形厚掌盒</text>
    <text x="256" y="168" font-size="11" font-weight="700" fill="#0284c7">大鱼际椭圆球座</text>
    <text x="178" y="226" font-size="11" fill="#0f172a" text-anchor="middle">五边形掌盒（中指≈掌长）+ 1+2+1 分组指柱</text>
  `,
});

// ============================================================================
// 8. 日系 Kemono 兽人表情联动（开心竖耳 / 委屈飞机耳 / 愤怒皱鼻低吼）
// ============================================================================
export const PLATE_FURRY_KEMONO_EXPRESSIONS = wrapNanoBananaSheet({
  title: '🇯🇵 日系 Kemono 兽人表情联动（左：开心竖耳 · 中：委屈飞机耳 · 右：愤怒皱鼻低吼）',
  badge: 'Nano Banana 红蓝结构线稿',
  imageUrl: './assets/diagrams/furry-kemono-expressions.jpg',
  tone: 'blue',
  tags: [
    '① 开心：双耳高竖 + 吻角顺弧面上扬',
    '② 委屈：耳廓绕椭圆耳座外旋成飞机耳',
    '③ 低吼：耳贴脑后 + 鼻梁挤皱 + 下颌张开',
  ],
});

// ============================================================================
// 9. 日系 Kemono 簇状毛发节奏与骨盆 S 型蓬松大尾
// ============================================================================
export const PLATE_FURRY_KEMONO_FUR_TUFTS = wrapNanoBananaSheet({
  title: '🇯🇵 日系 Kemono 簇状毛发节奏（左：顺滑短毛+转折大中小毛簇 · 右：骨盆S型蓬松大尾）',
  badge: 'Nano Banana 红蓝结构线稿',
  imageUrl: './assets/diagrams/furry-kemono-fur-tufts.jpg',
  tone: 'blue',
  tags: [
    '① 额顶与短吻85%顺滑留白，忌画满圈锯齿',
    '② 腮毛/胸鬃/肘部按大中小S弧分组顺流生长',
    '③ 尾根顺骶骨脊柱S线延出，外弯处开毛簇',
  ],
});

// ============================================================================
// 10. 二次元极简高自由度五官与眉眼情绪定位（anime-4）
// ============================================================================
export const PLATE_ANIME_EXPRESSIONS = wrapNanoBananaSheet({
  title: '✨ 二次元极简高自由度五官与眉眼情绪定位（正/3/4眼框收缩与发旋三区发束）',
  badge: 'Nano Banana 红蓝结构线稿',
  imageUrl: './assets/diagrams/anime-face-hair.jpg',
  tone: 'blue',
  tags: [
    '① 极简上睑粗弧 + 留白椭圆虹膜，自由改眼神',
    '② 眉弓倾角与下眼睑上顶决定喜怒哀乐',
    '③ 3/4侧面远眼横向压缩，大笑时下巴微降',
  ],
});

// ============================================================================
// 11. 人体比例标尺 · 胸腔蛋+骨盆盒反斜扭转 · 肩臂圆柱穿插与拉力褶
// ============================================================================
export const PLATE_FIGURE_BODY_SYSTEM = wrapNanoBananaSheet({
  title: '🏃 人体比例标尺（左） · 胸腔蛋+骨盆盒反斜扭转（中） · 肩臂圆柱穿插与拉力褶（右）',
  badge: 'Nano Banana 红蓝结构线稿',
  imageUrl: './assets/diagrams/anime-body-pose.jpg',
  tone: 'blue',
  tags: [
    '左：耻骨定全身1/2中点 · 肘齐腰腕齐裆',
    '中：蓝胸腔与红骨盆反向倾斜 (Contrapposto)',
    '右：锁骨连三角肌球，四肢圆柱向远端收细',
  ],
});
