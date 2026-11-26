/**
 * DrawPath Studio · Declarative Teaching Diagram Renderer
 * Replaces raw inline `<svg><image href="..."/></svg>` hacks with semantic,
 * responsive HTML/CSS diagram cards, crisp transparent WebP plates, exact math SVGs,
 * accessible modal lightbox zoom, and 1-click pinning to the canvas reference board.
 */

import { icon, infoTip } from './icons.js';

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const TONE_CLASSES = {
  blue: 'diagram-tone-blue',
  red: 'diagram-tone-red',
  green: 'diagram-tone-green',
  ink: 'diagram-tone-ink',
};

/**
 * Renders a lesson's Step 1 structured diagram deck into clean responsive HTML.
 * @param {Object|null} spec - Entry from LESSON_DIAGRAM_MANIFEST
 * @param {Object} options
 * @param {string} [options.customDiagramUrl] - User-uploaded custom artist replacement image
 * @param {string} [options.fallbackSvg] - Legacy fallback SVG string if lesson not in manifest
 * @param {string} [options.lessonTitle]
 * @returns {string}
 */
export function renderLessonDiagramHTML(spec, { customDiagramUrl = '', fallbackSvg = '', lessonTitle = '' } = {}) {
  if (customDiagramUrl) {
    return `
      <div class="diagram-deck diagram-deck-custom">
        <div class="diagram-custom-stage">
          <img
            src="${escapeHtml(customDiagramUrl)}"
            alt="${escapeHtml(lessonTitle)} 自定义画师示意图"
            class="custom-diagram-img"
            decoding="async"
          >
        </div>
        <div class="diagram-custom-actions">
          <button type="button" class="btn btn-sm" data-diagram-zoom="custom" data-zoom-src="${escapeHtml(customDiagramUrl)}" data-zoom-title="${escapeHtml(lessonTitle)} · 自定义画师图">${icon('zoom-in')} 放大查看</button>
          <button type="button" class="btn btn-sm" data-diagram-pin="${escapeHtml(customDiagramUrl)}" data-pin-label="${escapeHtml(lessonTitle)} 自定义参考">${icon('pin')} 钉入参考小窗</button>
        </div>
      </div>
    `;
  }

  if (!spec) {
    return `<div class="cheatsheet-svg-wrap">${fallbackSvg || ''}</div>`;
  }

  const creditTipHtml = spec.credit
    ? `<span class="diagram-credit-label">图源 ${infoTip(
        `diagram-credit-${spec.lessonId || 'deck'}`,
        '查看参考图来源与版权授权',
        escapeHtml(spec.credit)
      )}</span>`
    : '';

  // Case 1: Procedural exact mathematical SVG (core-1..2)
  if (spec.layout === 'procedural' && typeof spec.renderSvg === 'function') {
    const svgMarkup = spec.renderSvg();
    return `
      <div class="diagram-deck diagram-deck-procedural" data-source-type="${escapeHtml(spec.sourceType || 'procedural')}">
        <div class="diagram-deck-bar">
          ${creditTipHtml || '<span></span>'}
          <button type="button" class="diagram-action-btn" data-diagram-zoom="procedural" data-zoom-title="${escapeHtml(spec.title || lessonTitle)}" title="放大查看">${icon('zoom-in')} 放大</button>
        </div>
        <div class="diagram-svg-surface" data-diagram-zoom-source="procedural">
          ${svgMarkup}
        </div>
      </div>
    `;
  }

  // Case 2: Multi-panel studio references, anatomical plates & hybrid math SVG cards
  const panels = Array.isArray(spec.panels) ? spec.panels : [];
  const cols = spec.columns || Math.min(3, Math.max(1, panels.length));

  const panelsHtml = panels
    .map((panel) => {
      const toneClass = TONE_CLASSES[panel.tone] || TONE_CLASSES.blue;
      const wideClass = panel.wide ? ' diagram-panel-wide' : '';
      const panelTitle = `${spec.title || lessonTitle} · ${panel.badge || ''}`;
      let mediaHtml = '';
      let pinBtnHtml = '';

      if (panel.kind === 'image' && panel.imageUrl) {
        const wAttr = panel.width ? `width="${panel.width}"` : '';
        const hAttr = panel.height ? `height="${panel.height}"` : '';
        mediaHtml = `
          <div class="diagram-plate-stage" data-panel-id="${escapeHtml(panel.id || '')}">
            <img
              src="${escapeHtml(panel.imageUrl)}"
              alt="${escapeHtml(panel.alt || panelTitle)}"
              ${wAttr} ${hAttr}
              decoding="async"
              class="diagram-plate-img"
            >
          </div>
        `;
        pinBtnHtml = `<button type="button" class="diagram-mini-btn" data-diagram-pin="${escapeHtml(panel.imageUrl)}" data-pin-label="${escapeHtml(panel.badge || lessonTitle)}" title="钉到画板角落悬浮参考窗">${icon('pin')} 参考窗</button>`;
      } else if (panel.kind === 'svg' && typeof panel.renderSvg === 'function') {
        mediaHtml = `
          <div class="diagram-plate-stage diagram-plate-stage-svg" data-panel-id="${escapeHtml(panel.id || '')}" data-diagram-zoom-source="${escapeHtml(panel.id || '')}">
            ${panel.renderSvg()}
          </div>
        `;
      }

      const zoomBtnAttrs =
        panel.kind === 'image' && panel.imageUrl
          ? `data-diagram-zoom="image" data-zoom-src="${escapeHtml(panel.imageUrl)}" data-zoom-title="${escapeHtml(panelTitle)}" data-zoom-caption="${escapeHtml(panel.caption || '')}"`
          : `data-diagram-zoom="panel-svg" data-zoom-panel-id="${escapeHtml(panel.id || '')}" data-zoom-title="${escapeHtml(panelTitle)}" data-zoom-caption="${escapeHtml(panel.caption || '')}"`;

      return `
        <figure class="diagram-panel ${toneClass}${wideClass}">
          <div class="diagram-panel-header">
            <span class="diagram-panel-badge">${escapeHtml(panel.badge || '')}</span>
            <div class="diagram-panel-actions">
              ${pinBtnHtml}
              <button type="button" class="diagram-mini-btn" ${zoomBtnAttrs} title="放大查看">${icon('zoom-in')} 放大</button>
            </div>
          </div>
          ${mediaHtml}
          ${panel.caption ? `<figcaption class="diagram-panel-caption">${escapeHtml(panel.caption)}</figcaption>` : ''}
        </figure>
      `;
    })
    .join('');

  return `
    <div class="diagram-deck diagram-deck-multi" data-source-type="${escapeHtml(spec.sourceType || 'studio-ref')}">
      ${creditTipHtml ? `<div class="diagram-deck-bar">${creditTipHtml}</div>` : ''}
      <div class="diagram-panels-grid diagram-cols-${cols}">
        ${panelsHtml}
      </div>
    </div>
  `;
}
