/**
 * DrawPath Studio · 画路工坊
 * Sketchfab 真实画师 3D 模型检索与嵌入 + 外部 3D 摆姿工具联动模块
 * （坚持使用真实画师/解剖 3D 资产，不使用程序拼接几何体）
 */

const SKETCHFAB_UID_CACHE_KEY = 'drawpath-sketchfab-uid-cache-v2';

export const LOCKED_3D_MODELS = [
  {
    id: 'zeraora-kemono',
    title: '⚡ 捷拉奥拉 Zeraora（日系电猫 · Kemono 结构标杆）',
    track: 'furry',
    lessonIds: ['furry-1', 'furry-2', 'furry-3', 'furry-4', 'furry-5', 'furry-6', 'furry-7', 'furry-8'],
    uid: '',
    searchQuery: 'Zeraora',
    preferredAuthor: 'teru_nakabashi',
    tip: '观察日系 Kemono 标准短圆猫吻、大漏斗耳、厚肉球蓝指豆与 Z 字反关节腿的 3D 穿插。',
  },
  {
    id: 'kemono-base-mesh',
    title: '🦊 日系 Kemono 兽人全身素体 (Kemono Base Mesh)',
    track: 'furry',
    lessonIds: ['furry-1', 'furry-3', 'furry-6', 'furry-7', 'furry-8'],
    uid: '',
    searchQuery: 'Furry Kemono Base',
    tip: '无毛发遮挡的日系兽人素体，适合转仰俯视角观察吻部梯形与反关节腿比例。',
  },
  {
    id: 'kemono-fox-model',
    title: '🐾 日系狐狼兽人角色与大尾巴 (Kemono Fox)',
    track: 'furry',
    lessonIds: ['furry-3', 'furry-4', 'furry-5', 'furry-8'],
    uid: '',
    searchQuery: 'kemono fox',
    tip: '观察耳座朝向、腮毛簇状概括与蓬松大尾巴顺脊柱延出的 S 型体积。',
  },
  {
    id: 'wolf-skull-3d',
    title: '🐺 犬科/狼头骨 3D 解剖 (Wolf Skull)',
    track: 'furry',
    lessonIds: ['furry-1', 'furry-2', 'furry-4'],
    uid: '',
    searchQuery: 'wolf skull',
    tip: '真实犬科头骨扫描：看清颅骨球到鼻梁的「额鼻台阶 (Stop)」与下颌咬合轴。',
  },
  {
    id: 'anime-head-basemesh',
    title: '✨ 二次元标准头部素体 (Anime Head Base Mesh)',
    track: 'anime',
    lessonIds: ['anime-1', 'anime-2', 'anime-3', 'anime-4', 'anime-5'],
    uid: '',
    searchQuery: 'Anime Head Base Mesh',
    tip: '转到 3/4 侧面观察远侧眼框的横向透视压缩、柔和下颌线与微突鼻尖。',
  },
  {
    id: 'anime-body-basemesh',
    title: '✨ 二次元全身比例素体 (Anime Body Base Mesh)',
    track: 'anime',
    lessonIds: ['anime-6', 'anime-7', 'anime-8'],
    uid: '',
    searchQuery: 'Anime female base mesh',
    tip: '观察日系 6.5~7 头身颈肩斜方肌过渡、锁骨窝与修长四肢体积。',
  },
];

export const CURATED_3D_MODELS = [
  {
    id: 'asaro-head-planes',
    title: '🗿 Asaro 头部块面与二分光影模型 (Planes of the Head)',
    track: 'core',
    lessonIds: ['core-6', 'core-7', 'core-8'],
    uid: '',
    searchQuery: 'Asaro Head',
    tip: '将复杂人脸归纳为清晰几何折面，最适合练习明暗交界线与二分阴影切分。',
  },
  {
    id: 'loomis-head-3d',
    title: '📐 Loomis 十字头球与颞部切面 (Loomis Head)',
    track: 'core',
    lessonIds: ['core-4', 'core-5'],
    uid: '',
    searchQuery: 'Loomis head',
    tip: '自由旋转到大仰视或大俯视，观察十字纬线弧度（∩ / ∪）与耳朵高低跷跷板变化。',
  },
  {
    id: 'figure-torso-3d',
    title: '🏃 人体躯干胸腔与骨盆体块 (Torso Base & Anatomy)',
    track: 'figure',
    lessonIds: ['figure-1', 'figure-2', 'figure-3', 'figure-4', 'figure-8'],
    uid: '',
    searchQuery: 'torso anatomy ecorche',
    tip: '全方位旋转观察胸腔卵形、锁骨窝、肋弓与骨盆方盒的空间衔接。',
  },
  {
    id: 'figure-hand-3d',
    title: '✋ 手部立体块面与指节弧拱 (Hand Anatomy Reference)',
    track: 'figure',
    lessonIds: ['figure-5', 'figure-7'],
    uid: '',
    searchQuery: 'hand anatomy reference',
    tip: '旋转手掌看五边形掌盒厚度、大鱼际三角球与手指弧拱阶梯。',
  },
  {
    id: 'figure-foot-3d',
    title: '🦶 足部楔形体块与踝关节解剖 (Foot Anatomy)',
    track: 'figure',
    lessonIds: ['figure-6'],
    uid: '',
    searchQuery: 'foot anatomy',
    tip: '旋转观察足部三角楔形体、内高外低脚踝斜角与足弓承重面。',
  },
];

export const EXTERNAL_3D_POSE_SITES = [
  {
    id: 'posemaniacs',
    name: 'Posemaniacs',
    badge: '肌肉与30秒速写',
    url: 'https://www.posemaniacs.com/ja/poses',
    desc: '经典 3D 人体肌肉解剖姿势库，支持多角度旋转与 30 秒速写倒计时。',
  },
  {
    id: 'posemyart',
    name: 'PoseMy.Art',
    badge: '动漫素体摆姿',
    url: 'https://posemy.art/app/?lang=ja',
    desc: '内置日系动漫比例人偶、手势预设与丰富动作模板，可自由拧关节角度。',
  },
  {
    id: 'justsketchme',
    name: 'JustSketch.me',
    badge: '多光源几何体块人',
    url: 'https://app.justsketch.me/',
    desc: '支持动漫人/体块人偶与打光透视调整，摆好动作截图 Ctrl+V 即可进画板。',
  },
];

function readUidCache() {
  try {
    const raw = globalThis?.localStorage?.getItem(SKETCHFAB_UID_CACHE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeUidCache(cache) {
  try {
    globalThis?.localStorage?.setItem(SKETCHFAB_UID_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore quota or storage restriction errors
  }
}

export function getCachedPresetUid(presetId) {
  if (!presetId) return '';
  const cache = readUidCache();
  const val = cache[presetId];
  return parseSketchfabUid(val);
}

export function setCachedPresetUid(presetId, uid) {
  const clean = parseSketchfabUid(uid);
  if (!presetId || !clean) return;
  const cache = readUidCache();
  cache[presetId] = clean;
  writeUidCache(cache);
}

export function parseSketchfabUid(input) {
  const raw = String(input || '').trim();
  if (!raw) return '';
  if (/^[0-9a-f]{32}$/i.test(raw)) return raw.toLowerCase();

  // Matches https://sketchfab.com/3d-models/slug-<32hex> or /models/<32hex>
  const modelsMatch = raw.match(/\/models\/([0-9a-f]{32})\b/i);
  if (modelsMatch) return modelsMatch[1].toLowerCase();

  const slugMatch = raw.match(/([0-9a-f]{32})(?:[/?#]|$)/i);
  if (slugMatch) return slugMatch[1].toLowerCase();

  return '';
}

export function buildSketchfabEmbedUrl(uid) {
  const cleanUid = parseSketchfabUid(uid) || String(uid || '').trim();
  if (!cleanUid) return '';
  return `https://sketchfab.com/models/${encodeURIComponent(cleanUid)}/embed?autostart=1&ui_infos=0&ui_watermark=0&dnt=1`;
}

export function buildSketchfabSearchPageUrl(query) {
  return `https://sketchfab.com/search?q=${encodeURIComponent(String(query || '').trim())}&type=models`;
}

function pickThumbnailUrl(item) {
  const images = item?.thumbnails?.images;
  if (!Array.isArray(images) || images.length === 0) return '';
  const sorted = [...images].sort((a, b) => (b.width || 0) - (a.width || 0));
  const medium = sorted.find((img) => (img.width || 0) <= 640 && (img.width || 0) >= 200);
  return (medium || sorted[sorted.length - 1] || sorted[0])?.url || '';
}

export async function searchSketchfabModels(query, { preferredAuthor = '', limit = 6 } = {}) {
  const cleanQuery = String(query || '').trim();
  if (!cleanQuery) return [];

  const apiUrl = `https://api.sketchfab.com/v3/search?type=models&q=${encodeURIComponent(cleanQuery)}&restricted=false`;
  const response = await fetch(apiUrl, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`Sketchfab 搜索失败 (HTTP ${response.status})`);
  }

  const data = await response.json();
  const rawResults = Array.isArray(data?.results) ? data.results : [];
  const prefLower = String(preferredAuthor || '').trim().toLowerCase();

  const scored = rawResults
    .filter((item) => item && item.uid)
    .map((item) => {
      const username = String(item.user?.username || '');
      const displayName = String(item.user?.displayName || '');
      const isPreferredAuthor =
        Boolean(prefLower) &&
        (username.toLowerCase() === prefLower || displayName.toLowerCase() === prefLower);
      const isStaffPick = Boolean(item.staffpickedAt);
      const likeCount = Number(item.likeCount || 0);
      const viewCount = Number(item.viewCount || 0);
      const score =
        (isPreferredAuthor ? 1_000_000 : 0) +
        (isStaffPick ? 50_000 : 0) +
        likeCount * 10 +
        Math.min(viewCount / 100, 5000);

      return {
        uid: String(item.uid).toLowerCase(),
        name: String(item.name || '3D Model'),
        author: displayName || username || 'Sketchfab 画师',
        username,
        thumbUrl: pickThumbnailUrl(item),
        viewerUrl: String(item.viewerUrl || `https://sketchfab.com/3d-models/${item.uid}`),
        likeCount,
        viewCount,
        isStaffPick,
        isPreferredAuthor,
        _score: score,
      };
    });

  scored.sort((a, b) => b._score - a._score);
  return scored.slice(0, limit).map(({ _score, ...rest }) => rest);
}

export async function resolvePresetModel(preset) {
  if (!preset) return null;
  const cachedUid = preset.uid || getCachedPresetUid(preset.id);
  if (cachedUid) {
    return {
      primaryUid: cachedUid,
      candidates: [],
      preset,
    };
  }

  const results = await searchSketchfabModels(preset.searchQuery, {
    preferredAuthor: preset.preferredAuthor || '',
    limit: 6,
  });

  if (results.length > 0) {
    setCachedPresetUid(preset.id, results[0].uid);
    return {
      primaryUid: results[0].uid,
      candidates: results,
      preset,
    };
  }

  return {
    primaryUid: '',
    candidates: [],
    preset,
  };
}

export function getDefaultPresetForLesson(lesson) {
  if (!lesson) return CURATED_3D_MODELS[0];

  const exactMatch = CURATED_3D_MODELS.find(
    (m) => Array.isArray(m.lessonIds) && m.lessonIds.includes(lesson.id)
  );
  if (exactMatch) return exactMatch;

  const trackDefaults = {
    furry: 'zeraora-kemono',
    anime: 'loomis-head-3d',
    figure: 'figure-torso-3d',
    core: 'asaro-head-planes',
  };
  const fallbackId = trackDefaults[lesson.track] || 'asaro-head-planes';
  return CURATED_3D_MODELS.find((m) => m.id === fallbackId) || CURATED_3D_MODELS[0];
}

export function getPresetsForTrack(trackId) {
  if (!trackId || trackId === 'all') return CURATED_3D_MODELS;
  const matching = CURATED_3D_MODELS.filter((m) => m.track === trackId);
  return matching.length > 0 ? matching : CURATED_3D_MODELS.slice(0, 4);
}

export function openCompanion3DWindow(url, name = 'Pose3D') {
  const cleanUrl = String(url || '').trim();
  if (!/^https?:\/\//i.test(cleanUrl)) return null;
  const features = 'width=980,height=780,left=40,top=60,noopener';
  const win = window.open(cleanUrl, `drawpath_3d_${name}`, features);
  if (!win) {
    return window.open(cleanUrl, '_blank', 'noopener,noreferrer');
  }
  return win;
}
