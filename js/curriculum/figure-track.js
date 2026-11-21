/**
 * DrawPath Studio · 画路工坊
 * 🏃 人体练习 (Figure Drawing & Anatomy) 完整 8 关递进课程与合成练习底图
 * 彻底移除约 940 行易出错的手写解剖 SVG 与跨课错配复用图：
 * - 教学图解：由 js/curriculum/asset-manifest.js + js/diagram-renderer.js 驱动，一课一图专属透明红蓝线稿 + 3D 楔形/透视投影
 * - 画板底图：由 js/generators/figure-generators.js 驱动双层合成（精确数学标尺/练习区 + 透明红蓝 WebP 线稿示范）
 */

import { getFigureTemplateSpec } from '../generators/figure-generators.js';

export const FIGURE_TEMPLATES = [
  {
    id: 'tpl-figure-gesture',
    name: '动作线 (Line of Action) 与重心平衡靶纸',
    track: 'figure',
    lessonId: 'figure-1',
    description: '结合透明红蓝站姿/冲刺示范线稿、精确重心垂线与 C/S 大弧自主练习区。',
    get svgContent() {
      return getFigureTemplateSpec('tpl-figure-gesture').renderScaffoldSvg();
    },
  },
  {
    id: 'tpl-figure-proportions',
    name: '7.5 头身比例标尺与关键骨点定位底图',
    track: 'figure',
    lessonId: 'figure-2',
    description: '精确 7.5 头身刻度线叠加正/侧透明人偶示范，右侧留出默写基准轴与骨点锚点。',
    get svgContent() {
      return getFigureTemplateSpec('tpl-figure-proportions').renderScaffoldSvg();
    },
  },
  {
    id: 'tpl-figure-torso',
    name: '胸腔蛋 + 骨盆盒倾斜扭转 (Contrapposto) 底图',
    track: 'figure',
    lessonId: 'figure-3',
    description: '3/4 蛋盒结构与肩胯反倾透明示范线稿，配扭腰转身及 3D 俯视红盒自主练习格。',
    get svgContent() {
      return getFigureTemplateSpec('tpl-figure-torso').renderScaffoldSvg();
    },
  },
  {
    id: 'tpl-figure-limbs',
    name: '四肢圆柱透视、截面环与肘膝关节练习底图',
    track: 'figure',
    lessonId: 'figure-4',
    description: '融合手臂/腿部 S 韵律透明线稿、3D 前伸叠压与屈膝透视投影及空白练习轴。',
    get svgContent() {
      return getFigureTemplateSpec('tpl-figure-limbs').renderScaffoldSvg();
    },
  },
  {
    id: 'tpl-figure-hands',
    name: '手部五边形掌盒、手套分组与 3D 握拳起手底图',
    track: 'figure',
    lessonId: 'figure-5',
    description: '五边形掌盒 1+2+1 分组与 3D 握拳阶梯透明示范，右侧配 6 个精确 3D 掌盒起手练习。',
    get svgContent() {
      return getFigureTemplateSpec('tpl-figure-hands').renderScaffoldSvg();
    },
  },
  {
    id: 'tpl-figure-feet',
    name: '脚部三角楔形体、足弓与透视落地底图',
    track: 'figure',
    lessonId: 'figure-6',
    description: '内侧足弓透明线稿 + 3D 精确投影正视踝斜角与 3/4 楔形脚，配透视地面足印实操区。',
    get svgContent() {
      return getFigureTemplateSpec('tpl-figure-feet').renderScaffoldSvg();
    },
  },
  {
    id: 'tpl-figure-muscles',
    name: '躯干与四肢核心肌群起止穿插练习底图',
    track: 'figure',
    lessonId: 'figure-7',
    description: '正面胸肩腹背与背面风筝斜方/倒三角背阔肌透明线稿对照，右侧配浅底 3/4 蛋盒挂肌实操区。',
    get svgContent() {
      return getFigureTemplateSpec('tpl-figure-muscles').renderScaffoldSvg();
    },
  },
  {
    id: 'tpl-figure-bodytypes',
    name: '男女/健壮/纤细体型比例与剪影对比底图',
    track: 'figure',
    lessonId: 'figure-8',
    description: '同一地平线精准对齐 8 头男体、7 头女体、6.5 头少年透明结构线稿，配自由剪影设计栏。',
    get svgContent() {
      return getFigureTemplateSpec('tpl-figure-bodytypes').renderScaffoldSvg();
    },
  },
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
    keyPoints: [
      { title: '先抓一条主弧线', detail: '别急着抠五官和衣褶，先用一根贯穿头顶到脚尖的 C/S 线定动势。' },
      { title: '拉伸侧与挤压侧', detail: '动态有张力靠对比：外弧皮肤绷紧拉长，内弧腰腹产生折叠挤压。' },
      { title: '锁骨窝重心垂线', detail: '静止站立时，从喉结下方垂直到地面的线必须落在脚底支撑范围内。' },
    ],
    pitfalls: [
      { wrong: '画动态像拼积木，一段一段描边导致人物僵硬', fix: '10秒内一笔扫出头—脊柱—承重腿主弧线，再套体块。' },
      { wrong: '静态站姿重心飘在脚掌外，人物像随时要摔倒', fix: '画完草稿先拉一条红线重心垂线，偏了就移动承重脚位置。' },
    ],
    checklist: [
      '沿区1的S弧线套画站姿，垂线落入绿色足底区',
      '画完区2下方虚线C弧动态，标出拉伸侧与挤压侧',
      '用区3画重心超前冲刺姿势，体会主动失衡速度感',
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
          { time: '10:40', label: '站立平衡 vs 奔跑失衡重心判断' },
        ],
        summary: '用极简线条拆解人体动态张力与重心规律，告别死板站姿。',
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
          { time: '09:50', label: '重心垂线检查人物是否站稳' },
        ],
        summary: '经典动态速写启蒙课，彻底讲透动作线节奏与平衡原则。',
      },
    ],
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
    keyPoints: [
      { title: '耻骨即全身中点', detail: '画全身先定头顶与脚底，正中间就是耻骨联合，上下半身绝不跑偏。' },
      { title: '肘齐腰、腕齐裆', detail: '垂手时手肘平第3头肚脐，手腕平耻骨大转子，指尖落大腿中段。' },
      { title: '关键骨点定骨架', detail: '锁定锁骨窝、肩峰、肋弓、髂嵴与膝盖五大硬骨点，肉再多也不散架。' },
    ],
    pitfalls: [
      { wrong: '总把胳膊画太短，手腕悬在腰部上方', fix: '记住「上臂到腰、下臂到裆」，落笔先点出肘和腕的高度线。' },
      { wrong: '画全身从头往下推，画到腿没纸只能画短腿', fix: '先在画布定出总身高上下界与正中点，再往里填各段比例。' },
    ],
    checklist: [
      '对照7.5头标尺，在右侧默写区默写正面蛋盒人',
      '红笔自检：肘平3头、腕平耻骨、膝居5.5头',
      '对照侧面示范核对耳垂—肩峰—髋关节—外踝垂线',
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
          { time: '12:50', label: '侧面脊柱 S 曲线与骨点对齐' },
        ],
        summary: '用好记的身体锚点替代死背数字，零基础也能画准全身比例。',
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
          { time: '11:10', label: '不同视角下如何维持比例感' },
        ],
        summary: '清晰讲解人体标准头身比与核心体表骨点，奠定解剖基础。',
      },
    ],
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
    keyPoints: [
      { title: '胸腔是微倾的蛋', detail: '胸腔不是扁方块，画成上窄下圆的3D蛋，正面切出倒U形肋弓。' },
      { title: '骨盆是有厚度的盒', detail: '把骨盆概括为带顶面、正面与侧髋面的 3D 斜切盒，一眼锁定朝向。' },
      { title: '肩胯反倾对立平衡', detail: '单腿承重时同侧胯被顶高，为维持平衡同侧肩下沉，腰部一挤一拉。' },
    ],
    pitfalls: [
      { wrong: '把胸腔和骨盆画得严丝合缝贴一起，没有腰部空间', fix: '胸腔底与骨盆顶之间保留柔软腰区，弯腰扭转全靠这一段形变。' },
      { wrong: '画 3/4 转身却忘了移动前中线，像正面硬歪', fix: '先在蛋盒表面画出偏移曲面中线，再对称排左右结构。' },
    ],
    checklist: [
      '照区1临摹3/4蛋盒，画清前中线与骨盆侧面',
      '照区2体会肩胯反倾（红肩线↘ 与 蓝胯线↗）',
      '完成右侧扭腰45°与前倾俯视蛋盒练习',
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
          { time: '14:10', label: '俯视/仰视与大扭腰时的方块透视' },
        ],
        summary: '透彻拆解躯干两大核心体块的倾斜与扭转，解决身体扁平问题。',
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
          { time: '11:05', label: '挤压侧与拉伸侧的经典对立平衡' },
        ],
        summary: '世界级人体体块教学，一招攻克躯干透视与自然站姿韵律。',
      },
    ],
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
    keyPoints: [
      { title: '近粗远细的锥形筒', detail: '手臂与腿都向末端自然收细，小臂近肘饱满，到手腕收成扁方块。' },
      { title: '截面椭圆表现前伸', detail: '四肢指向镜头时，用一串由小变大的叠压椭圆轻松画出透视压缩。' },
      { title: '腿部经典 S 韵律', detail: '侧面看腿绝非直柱：大腿向前拱、膝盖方切锁定、小腿肚向后弓。' },
    ],
    pitfalls: [
      { wrong: '手臂前伸指向镜头时只把长度画短，显得畸形', fix: '缩长度时把近端截面画宽，用T字叠压让前臂压住上臂。' },
      { wrong: '画直立腿像两根僵硬木棍，缺少肌肉流向', fix: '标出外高内低的脚踝与大腿前凸、小腿后弓的错位弧线。' },
    ],
    checklist: [
      '照上区前伸3D圆柱，用近大远小截面环画出一只伸向镜头的手臂',
      '在屈肘与屈膝处用T字叠压线区分前后段',
      '在下区「练2」补全跨步与直立腿圆柱及S韵律',
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
          { time: '13:00', label: '大腿与小腿前后错位韵律演示' },
        ],
        summary: '用圆柱截面与套环叠压法攻克四肢透视压缩与关节衔接难题。',
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
          { time: '10:00', label: '腿部与手臂的骨骼锥度差异' },
        ],
        summary: '直观演示弹簧圈截面法，快速画出有冲击力的前伸透视四肢。',
      },
    ],
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
    keyPoints: [
      { title: '五边形掌盒定大形', detail: '手掌不是正方形，而是顶边呈弧坡的五边形薄盒，长度约等于中指。' },
      { title: '手套分组告别僵硬', detail: '别均等叉开五指！用1+2+1或1+3合成手套块再切指缝。' },
      { title: '大拇指独立三角座', detail: '拇指靠大鱼际三角座独立转动，活动面与四指约呈45°~90°。' },
    ],
    pitfalls: [
      { wrong: '一上来就一根根细描五根手指，越画越歪像鸡爪', fix: '先画掌盒与四指合并手套剪影，外轮廓顺了再切分指缝。' },
      { wrong: '握拳时把四根指节画在同一条水平线上', fix: '握拳指骨从食指到小指呈阶梯斜坡下滑，拇指横扣在最前方。' },
    ],
    checklist: [
      '对照区1核实「掌长≈中指长」与指尖同心扇形弧',
      '在右侧「练1」的 3D 掌盒上画出 1+2+1 与 1+3 手套分组',
      '在右侧「练2」完成挥手、握柄与捏取三种互动手势',
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
          { time: '12:20', label: '1+2+1 优雅手势与握拳阶梯透视' },
        ],
        summary: '用几何掌盒和手套分组破解画手恐惧，轻松画出自然手势。',
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
          { time: '11:00', label: '大拇指球窝活动范围解析' },
        ],
        summary: '拆解手部几何块面与手指分组韵律，高效攻克多角度手势。',
      },
    ],
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
    keyPoints: [
      { title: '三角楔形体概括', detail: '别先抠脚趾，把脚看作「后跟方块+脚背斜坡+趾端楔块」。' },
      { title: '内踝高、外踝低', detail: '脚踝两侧并非水平对称，内侧踝骨明显偏高、外侧偏低且略靠后。' },
      { title: '先踩脚印再长脚', detail: '画透视站姿先在地面透视网格画出两只鞋底脚印，再往上立起楔体。' },
    ],
    pitfalls: [
      { wrong: '画两只脚一高一低没对齐透视地平线，像在爬坡', fix: '先拉一条脚底共同落地线，让双脚承重点压在同一平面。' },
      { wrong: '踮脚或奔跑时把整只脚画成僵硬弯月', fix: '踮脚折点在前掌与脚趾交界，脚背拉直、脚趾压实地面。' },
    ],
    checklist: [
      '照上区三角度画楔形脚，标清内高外低踝与足弓',
      '在下区「练1」从脚印往上立起站稳的丁字步双脚',
      '完成「练2」踮脚蹬地与「练3」3/4 视角透视楔形脚',
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
          { time: '10:30', label: '踮脚、透视俯视与套画鞋子的技巧' },
        ],
        summary: '用三角楔形和地面脚印法轻松解决双脚透视与悬浮感问题。',
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
          { time: '09:10', label: '透视地面上摆放双脚的实用窍门' },
        ],
        summary: '精准剖析脚部楔形块面与足弓力学，让角色真正稳稳踩在地上。',
      },
    ],
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
    keyPoints: [
      { title: '胸肩锁链穿插关系', detail: '胸大肌从胸骨/锁骨扇形汇聚，末端钻入三角肌下方止于大臂骨。' },
      { title: '三角肌楔入上下臂', detail: '三角肌如水滴包住肩峰，尖端插入肱二头与肱三头肌之间形成链环。' },
      { title: '背阔菱形与腿错位', detail: '背部斜方肌呈风筝菱形、背阔肌出倒三角；小腿腓肠肌外高内低。' },
    ],
    pitfalls: [
      { wrong: '抬起手臂时胸大肌还停在原处像两块死板砖', fix: '胸肌挂在大臂骨上，手臂上举时胸大肌下缘必然随之拉高拉平。' },
      { wrong: '画所有肌肉都用同样重的黑线勾满，画面脏乱油腻', fix: '仅在发力拉伸侧和明暗交界处强调肌群，受光面保持干净。' },
    ],
    checklist: [
      '照区1正面肌群示范，画出胸大肌钻入三角肌的穿插关系',
      '照区2背面肌群示范，画出风筝形斜方肌、肩胛骨与背阔肌',
      '在区3浅底3/4蛋盒上默画胸肩腹核心肌群起止挂钩',
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
          { time: '18:00', label: '手臂肱桡肌跨肘与腿部肌群概括' },
        ],
        summary: '化繁为简的艺用解剖课，用穿插链条掌握核心表面肌群规律。',
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
          { time: '13:40', label: '如何在简化体块上合理叠加肌肉' },
        ],
        summary: '权威艺用解剖解析，看懂核心肌群如何像锁链一样互相穿插。',
      },
    ],
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
    keyPoints: [
      { title: '男女核心在肩胯比', detail: '健壮男体肩远宽于胯呈倒梯形；女体肩窄斜、腰位更高、胯宽呈沙漏形。' },
      { title: '线条硬朗与柔曲差异', detail: '力量型多用方直转折显骨感；柔美或丰腴体型多用连贯S弧线。' },
      { title: '涂黑剪影自检法', detail: '画完角色用纯黑填满外轮廓，不看五官和发型也能分出性别与年龄。' },
    ],
    pitfalls: [
      { wrong: '画少年只把成人等比缩小，显得像小大人', fix: '少年感需调大头身比（6~6.5头）、收窄肩胯并拉长四肢。' },
      { wrong: '画健壮猛男只把胳膊吹成气球，脖子和斜方肌却很细', fix: '力量感的核心是加厚颈部、斜方肌、胸腔厚度与粗壮脚踝手腕。' },
    ],
    checklist: [
      '在前3栏对比描摹健壮、标准女体与纤细几何轮廓',
      '在第4栏用马克笔直接涂纯色剪影设计角色体型',
      '只看剪影并水平翻转，确认去发型也能秒分设定',
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
          { time: '14:20', label: '职业原画师的黑剪影辨识度检测法' },
        ],
        summary: '对比各类年龄与性别的几何剪影差异，让你的角色辨识度翻倍。',
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
          { time: '11:30', label: '如何用剪影测试检验角色造型力' },
        ],
        summary: '系统拆解男女与多体型比例差异，用几何剪影打造立体角色。',
      },
    ],
  },
];
