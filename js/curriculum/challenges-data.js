/**
 * DrawPath Studio · 实战课题与随机灵感出题器 (4套构图底图 + 14个分级综合挑战)
 */
import { wrapTemplateSVG } from './svg-helpers.js';

export const CHALLENGE_TEMPLATES = [
  {
    id: 'tpl-frame-portrait',
    name: '头像特写黄金构图框',
    track: 'core',
    lessonId: 'chal-2',
    description: '带三分线交点、头顶留白安全距与肩颈斜角切线的头像特写构图底图。',
    svgContent: wrapTemplateSVG(
      'FRAME-1 · 头像特写黄金构图框',
      '构图口诀：视线落在上三分线交点 · 脸朝向哪边就在哪边多留呼吸空间',
      `
      <!-- Outer safe portrait frame -->
      <rect x="260" y="96" width="680" height="756" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.52" stroke-width="2"/>
      <!-- Rule of thirds -->
      <g stroke="#38bdf8" stroke-opacity="0.34" stroke-width="1.3" stroke-dasharray="6 5">
        <line x1="486" y1="96" x2="486" y2="852"/>
        <line x1="714" y1="96" x2="714" y2="852"/>
        <line x1="260" y1="348" x2="940" y2="348"/>
        <line x1="260" y1="600" x2="940" y2="600"/>
      </g>
      <!-- Headroom & eye interest points -->
      <line x1="280" y1="158" x2="920" y2="158" stroke="#10b981" stroke-opacity="0.4" stroke-dasharray="4 4"/>
      <text x="290" y="148" font-size="11.5" fill="#059669" fill-opacity="0.72">▲ 头顶/发饰呼吸线（避免顶到画框上沿）</text>
      <circle cx="486" cy="348" r="10" fill="none" stroke="#6366f1" stroke-opacity="0.55" stroke-width="1.8"/>
      <circle cx="714" cy="348" r="10" fill="none" stroke="#6366f1" stroke-opacity="0.55" stroke-width="1.8"/>
      <!-- Light subtle oval suggestion -->
      <ellipse cx="600" cy="378" rx="148" ry="188" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6" stroke-width="1.6"/>
      <path d="M542 562 L530 665 L355 775 M658 562 L670 665 L845 775" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="6 6" stroke-width="1.6"/>
      <text x="600" y="832" font-size="12" fill="#475569" fill-opacity="0.72" text-anchor="middle">建议：把主视点眼睛放在上方两个圆环交点附近，肩膀微斜打破死板</text>
      `
    )
  },
  {
    id: 'tpl-frame-halfbody',
    name: '半身人像胸腰构图框',
    track: 'figure',
    lessonId: 'chal-6',
    description: '标准 4 头高半身构图：标出头顶、下巴、胸线、手肘/腰线及跨步/手势延伸区。',
    svgContent: wrapTemplateSVG(
      'FRAME-2 · 半身人像胸腰构图框（约 4 头高裁切）',
      '构图口诀：尽量避开正好切在「手肘、手腕、腰最细」等关节正中处，留出斜向肩胯韵律',
      `
      <rect x="210" y="92" width="780" height="768" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.52" stroke-width="2"/>
      <!-- Rule of thirds -->
      <g stroke="#38bdf8" stroke-opacity="0.3" stroke-width="1.2" stroke-dasharray="6 5">
        <line x1="470" y1="92" x2="470" y2="860"/>
        <line x1="730" y1="92" x2="730" y2="860"/>
        <line x1="210" y1="348" x2="990" y2="348"/>
        <line x1="210" y1="604" x2="990" y2="604"/>
      </g>
      <!-- 4-Head vertical proportion ticks -->
      <g stroke="#0ea5e9" stroke-opacity="0.36" stroke-width="1.2" stroke-dasharray="4 4">
        <line x1="226" y1="155" x2="974" y2="155"/>
        <line x1="226" y1="315" x2="974" y2="315"/>
        <line x1="226" y1="475" x2="974" y2="475"/>
        <line x1="226" y1="635" x2="974" y2="635"/>
        <line x1="226" y1="795" x2="974" y2="795"/>
      </g>
      <g font-size="11" fill="#0284c7" fill-opacity="0.72">
        <text x="234" y="148">0 头顶安全线</text>
        <text x="234" y="308">1 头 · 下巴</text>
        <text x="234" y="468">2 头 · 胸线</text>
        <text x="234" y="628">3 头 · 肚脐 / 手肘</text>
        <text x="234" y="788">4 头 · 胯骨裁切线</text>
      </g>
      <!-- Faint tilted dynamic torso scaffold -->
      <ellipse cx="600" cy="235" rx="56" ry="76" fill="none" stroke="#38bdf8" stroke-opacity="0.28" stroke-dasharray="5 5"/>
      <line x1="475" y1="365" x2="725" y2="395" stroke="#6366f1" stroke-opacity="0.34" stroke-dasharray="5 5" stroke-width="1.8"/>
      <line x1="505" y1="735" x2="695" y2="710" stroke="#6366f1" stroke-opacity="0.34" stroke-dasharray="5 5" stroke-width="1.8"/>
      <text x="600" y="840" font-size="12" fill="#475569" fill-opacity="0.72" text-anchor="middle">提示：胸口与手臂动作可大胆穿出左右三分线，制造纵深视觉张力</text>
      `
    )
  },
  {
    id: 'tpl-frame-fullbody',
    name: '全身动态 7.5 头身与地面透视框',
    track: 'figure',
    lessonId: 'chal-3',
    description: '带 7.5 头身纵向参考标尺与透视地面网格的全身动态构图框，让角色稳踩地面不飘浮。',
    svgContent: wrapTemplateSVG(
      'FRAME-3 · 全身动态 7.5 头身与地面透视框',
      '构图口诀：脚踩进地面透视网格 + 投影贴紧脚掌 · 重心垂线决定动态稳不稳',
      `
      <rect x="140" y="92" width="920" height="768" rx="14" fill="none" stroke="#6366f1" stroke-opacity="0.5" stroke-width="2"/>
      <!-- Perspective Horizon & Floor Grid -->
      <line x1="140" y1="540" x2="1060" y2="540" stroke="#6366f1" stroke-opacity="0.32" stroke-dasharray="6 5" stroke-width="1.4"/>
      <text x="158" y="532" font-size="11" fill="#4f46e5" fill-opacity="0.68">参考视平线 HL（人物腰胯附近）</text>
      <g stroke="#38bdf8" stroke-opacity="0.28" stroke-width="1.2">
        <line x1="600" y1="540" x2="170" y2="860"/>
        <line x1="600" y1="540" x2="380" y2="860"/>
        <line x1="600" y1="540" x2="600" y2="860" stroke-dasharray="5 5"/>
        <line x1="600" y1="540" x2="820" y2="860"/>
        <line x1="600" y1="540" x2="1030" y2="860"/>
        <line x1="140" y1="680" x2="1060" y2="680" stroke-opacity="0.2"/>
        <line x1="140" y1="745" x2="1060" y2="745" stroke-opacity="0.22"/>
        <line x1="140" y1="810" x2="1060" y2="810" stroke-opacity="0.26"/>
      </g>
      <!-- 7.5 Head Scale on Left Margin -->
      <g stroke="#10b981" stroke-opacity="0.4" stroke-width="1.2" stroke-dasharray="4 4">
        <line x1="156" y1="130" x2="360" y2="130"/>
        <line x1="156" y1="220" x2="360" y2="220"/>
        <line x1="156" y1="310" x2="360" y2="310"/>
        <line x1="156" y1="400" x2="360" y2="400"/>
        <line x1="156" y1="490" x2="360" y2="490"/>
        <line x1="156" y1="625" x2="360" y2="625"/>
        <line x1="156" y1="805" x2="360" y2="805"/>
      </g>
      <g font-size="10.5" fill="#059669" fill-opacity="0.78">
        <text x="162" y="124">0 头顶</text>
        <text x="162" y="214">1 下巴</text>
        <text x="162" y="304">2 胸线</text>
        <text x="162" y="394">3 肚脐/肘</text>
        <text x="162" y="484">4 耻骨/腕</text>
        <text x="162" y="619">5.5 膝盖</text>
        <text x="162" y="799">7.5 落脚地线</text>
      </g>
      <text x="600" y="844" font-size="11.5" fill="#475569" fill-opacity="0.72" text-anchor="middle">画完骨架后，务必在地面网格里补出脚下地面投影</text>
      `
    )
  },
  {
    id: 'tpl-frame-sheet',
    name: '四格表情与多角度设定排版框',
    track: 'core',
    lessonId: 'chal-4',
    description: '2×2 均等设定格，带跨格眼睛基准对齐线与底部标签区，适合画表情四宫格或头型三视图。',
    svgContent: wrapTemplateSVG(
      'FRAME-4 · 四格表情 / 多角度角色设定排版框',
      '排版口诀：用跨格参考线保持四个画面的「头大小与眼睛基线」统一 · 留出角色特征标签位',
      `
      <!-- 4 panels (2x2) -->
      <g stroke="#6366f1" stroke-opacity="0.45" stroke-width="1.8" fill="none">
        <rect x="76" y="96" width="504" height="364" rx="12"/>
        <rect x="620" y="96" width="504" height="364" rx="12"/>
        <rect x="76" y="492" width="504" height="364" rx="12"/>
        <rect x="620" y="492" width="504" height="364" rx="12"/>
      </g>
      <!-- Continuous eye alignment bands across row 1 and row 2 -->
      <g stroke="#38bdf8" stroke-opacity="0.34" stroke-width="1.3" stroke-dasharray="5 5">
        <line x1="76" y1="248" x2="1124" y2="248"/>
        <line x1="76" y1="286" x2="1124" y2="286"/>
        <line x1="76" y1="644" x2="1124" y2="644"/>
        <line x1="76" y1="682" x2="1124" y2="682"/>
      </g>
      <!-- Light cranium circles inside each panel -->
      <g stroke="#38bdf8" stroke-opacity="0.28" stroke-width="1.5" stroke-dasharray="6 5" fill="none">
        <circle cx="328" cy="252" r="88"/>
        <circle cx="872" cy="252" r="88"/>
        <circle cx="328" cy="648" r="88"/>
        <circle cx="872" cy="648" r="88"/>
      </g>
      <g font-size="12" font-weight="700" fill="#4f46e5" fill-opacity="0.72">
        <text x="96" y="122">格 01 · 正面 / 常态</text>
        <text x="640" y="122">格 02 · 3/4 半侧面 / 开心大笑</text>
        <text x="96" y="518">格 03 · 侧面或微仰 / 愤怒咬牙</text>
        <text x="640" y="518">格 04 · 自由角度 / 委屈或惊慌</text>
      </g>
      `
    )
  }
];

const ALL_CHALLENGES = [
  {
    id: 'chal-1',
    tier: 'beginner',
    track: 'core',
    category: '综合体块光影',
    title: '几何体静物组合与光影二分',
    brief: '把方体、圆柱、球体摆成前中后三层穿插静物，设左上 45° 主光并涂出干净二分。',
    estimatedMinutes: 25,
    templateId: 'tpl-core-lighting',
    relatedLessonIds: ['core-4', 'core-6', 'core-7'],
    criteria: [
      '用 T 字叠压线区分三大几何体前后遮挡',
      '所有物体的地面投影方向保持一致',
      '暗部铺平且边缘反光亮度低于亮面'
    ]
  },
  {
    id: 'chal-2',
    tier: 'beginner',
    track: 'anime',
    category: '头像表现',
    title: '正/半侧二次元头像特写',
    brief: '从十字球起手画一张二次元角色特写，配合大中小发束刘海与基础脖颈二分投影。',
    estimatedMinutes: 30,
    templateId: 'tpl-frame-portrait',
    relatedLessonIds: ['anime-1', 'anime-3', 'anime-5'],
    criteria: [
      '水平翻转画布后五官中心线不偏歪',
      '头发外轮廓高于头骨球留出空气蓬松感',
      '画出下巴投在脖颈处的硬边二分影'
    ]
  },
  {
    id: 'chal-3',
    tier: 'beginner',
    track: 'figure',
    category: '人体比例',
    title: '7.5头身站姿比例尺人偶',
    brief: '对照全身标尺从头到脚完整搭建一个体块人偶，肩线与胯线微微反向倾斜站稳。',
    estimatedMinutes: 25,
    templateId: 'tpl-frame-fullbody',
    relatedLessonIds: ['figure-1', 'figure-2', 'figure-3'],
    criteria: [
      '手肘对齐腰线、手腕对齐胯骨、膝盖居下半中点',
      '锁骨到承重脚掌的重心垂线落脚稳当',
      '胸腔蛋与骨盆盒之间有清晰腰部转折'
    ]
  },
  {
    id: 'chal-4',
    tier: 'beginner',
    track: 'furry',
    category: '兽设头型',
    title: 'Furry 头像三角度吻部练习',
    brief: '任选犬科、猫科或龙类，在四格框内画出正面、3/4 半侧和仰视三角度头部。',
    estimatedMinutes: 30,
    templateId: 'tpl-frame-sheet',
    relatedLessonIds: ['furry-1', 'furry-2', 'furry-3'],
    criteria: [
      '3D 吻部随转头角度露出顶面或底面厚度',
      '耳朵从头骨斜椭圆插座长出而非头顶发卡',
      '半侧面吻部自然遮挡部分远侧眼内角'
    ]
  },
  {
    id: 'chal-5',
    tier: 'foundation',
    track: 'anime',
    category: '情绪演技',
    title: '角色喜怒哀乐表情四宫格',
    brief: '以同一位二次元角色为主角，在四格排版框内绘制微笑、大哭、生气、震惊四组表情。',
    estimatedMinutes: 35,
    templateId: 'tpl-frame-sheet',
    relatedLessonIds: ['anime-3', 'anime-4', 'anime-5'],
    criteria: [
      '四格角色发旋与基础头型大小基本保持一致',
      '大笑与怒吼时脸颊苹果肌向上挤、下巴拉长',
      '眉毛、眼眶和嘴巴同步朝同一情绪方向发力'
    ]
  },
  {
    id: 'chal-6',
    tier: 'foundation',
    track: 'figure',
    category: '半身构图',
    title: '胸胯错位半身人像构图',
    brief: '画一个微微扭腰回眸的半身人像骨架并套上圆柱四肢，利用透视拉出立体前后感。',
    estimatedMinutes: 30,
    templateId: 'tpl-frame-halfbody',
    relatedLessonIds: ['figure-3', 'figure-4', 'core-6'],
    criteria: [
      '胸腔中线与骨盆中线明显错开呈扭转夹角',
      '前后手臂与躯干交界处有清晰的圆柱断面和叠压',
      '颈肩斜方肌顺着转头朝向自然斜坡衔接'
    ]
  },
  {
    id: 'chal-7',
    tier: 'foundation',
    track: 'figure',
    category: '手势交互',
    title: '手势互动半身像（托腮/比心/指点）',
    brief: '在半身构图框内加入一只精准表现发力的手部动作，解决“手没地方放”僵硬感。',
    estimatedMinutes: 35,
    templateId: 'tpl-frame-halfbody',
    relatedLessonIds: ['figure-4', 'figure-5', 'core-6'],
    criteria: [
      '手掌先画五边形盒再分出大拇指球和四指分组',
      '手掌与脸颊或衣服接触处有自然挤压贴合',
      '手腕、前臂和上臂圆柱大小符合近大远小'
    ]
  },
  {
    id: 'chal-8',
    tier: 'foundation',
    track: 'furry',
    category: '兽设半身',
    title: 'Furry 半身兽设与簇状毛发',
    brief: '组合 3D 吻部、情绪兽耳与大中小毛绒胸颈围脖，设计一张有性格的半身兽设图。',
    estimatedMinutes: 35,
    templateId: 'tpl-frame-halfbody',
    relatedLessonIds: ['furry-1', 'furry-4', 'furry-5'],
    criteria: [
      '耳朵角度配合咧嘴或歪头表情做出联动下压/竖起',
      '脸颊毛与胸毛使用「1大+2中+小点缀」簇状概括',
      '若加兽爪动作，展现出圆润指节与立体肉垫'
    ]
  },
  {
    id: 'chal-9',
    tier: 'foundation',
    track: 'anime',
    category: '角色设定',
    title: '自创角色设定页（头像+常服半身）',
    brief: '在四格框整合主角正侧头像、常服半身衣褶及大中小发束飘动方案。',
    estimatedMinutes: 40,
    templateId: 'tpl-frame-sheet',
    relatedLessonIds: ['anime-5', 'anime-6', 'anime-7'],
    criteria: [
      '衣褶起点集中在肩膀、腋下与手肘三个受力锚点',
      '衣袖与衣领留出环绕身体厚度的包裹余量',
      '各角度发旋位置与主角发型特征保持统一'
    ]
  },
  {
    id: 'chal-10',
    tier: 'advanced',
    track: 'figure',
    category: '动态人体',
    title: '动态跳跃 / 冲刺全身人像',
    brief: '用强有力的大 C/S 动作线起手，画一个腾空飞踢或大步跨跑的全身动态人物并补地面投影。',
    estimatedMinutes: 40,
    templateId: 'tpl-frame-fullbody',
    relatedLessonIds: ['figure-1', 'figure-3', 'figure-6'],
    criteria: [
      '脊柱、手臂与后腿连成一条充满弹性的动作弧线',
      '落地/垫步脚掌贴合地面透视网格并配投影锚点',
      '左右手脚一前伸一后摆，打破双侧平行对称'
    ]
  },
  {
    id: 'chal-11',
    tier: 'advanced',
    track: 'figure',
    category: '力量解剖',
    title: '肌肉张力半身像（格挡/挥拳）',
    brief: '以力量感战士或运动角色为主题，重点表现抬臂时胸大肌拉扯、斜方肌隆起与前臂锁链肌群。',
    estimatedMinutes: 40,
    templateId: 'tpl-frame-halfbody',
    relatedLessonIds: ['figure-3', 'figure-7', 'figure-8'],
    criteria: [
      '抬高臂侧胸肌顺着大臂明显斜向拉起',
      '手臂外侧展现出跨肘关节搭桥的肱桡肌轮廓',
      '避免上下臂画出左右对称的“串香肠”鼓包'
    ]
  },
  {
    id: 'chal-12',
    tier: 'advanced',
    track: 'anime',
    category: '角色立绘',
    title: '二次元全身角色立绘+赛璐璐二分',
    brief: '综合头部、头发、衣褶与全身站姿，完成一张线稿外实内轻且带硬边二分阴影的立绘。',
    estimatedMinutes: 45,
    templateId: 'tpl-frame-fullbody',
    relatedLessonIds: ['anime-5', 'anime-7', 'anime-8'],
    criteria: [
      '线稿外廓与暗部卡点加粗，五官与衣褶内线轻细',
      '刘海、下巴与裙摆/裤腿投影干净切出硬边二分',
      '整体 6.5~7 头身比例稳健，脚底踩实透视地面'
    ]
  },
  {
    id: 'chal-13',
    tier: 'advanced',
    track: 'furry',
    category: '兽设全身',
    title: 'Furry 全身反关节动态设定',
    brief: '画带蓬松大尾巴的趾行兽人全身奔跑或站姿，展现标准 Z 字兽足与兽掌。',
    estimatedMinutes: 40,
    templateId: 'tpl-frame-fullbody',
    relatedLessonIds: ['furry-6', 'furry-7', 'furry-8'],
    criteria: [
      '腿部呈「大腿前→小腿后→延长脚掌向前」Z字',
      '脚后跟高高抬起悬空，重心线穿过踩地趾垫',
      '尾巴顺着盆骨尾椎方向画出自然粗细 S 流线'
    ]
  },
  {
    id: 'chal-14',
    tier: 'advanced',
    track: 'core',
    category: '光影氛围',
    title: '逆光冷暖二分氛围人像',
    brief: '设定暖色侧逆光与冷天光暗部，绘制冷暖对撞鲜明的半身氛围角色图。',
    estimatedMinutes: 40,
    templateId: 'tpl-frame-portrait',
    relatedLessonIds: ['core-7', 'core-8', 'figure-8'],
    criteria: [
      '80% 面积压在冷调暗部里，边缘留一圈亮暖轮廓光',
      '没有直接加纯黑调阴影，而是顺色相环往冷紫偏移',
      '暗部发丝与耳廓边缘保留克制的空气感反光'
    ]
  }
];

export const CHALLENGES = ALL_CHALLENGES.filter(
  (c) => c.track === 'core' || c.track === 'figure'
);

export const LOCKED_CHALLENGES = ALL_CHALLENGES.filter(
  (c) => c.track === 'anime' || c.track === 'furry'
);

export const CHALLENGE_GENERATOR = {
  framing: [
    { label: '头像特写黄金框', templateId: 'tpl-frame-portrait', hint: '聚焦神态与五官十字球透视' },
    { label: '半身胸腰构图', templateId: 'tpl-frame-halfbody', hint: '展示胸胯扭转、手势与局部比例' },
    { label: '全身动态 7.5 头身', templateId: 'tpl-frame-fullbody', hint: '挑战完整动态线与地面投影踩实' },
    { label: '四格多角度/表情页', templateId: 'tpl-frame-sheet', hint: '绘制同一角色的 4 个角度或 4 个局部结构对比' }
  ],
  trackStyle: [
    { label: '🧱 基础体块 + 素描光影练习', track: 'core' },
    { label: '🏃 人体动态 + 结构穿插表现', track: 'figure' }
  ],
  poseMood: [
    { label: '回眸微微笑（肩胯反向倾斜）', hint: '重点练头部转动与斜方肌衔接' },
    { label: '单手托腮思考（手部与脸部贴合）', hint: '重点练五边形手掌与手指分组' },
    { label: '挥拳冲刺 / 蓄力起跳（大 C 动态线）', hint: '重点练挤压拉伸与重心落脚点' },
    { label: '得意叉腰大笑（扬起下巴微仰视）', hint: '重点练仰视弧线与下颌底面三角' },
    { label: '低头看书 / 沉思（微俯视视角）', hint: '重点练俯视耳位升高与肩背折叠' },
    { label: '微风吹拂披风与头发（衣褶+S流线）', hint: '重点练统一风向的大中小发束与拉力褶' }
  ],
  lightingAngle: [
    { label: '左上 45° 晴朗日光（暖亮面 + 冷蓝暗影）', hint: '经典三分立面二分，适合先练干净投影' },
    { label: '右侧强逆光轮廓光（70% 冷色阴影 + 亮边缘）', hint: '极具故事感，最考验暗部环境反光控制' },
    { label: '底光神秘戏剧光（从下方往上打亮下巴鼻底）', hint: '反常规光照测试，极大锻炼三维体块理解力' },
    { label: '清晰硬边赛璐璐平光（重点卡闭塞与脖子影）', hint: '不涂复杂灰阶，专注设计好看的阴影图形' }
  ]
};
