/**
 * DrawPath Studio · 画路工坊
 * IndexedDB Persistence Layer ('DrawPathDB', version 1)
 * With automatic first-run demonstration post seeding & in-memory fallback.
 */

const DB_NAME = 'DrawPathDB';
const DB_VERSION = 1;
const BACKUP_SCHEMA_VERSION = 2;
const STORES = {
  POSTS: 'posts',
  PROGRESS: 'progress',
  CUSTOM_VIDEOS: 'custom_videos',
  SETTINGS: 'settings',
};

const LEGACY_TRACK_MAP = {
  muscle: 'figure',
};

const LEGACY_LESSON_MAP = {
  'muscle-1': 'figure-7',
  'muscle-2': 'figure-7',
  'muscle-3': 'figure-7',
  'core-4': 'figure-3',
};

function normalizeTrackValue(track) {
  const raw = String(track || 'core').trim();
  return LEGACY_TRACK_MAP[raw] || raw;
}

function normalizeLegacyPostRecord(post, forceLegacy = false) {
  if (!post || typeof post !== 'object') return post;
  const isLegacy = forceLegacy || Number(post.schemaVersion) !== BACKUP_SCHEMA_VERSION;
  const rawTrack = String(post.track || 'core').trim();
  const rawLesson = String(post.lessonId || '').trim();

  let lessonId = rawLesson;
  if (rawLesson.startsWith('muscle-')) {
    lessonId = LEGACY_LESSON_MAP[rawLesson] || 'figure-7';
  } else if (isLegacy && (rawLesson === 'core-4' || post.id === 'demo-post-2')) {
    lessonId = LEGACY_LESSON_MAP[rawLesson] || 'figure-3';
  }

  let track = normalizeTrackValue(rawTrack);
  if (isLegacy && (rawLesson === 'core-4' || post.id === 'demo-post-2')) {
    track = 'figure';
  }

  return {
    ...post,
    track,
    lessonId,
    challengeId: String(post.challengeId || ''),
  };
}

function normalizeLegacyLessonId(lessonId, isLegacy = false) {
  const raw = String(lessonId || '').trim();
  if (!raw) return '';
  if (raw.startsWith('muscle-')) {
    return LEGACY_LESSON_MAP[raw] || 'figure-7';
  }
  if (isLegacy && raw === 'core-4') {
    return 'figure-3';
  }
  return raw;
}

const SEED_FLAG_KEY = 'drawpath_seeded_v1';
const SETTINGS_RECORD_KEY = 'app_settings';
const CUSTOM_ASSETS_KEY = 'custom_lesson_assets';

let dbInstance = null;
let initPromise = null;
let useMemoryFallback = false;

const memoryStore = {
  [STORES.POSTS]: new Map(),
  [STORES.PROGRESS]: new Map(),
  [STORES.CUSTOM_VIDEOS]: new Map(),
  [STORES.SETTINGS]: new Map(),
};

function generateId(prefix = 'id') {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function safeLocalStorageGet(key) {
  try {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  } catch {
    // Ignore storage access errors in restricted sandboxed contexts
  }
}

function getKeyField(storeName) {
  switch (storeName) {
    case STORES.PROGRESS:
      return 'lessonId';
    case STORES.SETTINGS:
      return 'key';
    default:
      return 'id';
  }
}

function rawGetAll(storeName) {
  if (useMemoryFallback || !dbInstance) {
    return Promise.resolve(Array.from(memoryStore[storeName].values()));
  }
  return new Promise((resolve, reject) => {
    try {
      const tx = dbInstance.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(Array.isArray(req.result) ? req.result : []);
      req.onerror = () => reject(req.error || new Error(`Failed reading ${storeName}`));
    } catch (err) {
      reject(err);
    }
  });
}

function rawGet(storeName, key) {
  if (useMemoryFallback || !dbInstance) {
    return Promise.resolve(memoryStore[storeName].get(key) || null);
  }
  return new Promise((resolve, reject) => {
    try {
      const tx = dbInstance.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error || new Error(`Failed getting ${key} from ${storeName}`));
    } catch (err) {
      reject(err);
    }
  });
}

function rawPut(storeName, value) {
  if (useMemoryFallback || !dbInstance) {
    const keyField = getKeyField(storeName);
    memoryStore[storeName].set(value[keyField], structuredCloneSafe(value));
    return Promise.resolve(value);
  }
  return new Promise((resolve, reject) => {
    try {
      const tx = dbInstance.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(value);
      req.onsuccess = () => resolve(value);
      req.onerror = () => reject(req.error || new Error(`Failed saving to ${storeName}`));
    } catch (err) {
      reject(err);
    }
  });
}

function rawDelete(storeName, key) {
  if (useMemoryFallback || !dbInstance) {
    memoryStore[storeName].delete(key);
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    try {
      const tx = dbInstance.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error || new Error(`Failed deleting ${key} from ${storeName}`));
    } catch (err) {
      reject(err);
    }
  });
}

function rawClear(storeName) {
  if (useMemoryFallback || !dbInstance) {
    memoryStore[storeName].clear();
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    try {
      const tx = dbInstance.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error || new Error(`Failed clearing ${storeName}`));
    } catch (err) {
      reject(err);
    }
  });
}

function structuredCloneSafe(obj) {
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Generates crisp offscreen canvas demonstration PNG data URLs
 * for first-run onboarding posts without any external asset dependency.
 */
function createSeedIllustration(kind) {
  if (typeof document === 'undefined') {
    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="#ffffff"/><text x="40" y="60" font-size="24" fill="#1e293b">DrawPath Studio Demo (${kind})</text></svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fallbackSvg)}`;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // Clean paper background + subtle grid
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 800, 600);

  ctx.strokeStyle = '#f1f5f9';
  ctx.lineWidth = 1;
  for (let x = 40; x < 800; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 600);
    ctx.stroke();
  }
  for (let y = 40; y < 600; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(800, y);
    ctx.stroke();
  }

  if (kind === 'lines') {
    // Top banner
    ctx.fillStyle = '#eef2ff';
    ctx.fillRect(0, 0, 800, 56);
    ctx.fillStyle = '#3730a3';
    ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
    ctx.fillText('Day 1 练习示例 · 控笔直线轻重渐变 & 椭圆一笔画', 28, 35);

    // Left panel: Straight point-to-point strokes with pressure taper
    ctx.strokeStyle = '#bfdbfe';
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 6; i++) {
      const y = 115 + i * 52;
      ctx.beginPath();
      ctx.moveTo(60, y);
      ctx.lineTo(360, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Target dots & expressive tapered strokes
    for (let i = 0; i < 6; i++) {
      const y = 115 + i * 52;
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(60, y, 4.5, 0, Math.PI * 2);
      ctx.arc(360, y, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Simulate pressure curve along stroke
      const steps = 40;
      for (let s = 0; s < steps; s++) {
        const t1 = s / steps;
        const t2 = (s + 1) / steps;
        const x1 = 60 + 300 * t1;
        const x2 = 60 + 300 * t2;
        const wobble1 = Math.sin(t1 * Math.PI * 2 + i) * 1.4;
        const wobble2 = Math.sin(t2 * Math.PI * 2 + i) * 1.4;
        const pressure = Math.sin(Math.PI * ((t1 + t2) * 0.5));
        ctx.strokeStyle = `rgba(30, 41, 59, ${0.35 + pressure * 0.6})`;
        ctx.lineWidth = 1.2 + pressure * (2.2 + i * 0.45);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y + wobble1);
        ctx.lineTo(x2, y + wobble2);
        ctx.stroke();
      }
    }

    // Parallel diagonal hatching box
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(60, 445, 300, 95);
    for (let hx = 80; hx < 345; hx += 14) {
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.72)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(hx, 528);
      ctx.lineTo(hx + 22, 458);
      ctx.stroke();
    }

    // Right panel: Perspective ellipses & S-curve
    const ellipses = [
      { cx: 520, cy: 175, rx: 78, ry: 56 },
      { cx: 685, cy: 175, rx: 70, ry: 68 },
      { cx: 520, cy: 335, rx: 84, ry: 36 },
      { cx: 685, cy: 335, rx: 46, ry: 74 },
    ];
    ellipses.forEach((el, idx) => {
      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(el.cx - el.rx, el.cy - el.ry, el.rx * 2, el.ry * 2);

      // Hand-drawn multi-pass circle feel
      for (let pass = 0; pass < 2; pass++) {
        ctx.strokeStyle = pass === 0 ? 'rgba(30, 41, 59, 0.35)' : 'rgba(15, 23, 42, 0.88)';
        ctx.lineWidth = pass === 0 ? 1.5 : 2.6;
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2 + 0.15; a += 0.12) {
          const jitter = Math.sin(a * 3 + idx + pass) * (pass === 0 ? 2.5 : 1.3);
          const px = el.cx + Math.cos(a) * (el.rx + jitter);
          const py = el.cy + Math.sin(a) * (el.ry - jitter * 0.6);
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
    });

    // S-Curve practice
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(450, 495);
    ctx.bezierCurveTo(530, 430, 640, 560, 745, 470);
    ctx.stroke();

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(450, 495);
    ctx.bezierCurveTo(530, 430, 640, 560, 745, 470);
    ctx.stroke();

    ctx.fillStyle = '#475569';
    ctx.font = '15px system-ui, -apple-system, sans-serif';
    ctx.fillText('自检记录：肩肘带动，起笔轻、收笔收尖，椭圆封口比之前更稳！', 415, 565);
  } else {
    // 'redline' demo: Procreate rough sketch + redline anatomical structure correction
    ctx.fillStyle = '#fef2f2';
    ctx.fillRect(0, 0, 800, 56);
    ctx.fillStyle = '#991b1b';
    ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
    ctx.fillText('红线复盘示例 · 胸腔蛋与骨盆盒反向倾斜张力检查', 28, 35);

    // Left: Rough original sketch (slightly stiff vertical)
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText('原草稿（外部 App 导出）', 105, 96);

    ctx.save();
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.72)';
    ctx.lineWidth = 2.6;
    ctx.lineCap = 'round';
    // Head
    ctx.beginPath();
    ctx.ellipse(205, 168, 34, 42, 0, 0, Math.PI * 2);
    ctx.stroke();
    // Neck & stiff shoulders
    ctx.beginPath();
    ctx.moveTo(205, 210);
    ctx.lineTo(205, 232);
    ctx.moveTo(132, 240);
    ctx.lineTo(278, 242);
    ctx.stroke();
    // Stiff torso & hips
    ctx.beginPath();
    ctx.moveTo(145, 240);
    ctx.lineTo(158, 380);
    ctx.lineTo(148, 495);
    ctx.moveTo(265, 242);
    ctx.lineTo(252, 380);
    ctx.lineTo(262, 495);
    ctx.moveTo(154, 378);
    ctx.lineTo(256, 378);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#dc2626';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText('× 肩线与胯线完全平行，重心僵直', 86, 535);

    // Divider arrow
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 28px system-ui, sans-serif';
    ctx.fillText('➜', 375, 315);

    // Right: Redline Structural Correction
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText('红线结构重绘（动态重心复盘）', 475, 96);

    // Faint underlying sketch ghost
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(585, 168, 34, 42, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Redline Head & Centerline
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.9)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(585, 162, 34, 42, -0.1, 0, Math.PI * 2);
    ctx.stroke();

    // S-curve spine rhythm line (amber/orange highlight)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(585, 204);
    ctx.bezierCurveTo(615, 265, 555, 345, 580, 425);
    ctx.stroke();

    // Ribcage tilted egg (-12 deg)
    ctx.save();
    ctx.translate(592, 285);
    ctx.rotate(-0.2);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, 56, 72, 0, 0, Math.PI * 2);
    ctx.stroke();
    // Shoulder tilt line
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(-78, -46);
    ctx.lineTo(78, -46);
    ctx.stroke();
    ctx.restore();

    // Pelvis counter-tilted wedge (+14 deg)
    ctx.save();
    ctx.translate(578, 425);
    ctx.rotate(0.24);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.strokeRect(-54, -34, 108, 68);
    // Hip tilt line
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(-68, -22);
    ctx.lineTo(68, -22);
    ctx.stroke();
    ctx.restore();

    // Legs showing weight-bearing shift
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(542, 452);
    ctx.lineTo(545, 545);
    ctx.moveTo(616, 465);
    ctx.lineTo(652, 545);
    ctx.stroke();

    ctx.fillStyle = '#16a34a';
    ctx.font = 'bold 14px system-ui, sans-serif';
    ctx.fillText('✓ 肩线↘ 与胯线↗ 形成夹角，重心落左腿', 455, 570);
  }

  return canvas.toDataURL('image/png');
}

async function seedDemoPostsIfNeeded() {
  const existing = await rawGetAll(STORES.POSTS);

  // Migrate legacy v1 demo-post-2 in-place if user already opened v1 previously
  const legacyDemo2 = existing.find(
    (p) => p && p.id === 'demo-post-2' && Number(p.schemaVersion) !== BACKUP_SCHEMA_VERSION
  );
  if (legacyDemo2) {
    await rawPut(STORES.POSTS, {
      ...legacyDemo2,
      title: 'Procreate 练习红线自检示范：胸腔蛋与骨盆盒扭转',
      track: 'figure',
      lessonId: 'figure-3',
      schemaVersion: BACKUP_SCHEMA_VERSION,
    });
  }

  const wasSeeded = safeLocalStorageGet(SEED_FLAG_KEY) === '1';
  if (wasSeeded) return;

  if (existing.length > 0) {
    safeLocalStorageSet(SEED_FLAG_KEY, '1');
    return;
  }

  const now = Date.now();
  const fiveDaysAgo = new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString();
  const oneDayAgo = new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString();

  const demoPosts = [
    {
      id: 'demo-post-1',
      title: 'Day 1 · 控笔直线与圆弧初体验',
      track: 'core',
      lessonId: 'core-1',
      source: 'web',
      durationMinutes: 20,
      rating: 3,
      notes: '第1次练习连线和椭圆封口，手腕还是有点紧，提醒自己用小臂和肩膀带动画长线。',
      imageDataUrl: createSeedIllustration('lines'),
      challengeId: '',
      schemaVersion: BACKUP_SCHEMA_VERSION,
      createdAt: fiveDaysAgo,
      updatedAt: fiveDaysAgo,
    },
    {
      id: 'demo-post-2',
      title: 'Procreate 练习红线自检示范：胸腔蛋与骨盆盒扭转',
      track: 'figure',
      lessonId: 'figure-3',
      source: 'redline',
      durationMinutes: 25,
      rating: 4,
      notes: '导入在外部软件画的人体草稿后，用红线标出肩线与骨盆线的反向倾斜，立刻不僵硬了！',
      imageDataUrl: createSeedIllustration('redline'),
      challengeId: '',
      schemaVersion: BACKUP_SCHEMA_VERSION,
      createdAt: oneDayAgo,
      updatedAt: oneDayAgo,
    },
  ];

  for (const post of demoPosts) {
    await rawPut(STORES.POSTS, post);
  }
  safeLocalStorageSet(SEED_FLAG_KEY, '1');
}

/**
 * Initialize IndexedDB ('DrawPathDB', v1) and seed demo records on first visit.
 * Falls back gracefully to an in-memory store if IndexedDB is unavailable.
 */
export async function initDB() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const hasIDB = typeof indexedDB !== 'undefined';
    if (!hasIDB) {
      useMemoryFallback = true;
      await seedDemoPostsIfNeeded();
      return { mode: 'memory' };
    }

    try {
      dbInstance = await new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(STORES.POSTS)) {
            db.createObjectStore(STORES.POSTS, { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains(STORES.PROGRESS)) {
            db.createObjectStore(STORES.PROGRESS, { keyPath: 'lessonId' });
          }
          if (!db.objectStoreNames.contains(STORES.CUSTOM_VIDEOS)) {
            db.createObjectStore(STORES.CUSTOM_VIDEOS, { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
            db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
          }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error('IndexedDB open failed'));
        request.onblocked = () => reject(new Error('IndexedDB open blocked'));
      });

      dbInstance.onversionchange = () => {
        dbInstance?.close();
        dbInstance = null;
      };

      await seedDemoPostsIfNeeded();
      return { mode: 'indexeddb' };
    } catch (err) {
      console.warn('[DrawPathDB] IndexedDB unavailable, falling back to in-memory storage:', err);
      useMemoryFallback = true;
      dbInstance = null;
      await seedDemoPostsIfNeeded();
      return { mode: 'memory' };
    }
  })();

  return initPromise;
}

export async function getAllPosts() {
  await initDB();
  const posts = await rawGetAll(STORES.POSTS);
  return posts
    .map((p) => normalizeLegacyPostRecord(p, false))
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

export async function savePost(post) {
  await initDB();
  const now = new Date().toISOString();
  const record = {
    id: post?.id || generateId('post'),
    title: String(post?.title || '未命名练习打卡').trim(),
    track: normalizeTrackValue(post?.track || 'core'),
    lessonId: normalizeLegacyLessonId(post?.lessonId || '', false),
    challengeId: String(post?.challengeId || '').trim(),
    source: ['web', 'external', 'redline'].includes(post?.source) ? post.source : 'web',
    durationMinutes: Math.max(1, Number(post?.durationMinutes ?? post?.duration ?? 20) || 20),
    rating: Math.min(5, Math.max(1, Number(post?.rating) || 3)),
    notes: String(post?.notes || '').trim(),
    imageDataUrl: String(post?.imageDataUrl || ''),
    schemaVersion: BACKUP_SCHEMA_VERSION,
    createdAt: post?.createdAt || now,
    updatedAt: now,
  };
  await rawPut(STORES.POSTS, record);
  return record;
}

export async function deletePost(id) {
  await initDB();
  if (!id) return;
  await rawDelete(STORES.POSTS, id);
}

/**
 * Returns lesson progress keyed by lessonId:
 * { [lessonId]: { lessonId, checkedIndices: number[], completed: boolean, updatedAt: string } }
 */
export async function getProgress() {
  await initDB();
  const records = await rawGetAll(STORES.PROGRESS);
  const map = {};
  for (const rec of records) {
    if (rec && rec.lessonId) {
      const normalizedId = normalizeLegacyLessonId(rec.lessonId, false);
      map[normalizedId] = { ...rec, lessonId: normalizedId };
    }
  }
  return map;
}

export async function saveLessonProgress(lessonId, checkedIndices, completed) {
  await initDB();
  const cleanIndices = Array.from(
    new Set(
      (Array.isArray(checkedIndices) ? checkedIndices : [])
        .map((n) => Number(n))
        .filter((n) => Number.isInteger(n) && n >= 0)
    )
  ).sort((a, b) => a - b);

  const record = {
    lessonId: normalizeLegacyLessonId(lessonId, false),
    checkedIndices: cleanIndices,
    completed: Boolean(completed),
    schemaVersion: BACKUP_SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
  };
  await rawPut(STORES.PROGRESS, record);
  return record;
}

export async function getCustomVideos() {
  await initDB();
  const videos = await rawGetAll(STORES.CUSTOM_VIDEOS);
  return videos
    .map((v) => ({ ...v, lessonId: normalizeLegacyLessonId(v.lessonId, false) }))
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

export async function saveCustomVideo(video) {
  await initDB();
  const now = new Date().toISOString();
  const record = {
    id: video?.id || generateId('vid'),
    lessonId: normalizeLegacyLessonId(video?.lessonId || '', false),
    title: String(video?.title || '自选学习视频').trim(),
    url: String(video?.url || '').trim(),
    author: String(video?.author || '个人收藏').trim(),
    notes: String(video?.notes || '').trim(),
    schemaVersion: BACKUP_SCHEMA_VERSION,
    createdAt: video?.createdAt || now,
  };
  await rawPut(STORES.CUSTOM_VIDEOS, record);
  return record;
}

export async function deleteCustomVideo(id) {
  await initDB();
  if (!id) return;
  await rawDelete(STORES.CUSTOM_VIDEOS, id);
}

export async function getSettings() {
  await initDB();
  const record = await rawGet(STORES.SETTINGS, SETTINGS_RECORD_KEY);
  return record?.value && typeof record.value === 'object' ? { ...record.value } : {};
}

export async function saveSettings(settings) {
  await initDB();
  const existing = await getSettings();
  const merged = {
    ...existing,
    ...(settings && typeof settings === 'object' ? settings : {}),
  };
  await rawPut(STORES.SETTINGS, {
    key: SETTINGS_RECORD_KEY,
    value: merged,
    updatedAt: new Date().toISOString(),
  });
  return merged;
}

/**
 * Custom artist diagrams / templates / style variant overrides stored in IndexedDB.
 * Key format: 'diagram:<lessonId>' | 'template:<templateId>' | 'variant:<lessonId>'
 */
export async function getCustomLessonAssets() {
  await initDB();
  const record = await rawGet(STORES.SETTINGS, CUSTOM_ASSETS_KEY);
  return record?.value && typeof record.value === 'object' ? { ...record.value } : {};
}

export async function saveCustomLessonAsset(assetKey, value) {
  await initDB();
  const existing = await getCustomLessonAssets();
  const next = { ...existing, [assetKey]: value };
  await rawPut(STORES.SETTINGS, {
    key: CUSTOM_ASSETS_KEY,
    value: next,
    updatedAt: new Date().toISOString(),
  });
  return next;
}

export async function deleteCustomLessonAsset(assetKey) {
  await initDB();
  const existing = await getCustomLessonAssets();
  if (!(assetKey in existing)) return existing;
  const next = { ...existing };
  delete next[assetKey];
  await rawPut(STORES.SETTINGS, {
    key: CUSTOM_ASSETS_KEY,
    value: next,
    updatedAt: new Date().toISOString(),
  });
  return next;
}

export async function exportFullBackup() {
  await initDB();
  const [posts, progressRecords, customVideos, settingsRecords] = await Promise.all([
    rawGetAll(STORES.POSTS),
    rawGetAll(STORES.PROGRESS),
    rawGetAll(STORES.CUSTOM_VIDEOS),
    rawGetAll(STORES.SETTINGS),
  ]);

  const payload = {
    app: 'DrawPath Studio',
    schemaVersion: BACKUP_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      posts,
      progress: progressRecords,
      custom_videos: customVideos,
      settings: settingsRecords,
    },
  };

  return JSON.stringify(payload, null, 2);
}

export async function importFullBackup(jsonString) {
  await initDB();
  let parsed;
  try {
    parsed = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
  } catch {
    throw new Error('备份文件不是有效的 JSON 格式，无法导入。');
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('备份文件结构无效。');
  }

  const isLegacyBackup = !parsed.schemaVersion || Number(parsed.schemaVersion) < BACKUP_SCHEMA_VERSION;
  const data = parsed.data && typeof parsed.data === 'object' ? parsed.data : parsed;
  const posts = Array.isArray(data.posts) ? data.posts : [];
  const customVideos = Array.isArray(data.custom_videos) ? data.custom_videos : [];

  let progressRecords = [];
  if (Array.isArray(data.progress)) {
    progressRecords = data.progress;
  } else if (data.progress && typeof data.progress === 'object') {
    progressRecords = Object.values(data.progress);
  }

  let settingsRecords = [];
  if (Array.isArray(data.settings)) {
    settingsRecords = data.settings;
  } else if (data.settings && typeof data.settings === 'object') {
    settingsRecords = [{ key: SETTINGS_RECORD_KEY, value: data.settings }];
  }

  const hasValidPayload =
    'posts' in data || 'progress' in data || 'custom_videos' in data || 'settings' in data;
  if (!hasValidPayload) {
    throw new Error('备份文件中未找到 DrawPath Studio 数据字段。');
  }

  await Promise.all([
    rawClear(STORES.POSTS),
    rawClear(STORES.PROGRESS),
    rawClear(STORES.CUSTOM_VIDEOS),
    rawClear(STORES.SETTINGS),
  ]);

  let importedPosts = 0;
  for (const post of posts) {
    if (post && post.id) {
      const normalized = normalizeLegacyPostRecord(post, isLegacyBackup);
      await rawPut(STORES.POSTS, { ...normalized, schemaVersion: BACKUP_SCHEMA_VERSION });
      importedPosts += 1;
    }
  }
  let importedProgress = 0;
  for (const prog of progressRecords) {
    if (prog && prog.lessonId) {
      const normalizedId = normalizeLegacyLessonId(prog.lessonId, isLegacyBackup);
      await rawPut(STORES.PROGRESS, {
        ...prog,
        lessonId: normalizedId,
        schemaVersion: BACKUP_SCHEMA_VERSION,
      });
      importedProgress += 1;
    }
  }
  let importedVideos = 0;
  for (const vid of customVideos) {
    if (vid && vid.id) {
      const normalizedLessonId = normalizeLegacyLessonId(vid.lessonId || '', isLegacyBackup);
      await rawPut(STORES.CUSTOM_VIDEOS, {
        ...vid,
        lessonId: normalizedLessonId,
        schemaVersion: BACKUP_SCHEMA_VERSION,
      });
      importedVideos += 1;
    }
  }
  for (const setting of settingsRecords) {
    if (setting && setting.key) {
      await rawPut(STORES.SETTINGS, {
        ...setting,
        value:
          setting.value && typeof setting.value === 'object'
            ? {
                ...setting.value,
                lastLessonId: setting.value.lastLessonId
                  ? normalizeLegacyLessonId(setting.value.lastLessonId, isLegacyBackup)
                  : setting.value.lastLessonId,
              }
            : setting.value,
      });
    }
  }

  safeLocalStorageSet(SEED_FLAG_KEY, '1');

  return {
    postsCount: importedPosts,
    progressCount: importedProgress,
    videosCount: importedVideos,
  };
}
