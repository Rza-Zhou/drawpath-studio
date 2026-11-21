/**
 * DrawPath Studio · Exact 2D Projective & 3D Camera Math Engine
 * Zero external dependencies. Provides mathematically exact:
 *   - 3D perspective/orthographic camera projection & Euler transforms
 *   - Closed polyhedron projection with automatic visible/X-ray hidden edge classification
 *   - Tapered 3D cylinder / frustum projection with exact silhouette tangents & front/back contour rings
 *   - Sphere projection with clipped front/back meridians, parallels, terminator curve & ground cast shadow
 *   - 2D 3x3 Projective Homography for exact tangent ellipses inscribed in arbitrary perspective quads
 */

export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

export function fmt(n, digits = 2) {
  if (!Number.isFinite(n)) return '0';
  const v = Number(n.toFixed(digits));
  return Object.is(v, -0) ? '0' : String(v);
}

// ---------------------------------------------------------------------------
// 3D Vector Helpers
// ---------------------------------------------------------------------------

export function vec3(x = 0, y = 0, z = 0) {
  return { x, y, z };
}

export function add3(a, b) {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function sub3(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

export function scale3(v, s) {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}

export function dot3(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function cross3(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

export function len3(v) {
  return Math.hypot(v.x, v.y, v.z);
}

export function norm3(v) {
  const l = len3(v);
  if (l < 1e-9) return { x: 0, y: 0, z: 1 };
  return { x: v.x / l, y: v.y / l, z: v.z / l };
}

export function rotX(p, rad) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}

export function rotY(p, rad) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
}

export function rotZ(p, rad) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return { x: p.x * c - p.y * s, y: p.x * s + p.y * c, z: p.z };
}

/**
 * Transforms a local 3D point using scale -> rotX -> rotY -> rotZ -> translate.
 * Angles are in degrees. Y-up right-handed coordinate system (screen Y points down after projection).
 */
export function transformPoint(p, xform = {}) {
  const sx = xform.sx ?? xform.scale ?? 1;
  const sy = xform.sy ?? xform.scale ?? 1;
  const sz = xform.sz ?? xform.scale ?? 1;
  let v = { x: p.x * sx, y: p.y * sy, z: p.z * sz };
  if (xform.rx) v = rotX(v, degToRad(xform.rx));
  if (xform.ry) v = rotY(v, degToRad(xform.ry));
  if (xform.rz) v = rotZ(v, degToRad(xform.rz));
  if (xform.tx || xform.ty || xform.tz) {
    v = { x: v.x + (xform.tx || 0), y: v.y + (xform.ty || 0), z: v.z + (xform.tz || 0) };
  }
  return v;
}

export function transformNormal(n, xform = {}) {
  let v = { ...n };
  if (xform.rx) v = rotX(v, degToRad(xform.rx));
  if (xform.ry) v = rotY(v, degToRad(xform.ry));
  if (xform.rz) v = rotZ(v, degToRad(xform.rz));
  return norm3(v);
}

// ---------------------------------------------------------------------------
// 3D Camera (Right-handed Y-up; camera sits at +Z looking toward origin)
// ---------------------------------------------------------------------------

export function createCamera({
  cx = 0,
  cy = 0,
  focal = 720,
  dist = 650,
  pitch = 0, // degrees, positive pitches camera UP (looking down at object)
  yaw = 0,   // degrees, positive rotates camera RIGHT
  roll = 0,
  ortho = false,
  orthoScale = 1,
} = {}) {
  const pRad = degToRad(pitch);
  const yRad = degToRad(yaw);
  const rRad = degToRad(roll);

  function worldToView(p) {
    let v = rotY(p, -yRad);
    v = rotX(v, pRad);
    if (rRad) v = rotZ(v, -rRad);
    return v;
  }

  function project(p) {
    const v = worldToView(p);
    if (ortho) {
      return {
        x: cx + v.x * orthoScale,
        y: cy - v.y * orthoScale,
        z: v.z,
        depth: dist - v.z,
        scale: orthoScale,
        vx: v.x,
        vy: v.y,
        vz: v.z,
      };
    }
    const depth = Math.max(25, dist - v.z);
    const scale = focal / depth;
    return {
      x: cx + v.x * scale,
      y: cy - v.y * scale,
      z: v.z,
      depth,
      scale,
      vx: v.x,
      vy: v.y,
      vz: v.z,
    };
  }

  /** Returns unit view vector pointing FROM world point p TOWARD camera (in view space). */
  function viewDirAtViewPoint(vp) {
    if (ortho) return { x: 0, y: 0, z: 1 };
    return norm3({ x: -vp.vx, y: -vp.vy, z: dist - vp.vz });
  }

  function normalToView(n) {
    let v = rotY(n, -yRad);
    v = rotX(v, pRad);
    if (rRad) v = rotZ(v, -rRad);
    return norm3(v);
  }

  return { cx, cy, focal, dist, ortho, orthoScale, worldToView, project, viewDirAtViewPoint, normalToView };
}

// ---------------------------------------------------------------------------
// Path & Geometry Utilities
// ---------------------------------------------------------------------------

export function pointsToSvgPath(pts, closed = false) {
  if (!pts || pts.length === 0) return '';
  const parts = [`M${fmt(pts[0].x)} ${fmt(pts[0].y)}`];
  for (let i = 1; i < pts.length; i += 1) {
    parts.push(`L${fmt(pts[i].x)} ${fmt(pts[i].y)}`);
  }
  if (closed) parts.push('Z');
  return parts.join(' ');
}

export function splitPolylineByVisibility(samples, closed = false) {
  const visible = [];
  const hidden = [];
  const count = samples.length;
  if (count < 2) return { visible, hidden };

  let curList = null;
  let curSeg = [];

  const totalSteps = closed ? count : count - 1;
  for (let i = 0; i < totalSteps; i += 1) {
    const a = samples[i];
    const b = samples[(i + 1) % count];
    const isVis = a.visible && b.visible;
    const target = isVis ? visible : hidden;

    if (curList !== target) {
      if (curSeg.length >= 2) curList.push(curSeg);
      curList = target;
      curSeg = [a, b];
    } else {
      curSeg.push(b);
    }
  }
  if (curSeg.length >= 2 && curList) curList.push(curSeg);

  // Merge wrap-around segments on closed curves so continuous arcs don't split at index 0
  if (closed) {
    for (const list of [visible, hidden]) {
      if (list.length >= 2) {
        const first = list[0];
        const last = list[list.length - 1];
        if (last[last.length - 1] === first[0]) {
          list[0] = [...last.slice(0, -1), ...first];
          list.pop();
        }
      }
    }
  }

  return { visible, hidden };
}

// ---------------------------------------------------------------------------
// 2D Projective Homography: Exact Tangent Ellipse inside Arbitrary Quad
// ---------------------------------------------------------------------------

function solveLinearSystem8(A, b) {
  const n = 8;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col += 1) {
    let pivot = col;
    for (let r = col + 1; r < n; r += 1) {
      if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
    }
    if (Math.abs(M[pivot][col]) < 1e-12) return null;
    if (pivot !== col) {
      const tmp = M[col];
      M[col] = M[pivot];
      M[pivot] = tmp;
    }
    const div = M[col][col];
    for (let c = col; c <= n; c += 1) M[col][c] /= div;
    for (let r = 0; r < n; r += 1) {
      if (r === col) continue;
      const factor = M[r][col];
      if (Math.abs(factor) < 1e-15) continue;
      for (let c = col; c <= n; c += 1) {
        M[r][c] -= factor * M[col][c];
      }
    }
  }
  return M.map((row) => row[n]);
}

/**
 * Computes the exact 3x3 homography H mapping unit square:
 *   (-1,-1)->p0, (1,-1)->p1, (1,1)->p2, (-1,1)->p3
 */
export function computeQuadHomography(p0, p1, p2, p3) {
  const src = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];
  const dst = [p0, p1, p2, p3];
  const A = [];
  const b = [];
  for (let i = 0; i < 4; i += 1) {
    const [u, v] = src[i];
    const { x, y } = dst[i];
    A.push([u, v, 1, 0, 0, 0, -u * x, -v * x]);
    b.push(x);
    A.push([0, 0, 0, u, v, 1, -u * y, -v * y]);
    b.push(y);
  }
  const h = solveLinearSystem8(A, b);
  if (!h) return null;
  const H = [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], 1];

  return function mapUV(u, v) {
    const w = H[6] * u + H[7] * v + H[8];
    return {
      x: (H[0] * u + H[1] * v + H[2]) / w,
      y: (H[3] * u + H[4] * v + H[5]) / w,
    };
  };
}

/**
 * Generates an exact mathematically tangent perspective ellipse inside quad [p0,p1,p2,p3].
 * Also returns the true perspective center (diagonal intersection) and the 4 tangent touchpoints.
 */
export function inscribeEllipseInQuad(p0, p1, p2, p3, segments = 64) {
  const mapUV = computeQuadHomography(p0, p1, p2, p3);
  if (!mapUV) return null;

  const points = [];
  for (let i = 0; i < segments; i += 1) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(mapUV(Math.cos(theta), Math.sin(theta)));
  }

  return {
    points,
    pathD: pointsToSvgPath(points, true),
    center: mapUV(0, 0),
    tangents: [
      mapUV(0, -1), // top edge midpoint
      mapUV(1, 0),  // right edge midpoint
      mapUV(0, 1),  // bottom edge midpoint
      mapUV(-1, 0), // left edge midpoint
    ],
    mapUV,
  };
}

// ---------------------------------------------------------------------------
// 3D Closed Polyhedron Projector (Boxes, Wedges, Prisms, Chamfered Cubes)
// ---------------------------------------------------------------------------

/**
 * Creates a centered 3D box mesh (CCW outward winding in right-handed Y-up coords).
 */
export function createBoxMesh(w = 100, h = 100, d = 100) {
  const hw = w / 2;
  const hh = h / 2;
  const hd = d / 2;
  const vertices = [
    { x: -hw, y: -hh, z: -hd }, // 0: L B Back
    { x: hw, y: -hh, z: -hd },  // 1: R B Back
    { x: hw, y: hh, z: -hd },   // 2: R T Back
    { x: -hw, y: hh, z: -hd },  // 3: L T Back
    { x: -hw, y: -hh, z: hd },  // 4: L B Front
    { x: hw, y: -hh, z: hd },   // 5: R B Front
    { x: hw, y: hh, z: hd },    // 6: R T Front
    { x: -hw, y: hh, z: hd },   // 7: L T Front
  ];
  const faces = [
    { name: 'front', indices: [4, 5, 6, 7] },
    { name: 'back', indices: [1, 0, 3, 2] },
    { name: 'right', indices: [5, 1, 2, 6] },
    { name: 'left', indices: [0, 4, 7, 3] },
    { name: 'top', indices: [7, 6, 2, 3] },
    { name: 'bottom', indices: [0, 1, 5, 4] },
  ];
  return { vertices, faces };
}

/**
 * Projects any closed 3D polyhedron mesh and classifies faces (front/back)
 * and unique edges (visible vs X-ray hidden).
 */
export function projectPolyMesh(mesh, cam, xform = {}) {
  const worldVerts = mesh.vertices.map((v) => transformPoint(v, xform));
  const projVerts = worldVerts.map((v) => cam.project(v));

  const edgeMap = new Map();
  const faceResults = [];

  for (let fi = 0; fi < mesh.faces.length; fi += 1) {
    const face = mesh.faces[fi];
    const idxs = face.indices;
    const p0 = worldVerts[idxs[0]];
    const p1 = worldVerts[idxs[1]];
    const p2 = worldVerts[idxs[2]];

    // World outward normal via Newell-safe cross product
    const normalWorld = norm3(cross3(sub3(p1, p0), sub3(p2, p0)));
    const centerWorld = idxs.reduce(
      (acc, idx) => ({
        x: acc.x + worldVerts[idx].x / idxs.length,
        y: acc.y + worldVerts[idx].y / idxs.length,
        z: acc.z + worldVerts[idx].z / idxs.length,
      }),
      { x: 0, y: 0, z: 0 }
    );
    const centerProj = cam.project(centerWorld);
    const viewDir = cam.viewDirAtViewPoint(centerProj);
    const normalView = cam.normalToView(normalWorld);
    const facing = dot3(normalView, viewDir);
    const visible = facing > 1e-4;

    const pts2d = idxs.map((i) => projVerts[i]);
    faceResults.push({
      name: face.name || `face-${fi}`,
      tone: face.tone || null,
      indices: idxs,
      pts2d,
      pathD: pointsToSvgPath(pts2d, true),
      normalWorld,
      normalView,
      facing,
      visible,
      depth: centerProj.depth,
    });

    for (let k = 0; k < idxs.length; k += 1) {
      const a = idxs[k];
      const b = idxs[(k + 1) % idxs.length];
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (!edgeMap.has(key)) {
        edgeMap.set(key, { a, b, visibleCount: 0, totalCount: 0 });
      }
      const rec = edgeMap.get(key);
      rec.totalCount += 1;
      if (visible) rec.visibleCount += 1;
    }
  }

  // Painter's sort back-to-front
  faceResults.sort((a, b) => b.depth - a.depth);

  const visibleEdges = [];
  const hiddenEdges = [];
  const silhouetteEdges = [];
  for (const edge of edgeMap.values()) {
    const seg = { a: projVerts[edge.a], b: projVerts[edge.b], idxA: edge.a, idxB: edge.b };
    if (edge.visibleCount > 0) {
      visibleEdges.push(seg);
      if (edge.visibleCount === 1 && edge.totalCount >= 2) {
        silhouetteEdges.push(seg);
      }
    } else {
      hiddenEdges.push(seg);
    }
  }

  return {
    worldVerts,
    projVerts,
    faces: faceResults,
    visibleFaces: faceResults.filter((f) => f.visible),
    visibleEdges,
    hiddenEdges,
    silhouetteEdges,
  };
}

// ---------------------------------------------------------------------------
// 3D Tapered Cylinder / Frustum with Exact Silhouette Tangents & Rings
// ---------------------------------------------------------------------------

/**
 * Projects a 3D tapered cylinder aligned along its local Y axis (from -h/2 to +h/2)
 * transformed by xform. Computes:
 *  - Exact top & bottom cap rings (split by visibility if not visible cap)
 *  - Exact intermediate C-contour cross-section rings (front visible / back dashed)
 *  - Exact left & right silhouette tangent segments connecting the top & bottom caps
 */
export function projectTaperedCylinder({
  rTop = 40,
  rBot = 40,
  height = 140,
  rings = [0.5],
  segments = 64,
  xform = {},
  cam,
}) {
  const halfH = height / 2;
  const topCenterW = transformPoint({ x: 0, y: halfH, z: 0 }, xform);
  const botCenterW = transformPoint({ x: 0, y: -halfH, z: 0 }, xform);
  const topCenterP = cam.project(topCenterW);
  const botCenterP = cam.project(botCenterW);

  const topNormW = transformNormal({ x: 0, y: 1, z: 0 }, xform);
  const topNormV = cam.normalToView(topNormW);
  const topCapVisible = dot3(topNormV, cam.viewDirAtViewPoint(topCenterP)) > 0;
  const botCapVisible = dot3(scale3(topNormV, -1), cam.viewDirAtViewPoint(botCenterP)) > 0;

  function sampleRing(t) {
    // t=0 is bottom (-halfH), t=1 is top (+halfH)
    const yLocal = -halfH + t * height;
    const radius = rBot + (rTop - rBot) * t;
    const pts = [];
    for (let i = 0; i < segments; i += 1) {
      const ang = (i / segments) * Math.PI * 2;
      const localP = { x: Math.cos(ang) * radius, y: yLocal, z: Math.sin(ang) * radius };
      const worldP = transformPoint(localP, xform);
      const projP = cam.project(worldP);
      const localN = { x: Math.cos(ang), y: 0, z: Math.sin(ang) };
      const worldN = transformNormal(localN, xform);
      const viewN = cam.normalToView(worldN);
      const viewDir = cam.viewDirAtViewPoint(projP);
      const visible = dot3(viewN, viewDir) >= -0.02;
      pts.push({ ...projP, visible, angle: ang, world: worldP });
    }
    return pts;
  }

  const topPts = sampleRing(1);
  const botPts = sampleRing(0);

  // Exact silhouette tangent points: project onto 2D axis perpendicular and take extrema.
  const axisDx = topCenterP.x - botCenterP.x;
  const axisDy = topCenterP.y - botCenterP.y;
  const axisLen = Math.hypot(axisDx, axisDy);
  const perpX = axisLen > 1e-4 ? -axisDy / axisLen : 1;
  const perpY = axisLen > 1e-4 ? axisDx / axisLen : 0;

  function findExtrema(pts, center) {
    let minVal = Infinity;
    let maxVal = -Infinity;
    let minPt = pts[0];
    let maxPt = pts[0];
    for (const p of pts) {
      const proj = (p.x - center.x) * perpX + (p.y - center.y) * perpY;
      if (proj < minVal) {
        minVal = proj;
        minPt = p;
      }
      if (proj > maxVal) {
        maxVal = proj;
        maxPt = p;
      }
    }
    return { minPt, maxPt };
  }

  const topExt = findExtrema(topPts, topCenterP);
  const botExt = findExtrema(botPts, botCenterP);

  const midRings = rings.map((t) => {
    const pts = sampleRing(t);
    const split = splitPolylineByVisibility(pts, true);
    return {
      t,
      pts,
      visiblePaths: split.visible.map((seg) => pointsToSvgPath(seg, false)),
      hiddenPaths: split.hidden.map((seg) => pointsToSvgPath(seg, false)),
    };
  });

  const topSplit = splitPolylineByVisibility(topPts, true);
  const botSplit = splitPolylineByVisibility(botPts, true);

  return {
    topCenter: topCenterP,
    botCenter: botCenterP,
    topCapVisible,
    botCapVisible,
    topFullPath: pointsToSvgPath(topPts, true),
    botFullPath: pointsToSvgPath(botPts, true),
    topVisiblePaths: topSplit.visible.map((s) => pointsToSvgPath(s, false)),
    topHiddenPaths: topSplit.hidden.map((s) => pointsToSvgPath(s, false)),
    botVisiblePaths: botSplit.visible.map((s) => pointsToSvgPath(s, false)),
    botHiddenPaths: botSplit.hidden.map((s) => pointsToSvgPath(s, false)),
    sideEdges: [
      { a: botExt.minPt, b: topExt.minPt },
      { a: botExt.maxPt, b: topExt.maxPt },
    ],
    midRings,
  };
}

// ---------------------------------------------------------------------------
// 3D Sphere Wireframe, Analytical Terminator & Ground Cast Shadow
// ---------------------------------------------------------------------------

/**
 * Builds an exact projected 3D sphere with:
 *   - Projected outline circle (perspective-accurate apparent radius)
 *   - Front/back clipped equator & prime meridian (and optional extra latitude/longitude lines)
 *   - Front pole dot (aiming direction)
 *   - Optional analytical terminator arc & ground cast shadow for lighting lessons
 */
export function projectSphere({
  radius = 80,
  xform = {},
  cam,
  latitudes = [0],     // degrees (-90..90)
  longitudes = [0],    // degrees (-180..180)
  segments = 72,
  lightDir = null,     // unit 3D vector pointing TOWARD the light source (in world space)
  groundY = null,      // world Y height of floor plane (e.g. -radius)
}) {
  const centerW = transformPoint({ x: 0, y: 0, z: 0 }, xform);
  const centerP = cam.project(centerW);

  // Exact apparent silhouette radius under perspective or ortho projection
  let apparentRadius;
  if (cam.ortho) {
    apparentRadius = radius * cam.orthoScale;
  } else {
    const d = centerP.depth;
    if (d <= radius * 1.05) {
      apparentRadius = radius * centerP.scale;
    } else {
      // Exact tangent cone angle sin(alpha) = r / d -> tan(alpha) = r / sqrt(d^2 - r^2)
      apparentRadius = (cam.focal * radius) / Math.sqrt(d * d - radius * radius);
    }
  }

  function sampleGreatOrSmallCircle(fn) {
    const pts = [];
    for (let i = 0; i < segments; i += 1) {
      const ang = (i / segments) * Math.PI * 2;
      const localP = fn(ang);
      const worldP = transformPoint(localP, xform);
      const projP = cam.project(worldP);
      const worldN = norm3(sub3(worldP, centerW));
      const viewN = cam.normalToView(worldN);
      const viewDir = cam.viewDirAtViewPoint(projP);
      // Slight horizon threshold ensures curve hugs silhouette cleanly
      const visible = dot3(viewN, viewDir) >= 0;
      pts.push({ ...projP, visible, world: worldP });
    }
    const split = splitPolylineByVisibility(pts, true);
    return {
      pts,
      visiblePaths: split.visible.map((s) => pointsToSvgPath(s, false)),
      hiddenPaths: split.hidden.map((s) => pointsToSvgPath(s, false)),
    };
  }

  const latCurves = latitudes.map((latDeg) => {
    const lat = degToRad(latDeg);
    const rLat = Math.cos(lat) * radius;
    const yLat = Math.sin(lat) * radius;
    return sampleGreatOrSmallCircle((theta) => ({
      x: Math.cos(theta) * rLat,
      y: yLat,
      z: Math.sin(theta) * rLat,
    }));
  });

  const lonCurves = longitudes.map((lonDeg) => {
    const lon = degToRad(lonDeg);
    return sampleGreatOrSmallCircle((phi) => ({
      x: Math.sin(lon) * Math.cos(phi) * radius,
      y: Math.sin(phi) * radius,
      z: Math.cos(lon) * Math.cos(phi) * radius,
    }));
  });

  // Front aiming pole (0, 0, +radius) in local space
  const poleW = transformPoint({ x: 0, y: 0, z: radius }, xform);
  const poleP = cam.project(poleW);
  const poleN = cam.normalToView(norm3(sub3(poleW, centerW)));
  const poleVisible = dot3(poleN, cam.viewDirAtViewPoint(poleP)) > 0;

  let terminator = null;
  let shadowPathD = '';
  let shadowPolygon = [];

  if (lightDir) {
    const L = norm3(lightDir);
    // Construct orthonormal basis (U, V) perpendicular to L in world space
    const ref = Math.abs(L.y) < 0.9 ? { x: 0, y: 1, z: 0 } : { x: 1, y: 0, z: 0 };
    const U = norm3(cross3(ref, L));
    const V = norm3(cross3(L, U));

    const termPts = [];
    for (let i = 0; i < segments; i += 1) {
      const ang = (i / segments) * Math.PI * 2;
      const worldP = add3(
        centerW,
        add3(scale3(U, Math.cos(ang) * radius), scale3(V, Math.sin(ang) * radius))
      );
      const projP = cam.project(worldP);
      const worldN = norm3(sub3(worldP, centerW));
      const visible = dot3(cam.normalToView(worldN), cam.viewDirAtViewPoint(projP)) >= 0;
      termPts.push({ ...projP, visible, world: worldP });
    }
    const split = splitPolylineByVisibility(termPts, true);
    const visMain = split.visible[0] || [];
    let darkCrescentPathD = '';
    if (visMain.length >= 2) {
      // Push endpoints far along the anti-light screen direction so clipping inside the circle
      // yields the exact analytical shadow half without any corner artifacts
      const Lv = cam.normalToView(L);
      const sl = Math.hypot(-Lv.x, Lv.y) || 1;
      const sx = -Lv.x / sl;
      const sy = Lv.y / sl; // screen Y points downward
      const pA = visMain[0];
      const pB = visMain[visMain.length - 1];
      const ext = apparentRadius * 2.6;
      const bOut = { x: pB.x + sx * ext, y: pB.y + sy * ext };
      const mOut = { x: centerP.x + sx * ext * 1.35, y: centerP.y + sy * ext * 1.35 };
      const aOut = { x: pA.x + sx * ext, y: pA.y + sy * ext };
      darkCrescentPathD = pointsToSvgPath([...visMain, bOut, mOut, aOut], true);
    }
    terminator = {
      visiblePaths: split.visible.map((s) => pointsToSvgPath(s, false)),
      hiddenPaths: split.hidden.map((s) => pointsToSvgPath(s, false)),
      darkCrescentPathD,
    };

    // Exact shadow silhouette on horizontal ground plane y = groundY
    if (groundY != null && L.y > 0.08) {
      const rayDir = scale3(L, -1); // from light toward ground (rayDir.y < 0)
      const groundPts = [];
      for (const p of termPts) {
        const t = (groundY - p.world.y) / rayDir.y;
        if (t > 0) {
          const hit = add3(p.world, scale3(rayDir, t));
          groundPts.push(cam.project(hit));
        }
      }
      if (groundPts.length >= 3) {
        shadowPolygon = convexHull2D(groundPts);
        shadowPathD = pointsToSvgPath(shadowPolygon, true);
      }
    }
  }

  return {
    center: centerP,
    apparentRadius,
    latCurves,
    lonCurves,
    pole: { ...poleP, visible: poleVisible },
    terminator,
    shadowPolygon,
    shadowPathD,
  };
}

// ---------------------------------------------------------------------------
// Exact Ground Cast Shadow for Arbitrary 3D Point Sets (Convex Hull)
// ---------------------------------------------------------------------------

export function convexHull2D(points) {
  if (!points || points.length <= 3) return points || [];
  const pts = [...points].sort((a, b) => (a.x !== b.x ? a.x - b.x : a.y - b.y));
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i -= 1) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

export function projectGroundShadowFromPoints(worldPoints, lightDir, groundY, cam) {
  const L = norm3(lightDir);
  if (L.y <= 0.05) return { points: [], pathD: '' };
  const rayDir = scale3(L, -1);
  const projected = [];
  for (const wp of worldPoints) {
    const t = (groundY - wp.y) / rayDir.y;
    const hit = t >= 0 ? add3(wp, scale3(rayDir, t)) : { x: wp.x, y: groundY, z: wp.z };
    projected.push(cam.project(hit));
  }
  const hull = convexHull2D(projected);
  return { points: hull, pathD: pointsToSvgPath(hull, true) };
}

/**
 * Helper: renders a projected 3D polyhedron directly into SVG strings
 * with clean optional face shading + X-ray hidden edges + crisp visible edges.
 */
export function renderPolyMeshToSvg(projected, {
  stroke = '#0284c7',
  strokeWidth = 1.8,
  hiddenStroke = '#0284c7',
  hiddenOpacity = 0.28,
  faceFills = null, // Map or object: faceName -> { fill, fillOpacity }
  lightDir = null,  // Optional directional shading for lighting diagrams
} = {}) {
  const out = [];

  if (faceFills || lightDir) {
    const L = lightDir ? norm3(lightDir) : null;
    for (const f of projected.visibleFaces) {
      let fill = 'none';
      let fillOpacity = 1;
      if (faceFills && faceFills[f.name]) {
        fill = faceFills[f.name].fill;
        fillOpacity = faceFills[f.name].fillOpacity ?? 1;
      } else if (faceFills && faceFills[f.tone]) {
        fill = faceFills[f.tone].fill;
        fillOpacity = faceFills[f.tone].fillOpacity ?? 1;
      } else if (L) {
        const ndl = dot3(f.normalWorld, L);
        if (ndl > 0.5) {
          fill = '#f8fafc';
        } else if (ndl > 0.05) {
          fill = '#cbd5e1';
        } else {
          fill = '#475569';
        }
        fillOpacity = 0.85;
      }
      if (fill !== 'none') {
        out.push(`<path d="${f.pathD}" fill="${fill}" fill-opacity="${fillOpacity}" stroke="none"/>`);
      }
    }
  }

  for (const e of projected.hiddenEdges) {
    out.push(
      `<line x1="${fmt(e.a.x)}" y1="${fmt(e.a.y)}" x2="${fmt(e.b.x)}" y2="${fmt(e.b.y)}" stroke="${hiddenStroke}" stroke-opacity="${hiddenOpacity}" stroke-width="${fmt(strokeWidth * 0.78)}" stroke-dasharray="4 4"/>`
    );
  }

  for (const e of projected.visibleEdges) {
    out.push(
      `<line x1="${fmt(e.a.x)}" y1="${fmt(e.a.y)}" x2="${fmt(e.b.x)}" y2="${fmt(e.b.y)}" stroke="${stroke}" stroke-width="${fmt(strokeWidth)}" stroke-linecap="round"/>`
    );
  }

  return out.join('\n');
}
