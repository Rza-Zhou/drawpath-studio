/**
 * DrawPath Studio · 阶段一：通用基本功主线 (Core Track - 8课)
 */
import { wrapTemplateSVG, wrapCheatSheetSVG } from './svg-helpers.js';

export const CORE_TEMPLATES = [
  {
    id: 'tpl-core-lines',
    name: '控笔定点长直线与平行线间距靶纸',
    track: 'core',
    lessonId: 'core-1',
    description: '涵盖水平、垂直、斜向定点鬼影连线轨道与等距平行线控笔框，专治蹭线抖线。',
    svgContent: wrapTemplateSVG(
      'CORE-1 · 握笔姿势与定点长直线靶纸',
      '口诀：锁定手腕用手肘带动笔尖 · 悬空预演 2 次 · 眼盯终点一笔拉通',
      `
      <rect x="48" y="92" width="540" height="360" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.25" stroke-dasharray="6 6"/>
      <text x="66" y="118" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 1 · 短/中/长水平定点连线（一笔穿过两圆点）</text>
      <g stroke="#38bdf8" stroke-opacity="0.34" stroke-width="1.4" stroke-dasharray="5 5">
        <line x1="80" y1="156" x2="280" y2="156"/>
        <line x1="80" y1="200" x2="390" y2="200"/>
        <line x1="80" y1="244" x2="545" y2="244"/>
        <line x1="80" y1="292" x2="545" y2="292"/>
        <line x1="80" y1="340" x2="545" y2="340"/>
        <line x1="80" y1="388" x2="545" y2="388"/>
      </g>
      <g fill="#6366f1" fill-opacity="0.62">
        <circle cx="80" cy="156" r="4.5"/><circle cx="280" cy="156" r="4.5"/>
        <circle cx="80" cy="200" r="4.5"/><circle cx="390" cy="200" r="4.5"/>
        <circle cx="80" cy="244" r="4.5"/><circle cx="545" cy="244" r="4.5"/>
        <circle cx="80" cy="292" r="4.5"/><circle cx="545" cy="292" r="4.5"/>
        <circle cx="80" cy="340" r="4.5"/><circle cx="545" cy="340" r="4.5"/>
        <circle cx="80" cy="388" r="4.5"/><circle cx="545" cy="388" r="4.5"/>
      </g>

      <rect x="612" y="92" width="540" height="360" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.25" stroke-dasharray="6 6"/>
      <text x="630" y="118" font-size="13" font-weight="700" fill="#4f46e5" fill-opacity="0.78">区 2 · 米字格与斜向长直线（测试不同顺手角度）</text>
      <g stroke="#6366f1" stroke-opacity="0.34" stroke-width="1.4" stroke-dasharray="5 5">
        <line x1="650" y1="150" x2="1110" y2="415"/>
        <line x1="650" y1="415" x2="1110" y2="150"/>
        <line x1="880" y1="140" x2="880" y2="425"/>
        <line x1="640" y1="282" x2="1120" y2="282"/>
      </g>
      <g fill="#0284c7" fill-opacity="0.62">
        <circle cx="650" cy="150" r="4.5"/><circle cx="1110" cy="415" r="4.5"/>
        <circle cx="650" cy="415" r="4.5"/><circle cx="1110" cy="150" r="4.5"/>
        <circle cx="880" cy="140" r="4.5"/><circle cx="880" cy="425" r="4.5"/>
        <circle cx="640" cy="282" r="4.5"/><circle cx="1120" cy="282" r="4.5"/>
      </g>

      <rect x="48" y="476" width="1104" height="380" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.25"/>
      <text x="66" y="504" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 3 · 垂直线与等距平行排线挑战（先画一条基准线，再顺着它复制出 8 条平行线）</text>
      <g stroke="#0ea5e9" stroke-opacity="0.52" stroke-width="2">
        <line x1="110" y1="538" x2="110" y2="818"/>
        <line x1="360" y1="538" x2="480" y2="818"/>
        <line x1="720" y1="558" x2="1080" y2="558"/>
      </g>
      <g font-size="11.5" fill="#475569" fill-opacity="0.7">
        <text x="140" y="680">→ 间隔 1.5cm 向右复制平行竖线</text>
        <text x="485" y="680">→ 保持 65° 斜率复制平行斜线</text>
        <text x="900" y="600" text-anchor="middle">↓ 向下复制等距水平线</text>
      </g>
      `
    )
  },
  {
    id: 'tpl-core-curves',
    name: '压感轻重渐变线与 C/S 曲线韵律靶纸',
    track: 'core',
    lessonId: 'core-2',
    description: '包含轻重轻「两端尖」压感条、大跨度 C 弧轨道与对称/不对称 S 型流线练笔区。',
    svgContent: wrapTemplateSVG(
      'CORE-2 · 压感轻重渐变线与 C/S 弧线靶纸',
      '口诀：空中入笔轻 → 中段加压实 → 顺势抬笔收尖 · C/S 弧线一气呵成',
      `
      <rect x="48" y="92" width="1104" height="330" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.25" stroke-dasharray="6 6"/>
      <text x="66" y="118" font-size="13" font-weight="700" fill="#4f46e5" fill-opacity="0.78">区 1 ·「轻 - 重 - 轻」压感控制跑道（推荐 G 笔或铅笔沿包络线内拉出渐变粗细）</text>
      <g stroke="#6366f1" stroke-opacity="0.34" stroke-width="1.3" fill="#6366f1" fill-opacity="0.06">
        <path d="M85 170 Q600 150 1115 170 Q600 190 85 170 Z"/>
        <path d="M85 225 Q600 202 1115 225 Q600 248 85 225 Z"/>
        <path d="M85 280 Q600 262 1115 280 Q600 298 85 280 Z"/>
        <path d="M85 338 Q350 322 600 338 Q850 354 1115 338" fill="none" stroke-dasharray="5 5"/>
      </g>
      <text x="100" y="388" font-size="11.5" fill="#4f46e5" fill-opacity="0.68">轻起笔 →</text>
      <text x="600" y="388" font-size="11.5" fill="#4f46e5" fill-opacity="0.75" text-anchor="middle">▲ 中段最重实（压力 ~70%）</text>
      <text x="1100" y="388" font-size="11.5" fill="#4f46e5" fill-opacity="0.68" text-anchor="end">→ 空中顺势收尖</text>

      <rect x="48" y="446" width="536" height="410" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.25"/>
      <text x="66" y="474" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 2 · C 形顺手弧线轨道（由小到大扫弧）</text>
      <g stroke="#0ea5e9" stroke-opacity="0.48" stroke-width="1.8" fill="none" stroke-dasharray="6 5">
        <path d="M100 580 C165 505, 275 505, 340 580"/>
        <path d="M90 665 C180 555, 340 555, 430 665"/>
        <path d="M80 765 C200 620, 405 620, 525 765"/>
      </g>
      <g fill="#0284c7" fill-opacity="0.58">
        <circle cx="100" cy="580" r="4"/><circle cx="340" cy="580" r="4"/>
        <circle cx="90" cy="665" r="4"/><circle cx="430" cy="665" r="4"/>
        <circle cx="80" cy="765" r="4"/><circle cx="525" cy="765" r="4"/>
      </g>

      <rect x="616" y="446" width="536" height="410" rx="12" fill="none" stroke="#10b981" stroke-opacity="0.25"/>
      <text x="634" y="474" font-size="13" font-weight="700" fill="#059669" fill-opacity="0.78">区 3 · S 形波浪流线（经过绿色拐点时顺畅变向）</text>
      <g stroke="#10b981" stroke-opacity="0.48" stroke-width="1.8" fill="none" stroke-dasharray="6 5">
        <path d="M665 555 C765 495, 815 625, 915 565 C1005 510, 1045 615, 1110 560"/>
        <path d="M685 780 C665 685, 810 660, 825 585"/>
        <path d="M920 810 C1025 770, 945 660, 1080 625"/>
      </g>
      <g fill="#10b981" fill-opacity="0.65">
        <circle cx="790" cy="560" r="4.5"/><circle cx="1012" cy="562" r="4.5"/>
        <circle cx="755" cy="672" r="4.5"/><circle cx="1000" cy="712" r="4.5"/>
      </g>
      `
    )
  },
  {
    id: 'tpl-core-circles',
    name: '透视椭圆度阵列与一笔画封口圆练习纸',
    track: 'core',
    lessonId: 'core-3',
    description: '九宫格封口圆靶、15°~75° 旋转椭圆长短轴对齐阵与透视平面切圆指南。',
    svgContent: wrapTemplateSVG(
      'CORE-3 · 透视椭圆与一笔封口圆练习纸',
      '口诀：长短轴严格十字垂直 90° · 椭圆两端圆润饱满 · 先切对角线定圆心',
      `
      <rect x="48" y="92" width="516" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.25" stroke-dasharray="6 6"/>
      <text x="66" y="118" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 1 · 一笔画封口正圆阵（空画两圈顺势落笔）</text>
      <g stroke="#38bdf8" stroke-opacity="0.45" stroke-width="1.6" fill="none">
        <circle cx="155" cy="220" r="76" stroke-dasharray="5 5"/><line x1="155" y1="138" x2="155" y2="302" stroke-opacity="0.22"/><line x1="73" y1="220" x2="237" y2="220" stroke-opacity="0.22"/>
        <circle cx="345" cy="220" r="76" stroke-dasharray="5 5"/><line x1="345" y1="138" x2="345" y2="302" stroke-opacity="0.22"/><line x1="263" y1="220" x2="427" y2="220" stroke-opacity="0.22"/>
        <circle cx="495" cy="220" r="46" stroke-dasharray="5 5"/>
        <circle cx="155" cy="405" r="76" stroke-dasharray="5 5"/>
        <circle cx="345" cy="405" r="76" stroke-dasharray="5 5"/>
        <circle cx="495" cy="405" r="46" stroke-dasharray="5 5"/>
      </g>
      <path d="M155 144 A76 76 0 0 1 200 158" stroke="#6366f1" stroke-opacity="0.65" stroke-width="2" fill="none" marker-end="url(#tpl-arrow-indigo)"/>
      <rect x="74" y="535" width="464" height="295" rx="10" fill="none" stroke="#38bdf8" stroke-opacity="0.22"/>
      <text x="306" y="562" font-size="11.5" fill="#475569" fill-opacity="0.72" text-anchor="middle">空白盲画区：不靠参考虚线画 6 个封口正圆</text>

      <rect x="592" y="92" width="560" height="360" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.25" stroke-dasharray="6 6"/>
      <text x="610" y="118" font-size="13" font-weight="700" fill="#4f46e5" fill-opacity="0.78">区 2 · 渐进椭圆度数阵（观察短轴随视角张开）</text>
      <g stroke="#6366f1" stroke-opacity="0.42" stroke-width="1.5" fill="none">
        <line x1="620" y1="276" x2="1124" y2="276" stroke-opacity="0.24"/>
        <line x1="690" y1="150" x2="690" y2="402" stroke-opacity="0.24"/><ellipse cx="690" cy="276" rx="22" ry="92" stroke-dasharray="4 4"/>
        <line x1="810" y1="150" x2="810" y2="402" stroke-opacity="0.24"/><ellipse cx="810" cy="276" rx="44" ry="92" stroke-dasharray="4 4"/>
        <line x1="945" y1="150" x2="945" y2="402" stroke-opacity="0.24"/><ellipse cx="945" cy="276" rx="68" ry="92" stroke-dasharray="4 4"/>
        <line x1="1070" y1="150" x2="1070" y2="402" stroke-opacity="0.24"/><ellipse cx="1070" cy="276" rx="86" ry="92" stroke-dasharray="4 4"/>
      </g>
      <g font-size="11" fill="#4f46e5" fill-opacity="0.7" text-anchor="middle">
        <text x="690" y="424">15° 极扁</text><text x="810" y="424">30° 微斜</text><text x="945" y="424">50° 半开</text><text x="1070" y="424">75° 近圆</text>
      </g>

      <rect x="592" y="476" width="560" height="380" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.25" stroke-dasharray="6 6"/>
      <text x="610" y="504" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 3 · 透视四边形内切椭圆（对角线交叉找中点）</text>
      <g stroke="#38bdf8" stroke-opacity="0.48" stroke-width="1.6" fill="none">
        <polygon points="635,665 765,590 935,590 815,665"/>
        <line x1="635" y1="665" x2="935" y2="590" stroke-opacity="0.28" stroke-dasharray="4 4"/>
        <line x1="765" y1="590" x2="815" y2="665" stroke-opacity="0.28" stroke-dasharray="4 4"/>
        <ellipse cx="788" cy="628" rx="78" ry="25" stroke="#6366f1" stroke-opacity="0.55" stroke-dasharray="5 4"/>

        <polygon points="975,555 1110,525 1110,750 975,710"/>
        <line x1="975" y1="555" x2="1110" y2="750" stroke-opacity="0.28" stroke-dasharray="4 4"/>
        <line x1="1110" y1="525" x2="975" y2="710" stroke-opacity="0.28" stroke-dasharray="4 4"/>
        <ellipse cx="1042" cy="638" rx="52" ry="90" stroke="#6366f1" stroke-opacity="0.55" stroke-dasharray="5 4"/>

        <polygon points="635,815 775,730 935,730 805,815"/>
        <line x1="635" y1="815" x2="935" y2="730" stroke-opacity="0.28" stroke-dasharray="4 4"/>
        <line x1="775" y1="730" x2="805" y2="815" stroke-opacity="0.28" stroke-dasharray="4 4"/>
      </g>
      <text x="642" y="838" font-size="11.5" fill="#475569" fill-opacity="0.7">▲ 在下方透视方框内自主切出四边相切的透视椭圆</text>
      `
    )
  },
  {
    id: 'tpl-core-forms',
    name: '方体 Y 字起手、圆柱截面与球体经纬底图',
    track: 'core',
    lessonId: 'core-4',
    description: '2D 转 3D 核心练习框架：包含正倒 Y 字方体骨架、圆柱中轴线及多朝向球体经纬网。',
    svgContent: wrapTemplateSVG(
      'CORE-4 · 2D 转 3D：方体、圆柱与球体朝向骨架',
      '口诀：Y字三棱夹角均大于90° · 画出背面透视线防扭曲 · C字绕线包出厚度',
      `
      <rect x="48" y="92" width="350" height="764" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.25" stroke-dasharray="6 6"/>
      <text x="66" y="118" font-size="13" font-weight="700" fill="#4f46e5" fill-opacity="0.78">一 · 方体 Y 字起手与透视 X 光线</text>
      <g stroke="#6366f1" stroke-opacity="0.48" stroke-width="1.6" fill="none">
        <polygon points="150,190 225,155 300,190 225,228"/>
        <polygon points="150,190 225,228 225,315 150,275"/>
        <polygon points="225,228 300,190 300,275 225,315"/>
        <path d="M225 155 L225 238 M150 275 L225 238 L300 275" stroke-dasharray="4 4" stroke-opacity="0.32"/>

        <line x1="160" y1="415" x2="160" y2="500"/>
        <line x1="160" y1="415" x2="95" y2="385"/>
        <line x1="160" y1="415" x2="235" y2="380"/>
        <text x="165" y="528" font-size="11" fill="#4f46e5" fill-opacity="0.68" stroke="none" text-anchor="middle">俯视 Y 起手（补全透明后方棱）</text>

        <line x1="270" y1="625" x2="270" y2="725"/>
        <line x1="270" y1="725" x2="200" y2="760"/>
        <line x1="270" y1="725" x2="335" y2="755"/>
        <text x="265" y="795" font-size="11" fill="#4f46e5" fill-opacity="0.68" stroke="none" text-anchor="middle">倒 Y 仰视起手（露底面）</text>
      </g>

      <rect x="425" y="92" width="350" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.25" stroke-dasharray="6 6"/>
      <text x="443" y="118" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.78">二 · 圆柱体中心轴与 C 型绕线</text>
      <g stroke="#0ea5e9" stroke-opacity="0.48" stroke-width="1.6" fill="none">
        <line x1="510" y1="175" x2="680" y2="315" stroke-dasharray="5 4" stroke="#6366f1"/>
        <ellipse cx="535" cy="196" rx="28" ry="52" transform="rotate(-40 535 196)"/>
        <ellipse cx="655" cy="295" rx="34" ry="52" transform="rotate(-40 655 295)" stroke-dasharray="4 4"/>
        <line x1="502" y1="235" x2="622" y2="335"/>
        <line x1="569" y1="157" x2="689" y2="257"/>
        <path d="M578 268 A32 52 -40 0 1 612 200" stroke="#6366f1" stroke-opacity="0.65"/>

        <line x1="485" y1="440" x2="715" y2="495" stroke="#6366f1" stroke-dasharray="5 4"/>
        <ellipse cx="505" cy="445" rx="20" ry="44" transform="rotate(-76 505 445)"/>
        <text x="600" y="545" font-size="11" fill="#0284c7" fill-opacity="0.68" stroke="none" text-anchor="middle">沿中心轴拉出侧边并加 3 道绕线</text>

        <line x1="535" y1="620" x2="655" y2="800" stroke="#6366f1" stroke-dasharray="5 4"/>
        <ellipse cx="550" cy="642" rx="48" ry="22" transform="rotate(-34 550 642)"/>
      </g>

      <rect x="802" y="92" width="350" height="764" rx="12" fill="none" stroke="#10b981" stroke-opacity="0.25" stroke-dasharray="6 6"/>
      <text x="820" y="118" font-size="13" font-weight="700" fill="#059669" fill-opacity="0.78">三 · 球体经纬十字线（转向定位）</text>
      <g stroke="#38bdf8" stroke-opacity="0.48" stroke-width="1.6" fill="none">
        <circle cx="977" cy="240" r="82"/>
        <path d="M895 240 Q977 288 1059 240" stroke="#10b981" stroke-opacity="0.65"/>
        <path d="M895 240 Q977 205 1059 240" stroke="#10b981" stroke-opacity="0.25" stroke-dasharray="4 4"/>
        <path d="M977 158 Q1025 240 977 322" stroke="#10b981" stroke-opacity="0.65"/>
        <circle cx="1008" cy="256" r="4.5" fill="#10b981" fill-opacity="0.7"/>

        <circle cx="977" cy="480" r="82"/>
        <circle cx="945" cy="450" r="4.5" fill="#10b981" fill-opacity="0.7"/>
        <text x="977" y="592" font-size="11" fill="#059669" fill-opacity="0.7" stroke="none" text-anchor="middle">画出让交点朝「左上方」的经纬弧线</text>

        <circle cx="977" cy="720" r="82"/>
        <circle cx="1015" cy="748" r="4.5" fill="#10b981" fill-opacity="0.7"/>
        <text x="977" y="832" font-size="11" fill="#059669" fill-opacity="0.7" stroke="none" text-anchor="middle">画出让交点朝「右下方」的经纬弧线</text>
      </g>
      `
    )
  },
  {
    id: 'tpl-core-perspective',
    name: '一点与两点透视灭点射线空间网格',
    track: 'core',
    lessonId: 'core-5',
    description: '标准视平线、一点透视中心射线与两点透视左右灭点交叉射线，练习高低方体放置。',
    svgContent: wrapTemplateSVG(
      'CORE-5 · 一点透视 & 两点透视空间射线网格',
      '口诀：高于视平线露底面 · 低于视平线露顶面 · 竖直棱始终保持 90° 垂直',
      `
      <rect x="48" y="92" width="1104" height="360" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.25"/>
      <text x="64" y="118" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 1 · 一点透视（纵深边全部收向中心灭点 VP）</text>
      <line x1="60" y1="255" x2="1140" y2="255" stroke="#6366f1" stroke-opacity="0.58" stroke-width="1.6"/>
      <text x="70" y="248" font-size="11" fill="#4f46e5" fill-opacity="0.75">视平线 HL</text>
      <circle cx="600" cy="255" r="6" fill="#6366f1" fill-opacity="0.75"/>
      <text x="600" y="242" font-size="11" font-weight="700" fill="#4f46e5" fill-opacity="0.78" text-anchor="middle">中心灭点 VP</text>
      <g stroke="#38bdf8" stroke-opacity="0.25" stroke-width="1.2">
        <line x1="600" y1="255" x2="80" y2="110"/><line x1="600" y1="255" x2="320" y2="100"/>
        <line x1="600" y1="255" x2="880" y2="100"/><line x1="600" y1="255" x2="1120" y2="110"/>
        <line x1="600" y1="255" x2="80" y2="435"/><line x1="600" y1="255" x2="340" y2="435"/>
        <line x1="600" y1="255" x2="860" y2="435"/><line x1="600" y1="255" x2="1120" y2="435"/>
      </g>
      <g stroke="#0ea5e9" stroke-opacity="0.58" stroke-width="1.8" fill="none">
        <rect x="140" y="135" width="120" height="82"/>
        <rect x="890" y="210" width="140" height="96"/>
        <rect x="290" y="305" width="135" height="95"/>
      </g>
      <text x="200" y="128" font-size="11" fill="#0284c7" fill-opacity="0.68" text-anchor="middle">高于视平线：露底面</text>
      <text x="960" y="202" font-size="11" fill="#0284c7" fill-opacity="0.68" text-anchor="middle">跨视平线：顶底均不可见</text>
      <text x="358" y="418" font-size="11" fill="#0284c7" fill-opacity="0.68" text-anchor="middle">低于视平线：露顶面</text>

      <rect x="48" y="476" width="1104" height="380" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.25"/>
      <text x="64" y="504" font-size="13" font-weight="700" fill="#4f46e5" fill-opacity="0.78">区 2 · 两点透视（左右横边分别飞向 VP1 与 VP2）</text>
      <line x1="60" y1="650" x2="1140" y2="650" stroke="#6366f1" stroke-opacity="0.58" stroke-width="1.6"/>
      <circle cx="95" cy="650" r="6" fill="#6366f1" fill-opacity="0.75"/><text x="95" y="638" font-size="11" font-weight="700" fill="#4f46e5" fill-opacity="0.78" text-anchor="middle">左灭点 VP1</text>
      <circle cx="1105" cy="650" r="6" fill="#6366f1" fill-opacity="0.75"/><text x="1105" y="638" font-size="11" font-weight="700" fill="#4f46e5" fill-opacity="0.78" text-anchor="middle">右灭点 VP2</text>
      <g stroke="#38bdf8" stroke-opacity="0.24" stroke-width="1.2">
        <line x1="95" y1="650" x2="960" y2="495"/><line x1="95" y1="650" x2="960" y2="575"/>
        <line x1="95" y1="650" x2="960" y2="735"/><line x1="95" y1="650" x2="960" y2="835"/>
        <line x1="1105" y1="650" x2="240" y2="495"/><line x1="1105" y1="650" x2="240" y2="575"/>
        <line x1="1105" y1="650" x2="240" y2="735"/><line x1="1105" y1="650" x2="240" y2="835"/>
      </g>
      <line x1="340" y1="515" x2="340" y2="595" stroke="#0ea5e9" stroke-opacity="0.7" stroke-width="2.4"/>
      <line x1="600" y1="580" x2="600" y2="725" stroke="#0ea5e9" stroke-opacity="0.7" stroke-width="2.4"/>
      <line x1="835" y1="710" x2="835" y2="815" stroke="#0ea5e9" stroke-opacity="0.7" stroke-width="2.4"/>
      <text x="340" y="612" font-size="11" fill="#0284c7" fill-opacity="0.7" text-anchor="middle">竖棱 1（仰视方体）</text>
      <text x="600" y="742" font-size="11" fill="#0284c7" fill-opacity="0.7" text-anchor="middle">竖棱 2（平视方体）</text>
      <text x="835" y="832" font-size="11" fill="#0284c7" fill-opacity="0.7" text-anchor="middle">竖棱 3（俯视方体）</text>
      `
    )
  },
  {
    id: 'tpl-core-intersections',
    name: '体块穿插、切割减形与叠压线层次底图',
    track: 'core',
    lessonId: 'core-6',
    description: '训练方体与圆柱互插的表面交界线、方体切角减形以及 T 字叠压轮廓 Hierarchy。',
    svgContent: wrapTemplateSVG(
      'CORE-6 · 体块穿插、切割与前后叠压底图',
      '口诀：交界线必须顺着「被穿插表面」的透视方向贴着走 · 前实后轻拉开层次',
      `
      <rect x="48" y="92" width="350" height="764" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.25" stroke-dasharray="6 6"/>
      <text x="66" y="118" font-size="13" font-weight="700" fill="#4f46e5" fill-opacity="0.78">一 · 圆柱插入方体表面交线</text>
      <g stroke="#38bdf8" stroke-opacity="0.48" stroke-width="1.6" fill="none">
        <polygon points="105,235 225,180 345,235 225,290"/>
        <polygon points="105,235 225,290 225,435 105,380"/>
        <polygon points="225,290 345,235 345,380 225,435"/>
        <!-- Piercing cylinder penetrating top face -->
        <ellipse cx="225" cy="235" rx="44" ry="20" stroke="#6366f1" stroke-width="2"/>
        <path d="M181 235 L181 142 A44 20 0 0 1 269 142 L269 235" stroke="#6366f1"/>
        <ellipse cx="225" cy="142" rx="44" ry="20" stroke="#6366f1"/>
        <text x="225" y="468" font-size="11" fill="#4f46e5" fill-opacity="0.72" stroke="none" text-anchor="middle">示例：接口椭圆紧贴方体顶面透视</text>

        <!-- Practice empty box + side cylinder axis -->
        <polygon points="115,610 225,560 335,610 225,660"/>
        <polygon points="115,610 225,660 225,795 115,745"/>
        <polygon points="225,660 335,610 335,745 225,795"/>
        <line x1="280" y1="680" x2="380" y2="635" stroke="#10b981" stroke-dasharray="5 4"/>
        <text x="225" y="828" font-size="11" fill="#0284c7" fill-opacity="0.72" stroke="none" text-anchor="middle">▲ 从右斜面斜插进一根圆柱并画好接缝</text>
      </g>

      <rect x="425" y="92" width="350" height="764" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.25" stroke-dasharray="6 6"/>
      <text x="443" y="118" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.78">二 · 方体切斜角（减法造型）</text>
      <g stroke="#38bdf8" stroke-opacity="0.45" stroke-width="1.6" fill="none">
        <polygon points="485,220 600,170 715,220 600,270" stroke-dasharray="4 4"/>
        <polygon points="485,220 600,270 600,410 485,360"/>
        <polygon points="600,270 715,220 715,360 600,410"/>
        <!-- Chamfer slice lines -->
        <polygon points="528,202 600,234 655,210 600,270" stroke="#6366f1" stroke-width="2" stroke-dasharray="5 3"/>
        <text x="600" y="468" font-size="11" fill="#0284c7" fill-opacity="0.72" stroke="none" text-anchor="middle">先切出斜坡截平面，再擦去切掉的角</text>

        <polygon points="485,600 600,550 715,600 600,650"/>
        <polygon points="485,600 600,650 600,790 485,740"/>
        <polygon points="600,650 715,600 715,740 600,790"/>
        <text x="600" y="828" font-size="11" fill="#0284c7" fill-opacity="0.72" stroke="none" text-anchor="middle">▲ 把这个方体挖出一个 L 型阶梯凹槽</text>
      </g>

      <rect x="802" y="92" width="350" height="764" rx="12" fill="none" stroke="#10b981" stroke-opacity="0.25" stroke-dasharray="6 6"/>
      <text x="820" y="118" font-size="13" font-weight="700" fill="#059669" fill-opacity="0.78">三 · T 字叠压与线稿前后粗细</text>
      <g stroke="#38bdf8" stroke-opacity="0.48" stroke-width="1.6" fill="none">
        <!-- Overlapping foreground cylinder & background box -->
        <circle cx="945" cy="285" r="78" stroke-dasharray="5 5"/>
        <rect x="935" y="210" width="150" height="170" rx="8" stroke-dasharray="5 5"/>
        <text x="977" y="438" font-size="11" fill="#059669" fill-opacity="0.75" stroke="none" text-anchor="middle">用粗线加实前景球体，细线虚化后方盒</text>

        <!-- Practice cluster -->
        <ellipse cx="920" cy="645" rx="60" ry="95" stroke-dasharray="5 5"/>
        <polygon points="945,565 1085,540 1095,715 955,740" stroke-dasharray="5 5"/>
        <circle cx="1015" cy="725" r="55" stroke-dasharray="5 5"/>
      </g>
      <text x="977" y="828" font-size="11" fill="#059669" fill-opacity="0.72" text-anchor="middle">▲ 自定「前→中→后」叠压顺序并勾出 T 字接口</text>
      `
    )
  },
  {
    id: 'tpl-core-lighting',
    name: '素描二分与明暗交界线实战底图',
    track: 'core',
    lessonId: 'core-7',
    description: '45° 斜射主光下的球体、方体与圆柱体二分阴影引导底图，配底部逆向光源练习区。',
    svgContent: wrapTemplateSVG(
      'CORE-7 · 素描二分与明暗交界线实战底图',
      '口诀：先用马克笔一次性铺平暗面和投影 · 交界线压在光切边 · 反光暗于亮面',
      `
      <path d="M72 104 L132 152" stroke="#f59e0b" stroke-opacity="0.78" stroke-width="2.5" marker-end="url(#tpl-arrow-amber)"/>
      <text x="145" y="130" font-size="13" font-weight="700" fill="#d97706" fill-opacity="0.82">主光源 45° 左上方斜射</text>

      <g stroke="#38bdf8" stroke-opacity="0.5" stroke-width="1.8" fill="none">
        <ellipse cx="290" cy="495" rx="155" ry="44" stroke-dasharray="5 4" stroke="#6366f1" stroke-opacity="0.38"/>
        <circle cx="235" cy="365" r="135"/>
        <path d="M150 262 Q295 325 322 465" stroke="#6366f1" stroke-opacity="0.65" stroke-dasharray="6 4"/>
      </g>
      <g font-size="11.5" fill="#475569" fill-opacity="0.78">
        <text x="175" y="310">① 受光亮面</text>
        <text x="278" y="368" fill="#4f46e5" font-weight="700">② 明暗交界线</text>
        <text x="275" y="445">③ 地面反光</text>
        <text x="368" y="510">④ 地面投影</text>
      </g>

      <g stroke="#38bdf8" stroke-opacity="0.52" stroke-width="1.8" fill="none">
        <polygon points="520,270 620,220 720,270 620,320"/>
        <polygon points="520,270 620,320 620,460 520,410"/>
        <polygon points="620,320 720,270 720,410 620,460"/>
        <polygon points="620,460 720,410 835,455 730,515" stroke="#6366f1" stroke-opacity="0.45" stroke-dasharray="5 4"/>
      </g>
      <g font-size="11.5" fill="#475569" fill-opacity="0.78" text-anchor="middle">
        <text x="620" y="275">顶面 · 亮</text><text x="570" y="370">左面 · 灰</text><text x="670" y="370" fill="#4f46e5" font-weight="700">右面 · 暗</text>
      </g>

      <g stroke="#38bdf8" stroke-opacity="0.52" stroke-width="1.8" fill="none">
        <ellipse cx="970" cy="240" rx="85" ry="28"/>
        <path d="M885 240 L885 450 A85 28 0 0 0 1055 450 L1055 240"/>
        <line x1="1008" y1="265" x2="1008" y2="474" stroke="#6366f1" stroke-opacity="0.65" stroke-dasharray="6 4"/>
        <path d="M1055 450 L1142 485 L1035 512 L970 478" stroke="#6366f1" stroke-opacity="0.42" stroke-dasharray="5 4"/>
      </g>
      <text x="1008" y="510" font-size="11.5" fill="#4f46e5" fill-opacity="0.78" text-anchor="middle">圆柱交界线在光切位置而非最右侧边！</text>

      <rect x="48" y="556" width="1104" height="300" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.25" stroke-dasharray="6 6"/>
      <text x="66" y="584" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.78">实战区 · 换成「右上方主光」，自主切出以下三体块的二分阴影与投影</text>
      <path d="M1125 588 L1065 636" stroke="#f59e0b" stroke-opacity="0.78" stroke-width="2.5" marker-end="url(#tpl-arrow-amber)"/>
      <circle cx="240" cy="725" r="88" stroke="#38bdf8" stroke-opacity="0.42" stroke-width="1.6" fill="none"/>
      <g stroke="#38bdf8" stroke-opacity="0.42" stroke-width="1.6" fill="none">
        <polygon points="520,660 610,618 700,660 610,702"/>
        <polygon points="520,660 610,702 610,810 520,768"/>
        <polygon points="610,702 700,660 700,768 610,810"/>
      </g>
      <g stroke="#38bdf8" stroke-opacity="0.42" stroke-width="1.6" fill="none">
        <ellipse cx="945" cy="650" rx="68" ry="22"/>
        <path d="M877 650 L877 805 A68 22 0 0 0 1013 805 L1013 650"/>
      </g>
      `
    )
  },
  {
    id: 'tpl-core-color',
    name: '固有色、光源色与环境色冷暖练习底图',
    track: 'core',
    lessonId: 'core-8',
    description: '冷暖互补色光影训练底图：展示暖日光+冷天光逻辑与红/绿/白三色体块环境反光测试框。',
    svgContent: wrapTemplateSVG(
      'CORE-8 · 固有色、光源色与环境色冷暖练习底图',
      '口诀：亮面吃光源色（如暖黄阳光），暗面吃环境天光（冷蓝紫）· 严禁直接往暗部加纯黑',
      `
      <rect x="48" y="92" width="1104" height="230" rx="12" fill="none" stroke="#f59e0b" stroke-opacity="0.28"/>
      <text x="66" y="120" font-size="13" font-weight="700" fill="#d97706" fill-opacity="0.82">光色公式：受光亮面 = 固有色 × 暖光源色 ｜ 背光暗面 = 固有色 × 冷环境色 ｜ 底部反光 = 地面反弹色</text>
      <g transform="translate(80, 155)" font-size="12" fill="#475569" fill-opacity="0.8">
        <rect x="0" y="0" width="180" height="120" rx="10" fill="#fef3c7" fill-opacity="0.55" stroke="#f59e0b" stroke-opacity="0.5"/>
        <text x="90" y="55" text-anchor="middle" font-weight="700" fill="#b45309">1. 暖阳照射区</text>
        <text x="90" y="80" text-anchor="middle">色相微偏黄/红，高光偏暖</text>
        <text x="235" y="65" font-size="22" font-weight="700" fill="#64748b">+</text>
        <rect x="290" y="0" width="210" height="120" rx="10" fill="#e0e7ff" fill-opacity="0.6" stroke="#6366f1" stroke-opacity="0.5"/>
        <text x="395" y="55" text-anchor="middle" font-weight="700" fill="#4338ca">2. 背光冷阴影区</text>
        <text x="395" y="80" text-anchor="middle">受蓝天漫反射影响偏蓝/紫</text>
        <text x="555" y="65" font-size="22" font-weight="700" fill="#64748b">+</text>
        <rect x="610" y="0" width="230" height="120" rx="10" fill="#d1fae5" fill-opacity="0.55" stroke="#10b981" stroke-opacity="0.5"/>
        <text x="725" y="55" text-anchor="middle" font-weight="700" fill="#047857">3. 桌面/草地反光边缘</text>
        <text x="725" y="80" text-anchor="middle">在暗部最底缘轻扫一笔桌面色</text>
      </g>

      <rect x="48" y="346" width="536" height="510" rx="12" fill="none" stroke="#38bdf8" stroke-opacity="0.25"/>
      <text x="66" y="374" font-size="13" font-weight="700" fill="#0284c7" fill-opacity="0.78">练手 A · 蓝色桌面的白石膏球（暖阳亮面 + 蓝紫暗部 + 青蓝底反光）</text>
      <path d="M84 405 L140 448" stroke="#f59e0b" stroke-opacity="0.78" stroke-width="2.5" marker-end="url(#tpl-arrow-amber)"/>
      <circle cx="316" cy="595" r="142" stroke="#38bdf8" stroke-opacity="0.55" stroke-width="2" fill="none"/>
      <path d="M225 486 Q372 552 406 698" stroke="#6366f1" stroke-opacity="0.55" stroke-dasharray="5 4" fill="none"/>
      <ellipse cx="385" cy="745" rx="155" ry="42" stroke="#6366f1" stroke-opacity="0.4" stroke-dasharray="5 4" fill="none"/>
      <text x="316" y="828" font-size="11.5" fill="#475569" fill-opacity="0.75" text-anchor="middle">使用马克笔：先铺淡黄白底色 → 再叠加半透明冷紫暗部 → 底部轻扫天蓝反光</text>

      <rect x="616" y="346" width="536" height="510" rx="12" fill="none" stroke="#10b981" stroke-opacity="0.25"/>
      <text x="634" y="374" font-size="13" font-weight="700" fill="#059669" fill-opacity="0.78">练手 B · 暖红木桌上的苹果色球与方盒（固有色偏红橙）</text>
      <path d="M652 405 L708 448" stroke="#f59e0b" stroke-opacity="0.78" stroke-width="2.5" marker-end="url(#tpl-arrow-amber)"/>
      <circle cx="805" cy="595" r="102" stroke="#38bdf8" stroke-opacity="0.52" stroke-width="2" fill="none"/>
      <g stroke="#38bdf8" stroke-opacity="0.52" stroke-width="1.8" fill="none">
        <polygon points="945,540 1030,498 1115,540 1030,582"/>
        <polygon points="945,540 1030,582 1030,710 945,668"/>
        <polygon points="1030,582 1115,540 1115,668 1030,710"/>
      </g>
      <text x="884" y="828" font-size="11.5" fill="#059669" fill-opacity="0.75" text-anchor="middle">红球阴影记得往「冷紫红」偏，绿盒阴影往「冷青蓝」偏！</text>
      `
    )
  }
];

export const CORE_LESSONS = [
  {
    id: 'core-1',
    track: 'core',
    tier: 'beginner',
    order: 1,
    title: '握笔姿势与定点长直线',
    mantra: '眼盯终点、手肘带动笔尖，一笔拉通不蹭短毛线。',
    subtitle: '用鬼影预演法告别抖线与毛刺蹭线',
    difficulty: '入门 ⭐',
    estimatedMinutes: 15,
    templateId: 'tpl-core-lines',
    cheatSheetSVG: wrapCheatSheetSVG(
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
    ),
    keyPoints: [
      { title: '手肘发力画长线', detail: '长直线固定手腕，用整个前臂带动笔尖移动。' },
      { title: '落笔前先空划预演', detail: '笔尖悬空往返划两遍找路线，再果断一笔拉过。' },
      { title: '错线宁重画不修补', detail: '画偏直接撤销重来，绝不用碎短线反复摩擦掩盖。' }
    ],
    pitfalls: [
      { wrong: '只靠手指和手腕捏笔，线条超过3厘米就弯曲', fix: '放平小臂，锁定手腕关节靠肩肘平移带笔' },
      { wrong: '眼睛死盯笔尖，拉到终点时线条越走越歪', fix: '下笔瞬间把视线提前锁定在目标终点上' }
    ],
    checklist: [
      '完成底图所有定点连线，每条只拉1笔',
      '平行线组间距均匀，没有毛刺接缝',
      '尝试开启防抖3~5对比手感差异'
    ],
    videos: [
      {
        id: 'vid-core1-bili',
        title: '零基础控笔直线入门（鬼影连线与告别蹭线）',
        author: 'B站基础造型训练营',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E9%9B%B6%E5%9F%BA%E7%A1%80+%E6%8E%A7%E7%AC%94%E7%9B%B4%E7%BA%BF+%E5%91%8A%E5%88%AB%E8%B9%AD%E7%BA%BF',
        keywords: '零基础 控笔直线 告别蹭线',
        duration: '约12分钟',
        timestamps: [
          { time: '00:00', label: '手腕发力 vs 手肘发力的核心区别' },
          { time: '05:20', label: '定点连线与平行线每天 10 分钟热身操' }
        ],
        summary: '拆解握笔姿势与手肘发力规律，快速消除线条毛躁感。'
      },
      {
        id: 'vid-core1-yt',
        title: 'Drawabox Lesson 1: Superimposing & Ghosting Lines',
        author: 'Drawabox / Uncomfortable',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Drawabox+Lesson+1+Ghosting+Lines',
        keywords: 'Drawabox Lesson 1 Ghosting Lines',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: 'Why confidence beats accuracy' },
          { time: '06:30', label: 'Ghosting Method 三步演示' }
        ],
        summary: '经典的鬼影连线教学，帮初学者建立果断下笔习惯。'
      }
    ]
  },
  {
    id: 'core-2',
    track: 'core',
    tier: 'beginner',
    order: 2,
    title: '压感控制与 C/S 流畅弧线',
    mantra: '轻起、重压、轻收尾，弧线像丝带一样有呼吸感。',
    subtitle: '掌握轻重轻渐变线与富有韵律的 C/S 曲线',
    difficulty: '入门 ⭐',
    estimatedMinutes: 15,
    templateId: 'tpl-core-curves',
    cheatSheetSVG: wrapCheatSheetSVG(
      '翻车：等粗铁丝 & 折角弯线',
      '正确：轻重轻渐变 & 流畅 S 韵律',
      `
      <text x="10" y="22" font-size="12" font-weight="700" fill="#dc2626">死按到底像铁丝，S形中间折出顿角</text>
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
    ),
    keyPoints: [
      { title: '轻重轻两端尖压感', detail: '空中顺势落笔轻入，中段加压变实，抬笔收尖。' },
      { title: '顺手角度旋转发力', detail: '画出最顺滑的弧线只需找准手肘天然摆动方向。' },
      { title: 'S 线靠拐点平稳衔接', detail: '在 S 曲线正中拐点平稳换向，避免中间折出尖角。' }
    ],
    pitfalls: [
      { wrong: '起笔和收笔死按到底，线条两端钝得像铁丝', fix: '练习空中入笔与空中抬笔，给线条留出尖尾' },
      { wrong: '画大弯弧时中途停顿调整，弧线变成多边形折线', fix: '一次呼气顺势扫过全弧，速度越稳弧度越圆' }
    ],
    checklist: [
      '画出6条两端尖细、中段饱满的渐变线',
      '沿底图虚线一笔顺畅描完所有C型弧',
      'S曲线拐点过渡自然无明显僵硬顿点'
    ],
    videos: [
      {
        id: 'vid-core2-bili',
        title: '板绘压感与线稿轻重韵律（C/S 弧线丝滑画法）',
        author: 'B站板绘线稿质感教程',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E6%9D%BF%E7%BB%98%E5%8E%8B%E6%84%9F+%E7%BA%BF%E7%A8%BF%E8%BD%BB%E9%87%8D+S%E5%9E%8B%E6%9B%B2%E7%BA%BF',
        keywords: '板绘压感 线稿轻重 S型曲线',
        duration: '约14分钟',
        timestamps: [
          { time: '00:00', label: '软硬压感曲线调节指南' },
          { time: '06:10', label: '空中落笔与收尖呼吸感训练' }
        ],
        summary: '详解数位板与压感笔的渐变线条控制技巧。'
      },
      {
        id: 'vid-core2-yt',
        title: 'Line Weight & Smooth C/S Curves Practice',
        author: 'Marc Brunet / YT Lineart',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=line+weight+smooth+curves+digital+art+practice',
        keywords: 'line weight smooth curves digital art practice',
        duration: '约12分钟',
        timestamps: [
          { time: '00:00', label: 'Tapering strokes cleanly' },
          { time: '05:40', label: 'Using natural wrist/elbow arc' }
        ],
        summary: '示范如何利用身体自然摆动弧度一次画出高级流畅曲线。'
      }
    ]
  },
  {
    id: 'core-3',
    track: 'core',
    tier: 'beginner',
    order: 3,
    title: '透视椭圆与一笔封口圆',
    mantra: '椭圆长短轴永远垂直90°，两端圆润绝不捏出尖角。',
    subtitle: '练稳正圆封口，读懂圆面倾角带来的椭圆扁度',
    difficulty: '入门 ⭐',
    estimatedMinutes: 20,
    templateId: 'tpl-core-circles',
    cheatSheetSVG: wrapCheatSheetSVG(
      '翻车：尖角橄榄球 & 断口圆',
      '正确：长短轴 90° 垂直封口',
      `
      <path d="M45 110 Q175 45 305 110 Q175 175 45 110 Z" fill="#fee2e2" fill-opacity="0.55" stroke="#ef4444" stroke-width="2.4"/>
      <circle cx="45" cy="110" r="4.5" fill="#dc2626"/><circle cx="305" cy="110" r="4.5" fill="#dc2626"/>
      <text x="175" y="198" font-size="11.5" fill="#b91c1c" text-anchor="middle">两端捏出尖角折痕，上下弧线像两片弯括号</text>
      `,
      `
      <ellipse cx="175" cy="110" rx="122" ry="48" fill="#dcfce7" fill-opacity="0.45" stroke="#16a34a" stroke-width="2.4"/>
      <line x1="40" y1="110" x2="310" y2="110" stroke="#4f46e5" stroke-width="1.4" stroke-dasharray="4 3"/>
      <line x1="175" y1="50" x2="175" y2="170" stroke="#4f46e5" stroke-width="1.4" stroke-dasharray="4 3"/>
      <rect x="175" y="102" width="8" height="8" fill="none" stroke="#4f46e5" stroke-width="1.2"/>
      <text x="175" y="198" font-size="11.5" fill="#15803d" text-anchor="middle">长短轴严格垂直 90°，两端饱满圆润平滑封口</text>
      `
    ),
    keyPoints: [
      { title: '空转两圈再落笔封口', detail: '悬空画圆找准轨道，顺势落笔绕一圈半平滑收起。' },
      { title: '长短轴严格十字正交', detail: '不管椭圆如何斜放，长轴与短轴必须成 90° 垂直。' },
      { title: '扁度反映观察倾角', detail: '越正对镜头越接近正圆，越斜切视角椭圆越窄扁。' }
    ],
    pitfalls: [
      { wrong: '椭圆两端捏成尖角，看起来像一颗橄榄球', fix: '把椭圆放进矩形框里，确认两端切圆弧饱满' },
      { wrong: '正圆接口处总是差一大截或拐出多余弯钩', fix: '落笔点与收笔点略微重叠半厘米后再顺势抬笔' }
    ],
    checklist: [
      '左区一笔画完6个正圆，封口平滑不突兀',
      '中区画出15°到75°渐进椭圆且长短轴垂直',
      '右区利用对角线中心把椭圆贴切进透视面'
    ],
    videos: [
      {
        id: 'vid-core3-bili',
        title: '一笔画圆不翻车！透视椭圆与长短轴原理精讲',
        author: 'B站几何造型基本功合集',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E4%B8%80%E7%AC%94%E7%94%BB%E5%9C%86+%E9%80%8F%E8%A7%86%E6%A4%AD%E5%9C%86+%E9%95%BF%E7%9F%AD%E8%BD%B4',
        keywords: '一笔画圆 透视椭圆 长短轴',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: '如何空转两圈平滑闭合正圆' },
          { time: '07:20', label: '圆柱和车轮为什么需要垂直长短轴' }
        ],
        summary: '透彻解释椭圆角度在圆柱体和人偶关节里的关键作用。'
      },
      {
        id: 'vid-core3-yt',
        title: 'Drawabox Lesson 1: Ellipses in Planes & Funnels',
        author: 'Drawabox',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Drawabox+Ellipses+in+Planes+Minor+Axis',
        keywords: 'Drawabox Ellipses in Planes Minor Axis',
        duration: '约16分钟',
        timestamps: [
          { time: '00:00', label: 'Minor Axis 短轴对准中心轴法则' },
          { time: '08:15', label: 'Avoiding pointed football shapes' }
        ],
        summary: '国际公认的椭圆与透视平面切圆专项强化教学。'
      }
    ]
  },
  {
    id: 'core-4',
    track: 'core',
    tier: 'foundation',
    order: 4,
    title: '2D转3D：方体圆柱与球体',
    mantra: 'Y字立出三面转折，C字绕线给二维图形充气变立体。',
    subtitle: '打破纸片贴图感，建立三大基础几何体空间直觉',
    difficulty: '基础 ⭐⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-core-forms',
    cheatSheetSVG: wrapCheatSheetSVG(
      '翻车：扁平纸片 & 平直腰带',
      '正确：Y 字盒子 & C 型曲面绕线',
      `
      <rect x="28" y="25" width="75" height="75" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
      <rect x="52" y="45" width="75" height="75" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="3 3"/>
      <rect x="215" y="22" width="75" height="145" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
      <line x1="215" y1="74" x2="290" y2="74" stroke="#dc2626" stroke-width="2.4"/>
      <line x1="215" y1="118" x2="290" y2="118" stroke="#dc2626" stroke-width="2.4"/>
      <text x="175" y="218" font-size="11.5" fill="#b91c1c" text-anchor="middle">横线拉直 = 告诉大脑这是平面纸片</text>
      `,
      `
      <g transform="translate(22, 16)" stroke="#16a34a" stroke-width="2" fill="#dcfce7" fill-opacity="0.45">
        <polygon points="15,35 65,12 115,35 65,60"/>
        <polygon points="15,35 65,60 65,125 15,98"/>
        <polygon points="65,60 115,35 115,98 65,125"/>
        <path d="M65 60 L65 125 M65 60 L15 35 M65 60 L115 35" stroke="#4f46e5" stroke-width="2.6"/>
      </g>
      <g transform="translate(205, 18)" stroke="#16a34a" stroke-width="2" fill="#dcfce7" fill-opacity="0.45">
        <ellipse cx="55" cy="20" rx="42" ry="15"/>
        <path d="M13 20 L13 135 A42 15 0 0 0 97 135 L97 20"/>
        <path d="M13 78 A42 15 0 0 0 97 78" stroke="#4f46e5" stroke-width="2.4" fill="none"/>
        <path d="M13 110 A42 15 0 0 0 97 110" stroke="#4f46e5" stroke-width="2.4" fill="none"/>
      </g>
      <text x="175" y="218" font-size="11.5" fill="#15803d" text-anchor="middle">Y字立面 + C型曲面绕线 = 立刻拥有体积</text>
      `
    ),
    keyPoints: [
      { title: '方体 Y 字三棱起手', detail: '先画三根夹角大于90°的 Y 字棱，再拉出平行对边。' },
      { title: '画出背面透明辅助线', detail: '用浅色线透视出背面3条棱，一眼查出方体扭曲。' },
      { title: 'C 字绕线表达球柱弧', detail: '横线拉直就变扁，顺着柱身球面弯成弧线立刻立体。' }
    ],
    pitfalls: [
      { wrong: '画圆柱只在柱身画几条直横线，圆柱秒变平纸筒', fix: '所有环绕线必须比照底面椭圆画出一致的弧度' },
      { wrong: '方体背离镜头的边反而画得更长，像炸开一样', fix: '牢记远端对边向空间后方微微靠拢收缩' }
    ],
    checklist: [
      '用Y字和倒Y字画出仰俯视多角度透明方体',
      '沿倾斜中轴线画出前后扁度不同的圆柱体',
      '用经纬绕线让球体定位点准确朝向不同方向'
    ],
    videos: [
      {
        id: 'vid-core4-bili',
        title: '几何体概括与空间体积感（方体、圆柱与球体旋转）',
        author: 'B站基础造型训练营',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E7%BB%98%E7%94%BB%E5%9F%BA%E7%A1%80+%E4%BD%93%E5%9D%97%E6%84%9F+%E6%96%B9%E4%BD%93%E5%9C%86%E6%9F%B1%E7%90%83%E4%BD%93',
        keywords: '绘画基础 体块感 方体圆柱球体',
        duration: '约18分钟',
        timestamps: [
          { time: '00:00', label: 'Y字起手式画不歪方体的法则' },
          { time: '10:30', label: '用绕线 Contour Line 赋予三维体积' }
        ],
        summary: '打通从平面剪影到三维空间搭积木的核心思维转换。'
      },
      {
        id: 'vid-core4-yt',
        title: 'Proko Structure Basics: Boxes, Cylinders & Spheres',
        author: 'Proko',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Proko+structure+basics+boxes+cylinders+spheres',
        keywords: 'Proko structure basics boxes cylinders spheres',
        duration: '约14分钟',
        timestamps: [
          { time: '00:00', label: '盒子如何决定人体头胸胯朝向' },
          { time: '06:40', label: '圆柱横截面与四肢立体感' }
        ],
        summary: '结合人体示范讲解为什么画对三个几何体就画对一半人体。'
      }
    ]
  },
  {
    id: 'core-5',
    track: 'core',
    tier: 'foundation',
    order: 5,
    title: '一点与两点透视空间网格',
    mantra: '视平线即眼睛高度，所有平行纵深线严丝合缝交于灭点。',
    subtitle: '彻底搞懂近大远小，告别建筑与物体飞边透视崩坏',
    difficulty: '基础 ⭐⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-core-perspective',
    cheatSheetSVG: wrapCheatSheetSVG(
      '翻车：反透视远端变大',
      '正确：纵深边严密聚向灭点 VP',
      `
      <line x1="10" y1="45" x2="342" y2="45" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="4 4"/>
      <polygon points="65,98 165,98 165,178 65,178" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
      <polygon points="105,60 250,60 250,136 105,136" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="4 4"/>
      <line x1="65" y1="98" x2="105" y2="60" stroke="#dc2626" stroke-width="2"/>
      <line x1="165" y1="98" x2="250" y2="60" stroke="#dc2626" stroke-width="2"/>
      <line x1="165" y1="178" x2="250" y2="136" stroke="#dc2626" stroke-width="2"/>
      <text x="175" y="218" font-size="11.5" fill="#b91c1c" text-anchor="middle">后方线条向外散开，盒子看起来像爆炸变形</text>
      `,
      `
      <line x1="10" y1="45" x2="342" y2="45" stroke="#4f46e5" stroke-width="1.6"/>
      <circle cx="290" cy="45" r="5" fill="#4f46e5"/>
      <text x="290" y="34" font-size="11" font-weight="700" fill="#4f46e5" text-anchor="middle">VP</text>
      <line x1="65" y1="102" x2="290" y2="45" stroke="#16a34a" stroke-opacity="0.4" stroke-dasharray="4 3"/>
      <line x1="165" y1="102" x2="290" y2="45" stroke="#16a34a" stroke-opacity="0.4" stroke-dasharray="4 3"/>
      <line x1="165" y1="182" x2="290" y2="45" stroke="#16a34a" stroke-opacity="0.4" stroke-dasharray="4 3"/>
      <polygon points="65,102 165,102 165,182 65,182" fill="#dcfce7" fill-opacity="0.55" stroke="#16a34a" stroke-width="2"/>
      <polygon points="122,88 200,88 200,148 122,148" fill="none" stroke="#16a34a" stroke-width="1.8"/>
      <line x1="65" y1="102" x2="122" y2="88" stroke="#16a34a" stroke-width="2"/>
      <line x1="165" y1="102" x2="200" y2="88" stroke="#16a34a" stroke-width="2"/>
      <line x1="165" y1="182" x2="200" y2="148" stroke="#16a34a" stroke-width="2"/>
      <text x="175" y="218" font-size="11.5" fill="#15803d" text-anchor="middle">纵深边精准交汇到同一个 VP，越近越宽大</text>
      `
    ),
    keyPoints: [
      { title: '视平线决定看到哪一面', detail: '物体高于视平线露底面，低于视平线露顶面。' },
      { title: '一点正对、两点看转角', detail: '面朝正前方用1点透视；斜角对镜头用左右2个灭点。' },
      { title: '借助画板透视网格校正', detail: '开启网格下拉菜单的「透视射线」随时对齐灭点。' }
    ],
    pitfalls: [
      { wrong: '两点透视两个灭点离太近，方体畸变成尖锐三角', fix: '把左右灭点尽量拉到画面边缘或画布之外' },
      { wrong: '平视时竖直线条东倒西歪，盒子像要倾倒', fix: '一点和两点透视中，所有竖直棱必须垂直于视平线' }
    ],
    checklist: [
      '完成一点透视上、中、下三个位置盒子的拉线',
      '完成两点透视左右VP连接，竖棱保持90°垂直',
      '在空白处自主画出一组高低错落的叠加透视盒'
    ],
    videos: [
      {
        id: 'vid-core5-bili',
        title: 'Krenz / 零基础必看透视入门（一点与两点透视转换）',
        author: 'B站透视科普精选',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=Krenz+%E9%80%8F%E8%A7%86%E5%85%A5%E9%97%A8+%E8%A7%86%E5%B9%B3%E7%BA%BF+%E4%B8%A4%E7%82%B9%E9%80%8F%E8%A7%86',
        keywords: 'Krenz 透视入门 视平线 两点透视',
        duration: '约20分钟',
        timestamps: [
          { time: '00:00', label: '视平线与镜头高低视角的关系' },
          { time: '09:40', label: '一点与两点透视方体旋转演练' }
        ],
        summary: '用生动日常案例带你直接把透视盒子套进人物与场景中。'
      },
      {
        id: 'vid-core5-yt',
        title: 'Perspective Made Easy: 1 & 2 Point Boxes',
        author: 'Marc Brunet',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Marc+Brunet+perspective+tutorial+for+beginners',
        keywords: 'Marc Brunet perspective tutorial for beginners',
        duration: '约16分钟',
        timestamps: [
          { time: '00:00', label: 'Horizon line placement basics' },
          { time: '08:20', label: 'Avoiding lens distortion traps' }
        ],
        summary: '前暴雪画师演示如何把透视盒子快速应用到构图与角色。'
      }
    ]
  },
  {
    id: 'core-6',
    track: 'core',
    tier: 'foundation',
    order: 6,
    title: '体块穿插、切割与叠压关系',
    mantra: '交界缝线沿曲面转折，近实远虚的叠压线拉开空间前后。',
    subtitle: '把多个体块像积木一样稳稳插接成整体',
    difficulty: '基础 ⭐⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-core-intersections',
    cheatSheetSVG: wrapCheatSheetSVG(
      '翻车：扁平直缝 & 前后无主次',
      '正确：贴面曲线接缝 & T字叠压线',
      `
      <rect x="45" y="45" width="120" height="120" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
      <circle cx="165" cy="105" r="52" fill="#fee2e2" fill-opacity="0.7" stroke="#ef4444" stroke-width="2"/>
      <line x1="165" y1="53" x2="165" y2="157" stroke="#dc2626" stroke-width="2.5"/>
      <text x="175" y="218" font-size="11.5" fill="#b91c1c" text-anchor="middle">接缝画成生硬直线且线条等粗，分不出前后贴合</text>
      `,
      `
      <polygon points="52,72 145,35 238,72 145,112" fill="#dcfce7" fill-opacity="0.55" stroke="#16a34a" stroke-width="2"/>
      <polygon points="52,72 145,112 145,190 52,150" fill="#dcfce7" fill-opacity="0.35" stroke="#16a34a" stroke-width="1.6"/>
      <polygon points="145,112 238,72 238,150 145,190" fill="#dcfce7" fill-opacity="0.35" stroke="#16a34a" stroke-width="1.6"/>
      <ellipse cx="145" cy="72" rx="34" ry="15" fill="#bbf7d0" stroke="#4f46e5" stroke-width="2.6"/>
      <path d="M111 72 L111 18 A34 15 0 0 1 179 18 L179 72" fill="#dcfce7" fill-opacity="0.7" stroke="#16a34a" stroke-width="2"/>
      <ellipse cx="145" cy="18" rx="34" ry="15" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
      <text x="175" y="218" font-size="11.5" fill="#15803d" text-anchor="middle">交界椭圆贴紧顶面透视，前景线条实压后方</text>
      `
    ),
    keyPoints: [
      { title: '交界线顺着被穿面走', detail: '圆柱插进方体时，接口椭圆顺着方体表面斜向紧贴。' },
      { title: '切角减去多余体积', detail: '复杂机械和五官结构，都是从大盒子里切出斜面。' },
      { title: 'T 字叠压线分清前后', detail: '前面物体线条完整压住后方，瞬间拉出空气前后距。' }
    ],
    pitfalls: [
      { wrong: '两块体块像漂浮贴纸，连接处只画一条笔直分割线', fix: '先画出两者的透明重合区域，再沿曲面描出转折交线' },
      { wrong: '前后遮挡线一样粗细，看不出谁在前谁在后', fix: '前排轮廓线稍微加重加粗，被遮挡的退后线轻细收笔' }
    ],
    checklist: [
      '画出圆柱与方体互插处紧贴表面的椭圆交界线',
      '完成方体削斜角切割练习，保留辅助原轮廓虚线',
      '用T字叠压线和线条粗细表现前后两层体块'
    ],
    videos: [
      {
        id: 'vid-core6-bili',
        title: '几何体穿插、切割与 T 字叠压关系实战课',
        author: 'B站结构素描与造型课',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E5%87%A0%E4%BD%95%E4%BD%93%E7%A9%BF%E6%8F%92+%E5%88%87%E5%89%B2+%E5%8F%A0%E5%8E%8B%E5%85%B3%E7%B3%BB',
        keywords: '几何体穿插 切割 叠压关系',
        duration: '约17分钟',
        timestamps: [
          { time: '00:00', label: '为什么画手臂插肩膀要看懂穿插线' },
          { time: '08:45', label: '用 T 字交接法瞬间拉开空间纵深' }
        ],
        summary: '衔接基础几何体与后续人体/兽设零件拼装的必看桥梁课。'
      },
      {
        id: 'vid-core6-yt',
        title: 'Drawabox Lesson 2: Form Intersections & Organic Forms',
        author: 'Drawabox',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Drawabox+Lesson+2+Form+Intersections',
        keywords: 'Drawabox Lesson 2 Form Intersections',
        duration: '约18分钟',
        timestamps: [
          { time: '00:00', label: 'How planes intersect in 3D space' },
          { time: '09:30', label: 'Using line weight to clarify overlaps' }
        ],
        summary: '硬核空间训练：不靠参照直接推导立体相交线。'
      }
    ]
  },
  {
    id: 'core-7',
    track: 'core',
    tier: 'advanced',
    order: 7,
    title: '素描二分与明暗交界线',
    mantra: '先一刀切出黑白两大阵营，再保住反光暗于亮面的底线。',
    subtitle: '拒绝黑脏糊涂抹，用精准二分光影撑起立体体积',
    difficulty: '进阶 ⭐⭐⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-core-lighting',
    cheatSheetSVG: wrapCheatSheetSVG(
      '翻车：枕头阴影四周涂黑',
      '正确：明确光源 & 黑白二分边界',
      `
      <defs>
        <radialGradient id="cs-core7-bad" cx="50%" cy="50%" r="50%">
          <stop offset="52%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#334155"/>
        </radialGradient>
      </defs>
      <circle cx="122" cy="108" r="74" fill="url(#cs-core7-bad)" stroke="#ef4444" stroke-width="2"/>
      <text x="275" y="88" font-size="11.5" font-weight="700" fill="#dc2626" text-anchor="middle">❌ 光从哪来看不清</text>
      <text x="275" y="112" font-size="11" fill="#b91c1c" text-anchor="middle">盲目绕着边缘喷黑</text>
      <text x="275" y="136" font-size="11" fill="#b91c1c" text-anchor="middle">缺乏地面投影锚点</text>
      <text x="175" y="218" font-size="11.5" fill="#b91c1c" text-anchor="middle">边缘涂黑一圈会让画面脏平发灰</text>
      `,
      `
      <path d="M20 24 L60 54" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#cs-arrow-amber)"/>
      <text x="68" y="34" font-size="11" font-weight="700" fill="#d97706">主光 45°</text>
      <ellipse cx="185" cy="176" rx="95" ry="22" fill="#64748b" fill-opacity="0.45"/>
      <circle cx="136" cy="108" r="70" fill="#f8fafc" stroke="#16a34a" stroke-width="2"/>
      <path d="M88 55 Q178 92 192 160 A70 70 0 0 1 88 55 Z" fill="#475569" fill-opacity="0.82"/>
      <path d="M120 172 A60 60 0 0 0 194 144" stroke="#cbd5e1" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M90 57 Q172 94 186 158" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>
      <text x="284" y="92" font-size="11" font-weight="700" fill="#15803d" text-anchor="middle">✅ 亮面干干净净</text>
      <text x="284" y="118" font-size="11" fill="#4f46e5" font-weight="700" text-anchor="middle">交界线贴弧度压深</text>
      <text x="175" y="218" font-size="11.5" fill="#15803d" text-anchor="middle">先硬边二分色块，瞬间通透立体</text>
      `
    ),
    keyPoints: [
      { title: '下笔先定唯一光源箭头', detail: '没统一光源方向就会涂脏，角落先标斜射光箭头。' },
      { title: '交界线卡在光切边界', detail: '球柱最暗处不在边缘而在光切线处，背光边缘有反光。' },
      { title: '先铺平二分再修小过渡', detail: '用马克笔一次铺平所有暗部与投影，硬边比乱涂高级。' }
    ],
    pitfalls: [
      { wrong: '拿着喷枪绕着边缘涂黑一圈（枕头阴影）', fix: '严格划分受光亮区和背光暗区，禁止四面涂黑' },
      { wrong: '反光画得跟亮部一样白亮，结构瞬间打架', fix: '眯眼观察：反光永远属于暗部，亮度绝不超过灰面' }
    ],
    checklist: [
      '用马克笔只铺一层灰，统一球体暗部与地面投影',
      '明确留出明暗交界线最深带与克制的边缘反光',
      '挑战底部「右上角逆向光源」自行切出三大体块二分'
    ],
    videos: [
      {
        id: 'vid-core7-bili',
        title: '素描二分法与明暗交界线（一眼变通透的光影公式）',
        author: 'B站素描光影与厚涂课',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E5%85%89%E5%BD%B1%E4%BA%8C%E5%88%86%E6%B3%95+%E6%98%8E%E6%9A%97%E4%BA%A4%E7%95%8C%E7%BA%BF+%E7%BB%98%E7%94%BB%E5%85%A5%E9%97%A8',
        keywords: '光影二分法 明暗交界线 绘画入门',
        duration: '约16分钟',
        timestamps: [
          { time: '00:00', label: '亮暗二分隔离法 (Two-Value Read)' },
          { time: '08:15', label: '明暗交界线与地面投影硬软边处理' }
        ],
        summary: '帮你克服一加阴影就变脏的魔咒，学会稳稳切分两大色块。'
      },
      {
        id: 'vid-core7-yt',
        title: 'Shading Light and Form Basics (Proko)',
        author: 'Proko',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Proko+shading+light+and+form+basics',
        keywords: 'Proko shading light and form basics',
        duration: '约13分钟',
        timestamps: [
          { time: '00:00', label: 'Terminator & Core Shadow principles' },
          { time: '07:45', label: 'Controlling reflected light values' }
        ],
        summary: '经典石膏光影五大调子短片，直观展现受光面与反光关系。'
      }
    ]
  },
  {
    id: 'core-8',
    track: 'core',
    tier: 'advanced',
    order: 8,
    title: '固有色、光源色与环境色',
    mantra: '阳光暖则暗部冷，绝不直接加黑调暗颜色而是往冷紫偏移。',
    subtitle: '打破发灰发脏上色魔咒，用冷暖对比画出通透色彩',
    difficulty: '进阶 ⭐⭐⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-core-color',
    cheatSheetSVG: wrapCheatSheetSVG(
      '翻车：阴影直拉纯黑发木',
      '正确：冷暖偏移 & 环境反光',
      `
      <circle cx="122" cy="108" r="70" fill="#fca5a5" stroke="#ef4444" stroke-width="2"/>
      <path d="M78 58 Q166 92 178 158 A70 70 0 0 1 78 58 Z" fill="#451a1a" fill-opacity="0.88"/>
      <text x="275" y="96" font-size="11.5" font-weight="700" fill="#dc2626" text-anchor="middle">❌ 纯黑调暗</text>
      <text x="275" y="122" font-size="11" fill="#b91c1c" text-anchor="middle">色相不动直接加黑</text>
      <text x="275" y="146" font-size="11" fill="#b91c1c" text-anchor="middle">阴影宛如烧焦炭块</text>
      <text x="175" y="218" font-size="11.5" fill="#b91c1c" text-anchor="middle">无冷暖对比，红球涂暗后直接变脏褐黑泥</text>
      `,
      `
      <ellipse cx="165" cy="172" rx="88" ry="20" fill="#6366f1" fill-opacity="0.35"/>
      <circle cx="122" cy="108" r="70" fill="#fed7aa" stroke="#16a34a" stroke-width="2"/>
      <path d="M78 58 Q166 92 178 158 A70 70 0 0 1 78 58 Z" fill="#9333ea" fill-opacity="0.62"/>
      <path d="M104 170 A60 60 0 0 0 176 142" stroke="#38bdf8" stroke-width="5" fill="none" stroke-linecap="round"/>
      <text x="275" y="88" font-size="11" font-weight="700" fill="#d97706" text-anchor="middle">☀ 亮部吃暖黄光</text>
      <text x="275" y="114" font-size="11" font-weight="700" fill="#6366f1" text-anchor="middle">🌙 暗面偏冷紫蓝</text>
      <text x="275" y="140" font-size="11" fill="#0284c7" text-anchor="middle">💧 底缘扫天蓝反光</text>
      <text x="175" y="218" font-size="11.5" fill="#15803d" text-anchor="middle">用色相冷暖对撞代替加黑，阴影立马清透！</text>
      `
    ),
    keyPoints: [
      { title: '亮暗冷暖互为补色倾向', detail: '太阳暖黄光照射时，背光暗面必须吸收冷蓝天光。' },
      { title: '阴影色相偏移勿加黑', detail: '选暗色时明度降低同时，色相要顺着色环往冷紫偏。' },
      { title: '环境色染亮暗部底缘', detail: '物体底部暗区边缘会染上一层桌面或草地的环境反光。' }
    ],
    pitfalls: [
      { wrong: '只把固有色直直拉向纯黑调阴影，画面脏灰发木', fix: '降低明度的同时微微提一点饱和度并偏冷色相' },
      { wrong: '环境反光色彩画得比主光源还要鲜艳夺目', fix: '环境色只在暗部底边轻扫一笔，纯度保持克制' }
    ],
    checklist: [
      '为暖光照射下的方体和球体切出偏冷蓝紫色的暗部',
      '在彩色底面上的球体底缘加入微弱环境反弹色',
      '不借用纯黑色画出通透干净的亮灰暗三色分层'
    ],
    videos: [
      {
        id: 'vid-core8-bili',
        title: '色彩冷暖与固有色环境色规律（不发灰不发脏的秘密）',
        author: 'B站插画色彩基础课',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E8%89%B2%E5%BD%A9%E5%86%B7%E6%9A%96+%E5%9B%BA%E6%9C%89%E8%89%B2+%E7%8E%AF%E5%A2%83%E8%89%B2+%E9%98%B4%E5%BD%B1%E4%B8%8D%E8%84%8F',
        keywords: '色彩冷暖 固有色 环境色 阴影不脏',
        duration: '约18分钟',
        timestamps: [
          { time: '00:00', label: '为什么调暗不能直接往黑色拉' },
          { time: '09:10', label: '阳光暖 + 天光冷环境色实战示范' }
        ],
        summary: '讲清光源色影响亮面、环境色影响暗面的规律。'
      },
      {
        id: 'vid-core8-yt',
        title: 'Color Theory for Beginners: Hue Shifting & Ambient Light',
        author: 'Marc Brunet / Marco Bucci',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=hue+shifting+ambient+light+color+theory+digital+art',
        keywords: 'hue shifting ambient light color theory digital art',
        duration: '约14分钟',
        timestamps: [
          { time: '00:00', label: 'Hue shifting explained simply' },
          { time: '07:10', label: 'Warm light vs cool shadow harmony' }
        ],
        summary: '经典色相偏移法教学，用冷暖对比让色彩更通透。'
      }
    ]
  }
];
