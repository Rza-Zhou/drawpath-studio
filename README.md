# DrawPath Studio · 画路工坊

> **零注册、纯本地离线可用**的绘画入门学习与压感练习工作台（专为数位板 & iPad Apple Pencil 适配）。

[English Summary] A zero-signup, pure frontend PWA drawing practice platform combining structured step-by-step lessons, vector/bitmap construction underlays, a PointerEvents pressure-sensitive dual-layer canvas, 3D reference tools (Sketchfab / Posemaniacs / PoseMy.Art / JustSketch.me), and a local IndexedDB progress journal with before/after comparison cards.

---

## ✨ 当前已开放核心模块 (Active Modules)

| 模块 | 内容说明 | 状态 |
|---|---|---|
| **🧱 通用基本功主线 (`core`, 8 课)** | 定点长直线、压感 C/S 弧线、透视椭圆、几何体块、一点/两点透视、前后遮挡与二分光影冷暖 | ✅ 已完善开放 |
| **🏃 人体练习 (`figure`, 8 课)** | 动作线重心、7.5 头身比例与骨点、胸腔蛋+骨盆盒对立平衡、四肢圆柱透视、手掌分组、脚部楔形结构、核心肌群穿插与体型剪影 | ✅ 已完善开放 |
| **🎯 实战课题 (`challenges`)** | 基于基本功与人体结构设计的 7 个分级综合挑战 + 🎲 随机灵感出题器 + 黄金头像/胸腰/全身透视/四格构图框 | ✅ 已开放 |
| **🎨 压感画板 & 🧊 3D 参考舱** | 双图层 (草稿层/正稿红线层)、铅笔/G笔/红线笔/马克笔/橡皮、防抖与压感曲线、水平翻转 (`H`)、外部作品红线批注、Sketchfab 3D 搜索 + `Ctrl+V` 截图贴入画板或悬浮参考窗 | ✅ 已开放 |
| **📔 进步画帖 & 前后对比卡** | 纯本地 IndexedDB 存储、支持从外部 App (Procreate / CSP / SAI) 上传作品打卡，一键生成前后进步对比 PNG 分享卡与 JSON 全量迁移 | ✅ 已开放 |

---

## 🔒 暂封存路线 & 社区贡献指引 (`LOCKED_TRACKS`)

> [!NOTE]
> 以下两个分支因部分高质量练习底图仍在打磨优化中，当前版本在 UI 层暂时锁定（**不影响核心基本功与人体练习使用**），完整课程文本与现有图稿均保留在仓库内，非常欢迎有爱画师或开发者提交 PR 接力完善后解锁！

- **✨ 二次元角色插画 (`anime`, 8 课)** & **🐾 Furry / 兽人专项 (`furry`, 8 课)**：
  - **课程与底图代码位置**：[js/curriculum/anime-furry-track.js](js/curriculum/anime-furry-track.js)、[js/curriculum/redblue-plates.js](js/curriculum/redblue-plates.js)
  - **已绘制好的部分高清红蓝线稿资源**：`assets/diagrams/` 与 `assets/templates/`（含日系 Kemono 三视图、Loomis 四视角、赛璐璐极简半身清稿底图等）
  - **解封入口**：[js/curriculum-data.js](js/curriculum-data.js)（`LOCKED_TRACKS` / `LOCKED_LESSONS` / `LOCKED_TEMPLATES`）、[js/curriculum/challenges-data.js](js/curriculum/challenges-data.js)（`LOCKED_CHALLENGES`）、[js/pose-3d-helper.js](js/pose-3d-helper.js)（`LOCKED_3D_MODELS`）及 [index.html](index.html) 中带有 `disabled` 属性的筛选按钮。

### 如何帮助完善底图？
1. 若你或画师朋友绘制了更标准清晰的结构底图 / 赛璐璐线稿：
   - 可直接在网页课程页点击 **「🖼️ 上传画师图替换」** 或画板里的 **「🖼️ 替换练习底图」** 本地立即使用；
   - 或者在仓库中替换/新增 `assets/diagrams/*.jpg`（建议 `16:9` 或 `4:3` 纯白底红蓝结构线稿），更新 `js/curriculum/anime-furry-track.js` 后提起 Pull Request。

---

## 🚀 本地运行 (Quick Start)

无需安装 `npm install` 任何重型构建依赖，用任意静态 HTTP 服务器打开根目录即可（推荐使用本地服务器以完整支持 ES Modules、PWA 离线缓存与压感特性）：

```bash
# 方式 1：使用 Node.js
npx serve .

# 方式 2：使用 Python
python -m http.server 8080

# 方式 3：VS Code "Live Server" 插件直接右键 index.html -> Open with Live Server
```

---

## 🗂️ 目录结构

```text
├── index.html                  # 主页面壳与弹窗定义
├── manifest.webmanifest        # PWA 清单（支持 iPad 添加到主屏幕离线使用）
├── sw.js                       # Service Worker 离线缓存
├── styles/main.css             # 明暗双主题与桌面/iPad 响应式样式
├── assets/
│   ├── icon.svg                # 应用图标
│   ├── diagrams/               # 教学结构红蓝线稿图集
│   └── templates/              # 画板练习线稿底图
└── js/
    ├── app.js                  # 主应用状态与交互控制
    ├── pressure-canvas.js      # PointerEvents 双层压感绘图引擎
    ├── storage-db.js           # IndexedDB 本地持久化与 JSON 导入导出
    ├── journal.js              # 进步画帖 & 对比卡 PNG 生成器
    ├── pose-3d-helper.js       # Sketchfab 3D 搜索与外部摆姿站联动
    ├── curriculum-data.js      # 路线汇总与锁存控制出口
    └── curriculum/
        ├── svg-helpers.js      # 1200×900 SVG 练习底图框包装器
        ├── redblue-plates.js   # 高清底图包装器
        ├── core-track.js       # 通用基本功（8 课）
        ├── figure-track.js     # 人体练习（8 课）
        ├── anime-furry-track.js# 暂封存：二次元 & Furry（16 课）
        └── challenges-data.js  # 实战课题 & 随机灵感出题器
```
