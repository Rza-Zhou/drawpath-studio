/**
 * DrawPath Studio · 画路工坊 v2 课程主数据汇总出口
 * 聚合 4 大路线（32 节低密度闯关课）、36 套练习/构图底图与 14 项分级实战课题
 */

import { CORE_TEMPLATES, CORE_LESSONS } from './curriculum/core-track.js';
import { FIGURE_TEMPLATES, FIGURE_LESSONS } from './curriculum/figure-track.js';
import {
  ANIME_TEMPLATES,
  ANIME_LESSONS,
  FURRY_TEMPLATES,
  FURRY_LESSONS
} from './curriculum/anime-furry-track.js';
import {
  CHALLENGE_TEMPLATES,
  CHALLENGES,
  CHALLENGE_GENERATOR
} from './curriculum/challenges-data.js';
import {
  getLessonDiagramSpec,
  getTemplateSpec,
  getAllDeclaredPlatePaths
} from './curriculum/asset-manifest.js';

export const TRACKS = [
  {
    id: 'core',
    name: '通用基本功主线',
    badge: '阶段一 · 线条透视光影',
    color: '#6366f1',
    icon: '🧱',
    description: '从控笔长直线、几何体块、透视网格到光影色彩的底层造型主线。'
  },
  {
    id: 'figure',
    name: '人体练习',
    badge: '阶段二 · 动态比例与结构',
    color: '#f59e0b',
    icon: '🏃',
    description: '动作线重心、头身比例、胸胯扭转、手足块面与全身肌群穿插。'
  }
];

// 暂封存路线（保留在仓库中供后续补充高质量画师底图后解锁）
export const LOCKED_TRACKS = [
  {
    id: 'anime',
    name: '二次元角色插画',
    badge: '🔒 待完善底图 · 暂未开放',
    color: '#ec4899',
    icon: '✨',
    locked: true,
    description: '十字球定位、多角度五官表情、空气感发束、常服衣褶与赛璐璐二分。'
  },
  {
    id: 'furry',
    name: 'Furry / 兽人专项',
    badge: '🔒 待完善底图 · 暂未开放',
    color: '#10b981',
    icon: '🐾',
    locked: true,
    description: '3D 梯形吻部、斜向兽耳插座、簇状毛发、立体肉垫兽掌与 Z 字趾行腿。'
  }
];

export const TIERS = [
  {
    id: 'beginner',
    label: '🌱 入门',
    name: '入门',
    icon: '🌱',
    badge: '🌱 入门 · 零基础起步',
    color: '#10b981'
  },
  {
    id: 'foundation',
    label: '📘 基础',
    name: '基础',
    icon: '📘',
    badge: '📘 基础 · 立体与结构',
    color: '#3b82f6'
  },
  {
    id: 'advanced',
    label: '🔥 进阶',
    name: '进阶',
    icon: '🔥',
    badge: '🔥 进阶 · 综合与表现',
    color: '#f59e0b'
  }
];

export const ONBOARDING_GUIDE = [
  {
    id: 'guide-1',
    step: '01',
    title: '先练控笔体块再画头像',
    summary: '直接临摹五官换个角度就会歪，先建体块才能画什么都稳。',
    bullets: [
      '一笔拉通代替蹭毛线，立刻提升线稿自信度',
      '头像五官全靠底层的球体与方体确定立体朝向'
    ],
    tip: '每天只要 20 分钟短时聚焦，先刷完各路线🌱入门课。'
  },
  {
    id: 'guide-2',
    step: '02',
    title: '网页画板与红线复盘联动',
    summary: '导入外部软件成图到画板，红线批注一眼抓住结构歪斜。',
    bullets: [
      '支持站内载入浅蓝草稿底图直接压感跟画练习',
      '外部成图点击「导入红线」自动切红笔叠画自检'
    ],
    tip: '改错 1 张比盲画 10 张进步更快，记得保存画帖复盘。'
  },
  {
    id: 'guide-3',
    step: '03',
    title: '水平翻转查崩与同屏练习',
    summary: '大脑会自动美化刚画完的图，靠物理外挂一眼查出不对称。',
    bullets: [
      '按 H 键水平翻转画布，歪眼斜脸与倒重心瞬间暴露',
      '开启顶栏「同屏边看边练」，左边看图右边框内跟画'
    ],
    tip: '常把 Day 1 与近期画作放进「前后对比卡」见证成长。'
  },
  {
    id: 'guide-4',
    step: '04',
    title: 'iPad防误触与桌面App',
    summary: '本地离线存储无需登录，专为压感笔与数位板深度适配。',
    bullets: [
      '勾上「仅触控笔防误触」，手掌放心贴在屏幕上画',
      '点分享「添加到主屏幕」即可变成全屏独立 App'
    ],
    tip: '清浏览器前请先在右上角「备份」导出 JSON 迁移。'
  }
];

export const PRACTICE_TEMPLATES = [
  ...CORE_TEMPLATES,
  ...FIGURE_TEMPLATES,
  ...CHALLENGE_TEMPLATES
];

export const LESSONS = [
  ...CORE_LESSONS,
  ...FIGURE_LESSONS
];

// 暂封存的二次元与 Furry 底图/课程数据，供后续贡献与解锁复用
export const LOCKED_TEMPLATES = [
  ...ANIME_TEMPLATES,
  ...FURRY_TEMPLATES
];

export const LOCKED_LESSONS = [
  ...ANIME_LESSONS,
  ...FURRY_LESSONS
];

export {
  CHALLENGES,
  CHALLENGE_GENERATOR,
  getLessonDiagramSpec,
  getTemplateSpec,
  getAllDeclaredPlatePaths
};

export function normalizeTrackId(trackId) {
  if (!trackId) return 'core';
  if (trackId === 'muscle') return 'figure';
  return trackId;
}

export function getTemplateSVGDataURL(templateId) {
  const spec = getTemplateSpec(templateId);
  if (spec && typeof spec.renderScaffoldSvg === 'function') {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(spec.renderScaffoldSvg());
  }
  const tpl = PRACTICE_TEMPLATES.find((item) => item.id === templateId);
  if (!tpl) return null;
  if (tpl.imageUrl) return tpl.imageUrl;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(tpl.svgContent);
}
