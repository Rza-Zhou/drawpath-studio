/**
 * DrawPath Studio · Visual Asset Manifest (Single Source of Truth)
 * Maps every active lesson (core-1..8, figure-1..8) and practice template (20 active)
 * to either an exact mathematical procedural generator or verified atomic transparent
 * WebP lineart plates composed with vector annotations/rulers.
 */

import {
  CORE_TEMPLATE_GENERATORS,
  generateCoreDiagramSvg,
} from '../generators/core-generators.js';
import {
  getFigureTemplateSpec,
  generateFigure4ForeshorteningPanelSvg,
  generateFigure6FrontAnkleSvg,
  generateFigure6Wedge3QSvg,
} from '../generators/figure-generators.js';

export const FIGURE_PLATE_FILES = [
  './assets/plates/figure/fig1-standing-balance.webp',
  './assets/plates/figure/fig1-dynamic-action.webp',
  './assets/plates/figure/fig2-proportions-front.webp',
  './assets/plates/figure/fig2-proportions-side.webp',
  './assets/plates/figure/fig3-torso-3q-eggbox.webp',
  './assets/plates/figure/fig3-torso-contrapposto.webp',
  './assets/plates/figure/fig4-arm-cylinders.webp',
  './assets/plates/figure/fig4-leg-s-rhythm.webp',
  './assets/plates/figure/fig5-hand-open-grouped.webp',
  './assets/plates/figure/fig5-hand-fist-box.webp',
  './assets/plates/figure/fig6-foot-medial-side.webp',
  './assets/plates/figure/fig7-muscles-front.webp',
  './assets/plates/figure/fig7-muscles-back.webp',
  './assets/plates/figure/fig8-body-male-athletic.webp',
  './assets/plates/figure/fig8-body-female-hourglass.webp',
  './assets/plates/figure/fig8-body-youth-slender.webp',
];

function coreDiagramEntry(lessonId, title, badge, tags) {
  return {
    lessonId,
    layout: 'procedural',
    sourceType: 'procedural-math',
    status: 'verified',
    title,
    badge,
    renderSvg: () => generateCoreDiagramSvg(lessonId),
    tags,
  };
}

export const LESSON_DIAGRAM_MANIFEST = {
  // ======================== CORE TRACK (8 LESSONS · MATH PROCEDURAL) ========================
  'core-1': coreDiagramEntry(
    'core-1',
    '控笔长直线正误对比（告别蹭毛线）',
    '精确矢量图解',
    ['① 固定手腕由前臂带动', '② 悬空预演 2 遍找轨道', '③ 眼盯终点一笔拉通']
  ),
  'core-2': coreDiagramEntry(
    'core-2',
    '轻重轻压感渐变线与流畅 S 韵律',
    '精确矢量图解',
    ['① 空中轻落、中段加压、空中收尖', '② 顺手腕/肘自然摆动扫弧', '③ S 线拐点顺畅换向不折角']
  ),
  'core-3': coreDiagramEntry(
    'core-3',
    '透视椭圆正误对照与射影精确切圆',
    '精确射影数学',
    ['① 长短轴严格垂直 90°', '② 两端饱满圆润忌捏尖角', '③ 切点严格落在四边透视中点']
  ),
  'core-4': coreDiagramEntry(
    'core-4',
    '2D 扁平纸片 vs 3D 方体 Y 字与圆柱绕线',
    '精确 3D 投影',
    ['① Y 字三棱夹角均大于 90°', '② 画出背面透明 X 光线防歪斜', '③ C 型绕线贴合柱面显立体']
  ),
  'core-5': coreDiagramEntry(
    'core-5',
    '反透视炸开 vs 严密交汇灭点 VP',
    '精确灭点推导',
    ['① 高于视平线露底面、低于露顶面', '② 所有纵深平行边严密聚向 VP', '③ 一/两点透视竖棱垂直视平线']
  ),
  'core-6': coreDiagramEntry(
    'core-6',
    '生硬直缝 vs 贴面透视穿插椭圆与 T 字叠压',
    '精确 3D 投影',
    ['① 接口椭圆顺着被穿插表面透视走', '② 复杂体块靠切角减法塑造', '③ 前粗后细 T 字叠压拉开前后']
  ),
  'core-7': coreDiagramEntry(
    'core-7',
    '枕头阴影涂黑 vs 45° 主光解析明暗交界线',
    '精确光线投影',
    ['① 下笔先锁定唯一主光源箭头', '② 明暗交界线卡在光切边界最深', '③ 地面反光永远暗于受光亮面']
  ),
  'core-8': coreDiagramEntry(
    'core-8',
    '纯黑调暗发脏 vs 暖光冷影色相偏移',
    '精确光色图解',
    ['① 暖阳光下暗部偏冷蓝/冷紫', '② 暗色降明度同时沿色环偏冷', '③ 暗部底缘轻扫克制环境反光']
  ),

  // ======================== FIGURE TRACK (8 LESSONS · ATOMIC TRANSPARENT PLATES) ========================
  'figure-1': {
    lessonId: 'figure-1',
    layout: 'multi-panel',
    columns: 2,
    sourceType: 'atomic-plate',
    status: 'verified',
    title: '动作线 (Line of Action) 与重心平衡对照',
    badge: '透明红蓝线稿',
    panels: [
      {
        id: 'standing-balance',
        badge: '静态平衡 · S 动作线',
        tone: 'blue',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig1-standing-balance.webp',
        width: 384,
        height: 1134,
        alt: '静态站姿对立平衡与红色 S 形重心动作线结构图',
        caption: '红线从头顶贯通脊柱直落承重脚掌，蓝胸腔与红骨盆反向倾斜维持稳固站姿。',
      },
      {
        id: 'dynamic-action',
        badge: '冲刺动势 · 主动失衡 C 弧',
        tone: 'red',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig1-dynamic-action.webp',
        width: 820,
        height: 1025,
        alt: '奔跑冲刺大 C 弧线与前倾失衡动态结构图',
        caption: '奔跑或挥击时重心大幅超前于蹬地脚，用一根流畅红弧统领全身拉伸与挤压。',
      },
    ],
    tags: ['① 先甩一条贯穿头脚的 C/S 线', '② 静立时锁骨垂线必落足底区', '③ 奔跑冲刺靠重心超前造张力'],
  },

  'figure-2': {
    lessonId: 'figure-2',
    layout: 'multi-panel',
    columns: 2,
    sourceType: 'atomic-plate',
    status: 'verified',
    title: '7.5 头身通用人体比例与正/侧关键骨点',
    badge: '透明红蓝线稿',
    panels: [
      {
        id: 'proportions-front',
        badge: '正面 · 7.5 头身与骨点',
        tone: 'blue',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig2-proportions-front.webp',
        width: 424,
        height: 1194,
        alt: '正面 7.5 头身标准成人人体比例与红蓝骨点结构图',
        caption: '耻骨居全身 1/2 中点，红锁骨宽约 2 头，手肘平 3 头肚脐、手腕平耻骨、膝居 5.5 头。',
      },
      {
        id: 'proportions-side',
        badge: '侧面 · S 脊柱与耳肩胯踝垂线',
        tone: 'green',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig2-proportions-side.webp',
        width: 245,
        height: 1200,
        alt: '侧面 7.5 头身脊柱 S 曲线与胸腔骨盆倾角结构图',
        caption: '侧面绝非直柱：蓝胸腔微后仰、红骨盆微前倾，耳垂—肩峰—髋关节—外踝呈自然重心垂线。',
      },
    ],
    tags: ['① 耻骨定全身 1/2 中点', '② 肘齐腰(3H) · 腕齐裆(3.8H)', '③ 侧面胸腔微后仰、骨盆微前倾'],
  },

  'figure-3': {
    lessonId: 'figure-3',
    layout: 'multi-panel',
    columns: 2,
    sourceType: 'atomic-plate',
    status: 'verified',
    title: '躯干两大核心体块：胸腔蛋 + 骨盆盒对立平衡',
    badge: '透明红蓝线稿',
    panels: [
      {
        id: 'torso-eggbox',
        badge: '3/4 透视 · 胸腔蛋与骨盆盒',
        tone: 'blue',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig3-torso-3q-eggbox.webp',
        width: 654,
        height: 1174,
        alt: '3/4 视角胸腔蛋、腰椎衔接与骨盆红线体块结构图',
        caption: '先用蓝卵定出胸廓中线与倒 U 肋弓，腰椎保留柔和形变段，再衔接带厚度的红骨盆体块。',
      },
      {
        id: 'torso-contrapposto',
        badge: '对立平衡 · 肩胯反倾扭转',
        tone: 'red',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig3-torso-contrapposto.webp',
        width: 743,
        height: 1163,
        alt: 'Contrapposto 肩线与胯线反向倾斜及腰部拉伸挤压结构图',
        caption: '单腿承重顶高同侧胯（蓝线↗），肩线反向倾斜（红线↘），右侧腰自然挤压、左侧腰拉长。',
      },
    ],
    tags: ['① 胸腔画 3D 蛋切出倒 U 肋弓', '② 骨盆画带顶/正/侧面的斜切盒', '③ 肩胯反向倾斜打破立正僵硬'],
  },

  'figure-4': {
    lessonId: 'figure-4',
    layout: 'multi-panel',
    columns: 3,
    sourceType: 'hybrid-plate-3d',
    status: 'verified',
    title: '四肢锥形圆柱、截面环、前伸叠压与腿部 S 韵律',
    badge: '透明线稿 + 3D 投影',
    panels: [
      {
        id: 'arm-cylinders',
        badge: '手臂 · 锥筒与红肘球',
        tone: 'blue',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig4-arm-cylinders.webp',
        width: 1087,
        height: 780,
        alt: '手臂三角肌、上臂与前臂锥形圆柱及蓝截面环结构图',
        caption: '三角肌水滴帽接入上臂锥筒，经红肘球过渡到近肘饱满、近腕变扁的前臂与腕盒。',
      },
      {
        id: 'arm-foreshorten',
        badge: '前伸透视 · 3D 套环叠压',
        tone: 'red',
        kind: 'svg',
        renderSvg: generateFigure4ForeshorteningPanelSvg,
        caption: '四肢指向镜头时，截面圆近大远小，近段轮廓用 T 字叠压实切在远段前方。',
      },
      {
        id: 'leg-s-rhythm',
        badge: '腿部 · 侧面 S 型力学韵律',
        tone: 'green',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig4-leg-s-rhythm.webp',
        width: 331,
        height: 1076,
        alt: '腿部大腿前拱、膝盖方切、小腿后弓 S 韵律圆柱结构图',
        caption: '沿红 S 轴线：大腿前拱 → 膝盖方盒锁定 → 小腿后弓收细至脚踝与接地楔形脚。',
      },
    ],
    tags: ['① 截面椭圆虚实标出圆柱朝向', '② 前伸压缩靠近大远小与 T 叠压', '③ 侧面腿呈大腿前拱、小腿后弓 S 线'],
  },

  'figure-5': {
    lessonId: 'figure-5',
    layout: 'multi-panel',
    columns: 2,
    sourceType: 'atomic-plate',
    status: 'verified',
    title: '手部五边形掌盒、1+2+1 手套分组与 3D 握拳阶梯方块',
    badge: '透明红蓝线稿',
    panels: [
      {
        id: 'hand-open',
        badge: '张手 · 五边形掌盒 + 1+2+1 分组',
        tone: 'blue',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig5-hand-open-grouped.webp',
        width: 779,
        height: 1074,
        alt: '五边形红线掌盒、蓝大鱼际座与 1+2+1 五指分组结构图',
        caption: '掌长 ≈ 中指长；红五边形掌盒配蓝大鱼际球座，中指与无名指自然成对构成 1+2+1 韵律。',
      },
      {
        id: 'hand-fist',
        badge: '握拳 · 3D 阶梯斜面与拇指扣锁',
        tone: 'red',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig5-hand-fist-box.webp',
        width: 746,
        height: 812,
        alt: '握拳 3D 阶梯指节平面与拇指扣锁结构图',
        caption: '红手背指根从食指到小指呈阶梯斜面下滑，蓝四指并成整块切 3 刀，拇指横扣前下方。',
      },
    ],
    tags: ['① 五边形掌盒厚度 + 掌长≈中指长', '② 四指用 1+2+1 / 1+3 分组忌均分', '③ 握拳指根呈阶梯斜坡下滑'],
  },

  'figure-6': {
    lessonId: 'figure-6',
    layout: 'multi-panel',
    columns: 3,
    sourceType: 'hybrid-plate-3d',
    status: 'verified',
    title: '脚部三角楔形结构：内侧足弓、正视踝斜角与 3/4 立体楔块',
    badge: '透明线稿 + 3D 楔形',
    panels: [
      {
        id: 'foot-medial',
        badge: '内侧视 · 足弓与高内踝',
        tone: 'green',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig6-foot-medial-side.webp',
        width: 974,
        height: 648,
        alt: '脚部内侧面三角楔形结构、红色内踝骨与挑空足弓图',
        caption: '高长比约 1:2.6：脚跟与前掌稳稳落地，红弧标出中段挑空的内侧足弓与高位内踝骨。',
      },
      {
        id: 'foot-front-3d',
        badge: '正视 · 内踝高外踝低',
        tone: 'red',
        kind: 'svg',
        renderSvg: generateFigure6FrontAnkleSvg,
        caption: '脚踝两侧绝非水平：内踝骨高、外踝骨低且略靠后，脚背顺着向小趾侧斜滑变薄。',
      },
      {
        id: 'foot-3q-3d',
        badge: '3/4 视 · 立体平面楔块',
        tone: 'blue',
        kind: 'svg',
        renderSvg: generateFigure6Wedge3QSvg,
        caption: '先在透视地面画出鞋底脚印，再向上立起脚背斜坡、内侧足弓墙与低矮趾端方楔。',
      },
    ],
    tags: ['① 脚是后跟+脚背斜坡+趾盒三楔块', '② 牢记「内踝高、外踝低」斜轴', '③ 先在地面踩实脚印再立起脚体'],
  },

  'figure-7': {
    lessonId: 'figure-7',
    layout: 'multi-panel',
    columns: 2,
    sourceType: 'atomic-plate',
    status: 'verified',
    title: '躯干与上肢核心表面肌群起止穿插（正面 & 背面）',
    badge: '透明红蓝线稿',
    panels: [
      {
        id: 'muscles-front',
        badge: '正面 · 胸大肌钻入三角肌穿插',
        tone: 'blue',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig7-muscles-front.webp',
        width: 553,
        height: 880,
        alt: '人体正面锁骨、胸大肌钻入三角肌、腹直肌与腹外斜肌穿插结构图',
        caption: '红锁骨与髂嵴作硬骨锚点：扇形胸大肌末端钻入三角肌下方止于大臂，肱桡肌跨肘搭桥。',
      },
      {
        id: 'muscles-back',
        badge: '背面 · 风筝斜方肌与倒三角背阔肌',
        tone: 'red',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig7-muscles-back.webp',
        width: 728,
        height: 1200,
        alt: '人体背面风筝形斜方肌、红三角肩胛骨、背阔肌倒三角与骶骨结构图',
        caption: '蓝斜方肌呈大风筝菱形，红三角肩胛骨随抬臂旋转，背阔肌从脊柱/骨盆扇形收向腋下。',
      },
    ],
    tags: ['① 胸大肌止于大臂骨，抬臂必拉高', '② 三角肌楔入二/三头肌形成锁链', '③ 背面抓风筝斜方 + 倒三角背阔'],
  },

  'figure-8': {
    lessonId: 'figure-8',
    layout: 'multi-panel',
    columns: 3,
    sourceType: 'atomic-plate',
    status: 'verified',
    title: '三大典型体型头身比、肩胯几何与大剪影对照',
    badge: '透明红蓝线稿',
    panels: [
      {
        id: 'body-male',
        badge: '健壮男体 · 8 头倒梯形',
        tone: 'blue',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig8-body-male-athletic.webp',
        width: 433,
        height: 1200,
        alt: '健壮男体 8 头身宽肩窄胯倒梯形结构图',
        caption: '肩宽约 2.2 头远宽于窄胯（~1.4 头），低腰线、硬朗直线转折与厚实颈肩。',
      },
      {
        id: 'body-female',
        badge: '标准女体 · 7 头沙漏形',
        tone: 'green',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig8-body-female-hourglass.webp',
        width: 382,
        height: 1197,
        alt: '标准女体 7 头身窄斜肩高腰线圆润胯部结构图',
        caption: '柔斜窄肩（~1.6 头）配高收腰与饱满圆润骨盆（~1.75 头），外轮廓呈柔和 S 曲线。',
      },
      {
        id: 'body-youth',
        badge: '纤细少年 · 6.5 头修长柱',
        tone: 'ink',
        kind: 'image',
        imageUrl: './assets/plates/figure/fig8-body-youth-slender.webp',
        width: 374,
        height: 1194,
        alt: '纤细少年 6.5 头身大头窄肩胯修长四肢结构图',
        caption: '头部比例更大（6.5 头身），蓝胸腔与红骨盆近等宽呈细直柱，四肢修长骨感清晰。',
      },
    ],
    tags: ['① 男体倒梯形 · 女体沙漏 · 少年直柱', '② 少年感靠大头身比而非等比缩小', '③ 涂黑剪影测试：去五官也能秒辨设定'],
  },
};

export function getLessonDiagramSpec(lessonId) {
  return LESSON_DIAGRAM_MANIFEST[lessonId] || null;
}

export function getTemplateSpec(templateId) {
  if (!templateId) return null;
  if (Object.prototype.hasOwnProperty.call(CORE_TEMPLATE_GENERATORS, templateId)) {
    return {
      id: templateId,
      kind: 'procedural',
      plates: [],
      renderScaffoldSvg: CORE_TEMPLATE_GENERATORS[templateId],
    };
  }
  return getFigureTemplateSpec(templateId);
}

export function getAllDeclaredPlatePaths() {
  const paths = new Set(FIGURE_PLATE_FILES);
  for (const spec of Object.values(LESSON_DIAGRAM_MANIFEST)) {
    if (Array.isArray(spec.panels)) {
      for (const p of spec.panels) {
        if (p.imageUrl) paths.add(p.imageUrl);
      }
    }
  }
  return [...paths].sort();
}
