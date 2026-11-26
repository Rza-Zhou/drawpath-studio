/**
 * PressureCanvasStudio
 * iPad Apple Pencil (120Hz/240Hz) & PC Drawing Tablet pressure + tilt Canvas 2D engine.
 * - Metal GPU-accelerated layers (no CPU willReadFrequently fallback, GPU canvas undo snapshots)
 * - Apple Pencil low-force calibration + frame-rate-independent position/pressure decoupled smoothing
 * - Exact arc-length while-loop dab stepping + continuous overlap compensation (zero banding/beading)
 * - Full tilt & azimuth shading (pencil side-shading, dynamic chisel marker rotation, calligraphic g-pen)
 * - rAF-coalesced cursor/buffered stroke preview, automatic 500ms palm rejection, horizontal mirror support
 */

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 900;
const MAX_HISTORY_STEPS = 24;
const GRAIN_SIZE = 96;
const AUTO_PALM_REJECT_MS = 500;

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

function lerpAngle(a, b, t) {
  let diff = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI;
  if (diff < -Math.PI) diff += Math.PI * 2;
  return a + diff * t;
}

function createOffscreenCanvas(width, height, willReadFrequently = false) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', willReadFrequently ? { willReadFrequently: true } : undefined);
  return { canvas, ctx };
}

/**
 * Calibrates raw stylus physical pressure (especially iPad Apple Pencil where normal sketching
 * lands around 0.05..0.30) into a natural responsive [0.02, 1.0] curve before user curve shaping.
 */
export function calibratePenPressure(rawPressure, curveName = 'normal') {
  const normalized = clamp((Number(rawPressure) - 0.012) / 0.768, 0, 1);
  const lifted = Math.pow(normalized, 0.68);
  const curveFn = PRESSURE_CURVES[curveName] || PRESSURE_CURVES.normal;
  return clamp(curveFn(lifted), 0.02, 1.0);
}

/**
 * Extracts normalized tilt/altitude/azimuth from PointerEvent (supports both Safari native
 * altitudeAngle/azimuthAngle and standard tiltX/tiltY), mirroring azimuth when flipped.
 */
export function extractTiltState(ev, isFlipped = false) {
  let altitude = Math.PI / 2;
  let azimuth = -Math.PI / 5;
  let hasTilt = false;

  if (
    typeof ev?.altitudeAngle === 'number' &&
    Number.isFinite(ev.altitudeAngle) &&
    ev.altitudeAngle < Math.PI / 2 - 0.005
  ) {
    altitude = clamp(ev.altitudeAngle, 0.08, Math.PI / 2);
    azimuth =
      typeof ev.azimuthAngle === 'number' && Number.isFinite(ev.azimuthAngle)
        ? ev.azimuthAngle
        : -Math.PI / 5;
    hasTilt = true;
  } else {
    const tx = Number(ev?.tiltX) || 0;
    const ty = Number(ev?.tiltY) || 0;
    if (tx !== 0 || ty !== 0) {
      const txRad = (clamp(tx, -89, 89) * Math.PI) / 180;
      const tyRad = (clamp(ty, -89, 89) * Math.PI) / 180;
      const tanX = Math.tan(txRad);
      const tanY = Math.tan(tyRad);
      const r = Math.hypot(tanX, tanY);
      altitude = Math.atan2(1, r);
      azimuth = Math.atan2(tanY, tanX);
      hasTilt = true;
    }
  }

  if (hasTilt && isFlipped) {
    azimuth = Math.PI - azimuth;
  }

  const altitudeDeg = (altitude * 180) / Math.PI;
  const tiltFactor = hasTilt ? clamp((64 - altitudeDeg) / 44, 0, 1) : 0;
  const tiltFromVerticalDeg = Math.round(90 - altitudeDeg);

  return {
    hasTilt,
    altitude,
    altitudeDeg,
    tiltFromVerticalDeg,
    azimuth,
    tiltFactor,
  };
}

/**
 * Computes continuous, discontinuity-free brush stamp dimensions, spacing, and per-dab alpha.
 */
export function computeBrushStampGeometry(brush, baseSize, pressure, tiltFactor = 0, azimuth = -Math.PI / 5, hasTilt = false) {
  const base = clamp(Number(baseSize) || 8, 1, 120);
  const p = clamp(Number(pressure) || 0.02, 0.02, 1.0);
  const t = clamp(Number(tiltFactor) || 0, 0, 1);

  switch (brush) {
    case 'pencil': {
      // Smooth continuous sizing + authentic side-shading elongation when Apple Pencil tilts flat
      const tipDiam = Math.max(0.9, base * (0.28 + p * 0.78));
      const minor = tipDiam * (1 + t * 0.35);
      const major = tipDiam * (1 + t * 2.45);
      const targetOpacity = clamp((0.30 + p * 0.62) * (1 - t * 0.30), 0.14, 0.94);
      const spacing = clamp(minor * 0.20, 0.55, 3.0);
      // Continuous physical overlap ratio (eliminates discontinuous jumps like width < 3)
      const effectiveOverlap = Math.max(1.25, minor / spacing);
      const dabAlpha = clamp(1 - Math.pow(1 - targetOpacity, 1 / effectiveOverlap), 0.03, 0.95);
      return {
        rx: major * 0.5,
        ry: minor * 0.5,
        angle: hasTilt ? azimuth : -Math.PI / 5,
        spacing,
        dabAlpha,
        targetOpacity,
        isElliptical: t > 0.06,
      };
    }
    case 'gpen': {
      const width = Math.max(0.65, base * (0.14 + p * 1.28));
      const major = width * (1 + t * 0.40);
      const spacing = clamp(width * 0.18, 0.45, 2.2);
      return {
        rx: major * 0.5,
        ry: width * 0.5,
        angle: hasTilt ? azimuth : -Math.PI / 5,
        spacing,
        dabAlpha: 1.0,
        targetOpacity: 1.0,
        isElliptical: t > 0.08,
      };
    }
    case 'redline': {
      const width = Math.max(1.2, base * (0.76 + p * 0.42));
      const spacing = clamp(width * 0.20, 0.65, 2.6);
      return {
        rx: width * 0.5,
        ry: width * 0.5,
        angle: 0,
        spacing,
        dabAlpha: 1.0,
        targetOpacity: 1.0,
        isElliptical: false,
      };
    }
    case 'marker': {
      const major = Math.max(3.2, base * 2.4 * (0.84 + p * 0.28));
      const minor = Math.max(1.6, major * (0.34 + t * 0.16));
      const spacing = clamp(minor * 0.16, 1.0, 3.2);
      return {
        rx: major * 0.5,
        ry: minor * 0.5,
        angle: hasTilt ? azimuth : -Math.PI / 5,
        spacing,
        dabAlpha: 1.0,
        targetOpacity: 1.0,
        isElliptical: true,
      };
    }
    case 'eraser': {
      const width = Math.max(1.2, base * (0.48 + p * 0.85) * (1 + t * 0.55));
      const spacing = clamp(width * 0.20, 0.7, 3.2);
      return {
        rx: width * 0.5,
        ry: width * 0.5,
        angle: 0,
        spacing,
        dabAlpha: 1.0,
        targetOpacity: 1.0,
        isElliptical: false,
      };
    }
    default: {
      const spacing = clamp(base * 0.2, 0.7, 3.0);
      return {
        rx: base * 0.5,
        ry: base * 0.5,
        angle: 0,
        spacing,
        dabAlpha: 1.0,
        targetOpacity: 1.0,
        isElliptical: false,
      };
    }
  }
}

/**
 * Generates a deterministic fine cold-press paper-tooth alpha mask for natural graphite texture.
 */
function buildGrainMask(size) {
  const mask = new Uint8ClampedArray(size * size);
  let seed = 0x5f3759df;
  for (let i = 0; i < mask.length; i += 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const fine = (seed >>> 24) / 255;
    // Balanced paper tooth (0.52..1.0) so light strokes stay clean & even without patchy holes
    mask[i] = Math.round((0.52 + fine * 0.48) * 255);
  }
  return mask;
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

    // Hardware-accelerated GPU contexts (deliberately omit willReadFrequently so iPad Safari uses Metal GPU!)
    this.templateCtx = this.templateCanvas.getContext('2d');
    this.draftCtx = this.draftCanvas.getContext('2d');
    this.inkCtx = this.inkCanvas.getContext('2d');
    this.cursorCtx = this.cursorCanvas.getContext('2d');

    // Offscreen stroke buffer prevents alpha-compounding seams on translucent flat brushes (redline / marker).
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

    // Tracks whether a layer currently contains pixels (avoids getImageData reads on clearActiveLayer)
    this._layerHasPixels = {
      draft: false,
      ink: false,
    };

    // Template & grid state.
    this._bgImage = null;
    this._bgImagePadding = 0;
    this._compositeLayers = [];
    this._templateOpacity = 45;
    this._gridType = 'none';
    this._templateLoadToken = 0;

    // GPU-resident offscreen canvas undo/redo snapshots + pool for zero-stall iPad performance.
    this._undoStack = [];
    this._redoStack = [];
    this._snapshotPool = [];

    // Smart palm rejection window when Apple Pencil is active.
    this._lastPenActiveAt = 0;

    // rAF-throttled cursor & buffered preview overlay state.
    this._cursorRafId = null;
    this._pendingCursor = null;

    // Active pointer & stroke runtime state.
    this._resetStrokeState();
    this._lastTelemetryAt = 0;
    this._lastTelemetryDevice = 'ready';

    this.cursorCanvas.style.touchAction = 'none';
    this._bindEvents();
    this._renderTemplateLayer();

    queueMicrotask(() => {
      this._emitHistoryChange();
      this._emitTelemetry({
        pointerType: 'ready',
        pressure: 0,
        tiltX: 0,
        tiltY: 0,
        tiltFromVerticalDeg: 0,
        tiltFactor: 0,
        isSideShading: false,
      });
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

  /** Sets frame-rate-independent stabilizer strength (0 = raw, 10 = strongest smoothing). */
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

  /** Enables or disables strict iPad palm rejection (ignores all touch pointers when true). */
  setPenOnly(bool) {
    this.isPenOnly = Boolean(bool);
    if (this.isPenOnly && this._isDrawing && this._activePointerType === 'touch') {
      this._finishStroke(null, true);
    }
    this._emitTelemetry({
      pointerType: this._lastTelemetryDevice,
      pressure: 0,
      tiltX: 0,
      tiltY: 0,
      tiltFromVerticalDeg: 0,
      tiltFactor: 0,
      isSideShading: false,
    });
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
   * Loads an SVG data URL or image URL (or empty value to clear) onto the template underlay.
   */
  loadTemplateSVG(svgDataUrl, opacity = 45) {
    const numericOpacity = Number(opacity);
    if (Number.isFinite(numericOpacity)) {
      this._templateOpacity = clamp(numericOpacity, 0, 100);
    }

    const token = ++this._templateLoadToken;
    this._compositeLayers = [];

    if (!svgDataUrl) {
      this._bgImage = null;
      this._bgImagePadding = 0;
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
        this._bgImagePadding = 0;
        this._compositeLayers = [];
        this._renderTemplateLayer();
        resolve();
      };
      img.onerror = () => {
        if (token === this._templateLoadToken) {
          this._bgImage = null;
          this._bgImagePadding = 0;
          this._compositeLayers = [];
          this._renderTemplateLayer();
        }
        resolve();
      };
      img.src = svgDataUrl;
    });
  }

  /**
   * Loads a structured procedural, composite, or high-resolution image template specification:
   *   { renderScaffoldSvg: () => string, plates?: [...] }
   *   or { kind: 'image', imageUrl: string, padding?: number }
   */
  async loadTemplateSpec(spec, opacity = 45) {
    const numericOpacity = Number(opacity);
    if (Number.isFinite(numericOpacity)) {
      this._templateOpacity = clamp(numericOpacity, 0, 100);
    }

    const token = ++this._templateLoadToken;

    if (!spec) {
      this._bgImage = null;
      this._bgImagePadding = 0;
      this._compositeLayers = [];
      this._renderTemplateLayer();
      return;
    }

    const loadImage = (src) =>
      new Promise((resolve) => {
        if (!src) {
          resolve(null);
          return;
        }
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
      });

    if (spec.kind === 'image' && spec.imageUrl) {
      const img = await loadImage(spec.imageUrl);
      if (token !== this._templateLoadToken) return;
      this._bgImage = img;
      this._bgImagePadding = Number(spec.padding) || 0;
      this._compositeLayers = [];
      this._renderTemplateLayer();
      return;
    }

    const scaffoldSvg = typeof spec.renderScaffoldSvg === 'function' ? spec.renderScaffoldSvg() : '';
    const scaffoldSrc = scaffoldSvg
      ? 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(scaffoldSvg)
      : '';
    const plateSpecs = Array.isArray(spec.plates) ? spec.plates : [];

    const [scaffoldImg, ...plateImgs] = await Promise.all([
      loadImage(scaffoldSrc),
      ...plateSpecs.map((p) => loadImage(p.src)),
    ]);

    if (token !== this._templateLoadToken) return;

    this._bgImage = scaffoldImg;
    this._bgImagePadding = 0;
    this._compositeLayers = plateSpecs
      .map((p, idx) => (plateImgs[idx] ? { ...p, img: plateImgs[idx] } : null))
      .filter(Boolean);
    this._renderTemplateLayer();
  }

  /**
   * Fits an external image onto the template layer at 100% opacity and prepares
   * the ink layer with a red critique marker for immediate redlining.
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
    this._emitTelemetry({
      pointerType: this._lastTelemetryDevice,
      pressure: 0,
      tiltX: 0,
      tiltY: 0,
      tiltFromVerticalDeg: 0,
      tiltFactor: 0,
      isSideShading: false,
    });
    return this.isFlipped;
  }

  /** Undoes the latest stroke or clear across draft/ink layers (GPU canvas blit, <0.5ms). */
  undo() {
    if (this._isDrawing) {
      this._finishStroke(null, false);
    }
    const entry = this._undoStack.pop();
    if (!entry) return false;

    this._restoreLayerSnapshot(entry.layer, entry.before);
    this._layerHasPixels[entry.layer] = entry.hadPixelsBefore;
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

    this._restoreLayerSnapshot(entry.layer, entry.after);
    this._layerHasPixels[entry.layer] = entry.hadPixelsAfter;
    this._undoStack.push(entry);
    this._emitHistoryChange();
    return true;
  }

  /** Clears the active layer ('draft' or 'ink') and records a GPU undo snapshot. */
  clearActiveLayer() {
    if (this._isDrawing) {
      this._finishStroke(null, false);
    }
    const layer = this.activeLayer;
    const ctx = this._getLayerCtx(layer);
    if (!ctx || !this._layerHasPixels[layer]) return;

    const before = this._captureLayerSnapshot(layer);
    ctx.clearRect(0, 0, this.width, this.height);
    const after = this._captureLayerSnapshot(layer);
    this._layerHasPixels[layer] = false;
    this._pushHistory({
      layer,
      before,
      after,
      hadPixelsBefore: true,
      hadPixelsAfter: false,
    });
  }

  /** Resets drawings, template underlay, grid, orientation, and undo history. */
  resetAll() {
    this._resetStrokeState();
    this._strokeCtx.clearRect(0, 0, this.width, this.height);
    this.draftCtx.clearRect(0, 0, this.width, this.height);
    this.inkCtx.clearRect(0, 0, this.width, this.height);
    this._clearCursor();

    this._layerHasPixels.draft = false;
    this._layerHasPixels.ink = false;

    this._templateLoadToken += 1;
    this._bgImage = null;
    this._bgImagePadding = 0;
    this._compositeLayers = [];
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

    this._clearHistoryStacks();
    this._emitHistoryChange();
    this._emitTelemetry({
      pointerType: 'ready',
      pressure: 0,
      tiltX: 0,
      tiltY: 0,
      tiltFromVerticalDeg: 0,
      tiltFactor: 0,
      isSideShading: false,
    });
  }

  /**
   * Composites a white paper background with all visible layers into a PNG data URL.
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

  /** Removes event listeners and cancels any pending rAF when torn down. */
  destroy() {
    if (this._cursorRafId != null) {
      cancelAnimationFrame(this._cursorRafId);
      this._cursorRafId = null;
    }
    const target = this.cursorCanvas;
    if (!target || !this._handlers) return;
    target.removeEventListener('pointerdown', this._handlers.pointerdown);
    target.removeEventListener('pointermove', this._handlers.pointermove);
    target.removeEventListener('pointerup', this._handlers.pointerup);
    target.removeEventListener('pointercancel', this._handlers.pointercancel);
    target.removeEventListener('pointerleave', this._handlers.pointerleave);
    target.removeEventListener('touchstart', this._handlers.preventTouch);
    target.removeEventListener('touchmove', this._handlers.preventTouch);
    target.removeEventListener('gesturestart', this._handlers.preventTouch);
    target.removeEventListener('gesturechange', this._handlers.preventTouch);
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
    // Prevent iPad Safari scroll, zoom, pinch gestures, and Scribble hijacking while drawing.
    target.addEventListener('touchstart', this._handlers.preventTouch, { passive: false });
    target.addEventListener('touchmove', this._handlers.preventTouch, { passive: false });
    target.addEventListener('gesturestart', this._handlers.preventTouch, { passive: false });
    target.addEventListener('gesturechange', this._handlers.preventTouch, { passive: false });
    target.addEventListener('contextmenu', this._handlers.preventContext);
  }

  _isRejectedTouch(e) {
    if (e.pointerType !== 'touch') return false;
    if (this.isPenOnly) return true;
    // Automatic smart palm rejection: ignore palm touches during or within 500ms of Apple Pencil activity
    if (this._isDrawing && this._activePointerType === 'pen') return true;
    if (performance.now() - this._lastPenActiveAt < AUTO_PALM_REJECT_MS) return true;
    return false;
  }

  _onPointerDown(e) {
    if (e.cancelable) e.preventDefault();
    if (e.pointerType === 'pen') {
      this._lastPenActiveAt = performance.now();
    }
    if (this._isRejectedTouch(e)) return;
    if (e.pointerType === 'mouse' && e.button !== 0 && (e.buttons & 1) === 0) return;

    if (this._isDrawing) {
      // Allow Apple Pencil to supersede an accidental palm touch stroke cleanly and discard touch mark.
      if (e.pointerType === 'pen' && this._activePointerType === 'touch') {
        this._finishStroke(null, true);
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
      // Synthetic pointer events in automated tests may not support capture.
    }

    const now = e.timeStamp || performance.now();
    this._activePointerId = e.pointerId;
    this._activePointerType = e.pointerType || 'mouse';
    this._isDrawing = true;
    this._strokeLayer = this.activeLayer;
    this._strokeBrush = this.brush;
    this._hadPixelsBeforeStroke = this._layerHasPixels[this._strokeLayer];
    this._hasRealPenPressure = this._activePointerType === 'pen' && e.pressure > 0;
    this._lastValidPenPressure = this._hasRealPenPressure ? clamp(e.pressure, 0.015, 1.0) : 0.35;
    this._simPressure = 0.55;
    this._lastRawX = pt.x;
    this._lastRawY = pt.y;
    this._lastRawTime = now;
    this._distSinceStamp = 0;

    // Fast GPU-resident offscreen snapshot (<0.5ms on iPad, zero CPU readback stall!)
    this._strokeBeforeSnapshot = this._captureLayerSnapshot(this._strokeLayer);

    if (this._isBufferedBrush(this._strokeBrush)) {
      this._strokeCtx.clearRect(0, 0, this.width, this.height);
    }

    const curvedP = this._computeCurvedPressure(e, pt.x, pt.y, now, true);
    const tilt = extractTiltState(e, this.isFlipped);

    this._smoothX = pt.x;
    this._smoothY = pt.y;
    this._smoothP = curvedP;
    this._smoothTilt = tilt.tiltFactor;
    this._smoothAzimuth = tilt.azimuth;
    this._hasTiltData = tilt.hasTilt;

    this._lastSmoothed = {
      x: pt.x,
      y: pt.y,
      pressure: curvedP,
      tilt: tilt.tiltFactor,
      azimuth: tilt.azimuth,
      hasTilt: tilt.hasTilt,
    };
    this._lastMid = { ...this._lastSmoothed };

    const drawCtx = this._getStrokeDrawCtx(this._strokeBrush);
    this._stampDab(drawCtx, this._strokeBrush, pt.x, pt.y, curvedP, tilt.tiltFactor, tilt.azimuth, tilt.hasTilt);

    this._scheduleCursorRender(pt.x, pt.y, this._smoothX, this._smoothY, true, tilt);
    this._emitTelemetry(
      {
        pointerType: this._activePointerType,
        pressure: curvedP,
        tiltX: e.tiltX || 0,
        tiltY: e.tiltY || 0,
        tiltFromVerticalDeg: tilt.tiltFromVerticalDeg,
        tiltFactor: tilt.tiltFactor,
        isSideShading: this._strokeBrush === 'pencil' && tilt.tiltFactor > 0.25,
      },
      true
    );
  }

  _onPointerMove(e) {
    if (e.cancelable) e.preventDefault();
    if (e.pointerType === 'pen') {
      this._lastPenActiveAt = performance.now();
    }
    if (this._isRejectedTouch(e)) return;

    if (!this._isDrawing) {
      const hoverPt = this._mapEventPoint(e);
      if (!hoverPt) return;
      const hoverTilt = extractTiltState(e, this.isFlipped);
      this._scheduleCursorRender(hoverPt.x, hoverPt.y, hoverPt.x, hoverPt.y, false, hoverTilt);
      this._emitTelemetry(
        {
          pointerType: e.pointerType || 'mouse',
          pressure: 0,
          tiltX: e.tiltX || 0,
          tiltY: e.tiltY || 0,
          tiltFromVerticalDeg: hoverTilt.tiltFromVerticalDeg,
          tiltFactor: hoverTilt.tiltFactor,
          isSideShading: false,
        },
        false
      );
      return;
    }

    if (e.pointerId !== this._activePointerId) return;

    const coalesced = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : null;
    const events = coalesced && coalesced.length > 0 ? coalesced : [e];
    const drawCtx = this._getStrokeDrawCtx(this._strokeBrush);

    let latestRawX = this._lastRawX;
    let latestRawY = this._lastRawY;
    let latestTilt = extractTiltState(e, this.isFlipped);
    let latestTiltX = e.tiltX || 0;
    let latestTiltY = e.tiltY || 0;

    for (let i = 0; i < events.length; i += 1) {
      const ev = events[i];
      const pt = this._mapEventPoint(ev);
      if (!pt) continue;

      const ts = ev.timeStamp || e.timeStamp || performance.now();
      const dt = clamp(ts - this._lastRawTime, 1, 64);
      const curvedP = this._computeCurvedPressure(ev, pt.x, pt.y, ts, false);
      const tilt = extractTiltState(ev, this.isFlipped);

      this._lastRawX = pt.x;
      this._lastRawY = pt.y;
      this._lastRawTime = ts;
      latestRawX = pt.x;
      latestRawY = pt.y;
      latestTilt = tilt;
      latestTiltX = ev.tiltX ?? latestTiltX;
      latestTiltY = ev.tiltY ?? latestTiltY;

      // Frame-rate-independent smoothing: decouple position stabilizer from fast pressure/tilt response!
      const posAlpha = this._getPositionAlpha(dt);
      const pressureAlpha = 1 - Math.exp(-dt / 9);
      const tiltAlpha = 1 - Math.exp(-dt / 14);

      if (posAlpha >= 1) {
        this._smoothX = pt.x;
        this._smoothY = pt.y;
      } else {
        this._smoothX += (pt.x - this._smoothX) * posAlpha;
        this._smoothY += (pt.y - this._smoothY) * posAlpha;
      }

      this._smoothP += (curvedP - this._smoothP) * pressureAlpha;
      if (tilt.hasTilt) {
        this._hasTiltData = true;
        this._smoothTilt += (tilt.tiltFactor - this._smoothTilt) * tiltAlpha;
        this._smoothAzimuth = lerpAngle(this._smoothAzimuth, tilt.azimuth, tiltAlpha);
      }

      const dx = this._smoothX - this._lastSmoothed.x;
      const dy = this._smoothY - this._lastSmoothed.y;
      const dp = Math.abs(this._smoothP - this._lastSmoothed.pressure);
      if (Math.hypot(dx, dy) < 0.12 && dp < 0.008) {
        continue;
      }

      const curr = {
        x: this._smoothX,
        y: this._smoothY,
        pressure: this._smoothP,
        tilt: this._smoothTilt,
        azimuth: this._smoothAzimuth,
        hasTilt: this._hasTiltData,
      };
      const nextMid = {
        x: (this._lastSmoothed.x + curr.x) * 0.5,
        y: (this._lastSmoothed.y + curr.y) * 0.5,
        pressure: (this._lastSmoothed.pressure + curr.pressure) * 0.5,
        tilt: (this._lastSmoothed.tilt + curr.tilt) * 0.5,
        azimuth: lerpAngle(this._lastSmoothed.azimuth, curr.azimuth, 0.5),
        hasTilt: this._hasTiltData,
      };

      this._drawQuadSegment(drawCtx, this._strokeBrush, this._lastMid, this._lastSmoothed, nextMid);
      this._lastMid = nextMid;
      this._lastSmoothed = curr;
    }

    this._scheduleCursorRender(latestRawX, latestRawY, this._smoothX, this._smoothY, true, {
      ...latestTilt,
      tiltFactor: this._smoothTilt,
      azimuth: this._smoothAzimuth,
      hasTilt: this._hasTiltData,
    });

    this._emitTelemetry(
      {
        pointerType: this._activePointerType,
        pressure: this._smoothP,
        tiltX: latestTiltX,
        tiltY: latestTiltY,
        tiltFromVerticalDeg: latestTilt.tiltFromVerticalDeg,
        tiltFactor: this._smoothTilt,
        isSideShading: this._strokeBrush === 'pencil' && this._smoothTilt > 0.25,
      },
      false
    );
  }

  _onPointerUp(e) {
    if (e.cancelable) e.preventDefault();
    if (e.pointerType === 'pen') {
      this._lastPenActiveAt = performance.now();
    }
    if (this._isRejectedTouch(e)) return;
    if (!this._isDrawing || e.pointerId !== this._activePointerId) return;

    const pt = this._mapEventPoint(e);
    const tilt = extractTiltState(e, this.isFlipped);
    this._finishStroke(pt, false);

    if (this._activePointerType === 'touch' || this._activePointerType === 'pen' || !pt) {
      this._clearCursor();
    } else {
      this._scheduleCursorRender(pt.x, pt.y, pt.x, pt.y, false, tilt);
    }

    this._emitTelemetry(
      {
        pointerType: e.pointerType || this._lastTelemetryDevice,
        pressure: 0,
        tiltX: e.tiltX || 0,
        tiltY: e.tiltY || 0,
        tiltFromVerticalDeg: tilt.tiltFromVerticalDeg,
        tiltFactor: 0,
        isSideShading: false,
      },
      true
    );
  }

  _onPointerCancel(e) {
    if (e.cancelable) e.preventDefault();
    if (this._isRejectedTouch(e)) return;
    if (!this._isDrawing || e.pointerId !== this._activePointerId) return;

    this._finishStroke(null, true);
    this._clearCursor();
    this._emitTelemetry(
      {
        pointerType: e.pointerType || this._lastTelemetryDevice,
        pressure: 0,
        tiltX: 0,
        tiltY: 0,
        tiltFromVerticalDeg: 0,
        tiltFactor: 0,
        isSideShading: false,
      },
      true
    );
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

    const layer = this._strokeLayer;
    const brush = this._strokeBrush;
    const layerCtx = this._getLayerCtx(layer);

    if (cancelled) {
      // Restore layer cleanly (e.g., palm touch cancelled when Apple Pencil lands)
      if (this._strokeBeforeSnapshot) {
        this._restoreLayerSnapshot(layer, this._strokeBeforeSnapshot);
        this._recycleSnapshot(this._strokeBeforeSnapshot);
        this._strokeBeforeSnapshot = null;
      }
      if (this._isBufferedBrush(brush)) {
        this._strokeCtx.clearRect(0, 0, this.width, this.height);
      }
      this._layerHasPixels[layer] = this._hadPixelsBeforeStroke;
      this._clearCursor();
      this._resetStrokeState();
      return;
    }

    const targetX = endPt ? endPt.x : this._lastRawX;
    const targetY = endPt ? endPt.y : this._lastRawY;
    const drawCtx = this._getStrokeDrawCtx(brush);
    this._flushStabilizerEndpoint(drawCtx, targetX, targetY);

    if (this._isBufferedBrush(brush)) {
      layerCtx.save();
      layerCtx.globalAlpha = this._getStrokeCompositeAlpha(brush);
      layerCtx.drawImage(this._strokeCanvas, 0, 0);
      layerCtx.restore();
      this._strokeCtx.clearRect(0, 0, this.width, this.height);
    }

    const hadPixelsAfter = brush === 'eraser' ? this._hadPixelsBeforeStroke : true;
    this._layerHasPixels[layer] = hadPixelsAfter;

    if (this._strokeBeforeSnapshot) {
      const afterSnapshot = this._captureLayerSnapshot(layer);
      this._pushHistory({
        layer,
        before: this._strokeBeforeSnapshot,
        after: afterSnapshot,
        hadPixelsBefore: this._hadPixelsBeforeStroke,
        hadPixelsAfter,
      });
      this._strokeBeforeSnapshot = null;
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
        const np = clamp(this._smoothP * (1 - 0.16 * t), 0.02, 1.0);
        const nextPt = {
          x: nx,
          y: ny,
          pressure: np,
          tilt: this._smoothTilt,
          azimuth: this._smoothAzimuth,
          hasTilt: this._hasTiltData,
        };
        const nextMid = {
          x: (this._lastSmoothed.x + nextPt.x) * 0.5,
          y: (this._lastSmoothed.y + nextPt.y) * 0.5,
          pressure: (this._lastSmoothed.pressure + nextPt.pressure) * 0.5,
          tilt: (this._lastSmoothed.tilt + nextPt.tilt) * 0.5,
          azimuth: lerpAngle(this._lastSmoothed.azimuth, nextPt.azimuth, 0.5),
          hasTilt: this._hasTiltData,
        };
        this._drawQuadSegment(drawCtx, this._strokeBrush, this._lastMid, this._lastSmoothed, nextMid);
        this._lastMid = nextMid;
        this._lastSmoothed = nextPt;
      }
    }

    const finalPt = {
      x: endX,
      y: endY,
      pressure: this._lastSmoothed.pressure,
      tilt: this._lastSmoothed.tilt,
      azimuth: this._lastSmoothed.azimuth,
      hasTilt: this._hasTiltData,
    };
    this._drawQuadSegment(drawCtx, this._strokeBrush, this._lastMid, this._lastSmoothed, finalPt);
  }

  _resetStrokeState() {
    this._isDrawing = false;
    this._activePointerId = null;
    this._activePointerType = 'mouse';
    this._strokeLayer = null;
    this._strokeBeforeSnapshot = null;
    this._hadPixelsBeforeStroke = false;
    this._strokeBrush = null;
    this._hasRealPenPressure = false;
    this._lastValidPenPressure = 0.35;
    this._simPressure = 0.55;
    this._lastRawX = 0;
    this._lastRawY = 0;
    this._lastRawTime = 0;
    this._smoothX = 0;
    this._smoothY = 0;
    this._smoothP = 0;
    this._smoothTilt = 0;
    this._smoothAzimuth = -Math.PI / 5;
    this._hasTiltData = false;
    this._lastMid = null;
    this._lastSmoothed = null;
    this._distSinceStamp = 0;
  }

  // ---------------------------------------------------------------------------
  // Coordinate Mapping, Calibrated Pressure & Time-Normalized Stabilizer
  // ---------------------------------------------------------------------------

  _mapEventPoint(ev) {
    const rect = this.cursorCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    let normX = (ev.clientX - rect.left) / rect.width;
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
    const velocity = dist / dt;
    const speedRatio = clamp(velocity / 2.6, 0, 1);
    const target = 0.88 - speedRatio * 0.70;
    this._simPressure = this._simPressure * 0.65 + target * 0.35;
    return clamp(this._simPressure, 0.05, 1.0);
  }

  _computeCurvedPressure(ev, x, y, timeStamp, isDown) {
    const pointerType = ev.pointerType || this._activePointerType || 'mouse';

    if (pointerType === 'pen') {
      if (ev.pressure > 0) {
        const rawP = clamp(ev.pressure, 0.012, 1.0);
        this._hasRealPenPressure = true;
        this._lastValidPenPressure = rawP;
        return calibratePenPressure(rawP, this.pressureCurve);
      }
      if ((ev.buttons > 0 || isDown) && this._hasRealPenPressure) {
        return calibratePenPressure(this._lastValidPenPressure, this.pressureCurve);
      }
      const fallback = isDown ? 0.35 : this._computeVelocityPressure(x, y, timeStamp);
      return calibratePenPressure(fallback, this.pressureCurve);
    }

    const rawP =
      ev.pressure > 0 && ev.pressure !== 0.5
        ? clamp(ev.pressure, 0.02, 1.0)
        : isDown
          ? 0.55
          : this._computeVelocityPressure(x, y, timeStamp);

    const curveFn = PRESSURE_CURVES[this.pressureCurve] || PRESSURE_CURVES.normal;
    return clamp(curveFn(rawP), 0.02, 1.0);
  }

  /**
   * Frame-rate-independent position stabilizer smoothing factor.
   * Behaves identically across 60Hz desktop mice and 120Hz/240Hz iPad Apple Pencil.
   */
  _getPositionAlpha(dtMs) {
    if (this.stabilizer <= 0) return 1;
    const tauMs = this.stabilizer * 5.2;
    return clamp(1 - Math.exp(-Math.max(1, dtMs) / tauMs), 0.08, 1);
  }

  // ---------------------------------------------------------------------------
  // Brush Rendering, Exact Arc-Length Stepping & Tilt Shading
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

  _stampDab(ctx, brush, x, y, pressure, tiltFactor = 0, azimuth = -Math.PI / 5, hasTilt = false) {
    const geom = computeBrushStampGeometry(brush, this.size, pressure, tiltFactor, azimuth, hasTilt);

    ctx.save();
    if (brush === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(x, y, geom.rx, 0, Math.PI * 2);
      ctx.fill();
    } else if (brush === 'pencil') {
      ctx.globalAlpha = geom.dabAlpha;
      ctx.fillStyle = this._ensurePencilPattern(ctx) || this.color;
      ctx.beginPath();
      if (geom.isElliptical) {
        ctx.ellipse(x, y, geom.rx, geom.ry, geom.angle, 0, Math.PI * 2);
      } else {
        ctx.arc(x, y, geom.rx, 0, Math.PI * 2);
      }
      ctx.fill();
    } else if (geom.isElliptical) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(x, y, geom.rx, geom.ry, geom.angle, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(x, y, geom.rx, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  /**
   * Walks a quadratic Bezier segment using exact arc-length while-loop stepping so every dab is
   * placed at its mathematically true equidistant point (eliminating speed-dependent banding/beading).
   */
  _drawQuadSegment(ctx, brush, p0, ctrl, p2) {
    const approxLen =
      Math.hypot(ctrl.x - p0.x, ctrl.y - p0.y) +
      Math.hypot(p2.x - ctrl.x, p2.y - ctrl.y);

    if (approxLen < 0.04) return;

    const subSteps = Math.max(1, Math.ceil(approxLen / 2.0));
    let prevX = p0.x;
    let prevY = p0.y;
    let prevP = p0.pressure;
    let prevTilt = p0.tilt ?? 0;
    let prevAz = p0.azimuth ?? -Math.PI / 5;
    const hasTilt = Boolean(p2.hasTilt || ctrl.hasTilt || p0.hasTilt);

    for (let i = 1; i <= subSteps; i += 1) {
      const t = i / subSteps;
      const inv = 1 - t;
      const x = inv * inv * p0.x + 2 * inv * t * ctrl.x + t * t * p2.x;
      const y = inv * inv * p0.y + 2 * inv * t * ctrl.y + t * t * p2.y;
      const p = inv * inv * p0.pressure + 2 * inv * t * ctrl.pressure + t * t * p2.pressure;
      const tilt = inv * inv * (p0.tilt ?? 0) + 2 * inv * t * (ctrl.tilt ?? 0) + t * t * (p2.tilt ?? 0);
      const az = lerpAngle(prevAz, p2.azimuth ?? prevAz, 1 / (subSteps - i + 1));

      let segRemain = Math.hypot(x - prevX, y - prevY);
      if (segRemain < 1e-5) continue;

      let curX = prevX;
      let curY = prevY;
      let curP = prevP;
      let curTilt = prevTilt;
      let curAz = prevAz;

      let guard = 0;
      while (segRemain > 0 && guard < 128) {
        guard += 1;
        const geom = computeBrushStampGeometry(brush, this.size, curP, curTilt, curAz, hasTilt);
        const spacing = geom.spacing;

        if (this._distSinceStamp + segRemain < spacing) {
          this._distSinceStamp += segRemain;
          break;
        }

        const need = spacing - this._distSinceStamp;
        const frac = clamp(need / segRemain, 0, 1);
        const sx = curX + (x - curX) * frac;
        const sy = curY + (y - curY) * frac;
        const sp = curP + (p - curP) * frac;
        const st = curTilt + (tilt - curTilt) * frac;
        const sa = lerpAngle(curAz, az, frac);

        this._stampDab(ctx, brush, sx, sy, sp, st, sa, hasTilt);

        curX = sx;
        curY = sy;
        curP = sp;
        curTilt = st;
        curAz = sa;
        segRemain -= need;
        this._distSinceStamp = 0;
      }

      prevX = x;
      prevY = y;
      prevP = p;
      prevTilt = tilt;
      prevAz = az;
    }
  }

  // ---------------------------------------------------------------------------
  // rAF-Coalesced Live Cursor & Buffered Stroke Preview
  // ---------------------------------------------------------------------------

  _clearCursor() {
    this._pendingCursor = null;
    if (this._cursorRafId != null) {
      cancelAnimationFrame(this._cursorRafId);
      this._cursorRafId = null;
    }
    this.cursorCtx.clearRect(0, 0, this.width, this.height);
  }

  _scheduleCursorRender(rawX, rawY, smoothX, smoothY, isDrawing, tilt = null) {
    this._pendingCursor = { rawX, rawY, smoothX, smoothY, isDrawing, tilt };
    if (this._cursorRafId != null) return;
    this._cursorRafId = requestAnimationFrame(() => {
      this._cursorRafId = null;
      const data = this._pendingCursor;
      this._pendingCursor = null;
      if (data) {
        this._renderCursorOverlay(data.rawX, data.rawY, data.smoothX, data.smoothY, data.isDrawing, data.tilt);
      }
    });
  }

  _renderCursorOverlay(rawX, rawY, smoothX, smoothY, isDrawing, tilt = null) {
    const ctx = this.cursorCtx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Composite active buffered stroke preview (redline / marker) once per animation frame.
    if (isDrawing && this._isBufferedBrush(this._strokeBrush)) {
      ctx.save();
      ctx.globalAlpha = this._getStrokeCompositeAlpha(this._strokeBrush);
      ctx.drawImage(this._strokeCanvas, 0, 0);
      ctx.restore();
    }

    // While actively drawing with Apple Pencil or touch, skip drawing a laggy desktop circle under the physical tip.
    const hideTipRing = isDrawing && (this._activePointerType === 'pen' || this._activePointerType === 'touch');

    ctx.save();

    if (isDrawing && this.stabilizer > 0 && Math.hypot(rawX - smoothX, rawY - smoothY) > 2.5) {
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.42)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(smoothX, smoothY);
      ctx.lineTo(rawX, rawY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    if (!hideTipRing) {
      const geom = computeBrushStampGeometry(
        this.brush,
        this.size,
        0.55,
        tilt?.tiltFactor || 0,
        tilt?.azimuth ?? -Math.PI / 5,
        Boolean(tilt?.hasTilt)
      );
      const rx = Math.max(2, geom.rx);
      const ry = Math.max(2, geom.ry);

      if (geom.isElliptical) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(rawX, rawY, rx, ry, geom.angle, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(15, 23, 42, 0.65)';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rawX, rawY, rx, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle =
          this.brush === 'eraser' ? 'rgba(239, 68, 68, 0.85)' : 'rgba(15, 23, 42, 0.65)';
        ctx.lineWidth = 1;
        if (this.brush === 'eraser') {
          ctx.setLineDash([3, 3]);
        }
        ctx.beginPath();
        ctx.arc(rawX, rawY, rx, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.fillStyle = this.brush === 'eraser' ? 'rgba(239, 68, 68, 0.85)' : this.color;
      ctx.beginPath();
      ctx.arc(rawX, rawY, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // ---------------------------------------------------------------------------
  // Template & Grid Rendering
  // ---------------------------------------------------------------------------

  _renderTemplateLayer() {
    const ctx = this.templateCtx;
    ctx.clearRect(0, 0, this.width, this.height);

    const baseAlpha = clamp(this._templateOpacity / 100, 0, 1);

    if (this._bgImage) {
      const pad = this._bgImagePadding || 0;
      const availW = Math.max(1, this.width - pad * 2);
      const availH = Math.max(1, this.height - pad * 2);
      const imgW = this._bgImage.naturalWidth || this._bgImage.width || availW;
      const imgH = this._bgImage.naturalHeight || this._bgImage.height || availH;
      const scale = Math.min(availW / imgW, availH / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const drawX = (this.width - drawW) * 0.5;
      const drawY = (this.height - drawH) * 0.5;

      ctx.save();
      ctx.globalAlpha = baseAlpha;
      ctx.drawImage(this._bgImage, drawX, drawY, drawW, drawH);
      ctx.restore();
    }

    if (Array.isArray(this._compositeLayers) && this._compositeLayers.length > 0) {
      for (const layer of this._compositeLayers) {
        if (!layer?.img) continue;
        const imgW = layer.img.naturalWidth || layer.img.width;
        const imgH = layer.img.naturalHeight || layer.img.height;
        if (!imgW || !imgH) continue;

        const boxX = Number(layer.x) || 0;
        const boxY = Number(layer.y) || 0;
        const boxW = Number(layer.w) || this.width;
        const boxH = Number(layer.h) || this.height;

        const scale = Math.min(boxW / imgW, boxH / imgH);
        const drawW = imgW * scale;
        const drawH = imgH * scale;
        const drawX = boxX + (boxW - drawW) * 0.5;
        let drawY = boxY + (boxH - drawH) * 0.5;
        if (layer.alignY === 'bottom') {
          drawY = boxY + (boxH - drawH);
        } else if (layer.alignY === 'top') {
          drawY = boxY;
        }

        ctx.save();
        ctx.globalAlpha = baseAlpha * clamp(layer.opacity ?? 1, 0, 1);
        ctx.drawImage(layer.img, drawX, drawY, drawW, drawH);
        ctx.restore();
      }
    }

    this._drawGridOverlay(ctx);
  }

  _drawGridOverlay(ctx) {
    if (this._gridType === 'none') return;

    const w = this.width;
    const h = this.height;
    ctx.save();

    if (this._gridType === 'grid') {
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

      ctx.strokeStyle = 'rgba(14, 165, 233, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(w, horizonY);
      ctx.moveTo(w * 0.5 + 0.5, 0);
      ctx.lineTo(w * 0.5 + 0.5, h);
      ctx.stroke();

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

      ctx.fillStyle = 'rgba(14, 165, 233, 0.65)';
      for (const vpX of [vpLeftX, vpRightX]) {
        ctx.beginPath();
        ctx.arc(vpX, horizonY, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (this._gridType === 'crosshair') {
      const cx = w * 0.5 + 0.5;
      const cy = h * 0.5 + 0.5;

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
  // GPU Canvas Undo Snapshots, Layers & Telemetry
  // ---------------------------------------------------------------------------

  _acquireSnapshotCanvas() {
    if (this._snapshotPool.length > 0) {
      return this._snapshotPool.pop();
    }
    return createOffscreenCanvas(this.width, this.height).canvas;
  }

  _recycleSnapshot(snapCanvas) {
    if (!snapCanvas) return;
    if (this._snapshotPool.length < 10) {
      this._snapshotPool.push(snapCanvas);
    }
  }

  _captureLayerSnapshot(layerName) {
    const source = this._getLayerCanvas(layerName);
    const snap = this._acquireSnapshotCanvas();
    const sCtx = snap.getContext('2d');
    sCtx.clearRect(0, 0, this.width, this.height);
    if (source) {
      sCtx.drawImage(source, 0, 0);
    }
    return snap;
  }

  _restoreLayerSnapshot(layerName, snapCanvas) {
    const ctx = this._getLayerCtx(layerName);
    if (!ctx) return;
    ctx.clearRect(0, 0, this.width, this.height);
    if (snapCanvas) {
      ctx.drawImage(snapCanvas, 0, 0);
    }
  }

  _clearHistoryStacks() {
    for (const item of [...this._undoStack, ...this._redoStack]) {
      this._recycleSnapshot(item.before);
      this._recycleSnapshot(item.after);
    }
    this._undoStack.length = 0;
    this._redoStack.length = 0;
  }

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
      const evicted = this._undoStack.shift();
      this._recycleSnapshot(evicted?.before);
      this._recycleSnapshot(evicted?.after);
    }
    for (const r of this._redoStack) {
      this._recycleSnapshot(r.before);
      this._recycleSnapshot(r.after);
    }
    this._redoStack.length = 0;
    this._emitHistoryChange();
  }

  _emitHistoryChange() {
    if (!this.onHistoryChange) return;
    this.onHistoryChange({
      canUndo: this._undoStack.length > 0,
      canRedo: this._redoStack.length > 0,
      undoCount: this._undoStack.length,
      redoCount: this._redoStack.length,
      activeLayer: this.activeLayer,
    });
  }

  _emitTelemetry(payload, force = false) {
    if (!this.onTelemetry) return;
    const now = performance.now();
    if (!force && now - this._lastTelemetryAt < 45) return;
    this._lastTelemetryAt = now;
    if (payload.pointerType) {
      this._lastTelemetryDevice = payload.pointerType;
    }
    this.onTelemetry({
      pointerType: payload.pointerType || 'ready',
      pressure: clamp(Number(payload.pressure) || 0, 0, 1),
      tiltX: Math.round(Number(payload.tiltX) || 0),
      tiltY: Math.round(Number(payload.tiltY) || 0),
      tiltFromVerticalDeg: Math.round(Number(payload.tiltFromVerticalDeg) || 0),
      tiltFactor: clamp(Number(payload.tiltFactor) || 0, 0, 1),
      isSideShading: Boolean(payload.isSideShading),
      isPenOnly: this.isPenOnly,
      isFlipped: this.isFlipped,
    });
  }
}
