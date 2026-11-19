/**
 * DrawPath Studio · 画路工坊
 * 🏃 人体练习 (Figure Drawing & Anatomy) 完整 8 关递进课程与练习底图
 */

import { wrapTemplateSVG } from './svg-helpers.js';
import { PLATE_FIGURE_BODY_SYSTEM, PLATE_FIGURE_TORSO_HAND } from './redblue-plates.js';

export const FIGURE_TEMPLATES = [
  // ==================== 1. 动作线与重心平衡 ====================
  {
    id: 'tpl-figure-gesture',
    name: '动作线 (Line of Action) 与重心平衡靶纸',
    track: 'figure',
    lessonId: 'figure-1',
    description: '包含静态站姿重心垂线、C型拉伸挤压弧线与S型冲刺失衡动势三区引导。',
    svgContent: wrapTemplateSVG(
      'FIGURE-1 · 动作线 (Line of Action) 与重心平衡练习',
      '口诀：一笔甩出贯穿全身的 C/S 主弧线，静态站姿锁骨窝垂线必落入足底支撑区',
      `
      <!-- Zone 1: Balanced Standing Plumb Line -->
      <rect x="48" y="92" width="348" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="66" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 1 · 静态站姿与重心垂线校准</text>
      <text x="66" y="140" font-size="11.5" fill="#475569" fill-opacity="0.7">顺着柔和 S 弧线套画蛋盒体块，核对垂线落点</text>

      <!-- Ground plane & foot support oval -->
      <line x1="88" y1="780" x2="356" y2="780" stroke="#94a3b8" stroke-opacity="0.55" stroke-width="1.5"/>
      <ellipse cx="222" cy="780" rx="68" ry="14" fill="#10b981" fill-opacity="0.09" stroke="#10b981" stroke-opacity="0.48" stroke-dasharray="5 4"/>
      <text x="222" y="814" font-size="11.5" font-weight="600" fill="#059669" fill-opacity="0.78" text-anchor="middle">足底支撑面（重心必落此区）</text>

      <!-- Plumb line from pit of neck -->
      <line x1="216" y1="262" x2="216" y2="772" stroke="#10b981" stroke-opacity="0.55" stroke-width="1.8" stroke-dasharray="6 5" marker-end="url(#tpl-arrow-emerald)"/>
      <circle cx="216" cy="262" r="5" fill="#10b981" fill-opacity="0.75"/>
      <text x="230" y="266" font-size="11" fill="#059669" fill-opacity="0.8">锁骨窝起点</text>

      <!-- Sweeping S Line of Action + subtle construction hints -->
      <path d="M222 184 C194 260, 246 390, 212 500 C196 565, 206 675, 214 776" fill="none" stroke="#6366f1" stroke-opacity="0.55" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="222" cy="212" rx="28" ry="36" fill="none" stroke="#38bdf8" stroke-opacity="0.45" stroke-width="1.5" transform="rotate(6 222 212)"/>
      <!-- Subtle tilted shoulder & hip cues -->
      <line x1="162" y1="286" x2="270" y2="272" stroke="#0284c7" stroke-opacity="0.42" stroke-width="1.6" stroke-dasharray="4 4"/>
      <line x1="176" y1="452" x2="264" y2="466" stroke="#0284c7" stroke-opacity="0.42" stroke-width="1.6" stroke-dasharray="4 4"/>
      <text x="122" y="388" font-size="11" fill="#4f46e5" fill-opacity="0.75">S 型主弧线</text>
      <text x="278" y="546" font-size="11" fill="#475569" fill-opacity="0.68">承重腿直落</text>
      <path d="M252 470 Q276 620 264 772" fill="none" stroke="#38bdf8" stroke-opacity="0.32" stroke-width="1.6" stroke-dasharray="5 5"/>

      <!-- Zone 2: Big C-Curve Leap / Stretch vs Pinch -->
      <rect x="420" y="92" width="356" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="438" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 2 · C 型大弧线（拉伸侧 vs 挤压侧）</text>
      <text x="438" y="140" font-size="11.5" fill="#475569" fill-opacity="0.7">外弧舒展拉长，内弧折叠压缩，忌画成僵硬折线</text>

      <!-- Upper C-curve: Backbend / Reach -->
      <path d="M510 218 C648 258, 690 420, 560 568" fill="none" stroke="#6366f1" stroke-opacity="0.58" stroke-width="3.2" stroke-linecap="round"/>
      <ellipse cx="508" cy="218" rx="26" ry="34" fill="none" stroke="#38bdf8" stroke-opacity="0.45" stroke-width="1.5" transform="rotate(-24 508 218)"/>
      <!-- Stretch / Pinch directional cues -->
      <path d="M668 296 Q698 386 644 476" fill="none" stroke="#0284c7" stroke-opacity="0.55" stroke-width="1.6" marker-start="url(#tpl-arrow)" marker-end="url(#tpl-arrow)"/>
      <text x="692" y="390" font-size="11.5" font-weight="600" fill="#0284c7" fill-opacity="0.8">拉伸侧</text>
      <path d="M566 346 L594 378 L566 408" fill="none" stroke="#d97706" stroke-opacity="0.65" stroke-width="1.8"/>
      <text x="518" y="382" font-size="11.5" font-weight="600" fill="#d97706" fill-opacity="0.82">挤压侧</text>
      <line x1="468" y1="576" x2="732" y2="576" stroke="#94a3b8" stroke-opacity="0.45" stroke-width="1.4"/>

      <!-- Lower C-curve: Dynamic Jump -->
      <path d="M664 620 C562 642, 514 712, 548 804" fill="none" stroke="#6366f1" stroke-opacity="0.55" stroke-width="3" stroke-dasharray="8 6" stroke-linecap="round"/>
      <circle cx="664" cy="620" r="22" fill="none" stroke="#38bdf8" stroke-opacity="0.45" stroke-width="1.5"/>
      <text x="602" y="836" font-size="11.5" fill="#4f46e5" fill-opacity="0.72" text-anchor="middle">沿虚线 C 弧补全腾空跃起火柴体块</text>

      <!-- Zone 3: Dynamic Off-Balance Sprint / Swing -->
      <rect x="800" y="92" width="352" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="818" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 3 · 主动失衡冲刺与挥击 S 弧</text>
      <text x="818" y="140" font-size="11.5" fill="#475569" fill-opacity="0.7">奔跑时重心故意落在脚掌前方，制造强烈速度感</text>

      <!-- Top sprint guide -->
      <line x1="836" y1="472" x2="1122" y2="472" stroke="#94a3b8" stroke-opacity="0.5" stroke-width="1.5"/>
      <path d="M1050 226 C1002 288, 956 364, 888 466" fill="none" stroke="#6366f1" stroke-opacity="0.58" stroke-width="3.2" stroke-linecap="round"/>
      <ellipse cx="1062" cy="214" rx="25" ry="32" fill="none" stroke="#38bdf8" stroke-opacity="0.45" stroke-width="1.5" transform="rotate(34 1062 214)"/>
      <!-- Off-balance plumb line leading ahead -->
      <line x1="1032" y1="258" x2="1032" y2="466" stroke="#d97706" stroke-opacity="0.62" stroke-width="1.8" stroke-dasharray="5 4" marker-end="url(#tpl-arrow-amber)"/>
      <text x="1044" y="458" font-size="11" font-weight="600" fill="#d97706" fill-opacity="0.85">重心超前 = 冲刺势能</text>
      <circle cx="888" cy="468" r="6" fill="#38bdf8" fill-opacity="0.55"/>
      <text x="876" y="492" font-size="11" fill="#475569" fill-opacity="0.72">蹬地脚点</text>

      <!-- Bottom free gesture S-arc -->
      <line x1="836" y1="816" x2="1122" y2="816" stroke="#94a3b8" stroke-opacity="0.5" stroke-width="1.5"/>
      <path d="M902 558 C968 608, 1020 684, 962 812" fill="none" stroke="#6366f1" stroke-opacity="0.52" stroke-width="3" stroke-dasharray="8 6" stroke-linecap="round"/>
      <circle cx="902" cy="558" r="22" fill="none" stroke="#38bdf8" stroke-opacity="0.42" stroke-width="1.5"/>
      <path d="M886 632 L1068 600" fill="none" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.6" marker-end="url(#tpl-arrow)"/>
      <text x="976" y="840" font-size="11.5" fill="#4f46e5" fill-opacity="0.72" text-anchor="middle">顺势补全扭转挥臂或出拳动势</text>
      `
    )
  },

  // ==================== 2. 通用头身比例与关键骨点 ====================
  {
    id: 'tpl-figure-proportions',
    name: '7.5 头身比例标尺与关键骨点定位底图',
    track: 'figure',
    lessonId: 'figure-2',
    description: '精确 7.5 头身刻度线、肩宽 2 头标尺、耻骨中点与肘/腕/膝骨点对齐模板。',
    svgContent: wrapTemplateSVG(
      'FIGURE-2 · 通用 7.5 头身比例标尺与关键骨点定位',
      '口诀：耻骨为全身中点 · 肩宽约2头 · 肘齐腰(3头) · 腕齐裆(3.8头) · 膝居胯脚正中(5.5头)',
      `
      <!-- Horizontal 7.5-head calibration grid (y=120 to y=832.5, step=95px per head) -->
      <g stroke="#38bdf8" stroke-opacity="0.26" stroke-width="1">
        <line x1="126" y1="120" x2="1148" y2="120" stroke-opacity="0.48"/>
        <line x1="126" y1="215" x2="1148" y2="215"/>
        <line x1="126" y1="262" x2="1148" y2="262" stroke-dasharray="5 5" stroke-opacity="0.22"/>
        <line x1="126" y1="310" x2="1148" y2="310"/>
        <line x1="126" y1="405" x2="1148" y2="405" stroke="#6366f1" stroke-opacity="0.34"/>
        <line x1="126" y1="476" x2="1148" y2="476" stroke="#d97706" stroke-opacity="0.45" stroke-width="1.5" stroke-dasharray="7 4"/>
        <line x1="126" y1="500" x2="1148" y2="500" stroke-opacity="0.2"/>
        <line x1="126" y1="595" x2="1148" y2="595" stroke-opacity="0.2"/>
        <line x1="126" y1="642" x2="1148" y2="642" stroke="#6366f1" stroke-opacity="0.32" stroke-dasharray="5 4"/>
        <line x1="126" y1="690" x2="1148" y2="690" stroke-opacity="0.2"/>
        <line x1="126" y1="785" x2="1148" y2="785" stroke-opacity="0.24"/>
        <line x1="126" y1="832" x2="1148" y2="832" stroke="#0284c7" stroke-opacity="0.52" stroke-width="1.6"/>
      </g>

      <!-- Left ruler labels -->
      <g font-size="11.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">
        <text x="52" y="124">0 · 头顶</text>
        <text x="52" y="219">1 · 下巴</text>
        <text x="52" y="266" fill="#475569" font-weight="500">1.5 · 肩线</text>
        <text x="52" y="314">2 · 胸线</text>
        <text x="52" y="409" fill="#4f46e5">3 · 肚脐/肘</text>
        <text x="52" y="480" fill="#d97706">3.75 · 耻骨</text>
        <text x="52" y="646" fill="#4f46e5">5.5 · 膝盖</text>
        <text x="52" y="789" fill="#475569" font-weight="500">7 · 脚踝</text>
        <text x="52" y="836">7.5 · 脚底</text>
      </g>

      <!-- Column 1: Clean Proportional Construction Mannequin (center x=340) -->
      <line x1="340" y1="106" x2="340" y2="844" stroke="#6366f1" stroke-opacity="0.28" stroke-width="1.2" stroke-dasharray="5 5"/>
      <text x="340" y="102" font-size="12.5" font-weight="700" fill="#0284c7" fill-opacity="0.78" text-anchor="middle">标准正面比例骨架示范（肩宽 = 2 头宽）</text>

      <!-- 2-head width bracket above shoulders -->
      <line x1="252" y1="242" x2="428" y2="242" stroke="#6366f1" stroke-opacity="0.55" stroke-width="1.4" marker-start="url(#tpl-arrow-indigo)" marker-end="url(#tpl-arrow-indigo)"/>

      <g fill="none" stroke="#0284c7" stroke-opacity="0.52" stroke-width="1.7">
        <!-- Head (1 head = 95px tall, width ~ 66px) -->
        <path d="M340 120 C366 120, 374 146, 372 174 C370 198, 356 215, 340 215 C324 215, 310 198, 308 174 C306 146, 314 120, 340 120 Z"/>
        <!-- Neck + Clavicle -->
        <path d="M324 210 L324 246 M356 210 L356 246"/>
        <path d="M254 266 Q298 250 340 256 Q382 250 426 266" stroke="#4f46e5" stroke-opacity="0.62" stroke-width="2"/>
        <!-- Tapered Ribcage Egg (y=256..386) -->
        <path d="M340 256 C386 256, 404 294, 396 346 C392 374, 374 388, 340 388 C306 388, 288 374, 284 346 C276 294, 294 256, 340 256 Z"/>
        <!-- Thoracic Arch -->
        <path d="M308 380 Q340 338 372 380" stroke-dasharray="4 3" stroke-opacity="0.42"/>
        <!-- Waist contours -->
        <path d="M294 374 C296 394, 292 406, 286 420 M386 374 C384 394, 388 406, 394 420" stroke-opacity="0.42"/>
        <!-- Pelvis Trapezoid Box (y=414..482) -->
        <path d="M286 418 L394 418 L400 456 L360 482 L320 482 L280 456 Z"/>
        <!-- Arms: Shoulder -> Elbow (y=405) -> Wrist (y=480) -> Fingertips (y=544) -->
        <path d="M254 266 C244 316, 240 364, 244 405 C242 436, 236 462, 234 480 L226 538"/>
        <path d="M426 266 C436 316, 440 364, 436 405 C438 436, 444 462, 446 480 L454 538"/>
        <!-- Legs: Trochanter (y=466) -> Knee (y=642) -> Ankle (y=792) -> Foot wedge (y=832) -->
        <path d="M286 462 C282 528, 294 590, 304 642 C298 698, 306 752, 314 792 L296 832 L328 832 L322 792"/>
        <path d="M394 462 C398 528, 386 590, 376 642 C382 698, 374 752, 366 792 L384 832 L352 832 L358 792"/>
        <path d="M326 482 C328 544, 326 600, 318 642 M354 482 C352 544, 354 600, 362 642" stroke-opacity="0.38"/>
      </g>

      <!-- Key Bone Landmark Dots -->
      <g fill="#d97706" fill-opacity="0.82">
        <circle cx="340" cy="256" r="4.5"/>
        <circle cx="254" cy="266" r="4"/>
        <circle cx="426" cy="266" r="4"/>
        <circle cx="244" cy="405" r="4"/>
        <circle cx="436" cy="405" r="4"/>
        <circle cx="340" cy="476" r="5"/>
        <circle cx="234" cy="480" r="4"/>
        <circle cx="446" cy="480" r="4"/>
        <circle cx="310" cy="642" r="4.5"/>
        <circle cx="370" cy="642" r="4.5"/>
        <circle cx="316" cy="792" r="3.5"/>
        <circle cx="364" cy="792" r="3.5"/>
      </g>
      <text x="454" y="409" font-size="11" fill="#4f46e5" fill-opacity="0.8">← 手肘平肚脐</text>
      <text x="458" y="484" font-size="11" fill="#d97706" fill-opacity="0.85">← 手腕平耻骨</text>

      <!-- Column 2: Blank Front Practice Axis (center x=730) -->
      <rect x="576" y="96" width="290" height="752" rx="10" fill="none" stroke="#38bdf8" stroke-opacity="0.22" stroke-dasharray="5 5"/>
      <text x="721" y="114" font-size="12" font-weight="700" fill="#0284c7" fill-opacity="0.72" text-anchor="middle">练 1 · 对照标尺默写正面蛋盒人体</text>
      <line x1="721" y1="120" x2="721" y2="832" stroke="#6366f1" stroke-opacity="0.32" stroke-width="1.3" stroke-dasharray="5 5"/>
      <ellipse cx="721" cy="167" rx="31" ry="47" fill="none" stroke="#38bdf8" stroke-opacity="0.45" stroke-width="1.5" stroke-dasharray="4 4"/>
      <g fill="#d97706" fill-opacity="0.65">
        <circle cx="721" cy="256" r="4"/>
        <circle cx="721" cy="405" r="4"/>
        <circle cx="721" cy="476" r="4.5"/>
        <circle cx="696" cy="642" r="3.5"/>
        <circle cx="746" cy="642" r="3.5"/>
      </g>

      <!-- Column 3: Blank Side Profile Practice Axis (center x=1016) -->
      <rect x="890" y="96" width="252" height="752" rx="10" fill="none" stroke="#38bdf8" stroke-opacity="0.22" stroke-dasharray="5 5"/>
      <text x="1016" y="114" font-size="12" font-weight="700" fill="#0284c7" fill-opacity="0.72" text-anchor="middle">练 2 · 侧面脊柱 S 曲线与重心轴</text>
      <!-- Plumb line for side profile -->
      <line x1="1016" y1="120" x2="1016" y2="832" stroke="#10b981" stroke-opacity="0.38" stroke-width="1.4" stroke-dasharray="5 5"/>
      <!-- Subtle S-spine curve in side view -->
      <path d="M1016 215 C1026 244, 992 294, 996 346 C1000 390, 1024 416, 1012 468" fill="none" stroke="#6366f1" stroke-opacity="0.45" stroke-width="2" stroke-dasharray="5 4"/>
      <ellipse cx="1024" cy="167" rx="36" ry="47" fill="none" stroke="#38bdf8" stroke-opacity="0.45" stroke-width="1.5" stroke-dasharray="4 4"/>
      <text x="1016" y="848" font-size="11" fill="#059669" fill-opacity="0.75" text-anchor="middle">耳垂 → 肩峰 → 股骨大转子 → 外踝</text>
      `
    )
  },

  // ==================== 3. 胸腔蛋 + 骨盆盒的倾斜与扭转 ====================
  {
    id: 'tpl-figure-torso',
    name: '胸腔蛋 + 骨盆盒倾斜扭转 (Contrapposto) 底图',
    track: 'figure',
    lessonId: 'figure-3',
    description: '包含 3D 胸腔蛋与骨盆盒透视示范、肩胯反倾夹角训练及俯仰扭腰起手练习格。',
    svgContent: wrapTemplateSVG(
      'FIGURE-3 · 胸腔蛋 + 骨盆盒倾斜与扭转 (Contrapposto)',
      '口诀：胸腔像斜置的鸡蛋，骨盆像带厚度的斜切盒；肩胯反向倾斜才自然',
      `
      <!-- Zone 1: Standard 3/4 Ribcage Egg + Pelvis Box Reference -->
      <rect x="48" y="92" width="344" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="66" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 1 · 3/4 视角蛋盒体块转面示范</text>
      <text x="66" y="140" font-size="11.5" fill="#475569" fill-opacity="0.7">先画胸廓正面中线与侧面转折，明确朝向</text>

      <!-- 3/4 Ribcage Egg -->
      <g transform="translate(220, 320)">
        <path d="M-8 -118 C64 -118, 96 -52, 86 42 C78 104, 42 126, -10 126 C-64 126, -94 94, -90 28 C-86 -52, -62 -118, -8 -118 Z" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.62" stroke-width="2"/>
        <!-- Front centerline curving around 3/4 egg -->
        <path d="M22 -114 C52 -46, 54 44, 30 122" fill="none" stroke="#6366f1" stroke-opacity="0.65" stroke-width="2"/>
        <!-- Thoracic arch -->
        <path d="M-24 114 Q30 34 74 96" fill="none" stroke="#4f46e5" stroke-opacity="0.52" stroke-width="1.6" stroke-dasharray="5 4"/>
        <!-- Side plane ellipse -->
        <ellipse cx="-58" cy="-16" rx="22" ry="64" fill="none" stroke="#0284c7" stroke-opacity="0.38" stroke-dasharray="4 4"/>
        <!-- Neck opening ellipse -->
        <ellipse cx="4" cy="-112" rx="34" ry="13" fill="none" stroke="#4f46e5" stroke-opacity="0.55" stroke-width="1.5"/>
        <text x="0" y="-134" font-size="11.5" font-weight="600" fill="#4f46e5" fill-opacity="0.8" text-anchor="middle">胸腔蛋（前中线向右转）</text>
      </g>

      <!-- Flexible waist wrap contour -->
      <path d="M142 442 C148 486, 152 518, 146 544 M290 436 C284 480, 286 516, 294 548" fill="none" stroke="#0284c7" stroke-opacity="0.42" stroke-width="1.6" stroke-dasharray="5 4"/>
      <path d="M148 492 Q226 514 288 490" fill="none" stroke="#10b981" stroke-opacity="0.52" stroke-width="1.5" stroke-dasharray="4 4"/>
      <text x="220" y="508" font-size="11" fill="#059669" fill-opacity="0.78" text-anchor="middle">腰部软组织连接区</text>

      <!-- 3/4 Pelvis Box -->
      <g transform="translate(220, 626)">
        <!-- Top plane -->
        <polygon points="-78,-78 52,-88 92,-62 -36,-50" fill="#6366f1" fill-opacity="0.08" stroke="#4f46e5" stroke-opacity="0.58" stroke-width="1.8"/>
        <!-- Front plane -->
        <polygon points="-36,-50 92,-62 78,42 26,80 -18,80 -32,36" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.62" stroke-width="2"/>
        <!-- Side plane -->
        <polygon points="-78,-78 -36,-50 -32,36 -74,10" fill="#0284c7" fill-opacity="0.09" stroke="#0284c7" stroke-opacity="0.58" stroke-width="1.8"/>
        <!-- Front centerline -->
        <line x1="30" y1="-56" x2="10" y2="80" stroke="#6366f1" stroke-opacity="0.65" stroke-width="1.8"/>
        <!-- Hip socket ellipse on side plane -->
        <ellipse cx="-54" cy="4" rx="14" ry="26" fill="none" stroke="#d97706" stroke-opacity="0.62" stroke-width="1.6"/>
        <text x="0" y="106" font-size="11.5" font-weight="600" fill="#0284c7" fill-opacity="0.8" text-anchor="middle">骨盆盒（顶面 + 正面 + 侧髋面）</text>
      </g>

      <!-- Zone 2: Contrapposto Counter-Tilt Practice -->
      <rect x="416" y="92" width="360" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="434" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 2 · Contrapposto 肩胯反倾引导</text>
      <text x="434" y="140" font-size="11.5" fill="#475569" fill-opacity="0.7">沿反倾辅助线补全胸腔蛋与骨盆盒，体会挤压感</text>

      <!-- Shoulder tilt line (sloping down-right) -->
      <line x1="454" y1="264" x2="736" y2="330" stroke="#d97706" stroke-opacity="0.62" stroke-width="2" stroke-dasharray="6 4"/>
      <text x="466" y="254" font-size="11" font-weight="600" fill="#d97706" fill-opacity="0.85">肩线（左高右低）</text>

      <!-- Hip tilt line (sloping up-right / converging on right) -->
      <line x1="454" y1="594" x2="736" y2="528" stroke="#10b981" stroke-opacity="0.62" stroke-width="2" stroke-dasharray="6 4"/>
      <text x="466" y="616" font-size="11" font-weight="600" fill="#059669" fill-opacity="0.85">胯线（左低右高）</text>

      <!-- Converging pinch angle highlight on right -->
      <path d="M686 382 L716 428 L686 474" fill="none" stroke="#d97706" stroke-opacity="0.68" stroke-width="2"/>
      <text x="722" y="432" font-size="11.5" font-weight="700" fill="#d97706" fill-opacity="0.85">挤压</text>
      <path d="M474 340 Q452 430 474 520" fill="none" stroke="#0284c7" stroke-opacity="0.55" stroke-width="1.8" marker-start="url(#tpl-arrow)" marker-end="url(#tpl-arrow)"/>
      <text x="434" y="434" font-size="11.5" font-weight="700" fill="#0284c7" fill-opacity="0.82">拉伸</text>

      <!-- Center spine guide & light dashed placeholders -->
      <path d="M602 252 C572 346, 568 470, 598 634" fill="none" stroke="#6366f1" stroke-opacity="0.55" stroke-width="2.6" stroke-linecap="round"/>
      <ellipse cx="592" cy="364" rx="74" ry="96" fill="none" stroke="#38bdf8" stroke-opacity="0.34" stroke-width="1.5" stroke-dasharray="5 5" transform="rotate(13 592 364)"/>
      <rect x="520" y="520" width="144" height="106" rx="10" fill="none" stroke="#38bdf8" stroke-opacity="0.34" stroke-width="1.5" stroke-dasharray="5 5" transform="rotate(-13 592 573)"/>
      <text x="596" y="796" font-size="11.5" fill="#4f46e5" fill-opacity="0.75" text-anchor="middle">右侧承重腿顶高右胯 → 右腰挤压，左腰拉长</text>

      <!-- Zone 3: Twist & Foreshortened Tilt Challenges -->
      <rect x="800" y="92" width="352" height="368" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="818" y="120" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.78">练 1 · 扭腰转身（胸向右、胯向左）</text>
      <!-- Twist arrows & axis -->
      <path d="M976 170 C958 242, 992 326, 976 410" fill="none" stroke="#6366f1" stroke-opacity="0.48" stroke-width="2.2" stroke-dasharray="5 4"/>
      <path d="M904 236 Q976 266 1052 224" fill="none" stroke="#0284c7" stroke-opacity="0.58" stroke-width="2" marker-end="url(#tpl-arrow)"/>
      <text x="1062" y="226" font-size="11" fill="#0284c7" fill-opacity="0.8">胸朝右</text>
      <path d="M1046 356 Q976 382 900 344" fill="none" stroke="#10b981" stroke-opacity="0.58" stroke-width="2" marker-end="url(#tpl-arrow-emerald)"/>
      <text x="836" y="346" font-size="11" fill="#059669" fill-opacity="0.8">胯朝左</text>
      <text x="976" y="438" font-size="11" fill="#475569" fill-opacity="0.7" text-anchor="middle">在此画胸腔与骨盆呈 45° 扭转的蛋盒</text>

      <rect x="800" y="484" width="352" height="372" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="818" y="512" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.78">练 2 · 前倾俯仰透视（看到顶面/底面）</text>
      <path d="M926 576 C968 640, 1020 704, 1026 786" fill="none" stroke="#6366f1" stroke-opacity="0.48" stroke-width="2.2" stroke-dasharray="5 4"/>
      <ellipse cx="944" cy="602" rx="60" ry="26" fill="none" stroke="#4f46e5" stroke-opacity="0.48" stroke-width="1.6" transform="rotate(-14 944 602)"/>
      <text x="1018" y="592" font-size="11" fill="#4f46e5" fill-opacity="0.8">俯视见顶面</text>
      <polygon points="942,728 1068,708 1094,750 966,770" fill="none" stroke="#0284c7" stroke-opacity="0.42" stroke-width="1.5" stroke-dasharray="4 4"/>
      <text x="976" y="836" font-size="11" fill="#475569" fill-opacity="0.7" text-anchor="middle">把上胸画大压在骨盆前方，体现纵深叠压</text>
      `
    )
  },

  // ==================== 4. 四肢圆柱透视与肘/膝关节衔接 ====================
  {
    id: 'tpl-figure-limbs',
    name: '四肢圆柱透视、截面环与肘膝关节练习底图',
    track: 'figure',
    lessonId: 'figure-4',
    description: '训练手臂与腿部锥形圆柱、近大远小透视叠压以及小腿后弓/大腿前凸 S 韵律。',
    svgContent: wrapTemplateSVG(
      'FIGURE-4 · 四肢圆柱透视与肘/膝关节衔接',
      '口诀：四肢是带方向截面环的锥形圆柱，近段轮廓用 T 字叠压切在远段前方',
      `
      <!-- Top Half: Arms -->
      <rect x="48" y="92" width="1104" height="368" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">上区 · 手臂锥形圆柱与前伸透视叠压</text>

      <!-- Arm 1: Standard Tapered Arm Breakdown (left) -->
      <g transform="translate(86, 152)" fill="none" stroke="#0284c7" stroke-opacity="0.56" stroke-width="1.7">
        <!-- Shoulder cap -->
        <path d="M36 28 C16 42, 16 84, 38 98 C56 108, 78 96, 86 78" stroke="#4f46e5" stroke-opacity="0.62"/>
        <!-- Upper arm tapered cylinder -->
        <path d="M52 36 L176 58 M42 92 L166 106"/>
        <ellipse cx="110" cy="74" rx="14" ry="29" stroke="#6366f1" stroke-opacity="0.45" stroke-dasharray="4 3"/>
        <!-- Elbow hinge wedge -->
        <circle cx="174" cy="82" r="24" stroke="#d97706" stroke-opacity="0.55" stroke-dasharray="4 3"/>
        <!-- Forearm wider near elbow, tapering sharply to flat wrist box -->
        <path d="M180 58 C222 54, 256 64, 304 74 M174 106 C214 112, 254 102, 304 94"/>
        <ellipse cx="234" cy="83" rx="12" ry="26" stroke="#6366f1" stroke-opacity="0.45" stroke-dasharray="4 3"/>
        <!-- Flat wrist section -->
        <rect x="304" y="72" width="22" height="24" rx="3" stroke="#10b981" stroke-opacity="0.62"/>
        <text x="174" y="144" font-size="11.5" fill="#475569" fill-opacity="0.78" stroke="none" text-anchor="middle">上臂筒 → 肘关节绞链 → 小臂近肘粗、近腕扁</text>
      </g>

      <!-- Arm 2: Foreshortened Reaching Toward Viewer (center) -->
      <g transform="translate(468, 150)">
        <line x1="28" y1="74" x2="226" y2="142" stroke="#6366f1" stroke-opacity="0.48" stroke-width="1.8" stroke-dasharray="5 4" marker-end="url(#tpl-arrow-indigo)"/>
        <!-- Stacked foreshortened ellipses getting larger toward viewer -->
        <ellipse cx="44" cy="80" rx="22" ry="30" fill="none" stroke="#38bdf8" stroke-opacity="0.45" stroke-width="1.5"/>
        <ellipse cx="92" cy="96" rx="28" ry="36" fill="none" stroke="#0284c7" stroke-opacity="0.52" stroke-width="1.7"/>
        <ellipse cx="148" cy="116" rx="36" ry="44" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.62" stroke-width="2"/>
        <ellipse cx="204" cy="136" rx="42" ry="50" fill="#6366f1" fill-opacity="0.06" stroke="#4f46e5" stroke-opacity="0.68" stroke-width="2.2"/>
        <text x="128" y="216" font-size="11.5" font-weight="600" fill="#4f46e5" fill-opacity="0.8" text-anchor="middle">前伸透视：后圆被前圆遮挡（近大远小）</text>
      </g>

      <!-- Arm 3: Blank Practice Axes (right) -->
      <g transform="translate(778, 146)">
        <line x1="34" y1="42" x2="146" y2="118" stroke="#6366f1" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="5 4"/>
        <line x1="146" y1="118" x2="286" y2="62" stroke="#6366f1" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="5 4"/>
        <circle cx="34" cy="42" r="18" fill="none" stroke="#38bdf8" stroke-opacity="0.48" stroke-width="1.5"/>
        <circle cx="146" cy="118" r="16" fill="none" stroke="#d97706" stroke-opacity="0.58" stroke-width="1.6"/>
        <ellipse cx="286" cy="62" rx="12" ry="18" fill="none" stroke="#10b981" stroke-opacity="0.58" stroke-width="1.6"/>
        <text x="164" y="216" font-size="11.5" fill="#0284c7" fill-opacity="0.78" text-anchor="middle">练 1 · 沿中轴补全屈肘圆柱与截面弧线</text>
      </g>

      <!-- Bottom Half: Legs -->
      <rect x="48" y="484" width="1104" height="372" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="512" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">下区 · 腿部 S 型力学韵律与屈膝透视穿插</text>

      <!-- Leg 1: Side View S-Rhythm (left) -->
      <g transform="translate(116, 536)" fill="none" stroke="#0284c7" stroke-opacity="0.58" stroke-width="1.8">
        <!-- Spine of leg S-rhythm -->
        <path d="M96 14 C118 76, 114 128, 92 162 C76 198, 72 246, 86 286" stroke="#6366f1" stroke-opacity="0.58" stroke-width="2.4" stroke-dasharray="6 4"/>
        <!-- Thigh curves forward -->
        <path d="M60 12 C50 68, 60 122, 74 156 M136 14 C150 68, 134 118, 112 152"/>
        <!-- Knee box/patella plane -->
        <path d="M112 146 L118 172 L106 184" stroke="#d97706" stroke-opacity="0.7" stroke-width="2"/>
        <!-- Calf sweeps back -->
        <path d="M74 156 C52 192, 54 236, 74 286 M106 184 C104 220, 98 256, 98 286"/>
        <!-- Foot wedge -->
        <path d="M74 286 L68 302 L144 302 L100 284"/>
        <text x="156" y="74" font-size="11" fill="#0284c7" fill-opacity="0.8" stroke="none">大腿前拱</text>
        <text x="132" y="168" font-size="11" fill="#d97706" fill-opacity="0.82" stroke="none">膝盖方切</text>
        <text x="12" y="218" font-size="11" fill="#4f46e5" fill-opacity="0.8" stroke="none">小腿后弓</text>
      </g>

      <!-- Leg 2: Foreshortened Bent Knee Overlap (center) -->
      <g transform="translate(462, 536)" fill="none" stroke-width="1.8">
        <!-- Thigh coming forward toward viewer -->
        <path d="M62 28 C118 46, 168 78, 214 116 M34 94 C88 122, 138 152, 178 178" stroke="#0284c7" stroke-opacity="0.62"/>
        <ellipse cx="114" cy="96" rx="22" ry="44" transform="rotate(24 114 96)" stroke="#6366f1" stroke-opacity="0.48" stroke-dasharray="4 3"/>
        <!-- Front knee cap cutting over shin -->
        <ellipse cx="196" cy="148" rx="32" ry="38" fill="#38bdf8" fill-opacity="0.08" stroke="#4f46e5" stroke-opacity="0.68" stroke-width="2"/>
        <!-- Lower leg receding behind knee -->
        <path d="M180 184 C156 226, 136 258, 118 292 M224 166 C200 218, 176 256, 152 292" stroke="#0284c7" stroke-opacity="0.48" stroke-dasharray="5 3"/>
        <text x="132" y="308" font-size="11.5" font-weight="600" fill="#4f46e5" fill-opacity="0.8" stroke="none" text-anchor="middle">屈膝叠压：近处膝盖完全挡住后方小腿</text>
      </g>

      <!-- Leg 3: Blank Practice Leg Axes (right) -->
      <g transform="translate(808, 536)">
        <!-- Axis A: Stride leg -->
        <line x1="68" y1="30" x2="150" y2="148" stroke="#6366f1" stroke-opacity="0.52" stroke-width="2" stroke-dasharray="5 4"/>
        <line x1="150" y1="148" x2="96" y2="284" stroke="#6366f1" stroke-opacity="0.52" stroke-width="2" stroke-dasharray="5 4"/>
        <circle cx="68" cy="30" r="20" fill="none" stroke="#38bdf8" stroke-opacity="0.45" stroke-width="1.5"/>
        <rect x="134" y="132" width="32" height="32" rx="6" fill="none" stroke="#d97706" stroke-opacity="0.55" stroke-width="1.6"/>
        <circle cx="96" cy="284" r="12" fill="none" stroke="#10b981" stroke-opacity="0.55" stroke-width="1.6"/>
        <!-- Axis B: Standing straight leg -->
        <line x1="248" y1="30" x2="236" y2="158" stroke="#6366f1" stroke-opacity="0.45" stroke-width="2" stroke-dasharray="5 4"/>
        <line x1="236" y1="158" x2="246" y2="286" stroke="#6366f1" stroke-opacity="0.45" stroke-width="2" stroke-dasharray="5 4"/>
        <rect x="222" y="144" width="28" height="28" rx="5" fill="none" stroke="#d97706" stroke-opacity="0.5" stroke-width="1.5"/>
        <text x="156" y="308" font-size="11.5" fill="#0284c7" fill-opacity="0.78" text-anchor="middle">练 2 · 补全跨步与直立腿圆柱 + 截面弧</text>
      </g>
      `
    )
  },

  // ==================== 5. 手部几何块面与手指分组简化 ====================
  {
    id: 'tpl-figure-hands',
    name: '手部五边形掌盒、手套分组与动态起手底图',
    track: 'figure',
    lessonId: 'figure-5',
    description: '包含手掌五边形比例、中指指尖扇形弧、1+2+1 手套分组及多角度握拳起手盒。',
    svgContent: wrapTemplateSVG(
      'FIGURE-5 · 手部几何块面与手指分组简化 (Mitten Method)',
      '口诀：先定五边形掌盒（中指≈掌长），四指连成弧线手套再切缝，大拇指独立三角座',
      `
      <!-- Q1: Top-Left Palm Pentagon Proportions -->
      <rect x="48" y="92" width="540" height="372" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 1 · 五边形手掌盒与扇形弧比例</text>

      <g transform="translate(152, 146)" fill="none" stroke="#0284c7" stroke-opacity="0.6" stroke-width="1.8">
        <!-- Wrist -->
        <path d="M72 288 L76 244 M156 288 L152 244" stroke-opacity="0.45"/>
        <!-- Pentagonal Palm Box -->
        <polygon points="76,244 152,244 166,154 114,138 64,154" fill="#38bdf8" fill-opacity="0.06"/>
        <!-- Thumb triangular base (Thenar wedge) -->
        <polygon points="152,244 188,208 166,154" fill="#d97706" fill-opacity="0.08" stroke="#d97706" stroke-opacity="0.62"/>
        <path d="M188 208 L216 168 L224 134" stroke="#d97706" stroke-opacity="0.62"/>
        <!-- Knuckle Arch & Fingertip Fan Arch -->
        <path d="M56 156 Q114 128 172 156" stroke="#6366f1" stroke-opacity="0.68" stroke-width="1.8" stroke-dasharray="5 4"/>
        <path d="M40 58 Q114 4 182 54" stroke="#10b981" stroke-opacity="0.68" stroke-width="1.8" stroke-dasharray="5 4"/>
        <!-- Middle finger length = Palm length divider -->
        <line x1="114" y1="244" x2="114" y2="26" stroke="#6366f1" stroke-opacity="0.42" stroke-dasharray="4 4"/>
        <circle cx="114" cy="138" r="4" fill="#6366f1" fill-opacity="0.7"/>
        <!-- 4 finger axis rays fanning slightly -->
        <line x1="74" y1="150" x2="54" y2="62" stroke-opacity="0.45"/>
        <line x1="98" y1="142" x2="88" y2="34" stroke-opacity="0.45"/>
        <line x1="128" y1="142" x2="134" y2="32" stroke-opacity="0.45"/>
        <line x1="154" y1="150" x2="168" y2="54" stroke-opacity="0.45"/>
      </g>
      <text x="412" y="216" font-size="11.5" font-weight="600" fill="#059669" fill-opacity="0.82">指尖呈饱满扇形弧</text>
      <text x="412" y="274" font-size="11.5" fill="#4f46e5" fill-opacity="0.8">掌长 ≈ 中指长度</text>
      <text x="412" y="338" font-size="11.5" font-weight="600" fill="#d97706" fill-opacity="0.82">拇指独立三角根座</text>

      <!-- Q2: Top-Right Mitten Finger Grouping -->
      <rect x="612" y="92" width="540" height="372" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="632" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 2 · 手套分组法（1+2+1 / 1+3 拒绝均分）</text>

      <!-- Grouping A: 1+2+1 Graceful Hand -->
      <g transform="translate(672, 166)" fill="none" stroke-width="1.8">
        <polygon points="48,224 114,224 128,142 82,126 38,146" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.6"/>
        <!-- Index alone (1) -->
        <path d="M116 140 L142 64 L124 58 L98 134" fill="#6366f1" fill-opacity="0.07" stroke="#4f46e5" stroke-opacity="0.62"/>
        <!-- Middle + Ring grouped (2) -->
        <path d="M94 132 L92 38 L52 44 L58 138 Z" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.65"/>
        <!-- Pinky tilted out (1) -->
        <path d="M52 142 L26 84 L12 92 L38 148" fill="#6366f1" fill-opacity="0.07" stroke="#4f46e5" stroke-opacity="0.62"/>
        <!-- Thumb -->
        <path d="M116 218 L156 178 L166 132 L148 128 L138 164 L122 182" stroke="#d97706" stroke-opacity="0.68"/>
        <text x="86" y="258" font-size="11.5" fill="#059669" fill-opacity="0.82" stroke="none" text-anchor="middle">1 + 2 + 1 舒展分组（中/无名指成对）</text>
      </g>

      <!-- Grouping B: 1+3 Reaching Mitten -->
      <g transform="translate(918, 166)" fill="none" stroke-width="1.8">
        <polygon points="40,224 106,224 122,146 74,132 32,150" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.6"/>
        <!-- Index pointing (1) -->
        <path d="M108 142 L134 46 L116 42 L88 136" fill="#6366f1" fill-opacity="0.08" stroke="#4f46e5" stroke-opacity="0.65"/>
        <!-- Three fingers curled into single mitten block (3) -->
        <path d="M84 136 L78 86 L28 96 L34 150 Z" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.65"/>
        <path d="M108 214 L146 178 L132 138" stroke="#d97706" stroke-opacity="0.68"/>
        <text x="82" y="258" font-size="11.5" fill="#4f46e5" fill-opacity="0.82" stroke="none" text-anchor="middle">1 + 3 指向手套块</text>
      </g>

      <!-- Q3: Bottom-Left Fist 3D Box -->
      <rect x="48" y="488" width="540" height="368" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="516" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 3 · 握拳阶梯方块与拇指扣锁</text>

      <g transform="translate(116, 558)" fill="none" stroke="#0284c7" stroke-opacity="0.6" stroke-width="1.8">
        <!-- Back of hand top plane -->
        <polygon points="40,70 162,48 212,92 86,116" fill="#38bdf8" fill-opacity="0.07"/>
        <!-- Stepped first-phalanx front plane -->
        <polygon points="86,116 212,92 204,190 80,214" fill="#6366f1" fill-opacity="0.06" stroke="#4f46e5" stroke-opacity="0.62"/>
        <!-- Side thumb-lock plane -->
        <polygon points="40,70 86,116 80,214 36,166" fill="#d97706" fill-opacity="0.07" stroke="#d97706" stroke-opacity="0.62"/>
        <!-- Finger crease cuts on front plane -->
        <line x1="118" y1="110" x2="112" y2="208" stroke-dasharray="4 3" stroke-opacity="0.48"/>
        <line x1="150" y1="104" x2="144" y2="202" stroke-dasharray="4 3" stroke-opacity="0.48"/>
        <line x1="182" y1="98" x2="176" y2="196" stroke-dasharray="4 3" stroke-opacity="0.48"/>
        <!-- Thumb wrapping across lower front -->
        <path d="M52 162 L92 184 L162 168 L158 196 L84 212" stroke="#d97706" stroke-width="2.2" stroke-opacity="0.72"/>
      </g>
      <text x="384" y="646" font-size="11.5" fill="#4f46e5" fill-opacity="0.82">指节面像阶梯斜坡</text>
      <text x="384" y="684" font-size="11.5" fill="#0284c7" fill-opacity="0.8">四指合成一块再切 3 刀</text>
      <text x="384" y="722" font-size="11.5" fill="#d97706" fill-opacity="0.85">拇指横扣在食/中指上</text>

      <!-- Q4: Bottom-Right Practice Starter Boxes -->
      <rect x="612" y="488" width="540" height="368" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="632" y="516" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 4 · 三个多角度掌盒起手练习（补全手指）</text>

      <!-- Starter 1 -->
      <g transform="translate(652, 628)" fill="none" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.6" stroke-dasharray="5 4">
        <polygon points="22,124 88,124 102,42 54,28 12,46"/>
        <polygon points="88,124 120,92 102,42" stroke="#d97706" stroke-opacity="0.55"/>
        <path d="M4 -10 Q56 -48 112 -14" stroke="#10b981" stroke-opacity="0.52"/>
        <text x="58" y="156" font-size="11" fill="#475569" fill-opacity="0.72" stroke="none" text-anchor="middle">1 · 张开挥手</text>
      </g>
      <!-- Starter 2 -->
      <g transform="translate(822, 628)" fill="none" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.6" stroke-dasharray="5 4">
        <polygon points="18,118 82,134 104,54 62,32 24,42"/>
        <polygon points="82,134 118,108 104,54" stroke="#d97706" stroke-opacity="0.55"/>
        <circle cx="92" cy="18" r="24" stroke="#6366f1" stroke-opacity="0.35"/>
        <text x="64" y="156" font-size="11" fill="#475569" fill-opacity="0.72" stroke="none" text-anchor="middle">2 · 握持杯子/剑柄</text>
      </g>
      <!-- Starter 3 -->
      <g transform="translate(996, 628)" fill="none" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.6" stroke-dasharray="5 4">
        <polygon points="20,126 78,106 106,36 62,28 18,52"/>
        <polygon points="20,126 -8,92 18,52" stroke="#d97706" stroke-opacity="0.55"/>
        <text x="56" y="156" font-size="11" fill="#475569" fill-opacity="0.72" stroke="none" text-anchor="middle">3 · 捏取/比心手势</text>
      </g>
      `
    )
  },

  // ==================== 6. 脚部楔形结构与落地承重 ====================
  {
    id: 'tpl-figure-feet',
    name: '脚部三角楔形体、足弓与透视落地底图',
    track: 'figure',
    lessonId: 'figure-6',
    description: '包含侧面足弓、正面内高外低踝骨、3/4 楔形体分解及地面透视足印练习区。',
    svgContent: wrapTemplateSVG(
      'FIGURE-6 · 脚部楔形结构与落地承重透视',
      '口诀：脚是带内侧足弓的三角楔子，内踝高外踝低，脚跟与前掌必须贴实地面透视线',
      `
      <!-- Top Half: 3-Angle Wedge Foot Breakdown -->
      <rect x="48" y="92" width="1104" height="368" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">上区 · 侧 / 正 / 3/4 三角度楔形分解</text>

      <!-- Angle 1: Medial Side View (Arch + Wedge) -->
      <g transform="translate(86, 162)" fill="none" stroke-width="1.8">
        <!-- Ground plane -->
        <line x1="8" y1="234" x2="296" y2="234" stroke="#94a3b8" stroke-opacity="0.58" stroke-width="1.5"/>
        <!-- Lower leg cylinder -->
        <path d="M62 24 L56 124 M118 24 L118 118" stroke="#0284c7" stroke-opacity="0.55"/>
        <!-- Wedge Foot -->
        <path d="M56 124 L40 202 L48 234 L104 234 Q146 212 192 234 L268 234 L274 214 L224 192 L118 118 Z" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.65"/>
        <!-- Medial arch highlight -->
        <path d="M104 234 Q148 206 194 234" stroke="#10b981" stroke-width="2.4" stroke-opacity="0.78"/>
        <!-- Inner ankle bone (high) -->
        <circle cx="88" cy="134" r="9" stroke="#d97706" stroke-opacity="0.75"/>
        <text x="150" y="264" font-size="11.5" fill="#059669" fill-opacity="0.82" stroke="none" text-anchor="middle">内侧视：脚跟+前掌落地，中段足弓挑空</text>
      </g>

      <!-- Angle 2: Front View (Asymmetric Ankle + Toe Slope) -->
      <g transform="translate(468, 162)" fill="none" stroke-width="1.8">
        <line x1="12" y1="234" x2="220" y2="234" stroke="#94a3b8" stroke-opacity="0.58" stroke-width="1.5"/>
        <path d="M84 24 L86 128 M142 24 L140 144" stroke="#0284c7" stroke-opacity="0.55"/>
        <!-- Asymmetric ankle slant: Inner (left) high, Outer (right) low -->
        <line x1="76" y1="126" x2="152" y2="148" stroke="#d97706" stroke-width="2" stroke-dasharray="5 3" stroke-opacity="0.78"/>
        <circle cx="84" cy="128" r="6" fill="#d97706" fill-opacity="0.65"/>
        <circle cx="144" cy="146" r="6" fill="#d97706" fill-opacity="0.65"/>
        <!-- Front wedge trapezoid (higher inner arch, lower outer edge) -->
        <path d="M86 128 L66 198 L62 234 L172 234 L174 214 L140 144 Z" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.65"/>
        <!-- Toe box slope -->
        <line x1="66" y1="202" x2="172" y2="216" stroke="#6366f1" stroke-opacity="0.58"/>
        <text x="116" y="264" font-size="11.5" fill="#d97706" fill-opacity="0.82" stroke="none" text-anchor="middle">正视：内踝高外踝低 · 脚背内厚外薄</text>
      </g>

      <!-- Angle 3: 3/4 Perspective Wedge Block -->
      <g transform="translate(796, 162)" fill="none" stroke-width="1.8">
        <line x1="8" y1="234" x2="312" y2="234" stroke="#94a3b8" stroke-opacity="0.58" stroke-width="1.5"/>
        <!-- Shin cylinder -->
        <path d="M86 24 L84 114 M136 24 L138 112" stroke="#0284c7" stroke-opacity="0.55"/>
        <ellipse cx="111" cy="113" rx="27" ry="10" stroke="#6366f1" stroke-opacity="0.55"/>
        <!-- 3D Wedge top slope + inner side + toe front -->
        <polygon points="84,114 138,112 246,196 196,210" fill="#6366f1" fill-opacity="0.08" stroke="#4f46e5" stroke-opacity="0.62"/>
        <polygon points="84,114 196,210 192,234 140,224 108,232 66,222 64,174" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.65"/>
        <polygon points="196,210 246,196 266,224 202,236" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.65"/>
        <text x="164" y="264" font-size="11.5" fill="#4f46e5" fill-opacity="0.82" stroke="none" text-anchor="middle">3/4 视：脚背斜面 + 脚趾梯形楔块</text>
      </g>

      <!-- Bottom Half: Perspective Floor Grid + Sole Footprints Practice -->
      <rect x="48" y="484" width="1104" height="372" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="512" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">下区 · 地面透视网格与双脚承重实操（先踩实脚印，再往上长楔子）</text>

      <!-- Subtle perspective ground plane grid -->
      <g stroke="#38bdf8" stroke-opacity="0.22" stroke-width="1.2">
        <line x1="90" y1="628" x2="1110" y2="628"/>
        <line x1="76" y1="684" x2="1124" y2="684"/>
        <line x1="64" y1="748" x2="1136" y2="748"/>
        <line x1="56" y1="818" x2="1144" y2="818"/>
        <line x1="280" y1="628" x2="140" y2="836"/>
        <line x1="490" y1="628" x2="430" y2="836"/>
        <line x1="710" y1="628" x2="770" y2="836"/>
        <line x1="920" y1="628" x2="1060" y2="836"/>
      </g>

      <!-- Practice 1: Standing Pair Footprints -->
      <g transform="translate(150, 560)" fill="none">
        <path d="M52 214 C44 182, 58 158, 86 158 C108 158, 114 184, 102 214 C94 234, 60 236, 52 214 Z" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.58" stroke-width="1.6" stroke-dasharray="5 4"/>
        <path d="M168 192 C192 178, 224 184, 240 202 C250 214, 232 232, 206 232 C176 232, 152 204, 168 192 Z" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.58" stroke-width="1.6" stroke-dasharray="5 4"/>
        <circle cx="80" cy="116" r="14" stroke="#d97706" stroke-opacity="0.55" stroke-width="1.5"/>
        <circle cx="176" cy="110" r="14" stroke="#d97706" stroke-opacity="0.55" stroke-width="1.5"/>
        <text x="148" y="276" font-size="11.5" fill="#0284c7" fill-opacity="0.78" text-anchor="middle">练 1 · 丁字步双脚落地</text>
      </g>

      <!-- Practice 2: Tiptoe / Push-Off Wedge -->
      <g transform="translate(514, 560)" fill="none">
        <ellipse cx="148" cy="212" rx="44" ry="18" fill="#10b981" fill-opacity="0.09" stroke="#059669" stroke-opacity="0.62" stroke-width="1.6" stroke-dasharray="5 4"/>
        <line x1="78" y1="64" x2="78" y2="128" stroke="#6366f1" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="5 4"/>
        <line x1="78" y1="128" x2="148" y2="212" stroke="#6366f1" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="5 4"/>
        <circle cx="78" cy="128" r="14" stroke="#d97706" stroke-opacity="0.58" stroke-width="1.5"/>
        <text x="116" y="276" font-size="11.5" fill="#0284c7" fill-opacity="0.78" text-anchor="middle">练 2 · 踮脚蹬地（脚跟抬起、前掌折弯）</text>
      </g>

      <!-- Practice 3: Elevated 3/4 Heel-to-Toe -->
      <g transform="translate(842, 560)" fill="none">
        <path d="M56 218 C64 176, 128 164, 186 174 C216 180, 224 202, 198 220 C158 242, 48 248, 56 218 Z" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.58" stroke-width="1.6" stroke-dasharray="5 4"/>
        <circle cx="94" cy="114" r="16" stroke="#d97706" stroke-opacity="0.55" stroke-width="1.5"/>
        <text x="134" y="276" font-size="11.5" fill="#0284c7" fill-opacity="0.78" text-anchor="middle">练 3 · 3/4 视角透视楔形脚</text>
      </g>
      `
    )
  },

  // ==================== 7. 躯干与四肢核心肌群穿插 ====================
  {
    id: 'tpl-figure-muscles',
    name: '躯干与四肢核心肌群起止穿插练习底图',
    track: 'figure',
    lessonId: 'figure-7',
    description: '提供正面胸肩腹背、背面肩胛倒三角与四肢链条穿插的骨点挂钩骨架底图。',
    svgContent: wrapTemplateSVG(
      'FIGURE-7 · 躯干与四肢核心肌群穿插（胸肩背腹臂腿）',
      '口诀：肌肉是跨关节的橡皮筋，先找锁骨/胸骨/肩峰/髂嵴骨点，再按链条咬合穿插',
      `
      <!-- Panel 1: Front Torso Muscle Attachment Map -->
      <rect x="48" y="92" width="348" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="66" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 1 · 正面躯干（胸·肩·腹·背阔）</text>

      <g transform="translate(222, 178)" fill="none" stroke-width="1.7">
        <!-- Neck & Sternocleidomastoid V -->
        <path d="M-24 22 L0 74 L24 22" stroke="#6366f1" stroke-opacity="0.58"/>
        <!-- Trapezius slope -->
        <path d="M-24 38 Q-58 62 -106 86 M24 38 Q58 62 106 86" stroke="#0284c7" stroke-opacity="0.58"/>
        <!-- Clavicle bone -->
        <path d="M-104 88 Q-54 70 0 78 Q54 70 104 88" stroke="#d97706" stroke-width="2.2" stroke-opacity="0.75"/>
        <!-- Pectoralis Major fanning into humerus under deltoid -->
        <path d="M0 84 C-38 82, -78 96, -110 128 C-98 156, -72 184, -36 184 C-16 184, -4 176, 0 166" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.65"/>
        <path d="M0 84 C38 82, 78 96, 110 128 C98 156, 72 184, 36 184 C16 184, 4 176, 0 166" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.65"/>
        <!-- Deltoid teardrop caps wrapping over pec insertion -->
        <path d="M-104 88 C-136 102, -142 152, -120 202 C-104 176, -98 134, -92 104" fill="#6366f1" fill-opacity="0.08" stroke="#4f46e5" stroke-opacity="0.68"/>
        <path d="M104 88 C136 102, 142 152, 120 202 C104 176, 98 134, 92 104" fill="#6366f1" fill-opacity="0.08" stroke="#4f46e5" stroke-opacity="0.68"/>
        <!-- Latissimus Dorsi V-wing peeking behind ribs -->
        <path d="M-94 172 C-102 224, -84 274, -68 312 M94 172 C102 224, 84 274, 68 312" stroke="#10b981" stroke-opacity="0.62"/>
        <!-- Ribcage arch + Rectus Abdominis column -->
        <path d="M-46 188 L-40 348 L0 412 L40 348 L46 188" stroke="#0284c7" stroke-opacity="0.52" stroke-dasharray="5 4"/>
        <line x1="0" y1="166" x2="0" y2="410" stroke="#6366f1" stroke-opacity="0.45"/>
        <path d="M-38 232 Q0 240 38 232 M-38 282 Q0 290 38 282 M-34 334 Q0 340 34 334" stroke="#0284c7" stroke-opacity="0.42"/>
        <!-- Obliques gripping iliac crest -->
        <path d="M-74 282 C-86 322, -82 362, -62 388 L-10 426 M74 282 C86 322, 82 362, 62 388 L10 426" stroke="#d97706" stroke-opacity="0.58"/>
        <!-- Bone landmarks -->
        <g fill="#d97706" fill-opacity="0.82">
          <circle cx="0" cy="78" r="4"/>
          <circle cx="-104" cy="88" r="4"/>
          <circle cx="104" cy="88" r="4"/>
          <circle cx="-64" cy="382" r="4"/>
          <circle cx="64" cy="382" r="4"/>
        </g>
      </g>
      <text x="222" y="656" font-size="11.5" fill="#4f46e5" fill-opacity="0.82" text-anchor="middle">胸大肌末端钻入三角肌下方</text>
      <text x="222" y="678" font-size="11.5" fill="#059669" fill-opacity="0.82" text-anchor="middle">腹直肌收束于耻骨 · 腹外斜肌扣住髂嵴</text>

      <!-- Panel 2: Back Torso (Trapezius + Scapulae + Lats + Glutes) -->
      <rect x="420" y="92" width="356" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="438" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 2 · 背面躯干（斜方菱形 + 背阔倒三角）</text>

      <g transform="translate(598, 178)" fill="none" stroke-width="1.7">
        <!-- Spine vertical furrow -->
        <line x1="0" y1="26" x2="0" y2="418" stroke="#6366f1" stroke-opacity="0.52" stroke-dasharray="6 4"/>
        <!-- Trapezius Diamond (kite shape) -->
        <polygon points="0,30 -106,86 0,256 106,86" fill="#6366f1" fill-opacity="0.07" stroke="#4f46e5" stroke-opacity="0.65"/>
        <!-- Winged Scapulae triangles -->
        <polygon points="-24,108 -86,102 -54,196" stroke="#d97706" stroke-opacity="0.55" stroke-dasharray="4 3"/>
        <polygon points="24,108 86,102 54,196" stroke="#d97706" stroke-opacity="0.55" stroke-dasharray="4 3"/>
        <!-- Rear deltoids -->
        <path d="M-106 86 C-136 102, -140 156, -118 202 M106 86 C136 102, 140 156, 118 202" stroke="#0284c7" stroke-opacity="0.62"/>
        <!-- Latissimus Dorsi broad V-taper -->
        <path d="M-96 184 C-102 250, -76 314, -52 344 L0 364 L52 344 C76 314, 102 250, 96 184" fill="#10b981" fill-opacity="0.06" stroke="#059669" stroke-opacity="0.65"/>
        <!-- Sacrum triangle + Glutes butterfly -->
        <polygon points="-26,356 26,356 0,398" stroke="#d97706" stroke-opacity="0.65"/>
        <path d="M-54 344 C-86 364, -92 426, -72 470 C-44 486, -12 474, 0 448 C12 474, 44 486, 72 470 C92 426, 86 364, 54 344" stroke="#0284c7" stroke-opacity="0.62"/>
      </g>
      <text x="598" y="698" font-size="11.5" fill="#4f46e5" fill-opacity="0.82" text-anchor="middle">斜方肌呈风筝菱形 · 肩胛骨随抬臂旋转</text>
      <text x="598" y="720" font-size="11.5" fill="#059669" fill-opacity="0.82" text-anchor="middle">背阔肌拉出上宽下窄倒三角</text>

      <!-- Panel 3: Limb Chain Interlocking (Arm + Leg) -->
      <rect x="800" y="92" width="352" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="818" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 3 · 四肢肌群链条式穿插</text>

      <!-- Upper: Arm Chain -->
      <g transform="translate(888, 154)" fill="none" stroke-width="1.8">
        <!-- Deltoid teardrop -->
        <path d="M56 12 C96 20, 104 68, 78 112 C56 84, 50 48, 56 12 Z" fill="#6366f1" fill-opacity="0.09" stroke="#4f46e5" stroke-opacity="0.68"/>
        <!-- Biceps (front) + Triceps (back) flanking deltoid tip -->
        <path d="M58 58 C34 86, 36 144, 62 174 M94 64 C118 96, 114 148, 92 176" stroke="#0284c7" stroke-opacity="0.65"/>
        <!-- Brachioradialis bridging from outer upper arm across elbow into forearm -->
        <path d="M90 128 C118 164, 116 218, 96 274 M62 174 C52 214, 60 250, 72 276" fill="#10b981" fill-opacity="0.07" stroke="#059669" stroke-opacity="0.68"/>
        <text x="84" y="302" font-size="11.5" fill="#4f46e5" fill-opacity="0.82" stroke="none" text-anchor="middle">三角肌楔入二/三头肌 · 肱桡肌跨肘锁链</text>
      </g>

      <!-- Lower: Leg Chain -->
      <g transform="translate(888, 492)" fill="none" stroke-width="1.8">
        <!-- Quadriceps teardrop wrapping above knee -->
        <path d="M52 14 C28 64, 34 126, 62 156 M108 14 C130 62, 124 122, 98 156" stroke="#0284c7" stroke-opacity="0.65"/>
        <path d="M50 18 C72 78, 92 124, 104 166" stroke="#d97706" stroke-opacity="0.68" stroke-dasharray="5 3"/>
        <!-- Patella -->
        <rect x="66" y="152" width="28" height="24" rx="8" stroke="#4f46e5" stroke-opacity="0.65"/>
        <!-- Gastrocnemius: outer head higher, inner head lower! -->
        <path d="M62 178 C38 214, 46 266, 68 312 M98 178 C122 204, 112 254, 92 312" fill="#10b981" fill-opacity="0.07" stroke="#059669" stroke-opacity="0.68"/>
        <line x1="46" y1="242" x2="114" y2="216" stroke="#d97706" stroke-opacity="0.68" stroke-dasharray="4 3"/>
        <text x="84" y="340" font-size="11.5" fill="#059669" fill-opacity="0.82" stroke="none" text-anchor="middle">小腿肚外高内低 · 大腿肌群收束于膝盖</text>
      </g>
      `
    )
  },

  // ==================== 8. 不同体型与大剪影差异 ====================
  {
    id: 'tpl-figure-bodytypes',
    name: '男女/健壮/纤细体型比例与剪影对比底图',
    track: 'figure',
    lessonId: 'figure-8',
    description: '并排对比健壮男体、标准女体、纤细少年与自创体型栏的肩胯几何与大剪影框架。',
    svgContent: wrapTemplateSVG(
      'FIGURE-8 · 不同体型（男女 / 健壮 / 纤细）与大剪影差异',
      '口诀：去细节看黑剪影就能分出角色设定——核心差异在肩宽、腰位、胯宽与头身比',
      `
      <!-- Shared Ground Baseline -->
      <line x1="56" y1="818" x2="1144" y2="818" stroke="#0284c7" stroke-opacity="0.52" stroke-width="1.8"/>

      <!-- Bay 1: Athletic Male (8 heads, Broad Shoulders / Narrow Hips) -->
      <rect x="48" y="92" width="256" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="176" y="120" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.82" text-anchor="middle">1 · 健壮男体（8头 · 倒梯形）</text>
      <text x="176" y="140" font-size="11" fill="#475569" fill-opacity="0.72" text-anchor="middle">肩宽 ≈ 2.2 头 · 胯宽 ≈ 1.4 头</text>
      <line x1="176" y1="156" x2="176" y2="818" stroke="#6366f1" stroke-opacity="0.26" stroke-dasharray="5 5"/>
      <g transform="translate(176, 166)" fill="none" stroke-width="1.8">
        <!-- Head (82px tall) -->
        <path d="M0 0 C22 0, 28 24, 26 52 L16 78 L-16 78 L-26 52 C-28 24, -22 0, 0 0 Z" stroke="#0284c7" stroke-opacity="0.58"/>
        <!-- Inverted Trapezoid Geometric Silhouette -->
        <polygon points="-92,126 92,126 48,292 -48,292" fill="#6366f1" fill-opacity="0.06" stroke="#4f46e5" stroke-opacity="0.62" stroke-dasharray="5 4"/>
        <!-- Pelvis narrower -->
        <polygon points="-52,292 52,292 58,368 -58,368" fill="#38bdf8" fill-opacity="0.05" stroke="#0284c7" stroke-opacity="0.55"/>
        <!-- Shoulder width marker -->
        <line x1="-92" y1="108" x2="92" y2="108" stroke="#d97706" stroke-opacity="0.65" marker-start="url(#tpl-arrow-amber)" marker-end="url(#tpl-arrow-amber)"/>
        <!-- Leg guide lines -->
        <path d="M-54 368 L-34 504 L-26 652 M54 368 L34 504 L26 652" stroke="#0284c7" stroke-opacity="0.42"/>
      </g>
      <text x="176" y="844" font-size="11" fill="#4f46e5" fill-opacity="0.8" text-anchor="middle">直线硬朗转折 · 低腰线</text>

      <!-- Bay 2: Standard Female (7 heads, Hourglass / Curved Hips) -->
      <rect x="330" y="92" width="256" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="458" y="120" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.82" text-anchor="middle">2 · 标准女体（7头 · 沙漏形）</text>
      <text x="458" y="140" font-size="11" fill="#475569" fill-opacity="0.72" text-anchor="middle">柔斜肩 ≈ 1.6 头 · 胯宽 ≈ 1.75 头</text>
      <line x1="458" y1="156" x2="458" y2="818" stroke="#6366f1" stroke-opacity="0.26" stroke-dasharray="5 5"/>
      <g transform="translate(458, 206)" fill="none" stroke-width="1.8">
        <!-- Head (84px tall) -->
        <ellipse cx="0" cy="40" rx="26" ry="40" stroke="#0284c7" stroke-opacity="0.58"/>
        <!-- Hourglass Geometric Silhouette -->
        <path d="M-64 128 C-56 190, -34 224, -36 252 C-66 286, -74 324, -68 364 L68 364 C74 324, 66 286, 36 252 C34 224, 56 190, 64 128 Z" fill="#10b981" fill-opacity="0.06" stroke="#059669" stroke-opacity="0.62" stroke-dasharray="5 4"/>
        <!-- High waist marker -->
        <line x1="-54" y1="252" x2="54" y2="252" stroke="#d97706" stroke-opacity="0.68" stroke-dasharray="4 3"/>
        <text x="64" y="256" font-size="10.5" fill="#d97706" fill-opacity="0.85" stroke="none">高腰线</text>
        <!-- Soft leg S-taper -->
        <path d="M-64 364 C-56 436, -34 494, -22 612 M64 364 C56 436, 34 494, 22 612" stroke="#0284c7" stroke-opacity="0.45"/>
      </g>
      <text x="458" y="844" font-size="11" fill="#059669" fill-opacity="0.8" text-anchor="middle">柔和 S 曲线 · 肩窄胯圆润</text>

      <!-- Bay 3: Slender Youth / Teen (6.5 heads, Narrow Column) -->
      <rect x="612" y="92" width="256" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="740" y="120" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.82" text-anchor="middle">3 · 纤细少年（6.5头 · 修长型）</text>
      <text x="740" y="140" font-size="11" fill="#475569" fill-opacity="0.72" text-anchor="middle">头偏大 · 肩胯近等宽 · 四肢细长</text>
      <line x1="740" y1="156" x2="740" y2="818" stroke="#6366f1" stroke-opacity="0.26" stroke-dasharray="5 5"/>
      <g transform="translate(740, 244)" fill="none" stroke-width="1.8">
        <!-- Head slightly larger relative to body -->
        <ellipse cx="0" cy="42" rx="28" ry="42" stroke="#0284c7" stroke-opacity="0.58"/>
        <!-- Narrow straight column torso -->
        <polygon points="-50,124 50,124 44,322 -44,322" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.58" stroke-dasharray="5 4"/>
        <!-- Slender legs -->
        <path d="M-38 322 L-24 452 L-18 574 M38 322 L24 452 L18 574" stroke="#0284c7" stroke-opacity="0.45"/>
      </g>
      <text x="740" y="844" font-size="11" fill="#0284c7" fill-opacity="0.8" text-anchor="middle">关节骨感清晰 · 肌肉起伏平缓</text>

      <!-- Bay 4: Free Character Silhouette Design Bay -->
      <rect x="894" y="92" width="258" height="764" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.34" stroke-dasharray="6 6"/>
      <text x="1023" y="120" font-size="13" font-weight="700" fill="#4f46e5" fill-opacity="0.82" text-anchor="middle">4 · 自由体型剪影设计栏</text>
      <text x="1023" y="140" font-size="11" fill="#475569" fill-opacity="0.72" text-anchor="middle">尝试壮汉 / 丰腴 / Q版等大形对比</text>
      <line x1="1023" y1="160" x2="1023" y2="818" stroke="#6366f1" stroke-opacity="0.34" stroke-dasharray="5 5"/>
      <!-- Equal head-tick ladder -->
      <g stroke="#6366f1" stroke-opacity="0.32" stroke-width="1.2">
        <line x1="998" y1="210" x2="1048" y2="210"/>
        <line x1="998" y1="296" x2="1048" y2="296"/>
        <line x1="998" y1="382" x2="1048" y2="382"/>
        <line x1="998" y1="468" x2="1048" y2="468"/>
        <line x1="998" y1="554" x2="1048" y2="554"/>
        <line x1="998" y1="640" x2="1048" y2="640"/>
        <line x1="998" y1="726" x2="1048" y2="726"/>
      </g>
      <rect x="936" y="210" width="174" height="588" rx="10" fill="none" stroke="#38bdf8" stroke-opacity="0.22" stroke-dasharray="4 4"/>
      <text x="1023" y="844" font-size="11" fill="#4f46e5" fill-opacity="0.8" text-anchor="middle">先用马克笔涂实大剪影，再切体块</text>
      `
    )
  }
];

export const FIGURE_LESSONS = [
  // ==================== TIER: BEGINNER (入门 ⭐) ====================
  {
    id: 'figure-1',
    track: 'figure',
    tier: 'beginner',
    order: 1,
    title: '动作线与重心平衡入门',
    mantra: '一笔定势再放体块，静态站姿重心必落脚底。',
    subtitle: '用一条流畅 C/S 弧线抓住人体动态张力',
    difficulty: '入门 ⭐',
    estimatedMinutes: 15,
    templateId: 'tpl-figure-gesture',
    cheatSheetSVG: PLATE_FIGURE_BODY_SYSTEM,
    keyPoints: [
      { title: '先抓一条主弧线', detail: '别急着抠五官和衣褶，先用一根贯穿头顶到脚尖的 C/S 线定动势。' },
      { title: '拉伸侧与挤压侧', detail: '动态有张力靠对比：外弧皮肤绷紧拉长，内弧腰腹产生折叠挤压。' },
      { title: '锁骨窝重心垂线', detail: '静止站立时，从喉结下方垂直到地面的线必须落在脚底支撑范围内。' }
    ],
    pitfalls: [
      { wrong: '画动态像拼积木，一段一段描边导致人物僵硬', fix: '10秒内一笔扫出头—脊柱—承重腿主弧线，再套体块。' },
      { wrong: '静态站姿重心飘在脚掌外，人物像随时要摔倒', fix: '画完草稿先拉一条红线重心垂线，偏了就移动承重脚位置。' }
    ],
    checklist: [
      '沿区1的S弧线套画站姿，垂线落入绿色足底区',
      '画完区2两个C弧动态，标出拉伸侧与挤压侧',
      '用区3画重心超前冲刺姿势，体会主动失衡速度感'
    ],
    videos: [
      {
        id: 'vid-figure1-bili',
        title: '零基础动态速写：动作线 (Line of Action) 与重心解析',
        author: 'B站人体速写精选教程',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E5%8A%A8%E4%BD%9C%E7%BA%BF+Line+of+Action+%E4%BA%BA%E4%BD%93%E9%87%8D%E5%BF%83+%E9%80%9F%E5%86%99',
        keywords: '动作线 Line of Action 人体重心 速写',
        duration: '约16分钟',
        timestamps: [
          { time: '00:00', label: '为什么新手画的人物像僵硬木头人' },
          { time: '05:10', label: 'C/S 主弧线找拉伸侧与挤压侧' },
          { time: '10:40', label: '站立平衡 vs 奔跑失衡重心判断' }
        ],
        summary: '用极简线条拆解人体动态张力与重心规律，告别死板站姿。'
      },
      {
        id: 'vid-figure1-yt',
        title: 'How to Draw Gesture - Line of Action (Proko)',
        author: 'Proko',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Proko+how+to+draw+gesture+line+of+action',
        keywords: 'Proko how to draw gesture line of action',
        duration: '约14分钟',
        timestamps: [
          { time: '00:00', label: 'Gesture 不是抄轮廓而是抓韵律' },
          { time: '04:30', label: 'CSI 曲线简化法则与流畅度训练' },
          { time: '09:50', label: '重心垂线检查人物是否站稳' }
        ],
        summary: '经典动态速写启蒙课，彻底讲透动作线节奏与平衡原则。'
      }
    ]
  },

  {
    id: 'figure-2',
    track: 'figure',
    tier: 'beginner',
    order: 2,
    title: '通用头身比例与关键骨点',
    mantra: '七头半定大框架，耻骨中点记准肘齐腰、腕齐裆。',
    subtitle: '用头长标尺与骨点锚定全身不画短手短腿',
    difficulty: '入门 ⭐',
    estimatedMinutes: 20,
    templateId: 'tpl-figure-proportions',
    cheatSheetSVG: PLATE_FIGURE_BODY_SYSTEM,
    keyPoints: [
      { title: '耻骨即全身中点', detail: '画全身先定头顶与脚底，正中间就是耻骨联合，上下半身绝不跑偏。' },
      { title: '肘齐腰、腕齐裆', detail: '垂手时手肘平第3头肚脐，手腕平耻骨大转子，指尖落大腿中段。' },
      { title: '关键骨点定骨架', detail: '锁定锁骨窝、肩峰、肋弓、髂嵴与膝盖五大硬骨点，肉再多也不散架。' }
    ],
    pitfalls: [
      { wrong: '总把胳膊画太短，手腕悬在腰部上方', fix: '记住「上臂到腰、下臂到裆」，落笔先点出肘和腕的高度线。' },
      { wrong: '画全身从头往下推，画到腿没纸只能画短腿', fix: '先在画布定出总身高上下界与正中点，再往里填各段比例。' }
    ],
    checklist: [
      '对照7.5头标尺，在「练1」默写正面蛋盒人',
      '红笔自检：肘平3头、腕平耻骨、膝居5.5头',
      '在「练2」画侧面人体，核对耳肩胯踝四点垂线'
    ],
    videos: [
      {
        id: 'vid-figure2-bili',
        title: '人体比例口诀与骨点定位，一节课告别五五身',
        author: 'B站系统人体基础课',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E4%BA%BA%E4%BD%93%E6%AF%94%E4%BE%8B+%E4%B8%83%E5%A4%B4%E5%8D%8A+%E9%AA%A8%E7%82%B9%E5%AE%9A%E4%BD%8D+%E9%9B%B6%E5%9F%BA%E7%A1%80',
        keywords: '人体比例 七头半 骨点定位 零基础',
        duration: '约18分钟',
        timestamps: [
          { time: '00:00', label: '写实 7.5 头身 vs 二次元 6~7 头身规律' },
          { time: '06:20', label: '肘齐腰、腕齐裆与腿长快速校验法' },
          { time: '12:50', label: '侧面脊柱 S 曲线与骨点对齐' }
        ],
        summary: '用好记的身体锚点替代死背数字，零基础也能画准全身比例。'
      },
      {
        id: 'vid-figure2-yt',
        title: 'Human Proportions & Landmarks (Proko)',
        author: 'Proko',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Proko+human+proportions+landmarks+figure+drawing',
        keywords: 'Proko human proportions landmarks figure drawing',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: '为什么必须以耻骨和头长作为度量尺' },
          { time: '05:40', label: '锁骨、胸廓与骨盆核心骨点演示' },
          { time: '11:10', label: '不同视角下如何维持比例感' }
        ],
        summary: '清晰讲解人体标准头身比与核心体表骨点，奠定解剖基础。'
      }
    ]
  },

  {
    id: 'figure-3',
    track: 'figure',
    tier: 'beginner',
    order: 3,
    title: '胸腔蛋与骨盆盒的倾斜扭转',
    mantra: '肩胯反向倾斜出韵律，一侧拉长一侧挤压才有立体感。',
    subtitle: '掌握古典对立平衡 Contrapposto',
    difficulty: '入门 ⭐',
    estimatedMinutes: 20,
    templateId: 'tpl-figure-torso',
    cheatSheetSVG: PLATE_FIGURE_TORSO_HAND,
    keyPoints: [
      { title: '胸腔是微倾的蛋', detail: '胸腔不是扁方块，画成上窄下圆的3D蛋，正面切出倒U形肋弓。' },
      { title: '骨盆是有厚度的盒', detail: '把骨盆概括为带顶面、正面与侧髋面的 3D 斜切盒，一眼锁定朝向。' },
      { title: '肩胯反倾对立平衡', detail: '单腿承重时同侧胯被顶高，为维持平衡同侧肩下沉，腰部一挤一拉。' }
    ],
    pitfalls: [
      { wrong: '把胸腔和骨盆画得严丝合缝贴一起，没有腰部空间', fix: '胸腔底与骨盆顶之间保留柔软腰区，弯腰扭转全靠这一段形变。' },
      { wrong: '画 3/4 转身却忘了移动前中线，像正面硬歪', fix: '先在蛋盒表面画出偏移曲面中线，再对称排左右结构。' }
    ],
    checklist: [
      '照区1临摹3/4蛋盒，画清前中线与骨盆侧面',
      '完成区2肩胯反倾练习，右腰挤压、左腰舒展',
      '挑战区3扭腰45°与前倾蛋盒，标出顶面或底面'
    ],
    videos: [
      {
        id: 'vid-figure3-bili',
        title: '人体体块核心：胸腔蛋与骨盆盒 (Robo Bean) 扭转透视',
        author: 'B站人体结构精讲',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E8%83%B8%E8%85%94+%E9%AA%A8%E7%9B%86+%E4%BD%93%E5%9D%97%E6%89%AD%E8%BD%AC+Contrapposto',
        keywords: '胸腔 骨盆 体块扭转 Contrapposto',
        duration: '约20分钟',
        timestamps: [
          { time: '00:00', label: '胸腔蛋与骨盆盒的比例及侧面厚度' },
          { time: '07:15', label: '单腿站立的肩胯反向倾斜规律' },
          { time: '14:10', label: '俯视/仰视与大扭腰时的方块透视' }
        ],
        summary: '透彻拆解躯干两大核心体块的倾斜与扭转，解决身体扁平问题。'
      },
      {
        id: 'vid-figure3-yt',
        title: 'The Robo Bean & Contrapposto (Proko)',
        author: 'Proko',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Proko+robo+bean+contrapposto+torso',
        keywords: 'Proko robo bean contrapposto torso',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: '从柔软豆子过渡到 3D 立体方盒' },
          { time: '05:50', label: '如何通过透视面表现躯干拧转' },
          { time: '11:05', label: '挤压侧与拉伸侧的经典对立平衡' }
        ],
        summary: '世界级人体体块教学，一招攻克躯干透视与自然站姿韵律。'
      }
    ]
  },

  // ==================== TIER: FOUNDATION (基础 ⭐⭐) ====================
  {
    id: 'figure-4',
    track: 'figure',
    tier: 'foundation',
    order: 4,
    title: '四肢圆柱透视与肘膝衔接',
    mantra: '四肢不是软面条，用带截面弧线的锥形圆柱穿插关节。',
    subtitle: '告别香肠手脚，画出前后伸展的纵深感',
    difficulty: '基础 ⭐⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-figure-limbs',
    cheatSheetSVG: PLATE_FIGURE_BODY_SYSTEM,
    keyPoints: [
      { title: '近粗远细的锥形筒', detail: '手臂与腿都向末端自然收细，小臂近肘饱满，到手腕收成扁方块。' },
      { title: '截面椭圆表现前伸', detail: '四肢指向镜头时，用一串由小变大的叠压椭圆轻松画出透视压缩。' },
      { title: '腿部经典 S 韵律', detail: '侧面看腿绝非直柱：大腿向前拱、膝盖方切锁定、小腿肚向后弓。' }
    ],
    pitfalls: [
      { wrong: '手臂前伸指向镜头时只把长度画短，显得畸形', fix: '缩长度时把近端截面画宽，用T字叠压让前臂压住上臂。' },
      { wrong: '画直立腿像两根僵硬木棍，缺少肌肉流向', fix: '标出外高内低的脚踝与大腿前凸、小腿后弓的错位弧线。' }
    ],
    checklist: [
      '沿上区前伸轴画4个近大远小椭圆并连出外轮廓',
      '在屈肘与屈膝处用T字叠压线区分前后段',
      '在下区「练2」补全跨步与直立腿圆柱及S韵律'
    ],
    videos: [
      {
        id: 'vid-figure4-bili',
        title: '四肢圆柱透视与人体压缩：告别扁平香肠手脚',
        author: 'B站人体透视教学',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E5%9B%9B%E8%82%A2%E5%9C%86%E6%9F%B1+%E4%BA%BA%E4%BD%93%E9%80%8F%E8%A7%86%E5%8E%8B%E7%BC%A9+%E8%82%98%E8%86%9D',
        keywords: '四肢圆柱 人体透视压缩 肘膝',
        duration: '约18分钟',
        timestamps: [
          { time: '00:00', label: '为什么把四肢画成圆柱就能立刻立体' },
          { time: '06:30', label: '打拳/踢腿透视压缩的套环叠压法' },
          { time: '13:00', label: '大腿与小腿前后错位韵律演示' }
        ],
        summary: '用圆柱截面与套环叠压法攻克四肢透视压缩与关节衔接难题。'
      },
      {
        id: 'vid-figure4-yt',
        title: 'Foreshortening & Cylinder Limbs (Proko / DrawLikeaSir)',
        author: 'Proko',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Proko+foreshortening+cylinders+arms+legs',
        keywords: 'Proko foreshortening cylinders arms legs',
        duration: '约14分钟',
        timestamps: [
          { time: '00:00', label: 'Coil / 弹簧圈法理解四肢朝向' },
          { time: '05:20', label: 'T 字叠压线如何制造前后深度' },
          { time: '10:00', label: '腿部与手臂的骨骼锥度差异' }
        ],
        summary: '直观演示弹簧圈截面法，快速画出有冲击力的前伸透视四肢。'
      }
    ]
  },

  {
    id: 'figure-5',
    track: 'figure',
    tier: 'foundation',
    order: 5,
    title: '手部几何块面与手指分组',
    mantra: '先画五边形手掌盒，再把四指当手套分组，拇指独立转。',
    subtitle: '拆解最难画的手，告别鸡爪和僵硬扇子',
    difficulty: '基础 ⭐⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-figure-hands',
    cheatSheetSVG: PLATE_FIGURE_TORSO_HAND,
    variants: [
      { id: 'redblue', label: '✋ 红蓝手掌五边形与分组对照', svg: PLATE_FIGURE_TORSO_HAND },
      { id: 'nanobanana', label: '🎨 人体结构与比例总览', svg: PLATE_FIGURE_BODY_SYSTEM },
    ],
    keyPoints: [
      { title: '五边形掌盒定大形', detail: '手掌不是正方形，而是顶边呈弧坡的五边形薄盒，长度约等于中指。' },
      { title: '手套分组告别僵硬', detail: '别均等叉开五指！用1+2+1或1+3合成手套块再切指缝。' },
      { title: '大拇指独立三角座', detail: '拇指靠大鱼际三角座独立转动，活动面与四指约呈45°~90°。' }
    ],
    pitfalls: [
      { wrong: '一上来就一根根细描五根手指，越画越歪像鸡爪', fix: '先画掌盒与四指合并手套剪影，外轮廓顺了再切分指缝。' },
      { wrong: '握拳时把四根指节画在同一条水平线上', fix: '握拳指骨从食指到小指呈阶梯斜坡下滑，拇指横扣在最前方。' }
    ],
    checklist: [
      '在区1验证「掌长≈中指长」与指根/指尖双弧线',
      '照区2画1+2+1与1+3分组手势，体会疏密节奏',
      '用区4三个倾斜掌盒补全挥手、握柄与捏取手势'
    ],
    videos: [
      {
        id: 'vid-figure5-bili',
        title: '最通俗的画手教程：五边形掌盒与手套分组法',
        author: 'B站手部结构专项课',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E7%94%BB%E6%89%8B%E6%95%99%E7%A8%8B+%E6%89%8B%E6%8E%8C%E5%9D%97%E9%9D%A2+%E6%89%8B%E6%8C%87%E5%88%86%E7%BB%84',
        keywords: '画手教程 手掌块面 手指分组',
        duration: '约18分钟',
        timestamps: [
          { time: '00:00', label: '为什么画手总像鸡爪：缺少掌盒与分组' },
          { time: '06:10', label: '五边形手掌 + 大鱼际三角座画法' },
          { time: '12:20', label: '1+2+1 优雅手势与握拳阶梯透视' }
        ],
        summary: '用几何掌盒和手套分组破解画手恐惧，轻松画出自然手势。'
      },
      {
        id: 'vid-figure5-yt',
        title: 'How to Draw Hands Easily (Sinix / Proko)',
        author: 'Proko',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Proko+how+to+draw+hands+structure+grouping',
        keywords: 'Proko how to draw hands structure grouping',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: '手掌盒子的三维斜面与厚度' },
          { time: '05:40', label: '手指扇形弧与自然聚拢规律' },
          { time: '11:00', label: '大拇指球窝活动范围解析' }
        ],
        summary: '拆解手部几何块面与手指分组韵律，高效攻克多角度手势。'
      }
    ]
  },

  {
    id: 'figure-6',
    track: 'figure',
    tier: 'foundation',
    order: 6,
    title: '脚部楔形结构与落地承重',
    mantra: '脚是带足弓的三角楔子，脚跟与前掌落地才能踩稳地面。',
    subtitle: '画稳透视双脚，告别飘在空中的香蕉脚',
    difficulty: '基础 ⭐⭐',
    estimatedMinutes: 20,
    templateId: 'tpl-figure-feet',
    cheatSheetSVG: PLATE_FIGURE_TORSO_HAND,
    keyPoints: [
      { title: '三角楔形体概括', detail: '别先抠脚趾，把脚看作「后跟方块+脚背斜坡+趾端楔块」。' },
      { title: '内踝高、外踝低', detail: '脚踝两侧并非水平对称，内侧踝骨明显偏高、外侧偏低且略靠后。' },
      { title: '先踩脚印再长脚', detail: '画透视站姿先在地面透视网格画出两只鞋底脚印，再往上立起楔体。' }
    ],
    pitfalls: [
      { wrong: '画两只脚一高一低没对齐透视地平线，像在爬坡', fix: '先拉一条脚底共同落地线，让双脚承重点压在同一平面。' },
      { wrong: '踮脚或奔跑时把整只脚画成僵硬弯月', fix: '踮脚折点在前掌与脚趾交界，脚背拉直、脚趾压实地面。' }
    ],
    checklist: [
      '照上区三角度画楔形脚，标清内高外低踝与足弓',
      '在下区「练1」从脚印往上立起站稳的丁字步双脚',
      '完成「练2」踮脚蹬地，画出前掌落地折角'
    ],
    videos: [
      {
        id: 'vid-figure6-bili',
        title: '脚部结构与鞋子透视：三角楔形法 10 分钟学会',
        author: 'B站人体脚部专项课',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E8%84%9A%E9%83%A8%E7%BB%93%E6%9E%84+%E6%A5%94%E5%BD%A2+%E9%80%8F%E8%A7%86+%E7%BB%98%E7%94%BB%E6%95%99%E7%A8%8B',
        keywords: '脚部结构 楔形 透视 绘画教程',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: '如何把脚概括成三个简单几何块' },
          { time: '05:20', label: '内高外低脚踝与足弓落地的承重关系' },
          { time: '10:30', label: '踮脚、透视俯视与套画鞋子的技巧' }
        ],
        summary: '用三角楔形和地面脚印法轻松解决双脚透视与悬浮感问题。'
      },
      {
        id: 'vid-figure6-yt',
        title: 'How to Draw Feet - Wedge Structure (Proko)',
        author: 'Proko',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Proko+how+to+draw+feet+wedge+anatomy',
        keywords: 'Proko how to draw feet wedge anatomy',
        duration: '约13分钟',
        timestamps: [
          { time: '00:00', label: '用三角楔块建立脚部三维立体感' },
          { time: '04:45', label: '脚底三点受力与内侧足弓曲线' },
          { time: '09:10', label: '透视地面上摆放双脚的实用窍门' }
        ],
        summary: '精准剖析脚部楔形块面与足弓力学，让角色真正稳稳踩在地上。'
      }
    ]
  },

  // ==================== TIER: ADVANCED (进阶 ⭐⭐⭐) ====================
  {
    id: 'figure-7',
    track: 'figure',
    tier: 'advanced',
    order: 7,
    title: '躯干与四肢核心肌群穿插',
    mantra: '肌肉是绑在骨点上的橡皮筋，看懂起止穿插就能画出张力。',
    subtitle: '精简掌握胸肩背腹臂腿六大表面肌群',
    difficulty: '进阶 ⭐⭐⭐',
    estimatedMinutes: 30,
    templateId: 'tpl-figure-muscles',
    cheatSheetSVG: PLATE_FIGURE_BODY_SYSTEM,
    keyPoints: [
      { title: '胸肩锁链穿插关系', detail: '胸大肌从胸骨/锁骨扇形汇聚，末端钻入三角肌下方止于大臂骨。' },
      { title: '三角肌楔入上下臂', detail: '三角肌如水滴包住肩峰，尖端插入肱二头与肱三头肌之间形成链环。' },
      { title: '背阔菱形与腿错位', detail: '背部斜方肌呈风筝菱形、背阔肌出倒三角；小腿腓肠肌外高内低。' }
    ],
    pitfalls: [
      { wrong: '抬起手臂时胸大肌还停在原处像两块死板砖', fix: '胸肌挂在大臂骨上，手臂上举时胸大肌下缘必然随之拉高拉平。' },
      { wrong: '画所有肌肉都用同样重的黑线勾满，画面脏乱油腻', fix: '仅在发力拉伸侧和明暗交界处强调肌群，受光面保持干净。' }
    ],
    checklist: [
      '在区1正面骨架画出胸大肌钻入三角肌的穿插关系',
      '在区2背面画出风筝形斜方肌、肩胛骨与背阔肌',
      '在区3完成手臂锁链与小腿外高内低肌群穿插'
    ],
    videos: [
      {
        id: 'vid-figure7-bili',
        title: '拒绝死背医学名词！胸肩背腹四肢肌群穿插精讲',
        author: 'B站艺用解剖精选课',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E8%89%BA%E7%94%A8%E8%A7%A3%E5%89%96+%E8%82%8C%E8%82%89%E7%A9%BF%E6%8F%92+%E8%83%B8%E8%82%A9%E8%83%8C+%E7%BB%98%E7%94%BB',
        keywords: '艺用解剖 肌肉穿插 胸肩背 绘画',
        duration: '约25分钟',
        timestamps: [
          { time: '00:00', label: '用起止挂钩理解胸大肌与三角肌咬合' },
          { time: '09:30', label: '背面斜方肌菱形与肩胛骨联动规律' },
          { time: '18:00', label: '手臂肱桡肌跨肘与腿部肌群概括' }
        ],
        summary: '化繁为简的艺用解剖课，用穿插链条掌握核心表面肌群规律。'
      },
      {
        id: 'vid-figure7-yt',
        title: 'Anatomy of the Torso & Limbs (Proko)',
        author: 'Proko',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Proko+anatomy+pectorals+deltoid+arms+interlocking',
        keywords: 'Proko anatomy pectorals deltoid arms interlocking',
        duration: '约18分钟',
        timestamps: [
          { time: '00:00', label: '胸大肌纤维扭转插入肱骨的奥秘' },
          { time: '07:20', label: '手臂链条式互锁（Chain Link）原理' },
          { time: '13:40', label: '如何在简化体块上合理叠加肌肉' }
        ],
        summary: '权威艺用解剖解析，看懂核心肌群如何像锁链一样互相穿插。'
      }
    ]
  },

  {
    id: 'figure-8',
    track: 'figure',
    tier: 'advanced',
    order: 8,
    title: '不同体型特征与大剪影差异',
    mantra: '体型靠肩胯比例与脂肪分布区分，先看剪影再画细节。',
    subtitle: '掌握男女、健壮与纤细体型的几何大形',
    difficulty: '进阶 ⭐⭐⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-figure-bodytypes',
    cheatSheetSVG: PLATE_FIGURE_BODY_SYSTEM,
    keyPoints: [
      { title: '男女核心在肩胯比', detail: '健壮男体肩远宽于胯呈倒梯形；女体肩窄斜、腰位更高、胯宽呈沙漏形。' },
      { title: '线条硬朗与柔曲差异', detail: '力量型多用方直转折显骨感；柔美或丰腴体型多用连贯S弧线。' },
      { title: '涂黑剪影自检法', detail: '画完角色用纯黑填满外轮廓，不看五官和发型也能分出性别与年龄。' }
    ],
    pitfalls: [
      { wrong: '画少年只把成人等比缩小，显得像小大人', fix: '少年感需调大头身比（6~6.5头）、收窄肩胯并拉长四肢。' },
      { wrong: '画健壮猛男只把胳膊吹成气球，脖子和斜方肌却很细', fix: '力量感的核心是加厚颈部、斜方肌、胸腔厚度与粗壮脚踝手腕。' }
    ],
    checklist: [
      '在前3栏对比描摹健壮、标准女体与纤细几何轮廓',
      '在第4栏用马克笔直接涂纯色剪影设计角色体型',
      '只看剪影并水平翻转，确认去发型也能秒分设定'
    ],
    videos: [
      {
        id: 'vid-figure8-bili',
        title: '男女体型差异与角色剪影设计：告别千人一面',
        author: 'B站角色原画设计课',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E7%94%B7%E5%A5%B3%E4%BD%93%E5%9E%8B%E5%B7%AE%E5%BC%82+%E8%A7%92%E8%89%B2%E5%89%AA%E5%BD%B1+%E4%BA%BA%E4%BD%93%E6%AF%94%E4%BE%8B',
        keywords: '男女体型差异 角色剪影 人体比例',
        duration: '约20分钟',
        timestamps: [
          { time: '00:00', label: '男体倒三角 vs 女体沙漏型的骨架区别' },
          { time: '07:10', label: '少年、壮汉、丰腴体型的头身与脂肪分布' },
          { time: '14:20', label: '职业原画师的黑剪影辨识度检测法' }
        ],
        summary: '对比各类年龄与性别的几何剪影差异，让你的角色辨识度翻倍。'
      },
      {
        id: 'vid-figure8-yt',
        title: 'Drawing Different Body Types & Silhouettes (Proko / Ethan Becker)',
        author: 'Proko',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Proko+how+to+draw+different+body+types+male+female',
        keywords: 'Proko how to draw different body types male female',
        duration: '约16分钟',
        timestamps: [
          { time: '00:00', label: '男女胸腔、骨盆与腰线高度解剖对比' },
          { time: '06:00', label: '几何大形（三角/圆/方）塑造角色性格' },
          { time: '11:30', label: '如何用剪影测试检验角色造型力' }
        ],
        summary: '系统拆解男女与多体型比例差异，用几何剪影打造立体角色。'
      }
    ]
  }
];
