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

      <!-- Sweeping S Line of Action + 3D Articulated Gesture Mannequin -->
      <path d="M222 184 C194 260, 246 390, 212 500 C196 565, 206 675, 214 776" fill="none" stroke="#6366f1" stroke-opacity="0.58" stroke-width="2.8" stroke-linecap="round"/>
      <!-- Head + Neck Cylinder -->
      <ellipse cx="222" cy="204" rx="25" ry="33" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.55" stroke-width="1.6" transform="rotate(6 222 204)"/>
      <path d="M212 234 L211 258 M228 236 L227 258" fill="none" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.5"/>
      <!-- Tilted shoulder & hip lines (+7 deg / -7 deg) -->
      <line x1="162" y1="286" x2="270" y2="272" stroke="#e11d48" stroke-opacity="0.55" stroke-width="1.7" stroke-dasharray="4 3"/>
      <line x1="176" y1="452" x2="264" y2="466" stroke="#0284c7" stroke-opacity="0.55" stroke-width="1.7" stroke-dasharray="4 3"/>
      <!-- Ribcage egg + Pelvis 3D trapezoid -->
      <path d="M218 258 C252 258, 264 290, 254 338 C248 360, 232 372, 210 370 C186 368, 174 344, 178 308 C182 276, 194 258, 218 258 Z"
        fill="#38bdf8" fill-opacity="0.07" stroke="#0284c7" stroke-opacity="0.56" stroke-width="1.6" transform="rotate(-5 218 314)"/>
      <path d="M180 398 L254 406 L256 446 L230 464 L204 462 L176 436 Z"
        fill="#e11d48" fill-opacity="0.05" stroke="#e11d48" stroke-opacity="0.5" stroke-width="1.5"/>
      <!-- Tapered Gesture Arms -->
      <path d="M174 282 C164 326, 160 364, 164 398 C164 426, 168 450, 174 474 M186 284 C178 328, 176 364, 178 398 C178 426, 180 448, 184 472"
        fill="none" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.4"/>
      <path d="M262 272 C276 314, 282 350, 280 384 C276 414, 266 438, 256 462 M248 274 C260 314, 266 350, 264 384 C260 412, 252 436, 244 460"
        fill="none" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.4"/>
      <!-- Supporting weight-bearing leg (enclosing plumb line x=216) + relaxed free leg -->
      <path d="M182 446 C182 512, 194 568, 206 618 C202 674, 206 728, 212 764 L196 780 L236 780 L226 762 C230 726, 232 674, 224 618 C230 568, 226 512, 220 462"
        fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.55" stroke-width="1.6"/>
      <path d="M250 452 C264 510, 272 562, 266 614 C276 668, 278 722, 274 764 L294 780 L262 780 L262 764"
        fill="none" stroke="#0284c7" stroke-opacity="0.38" stroke-width="1.4" stroke-dasharray="5 4"/>
      <text x="108" y="388" font-size="11" fill="#4f46e5" fill-opacity="0.78">S 型主弧线</text>
      <text x="278" y="546" font-size="11" fill="#475569" fill-opacity="0.72">承重腿压正垂线</text>

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

      <g fill="none" stroke="#0284c7" stroke-opacity="0.6" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head (1 head = 95px tall, width ~ 66px) -->
        <path d="M340 120 C366 120, 374 146, 372 174 C370 198, 356 215, 340 215 C324 215, 310 198, 308 174 C306 146, 314 120, 340 120 Z" fill="#38bdf8" fill-opacity="0.06"/>
        <line x1="308" y1="168" x2="372" y2="168" stroke-opacity="0.32" stroke-dasharray="3 3"/>
        <!-- Neck cylinder & Trapezius slope -->
        <path d="M324 210 L322 246 Q292 254 252 266 M356 210 L358 246 Q388 254 428 266"/>
        <!-- Clavicle S-bar + Acromion landmarks -->
        <path d="M254 266 Q298 250 340 256 Q382 250 426 266" stroke="#e11d48" stroke-opacity="0.68" stroke-width="2"/>
        <!-- Deltoid shoulder spheres -->
        <circle cx="252" cy="276" r="16" fill="#6366f1" fill-opacity="0.07" stroke="#4f46e5" stroke-opacity="0.52"/>
        <circle cx="428" cy="276" r="16" fill="#6366f1" fill-opacity="0.07" stroke="#4f46e5" stroke-opacity="0.52"/>
        <!-- Tapered Ribcage Egg (y=256..390) -->
        <path d="M340 256 C384 256, 400 294, 392 346 C388 374, 370 390, 340 390 C310 390, 292 374, 288 346 C280 294, 296 256, 340 256 Z" fill="#38bdf8" fill-opacity="0.07"/>
        <!-- Thoracic Arch -->
        <path d="M310 382 Q340 340 370 382" stroke-dasharray="4 3" stroke-opacity="0.46"/>
        <!-- Compact Waist cylinder (navel at y=405 = 3.0H) -->
        <path d="M298 378 C298 394, 296 406, 288 418 M382 378 C382 394, 384 406, 392 418"/>
        <!-- Pelvis Trapezoid Box (y=418..482) -->
        <path d="M288 418 L392 418 L398 456 L356 482 L324 482 L282 456 Z" fill="#e11d48" fill-opacity="0.06" stroke="#e11d48" stroke-opacity="0.58"/>
        <!-- Hip socket ellipses -->
        <circle cx="294" cy="466" r="12" stroke="#d97706" stroke-opacity="0.55"/>
        <circle cx="386" cy="466" r="12" stroke="#d97706" stroke-opacity="0.55"/>

        <!-- 3D Tapered Arms: Upper Arm (y=282..405) + Elbow Sphere (405) + Forearm (405..480) + Mitten Hand (480..542) -->
        <path d="M238 282 C234 328, 234 370, 236 405 C228 432, 226 458, 229 480 L220 524 L228 542 L238 524 L239 480 C246 456, 250 430, 252 405 C258 368, 264 328, 266 286"/>
        <circle cx="244" cy="405" r="10" stroke="#4f46e5" stroke-opacity="0.48"/>
        <path d="M442 282 C446 328, 446 370, 444 405 C452 432, 454 458, 451 480 L460 524 L452 542 L442 524 L441 480 C434 456, 430 430, 428 405 C422 368, 416 328, 414 286"/>
        <circle cx="436" cy="405" r="10" stroke="#4f46e5" stroke-opacity="0.48"/>

        <!-- 3D Tapered Legs: Thigh (466..642) + Knee Patella (5.5H=642) + Calf (642..792) + Wedge Feet (792..832) -->
        <!-- Left Leg -->
        <path d="M282 456 C276 520, 286 588, 298 642 C288 688, 294 742, 308 792 L292 832 L332 832 L322 792 C328 742, 330 688, 322 642 C332 588, 334 528, 332 482" fill="#38bdf8" fill-opacity="0.06"/>
        <rect x="298" y="630" width="24" height="24" rx="6" stroke="#4f46e5" stroke-opacity="0.55"/>
        <!-- Right Leg -->
        <path d="M398 456 C404 520, 394 588, 382 642 C392 688, 386 742, 372 792 L388 832 L348 832 L358 792 C352 742, 350 688, 358 642 C348 588, 346 528, 348 482" fill="#38bdf8" fill-opacity="0.06"/>
        <rect x="358" y="630" width="24" height="24" rx="6" stroke="#4f46e5" stroke-opacity="0.55"/>
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

      <!-- 3/4 Ribcage Egg (centered around y=296, compact waist directly below) -->
      <g transform="translate(220, 298)">
        <path d="M-8 -106 C58 -106, 84 -46, 76 38 C68 90, 36 108, -8 108 C-56 108, -82 80, -78 22 C-74 -46, -54 -106, -8 -106 Z" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.62" stroke-width="2"/>
        <!-- Front centerline curving around 3/4 egg -->
        <path d="M20 -102 C46 -40, 48 38, 26 104" fill="none" stroke="#6366f1" stroke-opacity="0.68" stroke-width="2"/>
        <!-- Thoracic arch -->
        <path d="M-20 98 Q26 28 66 84" fill="none" stroke="#4f46e5" stroke-opacity="0.54" stroke-width="1.6" stroke-dasharray="5 4"/>
        <!-- Side plane ellipse -->
        <ellipse cx="-50" cy="-14" rx="18" ry="54" fill="none" stroke="#0284c7" stroke-opacity="0.4" stroke-dasharray="4 4"/>
        <!-- Neck opening & S-clavicle hint -->
        <ellipse cx="4" cy="-100" rx="30" ry="11" fill="none" stroke="#4f46e5" stroke-opacity="0.55" stroke-width="1.5"/>
        <path d="M-12 -102 L-14 -132 M20 -100 L18 -132" fill="none" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.6"/>
        <text x="0" y="-142" font-size="11.5" font-weight="600" fill="#4f46e5" fill-opacity="0.8" text-anchor="middle">胸腔蛋（颈筒衔接，前中线向右转）</text>
      </g>

      <!-- Compact Lumbar Waist Connector (~40px natural anatomical waist) -->
      <path d="M156 402 C162 422, 162 436, 156 452 M278 398 C272 418, 274 434, 282 450" fill="none" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.7" stroke-dasharray="5 3"/>
      <path d="M160 428 Q224 446 276 426" fill="none" stroke="#10b981" stroke-opacity="0.58" stroke-width="1.5" stroke-dasharray="4 4"/>
      <text x="220" y="440" font-size="10.5" fill="#059669" fill-opacity="0.82" text-anchor="middle">紧凑腰段衔接</text>

      <!-- 3/4 Pelvis Box (y=450..608, directly interlocking beneath waist) -->
      <g transform="translate(220, 526)">
        <!-- Top plane -->
        <polygon points="-72,-74 46,-82 86,-58 -32,-48" fill="#6366f1" fill-opacity="0.08" stroke="#e11d48" stroke-opacity="0.6" stroke-width="1.8"/>
        <!-- Front plane -->
        <polygon points="-32,-48 86,-58 72,38 24,74 -16,74 -28,32" fill="#38bdf8" fill-opacity="0.06" stroke="#e11d48" stroke-opacity="0.62" stroke-width="2"/>
        <!-- Side plane -->
        <polygon points="-72,-74 -32,-48 -28,32 -68,8" fill="#e11d48" fill-opacity="0.08" stroke="#e11d48" stroke-opacity="0.58" stroke-width="1.8"/>
        <!-- Front centerline -->
        <line x1="28" y1="-52" x2="10" y2="74" stroke="#6366f1" stroke-opacity="0.68" stroke-width="1.8"/>
        <!-- Hip socket ellipse on side plane + upper femur cylinder cue -->
        <ellipse cx="-48" cy="4" rx="13" ry="24" fill="none" stroke="#d97706" stroke-opacity="0.68" stroke-width="1.6"/>
        <path d="M-58 26 L-50 112 M-34 22 L-22 110 M62 34 L54 112 M26 70 L22 112" fill="none" stroke="#0284c7" stroke-opacity="0.34" stroke-width="1.4" stroke-dasharray="4 4"/>
        <text x="0" y="138" font-size="11.5" font-weight="600" fill="#e11d48" fill-opacity="0.82" text-anchor="middle">红线骨盆盒（顶面 + 耻骨正面 + 大转子髋臼）</text>
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

      <!-- Center spine guide & 3D Counter-Tilted Ribcage Egg + Pelvis Trapezoid Box -->
      <path d="M602 252 C572 346, 568 470, 598 634" fill="none" stroke="#6366f1" stroke-opacity="0.55" stroke-width="2.6" stroke-linecap="round"/>
      <g transform="translate(596, 360) rotate(11)" fill="none" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.6" stroke-dasharray="5 4">
        <path d="M0 -84 C48 -84, 68 -42, 62 24 C56 68, 32 82, 0 82 C-34 82, -58 66, -62 22 C-66 -42, -46 -84, 0 -84 Z"/>
        <path d="M-24 72 Q6 32 32 70"/>
      </g>
      <g transform="translate(594, 546) rotate(-11)" fill="none" stroke="#e11d48" stroke-opacity="0.48" stroke-width="1.6" stroke-dasharray="5 4">
        <polygon points="-60,-46 60,-46 70,18 32,48 -32,48 -70,18"/>
        <line x1="-60" y1="-26" x2="60" y2="-26" stroke-opacity="0.32"/>
      </g>
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
      <g transform="translate(86, 152)" fill="none" stroke="#0284c7" stroke-opacity="0.6" stroke-width="1.7">
        <!-- Shoulder cap -->
        <path d="M36 28 C14 42, 14 84, 38 98 C56 108, 78 96, 86 78" fill="#38bdf8" fill-opacity="0.06" stroke="#4f46e5" stroke-opacity="0.64"/>
        <!-- Upper arm tapered cylinder -->
        <path d="M52 36 L176 58 M42 92 L166 106"/>
        <ellipse cx="110" cy="74" rx="14" ry="29" stroke="#6366f1" stroke-opacity="0.48" stroke-dasharray="4 3"/>
        <!-- Elbow hinge sphere -->
        <circle cx="174" cy="82" r="22" fill="#e11d48" fill-opacity="0.05" stroke="#d97706" stroke-opacity="0.58" stroke-dasharray="4 3"/>
        <!-- Forearm wider brachioradialis near elbow, tapering to flat 2:1 wrist box + mitten hand hint -->
        <path d="M180 60 C216 48, 256 64, 304 75 M174 106 C214 112, 254 100, 304 91"/>
        <ellipse cx="234" cy="82" rx="12" ry="26" stroke="#6366f1" stroke-opacity="0.48" stroke-dasharray="4 3"/>
        <rect x="304" y="72" width="18" height="22" rx="3" stroke="#10b981" stroke-opacity="0.65"/>
        <polygon points="322,73 356,70 364,84 352,98 322,93" fill="#10b981" fill-opacity="0.07" stroke="#059669" stroke-opacity="0.58"/>
        <text x="190" y="144" font-size="11.5" fill="#475569" fill-opacity="0.78" stroke="none" text-anchor="middle">三角肌球 → 上臂筒 → 肘绞链 → 小臂近肘粗、腕扁</text>
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
      <g transform="translate(116, 536)" fill="none" stroke="#0284c7" stroke-opacity="0.6" stroke-width="1.8">
        <!-- Spine of leg S-rhythm -->
        <path d="M96 14 C118 74, 114 126, 92 158 C76 192, 72 238, 86 274" stroke="#6366f1" stroke-opacity="0.58" stroke-width="2.4" stroke-dasharray="6 4"/>
        <!-- Thigh curves forward -->
        <path d="M60 12 C50 68, 60 118, 74 150 M136 14 C150 66, 134 114, 112 146"/>
        <ellipse cx="96" cy="78" rx="36" ry="12" stroke="#6366f1" stroke-opacity="0.4" stroke-dasharray="4 3"/>
        <!-- Knee box/patella plane -->
        <path d="M112 142 L118 166 L106 178" stroke="#d97706" stroke-opacity="0.72" stroke-width="2"/>
        <!-- Calf sweeps back -->
        <path d="M74 150 C52 186, 54 228, 74 274 M106 178 C104 212, 98 246, 98 272"/>
        <ellipse cx="82" cy="212" rx="22" ry="9" stroke="#6366f1" stroke-opacity="0.4" stroke-dasharray="4 3"/>
        <!-- Grounded 1:2.5 Wedge Foot -->
        <path d="M74 274 L68 298 L150 298 L152 288 L122 276 L98 272" fill="#38bdf8" fill-opacity="0.06"/>
        <line x1="50" y1="298" x2="170" y2="298" stroke="#94a3b8" stroke-opacity="0.55" stroke-width="1.4"/>
        <text x="156" y="74" font-size="11" fill="#0284c7" fill-opacity="0.8" stroke="none">大腿前拱</text>
        <text x="132" y="164" font-size="11" fill="#d97706" fill-opacity="0.82" stroke="none">膝盖方切</text>
        <text x="12" y="214" font-size="11" fill="#4f46e5" fill-opacity="0.8" stroke="none">小腿后弓</text>
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

      <g transform="translate(152, 146)" fill="none" stroke="#0284c7" stroke-opacity="0.62" stroke-width="1.8" stroke-linejoin="round">
        <!-- Wrist cylinder -->
        <path d="M72 288 L76 244 M156 288 L152 244" stroke-opacity="0.48"/>
        <!-- Pentagonal Palm Box -->
        <polygon points="76,244 152,244 166,154 114,138 64,154" fill="#38bdf8" fill-opacity="0.06"/>
        <!-- Thumb 3D Thenar Oval Cushion + Articulated 2-Phalanx Cylinder -->
        <ellipse cx="170" cy="204" rx="18" ry="30" transform="rotate(24 170 204)" fill="#d97706" fill-opacity="0.08" stroke="#d97706" stroke-opacity="0.62"/>
        <path d="M168 232 C188 214, 206 188, 222 158 C230 142, 226 126, 214 130 C206 144, 198 158, 186 172" fill="#d97706" fill-opacity="0.06" stroke="#d97706" stroke-opacity="0.68"/>
        <line x1="199" y1="164" x2="213" y2="171" stroke="#d97706" stroke-opacity="0.52"/>
        <!-- Knuckle Arch & PIP/Fingertip Fan Arches -->
        <path d="M56 156 Q114 128 172 156" stroke="#6366f1" stroke-opacity="0.68" stroke-width="1.8" stroke-dasharray="5 4"/>
        <path d="M46 106 Q114 66 178 102" stroke="#6366f1" stroke-opacity="0.42" stroke-width="1.4" stroke-dasharray="4 4"/>
        <path d="M40 58 Q114 4 182 54" stroke="#10b981" stroke-opacity="0.68" stroke-width="1.8" stroke-dasharray="5 4"/>
        <!-- Middle finger length = Palm length divider -->
        <line x1="114" y1="244" x2="114" y2="26" stroke="#6366f1" stroke-opacity="0.38" stroke-dasharray="4 4"/>
        <!-- 4 Articulated Tapered Finger Cylinders -->
        <path d="M64 154 L46 66 C45 58, 59 56, 61 64 L80 148" fill="#38bdf8" fill-opacity="0.05"/>
        <path d="M84 146 L78 40 C78 32, 95 31, 96 39 L104 142" fill="#38bdf8" fill-opacity="0.05"/>
        <path d="M110 140 L114 26 C115 18, 133 19, 133 27 L132 142" fill="#38bdf8" fill-opacity="0.06"/>
        <path d="M138 144 L156 50 C158 42, 174 46, 172 54 L158 152" fill="#38bdf8" fill-opacity="0.05"/>
        <line x1="53" y1="106" x2="69" y2="102" stroke-opacity="0.42"/>
        <line x1="81" y1="92" x2="98" y2="90" stroke-opacity="0.42"/>
        <line x1="113" y1="84" x2="132" y2="85" stroke-opacity="0.42"/>
        <line x1="147" y1="98" x2="164" y2="101" stroke-opacity="0.42"/>
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

      <!-- Angle 1: Medial Side View (Proportional 1 : 2.6 Height:Length Wedge + Arch) -->
      <g transform="translate(86, 162)" fill="none" stroke-width="1.8">
        <!-- Ground plane -->
        <line x1="8" y1="234" x2="296" y2="234" stroke="#94a3b8" stroke-opacity="0.58" stroke-width="1.5"/>
        <!-- Lower leg cylinder tapering nicely to ankle (y=164, height=70px vs length=212px) -->
        <path d="M62 48 L56 158 M116 48 L114 156" stroke="#0284c7" stroke-opacity="0.58"/>
        <!-- Wedge Foot (heel at x=46, ball at x=196, toe at x=258) -->
        <path d="M56 158 C44 182, 42 212, 50 234 L102 234 Q142 212 188 234 L256 234 L260 218 L216 202 L114 156 Z" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.65"/>
        <!-- Medial arch highlight -->
        <path d="M102 234 Q144 206 188 234" stroke="#10b981" stroke-width="2.4" stroke-opacity="0.8"/>
        <!-- Inner ankle bone (high medial malleolus) -->
        <circle cx="88" cy="166" r="8" stroke="#d97706" stroke-opacity="0.78"/>
        <text x="150" y="264" font-size="11.5" fill="#059669" fill-opacity="0.82" stroke="none" text-anchor="middle">内侧视（高长比 1:2.6）：脚跟+前掌落地，中段挑起足弓</text>
      </g>

      <!-- Angle 2: Front View (Asymmetric Ankle + Low-Profile Dorsum Trapezoid) -->
      <g transform="translate(468, 162)" fill="none" stroke-width="1.8">
        <line x1="12" y1="234" x2="220" y2="234" stroke="#94a3b8" stroke-opacity="0.58" stroke-width="1.5"/>
        <path d="M84 48 L86 164 M142 48 L140 176" stroke="#0284c7" stroke-opacity="0.58"/>
        <!-- Asymmetric ankle slant: Inner (left) high y=164, Outer (right) low y=178 -->
        <line x1="76" y1="162" x2="150" y2="180" stroke="#d97706" stroke-width="2" stroke-dasharray="5 3" stroke-opacity="0.8"/>
        <circle cx="84" cy="164" r="5.5" fill="#d97706" fill-opacity="0.7"/>
        <circle cx="144" cy="178" r="5.5" fill="#d97706" fill-opacity="0.7"/>
        <!-- Low-profile Front wedge trapezoid (y=164..234, height=70px, width=106px) -->
        <path d="M86 164 L66 206 L64 234 L170 234 L170 218 L140 176 Z" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.65"/>
        <!-- Toe box slope & big toe divider -->
        <line x1="66" y1="208" x2="168" y2="220" stroke="#6366f1" stroke-opacity="0.58"/>
        <line x1="94" y1="212" x2="94" y2="234" stroke="#6366f1" stroke-opacity="0.45"/>
        <text x="116" y="264" font-size="11.5" fill="#d97706" fill-opacity="0.82" stroke="none" text-anchor="middle">正视：内踝高外踝低 · 脚背内厚外薄斜梯形</text>
      </g>

      <!-- Angle 3: 3/4 Perspective Wedge Block (height ~70px, length ~190px) -->
      <g transform="translate(796, 162)" fill="none" stroke-width="1.8">
        <line x1="8" y1="234" x2="312" y2="234" stroke="#94a3b8" stroke-opacity="0.58" stroke-width="1.5"/>
        <!-- Shin cylinder -->
        <path d="M86 48 L84 156 M136 48 L138 154" stroke="#0284c7" stroke-opacity="0.58"/>
        <ellipse cx="111" cy="155" rx="26" ry="9" stroke="#6366f1" stroke-opacity="0.58"/>
        <!-- 3D Wedge top slope + inner side + boxy toe front -->
        <polygon points="84,156 138,154 242,204 192,216" fill="#6366f1" fill-opacity="0.08" stroke="#4f46e5" stroke-opacity="0.64"/>
        <polygon points="84,156 192,216 188,234 142,226 112,234 64,228 62,190" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.65"/>
        <polygon points="192,216 242,204 260,226 198,236" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.65"/>
        <text x="164" y="264" font-size="11.5" fill="#4f46e5" fill-opacity="0.82" stroke="none" text-anchor="middle">3/4 视：脚背斜面 + 内侧足弓 + 脚趾梯形楔块</text>
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

      <g transform="translate(222, 188)" fill="none" stroke-width="1.7">
        <!-- Underlying mannequin skeleton: Head + Neck cylinder + Ribcage ovoid + Pelvis box + Limb shells -->
        <g stroke="#0284c7" stroke-opacity="0.28" stroke-width="1.35">
          <!-- Cranium & jaw -->
          <path d="M0 -44 C20 -44, 26 -24, 24 4 L15 28 L0 36 L-15 28 L-24 4 C-26 -24, -20 -44, 0 -44 Z" fill="#38bdf8" fill-opacity="0.03"/>
          <line x1="-22" y1="-8" x2="22" y2="-8" stroke-dasharray="3 3"/>
          <!-- Neck cylinder -->
          <path d="M-19 22 L-22 72 M19 22 L22 72"/>
          <!-- Ribcage ovoid -->
          <ellipse cx="0" cy="196" rx="82" ry="110" stroke-dasharray="5 4"/>
          <!-- Pelvis block + Hip sockets -->
          <path d="M-68 372 L68 372 L76 426 L44 452 L-44 452 L-76 426 Z" fill="#38bdf8" fill-opacity="0.03" stroke-dasharray="5 4"/>
          <ellipse cx="-66" cy="422" rx="11" ry="13"/>
          <ellipse cx="66" cy="422" rx="11" ry="13"/>
          <!-- Continuous upper arm & forearm cylinders -->
          <path d="M-104 88 C-134 104, -140 154, -124 210 L-114 316 C-110 326, -96 326, -94 314 L-90 198"/>
          <path d="M104 88 C134 104, 140 154, 124 210 L114 316 C110 326, 96 326, 94 314 L90 198"/>
          <!-- Continuous upper thigh cylinders -->
          <path d="M-76 424 C-86 472, -80 520, -64 562 M-32 452 L-34 562"/>
          <path d="M76 424 C86 472, 80 520, 64 562 M32 452 L34 562"/>
        </g>

        <!-- Neck & Sternocleidomastoid V -->
        <path d="M-21 24 L0 76 L21 24" stroke="#6366f1" stroke-opacity="0.62"/>
        <!-- Trapezius slope -->
        <path d="M-21 38 Q-58 64 -104 88 M21 38 Q58 64 104 88" stroke="#0284c7" stroke-opacity="0.62"/>
        <!-- Clavicle bone -->
        <path d="M-104 88 Q-54 70 0 78 Q54 70 104 88" stroke="#d97706" stroke-width="2.2" stroke-opacity="0.78"/>
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
      <text x="222" y="794" font-size="11.5" fill="#4f46e5" fill-opacity="0.82" text-anchor="middle">胸大肌末端钻入三角肌下方</text>
      <text x="222" y="816" font-size="11.5" fill="#059669" fill-opacity="0.82" text-anchor="middle">腹直肌收束于耻骨 · 腹外斜肌扣住髂嵴</text>

      <!-- Panel 2: Back Torso (Trapezius + Scapulae + Lats + Glutes) -->
      <rect x="420" y="92" width="356" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="438" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 2 · 背面躯干（斜方菱形 + 背阔倒三角）</text>

      <g transform="translate(598, 188)" fill="none" stroke-width="1.7">
        <!-- Underlying mannequin skeleton: Occiput + Neck + Ribcage + Pelvis + Arms + Thighs -->
        <g stroke="#0284c7" stroke-opacity="0.28" stroke-width="1.35">
          <!-- Back of cranium & occiput ridge -->
          <path d="M0 -44 C22 -44, 28 -22, 24 8 C20 22, 10 28, 0 28 C-10 28, -20 22, -24 8 C-28 -22, -22 -44, 0 -44 Z" fill="#38bdf8" fill-opacity="0.03"/>
          <!-- Neck cylinder -->
          <path d="M-20 20 L-22 68 M20 20 L22 68"/>
          <!-- Ribcage ovoid -->
          <ellipse cx="0" cy="198" rx="84" ry="112" stroke-dasharray="5 4"/>
          <!-- Upper arm & forearm cylinders -->
          <path d="M-106 86 C-136 102, -142 154, -124 210 L-114 316 C-110 326, -96 326, -94 314 L-90 198"/>
          <path d="M106 86 C136 102, 142 154, 124 210 L114 316 C110 326, 96 326, 94 314 L90 198"/>
          <!-- Continuous upper thigh cylinders -->
          <path d="M-74 456 C-82 496, -74 532, -62 562 M-20 462 L-28 562"/>
          <path d="M74 456 C82 496, 74 532, 62 562 M20 462 L28 562"/>
        </g>

        <!-- Spine vertical furrow -->
        <line x1="0" y1="22" x2="0" y2="418" stroke="#6366f1" stroke-opacity="0.52" stroke-dasharray="6 4"/>
        <!-- Trapezius Diamond (kite shape) -->
        <polygon points="0,24 -106,86 0,256 106,86" fill="#6366f1" fill-opacity="0.07" stroke="#4f46e5" stroke-opacity="0.65"/>
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
      <text x="598" y="794" font-size="11.5" fill="#4f46e5" fill-opacity="0.82" text-anchor="middle">斜方肌呈风筝菱形 · 肩胛骨随抬臂旋转</text>
      <text x="598" y="816" font-size="11.5" fill="#059669" fill-opacity="0.82" text-anchor="middle">背阔肌拉出上宽下窄倒三角</text>

      <!-- Panel 3: Limb Chain Interlocking (Arm + Leg) -->
      <rect x="800" y="92" width="352" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="818" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 3 · 四肢肌群链条式穿插</text>

      <!-- Upper: Arm Chain wrapped in continuous 3D tapered arm shell -->
      <g transform="translate(888, 148)" fill="none" stroke-width="1.8">
        <!-- Underlying 3D tapered arm shell + elbow + 2:1 wrist + mitten hand -->
        <g stroke="#0284c7" stroke-opacity="0.32" stroke-width="1.4">
          <path d="M56 10 C32 20, 26 42, 32 70 L46 164 L54 274 L98 274 L112 164 L106 66 C104 34, 86 14, 56 10 Z" fill="#38bdf8" fill-opacity="0.03"/>
          <ellipse cx="78" cy="166" rx="28" ry="8" stroke-dasharray="3 3"/>
          <ellipse cx="76" cy="274" rx="22" ry="6"/>
          <path d="M54 276 L46 306 L62 320 L92 318 L100 294 L96 276" fill="#38bdf8" fill-opacity="0.03"/>
        </g>
        <!-- Deltoid teardrop -->
        <path d="M56 12 C96 20, 104 68, 78 112 C56 84, 50 48, 56 12 Z" fill="#6366f1" fill-opacity="0.09" stroke="#4f46e5" stroke-opacity="0.68"/>
        <!-- Biceps (front) + Triceps (back) flanking deltoid tip -->
        <path d="M58 58 C34 86, 36 144, 62 174 M94 64 C118 96, 114 148, 92 176" stroke="#0284c7" stroke-opacity="0.65"/>
        <!-- Brachioradialis bridging from outer upper arm across elbow into forearm -->
        <path d="M90 128 C118 164, 116 218, 96 274 M62 174 C52 214, 60 250, 72 276" fill="#10b981" fill-opacity="0.07" stroke="#059669" stroke-opacity="0.68"/>
        <text x="84" y="338" font-size="11.5" fill="#4f46e5" fill-opacity="0.82" stroke="none" text-anchor="middle">三角肌楔入二/三头肌 · 肱桡肌跨肘锁链</text>
      </g>

      <!-- Lower: Leg Chain wrapped in continuous 3D tapered leg shell -->
      <g transform="translate(888, 502)" fill="none" stroke-width="1.8">
        <!-- Underlying 3D tapered femur -> knee -> calf -> ankle -> grounded foot wedge -->
        <g stroke="#0284c7" stroke-opacity="0.32" stroke-width="1.4">
          <path d="M48 8 C28 56, 34 114, 56 158 C42 204, 46 258, 66 306 L94 306 C114 258, 118 202, 104 158 C126 112, 130 54, 112 8 Z" fill="#38bdf8" fill-opacity="0.03"/>
          <ellipse cx="80" cy="84" rx="44" ry="10" stroke-dasharray="3 3"/>
          <line x1="66" y1="296" x2="94" y2="304" stroke="#d97706" stroke-opacity="0.45"/>
          <path d="M66 302 L58 318 L108 318 L94 302" fill="#38bdf8" fill-opacity="0.03"/>
        </g>
        <!-- Quadriceps teardrop wrapping above knee -->
        <path d="M52 14 C28 64, 34 126, 62 156 M108 14 C130 62, 124 122, 98 156" stroke="#0284c7" stroke-opacity="0.65"/>
        <path d="M50 18 C72 78, 92 124, 104 166" stroke="#d97706" stroke-opacity="0.68" stroke-dasharray="5 3"/>
        <!-- Patella -->
        <rect x="66" y="152" width="28" height="24" rx="8" stroke="#4f46e5" stroke-opacity="0.65"/>
        <!-- Gastrocnemius: outer head higher, inner head lower! -->
        <path d="M62 178 C38 214, 46 266, 68 306 M98 178 C122 204, 112 254, 92 306" fill="#10b981" fill-opacity="0.07" stroke="#059669" stroke-opacity="0.68"/>
        <line x1="46" y1="242" x2="114" y2="216" stroke="#d97706" stroke-opacity="0.68" stroke-dasharray="4 3"/>
        <text x="84" y="336" font-size="11.5" fill="#059669" fill-opacity="0.82" stroke="none" text-anchor="middle">小腿肚外高内低 · 大腿肌群收束于膝盖</text>
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
        <!-- Head (1H = 81.5px, y=0..81) -->
        <path d="M0 0 C22 0, 28 24, 25 52 L14 78 L0 81 L-14 78 L-25 52 C-28 24, -22 0, 0 0 Z" stroke="#0284c7" stroke-opacity="0.68"/>
        <line x1="-22" y1="36" x2="22" y2="36" stroke="#0284c7" stroke-opacity="0.3" stroke-dasharray="3 3"/>
        <!-- Neck cylinder + broad trapezius slopes -->
        <path d="M-16 68 L-19 108 M16 68 L19 108" stroke="#0284c7" stroke-opacity="0.62"/>
        <path d="M-18 86 L-68 116 M18 86 L68 116" stroke="#4f46e5" stroke-opacity="0.62"/>
        <!-- Shoulder width marker -->
        <line x1="-90" y1="106" x2="90" y2="106" stroke="#d97706" stroke-opacity="0.65" marker-start="url(#tpl-arrow-amber)" marker-end="url(#tpl-arrow-amber)"/>
        <!-- Inverted Trapezoid Ribcage (1.33H..3.3H) -->
        <polygon points="-88,120 88,120 48,266 -48,266" fill="#6366f1" fill-opacity="0.06" stroke="#4f46e5" stroke-opacity="0.65" stroke-dasharray="5 4"/>
        <path d="M-90 124 Q-44 114 0 118 Q44 114 90 124" stroke="#d97706" stroke-opacity="0.62"/>
        <!-- Lumbar waist + Narrower Pelvis aligned at 4H (326..344) -->
        <path d="M-48 266 L-52 292 M48 266 L52 292" stroke="#0284c7" stroke-opacity="0.55"/>
        <polygon points="-54,288 54,288 58,334 0,346 -58,334" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.62"/>
        <!-- Tapered 3D Arms: deltoid -> elbow (244) -> wrist (328) -> mitten hand (386) -->
        <path d="M-88 120 C-108 128, -112 162, -104 196 L-98 244 L-94 328 L-86 386 L-76 378 L-74 328 L-74 244 L-76 172" stroke="#0284c7" stroke-opacity="0.52"/>
        <path d="M88 120 C108 128, 112 162, 104 196 L98 244 L94 328 L86 386 L76 378 L74 328 L74 244 L76 172" stroke="#0284c7" stroke-opacity="0.52"/>
        <!-- Tapered 3D Legs: thigh -> knee (486) -> muscular calf -> ankle (626) -> grounded foot wedge (652) -->
        <path d="M-58 326 C-62 384, -52 442, -44 486 C-52 528, -46 576, -34 626 L-40 652 L-14 652 L-18 626 C-12 576, -12 528, -20 486 C-12 442, -6 388, -6 346" fill="#38bdf8" fill-opacity="0.04" stroke="#0284c7" stroke-opacity="0.62"/>
        <path d="M58 326 C62 384, 52 442, 44 486 C52 528, 46 576, 34 626 L40 652 L14 652 L18 626 C12 576, 12 528, 20 486 C12 442, 6 388, 6 346" fill="#38bdf8" fill-opacity="0.04" stroke="#0284c7" stroke-opacity="0.62"/>
        <!-- Knee boxes at 6H -->
        <line x1="-44" y1="488" x2="-20" y2="488" stroke="#6366f1" stroke-opacity="0.45"/>
        <line x1="20" y1="488" x2="44" y2="488" stroke="#6366f1" stroke-opacity="0.45"/>
      </g>
      <text x="176" y="844" font-size="11" fill="#4f46e5" fill-opacity="0.8" text-anchor="middle">直线硬朗转折 · 低腰线</text>

      <!-- Bay 2: Standard Female (7 heads, Hourglass / Curved Hips) -->
      <rect x="330" y="92" width="256" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="458" y="120" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.82" text-anchor="middle">2 · 标准女体（7头 · 沙漏形）</text>
      <text x="458" y="140" font-size="11" fill="#475569" fill-opacity="0.72" text-anchor="middle">柔斜肩 ≈ 1.6 头 · 胯宽 ≈ 1.75 头</text>
      <line x1="458" y1="156" x2="458" y2="818" stroke="#6366f1" stroke-opacity="0.26" stroke-dasharray="5 5"/>
      <g transform="translate(458, 206)" fill="none" stroke-width="1.8">
        <!-- Head (1H ≈ 87px, y=0..86) -->
        <path d="M0 0 C22 0, 26 24, 23 54 L13 78 L0 86 L-13 78 L-23 54 C-26 24, -22 0, 0 0 Z" stroke="#0284c7" stroke-opacity="0.68"/>
        <line x1="-20" y1="38" x2="20" y2="38" stroke="#0284c7" stroke-opacity="0.3" stroke-dasharray="3 3"/>
        <!-- Slender neck + sloping trapezius -->
        <path d="M-12 76 L-14 114 M12 76 L14 114" stroke="#0284c7" stroke-opacity="0.62"/>
        <path d="M-14 96 Q-36 112 -64 126 M14 96 Q36 112 64 126" stroke="#059669" stroke-opacity="0.62"/>
        <!-- Hourglass Torso + Rounded Pelvis (y=126..356) -->
        <path d="M-64 126 C-56 184, -32 218, -32 246 C-62 280, -72 316, -66 346 L0 356 L66 346 C72 316, 62 280, 32 246 C32 218, 56 184, 64 126 Z" fill="#10b981" fill-opacity="0.06" stroke="#059669" stroke-opacity="0.65" stroke-dasharray="5 4"/>
        <!-- High waist marker -->
        <line x1="-46" y1="246" x2="46" y2="246" stroke="#d97706" stroke-opacity="0.68" stroke-dasharray="4 3"/>
        <text x="54" y="250" font-size="10.5" fill="#d97706" fill-opacity="0.85" stroke="none">高腰线</text>
        <!-- Slender Tapered Arms -->
        <path d="M-64 126 C-80 134, -84 164, -78 198 L-74 246 L-76 322 L-72 374 L-64 368 L-62 322 L-58 246 L-56 172" stroke="#0284c7" stroke-opacity="0.52"/>
        <path d="M64 126 C80 134, 84 164, 78 198 L74 246 L76 322 L72 374 L64 368 L62 322 L58 246 L56 172" stroke="#0284c7" stroke-opacity="0.52"/>
        <!-- Graceful S-curve Tapered Legs grounded at y=612 (818 global) -->
        <path d="M-66 334 C-68 386, -50 434, -40 478 C-48 518, -40 554, -28 592 L-34 612 L-12 612 L-16 592 C-10 554, -10 518, -18 478 C-10 436, -4 390, -5 356" fill="#10b981" fill-opacity="0.04" stroke="#0284c7" stroke-opacity="0.62"/>
        <path d="M66 334 C68 386, 50 434, 40 478 C48 518, 40 554, 28 592 L34 612 L12 612 L16 592 C10 554, 10 518, 18 478 C10 436, 4 390, 5 356" fill="#10b981" fill-opacity="0.04" stroke="#0284c7" stroke-opacity="0.62"/>
        <!-- Knee markers -->
        <ellipse cx="-29" cy="478" rx="9" ry="5" stroke="#059669" stroke-opacity="0.45"/>
        <ellipse cx="29" cy="478" rx="9" ry="5" stroke="#059669" stroke-opacity="0.45"/>
      </g>
      <text x="458" y="844" font-size="11" fill="#059669" fill-opacity="0.8" text-anchor="middle">柔和 S 曲线 · 肩窄胯圆润</text>

      <!-- Bay 3: Slender Youth / Teen (6.5 heads, Narrow Column) -->
      <rect x="612" y="92" width="256" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="740" y="120" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.82" text-anchor="middle">3 · 纤细少年（6.5头 · 修长型）</text>
      <text x="740" y="140" font-size="11" fill="#475569" fill-opacity="0.72" text-anchor="middle">头偏大 · 肩胯近等宽 · 四肢细长</text>
      <line x1="740" y1="156" x2="740" y2="818" stroke="#6366f1" stroke-opacity="0.26" stroke-dasharray="5 5"/>
      <g transform="translate(740, 244)" fill="none" stroke-width="1.8">
        <!-- Head slightly larger relative to body (1H ≈ 88px, y=0..88) -->
        <ellipse cx="0" cy="44" rx="28" ry="44" stroke="#0284c7" stroke-opacity="0.68"/>
        <line x1="-24" y1="42" x2="24" y2="42" stroke="#0284c7" stroke-opacity="0.3" stroke-dasharray="3 3"/>
        <!-- Slender neck + narrow clavicles -->
        <path d="M-12 80 L-13 118 M12 80 L13 118" stroke="#0284c7" stroke-opacity="0.62"/>
        <path d="M-13 98 Q-32 114 -52 124 M13 98 Q32 114 52 124" stroke="#0284c7" stroke-opacity="0.58"/>
        <!-- Narrow straight column ribcage + subtle waist + narrow pelvis -->
        <polygon points="-50,124 50,124 38,248 -38,248" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.6" stroke-dasharray="5 4"/>
        <polygon points="-40,256 40,256 44,322 0,332 -44,322" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.6"/>
        <!-- Slender 3D Arms -->
        <path d="M-50 124 C-62 132, -64 162, -60 194 L-58 242 L-56 312 L-52 362 L-44 356 L-44 312 L-44 242 L-44 168" stroke="#0284c7" stroke-opacity="0.5"/>
        <path d="M50 124 C62 132, 64 162, 60 194 L58 242 L56 312 L52 362 L44 356 L44 312 L44 242 L44 168" stroke="#0284c7" stroke-opacity="0.5"/>
        <!-- Slender 3D Legs with clear bony knee joints grounded at y=574 (818 global) -->
        <path d="M-44 314 C-46 364, -38 408, -32 448 C-38 486, -32 522, -22 554 L-28 574 L-8 574 L-12 554 C-8 522, -8 486, -14 448 C-10 408, -4 364, -4 332" fill="#38bdf8" fill-opacity="0.04" stroke="#0284c7" stroke-opacity="0.62"/>
        <path d="M44 314 C46 364, 38 408, 32 448 C38 486, 32 522, 22 554 L28 574 L8 574 L12 554 C8 522, 8 486, 14 448 C10 408, 4 364, 4 332" fill="#38bdf8" fill-opacity="0.04" stroke="#0284c7" stroke-opacity="0.62"/>
        <circle cx="-23" cy="448" r="6" stroke="#6366f1" stroke-opacity="0.48"/>
        <circle cx="23" cy="448" r="6" stroke="#6366f1" stroke-opacity="0.48"/>
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
    variants: [
      { id: 'redblue', label: '📐 红蓝躯干/手足三维块面', svg: PLATE_FIGURE_TORSO_HAND },
      { id: 'nanobanana', label: '🎨 人体比例与反斜动态总览', svg: PLATE_FIGURE_BODY_SYSTEM },
    ],
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
    variants: [
      { id: 'redblue', label: '📐 红蓝躯干/手足三维块面', svg: PLATE_FIGURE_TORSO_HAND },
      { id: 'nanobanana', label: '🎨 人体比例与反斜动态总览', svg: PLATE_FIGURE_BODY_SYSTEM },
    ],
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
