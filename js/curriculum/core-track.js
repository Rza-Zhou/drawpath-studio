/**
 * DrawPath Studio · 阶段一：通用基本功主线 (Core Track - 8课)
 * 所有教学图解与 1200x900 练习底图均由 js/generators/core-generators.js 通过
 * 精确 2D 射影数学与 3D 摄像机投影实时生成，杜绝手算坐标误差。
 */

import {
  CORE_TEMPLATE_GENERATORS,
  generateCoreDiagramSvg,
} from '../generators/core-generators.js';

export const CORE_TEMPLATES = [
  {
    id: 'tpl-core-lines',
    name: '控笔定点长直线与平行线间距靶纸',
    track: 'core',
    lessonId: 'core-1',
    description: '涵盖水平、垂直、30° 步进米字格定点鬼影连线轨道与等距平行线控笔框，专治蹭线抖线。',
    get svgContent() {
      return CORE_TEMPLATE_GENERATORS['tpl-core-lines']();
    },
  },
  {
    id: 'tpl-core-curves',
    name: '压感轻重渐变线与 C/S 曲线韵律靶纸',
    track: 'core',
    lessonId: 'core-2',
    description: '包含轻重轻「两端尖」压感条、大跨度 C 弧轨道与对称/不对称 S 型流线练笔区。',
    get svgContent() {
      return CORE_TEMPLATE_GENERATORS['tpl-core-curves']();
    },
  },
  {
    id: 'tpl-core-circles',
    name: '透视椭圆度阵列与精确射影切圆练习纸',
    track: 'core',
    lessonId: 'core-3',
    description: '正圆封口靶、15°~75° 精确椭圆度阵与射影内切椭圆。',
    get svgContent() {
      return CORE_TEMPLATE_GENERATORS['tpl-core-circles']();
    },
  },
  {
    id: 'tpl-core-circles-ref',
    name: '透视椭圆实景 · 青瓷器皿',
    track: 'core',
    lessonId: 'core-3',
    imageUrl: './assets/refs/core/core3-ceramic-vessel.webp',
  },
  {
    id: 'tpl-core-forms',
    name: '体块拆解 · 木凳结构底图',
    track: 'core',
    lessonId: 'core-4',
    imageUrl: './assets/refs/core/core4-wood-stool.webp',
  },
  {
    id: 'tpl-core-perspective',
    name: '两点透视 · 街角建筑底图',
    track: 'core',
    lessonId: 'core-5',
    imageUrl: './assets/refs/core/core5-2pt-street.webp',
  },
  {
    id: 'tpl-core-intersections',
    name: '体块穿插 · 橡木椅底图',
    track: 'core',
    lessonId: 'core-6',
    imageUrl: './assets/refs/core/core6-oak-chair.webp',
  },
  {
    id: 'tpl-core-lighting',
    name: '光影二分 · 窗光灰球底图',
    track: 'core',
    lessonId: 'core-7',
    imageUrl: './assets/refs/core/core7-window-light.webp',
  },
  {
    id: 'tpl-core-color',
    name: '冷暖光色 · 夕阳石膏底图',
    track: 'core',
    lessonId: 'core-8',
    imageUrl: './assets/refs/core/core8-shisei-sunset.webp',
  },
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
    difficulty: '入门',
    estimatedMinutes: 15,
    templateId: 'tpl-core-lines',
    get cheatSheetSVG() {
      return generateCoreDiagramSvg('core-1');
    },
    keyPoints: [
      { title: '手肘发力画长线', detail: '长直线固定手腕，用整个前臂带动笔尖移动。' },
      { title: '落笔前先空划预演', detail: '笔尖悬空往返划两遍找路线，再果断一笔拉过。' },
      { title: '错线宁重画不修补', detail: '画偏直接撤销重来，绝不用碎短线反复摩擦掩盖。' },
    ],
    pitfalls: [
      { wrong: '只靠手指和手腕捏笔，线条超过3厘米就弯曲', fix: '放平小臂，锁定手腕关节靠肩肘平移带笔' },
      { wrong: '眼睛死盯笔尖，拉到终点时线条越走越歪', fix: '下笔瞬间把视线提前锁定在目标终点上' },
    ],
    checklist: [
      '完成底图所有定点连线，每条只拉1笔',
      '平行线组间距均匀，没有毛刺接缝',
      '尝试开启防抖3~5对比手感差异',
    ],
    videos: [
      {
        id: 'vid-core1-bili',
        title: '零基础入门级控线练习教程（手肘发力与定点长直线）',
        author: '唐云景观--唐老师',
        platform: 'bilibili',
        url: 'https://www.bilibili.com/video/BV1pL411479g/',
        keywords: '零基础 控笔直线 告别蹭线',
        duration: '24分钟',
        timestamps: [
          { time: '00:00', label: '手腕发力 vs 手肘发力的核心区别' },
          { time: '08:20', label: '定点长直线与平行排线实操演示' },
        ],
        summary: '拆解握笔姿势与手肘发力规律，快速消除线条毛躁与抖动。',
      },
      {
        id: 'vid-core1-yt',
        title: 'Drawabox Lesson 1, Exercise 2: Ghosted Lines',
        author: 'Uncomfortable (Drawabox)',
        platform: 'youtube',
        url: 'https://www.youtube.com/watch?v=LkJG6pKTuRc',
        keywords: 'Drawabox Lesson 1 Ghosting Lines',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: '为什么自信一笔拉通比慢描更重要' },
          { time: '06:30', label: '鬼影预演（Ghosting Method）三步演示' },
        ],
        summary: '国际经典的鬼影连线教学，帮助零基础建立果断流畅的下笔习惯。',
      },
    ],
  },
  {
    id: 'core-2',
    track: 'core',
    tier: 'beginner',
    order: 2,
    title: '压感控制与 C/S 流畅弧线',
    mantra: '轻起、重压、轻收尾，弧线像丝带一样有呼吸感。',
    subtitle: '掌握轻重轻渐变线与富有韵律的 C/S 曲线',
    difficulty: '入门',
    estimatedMinutes: 15,
    templateId: 'tpl-core-curves',
    get cheatSheetSVG() {
      return generateCoreDiagramSvg('core-2');
    },
    keyPoints: [
      { title: '轻重轻两端尖压感', detail: '空中顺势落笔轻入，中段加压变实，抬笔收尖。' },
      { title: '顺手角度旋转发力', detail: '画出最顺滑的弧线只需找准手肘天然摆动方向。' },
      { title: 'S 线靠拐点平稳衔接', detail: '在 S 曲线正中拐点平稳换向，避免中间折出尖角。' },
    ],
    pitfalls: [
      { wrong: '起笔和收笔死按到底，线条两端钝得像铁丝', fix: '练习空中入笔与空中抬笔，给线条留出尖尾' },
      { wrong: '画大弯弧时中途停顿调整，弧线变成多边形折线', fix: '一次呼气顺势扫过全弧，速度越稳弧度越圆' },
    ],
    checklist: [
      '画出6条两端尖细、中段饱满的渐变线',
      '沿底图虚线一笔顺畅描完所有C型弧',
      'S曲线拐点过渡自然无明显僵硬顿点',
    ],
    videos: [
      {
        id: 'vid-core2-bili',
        title: '日系板绘基础课：握笔方式、运线技巧与压感节奏',
        author: 'HUION绘王',
        platform: 'bilibili',
        url: 'https://www.bilibili.com/video/BV1P5411e721/',
        keywords: '板绘压感 线稿轻重 S型曲线',
        duration: '系列课程',
        timestamps: [
          { time: '00:00', label: '数位板与压感笔的运线轻重控制' },
          { time: '12:10', label: '空中入笔收尖与流畅曲线训练法' },
        ],
        summary: '详解数位板与压感笔的渐变线条控制与线稿空间轻重规律。',
      },
      {
        id: 'vid-core2-yt',
        title: 'How to Draw with Line Weight',
        author: 'Proko',
        platform: 'youtube',
        url: 'https://www.youtube.com/watch?v=7m3wGbPMSUY',
        keywords: 'Proko how to draw with line weight',
        duration: '约12分钟',
        timestamps: [
          { time: '00:00', label: '线条轻重如何表达光影与体积转折' },
          { time: '05:40', label: '自然弧线收锋与粗细变化示范' },
        ],
        summary: 'Proko 经典线稿轻重课，演示如何通过压感变化赋予线条生命力。',
      },
    ],
  },
  {
    id: 'core-3',
    track: 'core',
    tier: 'beginner',
    order: 3,
    title: '透视椭圆与一笔封口圆',
    mantra: '椭圆长短轴永远垂直90°，两端圆润绝不捏出尖角。',
    subtitle: '练稳正圆封口，读懂圆面倾角带来的椭圆扁度',
    difficulty: '入门',
    estimatedMinutes: 20,
    templateId: 'tpl-core-circles',
    get cheatSheetSVG() {
      return generateCoreDiagramSvg('core-3');
    },
    keyPoints: [
      { title: '空转两圈再落笔封口', detail: '悬空画圆找准轨道，顺势落笔绕一圈半平滑收起。' },
      { title: '长短轴严格十字正交', detail: '不管椭圆如何斜放，长轴与短轴必须成 90° 垂直。' },
      { title: '扁度反映观察倾角', detail: '越正对镜头越接近正圆，越斜切视角椭圆越窄扁。' },
    ],
    pitfalls: [
      { wrong: '椭圆两端捏成尖角，看起来像一颗橄榄球', fix: '把椭圆放进矩形框里，确认两端切圆弧饱满' },
      { wrong: '正圆接口处总是差一大截或拐出多余弯钩', fix: '落笔点与收笔点略微重叠半厘米后再顺势抬笔' },
    ],
    checklist: [
      '左区一笔画完6个正圆，封口平滑不突兀',
      '中区画出15°到75°渐进椭圆且长短轴垂直',
      '右区利用对角线中心与红切点把椭圆贴切进透视面',
    ],
    videos: [
      {
        id: 'vid-core3-bili',
        title: '圆柱的椭圆到底该怎么画？透视椭圆与短轴原理',
        author: '费钱大师',
        platform: 'bilibili',
        url: 'https://www.bilibili.com/video/BV1xa411i73h/',
        keywords: '一笔画圆 透视椭圆 长短轴',
        duration: '11分钟',
        timestamps: [
          { time: '00:00', label: '为什么画椭圆总像尖角橄榄球' },
          { time: '05:20', label: '圆柱横截面的长短轴正交规律' },
        ],
        summary: '透彻解释椭圆扁度与短轴方向在圆柱体和透视平面里的关键作用。',
      },
      {
        id: 'vid-core3-yt',
        title: 'Drawabox Lesson 1, Exercise 4: Tables of Ellipses',
        author: 'Uncomfortable (Drawabox)',
        platform: 'youtube',
        url: 'https://www.youtube.com/watch?v=gyRHkTPqfrQ',
        keywords: 'Drawabox Tables of Ellipses Minor Axis',
        duration: '约14分钟',
        timestamps: [
          { time: '00:00', label: '空转两圈平滑闭合椭圆的运笔要领' },
          { time: '07:15', label: '切边对齐与避免两端捏出尖角' },
        ],
        summary: '国际公认的椭圆与透视平面切圆专项强化教学。',
      },
    ],
  },
  {
    id: 'core-4',
    track: 'core',
    tier: 'foundation',
    order: 4,
    title: '2D转3D：方体圆柱与球体',
    mantra: 'Y字立出三面转折，C字绕线给二维图形充气变立体。',
    subtitle: '打破纸片贴图感，建立三大基础几何体空间直觉',
    difficulty: '基础',
    estimatedMinutes: 25,
    templateId: 'tpl-core-forms',
    get cheatSheetSVG() {
      return generateCoreDiagramSvg('core-4');
    },
    keyPoints: [
      { title: '方体 Y 字三棱起手', detail: '先画三根夹角大于90°的 Y 字棱，再拉出平行对边。' },
      { title: '画出背面透明辅助线', detail: '用浅色线透视出背面3条棱，一眼查出方体扭曲。' },
      { title: 'C 字绕线表达球柱弧', detail: '横线拉直就变扁，顺着柱身球面弯成弧线立刻立体。' },
    ],
    pitfalls: [
      { wrong: '画圆柱只在柱身画几条直横线，圆柱秒变平纸筒', fix: '所有环绕线必须比照底面椭圆画出一致的弧度' },
      { wrong: '方体背离镜头的边反而画得更长，像炸开一样', fix: '牢记远端对边向空间后方微微靠拢收缩' },
    ],
    checklist: [
      '叠画木凳底图的 Y 字三棱与背面透明辅助棱',
      '用红笔标出沙漏与提灯参考的圆柱中轴线及 C 形绕线',
      '用水平翻转 (H) 自检方体平行边是否失真歪斜',
    ],
    videos: [
      {
        id: 'vid-core4-bili',
        title: '块面与三维几何体积理解：入门必看空间思维课',
        author: 'Tm教你画画',
        platform: 'bilibili',
        url: 'https://www.bilibili.com/video/BV1km411o7iL/',
        keywords: '绘画基础 体块感 方体圆柱球体',
        duration: '9分钟',
        timestamps: [
          { time: '00:00', label: '从平面轮廓转向三维块面朝向' },
          { time: '04:30', label: '方体、圆柱与球体的体积包裹意识' },
        ],
        summary: '打通从平面剪影到三维空间搭积木的核心造型思维转换。',
      },
      {
        id: 'vid-core4-yt',
        title: 'Drawabox Lesson 1, Part 3: Rotating Forms & Perspective',
        author: 'Uncomfortable (Drawabox)',
        platform: 'youtube',
        url: 'https://www.youtube.com/watch?v=N3Tm0UDDHgs',
        keywords: 'Drawabox rotating forms 3D boxes perspective',
        duration: '约18分钟',
        timestamps: [
          { time: '00:00', label: '三维空间中的方体旋转与远端收缩' },
          { time: '09:00', label: '透视网格与多角度立体感建立' },
        ],
        summary: '系统拆解几何体在三维空间中的旋转规律与近大远小法则。',
      },
    ],
  },
  {
    id: 'core-5',
    track: 'core',
    tier: 'foundation',
    order: 5,
    title: '一点与两点透视空间网格',
    mantra: '视平线即眼睛高度，所有平行纵深线严丝合缝交于灭点。',
    subtitle: '彻底搞懂近大远小，告别建筑与物体飞边透视崩坏',
    difficulty: '基础',
    estimatedMinutes: 25,
    templateId: 'tpl-core-perspective',
    get cheatSheetSVG() {
      return generateCoreDiagramSvg('core-5');
    },
    keyPoints: [
      { title: '视平线决定看到哪一面', detail: '物体高于视平线露底面，低于视平线露顶面。' },
      { title: '一点正对、两点看转角', detail: '面朝正前方用1点透视；斜角对镜头用左右2个灭点。' },
      { title: '借助画板透视网格校正', detail: '开启网格下拉菜单的「透视射线」随时对齐灭点。' },
    ],
    pitfalls: [
      { wrong: '两点透视两个灭点离太近，方体畸变成尖锐三角', fix: '把左右灭点尽量拉到画面边缘或画布之外' },
      { wrong: '平视时竖直线条东倒西歪，盒子像要倾倒', fix: '一点和两点透视中，所有竖直棱必须垂直于视平线' },
    ],
    checklist: [
      '在街角建筑底图上延长左右屋檐斜线并标出左右灭点 (VP)',
      '开启「两点透视射线」网格，在空白处凭空默画高低两组方盒',
      '确认垂直棱严格垂直，低于/高于视平线分别露出顶底面',
    ],
    videos: [
      {
        id: 'vid-core5-bili',
        title: '两点透视画法及与一点透视关系解析',
        author: 'HANKBUS的艺术车站',
        platform: 'bilibili',
        url: 'https://www.bilibili.com/video/BV1Sf4y1n76B/',
        keywords: '透视入门 视平线 一点透视 两点透视',
        duration: '7分钟',
        timestamps: [
          { time: '00:00', label: '一点透视如何旋转过渡到两点透视' },
          { time: '03:40', label: '左右灭点间距与避免镜头畸变' },
        ],
        summary: '短小精悍的透视核心课，清晰梳理视平线与一/两点透视转换。',
      },
      {
        id: 'vid-core5-yt',
        title: 'How To Draw 3D Boxes in One-Point & Two-Point Perspective',
        author: 'BudisArch',
        platform: 'youtube',
        url: 'https://www.youtube.com/watch?v=IejIdQl7GzE',
        keywords: 'one point two point perspective boxes tutorial',
        duration: '约12分钟',
        timestamps: [
          { time: '00:00', label: '视平线上下方体的顶面与底面变化' },
          { time: '06:10', label: '两点透视双灭点精准推演步骤' },
        ],
        summary: '一步步演示一点与两点透视盒子在视平线上中下的精准构建。',
      },
    ],
  },
  {
    id: 'core-6',
    track: 'core',
    tier: 'foundation',
    order: 6,
    title: '体块穿插、切割与叠压关系',
    mantra: '交界缝线沿曲面转折，近实远虚的叠压线拉开空间前后。',
    subtitle: '把多个体块像积木一样稳稳插接成整体',
    difficulty: '基础',
    estimatedMinutes: 25,
    templateId: 'tpl-core-intersections',
    get cheatSheetSVG() {
      return generateCoreDiagramSvg('core-6');
    },
    keyPoints: [
      { title: '交界线顺着被穿面走', detail: '圆柱插进方体时，接口椭圆顺着方体表面斜向紧贴。' },
      { title: '切角减去多余体积', detail: '复杂机械和五官结构，都是从大盒子里切出斜面。' },
      { title: 'T 字叠压线分清前后', detail: '前面物体线条完整压住后方，瞬间拉出空气前后距。' },
    ],
    pitfalls: [
      { wrong: '两块体块像漂浮贴纸，连接处只画一条笔直分割线', fix: '先画出两者的透明重合区域，再沿曲面描出转折交线' },
      { wrong: '前后遮挡线一样粗细，看不出谁在前谁在后', fix: '前排轮廓线稍微加重加粗，被遮挡的退后线轻细收笔' },
    ],
    checklist: [
      '在橡木椅底图上先框大盒子，再用减法挖出椅腿悬空空间',
      '标出椅背立柱插进座面的贴合交界线与 T 字前后叠压',
      '压实前景棱线并减弱背景辅助线，拉开纵深层次',
    ],
    videos: [
      {
        id: 'vid-core6-bili',
        title: '几何体十字穿插体与组合体透视结构慢速示范',
        author: '米罗画室',
        platform: 'bilibili',
        url: 'https://www.bilibili.com/video/BV1tL411V7F2/',
        keywords: '几何体穿插 切割 叠压关系',
        duration: '27分钟',
        timestamps: [
          { time: '00:00', label: '穿插体中轴线与透视贯穿起型' },
          { time: '11:30', label: '相交接缝线紧贴被穿表面的推导方法' },
        ],
        summary: '完整示范几何体穿插交界线与透视贯穿逻辑，衔接复杂零件组装。',
      },
      {
        id: 'vid-core6-yt',
        title: 'Drawabox Lesson 2: Form Intersections Walkthrough',
        author: 'ScyllaStew (Drawabox)',
        platform: 'youtube',
        url: 'https://www.youtube.com/watch?v=4_NcbbCXPVs',
        keywords: 'Drawabox Lesson 2 Form Intersections',
        duration: '跟练实录',
        timestamps: [
          { time: '00:00', label: '方体、圆柱与球体在三维空间互插思路' },
          { time: '12:00', label: '利用交界线加重与叠压澄清前后关系' },
        ],
        summary: '硬核空间穿插实战演示：不靠照片直接推导多几何体相交线。',
      },
    ],
  },
  {
    id: 'core-7',
    track: 'core',
    tier: 'advanced',
    order: 7,
    title: '素描二分与明暗交界线',
    mantra: '先一刀切出黑白两大阵营，再保住反光暗于亮面的底线。',
    subtitle: '拒绝黑脏糊涂抹，用精准二分光影撑起立体体积',
    difficulty: '进阶',
    estimatedMinutes: 25,
    templateId: 'tpl-core-lighting',
    get cheatSheetSVG() {
      return generateCoreDiagramSvg('core-7');
    },
    keyPoints: [
      { title: '下笔先定唯一光源箭头', detail: '没统一光源方向就会涂脏，角落先标斜射光箭头。' },
      { title: '交界线卡在光切边界', detail: '球柱最暗处不在边缘而在光切线处，背光边缘有反光。' },
      { title: '先铺平二分再修小过渡', detail: '用马克笔一次铺平所有暗部与投影，硬边比乱涂高级。' },
    ],
    pitfalls: [
      { wrong: '拿着喷枪绕着边缘涂黑一圈（枕头阴影）', fix: '严格划分受光亮区和背光暗区，禁止四面涂黑' },
      { wrong: '反光画得跟亮部一样白亮，结构瞬间打架', fix: '眯眼观察：反光永远属于暗部，亮度绝不超过灰面' },
    ],
    checklist: [
      '先标出窗光来源箭头，一刀切出灰球与窗台二分暗部',
      '只用马克笔平涂暗部与投影，确保反光始终暗于受光亮面',
      '对照 Bargue 石膏像检查黑白剪影形状是否整体干净',
    ],
    videos: [
      {
        id: 'vid-core7-bili',
        title: '不用排线就能画好明暗素描：光影二分法与色阶理解',
        author: '德谓文化',
        platform: 'bilibili',
        url: 'https://www.bilibili.com/video/BV1Hm4y157U4/',
        keywords: '光影二分法 明暗交界线 绘画入门',
        duration: '6分钟',
        timestamps: [
          { time: '00:00', label: '亮暗两大阵营的硬边二分切割' },
          { time: '03:10', label: '明暗交界线如何顺形体转折塑形' },
        ],
        summary: '帮你彻底克服一加阴影就变脏发灰的魔咒，学会稳稳切分黑白二分。',
      },
      {
        id: 'vid-core7-yt',
        title: 'Light and Shadow - 10 Minutes To Better Painting (Ep. 6)',
        author: 'Marco Bucci',
        platform: 'youtube',
        url: 'https://www.youtube.com/watch?v=xcCJ2CU-bFw',
        keywords: 'Marco Bucci light and shadow 10 minutes to better painting',
        duration: '10分钟',
        timestamps: [
          { time: '00:00', label: '受光面、明暗交界线与投影的物理逻辑' },
          { time: '05:30', label: '把反光明度严格锁在暗部区间内' },
        ],
        summary: '油管殿堂级光影短课，10 分钟讲透受光、交界线、反光与投影关系。',
      },
    ],
  },
  {
    id: 'core-8',
    track: 'core',
    tier: 'advanced',
    order: 8,
    title: '固有色、光源色与环境色',
    mantra: '阳光暖则暗部冷，绝不直接加黑调暗颜色而是往冷紫偏移。',
    subtitle: '打破发灰发脏上色魔咒，用冷暖对比画出通透色彩',
    difficulty: '进阶',
    estimatedMinutes: 25,
    templateId: 'tpl-core-color',
    get cheatSheetSVG() {
      return generateCoreDiagramSvg('core-8');
    },
    keyPoints: [
      { title: '亮暗冷暖互为补色倾向', detail: '太阳暖黄光照射时，背光暗面必须吸收冷蓝天光。' },
      { title: '阴影色相偏移勿加黑', detail: '选暗色时明度降低同时，色相要顺着色环往冷紫偏。' },
      { title: '环境色染亮暗部底缘', detail: '物体底部暗区边缘会染上一层桌面或草地的环境反光。' },
    ],
    pitfalls: [
      { wrong: '只把固有色直直拉向纯黑调阴影，画面脏灰发木', fix: '降低明度的同时微微提一点饱和度并偏冷色相' },
      { wrong: '环境反光色彩画得比主光源还要鲜艳夺目', fix: '环境色只在暗部底边轻扫一笔，纯度保持克制' },
    ],
    checklist: [
      '参考夕阳灰球与莫奈《喜鹊》，用暖橙受光配合冷蓝紫暗部色板',
      '暗部底缘轻扫地面/桌面反弹色，拒绝直接混纯黑调暗',
      '隐藏参考底图并用水平翻转检验亮灰暗三色块透亮度',
    ],
    videos: [
      {
        id: 'vid-core8-bili',
        title: '冷暖相关：光源色与环境色的色彩冷暖确立逻辑',
        author: '张芷行',
        platform: 'bilibili',
        url: 'https://www.bilibili.com/video/BV1b5kUBxE84/',
        keywords: '色彩冷暖 固有色 环境色 阴影不脏',
        duration: '16分钟',
        timestamps: [
          { time: '00:00', label: '固有色、光源色与环境色的叠加原理' },
          { time: '08:10', label: '暖光冷影的色相偏移实操示范' },
        ],
        summary: '讲清光源色影响亮面、环境色影响暗面的规律，告别发灰发脏配色。',
      },
      {
        id: 'vid-core8-yt',
        title: 'Learning Color Temperature Will Change How You Paint',
        author: 'Proko (with Marco Bucci)',
        platform: 'youtube',
        url: 'https://www.youtube.com/watch?v=vdvOGfWYxqk',
        keywords: 'Proko Marco Bucci color temperature warm light cool shadow',
        duration: '约15分钟',
        timestamps: [
          { time: '00:00', label: '为什么冷暖对比比死调黑白更通透' },
          { time: '07:20', label: '暖光照射下的冷阴影与环境反光规律' },
        ],
        summary: 'Proko 与 Marco Bucci 联合精讲色彩冷暖与色相偏移核心法则。',
      },
    ],
  },
];
