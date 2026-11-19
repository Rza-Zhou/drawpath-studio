/**
 * DrawPath Studio · 画路工坊
 * ✨ 二次元角色插画 (anime, 8课) + 🐾 Furry / 兽人专项 (furry, 8课)
 * 包含 16 套 1200x900 建筑感辅助练习底图与 16 张 800x320 正误对比结构速查 SVG
 */

import { wrapTemplateSVG } from './svg-helpers.js';
import {
  PLATE_FURRY_KEMONO_MUZZLE,
  PLATE_FURRY_WESTERN_MUZZLE,
  PLATE_FURRY_KEMONO_EARS_BODY,
  PLATE_FURRY_KEMONO_EXPRESSIONS,
  PLATE_FURRY_KEMONO_FUR_TUFTS,
  PLATE_ANIME_HEAD_LOOMIS,
  PLATE_ANIME_FACE_HAIR,
  PLATE_ANIME_EXPRESSIONS,
  PLATE_ANIME_BODY_POSE,
  PLATE_ANIME_CEL_SHEET,
  PLATE_TPL_ANIME_CEL,
} from './redblue-plates.js';

// ============================================================================
// ✨ ANIME PRACTICE TEMPLATES (8 × 1200x900 Construction Scaffolds)
// ============================================================================

export const ANIME_TEMPLATES = [
  {
    id: 'tpl-anime-head',
    name: '二次元 Loomis 十字球（正面 + 3/4 侧面结构架）',
    track: 'anime',
    lessonId: 'anime-1',
    description: '标准颅骨球、颞部切面椭圆、柔和下颌曲线与颈肩引导架，附底部自由练习空球。',
    imageUrl: './assets/diagrams/anime-head-loomis.jpg',
    svgContent: wrapTemplateSVG(
      'ANIME-1 · 二次元十字球：正面与 3/4 侧面头型骨架',
      '口诀：先定圆球与切面，再拉弧形中线，下颌用顺滑曲线轻收至下巴尖',
      `
      <!-- Left Zone: Front Loomis Head Scaffold -->
      <rect x="48" y="92" width="536" height="492" rx="14" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.78">区 1 · 正面 Loomis 头型比例骨架</text>
      <text x="68" y="140" font-size="11.5" fill="#475569" fill-opacity="0.68">眼线落于全头 1/2 中段 · 耳朵夹在眉线与鼻底之间</text>

      <g transform="translate(316, 300)">
        <!-- Cranium sphere -->
        <circle cx="0" cy="-24" r="108" fill="#38bdf8" fill-opacity="0.04" stroke="#0284c7" stroke-opacity="0.55" stroke-width="2"/>
        <!-- Trimmed temple planes (front view chord lines) -->
        <line x1="-94" y1="-82" x2="-94" y2="34" stroke="#6366f1" stroke-opacity="0.35" stroke-width="1.4" stroke-dasharray="5 4"/>
        <line x1="94" y1="-82" x2="94" y2="34" stroke="#6366f1" stroke-opacity="0.35" stroke-width="1.4" stroke-dasharray="5 4"/>
        <!-- Center vertical axis -->
        <line x1="0" y1="-148" x2="0" y2="215" stroke="#0284c7" stroke-opacity="0.5" stroke-width="1.4" stroke-dasharray="7 5"/>
        <!-- Horizontal facial proportion guides -->
        <line x1="-130" y1="-78" x2="130" y2="-78" stroke="#6366f1" stroke-opacity="0.32" stroke-width="1.1" stroke-dasharray="4 4"/>
        <line x1="-130" y1="-24" x2="130" y2="-24" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.3" stroke-dasharray="5 4"/>
        <line x1="-130" y1="12" x2="130" y2="12" stroke="#ec4899" stroke-opacity="0.48" stroke-width="1.4"/>
        <line x1="-110" y1="62" x2="110" y2="62" stroke="#6366f1" stroke-opacity="0.32" stroke-width="1.1" stroke-dasharray="4 4"/>
        <line x1="-90" y1="96" x2="90" y2="96" stroke="#6366f1" stroke-opacity="0.32" stroke-width="1.1" stroke-dasharray="4 4"/>
        <line x1="-70" y1="138" x2="70" y2="138" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.3" stroke-dasharray="4 4"/>
        <!-- Smooth anime cubic Bézier jawline scaffold -->
        <path d="M -94 4 C -94 48, -86 78, -68 102 C -48 124, -20 138, 0 138 C 20 138, 48 124, 68 102 C 86 78, 94 48, 94 4" fill="none" stroke="#0284c7" stroke-opacity="0.58" stroke-width="2" stroke-dasharray="6 4"/>
        <!-- Subtle ear anchor arcs -->
        <path d="M -94 -8 C -108 -6, -108 42, -92 52" fill="none" stroke="#6366f1" stroke-opacity="0.42" stroke-width="1.6"/>
        <path d="M 94 -8 C 108 -6, 108 42, 92 52" fill="none" stroke="#6366f1" stroke-opacity="0.42" stroke-width="1.6"/>
        <!-- Tapered neck & trapezius guide -->
        <path d="M -38 118 C -36 146, -40 168, -46 184 C -68 194, -104 202, -130 212" fill="none" stroke="#0284c7" stroke-opacity="0.42" stroke-width="1.6" stroke-dasharray="5 4"/>
        <path d="M 38 118 C 36 146, 40 168, 46 184 C 68 194, 104 202, 130 212" fill="none" stroke="#0284c7" stroke-opacity="0.42" stroke-width="1.6" stroke-dasharray="5 4"/>
        <!-- Ratio labels -->
        <text x="136" y="-74" font-size="11" fill="#6366f1" fill-opacity="0.72">发际线</text>
        <text x="136" y="-20" font-size="11" fill="#0284c7" fill-opacity="0.75">眉弓线 (球心)</text>
        <text x="136" y="16" font-size="11" font-weight="700" fill="#db2777" fill-opacity="0.78">眼线 (头高1/2)</text>
        <text x="116" y="66" font-size="11" fill="#6366f1" fill-opacity="0.72">鼻尖位置</text>
        <text x="96" y="100" font-size="11" fill="#6366f1" fill-opacity="0.72">口裂线</text>
        <text x="76" y="142" font-size="11" fill="#0284c7" fill-opacity="0.75">下巴尖</text>
      </g>

      <!-- Right Zone: 3/4 Loomis Head Scaffold -->
      <rect x="616" y="92" width="536" height="492" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="636" y="120" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.78">区 2 · 3/4 侧面转头结构架（重点练习）</text>
      <text x="636" y="140" font-size="11.5" fill="#475569" fill-opacity="0.68">颞部切面圆定耳朵 · 中线顺球面弯曲 · 远侧颧骨微凸后轻收下巴</text>

      <g transform="translate(888, 300)">
        <!-- Cranium sphere -->
        <circle cx="0" cy="-24" r="108" fill="#6366f1" fill-opacity="0.04" stroke="#4f46e5" stroke-opacity="0.55" stroke-width="2"/>
        <!-- Side temple plane ellipse (2/3 radius) -->
        <ellipse cx="44" cy="-22" rx="52" ry="70" fill="#6366f1" fill-opacity="0.06" stroke="#4f46e5" stroke-opacity="0.52" stroke-width="1.6"/>
        <!-- Cross inside side plane -->
        <line x1="-8" y1="-22" x2="96" y2="-22" stroke="#4f46e5" stroke-opacity="0.4" stroke-width="1.2" stroke-dasharray="4 4"/>
        <line x1="44" y1="-92" x2="44" y2="48" stroke="#4f46e5" stroke-opacity="0.4" stroke-width="1.2" stroke-dasharray="4 4"/>
        <!-- Curved 3/4 facial centerline wrapping the sphere -->
        <path d="M -38 -126 C -64 -84, -76 -42, -74 12 C -72 58, -56 102, -46 136" fill="none" stroke="#db2777" stroke-opacity="0.62" stroke-width="1.8" stroke-dasharray="6 4"/>
        <!-- Curved brow & eye bands -->
        <path d="M -105 -20 Q -54 -14 44 -22" fill="none" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.3"/>
        <path d="M -102 16 Q -54 22 44 12" fill="none" stroke="#db2777" stroke-opacity="0.52" stroke-width="1.4"/>
        <!-- Smooth 3/4 anime cheek & jaw Bézier contour -->
        <path d="M -98 -6 C -102 16, -106 34, -98 54 C -90 78, -74 114, -46 136 C -18 134, 18 112, 36 82 C 44 64, 46 46, 44 34" fill="none" stroke="#4f46e5" stroke-opacity="0.58" stroke-width="2" stroke-dasharray="6 4"/>
        <!-- Ear anchor at lower-back quadrant of side plane -->
        <path d="M 46 8 C 66 2, 72 48, 52 62 C 44 66, 38 54, 42 42" fill="none" stroke="#10b981" stroke-opacity="0.58" stroke-width="1.8"/>
        <circle cx="52" cy="30" r="3.5" fill="#10b981" fill-opacity="0.65"/>
        <!-- Forward-tilted natural neck cylinder -->
        <path d="M -22 126 C -16 154, -12 178, -10 198" fill="none" stroke="#4f46e5" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 4"/>
        <path d="M 54 64 C 58 106, 66 146, 78 186" fill="none" stroke="#4f46e5" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 4"/>
        <!-- Labels -->
        <text x="108" y="-50" font-size="11" fill="#4f46e5" fill-opacity="0.78">颞部切面圆</text>
        <text x="108" y="-34" font-size="10.5" fill="#475569" fill-opacity="0.68">(约球径 2/3)</text>
        <text x="80" y="34" font-size="11" font-weight="700" fill="#059669" fill-opacity="0.8">耳根象限</text>
        <text x="-152" y="22" font-size="11" fill="#db2777" fill-opacity="0.78">眼线贴球弯</text>
        <text x="-150" y="138" font-size="11" fill="#4f46e5" fill-opacity="0.78">下巴落中线</text>
      </g>

      <!-- Bottom Zone: 3 Blank Mini Loomis Spheres for Independent Drill -->
      <rect x="48" y="604" width="1104" height="252" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="632" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.78">区 3 · 独立脱稿推导区（根据箭头方向补全切面圆、弧形中线与下颌）</text>

      <!-- Blank 1: Left 3/4 -->
      <g transform="translate(230, 728)">
        <circle cx="0" cy="0" r="58" fill="none" stroke="#059669" stroke-opacity="0.48" stroke-width="1.8"/>
        <line x1="-22" y1="6" x2="-82" y2="12" stroke="#10b981" stroke-opacity="0.68" stroke-width="2" marker-end="url(#tpl-arrow-emerald)"/>
        <text x="0" y="96" font-size="11.5" fill="#475569" fill-opacity="0.75" text-anchor="middle">① 向左 3/4 轻转头</text>
      </g>
      <!-- Blank 2: Right 3/4 -->
      <g transform="translate(600, 728)">
        <circle cx="0" cy="0" r="58" fill="none" stroke="#059669" stroke-opacity="0.48" stroke-width="1.8"/>
        <line x1="22" y1="6" x2="82" y2="12" stroke="#10b981" stroke-opacity="0.68" stroke-width="2" marker-end="url(#tpl-arrow-emerald)"/>
        <text x="0" y="96" font-size="11.5" fill="#475569" fill-opacity="0.75" text-anchor="middle">② 向右 3/4 轻转头</text>
      </g>
      <!-- Blank 3: Tilted head -->
      <g transform="translate(970, 728)">
        <circle cx="0" cy="0" r="58" fill="none" stroke="#059669" stroke-opacity="0.48" stroke-width="1.8"/>
        <line x1="0" y1="-68" x2="26" y2="74" stroke="#059669" stroke-opacity="0.35" stroke-width="1.4" stroke-dasharray="5 4"/>
        <line x1="-18" y1="4" x2="-74" y2="20" stroke="#10b981" stroke-opacity="0.68" stroke-width="2" marker-end="url(#tpl-arrow-emerald)"/>
        <text x="0" y="96" font-size="11.5" fill="#475569" fill-opacity="0.75" text-anchor="middle">③ 歪头 15° + 向左看</text>
      </g>
      `
    )
  },

  {
    id: 'tpl-anime-angles',
    name: '二次元仰视 / 平视 / 俯视透视球面弧线架',
    track: 'anime',
    lessonId: 'anime-2',
    description: '三组对比透视头球骨架（仰视拱弧露下颌底面、平视基准、俯视下弯大颅顶），附自由角度挑战球。',
    imageUrl: './assets/diagrams/anime-head-loomis.jpg',
    svgContent: wrapTemplateSVG(
      'ANIME-2 · 仰视与俯视头像：纬线弯曲方向与耳朵高低规律',
      '口诀：仰视纬线向上拱 ∩（耳降露下巴底），俯视纬线向下弯 ∪（耳升颅顶大）',
      `
      <!-- Column 1: Up-tilt (仰视) -->
      <rect x="48" y="92" width="352" height="500" rx="14" fill="none" stroke="#0284c7" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="224" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.82" text-anchor="middle">① 仰视 (Looking Up)</text>
      <text x="224" y="140" font-size="11" fill="#475569" fill-opacity="0.7" text-anchor="middle">纬线向上拱 ∩ · 耳朵低于眼线 · 露出下颌底面</text>
      <g transform="translate(224, 330)">
        <circle cx="0" cy="-24" r="90" fill="#38bdf8" fill-opacity="0.04" stroke="#0284c7" stroke-opacity="0.55" stroke-width="2"/>
        <!-- Side temple ellipse tilted up -->
        <ellipse cx="42" cy="-14" rx="38" ry="56" transform="rotate(-18 42 -14)" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.5"/>
        <!-- Centerline curved up -->
        <path d="M -32 -110 C -58 -76, -68 -36, -64 16 C -60 44, -50 68, -42 84" fill="none" stroke="#db2777" stroke-opacity="0.6" stroke-width="1.7" stroke-dasharray="5 4"/>
        <!-- Upward arching brow & eye latitude lines -->
        <path d="M -88 -42 Q -38 -66 42 -42" fill="none" stroke="#0284c7" stroke-opacity="0.5" stroke-width="1.4"/>
        <path d="M -88 -12 Q -38 -36 42 -12" fill="none" stroke="#db2777" stroke-opacity="0.62" stroke-width="1.8"/>
        <!-- Smooth jaw & visible under-chin triangle plane -->
        <path d="M -84 -10 C -84 26, -72 64, -42 84 C -10 88, 22 72, 46 46" fill="none" stroke="#0284c7" stroke-opacity="0.58" stroke-width="2" stroke-dasharray="6 4"/>
        <path d="M -42 84 C -18 100, 12 104, 36 82 L 46 46" fill="#0284c7" fill-opacity="0.09" stroke="#0284c7" stroke-opacity="0.5" stroke-width="1.5"/>
        <!-- Dropped ear -->
        <path d="M 46 18 C 64 16, 66 56, 48 66" fill="none" stroke="#10b981" stroke-opacity="0.65" stroke-width="1.8"/>
        <!-- Neck going down from back of under-chin -->
        <path d="M -10 98 C -8 134, -8 164, -10 190" fill="none" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 4"/>
        <path d="M 50 64 C 54 108, 60 150, 70 186" fill="none" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 4"/>
        <!-- Direction arrow -->
        <path d="M -112 24 L -132 -18" stroke="#0284c7" stroke-opacity="0.7" stroke-width="2" marker-end="url(#tpl-arrow)"/>
        <text x="-10" y="122" font-size="11" font-weight="700" fill="#0284c7" fill-opacity="0.8" text-anchor="middle">下颌底面可见</text>
        <text x="86" y="46" font-size="11" font-weight="700" fill="#059669" fill-opacity="0.8">耳位下沉</text>
      </g>

      <!-- Column 2: Eye-level (平视基准) -->
      <rect x="424" y="92" width="352" height="500" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="600" y="120" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.82" text-anchor="middle">② 平视基准 (Eye Level)</text>
      <text x="600" y="140" font-size="11" fill="#475569" fill-opacity="0.7" text-anchor="middle">纬线近水平 — · 耳朵与眉鼻对齐</text>
      <g transform="translate(600, 330)">
        <circle cx="0" cy="-24" r="90" fill="#6366f1" fill-opacity="0.04" stroke="#4f46e5" stroke-opacity="0.55" stroke-width="2"/>
        <ellipse cx="40" cy="-24" rx="40" ry="58" fill="#6366f1" fill-opacity="0.06" stroke="#4f46e5" stroke-opacity="0.45" stroke-width="1.5"/>
        <path d="M -32 -110 C -54 -72, -64 -32, -62 12 C -60 48, -48 84, -38 112" fill="none" stroke="#db2777" stroke-opacity="0.6" stroke-width="1.7" stroke-dasharray="5 4"/>
        <line x1="-88" y1="-24" x2="46" y2="-24" stroke="#4f46e5" stroke-opacity="0.48" stroke-width="1.4"/>
        <line x1="-86" y1="6" x2="46" y2="6" stroke="#db2777" stroke-opacity="0.6" stroke-width="1.8"/>
        <path d="M -84 -6 C -86 30, -70 78, -38 112 C -12 110, 20 88, 36 58" fill="none" stroke="#4f46e5" stroke-opacity="0.58" stroke-width="2" stroke-dasharray="6 4"/>
        <path d="M 42 -4 C 60 -6, 62 34, 44 44" fill="none" stroke="#10b981" stroke-opacity="0.65" stroke-width="1.8"/>
        <path d="M -14 106 C -10 138, -8 164, -6 186" fill="none" stroke="#4f46e5" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 4"/>
        <path d="M 46 46 C 50 96, 56 144, 66 184" fill="none" stroke="#4f46e5" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 4"/>
        <path d="M -108 6 L -142 6" stroke="#4f46e5" stroke-opacity="0.7" stroke-width="2" marker-end="url(#tpl-arrow-indigo)"/>
        <text x="84" y="22" font-size="11" font-weight="700" fill="#059669" fill-opacity="0.8">耳平眉鼻</text>
      </g>

      <!-- Column 3: Down-tilt (俯视) -->
      <rect x="800" y="92" width="352" height="500" rx="14" fill="none" stroke="#d97706" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="976" y="120" font-size="13.5" font-weight="700" fill="#d97706" fill-opacity="0.82" text-anchor="middle">③ 俯视 (Looking Down)</text>
      <text x="976" y="140" font-size="11" fill="#475569" fill-opacity="0.7" text-anchor="middle">纬线向下弯 ∪ · 耳朵高于眼线 · 颅顶面积放大</text>
      <g transform="translate(976, 330)">
        <circle cx="0" cy="-24" r="90" fill="#f59e0b" fill-opacity="0.04" stroke="#d97706" stroke-opacity="0.55" stroke-width="2"/>
        <ellipse cx="42" cy="-36" rx="38" ry="56" transform="rotate(20 42 -36)" fill="#f59e0b" fill-opacity="0.06" stroke="#d97706" stroke-opacity="0.45" stroke-width="1.5"/>
        <!-- Centerline curved down -->
        <path d="M -20 -98 C -52 -56, -64 -8, -58 46 C -54 78, -42 104, -34 122" fill="none" stroke="#db2777" stroke-opacity="0.6" stroke-width="1.7" stroke-dasharray="5 4"/>
        <!-- Downward dipping brow & eye latitude lines -->
        <path d="M -84 2 Q -38 28 42 -6" fill="none" stroke="#d97706" stroke-opacity="0.5" stroke-width="1.4"/>
        <path d="M -80 32 Q -36 58 42 22" fill="none" stroke="#db2777" stroke-opacity="0.62" stroke-width="1.8"/>
        <!-- Foreshortened lower jaw -->
        <path d="M -78 24 C -74 64, -58 102, -34 122 C -12 116, 16 90, 32 54" fill="none" stroke="#d97706" stroke-opacity="0.58" stroke-width="2" stroke-dasharray="6 4"/>
        <!-- Elevated ear -->
        <path d="M 46 -32 C 66 -38, 68 4, 48 14" fill="none" stroke="#10b981" stroke-opacity="0.65" stroke-width="1.8"/>
        <!-- Neck tucked cleanly behind jaw -->
        <path d="M -6 116 C 0 144, 6 168, 12 186" fill="none" stroke="#d97706" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 4"/>
        <path d="M 48 20 C 56 76, 66 130, 78 176" fill="none" stroke="#d97706" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 4"/>
        <path d="M -108 32 L -132 72" stroke="#d97706" stroke-opacity="0.7" stroke-width="2" marker-end="url(#tpl-arrow-amber)"/>
        <text x="-8" y="-76" font-size="11" font-weight="700" fill="#d97706" fill-opacity="0.82" text-anchor="middle">颅顶显大</text>
        <text x="86" y="-12" font-size="11" font-weight="700" fill="#059669" fill-opacity="0.8">耳位上抬</text>
      </g>

      <!-- Bottom Free Drill Strip -->
      <rect x="48" y="612" width="1104" height="244" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="640" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.78">区 4 · 多角度快速推导格（按箭头画纬线弧度 + 耳位点 + 下颌）</text>
      <g transform="translate(185, 738)">
        <circle cx="0" cy="0" r="52" fill="none" stroke="#059669" stroke-opacity="0.48" stroke-width="1.7"/>
        <path d="M 10 -4 L 68 -36" stroke="#10b981" stroke-width="2" marker-end="url(#tpl-arrow-emerald)"/>
        <text x="0" y="84" font-size="11" fill="#475569" text-anchor="middle">右上仰视 30°</text>
      </g>
      <g transform="translate(460, 738)">
        <circle cx="0" cy="0" r="52" fill="none" stroke="#059669" stroke-opacity="0.48" stroke-width="1.7"/>
        <path d="M -10 -4 L -68 -36" stroke="#10b981" stroke-width="2" marker-end="url(#tpl-arrow-emerald)"/>
        <text x="0" y="84" font-size="11" fill="#475569" text-anchor="middle">左上仰视 30°</text>
      </g>
      <g transform="translate(740, 738)">
        <circle cx="0" cy="0" r="52" fill="none" stroke="#059669" stroke-opacity="0.48" stroke-width="1.7"/>
        <path d="M 10 4 L 68 38" stroke="#10b981" stroke-width="2" marker-end="url(#tpl-arrow-emerald)"/>
        <text x="0" y="84" font-size="11" fill="#475569" text-anchor="middle">右下俯视 30°</text>
      </g>
      <g transform="translate(1015, 738)">
        <circle cx="0" cy="0" r="52" fill="none" stroke="#059669" stroke-opacity="0.48" stroke-width="1.7"/>
        <path d="M -10 4 L -68 38" stroke="#10b981" stroke-width="2" marker-end="url(#tpl-arrow-emerald)"/>
        <text x="0" y="84" font-size="11" fill="#475569" text-anchor="middle">左下俯视 30°</text>
      </g>
      `
    )
  },

  {
    id: 'tpl-anime-features',
    name: '动漫五官标尺：眼距五眼格、3/4 透视收缩与三种眼型架',
    track: 'anime',
    lessonId: 'anime-3',
    description: '正面「三庭五眼」眼带标尺、3/4 远侧眼睛透视收缩架、以及圆眼/挑眼/半眯眼三组框线练习。',
    imageUrl: './assets/diagrams/anime-face-hair.jpg',
    svgContent: wrapTemplateSVG(
      'ANIME-3 · 动漫五官定位：眼距标尺、远侧眼收缩与鼻口缩略',
      '口诀：两眼间隔一只眼 · 上睫毛厚而弯 · 虹膜轻藏上眼睑 · 鼻子用小点或小三角点到即止',
      `
      <!-- Top Left: Front Eye-Band 5-Unit Ruler -->
      <rect x="48" y="92" width="536" height="390" rx="14" fill="none" stroke="#0284c7" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.82">区 1 · 正面眼带标尺（双眼中距 = 1 个眼宽）</text>

      <g transform="translate(316, 260)">
        <!-- Smooth face lower frame -->
        <path d="M -146 -80 C -148 16, -138 78, -106 122 C -72 162, -28 184, 0 184 C 28 184, 72 162, 106 122 C 138 78, 148 16, 146 -80" fill="#38bdf8" fill-opacity="0.03" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.8" stroke-dasharray="6 4"/>
        <!-- Vertical 5-eye divisions -->
        <g stroke="#6366f1" stroke-opacity="0.34" stroke-width="1.1" stroke-dasharray="4 4">
          <line x1="-112" y1="-64" x2="-112" y2="56"/>
          <line x1="-38" y1="-64" x2="-38" y2="56"/>
          <line x1="38" y1="-64" x2="38" y2="56"/>
          <line x1="112" y1="-64" x2="112" y2="56"/>
          <line x1="0" y1="-88" x2="0" y2="192"/>
        </g>
        <!-- Eye horizontal band -->
        <rect x="-136" y="-26" width="272" height="58" fill="#ec4899" fill-opacity="0.05" stroke="#ec4899" stroke-opacity="0.4" stroke-width="1.2"/>
        <!-- Left & Right smooth upper lash curve guides -->
        <path d="M -108 -4 C -94 -22, -58 -22, -42 -2" fill="none" stroke="#0284c7" stroke-opacity="0.62" stroke-width="3" stroke-linecap="round"/>
        <path d="M -98 28 Q -74 34 -50 26" fill="none" stroke="#0284c7" stroke-opacity="0.4" stroke-width="1.4" stroke-linecap="round"/>
        <ellipse cx="-74" cy="8" rx="18" ry="20" fill="none" stroke="#6366f1" stroke-opacity="0.42" stroke-width="1.4" stroke-dasharray="4 3"/>
        <path d="M 42 -2 C 58 -22, 94 -22, 108 -4" fill="none" stroke="#0284c7" stroke-opacity="0.62" stroke-width="3" stroke-linecap="round"/>
        <path d="M 50 26 Q 74 34 98 28" fill="none" stroke="#0284c7" stroke-opacity="0.4" stroke-width="1.4" stroke-linecap="round"/>
        <ellipse cx="74" cy="8" rx="18" ry="20" fill="none" stroke="#6366f1" stroke-opacity="0.42" stroke-width="1.4" stroke-dasharray="4 3"/>
        <!-- Brow guides -->
        <path d="M -112 -40 Q -76 -50 -36 -40" fill="none" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M 36 -40 Q 76 -50 112 -40" fill="none" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.8" stroke-linecap="round"/>
        <!-- Minimal nose shadow anchor & lip split -->
        <path d="M -2 74 L 4 82 L -1 84" fill="none" stroke="#db2777" stroke-opacity="0.65" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M -26 124 Q -8 128 -3 125 M 3 125 Q 8 128 26 124" fill="none" stroke="#db2777" stroke-opacity="0.62" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M -10 137 Q 0 141 10 137" fill="none" stroke="#6366f1" stroke-opacity="0.45" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Dimension labels -->
        <text x="0" y="-70" font-size="11" font-weight="700" fill="#4f46e5" text-anchor="middle">← 1 眼宽 →</text>
        <text x="158" y="8" font-size="11" fill="#db2777">眼带区</text>
        <text x="148" y="84" font-size="11" fill="#475569">鼻尖小影</text>
        <text x="128" y="132" font-size="11" fill="#475569">中断口裂</text>
      </g>

      <!-- Top Right: 3/4 Perspective Foreshortening -->
      <rect x="616" y="92" width="536" height="390" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="636" y="120" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.82">区 2 · 3/4 侧面透视：远侧眼睛自然变窄</text>

      <g transform="translate(884, 260)">
        <path d="M -126 -72 C -130 6, -138 36, -124 72 C -110 112, -84 158, -50 182 C -12 178, 38 144, 68 96 C 84 68, 92 32, 92 -66" fill="#6366f1" fill-opacity="0.03" stroke="#4f46e5" stroke-opacity="0.48" stroke-width="1.8" stroke-dasharray="6 4"/>
        <!-- Curved facial centerline -->
        <path d="M -42 -96 C -68 -48, -80 0, -76 58 C -72 106, -60 150, -50 182" fill="none" stroke="#db2777" stroke-opacity="0.58" stroke-width="1.6" stroke-dasharray="6 4"/>
        <!-- Curved eye band -->
        <path d="M -128 -20 Q -76 -12 68 -24" fill="none" stroke="#ec4899" stroke-opacity="0.42" stroke-width="1.3"/>
        <path d="M -128 34 Q -76 42 68 30" fill="none" stroke="#ec4899" stroke-opacity="0.42" stroke-width="1.3"/>
        <!-- Far eye (narrower ellipse) -->
        <path d="M -120 -2 C -112 -18, -94 -18, -86 0" fill="none" stroke="#4f46e5" stroke-opacity="0.65" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="-102" cy="10" rx="11" ry="19" fill="none" stroke="#6366f1" stroke-opacity="0.48" stroke-width="1.4" stroke-dasharray="4 3"/>
        <!-- Near eye (full width) -->
        <path d="M -32 0 C -14 -20, 26 -20, 44 -2" fill="none" stroke="#4f46e5" stroke-opacity="0.65" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="4" cy="10" rx="18" ry="20" fill="none" stroke="#6366f1" stroke-opacity="0.48" stroke-width="1.4" stroke-dasharray="4 3"/>
        <!-- 3/4 Tiny wedge nose on centerline -->
        <path d="M -78 44 L -88 76 L -74 82" fill="none" stroke="#db2777" stroke-opacity="0.68" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- 3/4 Mouth offset along centerline -->
        <path d="M -86 122 Q -68 128 -44 122" fill="none" stroke="#db2777" stroke-opacity="0.62" stroke-width="1.8" stroke-linecap="round"/>
        <text x="-152" y="-34" font-size="11" font-weight="700" fill="#4f46e5">远眼缩窄</text>
        <text x="64" y="-34" font-size="11" font-weight="700" fill="#4f46e5">近眼舒展</text>
        <text x="-160" y="80" font-size="11" fill="#db2777">鼻尖微出中线</text>
      </g>

      <!-- Bottom Zone: 3 Archetype Eye Shape Boxes -->
      <rect x="48" y="502" width="1104" height="354" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="530" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.82">区 3 · 三种高频动漫眼型框线练手（注意上睫毛主弧线、虹膜藏顶与高光留白）</text>

      <!-- Eye Type 1: Soft Round -->
      <g transform="translate(230, 684)">
        <rect x="-135" y="-110" width="270" height="220" rx="12" fill="none" stroke="#10b981" stroke-opacity="0.28" stroke-dasharray="4 4"/>
        <path d="M -76 4 C -58 -48, 38 -52, 74 -4" fill="none" stroke="#059669" stroke-opacity="0.65" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M -60 -36 C -26 -58, 28 -58, 60 -34" fill="none" stroke="#059669" stroke-opacity="0.38" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M -52 44 Q 0 58 58 40" fill="none" stroke="#059669" stroke-opacity="0.45" stroke-width="1.8" stroke-linecap="round"/>
        <ellipse cx="0" cy="8" rx="34" ry="38" fill="none" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 3"/>
        <circle cx="-14" cy="-6" r="8" fill="#0284c7" fill-opacity="0.16" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.2"/>
        <text x="0" y="92" font-size="12" font-weight="700" fill="#059669" text-anchor="middle">① 温柔圆眼（高弧顶 + 圆虹膜）</text>
      </g>

      <!-- Eye Type 2: Sharp Cat/Hero Eye -->
      <g transform="translate(600, 684)">
        <rect x="-135" y="-110" width="270" height="220" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.28" stroke-dasharray="4 4"/>
        <path d="M -78 14 C -48 -28, 26 -30, 82 -22" fill="none" stroke="#4f46e5" stroke-opacity="0.65" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M -56 -22 Q 16 -42 74 -34" fill="none" stroke="#4f46e5" stroke-opacity="0.38" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M -56 32 Q 12 36 68 14" fill="none" stroke="#4f46e5" stroke-opacity="0.45" stroke-width="1.8" stroke-linecap="round"/>
        <ellipse cx="4" cy="4" rx="28" ry="26" fill="none" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 3"/>
        <circle cx="-10" cy="-6" r="7" fill="#0284c7" fill-opacity="0.16" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.2"/>
        <text x="0" y="92" font-size="12" font-weight="700" fill="#4f46e5" text-anchor="middle">② 飒爽挑眼（眼尾上扬 + 扁长框）</text>
      </g>

      <!-- Eye Type 3: Half-lidded Cool Eye -->
      <g transform="translate(970, 684)">
        <rect x="-135" y="-110" width="270" height="220" rx="12" fill="none" stroke="#d97706" stroke-opacity="0.28" stroke-dasharray="4 4"/>
        <path d="M -78 -8 C -30 -18, 32 -16, 78 -4" fill="none" stroke="#d97706" stroke-opacity="0.65" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M -64 -26 Q 4 -34 66 -22" fill="none" stroke="#d97706" stroke-opacity="0.4" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M -58 28 Q 4 36 62 24" fill="none" stroke="#d97706" stroke-opacity="0.45" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M -26 -10 A 28 32 0 1 0 30 -8" fill="none" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 3"/>
        <circle cx="-10" cy="4" r="6" fill="#0284c7" fill-opacity="0.16" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.2"/>
        <text x="0" y="92" font-size="12" font-weight="700" fill="#d97706" text-anchor="middle">③ 半眯慵懒眼（上睑遮去 1/3 虹膜）</text>
      </g>
      `
    )
  },

  {
    id: 'tpl-anime-expressions',
    name: '二次元四格表情联动架构（喜 / 怒 / 委屈 / 惊）',
    track: 'anime',
    lessonId: 'anime-4',
    description: '4 个完整 Loomis 头像骨架，预置眉弓矢量箭头、下睑挤压弧与张口下巴下沉参考线。',
    imageUrl: './assets/diagrams/anime-face-hair.jpg',
    svgContent: wrapTemplateSVG(
      'ANIME-4 · 表情联动四宫格：眉弓、下眼睑与脸颊挤压同步变化',
      '口诀：笑时下睑往上顶、怒时眉头往下压、大张嘴时下巴必下沉',
      `
      <!-- Cell 1: Joy (喜悦) -->
      <rect x="48" y="92" width="536" height="368" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.82">① 喜悦大笑：眉尾舒展 + 下睑上顶成弧 + 嘴角提拉</text>
      <g transform="translate(316, 265)">
        <circle cx="0" cy="-22" r="78" fill="none" stroke="#059669" stroke-opacity="0.45" stroke-width="1.7"/>
        <path d="M -68 2 C -68 40, -56 76, -34 98 C -16 112, 16 112, 34 98 C 56 76, 68 40, 68 2" fill="none" stroke="#059669" stroke-opacity="0.52" stroke-width="1.8" stroke-dasharray="5 4"/>
        <line x1="0" y1="-108" x2="0" y2="128" stroke="#059669" stroke-opacity="0.28" stroke-width="1.2" stroke-dasharray="4 4"/>
        <!-- Raised relaxed brows -->
        <path d="M -54 -28 Q -32 -42 -14 -30" fill="none" stroke="#059669" stroke-opacity="0.72" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M 14 -30 Q 32 -42 54 -28" fill="none" stroke="#059669" stroke-opacity="0.72" stroke-width="2.4" stroke-linecap="round"/>
        <!-- Smiling crescent eyes pushed up by cheeks -->
        <path d="M -52 6 Q -32 -14 -14 8" fill="none" stroke="#0284c7" stroke-opacity="0.7" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M 14 8 Q 32 -14 52 6" fill="none" stroke="#0284c7" stroke-opacity="0.7" stroke-width="2.8" stroke-linecap="round"/>
        <!-- Cheek push-up arrows -->
        <path d="M -42 32 L -36 16" stroke="#10b981" stroke-width="1.8" marker-end="url(#tpl-arrow-emerald)"/>
        <path d="M 42 32 L 36 16" stroke="#10b981" stroke-width="1.8" marker-end="url(#tpl-arrow-emerald)"/>
        <!-- Open happy D-mouth guide -->
        <path d="M -26 54 Q 0 58 26 54 C 24 84, -24 84, -26 54 Z" fill="#10b981" fill-opacity="0.08" stroke="#db2777" stroke-opacity="0.62" stroke-width="1.8"/>
        <text x="112" y="18" font-size="11" fill="#059669">脸颊上顶</text>
        <text x="112" y="72" font-size="11" fill="#db2777">下巴微下沉</text>
      </g>

      <!-- Cell 2: Angry (愤怒) -->
      <rect x="616" y="92" width="536" height="368" rx="14" fill="none" stroke="#ef4444" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="636" y="120" font-size="13.5" font-weight="700" fill="#dc2626" fill-opacity="0.82">② 愤怒皱眉：眉头向鼻梁聚拢压低 + 上眼睑切平</text>
      <g transform="translate(884, 265)">
        <circle cx="0" cy="-22" r="78" fill="none" stroke="#dc2626" stroke-opacity="0.42" stroke-width="1.7"/>
        <path d="M -68 2 C -68 40, -56 76, -34 98 C -16 112, 16 112, 34 98 C 56 76, 68 40, 68 2" fill="none" stroke="#dc2626" stroke-opacity="0.48" stroke-width="1.8" stroke-dasharray="5 4"/>
        <line x1="0" y1="-108" x2="0" y2="128" stroke="#dc2626" stroke-opacity="0.25" stroke-width="1.2" stroke-dasharray="4 4"/>
        <!-- V-slammed brows -->
        <path d="M -56 -24 L -10 -4" fill="none" stroke="#dc2626" stroke-opacity="0.78" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M 56 -24 L 10 -4" fill="none" stroke="#dc2626" stroke-opacity="0.78" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M -26 -36 L -14 -14" stroke="#d97706" stroke-width="1.8" marker-end="url(#tpl-arrow-amber)"/>
        <path d="M 26 -36 L 14 -14" stroke="#d97706" stroke-width="1.8" marker-end="url(#tpl-arrow-amber)"/>
        <!-- Sharp focused eyes -->
        <path d="M -52 2 L -14 10" fill="none" stroke="#4f46e5" stroke-opacity="0.7" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M 52 2 L 14 10" fill="none" stroke="#4f46e5" stroke-opacity="0.7" stroke-width="2.8" stroke-linecap="round"/>
        <circle cx="-30" cy="18" r="10" fill="none" stroke="#4f46e5" stroke-opacity="0.5" stroke-width="1.5"/>
        <circle cx="30" cy="18" r="10" fill="none" stroke="#4f46e5" stroke-opacity="0.5" stroke-width="1.5"/>
        <!-- Shouting / tense inverted arch mouth -->
        <path d="M -24 72 Q 0 54 24 72 Q 0 80 -24 72 Z" fill="#ef4444" fill-opacity="0.08" stroke="#dc2626" stroke-opacity="0.65" stroke-width="1.8"/>
        <text x="112" y="-6" font-size="11" fill="#dc2626">眉心挤压</text>
        <text x="112" y="72" font-size="11" fill="#dc2626">嘴角下拉</text>
      </g>

      <!-- Cell 3: Shy/Sad (委屈/害羞) -->
      <rect x="48" y="484" width="536" height="372" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="68" y="512" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.82">③ 委屈/害羞：眉头八字抬起 + 泪光水汪 + 小波浪嘴</text>
      <g transform="translate(316, 658)">
        <circle cx="0" cy="-22" r="78" fill="none" stroke="#4f46e5" stroke-opacity="0.45" stroke-width="1.7"/>
        <path d="M -68 2 C -68 40, -56 76, -34 98 C -16 112, 16 112, 34 98 C 56 76, 68 40, 68 2" fill="none" stroke="#4f46e5" stroke-opacity="0.52" stroke-width="1.8" stroke-dasharray="5 4"/>
        <!-- 八-shaped inner-lifted brows -->
        <path d="M -54 -12 Q -32 -22 -12 -32" fill="none" stroke="#4f46e5" stroke-opacity="0.75" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 54 -12 Q 32 -22 12 -32" fill="none" stroke="#4f46e5" stroke-opacity="0.75" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Drooping outer upper eyelids -->
        <path d="M -54 8 Q -32 -12 -14 2" fill="none" stroke="#0284c7" stroke-opacity="0.65" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M 14 2 Q 32 -12 54 8" fill="none" stroke="#0284c7" stroke-opacity="0.65" stroke-width="2.6" stroke-linecap="round"/>
        <ellipse cx="-32" cy="14" rx="13" ry="15" fill="none" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.4" stroke-dasharray="3 3"/>
        <ellipse cx="32" cy="14" rx="13" ry="15" fill="none" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.4" stroke-dasharray="3 3"/>
        <!-- Blush oval guides -->
        <ellipse cx="-44" cy="38" rx="16" ry="8" fill="#ec4899" fill-opacity="0.14"/>
        <ellipse cx="44" cy="38" rx="16" ry="8" fill="#ec4899" fill-opacity="0.14"/>
        <!-- Wavy hesitant mouth -->
        <path d="M -16 64 Q -8 58 0 64 Q 8 70 16 64" fill="none" stroke="#db2777" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round"/>
        <text x="114" y="-18" font-size="11" fill="#4f46e5">眉头内抬</text>
        <text x="114" y="42" font-size="11" fill="#db2777">脸颊红晕</text>
      </g>

      <!-- Cell 4: Surprised (惊讶) -->
      <rect x="616" y="484" width="536" height="372" rx="14" fill="none" stroke="#d97706" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="636" y="512" font-size="13.5" font-weight="700" fill="#d97706" fill-opacity="0.82">④ 惊讶睁眼：眉毛高挑 + 瞳孔微缩露眼白 + O 型口</text>
      <g transform="translate(884, 658)">
        <circle cx="0" cy="-22" r="78" fill="none" stroke="#d97706" stroke-opacity="0.45" stroke-width="1.7"/>
        <!-- Slightly elongated jaw for dropped chin -->
        <path d="M -68 2 C -68 42, -56 82, -34 108 C -16 122, 16 122, 34 108 C 56 82, 68 42, 68 2" fill="none" stroke="#d97706" stroke-opacity="0.52" stroke-width="1.8" stroke-dasharray="5 4"/>
        <!-- High arched brows -->
        <path d="M -52 -42 Q -32 -58 -14 -40" fill="none" stroke="#d97706" stroke-opacity="0.78" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M 14 -40 Q 32 -58 52 -42" fill="none" stroke="#d97706" stroke-opacity="0.78" stroke-width="2.4" stroke-linecap="round"/>
        <!-- Wide open eyes + smaller centered iris -->
        <ellipse cx="-32" cy="8" rx="19" ry="22" fill="none" stroke="#0284c7" stroke-opacity="0.65" stroke-width="2.2"/>
        <ellipse cx="32" cy="8" rx="19" ry="22" fill="none" stroke="#0284c7" stroke-opacity="0.65" stroke-width="2.2"/>
        <circle cx="-32" cy="10" r="8" fill="none" stroke="#0284c7" stroke-opacity="0.6" stroke-width="1.6"/>
        <circle cx="32" cy="10" r="8" fill="none" stroke="#0284c7" stroke-opacity="0.6" stroke-width="1.6"/>
        <!-- O-shaped open mouth -->
        <ellipse cx="0" cy="68" rx="13" ry="18" fill="#f59e0b" fill-opacity="0.1" stroke="#db2777" stroke-opacity="0.68" stroke-width="1.9"/>
        <text x="114" y="-42" font-size="11" fill="#d97706">眉弓高挑</text>
        <text x="114" y="72" font-size="11" fill="#db2777">下颌拉长</text>
      </g>
      `
    )
  },

  {
    id: 'tpl-anime-hair',
    name: '空气感头发结构架（发旋放射 + 蓬松外廓 + 大中小发束流线）',
    track: 'anime',
    lessonId: 'anime-5',
    description: '正面「发际线-蓬松层-前中后三层」分解架与 3/4 侧面发旋放射流线引导，彻底告别贴头皮假发。',
    imageUrl: './assets/diagrams/anime-face-hair.jpg',
    svgContent: wrapTemplateSVG(
      'ANIME-5 · 空气感头发：颅顶蓬松留空、发旋放射与大中小发束',
      '口诀：头发永远高出头骨一圈 · 所有发束追随发旋源头 · 大块定剪影，小丝造空气感',
      `
      <!-- Left: Front Volume Shell & 3-Layer Separation -->
      <rect x="48" y="92" width="536" height="764" rx="14" fill="none" stroke="#0284c7" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.82">区 1 · 正面发量外廓与前 / 侧 / 后三层分区</text>
      <text x="68" y="140" font-size="11.5" fill="#475569" fill-opacity="0.7">先画虚线头骨，再往外扩 15%~20% 画出蓬松发壳，最后分组切出刘海与侧发</text>

      <g transform="translate(316, 400)">
        <!-- Inner skull reference (dotted) -->
        <circle cx="0" cy="-42" r="106" fill="none" stroke="#94a3b8" stroke-opacity="0.55" stroke-width="1.6" stroke-dasharray="5 5"/>
        <!-- Outer elevated hair volume halo -->
        <path d="M -134 -26 C -138 -128, -76 -178, 0 -178 C 76 -178, 138 -128, 134 -26 C 132 48, 126 124, 146 210 C 90 228, -90 228, -146 210 C -126 124, -132 48, -134 -26 Z" fill="#38bdf8" fill-opacity="0.04" stroke="#0284c7" stroke-opacity="0.5" stroke-width="1.8" stroke-dasharray="7 5"/>
        <!-- Face contour inside -->
        <path d="M -90 -16 C -90 36, -78 76, -54 102 C -32 122, -16 130, 0 130 C 16 130, 32 122, 54 102 C 78 76, 90 36, 90 -16" fill="none" stroke="#475569" stroke-opacity="0.48" stroke-width="1.6"/>
        <!-- Neck & shoulder hint -->
        <path d="M -34 114 C -32 146, -38 172, -46 190 C -84 202, -124 212, -156 226" fill="none" stroke="#475569" stroke-opacity="0.38" stroke-width="1.5"/>
        <path d="M 34 114 C 32 146, 38 172, 46 190 C 84 202, 124 212, 156 226" fill="none" stroke="#475569" stroke-opacity="0.38" stroke-width="1.5"/>
        <!-- Crown hair whorl origin -->
        <circle cx="-18" cy="-154" r="6" fill="#db2777" fill-opacity="0.72"/>
        <circle cx="-18" cy="-154" r="14" fill="none" stroke="#db2777" stroke-opacity="0.45" stroke-width="1.4" stroke-dasharray="3 3"/>
        <!-- Radiation arcs for bangs (Layer 1: Front) -->
        <path d="M -18 -154 C -48 -118, -74 -58, -68 8" fill="none" stroke="#db2777" stroke-opacity="0.62" stroke-width="1.8"/>
        <path d="M -18 -154 C -24 -102, -32 -42, -14 14" fill="none" stroke="#db2777" stroke-opacity="0.62" stroke-width="1.8"/>
        <path d="M -18 -154 C 12 -106, 34 -48, 22 10" fill="none" stroke="#db2777" stroke-opacity="0.62" stroke-width="1.8"/>
        <path d="M -18 -154 C 48 -114, 78 -54, 74 4" fill="none" stroke="#db2777" stroke-opacity="0.62" stroke-width="1.8"/>
        <!-- Side lock S-ribbons (Layer 2: Side) -->
        <path d="M -98 -68 C -124 -8, -122 86, -86 164" fill="none" stroke="#4f46e5" stroke-opacity="0.58" stroke-width="2" stroke-dasharray="6 4"/>
        <path d="M 98 -68 C 124 -8, 122 86, 86 164" fill="none" stroke="#4f46e5" stroke-opacity="0.58" stroke-width="2" stroke-dasharray="6 4"/>
        <!-- Volume gap indicator -->
        <line x1="0" y1="-148" x2="0" y2="-176" stroke="#10b981" stroke-width="2.2"/>
        <text x="14" y="-188" font-size="11.5" font-weight="700" fill="#059669">↑ 蓬松留空厚度</text>
        <text x="-148" y="-148" font-size="11.5" font-weight="700" fill="#db2777" text-anchor="end">发旋起点 ●</text>
        <text x="-148" y="6" font-size="11" fill="#db2777" text-anchor="end">① 前发刘海组</text>
        <text x="-148" y="128" font-size="11" fill="#4f46e5" text-anchor="end">② 鬓角贴脸侧发</text>
        <text x="156" y="182" font-size="11" fill="#0284c7">③ 后发大背景</text>
      </g>

      <!-- Right: 3/4 Dynamic S-Ribbon Flow & Big/Medium/Small Practice -->
      <rect x="616" y="92" width="536" height="450" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="636" y="120" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.82">区 2 · 3/4 侧面动态飘发流线引导</text>

      <g transform="translate(866, 316)">
        <!-- 3/4 Skull -->
        <circle cx="0" cy="-22" r="88" fill="none" stroke="#94a3b8" stroke-opacity="0.55" stroke-width="1.6" stroke-dasharray="5 5"/>
        <path d="M -82 -4 C -84 32, -68 78, -36 106 C -10 104, 24 84, 42 52" fill="none" stroke="#475569" stroke-opacity="0.48" stroke-width="1.6"/>
        <!-- Crown origin -->
        <circle cx="10" cy="-126" r="5.5" fill="#db2777" fill-opacity="0.75"/>
        <!-- Elevated sweeping S-ribbons -->
        <path d="M 10 -126 C -54 -128, -110 -78, -104 6 C -98 34, -84 52, -74 62" fill="none" stroke="#db2777" stroke-opacity="0.6" stroke-width="2" marker-end="url(#tpl-arrow)"/>
        <path d="M 10 -126 C 68 -130, 126 -80, 134 10 C 142 84, 178 134, 218 148" fill="none" stroke="#4f46e5" stroke-opacity="0.62" stroke-width="2.2" marker-end="url(#tpl-arrow-indigo)"/>
        <path d="M 10 -126 C 84 -102, 114 -24, 102 68 C 92 128, 136 162, 184 176" fill="none" stroke="#4f46e5" stroke-opacity="0.48" stroke-width="1.8" stroke-dasharray="6 4"/>
        <path d="M 42 -68 C 68 -10, 56 64, 18 128" fill="none" stroke="#10b981" stroke-opacity="0.6" stroke-width="1.8" stroke-dasharray="5 4"/>
        <text x="150" y="-82" font-size="11.5" font-weight="700" fill="#4f46e5">顺风 S 丝带走向</text>
        <text x="-156" y="-82" font-size="11" fill="#db2777">刘海顺额头拱起</text>
      </g>

      <!-- Bottom Right: Big / Medium / Small Ribbon Drill -->
      <rect x="616" y="562" width="536" height="294" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="636" y="590" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.82">区 3 · 大 / 中 / 小发束节奏练手槽（禁止锯齿等宽！）</text>
      <g transform="translate(656, 622)">
        <!-- Big ribbon -->
        <path d="M 24 10 C 8 68, 48 126, 22 198 C 64 134, 88 70, 62 10 Z" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.58" stroke-width="1.8"/>
        <text x="44" y="218" font-size="11.5" font-weight="700" fill="#059669" text-anchor="middle">大发束 (定主型)</text>
        <!-- Medium ribbon -->
        <path d="M 164 10 C 154 66, 184 122, 166 192 C 194 132, 206 68, 190 10 Z" fill="#0284c7" fill-opacity="0.08" stroke="#0284c7" stroke-opacity="0.58" stroke-width="1.8"/>
        <text x="178" y="218" font-size="11.5" font-weight="700" fill="#0284c7" text-anchor="middle">中发束 (分层次)</text>
        <!-- Small stray strands -->
        <path d="M 286 12 C 276 74, 304 124, 294 186" fill="none" stroke="#4f46e5" stroke-opacity="0.68" stroke-width="1.8"/>
        <path d="M 306 20 C 318 76, 298 134, 320 182" fill="none" stroke="#4f46e5" stroke-opacity="0.58" stroke-width="1.4"/>
        <text x="302" y="218" font-size="11.5" font-weight="700" fill="#4f46e5" text-anchor="middle">小发丝 (透气感)</text>
        <!-- Combined combo guide -->
        <path d="M 384 12 C 368 68, 408 124, 384 192 C 414 136, 430 74, 412 12" fill="#db2777" fill-opacity="0.06" stroke="#db2777" stroke-opacity="0.58" stroke-width="1.6"/>
        <path d="M 420 18 C 436 74, 422 132, 444 180" fill="none" stroke="#db2777" stroke-opacity="0.62" stroke-width="1.5"/>
        <text x="412" y="218" font-size="11.5" font-weight="700" fill="#db2777" text-anchor="middle">组合穿插 (7:2:1)</text>
      </g>
      `
    )
  },

  {
    id: 'tpl-anime-bust',
    name: '颈肩锁骨解剖衔接 + 半身像黄金构图框',
    track: 'anime',
    lessonId: 'anime-6',
    description: '左侧提供胸锁乳突肌 V 型引导、斜方肌缓坡与锁骨 S 线架；右侧提供三分法半身构图与头肩错位动势框。',
    imageUrl: './assets/diagrams/anime-body-pose.jpg',
    svgContent: wrapTemplateSVG(
      'ANIME-6 · 颈肩锁骨衔接与半身像构图节奏',
      '口诀：胸锁乳突肌汇聚胸骨窝 · 斜方肌呈柔和斜坡 · 头肩反向微倾立刻出灵动感',
      `
      <!-- Left: Anatomical Neck-Collarbone-Shoulder Scaffold -->
      <rect x="48" y="92" width="536" height="764" rx="14" fill="none" stroke="#0284c7" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.82">区 1 · 颈部圆柱、胸锁乳突肌 V 型与锁骨衔接架</text>

      <g transform="translate(316, 300)">
        <!-- Head Loomis reference -->
        <circle cx="0" cy="-64" r="82" fill="none" stroke="#0284c7" stroke-opacity="0.42" stroke-width="1.6"/>
        <path d="M -72 -42 C -72 0, -58 40, -34 62 C -14 74, 14 74, 34 62 C 58 40, 72 0, 72 -42" fill="none" stroke="#0284c7" stroke-opacity="0.5" stroke-width="1.8" stroke-dasharray="5 4"/>
        <!-- Neck cylinder -->
        <path d="M -36 52 C -34 94, -36 132, -44 162" fill="none" stroke="#4f46e5" stroke-opacity="0.62" stroke-width="2"/>
        <path d="M 36 52 C 34 94, 36 132, 44 162" fill="none" stroke="#4f46e5" stroke-opacity="0.62" stroke-width="2"/>
        <!-- Sternocleidomastoid (SCM) V-tendons from behind ears to suprasternal notch -->
        <path d="M -56 26 C -42 84, -22 136, -6 178" fill="none" stroke="#db2777" stroke-opacity="0.68" stroke-width="1.8" stroke-dasharray="5 3"/>
        <path d="M 56 26 C 42 84, 22 136, 6 178" fill="none" stroke="#db2777" stroke-opacity="0.68" stroke-width="1.8" stroke-dasharray="5 3"/>
        <!-- Suprasternal notch (胸骨窝) -->
        <circle cx="0" cy="182" r="5" fill="#db2777" fill-opacity="0.72"/>
        <!-- Trapezius gentle slope -->
        <path d="M -42 138 C -76 160, -118 178, -162 192" fill="none" stroke="#059669" stroke-opacity="0.62" stroke-width="2"/>
        <path d="M 42 138 C 76 160, 118 178, 162 192" fill="none" stroke="#059669" stroke-opacity="0.62" stroke-width="2"/>
        <!-- Clavicle S-curves -->
        <path d="M -12 186 C -54 178, -108 188, -158 198" fill="none" stroke="#d97706" stroke-opacity="0.75" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M 12 186 C 54 178, 108 188, 158 198" fill="none" stroke="#d97706" stroke-opacity="0.75" stroke-width="2.4" stroke-linecap="round"/>
        <!-- Rounded deltoid shoulder spheres -->
        <circle cx="-170" cy="228" r="42" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.6" stroke-dasharray="5 4"/>
        <circle cx="170" cy="228" r="42" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.6" stroke-dasharray="5 4"/>
        <!-- Ribcage tapered upper torso guide -->
        <path d="M -140 248 C -132 334, -106 410, -88 470 L 88 470 C 106 410, 132 334, 140 248" fill="none" stroke="#0284c7" stroke-opacity="0.4" stroke-width="1.7" stroke-dasharray="6 5"/>
        <!-- Center sternum line -->
        <line x1="0" y1="182" x2="0" y2="470" stroke="#0284c7" stroke-opacity="0.35" stroke-width="1.3" stroke-dasharray="6 4"/>
        <!-- Anatomical callouts -->
        <text x="72" y="106" font-size="11.5" font-weight="700" fill="#db2777">胸锁乳突肌 V 型</text>
        <text x="116" y="152" font-size="11.5" font-weight="700" fill="#059669">斜方肌缓坡</text>
        <text x="0" y="216" font-size="11.5" font-weight="700" fill="#db2777" text-anchor="middle">胸骨窝 (锁骨锚点)</text>
        <text x="-170" y="294" font-size="11" fill="#0284c7" text-anchor="middle">三角肌圆肩</text>
        <text x="170" y="294" font-size="11" fill="#0284c7" text-anchor="middle">三角肌圆肩</text>
      </g>

      <!-- Right: Golden-Ratio Bust Framing & Head-Shoulder Counter-Tilt -->
      <rect x="616" y="92" width="536" height="764" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="636" y="120" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.82">区 2 · 半身像三分构图框（头肩反向微倾动势）</text>

      <!-- Inner portrait composition frame -->
      <g transform="translate(664, 152)">
        <rect x="0" y="0" width="440" height="668" rx="8" fill="#6366f1" fill-opacity="0.02" stroke="#4f46e5" stroke-opacity="0.55" stroke-width="2"/>
        <!-- Rule of thirds grid -->
        <line x1="147" y1="0" x2="147" y2="668" stroke="#6366f1" stroke-opacity="0.24" stroke-width="1.2" stroke-dasharray="5 5"/>
        <line x1="293" y1="0" x2="293" y2="668" stroke="#6366f1" stroke-opacity="0.24" stroke-width="1.2" stroke-dasharray="5 5"/>
        <line x1="0" y1="223" x2="440" y2="223" stroke="#ec4899" stroke-opacity="0.4" stroke-width="1.4" stroke-dasharray="5 5"/>
        <line x1="0" y1="445" x2="440" y2="445" stroke="#6366f1" stroke-opacity="0.24" stroke-width="1.2" stroke-dasharray="5 5"/>
        <!-- Tilted Head Scaffold (tilts right -8 deg) -->
        <g transform="translate(216, 204) rotate(8)">
          <circle cx="0" cy="-16" r="76" fill="none" stroke="#4f46e5" stroke-opacity="0.48" stroke-width="1.8"/>
          <path d="M -64 4 C -64 40, -52 72, -30 92 C -12 102, 12 102, 30 92 C 52 72, 64 40, 64 4" fill="none" stroke="#4f46e5" stroke-opacity="0.5" stroke-width="1.8" stroke-dasharray="5 4"/>
          <line x1="-88" y1="12" x2="88" y2="12" stroke="#db2777" stroke-opacity="0.58" stroke-width="1.5"/>
        </g>
        <!-- Counter-tilted Shoulder Axis (tilts opposite -7 deg) -->
        <line x1="68" y1="398" x2="372" y2="352" stroke="#10b981" stroke-opacity="0.72" stroke-width="2.4"/>
        <!-- Flowing S-spine rhythm line -->
        <path d="M 224 106 C 216 238, 224 342, 212 478 C 204 548, 218 612, 226 656" fill="none" stroke="#d97706" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="6 4"/>
        <!-- Torso trapezoid scaffold -->
        <path d="M 94 394 C 110 490, 126 576, 134 666 M 346 356 C 324 468, 308 568, 300 666" fill="none" stroke="#4f46e5" stroke-opacity="0.42" stroke-width="1.8" stroke-dasharray="6 4"/>
        <!-- Composition callouts -->
        <text x="16" y="216" font-size="11" font-weight="700" fill="#db2777">上三分线 = 视点眼线</text>
        <text x="16" y="388" font-size="11" font-weight="700" fill="#059669">肩线反向倾斜</text>
        <text x="236" y="546" font-size="11" font-weight="700" fill="#d97706">躯干微 S 动势</text>
      </g>
      `
    )
  },

  {
    id: 'tpl-anime-folds',
    name: '服装衣褶三型骨架（重力褶 / 拉力褶 / 袖口堆积褶）',
    track: 'anime',
    lessonId: 'anime-7',
    description: '三区专项衣褶练习架：标注明确支撑应力点、弯曲肘部张力放射线与袖口/裙摆 S 丝带转折。',
    imageUrl: './assets/diagrams/anime-body-pose.jpg',
    svgContent: wrapTemplateSVG(
      'ANIME-7 · 服装衣褶入门：找准应力支点，区分重力、拉力与堆积褶',
      '口诀：无支点不生褶 · 重力垂直下挂 · 拉力指向关节 · 堆积呈管状/Z字堆叠',
      `
      <!-- Zone 1: Gravity / Pipe Folds -->
      <rect x="48" y="92" width="352" height="764" rx="14" fill="none" stroke="#0284c7" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="224" y="122" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.82" text-anchor="middle">区 1 · 重力褶 (管状垂坠)</text>
      <text x="224" y="142" font-size="11" fill="#475569" text-anchor="middle">由肩/腰高点自然垂下，下摆呈 S 波浪</text>

      <g transform="translate(224, 210)">
        <!-- Two support pin anchors -->
        <circle cx="-78" cy="0" r="6" fill="#db2777" fill-opacity="0.78"/>
        <circle cx="78" cy="0" r="6" fill="#db2777" fill-opacity="0.78"/>
        <text x="-78" y="-14" font-size="11" font-weight="700" fill="#db2777" text-anchor="middle">支点 A</text>
        <text x="78" y="-14" font-size="11" font-weight="700" fill="#db2777" text-anchor="middle">支点 B</text>
        <!-- Draped top catenary -->
        <path d="M -78 0 Q 0 38 78 0" fill="none" stroke="#0284c7" stroke-opacity="0.62" stroke-width="2"/>
        <!-- Hanging pipe fold cones -->
        <path d="M -78 0 C -92 120, -118 280, -124 440" fill="none" stroke="#0284c7" stroke-opacity="0.58" stroke-width="2"/>
        <path d="M -38 14 C -44 130, -56 290, -52 446" fill="none" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="6 4"/>
        <path d="M 38 14 C 44 130, 56 290, 52 446" fill="none" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="6 4"/>
        <path d="M 78 0 C 92 120, 118 280, 124 440" fill="none" stroke="#0284c7" stroke-opacity="0.58" stroke-width="2"/>
        <!-- Wavy S-ribbon bottom hem -->
        <path d="M -124 440 C -100 472, -72 422, -52 446 C -26 476, 26 476, 52 446 C 72 422, 100 472, 124 440" fill="none" stroke="#0284c7" stroke-opacity="0.65" stroke-width="2.2"/>
        <!-- Gravity arrow -->
        <line x1="0" y1="86" x2="0" y2="210" stroke="#0284c7" stroke-opacity="0.55" stroke-width="2" marker-end="url(#tpl-arrow)"/>
        <text x="14" y="158" font-size="11" fill="#0284c7">重力垂直拉直</text>
        <text x="0" y="510" font-size="11.5" fill="#475569" text-anchor="middle">练习：在管状暗面补出明暗交界与下摆厚度</text>
      </g>

      <!-- Zone 2: Tension / Bent Elbow Folds -->
      <rect x="424" y="92" width="352" height="764" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="600" y="122" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.82" text-anchor="middle">区 2 · 拉力褶 (弯曲关节)</text>
      <text x="600" y="142" font-size="11" fill="#475569" text-anchor="middle">外侧绷紧拉直，内侧形成菱形/放射压缩褶</text>

      <g transform="translate(600, 440)">
        <!-- Upper arm & forearm bent cylinders -->
        <path d="M -112 -210 L -18 -20 L 116 -146" fill="none" stroke="#94a3b8" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 5"/>
        <!-- Outer stretched sleeve contour -->
        <path d="M -146 -184 C -114 -94, -76 -16, -24 34 C 34 26, 98 -44, 144 -116" fill="none" stroke="#4f46e5" stroke-opacity="0.62" stroke-width="2.2"/>
        <!-- Inner pinched sleeve contour -->
        <path d="M -78 -228 C -52 -164, -36 -112, -16 -68 C 18 -102, 54 -140, 88 -178" fill="none" stroke="#4f46e5" stroke-opacity="0.58" stroke-width="2"/>
        <!-- Tension anchor dot at inner crease -->
        <circle cx="-16" cy="-68" r="6" fill="#db2777" fill-opacity="0.8"/>
        <!-- Radiating tension vectors -->
        <path d="M -16 -68 C -46 -42, -74 -12, -88 10" fill="none" stroke="#db2777" stroke-opacity="0.65" stroke-width="1.8" marker-end="url(#tpl-arrow-indigo)"/>
        <path d="M -16 -68 C -18 -28, -22 4, -22 24" fill="none" stroke="#db2777" stroke-opacity="0.65" stroke-width="1.8" marker-end="url(#tpl-arrow-indigo)"/>
        <path d="M -16 -68 C 18 -46, 52 -24, 72 -14" fill="none" stroke="#db2777" stroke-opacity="0.65" stroke-width="1.8" marker-end="url(#tpl-arrow-indigo)"/>
        <text x="-16" y="-116" font-size="11.5" font-weight="700" fill="#db2777" text-anchor="middle">内弯压缩核心</text>
        <text x="-20" y="72" font-size="11.5" font-weight="700" fill="#4f46e5" text-anchor="middle">外肘绷直几乎无褶</text>

        <!-- Second practice bent arm below -->
        <g transform="translate(0, 236)">
          <path d="M -120 -44 L -8 56 L 112 -22" fill="none" stroke="#6366f1" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 4"/>
          <circle cx="-6" cy="20" r="5" fill="#db2777" fill-opacity="0.68"/>
          <text x="0" y="106" font-size="11.5" fill="#475569" text-anchor="middle">独立练手：沿弯臂骨架画放射拉力褶</text>
        </g>
      </g>

      <!-- Zone 3: Pooling / Zig-zag Cuff Folds -->
      <rect x="800" y="92" width="352" height="764" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="976" y="122" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.82" text-anchor="middle">区 3 · 堆积褶 (袖口 / 裤脚)</text>
      <text x="976" y="142" font-size="11" fill="#475569" text-anchor="middle">布料遇阻横向堆叠，轮廓呈错落 Z 字起伏</text>

      <g transform="translate(976, 220)">
        <!-- Inner arm cylinder -->
        <rect x="-36" y="0" width="72" height="360" rx="28" fill="none" stroke="#94a3b8" stroke-opacity="0.45" stroke-width="1.5" stroke-dasharray="5 5"/>
        <!-- Tight cuff ring anchor -->
        <ellipse cx="0" cy="340" rx="44" ry="14" fill="#10b981" fill-opacity="0.1" stroke="#059669" stroke-opacity="0.72" stroke-width="2"/>
        <!-- Alternating Z-bulge pooling sleeve guides -->
        <path d="M -52 10 C -58 96, -74 148, -68 186 C -90 210, -88 256, -64 274 C -84 294, -76 328, -44 340" fill="none" stroke="#059669" stroke-opacity="0.65" stroke-width="2"/>
        <path d="M 52 10 C 60 88, 72 134, 62 174 C 86 196, 86 244, 66 266 C 84 286, 76 324, 44 340" fill="none" stroke="#059669" stroke-opacity="0.65" stroke-width="2"/>
        <!-- Diagonal staggered fold crease guides -->
        <path d="M -64 196 Q 0 218 58 184" fill="none" stroke="#059669" stroke-opacity="0.52" stroke-width="1.6" stroke-dasharray="5 3"/>
        <path d="M -58 274 Q 4 292 64 268" fill="none" stroke="#059669" stroke-opacity="0.52" stroke-width="1.6" stroke-dasharray="5 3"/>
        <path d="M -48 318 Q 2 332 52 314" fill="none" stroke="#059669" stroke-opacity="0.52" stroke-width="1.6" stroke-dasharray="5 3"/>
        <text x="0" y="388" font-size="11.5" font-weight="700" fill="#059669" text-anchor="middle">收口阻挡点 (袖口/鞋口)</text>
        <text x="0" y="418" font-size="11" fill="#475569" text-anchor="middle">左右折痕错开高度，切忌对称画成米其林</text>

        <!-- Practice box below -->
        <rect x="-132" y="454" width="264" height="148" rx="10" fill="none" stroke="#10b981" stroke-opacity="0.32" stroke-dasharray="4 4"/>
        <ellipse cx="0" cy="574" rx="46" ry="12" fill="none" stroke="#059669" stroke-opacity="0.58" stroke-width="1.8"/>
        <text x="0" y="514" font-size="11.5" fill="#059669" fill-opacity="0.78" text-anchor="middle">空白练习：在此堆出 3 层错落袜口/裤脚褶</text>
      </g>
      `
    )
  },

  {
    id: 'tpl-anime-cel',
    name: '日系半身清稿线 + 赛璐璐二分阴影切割底图',
    track: 'anime',
    lessonId: 'anime-8',
    description: '高清闭合日系半身像线稿（多层级线宽），附左上方 45° 赛璐璐二分投影虚线引导。',
    imageUrl: './assets/templates/tpl-anime-cel-lineart.jpg',
    svgContent: PLATE_TPL_ANIME_CEL
  }
];

// ============================================================================
// ✨ ANIME LESSONS (8 Progressive Lessons: anime-1 .. anime-8)
// ============================================================================

export const ANIME_LESSONS = [
  {
    id: 'anime-1',
    track: 'anime',
    tier: 'beginner',
    order: 1,
    title: '二次元十字球：正与3/4头型',
    mantra: '先画圆球与颞部切面，顺滑曲线轻收下巴，绝不画死板五边形。',
    subtitle: '用十字球稳住二次元头骨与下颌弧度',
    difficulty: '入门 ⭐',
    estimatedMinutes: 20,
    templateId: 'tpl-anime-head',
    cheatSheetSVG: PLATE_ANIME_HEAD_LOOMIS,
    keyPoints: [
      { title: '眼线在全头中段', detail: '二次元眼睛落在头高 1/2 偏下处，留足饱满额头和颅顶。' },
      { title: '颞部切面定耳朵', detail: '3/4 侧面在球侧切出 2/3 椭圆，耳朵稳落其后下象限。' },
      { title: '下颌用流畅曲线', detail: '从颧骨微凸轻滑至下巴尖，少用尖锐折角才显年轻柔和。' }
    ],
    pitfalls: [
      { wrong: '把眼睛画在圆球正中甚至偏上，额头极窄。', fix: '圆球底部当鼻尖附近，眼线放圆球下半段即可显嫩。' },
      { wrong: '3/4 侧面仍用直线画中线，整张脸像贴平纸片。', fix: '中线必须顺着球体弧度向外微微弯曲包裹。' }
    ],
    checklist: [
      '用底图区 1 与区 2 各画 1 个正/侧面头骨',
      '在区 3 空白圆球脱稿画出 3/4 中线与下颌',
      '按 H 键水平翻转检查左右脸颊弧度是否自然'
    ],
    videos: [
      {
        id: 'vid-anime1-bili',
        title: '零基础二次元头像：十字球与 3/4 侧面下颌画法',
        author: 'B站二次元日系教程精选',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E4%BA%8C%E6%AC%A1%E5%85%83+%E5%8D%81%E5%AD%97%E7%90%83+%E5%A4%B4%E5%83%8F+3%2F4%E4%BE%A7%E9%9D%A2',
        keywords: '二次元 十字球 头像 3/4侧面',
        duration: '约14分钟',
        timestamps: [
          { time: '00:00', label: '日系萌系头骨与写实卢米斯比例微调' },
          { time: '05:20', label: '3/4 侧面远侧脸颊微凸与下巴连线技巧' },
          { time: '10:30', label: '水平翻转自检歪脸的实战演示' }
        ],
        summary: '拆解二次元正脸与 3/4 侧面十字球定型全流程。'
      },
      {
        id: 'vid-anime1-yt',
        title: 'How to Draw Anime Heads from Any Angle (Chommang)',
        author: 'Chommang Drawing',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Chommang+draw+anime+head+Loomis+method',
        keywords: 'Chommang draw anime head Loomis method',
        duration: '约12分钟',
        timestamps: [
          { time: '00:00', label: '球体与侧面切圆的极简起型' },
          { time: '04:40', label: '柔顺下颌线条与颈部衔接' },
          { time: '08:50', label: '五官锚点快速定位示范' }
        ],
        summary: '韩日系极简 Loomis 头部起型，线条清澈易跟画。'
      }
    ]
  },

  {
    id: 'anime-2',
    track: 'anime',
    tier: 'beginner',
    order: 2,
    title: '仰视与俯视头像透视规律',
    mantra: '仰视纬线向上拱∩露下颌底，俯视纬线向下弯∪显大颅顶。',
    subtitle: '掌握球面纬线弧度与耳朵反向升降规律',
    difficulty: '入门 ⭐',
    estimatedMinutes: 20,
    templateId: 'tpl-anime-angles',
    cheatSheetSVG: PLATE_ANIME_HEAD_LOOMIS,
    keyPoints: [
      { title: '球面纬线定仰俯', detail: '把眼线想成绕球的橡皮筋：抬头向上拱∩，低头向下弯∪。' },
      { title: '耳朵跷跷板法则', detail: '仰视时耳位低于眼睛，俯视时耳位明显高于眼睛。' },
      { title: '下颌底面与颅顶', detail: '仰视必露出下巴底面的小三角，俯视则放大后脑颅顶。' }
    ],
    pitfalls: [
      { wrong: '画仰视时忘记交代下颌底面，脖子直接接在下巴尖。', fix: '在下巴尖与脖子间留出弧形底面阴影，立体感立刻出来。' },
      { wrong: '画俯视时把下巴拉得和平视一样长，显得脸太长。', fix: '俯视时下庭透视压缩，嘴到下巴的距离应明显缩短。' }
    ],
    checklist: [
      '沿底图区 1~3 临摹仰、平、俯视三组头型',
      '在区 4 空球独立画出纬线弧度与耳朵高低',
      '检查仰视是否露下颌底、俯视颅顶是否饱满'
    ],
    videos: [
      {
        id: 'vid-anime2-bili',
        title: '一招搞懂头像仰视与俯视！球面纬线透视精讲',
        author: 'B站日系头像透视教程',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E4%BA%8C%E6%AC%A1%E5%85%83+%E5%A4%B4%E5%83%8F+%E4%BB%B0%E8%A7%86+%E4%BF%AF%E8%A7%86+%E9%80%8F%E8%A7%86',
        keywords: '二次元 头像 仰视 俯视 透视',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: '为什么抬头低头总画得像歪嘴' },
          { time: '04:30', label: '仰视下颌底面与鼻孔透视简化' },
          { time: '09:40', label: '俯视大颅顶与下庭压缩实战' }
        ],
        summary: '用橡皮筋球面法则讲透仰视与俯视头像比例。'
      },
      {
        id: 'vid-anime2-yt',
        title: 'Drawing Heads Looking Up and Down (Marc Brunet)',
        author: 'Marc Brunet',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Marc+Brunet+draw+head+looking+up+and+down',
        keywords: 'Marc Brunet draw head looking up and down',
        duration: '约13分钟',
        timestamps: [
          { time: '00:00', label: '耳位与眼线的跷跷板规律' },
          { time: '05:10', label: '仰视下颌底面体块拆解' },
          { time: '09:20', label: '俯视五官汇聚与发量透视' }
        ],
        summary: '直观演示任意仰俯角度的头骨与五官定位法。'
      }
    ]
  },

  {
    id: 'anime-3',
    track: 'anime',
    tier: 'beginner',
    order: 3,
    title: '动漫五官定位：眼鼻口比例',
    mantra: '眼距留一宽、上睫毛为主弧、虹膜微藏上睑、鼻口点到即止。',
    subtitle: '掌握二次元眼框结构、远侧收缩与鼻口极简概括',
    difficulty: '入门 ⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-anime-features',
    cheatSheetSVG: PLATE_ANIME_FACE_HAIR,
    keyPoints: [
      { title: '上睫毛重、下睑轻', detail: '用粗而有弧度的上睫毛定眼型，下眼睑仅轻带或留空透气。' },
      { title: '虹膜微藏上眼睑下', detail: '正常视线虹膜顶端藏入上睑，露全圆仅用于惊恐表情。' },
      { title: '鼻口缩略保清爽', detail: '鼻子只画鼻尖小影，嘴唇中段微断并轻点下唇阴影。' }
    ],
    pitfalls: [
      { wrong: '3/4 侧面远眼和近眼一样宽，透视穿帮。', fix: '远侧眼睛水平变窄，且鼻梁可轻微遮挡远眼内眼角。' },
      { wrong: '两眼高光位置左右对称（斗鸡眼错觉）。', fix: '双眼高光须偏向同一光源方向（如全部偏左上角）。' }
    ],
    checklist: [
      '在底图区 1 按五眼标尺画出对称双眼与极简鼻口',
      '在区 2 练出 3/4 侧面远窄近宽的透视眼框',
      '完成区 3 圆眼、挑眼与半眯眼三组不同气质眼型'
    ],
    videos: [
      {
        id: 'vid-anime3-bili',
        title: '日系二次元眼睛画法全解析：眼框、瞳孔与神态',
        author: 'B站日系插画五官教程',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E4%BA%8C%E6%AC%A1%E5%85%83+%E7%9C%BC%E7%9D%9B+%E4%BA%94%E5%AE%98+%E7%94%BB%E6%B3%95+%E6%95%99%E7%A8%8B',
        keywords: '二次元 眼睛 五官 画法 教程',
        duration: '约16分钟',
        timestamps: [
          { time: '00:00', label: '上睫毛线条粗细与眼眶立体厚度' },
          { time: '06:15', label: '不同性格（萌/飒/冷）的眼型比例差异' },
          { time: '11:40', label: '鼻子与嘴唇的日系极简缩略技巧' }
        ],
        summary: '系统拆解日系眼型气质差异与鼻口极简画法。'
      },
      {
        id: 'vid-anime3-yt',
        title: 'How to Draw Anime Eyes & Facial Features (SomeNormalArtist)',
        author: 'SomeNormalArtist',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=draw+anime+eyes+nose+mouth+proportions+tutorial',
        keywords: 'draw anime eyes nose mouth proportions tutorial',
        duration: '约11分钟',
        timestamps: [
          { time: '00:00', label: '五眼比例与 3/4 远侧眼透视收缩' },
          { time: '04:30', label: '上眼睑阴影与高光统一光源' },
          { time: '08:10', label: '鼻影与唇线透气感处理' }
        ],
        summary: '简明演示动漫眼睛透视收缩与高光统一原则。'
      }
    ]
  },

  {
    id: 'anime-4',
    track: 'anime',
    tier: 'foundation',
    order: 4,
    title: '表情联动：眉眼嘴与脸颊挤压',
    mantra: '绝不单换嘴巴！眉毛、下眼睑、脸颊与下巴必须同步联动。',
    subtitle: '让喜怒哀乐活起来的五官肌肉挤压规律',
    difficulty: '基础 ⭐⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-anime-expressions',
    cheatSheetSVG: PLATE_ANIME_EXPRESSIONS,
    keyPoints: [
      { title: '眉毛是情绪总开关', detail: '舒展拱起=喜、内压成V=怒、内抬成八=委屈、高挑=惊。' },
      { title: '脸颊顶起下眼睑', detail: '真笑时苹果肌会推高下眼睑，下眼线变平甚至向上微拱。' },
      { title: '大张嘴必降下巴', detail: '呐喊或大笑时下颌骨向下旋转，整体脸型略微拉长。' }
    ],
    pitfalls: [
      { wrong: '画大笑或怒吼时，下巴位置跟闭嘴时完全一样。', fix: '张嘴幅度越大，下巴尖需对应下移半个至一个嘴高。' },
      { wrong: '表达愤怒只压低眉毛，眼睛仍画得又大又无神。', fix: '怒时上睑切平压住虹膜，瞳孔略微收缩更有压迫感。' }
    ],
    checklist: [
      '完成底图喜、怒、委屈、惊 4 格联动表情',
      '遮住嘴巴单看眉眼，确认 4 种情绪能分辨',
      '检查大笑与惊讶两格的下巴是否略有下移'
    ],
    videos: [
      {
        id: 'vid-anime4-bili',
        title: '告别面瘫！二次元人物表情肌肉联动与情绪表现',
        author: 'B站角色表情设计教程',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E4%BA%8C%E6%AC%A1%E5%85%83+%E8%A1%A8%E6%83%85+%E7%94%BB%E6%B3%95+%E7%9C%89%E7%9C%BC%E8%81%94%E5%8A%A8',
        keywords: '二次元 表情 画法 眉眼联动',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: '假笑 vs 真笑：下眼睑与苹果肌的区别' },
          { time: '05:40', label: '喜怒哀乐四大基础表情的眉眼嘴公式' },
          { time: '11:10', label: '张嘴幅度与下颌下沉幅度对照' }
        ],
        summary: '详解眉眼脸颊联动公式，一招治好角色面瘫。'
      },
      {
        id: 'vid-anime4-yt',
        title: 'How to Draw Expressive Anime Faces (Ethan Becker / Chommang)',
        author: 'Anime Art Tutorial',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=how+to+draw+expressive+anime+expressions+tutorial',
        keywords: 'how to draw expressive anime expressions tutorial',
        duration: '约12分钟',
        timestamps: [
          { time: '00:00', label: '眉毛与眼眶挤压的张力规律' },
          { time: '04:50', label: '微表情与夸张表情的拉伸压缩' },
          { time: '08:40', label: '四格表情实战速写演示' }
        ],
        summary: '对比普通表情与富有张力的挤压拉伸表情。'
      }
    ]
  },

  {
    id: 'anime-5',
    track: 'anime',
    tier: 'foundation',
    order: 5,
    title: '空气感头发：发旋与大中小发束',
    mantra: '先架蓬松外廓，再从发旋放射出大中小穿插的丝带发束。',
    subtitle: '告别贴头皮假发与均匀锯齿刘海，画出日系空气感',
    difficulty: '基础 ⭐⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-anime-hair',
    cheatSheetSVG: PLATE_ANIME_FACE_HAIR,
    keyPoints: [
      { title: '头发永远高于头骨', detail: '先画虚线头骨再外扩 15% 蓬松层，发根微拱才有空气感。' },
      { title: '一切发束归于发旋', detail: '在头顶定好发旋或分缝，所有发丝顺着头球曲面放射生长。' },
      { title: '大中小发束节奏', detail: '用大块定剪影、中块分层次、少量细碎发丝打破呆板。' }
    ],
    pitfalls: [
      { wrong: '一上来就一根根细描头发丝，轮廓散乱没有体积。', fix: '先合拢画出前/侧/后三大发片体块，最后再切分小发丝。' },
      { wrong: '把刘海切成宽度、长度完全一样的等距三角形。', fix: '刻意拉开每撮刘海的宽窄、长短与弧度，留出透气额缝。' }
    ],
    checklist: [
      '在区 1 标出发旋，分出前刘海、侧发与后发',
      '在区 2 顺风画出 3/4 飘逸 S 丝带发束',
      '在区 3 练出大/中/小三种节奏的收尖发片'
    ],
    videos: [
      {
        id: 'vid-anime5-bili',
        title: '空气感二次元头发终极教程：发旋、分组与丝带穿插',
        author: 'B站日系画师头发专题',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E4%BA%8C%E6%AC%A1%E5%85%83+%E5%A4%B4%E5%8F%91+%E7%A9%BA%E6%B0%94%E6%84%9F+%E5%A4%A7%E4%B8%AD%E5%B0%8F%E5%88%86%E7%BB%84',
        keywords: '二次元 头发 空气感 大中小分组',
        duration: '约18分钟',
        timestamps: [
          { time: '00:00', label: '为什么头发像塑料头盔：蓬松厚度法则' },
          { time: '06:20', label: '前发/侧发/后发三层大块切分演示' },
          { time: '12:50', label: '用小发丝和透气缝隙拉满日系空气感' }
        ],
        summary: '从头骨外扩到丝带分组，彻底攻克二次元头发。'
      },
      {
        id: 'vid-anime5-yt',
        title: 'How to Draw Anime Hair Easily (Saito Naoki / Bluebiscuits)',
        author: 'Bluebiscuits',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=how+to+draw+anime+hair+ribbons+flow+tutorial',
        keywords: 'how to draw anime hair ribbons flow tutorial',
        duration: '约11分钟',
        timestamps: [
          { time: '00:00', label: '把头发想象成有厚度的丝带' },
          { time: '04:10', label: '发旋放射与大中小节奏搭配' },
          { time: '07:55', label: '风吹动势下的头发飘散规律' }
        ],
        summary: '直观的丝带化头发教程，轻松掌握飘逸感。'
      }
    ]
  },

  {
    id: 'anime-6',
    track: 'anime',
    tier: 'foundation',
    order: 6,
    title: '颈肩锁骨衔接与半身像构图',
    mantra: '胸锁乳突肌汇入胸骨窝，斜方肌缓坡接圆肩，头肩反向微倾。',
    subtitle: '把头像自然接入身体，建立耐看的半身像节奏',
    difficulty: '基础 ⭐⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-anime-bust',
    cheatSheetSVG: PLATE_ANIME_BODY_POSE,
    keyPoints: [
      { title: '胸锁乳突肌定颈部', detail: '两根颈肌从耳后斜汇至胸骨窝，一转头就能体现颈部立体感。' },
      { title: '斜方肌与锁骨过渡', detail: '脖子通过斜方肌缓坡连向圆润三角肌，锁骨自胸骨窝微扬。' },
      { title: '头肩反向微倾构图', detail: '眼睛落在画幅上三分线附近，头与肩线反向倾 5°~10° 最耐看。' }
    ],
    pitfalls: [
      { wrong: '脖子画得过细或正垂直，像火柴人撑着大头。', fix: '侧面颈部应微微向前倾，宽度约为头宽的 1/3~2/5。' },
      { wrong: '把锁骨画成两条向下掉的死直线。', fix: '锁骨内端贴紧胸骨窝，外端略向上扬并带柔和 S 弧度。' }
    ],
    checklist: [
      '在区 1 标出胸骨窝、胸锁乳突肌与锁骨弧线',
      '在区 2 三分构图框完成头肩反向微倾草图',
      '检查肩膀外侧呈圆润三角肌而非直角折线'
    ],
    videos: [
      {
        id: 'vid-anime6-bili',
        title: '好看的脖子与锁骨怎么画？日系半身像颈肩衔接课',
        author: 'B站插画构图与人体教程',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E4%BA%8C%E6%AC%A1%E5%85%83+%E8%84%96%E5%AD%90+%E9%94%81%E9%AA%A8+%E8%82%A9%E8%86%80+%E5%8D%8A%E8%BA%AB%E5%83%8F',
        keywords: '二次元 脖子 锁骨 肩膀 半身像',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: '告别衣架肩：斜方肌与三角肌的缓坡弧度' },
          { time: '05:10', label: '胸锁乳突肌与胸骨窝在半侧面的画法' },
          { time: '10:35', label: '半身像头肩反向倾角构图示范' }
        ],
        summary: '专攻颈肩锁骨衔接与高颜值半身像三分构图。'
      },
      {
        id: 'vid-anime6-yt',
        title: 'How to Draw Neck, Shoulders & Collarbones (Marc Brunet)',
        author: 'Marc Brunet',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=how+to+draw+neck+shoulders+collarbone+anime',
        keywords: 'how to draw neck shoulders collarbone anime',
        duration: '约13分钟',
        timestamps: [
          { time: '00:00', label: '颈部微倾角度与男女颈宽差异' },
          { time: '04:50', label: '锁骨自行车把形 S 曲线记忆法' },
          { time: '09:15', label: '半身像动态重心节奏演示' }
        ],
        summary: '用清晰几何块拆解颈肌、锁骨与半身像动势。'
      }
    ]
  },

  {
    id: 'anime-7',
    track: 'anime',
    tier: 'advanced',
    order: 7,
    title: '服装衣褶：重力、拉力与堆积褶',
    mantra: '先找支点再画褶：重力垂管、关节放射、袖口错落堆积。',
    subtitle: '掌握三大衣褶逻辑，让衣服贴合身体不杂乱',
    difficulty: '进阶 ⭐⭐⭐',
    estimatedMinutes: 30,
    templateId: 'tpl-anime-folds',
    cheatSheetSVG: PLATE_ANIME_BODY_POSE,
    keyPoints: [
      { title: '支点决定一切褶皱', detail: '肩、胸、肘、腰、膝是衣服的支撑点，所有折痕都从支点出发。' },
      { title: '外紧内松留白对比', detail: '弯曲外侧布料绷直几乎无褶，折痕集中在内弯压缩处。' },
      { title: '堆积褶左右错开画', detail: '袖口、袜口受阻堆积时，左右鼓包高低错开避免对称呆板。' }
    ],
    pitfalls: [
      { wrong: '每条衣褶线都从头画到尾，画面密密麻麻不透气。', fix: '长折痕配短折痕，受光平滑处果断留白才显布料高级。' },
      { wrong: '忽略布料下的圆柱身体体积，衣褶像画在平纸上。', fix: '先画出袖管与躯干的圆柱体块，让折痕顺着圆柱曲面绕行。' }
    ],
    checklist: [
      '在区 1 补全两点垂挂重力褶与 S 波浪下摆',
      '在区 2 沿弯臂骨架画出外紧内聚放射拉力褶',
      '在区 3 画出错落 Z 字鼓包的袖口堆积褶'
    ],
    videos: [
      {
        id: 'vid-anime7-bili',
        title: '衣褶不再瞎画！7大衣褶类型极简归类与日系实战',
        author: 'B站服装衣褶精讲教程',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E8%A1%A3%E8%A4%B6+%E7%94%BB%E6%B3%95+%E9%87%8D%E5%8A%9B%E8%A4%B6+%E6%8B%89%E5%8A%9B%E8%A4%B6+%E6%95%99%E7%A8%8B',
        keywords: '衣褶 画法 重力褶 拉力褶 教程',
        duration: '约18分钟',
        timestamps: [
          { time: '00:00', label: '先找支点：衣服为什么会产生折痕' },
          { time: '06:10', label: '袖子肘弯与裙摆垂坠的疏密控制' },
          { time: '12:40', label: '用简练线条交代高质感日系衣褶' }
        ],
        summary: '化繁为简归类衣褶支点，快速摆脱盲目蹭线。'
      },
      {
        id: 'vid-anime7-yt',
        title: 'How to Draw Clothes & Folds Easily (Marc Brunet)',
        author: 'Marc Brunet',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Marc+Brunet+how+to+draw+clothes+and+folds',
        keywords: 'Marc Brunet how to draw clothes and folds',
        duration: '约14分钟',
        timestamps: [
          { time: '00:00', label: '重力褶、拉力褶与堆积褶三大母型' },
          { time: '05:30', label: '布料厚度与折叠阴影的画法' },
          { time: '10:00', label: '不同材质（棉/丝绸/厚外套）褶皱差异' }
        ],
        summary: '清晰分类核心衣褶力学与材质折痕规律。'
      }
    ]
  },

  {
    id: 'anime-8',
    track: 'anime',
    tier: 'advanced',
    order: 8,
    title: '日系线稿层级与赛璐璐二分',
    mantra: '外轮廓实、内结构稳、细节轻；赛璐璐先硬边二分再微透渐变。',
    subtitle: '打通日系清稿线宽层级与通透赛璐璐上色闭环',
    difficulty: '进阶 ⭐⭐⭐',
    estimatedMinutes: 30,
    templateId: 'tpl-anime-cel',
    cheatSheetSVG: PLATE_ANIME_CEL_SHEET,
    keyPoints: [
      { title: '外实、内稳、细节轻', detail: '剪影外轮廓最粗，内部穿插次之，鼻口和发丝线最轻盈。' },
      { title: '线条交汇加闭塞点', detail: '发束交叠或下颌转角处略加粗压实，线稿立刻出现素描感。' },
      { title: '赛璐璐先硬边切暗面', detail: '用硬边笔刷一口气切出刘海投影与颈影，暗部偏冷更通透。' }
    ],
    pitfalls: [
      { wrong: '画赛璐璐阴影时直接加黑降明度，肤色脏成死灰。', fix: '暗部色相往蓝紫或偏红方向微移，保持高纯度才显通透。' },
      { wrong: '不敢切大面积逆光暗部，导致画面亮暗不分明。', fix: '逆光先整体铺一层统一暗色，仅在边缘留锐利暖亮轮廓条。' }
    ],
    checklist: [
      '用 G 笔在区 1 勾三档线宽并加闭塞重音',
      '用马克笔在区 2 切出 45° 光硬边刘海与颈影',
      '在区 3 完成逆光大暗面与边缘亮条二分'
    ],
    videos: [
      {
        id: 'vid-anime8-bili',
        title: '日系线稿质感与赛璐璐通透二分上色全流程',
        author: 'B站赛璐璐插画精选课',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E6%97%A5%E7%B3%BB+%E7%BA%BF%E7%A8%BF%E5%B1%82%E7%BA%A7+%E8%B5%9B%E7%92%90%E7%92%90+%E4%BA%8C%E5%88%86%E4%B8%8A%E8%89%B2',
        keywords: '日系 线稿层级 赛璐璐 二分上色',
        duration: '约20分钟',
        timestamps: [
          { time: '00:00', label: '为什么日系商业线稿看起来干净又立体' },
          { time: '07:10', label: '赛璐璐皮肤暗部选色公式（绝不发灰）' },
          { time: '14:20', label: '顺光与逆光二分暗面切割示范' }
        ],
        summary: '打通商业级日系线宽层次与通透赛璐璐二分。'
      },
      {
        id: 'vid-anime8-yt',
        title: 'Anime Lineart Weight & Cel Shading Guide (Saito Naoki)',
        author: 'Saito Naoki',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=Saito+Naoki+lineart+cel+shading+tutorial',
        keywords: 'Saito Naoki lineart cel shading tutorial',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: '外轮廓与交汇闭塞线的黄金层级' },
          { time: '06:00', label: '硬边阴影与暖色交界过渡带技巧' },
          { time: '10:45', label: '逆光轮廓光氛围提升实战' }
        ],
        summary: '斋藤直葵亲授线稿层次与赛璐璐通透阴影秘诀。'
      }
    ]
  }
];

// ============================================================================
// 🐾 FURRY PRACTICE TEMPLATES (8 × 1200x900 Construction Scaffolds)
// ============================================================================

export const FURRY_TEMPLATES = [
  {
    id: 'tpl-furry-canine',
    name: '犬科动物头骨球 + 3D 梯形吻部三角度透视架',
    track: 'furry',
    lessonId: 'furry-1',
    description: '正面、3/4 与正侧面犬科头骨+梯形吻部棱柱架，明确额鼻台阶、顶/侧体面与下颌咬合，附底部 3 组空球挑战。',
    imageUrl: './assets/diagrams/furry-kemono-muzzle.jpg',
    svgContent: wrapTemplateSVG(
      'FURRY-1 · 动物头骨球体 + 犬科 3D 梯形吻部透视骨架',
      '口诀：吻部从球面眉心中线生长出来 · 必有清晰额鼻台阶 · 顶面收窄、两侧包颊、下颌轻托',
      `
      <!-- Top Row: 3 Angles (Front / 3/4 / Side Profile) -->
      <!-- 1. Front View -->
      <rect x="48" y="92" width="352" height="466" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="224" y="120" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.84" text-anchor="middle">① 正面：吻部向镜头前伸</text>
      <g transform="translate(224, 312)">
        <!-- Cranium sphere -->
        <circle cx="0" cy="-28" r="88" fill="#10b981" fill-opacity="0.04" stroke="#059669" stroke-opacity="0.52" stroke-width="1.9"/>
        <!-- Cheek fluff width guide -->
        <path d="M -88 -12 C -106 20, -98 62, -62 82 C -32 96, 32 96, 62 82 C 98 62, 106 20, 88 -12" fill="none" stroke="#059669" stroke-opacity="0.4" stroke-width="1.6" stroke-dasharray="5 4"/>
        <!-- Vertical centerline & brow line -->
        <line x1="0" y1="-126" x2="0" y2="128" stroke="#0284c7" stroke-opacity="0.45" stroke-width="1.3" stroke-dasharray="5 4"/>
        <line x1="-98" y1="-26" x2="98" y2="-26" stroke="#0284c7" stroke-opacity="0.42" stroke-width="1.3" stroke-dasharray="5 4"/>
        <!-- 3D Front Muzzle Box emerging from center -->
        <!-- Top bridge plane (trapezoid tapering from brow to nose) -->
        <path d="M -24 -18 L 24 -18 L 32 28 L -32 28 Z" fill="#0284c7" fill-opacity="0.08" stroke="#0284c7" stroke-opacity="0.62" stroke-width="1.8"/>
        <!-- Side cheek planes of muzzle -->
        <path d="M -24 -18 L -54 20 L -46 66 L -32 28" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.55" stroke-width="1.6"/>
        <path d="M 24 -18 L 54 20 L 46 66 L 32 28" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.55" stroke-width="1.6"/>
        <!-- Front muzzle plane & lower jaw -->
        <path d="M -46 66 C -26 78, 26 78, 46 66" fill="none" stroke="#059669" stroke-opacity="0.62" stroke-width="1.8"/>
        <path d="M -32 74 C -24 102, 24 102, 32 74" fill="none" stroke="#4f46e5" stroke-opacity="0.58" stroke-width="1.8" stroke-dasharray="5 3"/>
        <!-- Nose leather anchor -->
        <path d="M -22 28 C -22 18, 22 18, 22 28 C 20 42, 6 48, 0 50 C -6 48, -20 42, -22 28 Z" fill="#0f172a" fill-opacity="0.16" stroke="#0f172a" stroke-opacity="0.58" stroke-width="1.8"/>
        <text x="0" y="150" font-size="11.5" font-weight="700" fill="#0284c7" text-anchor="middle">鼻梁顶面窄 → 鼻头前突 → 下颌收底</text>
      </g>

      <!-- 2. 3/4 View (Hero Angle) -->
      <rect x="424" y="92" width="352" height="466" rx="14" fill="none" stroke="#0284c7" stroke-opacity="0.32" stroke-dasharray="6 6"/>
      <text x="600" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.85" text-anchor="middle">② 3/4 侧面：3D 梯形棱柱（核心）</text>
      <g transform="translate(612, 312)">
        <!-- Cranium sphere -->
        <circle cx="14" cy="-28" r="84" fill="#38bdf8" fill-opacity="0.04" stroke="#0284c7" stroke-opacity="0.54" stroke-width="2"/>
        <!-- Wrapped centerline + brow ridge -->
        <path d="M -18 -108 C -44 -76, -54 -44, -52 -16" fill="none" stroke="#db2777" stroke-opacity="0.6" stroke-width="1.6" stroke-dasharray="5 3"/>
        <path d="M -68 -26 Q -18 -20 68 -28" fill="none" stroke="#0284c7" stroke-opacity="0.42" stroke-width="1.3" stroke-dasharray="4 4"/>
        <!-- Stop (额鼻台阶) marker -->
        <circle cx="-52" cy="-16" r="4.5" fill="#db2777" fill-opacity="0.82"/>
        <!-- Coherent 3D Tapered Muzzle Prism emerging from the sphere -->
        <!-- Top nose-bridge plane -->
        <path d="M -52 -16 L -126 12 L -116 32 L -36 8 Z" fill="#38bdf8" fill-opacity="0.12" stroke="#0284c7" stroke-opacity="0.72" stroke-width="2"/>
        <!-- Near side cheek plane -->
        <path d="M -36 8 L -116 32 L -110 66 C -84 74, -44 74, -14 58 L -18 16 Z" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.65" stroke-width="1.8"/>
        <!-- Far front plane -->
        <path d="M -126 12 L -134 48 L -110 66 L -116 32 Z" fill="#4f46e5" fill-opacity="0.08" stroke="#4f46e5" stroke-opacity="0.58" stroke-width="1.6"/>
        <!-- Tucked lower jaw -->
        <path d="M -120 60 C -114 84, -76 92, -26 78 C -4 72, 16 60, 26 44" fill="none" stroke="#4f46e5" stroke-opacity="0.65" stroke-width="2" stroke-dasharray="5 3"/>
        <!-- Nose leather seated right on front prism tip -->
        <path d="M -130 14 C -122 8, -110 14, -112 28 C -114 38, -124 40, -132 34 C -136 28, -134 18, -130 14 Z" fill="#0f172a" fill-opacity="0.22" stroke="#0f172a" stroke-opacity="0.65" stroke-width="1.8"/>
        <!-- Muzzle forward perspective axis -->
        <path d="M -42 20 L -150 40" stroke="#0284c7" stroke-opacity="0.65" stroke-width="1.8" marker-end="url(#tpl-arrow)"/>
        <!-- Labels -->
        <text x="-88" y="-32" font-size="11" font-weight="700" fill="#db2777">额鼻台阶(Stop)</text>
        <text x="-152" y="10" font-size="11" fill="#0284c7">鼻梁顶面</text>
        <text x="-66" y="106" font-size="11" fill="#4f46e5">下颌轻收吻底</text>
        <text x="12" y="150" font-size="11.5" font-weight="700" fill="#0284c7" text-anchor="middle">吻部轴线直穿圆球中心，绝不侧歪贴边</text>
      </g>

      <!-- 3. Side Profile -->
      <rect x="800" y="92" width="352" height="466" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="976" y="120" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.84" text-anchor="middle">③ 正侧面：额鼻台阶与下颌咬合</text>
      <g transform="translate(1002, 312)">
        <circle cx="14" cy="-28" r="82" fill="#6366f1" fill-opacity="0.04" stroke="#4f46e5" stroke-opacity="0.52" stroke-width="1.9"/>
        <!-- Forehead -> Stop -> Straight bridge -> Nose -->
        <path d="M -28 -100 C -50 -78, -62 -52, -66 -24 L -144 -10 L -144 36 C -114 48, -62 48, -22 36" fill="#6366f1" fill-opacity="0.06" stroke="#4f46e5" stroke-opacity="0.68" stroke-width="2"/>
        <!-- Lower jaw hinge -->
        <path d="M -134 40 C -124 66, -78 72, -16 64 C 12 58, 30 42, 42 22" fill="none" stroke="#059669" stroke-opacity="0.65" stroke-width="2" stroke-dasharray="5 3"/>
        <!-- Stop highlight -->
        <circle cx="-66" cy="-24" r="4.5" fill="#db2777" fill-opacity="0.82"/>
        <!-- Eye socket above stop -->
        <ellipse cx="-32" cy="-32" rx="16" ry="12" fill="none" stroke="#0284c7" stroke-opacity="0.58" stroke-width="1.6"/>
        <!-- Neck slope -->
        <path d="M 68 24 C 76 62, 86 98, 98 124 M 4 64 C 8 92, 12 112, 16 126" fill="none" stroke="#4f46e5" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 4"/>
        <text x="-112" y="-38" font-size="11" font-weight="700" fill="#db2777">清晰额鼻台阶</text>
        <text x="-110" y="92" font-size="11" fill="#059669">下颌短于上吻</text>
        <text x="-20" y="150" font-size="11.5" font-weight="700" fill="#4f46e5" text-anchor="middle">犬科吻长 ≈ 头球半径 0.7~0.9 倍</text>
      </g>

      <!-- Bottom Row: 3 Blank Directional Spheres for Muzzle Extrusion Drill -->
      <rect x="48" y="578" width="1104" height="278" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="606" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.82">区 4 · 独立推演格（沿球心透视轴长出 3D 梯形吻部，补全额鼻台阶与下颌）</text>

      <g transform="translate(230, 724)">
        <circle cx="0" cy="0" r="56" fill="none" stroke="#059669" stroke-opacity="0.5" stroke-width="1.8"/>
        <path d="M 10 8 L 96 22" stroke="#10b981" stroke-width="2.2" marker-end="url(#tpl-arrow-emerald)"/>
        <text x="0" y="96" font-size="11.5" fill="#475569" text-anchor="middle">① 向右平视 3/4 犬吻</text>
      </g>
      <g transform="translate(600, 724)">
        <circle cx="0" cy="0" r="56" fill="none" stroke="#059669" stroke-opacity="0.5" stroke-width="1.8"/>
        <path d="M -10 -4 L -92 -34" stroke="#10b981" stroke-width="2.2" marker-end="url(#tpl-arrow-emerald)"/>
        <text x="0" y="96" font-size="11.5" fill="#475569" text-anchor="middle">② 向左上仰视 3/4 犬吻</text>
      </g>
      <g transform="translate(970, 724)">
        <circle cx="0" cy="0" r="56" fill="none" stroke="#059669" stroke-opacity="0.5" stroke-width="1.8"/>
        <path d="M 10 12 L 88 46" stroke="#10b981" stroke-width="2.2" marker-end="url(#tpl-arrow-emerald)"/>
        <text x="0" y="96" font-size="11.5" fill="#475569" text-anchor="middle">③ 向右下俯视 3/4 犬吻</text>
      </g>
      `
    )
  },

  {
    id: 'tpl-furry-species',
    name: '物种吻部对比架：猫科短吻胡须垫 vs 龙类棱角长吻',
    track: 'furry',
    lessonId: 'furry-2',
    description: '左侧为猫科紧凑圆润短吻 + 双球胡须垫架构；右侧为龙类长棱角吻部、眉脊与龙角基座架构。',
    imageUrl: './assets/diagrams/furry-kemono-muzzle.jpg',
    svgContent: wrapTemplateSVG(
      'FURRY-2 · 物种差异：猫科短吻胡须垫 vs 龙类棱角长吻',
      '口诀：猫科吻短圆、胡须垫饱满成 ω；龙类吻长棱角明、眉脊压眼角基稳',
      `
      <!-- Left Half: Feline Short Muzzle & Whisker Pads -->
      <rect x="48" y="92" width="536" height="764" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.84">区 1 · 猫科 (Feline)：短吻 + 饱满双球胡须垫</text>
      <text x="68" y="140" font-size="11.5" fill="#475569">吻长仅为头球半径 1/3 · 大眼圆润 · 鼻头小巧呈倒三角</text>

      <!-- Feline 3/4 -->
      <g transform="translate(324, 340)">
        <circle cx="14" cy="-24" r="96" fill="#10b981" fill-opacity="0.04" stroke="#059669" stroke-opacity="0.52" stroke-width="2"/>
        <!-- Steep forehead & short compact muzzle -->
        <path d="M -28 -114 C -58 -86, -74 -48, -74 -12" fill="none" stroke="#db2777" stroke-opacity="0.55" stroke-width="1.5" stroke-dasharray="5 3"/>
        <!-- Short rounded bridge -->
        <path d="M -74 -12 L -112 6 C -114 18, -110 34, -98 44" fill="none" stroke="#059669" stroke-opacity="0.72" stroke-width="2.2"/>
        <!-- Plump Twin Whisker Pads (ω balls) -->
        <ellipse cx="-96" cy="34" rx="22" ry="18" fill="#10b981" fill-opacity="0.12" stroke="#059669" stroke-opacity="0.7" stroke-width="1.8"/>
        <ellipse cx="-58" cy="36" rx="26" ry="20" fill="#10b981" fill-opacity="0.12" stroke="#059669" stroke-opacity="0.7" stroke-width="1.8"/>
        <!-- Small triangular feline nose -->
        <path d="M -104 6 L -84 8 L -94 20 Z" fill="#db2777" fill-opacity="0.32" stroke="#db2777" stroke-opacity="0.75" stroke-width="1.6"/>
        <!-- Compact round lower chin -->
        <path d="M -94 52 C -82 70, -48 72, -26 56" fill="none" stroke="#4f46e5" stroke-opacity="0.62" stroke-width="1.8" stroke-dasharray="5 3"/>
        <!-- Large expressive feline eye socket -->
        <path d="M -52 -16 C -38 -36, -6 -34, 8 -10 C -4 8, -36 8, -52 -16 Z" fill="none" stroke="#0284c7" stroke-opacity="0.58" stroke-width="1.8"/>
        <!-- Wide fluffy cheek outline -->
        <path d="M 102 -8 C 122 20, 114 64, 78 86 C 48 98, 12 94, -14 78" fill="none" stroke="#059669" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="5 4"/>
        <text x="-144" y="42" font-size="11.5" font-weight="700" fill="#059669">双球胡须垫</text>
        <text x="-148" y="-4" font-size="11" fill="#db2777">小三角鼻</text>
        <text x="64" y="-54" font-size="11" fill="#0284c7">大而圆润眼眶</text>
      </g>

      <!-- Feline Front Mini Scaffold -->
      <g transform="translate(316, 676)">
        <circle cx="0" cy="-16" r="70" fill="none" stroke="#059669" stroke-opacity="0.45" stroke-width="1.7"/>
        <ellipse cx="-24" cy="22" rx="22" ry="16" fill="#10b981" fill-opacity="0.1" stroke="#059669" stroke-opacity="0.65" stroke-width="1.7"/>
        <ellipse cx="24" cy="22" rx="22" ry="16" fill="#10b981" fill-opacity="0.1" stroke="#059669" stroke-opacity="0.65" stroke-width="1.7"/>
        <path d="M -10 2 L 10 2 L 0 12 Z" fill="#db2777" fill-opacity="0.3" stroke="#db2777" stroke-width="1.5"/>
        <path d="M -22 34 Q -10 42 0 32 Q 10 42 22 34" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
        <text x="0" y="96" font-size="12" font-weight="700" fill="#059669" text-anchor="middle">正面特征：ω 型上唇 + 短圆下巴</text>
      </g>

      <!-- Right Half: Dragon Angular Long Muzzle & Horn Sockets -->
      <rect x="616" y="92" width="536" height="764" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="636" y="120" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.84">区 2 · 龙类 / 爬行类：棱角长吻 + 眉脊 + 角座</text>
      <text x="636" y="140" font-size="11.5" fill="#475569">多面体折面明确 · 突出眉弓护眼 · 龙角由椭圆基座向后弯伸</text>

      <!-- Dragon 3/4 -->
      <g transform="translate(918, 344)">
        <!-- Elongated cranium sphere -->
        <ellipse cx="16" cy="-24" rx="84" ry="74" fill="#6366f1" fill-opacity="0.04" stroke="#4f46e5" stroke-opacity="0.52" stroke-width="2"/>
        <!-- Pronounced angular brow ridge -->
        <path d="M -52 -46 L -10 -56 L 34 -42 L 22 -24 L -48 -28 Z" fill="#4f46e5" fill-opacity="0.1" stroke="#4f46e5" stroke-opacity="0.68" stroke-width="1.8"/>
        <!-- Faceted angular long snout prism -->
        <path d="M -52 -32 L -162 -10 L -152 14 L -38 -6 Z" fill="#38bdf8" fill-opacity="0.1" stroke="#0284c7" stroke-opacity="0.72" stroke-width="2"/>
        <path d="M -38 -6 L -152 14 L -144 46 L -18 32 L 16 12 Z" fill="#6366f1" fill-opacity="0.08" stroke="#4f46e5" stroke-opacity="0.68" stroke-width="1.9"/>
        <!-- Front nostrils (slit on top-front corner, no dog leather nose!) -->
        <path d="M -162 -10 L -168 24 L -144 46 L -152 14 Z" fill="#4f46e5" fill-opacity="0.1" stroke="#4f46e5" stroke-opacity="0.6" stroke-width="1.6"/>
        <ellipse cx="-146" cy="2" rx="7" ry="3.5" transform="rotate(-14 -146 2)" fill="#0f172a" fill-opacity="0.55"/>
        <!-- Strong angular lower jaw & cheek crest -->
        <path d="M -146 44 L -134 72 L -20 68 L 46 38 L 36 10" fill="none" stroke="#d97706" stroke-opacity="0.72" stroke-width="2" stroke-dasharray="6 3"/>
        <!-- Horn elliptical sockets on upper back skull -->
        <ellipse cx="38" cy="-84" rx="18" ry="12" transform="rotate(-24 38 -84)" fill="#d97706" fill-opacity="0.16" stroke="#d97706" stroke-opacity="0.78" stroke-width="1.8"/>
        <path d="M 24 -90 C 62 -130, 118 -148, 174 -142 C 134 -116, 86 -94, 52 -76" fill="none" stroke="#d97706" stroke-opacity="0.68" stroke-width="2"/>
        <ellipse cx="-8" cy="-86" rx="14" ry="10" transform="rotate(-18 -8 -86)" fill="#d97706" fill-opacity="0.12" stroke="#d97706" stroke-opacity="0.6" stroke-width="1.5"/>
        <path d="M -16 -92 C 20 -132, 68 -148, 116 -146" fill="none" stroke="#d97706" stroke-opacity="0.52" stroke-width="1.6" stroke-dasharray="5 4"/>
        <!-- Labels -->
        <text x="116" y="-154" font-size="11.5" font-weight="700" fill="#d97706">角座椭圆 + 顺颅弧后弯</text>
        <text x="-174" y="-26" font-size="11" font-weight="700" fill="#0284c7">细长鼻孔(无狗鼻垫)</text>
        <text x="-100" y="96" font-size="11.5" font-weight="700" fill="#d97706">棱角分明的咬合下颌</text>
      </g>

      <!-- Dragon Side Profile Mini Scaffold -->
      <g transform="translate(894, 676)">
        <ellipse cx="44" cy="-16" rx="64" ry="54" fill="none" stroke="#4f46e5" stroke-opacity="0.45" stroke-width="1.7"/>
        <path d="M -4 -52 L -132 -28 L -132 14 L -4 14" fill="none" stroke="#4f46e5" stroke-opacity="0.68" stroke-width="2"/>
        <path d="M -124 18 L -114 42 L 16 42 L 54 14" fill="none" stroke="#d97706" stroke-opacity="0.68" stroke-width="1.8" stroke-dasharray="5 3"/>
        <path d="M 38 -64 C 84 -92, 134 -96, 174 -84" fill="none" stroke="#d97706" stroke-opacity="0.65" stroke-width="2"/>
        <text x="0" y="96" font-size="12" font-weight="700" fill="#4f46e5" text-anchor="middle">侧面特征：低额缓台阶 + 硬朗方折面</text>
      </g>
      `
    )
  },

  {
    id: 'tpl-furry-ears',
    name: '兽耳斜向球面基座与耳廓厚度骨架（犬 / 猫 / 狐三型）',
    track: 'furry',
    lessonId: 'furry-3',
    description: '上区标出正面、3/4 与侧后方头骨的斜向椭圆耳座；下区提供尖立犬耳、圆宽猫耳与大狐耳的曲线厚度架。',
    imageUrl: './assets/diagrams/furry-kemono-ears-body.jpg',
    svgContent: wrapTemplateSVG(
      'FURRY-3 · 兽耳斜向球面基座、耳廓翻转厚度与耳毛流线',
      '口诀：先在头球斜侧面画椭圆耳座，再用柔顺 S 曲线立起耳廓，外缘必须交代卷边厚度',
      `
      <!-- Top Row: Tilted Elliptical Ear Sockets on 3 Angles -->
      <rect x="48" y="92" width="1104" height="390" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.84">区 1 · 兽耳基座椭圆定位（贴合球面后上斜侧，绝不垂直插头顶！）</text>

      <!-- Angle 1: Front -->
      <g transform="translate(230, 326)">
        <circle cx="0" cy="0" r="76" fill="#10b981" fill-opacity="0.04" stroke="#059669" stroke-opacity="0.52" stroke-width="1.8"/>
        <line x1="0" y1="-88" x2="0" y2="90" stroke="#0284c7" stroke-opacity="0.35" stroke-width="1.2" stroke-dasharray="4 4"/>
        <!-- Tilted ear socket ellipses -->
        <ellipse cx="-56" cy="-48" rx="28" ry="15" transform="rotate(-38 -56 -48)" fill="#db2777" fill-opacity="0.14" stroke="#db2777" stroke-opacity="0.78" stroke-width="1.8"/>
        <ellipse cx="56" cy="-48" rx="28" ry="15" transform="rotate(38 56 -48)" fill="#db2777" fill-opacity="0.14" stroke="#db2777" stroke-opacity="0.78" stroke-width="1.8"/>
        <!-- Curved leaf ear contours emerging from sockets -->
        <path d="M -78 -34 C -106 -96, -104 -146, -86 -166 C -52 -148, -32 -106, -34 -64" fill="none" stroke="#059669" stroke-opacity="0.65" stroke-width="2" stroke-dasharray="6 4"/>
        <path d="M 78 -34 C 106 -96, 104 -146, 86 -166 C 52 -148, 32 -106, 34 -64" fill="none" stroke="#059669" stroke-opacity="0.65" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="0" y="114" font-size="12" font-weight="700" fill="#059669" text-anchor="middle">① 正面：外斜 45° 对称耳座</text>
      </g>

      <!-- Angle 2: 3/4 -->
      <g transform="translate(600, 326)">
        <circle cx="0" cy="0" r="76" fill="#38bdf8" fill-opacity="0.04" stroke="#0284c7" stroke-opacity="0.52" stroke-width="1.8"/>
        <!-- Near ear socket (wider ellipse, further back) -->
        <ellipse cx="44" cy="-42" rx="30" ry="20" transform="rotate(28 44 -42)" fill="#db2777" fill-opacity="0.16" stroke="#db2777" stroke-opacity="0.82" stroke-width="1.8"/>
        <!-- Far ear socket (narrower behind crown) -->
        <ellipse cx="-32" cy="-58" rx="20" ry="11" transform="rotate(-24 -32 -58)" fill="#db2777" fill-opacity="0.1" stroke="#db2777" stroke-opacity="0.58" stroke-width="1.5"/>
        <!-- Curved ears with near/far overlap -->
        <path d="M 22 -60 C 44 -116, 78 -154, 104 -162 C 110 -114, 96 -62, 66 -24" fill="none" stroke="#0284c7" stroke-opacity="0.68" stroke-width="2"/>
        <path d="M -46 -50 C -62 -104, -56 -142, -38 -156 C -16 -136, -6 -98, -14 -64" fill="none" stroke="#0284c7" stroke-opacity="0.48" stroke-width="1.7" stroke-dasharray="5 4"/>
        <text x="0" y="114" font-size="12" font-weight="700" fill="#0284c7" text-anchor="middle">② 3/4 侧面：近耳靠后显厚，远耳偏前显窄</text>
      </g>

      <!-- Angle 3: Back 3/4 -->
      <g transform="translate(970, 326)">
        <circle cx="0" cy="0" r="76" fill="#6366f1" fill-opacity="0.04" stroke="#4f46e5" stroke-opacity="0.52" stroke-width="1.8"/>
        <ellipse cx="-44" cy="-42" rx="30" ry="20" transform="rotate(-28 -44 -42)" fill="#db2777" fill-opacity="0.16" stroke="#db2777" stroke-opacity="0.82" stroke-width="1.8"/>
        <ellipse cx="40" cy="-54" rx="22" ry="13" transform="rotate(24 40 -54)" fill="#db2777" fill-opacity="0.12" stroke="#db2777" stroke-opacity="0.62" stroke-width="1.5"/>
        <!-- Back funnel shell view -->
        <path d="M -68 -24 C -98 -68, -110 -118, -96 -160 C -64 -146, -34 -108, -22 -58" fill="#6366f1" fill-opacity="0.08" stroke="#4f46e5" stroke-opacity="0.68" stroke-width="2"/>
        <path d="M 22 -64 C 34 -108, 60 -142, 86 -152 C 92 -114, 80 -72, 58 -42" fill="#6366f1" fill-opacity="0.06" stroke="#4f46e5" stroke-opacity="0.52" stroke-width="1.7" stroke-dasharray="5 4"/>
        <text x="0" y="114" font-size="12" font-weight="700" fill="#4f46e5" text-anchor="middle">③ 背侧面：耳背如卷筒漏斗包裹耳根</text>
      </g>

      <!-- Bottom Row: 3 Ear Species Curves + Helix Rim Thickness -->
      <rect x="48" y="502" width="1104" height="354" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.28" stroke-dasharray="6 6"/>
      <text x="68" y="530" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.84">区 2 · 三种兽耳有机曲线轮廓、外卷耳廓厚度与内耳毛流线</text>

      <!-- Canine Upright Ear -->
      <g transform="translate(230, 712)">
        <ellipse cx="0" cy="72" rx="52" ry="18" fill="#10b981" fill-opacity="0.1" stroke="#059669" stroke-opacity="0.58" stroke-width="1.6"/>
        <!-- Organic curved leaf outer contour -->
        <path d="M -52 72 C -62 6, -42 -84, -4 -128 C 34 -88, 60 -10, 52 72" fill="#10b981" fill-opacity="0.06" stroke="#059669" stroke-opacity="0.72" stroke-width="2.2"/>
        <!-- Folded outer helix rim thickness (ear flap / Henry's pocket) -->
        <path d="M -38 66 C -42 8, -28 -68, -4 -110 C 16 -76, 30 -16, 28 54" fill="none" stroke="#0284c7" stroke-opacity="0.65" stroke-width="1.8" stroke-dasharray="5 3"/>
        <path d="M 52 24 C 38 36, 30 56, 36 74" fill="none" stroke="#db2777" stroke-opacity="0.72" stroke-width="2"/>
        <!-- Inner ear fluff arcs -->
        <path d="M -36 42 Q -12 32 4 46 M -30 16 Q -10 8 6 20" fill="none" stroke="#059669" stroke-opacity="0.58" stroke-width="1.6" stroke-linecap="round"/>
        <text x="86" y="42" font-size="11" font-weight="700" fill="#db2777">外耳缘折袋</text>
        <text x="0" y="116" font-size="12" font-weight="700" fill="#059669" text-anchor="middle">① 狼/犬尖立耳（高拱微圆尖）</text>
      </g>

      <!-- Feline Wide Ear -->
      <g transform="translate(600, 712)">
        <ellipse cx="0" cy="72" rx="64" ry="18" fill="#38bdf8" fill-opacity="0.1" stroke="#0284c7" stroke-opacity="0.58" stroke-width="1.6"/>
        <path d="M -64 72 C -68 18, -50 -52, -16 -94 C 24 -76, 62 -16, 64 72" fill="#38bdf8" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.72" stroke-width="2.2"/>
        <path d="M -46 66 C -46 20, -34 -38, -14 -74 C 14 -58, 38 -12, 38 56" fill="none" stroke="#4f46e5" stroke-opacity="0.6" stroke-width="1.8" stroke-dasharray="5 3"/>
        <path d="M -44 42 Q -16 28 8 42 M -34 16 Q -12 6 8 18" fill="none" stroke="#0284c7" stroke-opacity="0.58" stroke-width="1.6" stroke-linecap="round"/>
        <text x="0" y="116" font-size="12" font-weight="700" fill="#0284c7" text-anchor="middle">② 猫科宽基耳（基座宽、外弧饱满）</text>
      </g>

      <!-- Fox / Long Expressive Ear -->
      <g transform="translate(970, 712)">
        <ellipse cx="-18" cy="72" rx="54" ry="18" transform="rotate(14 -18 72)" fill="#6366f1" fill-opacity="0.1" stroke="#4f46e5" stroke-opacity="0.58" stroke-width="1.6"/>
        <path d="M -68 62 C -58 -16, -2 -106, 74 -138 C 72 -58, 56 26, 26 84" fill="#6366f1" fill-opacity="0.06" stroke="#4f46e5" stroke-opacity="0.72" stroke-width="2.2"/>
        <path d="M -48 64 C -36 -4, 6 -80, 56 -112 C 48 -46, 36 16, 12 72" fill="none" stroke="#db2777" stroke-opacity="0.58" stroke-width="1.8" stroke-dasharray="5 3"/>
        <path d="M -42 36 Q -6 22 18 34 M -26 4 Q 6 -6 28 6" fill="none" stroke="#4f46e5" stroke-opacity="0.58" stroke-width="1.6" stroke-linecap="round"/>
        <text x="0" y="116" font-size="12" font-weight="700" fill="#4f46e5" text-anchor="middle">③ 大狐耳（舒展弧线 + 长簇内耳毛）</text>
      </g>
      `
    )
  },

  {
    id: 'tpl-furry-expressions',
    name: '兽人四格表情联动架构（耳位转角 + 鼻梁皱纹 + 咧嘴露牙）',
    track: 'furry',
    lessonId: 'furry-4',
    description: '开心竖耳、委屈飞机耳、愤怒龇牙低吼与警觉歪头 4 格完整兽头骨架，标注耳位旋转轴与吻部弯折方向。',
    imageUrl: './assets/diagrams/furry-kemono-expressions.jpg',
    svgContent: wrapTemplateSVG(
      'FURRY-4 · 兽人表情四宫格：耳位倾角、鼻皱挤压与吻部咧嘴联动',
      '口诀：兽耳是第二对眉毛！开心竖前、委屈压平飞机耳、低吼耳后贴 + 鼻梁起横皱',
      `
      <!-- Cell 1: Happy Perked -->
      <rect x="48" y="92" width="536" height="368" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.84">① 开心吐舌：双耳高竖朝前 + 嘴角沿吻部大幅上扬</text>
      <g transform="translate(316, 290)">
        <circle cx="8" cy="-16" r="64" fill="none" stroke="#059669" stroke-opacity="0.48" stroke-width="1.7"/>
        <!-- High perked ears -->
        <path d="M -38 -62 C -58 -110, -48 -144, -26 -152 C -8 -134, 0 -100, -4 -74" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.72" stroke-width="2"/>
        <path d="M 30 -72 C 56 -116, 86 -140, 104 -138 C 98 -100, 82 -62, 56 -40" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.72" stroke-width="2"/>
        <!-- Muzzle + open happy jaw -->
        <path d="M -46 -12 L -108 6 C -112 20, -104 34, -84 36 C -54 38, -28 24, -14 14" fill="none" stroke="#059669" stroke-opacity="0.72" stroke-width="2"/>
        <path d="M -94 34 C -84 74, -36 74, -10 40" fill="#10b981" fill-opacity="0.08" stroke="#db2777" stroke-opacity="0.65" stroke-width="1.8"/>
        <!-- Happy crescent eye -->
        <path d="M -38 -20 Q -20 -36 -2 -18" fill="none" stroke="#0284c7" stroke-width="2.8" stroke-linecap="round"/>
        <text x="112" y="-92" font-size="11" font-weight="700" fill="#059669">耳朵高竖</text>
        <text x="-152" y="56" font-size="11" font-weight="700" fill="#db2777">咧嘴弧度包吻侧</text>
      </g>

      <!-- Cell 2: Airplane Ears / Sad -->
      <rect x="616" y="92" width="536" height="368" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="636" y="120" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.84">② 委屈飞机耳：耳根外旋压平 + 眉头八字上提</text>
      <g transform="translate(884, 290)">
        <circle cx="8" cy="-16" r="64" fill="none" stroke="#4f46e5" stroke-opacity="0.48" stroke-width="1.7"/>
        <!-- Airplane ears drooped sideways/down -->
        <path d="M -36 -56 C -86 -72, -126 -62, -144 -42 C -118 -26, -78 -24, -46 -32" fill="#6366f1" fill-opacity="0.08" stroke="#4f46e5" stroke-opacity="0.72" stroke-width="2"/>
        <path d="M 48 -56 C 98 -68, 138 -52, 152 -28 C 122 -14, 84 -16, 56 -28" fill="#6366f1" fill-opacity="0.08" stroke="#4f46e5" stroke-opacity="0.72" stroke-width="2"/>
        <!-- Rotation arrow -->
        <path d="M 102 -96 Q 134 -80 144 -46" fill="none" stroke="#d97706" stroke-width="1.8" marker-end="url(#tpl-arrow-amber)"/>
        <!-- Drooped muzzle mouth -->
        <path d="M -46 -6 L -102 12 C -104 28, -90 42, -52 44 C -26 44, -8 34, 0 24" fill="none" stroke="#4f46e5" stroke-opacity="0.72" stroke-width="2"/>
        <path d="M -38 -24 Q -20 -30 -4 -38" fill="none" stroke="#4f46e5" stroke-width="2.4" stroke-linecap="round"/>
        <ellipse cx="-22" cy="-12" rx="11" ry="13" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <text x="116" y="-104" font-size="11" font-weight="700" fill="#d97706">耳根压平外展</text>
        <text x="-152" y="54" font-size="11" fill="#4f46e5">吻角微下垂</text>
      </g>

      <!-- Cell 3: Snarl / Growl -->
      <rect x="48" y="484" width="536" height="372" rx="14" fill="none" stroke="#ef4444" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="68" y="512" font-size="13.5" font-weight="700" fill="#dc2626" fill-opacity="0.84">③ 愤怒低吼：耳向后贴紧 + 鼻梁挤皱 + 掀唇露犬齿</text>
      <g transform="translate(316, 684)">
        <circle cx="8" cy="-16" r="64" fill="none" stroke="#dc2626" stroke-opacity="0.48" stroke-width="1.7"/>
        <!-- Pinned-back aggressive ears -->
        <path d="M 38 -62 C 86 -88, 128 -86, 154 -72 C 128 -44, 88 -34, 54 -34" fill="#ef4444" fill-opacity="0.08" stroke="#dc2626" stroke-opacity="0.72" stroke-width="2"/>
        <!-- Scrunched wavy nose bridge & lifted upper lip exposing fangs -->
        <path d="M -46 -14 Q -68 -24 -86 -12 Q -98 -16 -110 -4" fill="none" stroke="#dc2626" stroke-opacity="0.8" stroke-width="2.2"/>
        <!-- Nose bridge wrinkle ticks -->
        <path d="M -78 -10 Q -70 -2 -64 -8 M -62 -12 Q -54 -4 -48 -10" fill="none" stroke="#dc2626" stroke-width="1.6" stroke-linecap="round"/>
        <!-- Snarling upper lip wave + fangs -->
        <path d="M -108 16 C -94 4, -76 2, -62 12 C -46 4, -28 8, -14 20" fill="none" stroke="#dc2626" stroke-width="2.2"/>
        <path d="M -94 12 L -88 30 L -80 10 M -68 12 L -64 24 L -58 10" fill="#ffffff" stroke="#dc2626" stroke-width="1.6"/>
        <!-- Open tense lower jaw -->
        <path d="M -98 36 C -84 62, -38 64, -10 38" fill="none" stroke="#dc2626" stroke-opacity="0.7" stroke-width="2"/>
        <!-- Slammed angry brow -->
        <path d="M -44 -28 L -6 -14" fill="none" stroke="#dc2626" stroke-width="2.8" stroke-linecap="round"/>
        <text x="114" y="-96" font-size="11" font-weight="700" fill="#dc2626">耳贴后脑</text>
        <text x="-152" y="-22" font-size="11" font-weight="700" fill="#dc2626">鼻梁起皱</text>
        <text x="-154" y="42" font-size="11" fill="#dc2626">掀上唇露尖牙</text>
      </g>

      <!-- Cell 4: Alert / Curious Head Tilt -->
      <rect x="616" y="484" width="536" height="372" rx="14" fill="none" stroke="#d97706" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="636" y="512" font-size="13.5" font-weight="700" fill="#d97706" fill-opacity="0.84">④ 警觉/好奇歪头：单耳微倾不对称 + 头部旋转 15°</text>
      <g transform="translate(884, 684) rotate(12)">
        <circle cx="0" cy="-16" r="64" fill="none" stroke="#d97706" stroke-opacity="0.48" stroke-width="1.7"/>
        <line x1="0" y1="-94" x2="0" y2="78" stroke="#d97706" stroke-opacity="0.35" stroke-width="1.3" stroke-dasharray="5 4"/>
        <!-- Asymmetric ears: left upright, right tilted out -->
        <path d="M -46 -56 C -64 -108, -54 -146, -30 -152 C -12 -134, -6 -98, -12 -74" fill="#f59e0b" fill-opacity="0.08" stroke="#d97706" stroke-opacity="0.72" stroke-width="2"/>
        <path d="M 42 -58 C 82 -96, 120 -98, 138 -84 C 116 -54, 82 -38, 54 -34" fill="#f59e0b" fill-opacity="0.08" stroke="#d97706" stroke-opacity="0.72" stroke-width="2"/>
        <!-- Front compact muzzle -->
        <ellipse cx="0" cy="24" rx="34" ry="24" fill="none" stroke="#d97706" stroke-opacity="0.68" stroke-width="1.8"/>
        <path d="M -12 8 L 12 8 L 0 20 Z" fill="#0f172a" fill-opacity="0.22" stroke="#0f172a" stroke-opacity="0.58" stroke-width="1.5"/>
        <!-- Curious wide eyes -->
        <circle cx="-26" cy="-18" r="11" fill="none" stroke="#0284c7" stroke-width="1.8"/>
        <circle cx="26" cy="-18" r="11" fill="none" stroke="#0284c7" stroke-width="1.8"/>
      </g>
      <text x="1032" y="592" font-size="11" font-weight="700" fill="#d97706">一竖一倾破对称</text>
      `
    )
  },

  {
    id: 'tpl-furry-fur',
    name: '簇状毛发生长流向图 + 大中小毛簇节奏练习架',
    track: 'furry',
    lessonId: 'furry-5',
    description: '左侧标出从鼻梁到腮毛、颈鬃的毛发生长矢量；右侧提供长短毛大中小簇状节奏与肘/尾挂毛骨架。',
    imageUrl: './assets/diagrams/furry-kemono-fur-tufts.jpg',
    svgContent: wrapTemplateSVG(
      'FURRY-5 · 簇状毛发概括、生长流向与长短毛节奏控制',
      '口诀：先定顺滑体块轮廓，仅在转折与重力处加毛簇；大中小错落分组，严禁绕圈画锯齿',
      `
      <!-- Left: Fur Growth Flow Map on Furry Bust -->
      <rect x="48" y="92" width="536" height="764" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.84">区 1 · 头部与颈肩毛发生长流向矢量（短毛贴骨，长毛聚转折）</text>

      <g transform="translate(324, 412)">
        <!-- Base smooth head & neck bust silhouette -->
        <circle cx="14" cy="-96" r="88" fill="none" stroke="#94a3b8" stroke-opacity="0.52" stroke-width="1.6" stroke-dasharray="5 4"/>
        <!-- Smooth muzzle -->
        <path d="M -60 -92 L -134 -68 C -138 -48, -124 -32, -88 -28 L -42 -28" fill="none" stroke="#059669" stroke-opacity="0.65" stroke-width="1.9"/>
        <path d="M -116 -30 C -106 -6, -68 -2, -26 -14" fill="none" stroke="#059669" stroke-opacity="0.55" stroke-width="1.7"/>
        <!-- Neck & chest silhouette -->
        <path d="M -32 -12 C -40 54, -52 118, -72 184 C -106 218, -138 250, -158 294" fill="none" stroke="#94a3b8" stroke-opacity="0.48" stroke-width="1.6" stroke-dasharray="5 4"/>
        <path d="M 88 -42 C 98 34, 118 112, 152 184 C 176 226, 192 262, 198 294" fill="none" stroke="#94a3b8" stroke-opacity="0.48" stroke-width="1.6" stroke-dasharray="5 4"/>
        <!-- Cheek Ruff organic grouped S-tufts (Zone A) -->
        <path d="M 86 -54 C 118 -38, 128 -14, 104 4 C 122 18, 118 40, 88 46 C 98 62, 82 78, 56 72" fill="#10b981" fill-opacity="0.1" stroke="#059669" stroke-opacity="0.78" stroke-width="2.2" stroke-linejoin="round"/>
        <!-- Chest Mane big grouped tufts (Zone B) -->
        <path d="M -46 72 C -78 118, -74 176, -42 224 C -28 196, -14 218, 0 258 C 24 212, 46 196, 62 224 C 92 174, 96 116, 72 68" fill="#0284c7" fill-opacity="0.08" stroke="#0284c7" stroke-opacity="0.72" stroke-width="2.2" stroke-linejoin="round"/>
        <!-- Fur flow direction arrows -->
        <path d="M -112 -64 C -74 -90, -24 -124, 34 -138" fill="none" stroke="#db2777" stroke-opacity="0.72" stroke-width="1.8" marker-end="url(#tpl-arrow)"/>
        <path d="M -38 -62 C 10 -66, 54 -52, 86 -26" fill="none" stroke="#db2777" stroke-opacity="0.72" stroke-width="1.8" marker-end="url(#tpl-arrow)"/>
        <path d="M -16 32 C -14 86, -8 144, 0 202" fill="none" stroke="#0284c7" stroke-opacity="0.72" stroke-width="1.8" marker-end="url(#tpl-arrow)"/>
        <path d="M 84 44 C 106 106, 134 166, 162 226" fill="none" stroke="#059669" stroke-opacity="0.65" stroke-width="1.8" marker-end="url(#tpl-arrow-emerald)"/>
        <!-- Callout labels -->
        <text x="-152" y="-114" font-size="11.5" font-weight="700" fill="#db2777">吻部短毛贴骨顺滑</text>
        <text x="116" y="22" font-size="11.5" font-weight="700" fill="#059669">腮毛大中小三簇</text>
        <text x="-168" y="198" font-size="11.5" font-weight="700" fill="#0284c7">胸毛重力向下聚簇</text>
      </g>

      <!-- Right Top: Tuft Rhythm Strips -->
      <rect x="616" y="92" width="536" height="368" rx="14" fill="none" stroke="#0284c7" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="636" y="120" font-size="13.5" font-weight="700" fill="#0284c7" fill-opacity="0.84">区 2 · 三种毛长簇状节奏练手槽（顺向弧线收尖）</text>

      <g transform="translate(656, 166)">
        <!-- Short fur: smooth line + occasional tiny notch -->
        <path d="M 10 38 C 110 34, 180 34, 214 38 L 228 28 L 236 40 C 310 38, 390 40, 446 44" fill="none" stroke="#059669" stroke-opacity="0.78" stroke-width="2.2" stroke-linecap="round"/>
        <text x="10" y="18" font-size="11.5" font-weight="700" fill="#059669">① 短毛（吻部/前臂）：90% 顺滑线 + 仅 1 处小缺口</text>

        <!-- Medium fur: rhythmic big-medium-small waves -->
        <path d="M 10 140 C 66 132, 114 114, 148 92 C 144 116, 140 128, 152 136 C 182 124, 206 112, 224 104 C 222 122, 224 134, 236 142 C 292 130, 344 108, 386 86 C 378 118, 384 138, 446 144" fill="#0284c7" fill-opacity="0.06" stroke="#0284c7" stroke-opacity="0.78" stroke-width="2.2" stroke-linejoin="round"/>
        <text x="10" y="84" font-size="11.5" font-weight="700" fill="#0284c7">② 中长毛（脸颊/大腿）：大簇带中簇，朝向一致</text>

        <!-- Long fluffy tail fur -->
        <path d="M 10 248 C 76 232, 134 198, 184 168 C 170 202, 174 226, 204 236 C 254 214, 306 190, 356 172 C 344 206, 354 234, 446 250" fill="#4f46e5" fill-opacity="0.06" stroke="#4f46e5" stroke-opacity="0.78" stroke-width="2.2" stroke-linejoin="round"/>
        <text x="10" y="176" font-size="11.5" font-weight="700" fill="#4f46e5">③ 长蓬松毛（大尾巴/胸鬃）：饱满大 S 曲线收尖</text>
      </g>

      <!-- Right Bottom: Elbow & Tail Clump Application -->
      <rect x="616" y="484" width="536" height="372" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="636" y="512" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.84">区 3 · 关节挂毛与蓬松尾巴流线实战架</text>
      <!-- Elbow tuft scaffold -->
      <g transform="translate(744, 676)">
        <path d="M -52 -106 L 14 -6 L 84 -74" fill="none" stroke="#94a3b8" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="5 4"/>
        <path d="M -72 -90 C -46 -40, -24 6, 8 28 C 2 44, 16 62, 34 54 C 46 38, 66 2, 102 -54" fill="none" stroke="#4f46e5" stroke-opacity="0.7" stroke-width="2"/>
        <text x="14" y="114" font-size="11.5" font-weight="700" fill="#4f46e5" text-anchor="middle">肘尖挂毛（顺重力下垂）</text>
      </g>
      <!-- Tail S-flow scaffold -->
      <g transform="translate(1006, 686)">
        <path d="M -94 64 C -42 74, 24 22, 56 -56 C 72 -94, 96 -112, 114 -116" fill="none" stroke="#db2777" stroke-opacity="0.6" stroke-width="2" stroke-dasharray="6 4"/>
        <path d="M -94 46 C -48 26, -6 -22, 22 -86 C 48 -124, 88 -134, 114 -116 C 110 -66, 84 14, 34 62 C -12 96, -56 96, -94 78" fill="#10b981" fill-opacity="0.06" stroke="#059669" stroke-opacity="0.7" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="10" y="106" font-size="11.5" font-weight="700" fill="#059669" text-anchor="middle">大尾：先画骨架 S 线再包大毛簇</text>
      </g>
      `
    )
  },

  {
    id: 'tpl-furry-paws',
    name: '兽掌 (Paw) 肉垫掌心体块 + 3/4 立体爪尖架构',
    track: 'furry',
    lessonId: 'furry-6',
    description: '左侧为掌心视图肉垫（心形掌垫 + 4 椭圆指豆）与指节圆柱架；右侧为背面/半握拳爪尖立体套筒架构。',
    imageUrl: './assets/diagrams/furry-kemono-ears-body.jpg',
    svgContent: wrapTemplateSVG(
      'FURRY-6 · 兽掌（Paw）体块、肉垫分布与立体爪尖衔接',
      '口诀：兽掌不是平海星！先画厚实掌盒与 4 根粗短指柱，再贴心形主垫与饱满指豆',
      `
      <!-- Left: Palm View Paw Pad Anatomy -->
      <rect x="48" y="92" width="536" height="764" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.84">区 1 · 掌心视角：厚实手掌梯形 + 心形主垫 + 饱满指豆</text>

      <g transform="translate(316, 496)">
        <!-- Wrist cylinder -->
        <path d="M -72 288 C -76 232, -82 178, -94 128 M 72 288 C 76 232, 82 178, 94 128" fill="none" stroke="#94a3b8" stroke-opacity="0.55" stroke-width="1.8" stroke-dasharray="5 4"/>
        <!-- Chunky palm block -->
        <path d="M -104 126 C -132 58, -138 -24, -110 -86 C -52 -124, 52 -124, 110 -86 C 138 -24, 132 58, 104 126 C 54 154, -54 154, -104 126 Z" fill="#10b981" fill-opacity="0.05" stroke="#059669" stroke-opacity="0.62" stroke-width="2" stroke-dasharray="6 4"/>
        <!-- 4 Chunky radiating toe cylinders + thumb -->
        <!-- Thumb (low-side) -->
        <path d="M -116 46 C -168 24, -196 -26, -172 -62 C -148 -84, -112 -52, -104 -14" fill="#10b981" fill-opacity="0.06" stroke="#059669" stroke-opacity="0.68" stroke-width="2"/>
        <!-- Index -->
        <path d="M -104 -76 C -126 -156, -114 -230, -76 -236 C -42 -238, -28 -164, -36 -96" fill="#10b981" fill-opacity="0.06" stroke="#059669" stroke-opacity="0.68" stroke-width="2"/>
        <!-- Middle -->
        <path d="M -38 -102 C -46 -190, -32 -268, 4 -270 C 40 -268, 52 -190, 42 -102" fill="#10b981" fill-opacity="0.06" stroke="#059669" stroke-opacity="0.68" stroke-width="2"/>
        <!-- Ring -->
        <path d="M 42 -96 C 52 -174, 72 -242, 106 -234 C 138 -224, 132 -146, 104 -72" fill="#10b981" fill-opacity="0.06" stroke="#059669" stroke-opacity="0.68" stroke-width="2"/>
        <!-- Heart / Clover main metacarpal palm pad -->
        <path d="M 0 -58 C 36 -60, 62 -32, 74 14 C 86 58, 54 96, 22 92 C 10 90, 6 78, 0 78 C -6 78, -10 90, -22 92 C -54 96, -86 58, -74 14 C -62 -32, -36 -60, 0 -58 Z" fill="#db2777" fill-opacity="0.14" stroke="#db2777" stroke-opacity="0.78" stroke-width="2"/>
        <!-- Plump oval toe beans -->
        <ellipse cx="-154" cy="-38" rx="18" ry="26" transform="rotate(-32 -154 -38)" fill="#db2777" fill-opacity="0.16" stroke="#db2777" stroke-opacity="0.75" stroke-width="1.8"/>
        <ellipse cx="-78" cy="-196" rx="22" ry="30" transform="rotate(-10 -78 -196)" fill="#db2777" fill-opacity="0.16" stroke="#db2777" stroke-opacity="0.75" stroke-width="1.8"/>
        <ellipse cx="4" cy="-226" rx="23" ry="32" fill="#db2777" fill-opacity="0.16" stroke="#db2777" stroke-opacity="0.75" stroke-width="1.8"/>
        <ellipse cx="92" cy="-192" rx="22" ry="30" transform="rotate(14 92 -192)" fill="#db2777" fill-opacity="0.16" stroke="#db2777" stroke-opacity="0.75" stroke-width="1.8"/>
        <!-- Curved claw tips peeking behind -->
        <path d="M -82 -236 Q -84 -264 -70 -272 Q -68 -248 -68 -234" fill="none" stroke="#4f46e5" stroke-opacity="0.68" stroke-width="1.8"/>
        <path d="M -4 -270 Q 4 -300 18 -304 Q 16 -282 14 -268" fill="none" stroke="#4f46e5" stroke-opacity="0.68" stroke-width="1.8"/>
        <path d="M 98 -234 Q 114 -260 128 -260 Q 120 -240 112 -228" fill="none" stroke="#4f46e5" stroke-opacity="0.68" stroke-width="1.8"/>
        <!-- Callouts -->
        <text x="0" y="24" font-size="12" font-weight="700" fill="#db2777" text-anchor="middle">三叶/心形主掌垫</text>
        <text x="-178" y="-110" font-size="11" font-weight="700" fill="#059669">拇指低位侧出</text>
        <text x="128" y="-270" font-size="11" font-weight="700" fill="#4f46e5">弧形锥状爪尖</text>
      </g>

      <!-- Right Top: 3/4 Dorsal Paw & Knuckle Arch -->
      <rect x="616" y="92" width="536" height="412" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="636" y="120" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.84">区 2 · 背面/半握爪：指关节呈弧拱，爪尖从指背套筒弯出</text>

      <g transform="translate(884, 326)">
        <!-- Back of paw volume -->
        <path d="M -126 112 C -126 30, -108 -54, -46 -84 C 18 -110, 94 -84, 128 -26 C 148 14, 138 72, 114 114" fill="#6366f1" fill-opacity="0.05" stroke="#4f46e5" stroke-opacity="0.62" stroke-width="2"/>
        <!-- Knuckle arch guide -->
        <path d="M -102 -36 Q 12 -98 116 -24" fill="none" stroke="#db2777" stroke-opacity="0.68" stroke-width="1.8" stroke-dasharray="5 3"/>
        <!-- 3 curled chunky toes with 3D claw cones -->
        <path d="M -104 -32 C -126 -14, -144 26, -124 62 C -106 82, -74 74, -64 46" fill="none" stroke="#4f46e5" stroke-opacity="0.72" stroke-width="2"/>
        <path d="M -42 -66 C -54 -22, -52 38, -20 72 C 4 86, 36 74, 42 40" fill="none" stroke="#4f46e5" stroke-opacity="0.72" stroke-width="2"/>
        <path d="M 46 -58 C 56 -14, 62 34, 88 64 C 108 76, 132 62, 134 32" fill="none" stroke="#4f46e5" stroke-opacity="0.72" stroke-width="2"/>
        <!-- Curved 3D claws with elliptical base sockets -->
        <ellipse cx="-122" cy="54" rx="10" ry="7" fill="#d97706" fill-opacity="0.16" stroke="#d97706" stroke-width="1.5"/>
        <path d="M -130 52 C -144 74, -142 98, -124 108 C -124 88, -120 72, -112 58" fill="#d97706" fill-opacity="0.14" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="-12" cy="64" rx="12" ry="8" fill="#d97706" fill-opacity="0.16" stroke="#d97706" stroke-width="1.5"/>
        <path d="M -22 64 C -28 94, -18 118, 2 126 C 0 104, 2 84, 0 68" fill="#d97706" fill-opacity="0.14" stroke="#d97706" stroke-width="2"/>
        <ellipse cx="102" cy="54" rx="10" ry="7" fill="#d97706" fill-opacity="0.16" stroke="#d97706" stroke-width="1.5"/>
        <path d="M 94 56 C 98 82, 112 104, 130 108 C 122 88, 118 70, 112 56" fill="#d97706" fill-opacity="0.14" stroke="#d97706" stroke-width="2"/>
        <text x="0" y="-108" font-size="11.5" font-weight="700" fill="#db2777" text-anchor="middle">指节呈弧拱排列，绝不平齐一条线</text>
        <text x="-152" y="132" font-size="11" font-weight="700" fill="#d97706">爪根套筒椭圆 + 弯钩立体锥</text>
      </g>

      <!-- Right Bottom: Side Toe Articulation & Claw Insertion -->
      <rect x="616" y="524" width="536" height="332" rx="14" fill="none" stroke="#d97706" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="636" y="552" font-size="13.5" font-weight="700" fill="#d97706" fill-opacity="0.84">区 3 · 单根兽指侧面剖面（肉垫承重 + 爪根埋入指背）</text>
      <g transform="translate(874, 704)">
        <!-- Finger segments + plump bottom bean -->
        <path d="M -184 -24 C -124 -36, -64 -44, 12 -32 C 56 -22, 86 2, 92 24 C 78 52, 24 58, -28 46 C -84 40, -138 38, -184 42" fill="#f59e0b" fill-opacity="0.06" stroke="#d97706" stroke-opacity="0.72" stroke-width="2"/>
        <!-- Plump underside pad bulge -->
        <path d="M -26 46 C 4 74, 68 74, 86 38" fill="#db2777" fill-opacity="0.14" stroke="#db2777" stroke-width="2"/>
        <!-- Curved claw emerging from dorsal socket -->
        <path d="M 74 -8 C 118 -8, 156 14, 172 48 C 142 36, 114 26, 86 28" fill="#4f46e5" fill-opacity="0.12" stroke="#4f46e5" stroke-width="2.2"/>
        <text x="30" y="96" font-size="11.5" font-weight="700" fill="#db2777" text-anchor="middle">指腹肉垫饱满下鼓</text>
        <text x="150" y="-12" font-size="11.5" font-weight="700" fill="#4f46e5" text-anchor="middle">爪自指背弧弯而出</text>
      </g>
      `
    )
  },

  {
    id: 'tpl-furry-legs',
    name: '反关节兽足 (Digitigrade) Z 字力学 + 脊柱尾巴连线架',
    track: 'furry',
    lessonId: 'furry-7',
    description: '左侧为标准侧面 Z 字三折兽足解剖与重力铅垂线架；右侧为 3/4 跨步动态兽腿与脊柱延伸大尾巴骨架。',
    imageUrl: './assets/diagrams/furry-kemono-ears-body.jpg',
    svgContent: wrapTemplateSVG(
      'FURRY-7 · 反关节兽足 (Digitigrade) Z 字力学与尾巴脊柱流线',
      '口诀：没有「反向膝盖」！大腿前倾 → 真膝盖 → 小腿后斜 → 高位踝关节 → 脚掌正落重心线',
      `
      <!-- Left: Side Profile Digitigrade Z-Mechanics + Plumb Line -->
      <rect x="48" y="92" width="536" height="764" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.84">区 1 · 侧面 Z 字三折力学与重力铅垂线（核心解剖）</text>

      <g transform="translate(306, 200)">
        <!-- Plumb line from pelvis/hip straight to ground paw -->
        <line x1="0" y1="-26" x2="0" y2="594" stroke="#ef4444" stroke-opacity="0.52" stroke-width="1.8" stroke-dasharray="7 5"/>
        <!-- Ground plane -->
        <line x1="-186" y1="590" x2="186" y2="590" stroke="#0f172a" stroke-opacity="0.45" stroke-width="2"/>
        <!-- Pelvis block -->
        <path d="M -52 -24 L 54 -14 L 44 68 L -48 56 Z" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.65" stroke-width="1.8"/>
        <!-- Continuous spine -> tail S-curve flowing out of pelvis back -->
        <path d="M 10 -44 C 24 0, 48 34, 96 58 C 154 84, 188 144, 174 236 C 164 294, 198 334, 224 348" fill="none" stroke="#db2777" stroke-opacity="0.72" stroke-width="2.4" stroke-dasharray="6 4"/>
        <!-- Z-Leg Skeletal Centerline -->
        <path d="M -6 36 L -74 206 L 56 376 L 10 564 L -64 584" fill="none" stroke="#0284c7" stroke-opacity="0.82" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Joint anchor circles -->
        <circle cx="-6" cy="36" r="7" fill="#0284c7" fill-opacity="0.75"/>
        <circle cx="-74" cy="206" r="7" fill="#0284c7" fill-opacity="0.75"/>
        <circle cx="56" cy="376" r="7" fill="#db2777" fill-opacity="0.85"/>
        <circle cx="10" cy="564" r="7" fill="#059669" fill-opacity="0.8"/>
        <!-- Muscular organic Digitigrade contour wrapping the Z-bones -->
        <!-- Front silhouette -->
        <path d="M -48 38 C -98 94, -124 162, -98 224 C -68 278, -22 328, 22 384 C 8 456, -12 512, -26 550 C -58 556, -86 568, -94 588 L 40 588" fill="none" stroke="#059669" stroke-opacity="0.68" stroke-width="2.2" stroke-dasharray="6 4"/>
        <!-- Back silhouette -->
        <path d="M 46 66 C 64 134, 48 194, 12 238 C 66 286, 94 338, 80 388 C 66 456, 54 522, 40 588" fill="none" stroke="#059669" stroke-opacity="0.68" stroke-width="2.2" stroke-dasharray="6 4"/>
        <!-- Labels -->
        <text x="-118" y="38" font-size="11.5" font-weight="700" fill="#0284c7" text-anchor="end">① 髋关节</text>
        <text x="-118" y="210" font-size="11.5" font-weight="700" fill="#0284c7" text-anchor="end">② 真膝盖(前屈)</text>
        <text x="98" y="380" font-size="11.5" font-weight="700" fill="#db2777">③ 高位踝关节(脚跟)</text>
        <text x="64" y="572" font-size="11.5" font-weight="700" fill="#059669">④ 脚掌着地承重</text>
        <text x="12" y="622" font-size="11.5" font-weight="700" fill="#ef4444" text-anchor="middle">重心铅垂线必穿过脚掌！否则必向后仰倒</text>
        <text x="132" y="106" font-size="11" font-weight="700" fill="#db2777">尾椎顺脊柱延出</text>
      </g>

      <!-- Right: 3/4 Dynamic Stride Legs + Fluffy Tail Volume -->
      <rect x="616" y="92" width="536" height="764" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="636" y="120" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.84">区 2 · 3/4 跨步动态兽足与大尾巴立体体块架</text>

      <g transform="translate(874, 212)">
        <!-- Ground perspective ellipse -->
        <ellipse cx="0" cy="574" rx="186" ry="30" fill="#6366f1" fill-opacity="0.05" stroke="#4f46e5" stroke-opacity="0.38" stroke-width="1.5" stroke-dasharray="5 4"/>
        <!-- Tilted pelvis box -->
        <path d="M -68 -16 L 62 -36 L 76 52 L -56 68 Z" fill="#6366f1" fill-opacity="0.08" stroke="#4f46e5" stroke-opacity="0.62" stroke-width="1.8"/>
        <!-- Front load-bearing Z-leg (left side) -->
        <path d="M -36 46 L -104 204 L -32 364 L -68 552" fill="none" stroke="#4f46e5" stroke-opacity="0.78" stroke-width="2.8"/>
        <path d="M -68 48 C -132 108, -148 182, -118 242 C -90 294, -64 334, -52 374 C -74 440, -96 502, -108 552 C -126 566, -124 584, -90 584 L -34 584 C -24 568, -28 548, -36 534 C -16 472, 2 412, -2 360 C 10 314, -20 264, -46 218 C -14 166, -6 112, -4 58" fill="#6366f1" fill-opacity="0.05" stroke="#4f46e5" stroke-opacity="0.62" stroke-width="2" stroke-dasharray="6 4"/>
        <!-- Back trailing Z-leg (right side, stepping back) -->
        <path d="M 46 38 L 4 186 L 106 336 L 84 516" fill="none" stroke="#0284c7" stroke-opacity="0.7" stroke-width="2.6" stroke-dasharray="5 3"/>
        <ellipse cx="78" cy="534" rx="42" ry="18" fill="none" stroke="#0284c7" stroke-opacity="0.6" stroke-width="1.8"/>
        <!-- Big sweeping S-curve tail emerging seamlessly from lower back -->
        <path d="M 64 26 C 138 14, 198 -44, 222 -118" fill="none" stroke="#db2777" stroke-opacity="0.68" stroke-width="2.2" stroke-dasharray="6 4"/>
        <path d="M 64 4 C 118 -20, 166 -76, 192 -134 C 228 -144, 250 -120, 236 -74 C 216 -4, 160 54, 72 56" fill="#db2777" fill-opacity="0.06" stroke="#db2777" stroke-opacity="0.68" stroke-width="2" stroke-dasharray="6 4"/>
        <!-- Labels -->
        <text x="-136" y="346" font-size="11.5" font-weight="700" fill="#4f46e5">前腿承重略收</text>
        <text x="122" y="348" font-size="11.5" font-weight="700" fill="#0284c7">后腿高位踝外凸</text>
        <text x="152" y="-142" font-size="11.5" font-weight="700" fill="#db2777" text-anchor="middle">粗壮尾根 → 蓬松尾尖</text>
      </g>
      `
    )
  },

  {
    id: 'tpl-furry-fullbody',
    name: '兽人全身 6.5 头身融合骨架 + 剪影可读性自检框',
    track: 'furry',
    lessonId: 'furry-8',
    description: '左侧提供 6.5 头身动势兽人全身骨架（头吻/胸腔/骨盆/Z腿/大尾一体化）；右侧提供大剪影缩略图自检区。',
    imageUrl: './assets/diagrams/furry-kemono-ears-body.jpg',
    svgContent: wrapTemplateSVG(
      'FURRY-8 · 兽人全身比例融合与角色大剪影设计',
      '口诀：头颈靠毛领自然过渡 · 6.5 头身平衡力量与萌感 · 耳朵与大尾巴是拉升剪影辨识度的双翼',
      `
      <!-- Left: 6.5-Head Hero Pose Furry Full-Body Scaffold -->
      <rect x="48" y="92" width="664" height="764" rx="14" fill="none" stroke="#10b981" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="68" y="120" font-size="13.5" font-weight="700" fill="#059669" fill-opacity="0.84">区 1 · 6.5 头身兽人全身融合骨架（头-颈毛-躯干-Z腿-尾一体动势）</text>

      <!-- Head-unit horizontal proportion ruler (6.5 units from y=160 to y=810, 100px per head) -->
      <g stroke="#94a3b8" stroke-opacity="0.34" stroke-width="1.1" stroke-dasharray="4 4">
        <line x1="76" y1="160" x2="684" y2="160"/>
        <line x1="76" y1="260" x2="684" y2="260"/>
        <line x1="76" y1="360" x2="684" y2="360"/>
        <line x1="76" y1="460" x2="684" y2="460"/>
        <line x1="76" y1="560" x2="684" y2="560"/>
        <line x1="76" y1="660" x2="684" y2="660"/>
        <line x1="76" y1="760" x2="684" y2="760"/>
        <line x1="76" y1="810" x2="684" y2="810" stroke="#0f172a" stroke-opacity="0.48" stroke-dasharray="none" stroke-width="1.8"/>
      </g>
      <g font-size="11" fill="#475569" fill-opacity="0.78">
        <text x="72" y="156">0 颅顶</text>
        <text x="72" y="256">1 下颌</text>
        <text x="72" y="356">2 胸廓</text>
        <text x="72" y="456">3 骨盆</text>
        <text x="72" y="556">4 真膝</text>
        <text x="72" y="656">5 高位踝</text>
        <text x="72" y="806" font-weight="700" fill="#059669">6.5 地面</text>
      </g>

      <!-- Center plumb line -->
      <line x1="382" y1="140" x2="382" y2="824" stroke="#ef4444" stroke-opacity="0.45" stroke-width="1.6" stroke-dasharray="7 5"/>

      <!-- Full-Body Furry Construction Figure -->
      <g transform="translate(382, 160)">
        <!-- Head + 3/4 Muzzle + Expressive Ears -->
        <circle cx="0" cy="48" r="46" fill="#10b981" fill-opacity="0.06" stroke="#059669" stroke-opacity="0.68" stroke-width="1.9"/>
        <path d="M -34 52 L -74 64 C -74 78, -60 88, -32 88" fill="none" stroke="#059669" stroke-opacity="0.72" stroke-width="2"/>
        <path d="M -26 12 C -46 -30, -34 -56, -12 -60 C 2 -44, 6 -16, 2 6" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.7" stroke-width="1.8"/>
        <path d="M 24 8 C 48 -32, 74 -48, 92 -42 C 84 -10, 66 20, 40 34" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.7" stroke-width="1.8"/>
        <!-- Neck & Fur Collar transition -->
        <path d="M -24 92 C -32 114, -56 126, -78 140 M 26 88 C 34 112, 58 124, 80 136" fill="none" stroke="#059669" stroke-opacity="0.62" stroke-width="1.9"/>
        <!-- Ribcage Egg (tilted slightly) -->
        <ellipse cx="0" cy="186" rx="58" ry="68" transform="rotate(-6 0 186)" fill="#0284c7" fill-opacity="0.05" stroke="#0284c7" stroke-opacity="0.6" stroke-width="1.8"/>
        <!-- Pelvis Box (counter-tilted) -->
        <path d="M -52 268 L 54 256 L 62 328 L -46 338 Z" fill="#6366f1" fill-opacity="0.06" stroke="#4f46e5" stroke-opacity="0.6" stroke-width="1.8"/>
        <!-- Flowing Line of Action Spine -->
        <path d="M 0 56 C -8 146, -12 232, 4 308" fill="none" stroke="#d97706" stroke-opacity="0.65" stroke-width="2" stroke-dasharray="5 3"/>
        <!-- Arms (relaxed athletic pose + chunky paws) -->
        <path d="M -76 142 L -114 246 L -96 346" fill="none" stroke="#059669" stroke-opacity="0.65" stroke-width="2"/>
        <circle cx="-94" cy="362" r="20" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.62" stroke-width="1.7"/>
        <path d="M 78 138 L 118 232 L 106 326" fill="none" stroke="#059669" stroke-opacity="0.65" stroke-width="2"/>
        <circle cx="104" cy="342" r="20" fill="#10b981" fill-opacity="0.08" stroke="#059669" stroke-opacity="0.62" stroke-width="1.7"/>
        <!-- Digitigrade Z-Legs balanced around plumb line -->
        <!-- Left leg (weight-bearing) -->
        <path d="M -28 326 L -74 420 L -24 522 L -46 636" fill="none" stroke="#4f46e5" stroke-opacity="0.78" stroke-width="2.6"/>
        <ellipse cx="-54" cy="642" rx="34" ry="12" fill="#4f46e5" fill-opacity="0.1" stroke="#4f46e5" stroke-opacity="0.7" stroke-width="1.8"/>
        <!-- Right leg (relaxed counter-step) -->
        <path d="M 38 318 L 28 416 L 88 518 L 62 634" fill="none" stroke="#0284c7" stroke-opacity="0.75" stroke-width="2.6"/>
        <ellipse cx="56" cy="642" rx="34" ry="12" fill="#0284c7" fill-opacity="0.1" stroke="#0284c7" stroke-opacity="0.7" stroke-width="1.8"/>
        <!-- Large expressive sweeping tail balancing silhouette -->
        <path d="M 56 308 C 146 312, 206 254, 224 186 C 248 228, 224 316, 152 356 C 110 378, 74 366, 54 338" fill="#db2777" fill-opacity="0.08" stroke="#db2777" stroke-opacity="0.72" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="196" y="172" font-size="11.5" font-weight="700" fill="#db2777" text-anchor="middle">大尾巴平衡构图</text>
      </g>

      <!-- Right: Silhouette Readability & Design Check Thumbnails -->
      <rect x="734" y="92" width="418" height="764" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.3" stroke-dasharray="6 6"/>
      <text x="754" y="120" font-size="13.5" font-weight="700" fill="#4f46e5" fill-opacity="0.84">区 2 · 剪影辨识度测试格（涂黑仍能一眼认出物种）</text>

      <!-- Silhouette Box 1: Standing -->
      <rect x="764" y="152" width="358" height="310" rx="12" fill="#6366f1" fill-opacity="0.03" stroke="#4f46e5" stroke-opacity="0.4" stroke-dasharray="5 4"/>
      <text x="943" y="180" font-size="12" font-weight="700" fill="#4f46e5" text-anchor="middle">测试 A · 静态立绘剪影缩略图</text>
      <text x="943" y="200" font-size="11" fill="#475569" text-anchor="middle">用粗马克笔一笔涂黑剪影，检查 3 大特征点：</text>
      <text x="788" y="420" font-size="11" fill="#059669">✓ 耳朵轮廓清晰探出头部外</text>
      <text x="788" y="442" font-size="11" fill="#059669">✓ 尾巴与双臂留出透气负空间</text>

      <!-- Silhouette Box 2: Dynamic Action -->
      <rect x="764" y="486" width="358" height="340" rx="12" fill="#10b981" fill-opacity="0.03" stroke="#059669" stroke-opacity="0.4" stroke-dasharray="5 4"/>
      <text x="943" y="514" font-size="12" font-weight="700" fill="#059669" text-anchor="middle">测试 B · 动态奔跑/跳跃剪影格</text>
      <!-- Dynamic C-curve guide inside Box 2 -->
      <path d="M 832 764 C 892 688, 956 626, 1044 574" fill="none" stroke="#10b981" stroke-opacity="0.45" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#tpl-arrow-emerald)"/>
      <text x="943" y="806" font-size="11" fill="#475569" text-anchor="middle">沿对角动作线画出「兽耳 → 脊柱 → Z腿 → 尾巴」联动</text>
      `
    )
  }
];

// ============================================================================
// 🐾 FURRY LESSONS (8 Progressive Lessons: furry-1 .. furry-8)
// ============================================================================

export const FURRY_LESSONS = [
  {
    id: 'furry-1',
    track: 'furry',
    tier: 'beginner',
    order: 1,
    title: '动物头骨球体与3D吻部(日/美对比)',
    mantra: '日系 Kemono 靠大球配紧凑圆吻显萌，美系 Furry 靠长棱柱吻显骨相。',
    subtitle: '以日系 Kemono 为主线，同时对比美系长吻结构差异',
    difficulty: '入门 ⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-furry-canine',
    cheatSheetSVG: PLATE_FURRY_KEMONO_MUZZLE,
    variants: [
      { id: 'kemono', label: '🇯🇵 日系 Kemono 示范 (推荐)', svg: PLATE_FURRY_KEMONO_MUZZLE },
      { id: 'western', label: '🇺🇸 美系 Furry 对比示范', svg: PLATE_FURRY_WESTERN_MUZZLE },
    ],
    keyPoints: [
      { title: '吻部源自球面中线', detail: '先画头球弧形中线，再让 3D 梯形吻部沿中线交点笔直伸出。' },
      { title: '必交代额鼻台阶', detail: '额头落到鼻梁的清晰折角（Stop）是犬科立体感核心。' },
      { title: '顶面收窄下颌内托', detail: '区分鼻梁顶面、两侧颊面与前端鼻头，下颌略短且轻收吻底。' }
    ],
    pitfalls: [
      { wrong: '3/4 侧面把吻部贴在球最外缘，显得侧歪。', fix: '吻部根部必须嵌进圆球内部，眼眶紧贴鼻梁上方两侧。' },
      { wrong: '把鼻头画成浮在空中或小得像芝麻的圆点。', fix: '犬科鼻头牢牢包住吻部最前端顶角，呈饱满倒圆角梯形。' }
    ],
    checklist: [
      '沿区 1~3 描出三角度 3D 吻部棱柱',
      '在区 4 空球按箭头独立长出仰/平/俯视犬吻',
      '用红线检查吻部轴线是否直穿球心且左右对称'
    ],
    videos: [
      {
        id: 'vid-furry1-bili',
        title: 'Furry兽人头部入门：犬科头骨球体与3D吻部透视',
        author: 'B站兽人结构系统教程',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=Furry+%E5%85%BD%E4%BA%BA+%E5%A4%B4%E9%83%A8+%E5%90%BB%E9%83%A8+%E7%BB%93%E6%9E%84+%E6%95%99%E7%A8%8B',
        keywords: 'Furry 兽人 头部 吻部 结构 教程',
        duration: '约16分钟',
        timestamps: [
          { time: '00:00', label: '头骨球与 3D 梯形吻部的穿插原理' },
          { time: '05:40', label: '3/4 侧面额鼻台阶与下颌咬合示范' },
          { time: '11:20', label: '仰视与俯视角度下的吻部透视推导' }
        ],
        summary: '零基础攻克犬科兽头球体与 3D 梯形吻部。'
      },
      {
        id: 'vid-furry1-yt',
        title: 'How to Draw Furry Heads & Canine Muzzles (Imaginatively Unimaginative)',
        author: 'Imaginatively Unimaginative',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=how+to+draw+furry+head+canine+muzzle+3d+tutorial',
        keywords: 'how to draw furry head canine muzzle 3d tutorial',
        duration: '约14分钟',
        timestamps: [
          { time: '00:00', label: '用基础几何体锁定任何角度的吻部' },
          { time: '05:10', label: '鼻梁宽度与眼窝包裹关系' },
          { time: '10:00', label: '下颌与腮毛衔接实战' }
        ],
        summary: '海外高赞 Furry 教程，直击 3D 吻部透视本质。'
      }
    ]
  },

  {
    id: 'furry-2',
    track: 'furry',
    tier: 'beginner',
    order: 2,
    title: '猫科短吻胡须垫 vs 龙类长吻',
    mantra: '猫科短吻靠圆润双球胡须垫，龙类长吻靠硬朗多面棱角与眉脊。',
    subtitle: '告别全员狗头，一眼区分日系萌猫与龙类头骨特征',
    difficulty: '入门 ⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-furry-species',
    cheatSheetSVG: PLATE_FURRY_WESTERN_MUZZLE,
    variants: [
      { id: 'western-dragon', label: '🇺🇸 美系长吻 & 龙类对照', svg: PLATE_FURRY_WESTERN_MUZZLE },
      { id: 'kemono-cat', label: '🇯🇵 日系 Kemono 犬/猫对比', svg: PLATE_FURRY_KEMONO_MUZZLE },
    ],
    keyPoints: [
      { title: '猫科核心：短圆ω垫', detail: '吻长缩至球径 1/3，靠两颗饱满圆球胡须垫与小三角鼻出萌感。' },
      { title: '龙类核心：多面棱角', detail: '用硬折面替代圆球软肉，配突出眉脊与细长鼻孔而非狗鼻垫。' },
      { title: '龙角必须有椭圆基座', detail: '角根如耳座般贴附颅顶后上侧，顺头骨弧度向后优雅延展。' }
    ],
    pitfalls: [
      { wrong: '画猫科时只把耳朵改短，吻部依然和狼一样又长又尖。', fix: '果断压缩猫吻突出长度，放大眼睛并把腮毛横向拉宽。' },
      { wrong: '画龙角像两根插在头顶的冰激凌筒，缺乏穿插感。', fix: '先在颅骨后上方画椭圆角座，角身自带弯曲与粗细渐变。' }
    ],
    checklist: [
      '完成区 1 猫科短吻、双球胡须垫与大眼结构',
      '完成区 2 龙类棱角长吻、眉脊与角座推导',
      '对比犬/猫/龙草图，确认不看耳也能分清物种'
    ],
    videos: [
      {
        id: 'vid-furry2-bili',
        title: '告别全员狗头！猫科、犬科与龙类兽头结构差异精讲',
        author: 'B站兽设物种解剖课',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=Furry+%E7%8C%AB%E7%A7%91+%E7%8A%AC%E7%A7%91+%E9%BE%99+%E5%85%BD%E5%A4%B4+%E5%8C%BA%E5%88%AB',
        keywords: 'Furry 猫科 犬科 龙 兽头 区别',
        duration: '约17分钟',
        timestamps: [
          { time: '00:00', label: '为什么你画的猫和龙总像修勾' },
          { time: '05:30', label: '猫科短吻、胡须垫与大眼比例秘诀' },
          { time: '11:45', label: '龙类硬朗面块、眉脊与龙角基座画法' }
        ],
        summary: '逐项拆解猫科圆润短吻与龙类硬朗长吻的差异。'
      },
      {
        id: 'vid-furry2-yt',
        title: 'Drawing Different Furry Species: Cats vs Dogs vs Dragons',
        author: 'Furry Art Academy',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=how+to+draw+furry+cat+vs+dog+vs+dragon+head',
        keywords: 'how to draw furry cat vs dog vs dragon head',
        duration: '约13分钟',
        timestamps: [
          { time: '00:00', label: '头骨形状与吻长比例对比' },
          { time: '04:40', label: '猫科 ω 嘴与胡须垫体块演示' },
          { time: '09:10', label: '龙类爬行动物颌骨与角座透视' }
        ],
        summary: '同角度横评猫/犬/龙三大热门兽设头型画法。'
      }
    ]
  },

  {
    id: 'furry-3',
    track: 'furry',
    tier: 'beginner',
    order: 3,
    title: '兽耳斜向球面基座与耳廓厚度',
    mantra: '先画球侧斜向椭圆耳座，再用曲线立起带卷边厚度的漏斗耳。',
    subtitle: '彻底告别纸片直边三角形，画出立体毛茸茸的日系兽耳',
    difficulty: '入门 ⭐',
    estimatedMinutes: 20,
    templateId: 'tpl-furry-ears',
    cheatSheetSVG: PLATE_FURRY_KEMONO_EARS_BODY,
    keyPoints: [
      { title: '耳座斜贴头球后上', detail: '先在头骨后上斜侧画椭圆耳座，耳朵顺球面法线斜外伸出。' },
      { title: '用有机叶弧画耳廓', detail: '用饱满外凸、内收柔和的立方曲线替代僵硬直边三角形。' },
      { title: '交代外卷耳缘厚度', detail: '画出外耳廓向内翻卷的双线厚度与耳根小折袋，再点缀耳毛。' }
    ],
    pitfalls: [
      { wrong: '画 3/4 侧面时两只耳朵画得一样宽且左右平齐。', fix: '近耳靠后显厚并露耳廓正面，远耳偏前被颅顶微遮显窄。' },
      { wrong: '用锯齿状乱毛填满整个内耳，看不清耳窝深浅。', fix: '耳毛自内耳底缘斜弧扫出 2~3 簇，留出深色耳窝。' }
    ],
    checklist: [
      '在区 1 三角度头球准确标出斜向椭圆耳座',
      '在区 2 画出犬/猫/狐三型兽耳外缘卷边厚度',
      '检查所有耳朵均为柔顺有机曲线，零硬直三角'
    ],
    videos: [
      {
        id: 'vid-furry3-bili',
        title: '兽耳不再像发箍！兽耳斜向基座、耳廓厚度与动态画法',
        author: 'B站兽耳与毛发专题课',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=%E5%85%BD%E8%80%B3+%E7%94%BB%E6%B3%95+%E8%80%B3%E5%BA%A7+%E8%80%B3%E5%BB%93%E5%8E%9A%E5%BA%A6+Furry',
        keywords: '兽耳 画法 耳座 耳廓厚度 Furry',
        duration: '约14分钟',
        timestamps: [
          { time: '00:00', label: '为什么画的耳朵像贴上去的塑料发箍' },
          { time: '04:50', label: '把兽耳理解成切斜口的立体圆锥漏斗' },
          { time: '09:30', label: '外耳廓折袋与内耳毛流畅分组演示' }
        ],
        summary: '用立体漏斗法讲清兽耳基座、翻卷厚度与耳毛。'
      },
      {
        id: 'vid-furry3-yt',
        title: 'How to Draw Animal & Furry Ears in 3D (Mimi / Furry Guide)',
        author: 'Furry Drawing Guide',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=how+to+draw+furry+animal+ears+3d+structure',
        keywords: 'how to draw furry animal ears 3d structure',
        duration: '约10分钟',
        timestamps: [
          { time: '00:00', label: '椭圆基座与多角度转头遮挡关系' },
          { time: '04:10', label: '猫耳、狼耳、狐耳与垂耳曲率对比' },
          { time: '07:20', label: '耳廓阴影与耳毛簇节奏处理' }
        ],
        summary: '简练易懂的 3D 兽耳透视与多物种形态对比。'
      }
    ]
  },

  {
    id: 'furry-4',
    track: 'furry',
    tier: 'foundation',
    order: 4,
    title: '兽人表情：耳位、鼻皱与咧嘴',
    mantra: '兽耳是第二对眉毛！耳位偏转、鼻梁挤皱与吻角曲折同步联动。',
    subtitle: '把动物天性融入拟人表情，让兽设情绪鲜活十倍',
    difficulty: '基础 ⭐⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-furry-expressions',
    cheatSheetSVG: PLATE_FURRY_KEMONO_EXPRESSIONS,
    keyPoints: [
      { title: '耳位即情绪晴雨表', detail: '兴奋高竖前倾、委屈压平飞机耳、戒备低吼则向后贴紧脑后。' },
      { title: '愤怒必画鼻皱与掀唇', detail: '低吼时鼻梁挤出短横皱，上唇呈波浪掀高露出尖锐犬齿。' },
      { title: '嘴角顺吻部弧面延展', detail: '大笑或咧嘴时嘴角沿着吻侧曲面一路上挑，不要只画平直线。' }
    ],
    pitfalls: [
      { wrong: '画飞机耳时把耳朵画断了，忘记它是绕着耳座旋转。', fix: '耳根椭圆位置基本不变，只是耳廓沿耳座向两侧外旋压低。' },
      { wrong: '张大嘴时把上吻部一起往下掰弯，头骨变形。', fix: '只有下颌骨可以绕耳下关节向下旋转张开，上颅骨不动。' }
    ],
    checklist: [
      '完成底图竖耳、飞机耳、低吼与歪头 4 格草图',
      '检查愤怒格具备耳后贴、鼻皱与掀唇露牙三要素',
      '检查张口时上吻稳固、下颌绕关节自然下张'
    ],
    videos: [
      {
        id: 'vid-furry4-bili',
        title: '让你的兽设活起来！Furry 兽人表情、飞机耳与龇牙画法',
        author: 'B站兽人表情进阶教程',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=Furry+%E5%85%BD%E4%BA%BA+%E8%A1%A8%E6%83%85+%E9%A3%9E%E6%9C%BA%E8%80%B3+%E9%BE%87%E7%89%99',
        keywords: 'Furry 兽人 表情 飞机耳 龇牙',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: '耳朵角度对兽人情绪表达的决定性作用' },
          { time: '05:20', label: '低吼龇牙时的鼻梁皱纹与上唇波浪线' },
          { time: '10:30', label: '张嘴大笑的下颌旋转轴与舌头透视' }
        ],
        summary: '专攻兽耳角度联动、鼻皱与立体张嘴咧嘴。'
      },
      {
        id: 'vid-furry4-yt',
        title: 'How to Draw Furry Expressions & Snarls (Zillion Ross)',
        author: 'Zillion Ross',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=how+to+draw+furry+expressions+ears+snarl',
        keywords: 'how to draw furry expressions ears snarl',
        duration: '约12分钟',
        timestamps: [
          { time: '00:00', label: '开心/委屈/愤怒三种耳位变化示范' },
          { time: '04:50', label: '吻部肌肉挤压与犬齿排列规律' },
          { time: '08:30', label: '不对称单耳歪头的萌点营造' }
        ],
        summary: '经典兽人表情课，生动演示耳位与吻部肌肉联动。'
      }
    ]
  },

  {
    id: 'furry-5',
    track: 'furry',
    tier: 'foundation',
    order: 5,
    title: '簇状毛发概括与长短毛节奏',
    mantra: '先画顺滑大轮廓，只在转折加毛簇；大中小分组，严禁锯齿。',
    subtitle: '告别重复小尖刺，画出柔软蓬松的皮毛质感',
    difficulty: '基础 ⭐⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-furry-fur',
    cheatSheetSVG: PLATE_FURRY_KEMONO_FUR_TUFTS,
    keyPoints: [
      { title: '少即是多：顺滑优先', detail: '吻部、额头和四肢前侧为短毛，用光滑轮廓线留白透气。' },
      { title: '毛簇聚在转折与重力处', detail: '把蓬松毛簇集中在腮帮、胸鬃、手肘与尾巴外弯等关键转折。' },
      { title: '大中小同向顺流分组', detail: '每组毛簇顺着生长矢量方向一致弯曲，用大带小破除呆板。' }
    ],
    pitfalls: [
      { wrong: '画满轮廓的微小三角锯齿，线条琐碎且发硬。', fix: '把碎锯齿合并成一大一小两个柔顺 S 弧毛簇。' },
      { wrong: '逆着毛发生长方向乱撇，像被静电炸开的乱草。', fix: '牢记毛发总是由鼻尖向脑后、由脊背顺重力向四肢末端流淌。' }
    ],
    checklist: [
      '沿区 1 毛流箭头区分短毛吻部与蓬松腮胸毛',
      '在区 2 练出短、中、长三种毛发簇状节奏',
      '在区 3 为肘部与大尾巴套上流畅大中小毛簇'
    ],
    videos: [
      {
        id: 'vid-furry5-bili',
        title: '毛发不画仙人掌！Furry 簇状毛发概括与长短毛节奏',
        author: 'B站兽人毛发质感教程',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=Furry+%E6%AF%9B%E5%8F%91+%E7%94%BB%E6%B3%95+%E7%B0%87%E7%8A%B6+%E9%95%BF%E7%9F%AD%E6%AF%9B',
        keywords: 'Furry 毛发 画法 簇状 长短毛',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: '仙人掌锯齿 vs 高级簇状毛发对比' },
          { time: '05:10', label: '动物全身毛发生长流向地图' },
          { time: '10:20', label: '胸毛、腮毛与蓬松大尾巴分组实战' }
        ],
        summary: '专治毛发杂乱锯齿，掌握大中小簇状节奏。'
      },
      {
        id: 'vid-furry5-yt',
        title: 'How to Draw Fluffy Fur Easily (Ashmish / Furry Art)',
        author: 'Furry Art Tutorial',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=how+to+draw+furry+fur+tufts+fluffy+tutorial',
        keywords: 'how to draw furry fur tufts fluffy tutorial',
        duration: '约11分钟',
        timestamps: [
          { time: '00:00', label: '先画光面体块再局部开簇的原则' },
          { time: '04:00', label: '大中小毛簇 7:2:1 组合法' },
          { time: '07:45', label: '不同毛长（短毛猫 vs 蓬松狐）处理差异' }
        ],
        summary: '直观易学的毛簇概括法，几笔画出蓬松手感。'
      }
    ]
  },

  {
    id: 'furry-6',
    track: 'furry',
    tier: 'foundation',
    order: 6,
    title: '兽掌肉垫结构与爪尖立体感',
    mantra: '厚实掌盒配粗短指柱，贴心形主垫与饱满指豆，爪自指背弯出。',
    subtitle: '把平扁海星手变成肉呼呼、有握力的立体兽掌',
    difficulty: '基础 ⭐⭐',
    estimatedMinutes: 25,
    templateId: 'tpl-furry-paws',
    cheatSheetSVG: PLATE_FURRY_KEMONO_EARS_BODY,
    keyPoints: [
      { title: '指柱粗短呈弧拱', detail: '兽指比人手粗短圆润，指根呈扇形弧拱排列更有抓握感。' },
      { title: '心形主垫配椭圆豆', detail: '掌心铺饱满三叶/心形主肉垫，每根指腹紧贴一颗圆润指豆。' },
      { title: '爪尖自指背套筒弯出', detail: '爪子有粗细与弧弯，从指背椭圆套筒长出而非粘在肉垫上。' }
    ],
    pitfalls: [
      { wrong: '把大拇指画得和其他指齐平，无法做出抓握。', fix: '拇指从掌侧低位斜出并自带对握角度，与其余指形成夹角。' },
      { wrong: '画爪子时只画扁平小三角，缺少立体弯曲弧度。', fix: '把爪尖想成微弯的小圆锥，先定爪根椭圆再顺弧线收尖。' }
    ],
    checklist: [
      '在区 1 画出厚实掌块、心形主垫与 4 颗指豆',
      '在区 2 沿弧拱指节画出半握态兽掌与套筒弯爪',
      '在区 3 补全单指侧面肉垫鼓包与指背埋根爪尖'
    ],
    videos: [
      {
        id: 'vid-furry6-bili',
        title: '肉呼呼的兽掌怎么画？Furry 手爪肉垫与抓握立体结构',
        author: 'B站兽人手足结构课',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=Furry+%E5%85%BD%E6%8E%8C+%E8%82%89%E5%9E%AB+%E7%88%AA%E5%AD%90+%E7%94%BB%E6%B3%95',
        keywords: 'Furry 兽掌 肉垫 爪子 画法',
        duration: '约14分钟',
        timestamps: [
          { time: '00:00', label: '人类手掌转化为圆润兽掌的 3 个关键改动' },
          { time: '04:40', label: '掌心三叶肉垫与指豆透视鼓起表现' },
          { time: '09:30', label: '侧面与半握拳姿态下的爪尖穿插画法' }
        ],
        summary: '详解肉感兽掌体块、肉垫分布与立体爪尖衔接。'
      },
      {
        id: 'vid-furry6-yt',
        title: 'How to Draw Furry Paws & Claws from Any Angle',
        author: 'Furry Art Tips',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=how+to+draw+furry+paws+hands+pads+claws',
        keywords: 'how to draw furry paws hands pads claws',
        duration: '约11分钟',
        timestamps: [
          { time: '00:00', label: '用粗圆柱与圆盒概括兽掌体块' },
          { time: '04:15', label: '掌心肉垫在握拳时的挤压变形' },
          { time: '07:50', label: '犬爪 vs 猫爪伸缩结构差异' }
        ],
        summary: '从几何体块到握拳变形，全面掌握兽掌与爪尖。'
      }
    ]
  },

  {
    id: 'furry-7',
    track: 'furry',
    tier: 'advanced',
    order: 7,
    title: '反关节兽足Z字力学与尾流线',
    mantra: '大腿前、小腿后、高踝抬起，脚掌正落重心线，尾顺脊柱延出。',
    subtitle: '彻底厘清趾行兽足解剖真相，告别站不稳的断腿感',
    difficulty: '进阶 ⭐⭐⭐',
    estimatedMinutes: 30,
    templateId: 'tpl-furry-legs',
    cheatSheetSVG: PLATE_FURRY_KEMONO_EARS_BODY,
    variants: [
      { id: 'kemono', label: '🌸 日系 Kemono 反关节Z腿与重心', svg: PLATE_FURRY_KEMONO_EARS_BODY },
      { id: 'fur-tufts', label: '🦊 骨盆S型蓬松大尾与毛流', svg: PLATE_FURRY_KEMONO_FUR_TUFTS },
    ],
    keyPoints: [
      { title: '高位踝关节不是反膝', detail: '后折的高位关节其实是悬空脚后跟，真正膝盖仍在上方朝前弯。' },
      { title: '脚掌必落重心铅垂线', detail: '从骨盆垂下重力线，前移脚掌正压铅垂线才能站得稳当有力。' },
      { title: '尾巴是脊柱自然延长', detail: '尾根粗壮顺尾椎延出，用完整大 S 曲线贯通脊背至尾尖。' }
    ],
    pitfalls: [
      { wrong: '忘画真膝盖，把腿画成单折的「反向膝」。', fix: '牢记 Z 字三段折线：大腿向前、小腿向后、拉长脚掌向前。' },
      { wrong: '把尾巴画得又细又直，像从裤腰带硬插出来的棍子。', fix: '尾根从臀上自然隆起衔接，顺着角色动势向反方向优雅甩尾。' }
    ],
    checklist: [
      '在区 1 标出髋、真膝、高踝与着地脚掌 4 节点',
      '用红线检验侧面 Z 腿脚掌是否正压重心铅垂线',
      '在区 2 完成 3/4 跨步双腿与脊柱延伸大尾巴'
    ],
    videos: [
      {
        id: 'vid-furry7-bili',
        title: '反关节兽足彻底搞懂！趾行腿 (Digitigrade) Z字结构与尾巴',
        author: 'B站兽人全身解剖课',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=Furry+%E5%8F%8D%E5%85%B3%E8%8A%82+%E5%85%BD%E8%B6%B3+%E8%B6%BE%E8%A1%8C%E8%85%BF+%E5%B0%BE%E5%B7%B4',
        keywords: 'Furry 反关节 兽足 趾行腿 尾巴',
        duration: '约18分钟',
        timestamps: [
          { time: '00:00', label: '对比人腿踮脚：1 分钟看懂高位踝关节原理' },
          { time: '06:20', label: '侧面与 3/4 侧面 Z 字肌肉穿插示范' },
          { time: '12:30', label: '粗大蓬松尾巴与尾椎无缝衔接技巧' }
        ],
        summary: '用人腿踮脚类比讲透反关节兽足力学与大尾。'
      },
      {
        id: 'vid-furry7-yt',
        title: 'How to Draw Digitigrade Legs & Tails Easily (Imaginatively Unimaginative)',
        author: 'Imaginatively Unimaginative',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=how+to+draw+digitigrade+furry+legs+and+tails',
        keywords: 'how to draw digitigrade furry legs and tails',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: '打破「反向膝盖」误区：真实骨骼三段比' },
          { time: '05:40', label: '重心铅垂线平衡检查法' },
          { time: '10:30', label: '奔跑与跳跃动作下的 Z 腿压缩展开' }
        ],
        summary: '高口碑兽足教学，彻底解决重心歪倒与断腿感。'
      }
    ]
  },

  {
    id: 'furry-8',
    track: 'furry',
    tier: 'advanced',
    order: 8,
    title: '兽人全身比例融合与角色剪影',
    mantra: '颈毛过渡人兽躯干，6.5头身稳重心，靠耳与大尾拉满剪影。',
    subtitle: '融合兽头、躯干、兽掌与兽足，完成兽设立绘',
    difficulty: '进阶 ⭐⭐⭐',
    estimatedMinutes: 30,
    templateId: 'tpl-furry-fullbody',
    cheatSheetSVG: PLATE_FURRY_KEMONO_EARS_BODY,
    variants: [
      { id: 'kemono', label: '🌸 日系 Kemono 6头身全身比例', svg: PLATE_FURRY_KEMONO_EARS_BODY },
      { id: 'fur-tufts', label: '🦊 簇状毛发与蓬松大尾节奏', svg: PLATE_FURRY_KEMONO_FUR_TUFTS },
    ],
    keyPoints: [
      { title: '颈毛是人兽融合枢纽', detail: '用蓬松脖颈毛领自然连接兽头与人体肩胸，彻底消除玩偶割裂感。' },
      { title: '6.5头身耐看比例', detail: '兽头略大于真人头，配合 6~6.5 头身与饱满兽掌/Z腿最协调。' },
      { title: '纯黑剪影自检法则', detail: '把角色涂成纯黑，若耳朵、四肢负空间与大尾仍清晰可读即过关。' }
    ],
    pitfalls: [
      { wrong: '躯干四肢按瘦长人偶画，显得头重脚轻割裂。', fix: '略微加厚前臂、手爪与大腿肌量，整体体量向兽头看齐。' },
      { wrong: '把尾巴藏在两腿后侧，浪费了最强剪影元素。', fix: '让大尾巴向画面空旷一侧大幅甩出，与头手形成三角平衡。' }
    ],
    checklist: [
      '沿区 1 的 6.5 头身标尺画站姿兽人草图',
      '用马克笔在区 2 涂黑剪影，检验耳臂尾清晰度',
      '在区 2 底部挑战一幅沿对角线奔跑的动态剪影'
    ],
    videos: [
      {
        id: 'vid-furry8-bili',
        title: '从头像到全身立绘！Furry 兽人全身比例与高级剪影设计',
        author: 'B站原创兽设角色设计课',
        platform: 'bilibili',
        url: 'https://search.bilibili.com/all?keyword=Furry+%E5%85%BD%E4%BA%BA+%E5%85%A8%E8%BA%AB%E6%AF%94%E4%BE%8B+%E7%AB%8B%E7%BB%98+%E5%89%AA%E5%BD%B1%E8%AE%BE%E8%AE%A1',
        keywords: 'Furry 兽人 全身比例 立绘 剪影设计',
        duration: '约20分钟',
        timestamps: [
          { time: '00:00', label: '为什么全身兽人容易像人穿玩偶服' },
          { time: '06:40', label: '6.5 头身兽人胸腹、毛领与 Z 腿一体化推导' },
          { time: '14:10', label: '用纯黑剪影法快速检验原创兽设辨识度' }
        ],
        summary: '综合全轨知识，打通 6.5 头身兽人立绘与大剪影。'
      },
      {
        id: 'vid-furry8-yt',
        title: 'How to Draw Full Body Furry Characters & Proportions',
        author: 'Furry Character Design',
        platform: 'youtube',
        url: 'https://www.youtube.com/results?search_query=how+to+draw+full+body+furry+character+proportions+silhouette',
        keywords: 'how to draw full body furry character proportions silhouette',
        duration: '约16分钟',
        timestamps: [
          { time: '00:00', label: '不同兽设画风（日系萌兽 vs 欧美肌肉兽）头身比' },
          { time: '06:15', label: '头颈毛领融合与服装搭配技巧' },
          { time: '11:30', label: '动态大剪影与重心平衡终极复盘' }
        ],
        summary: '系统拆解全身兽人比例融合与动态角色剪影设计。'
      }
    ]
  }
];
