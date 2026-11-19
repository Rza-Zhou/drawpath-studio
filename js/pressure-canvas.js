/**
 * PressureCanvasStudio
 * iPad Apple Pencil & PC Drawing Tablet pressure-sensitive Canvas 2D engine.
 * Supports high-frequency coalesced pointer events, palm rejection, EMA stroke
 * stabilization, horizontal mirror coordinate correction, 5 distinct brushes,
 * template/external redline underlays, geometric grids, and cross-layer undo/redo.
 */

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 900;
const MAX_HISTORY_STEPS = 30;
const GRAIN_SIZE = 64;

const BRUSH_TYPES = new Set(['pencil', 'gpen', 'redline', 'marker', 'eraser']);
const LAYER_TYPES = new Set(['draft', 'ink']);
const VISIBILITY_LAYERS = new Set(['template', 'draft', 'ink']);
const GRID_TYPES = new Set(['none', 'grid', 'perspective', 'crosshair']);

const PRESSURE_CURVES = {
  soft: (p) => Math.pow(p, 0.65),
  normal: (p) => p,
  hard: (p) => Math.pow(p, 1.45),
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createOffscreenCanvas(width, height, willReadFrequently = false) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', willReadFrequently ? { willReadFrequently: true } : undefined);
  return { canvas, ctx };
}

/**
 * Generates a deterministic cold-press paper-tooth alpha mask for graphite pencil texture.
 */
function buildGrainMask(size) {
  const mask = new Uint8ClampedArray(size * size);
  let seed = 0x5f3759df;
  for (let i = 0; i < mask.length; i += 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const fine = (seed >>> 24) / 255;
    // Softly bias tooth between 0.42 and 1.0 for organic graphite texture.
    mask[i] = Math.round((0.42 + fine * 0.58) * 255);
  }
  return mask;
}

function isImageDataNonEmpty(imageData) {
  const pixels = new Uint32Array(imageData.data.buffer);
  for (let i = 0; i < pixels.length; i += 1) {
    if (pixels[i] !== 0) return true;
  }
  return false;
}

export class PressureCanvasStudio {
  /**
   * @param {Object} options
   * @param {HTMLElement} [options.stageEl]
   * @param {HTMLElement} [options.wrapperEl]
   * @param {HTMLCanvasElement} options.templateCanvas
   * @param {HTMLCanvasElement} options.draftCanvas
   * @param {HTMLCanvasElement} options.inkCanvas
   * @param {HTMLCanvasElement} options.cursorCanvas
   * @param {Function} [options.onTelemetry]
   * @param {Function} [options.onHistoryChange]
   */
  constructor(options = {}) {
    const {
      stageEl = null,
      wrapperEl = null,
      templateCanvas,
      draftCanvas,
      inkCanvas,
      cursorCanvas,
      onTelemetry = null,
      onHistoryChange = null,
    } = options;

    if (!templateCanvas || !draftCanvas || !inkCanvas || !cursorCanvas) {
      throw new Error('PressureCanvasStudio requires templateCanvas, draftCanvas, inkCanvas, and cursorCanvas.');
    }

    this.stageEl = stageEl;
    this.wrapperEl = wrapperEl;
    this.templateCanvas = templateCanvas;
    this.draftCanvas = draftCanvas;
    this.inkCanvas = inkCanvas;
    this.cursorCanvas = cursorCanvas;
    this.onTelemetry = typeof onTelemetry === 'function' ? onTelemetry : null;
    this.onHistoryChange = typeof onHistoryChange === 'function' ? onHistoryChange : null;

    this.width = cursorCanvas.width || inkCanvas.width || draftCanvas.width || DEFAULT_WIDTH;
    this.height = cursorCanvas.height || inkCanvas.height || draftCanvas.height || DEFAULT_HEIGHT;

    this.templateCtx = this.templateCanvas.getContext('2d');
    this.draftCtx = this.draftCanvas.getContext('2d', { willReadFrequently: true });
    this.inkCtx = this.inkCanvas.getContext('2d', { willReadFrequently: true });
    this.cursorCtx = this.cursorCanvas.getContext('2d');

    // Offscreen stroke buffer prevents alpha-compounding seams on translucent brushes.
    const strokeBuf = createOffscreenCanvas(this.width, this.height);
    this._strokeCanvas = strokeBuf.canvas;
    this._strokeCtx = strokeBuf.ctx;

    // Graphite texture resources for the pencil brush.
    this._grainMask = buildGrainMask(GRAIN_SIZE);
    const grainBuf = createOffscreenCanvas(GRAIN_SIZE, GRAIN_SIZE);
    this._grainCanvas = grainBuf.canvas;
    this._grainCtx = grainBuf.ctx;
    const colorProbe = createOffscreenCanvas(1, 1, true);
    this._colorProbeCtx = colorProbe.ctx;
    this._pencilPattern = null;
    this._pencilPatternColor = null;

    // Brush & studio configuration.
    this.brush = 'pencil';
    this.color = '#1e293b';
    this.size = 8;
    this.stabilizer = 3;
    this.pressureCurve = 'normal';
    this.isPenOnly = false;
    this.activeLayer = 'draft';
    this.isFlipped = false;

    this.layerVisibility = {
      template: true,
      draft: true,
      ink: true,
    };

    // Template & grid state.
    this._bgImage = null;
    this._templateOpacity = 45;
    this._gridType = 'none';
    this._templateLoadToken = 0;

    // Cross-layer undo/redo history (up to MAX_HISTORY_STEPS).
    this._undoStack = [];
    this._redoStack = [];

    // Active pointer & stroke runtime state.
    this._resetStrokeState();
    this._lastTelemetryAt = 0;
    this._lastTelemetryDevice = 'ready';

    this.cursorCanvas.style.touchAction = 'none';
    this._bindEvents();
    this._renderTemplateLayer();

    // Defer initial callbacks so caller finishes assigning the instance reference first.
    queueMicrotask(() => {
      this._emitHistoryChange();
      this._emitTelemetry({ pointerType: 'ready', pressure: 0, tiltX: 0, tiltY: 0 });
    });
  }

  /** Sets active brush: 'pencil' | 'gpen' | 'redline' | 'marker' | 'eraser'. */
  setBrush(brushType) {
    if (BRUSH_TYPES.has(brushType)) {
      this.brush = brushType;
    }
  }

  /** Sets active stroke color as CSS hex/color string. */
  setColor(hex) {
    if (typeof hex === 'string' && hex.trim()) {
      this.color = hex.trim();
      this._pencilPattern = null;
    }
  }

  /** Sets base brush diameter in canvas pixels (1..120). */
  setSize(px) {
    const num = Number(px);
    if (Number.isFinite(num)) {
      this.size = clamp(num, 1, 120);
    }
  }

  /** Sets EMA stabilizer strength (0 = raw, 10 = strongest smoothing). */
  setStabilizer(level) {
    const num = Number(level);
    if (Number.isFinite(num)) {
      this.stabilizer = clamp(Math.round(num), 0, 10);
    }
  }

  /** Sets pressure response curve: 'soft' | 'normal' | 'hard'. */
  setPressureCurve(curveName) {
    if (Object.prototype.hasOwnProperty.call(PRESSURE_CURVES, curveName)) {
      this.pressureCurve = curveName;
    }
  }

  /** Enables or disables iPad palm rejection (ignores touch pointers when true). */
  setPenOnly(bool) {
    this.isPenOnly = Boolean(bool);
    if (this.isPenOnly && this._isDrawing && this._activePointerType === 'touch') {
      this._finishStroke(null, true);
    }
    this._emitTelemetry({ pointerType: this._lastTelemetryDevice, pressure: 0, tiltX: 0, tiltY: 0 });
  }

  /** Sets active drawing layer: 'draft' | 'ink'. */
  setActiveLayer(layerName) {
    if (!LAYER_TYPES.has(layerName)) return;
    if (this._isDrawing && this._strokeLayer !== layerName) {
      this._finishStroke(null, false);
    }
    this.activeLayer = layerName;
    this._emitHistoryChange();
  }

  /** Shows or hides 'template' | 'draft' | 'ink' layer. */
  setLayerVisibility(layerName, visible) {
    if (!VISIBILITY_LAYERS.has(layerName)) return;
    const isVisible = Boolean(visible);
    this.layerVisibility[layerName] = isVisible;
    const canvas = this._getLayerCanvas(layerName);
    if (canvas) {
      canvas.style.display = isVisible ? '' : 'none';
    }
  }

  /**
   * Loads an SVG data URL (or empty value to clear) onto the template underlay.
   * @param {string} svgDataUrl
   * @param {number} [opacity=45]
   * @returns {Promise<void>}
   */
  loadTemplateSVG(svgDataUrl, opacity = 45) {
    const numericOpacity = Number(opacity);
    if (Number.isFinite(numericOpacity)) {
      this._templateOpacity = clamp(numericOpacity, 0, 100);
    }

    const token = ++this._templateLoadToken;

    if (!svgDataUrl) {
      this._bgImage = null;
      this._renderTemplateLayer();
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (token !== this._templateLoadToken) {
          resolve();
          return;
        }
        this._bgImage = img;
        this._renderTemplateLayer();
        resolve();
      };
      img.onerror = () => {
        if (token === this._templateLoadToken) {
          this._bgImage = null;
          this._renderTemplateLayer();
        }
        resolve();
      };
      img.src = svgDataUrl;
    });
  }

  /**
   * Fits an external image onto the template layer at 100% opacity and prepares
   * the ink layer with a red critique marker for immediate redlining.
   * @param {string} imageDataUrl
   * @returns {Promise<void>}
   */
  loadExternalImageForRedline(imageDataUrl) {
    this.setLayerVisibility('template', true);
    this.setLayerVisibility('ink', true);
    this.setActiveLayer('ink');
    this.setBrush('redline');
    this.setColor('#ef4444');
    return this.loadTemplateSVG(imageDataUrl, 100);
  }

  /** Updates template image opacity (0..100) without reloading the image. */
  setTemplateOpacity(opacity0to100) {
    const num = Number(opacity0to100);
    if (!Number.isFinite(num)) return;
    this._templateOpacity = clamp(num, 0, 100);
    this._renderTemplateLayer();
  }

  /** Sets helper grid overlay: 'none' | 'grid' | 'perspective' | 'crosshair'. */
  setGridType(gridType) {
    if (!GRID_TYPES.has(gridType)) return;
    this._gridType = gridType;
    this._renderTemplateLayer();
  }

  /** Toggles horizontal CSS mirror on wrapperEl and returns the new flip state. */
  toggleFlipHorizontal() {
    this.isFlipped = !this.isFlipped;
    if (this.wrapperEl) {
      this.wrapperEl.classList.toggle('flipped', this.isFlipped);
    }
    this._clearCursor();
    this._emitTelemetry({ pointerType: this._lastTelemetryDevice, pressure: 0, tiltX: 0, tiltY: 0 });
    return this.isFlipped;
  }

  /** Undoes the latest stroke or clear across draft/ink layers. */
  undo() {
    if (this._isDrawing) {
      this._finishStroke(null, false);
    }
    const entry = this._undoStack.pop();
    if (!entry) return false;

    const ctx = this._getLayerCtx(entry.layer);
    if (ctx) {
      ctx.putImageData(entry.before, 0, 0);
    }
    this._redoStack.push(entry);
    this._emitHistoryChange();
    return true;
  }

  /** Redoes the most recently undone action. */
  redo() {
    if (this._isDrawing) {
      this._finishStroke(null, false);
    }
    const entry = this._redoStack.pop();
    if (!entry) return false;

    const ctx = this._getLayerCtx(entry.layer);
    if (ctx) {
      ctx.putImageData(entry.after, 0, 0);
    }
    this._undoStack.push(entry);
    this._emitHistoryChange();
    return true;
  }

  /** Clears the active layer ('draft' or 'ink') and records an undo snapshot. */
  clearActiveLayer() {
    if (this._isDrawing) {
      this._finishStroke(null, false);
    }
    const layer = this.activeLayer;
    const ctx = this._getLayerCtx(layer);
    if (!ctx) return;

    const before = ctx.getImageData(0, 0, this.width, this.height);
    if (!isImageDataNonEmpty(before)) return;

    ctx.clearRect(0, 0, this.width, this.height);
    const after = ctx.getImageData(0, 0, this.width, this.height);
    this._pushHistory({ layer, before, after });
  }

  /** Resets drawings, template underlay, grid, orientation, and undo history. */
  resetAll() {
    this._resetStrokeState();
    this._strokeCtx.clearRect(0, 0, this.width, this.height);
    this.draftCtx.clearRect(0, 0, this.width, this.height);
    this.inkCtx.clearRect(0, 0, this.width, this.height);
    this.cursorCtx.clearRect(0, 0, this.width, this.height);

    this._templateLoadToken += 1;
    this._bgImage = null;
    this._templateOpacity = 45;
    this._gridType = 'none';
    this._renderTemplateLayer();

    this.setLayerVisibility('template', true);
    this.setLayerVisibility('draft', true);
    this.setLayerVisibility('ink', true);

    if (this.isFlipped) {
      this.isFlipped = false;
      if (this.wrapperEl) {
        this.wrapperEl.classList.remove('flipped');
      }
    }

    this._undoStack.length = 0;
    this._redoStack.length = 0;
    this._emitHistoryChange();
    this._emitTelemetry({ pointerType: 'ready', pressure: 0, tiltX: 0, tiltY: 0 });
  }

  /**
   * Composites a white paper background with all visible layers into a PNG data URL.
   * @param {boolean} [includeTemplate=true]
   * @returns {string}
   */
  exportCompositeDataURL(includeTemplate = true) {
    const { canvas, ctx } = createOffscreenCanvas(this.width, this.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, this.width, this.height);

    if (includeTemplate && this.layerVisibility.template) {
      ctx.drawImage(this.templateCanvas, 0, 0);
    }
    if (this.layerVisibility.draft) {
      ctx.drawImage(this.draftCanvas, 0, 0);
    }
    if (this.layerVisibility.ink) {
      ctx.drawImage(this.inkCanvas, 0, 0);
    }
    return canvas.toDataURL('image/png');
  }

  /** Removes event listeners if the studio instance is torn down. */
  destroy() {
    const target = this.cursorCanvas;
    if (!target || !this._handlers) return;
    target.removeEventListener('pointerdown', this._handlers.pointerdown);
    target.removeEventListener('pointermove', this._handlers.pointermove);
    target.removeEventListener('pointerup', this._handlers.pointerup);
    target.removeEventListener('pointercancel', this._handlers.pointercancel);
    target.removeEventListener('pointerleave', this._handlers.pointerleave);
    target.removeEventListener('touchstart', this._handlers.preventTouch);
    target.removeEventListener('touchmove', this._handlers.preventTouch);
    target.removeEventListener('contextmenu', this._handlers.preventContext);
  }

  // ---------------------------------------------------------------------------
  // Event Binding & Pointer Lifecycle
  // ---------------------------------------------------------------------------

  _bindEvents() {
    const target = this.cursorCanvas;
    this._handlers = {
      pointerdown: (e) => this._onPointerDown(e),
      pointermove: (e) => this._onPointerMove(e),
      pointerup: (e) => this._onPointerUp(e),
      pointercancel: (e) => this._onPointerCancel(e),
      pointerleave: (e) => this._onPointerLeave(e),
      preventTouch: (e) => {
        if (e.cancelable) e.preventDefault();
      },
      preventContext: (e) => {
        e.preventDefault();
      },
    };

    target.addEventListener('pointerdown', this._handlers.pointerdown, { passive: false });
    target.addEventListener('pointermove', this._handlers.pointermove, { passive: false });
    target.addEventListener('pointerup', this._handlers.pointerup, { passive: false });
    target.addEventListener('pointercancel', this._handlers.pointercancel, { passive: false });
    target.addEventListener('pointerleave', this._handlers.pointerleave, { passive: false });
    // Guard against iPad Safari scroll/zoom gestures when a palm rests on the canvas.
    target.addEventListener('touchstart', this._handlers.preventTouch, { passive: false });
    target.addEventListener('touchmove', this._handlers.preventTouch, { passive: false });
    target.addEventListener('contextmenu', this._handlers.preventContext);
  }

  _isRejectedTouch(e) {
    return this.isPenOnly && e.pointerType === 'touch';
  }

  _onPointerDown(e) {
    if (e.cancelable) e.preventDefault();
    if (this._isRejectedTouch(e)) return;
    if (e.pointerType === 'mouse' && e.button !== 0 && (e.buttons & 1) === 0) return;

    if (this._isDrawing) {
      // Allow Apple Pencil to supersede an accidental touch stroke cleanly.
      if (e.pointerType === 'pen' && this._activePointerType === 'touch') {
        this._finishStroke(null, false);
      } else if (e.pointerId !== this._activePointerId) {
        return;
      } else {
        this._finishStroke(null, false);
      }
    }

    const pt = this._mapEventPoint(e);
    if (!pt) return;

    try {
      if (typeof this.cursorCanvas.setPointerCapture === 'function') {
        this.cursorCanvas.setPointerCapture(e.pointerId);
      }
    } catch (_) {
      // Synthetic pointer events in tests may not support capture.
    }

    const now = e.timeStamp || performance.now();
    this._activePointerId = e.pointerId;
    this._activePointerType = e.pointerType || 'mouse';
    this._isDrawing = true;
    this._strokeLayer = this.activeLayer;
    this._strokeBrush = this.brush;
    this._hasRealPenPressure = this._activePointerType === 'pen' && e.pressure > 0;
    this._lastValidPenPressure = this._hasRealPenPressure ? clamp(e.pressure, 0.02, 1.0) : 0.45;
    this._simPressure = 0.55;
    this._lastRawX = pt.x;
    this._lastRawY = pt.y;
    this._lastRawTime = now;
    this._distSinceStamp = 0;

    const targetCtx = this._getLayerCtx(this._strokeLayer);
    this._strokeBeforeData = targetCtx.getImageData(0, 0, this.width, this.height);

    if (this._isBufferedBrush(this._strokeBrush)) {
      this._strokeCtx.clearRect(0, 0, this.width, this.height);
    }

    const curvedP = this._computeCurvedPressure(e, pt.x, pt.y, now, true);
    this._smoothX = pt.x;
    this._smoothY = pt.y;
    this._smoothP = curvedP;
    this._lastSmoothed = { x: pt.x, y: pt.y, pressure: curvedP };
    this._lastMid = { x: pt.x, y: pt.y, pressure: curvedP };

    const drawCtx = this._getStrokeDrawCtx(this._strokeBrush);
    this._stampDab(drawCtx, this._strokeBrush, pt.x, pt.y, curvedP);

    this._renderCursorOverlay(pt.x, pt.y, this._smoothX, this._smoothY, true);
    this._emitTelemetry({
      pointerType: this._activePointerType,
      pressure: curvedP,
      tiltX: e.tiltX || 0,
      tiltY: e.tiltY || 0,
    }, true);
  }

  _onPointerMove(e) {
    if (e.cancelable) e.preventDefault();
    if (this._isRejectedTouch(e)) return;

    if (!this._isDrawing) {
      const hoverPt = this._mapEventPoint(e);
      if (!hoverPt) return;
      this._renderCursorOverlay(hoverPt.x, hoverPt.y, hoverPt.x, hoverPt.y, false);
      this._emitTelemetry({
        pointerType: e.pointerType || 'mouse',
        pressure: 0,
        tiltX: e.tiltX || 0,
        tiltY: e.tiltY || 0,
      }, false);
      return;
    }

    if (e.pointerId !== this._activePointerId) return;

    const coalesced = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : null;
    const events = coalesced && coalesced.length > 0 ? coalesced : [e];
    const alpha = this._getStabilizerAlpha();
    const drawCtx = this._getStrokeDrawCtx(this._strokeBrush);

    let latestRawX = this._lastRawX;
    let latestRawY = this._lastRawY;
    let latestPressure = this._smoothP;
    let latestTiltX = e.tiltX || 0;
    let latestTiltY = e.tiltY || 0;

    for (let i = 0; i < events.length; i += 1) {
      const ev = events[i];
      const pt = this._mapEventPoint(ev);
      if (!pt) continue;

      const ts = ev.timeStamp || e.timeStamp || performance.now();
      const curvedP = this._computeCurvedPressure(ev, pt.x, pt.y, ts, false);

      this._lastRawX = pt.x;
      this._lastRawY = pt.y;
      this._lastRawTime = ts;
      latestRawX = pt.x;
      latestRawY = pt.y;
      latestTiltX = ev.tiltX ?? latestTiltX;
      latestTiltY = ev.tiltY ?? latestTiltY;

      if (alpha >= 1) {
        this._smoothX = pt.x;
        this._smoothY = pt.y;
        this._smoothP = curvedP;
      } else {
        this._smoothX += (pt.x - this._smoothX) * alpha;
        this._smoothY += (pt.y - this._smoothY) * alpha;
        this._smoothP += (curvedP - this._smoothP) * alpha;
      }
      latestPressure = this._smoothP;

      const dx = this._smoothX - this._lastSmoothed.x;
      const dy = this._smoothY - this._lastSmoothed.y;
      const dp = Math.abs(this._smoothP - this._lastSmoothed.pressure);
      if (Math.hypot(dx, dy) < 0.15 && dp < 0.01) {
        continue;
      }

      const curr = { x: this._smoothX, y: this._smoothY, pressure: this._smoothP };
      const nextMid = {
        x: (this._lastSmoothed.x + curr.x) * 0.5,
        y: (this._lastSmoothed.y + curr.y) * 0.5,
        pressure: (this._lastSmoothed.pressure + curr.pressure) * 0.5,
      };

      this._drawQuadSegment(drawCtx, this._strokeBrush, this._lastMid, this._lastSmoothed, nextMid);
      this._lastMid = nextMid;
      this._lastSmoothed = curr;
    }

    this._renderCursorOverlay(latestRawX, latestRawY, this._smoothX, this._smoothY, true);
    this._emitTelemetry({
      pointerType: this._activePointerType,
      pressure: latestPressure,
      tiltX: latestTiltX,
      tiltY: latestTiltY,
    }, false);
  }

  _onPointerUp(e) {
    if (e.cancelable) e.preventDefault();
    if (this._isRejectedTouch(e)) return;
    if (!this._isDrawing || e.pointerId !== this._activePointerId) return;

    const pt = this._mapEventPoint(e);
    this._finishStroke(pt, false);

    if (this._activePointerType === 'touch' || !pt) {
      this._clearCursor();
    } else {
      this._renderCursorOverlay(pt.x, pt.y, pt.x, pt.y, false);
    }

    this._emitTelemetry({
      pointerType: e.pointerType || this._lastTelemetryDevice,
      pressure: 0,
      tiltX: e.tiltX || 0,
      tiltY: e.tiltY || 0,
    }, true);
  }

  _onPointerCancel(e) {
    if (e.cancelable) e.preventDefault();
    if (this._isRejectedTouch(e)) return;
    if (!this._isDrawing || e.pointerId !== this._activePointerId) return;

    this._finishStroke(null, true);
    this._clearCursor();
    this._emitTelemetry({
      pointerType: e.pointerType || this._lastTelemetryDevice,
      pressure: 0,
      tiltX: 0,
      tiltY: 0,
    }, true);
  }

  _onPointerLeave(e) {
    if (this._isRejectedTouch(e)) return;

    const hasCapture =
      typeof this.cursorCanvas.hasPointerCapture === 'function' &&
      e.pointerId != null &&
      this.cursorCanvas.hasPointerCapture(e.pointerId);

    if (this._isDrawing && e.pointerId === this._activePointerId && !hasCapture) {
      const pt = this._mapEventPoint(e);
      this._finishStroke(pt, false);
    }

    if (!this._isDrawing) {
      this._clearCursor();
    }
  }

  _finishStroke(endPt, cancelled) {
    if (!this._isDrawing) return;

    const pointerId = this._activePointerId;
    try {
      if (
        pointerId != null &&
        typeof this.cursorCanvas.hasPointerCapture === 'function' &&
        this.cursorCanvas.hasPointerCapture(pointerId)
      ) {
        this.cursorCanvas.releasePointerCapture(pointerId);
      }
    } catch (_) {
      // Ignore release errors when pointer already detached.
    }

    const targetX = endPt ? endPt.x : this._lastRawX;
    const targetY = endPt ? endPt.y : this._lastRawY;
    const drawCtx = this._getStrokeDrawCtx(this._strokeBrush);

    if (!cancelled) {
      this._flushStabilizerEndpoint(drawCtx, targetX, targetY);
    }

    const layerCtx = this._getLayerCtx(this._strokeLayer);
    if (this._isBufferedBrush(this._strokeBrush)) {
      layerCtx.save();
      layerCtx.globalAlpha = this._getStrokeCompositeAlpha(this._strokeBrush);
      layerCtx.drawImage(this._strokeCanvas, 0, 0);
      layerCtx.restore();
      this._strokeCtx.clearRect(0, 0, this.width, this.height);
    }

    if (this._strokeBeforeData) {
      const afterData = layerCtx.getImageData(0, 0, this.width, this.height);
      this._pushHistory({
        layer: this._strokeLayer,
        before: this._strokeBeforeData,
        after: afterData,
      });
    }

    this._resetStrokeState();
  }

  /**
   * Flushes residual stabilizer lag smoothly to the final pointer coordinates on lift.
   */
  _flushStabilizerEndpoint(drawCtx, endX, endY) {
    const gap = Math.hypot(endX - this._smoothX, endY - this._smoothY);
    if (this.stabilizer > 0 && gap > 0.5) {
      const catchupSteps = 4;
      for (let i = 1; i <= catchupSteps; i += 1) {
        const t = i / catchupSteps;
        const ease = 1 - Math.pow(1 - t, 2);
        const nx = this._smoothX + (endX - this._smoothX) * ease;
        const ny = this._smoothY + (endY - this._smoothY) * ease;
        // Gently taper tail when lifting out of a fast stabilized stroke.
        const np = clamp(this._smoothP * (1 - 0.18 * t), 0.02, 1.0);
        const nextPt = { x: nx, y: ny, pressure: np };
        const nextMid = {
          x: (this._lastSmoothed.x + nextPt.x) * 0.5,
          y: (this._lastSmoothed.y + nextPt.y) * 0.5,
          pressure: (this._lastSmoothed.pressure + nextPt.pressure) * 0.5,
        };
        this._drawQuadSegment(drawCtx, this._strokeBrush, this._lastMid, this._lastSmoothed, nextMid);
        this._lastMid = nextMid;
        this._lastSmoothed = nextPt;
      }
    }

    const finalPt = { x: endX, y: endY, pressure: this._lastSmoothed.pressure };
    this._drawQuadSegment(drawCtx, this._strokeBrush, this._lastMid, this._lastSmoothed, finalPt);
  }

  _resetStrokeState() {
    this._isDrawing = false;
    this._activePointerId = null;
    this._activePointerType = 'mouse';
    this._strokeLayer = null;
    this._strokeBeforeData = null;
    this._strokeBrush = null;
    this._hasRealPenPressure = false;
    this._lastValidPenPressure = 0.45;
    this._simPressure = 0.55;
    this._lastRawX = 0;
    this._lastRawY = 0;
    this._lastRawTime = 0;
    this._smoothX = 0;
    this._smoothY = 0;
    this._smoothP = 0;
    this._lastMid = null;
    this._lastSmoothed = null;
    this._distSinceStamp = 0;
  }

  // ---------------------------------------------------------------------------
  // Coordinate Mapping, Pressure & Stabilizer
  // ---------------------------------------------------------------------------

  _mapEventPoint(ev) {
    const rect = this.cursorCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    let normX = (ev.clientX - rect.left) / rect.width;
    // CSS scaleX(-1) mirrors wrapperEl visually, so invert normX to match stylus tip.
    if (this.isFlipped) {
      normX = 1 - normX;
    }
    return {
      x: normX * this.width,
      y: ((ev.clientY - rect.top) / rect.height) * this.height,
    };
  }

  _computeVelocityPressure(x, y, timeStamp) {
    const dist = Math.hypot(x - this._lastRawX, y - this._lastRawY);
    const dt = Math.max(1, timeStamp - this._lastRawTime);
    const velocity = dist / dt; // canvas px per ms
    const speedRatio = clamp(velocity / 2.6, 0, 1);
    const target = 0.88 - speedRatio * 0.70;
    this._simPressure = this._simPressure * 0.65 + target * 0.35;
    return clamp(this._simPressure, 0.05, 1.0);
  }

  _computeCurvedPressure(ev, x, y, timeStamp, isDown) {
    const pointerType = ev.pointerType || this._activePointerType || 'mouse';
    let rawP;

    if (pointerType === 'pen') {
      if (ev.pressure > 0) {
        rawP = clamp(ev.pressure, 0.02, 1.0);
        this._hasRealPenPressure = true;
        this._lastValidPenPressure = rawP;
      } else if ((ev.buttons > 0 || isDown) && this._hasRealPenPressure) {
        rawP = this._lastValidPenPressure;
      } else {
        // Fallback gracefully when tablet driver reports pressure 0 while active.
        rawP = isDown ? 0.45 : this._computeVelocityPressure(x, y, timeStamp);
      }
    } else if (ev.pressure > 0 && ev.pressure !== 0.5) {
      rawP = clamp(ev.pressure, 0.02, 1.0);
    } else {
      rawP = isDown ? 0.55 : this._computeVelocityPressure(x, y, timeStamp);
    }

    const curveFn = PRESSURE_CURVES[this.pressureCurve] || PRESSURE_CURVES.normal;
    return clamp(curveFn(rawP), 0.02, 1.0);
  }

  _getStabilizerAlpha() {
    if (this.stabilizer <= 0) return 1;
    // Level 1 -> ~0.916, Level 3 -> ~0.748, Level 10 -> 0.16.
    return Math.max(0.16, 1 - this.stabilizer * 0.084);
  }

  // ---------------------------------------------------------------------------
  // Brush Rendering & Graphite Pattern
  // ---------------------------------------------------------------------------

  _isBufferedBrush(brush) {
    return brush === 'redline' || brush === 'marker';
  }

  _getStrokeCompositeAlpha(brush) {
    if (brush === 'redline') return 0.82;
    if (brush === 'marker') return 0.28;
    return 1.0;
  }

  _getStrokeDrawCtx(brush) {
    return this._isBufferedBrush(brush) ? this._strokeCtx : this._getLayerCtx(this._strokeLayer);
  }

  _getBrushMetrics(brush, pressure) {
    const base = this.size;
    switch (brush) {
      case 'pencil': {
        const width = Math.max(0.9, base * (0.35 + pressure * 0.70));
        const opacity = 0.25 + pressure * 0.60;
        return { width, opacity };
      }
      case 'gpen': {
        const width = Math.max(0.6, base * (0.15 + pressure * 1.30));
        return { width, opacity: 1.0 };
      }
      case 'redline': {
        const width = Math.max(1.2, base * (0.78 + pressure * 0.42));
        return { width, opacity: 1.0 };
      }
      case 'marker': {
        const width = Math.max(3.0, base * 2.4 * (0.82 + pressure * 0.30));
        return { width, opacity: 1.0 };
      }
      case 'eraser': {
        const width = Math.max(1.0, base * (0.50 + pressure * 0.80));
        return { width, opacity: 1.0 };
      }
      default:
        return { width: base, opacity: 1.0 };
    }
  }

  _ensurePencilPattern(ctx) {
    if (this._pencilPattern && this._pencilPatternColor === this.color) {
      return this._pencilPattern;
    }

    this._colorProbeCtx.clearRect(0, 0, 1, 1);
    this._colorProbeCtx.fillStyle = this.color;
    this._colorProbeCtx.fillRect(0, 0, 1, 1);
    const [r, g, b] = this._colorProbeCtx.getImageData(0, 0, 1, 1).data;

    const imgData = this._grainCtx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
    const data = imgData.data;
    for (let i = 0; i < this._grainMask.length; i += 1) {
      const idx = i * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = this._grainMask[i];
    }
    this._grainCtx.putImageData(imgData, 0, 0);
    this._pencilPattern = ctx.createPattern(this._grainCanvas, 'repeat');
    this._pencilPatternColor = this.color;
    return this._pencilPattern;
  }

  _stampDab(ctx, brush, x, y, pressure) {
    const { width, opacity } = this._getBrushMetrics(brush, pressure);
    const radius = width * 0.5;

    ctx.save();
    if (brush === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    } else if (brush === 'pencil') {
      const overlap = width < 3 ? 2.0 : 3.4;
      const dabAlpha = 1 - Math.pow(1 - opacity, 1 / overlap);
      ctx.globalAlpha = dabAlpha;
      ctx.fillStyle = this._ensurePencilPattern(ctx) || this.color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    } else if (brush === 'marker') {
      // Angled chisel nib shape for broad Copic-style shading.
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(x, y, radius, Math.max(1.5, radius * 0.36), -Math.PI / 5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  _drawQuadSegment(ctx, brush, p0, ctrl, p2) {
    // Approximate quadratic Bezier arc length via two chords.
    const approxLen =
      Math.hypot(ctrl.x - p0.x, ctrl.y - p0.y) +
      Math.hypot(p2.x - ctrl.x, p2.y - ctrl.y);

    if (approxLen < 0.05) return;

    const subSteps = Math.max(1, Math.ceil(approxLen / 1.4));
    let prevX = p0.x;
    let prevY = p0.y;

    for (let i = 1; i <= subSteps; i += 1) {
      const t = i / subSteps;
      const inv = 1 - t;
      const x = inv * inv * p0.x + 2 * inv * t * ctrl.x + t * t * p2.x;
      const y = inv * inv * p0.y + 2 * inv * t * ctrl.y + t * t * p2.y;
      const p = inv * inv * p0.pressure + 2 * inv * t * ctrl.pressure + t * t * p2.pressure;

      const stepDist = Math.hypot(x - prevX, y - prevY);
      prevX = x;
      prevY = y;
      this._distSinceStamp += stepDist;

      const { width } = this._getBrushMetrics(brush, p);
      const spacing =
        brush === 'marker'
          ? Math.max(1.2, Math.min(3.5, width * 0.08))
          : brush === 'pencil'
            ? Math.max(0.9, width * 0.25)
            : Math.max(0.65, width * 0.22);

      if (this._distSinceStamp >= spacing) {
        this._stampDab(ctx, brush, x, y, p);
        this._distSinceStamp %= spacing;
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Live Cursor Preview
  // ---------------------------------------------------------------------------

  _clearCursor() {
    this.cursorCtx.clearRect(0, 0, this.width, this.height);
  }

  _renderCursorOverlay(rawX, rawY, smoothX, smoothY, isDrawing) {
    const ctx = this.cursorCtx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Composite active buffered stroke preview (redline / marker) cleanly.
    if (isDrawing && this._isBufferedBrush(this._strokeBrush)) {
      ctx.save();
      ctx.globalAlpha = this._getStrokeCompositeAlpha(this._strokeBrush);
      ctx.drawImage(this._strokeCanvas, 0, 0);
      ctx.restore();
    }

    const previewWidth = this.brush === 'marker' ? this.size * 2.4 : this.size;
    const radius = Math.max(2, previewWidth * 0.5);

    ctx.save();

    // Subtle stabilizer tether line while drawing with smoothing enabled.
    if (isDrawing && this.stabilizer > 0 && Math.hypot(rawX - smoothX, rawY - smoothY) > 2) {
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.45)';
      ctx.lineWidth = 1.25;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(smoothX, smoothY);
      ctx.lineTo(rawX, rawY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    if (this.brush === 'marker') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(rawX, rawY, radius, Math.max(2, radius * 0.36), -Math.PI / 5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(15, 23, 42, 0.65)';
      ctx.lineWidth = 1;
      ctx.stroke();
    } else {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(rawX, rawY, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle =
        this.brush === 'eraser' ? 'rgba(239, 68, 68, 0.85)' : 'rgba(15, 23, 42, 0.65)';
      ctx.lineWidth = 1;
      if (this.brush === 'eraser') {
        ctx.setLineDash([3, 3]);
      }
      ctx.beginPath();
      ctx.arc(rawX, rawY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.fillStyle = this.brush === 'eraser' ? 'rgba(239, 68, 68, 0.85)' : this.color;
    ctx.beginPath();
    ctx.arc(rawX, rawY, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // ---------------------------------------------------------------------------
  // Template & Grid Rendering
  // ---------------------------------------------------------------------------

  _renderTemplateLayer() {
    const ctx = this.templateCtx;
    ctx.clearRect(0, 0, this.width, this.height);

    if (this._bgImage) {
      const imgW = this._bgImage.naturalWidth || this._bgImage.width || this.width;
      const imgH = this._bgImage.naturalHeight || this._bgImage.height || this.height;
      const scale = Math.min(this.width / imgW, this.height / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const drawX = (this.width - drawW) * 0.5;
      const drawY = (this.height - drawH) * 0.5;

      ctx.save();
      ctx.globalAlpha = clamp(this._templateOpacity / 100, 0, 1);
      ctx.drawImage(this._bgImage, drawX, drawY, drawW, drawH);
      ctx.restore();
    }

    this._drawGridOverlay(ctx);
  }

  _drawGridOverlay(ctx) {
    if (this._gridType === 'none') return;

    const w = this.width;
    const h = this.height;
    ctx.save();

    if (this._gridType === 'grid') {
      // 60px square grid + rule-of-thirds guides.
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.16)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 60; x < w; x += 60) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, h);
      }
      for (let y = 60; y < h; y += 60) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
      }
      ctx.stroke();

      ctx.strokeStyle = 'rgba(14, 165, 233, 0.36)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      for (const ratio of [1 / 3, 2 / 3]) {
        const tx = Math.round(w * ratio) + 0.5;
        const ty = Math.round(h * ratio) + 0.5;
        ctx.moveTo(tx, 0);
        ctx.lineTo(tx, h);
        ctx.moveTo(0, ty);
        ctx.lineTo(w, ty);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (this._gridType === 'perspective') {
      const horizonY = Math.round(h * 0.48) + 0.5;
      const vpLeftX = 36;
      const vpRightX = w - 36;

      // Horizon line & center vertical.
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(w, horizonY);
      ctx.moveTo(w * 0.5 + 0.5, 0);
      ctx.lineTo(w * 0.5 + 0.5, h);
      ctx.stroke();

      // Vanishing-point perspective rays.
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 1;
      const rayAnglesDeg = [-54, -36, -20, -10, 10, 20, 36, 54];
      const rayLength = Math.hypot(w, h);
      ctx.beginPath();
      for (const deg of rayAnglesDeg) {
        const rad = (deg * Math.PI) / 180;
        ctx.moveTo(vpLeftX, horizonY);
        ctx.lineTo(vpLeftX + Math.cos(rad) * rayLength, horizonY + Math.sin(rad) * rayLength);
        ctx.moveTo(vpRightX, horizonY);
        ctx.lineTo(vpRightX - Math.cos(rad) * rayLength, horizonY + Math.sin(rad) * rayLength);
      }
      ctx.stroke();

      // Vanishing-point markers.
      ctx.fillStyle = 'rgba(14, 165, 233, 0.65)';
      for (const vpX of [vpLeftX, vpRightX]) {
        ctx.beginPath();
        ctx.arc(vpX, horizonY, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (this._gridType === 'crosshair') {
      const cx = w * 0.5 + 0.5;
      const cy = h * 0.5 + 0.5;

      // Diagonal symmetry guides.
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w, h);
      ctx.moveTo(w, 0);
      ctx.lineTo(0, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // Center axes + proportion ruler ticks every 60px.
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.42)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      for (let offset = 60; offset < w * 0.5; offset += 60) {
        ctx.moveTo(cx - offset, cy - 6);
        ctx.lineTo(cx - offset, cy + 6);
        ctx.moveTo(cx + offset, cy - 6);
        ctx.lineTo(cx + offset, cy + 6);
      }
      for (let offset = 60; offset < h * 0.5; offset += 60) {
        ctx.moveTo(cx - 6, cy - offset);
        ctx.lineTo(cx + 6, cy - offset);
        ctx.moveTo(cx - 6, cy + offset);
        ctx.lineTo(cx + 6, cy + offset);
      }
      ctx.stroke();
    }

    ctx.restore();
  }

  // ---------------------------------------------------------------------------
  // Layers, History & Callbacks
  // ---------------------------------------------------------------------------

  _getLayerCanvas(layerName) {
    if (layerName === 'template') return this.templateCanvas;
    if (layerName === 'draft') return this.draftCanvas;
    if (layerName === 'ink') return this.inkCanvas;
    return null;
  }

  _getLayerCtx(layerName) {
    if (layerName === 'draft') return this.draftCtx;
    if (layerName === 'ink') return this.inkCtx;
    return null;
  }

  _pushHistory(entry) {
    this._undoStack.push(entry);
    if (this._undoStack.length > MAX_HISTORY_STEPS) {
      this._undoStack.shift();
    }
    this._redoStack.length = 0;
    this._emitHistoryChange();
  }

  _emitHistoryChange() {
    if (!this.onHistoryChange) return;
    this.onHistoryChange({
      canUndo: this._undoStack.length > 0,
      canRedo: this._redoStack.length > 0,
      activeLayer: this.activeLayer,
    });
  }

  _emitTelemetry(data, immediate = true) {
    if (!this.onTelemetry) return;
    if (data.pointerType && data.pointerType !== 'ready') {
      this._lastTelemetryDevice = data.pointerType;
    }
    const now = performance.now();
    if (!immediate && now - this._lastTelemetryAt < 24) {
      return;
    }
    this._lastTelemetryAt = now;
    this.onTelemetry({
      pointerType: data.pointerType || this._lastTelemetryDevice || 'mouse',
      pressure: clamp(Number(data.pressure) || 0, 0, 1),
      tiltX: Math.round(Number(data.tiltX) || 0),
      tiltY: Math.round(Number(data.tiltY) || 0),
      isPenOnly: this.isPenOnly,
      isFlipped: this.isFlipped,
    });
  }
}
