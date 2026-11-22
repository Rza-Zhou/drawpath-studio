/**
 * DrawPath Studio · Locked Contributor Track Plate Placeholders (anime & furry)
 * Legacy multi-panel JPG diagrams have been removed. When unlocking anime/furry,
 * add verified atomic transparent WebP plates to `assets/plates/anime/` or
 * `assets/plates/furry/` and register them in `js/curriculum/asset-manifest.js`.
 */

import { SVG_FONT, escapeXML } from './svg-helpers.js';

function createPendingPlatePlaceholder(title, guidance, targetDir) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" font-family="${SVG_FONT}">
  <rect x="8" y="8" width="784" height="284" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="6 4"/>
  <rect x="20" y="18" width="760" height="34" rx="8" fill="#e2e8f0"/>
  <text x="34" y="40" font-size="13.5" font-weight="700" fill="#334155">${escapeXML(title)}</text>
  <text x="766" y="40" font-size="11.5" font-weight="700" fill="#64748b" text-anchor="end">待贡献透明线稿</text>
  <text x="400" y="142" font-size="14" font-weight="700" fill="#475569" text-anchor="middle">${escapeXML(guidance)}</text>
  <text x="400" y="174" font-size="12" fill="#64748b" text-anchor="middle">规范：一图一主体、零文字零标尺、经 tools/process-lineart.py 转透明 WebP 放入 ${escapeXML(targetDir)}</text>
  <text x="400" y="210" font-size="11.5" fill="#0284c7" text-anchor="middle">也可点击上方「上传画师图替换」直接在本地载入自定义参考图</text>
</svg>`;
}

export const PLATE_FURRY_KEMONO_MUZZLE = createPendingPlatePlaceholder(
  '日系 Kemono 兽人头部结构（待补图）',
  '待补充：犬狼/猫科正、3/4、侧单主体透明红蓝线稿',
  'assets/plates/furry/'
);

export const PLATE_FURRY_WESTERN_MUZZLE = createPendingPlatePlaceholder(
  '美系 Furry 头部结构对比（待补图）',
  '待补充：长梯形吻狼犬与棱角西方龙单主体透明线稿',
  'assets/plates/furry/'
);

export const PLATE_FURRY_KEMONO_EARS_BODY = createPendingPlatePlaceholder(
  '兽耳斜座 · 肉垫兽爪 · Z 字趾行腿（待补图）',
  '待补充：斜椭圆耳座、立体肉垫掌、6头身 Z 字腿原子线稿',
  'assets/plates/furry/'
);

export const PLATE_FURRY_KEMONO_EXPRESSIONS = createPendingPlatePlaceholder(
  '兽人情绪联动（竖耳 / 飞机耳 / 低吼）（待补图）',
  '待补充：三种兽耳与吻部挤压情绪联动单主体透明线稿',
  'assets/plates/furry/'
);

export const PLATE_FURRY_KEMONO_FUR_TUFTS = createPendingPlatePlaceholder(
  '簇状毛发节奏与骨盆 S 型大尾（待补图）',
  '待补充：大中小毛簇分组与骨盆尾椎 S 流线原子线稿',
  'assets/plates/furry/'
);

export const PLATE_ANIME_HEAD_LOOMIS = createPendingPlatePlaceholder(
  '二次元 Loomis 十字球四角度（待补图）',
  '待补充：正面、3/4、仰视、俯视单主体透明红蓝头球线稿',
  'assets/plates/anime/'
);

export const PLATE_ANIME_FACE_HAIR = createPendingPlatePlaceholder(
  '二次元五官定位与三区发束分组（待补图）',
  '待补充：极简高自由度五官定位与发旋放射大发束线稿',
  'assets/plates/anime/'
);

export const PLATE_ANIME_EXPRESSIONS = createPendingPlatePlaceholder(
  '二次元眉眼情绪联动（待补图）',
  '待补充：喜/怒/委屈/惊眉弓与脸颊挤压单主体线稿',
  'assets/plates/anime/'
);

export const PLATE_ANIME_BODY_POSE = createPendingPlatePlaceholder(
  '二次元头身比例与衣褶动态（待补图）',
  '待补充：二次元 6.5 头身比例与肩肘拉力衣褶单主体线稿',
  'assets/plates/anime/'
);

export const PLATE_ANIME_CEL_SHEET = createPendingPlatePlaceholder(
  '二次元半身清稿与赛璐璐二分（待补图）',
  '待补充：高自由度极简半身清稿与二分阴影边界透明线稿',
  'assets/plates/anime/'
);

export const PLATE_TPL_ANIME_CEL = createPendingPlatePlaceholder(
  'ANIME-8 · 赛璐璐二分练习底图（待补图）',
  '待补充：1200×900 极简半身透明清稿练习底图',
  'assets/plates/anime/'
);
