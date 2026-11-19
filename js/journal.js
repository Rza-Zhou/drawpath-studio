/**
 * DrawPath Studio · 画路工坊
 * Progress Sketchbook Gallery, External Image Upload, Redline Bridge & Before/After Comparator.
 */

import { getAllPosts, savePost, deletePost } from './storage-db.js';
import { TRACKS, LESSONS, normalizeTrackId } from './curriculum-data.js';

const SOURCE_META = {
  web: { label: '网页压感练习', badgeClass: 'badge-web' },
  external: { label: '外部App打卡', badgeClass: 'badge-external' },
  redline: { label: '红线复盘', badgeClass: 'badge-redline' },
};

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(isoString) {
  if (!isoString) return '未知日期';
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return '未知日期';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatStars(rating) {
  const n = Math.min(5, Math.max(1, Number(rating) || 3));
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function drawRoundedRectPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error('Empty image source'));
      return;
    }
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}

function readImageFileAsDataUrl(file, maxDimension = 1600) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('请选择有效的图片文件（PNG / JPG / WebP）。'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('读取图片文件失败。'));
    reader.onload = async () => {
      const rawUrl = String(reader.result || '');
      try {
        const img = await loadImageElement(rawUrl);
        const longest = Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height);
        if (longest <= maxDimension) {
          resolve(rawUrl);
          return;
        }
        const scale = maxDimension / longest;
        const targetW = Math.round((img.naturalWidth || img.width) * scale);
        const targetH = Math.round((img.naturalHeight || img.height) * scale);
        const off = document.createElement('canvas');
        off.width = targetW;
        off.height = targetH;
        const ctx = off.getContext('2d');
        ctx.drawImage(img, 0, 0, targetW, targetH);
        resolve(off.toDataURL('image/png'));
      } catch {
        resolve(rawUrl);
      }
    };
    reader.readAsDataURL(file);
  });
}

function drawTruncatedText(ctx, text, x, y, maxWidth) {
  const str = String(text || '');
  if (ctx.measureText(str).width <= maxWidth) {
    ctx.fillText(str, x, y);
    return;
  }
  let clipped = str;
  while (clipped.length > 1 && ctx.measureText(`${clipped}…`).width > maxWidth) {
    clipped = clipped.slice(0, -1);
  }
  ctx.fillText(`${clipped}…`, x, y);
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 2) {
  const chars = Array.from(String(text || '').replace(/\s+/g, ' ').trim());
  if (chars.length === 0) return;

  let line = '';
  let lineCount = 0;

  for (let i = 0; i < chars.length; i++) {
    const testLine = line + chars[i];
    if (ctx.measureText(testLine).width > maxWidth && line.length > 0) {
      lineCount += 1;
      if (lineCount >= maxLines) {
        drawTruncatedText(ctx, `${line}${chars.slice(i).join('')}`, x, y, maxWidth);
        return;
      }
      ctx.fillText(line, x, y);
      line = chars[i];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, y);
  }
}

export class JournalManager {
  constructor({ onSendToRedline, onPostsChanged, onNotify } = {}) {
    this.onSendToRedline = onSendToRedline || null;
    this.onPostsChanged = onPostsChanged || null;
    this.onNotify = onNotify || null;

    this.posts = [];
    this._pendingImageDataUrl = '';
    this._pendingTrack = '';
    this._pendingChallengeId = '';
    this._compareRenderSeq = 0;
    this._confirmDeleteId = null;
    this._confirmDeleteTimer = null;
    this._externalFileInput = null;
    this._uploadHintEl = null;

    this._els = {};
  }

  async init() {
    this._cacheElements();
    this._populateLessonSelect();
    this._ensureUploadDropSupport();
    this._bindEvents();
    await this.refresh();
  }

  _cacheElements() {
    this._els = {
      btnNewExternal: document.getElementById('btn-new-external-post'),
      btnOpenCompare: document.getElementById('btn-open-compare'),
      filterTrack: document.getElementById('journal-filter-track'),
      filterSource: document.getElementById('journal-filter-source'),
      searchInput: document.getElementById('journal-search-input'),
      galleryGrid: document.getElementById('journal-gallery-grid'),

      dialogSavePost: document.getElementById('dialog-save-post'),
      savePostForm: document.getElementById('save-post-form'),
      postPreviewImg: document.getElementById('post-preview-img'),
      postTitleInput: document.getElementById('post-title-input'),
      postLessonSelect: document.getElementById('post-lesson-select'),
      postSourceSelect: document.getElementById('post-source-select'),
      postDurationInput: document.getElementById('post-duration-input'),
      postRatingSelect: document.getElementById('post-rating-select'),
      postNotesInput: document.getElementById('post-notes-input'),
      btnSendUploadToRedline: document.getElementById('btn-send-upload-to-redline'),
      btnConfirmSavePost: document.getElementById('btn-confirm-save-post'),

      dialogCompare: document.getElementById('dialog-compare'),
      compareSelectBefore: document.getElementById('compare-select-before'),
      compareSelectAfter: document.getElementById('compare-select-after'),
      compareCanvas: document.getElementById('compare-export-canvas'),
      btnDownloadCompare: document.getElementById('btn-download-compare-card'),
    };
  }

  _notify(message, tone = 'info') {
    if (typeof this.onNotify === 'function') {
      this.onNotify(message, tone);
    }
  }

  _getTrackMeta(trackId) {
    const normalized = typeof normalizeTrackId === 'function' ? normalizeTrackId(trackId) : trackId;
    return TRACKS.find((t) => t.id === normalized) || TRACKS[0] || { id: 'core', name: '通用基本功', icon: '🧱', color: '#6366f1' };
  }

  _getLessonMeta(lessonId) {
    return LESSONS.find((l) => l.id === lessonId) || null;
  }

  _populateLessonSelect() {
    const select = this._els.postLessonSelect;
    if (!select) return;

    const currentVal = select.value;
    select.innerHTML = '';

    const freeOpt = document.createElement('option');
    freeOpt.value = '';
    freeOpt.textContent = '自由练习 / 不关联特定课程';
    select.appendChild(freeOpt);

    for (const track of TRACKS) {
      const group = document.createElement('optgroup');
      group.label = `${track.icon} ${track.name}`;
      const trackLessons = LESSONS.filter((l) => l.track === track.id).sort((a, b) => a.order - b.order);
      for (const lesson of trackLessons) {
        const opt = document.createElement('option');
        opt.value = lesson.id;
        opt.textContent = `${lesson.order}. ${lesson.title}`;
        group.appendChild(opt);
      }
      select.appendChild(group);
    }

    if (currentVal) {
      select.value = currentVal;
    }
  }

  _ensureUploadDropSupport() {
    if (!this._externalFileInput) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.hidden = true;
      input.id = 'journal-external-upload-input';
      input.addEventListener('change', async (e) => {
        const file = e.target.files?.[0];
        input.value = '';
        if (!file) return;
        await this._handleExternalImageFile(file);
      });
      document.body.appendChild(input);
      this._externalFileInput = input;
    }

    const previewImg = this._els.postPreviewImg;
    const dialog = this._els.dialogSavePost;
    if (!previewImg || !dialog) return;

    const previewContainer = previewImg.parentElement;
    if (previewContainer && !this._uploadHintEl) {
      const hintBar = document.createElement('div');
      hintBar.className = 'upload-drop-helper';
      hintBar.style.cssText =
        'display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px;padding:8px 12px;border:1px dashed var(--border-color, #94a3b8);border-radius:10px;font-size:0.85rem;cursor:pointer;';
      hintBar.innerHTML =
        '<span>📁 支持点击选择或直接拖拽 Procreate / CSP / 本地图片到弹窗内</span><button type="button" class="btn btn-sm">选择图片</button>';
      hintBar.addEventListener('click', () => {
        this._externalFileInput?.click();
      });
      previewContainer.appendChild(hintBar);
      this._uploadHintEl = hintBar;
    }

    // Drag & drop inside #dialog-save-post
    const formTarget = this._els.savePostForm || dialog;
    formTarget.addEventListener('dragover', (e) => {
      e.preventDefault();
      formTarget.classList.add('drag-over');
    });
    formTarget.addEventListener('dragleave', () => {
      formTarget.classList.remove('drag-over');
    });
    formTarget.addEventListener('drop', async (e) => {
      e.preventDefault();
      formTarget.classList.remove('drag-over');
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith('image/')) {
        await this._handleExternalImageFile(file);
      }
    });
  }

  async _handleExternalImageFile(file) {
    try {
      const dataUrl = await readImageFileAsDataUrl(file);
      this._setPendingPreviewImage(dataUrl);
      if (this._els.postTitleInput && !this._els.postTitleInput.value.trim()) {
        const cleanName = file.name.replace(/\.[^.]+$/, '').slice(0, 40);
        this._els.postTitleInput.value = cleanName ? `外部打卡 · ${cleanName}` : '外部App练习打卡';
      }
      this._notify('已载入外部图片，可直接保存或点击“红线批注”。', 'success');
    } catch (err) {
      this._notify(err.message || '图片读取失败，请重试。', 'error');
    }
  }

  _setPendingPreviewImage(dataUrl) {
    this._pendingImageDataUrl = dataUrl || '';
    const img = this._els.postPreviewImg;
    if (img) {
      if (this._pendingImageDataUrl) {
        img.src = this._pendingImageDataUrl;
        img.hidden = false;
        img.style.display = '';
      } else {
        img.removeAttribute('src');
        img.hidden = true;
      }
    }
    if (this._els.btnSendUploadToRedline) {
      this._els.btnSendUploadToRedline.disabled = !this._pendingImageDataUrl;
    }
  }

  _bindEvents() {
    this._els.filterTrack?.addEventListener('change', () => this.renderGallery());
    this._els.filterSource?.addEventListener('change', () => this.renderGallery());
    this._els.searchInput?.addEventListener('input', () => this.renderGallery());

    this._els.btnNewExternal?.addEventListener('click', () => {
      this.openExternalUploadModal({
        title: `外部App练习打卡 · ${formatDate(new Date().toISOString())}`,
      });
    });

    this._els.btnOpenCompare?.addEventListener('click', () => {
      this.openCompareModal();
    });

    this._els.savePostForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this._handleSaveFormSubmit();
    });

    this._els.btnSendUploadToRedline?.addEventListener('click', () => {
      if (!this._pendingImageDataUrl) {
        this._notify('请先选择或拖入一张作品图片，再送往红线画板！', 'warning');
        this._externalFileInput?.click();
        return;
      }
      const lessonId = this._els.postLessonSelect?.value || '';
      const lesson = this._getLessonMeta(lessonId);
      const payload = {
        id: null,
        title: this._els.postTitleInput?.value.trim() || '外部作品红线复盘',
        lessonId,
        track: lesson?.track || 'core',
        imageDataUrl: this._pendingImageDataUrl,
      };
      this._els.dialogSavePost?.close();
      this.onSendToRedline?.(payload);
    });

    // Event delegation on gallery cards
    this._els.galleryGrid?.addEventListener('click', async (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const postId = btn.dataset.postId;
      const post = this.posts.find((p) => p.id === postId);
      if (!post) return;

      if (action === 'redline') {
        this.onSendToRedline?.(post);
      } else if (action === 'compare') {
        this.openCompareModal(post.id);
      } else if (action === 'delete') {
        await this._handleDeletePostClick(post.id, btn);
      }
    });

    // Compare dialog listeners
    this._els.compareSelectBefore?.addEventListener('change', () => this._renderComparisonCard());
    this._els.compareSelectAfter?.addEventListener('change', () => this._renderComparisonCard());
    this._els.btnDownloadCompare?.addEventListener('click', () => this._downloadComparisonCard());
  }

  async _handleDeletePostClick(postId, btnEl) {
    if (this._confirmDeleteId !== postId) {
      this._confirmDeleteId = postId;
      if (this._confirmDeleteTimer) clearTimeout(this._confirmDeleteTimer);
      btnEl.textContent = '⚠ 确认删除?';
      btnEl.classList.add('is-confirming');
      this._confirmDeleteTimer = setTimeout(() => {
        if (this._confirmDeleteId === postId) {
          this._confirmDeleteId = null;
          this.renderGallery();
        }
      }, 3500);
      return;
    }

    if (this._confirmDeleteTimer) clearTimeout(this._confirmDeleteTimer);
    this._confirmDeleteId = null;
    await deletePost(postId);
    this._notify('已删除该条练习记录。', 'info');
    await this.refresh();
  }

  openExternalUploadModal({ title = '', lessonId = '', track = '', notes = '', challengeId = '' } = {}) {
    this.openSaveModal({
      imageDataUrl: '',
      source: 'external',
      lessonId,
      defaultTitle: title || `外部App练习打卡 · ${formatDate(new Date().toISOString())}`,
      track,
      notes,
      challengeId,
    });
    this._externalFileInput?.click();
  }

  openSaveModal({
    imageDataUrl = '',
    source = 'web',
    lessonId = '',
    defaultTitle = '',
    title = '',
    track = '',
    notes = '',
    challengeId = '',
  } = {}) {
    const dialog = this._els.dialogSavePost;
    if (!dialog) return;

    this._populateLessonSelect();
    this._setPendingPreviewImage(imageDataUrl);
    this._pendingTrack = track ? normalizeTrackId(track) : '';
    this._pendingChallengeId = String(challengeId || '');

    const resolvedTitle = title || defaultTitle || `绘画练习 · ${formatDate(new Date().toISOString())}`;
    if (this._els.postTitleInput) {
      this._els.postTitleInput.value = resolvedTitle;
    }
    if (this._els.postLessonSelect) {
      this._els.postLessonSelect.value = lessonId && LESSONS.some((l) => l.id === lessonId) ? lessonId : '';
    }
    if (this._els.postSourceSelect) {
      this._els.postSourceSelect.value = ['web', 'external', 'redline'].includes(source) ? source : 'web';
    }
    if (this._els.postDurationInput) {
      this._els.postDurationInput.value = '20';
    }
    if (this._els.postRatingSelect) {
      this._els.postRatingSelect.value = '4';
    }
    if (this._els.postNotesInput) {
      this._els.postNotesInput.value = notes || '';
    }

    if (this._uploadHintEl) {
      this._uploadHintEl.style.display = source === 'external' || !imageDataUrl ? 'flex' : 'none';
    }

    if (!dialog.open) {
      dialog.showModal();
    }
  }

  async _handleSaveFormSubmit() {
    if (!this._pendingImageDataUrl) {
      this._notify('请先选择或绘制一幅作品图片再保存！', 'warning');
      this._externalFileInput?.click();
      return;
    }

    const lessonId = this._els.postLessonSelect?.value || '';
    const lesson = this._getLessonMeta(lessonId);
    const track = normalizeTrackId(lesson?.track || this._pendingTrack || 'core');

    const postPayload = {
      title: this._els.postTitleInput?.value.trim() || '未命名练习作品',
      lessonId,
      track,
      challengeId: this._pendingChallengeId || '',
      source: this._els.postSourceSelect?.value || 'web',
      durationMinutes: Number(this._els.postDurationInput?.value) || 20,
      rating: Number(this._els.postRatingSelect?.value) || 4,
      notes: this._els.postNotesInput?.value.trim() || '',
      imageDataUrl: this._pendingImageDataUrl,
    };

    const btn = this._els.btnConfirmSavePost;
    if (btn) btn.disabled = true;

    try {
      await savePost(postPayload);
      this._els.dialogSavePost?.close();
      this._setPendingPreviewImage('');
      this._pendingTrack = '';
      this._pendingChallengeId = '';
      this._notify('作品已存入本地进步画帖！', 'success');
      await this.refresh();
    } catch (err) {
      this._notify(`保存失败：${err.message || err}`, 'error');
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  async refresh() {
    this.posts = await getAllPosts();
    this.renderGallery();
    this.onPostsChanged?.(this.posts);
    if (this._els.dialogCompare?.open) {
      this._populateCompareSelects();
      await this._renderComparisonCard();
    }
  }

  getPosts() {
    return this.posts;
  }

  renderGallery() {
    const grid = this._els.galleryGrid;
    if (!grid) return;

    const trackFilter = this._els.filterTrack?.value || 'all';
    const sourceFilter = this._els.filterSource?.value || 'all';
    const keyword = (this._els.searchInput?.value || '').trim().toLowerCase();

    const filtered = this.posts.filter((post) => {
      const normalizedPostTrack = normalizeTrackId(post.track);
      if (trackFilter !== 'all' && normalizedPostTrack !== normalizeTrackId(trackFilter)) return false;
      if (sourceFilter !== 'all' && post.source !== sourceFilter) return false;
      if (keyword) {
        const lesson = this._getLessonMeta(post.lessonId);
        const track = this._getTrackMeta(post.track);
        const haystack = [post.title, post.notes, lesson?.title, track?.name]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(keyword)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="journal-empty-state">
          <p class="empty-title">📒 暂无符合条件的练习画帖</p>
          <p class="empty-desc">去“压感练习 & 红线画板”画一张，或点击右上角“上传外部App作品打卡”记录今天的进步吧！</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered
      .map((post) => {
        const track = this._getTrackMeta(post.track);
        const lesson = this._getLessonMeta(post.lessonId);
        const sourceMeta = SOURCE_META[post.source] || SOURCE_META.web;
        const duration = post.durationMinutes ?? post.duration ?? 20;
        const lessonLabel = lesson ? `${track.icon} ${lesson.title}` : `${track.icon} ${track.name}`;

        return `
          <article class="journal-card" data-post-id="${escapeHtml(post.id)}">
            <div class="journal-thumb-wrap">
              <img class="journal-thumb" src="${escapeHtml(post.imageDataUrl)}" alt="${escapeHtml(post.title)}" loading="lazy">
              <span class="badge ${escapeHtml(sourceMeta.badgeClass)} journal-source-tag">${escapeHtml(sourceMeta.label)}</span>
            </div>
            <div class="journal-card-body">
              <div class="journal-meta-row">
                <span class="badge journal-track-badge" style="--track-color: ${escapeHtml(track.color)}">${escapeHtml(lessonLabel)}</span>
                ${post.challengeId ? '<span class="badge badge-track">🎯 实战课题</span>' : ''}
                <time class="journal-date" datetime="${escapeHtml(post.createdAt)}">${escapeHtml(formatDate(post.createdAt))}</time>
              </div>
              <h3 class="journal-card-title">${escapeHtml(post.title)}</h3>
              <div class="journal-stats-row">
                <span class="journal-duration">⏱ ${escapeHtml(String(duration))} 分钟</span>
                <span class="journal-rating" aria-label="评分 ${escapeHtml(String(post.rating))} 星">${formatStars(post.rating)}</span>
              </div>
              ${post.notes ? `<p class="journal-card-notes">${escapeHtml(post.notes)}</p>` : ''}
              <div class="journal-card-actions">
                <button type="button" class="btn btn-sm" data-action="redline" data-post-id="${escapeHtml(post.id)}">✍️ 红线批注</button>
                <button type="button" class="btn btn-sm" data-action="compare" data-post-id="${escapeHtml(post.id)}">⚖️ 选为对比</button>
                <button type="button" class="btn btn-sm btn-danger-subtle" data-action="delete" data-post-id="${escapeHtml(post.id)}">🗑 删除</button>
              </div>
            </div>
          </article>
        `;
      })
      .join('');
  }

  async openCompareModal(focusPostId = null) {
    const dialog = this._els.dialogCompare;
    if (!dialog) return;

    if (this.posts.length === 0) {
      this._notify('画帖中还没有作品记录，先保存几张练习再做对比吧！', 'warning');
      return;
    }

    this._populateCompareSelects(focusPostId);
    if (!dialog.open) {
      dialog.showModal();
    }
    await this._renderComparisonCard();
  }

  _populateCompareSelects(focusPostId = null) {
    const beforeSel = this._els.compareSelectBefore;
    const afterSel = this._els.compareSelectAfter;
    if (!beforeSel || !afterSel) return;

    // Sort oldest -> newest for intuitive Before / After selection
    const chronological = [...this.posts].sort(
      (a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
    );

    const buildOptions = (selectEl) => {
      selectEl.innerHTML = '';
      for (const post of chronological) {
        const opt = document.createElement('option');
        opt.value = post.id;
        opt.textContent = `[${formatDate(post.createdAt)}] ${post.title}`;
        selectEl.appendChild(opt);
      }
    };

    buildOptions(beforeSel);
    buildOptions(afterSel);

    if (chronological.length === 1) {
      beforeSel.value = chronological[0].id;
      afterSel.value = chronological[0].id;
      return;
    }

    const oldest = chronological[0];
    const newest = chronological[chronological.length - 1];

    if (focusPostId && chronological.some((p) => p.id === focusPostId)) {
      if (focusPostId === newest.id) {
        beforeSel.value = oldest.id;
        afterSel.value = newest.id;
      } else {
        beforeSel.value = focusPostId;
        afterSel.value = newest.id;
      }
    } else {
      beforeSel.value = oldest.id;
      afterSel.value = newest.id;
    }
  }

  async _renderComparisonCard() {
    const canvas = this._els.compareCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width; // 1400
    const H = canvas.height; // 820

    const renderSeq = ++this._compareRenderSeq;
    const beforePost = this.posts.find((p) => p.id === this._els.compareSelectBefore?.value) || this.posts[this.posts.length - 1];
    const afterPost = this.posts.find((p) => p.id === this._els.compareSelectAfter?.value) || this.posts[0];

    if (!beforePost || !afterPost) return;

    // Preload both images concurrently
    const [beforeImg, afterImg] = await Promise.all([
      loadImageElement(beforePost.imageDataUrl).catch(() => null),
      loadImageElement(afterPost.imageDataUrl).catch(() => null),
    ]);

    if (renderSeq !== this._compareRenderSeq) return;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Subtle decorative glow
    ctx.fillStyle = 'rgba(99, 102, 241, 0.12)';
    ctx.beginPath();
    ctx.arc(180, 90, 220, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(16, 185, 129, 0.10)';
    ctx.beginPath();
    ctx.arc(1240, 740, 240, 0, Math.PI * 2);
    ctx.fill();

    // Header
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 30px system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('DrawPath Studio · 绘画进步对比卡', 44, 58);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('用结构与记录见证每一天的进步 · Before vs After', 44, 90);

    // Elapsed days pill
    const tBefore = new Date(beforePost.createdAt || 0).getTime();
    const tAfter = new Date(afterPost.createdAt || 0).getTime();
    const daysDiff = Math.abs(Math.round((tAfter - tBefore) / (1000 * 60 * 60 * 24)));
    const elapsedLabel = daysDiff === 0 ? '同日对照 · 前后细节对比' : `间隔 ${daysDiff} 天 · 持续练习成果`;

    ctx.font = 'bold 17px system-ui, -apple-system, sans-serif';
    const pillWidth = ctx.measureText(elapsedLabel).width + 44;
    const pillX = W - 44 - pillWidth;
    drawRoundedRectPath(ctx, pillX, 32, pillWidth, 44, 22);
    ctx.fillStyle = 'rgba(99, 102, 241, 0.24)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(129, 140, 248, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#e0e7ff';
    ctx.fillText(elapsedLabel, pillX + 22, 60);

    // Draw side-by-side panels
    const drawSidePanel = (x, label, accentColor, pillBg, post, img) => {
      const cardW = 632;
      const cardH = 626;
      const cardY = 122;

      drawRoundedRectPath(ctx, x, cardY, cardW, cardH, 20);
      ctx.fillStyle = '#162033';
      ctx.fill();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Badge header
      drawRoundedRectPath(ctx, x + 22, cardY + 20, 152, 32, 16);
      ctx.fillStyle = pillBg;
      ctx.fill();
      ctx.fillStyle = accentColor;
      ctx.font = 'bold 15px system-ui, sans-serif';
      ctx.fillText(label, x + 38, cardY + 41);

      // Date & rating
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '15px system-ui, sans-serif';
      const dateStr = formatDate(post.createdAt);
      const stars = formatStars(post.rating);
      const rightMeta = `${dateStr}   ${stars}`;
      const metaW = ctx.measureText(rightMeta).width;
      ctx.fillText(rightMeta, x + cardW - 22 - metaW, cardY + 41);

      // Artwork frame (white paper container)
      const frameX = x + 22;
      const frameY = cardY + 66;
      const frameW = cardW - 44;
      const frameH = 420;
      drawRoundedRectPath(ctx, frameX, frameY, frameW, frameH, 14);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      if (img) {
        ctx.save();
        drawRoundedRectPath(ctx, frameX, frameY, frameW, frameH, 14);
        ctx.clip();

        const pad = 12;
        const availW = frameW - pad * 2;
        const availH = frameH - pad * 2;
        const iw = img.naturalWidth || img.width || 800;
        const ih = img.naturalHeight || img.height || 600;
        const scale = Math.min(availW / iw, availH / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = frameX + (frameW - dw) / 2;
        const dy = frameY + (frameH - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
        ctx.restore();
      } else {
        ctx.fillStyle = '#64748b';
        ctx.font = '16px system-ui, sans-serif';
        ctx.fillText('图片加载失败', frameX + frameW / 2 - 48, frameY + frameH / 2);
      }

      // Lesson badge + source
      const track = this._getTrackMeta(post.track);
      const lesson = this._getLessonMeta(post.lessonId);
      const sourceLabel = (SOURCE_META[post.source] || SOURCE_META.web).label;
      const badgeText = `${track.name}${lesson ? ` · ${lesson.title}` : ''} · ${sourceLabel}`;

      ctx.fillStyle = '#93c5fd';
      ctx.font = 'bold 14px system-ui, sans-serif';
      drawTruncatedText(ctx, badgeText, x + 24, cardY + 516, cardW - 48);

      // Title
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 21px system-ui, -apple-system, sans-serif';
      drawTruncatedText(ctx, post.title, x + 24, cardY + 548, cardW - 48);

      // Notes
      ctx.fillStyle = '#94a3b8';
      ctx.font = '15px system-ui, -apple-system, sans-serif';
      drawWrappedText(ctx, post.notes || '保持练习节奏，专注结构与线条质量！', x + 24, cardY + 578, cardW - 48, 22, 2);
    };

    drawSidePanel(44, 'BEFORE · 初期', '#fbbf24', 'rgba(245, 158, 11, 0.18)', beforePost, beforeImg);
    drawSidePanel(724, 'AFTER · 进阶', '#34d399', 'rgba(16, 185, 129, 0.18)', afterPost, afterImg);

    // Center arrow medallion
    ctx.beginPath();
    ctx.arc(W / 2, 400, 24, 0, Math.PI * 2);
    ctx.fillStyle = '#6366f1';
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.fillText('➜', W / 2 - 11, 408);

    // Bottom Watermark Footer
    ctx.fillStyle = '#64748b';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText('DrawPath Studio · 画路工坊（纯本地零上传 · IndexedDB 离线守护）', 44, 788);

    const stamp = `生成日期 ${formatDate(new Date().toISOString())}`;
    const stampW = ctx.measureText(stamp).width;
    ctx.fillText(stamp, W - 44 - stampW, 788);
  }

  _downloadComparisonCard() {
    const canvas = this._els.compareCanvas;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `DrawPath-对比卡-${formatDate(new Date().toISOString())}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    this._notify('已导出高清进步对比卡 PNG！', 'success');
  }
}
