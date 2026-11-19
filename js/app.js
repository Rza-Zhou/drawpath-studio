/**
 * DrawPath Studio · 画路工坊
 * Main Application Controller (v2)
 * Wires curriculum-data.js, pressure-canvas.js, storage-db.js, journal.js, and index.html.
 */

import {
  TRACKS,
  TIERS,
  ONBOARDING_GUIDE,
  PRACTICE_TEMPLATES,
  LESSONS,
  CHALLENGES,
  CHALLENGE_GENERATOR,
  normalizeTrackId,
  getTemplateSVGDataURL,
} from './curriculum-data.js';
import { PressureCanvasStudio } from './pressure-canvas.js';
import {
  initDB,
  getProgress,
  saveLessonProgress,
  getCustomVideos,
  saveCustomVideo,
  deleteCustomVideo,
  getSettings,
  saveSettings,
  getCustomLessonAssets,
  saveCustomLessonAsset,
  deleteCustomLessonAsset,
  exportFullBackup,
  importFullBackup,
} from './storage-db.js';
import { JournalManager } from './journal.js';
import {
  CURATED_3D_MODELS,
  EXTERNAL_3D_POSE_SITES,
  getDefaultPresetForLesson,
  setCachedPresetUid,
  buildSketchfabEmbedUrl,
  buildSketchfabSearchPageUrl,
  parseSketchfabUid,
  searchSketchfabModels,
  openCompanion3DWindow,
} from './pose-3d-helper.js';

const DEVICE_LABELS = {
  ready: '等待落笔',
  pen: '触控笔 / Apple Pencil',
  mouse: '鼠标 (速度模拟压感)',
  touch: '手指触控',
};

const DEFAULT_TIER_LIST = [
  { id: 'beginner', label: '🌱 入门', badge: '入门 ⭐' },
  { id: 'foundation', label: '📘 基础', badge: '基础 ⭐⭐' },
  { id: 'advanced', label: '🔥 进阶', badge: '进阶 ⭐⭐⭐' },
];

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeHttpUrl(url) {
  const raw = String(url || '').trim();
  if (/^https?:\/\//i.test(raw)) return raw;
  return '';
}

function getNormalizedTiers() {
  if (Array.isArray(TIERS) && TIERS.length > 0) {
    return TIERS.map((t) => ({
      id: t.id,
      label: t.label || `${t.icon ? `${t.icon} ` : ''}${t.name || t.id}`,
      badge: t.badge || t.label || t.name || t.id,
    }));
  }
  if (TIERS && typeof TIERS === 'object') {
    return DEFAULT_TIER_LIST.map((def) => {
      const entry = TIERS[def.id];
      if (!entry) return def;
      if (typeof entry === 'string') return { ...def, label: entry, badge: entry };
      return {
        id: def.id,
        label: entry.label || `${entry.icon ? `${entry.icon} ` : ''}${entry.name || def.label}`,
        badge: entry.badge || entry.label || def.badge,
      };
    });
  }
  return DEFAULT_TIER_LIST;
}

function getTierMeta(tierId) {
  const list = getNormalizedTiers();
  return list.find((t) => t.id === tierId) || list[0];
}

function pickRandomItem(arr, avoidLabel = '') {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  if (arr.length === 1) return arr[0];
  const filtered = avoidLabel
    ? arr.filter((item) => (typeof item === 'string' ? item : item?.label) !== avoidLabel)
    : arr;
  const pool = filtered.length > 0 ? filtered : arr;
  return pool[Math.floor(Math.random() * pool.length)];
}

function extractGeneratorText(item) {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return String(item.label || item.name || item.title || '');
}

/**
 * Parses Bilibili (BV/av) and YouTube links into clean iframe embed URLs.
 */
function parseEmbeddableVideo(rawUrl) {
  const url = String(rawUrl || '').trim();
  if (!url) return null;

  const bvMatch = url.match(/\b(BV[0-9A-Za-z]{8,14})\b/);
  if (bvMatch) {
    const bvid = bvMatch[1];
    return {
      provider: 'bilibili',
      label: 'Bilibili 内嵌播放器',
      embedUrl: `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(bvid)}&high_quality=1&danmaku=0`,
      openUrl: sanitizeHttpUrl(url) || `https://www.bilibili.com/video/${bvid}`,
    };
  }

  const avMatch = url.match(/bilibili\.com\/video\/av(\d+)/i);
  if (avMatch) {
    const aid = avMatch[1];
    return {
      provider: 'bilibili',
      label: 'Bilibili 内嵌播放器',
      embedUrl: `https://player.bilibili.com/player.html?aid=${encodeURIComponent(aid)}&high_quality=1&danmaku=0`,
      openUrl: sanitizeHttpUrl(url) || `https://www.bilibili.com/video/av${aid}`,
    };
  }

  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/i
  );
  if (ytMatch) {
    const ytId = ytMatch[1];
    return {
      provider: 'youtube',
      label: 'YouTube 内嵌播放器',
      embedUrl: `https://www.youtube.com/embed/${encodeURIComponent(ytId)}?rel=0`,
      openUrl: sanitizeHttpUrl(url) || `https://www.youtube.com/watch?v=${ytId}`,
    };
  }

  return null;
}

function getLocalDateKey(isoString) {
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.onload = () => resolve(String(reader.result || ''));
    reader.readAsDataURL(file);
  });
}

function resizeImageDataUrl(rawUrl, maxDim = 1600) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const longest = Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height);
      if (!longest || longest <= maxDim) {
        resolve(rawUrl);
        return;
      }
      const scale = maxDim / longest;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round((img.naturalWidth || img.width) * scale);
      canvas.height = Math.round((img.naturalHeight || img.height) * scale);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(rawUrl);
    img.src = rawUrl;
  });
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('备份文件读取失败'));
    reader.onload = () => resolve(String(reader.result || ''));
    reader.readAsText(file, 'utf-8');
  });
}

class DrawPathApp {
  constructor() {
    this.studio = null;
    this.journal = null;

    this.progressMap = {};
    this.customVideos = [];
    this.settings = {};
    this.customAssets = {};

    this.activeView = 'roadmap';
    this.isSplitMode = false;
    this.splitLeftView = 'lessons';

    this.activeRoadmapTrack = 'all';
    this.activeLessonFilterTrack = 'all';
    this.activeLessonFilterTier = 'all';
    this.currentLessonId = LESSONS[0]?.id || 'core-1';
    this.currentLessonStep = 1;
    this.activeEmbedVideoId = null;

    this.activeChallengeTier = 'all';
    this.activeChallengeTrack = 'all';
    this.currentRandomPrompt = null;
    this.activeChallengeContext = null;

    this.isRedlineOverlay = false;
    this.redlineContext = null;
    this.activePracticeLessonId = '';

    this.activeModal3DPresetId = 'zeraora-kemono';
    this.activeModal3DUid = '';
    this.modal3DCandidates = [];
    this.lesson3DCandidatesCache = {};
    this.lastPastedRefDataUrl = '';
    this.isPinboardAsTemplate = false;
    this.pinboardExpanded = false;

    this._toastTimer = null;
    this._toastEl = null;
  }

  async init() {
    await initDB();
    const [progressMap, customVideos, settings, customAssets] = await Promise.all([
      getProgress(),
      getCustomVideos(),
      getSettings(),
      getCustomLessonAssets(),
    ]);

    this.progressMap = progressMap;
    this.customVideos = customVideos;
    this.settings = settings;
    this.customAssets = customAssets || {};

    this._applyTheme(this._resolveInitialTheme(settings.theme));
    this._setupDialogClosedByFallback();
    this._registerServiceWorker();

    this._initCanvasStudio();
    await this._initJournal();

    this._populateTemplateSelect();
    this._applySavedCanvasSettings();

    this._bindHeaderAndNav();
    this._bindRoadmapControls();
    this._bindLessonControls();
    this._bindChallengeControls();
    this._bindCanvasToolbar();
    this._bind3DStudioAndClipboard();
    this._bindKeyboardShortcuts();
    this._bindBackupDialog();

    if (this.settings.lastLessonId && LESSONS.some((l) => l.id === this.settings.lastLessonId)) {
      this.currentLessonId = this.settings.lastLessonId;
    }

    this.renderOnboardingCards();
    this.renderSkillTree();
    this.renderLessonSidebar();
    this.renderLessonDetail(this.currentLessonId);
    this.rollRandomChallenge();
    this.renderChallenges();
    this.updateStatsUI();
  }

  _resolveInitialTheme(savedTheme) {
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  _applyTheme(theme) {
    const resolved = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.style.colorScheme = resolved;

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', resolved === 'dark' ? '#13151a' : '#f8fafc');
    }

    const btn = document.getElementById('btn-theme-toggle');
    if (btn) {
      btn.textContent = resolved === 'dark' ? '☀️ 浅色模式' : '🌙 深色模式';
      btn.setAttribute('aria-pressed', String(resolved === 'dark'));
    }
  }

  _setupDialogClosedByFallback() {
    if ('closedBy' in HTMLDialogElement.prototype) return;

    document.querySelectorAll('dialog[closedby="any"]').forEach((dialog) => {
      dialog.addEventListener('click', (e) => {
        if (e.target !== dialog) return;
        if (e.clientX === 0 && e.clientY === 0) return;
        const rect = dialog.getBoundingClientRect();
        const isOutside =
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom;
        if (isOutside) {
          dialog.close();
        }
      });
    });
  }

  async _registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    try {
      const reg = await navigator.serviceWorker.register('./sw.js');
      await reg.update().catch(() => {});
    } catch (err) {
      console.warn('[DrawPath] ServiceWorker registration skipped:', err);
    }
  }

  showToast(message, tone = 'info') {
    if (!this._toastEl) {
      const el = document.createElement('div');
      el.id = 'drawpath-toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      el.style.cssText =
        'position:fixed;bottom:22px;right:22px;z-index:9999;max-width:360px;padding:10px 16px;border-radius:12px;font-size:0.9rem;font-weight:500;box-shadow:0 10px 28px rgba(0,0,0,0.28);backdrop-filter:blur(10px);transition:opacity 0.2s ease,transform 0.2s ease;opacity:0;pointer-events:none;';
      document.body.appendChild(el);
      this._toastEl = el;
    }

    const palettes = {
      info: { bg: 'rgba(30, 41, 59, 0.94)', color: '#f8fafc', border: '1px solid rgba(148, 163, 184, 0.35)' },
      success: { bg: 'rgba(6, 78, 59, 0.95)', color: '#ecfdf5', border: '1px solid rgba(52, 211, 153, 0.5)' },
      warning: { bg: 'rgba(120, 53, 15, 0.95)', color: '#fffbeb', border: '1px solid rgba(251, 191, 36, 0.5)' },
      error: { bg: 'rgba(127, 29, 29, 0.95)', color: '#fef2f2', border: '1px solid rgba(248, 113, 113, 0.5)' },
    };
    const style = palettes[tone] || palettes.info;

    this._toastEl.style.background = style.bg;
    this._toastEl.style.color = style.color;
    this._toastEl.style.border = style.border;
    this._toastEl.textContent = message;
    this._toastEl.style.opacity = '1';
    this._toastEl.style.transform = 'translateY(0)';

    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      if (this._toastEl) {
        this._toastEl.style.opacity = '0';
        this._toastEl.style.transform = 'translateY(8px)';
      }
    }, 3200);
  }

  _initCanvasStudio() {
    this.studio = new PressureCanvasStudio({
      stageEl: document.getElementById('canvas-stage'),
      wrapperEl: document.getElementById('canvas-transform-wrapper'),
      templateCanvas: document.getElementById('canvas-layer-template'),
      draftCanvas: document.getElementById('canvas-layer-draft'),
      inkCanvas: document.getElementById('canvas-layer-ink'),
      cursorCanvas: document.getElementById('canvas-layer-cursor'),
      onTelemetry: (info) => this._handleTelemetry(info),
      onHistoryChange: (state) => this._handleHistoryChange(state),
    });
  }

  async _initJournal() {
    this.journal = new JournalManager({
      onSendToRedline: (post) => this._handleSendToRedline(post),
      onPostsChanged: () => this.updateStatsUI(),
      onNotify: (msg, tone) => this.showToast(msg, tone),
    });
    await this.journal.init();
  }

  async _handleSendToRedline(post) {
    if (!post?.imageDataUrl || !this.studio) return;

    if (!this.isSplitMode) {
      this.switchView('canvas');
    }

    await this.studio.loadExternalImageForRedline(post.imageDataUrl);
    this.isRedlineOverlay = true;
    this.activeChallengeContext = null;
    this.redlineContext = {
      title: post.title || '外部练习作品',
      lessonId: post.lessonId || '',
    };

    this._setActiveBrushButton('redline');
    this._setActiveColorUI('#ef4444');
    this._setActiveLayerButton('ink');

    const tplSelect = document.getElementById('canvas-template-select');
    if (tplSelect) tplSelect.value = '';
    const opSlider = document.getElementById('template-opacity-slider');
    const opLabel = document.getElementById('template-opacity-label');
    if (opSlider) opSlider.value = '100';
    if (opLabel) opLabel.textContent = '100%';
    const toggleInk = document.getElementById('toggle-layer-ink');
    if (toggleInk) toggleInk.checked = true;

    this.showToast(`已载入「${post.title || '作品'}」到红线复盘画板，直接用红线笔圈改吧！`, 'success');
  }

  _handleTelemetry(info) {
    const pct = Math.round((Number(info.pressure) || 0) * 100);
    const deviceText = DEVICE_LABELS[info.pointerType] || info.pointerType || '等待落笔';

    const pill = document.getElementById('live-pressure-pill');
    if (pill) {
      if (info.pointerType === 'ready') {
        pill.textContent = info.isPenOnly ? '防误触开启 · 0%' : '压感就绪 · 0%';
        pill.classList.remove('pen-active');
      } else {
        const shortDev = info.pointerType === 'pen' ? '触控笔' : info.pointerType === 'mouse' ? '鼠标' : '触控';
        pill.textContent = `${shortDev} · ${pct}%`;
        pill.classList.toggle('pen-active', info.pointerType === 'pen' || pct > 0);
      }
    }

    const devEl = document.getElementById('telemetry-device');
    const presEl = document.getElementById('telemetry-pressure');
    const tiltEl = document.getElementById('telemetry-tilt');
    const barEl = document.getElementById('telemetry-pressure-bar');

    if (devEl) devEl.textContent = deviceText;
    if (presEl) presEl.textContent = `${pct}%`;
    if (barEl) barEl.value = pct;
    if (tiltEl) tiltEl.textContent = `${Math.round(info.tiltX || 0)}°, ${Math.round(info.tiltY || 0)}°`;
  }

  _handleHistoryChange({ canUndo, canRedo, activeLayer }) {
    const undoBtn = document.getElementById('btn-canvas-undo');
    const redoBtn = document.getElementById('btn-canvas-redo');
    if (undoBtn) undoBtn.disabled = !canUndo;
    if (redoBtn) redoBtn.disabled = !canRedo;
    if (activeLayer) {
      this._setActiveLayerButton(activeLayer);
    }
  }

  _populateTemplateSelect() {
    const select = document.getElementById('canvas-template-select');
    if (!select) return;

    select.innerHTML = '<option value="">无底图(白纸)</option>';
    const trackIds = new Set(TRACKS.map((t) => t.id));

    for (const track of TRACKS) {
      const templates = PRACTICE_TEMPLATES.filter((t) => normalizeTrackId(t.track) === track.id);
      if (templates.length === 0) continue;
      const group = document.createElement('optgroup');
      group.label = `${track.icon} ${track.name}`;
      for (const tpl of templates) {
        const opt = document.createElement('option');
        opt.value = tpl.id;
        opt.textContent = tpl.name;
        group.appendChild(opt);
      }
      select.appendChild(group);
    }

    const extraTemplates = PRACTICE_TEMPLATES.filter((t) => !trackIds.has(normalizeTrackId(t.track)));
    if (extraTemplates.length > 0) {
      const group = document.createElement('optgroup');
      group.label = '🎯 实战构图参考框';
      for (const tpl of extraTemplates) {
        const opt = document.createElement('option');
        opt.value = tpl.id;
        opt.textContent = tpl.name;
        group.appendChild(opt);
      }
      select.appendChild(group);
    }
  }

  _applySavedCanvasSettings() {
    if (!this.studio) return;

    const penOnly = Boolean(this.settings.penOnly);
    const stabilizer = Number.isFinite(Number(this.settings.stabilizer)) ? Number(this.settings.stabilizer) : 3;
    const pressureCurve = ['soft', 'normal', 'hard'].includes(this.settings.pressureCurve)
      ? this.settings.pressureCurve
      : 'normal';
    const brushSize = Number.isFinite(Number(this.settings.brushSize)) ? Number(this.settings.brushSize) : 8;

    this.studio.setPenOnly(penOnly);
    this.studio.setStabilizer(stabilizer);
    this.studio.setPressureCurve(pressureCurve);
    this.studio.setSize(brushSize);

    const penCheckbox = document.getElementById('toggle-pen-only');
    if (penCheckbox) penCheckbox.checked = penOnly;

    const stabSlider = document.getElementById('brush-stabilizer-slider');
    const stabLabel = document.getElementById('brush-stabilizer-label');
    if (stabSlider) stabSlider.value = String(stabilizer);
    if (stabLabel) stabLabel.textContent = String(stabilizer);

    const curveSelect = document.getElementById('pressure-curve-select');
    if (curveSelect) curveSelect.value = pressureCurve;

    const sizeSlider = document.getElementById('brush-size-slider');
    const sizeLabel = document.getElementById('brush-size-label');
    if (sizeSlider) sizeSlider.value = String(brushSize);
    if (sizeLabel) sizeLabel.textContent = `${brushSize}px`;
  }

  _bindHeaderAndNav() {
    document.querySelectorAll('.nav-tab[data-view]').forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetView = tab.dataset.view;
        if (this.isSplitMode) {
          if (targetView === 'lessons' || targetView === 'challenges') {
            this._setSplitLeftView(targetView);
            this.switchView(targetView);
            return;
          }
          if (targetView === 'canvas') {
            this.switchView('canvas');
            return;
          }
          this._setSplitMode(false);
        }
        this.switchView(targetView);
      });
    });

    document.getElementById('btn-split-mode')?.addEventListener('click', () => {
      this._setSplitMode(!this.isSplitMode);
    });

    document.getElementById('btn-open-onboarding')?.addEventListener('click', () => {
      const dlg = document.getElementById('dialog-onboarding');
      if (dlg && !dlg.open) dlg.showModal();
    });

    document.getElementById('btn-open-backup')?.addEventListener('click', () => {
      const dlg = document.getElementById('dialog-backup');
      if (dlg && !dlg.open) dlg.showModal();
    });

    document.getElementById('btn-theme-toggle')?.addEventListener('click', async () => {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      this._applyTheme(next);
      this.settings = await saveSettings({ theme: next });
    });
  }

  switchView(viewName) {
    const valid = ['roadmap', 'lessons', 'canvas', 'challenges', 'journal'];
    if (!valid.includes(viewName)) return;
    this.activeView = viewName;

    document.querySelectorAll('.nav-tab[data-view]').forEach((tab) => {
      const isMatch = tab.dataset.view === viewName;
      tab.classList.toggle('active', isMatch);
      tab.setAttribute('aria-current', isMatch ? 'page' : 'false');
    });

    document.querySelectorAll('.view-section').forEach((sec) => {
      sec.classList.toggle('active', sec.id === `view-${viewName}`);
    });
  }

  _setSplitLeftView(leftView) {
    const target = leftView === 'challenges' ? 'challenges' : 'lessons';
    this.splitLeftView = target;
    document.getElementById('view-lessons')?.classList.toggle('split-active-left', target === 'lessons');
    document.getElementById('view-challenges')?.classList.toggle('split-active-left', target === 'challenges');
  }

  _clearSplitLeftMarkers() {
    document.getElementById('view-lessons')?.classList.remove('split-active-left');
    document.getElementById('view-challenges')?.classList.remove('split-active-left');
  }

  _setSplitMode(enabled) {
    if (enabled && window.innerWidth < 1024) {
      this.showToast('同屏边看边练建议在 ≥1024px 宽屏或 iPad 横屏下使用，已切至压感画板。', 'warning');
      this.isSplitMode = false;
      document.body.classList.remove('split-mode');
      this._clearSplitLeftMarkers();
      const btn = document.getElementById('btn-split-mode');
      if (btn) {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
      this.switchView('canvas');
      return;
    }

    this.isSplitMode = Boolean(enabled);
    document.body.classList.toggle('split-mode', this.isSplitMode);

    const btn = document.getElementById('btn-split-mode');
    if (btn) {
      btn.classList.toggle('active', this.isSplitMode);
      btn.setAttribute('aria-pressed', String(this.isSplitMode));
    }

    if (this.isSplitMode) {
      const leftTarget = this.activeView === 'challenges' ? 'challenges' : 'lessons';
      this._setSplitLeftView(leftTarget);
      if (this.activeView !== 'lessons' && this.activeView !== 'challenges' && this.activeView !== 'canvas') {
        this.switchView('lessons');
      }
      this.showToast(
        leftTarget === 'challenges'
          ? '已开启同屏边看边练：左侧看实战课题，右侧直接按构图框开画！'
          : '已开启同屏边看边练：左侧看教程与视频，右侧实时压感练习！',
        'success'
      );
    } else {
      this._clearSplitLeftMarkers();
    }
  }

  _bindRoadmapControls() {
    document.querySelectorAll('.track-filter-btn[data-track]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.activeRoadmapTrack = btn.dataset.track || 'all';
        document.querySelectorAll('.track-filter-btn[data-track]').forEach((b) => {
          b.classList.toggle('active', b === btn);
        });
        this.renderSkillTree();
      });
    });

    document.getElementById('skill-tree-container')?.addEventListener('click', (e) => {
      const card = e.target.closest('[data-lesson-id]');
      if (!card) return;
      this.openLesson(card.dataset.lessonId);
    });
  }

  renderOnboardingCards() {
    const container = document.getElementById('onboarding-cards-container');
    if (!container) return;

    container.innerHTML = ONBOARDING_GUIDE.map(
      (item) => `
      <article class="onboarding-card">
        <span class="onboarding-step">${escapeHtml(item.step || 'GUIDE')}</span>
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.summary)}</p>
        <ul class="onboarding-bullets">
          ${(item.bullets || []).map((b) => `<li>${escapeHtml(b)}</li>`).join('')}
        </ul>
        ${item.tip ? `<p class="onboarding-tip">💡 ${escapeHtml(item.tip)}</p>` : ''}
      </article>
    `
    ).join('');
  }

  renderSkillTree() {
    const container = document.getElementById('skill-tree-container');
    if (!container) return;

    const normalizedFilter = this.activeRoadmapTrack === 'all' ? 'all' : normalizeTrackId(this.activeRoadmapTrack);
    const visibleTracks =
      normalizedFilter === 'all' ? TRACKS : TRACKS.filter((t) => t.id === normalizedFilter);
    const tiers = getNormalizedTiers();

    container.innerHTML = visibleTracks
      .map((track) => {
        const trackLessons = LESSONS.filter((l) => l.track === track.id).sort((a, b) => a.order - b.order);
        const completedCount = trackLessons.filter((l) => this._isLessonCompleted(l)).length;

        const tiersHtml = tiers
          .map((tier) => {
            const tierLessons = trackLessons.filter((l) => (l.tier || 'beginner') === tier.id);
            if (tierLessons.length === 0) return '';
            const tierDone = tierLessons.filter((l) => this._isLessonCompleted(l)).length;

            const nodesHtml = tierLessons
              .map((lesson) => {
                const prog = this.progressMap[lesson.id];
                const checkedCount = prog?.checkedIndices?.length || 0;
                const totalChecks = lesson.checklist?.length || 0;
                const done = this._isLessonCompleted(lesson);

                return `
                  <button type="button" class="skill-node-card ${done ? 'completed' : ''}" data-lesson-id="${escapeHtml(lesson.id)}">
                    <div class="skill-node-top">
                      <span class="badge badge-track" style="--track-color:${escapeHtml(track.color)}">第 ${escapeHtml(String(lesson.order))} 课</span>
                      <span class="badge ${done ? 'badge-completed' : ''}">${done ? '✅ 已通关' : `${checkedCount}/${totalChecks}`}</span>
                    </div>
                    <div class="skill-node-title">${escapeHtml(lesson.title)}</div>
                    <div class="skill-node-subtitle">${escapeHtml(lesson.mantra || lesson.subtitle)}</div>
                    <div class="skill-node-meta">
                      <span>⏱ ${escapeHtml(String(lesson.estimatedMinutes))} 分钟</span>
                      <span>开始 ➜</span>
                    </div>
                  </button>
                `;
              })
              .join('');

            return `
              <div class="skill-tier-group">
                <div class="skill-tier-heading">
                  <span class="skill-tier-badge">${escapeHtml(tier.label)}</span>
                  <span>${tierDone} / ${tierLessons.length} 课</span>
                </div>
                <div class="skill-nodes-grid">${nodesHtml}</div>
              </div>
            `;
          })
          .join('');

        return `
          <section class="skill-track-section" style="--track-color:${escapeHtml(track.color)}">
            <div class="skill-track-header">
              <div>
                <div class="skill-track-title-group">
                  <h4>${escapeHtml(track.icon)} ${escapeHtml(track.name)}</h4>
                  <span class="badge badge-track">${escapeHtml(track.badge)}</span>
                </div>
                <p class="skill-track-desc">${escapeHtml(track.description)}</p>
              </div>
              <span class="skill-track-progress">${completedCount} / ${trackLessons.length} 课完成</span>
            </div>
            ${tiersHtml}
          </section>
        `;
      })
      .join('');
  }

  _isLessonCompleted(lesson) {
    const prog = this.progressMap[lesson.id];
    if (!prog) return false;
    if (prog.completed) return true;
    const total = lesson.checklist?.length || 0;
    return total > 0 && (prog.checkedIndices?.length || 0) >= total;
  }

  updateStatsUI() {
    const totalCount = LESSONS.length;
    const completedCount = LESSONS.filter((l) => this._isLessonCompleted(l)).length;
    const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const bar = document.getElementById('overall-progress-bar');
    const text = document.getElementById('overall-progress-text');
    const statLessons = document.getElementById('stat-completed-lessons');
    const statPosts = document.getElementById('stat-journal-count');
    const statStreak = document.getElementById('stat-streak-days');

    if (bar) bar.value = pct;
    if (text) text.textContent = `已完成 ${completedCount} / ${totalCount} 课 (${pct}%)`;
    if (statLessons) statLessons.textContent = String(completedCount);

    const posts = this.journal?.getPosts() || [];
    if (statPosts) statPosts.textContent = String(posts.length);

    const activeDays = new Set();
    for (const post of posts) {
      const key = getLocalDateKey(post.createdAt);
      if (key) activeDays.add(key);
    }
    if (statStreak) statStreak.textContent = String(activeDays.size);
  }

  _bindLessonControls() {
    const trackSelect = document.getElementById('lesson-track-select');
    trackSelect?.addEventListener('change', () => {
      this.activeLessonFilterTrack = trackSelect.value || 'all';
      this.renderLessonSidebar();
    });

    const tierSelect = document.getElementById('lesson-tier-select');
    tierSelect?.addEventListener('change', () => {
      this.activeLessonFilterTier = tierSelect.value || 'all';
      this.renderLessonSidebar();
    });

    document.getElementById('lesson-list-sidebar')?.addEventListener('click', (e) => {
      const item = e.target.closest('.lesson-item[data-lesson-id]');
      if (!item) return;
      this.openLesson(item.dataset.lessonId, false);
    });

    const detail = document.getElementById('lesson-detail-container');
    detail?.addEventListener('change', async (e) => {
      const diagramInput = e.target.closest('#upload-lesson-diagram-input');
      if (diagramInput) {
        const file = diagramInput.files?.[0];
        diagramInput.value = '';
        if (!file || !file.type.startsWith('image/')) {
          if (file) this.showToast('请选择 PNG / JPG / WebP 图片文件。', 'warning');
          return;
        }
        try {
          const rawUrl = await readFileAsDataUrl(file);
          const sizedUrl = await resizeImageDataUrl(rawUrl, 1600);
          this.customAssets = await saveCustomLessonAsset(`diagram:${this.currentLessonId}`, sizedUrl);
          this.renderLessonDetail(this.currentLessonId);
          this.showToast('🖼️ 已将你的画师图设为本课结构示意图！', 'success');
        } catch (err) {
          this.showToast(err.message || '读取图片失败', 'error');
        }
        return;
      }

      const templateInput = e.target.closest('#upload-lesson-template-input');
      if (templateInput) {
        const file = templateInput.files?.[0];
        templateInput.value = '';
        if (!file || !file.type.startsWith('image/')) {
          if (file) this.showToast('请选择 PNG / JPG / WebP 图片文件。', 'warning');
          return;
        }
        const lesson = LESSONS.find((l) => l.id === this.currentLessonId);
        const tplKeyId = lesson?.templateId || this.currentLessonId;
        try {
          const rawUrl = await readFileAsDataUrl(file);
          const sizedUrl = await resizeImageDataUrl(rawUrl, 1600);
          this.customAssets = await saveCustomLessonAsset(`template:${tplKeyId}`, sizedUrl);
          this.renderLessonDetail(this.currentLessonId);
          if (document.getElementById('canvas-template-select')?.value === tplKeyId) {
            const opacity = Number(document.getElementById('template-opacity-slider')?.value ?? 45);
            await this.studio?.loadTemplateSVG(sizedUrl, opacity);
          }
          this.showToast('🖼️ 已上传自定义练习底图，点击去画板即可使用！', 'success');
        } catch (err) {
          this.showToast(err.message || '读取底图失败', 'error');
        }
        return;
      }

      const checkbox = e.target.closest('input[type="checkbox"][data-check-index]');
      if (!checkbox) return;
      checkbox.closest('.checklist-item')?.classList.toggle('checked', checkbox.checked);

      const lesson = LESSONS.find((l) => l.id === this.currentLessonId);
      if (!lesson) return;

      const checkedIndices = Array.from(
        detail.querySelectorAll('input[type="checkbox"][data-check-index]:checked')
      ).map((cb) => Number(cb.dataset.checkIndex));

      const completed =
        (lesson.checklist?.length || 0) > 0 && checkedIndices.length >= lesson.checklist.length;
      const record = await saveLessonProgress(lesson.id, checkedIndices, completed);
      this.progressMap[lesson.id] = record;

      this.renderLessonSidebar();
      this.renderSkillTree();
      this.updateStatsUI();

      if (completed) {
        this.showToast(`🎉 恭喜完成「${lesson.title}」全部自检项！`, 'success');
      }
    });

    detail?.addEventListener('click', async (e) => {
      const variantBtn = e.target.closest('.diagram-variant-btn[data-variant-id]');
      if (variantBtn) {
        const variantId = variantBtn.dataset.variantId;
        if (variantId && this.currentLessonId) {
          this.customAssets = await saveCustomLessonAsset(`variant:${this.currentLessonId}`, variantId);
          this.renderLessonDetail(this.currentLessonId);
        }
        return;
      }

      if (e.target.closest('#btn-replace-lesson-diagram')) {
        detail.querySelector('#upload-lesson-diagram-input')?.click();
        return;
      }

      if (e.target.closest('#btn-reset-lesson-diagram')) {
        this.customAssets = await deleteCustomLessonAsset(`diagram:${this.currentLessonId}`);
        this.renderLessonDetail(this.currentLessonId);
        this.showToast('已恢复默认红蓝结构示意图。', 'info');
        return;
      }

      if (e.target.closest('#btn-replace-lesson-template')) {
        detail.querySelector('#upload-lesson-template-input')?.click();
        return;
      }

      if (e.target.closest('#btn-reset-lesson-template')) {
        const lesson = LESSONS.find((l) => l.id === this.currentLessonId);
        const tplKeyId = lesson?.templateId || this.currentLessonId;
        this.customAssets = await deleteCustomLessonAsset(`template:${tplKeyId}`);
        this.renderLessonDetail(this.currentLessonId);
        if (document.getElementById('canvas-template-select')?.value === tplKeyId) {
          const opacity = Number(document.getElementById('template-opacity-slider')?.value ?? 45);
          await this.studio?.loadTemplateSVG(getTemplateSVGDataURL(tplKeyId) || '', opacity);
        }
        this.showToast('已恢复默认练习底图。', 'info');
        return;
      }

      const stepTab = e.target.closest('.lesson-step-tab[data-step]');
      if (stepTab) {
        this._setLessonStep(Number(stepTab.dataset.step));
        return;
      }

      const gotoStepBtn = e.target.closest('button[data-goto-step]');
      if (gotoStepBtn) {
        this._setLessonStep(Number(gotoStepBtn.dataset.gotoStep));
        return;
      }

      const nextLessonBtn = e.target.closest('button[data-next-lesson]');
      if (nextLessonBtn) {
        const nextId = nextLessonBtn.dataset.nextLesson;
        if (nextId) {
          await this.openLesson(nextId, false);
        } else {
          if (this.isSplitMode) this._setSplitMode(false);
          this.switchView('roadmap');
        }
        return;
      }

      const practiceBtn = e.target.closest('#btn-practice-this-lesson, button[data-practice-lesson]');
      if (practiceBtn) {
        await this._practiceCurrentLesson();
        return;
      }

      const addVidBtn = e.target.closest('#btn-add-custom-video');
      if (addVidBtn) {
        this._openAddVideoModal();
        return;
      }

      const copyBtn = e.target.closest('button[data-copy-keywords]');
      if (copyBtn) {
        const kw = copyBtn.dataset.copyKeywords || '';
        try {
          await navigator.clipboard.writeText(kw);
          this.showToast(`已复制搜索关键词：「${kw}」`, 'success');
        } catch {
          this.showToast(`推荐搜索关键词：${kw}`, 'info');
        }
        return;
      }

      const playBtn = e.target.closest('button[data-play-custom-video]');
      if (playBtn) {
        this.activeEmbedVideoId = playBtn.dataset.playCustomVideo;
        this._renderVideoPlayerStage(this.currentLessonId);
        return;
      }

      const delVidBtn = e.target.closest('button[data-delete-custom-video]');
      if (delVidBtn) {
        const vidId = delVidBtn.dataset.deleteCustomVideo;
        await deleteCustomVideo(vidId);
        this.customVideos = await getCustomVideos();
        if (this.activeEmbedVideoId === vidId) this.activeEmbedVideoId = null;
        this.renderLessonDetail(this.currentLessonId);
        this.showToast('已移除该自定义视频收藏。', 'info');
      }
    });

    document.getElementById('add-video-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const lessonId = document.getElementById('custom-video-lesson-id')?.value || this.currentLessonId;
      const title = document.getElementById('custom-video-title')?.value.trim();
      const url = document.getElementById('custom-video-url')?.value.trim();
      const author = document.getElementById('custom-video-author')?.value.trim();
      const notes = document.getElementById('custom-video-notes')?.value.trim();

      if (!title || !url) {
        this.showToast('请填写视频标题和链接。', 'warning');
        return;
      }

      const saved = await saveCustomVideo({ lessonId, title, url, author, notes });
      this.customVideos = await getCustomVideos();
      this.activeEmbedVideoId = saved.id;

      document.getElementById('dialog-add-video')?.close();
      this.renderLessonDetail(this.currentLessonId);
      this._setLessonStep(2);

      const parsed = parseEmbeddableVideo(url);
      this.showToast(
        parsed
          ? `已添加「${saved.title}」并在当前步骤播放器内嵌就绪！`
          : `已收藏「${saved.title}」（该链接暂不支持直接 iframe 内嵌，可点击原网页观看）。`,
        'success'
      );
    });
  }

  _setLessonStep(step) {
    const validStep = [1, 2, 3].includes(Number(step)) ? Number(step) : 1;
    this.currentLessonStep = validStep;

    const detail = document.getElementById('lesson-detail-container');
    if (!detail) return;

    detail.querySelectorAll('.lesson-step-tab[data-step]').forEach((tab) => {
      const isMatch = Number(tab.dataset.step) === validStep;
      tab.classList.toggle('active', isMatch);
      tab.setAttribute('aria-selected', String(isMatch));
    });

    detail.querySelectorAll('.lesson-step-panel[data-step-panel]').forEach((panel) => {
      panel.classList.toggle('active', Number(panel.dataset.stepPanel) === validStep);
    });
  }

  async openLesson(lessonId, switchTab = true, options = {}) {
    const lesson = LESSONS.find((l) => l.id === lessonId);
    if (!lesson) return;

    this.currentLessonId = lesson.id;
    this.currentLessonStep = Number.isInteger(options.step) ? options.step : 1;
    this.activeEmbedVideoId = null;
    this.settings = await saveSettings({ lastLessonId: lesson.id });

    if (this.activeLessonFilterTrack !== 'all' && normalizeTrackId(this.activeLessonFilterTrack) !== lesson.track) {
      this.activeLessonFilterTrack = 'all';
      const select = document.getElementById('lesson-track-select');
      if (select) select.value = 'all';
    }
    if (this.activeLessonFilterTier !== 'all' && (lesson.tier || 'beginner') !== this.activeLessonFilterTier) {
      this.activeLessonFilterTier = 'all';
      const tierSel = document.getElementById('lesson-tier-select');
      if (tierSel) tierSel.value = 'all';
    }

    this.renderLessonSidebar();
    this.renderLessonDetail(lesson.id);

    if (switchTab) {
      if (this.isSplitMode) {
        this._setSplitLeftView('lessons');
      }
      this.switchView('lessons');
    }
  }

  renderLessonSidebar() {
    const sidebar = document.getElementById('lesson-list-sidebar');
    if (!sidebar) return;

    const trackFilter =
      this.activeLessonFilterTrack === 'all' ? 'all' : normalizeTrackId(this.activeLessonFilterTrack);
    const tierFilter = this.activeLessonFilterTier || 'all';

    const filtered = LESSONS.filter((lesson) => {
      if (trackFilter !== 'all' && lesson.track !== trackFilter) return false;
      if (tierFilter !== 'all' && (lesson.tier || 'beginner') !== tierFilter) return false;
      return true;
    });

    if (filtered.length === 0) {
      sidebar.innerHTML = '<div class="empty-state" style="padding:1.1rem;font-size:0.84rem;">当前筛选下暂无课程</div>';
      return;
    }

    const tiers = getNormalizedTiers();
    const groupsHtml = [];

    for (const tier of tiers) {
      const tierItems = filtered.filter((l) => (l.tier || 'beginner') === tier.id);
      if (tierItems.length === 0) continue;

      groupsHtml.push(`<div class="lesson-tier-heading">${escapeHtml(tier.label)} (${tierItems.length})</div>`);
      for (const lesson of tierItems) {
        const track = TRACKS.find((t) => t.id === lesson.track) || TRACKS[0];
        const prog = this.progressMap[lesson.id];
        const checkedCount = prog?.checkedIndices?.length || 0;
        const total = lesson.checklist?.length || 0;
        const done = this._isLessonCompleted(lesson);
        const isActive = lesson.id === this.currentLessonId;

        groupsHtml.push(`
          <button type="button" class="lesson-item ${isActive ? 'active' : ''} ${done ? 'completed' : ''}" data-lesson-id="${escapeHtml(lesson.id)}">
            <div class="lesson-item-sub">
              <span>${escapeHtml(track.icon)} ${escapeHtml(track.name)}</span>
              <span>${done ? '✅ 已通关' : `${checkedCount}/${total}`}</span>
            </div>
            <strong class="lesson-item-title">${escapeHtml(String(lesson.order))}. ${escapeHtml(lesson.title)}</strong>
            <span class="lesson-item-sub"><span>⏱ ${escapeHtml(String(lesson.estimatedMinutes))} 分钟</span><span>${escapeHtml(lesson.difficulty)}</span></span>
          </button>
        `);
      }
    }

    sidebar.innerHTML = groupsHtml.join('');
  }

  renderLessonDetail(lessonId) {
    const container = document.getElementById('lesson-detail-container');
    if (!container) return;

    const lesson = LESSONS.find((l) => l.id === lessonId) || LESSONS[0];
    if (!lesson) return;

    const track = TRACKS.find((t) => t.id === lesson.track) || TRACKS[0];
    const tierMeta = getTierMeta(lesson.tier || 'beginner');
    const tpl = PRACTICE_TEMPLATES.find((t) => t.id === lesson.templateId);
    const prog = this.progressMap[lesson.id];
    const checkedSet = new Set(prog?.checkedIndices || []);
    const lessonCustomVideos = this.customVideos.filter((v) => v.lessonId === lesson.id);

    const currentIdx = LESSONS.findIndex((l) => l.id === lesson.id);
    const nextLesson = currentIdx >= 0 && currentIdx + 1 < LESSONS.length ? LESSONS[currentIdx + 1] : null;
    const step = [1, 2, 3].includes(this.currentLessonStep) ? this.currentLessonStep : 1;
    const customDiagramUrl = this.customAssets?.[`diagram:${lesson.id}`] || '';
    const tplKeyId = lesson.templateId || lesson.id;
    const customTemplateUrl = this.customAssets?.[`template:${tplKeyId}`] || '';

    const variants = Array.isArray(lesson.variants) && lesson.variants.length > 0 ? lesson.variants : null;
    const savedVariantId = this.customAssets?.[`variant:${lesson.id}`];
    const activeVariant = variants
      ? variants.find((v) => v.id === savedVariantId) || variants[0]
      : null;
    const activeDiagramSvg = activeVariant?.svg || lesson.cheatSheetSVG || '';

    container.innerHTML = `
      <div class="lesson-detail-header">
        <div>
          <div class="lesson-detail-badges">
            <span class="badge badge-track" style="--track-color:${escapeHtml(track.color)}">${escapeHtml(track.icon)} ${escapeHtml(track.name)}</span>
            <span class="badge badge-difficulty">${escapeHtml(tierMeta.label)} · ${escapeHtml(lesson.difficulty)}</span>
            <span class="badge">⏱ ${escapeHtml(String(lesson.estimatedMinutes))} 分钟</span>
          </div>
          <h3>${escapeHtml(String(lesson.order))}. ${escapeHtml(lesson.title)}</h3>
          <p class="section-sub">${escapeHtml(lesson.subtitle)}</p>
        </div>
        <button type="button" id="btn-practice-this-lesson" class="btn btn-primary">
          ✍️ 载入底图去画板
        </button>
      </div>

      <div class="lesson-mantra-banner">
        <span>💡</span>
        <span>${escapeHtml(lesson.mantra || lesson.subtitle)}</span>
      </div>

      <div class="lesson-step-tabs" role="tablist" aria-label="课程学习步骤">
        <button type="button" role="tab" aria-selected="${step === 1}" class="lesson-step-tab ${step === 1 ? 'active' : ''}" data-step="1">① 看图懂结构</button>
        <button type="button" role="tab" aria-selected="${step === 2}" class="lesson-step-tab ${step === 2 ? 'active' : ''}" data-step="2">② 视频与练手</button>
        <button type="button" role="tab" aria-selected="${step === 3}" class="lesson-step-tab ${step === 3 ? 'active' : ''}" data-step="3">③ 避坑与自检</button>
      </div>

      <!-- Step 1: Visual Cheat Sheet + 3 Key Points -->
      <section class="lesson-step-panel ${step === 1 ? 'active' : ''}" data-step-panel="1" aria-label="步骤一：看图懂结构">
        <div class="cheatsheet-box">
          <div class="cheatsheet-header-row">
            <h4>📐 1 分钟结构图解速览</h4>
            <div class="cheatsheet-controls">
              <input type="file" id="upload-lesson-diagram-input" accept="image/*" hidden>
              <button type="button" id="btn-replace-lesson-diagram" class="btn btn-sm" title="上传你收藏的画师图/教材图替换本课示意图">🖼️ 上传画师图替换</button>
              ${customDiagramUrl ? `<button type="button" id="btn-reset-lesson-diagram" class="btn btn-sm">↺ 恢复默认图</button>` : ''}
            </div>
          </div>
          ${
            !customDiagramUrl && variants
              ? `<div class="diagram-variant-pills" role="group" aria-label="切换示意图风格">
                  ${variants
                    .map(
                      (v) =>
                        `<button type="button" class="diagram-variant-btn ${v.id === activeVariant?.id ? 'active' : ''}" data-variant-id="${escapeHtml(v.id)}">${escapeHtml(v.label)}</button>`
                    )
                    .join('')}
                </div>`
              : ''
          }
          <div class="cheatsheet-svg-wrap">
            ${
              customDiagramUrl
                ? `<img src="${escapeHtml(customDiagramUrl)}" alt="${escapeHtml(lesson.title)} 自定义画师示意图" class="custom-diagram-img">`
                : activeDiagramSvg
            }
          </div>
        </div>

        <div class="lesson-block">
          <h4>💡 核心要点（记住这 3 条即可）</h4>
          <div class="keypoints-compact-grid">
            ${(lesson.keyPoints || [])
              .map(
                (kp, idx) => `
                <div class="key-point-card">
                  <h5>${idx + 1}. ${escapeHtml(kp.title)}</h5>
                  <p>${escapeHtml(kp.detail)}</p>
                </div>
              `
              )
              .join('')}
          </div>
        </div>

        <div class="lesson-step-nav">
          <span class="section-sub">理解结构后，点击下一步看视频演示并上手描底图。</span>
          <button type="button" class="btn btn-primary" data-goto-step="2">下一步：视频与练手 →</button>
        </div>
      </section>

      <!-- Step 2: Embedded Video Player + Practice Canvas CTA -->
      <section class="lesson-step-panel ${step === 2 ? 'active' : ''}" data-step-panel="2" aria-label="步骤二：视频与练手">
        <div class="lesson-block">
          <div class="videos-section-header">
            <h4>🎬 配套视频 &amp; 同屏播放区</h4>
            <button type="button" id="btn-add-custom-video" class="btn btn-secondary btn-sm">➕ 粘贴 B站 / YouTube 教程</button>
          </div>

          <div id="video-player-stage" class="video-player-stage"></div>

          ${
            lessonCustomVideos.length > 0
              ? `
            <div class="custom-videos-block">
              <h5>⭐ 我收藏的本课视频 (${lessonCustomVideos.length})</h5>
              <div class="videos-grid">
                ${lessonCustomVideos
                  .map((vid) => {
                    const parsed = parseEmbeddableVideo(vid.url);
                    const safeHref = sanitizeHttpUrl(vid.url) || parsed?.openUrl || '#';
                    return `
                      <article class="video-card video-card-custom">
                        <div class="video-card-header">
                          <span class="badge badge-track">${parsed ? escapeHtml(parsed.label) : '外链视频'}</span>
                          <span class="video-card-meta">${escapeHtml(vid.author || '个人收藏')}</span>
                        </div>
                        <h5 class="video-card-title">${escapeHtml(vid.title)}</h5>
                        ${vid.notes ? `<p class="video-notes">${escapeHtml(vid.notes)}</p>` : ''}
                        <div class="video-card-actions">
                          ${
                            parsed
                              ? `<button type="button" class="btn btn-primary btn-sm" data-play-custom-video="${escapeHtml(vid.id)}">▶ 站内播放</button>`
                              : ''
                          }
                          <a class="btn btn-sm" href="${escapeHtml(safeHref)}" target="_blank" rel="noopener noreferrer">🔗 原网页</a>
                          <button type="button" class="btn btn-sm btn-danger-subtle" data-delete-custom-video="${escapeHtml(vid.id)}">🗑 移除</button>
                        </div>
                      </article>
                    `;
                  })
                  .join('')}
              </div>
            </div>
          `
              : ''
          }

          <div class="videos-grid">
            ${(lesson.videos || [])
              .map((vid) => {
                const safeUrl = sanitizeHttpUrl(vid.url);
                const platLabel = vid.platform === 'youtube' ? 'YouTube 搜索' : 'B站搜索';
                return `
                  <article class="video-card">
                    <div class="video-card-header">
                      <span class="badge badge-source">${escapeHtml(platLabel)}</span>
                      <span class="video-card-meta">⏱ ${escapeHtml(vid.duration || '约15分钟')}</span>
                    </div>
                    <h5 class="video-card-title">${escapeHtml(vid.title)}</h5>
                    <div class="video-card-meta">推荐：${escapeHtml(vid.author || '绘画基础名师')}</div>
                    <p class="video-summary">${escapeHtml(vid.summary || '')}</p>
                    ${
                      Array.isArray(vid.timestamps) && vid.timestamps.length > 0
                        ? `<ul class="video-timestamps">
                            ${vid.timestamps
                              .map((ts) => `<li class="timestamp-chip"><code>${escapeHtml(ts.time)}</code>${escapeHtml(ts.label)}</li>`)
                              .join('')}
                          </ul>`
                        : ''
                    }
                    <div class="video-card-actions">
                      ${
                        safeUrl
                          ? `<a class="btn btn-primary btn-sm" href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener noreferrer">🔍 去搜索观看</a>`
                          : ''
                      }
                      <button type="button" class="btn btn-sm" data-copy-keywords="${escapeHtml(vid.keywords || vid.title)}">📋 复制关键词</button>
                    </div>
                  </article>
                `;
              })
              .join('')}
          </div>
        </div>

        <div class="lesson-mantra-banner" style="justify-content:space-between;flex-wrap:wrap;">
          <span>✍️ 准备练手？底图：<strong>${escapeHtml(customTemplateUrl ? '已使用自定义画师底图' : tpl?.name || '本课练习底图')}</strong></span>
          <div class="lesson-template-actions">
            <input type="file" id="upload-lesson-template-input" accept="image/*" hidden>
            <button type="button" id="btn-replace-lesson-template" class="btn btn-sm">🖼️ 替换练习底图</button>
            ${customTemplateUrl ? `<button type="button" id="btn-reset-lesson-template" class="btn btn-sm">↺ 恢复默认</button>` : ''}
            <button type="button" class="btn btn-primary btn-sm" data-practice-lesson="true">✍️ 打开压感画板 / 同屏开练</button>
          </div>
        </div>

        <div class="lesson-step-nav">
          <button type="button" class="btn" data-goto-step="1">← 上一步：结构图解</button>
          <button type="button" class="btn btn-primary" data-goto-step="3">下一步：避坑与自检 →</button>
        </div>
      </section>

      <!-- Step 3: Pitfalls + Interactive Checklist -->
      <section class="lesson-step-panel ${step === 3 ? 'active' : ''}" data-step-panel="3" aria-label="步骤三：避坑与自检">
        <div class="lesson-block">
          <h4>⚠️ 常见翻车点 &amp; 秒修方案</h4>
          <div class="pitfalls-compact-grid">
            ${(lesson.pitfalls || [])
              .map(
                (p) => `
                <div class="pitfall-row">
                  <div class="pitfall-wrong">❌ ${escapeHtml(p.wrong)}</div>
                  <div class="pitfall-fix">✅ ${escapeHtml(p.fix)}</div>
                </div>
              `
              )
              .join('')}
          </div>
        </div>

        <div class="lesson-block">
          <h4>☑️ 通关自检清单（全部勾选即点亮本课）</h4>
          <div class="checklist-list">
            ${(lesson.checklist || [])
              .map(
                (item, idx) => `
                <label class="checklist-item ${checkedSet.has(idx) ? 'checked' : ''}">
                  <input type="checkbox" data-check-index="${idx}" ${checkedSet.has(idx) ? 'checked' : ''}>
                  <span>${escapeHtml(item)}</span>
                </label>
              `
              )
              .join('')}
          </div>
        </div>

        <div class="lesson-step-nav">
          <button type="button" class="btn" data-goto-step="2">← 上一步：视频与练手</button>
          ${
            nextLesson
              ? `<button type="button" class="btn btn-primary" data-next-lesson="${escapeHtml(nextLesson.id)}">下一课：${escapeHtml(nextLesson.title)} →</button>`
              : `<button type="button" class="btn btn-primary" data-next-lesson="">🎉 已到最后一课，返回路线图</button>`
          }
        </div>
      </section>
    `;

    this._renderVideoPlayerStage(lesson.id);
  }

  _renderVideoPlayerStage(lessonId) {
    const stage = document.getElementById('video-player-stage');
    if (!stage) return;

    const lessonVideos = this.customVideos.filter((v) => v.lessonId === lessonId);
    let targetVideo = lessonVideos.find((v) => v.id === this.activeEmbedVideoId);
    if (!targetVideo) {
      targetVideo = lessonVideos.find((v) => Boolean(parseEmbeddableVideo(v.url))) || null;
    }

    const parsed = targetVideo ? parseEmbeddableVideo(targetVideo.url) : null;
    if (!parsed) {
      stage.innerHTML = `
        <div class="video-stage-placeholder">
          <p><strong>🎬 站内同屏播放区就绪</strong></p>
          <p>点击右上角「➕ 粘贴 B站 / YouTube 教程」粘贴任意含 <code>BV...</code> 的 B站链接或 YouTube 链接，即可直接在此内嵌播放；开启顶部「🧩 同屏边看边练」更能边看演示边在右侧画板临摹！</p>
        </div>
      `;
      return;
    }

    stage.innerHTML = `
      <div class="video-embed-frame-wrap">
        <div class="video-embed-bar">
          <span>▶ 正在播放：<strong>${escapeHtml(targetVideo.title)}</strong>（${escapeHtml(parsed.label)}）</span>
          <a href="${escapeHtml(parsed.openUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm">新窗口打开 ↗</a>
        </div>
        <div class="video-aspect-16x9">
          <iframe
            src="${escapeHtml(parsed.embedUrl)}"
            title="${escapeHtml(targetVideo.title)}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    `;
  }

  _openAddVideoModal() {
    const dialog = document.getElementById('dialog-add-video');
    if (!dialog) return;

    const hiddenLessonId = document.getElementById('custom-video-lesson-id');
    const titleInput = document.getElementById('custom-video-title');
    const urlInput = document.getElementById('custom-video-url');
    const authorInput = document.getElementById('custom-video-author');
    const notesInput = document.getElementById('custom-video-notes');

    if (hiddenLessonId) hiddenLessonId.value = this.currentLessonId;
    if (titleInput) titleInput.value = '';
    if (urlInput) urlInput.value = '';
    if (authorInput) authorInput.value = '';
    if (notesInput) notesInput.value = '';

    if (!dialog.open) dialog.showModal();
  }

  async _loadTemplateAndOpenCanvas(templateId, contextInfo = null) {
    if (!this.studio) return;

    const tplSelect = document.getElementById('canvas-template-select');
    if (tplSelect) tplSelect.value = templateId || '';
    this._setPinboardTemplateState(false);

    const opSlider = document.getElementById('template-opacity-slider');
    const opLabel = document.getElementById('template-opacity-label');
    let opacity = Number(opSlider?.value ?? 45);
    if (this.isRedlineOverlay || opacity === 0 || opacity === 100) {
      opacity = 45;
      if (opSlider) opSlider.value = '45';
      if (opLabel) opLabel.textContent = '45%';
      this.isRedlineOverlay = false;
      this.redlineContext = null;
      this.studio.setActiveLayer('draft');
      this.studio.setBrush('pencil');
      this._setActiveLayerButton('draft');
      this._setActiveBrushButton('pencil');
    }

    const customUrl = templateId ? this.customAssets?.[`template:${templateId}`] : '';
    const tplObj = templateId ? PRACTICE_TEMPLATES.find((t) => t.id === templateId) : null;
    const svgUrl = customUrl || tplObj?.imageUrl || (templateId ? getTemplateSVGDataURL(templateId) : '');
    await this.studio.loadTemplateSVG(svgUrl, opacity);

    if (contextInfo?.type === 'challenge') {
      this.activeChallengeContext = contextInfo;
    } else {
      this.activeChallengeContext = null;
    }

    if (!this.isSplitMode) {
      this.switchView('canvas');
    }
  }

  async _practiceCurrentLesson() {
    const lesson = LESSONS.find((l) => l.id === this.currentLessonId);
    if (!lesson || !this.studio) return;

    this.activePracticeLessonId = lesson.id;
    await this._loadTemplateAndOpenCanvas(lesson.templateId || '', { type: 'lesson', lessonId: lesson.id });
    this.showToast(`已载入「${lesson.title}」结构底图，开练吧！`, 'success');
  }

  /* ========================================================================
     View 4: Combined Practice Challenges & Random Prompt Generator
     ======================================================================== */

  _bindChallengeControls() {
    document.getElementById('btn-roll-challenge')?.addEventListener('click', () => {
      this.rollRandomChallenge();
    });

    document.querySelectorAll('.challenge-tier-btn[data-tier]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.activeChallengeTier = btn.dataset.tier || 'all';
        document.querySelectorAll('.challenge-tier-btn[data-tier]').forEach((b) => {
          b.classList.toggle('active', b === btn);
        });
        this.renderChallenges();
      });
    });

    document.getElementById('challenge-track-select')?.addEventListener('change', (e) => {
      this.activeChallengeTrack = e.target.value || 'all';
      this.renderChallenges();
    });

    const viewEl = document.getElementById('view-challenges');
    viewEl?.addEventListener('click', async (e) => {
      const lessonChip = e.target.closest('[data-goto-lesson]');
      if (lessonChip) {
        await this.openLesson(lessonChip.dataset.gotoLesson, true);
        return;
      }

      const randomPracticeBtn = e.target.closest('button[data-random-practice]');
      if (randomPracticeBtn && this.currentRandomPrompt) {
        const prompt = this.currentRandomPrompt;
        await this._loadTemplateAndOpenCanvas(prompt.templateId, {
          type: 'challenge',
          id: prompt.id,
          title: prompt.title,
          track: prompt.track,
          lessonId: prompt.relatedLessons[0]?.id || '',
          brief: prompt.brief,
        });
        this.showToast(`🎲 随机课题已入画板：${prompt.title}`, 'success');
        return;
      }

      const randomSubmitBtn = e.target.closest('button[data-random-submit]');
      if (randomSubmitBtn && this.currentRandomPrompt && this.journal) {
        const prompt = this.currentRandomPrompt;
        this.journal.openExternalUploadModal({
          title: `🎲 随机课题 · ${prompt.title}`,
          lessonId: prompt.relatedLessons[0]?.id || '',
          track: prompt.track,
          notes: `题面要求：${prompt.brief}`,
          challengeId: prompt.id,
        });
        return;
      }

      const chPracticeBtn = e.target.closest('button[data-challenge-practice]');
      if (chPracticeBtn) {
        const ch = CHALLENGES.find((c) => c.id === chPracticeBtn.dataset.challengePractice);
        if (!ch) return;
        await this._loadTemplateAndOpenCanvas(ch.templateId, {
          type: 'challenge',
          id: ch.id,
          title: ch.title,
          track: normalizeTrackId(ch.track),
          lessonId: ch.relatedLessonIds?.[0] || '',
          brief: ch.brief,
        });
        this.showToast(`🎯 课题「${ch.title}」：${ch.brief}`, 'success');
        return;
      }

      const chSubmitBtn = e.target.closest('button[data-challenge-submit]');
      if (chSubmitBtn && this.journal) {
        const ch = CHALLENGES.find((c) => c.id === chSubmitBtn.dataset.challengeSubmit);
        if (!ch) return;
        this.journal.openExternalUploadModal({
          title: `🎯 ${ch.title}`,
          lessonId: ch.relatedLessonIds?.[0] || '',
          track: normalizeTrackId(ch.track),
          notes: `课题要求：${ch.brief}`,
          challengeId: ch.id,
        });
      }
    });
  }

  rollRandomChallenge() {
    const output = document.getElementById('random-challenge-output');
    if (!output || !CHALLENGE_GENERATOR) return;

    const prev = this.currentRandomPrompt;
    const framing = pickRandomItem(CHALLENGE_GENERATOR.framing, prev?.framingLabel);
    const trackStyle = pickRandomItem(CHALLENGE_GENERATOR.trackStyle, prev?.styleLabel);
    const poseMood = pickRandomItem(CHALLENGE_GENERATOR.poseMood, prev?.poseLabel);
    const lightingAngle = pickRandomItem(CHALLENGE_GENERATOR.lightingAngle, prev?.lightingLabel);

    const framingLabel = extractGeneratorText(framing) || '半身人像构图';
    const framingHint = typeof framing === 'object' && framing?.hint ? framing.hint : '';
    const templateId =
      (typeof framing === 'object' && framing?.templateId) || 'tpl-frame-halfbody';

    const styleLabel = extractGeneratorText(trackStyle) || '通用结构起稿';
    const trackId = normalizeTrackId((typeof trackStyle === 'object' && trackStyle?.track) || 'core');

    const poseLabel = extractGeneratorText(poseMood) || '自信站姿';
    const poseHint = typeof poseMood === 'object' && poseMood?.hint ? poseMood.hint : '';
    const lightingLabel = extractGeneratorText(lightingAngle) || '斜前45°主光';
    const lightingHint = typeof lightingAngle === 'object' && lightingAngle?.hint ? lightingAngle.hint : '';

    // Pick 2-3 relevant lessons across the chosen track + lighting/core support
    const trackMatches = LESSONS.filter((l) => l.track === trackId);
    const suggested = [];
    if (trackMatches.length > 0) {
      suggested.push(trackMatches[0]);
      if (trackMatches.length > 2) {
        suggested.push(trackMatches[Math.floor(trackMatches.length / 2)]);
      }
    }
    const lightingLesson = LESSONS.find((l) => l.id === 'core-7') || LESSONS.find((l) => l.id === 'figure-3');
    if (lightingLesson && !suggested.some((l) => l.id === lightingLesson.id)) {
      suggested.push(lightingLesson);
    }

    const title = `${framingLabel} × ${styleLabel}（${poseLabel}）`;
    const hints = [framingHint, poseHint, lightingHint].filter(Boolean).join(' · ');
    const brief = hints || `采用「${lightingLabel}」完成构图起稿与明暗二分。`;

    this.currentRandomPrompt = {
      id: `random-${Date.now()}`,
      title,
      brief,
      templateId,
      track: trackId,
      framingLabel,
      styleLabel,
      poseLabel,
      lightingLabel,
      relatedLessons: suggested.slice(0, 3),
    };

    output.innerHTML = `
      <div class="random-tags-row">
        <span class="random-tag">📐 ${escapeHtml(framingLabel)}</span>
        <span class="random-tag">🎨 ${escapeHtml(styleLabel)}</span>
        <span class="random-tag">🏃 ${escapeHtml(poseLabel)}</span>
        <span class="random-tag">💡 ${escapeHtml(lightingLabel)}</span>
      </div>
      <h4 class="random-challenge-title">${escapeHtml(title)}</h4>
      <p class="random-challenge-brief">${escapeHtml(brief)}</p>
      <div class="challenge-related-tags">
        <span class="section-sub">推荐先看：</span>
        ${this.currentRandomPrompt.relatedLessons
          .map(
            (l) =>
              `<button type="button" class="challenge-lesson-chip" data-goto-lesson="${escapeHtml(l.id)}">📖 ${escapeHtml(l.title)}</button>`
          )
          .join('')}
      </div>
      <div class="random-challenge-actions">
        <button type="button" class="btn btn-primary btn-sm" data-random-practice="true">✍️ 带构图框去画板</button>
        <button type="button" class="btn btn-secondary btn-sm" data-random-submit="true">📤 外部App画完交作业</button>
      </div>
    `;
  }

  renderChallenges() {
    const grid = document.getElementById('challenge-list-grid');
    if (!grid) return;

    const trackFilter =
      this.activeChallengeTrack === 'all' ? 'all' : normalizeTrackId(this.activeChallengeTrack);
    const tierFilter = this.activeChallengeTier || 'all';

    const filtered = CHALLENGES.filter((ch) => {
      const chTrack = normalizeTrackId(ch.track);
      if (trackFilter !== 'all' && chTrack !== trackFilter) return false;
      if (tierFilter !== 'all' && ch.tier !== tierFilter) return false;
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty-state">当前筛选下暂无实战课题，切换其他路线或难度试试。</div>';
      return;
    }

    grid.innerHTML = filtered
      .map((ch) => {
        const track = TRACKS.find((t) => t.id === normalizeTrackId(ch.track)) || TRACKS[0];
        const tierMeta = getTierMeta(ch.tier);
        const relatedLessons = (ch.relatedLessonIds || [])
          .map((id) => LESSONS.find((l) => l.id === id))
          .filter(Boolean);

        return `
          <article class="challenge-card" data-challenge-id="${escapeHtml(ch.id)}">
            <div class="challenge-card-top">
              <div class="challenge-card-badges">
                <span class="badge badge-track" style="--track-color:${escapeHtml(track.color)}">${escapeHtml(track.icon)} ${escapeHtml(track.name)}</span>
                <span class="badge badge-difficulty">${escapeHtml(tierMeta.label)}</span>
                ${ch.category ? `<span class="badge">${escapeHtml(ch.category)}</span>` : ''}
              </div>
              <span class="video-card-meta">⏱ ${escapeHtml(String(ch.estimatedMinutes || 25))} 分钟</span>
            </div>

            <h3 class="challenge-card-title">${escapeHtml(ch.title)}</h3>
            <p class="challenge-card-brief">${escapeHtml(ch.brief)}</p>

            ${
              relatedLessons.length > 0
                ? `<div class="challenge-related-tags">
                    <span class="video-card-meta">前置课：</span>
                    ${relatedLessons
                      .map(
                        (l) =>
                          `<button type="button" class="challenge-lesson-chip" data-goto-lesson="${escapeHtml(l.id)}">📖 ${escapeHtml(l.title)}</button>`
                      )
                      .join('')}
                  </div>`
                : ''
            }

            ${
              Array.isArray(ch.criteria) && ch.criteria.length > 0
                ? `<ul class="challenge-criteria-list">
                    ${ch.criteria.map((c) => `<li>${escapeHtml(c)}</li>`).join('')}
                  </ul>`
                : ''
            }

            <div class="challenge-card-actions">
              <button type="button" class="btn btn-primary btn-sm" data-challenge-practice="${escapeHtml(ch.id)}">✍️ 带构图框去画板</button>
              <button type="button" class="btn btn-secondary btn-sm" data-challenge-submit="${escapeHtml(ch.id)}">📤 外部App画完交作业</button>
            </div>
          </article>
        `;
      })
      .join('');
  }

  /* ========================================================================
     Canvas Toolbar, Shortcuts & Backup
     ======================================================================== */

  _bindCanvasToolbar() {
    document.querySelectorAll('.brush-btn[data-brush]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const brush = btn.dataset.brush;
        this.studio?.setBrush(brush);
        this._setActiveBrushButton(brush);
      });
    });

    document.querySelectorAll('.color-swatch[data-color]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        this.studio?.setColor(color);
        this._setActiveColorUI(color);
      });
    });

    const colorPicker = document.getElementById('canvas-color-picker');
    colorPicker?.addEventListener('input', () => {
      const color = colorPicker.value;
      this.studio?.setColor(color);
      this._setActiveColorUI(color);
    });

    const sizeSlider = document.getElementById('brush-size-slider');
    const sizeLabel = document.getElementById('brush-size-label');
    sizeSlider?.addEventListener('input', () => {
      const px = Number(sizeSlider.value);
      this.studio?.setSize(px);
      if (sizeLabel) sizeLabel.textContent = `${px}px`;
    });
    sizeSlider?.addEventListener('change', async () => {
      this.settings = await saveSettings({ brushSize: Number(sizeSlider.value) });
    });

    const stabSlider = document.getElementById('brush-stabilizer-slider');
    const stabLabel = document.getElementById('brush-stabilizer-label');
    stabSlider?.addEventListener('input', () => {
      const lvl = Number(stabSlider.value);
      this.studio?.setStabilizer(lvl);
      if (stabLabel) stabLabel.textContent = String(lvl);
    });
    stabSlider?.addEventListener('change', async () => {
      this.settings = await saveSettings({ stabilizer: Number(stabSlider.value) });
    });

    const curveSelect = document.getElementById('pressure-curve-select');
    curveSelect?.addEventListener('change', async () => {
      const curve = curveSelect.value;
      this.studio?.setPressureCurve(curve);
      this.settings = await saveSettings({ pressureCurve: curve });
    });

    const penOnlyToggle = document.getElementById('toggle-pen-only');
    penOnlyToggle?.addEventListener('change', async () => {
      const enabled = penOnlyToggle.checked;
      this.studio?.setPenOnly(enabled);
      this.settings = await saveSettings({ penOnly: enabled });
      this.showToast(
        enabled ? '已开启“仅触控笔防误触”，手指触控将被忽略。' : '已关闭仅触控笔限制，手指与鼠标均可绘制。',
        'info'
      );
    });

    const tplSelect = document.getElementById('canvas-template-select');
    const opSlider = document.getElementById('template-opacity-slider');
    const opLabel = document.getElementById('template-opacity-label');

    tplSelect?.addEventListener('change', async () => {
      const tplId = tplSelect.value;
      const opacity = Number(opSlider?.value ?? 45);
      this.isRedlineOverlay = false;
      this.redlineContext = null;
      this._setPinboardTemplateState(false);
      const customUrl = tplId ? this.customAssets?.[`template:${tplId}`] : '';
      const tplObj = tplId ? PRACTICE_TEMPLATES.find((t) => t.id === tplId) : null;
      const svgUrl = customUrl || tplObj?.imageUrl || (tplId ? getTemplateSVGDataURL(tplId) : '');
      await this.studio?.loadTemplateSVG(svgUrl, opacity);
    });

    opSlider?.addEventListener('input', () => {
      const val = Number(opSlider.value);
      if (opLabel) opLabel.textContent = `${val}%`;
      this.studio?.setTemplateOpacity(val);
    });

    const gridSelect = document.getElementById('canvas-grid-select');
    gridSelect?.addEventListener('change', () => {
      this.studio?.setGridType(gridSelect.value);
    });

    const redlineBtn = document.getElementById('btn-upload-redline');
    const redlineInput = document.getElementById('upload-redline-input');
    redlineBtn?.addEventListener('click', () => redlineInput?.click());
    redlineInput?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      redlineInput.value = '';
      if (!file) return;
      try {
        const dataUrl = await readFileAsDataUrl(file);
        await this._handleSendToRedline({
          title: file.name.replace(/\.[^.]+$/, ''),
          lessonId: this.activePracticeLessonId || this.currentLessonId || '',
          imageDataUrl: dataUrl,
        });
      } catch (err) {
        this.showToast(err.message || '导入图片失败', 'error');
      }
    });

    document.querySelectorAll('.layer-btn[data-layer]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const layer = btn.dataset.layer;
        this.studio?.setActiveLayer(layer);
        this._setActiveLayerButton(layer);
      });
    });

    document.getElementById('toggle-layer-draft')?.addEventListener('change', (e) => {
      this.studio?.setLayerVisibility('draft', e.target.checked);
    });

    document.getElementById('toggle-layer-ink')?.addEventListener('change', (e) => {
      this.studio?.setLayerVisibility('ink', e.target.checked);
    });

    document.getElementById('btn-flip-horizontal')?.addEventListener('click', () => {
      this._toggleHorizontalFlipUI();
    });

    document.getElementById('btn-canvas-undo')?.addEventListener('click', () => {
      this.studio?.undo();
    });

    document.getElementById('btn-canvas-redo')?.addEventListener('click', () => {
      this.studio?.redo();
    });

    document.getElementById('btn-canvas-clear')?.addEventListener('click', () => {
      this.studio?.clearActiveLayer();
      this.showToast('已清空当前图层（可随时按 Ctrl+Z 或点「撤销」恢复）。', 'info');
    });

    document.getElementById('btn-save-to-journal')?.addEventListener('click', () => {
      if (!this.studio || !this.journal) return;
      const imageDataUrl = this.studio.exportCompositeDataURL(true);
      const challengeCtx = this.activeChallengeContext;
      const lessonId =
        this.redlineContext?.lessonId ||
        challengeCtx?.lessonId ||
        this.activePracticeLessonId ||
        this._inferLessonFromSelectedTemplate() ||
        '';
      const lesson = LESSONS.find((l) => l.id === lessonId);
      const defaultTitle = this.isRedlineOverlay
        ? `红线复盘 · ${this.redlineContext?.title || '结构纠错练习'}`
        : challengeCtx
        ? `🎯 ${challengeCtx.title}`
        : lesson
        ? `${lesson.title} · 压感练习`
        : '自由控笔练习';

      this.journal.openSaveModal({
        imageDataUrl,
        source: this.isRedlineOverlay ? 'redline' : 'web',
        lessonId,
        track: challengeCtx?.track || lesson?.track || 'core',
        challengeId: challengeCtx?.id || '',
        notes: challengeCtx?.brief ? `课题目标：${challengeCtx.brief}` : '',
        defaultTitle,
      });
    });

    document.getElementById('btn-download-png')?.addEventListener('click', () => {
      if (!this.studio) return;
      const url = this.studio.exportCompositeDataURL(true);
      const a = document.createElement('a');
      a.href = url;
      a.download = `DrawPath-${getLocalDateKey(new Date().toISOString()) || 'sketch'}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      this.showToast('已导出 PNG 画作！', 'success');
    });
  }

  _inferLessonFromSelectedTemplate() {
    const tplId = document.getElementById('canvas-template-select')?.value;
    if (!tplId) return '';
    const tpl = PRACTICE_TEMPLATES.find((t) => t.id === tplId);
    return tpl?.lessonId || '';
  }

  _setActiveBrushButton(brush) {
    document.querySelectorAll('.brush-btn[data-brush]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.brush === brush);
    });
  }

  _setActiveColorUI(hex) {
    const lower = String(hex || '').toLowerCase();
    document.querySelectorAll('.color-swatch[data-color]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.color?.toLowerCase() === lower);
    });
    const picker = document.getElementById('canvas-color-picker');
    if (picker && /^#[0-9a-f]{6}$/i.test(lower)) {
      picker.value = lower;
    }
  }

  _setActiveLayerButton(layer) {
    document.querySelectorAll('.layer-btn[data-layer]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.layer === layer);
    });
  }

  _toggleHorizontalFlipUI() {
    if (!this.studio) return;
    const isFlipped = this.studio.toggleFlipHorizontal();
    const flipBtn = document.getElementById('btn-flip-horizontal');
    if (flipBtn) {
      flipBtn.classList.toggle('active', isFlipped);
      flipBtn.setAttribute('aria-pressed', String(isFlipped));
    }
    this.showToast(isFlipped ? '🪞 已水平翻转镜像（检查左右对称与重心）' : '已恢复正向视图', 'info');
  }

  _bind3DStudioAndClipboard() {
    document.getElementById('btn-open-3d-modal')?.addEventListener('click', () => {
      const targetLessonId = this.activePracticeLessonId || this.currentLessonId;
      const lesson = LESSONS.find((l) => l.id === targetLessonId);
      const preset = getDefaultPresetForLesson(lesson);
      this.open3DStudioModal(preset?.id || 'zeraora-kemono');
    });

    document.getElementById('btn-toggle-ref-pinboard')?.addEventListener('click', () => {
      this._toggleRefPinboard();
    });

    document.getElementById('btn-pinboard-close')?.addEventListener('click', () => {
      this._toggleRefPinboard(false);
    });

    document.getElementById('btn-pinboard-size')?.addEventListener('click', () => {
      this.pinboardExpanded = !this.pinboardExpanded;
      const pinboard = document.getElementById('floating-ref-pinboard');
      pinboard?.classList.toggle('expanded', this.pinboardExpanded);
    });

    document.getElementById('btn-pinboard-upload')?.addEventListener('click', () => {
      document.getElementById('pinboard-upload-input')?.click();
    });

    document.getElementById('pinboard-upload-input')?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      e.target.value = '';
      if (!file || !file.type.startsWith('image/')) {
        if (file) this.showToast('请选择 PNG / JPG / WebP 参考图片。', 'warning');
        return;
      }
      try {
        const rawUrl = await readFileAsDataUrl(file);
        const sizedUrl = await resizeImageDataUrl(rawUrl, 1600);
        await this._applyClipboardReferenceImage(sizedUrl);
      } catch (err) {
        this.showToast(err.message || '读取参考图失败', 'error');
      }
    });

    document.getElementById('btn-pinboard-to-template')?.addEventListener('click', async () => {
      if (!this.lastPastedRefDataUrl || !this.studio) {
        this.showToast('请先按 Ctrl+V 粘贴 3D 截图，或点击「📂 换图」载入参考图。', 'warning');
        return;
      }
      if (this.isPinboardAsTemplate) {
        const tplId = document.getElementById('canvas-template-select')?.value || '';
        const opSlider = document.getElementById('template-opacity-slider');
        const opacity = Number(opSlider?.value ?? 45);
        const customUrl = tplId ? this.customAssets?.[`template:${tplId}`] : '';
        const tplObj = tplId ? PRACTICE_TEMPLATES.find((t) => t.id === tplId) : null;
        const svgUrl = customUrl || tplObj?.imageUrl || (tplId ? getTemplateSVGDataURL(tplId) : '');
        await this.studio.loadTemplateSVG(svgUrl, opacity);
        this._setPinboardTemplateState(false);
        this.showToast('📌 已撤掉垫底参考，切回仅悬浮对临模式。', 'info');
      } else {
        const opSlider = document.getElementById('template-opacity-slider');
        const opLabel = document.getElementById('template-opacity-label');
        let opacity = Number(opSlider?.value ?? 45);
        if (opacity <= 0 || opacity === 100) {
          opacity = 45;
          if (opSlider) opSlider.value = '45';
          if (opLabel) opLabel.textContent = '45%';
        }
        await this.studio.loadTemplateSVG(this.lastPastedRefDataUrl, opacity);
        this._setPinboardTemplateState(true);
        this.showToast('📐 已将参考图半透明垫入画布，可直接描红蓝结构线！', 'success');
      }
    });

    document.getElementById('btn-paste-clipboard-ref')?.addEventListener('click', async () => {
      if (!navigator.clipboard?.read) {
        this.showToast('当前环境请直接按 Ctrl+V (Mac 按 Cmd+V) 粘贴刚截取的 3D 图片！', 'info');
        return;
      }
      try {
        const items = await navigator.clipboard.read();
        for (const item of items) {
          const imageType = item.types.find((t) => t.startsWith('image/'));
          if (imageType) {
            const blob = await item.getType(imageType);
            const rawUrl = await readFileAsDataUrl(blob);
            const sizedUrl = await resizeImageDataUrl(rawUrl, 1600);
            await this._applyClipboardReferenceImage(sizedUrl);
            return;
          }
        }
        this.showToast('剪贴板里没有检测到图片；先用 Win+Shift+S 或 iPad 截屏复制再试。', 'warning');
      } catch {
        this.showToast('请直接按键盘 Ctrl+V 粘贴剪贴板图片（或点「📌 悬浮参考窗 → 📂 换图」）。', 'info');
      }
    });

    window.addEventListener('paste', async (e) => {
      const items = Array.from(e.clipboardData?.items || []);
      const imgItem = items.find((item) => item.type.startsWith('image/'));
      if (!imgItem) return;

      if (document.querySelector('#dialog-save-post[open], #dialog-add-video[open], #dialog-compare[open]')) {
        return;
      }

      e.preventDefault();
      document.getElementById('dialog-3d-studio')?.close();
      const file = imgItem.getAsFile();
      if (!file) return;
      try {
        const rawUrl = await readFileAsDataUrl(file);
        const sizedUrl = await resizeImageDataUrl(rawUrl, 1600);
        await this._applyClipboardReferenceImage(sizedUrl);
      } catch (err) {
        this.showToast(err.message || '读取剪贴板图片失败', 'error');
      }
    });

    this._initDraggablePinboard();

    // 3D Studio Modal Controls
    const modal = document.getElementById('dialog-3d-studio');
    if (modal) {
      document.getElementById('pose3d-preset-pills')?.addEventListener('click', async (e) => {
        const btn = e.target.closest('[data-modal-3d-preset]');
        if (!btn) return;
        const presetId = btn.getAttribute('data-modal-3d-preset');
        await this._load3DModalPreset(presetId);
      });

      document.getElementById('pose3d-search-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = document.getElementById('pose3d-search-input')?.value.trim() || '';
        if (!query) return;

        const directUid = parseSketchfabUid(query);
        if (directUid) {
          this.activeModal3DPresetId = '';
          this.activeModal3DUid = directUid;
          this.modal3DCandidates = [];
          this._render3DModalPresetPills();
          this._render3DModalCandidates();
          this._render3DModalIframe(directUid, '自定义 Sketchfab 3D 模型', '可直接拖拽旋转，调好角度后截图 Ctrl+V 贴入画板。');
          return;
        }

        await this._search3DModalByQuery(query);
      });

      document.getElementById('pose3d-results-strip')?.addEventListener('click', (e) => {
        const card = e.target.closest('[data-modal-candidate-uid]');
        if (!card) return;
        const uid = card.getAttribute('data-modal-candidate-uid');
        if (!uid) return;
        this.activeModal3DUid = uid;
        if (this.activeModal3DPresetId) {
          setCachedPresetUid(this.activeModal3DPresetId, uid);
        }
        const match = this.modal3DCandidates.find((c) => c.uid === uid);
        const preset = CURATED_3D_MODELS.find((m) => m.id === this.activeModal3DPresetId);
        this._render3DModalCandidates();
        this._render3DModalIframe(
          uid,
          match?.name || preset?.title || 'Sketchfab 3D 模型',
          preset?.tip || `作者：${match?.author || 'Sketchfab 画师'} · 旋转到合适视角截图 Ctrl+V 即可进画板。`
        );
      });

      document.getElementById('btn-pose3d-dock-split')?.addEventListener('click', async () => {
        const targetLessonId = this.activePracticeLessonId || this.currentLessonId || LESSONS[0]?.id;
        modal.close();
        await this.openLesson(targetLessonId, true, { step: 1 });
        this._setSplitMode(true);
      });

      const extBar = document.getElementById('pose3d-external-sites');
      if (extBar) {
        extBar.innerHTML = EXTERNAL_3D_POSE_SITES.map(
          (site) => `
          <div class="external-3d-site-card">
            <div class="external-3d-site-top">
              <strong>${escapeHtml(site.name)}</strong>
              <span class="badge badge-track">${escapeHtml(site.badge)}</span>
            </div>
            <p>${escapeHtml(site.desc)}</p>
            <button type="button" class="btn btn-sm btn-secondary" data-open-ext-3d="${escapeHtml(site.id)}">🗔 并排伴侣小窗打开</button>
          </div>
        `
        ).join('');

        extBar.addEventListener('click', (e) => {
          const btn = e.target.closest('button[data-open-ext-3d]');
          if (!btn) return;
          const site = EXTERNAL_3D_POSE_SITES.find((s) => s.id === btn.getAttribute('data-open-ext-3d'));
          if (!site) return;
          openCompanion3DWindow(site.url, site.id);
          this.showToast(`🗔 已打开 ${site.name}！摆好姿势后用 Win+Shift+S / 截屏复制，回画板按 Ctrl+V。`, 'info');
        });
      }
    }
  }

  _initDraggablePinboard() {
    const pinboard = document.getElementById('floating-ref-pinboard');
    const header = document.getElementById('floating-ref-pinboard-header');
    const stage = document.getElementById('canvas-stage');
    if (!pinboard || !header || !stage) return;

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let originLeft = 0;
    let originTop = 0;

    header.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button, input, label')) return;
      dragging = true;
      header.setPointerCapture?.(e.pointerId);

      const stageRect = stage.getBoundingClientRect();
      const pinRect = pinboard.getBoundingClientRect();
      originLeft = pinRect.left - stageRect.left;
      originTop = pinRect.top - stageRect.top;
      pinboard.style.left = `${originLeft}px`;
      pinboard.style.top = `${originTop}px`;
      pinboard.style.right = 'auto';

      startX = e.clientX;
      startY = e.clientY;
    });

    header.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const stageRect = stage.getBoundingClientRect();
      const pinRect = pinboard.getBoundingClientRect();
      const maxLeft = Math.max(0, stageRect.width - pinRect.width);
      const maxTop = Math.max(0, stageRect.height - pinRect.height);
      const nextLeft = Math.min(Math.max(0, originLeft + (e.clientX - startX)), maxLeft);
      const nextTop = Math.min(Math.max(0, originTop + (e.clientY - startY)), maxTop);
      pinboard.style.left = `${nextLeft}px`;
      pinboard.style.top = `${nextTop}px`;
    });

    const stopDrag = () => {
      dragging = false;
    };
    header.addEventListener('pointerup', stopDrag);
    header.addEventListener('pointercancel', stopDrag);
  }

  _toggleRefPinboard(forceState) {
    const pinboard = document.getElementById('floating-ref-pinboard');
    const toggleBtn = document.getElementById('btn-toggle-ref-pinboard');
    if (!pinboard) return;

    const nextOpen = typeof forceState === 'boolean' ? forceState : pinboard.hidden;
    pinboard.hidden = !nextOpen;
    if (toggleBtn) {
      toggleBtn.classList.toggle('active', nextOpen);
      toggleBtn.setAttribute('aria-pressed', String(nextOpen));
    }
  }

  _setPinboardTemplateState(asTemplate) {
    this.isPinboardAsTemplate = Boolean(asTemplate);
    const btn = document.getElementById('btn-pinboard-to-template');
    if (btn) {
      btn.textContent = this.isPinboardAsTemplate ? '📌 仅悬浮对临' : '↘ 垫入画布当底图';
      btn.classList.toggle('active', this.isPinboardAsTemplate);
    }
  }

  async _applyClipboardReferenceImage(dataUrl) {
    if (!dataUrl) return;
    this.lastPastedRefDataUrl = dataUrl;

    const img = document.getElementById('pinboard-img');
    const emptyHint = document.getElementById('pinboard-empty-hint');
    if (img) {
      img.src = dataUrl;
      img.hidden = false;
    }
    if (emptyHint) emptyHint.hidden = true;

    this._toggleRefPinboard(true);
    if (this.activeView !== 'canvas' && !this.isSplitMode) {
      this.switchView('canvas');
    }

    const selectedTpl = document.getElementById('canvas-template-select')?.value || '';
    if (!selectedTpl && this.studio) {
      const opSlider = document.getElementById('template-opacity-slider');
      const opLabel = document.getElementById('template-opacity-label');
      let opacity = Number(opSlider?.value ?? 45);
      if (opacity <= 0 || opacity === 100) {
        opacity = 45;
        if (opSlider) opSlider.value = '45';
        if (opLabel) opLabel.textContent = '45%';
      }
      await this.studio.loadTemplateSVG(dataUrl, opacity);
      this._setPinboardTemplateState(true);
      this.showToast('📋 已贴入悬浮参考窗并半透明垫入画布！点「📌 仅悬浮对临」可切换白纸对临。', 'success');
    } else {
      this._setPinboardTemplateState(false);
      this.showToast('📌 已将参考图贴入角落悬浮窗！点「↘ 垫入画布当底图」可叠入底层描红线。', 'success');
    }
  }

  async open3DStudioModal(presetId = 'zeraora-kemono', explicitUid = '') {
    const dialog = document.getElementById('dialog-3d-studio');
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    await this._load3DModalPreset(presetId, explicitUid);
  }

  _render3DModalPresetPills() {
    const wrap = document.getElementById('pose3d-preset-pills');
    if (!wrap) return;
    wrap.innerHTML = CURATED_3D_MODELS.map(
      (m) => `
      <button type="button" class="diagram-variant-btn ${m.id === this.activeModal3DPresetId ? 'active' : ''}" data-modal-3d-preset="${escapeHtml(m.id)}">
        ${escapeHtml(m.title.split('（')[0].split('(')[0].trim())}
      </button>
    `
    ).join('');
  }

  _render3DModalCandidates() {
    const strip = document.getElementById('pose3d-results-strip');
    if (!strip) return;

    if (!Array.isArray(this.modal3DCandidates) || this.modal3DCandidates.length === 0) {
      strip.innerHTML = '';
      strip.hidden = true;
      return;
    }

    strip.hidden = false;
    strip.innerHTML = this.modal3DCandidates
      .map(
        (c) => `
        <button type="button" class="pose3d-thumb-card ${c.uid === this.activeModal3DUid ? 'active' : ''}" data-modal-candidate-uid="${escapeHtml(c.uid)}">
          ${c.thumbUrl ? `<img src="${escapeHtml(c.thumbUrl)}" alt="${escapeHtml(c.name)}">` : '<div class="pose3d-thumb-placeholder">3D</div>'}
          <div class="pose3d-thumb-meta">
            <strong>${escapeHtml(c.name)}</strong>
            <span>by ${escapeHtml(c.author)}${c.isStaffPick ? ' · ⭐ 精选' : ''}</span>
          </div>
        </button>
      `
      )
      .join('');
  }

  _render3DModalIframe(uid, title, tipText) {
    const stage = document.getElementById('pose3d-iframe-stage');
    const tipBanner = document.getElementById('pose3d-tip-banner');
    if (tipBanner) {
      tipBanner.textContent = tipText ? `💡 ${tipText}` : '';
    }
    if (!stage) return;

    const embedUrl = buildSketchfabEmbedUrl(uid);
    if (!embedUrl) {
      stage.innerHTML = '<div class="inline-3d-loading">请选择上方模型或输入 Sketchfab 关键词搜索。</div>';
      return;
    }

    stage.innerHTML = `
      <div class="pose3d-iframe-wrap">
        <iframe
          src="${escapeHtml(embedUrl)}"
          title="${escapeHtml(title || 'Sketchfab 3D Viewer')}"
          loading="lazy"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allowfullscreen
        ></iframe>
      </div>
    `;
  }

  async _load3DModalPreset(presetId, explicitUid = '') {
    const preset = CURATED_3D_MODELS.find((m) => m.id === presetId) || CURATED_3D_MODELS[0];
    if (!preset) return;

    this.activeModal3DPresetId = preset.id;
    const cleanExplicitUid = parseSketchfabUid(explicitUid);
    const cachedResults = this.lesson3DCandidatesCache[preset.id];
    const hasCachedResults = Array.isArray(cachedResults) && cachedResults.length > 0;

    const searchInput = document.getElementById('pose3d-search-input');
    if (searchInput) searchInput.value = preset.searchQuery;

    if (cleanExplicitUid) {
      this.activeModal3DUid = cleanExplicitUid;
      this.modal3DCandidates = hasCachedResults ? cachedResults : [];
      const matched = this.modal3DCandidates.find((c) => c.uid === cleanExplicitUid);
      this._render3DModalPresetPills();
      this._render3DModalCandidates();
      this._render3DModalIframe(cleanExplicitUid, matched?.name || preset.title, preset.tip);
      if (hasCachedResults) {
        this._modal3DSeq = (this._modal3DSeq || 0) + 1;
        return;
      }
    } else if (hasCachedResults) {
      this._modal3DSeq = (this._modal3DSeq || 0) + 1;
      this.modal3DCandidates = cachedResults;
      this.activeModal3DUid = cachedResults[0].uid;
      this._render3DModalPresetPills();
      this._render3DModalCandidates();
      this._render3DModalIframe(
        this.activeModal3DUid,
        cachedResults[0].name || preset.title,
        preset.tip
      );
      return;
    } else {
      this.activeModal3DUid = '';
      this.modal3DCandidates = [];
      this._render3DModalPresetPills();
      this._render3DModalCandidates();
      const stage = document.getElementById('pose3d-iframe-stage');
      if (stage) {
        stage.innerHTML = `<div class="inline-3d-loading">⏳ 正在从 Sketchfab 搜索「${escapeHtml(preset.title)}」…</div>`;
      }
      const tipBanner = document.getElementById('pose3d-tip-banner');
      if (tipBanner) tipBanner.textContent = `💡 ${preset.tip}`;
    }

    // Fetch top 6 Sketchfab results so user gets selectable model strip (e.g. teru_nakabashi's Zeraora + 5 others)
    const reqSeq = (this._modal3DSeq = (this._modal3DSeq || 0) + 1);
    try {
      const results = await searchSketchfabModels(preset.searchQuery, {
        preferredAuthor: preset.preferredAuthor || '',
        limit: 6,
      });
      if (reqSeq !== this._modal3DSeq || this.activeModal3DPresetId !== preset.id) return;

      if (results.length > 0) {
        this.modal3DCandidates = results;
        this.lesson3DCandidatesCache[preset.id] = results;
        if (!cleanExplicitUid) {
          this.activeModal3DUid = results[0].uid;
          setCachedPresetUid(preset.id, results[0].uid);
          this._render3DModalIframe(
            this.activeModal3DUid,
            results[0].name || preset.title,
            preset.tip
          );
        }
        this._render3DModalCandidates();
      } else if (!this.activeModal3DUid) {
        const searchUrl = buildSketchfabSearchPageUrl(preset.searchQuery);
        const stage = document.getElementById('pose3d-iframe-stage');
        if (stage) {
          stage.innerHTML = `
            <div class="inline-3d-fallback">
              <p>未找到可直接嵌入的模型，建议打开 Sketchfab 官方搜索页挑选后截图 Ctrl+V 贴入画板。</p>
              <a class="btn btn-primary btn-sm" href="${escapeHtml(searchUrl)}" target="_blank" rel="noopener noreferrer">🔎 去 Sketchfab 打开「${escapeHtml(preset.searchQuery)}」</a>
            </div>
          `;
        }
      }
    } catch (err) {
      if (reqSeq !== this._modal3DSeq || this.activeModal3DPresetId !== preset.id) return;
      if (!this.activeModal3DUid) {
        const searchUrl = buildSketchfabSearchPageUrl(preset.searchQuery);
        const stage = document.getElementById('pose3d-iframe-stage');
        if (stage) {
          stage.innerHTML = `
            <div class="inline-3d-fallback">
              <p>⚠️ Sketchfab 搜索失败（${escapeHtml(err?.message || '请检查网络')}），可直接点击下方去 Sketchfab 或打开三大外部 3D 站。</p>
              <a class="btn btn-primary btn-sm" href="${escapeHtml(searchUrl)}" target="_blank" rel="noopener noreferrer">🔎 去 Sketchfab 打开「${escapeHtml(preset.searchQuery)}」</a>
            </div>
          `;
        }
      }
    }
  }

  async _search3DModalByQuery(query) {
    this.activeModal3DPresetId = '';
    this.activeModal3DUid = '';
    this.modal3DCandidates = [];
    this._render3DModalPresetPills();
    this._render3DModalCandidates();

    const stage = document.getElementById('pose3d-iframe-stage');
    if (stage) {
      stage.innerHTML = `<div class="inline-3d-loading">⏳ 正在检索 Sketchfab 3D 模型：「${escapeHtml(query)}」…</div>`;
    }

    const reqSeq = (this._modal3DSeq = (this._modal3DSeq || 0) + 1);
    try {
      const results = await searchSketchfabModels(query, { limit: 6 });
      if (reqSeq !== this._modal3DSeq) return;
      this.modal3DCandidates = results;
      this._render3DModalCandidates();
      if (results.length > 0) {
        this.activeModal3DUid = results[0].uid;
        this._render3DModalCandidates();
        this._render3DModalIframe(
          results[0].uid,
          results[0].name,
          `作者：${results[0].author} · 任意旋转角度后用 Win+Shift+S / 截屏复制，回到画板 Ctrl+V 即可开练！`
        );
      } else if (stage) {
        const searchUrl = buildSketchfabSearchPageUrl(query);
        stage.innerHTML = `
          <div class="inline-3d-fallback">
            <p>没有搜索到可嵌入模型，建议打开 Sketchfab 搜索或粘贴具体模型 URL。</p>
            <a class="btn btn-primary btn-sm" href="${escapeHtml(searchUrl)}" target="_blank" rel="noopener noreferrer">🔎 去 Sketchfab 搜索「${escapeHtml(query)}」</a>
          </div>
        `;
      }
    } catch (err) {
      if (reqSeq !== this._modal3DSeq) return;
      if (stage) {
        const searchUrl = buildSketchfabSearchPageUrl(query);
        stage.innerHTML = `
          <div class="inline-3d-fallback">
            <p>⚠️ 搜索失败（${escapeHtml(err?.message || '请检查网络')}）。</p>
            <a class="btn btn-primary btn-sm" href="${escapeHtml(searchUrl)}" target="_blank" rel="noopener noreferrer">🔎 去 Sketchfab 搜索「${escapeHtml(query)}」</a>
          </div>
        `;
      }
    }
  }

  _bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target?.isContentEditable) {
        return;
      }
      if (document.querySelector('dialog[open]')) {
        return;
      }
      if (this.activeView !== 'canvas' && !this.isSplitMode) {
        return;
      }

      const mod = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      if (mod && key === 'z' && !e.shiftKey) {
        e.preventDefault();
        this.studio?.undo();
      } else if ((mod && key === 'y') || (mod && e.shiftKey && key === 'z')) {
        e.preventDefault();
        this.studio?.redo();
      } else if (!mod && !e.altKey && key === 'h') {
        e.preventDefault();
        this._toggleHorizontalFlipUI();
      }
    });
  }

  _bindBackupDialog() {
    document.getElementById('btn-export-json')?.addEventListener('click', async () => {
      try {
        const json = await exportFullBackup();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `DrawPath-Backup-${getLocalDateKey(new Date().toISOString())}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        this.showToast('完整 JSON 备份导出成功！', 'success');
      } catch (err) {
        this.showToast(`导出失败：${err.message || err}`, 'error');
      }
    });

    document.getElementById('btn-import-json')?.addEventListener('click', async () => {
      const fileInput = document.getElementById('input-import-json');
      const file = fileInput?.files?.[0];
      if (!file) {
        this.showToast('请先选择一个 DrawPath Studio JSON 备份文件。', 'warning');
        return;
      }

      try {
        const text = await readFileAsText(file);
        const summary = await importFullBackup(text);

        const [progressMap, customVideos, settings, customAssets] = await Promise.all([
          getProgress(),
          getCustomVideos(),
          getSettings(),
          getCustomLessonAssets(),
        ]);
        this.progressMap = progressMap;
        this.customVideos = customVideos;
        this.settings = settings;
        this.customAssets = customAssets || {};

        if (settings.theme) {
          this._applyTheme(settings.theme);
        }
        this._applySavedCanvasSettings();

        this.renderSkillTree();
        this.renderLessonSidebar();
        this.renderLessonDetail(this.currentLessonId);
        await this.journal?.refresh();
        this.updateStatsUI();

        fileInput.value = '';
        document.getElementById('dialog-backup')?.close();
        this.showToast(
          `备份恢复成功：${summary.postsCount} 篇画帖 · ${summary.progressCount} 课进度 · ${summary.videosCount} 条收藏视频`,
          'success'
        );
      } catch (err) {
        this.showToast(`恢复失败：${err.message || err}`, 'error');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new DrawPathApp();
  app.init().catch((err) => {
    console.error('[DrawPath] Initialization error:', err);
  });
});
