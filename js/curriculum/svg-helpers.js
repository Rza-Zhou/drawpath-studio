/**
 * DrawPath Studio · SVG 结构速查图与 1200x900 练习底图共享构建器
 * 提高辅助线清晰度与对比度，并支持红蓝数码板绘双栏对比布局
 */

export const SVG_FONT = "system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif";

export function escapeXML(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function wrapTemplateSVG(title, subtitle, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" font-family="${SVG_FONT}">
  <defs>
    <marker id="tpl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" fill-opacity="0.88"/>
    </marker>
    <marker id="tpl-arrow-indigo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#4f46e5" fill-opacity="0.88"/>
    </marker>
    <marker id="tpl-arrow-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#059669" fill-opacity="0.9"/>
    </marker>
    <marker id="tpl-arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706" fill-opacity="0.9"/>
    </marker>
    <marker id="tpl-arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#e11d48" fill-opacity="0.88"/>
    </marker>
  </defs>
  <g stroke="#0284c7" stroke-opacity="0.55" stroke-width="1.8" fill="none">
    <path d="M24 44 L24 24 L44 24"/>
    <path d="M1156 24 L1176 24 L1176 44"/>
    <path d="M24 856 L24 876 L44 876"/>
    <path d="M1156 876 L1176 876 L1176 856"/>
  </g>
  <text x="48" y="42" font-size="16" font-weight="700" fill="#0369a1" fill-opacity="0.92">${escapeXML(title)}</text>
  <text x="48" y="64" font-size="12.5" fill="#334155" fill-opacity="0.88">${escapeXML(subtitle)}</text>
  <line x1="48" y1="74" x2="1152" y2="74" stroke="#0284c7" stroke-opacity="0.38" stroke-width="1.2"/>
  ${body}
</svg>`;
}

export function wrapCheatSheetSVG(wrongTitle, rightTitle, wrongBody, rightBody) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" font-family="${SVG_FONT}">
  <defs>
    <marker id="cs-arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626"/>
    </marker>
    <marker id="cs-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#16a34a"/>
    </marker>
    <marker id="cs-arrow-indigo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#4f46e5"/>
    </marker>
    <marker id="cs-arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706"/>
    </marker>
    <marker id="cs-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7"/>
    </marker>
  </defs>
  <rect x="10" y="10" width="376" height="300" rx="14" fill="#fff5f5" stroke="#fecaca" stroke-width="1.5"/>
  <rect x="20" y="20" width="356" height="30" rx="8" fill="#fee2e2"/>
  <text x="32" y="40" font-size="13.5" font-weight="700" fill="#b91c1c">× ${escapeXML(wrongTitle)}</text>
  <g transform="translate(20, 58)">
    ${wrongBody}
  </g>
  <circle cx="400" cy="160" r="15" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="400" y="165" font-size="14" font-weight="700" fill="#475569" text-anchor="middle">→</text>
  <rect x="414" y="10" width="376" height="300" rx="14" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.5"/>
  <rect x="424" y="20" width="356" height="30" rx="8" fill="#dcfce7"/>
  <text x="436" y="40" font-size="13.5" font-weight="700" fill="#15803d">✓ ${escapeXML(rightTitle)}</text>
  <g transform="translate(424, 58)">
    ${rightBody}
  </g>
</svg>`;
}

/**
 * 清晰数码板绘红蓝线稿风 · 双栏结构图容器
 * 支持自定义左右徽章色（如「日系 Kemono vs 美系 Furry」或「红蓝骨架 → 黑线正稿」）
 */
export function wrapRedBlueCheatSheetSVG({
  leftTitle,
  rightTitle,
  leftBody,
  rightBody,
  leftTone = 'blue',
  rightTone = 'ink',
  connector = 'vs',
}) {
  const tones = {
    blue: { bg: '#f8fbff', border: '#bae6fd', headerBg: '#e0f2fe', text: '#0369a1' },
    red: { bg: '#fff8f9', border: '#fecdd3', headerBg: '#ffe4e6', text: '#be123c' },
    green: { bg: '#f6fef9', border: '#bbf7d0', headerBg: '#dcfce7', text: '#15803d' },
    ink: { bg: '#ffffff', border: '#cbd5e1', headerBg: '#f1f5f9', text: '#0f172a' },
  };
  const lt = tones[leftTone] || tones.blue;
  const rt = tones[rightTone] || tones.ink;
  const midLabel = connector === 'arrow' ? '→' : 'VS';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" font-family="${SVG_FONT}">
  <defs>
    <marker id="rb-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7"/>
    </marker>
    <marker id="rb-arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#e11d48"/>
    </marker>
    <marker id="rb-arrow-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
    </marker>
  </defs>
  <rect x="10" y="10" width="376" height="300" rx="14" fill="${lt.bg}" stroke="${lt.border}" stroke-width="1.5"/>
  <rect x="20" y="20" width="356" height="30" rx="8" fill="${lt.headerBg}"/>
  <text x="32" y="40" font-size="13" font-weight="700" fill="${lt.text}">${escapeXML(leftTitle)}</text>
  <g transform="translate(20, 58)">
    ${leftBody}
  </g>
  <circle cx="400" cy="160" r="15" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="400" y="164" font-size="${connector === 'arrow' ? '14' : '10.5'}" font-weight="800" fill="#334155" text-anchor="middle">${midLabel}</text>
  <rect x="414" y="10" width="376" height="300" rx="14" fill="${rt.bg}" stroke="${rt.border}" stroke-width="1.5"/>
  <rect x="424" y="20" width="356" height="30" rx="8" fill="${rt.headerBg}"/>
  <text x="436" y="40" font-size="13" font-weight="700" fill="${rt.text}">${escapeXML(rightTitle)}</text>
  <g transform="translate(424, 58)">
    ${rightBody}
  </g>
</svg>`;
}
