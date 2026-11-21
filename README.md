# DrawPath Studio · 画路工坊

> **零注册、纯本地离线可用**的绘画入门学习与压感练习工作台（专为数位板 & iPad Apple Pencil 适配）。

[English Summary] A zero-signup, pure frontend PWA drawing practice platform combining structured step-by-step lessons, a mathematical 2D/3D procedural geometry engine, atomic transparent WebP anatomical lineart plates composited onto vector practice worksheets, a PointerEvents pressure-sensitive dual-layer canvas, 3D reference tools (Sketchfab / Posemaniacs / PoseMy.Art / JustSketch.me), and a local IndexedDB progress journal with before/after comparison cards.

---

## ✨ 当前已开放核心模块 (Active Modules)

| 模块 | 内容说明 | 图解 / 底图技术实现 | 状态 |
|---|---|---|---|
| **🧱 通用基本功主线 (`core`, 8 课)** | 定点长直线、压感 C/S 弧线、透视椭圆、几何体块、一点/两点透视、体块穿插与素描冷暖二分 | **纯数学 2D 射影 + 3D 摄像机投影引擎**（精确四边形切圆、圆柱真切线、解析明暗交界线与地面投影） | ✅ 已完善开放 |
| **🏃 人体练习 (`figure`, 8 课)** | 动作线重心、7.5 头身比例与骨点、胸腔蛋+骨盆盒对立平衡、四肢圆柱透视、手掌分组、脚部楔形结构、核心肌群穿插与体型剪影 | **一课一图专属透明红蓝 WebP 线稿（16 张）+ 3D 楔形/透视投影 + 精确标尺双层合成底图** | ✅ 已完善开放 |
| **🎯 实战课题 (`challenges`)** | 基于基本功与人体结构设计的 7 个分级综合挑战 + 🎲 随机灵感出题器 + 4 套黄金构图/透视标尺框 | **程序化精确构图与 7.5 头身透视标尺底图** | ✅ 已开放 |
| **🎨 压感画板 & 🧊 3D 参考舱** | 双图层 (草稿层/正稿红线层)、铅笔/G笔/红线笔/马克笔/橡皮、防抖与压感曲线、水平翻转 (`H`)、外部作品红线批注、Sketchfab 3D 搜索 + `Ctrl+V` 截图贴入画板或悬浮参考窗 | Canvas 2D 双层压感引擎 + 矢量/透明 WebP 合成底图层 | ✅ 已开放 |
| **📔 进步画帖 & 前后对比卡** | 纯本地 IndexedDB 存储、支持从外部 App (Procreate / CSP / SAI) 上传作品打卡，一键生成前后进步对比 PNG 分享卡与 JSON 全量迁移 | IndexedDB + Offscreen Canvas 导出 | ✅ 已开放 |

---

## 🧩 教学图与练习底图架构（v2 分治设计）

为彻底告别手写解剖 SVG 坐标畸变与多拼盘位图结构错误，本项目采用**「数学的归数学、美术的归美术、图稿与标注分离」**的三层架构：

1. **精确数学/3D 投影引擎（`js/generators/math-3d.js` & `core-generators.js`）**
   - 负责全部 `core-1 ~ core-8` 教学正误图、8 套基本功练习底图、4 套实战构图框，以及人体课的 7.5 头身刻度、透视地网、3D 前伸叠压圆柱与 3D 楔形脚块面。
   - 使用真实 3×3 射影单应性计算透视四边形内切椭圆（严格四边相切）、真实 3D 投影计算圆柱外公切线与球体解析明暗交界线，零手算坐标误差。
2. **原子化透明红蓝线稿 + 分离式渲染（`assets/plates/figure/*.webp` + `asset-manifest.js` + `diagram-renderer.js`）**
   - 所有有机人体示范图均按**「一图一主体、零文字、零标尺、透明红蓝黑纯线稿」**制作，经 `tools/process-lineart.py`（ImageMagick 精确白底反预乘算法）去白底转无白边透明 WebP。
   - **课程 Step 1 教学卡**：由 `diagram-renderer.js` 渲染为响应式 HTML/CSS 多图对比卡，支持深浅色自适应、高清灯箱放大及一键「📌 钉入画板悬浮参考窗」。
   - **画板练习底图**：由 `pressure-canvas.js` 的 `loadTemplateSpec()` 直接将「程序化标尺/空白练习区」与「透明 WebP 示范图」双层原生合成到 `canvas-layer-template`，彻底规避 SVG 内嵌外链 `<image>` 拦截与白底发灰问题。
3. **资产校验与视觉审核工具（`tools/`）**
   - `tools/validate-assets.mjs`：自动校验 16 节活跃课程一课一图覆盖率、磁盘文件与 `sw.js` 离线缓存同步、零失效旧图路径及数学投影误差断言。
   - `tools/diagram-audit.html`：本地全量图鉴审核页，一屏并排预览全部 16 课教学图与 20 套合成练习底图（支持明暗主题切换）。

---

## 🔒 暂封存路线 & 社区贡献指引 (`LOCKED_TRACKS`)

> [!NOTE]
> 以下两个分支的早期多拼图旧 JPG 已全部移除清理，当前版本在 UI 层暂时锁定（**不影响核心基本功与人体练习使用**）。完整课程大纲文本保留在仓库中，欢迎画师与开发者按新规范贡献原子化透明红蓝线稿后解锁！

- **✨ 二次元角色插画 (`anime`, 8 课)** & **🐾 Furry / 兽人专项 (`furry`, 8 课)**：
  - **课程与占位入口**：[js/curriculum/anime-furry-track.js](js/curriculum/anime-furry-track.js)、[js/curriculum/redblue-plates.js](js/curriculum/redblue-plates.js)
  - **解封入口**：[js/curriculum-data.js](js/curriculum-data.js)（`LOCKED_TRACKS` / `LOCKED_LESSONS` / `LOCKED_TEMPLATES`）、[js/curriculum/challenges-data.js](js/curriculum/challenges-data.js)（`LOCKED_CHALLENGES`）、[js/pose-3d-helper.js](js/pose-3d-helper.js)（`LOCKED_3D_MODELS`）及 [index.html](index.html) 中带有 `disabled` 属性的筛选按钮。

### 如何按新规范贡献/替换教学图与底图？
1. **本地即刻自用**：直接在课程页点击 **「🖼️ 上传画师图替换」** 或 **「🖼️ 替换练习底图」** 即可本地持久化覆盖。
2. **向仓库提交高质量线稿（推荐流程）**：
   - 绘制纯白底（`#FFFFFF`）、**一图一主体、零文字零标尺**的红（`#e11d48`）/ 蓝（`#0284c7`）/ 深墨（`#0f172a`）结构线稿；
   - 运行后处理脚本一键去白底、裁边并转为透明 WebP：
     ```bash
     python tools/process-lineart.py input.png assets/plates/<track>/<plate-name>.webp
     python tools/process-lineart.py --verify --dir assets/plates
     ```
   - 在 [js/curriculum/asset-manifest.js](js/curriculum/asset-manifest.js) 与 [sw.js](sw.js) 注册该图，运行 `node tools/validate-assets.mjs` 全部通过并打开 `tools/diagram-audit.html` 核验后提起 Pull Request。

---

## 🚀 本地运行与校验 (Quick Start)

无需安装 `npm install` 任何构建依赖，用任意静态 HTTP 服务器打开根目录即可：

```bash
# 启动本地静态服务（任选其一）
npx serve .
python -m http.server 8080

# 运行资产与数学几何自动化校验
node tools/validate-assets.mjs

# 校验所有透明 WebP 线稿透明度与体积
python tools/process-lineart.py --verify --dir assets/plates
```

访问 `http://localhost:8080/` 使用主站，访问 `http://localhost:8080/tools/diagram-audit.html` 查看全量教学图与画板底图审核总览。

---

## 🗂️ 目录结构

```text
├── index.html                        # 主页面壳与无障碍弹窗定义（含灯箱放大）
├── manifest.webmanifest              # PWA 清单（支持 iPad 添加到主屏幕离线使用）
├── sw.js                             # Service Worker 离线缓存 (v10)
├── styles/main.css                   # 明暗双主题、响应式教学图卡与画板样式
├── assets/
│   ├── icon.svg                      # 应用图标
│   └── plates/
│       └── figure/                   # 人体练习 8 课专属透明红蓝 WebP 线稿 (16 张)
├── tools/
│   ├── process-lineart.py            # ImageMagick 精确去白底转透明 WebP 与质检脚本
│   ├── validate-assets.mjs           # 资产清单、sw.js 同步与 3D/射影数学自动化校验
│   └── diagram-audit.html            # 本地全量教学图 & 合成练习底图视觉审核面板
└── js/
    ├── app.js                        # 主应用状态、灯箱与交互控制
    ├── diagram-renderer.js           # 声明式教学图卡渲染器（支持放大与钉入参考窗）
    ├── pressure-canvas.js            # PointerEvents 双层压感引擎（含矢量+WebP合成底图）
    ├── storage-db.js                 # IndexedDB 本地持久化与 JSON 导入导出
    ├── journal.js                    # 进步画帖 & 对比卡 PNG 生成器
    ├── pose-3d-helper.js             # Sketchfab 3D 搜索与外部摆姿站联动
    ├── curriculum-data.js            # 路线汇总、资产清单出口与锁存控制
    ├── generators/
    │   ├── math-3d.js                # 2D 射影单应性 + 3D 透视投影与解析阴影内核
    │   ├── core-generators.js        # 通用基本功 (8课) & 构图框 (4套) 精确程序化生成
    │   └── figure-generators.js      # 人体合成练习纸 (8套) & 3D 楔形脚/前伸圆柱投影
    └── curriculum/
        ├── asset-manifest.js         # 单一真相源：一课一图与合成底图映射清单
        ├── svg-helpers.js            # 1200×900 练习底图框与对比图基础包装器
        ├── core-track.js             # 通用基本功（8 课）
        ├── figure-track.js           # 人体练习（8 课）
        ├── redblue-plates.js         # 暂封存路线占位提示器
        ├── anime-furry-track.js      # 暂封存：二次元 & Furry 课程大纲（16 课）
        └── challenges-data.js        # 实战课题 & 随机灵感出题器
```
