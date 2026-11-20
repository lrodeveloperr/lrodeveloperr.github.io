(HSC.youtubeRuntime ||= []).push(() => {


// ---------------------------------------------------------------------------------------------
// Renderer glue: attaches to the game's head mesh and materials, then applies a customer.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  const { clamp, smooth } = HSC;
  const LIFT = 0.6, EXPOSURE = 1.2;

  // the game's hair colour presets (uHairTint per colour index)
  const TINTS = [
    [0.3, 0.32, 0.38], [0.48, 0.48, 0.52], [0.72, 0.68, 0.64], [1, 1, 1], [1.55, 1.36, 1.16], [2.3, 1.95, 1.55],
    [3.1, 2.65, 1.95], [4, 3.35, 2.05], [5.1, 4.45, 3.1], [2.4, 1.25, 0.8], [4, 1.8, 0.75], [2.1, 3.15, 5.2],
    // Android colours (phenotypes.js): strawberry blond, ash brown, golden brown, ash blond, copper, blue-black
    [4.4, 2.6, 1.35], [1.4, 1.36, 1.32], [2.5, 1.9, 1.2], [3, 2.85, 2.5], [3.2, 1.55, 0.8], [0.26, 0.3, 0.42],
  ];
  const STRAND_STYLE = {
    straight: (c) => ({ A: [0.22, 0.56, 0.56, 0.5], B: [0.16, 0.1, 0.02, 1], C: [0, 0, 1, 1] }),
    wavy: (c) => ({ A: [0.18, 0.4, 0.62, 0.6], B: [0.2, 0.08, 0.07 + 0.05 * c, 1.4 + 0.6 * c], C: [0, 0, 0.92, 1.05] }),
    curly: (c) => ({ A: [0.1, 0.2, 0.75, 0.8], B: [0.28, 0.04, 0, 1], C: [0.1 + 0.06 * c, 1.6 + 1.0 * c, 0.72 - 0.1 * c, 1.15] }),
    coily: (c) => ({ A: [0.03, 0.05, 0.9, 0.95], B: [0.36, 0, 0, 1], C: [0.16 + 0.08 * c, 3 + 2.5 * c, 0.5 - 0.08 * c, 1.35] }),
  };
  const BEARD_STYLE = {
    straight: { A: [0.04, 0.6, 0.45, 0.12], B: [0, 0, 1, 1] },
    wavy: { A: [0.07, 0.9, 0.5, 0.1], B: [0.03, 1.2, 0.95, 1.05] },
    curly: { A: [0, 1, 0.6, 0.05], B: [0.12, 1.8, 0.75, 1.1] },
    coily: { A: [0, 1, 0.75, 0.02], B: [0.2, 3.5, 0.55, 1.25] },
  };
  const lerp = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  const mul = (a, b) => a.map((v, i) => v * b[i]);

  let ctx = null;
  const st = {};

  HSC.attach = function (c) {
    try {
      ctx = c;
      HSC.ctx = c; // turkish.js adds its tools and effects to the same head
      const T = c.T, Pt = c.Pt;
      const P = Pt.attributes.position.array;
      st.base = Float32Array.from(P);
      st.N0 = Float32Array.from(Pt.attributes.normal.array);
      st.coarse = Pt.userData.coarse;
      st.coarseBase = Float32Array.from(st.coarse.pos);
      Pt.setAttribute('hsBase', new T.It(st.base, 3));
      // Built from the un-morphed base head with fixed seeds: identical on every load, so a device
      // cache (HSC.geo, YouTube target only) may supply the stored result instead of recomputing it.
      const baseModel = () => {
        const ci = HSC.canonIds(st.base);
        const nBase = HSC.areaNormals(st.base, Pt.index.array, ci.canon, ci.count);
        const surface = HSC.buildBeardSurface(st.base, Pt.index.array);
        // Android carries a denser beard; the lowest tier still draws today's count (HSC.setDetail)
        const roots = HSC.sampleBeardRoots(st.base, Pt.index.array, surface, globalThis.AndroidHost ? 20000 : 14000, 0xbea7d);
        return { canon: ci.canon, canonCount: ci.count, nBase, surface, roots };
      };
      const model = HSC.geo ? HSC.geo.use('beard', baseModel) : baseModel();
      st.canon = model.canon; st.canonCount = model.canonCount;
      st.nBase = model.nBase;
      // scalp mask per vertex, to keep morphs off the scalp
      st.scalp = new Float32Array(P.length / 3);
      for (let v = 0; v < st.scalp.length; v++) st.scalp[v] = c.Na(P[v * 3], P[v * 3 + 1], P[v * 3 + 2]);
      st.scalpC = new Float32Array(st.coarseBase.length / 3);
      for (let v = 0; v < st.scalpC.length; v++) st.scalpC[v] = c.Na(st.coarseBase[v * 3], st.coarseBase[v * 3 + 1], st.coarseBase[v * 3 + 2]);
      prepareShapes();
      try { prepareExtras(c); } catch (err) { console.error('customers: extras attach failed', err); st.extras = null; }

      // beard length grid texture
      st.beardData = new Uint8Array(8192);
      const tex = new T.uu(st.beardData, 128, 64, T.Jn, T.cr);
      tex.minFilter = tex.magFilter = T.or;
      tex.needsUpdate = true;
      st.beardTex = tex;
      HSC.U.uBeard.value = tex;
      // Android: the brows' trim mask (128 x 32 over both brows), and each cell's place on the brow skin
      if (HSC.U.uBrowMask) {
        st.browData = new Uint8Array(BROW_N).fill(255);
        const bt = new T.uu(st.browData, 128, 32, T.Jn, T.cr);
        bt.minFilter = bt.magFilter = T.or; bt.needsUpdate = true;
        st.browTex = bt; HSC.U.uBrowMask.value = bt;
        // the shaving lather, on the beard grid
        st.foamData = new Uint8Array(8192); const ft = new T.uu(st.foamData, 128, 64, T.Jn, T.cr); ft.minFilter = ft.magFilter = T.or; ft.needsUpdate = true; st.foamTex = ft; HSC.U.uFoam.value = ft;
        st.browCells = browCells(st.base);
        try { st.browMesh = makeBrowMesh(c); c.vt.add(st.browMesh); } catch (err) { console.error('customers: brow strands failed', err); }
      }

      // beard surface + strands
      st.surface = model.surface;
      st.roots = model.roots;
      // a cell with no roots holds no visible hair (the mesh's inner surfaces share the grid): no beard starts there
      st.surface.rooted = new Uint8Array(8192);
      for (let i = 0; i < model.roots.count; i++) { const c = HSC.beardCell(model.roots.base[i * 3], model.roots.base[i * 3 + 1], model.roots.base[i * 3 + 2]); if (c >= 0) st.surface.rooted[c] = 1; }
      // the roots are random, so a cell of the outer skin can miss them all. Among rooted cells of the same surface (at
      // the same distance from the grid's centre) it still holds beard: a zero there thinned the beard and its shadow in
      // scattered spots, since the length grid is filtered between cells
      {
        const R0 = st.surface.rooted.slice(), mr = st.surface.maxR, S0 = st.surface;
        for (let c = 0; c < 8192; c++) {
          if (R0[c] || S0.offs[c] === S0.offs[c + 1]) continue;
          const cx = c & 127, cy = c >> 7;
          let n = 0;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            const xx = cx + dx, yy = cy + dy, nb = yy * 128 + xx;
            if ((dx || dy) && xx >= 0 && xx < 128 && yy >= 0 && yy < 64 && R0[nb] && Math.abs(mr[nb] - mr[c]) < 0.1) n++;
          }
          if (n >= 4) st.surface.rooted[c] = 1;
        }
      }
      st.beardCells = HSC.beardCellPositions(st.surface, st.base);
      HSC.beardSurface = st.beardCells;
      st.beardMesh = makeBeardMesh(c, st.roots);
      c.vt.add(st.beardMesh);
      try { HSC.attachClippings && HSC.attachClippings(c); } catch (err) { console.error('customers: clippings attach failed', err); }
      try { HSC.attachGown && c.robe && HSC.attachGown(c.robe, c.T); } catch (err) { console.error('customers: gown attach failed', err); }
      HSC.ready = true;
      try { HSC.onDetailChange(); } catch (err) { console.error('customers: detail apply failed', err); }
    } catch (err) {
      console.error('customers: attach failed', err);
      HSC.ready = false;
    }
  };

  function makeBeardMesh(c, roots) {
    const T = c.T, n = roots.count;
    const g = new T.af();
    const pos = [], idx = [];
    const SEG = 8;
    for (let s = 0; s <= SEG; s++) {
      pos.push(-1, s / SEG, 0, 1, s / SEG, 0);
      if (s < SEG) { const u = s * 2; idx.push(u, u + 1, u + 2, u + 1, u + 3, u + 2); }
    }
    g.setAttribute('position', new T.mt(pos, 3));
    g.setIndex(idx);
    st.aRoot = new Float32Array(n * 3);
    st.aNormal = new Float32Array(n * 3);
    const seeds = new Float32Array(n * 3), R = HSC.rng(911);
    for (let i = 0; i < n * 3; i++) seeds[i] = R.next();
    g.setAttribute('aRoot', new T.Ra(st.aRoot, 3));
    g.setAttribute('aNormal', new T.Ra(st.aNormal, 3));
    g.setAttribute('aBase', new T.Ra(roots.base.subarray(0, n * 3), 3));
    g.setAttribute('aSeed', new T.Ra(seeds, 3));
    g.instanceCount = n;
    updateRoots(st.base, st.N0);
    const mat = new T.fr({
      vertexShader: HSC.glsl.beardVert(c.Ql),
      fragmentShader: HSC.glsl.beardFrag(c.Ql),
      uniforms: Object.assign({ uGrid: c.uGrid, uHairTint: c.uHairTint, uDensity: c.uDensity, uWidth: { value: 1 } }, c.light, HSC.U),
      side: T.$t,
    });
    const mesh = new T.Ze(g, mat);
    mesh.frustumCulled = false;
    mesh.renderOrder = 1;
    mesh.visible = false;
    return mesh;
  }

  function updateRoots(P, N) {
    const r = st.roots;
    for (let i = 0; i < r.count; i++) {
      let nx = 0, ny = 0, nz = 0, x = 0, y = 0, z = 0;
      for (let j = 0; j < 3; j++) {
        const v = r.tri[i * 3 + j] * 3, w = r.bary[i * 3 + j];
        x += P[v] * w; y += P[v + 1] * w; z += P[v + 2] * w;
        nx += N[v] * w; ny += N[v + 1] * w; nz += N[v + 2] * w;
      }
      const l = Math.hypot(nx, ny, nz) || 1;
      const at = i * 3;
      st.aRoot[at] = x; st.aRoot[at + 1] = y; st.aRoot[at + 2] = z;
      st.aNormal[at] = nx / l; st.aNormal[at + 1] = ny / l; st.aNormal[at + 2] = nz / l;
    }
    if (st.beardMesh) {
      st.beardMesh.geometry.attributes.aRoot.needsUpdate = true;
      st.beardMesh.geometry.attributes.aNormal.needsUpdate = true;
    }
  }

  // ---- head shapes (headshapes.js): decoded once, per vertex of the coarse head ----
  // The drawn head is a refinement of the coarse head (smooth.js), so each drawn vertex takes the deltas at
  // its place in the coarse triangle it came from. Every delta is faded out on and near the scalp (hair and
  // cutting keep the original head), around the eyeballs and down the neck (the robe).
  function prepareShapes() {
    st.shapes = null;
    if (!HSC.HEAD_SHAPES_B64 || !HSC.headShapeOf) return;
    const t0 = performance.now();
    try {
      const bin = atob(HSC.HEAD_SHAPES_B64), raw = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) raw[i] = bin.charCodeAt(i);
      const tDecode = performance.now() - t0;
      const dv = new DataView(raw.buffer), n = dv.getUint16(0, true), nv = dv.getUint32(2, true);
      const CB = st.coarseBase, CI = st.coarse.idx, org = ctx.Pt.userData.org, SI = ctx.Pt.index.array, B = st.base;
      const ns = B.length / 3;
      // the drawn head keeps the coarse vertices first, in order (smooth.js only appends split points)
      let same = !!(n && CI && org && nv * 3 === CB.length && ns >= nv);
      for (let i = 0; same && i < nv * 3; i++) if (Math.abs(B[i] - CB[i]) > 1e-5) same = false;
      if (!same) { console.error('customers: head shapes do not match the head'); return; }
      const shapes = [];
      for (let k = 0, o = 6; k < n; k++, o += 4 + nv * 3) shapes.push({ sc: dv.getFloat32(o, true), q: new Int8Array(raw.buffer, o + 4, nv * 3) });

      // where a shape may act: off the scalp, the eyeballs and the lower neck (as the face-shape morph)
      const eye = [0.628, 1.624, 1.627];
      const zone = (x, y, z, scalp) =>
        (1 - smooth(0.0, 0.03, scalp)) * smooth(0.37, 0.5, Math.hypot(Math.abs(x) - eye[0], y - eye[1], z - eye[2])) * smooth(-1.9, -1.3, y);

      // distance over the head's surface to the hair-bearing scalp; shapes fade out over the last 0.9 units
      // before the hairline, so skin never rises over the hair roots or the short hair lying on the temples
      const canon = new Int32Array(nv), ids = new Map();
      for (let i = 0; i < nv; i++) {
        const k = (Math.round(CB[i * 3] * 1e4) + 1e5) * 4e10 + (Math.round(CB[i * 3 + 1] * 1e4) + 1e5) * 2e5 + Math.round(CB[i * 3 + 2] * 1e4) + 1e5;
        let c = ids.get(k);
        if (c === undefined) { c = ids.size; ids.set(k, c); }
        canon[i] = c;
      }
      const nc = ids.size, dist = new Float32Array(nc).fill(1);
      for (let i = 0; i < nv; i++) if (st.scalpC[i] > 0.02) dist[canon[i]] = 0;
      const E = [];
      for (let t = 0; t < CI.length; t += 3) for (let j = 0; j < 3; j++) {
        const a = CI[t + j], b = CI[t + (j + 1) % 3];
        E.push(canon[a], canon[b], Math.hypot(CB[a * 3] - CB[b * 3], CB[a * 3 + 1] - CB[b * 3 + 1], CB[a * 3 + 2] - CB[b * 3 + 2]));
      }
      for (let pass = 0, changed = true; changed && pass < 80; pass++) {
        changed = false;
        for (let e = 0; e < E.length; e += 3) {
          const a = E[e], b = E[e + 1], l = E[e + 2];
          if (dist[a] + l < dist[b]) { dist[b] = dist[a] + l; changed = true; } else if (dist[b] + l < dist[a]) { dist[a] = dist[b] + l; changed = true; }
        }
      }
      const fadeC = new Float32Array(nv);
      st.sgC = new Float32Array(nv);
      for (let i = 0; i < nv; i++) {
        fadeC[i] = smooth(0.1, 0.9, dist[canon[i]]);
        st.sgC[i] = zone(CB[i * 3], CB[i * 3 + 1], CB[i * 3 + 2], st.scalpC[i]) * fadeC[i];
      }

      // each drawn vertex: itself (a coarse vertex) or its barycentric place in the coarse triangle it came from
      const K = 3;
      st.nbr = new Int32Array(ns * K).fill(-1);
      st.nbw = new Float32Array(ns * K);
      for (let v = 0; v < nv; v++) { st.nbr[v * K] = v; st.nbw[v * K] = 1; }
      for (let t = 0; t < org.length; t++) {
        const c = org[t] * 3, i0 = CI[c], i1 = CI[c + 1], i2 = CI[c + 2];
        const ax = CB[i0 * 3], ay = CB[i0 * 3 + 1], az = CB[i0 * 3 + 2];
        const ux = CB[i1 * 3] - ax, uy = CB[i1 * 3 + 1] - ay, uz = CB[i1 * 3 + 2] - az;
        const wx = CB[i2 * 3] - ax, wy = CB[i2 * 3 + 1] - ay, wz = CB[i2 * 3 + 2] - az;
        const uu = ux * ux + uy * uy + uz * uz, uw = ux * wx + uy * wy + uz * wz, ww = wx * wx + wy * wy + wz * wz, den = uu * ww - uw * uw || 1e-12;
        for (let j = 0; j < 3; j++) {
          const v = SI[t * 3 + j];
          if (st.nbr[v * K] >= 0) continue;
          const px = B[v * 3] - ax, py = B[v * 3 + 1] - ay, pz = B[v * 3 + 2] - az;
          const pu = px * ux + py * uy + pz * uz, pw = px * wx + py * wy + pz * wz;
          let b1 = Math.max(0, (ww * pu - uw * pw) / den), b2 = Math.max(0, (uu * pw - uw * pu) / den), b0 = Math.max(0, 1 - b1 - b2);
          const sum = b0 + b1 + b2 || 1;
          st.nbr[v * K] = i0; st.nbw[v * K] = b0 / sum;
          st.nbr[v * K + 1] = i1; st.nbw[v * K + 1] = b1 / sum;
          st.nbr[v * K + 2] = i2; st.nbw[v * K + 2] = b2 / sum;
        }
      }
      // expressions (expressions-data.js) may also move the lids and brows, which the shape guard keeps still:
      // only the eyeballs themselves (radius 0.305), the scalp and the lower neck stay out
      const zoneE = (x, y, z, scalp) => (1 - smooth(0.0, 0.03, scalp)) * smooth(0.33, 0.4, Math.hypot(Math.abs(x) - eye[0], y - eye[1], z - eye[2])) * smooth(-1.9, -1.3, y);
      st.eg = new Float32Array(ns);
      for (let v = 0; v < ns; v++) {
        const ge = zoneE(B[v * 3], B[v * 3 + 1], B[v * 3 + 2], st.scalp[v]);
        if (ge <= 0) continue;
        let fade = 0;
        for (let k = 0; k < K; k++) { const i = st.nbr[v * K + k]; if (i >= 0) fade += st.nbw[v * K + k] * fadeC[i]; }
        st.eg[v] = ge * fade;
      }
      st.sg = new Float32Array(ns);
      for (let v = 0; v < ns; v++) {
        const g = zone(B[v * 3], B[v * 3 + 1], B[v * 3 + 2], st.scalp[v]);
        if (g <= 0) continue;
        let fade = 0;
        for (let k = 0; k < K; k++) { const i = st.nbr[v * K + k]; if (i >= 0) fade += st.nbw[v * K + k] * fadeC[i]; }
        st.sg[v] = g * fade;
      }
      st.shapes = shapes;
      // face-feature targets (facegen.js): sparse [scale f32][n u16][idx u16 x n][int8 x 3n] each
      st.faces = null;
      if (HSC.FACE_TARGETS_B64 && HSC.faceOf) {
        const fb = atob(HSC.FACE_TARGETS_B64), fr = new Uint8Array(fb.length);
        for (let i = 0; i < fb.length; i++) fr[i] = fb.charCodeAt(i);
        const fv = new DataView(fr.buffer), fn = fv.getUint16(0, true);
        if (fv.getUint32(2, true) === nv) {
          const faces = [];
          for (let k = 0, o = 6; k < fn; k++) {
            const sc = fv.getFloat32(o, true), m = fv.getUint16(o + 4, true), idx = new Uint16Array(m);
            for (let j = 0; j < m; j++) idx[j] = fv.getUint16(o + 6 + j * 2, true);
            faces.push({ sc, idx, q: new Int8Array(fr.buffer, o + 6 + m * 2, m * 3) });
            o += 6 + m * 5;
          }
          st.faces = faces;
        } else console.error('customers: face targets do not match the head');
      }
      st.D = new Float32Array(nv * 3);
      // expression units (sparse, the faces' format), [ethnicity][unit]
      st.expr = null;
      if (HSC.EXPR_B64) {
        const eb = atob(HSC.EXPR_B64), er = new Uint8Array(eb.length);
        for (let i = 0; i < eb.length; i++) er[i] = eb.charCodeAt(i);
        const ev = new DataView(er.buffer), en = ev.getUint16(0, true);
        if (ev.getUint32(2, true) === nv) {
          const units = [];
          for (let k = 0, o = 6; k < en; k++) {
            const sc = ev.getFloat32(o, true), m = ev.getUint16(o + 4, true), idx = new Uint16Array(m);
            for (let j = 0; j < m; j++) idx[j] = ev.getUint16(o + 6 + j * 2, true);
            units.push({ sc, idx, q: new Int8Array(er.buffer, o + 6 + m * 2, m * 3) });
            o += 6 + m * 5;
          }
          st.expr = units;
          st.DE = new Float32Array(nv * 3);
        }
      }
      if (HSC.startupTiming) { HSC.startupTiming.headShapesMs = Math.round(performance.now() - t0); HSC.startupTiming.headShapesDecodeMs = Math.round(tDecode); }
    } catch (err) {
      console.error('customers: head shapes failed', err);
      st.shapes = null;
    }
  }

  // ---- Android details and accessories (extras.js) ----
  // Places are found once on the coarse head (its vertices come first in the drawn head, in order): skin where a
  // mole may sit, both earlobes and the bowl of both ears. Skin details live in the un-morphed head space the skin
  // shader draws in; accessories follow the morphed ear.
  function prepareExtras(c) {
    st.extras = null;
    if (!HSC.skinDetailsOf || !HSC.accessoriesOf) return;
    const CB = st.coarseBase, nv = CB.length / 3, T = c.T;
    const at = (v) => [CB[v * 3], CB[v * 3 + 1], CB[v * 3 + 2]];
    const moleAt = [];
    for (let v = 0; v < nv; v++) {
      const [x, y, z] = at(v), ax = Math.abs(x);
      if (st.scalpC[v] > 0.005 || z < -0.3 || y < -1.2 || y > 2.75 || ax > 1.45) continue;
      if (Math.hypot(ax - 0.628, y - 1.624, z - 1.627) < 0.48) continue; // eyes
      if (ax < 0.72 && y > -0.25 && y < 0.5 && z > 1.5) continue; // lips
      if (y > 1.78 && y < 2.2 && ax > 0.22 && ax < 1.15 && z > 1.1) continue; // brows
      if (Math.hypot(ax - 0.21, y - 0.6, z - 2.36) < 0.16) continue; // nostrils
      moleAt.push(v);
    }
    // per side (+1 the customer's left, -1 the right): earlobe (outer face) and ear bowl (deepest point)
    const best = (test, score) => { let b = -1, bs = -1e9; for (let v = 0; v < nv; v++) { const p = at(v); if (test(p) && score(p) > bs) { bs = score(p); b = v; } } return b; };
    // the earlobe (on the drawn head; it is joined to the head, so only its outer face exists): its bottom edge,
    // and the piercing in the visual centre of the soft lobe pad, about 5-6 mm (0.11 units) above that edge
    const B = st.base, N0 = st.N0;
    const lobeOf = (sd) => {
      const ear = [];
      for (let v = 0; v < B.length / 3; v++) {
        const x = sd * B[v * 3], y = B[v * 3 + 1], z = B[v * 3 + 2];
        if (x > 1.58 && y > 0.55 && y < 1.0 && z > -0.3 && z < 0.2) ear.push(v);
      }
      if (!ear.length) return null;
      const yB = Math.min(...ear.map((v) => B[v * 3 + 1]));
      const pad = ear.filter((v) => B[v * 3 + 1] < yB + 0.2), zs = pad.map((v) => B[v * 3 + 2]).sort((a, b) => a - b);
      const zc = zs[zs.length >> 1], yc = yB + 0.11;
      let h = -1, hd = 1e9, b = -1, bd = 1e9;
      for (const v of ear) {
        const y = B[v * 3 + 1], z = B[v * 3 + 2];
        if (sd * N0[v * 3] > 0.5) { const d = Math.hypot(y - yc, z - zc); if (d < hd) { hd = d; h = v; } }
        const e = (y - yB) * 4 + Math.abs(z - zc); // the lowest point of the edge below the pad centre
        if (e < bd) { bd = e; b = v; }
      }
      return h >= 0 && b >= 0 ? { h, b } : null;
    };
    const lobe = {}, bowl = {};
    for (const sd of [-1, 1]) {
      lobe[sd] = lobeOf(sd);
      bowl[sd] = best(([x, y, z]) => sd * x > 1.38 && sd * x < 1.62 && y > 1.0 && y < 1.2 && z > -0.15 && z < 0.05, ([x]) => -sd * x);
    }
    // small meshes, built here (the game exposes no sphere or torus geometry to us); T.af is the instanced
    // geometry class, so these use the head's own plain geometry class
    const Geo = c.Pt.constructor;
    const geo = (pos, nrm, idx) => { const g = new Geo(); g.setAttribute('position', new T.mt(pos, 3)); g.setAttribute('normal', new T.mt(nrm, 3)); g.setIndex(idx); return g; };
    const sphere = (ws, hs) => {
      const pos = [], idx = [];
      for (let j = 0; j <= hs; j++) for (let i = 0; i <= ws; i++) { const th = (j / hs) * Math.PI, ph = (i / ws) * 2 * Math.PI; pos.push(Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph)); }
      for (let j = 0; j < hs; j++) for (let i = 0; i < ws; i++) { const a = j * (ws + 1) + i, b = a + ws + 1; idx.push(a, a + 1, b, b, a + 1, b + 1); }
      return geo(pos, pos.slice(), idx);
    };
    const torus = (R, r, ts, rs) => {
      const pos = [], nrm = [], idx = [];
      for (let j = 0; j <= rs; j++) for (let i = 0; i <= ts; i++) {
        const u = (i / ts) * 2 * Math.PI, w = (j / rs) * 2 * Math.PI, cx = Math.cos(u), cy = Math.sin(u);
        nrm.push(Math.cos(w) * cx, Math.cos(w) * cy, Math.sin(w));
        pos.push((R + r * Math.cos(w)) * cx, (R + r * Math.cos(w)) * cy, r * Math.sin(w));
      }
      for (let j = 0; j < rs; j++) for (let i = 0; i < ts; i++) { const a = j * (ts + 1) + i, b = a + ts + 1; idx.push(a, b, a + 1, b, b + 1, a + 1); }
      return geo(pos, nrm, idx);
    };
    const Mat = c.Gi && c.Gi.constructor;
    if (!Mat) return;
    const mat = (o) => new Mat(Object.assign({ metalness: 0, roughness: 0.4 }, o));
    const mats = {
      silver: mat({ color: '#d6d8dc', metalness: 1, roughness: 0.22 }), gold: mat({ color: '#e2b65a', metalness: 1, roughness: 0.25 }),
      black: mat({ color: '#1c1c20', metalness: 0.5, roughness: 0.3 }), gem: mat({ color: '#f3f6ff', metalness: 1, roughness: 0.04, envMapIntensity: 2.2 }),
      beige: mat({ color: '#d8b898', roughness: 0.38, clearcoat: 0.6 }), brown: mat({ color: '#6a4935', roughness: 0.38, clearcoat: 0.6 }), grey: mat({ color: '#8c9095', roughness: 0.38, clearcoat: 0.6 }),
    };
    const ball = sphere(16, 12), ring = torus(1, 0.17, 40, 10), group = new c.vt.constructor();
    // the game stops updating world matrices after its first frame: each accessory takes the head's own
    // world matrix just before it is drawn
    const make = (g) => {
      const m = new T.Ze(g, mats.silver);
      m.visible = false; m.frustumCulled = false; m.matrixAutoUpdate = false;
      m.onBeforeRender = () => m.matrixWorld.multiplyMatrices(c.vt.matrixWorld, m.matrix);
      group.add(m);
      return m;
    };
    const meshes = { stud: { 1: make(ball), [-1]: make(ball) }, hoop: { 1: make(ring), [-1]: make(ring) }, aid: { 1: make(ball), [-1]: make(ball) } };
    c.vt.add(group);
    st.extras = { moleAt, lobe, bowl, mats, meshes, group };
  }
  // the nearest place on the front of the (un-morphed) head to (x, y), or null
  function frontPoint(x, y, r = 0.07) {
    const CB = st.coarseBase;
    let b = null;
    for (let v = 0; v < CB.length / 3; v++) {
      const px = CB[v * 3], py = CB[v * 3 + 1], pz = CB[v * 3 + 2];
      if (pz > 0.5 && Math.hypot(px - x, py - y) < r && (!b || pz > b[2])) b = [px, py, pz];
    }
    return b;
  }
  // the outermost place on one side of the neck at (y, z), or null
  function sidePoint(sd, y, z, r = 0.1) {
    const CB = st.coarseBase;
    let b = null;
    for (let v = 0; v < CB.length / 3; v++) {
      const px = CB[v * 3], py = CB[v * 3 + 1], pz = CB[v * 3 + 2];
      if (sd * px > 0.5 && Math.hypot(py - y, pz - z) < r && (!b || sd * px > sd * b[0])) b = [px, py, pz];
    }
    return b;
  }
  function setSkinDetails(person, ft) {
    const U = HSC.U, X = st.extras, d = X && HSC.skinDetailsOf(person);
    const mole = U.uMole.value, scar = U.uScar.value;
    mole.fill(0); scar.fill(0);
    U.uTatA.value = [0, 0, 0, 0]; U.uTatB.value = [0, 0, 0, 0];
    if (!d) return;
    d.moles.slice(0, 3).forEach((m, i) => {
      if (!X.moleAt.length) return;
      const v = X.moleAt[Math.min(X.moleAt.length - 1, Math.floor(m.at * X.moleAt.length))], CB = st.coarseBase;
      mole.set([CB[v * 3], CB[v * 3 + 1], CB[v * 3 + 2], m.raised ? -m.r : m.r], i * 4);
    });
    const sc = d.scar;
    if (sc) {
      // a centre, a direction (0 = straight up) and a half length per kind
      let cx, cy, ang, half, w = 0.038;
      if (sc.kind === 'brow') {
        // across the brow line at this customer's brow height (glsl.js browShape)
        const ax = 0.45 + 0.4 * sc.at, t = (ax - 0.3) / 0.8, arch = ft ? ft.brow[0] : 0.08, tilt = ft ? ft.brow[1] : 0;
        const rs = smooth(0, 0.45, t), fl = smooth(0.45, 1, t);
        cx = sc.side * ax; cy = 1.939 + arch * rs * (1 - 0.75 * fl) + tilt * (t - 0.4); ang = sc.side * sc.tilt * 0.6; half = 0.13 * sc.len;
      } else if (sc.kind === 'chin') {
        cx = sc.side * 0.3 * sc.at; cy = -0.42; ang = Math.PI / 2 + sc.tilt; half = 0.12 * sc.len; w = 0.04;
      } else {
        cx = sc.side * (0.75 + 0.3 * sc.at); cy = 0.55 + 0.35 * sc.at; ang = sc.side * sc.tilt; half = 0.14 * sc.len;
      }
      const dx = Math.sin(ang) * half, dy = Math.cos(ang) * half;
      const a = frontPoint(cx - dx, cy - dy), b = frontPoint(cx + dx, cy + dy);
      if (a && b) scar.set([...a, w, ...b, sc.s]);
    }
    const tat = HSC.accessoriesOf(person).tattoo;
    if (tat) {
      // below and behind the ear, its lower part under the gown collar
      const c = sidePoint(tat.side, -0.6, -0.5);
      if (c) {
        U.uTatA.value = [c[0], c[1], c[2], 0.46 * tat.size];
        U.uTatB.value = [HSC.TATTOOS.indexOf(tat.kind) + 1, tat.fade, tat.rot, 0];
      }
    }
    U.uSkinB.value = [U.uSkinB.value[0], U.uSkinB.value[1], d.acne, d.bumps];
  }
  // earrings and hearing aids on the morphed ears (P, N: the drawn head's positions and normals)
  function placeAccessories(person, P, N) {
    const X = st.extras;
    if (!X) return;
    const acc = HSC.accessoriesOf(person) || {};
    for (const k of Object.keys(X.meshes)) for (const sd of [-1, 1]) X.meshes[k][sd].visible = false;
    const V = (x, y, z) => X.group.position.clone().set(x, y, z);
    const where = (v, sd) => {
      if (v < 0) return null;
      const n = V(N[v * 3], N[v * 3 + 1], N[v * 3 + 2]);
      if (n.x * sd < 0.2) n.set(sd, 0, 0); // a normal pointing into the head: use the plain outward direction
      return { p: V(P[v * 3], P[v * 3 + 1], P[v * 3 + 2]), n: n.normalize() };
    };
    const show = (m, material, pos, n, scale) => {
      m.material = material;
      m.position.copy(pos);
      m.quaternion.setFromUnitVectors(V(0, 0, 1), n);
      m.scale.set(scale[0], scale[1], scale[2]);
      m.updateMatrix();
      m.visible = true;
    };
    if (acc.ear) for (const sd of acc.ear.sides) {
      const L = X.lobe[sd], at = L && where(L.h, sd);
      if (!at) continue;
      const m = X.mats[acc.ear.metal] || X.mats.silver;
      if (acc.ear.kind === 'stud') {
        // the stud's front sits flat on the lobe at the piercing (a 4-5 mm head)
        const r = acc.ear.metal === 'gem' ? 0.048 : 0.042;
        show(X.meshes.stud[sd], m, at.p.clone().addScaledVector(at.n, 0.008), at.n, [r, r, r * 0.5]);
      } else {
        // a huggie hoop: in through the piercing (mid-lobe, 2 mm behind its face) and round the lobe's bottom
        // edge, in the plane of the hole and the lobe below it; its inner diameter is the hole-to-edge distance
        // plus about 1 mm, as hoops are sized
        const edge = V(P[L.b * 3], P[L.b * 3 + 1], P[L.b * 3 + 2]);
        const down = edge.sub(at.p), drop = down.clone().addScaledVector(at.n, -down.dot(at.n));
        const len = drop.length();
        if (len < 0.03) continue;
        drop.normalize();
        const hole = at.p.clone().addScaledVector(at.n, -0.04);
        const R = Math.max(0.075, Math.min(0.13, (len + 0.05) / 2 + 0.008));
        const axis = at.n.clone().cross(drop).normalize();
        show(X.meshes.hoop[sd], m, hole.addScaledVector(drop, R), axis, [R, R, R]);
      }
    }
    if (acc.aid) for (const sd of acc.aid.sides) {
      const at = where(X.bowl[sd], sd);
      if (!at) continue;
      // an in-the-ear aid filling the bowl of the ear
      show(X.meshes.aid[sd], X.mats[acc.aid.colour] || X.mats.beige, at.p.clone().addScaledVector(at.n, 0.035), at.n, [0.085, 0.11, 0.06]);
    }
  }

  // ---- eyebrows (Android): a 128 x 32 grid over both brows, x -1.2..1.2, y 1.7..2.3 (glsl.js browKeep) ----
  const BROW_N = 128 * 32;
  const browCell = (x, y) => {
    const un = (Math.abs(x) - 0.2) / 1.0, v = (y - 1.7) / 0.6;
    if (un < 0 || un > 1 || v < 0 || v > 1) return -1;
    const u = x < 0 ? 0.5 - un * 0.5 : 0.5 + un * 0.5;
    return Math.min(31, Math.floor(v * 32)) * 128 + Math.min(127, Math.floor(u * 128));
  };
  // each cell's point on the front of the (un-morphed) head
  function browCells(B) {
    const pos = new Float32Array(BROW_N * 3), has = new Uint8Array(BROW_N), best = new Float32Array(BROW_N).fill(1e9);
    for (let v = 0; v < B.length / 3; v++) {
      const x = B[v * 3], y = B[v * 3 + 1], z = B[v * 3 + 2];
      if (z < 1.0) continue;
      const c = browCell(x, y);
      if (c < 0) continue;
      // the cell centre, and the vertex closest to it
      const col = c % 128, row = Math.floor(c / 128), u = (col + 0.5) / 128, vv = (row + 0.5) / 32;
      const cx = (u < 0.5 ? -1 : 1) * (0.2 + Math.abs(u - 0.5) * 2), cy = 1.7 + vv * 0.6;
      const d = Math.hypot(x - cx, y - cy);
      if (d < best[c]) { best[c] = d; pos.set([cx, cy, z], c * 3); has[c] = 1; }
    }
    // cells no vertex fell in take their neighbour's depth
    for (let pass = 0; pass < 4; pass++) for (let c = 0; c < BROW_N; c++) if (!has[c]) {
      for (const n of [c - 1, c + 1, c - 128, c + 128]) if (n >= 0 && n < BROW_N && has[n] && Math.floor(n / 128) === Math.floor(c / 128) || (n === c - 128 || n === c + 128) && n >= 0 && n < BROW_N && has[n]) {
        const col = c % 128, row = Math.floor(c / 128), u = (col + 0.5) / 128, vv = (row + 0.5) / 32;
        pos.set([(u < 0.5 ? -1 : 1) * (0.2 + Math.abs(u - 0.5) * 2), 1.7 + vv * 0.6, pos[n * 3 + 2]], c * 3); has[c] = 2; break;
      }
    }
    return { pos, has };
  }
  // the customer's brow shape at a point, as glsl.js browShape draws it
  function browShapeAt(x, y, z) {
    const U = HSC.U, B = U.uBrowB.value, A = U.uBrowA.value, ax = Math.abs(x);
    const t = clamp((ax - 0.3) / 0.8, 0, 1), rs = smooth(0, 0.45, t), fl = smooth(0.45, 1, t);
    const yb = 1.624 + 0.315 + B[0] * rs * (1 - 0.75 * fl) + B[1] * (t - 0.4);
    let th = (0.14 + (0.058 - 0.14) * smooth(0.25, 1, t)) * (0.45 + 0.55 * smooth(0, 0.22, t)) * B[2];
    th *= 1 - A[2] * smooth(0.55, 1, t);
    const along = smooth(0.27, 0.36, ax) * (1 - smooth(1, 1.12, ax));
    const across = 1 - smooth(0.3, 1, Math.abs(y - yb) / Math.max(th, 0.001));
    return along * across * smooth(0.9, 1.5, z);
  }
  // brow strands: roots spread over the brow area of the un-morphed head (the shader grows only those inside the
  // customer's own brow shape); kept on the morphed face like the beard roots
  function makeBrowMesh(c) {
    const T = c.T, B = st.base, I = c.Pt.index.array, tris = [], cum = [];
    let area = 0;
    for (let t = 0; t < I.length; t += 3) {
      const a = I[t] * 3, b = I[t + 1] * 3, d = I[t + 2] * 3;
      const cx = (B[a] + B[b] + B[d]) / 3, cy = (B[a + 1] + B[b + 1] + B[d + 1]) / 3, cz = (B[a + 2] + B[b + 2] + B[d + 2]) / 3;
      if (cz < 1.05 || Math.abs(cx) < 0.24 || Math.abs(cx) > 1.16 || cy < 1.76 || cy > 2.28) continue;
      const ux = B[b] - B[a], uy = B[b + 1] - B[a + 1], uz = B[b + 2] - B[a + 2], wx = B[d] - B[a], wy = B[d + 1] - B[a + 1], wz = B[d + 2] - B[a + 2];
      const ar = 0.5 * Math.hypot(uy * wz - uz * wy, uz * wx - ux * wz, ux * wy - uy * wx);
      if (ar <= 0) continue;
      area += ar; tris.push(t); cum.push(area);
    }
    const n = 9000, R = HSC.rng(0xb20a5), tri = new Int32Array(n * 3), bary = new Float32Array(n * 3), base = new Float32Array(n * 3), seeds = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      let lo = 0, hi = cum.length - 1; const x = R.next() * area;
      while (lo < hi) { const m = (lo + hi) >> 1; if (cum[m] < x) lo = m + 1; else hi = m; }
      const t = tris[lo], r1 = Math.sqrt(R.next()), r2 = R.next(), w = [1 - r1, r1 * (1 - r2), r1 * r2];
      for (let j = 0; j < 3; j++) { tri[i * 3 + j] = I[t + j]; bary[i * 3 + j] = w[j]; }
      for (let k = 0; k < 3; k++) base[i * 3 + k] = w[0] * B[I[t] * 3 + k] + w[1] * B[I[t + 1] * 3 + k] + w[2] * B[I[t + 2] * 3 + k];
      seeds[i * 3] = R.next(); seeds[i * 3 + 1] = R.next(); seeds[i * 3 + 2] = R.next();
    }
    st.browRoots = { count: n, tri, bary };
    const g = new T.af(), pos = [], idx = [], SEG = 5;
    for (let s = 0; s <= SEG; s++) { pos.push(-1, s / SEG, 0, 1, s / SEG, 0); if (s < SEG) { const u = s * 2; idx.push(u, u + 1, u + 2, u + 1, u + 3, u + 2); } }
    g.setAttribute('position', new T.mt(pos, 3)); g.setIndex(idx);
    st.bRoot = new Float32Array(n * 3); st.bNormal = new Float32Array(n * 3);
    g.setAttribute('aRoot', new T.Ra(st.bRoot, 3)); g.setAttribute('aNormal', new T.Ra(st.bNormal, 3));
    g.setAttribute('aBase', new T.Ra(base, 3)); g.setAttribute('aSeed', new T.Ra(seeds, 3));
    g.instanceCount = n;
    const mat = new T.fr({ vertexShader: HSC.glsl.browVert(c.Ql), fragmentShader: HSC.glsl.browFrag(c.Ql),
      uniforms: Object.assign({ uGrid: c.uGrid, uHairTint: c.uHairTint, uDensity: c.uDensity, uWidth: { value: 1 } }, c.light, HSC.U), side: T.$t });
    const mesh = new T.Ze(g, mat);
    mesh.frustumCulled = false; mesh.renderOrder = 1;
    st.browGeo = g;
    updateBrowRoots(st.base, st.N0);
    return mesh;
  }
  function updateBrowRoots(P, N) {
    const r = st.browRoots;
    if (!r) return;
    for (let i = 0; i < r.count; i++) {
      let x = 0, y = 0, z = 0, nx = 0, ny = 0, nz = 0;
      for (let j = 0; j < 3; j++) { const v = r.tri[i * 3 + j] * 3, w = r.bary[i * 3 + j]; x += P[v] * w; y += P[v + 1] * w; z += P[v + 2] * w; nx += N[v] * w; ny += N[v + 1] * w; nz += N[v + 2] * w; }
      const l = Math.hypot(nx, ny, nz) || 1;
      st.bRoot.set([x, y, z], i * 3); st.bNormal.set([nx / l, ny / l, nz / l], i * 3);
    }
    st.browGeo.attributes.aRoot.needsUpdate = true; st.browGeo.attributes.aNormal.needsUpdate = true;
  }
  // a head hit (morphed, coarse triangle) back on the un-morphed head: { p, tri } -> [x, y, z]
  HSC.toBase = function (hit) {
    if (!hit || !hit.tri || !st.coarse) return null;
    const C = st.coarse.pos, B = st.coarseBase, [i0, i1, i2] = hit.tri.map((v) => v * 3), p = hit.p;
    const v0 = [C[i1] - C[i0], C[i1 + 1] - C[i0 + 1], C[i1 + 2] - C[i0 + 2]], v1 = [C[i2] - C[i0], C[i2 + 1] - C[i0 + 1], C[i2 + 2] - C[i0 + 2]], v2 = [p[0] - C[i0], p[1] - C[i0 + 1], p[2] - C[i0 + 2]];
    const d = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], d00 = d(v0, v0), d01 = d(v0, v1), d11 = d(v1, v1), d20 = d(v2, v0), d21 = d(v2, v1), den = d00 * d11 - d01 * d01 || 1;
    const b = (d11 * d20 - d01 * d21) / den, c = (d00 * d21 - d01 * d20) / den, a = 1 - b - c;
    return [0, 1, 2].map((k) => B[i0 + k] * a + B[i1 + k] * b + B[i2 + k] * c);
  };
  // a hit on the drawn head back on the un-morphed head (engine, patch21): the scalp's cutting grid lives there
  HSC.warpBase = function (x, y, z, A, I, k) {
    const B = A === ctx.Pt.attributes.position.array ? st.base : st.coarseBase, a = I[k] * 3, b = I[k + 1] * 3, c = I[k + 2] * 3;
    const ux = A[b] - A[a], uy = A[b + 1] - A[a + 1], uz = A[b + 2] - A[a + 2], vx = A[c] - A[a], vy = A[c + 1] - A[a + 1], vz = A[c + 2] - A[a + 2];
    const px = x - A[a], py = y - A[a + 1], pz = z - A[a + 2];
    const d00 = ux * ux + uy * uy + uz * uz, d01 = ux * vx + uy * vy + uz * vz, d11 = vx * vx + vy * vy + vz * vz, d20 = px * ux + py * uy + pz * uz, d21 = px * vx + py * vy + pz * vz;
    const den = d00 * d11 - d01 * d01 || 1e-12, s = (d11 * d20 - d01 * d21) / den, t = (d00 * d21 - d01 * d20) / den, r = 1 - s - t;
    return [B[a] * r + B[b] * s + B[c] * t, B[a + 1] * r + B[b + 1] * s + B[c + 1] * t, B[a + 2] * r + B[b + 2] * s + B[c + 2] * t];
  };
  // the ear bowls (extras.js), for the ear hair and the flame
  HSC.foam = { data: () => st.foamData, update: () => { if (st.foamTex) st.foamTex.needsUpdate = true; } };
  HSC.earBowls = () => (st.extras ? st.extras.bowl : null);
  HSC.BROW_N = BROW_N;
  HSC.browCells = () => st.browCells;
  // a clipper hit on a brow (un-morphed head coordinates), or null
  HSC.browHit = function (x, y, z) {
    if (!st.browCells || z < 1.0) return null;
    const c = browCell(x, y);
    if (c < 0 || browShapeAt(x, y, z) < 0.12) return null;
    return { kind: 'brow', u: (c % 128 + 0.5) / 128, v: (Math.floor(c / 128) + 0.5) / 32 };
  };
  HSC.setBrow = function (levels) {
    if (!st.browTex) return;
    if (st.browLevels === levels) return;
    st.browLevels = levels;
    for (let c = 0; c < BROW_N; c++) st.browData[c] = levels && levels.length === BROW_N ? [0, 128, 255][levels[c]] : 255;
    st.browTex.needsUpdate = true;
  };

  // ---- face-shape morph (and head shape) applied to the smooth mesh and the coarse picking mesh ----
  function applyMorph(person) {
    const Pt = ctx.Pt;
    const P = Pt.attributes.position.array, N = Pt.attributes.normal.array, I = Pt.index.array;
    const age = clamp((person.years - 18) / 62, 0, 1);
    const m = person.morph;
    let moved = false;
    // head shape + face features as one delta per coarse vertex, then guarded and carried to the drawn head
    const shp = st.shapes ? st.shapes[HSC.headShapeOf(person)] : null;
    const face = st.faces && HSC.faceOf ? HSC.faceOf(person) : [];
    const D = st.D, shaped = !!(shp || face.length);
    if (shaped) {
      if (shp) for (let i = 0; i < D.length; i++) D[i] = shp.q[i] * shp.sc; else D.fill(0);
      for (const [t, w] of face) {
        const f = st.faces[t];
        if (!f) continue;
        const k = w * f.sc;
        for (let j = 0; j < f.idx.length; j++) { const i = f.idx[j] * 3; D[i] += k * f.q[j * 3]; D[i + 1] += k * f.q[j * 3 + 1]; D[i + 2] += k * f.q[j * 3 + 2]; }
      }
    }
    const sdC = (i, a) => (shaped ? D[i * 3 + a] * st.sgC[i] : 0);
    // the customer's expression (a smile at the reveal), in his own ancestry mix of the expression units
    const ex = st.expr && st.face && st.face.seed === person.seed && st.face.w > 0.001 && !HSC.snapshotting ? st.face : null;
    const DE = st.DE;
    if (ex) {
      DE.fill(0);
      const E = HSC.EXPR_ETH, U = HSC.EXPR_UNITS, mix = (HSC.EXPR_MIX || {})[person.heritage] || [1 / 3, 1 / 3, 1 / 3];
      E.forEach((_, ei) => U.forEach((u, ui) => {
        // eyes narrow most into crescents on East Asian faces (the reference photos)
        const asianEye = u === 'squint' ? 1 + 0.35 * mix[1] : 1;
        const w = (ex.amounts[u] || 0) * mix[ei] * ex.w * asianEye, t = st.expr[ei * U.length + ui];
        if (!w || !t) return;
        const k = w * t.sc;
        for (let j = 0; j < t.idx.length; j++) { const i = t.idx[j] * 3; DE[i] += k * t.q[j * 3]; DE[i + 1] += k * t.q[j * 3 + 1]; DE[i + 2] += k * t.q[j * 3 + 2]; }
      }));
    }
    if (HSC.U.uSmileA) HSC.U.uSmileA.value = [ex ? ex.w * Math.min(1, ex.amounts.folds || ex.amounts.smile || 0) : 0, 0, 0, 0];
    // this customer's own skull, neck and eyelids (headshapes.js), over everything above
    const F = HSC.headFormOf ? HSC.headFormOf(person) : null;
    if (HSC.U.uHeadA && F) { HSC.U.uHeadA.value = [F.w, F.h, F.d, F.back]; HSC.U.uHeadB.value = [F.top, F.neck, 0, 0]; }
    const se = (v, a) => {
      if (!ex || !(st.eg[v] > 0)) return 0;
      let t = 0;
      for (let k = 0; k < 3; k++) { const i = st.nbr[v * 3 + k]; if (i >= 0) t += st.nbw[v * 3 + k] * DE[i * 3 + a]; }
      return t * st.eg[v];
    };
    const sd = (v, a) => {
      if (!shaped || !(st.sg[v] > 0)) return 0;
      let t = 0;
      for (let k = 0; k < 3; k++) { const i = st.nbr[v * 3 + k]; if (i >= 0) t += st.nbw[v * 3 + k] * D[i * 3 + a]; }
      return t * st.sg[v];
    };
    for (let v = 0; v < P.length / 3; v++) {
      const x = st.base[v * 3], y = st.base[v * 3 + 1], z = st.base[v * 3 + 2];
      const d = HSC.morphDelta(x, y, z, m, age, st.scalp[v]);
      P[v * 3] = x + (d ? d[0] : 0) + sd(v, 0) + se(v, 0); P[v * 3 + 1] = y + (d ? d[1] : 0) + sd(v, 1) + se(v, 1); P[v * 3 + 2] = z + (d ? d[2] : 0) + sd(v, 2) + se(v, 2);
      if (d || (shaped && st.sg[v] > 0) || (ex && st.eg[v] > 0)) moved = true;
      if (F) {
        // the lids stay clear of the eyeball itself
        const l = HSC.lidDelta(x, y, z, F);
        if (l) { const g = smooth(0.3, 0.34, Math.hypot(Math.abs(x) - 0.628, y - 1.624, z - 1.627)); P[v * 3] += l[0] * g; P[v * 3 + 1] += l[1] * g; P[v * 3 + 2] += l[2] * g; }
        HSC.headWarp(P, v * 3, F);
        moved = true;
      }
    }
    const C = st.coarse.pos;
    for (let v = 0; v < C.length / 3; v++) {
      const x = st.coarseBase[v * 3], y = st.coarseBase[v * 3 + 1], z = st.coarseBase[v * 3 + 2];
      const d = HSC.morphDelta(x, y, z, m, age, st.scalpC[v]);
      C[v * 3] = x + (d ? d[0] : 0) + sdC(v, 0); C[v * 3 + 1] = y + (d ? d[1] : 0) + sdC(v, 1); C[v * 3 + 2] = z + (d ? d[2] : 0) + sdC(v, 2);
      if (F) HSC.headWarp(C, v * 3, F);
    }
    // a longer or shorter neck: the whole head sits a little higher or lower in the collar
    if (F && ctx.vt) {
      if (st.headY == null) st.headY = ctx.vt.position.y;
      ctx.vt.position.y = st.headY + 0.03 * F.lift;
      ctx.vt.updateMatrixWorld(true);
    }
    // normals: the original (artist) normals plus the change the morph makes to the geometric normals
    if (moved) {
      const nm = HSC.areaNormals(P, I, st.canon, st.canonCount);
      for (let v = 0; v < N.length / 3; v++) {
        const c = st.canon[v] * 3;
        const x = st.N0[v * 3] + nm[c] - st.nBase[c], y = st.N0[v * 3 + 1] + nm[c + 1] - st.nBase[c + 1], z = st.N0[v * 3 + 2] + nm[c + 2] - st.nBase[c + 2];
        const l = Math.hypot(x, y, z) || 1;
        N[v * 3] = x / l; N[v * 3 + 1] = y / l; N[v * 3 + 2] = z / l;
      }
    } else N.set(st.N0);
    Pt.attributes.position.needsUpdate = true;
    Pt.attributes.normal.needsUpdate = true;
    Pt.computeBoundingSphere();
    updateRoots(P, N);
    if (st.browRoots) updateBrowRoots(P, N);
    if (HSC.onMorph) try { HSC.onMorph(P, N, person); } catch (err) { console.error('customers: morph hook failed', err); }
    try { placeAccessories(person, P, N); } catch (err) { console.error('customers: accessories failed', err); }
    st.beardCells = HSC.beardCellPositions(st.surface, P);
    HSC.beardSurface = st.beardCells;
  }

  // ---- iris texture ----
  function drawEyes(person) {
    const cv = ctx.eyeCanvas, tex = ctx.eyeTexture;
    if (!cv || !tex) return;
    const e = cv.getContext('2d');
    const R = HSC.rng(person.seed ^ 0x51ed);
    const stops = HSC.EYES[person.eyes] || HSC.EYES.blue;
    // Android: the grey ring at the iris edge (arcus) by age band, for that share of men; otherwise from 60
    const PH = HSC.PHENOTYPES;
    let old = person.years >= 60;
    if (PH) { let h = Math.imul((person.seed >>> 0) ^ 0xa3c59ac3, 0x9e3779b1) >>> 0; old = (h % 1000) / 1000 < PH.arcus[PH.bandOf(person.years)]; }
    e.setTransform(1, 0, 0, 1, 0, 0);
    // The constrained/SwiftShader tier halves this texture to 512x256. Keep
    // the same 2048x1024 drawing coordinates at every backing size; a fixed
    // 0.5 scale placed the iris below the smaller canvas and left white eyes.
    e.scale(cv.width / 2048, cv.height / 1024);
    e.fillStyle = old ? '#ebe1d0' : '#efe7e0';
    e.fillRect(0, 0, 2048, 1024);
    for (let o = 0; o < 70 + (old ? 40 : 0); o++) {
      const s = (R.next() < 0.5 ? 0.05 + R.next() * 0.12 : 0.38 + R.next() * 0.12) * 2048, l = (0.25 + R.next() * 0.5) * 1024;
      e.strokeStyle = `rgba(190,90,85,${0.05 + R.next() * 0.12})`;
      e.lineWidth = 1.5;
      e.beginPath(); e.moveTo(s, l);
      e.bezierCurveTo(s + 30, l + 20 * (R.next() - 0.5), s + 60, l + 40 * (R.next() - 0.5), s + 90 * (R.next() < 0.5 ? 1 : -1), l + 30 * (R.next() - 0.5));
      e.stroke();
    }
    const i = 150;
    e.save();
    e.translate(512, 512);
    e.scale(1, 300 / i);
    e.fillStyle = 'rgba(40,30,28,.28)';
    e.beginPath(); e.arc(0, 0, i * 1.08, 0, 7); e.fill();
    const gr = e.createRadialGradient(0, 0, 10, 0, 0, i);
    gr.addColorStop(0, '#060606'); gr.addColorStop(0.2, '#060606');
    gr.addColorStop(0.24, stops[0]); gr.addColorStop(0.5, stops[1]); gr.addColorStop(0.78, stops[2]); gr.addColorStop(0.93, stops[3]);
    gr.addColorStop(1, '#0b0b0b');
    e.fillStyle = gr;
    e.beginPath(); e.arc(0, 0, i, 0, 7); e.fill();
    const fib = stops[0].match(/\w\w/g).map((h) => parseInt(h, 16));
    for (let o = 0; o < 160; o++) {
      const s = R.next() * 6.283, l = i * (0.32 + R.next() * 0.1), cc = i * (0.62 + R.next() * 0.33);
      const k = 0.9 + R.next() * 0.35;
      e.strokeStyle = `rgba(${Math.min(255, fib[0] * k) | 0},${Math.min(255, fib[1] * k) | 0},${Math.min(255, fib[2] * k) | 0},${0.1 + R.next() * 0.22})`;
      e.lineWidth = 1.6;
      e.beginPath(); e.moveTo(Math.cos(s) * l, Math.sin(s) * l); e.lineTo(Math.cos(s) * cc, Math.sin(s) * cc); e.stroke();
    }
    if (old) {
      // arcus: a pale ring at the edge of the iris
      e.strokeStyle = 'rgba(215,215,205,.4)';
      e.lineWidth = 9;
      e.beginPath(); e.arc(0, 0, i * 0.95, 0, 7); e.stroke();
    }
    e.restore();
    tex.needsUpdate = true;
  }

  // ---- apply a customer ----
  HSC.setPerson = function (person) {
    if (!ctx || !HSC.validPerson(person)) return;
    const key = JSON.stringify(person);
    if (st.key === key) return;
    st.key = key;
    // a fresh customer sits down in a clean gown
    // (not while the reveal hub takes a snapshot of the next customer)
    if (!HSC.snapshotting && st.personSeed !== person.seed) { st.personSeed = person.seed; HSC.clearClippings && HSC.clearClippings(); }
    const U = HSC.U;
    const age = clamp((person.years - 18) / 62, 0, 1);
    const dark = clamp(person.skin.tone / 9.4, 0, 1);
    const skin = HSC.skinColour(person);
    U.uSkinA.value = [...skin, dark];
    // one bright, even light for every customer: bright enough that dark hair reads clearly on the
    // darkest skin, with a broad sheen on the strands (as under a barber's ring light)
    U.uLift.value = LIFT;
    HSC.setExposure && HSC.setExposure(EXPOSURE);
    U.uLip.value = lerp([1.06, 0.78, 0.93], [0.86, 0.7, 0.8], smooth(0.2, 0.8, dark));
    const tint = TINTS[person.hair.colour] || TINTS[1];
    const greyCol = [0.2, 0.2, 0.19];
    const hairDark = lerp(mul([0.035, 0.024, 0.018], tint), greyCol, person.hair.grey * 0.85);
    U.uHairDark.value = hairDark;
    // beards often grow in warmer than the scalp hair, visibly so only on brown, blond and red hair
    const warmable = person.hair.colour >= 3 && person.hair.colour <= 10 ? 1 : 0;
    const beardTint = lerp([1, 1, 1], [1.28, 0.95, 0.78], person.beard.warm * 0.55 * warmable);
    U.uBeardTint.value = beardTint;
    U.uBeardDark.value = lerp(mul(mul([0.035, 0.024, 0.018], tint), beardTint), greyCol, person.beard.grey * 0.85);
    U.uBrowTint.value = lerp(mul([0.085, 0.055, 0.04], tint), [0.36, 0.35, 0.33], person.brow.grey);
    if (U.uBrowHair) {
      // phenotype leanings (photographic brow studies; mild): South Asian brows longer and denser, African brows a little
      // less dense, East Asian brows straighter; older men grow a few long wiry hairs
      const g = person.heritage, dens = { 'south-asian': 1.15, mena: 1.12, mediterranean: 1.05, 'west-african': 0.86, 'east-african': 0.86, mixed: 0.95 }[g] || 1;
      const len = { 'south-asian': 1.12, mena: 1.08, 'west-african': 0.92, 'east-african': 0.92 }[g] || 1;
      const wiry = 0.03 * smooth(50, 78, person.years);
      U.uBrowHair.value = [person.brow.grey, clamp(person.brow.thick, 0.7, 1.4) * len, clamp(person.brow.thick, 0.75, 1.3) * dens, wiry];
      // brows read a shade darker than light scalp hair
      U.uBrowDark.value = [6, 7, 8, 12, 15].includes(person.hair.colour) ? 0.68 : [4, 5, 14].includes(person.hair.colour) ? 0.85 : 1;
    }
    U.uBrowA.value = [person.brow.thick, clamp(0.9 + 0.15 * age, 0, 1.2), 0, 0];
    // how strongly shaved follicles show through: dark hair on light skin shows most, grey hair least
    const hairLum = 0.2126 * hairDark[0] + 0.7152 * hairDark[1] + 0.0722 * hairDark[2];
    const castStrength = (0.2 + 0.8 * (1 - smooth(0.02, 0.14, hairLum))) * (1 - 0.45 * dark) * (1 - 0.55 * person.hair.grey);
    U.uCast.value = [...lerp([0.7, 0.73, 0.8], [0.8, 0.79, 0.8], dark), clamp(castStrength, 0.1, 1)];
    U.uAgeA.value = [age, smooth(0.5, 1, age) * (1 - 0.6 * dark), 1, age * 0.6];
    // hair texture
    // Android: one strand preset per hair type 1A-4C, thicker strands for coarse-haired groups
    const PH = HSC.PHENOTYPES, tp = PH && PH.hairTypes[person.hair.type];
    const ss = tp || STRAND_STYLE[person.hair.texture](person.hair.curl);
    const grp = PH && PH.groups.find((g) => g.id === person.heritage);
    U.uStyleA.value = ss.A; U.uStyleB.value = ss.B;
    U.uStyleC.value = tp && grp && grp.coarse !== 1 ? [ss.C[0], ss.C[1], ss.C[2], ss.C[3] * grp.coarse] : ss.C;
    const bs = BEARD_STYLE[person.hair.texture];
    U.uBStyleA.value = bs.A;
    // the beard curls like his hair: 4C coils tighter than 4A, 3A looser than 3C
    U.uBStyleB.value = tp ? [Math.max(bs.B[0], tp.C[0] * 0.95), Math.max(bs.B[1], tp.C[1] * 0.7), (bs.B[2] + tp.C[2]) / 2, bs.B[3]] : bs.B;
    // grey hair reads silver, pewter or white
    const toneB = { silver: 0.62, pewter: 0.46, white: 0.78 }[person.hair.greyTone] || 0.62;
    U.uGreyA.value = [person.hair.grey, 0, toneB + 0.05 * age, 0];
    U.uGreyB.value = { temples: [1.2, 0, 0, 0.4], front: [0, 1.2, 0, 0.35], crown: [0, 0, 1.2, 0.35], even: [0, 0, 0, 0] }[person.hair.greyPattern || 'temples'] || [1.2, 0, 0, 0.4];
    U.uBeardGrey.value = [person.beard.grey, Math.min(0.85, toneB + 0.04), person.beard.patchy, 0];
    // how far a moustache hangs over the upper lip (never past the mouth line). A moustache is trimmed to the top of
    // the lip; only a walrus, which is defined by it, still covers the upper lip
    U.uBeardLip.value = { walrus: 0.95 }[person.beard.style] ?? 0;
    // Android: brow shape, freckles and dark papules, hairline shape (phenotypes.js); defaults keep the original look
    const ft = HSC.featuresOf ? HSC.featuresOf(person) : null;
    U.uBrowB.value = ft ? ft.brow : [0.08, 0, 1, 0];
    U.uBrowA.value[2] = ft ? ft.tail : 0;
    U.uSkinB.value = ft ? ft.skin : [0, 0, 0, 0];
    U.uBaldC.value = ft ? ft.hairline : [0, 0, 0, 0];
    try { setSkinDetails(person, ft); } catch (err) { console.error('customers: skin details failed', err); }
    // Android hair: where the crown swirl sits and which way it turns (about 2 in 3 clockwise)
    if (U.uWhorl && HSC.PHENOTYPES) {
      const W = HSC.rng(((person.seed >>> 0) ^ 0x2545f491) >>> 0 || 1);
      U.uWhorl.value = [W.range(-0.2, 0.2), -0.55 + W.range(-0.18, 0.18), W.next() < 0.65 ? 1 : -1, 0];
    }
    U.uBeardGreyB.value = { chin: [1.1, 0, 0.4, 0.4], sides: [0, 1.1, 0, 0.35], even: [0, 0, 0, 0] }[person.beard.greyPattern || 'chin'] || [1.1, 0, 0.4, 0.4];
    // alopecia areata patches
    const ar = new Float32Array(12);
    (person.bald.patches || []).slice(0, 3).forEach((q, i) => ar.set(q, i * 4));
    U.uAreata.value = ar;
    // baldness
    // hair loss: Norwood (frontal / temporal + crown), Norwood A, crown-only, diffuse thinning
    const loss = person.bald.type === 'none' ? [0, 0, 0, 0, 0, person.bald.diffuse || 0] : HSC.baldShape(Object.assign({ type: 'norwood' }, person.bald));
    U.uBaldA.value = [loss[0], loss[1], loss[2], loss[3]];
    U.uBaldB.value = [loss[4], loss[5], (person.seed % 97) * 0.37, 0];
    // skin sheen follows the skin tone
    if (ctx.Gi && ctx.Gi.sheenColor) {
      const sc = lerp([1, 0.27, 0.19], [0.42, 0.28, 0.22], dark);
      ctx.Gi.sheenColor.setRGB(sc[0], sc[1], sc[2]);
      ctx.Gi.sheen = 0.6 - 0.2 * dark;
    }
    try { applyMorph(person); } catch (err) { console.error('customers: morph failed', err); }
    try { drawEyes(person); } catch (err) { console.error('customers: eyes failed', err); }
  };

  // a facial expression for the customer in the chair (requests.js): unit amounts (smile, squint, brows, lift) at
  // strength w 0..1; w 0 is his resting face. Snapshots of the next customer never carry it.
  HSC.setExpression = function (person, amounts, w) {
    if (!ctx || !st.expr || !person || !HSC.validPerson(person)) return false;
    st.face = { seed: person.seed, amounts: amounts || {}, w: Math.max(0, Math.min(1, w || 0)) };
    try { applyMorph(person); } catch (err) { console.error('customers: expression failed', err); return false; }
    return true;
  };

  HSC.setBeard = function (levels) {
    if (!st.beardTex) return;
    let any = false;
    for (let c = 0; c < 8192; c++) {
      const v = levels && levels[c] ? HSC.BEARD_MM[levels[c]] || 0 : 0;
      st.beardData[c] = Math.round((v / 50) * 255);
      if (v >= 0.5) any = true;
    }
    st.beardTex.needsUpdate = true;
    if (st.beardMesh) st.beardMesh.visible = any;
  };

  // clipper picking: is this (morphed) hit on the beard? returns grid coords like the scalp's u/v
  HSC.beardHit = function (x, y, z, triStart, fine) {
    if (!ctx || !st.surface) return null;
    let bx = x, by = y, bz = z;
    if (fine) {
      // map the hit back onto the un-morphed head through the hit triangle's barycentrics
      const P = ctx.Pt.attributes.position.array, I = ctx.Pt.index.array;
      const a = I[triStart] * 3, b = I[triStart + 1] * 3, c = I[triStart + 2] * 3;
      const v0 = [P[b] - P[a], P[b + 1] - P[a + 1], P[b + 2] - P[a + 2]], v1 = [P[c] - P[a], P[c + 1] - P[a + 1], P[c + 2] - P[a + 2]], v2 = [x - P[a], y - P[a + 1], z - P[a + 2]];
      const d00 = v0[0] * v0[0] + v0[1] * v0[1] + v0[2] * v0[2], d01 = v0[0] * v1[0] + v0[1] * v1[1] + v0[2] * v1[2], d11 = v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2];
      const d20 = v2[0] * v0[0] + v2[1] * v0[1] + v2[2] * v0[2], d21 = v2[0] * v1[0] + v2[1] * v1[1] + v2[2] * v1[2];
      const den = d00 * d11 - d01 * d01 || 1;
      const wb = (d11 * d20 - d01 * d21) / den, wc = (d00 * d21 - d01 * d20) / den, wa = 1 - wb - wc;
      const B = st.base;
      bx = B[a] * wa + B[b] * wb + B[c] * wc; by = B[a + 1] * wa + B[b + 1] * wb + B[c + 1] * wc; bz = B[a + 2] * wa + B[b + 2] * wb + B[c + 2] * wc;
    }
    if (HSC.beardZone(bx, by, bz) < 0.2) return HSC.browHit ? HSC.browHit(bx, by, bz) : null;
    const cell = HSC.beardCell(bx, by, bz);
    if (cell < 0 || !st.beardCells.has[cell]) return null;
    const [u, v] = HSC.beardUV(bx, by, bz);
    return { kind: 'beard', u, v };
  };

  // follow the game's automatic detail level (it lowers scalp strand counts when frames run slow)
  // strand ribbon geometry with a given number of segments (fewer on the low detail level)
  function strandGeometry(geo, seg) {
    const T = ctx.T, pos = [], idx = [];
    for (let s = 0; s <= seg; s++) {
      pos.push(-1, s / seg, 0, 1, s / seg, 0);
      if (s < seg) { const u = s * 2; idx.push(u, u + 1, u + 2, u + 1, u + 3, u + 2); }
    }
    geo.setAttribute('position', new T.mt(pos, 3));
    geo.setIndex(idx);
  }
  // apply the current detail level to everything already built
  HSC.onDetailChange = function () {
    if (!ctx) return;
    const D = HSC.detail;
    if (ctx.Oi && ctx.Oi.mesh) strandGeometry(ctx.Oi.mesh.geometry, D.segments);
    if (st.beardMesh) strandGeometry(st.beardMesh.geometry, D.beardSegments);
    for (const m of [ctx.Gi, ctx.Oi && ctx.Oi.mesh.material, st.beardMesh && st.beardMesh.material]) {
      if (!m) continue;
      m.defines = Object.assign({}, m.defines);
      if (D.shaderLow) m.defines.HSC_LOW = ''; else delete m.defines.HSC_LOW;
      m.needsUpdate = true;
    }
    HSC.setDetail(1);
    HSC.clipCap && HSC.clipCap();
  };

  HSC.setDetail = function (f) {
    if (!st.beardMesh || !st.roots) return;
    const k = HSC.detail.beardMax;
    // the lowest tier never draws more than it always has
    const beardBase = HSC.detail.constrained ? (HSC.detail.level === 'potato' ? (HSC.detail.softwareGpu ? 250 : 1500) : 6000) : (HSC.detail.level === 'potato' ? 14000 : st.roots.count);
    const n = Math.max(1, Math.round(beardBase * k));
    st.beardMesh.geometry.instanceCount = n;
    st.beardMesh.material.uniforms.uWidth.value = Math.max(0.9, Math.sqrt(14000 / n));
  };

  HSC.beardStartFor = (person) => (st.surface ? HSC.beardStart(person, st.surface, st.base) : new Array(8192).fill(0));
  HSC.debugState = st;
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Game-state side: the customer record and beard grid live in the saved session.
//   state.look.person    the customer (see people.js)
//   state.beard          beard length level per grid cell (index into BEARD_MM)
//   state.startBeard     the beard the customer walked in with
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  const LEVELS = () => HSC.BEARD_MM.length;
  const checked = new WeakSet();
  const okBeard = (a) => {
    if (checked.has(a)) return true;
    const ok = Array.isArray(a) && a.length === 8192 && a.every((v) => Number.isInteger(v) && v >= 0 && v < LEVELS());
    if (ok) checked.add(a);
    return ok;
  };

  // Walk-in hair: a style family by age and hair loss, then a style in it. Lengths are hair levels (1 = 3 mm,
  // 2 = 6, 3 = 9, 4 = 12, 5 = 16 mm); every starting length is above guard 0, so all of it can be cut.
  //   long   a 16 mm top over shorter sides (fades, tapers, undercuts)    full    16 mm all over
  //   crop   a 9 or 12 mm top over shorter sides                         buzz    6-12 mm all over
  //   tight  3 mm sides under a longer top (high and tight)              shaved  3 mm regrowth all over
  const FAMILY_BY_AGE = {
    young: { long: 34, crop: 24, tight: 12, buzz: 14, shaved: 6, full: 10 },
    middle: { long: 28, crop: 26, tight: 6, buzz: 18, shaved: 9, full: 13 },
    old: { long: 20, crop: 26, tight: 2, buzz: 22, shaved: 14, full: 16 },
  };
  // with more hair loss men keep it shorter: from a Norwood 4 on, buzz and shaved heads take over
  const FAMILY_BY_LOSS = { light: { long: 1, crop: 1.1, tight: 0.9, buzz: 1.4, shaved: 1.6, full: 0.6 }, heavy: { long: 0.35, crop: 0.8, tight: 0.3, buzz: 2.4, shaved: 3.4, full: 0.15 } };
  const CONTOUR_BY_AGE = {
    young: { low: 1, mid: 1.2, high: 1.2, drop: 1.1, taper: 0.8, even: 1 },
    middle: { low: 1.2, mid: 1, high: 0.7, drop: 0.8, taper: 1.2, even: 1 },
    old: { low: 1.3, mid: 0.8, high: 0.4, drop: 0.5, taper: 1.5, even: 1 },
  };
  // Android cuts (patch16): burst / temple / skin fades, the classic side part and crew, faux hawk, undercut
  const NEW_FAMILY = { burst: 'fade', temple: 'fade', hawk: 'hawk', undercut: 'undercut', part: 'classic', crew: 'classic' };
  const familyOf = (w) => (NEW_FAMILY[w.contour] ? NEW_FAMILY[w.contour] : w.contour === 'even' ? (w.top === 5 ? 'full' : w.top === 1 ? 'shaved' : 'buzz')
    : w.side === 1 && w.top === 5 ? (['low', 'drop', 'taper'].includes(w.contour) ? 'fade' : 'tight') : w.top === 5 ? 'long' : 'crop');
  const PH = HSC.PHENOTYPES;
  if (PH && PH.families) for (const [age, w] of Object.entries(PH.families)) Object.assign(FAMILY_BY_AGE[age], w);
  if (PH && PH.families) for (const k of ['fade', 'classic', 'hawk', 'undercut']) { FAMILY_BY_LOSS.light[k] = { fade: 1, classic: 1, hawk: 0.8, undercut: 0.8 }[k]; FAMILY_BY_LOSS.heavy[k] = { fade: 0.6, classic: 0.4, hawk: 0.2, undercut: 0.2 }[k]; }
  const lossOf = (person) => {
    const b = person.bald || {};
    const stage = { 1: 0, 2: 1, 3: 2, '3v': 2.5, 4: 3, 5: 4, 6: 5, 7: 6 }[b.norwood] || 0;
    return stage >= 3 || b.type === 'diffuse' ? 'heavy' : stage >= 1 || b.type === 'crown' ? 'light' : null;
  };
  HSC.walkInFamily = familyOf;
  // fam: the family the variety director dealt (meta.js); without one it is drawn here by age and hair loss
  HSC.pickWalkIn = function (person, recent = [], famIn) {
    const W = HSC.walkIns;
    if (!W || !person) return null;
    const R = HSC.rng(((person.seed >>> 0) ^ 0x5bd1e995) >>> 0 || 1);
    const age = FAMILY_BY_AGE[person.age] ? person.age : 'middle';
    const loss = lossOf(person), lw = loss ? FAMILY_BY_LOSS[loss] : null;
    const last = recent.slice(-4), lastFam = recent.length ? familyOf(W.list.find((w) => w.id === recent[recent.length - 1]) || {}) : null;
    // family weights; the family just seen counts for less, so two in a row of the same kind are rarer
    const fw = {};
    for (const [f, v] of Object.entries(FAMILY_BY_AGE[age])) fw[f] = v * (lw ? lw[f] : 1) * (f === lastFam ? 0.35 : 1);
    const fam = famIn && FAMILY_BY_AGE.young[famIn] != null ? famIn : R.pick(fw);
    const cw = CONTOUR_BY_AGE[age];
    let list = W.list.filter((p) => familyOf(p) === fam && !last.includes(p.id));
    if (!list.length) list = W.list.filter((p) => familyOf(p) === fam);
    // Android: cut shapes suit hair types (a temple taper is a coily-hair cut; a hard side part needs straight or wavy hair)
    const coily = person.hair && /^(3c|4)/.test(person.hair.type), straight = person.hair && /^[12]/.test(person.hair.type);
    const tex = (c) => (!PH ? 1 : c === 'temple' ? (coily ? 3 : 0.4) : c === 'burst' ? (coily ? 1.4 : 1) : c === 'part' || c === 'crew' ? (straight ? 1 : 0.15) : 1);
    const weights = list.map((p) => (cw[p.contour] || 1) * tex(p.contour));
    let r = R.next() * weights.reduce((a, b) => a + b, 0);
    for (let i = 0; i < list.length; i++) if ((r -= weights[i]) <= 0) return list[i];
    return list[list.length - 1];
  };
  // the queued regular's grown-out hair and beard for this job, or null
  function regularOf(s, person) {
    const q = HSC.meta && HSC.meta.data && HSC.meta.data.queue;
    if (!q || q.job !== s.jobId || !q.regular || !person || !q.person || q.person.seed !== person.seed || !HSC.gridUnpack || !HSC.walkIns) return null;
    const hair = HSC.gridUnpack(q.regular.h, 5), beard = HSC.gridUnpack(q.regular.b, LEVELS() - 1);
    return hair && beard ? { hair, beard } : null;
  }
  HSC.regularOf = regularOf;
  function walkIn(s, person) {
    if (s.status !== 'cutting' || s.cutStrokeCount || !s.look || s.look.visit !== 'walk-in') return null;
    if (!Array.isArray(s.hair) || !Array.isArray(s.startHair) || s.hair.some((v, i) => v !== s.startHair[i])) return null;
    const recent = Array.isArray(s.recentLooks) ? s.recentLooks.slice(0, -1) : [];
    const q = HSC.meta && HSC.meta.data && HSC.meta.data.queue;
    // a regular (meta.js) walks in with his last cut grown out
    const reg = regularOf(s, person);
    if (reg) {
      const prof = q.profile && HSC.walkIns.list.some((w) => w.id === q.profile) ? q.profile : s.look.profile;
      const recentLooks = Array.isArray(s.recentLooks) && s.recentLooks.length ? [...s.recentLooks.slice(0, -1), prof] : [prof];
      return { hair: reg.hair, startHair: reg.hair.slice(), recentLooks, profile: prof };
    }
    // the look the queue dealt for this job (meta.js, the variety director) comes first, VIPs included; without
    // one, VIPs and the very first customer come in with a full, even head of hair (the most to cut)
    const queued = q && q.job === s.jobId && q.profile && HSC.walkIns && HSC.walkIns.list.find((w) => w.id === q.profile);
    const p = queued || (person.vip || person.first ? HSC.walkIns && HSC.walkIns.list.find((w) => w.contour === 'even') : HSC.pickWalkIn(person, recent));
    if (!p) return null;
    const hair = HSC.walkIns.build(p);
    const recentLooks = Array.isArray(s.recentLooks) && s.recentLooks.length ? [...s.recentLooks.slice(0, -1), p.id] : [p.id];
    return { hair, startHair: hair.slice(), recentLooks, profile: p.id };
  }

  // make sure the session has a customer and beard for the current job (deterministic per job)
  HSC.ensure = function (s) {
    if (!s || !s.look) return s;
    let person = s.look.person;
    const fresh = !HSC.debugOverride && (!HSC.validPerson(person) || person.job !== s.jobId);
    if (fresh) {
      const seed = ((s.seed >>> 0) ^ Math.imul((s.jobId | 0) + 1, 0x9e3779b1)) >>> 0;
      person = HSC.personForJob ? HSC.personForJob(s, seed || 1) : Object.assign(HSC.makePerson(seed || 1), { job: s.jobId });
    }
    // test hook: show a specific customer (never set by the game)
    let forced = false;
    if (HSC.debugOverride) {
      forced = s.look.person !== HSC.debugOverride;
      person = HSC.debugOverride;
    }
    let beard = s.beard, startBeard = s.startBeard;
    // Android: the brows start full for every new customer (and after a replay)
    const BN = HSC.BROW_N, okBrow = (a) => !BN || (Array.isArray(a) && a.length === BN && a.every((v) => v === 0 || v === 1 || v === 2));
    let brow = s.brow;
    if (BN && (fresh || forced || !okBrow(brow))) brow = new Array(BN).fill(2);
    if (fresh || forced || !okBeard(beard) || !okBeard(startBeard) || beard.some((v, i) => v > startBeard[i])) {
      const reg = fresh && !forced ? regularOf(s, person) : null;
      startBeard = reg ? reg.beard : HSC.beardStartFor(person);
      beard = startBeard.slice();
      checked.add(startBeard);
      checked.add(beard);
    }
    const w = fresh ? walkIn(s, person) : null;
    if (HSC.setBrow) HSC.setBrow(BN ? brow : null);
    if (!w && !fresh && !forced && beard === s.beard && startBeard === s.startBeard && brow === s.brow && s.look.colour === person.hair.colour) return s;
    const look = Object.assign({}, s.look, { person, colour: person.hair.colour }, w ? { profile: w.profile } : null);
    const out = Object.assign({}, s, { look, beard, startBeard }, BN ? { brow } : null);
    if (w) Object.assign(out, { hair: w.hair, startHair: w.startHair, recentLooks: w.recentLooks });
    return out;
  };

  // Android: a stroke on a brow. Cells: 2 full, 1 short (thinner and lighter), 0 shaved. A clipper guard leaves
  // the hair at its own length, so it only reaches as far as the brow is long: guard 0 shaves a slit or a clean
  // arch, guard 1 trims it short, and guards 2-4 glide over a brow (its hairs are shorter than the guard).
  // The razor, the trimmer, the scissors and the beard trimmer keep the old rule where they still exist.
  const BROW_MM = [0, 3, 7]; // shaved, trimmed short, a natural brow
  // the brow level a guard leaves: the guard's length or the hair's own if shorter, drawn as the nearest level
  // (a tie keeps the longer one); never longer than the cell already is
  const browByGuard = (lvl, g) => {
    const gmm = HSC.GUARD_MM && HSC.GUARD_MM[g] != null ? HSC.GUARD_MM[g] : g === 0 ? 0 : Infinity; // an unknown guard touches nothing
    const mm = Math.min(BROW_MM[lvl], gmm);
    let best = lvl;
    for (let k = lvl - 1; k >= 0; k--) if (Math.abs(BROW_MM[k] - mm) < Math.abs(BROW_MM[best] - mm)) best = k;
    return best;
  };
  HSC.browByGuard = browByGuard; // tests
  HSC.cutBrow = function (s, points) {
    const none = { state: s, changed: false, changedCells: 0, removedLength: 0, intensity: 0 };
    const cells = HSC.browCells && HSC.browCells();
    if (!s || s.status !== 'cutting' || s.interactionMode !== 'cut' || !cells || !Array.isArray(s.brow) || !Array.isArray(points)) return none;
    const tool = HSC.tool ? HSC.tool() : 'clipper';
    if (HSC.isRitual && HSC.isRitual()) return none;
    // each tool's millimetre target (tools.js); the old rule (razor/trimmer/guard 0 shave, the rest trim short)
    // remains only where the tools module is absent
    const to = HSC.toolBrow || tool === 'clipper' ? null : tool === 'razor' || tool === 'trimmer' ? 0 : 1;
    // on a brow a barber works with the blade's corner: a razor or trimmer slit is 2-3 mm wide. Brows face forward,
    // so the stroke is a brush of that width along the drag, in the brow grid's own x / y (cells are about 1 mm)
    const R = { razor: 0.03, trimmer: 0.04, scissors: 0.11, beard: 0.09, clipper: 0.14 }[tool] || 0.14;
    const next = s.brow.slice();
    let n = 0;
    const xy = (p) => (Number.isFinite(p.u) && Number.isFinite(p.v) ? [(p.u < 0.5 ? -1 : 1) * (0.2 + Math.abs(p.u - 0.5) * 2), 1.7 + p.v * 0.6] : null);
    const pts = points.map(xy).filter(Boolean);
    if (!pts.length) return none;
    const segs = pts.length === 1 ? [[pts[0], pts[0]]] : pts.slice(1).map((b, i) => [pts[i], b]);
    for (const [a, b] of segs) {
      // a stroke never jumps from one brow to the other
      if (Math.sign(a[0]) !== Math.sign(b[0])) continue;
      const x0 = Math.min(a[0], b[0]) - R, x1 = Math.max(a[0], b[0]) + R, y0 = Math.min(a[1], b[1]) - R, y1 = Math.max(a[1], b[1]) + R;
      const dx = b[0] - a[0], dy = b[1] - a[1], ll = dx * dx + dy * dy || 1e-9;
      for (let row = Math.max(0, Math.floor((y0 - 1.7) / 0.6 * 32)); row <= Math.min(31, Math.floor((y1 - 1.7) / 0.6 * 32)); row++) {
        const cy = 1.7 + (row + 0.5) / 32 * 0.6;
        for (let col = 0; col < 128; col++) {
          const u = (col + 0.5) / 128, cx = (u < 0.5 ? -1 : 1) * (0.2 + Math.abs(u - 0.5) * 2);
          if (cx < x0 || cx > x1) continue;
          const t = Math.max(0, Math.min(1, ((cx - a[0]) * dx + (cy - a[1]) * dy) / ll));
          if (Math.hypot(cx - a[0] - dx * t, cy - a[1] - dy * t) > R) continue;
          const c = row * 128 + col;
          const tc = to != null ? to : HSC.toolBrow ? HSC.toolBrow(next[c], s.selectedGuard) : browByGuard(next[c], s.selectedGuard);
          if (next[c] > tc) { next[c] = tc; n++; }
        }
      }
    }
    if (!n) return none;
    HSC.setBrow && HSC.setBrow(next);
    HSC.noteTool && HSC.noteTool(s.jobId);
    // a brow is grooming, not the haircut: cutStrokeCount (the job's real work: paid, judged, a break) stays
    return { state: Object.assign({}, s, { brow: next }), changed: true, changedCells: n, removedLength: n * 0.4, intensity: Math.min(1, n / 60) };
  };

  // a clipper stroke on the beard: every cell under the blade is cut down to the guard length
  HSC.cutBeard = function (s, points, surface) {
    const none = { state: s, changed: false, changedCells: 0, removedLength: 0, intensity: 0 };
    if (!s || s.status !== 'cutting' || s.interactionMode !== 'cut' || !surface || !Array.isArray(points) || !points.length) return none;
    // Android tools (tools.js) may set their own beard length and blade width
    const guard = HSC.toolBeard ? HSC.toolBeard(s.selectedGuard) : HSC.GUARD_LEVEL[s.selectedGuard];
    if (guard == null || !okBeard(s.beard)) return none;
    const BLADE_W = HSC.bladeWidth ? HSC.bladeWidth() : 0.56, BLADE_D = 0.1;
    // walk from the previous blade position to the current one in small steps
    const steps = [];
    const valid = points.filter((p) => p && Array.isArray(p.position) && Array.isArray(p.normal));
    for (let i = 0; i < valid.length; i++) {
      const b = valid[i], a = i ? valid[i - 1] : null;
      if (!a) { steps.push(b); continue; }
      const d = Math.hypot(b.position[0] - a.position[0], b.position[1] - a.position[1], b.position[2] - a.position[2]);
      const n = Math.max(1, Math.min(40, Math.ceil(d / 0.03)));
      for (let k = 1; k <= n; k++) {
        const t = k / n, lerp = (u, v) => u.map((x, j) => x + (v[j] - x) * t);
        steps.push({ position: lerp(a.position, b.position), normal: lerp(a.normal, b.normal), bladeAcross: lerp(a.bladeAcross || [1, 0, 0], b.bladeAcross || [1, 0, 0]), bladeAlong: lerp(a.bladeAlong || [0, 1, 0], b.bladeAlong || [0, 1, 0]) });
      }
    }
    const next = s.beard.slice();
    const changed = new Set();
    let removed = 0;
    const { positions: pos, spatial } = surface;
    const DEPTH = HSC.beardDepth || 0.1;
    const reach = Math.hypot(BLADE_W / 2, BLADE_D / 2, DEPTH);
    const unit = (v) => { const l = Math.hypot(...v) || 1; return v.map((x) => x / l); };
    for (const p of steps) {
      const g = p.position, across = unit(p.bladeAcross), along = unit(p.bladeAlong), nrm = unit(p.normal);
      const lo = g.map((x) => Math.floor((x - reach) / spatial.size)), hi = g.map((x) => Math.floor((x + reach) / spatial.size));
      for (let i = lo[0]; i <= hi[0]; i++) for (let j = lo[1]; j <= hi[1]; j++) for (let k = lo[2]; k <= hi[2]; k++) {
        const list = spatial.buckets.get(i + ',' + j + ',' + k);
        if (!list) continue;
        for (const c of list) {
          const d = [pos[c * 3] - g[0], pos[c * 3 + 1] - g[1], pos[c * 3 + 2] - g[2]];
          const dot = (v) => d[0] * v[0] + d[1] * v[1] + d[2] * v[2];
          if (Math.abs(dot(across)) > BLADE_W / 2 || Math.abs(dot(along)) > BLADE_D / 2 || Math.abs(dot(nrm)) > DEPTH) continue;
          const to = HSC.toolBeardCell ? HSC.toolBeardCell(next[c], guard) : guard;
          if (next[c] > to) {
            removed += HSC.BEARD_MM[next[c]] - HSC.BEARD_MM[to];
            next[c] = to;
            changed.add(c);
          }
        }
      }
    }
    if (!changed.size) return none;
    checked.add(next);
    HSC.noteTool && HSC.noteTool(s.jobId);
    return {
      state: Object.assign({}, s, { beard: next, cutStrokeCount: s.cutStrokeCount + 1 }),
      changed: true,
      changedCells: changed.size,
      removedLength: removed,
      intensity: Math.min(1, removed / Math.max(1, changed.size * 16)),
    };
  };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Progress between haircuts: barber level, the daily VIP, and the queue that decides
// who the next customer is (so the reveal screen can show them, and a video can swap in a VIP).
//
// Level gates which customer features appear, so the first session keeps showing something new:
//   1 scalp only (clean-shaven, full hair, young / middle-aged)   2 beards and moustaches, some hair loss
//   3 older customers and grey hair   4 advanced hair loss   5+ VIPs sometimes walk in on their own
// The four customer classes are never gated. Saved through the platform storage.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  const KEY = 'skin-fade-studio-meta-v1';
  const LEVEL_AT = [0, 2, 4, 7, 10]; // haircuts needed for levels 1..5, then one level every 5
  const cutsFor = (level) => (level <= 5 ? LEVEL_AT[level - 1] : 10 + 5 * (level - 5));
  const levelOf = (cuts) => {
    if (cuts >= 10) return 5 + Math.floor((cuts - 10) / 5);
    let l = 1;
    while (l < 5 && cuts >= cutsFor(l + 1)) l++;
    return l;
  };

  // ---- the variety director ----------------------------------------------------------------------
  // Customers are dealt, not rolled: each trait comes from a shuffled deck that is used up before it is
  // refilled, and the same card never comes twice in a row. Every few customers therefore cover every
  // heritage, age, kind of hair loss, beard and haircut, and nothing repeats back to back.
  // Every deck holds its cards in real-life proportions (so a White customer is usually brown-haired, an
  // older man usually clean-shaven, a young man rarely very bald), but each common option still comes round
  // in every pass through the deck. Hair loss and beards have one deck per age group; heritage then applies
  // its own odds (pattern baldness is rarer in East Asian and Black men, East Asian men shave more often).
  const DECKS = {
    her: [0, 1, 2, 3], // white, Black, East Asian, South Asian
    age: ['young', 'young', 'young', 'middle', 'middle', 'middle', 'old', 'old'],
    // hair loss (Norwood studies: about 1 in 2 young men has none, 1 in 8 men over 55)
    lossyoung: ['none', 'none', 'none', 'none', 'none', 'light', 'light', 'light', 'heavy'],
    lossmiddle: ['none', 'none', 'none', 'light', 'light', 'light', 'heavy', 'heavy'],
    lossold: ['none', 'none', 'light', 'light', 'light', 'heavy', 'heavy', 'heavy', 'heavy'],
    // facial hair (UK YouGov by age: clean-shaven 33% young, 40% middle-aged, 60% over 60)
    beardyoung: ['clean', 'clean', 'clean', 'stubble', 'stubble', 'stubble', 'style', 'style', 'style', 'style'],
    beardmiddle: ['clean', 'clean', 'clean', 'clean', 'stubble', 'style', 'style', 'style', 'style', 'style'],
    beardold: ['clean', 'clean', 'clean', 'clean', 'clean', 'clean', 'stubble', 'style', 'style', 'style'],
    fam: ['long', 'long', 'crop', 'crop', 'buzz', 'tight', 'full', 'shaved'],
    beardRecent: [], // the last beard styles dealt (kept so the next style differs)
  };
  // a deck from weights: each option's share of `size` cards (rare ones that round to nothing are left out)
  const deckFrom = (w, size) => {
    const tot = Object.values(w).reduce((a, b) => a + b, 0), out = [];
    for (const [k, v] of Object.entries(w)) for (let n = Math.round((v / tot) * size); n > 0; n--) out.push(k);
    return out;
  };
  // hair texture and natural colour: one deck per heritage, in its real proportions (UK Biobank for White
  // hair colour: mostly browns, about 1 in 8 blond, 1 in 20 red; Black hair coily, sometimes tightly curly)
  const PH = HSC.PHENOTYPES;
  (HSC.HERITAGE || []).forEach((h, i) => {
    DECKS['tex' + i] = deckFrom(h.tex, PH ? 30 : 10);
    const pal = HSC.HAIR_BY_CLASS && HSC.HAIR_BY_CLASS[h.id];
    if (pal) DECKS['col' + i] = deckFrom(pal.base, 30);
  });
  // Android: 12 phenotype groups, one card each, coarse ages and facial hair in real shares
  if (PH) {
    // every group comes round in every pass: one card each, so nobody waits long to meet any of them
    DECKS.her = (HSC.HERITAGE || []).map((h, i) => i);
    Object.assign(DECKS, PH.decks);
  }
  // draw the first allowed card (on the variety decks, one that differs from the last); refill (shuffled) when
  // none is left. The realism decks (texture, colour, hair loss, beard) may repeat: two straight-haired East
  // Asian customers in a row is normal; every card still comes round in each pass through the deck.
  const NO_REPEAT = { her: 1, age: 1, fam: 1 };
  function deal(name, R, allowed = () => true) {
    const d = M.data;
    let deck = d.deck[name] || [];
    const last = NO_REPEAT[name] ? d.last[name] : undefined;
    const fresh = () => { const a = DECKS[name].slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(R.next() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    let i = deck.findIndex((t) => allowed(t) && t !== last);
    if (i < 0) { deck = deck.concat(fresh()); i = deck.findIndex((t) => allowed(t) && t !== last); }
    if (i < 0) i = deck.findIndex((t) => allowed(t));
    const card = i < 0 ? DECKS[name].find(allowed) : deck.splice(i, 1)[0];
    d.deck[name] = deck.slice(0, 60);
    d.last[name] = card;
    return card;
  }
  // a beard style with its real odds for this age, never the same style twice in a row (a style is a grooming
  // choice: it never depends on heritage)
  function beardStyle(age, R, big) {
    const base = Object.assign({}, (HSC.BEARD_BY_AGE || {})[age] || {});
    const recent = M.data.deck.beardRecent || [];
    const w = {};
    for (const [k, v] of Object.entries(base)) {
      if (k === 'clean' || k === 'stubble' || recent.includes(k)) continue;
      if (big && !['full', 'long', 'boxed', 'shenandoah', 'mutton', 'ducktail', 'garibaldi'].includes(k)) continue;
      w[k] = v;
    }
    const style = Object.keys(w).length ? R.pick(w) : 'boxed';
    M.data.deck.beardRecent = [style];
    return style;
  }
  // the dealt traits as customer options, within what the level allows
  function dealt(level, R) {
    const o = { heritage: deal('her', R) };
    const H = (HSC.HERITAGE || [])[o.heritage] || { id: 'white' };
    const cls = H.id, bc = (HSC.BALD_BY_CLASS || {})[cls] || { prevalence: 1, types: { norwood: 1 } };
    o.age = deal('age', R, (a) => level >= 3 || a !== 'old');
    if (DECKS['tex' + o.heritage]) o.texture = deal('tex' + o.heritage, R);
    if (DECKS['col' + o.heritage] && HSC.HAIR) o.hairColour = HSC.HAIR[deal('col' + o.heritage, R)];
    // hair loss: the age deck, then the heritage's odds (where loss is rarer it steps down a stage)
    let loss = level >= 2 ? deal('loss' + o.age, R) : 'none';
    if (loss !== 'none' && R.next() > bc.prevalence) loss = loss === 'heavy' ? 'light' : 'none';
    if (level >= 2 && streak('loss', loss !== 'none')) loss = loss === 'none' ? 'light' : 'none';
    const types = Object.assign({}, bc.types);
    if (loss === 'none') o.noLoss = true;
    else if (loss === 'light') { o.norwood = R.pick({ 2: 3, 3: 3, '3v': 2 }); delete types.diffuse; o.baldType = R.pick(types); }
    else {
      const stage = { young: { 4: 3, 5: 1 }, middle: { 4: 2, 5: 2, 6: 1 }, old: { 4: 2, 5: 2, 6: 2, 7: 2 } }[o.age];
      o.norwood = level >= 4 ? R.pick(stage) : '4';
      o.baldType = R.pick(types);
    }
    // facial hair: the age deck, East Asian men shave more often, then a style with its real odds
    let beard = level >= 2 ? deal('beard' + o.age, R) : 'clean';
    const shave = H.shave != null ? H.shave : cls === 'east-asian' ? 0.45 : 0;
    if (shave && beard === 'style' && R.next() < shave) beard = 'clean';
    if (level >= 2 && streak('beard', beard !== 'clean')) beard = beard === 'clean' ? (o.age === 'young' ? 'stubble' : 'style') : 'clean';
    o.beard = beard === 'style' ? beardStyle(o.age, R) : beard === 'stubble' && PH && PH.stubble ? R.pick(PH.stubble) : beard;
    return o;
  }
  // no more than three in a row of the same kind (bearded / clean-shaven, hair loss / none): `kind` says
  // whether this customer is of the first kind; returns true when the streak is too long and must flip
  function streak(name, kind) {
    const d = M.data, r = (d.runs && d.runs[name]) || [0, 0];
    const flip = kind ? r[0] >= 3 : r[1] >= 3;
    return flip;
  }
  function note(name, kind) {
    const d = M.data;
    d.runs = d.runs || {};
    const r = d.runs[name] || [0, 0];
    d.runs[name] = kind ? [Math.min(9, r[0] + 1), 0] : [0, Math.min(9, r[1] + 1)];
  }
  // the haircut family for a customer: dealt too, from what suits them (no long or full tops on a bald crown)
  function dealFamily(person, R) {
    const b = person.bald || {};
    const heavy = ['4', '5', '6', '7'].includes(b.norwood) || b.type === 'diffuse';
    if (person.vip || person.first) return person.first ? 'full' : deal('fam', R, (f) => f === 'long' || f === 'full' || f === 'tight');
    // Android families: a hard side part / crew needs straight or wavy hair, an undercut up to loose curls;
    // faux hawks and undercuts are young men's cuts
    const ty = (person.hair && person.hair.type) || '1b';
    // age leaning (barber trend estimates): fades and textured cuts skew young, the classic side part / crew older
    const keep = PH ? ({ young: { classic: 0.45, shaved: 0.6 }, middle: { hawk: 0.4, undercut: 0.6 }, old: { fade: 0.3, long: 0.6, tight: 0 } }[person.age] || {}) : {};
    const lean = (f) => keep[f] == null || ((Math.imul((person.seed >>> 0) ^ (f.charCodeAt(0) * 2654435761 + f.length), 0x9e3779b1) >>> 8) / 16777216) < keep[f];
    const suits = (f) => (f === 'classic' ? ty[0] <= '2' : f === 'undercut' ? ty <= '3a' : true) && !((f === 'hawk' || f === 'undercut') && person.age === 'old') && lean(f);
    return deal('fam', R, (f) => (!heavy || f === 'crop' || f === 'buzz' || f === 'shaved') && !(f === 'tight' && person.age === 'old') && suits(f));
  }

  const M = (HSC.meta = { data: null, client: null, levelOf, cutsFor });
  // real work (modes.js): hair or beard really changed from the start; builds without the modes keep the stroke count
  const worked = (s) => !!s && (HSC.modes && HSC.modes.worked ? HSC.modes.worked(s) : s.cutStrokeCount > 0);

  const dayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const hash = (str) => { let h = 2166136261; for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };

  // ---- the game's day, robust to a wrong clock in both directions --------------------------------------------
  // Every daily limit counts by one game day. The device's date is followed, with a book of the days already used:
  //   - a day already used comes back with what was used on it (its record), so it never gives its limits twice;
  //   - a date one or two days back (a time zone crossed westward) keeps the day;
  //   - a date further back is a clock put right (a phone that booted with a wrong date ahead, then synced): the day
  //     moves back to it, but only to a day after the last one played before the clock jumped ahead (`low`), so
  //     turning the clock back can never deal days from before then;
  //   - the book keeps the last 32 days used; a day older than those (`floor`) counts as used.
  // So each calendar day gives its limits once at most, however often the clock moves, and a corrected clock
  // gets its real day back at once. Shared with the wardrobe's daily picks (wardrobe.js), which keep their own book.
  const BOOK = 32;
  const dayNum = (k) => { const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(typeof k === 'string' ? k : ''); return m ? Math.round(Date.UTC(+m[1], m[2] - 1, +m[3]) / 864e5) : NaN; };
  const okNum = (v) => (Number.isSafeInteger(v) && v > 0 && v < 1e6 ? v : null);
  HSC.dayBook = {
    num: dayNum,
    fresh: () => ({ low: null, floor: null, log: [] }),
    // a saved book: `entry` cleans one record (null drops it); the current day is never in the book
    clean(o, entry, cur) {
      const b = { low: null, floor: null, log: [] };
      if (!o || typeof o !== 'object') return b;
      b.low = okNum(o.low); b.floor = okNum(o.floor);
      const seen = new Set([dayNum(cur)]);
      for (const e of Array.isArray(o.log) ? o.log.slice(-BOOK) : []) {
        const n = dayNum(e && e.day), c = Number.isFinite(n) && !seen.has(n) ? entry(e) : null;
        if (c) { seen.add(n); b.log.push(c); }
      }
      return b;
    },
    // may the day move from `cur` to the device's `now`? (records a clock jump ahead in the book)
    may(B, cur, now) {
      const c = dayNum(cur), n = dayNum(now);
      if (!Number.isFinite(c)) return true;
      if (!Number.isFinite(n) || n === c) return false;
      if (B.floor != null && n <= B.floor) return false; // its record is gone: counted as used
      if (n < c && c - n <= 2) return false; // a time zone or a small set-back: the day stays
      const days = B.log.map((e) => dayNum(e.day));
      if (days.includes(n)) return true; // a day used before: its record comes back
      const top = Math.max(c, ...days);
      if (n > top) { if (n - top > 2 && B.low == null) B.low = top; return true; }
      return B.low != null && n >= B.low; // a day never played, earlier than one played: only a clock put right
    },
    // a day's record out of the book (it becomes the current day), or null
    take(B, day) {
      const n = dayNum(day), i = B.log.findIndex((e) => dayNum(e.day) === n);
      return i < 0 ? null : B.log.splice(i, 1)[0];
    },
    // a day left: its record goes into the book; the oldest beyond 32 leave it and raise the floor
    put(B, e) {
      const n = dayNum(e.day);
      B.log = B.log.filter((x) => dayNum(x.day) !== n).concat([e]);
      if (B.log.length > BOOK) {
        B.log.sort((a, b) => dayNum(a.day) - dayNum(b.day));
        while (B.log.length > BOOK) B.floor = Math.max(B.floor || 0, dayNum(B.log.shift().day));
      }
    },
  };

  function fresh() {
    return { v: 1, cuts: 0, firstDay: dayKey(), dailyDay: null, queue: null, trial: null, declines: 0, pauseLeft: 0, offerTurn: 0, seen: {}, deck: {}, last: {}, regulars: [], sinceReg: 0, coins: 0, lastRound: null, settings: null, modes: null, gift: null, maxDay: null, days: HSC.dayBook.fresh(), jobSeq: 0, counted: null };
  }
  const okTok = (v) => (typeof v === 'string' && v.length < 16) || (Number.isInteger(v) && v >= 0 && v < 8);
  function cleanDecks(o) {
    const out = {};
    if (o && typeof o === 'object') for (const k of Object.keys(DECKS)) if (Array.isArray(o[k]) && o[k].length <= 64 && o[k].every(okTok)) out[k] = o[k].slice();
    return out;
  }
  function cleanLast(o) {
    const out = {};
    if (o && typeof o === 'object') for (const k of Object.keys(DECKS)) if (okTok(o[k])) out[k] = o[k];
    return out;
  }
  function cleanRuns(o) {
    const out = {};
    if (o && typeof o === 'object') for (const k of ['loss', 'beard']) if (Array.isArray(o[k]) && o[k].length === 2 && o[k].every((v) => Number.isInteger(v) && v >= 0 && v <= 9)) out[k] = o[k].slice();
    return out;
  }
  // ---- regulars (Android, extras.js) ----
  // Customers the player has really cut may become regulars (about 3 in 5): the last 6 are kept with the cut
  // they left with. From the next day, or 10 customers later, one may walk back in with that cut grown out
  // (1-2 weeks of growth) and his beard grown back toward his usual style. Never two regulars close together.
  const REG = !!(HSC.PHENOTYPES && HSC.gridPack);
  const MAX_REG = 6;
  const gridOk = (s, max) => !!HSC.gridUnpack && !!HSC.gridUnpack(s, max);
  const dayOk = (v) => typeof v === 'string' && /^\d{4}-\d\d-\d\d$/.test(v);
  function cleanRegulars(a) {
    if (!REG || !Array.isArray(a)) return [];
    const top = HSC.BEARD_MM.length - 1;
    return a.slice(-64).filter((r) => r && typeof r === 'object' && HSC.validPerson(r.p) && gridOk(r.h, 5) && gridOk(r.b, top) && gridOk(r.u, top) &&
      (r.pr === null || (typeof r.pr === 'string' && r.pr.length < 40)) && dayOk(r.day) && Number.isSafeInteger(r.cuts) && r.cuts >= 0 && Number.isSafeInteger(r.n) && r.n >= 1 && r.n < 1000)
      .slice(-MAX_REG).map((r) => ({ p: r.p, h: r.h, b: r.b, u: r.u, pr: r.pr, day: r.day, cuts: r.cuts, n: r.n }));
  }
  const keepsComing = (seed) => ((Math.imul((seed >>> 0) ^ 0x1b873593, 0x9e3779b1) >>> 0) % 5) < 3;
  // a finished customer joins the regulars (his record without the visit's own flags)
  function rememberRegular(state) {
    const d = M.data, p = state && state.look && state.look.person;
    if (!REG || !d || !p || !HSC.validPerson(p) || p.first || !worked(state) || !keepsComing(p.seed)) return;
    if (!Array.isArray(state.hair) || state.hair.length !== 8192 || !Array.isArray(state.beard) || !Array.isArray(state.startBeard)) return;
    // a returning regular keeps his usual beard (the queue still holds this visit's entry)
    const q = d.queue && d.queue.job === state.jobId && d.queue.person && d.queue.person.seed === p.seed ? d.queue.regular : null;
    const h = HSC.gridPack(state.hair), b = HSC.gridPack(state.beard), u = q && q.u ? q.u : HSC.gridPack(state.startBeard);
    if (h.length + b.length + u.length > 16000) return; // a very ragged cut is not kept (save size)
    const n = Math.min(999, (Number.isSafeInteger(p.regular) ? p.regular : 0) + 1);
    const rec = Object.assign({}, p);
    for (const k of ['job', 'vip', 'daily', 'first', 'regular']) delete rec[k];
    // the cut he asked for this time is his usual next time (requests.js)
    const asked = HSC.requestStyleFor ? HSC.requestStyleFor(state.jobId) : null;
    if (asked) rec.usual = asked; else if (typeof rec.usual !== 'string') delete rec.usual;
    const prof = state.look && typeof state.look.profile === 'string' ? state.look.profile : null;
    d.regulars = d.regulars.filter((r) => r.p.seed !== p.seed).concat([{ p: rec, h, b, u, pr: prof, day: dayKey(), cuts: d.cuts, n }]).slice(-MAX_REG);
  }
  // the regular who walks in next, or null
  function regularDue(level, seed) {
    const d = M.data;
    if (!REG || level < 2 || !d.regulars.length || (d.sinceReg || 0) < 3) return null;
    const today = dayKey(), R = HSC.rng(((seed >>> 0) ^ 0x68e31da4) >>> 0 || 1);
    const due = d.regulars.filter((r) => r.day < today || d.cuts - r.cuts >= 10);
    if (!due.length || R.next() >= 0.3) return null;
    const r = due[0], top = HSC.BEARD_MM.length - 1;
    const hair = HSC.gridUnpack(r.h, 5), beard = HSC.gridUnpack(r.b, top), usual = HSC.gridUnpack(r.u, top);
    if (!hair || !beard || !usual) return null;
    const g = HSC.regularGrow(hair, beard, usual, R.next() < 0.55 ? 1 : 2);
    d.regulars = d.regulars.filter((x) => x !== r);
    return { person: Object.assign({}, r.p, { regular: r.n }), profile: r.pr, regular: { h: HSC.gridPack(g.hair), b: HSC.gridPack(g.beard), u: r.u } };
  }
  // the last scored customer (requests.js): stars, tips paid and whether they were tripled
  // the game mode, its current job (a flawed start and its repair, packed) and the daily challenge (modes.js)
  function cleanModes(o) {
    if (!o || typeof o !== 'object') return null;
    const MODES = ['career', 'requests', 'free', 'fix', 'beard', 'rush'];
    const j = o.job, okJob = j && typeof j === 'object' && Number.isSafeInteger(j.n) && MODES.includes(j.m) &&
      (j.none === true || (typeof j.st === 'string' && j.st.length < 40 && (typeof j.t === 'string' ? j.t.length < 24000 : typeof j.b === 'string' && j.b.length < 24000)));
    const dl = o.daily, okDaily = dl && typeof dl === 'object' && typeof dl.day === 'string' && /^\d{4}-\d\d-\d\d$/.test(dl.day) && [0, 1, 2, 3].includes(dl.stars);
    return { taste: o.taste === true, qp: o.qp && typeof o.qp.day === 'string' && Number.isSafeInteger(o.qp.n) ? { day: o.qp.day, n: o.qp.n } : null, wait: Number.isSafeInteger(o.wait) && o.wait >= 0 && o.wait < 100 ? o.wait : undefined, pv: o.pv && typeof o.pv.day === 'string' && Number.isSafeInteger(o.pv.n) ? { day: o.pv.day, n: o.pv.n } : null, mode: MODES.includes(o.mode) ? o.mode : 'requests', job: okJob ? { n: j.n, m: j.m, st: j.st, t: j.t, b: j.b, none: j.none === true || undefined } : null,
      ask: Array.isArray(o.ask) ? o.ask.filter((x) => typeof x === 'string' && x.length < 48).slice(-14) : [], wv: o.wv && typeof o.wv.day === 'string' && Number.isSafeInteger(o.wv.n) ? { day: o.wv.day, n: o.wv.n, pend: typeof o.wv.pend === 'string' && o.wv.pend.length < 80 ? o.wv.pend : null } : null, daily: okDaily ? { day: dl.day, stars: dl.stars, paid: dl.paid === true } : null, beforeDaily: MODES.includes(o.beforeDaily) && o.beforeDaily !== 'daily' ? o.beforeDaily : null, tried: Array.isArray(o.tried) ? o.tried.filter((m) => MODES.includes(m)).slice(0, 10) : [], rush: Number.isSafeInteger(o.rush) && o.rush >= 0 ? Math.min(o.rush, 1e6) : 0,
      // the Rush clock's play time used on this job, so a restart cannot give the clock back (modes.js)
      clock: o.clock && Number.isSafeInteger(o.clock.n) && Number.isFinite(o.clock.ms) ? { n: o.clock.n, ms: Math.max(0, Math.min(o.clock.ms, 45000)) } : null,
      // a Career Rush contract's clock, kept by the contract's id (Career can seat the contract on a new job)
      cclock: o.cclock && typeof o.cclock.id === 'string' && o.cclock.id.length < 160 && Number.isFinite(o.cclock.ms) ? { id: o.cclock.id, ms: Math.max(0, Math.min(o.cclock.ms, 45000)) } : null,
      // the order an Orders customer was given (requests.js), so a reload shows and scores the same order
      ord: o.ord && Number.isSafeInteger(o.ord.n) && Number.isSafeInteger(o.ord.p) && typeof o.ord.st === 'string' && o.ord.st.length < 40 ? { n: o.ord.n, p: o.ord.p, st: o.ord.st, bs: typeof o.ord.bs === 'string' && o.ord.bs.length < 24 ? o.ord.bs : null } : null };
  }
  // the play-time gift: today's active play seconds and the gifts taken (session.js)
  function cleanGift(o) {
    if (!o || typeof o !== 'object' || typeof o.day !== 'string' || !/^\d{4}-\d\d-\d\d$/.test(o.day)) return null;
    // dbl: the gift whose doubling video was watched but whose coins did not land yet (paid doubled, no new video)
    return Object.assign({ day: o.day, sec: Number.isFinite(o.sec) && o.sec >= 0 ? Math.min(o.sec, 86400) : 0, got: Number.isSafeInteger(o.got) && o.got >= 0 ? Math.min(o.got, 9) : 0 }, Number.isSafeInteger(o.dbl) && o.dbl >= 0 && o.dbl < 9 ? { dbl: o.dbl } : {});
  }
  // one used day in the day book: what each daily limit had used on it (only records of that same day)
  const XCAP = /^[a-z]{1,12}$/;
  function cleanDayEntry(e) {
    if (!e || typeof e !== 'object' || !dayOk(e.day)) return null;
    const own = (o) => (o && o.day === e.day ? o : null);
    const m = cleanModes({ wv: e.wv, qp: e.qp, pv: e.pv }) || {};
    const out = { day: e.day }, g = own(cleanGift(e.gift));
    if (g) out.gift = g;
    for (const k of ['wv', 'qp', 'pv']) if (own(m[k])) out[k] = m[k];
    if (e.vip === true) out.vip = true;
    // limits kept by other modules (M.dailyCap): small plain records of the same day, cleaned again by their owner
    if (e.x && typeof e.x === 'object') for (const k of Object.keys(e.x).slice(0, 4)) {
      const v = e.x[k];
      let s = '';
      try { s = JSON.stringify(v); } catch (err) { continue; }
      if (XCAP.test(k) && v && typeof v === 'object' && v.day === e.day && s.length <= 600) (out.x || (out.x = {}))[k] = JSON.parse(s);
    }
    return out;
  }
  // the player's settings (settings.js)
  function cleanSettings(o) {
    if (!o || typeof o !== 'object') return null;
    const b = (v, d) => (typeof v === 'boolean' ? v : d);
    return { left: b(o.left, false) };
  }
  function cleanRound(r) {
    if (!r || typeof r !== 'object' || !Number.isSafeInteger(r.job) || ![0, 1, 2, 3].includes(r.stars)) return null;
    const n = (v) => (Number.isSafeInteger(v) && v >= 0 && v < 1e6 ? v : 0);
    const key = typeof r.key === 'string' && r.key.length <= 160 ? r.key : null;
    const lines = Array.isArray(r.lines) ? r.lines.filter((x) => Array.isArray(x) && x.length === 2 && typeof x[0] === 'string' && x[0].length < 32 && Number.isSafeInteger(x[1]) && Math.abs(x[1]) < 1e6).slice(0, 24) : [];
    const bill = r.bill && typeof r.bill.key === 'string' && r.bill.key.length < 80 ? { key: r.bill.key, lines: Array.isArray(r.bill.lines) ? r.bill.lines.filter((x) => Array.isArray(x) && x.length === 2 && typeof x[0] === 'string' && Number.isSafeInteger(x[1])).slice(0, 8) : [] } : null;
    // what the economy has not committed yet (requests.js pays it at the next start): the job as the economy reads it
    const pj = r.pend && r.pend.job, okJob = pj && typeof pj === 'object' && typeof pj.kind === 'string' && pj.kind.length < 16 && [0, 1, 2, 3].includes(pj.stars) && pj.valid === true;
    const pq = r.pend && r.pend.quick, okQuick = Array.isArray(pq) && pq.length === 2 && typeof pq[0] === 'string' && pq[0].length < 80 && Number.isSafeInteger(pq[1]) && pq[1] > 0 && pq[1] < 1000;
    const pend = okJob || okQuick ? Object.assign({}, okJob ? { job: { kind: pj.kind, stars: pj.stars, judged: pj.judged === true, valid: true, regular: pj.regular === true, vip: pj.vip === true, early: pj.early === true, rushBonus: Number.isSafeInteger(pj.rushBonus) ? Math.max(0, Math.min(12, pj.rushBonus)) : 0, demandMatch: pj.demandMatch === true } } : {}, okQuick ? { quick: [pq[0], pq[1]] } : {}) : null;
    // who this round was (requests.js): a job number repeated after the game's session was replaced is not the same job
    const u32 = (v) => (Number.isSafeInteger(v) && v >= 0 && v <= 0xffffffff ? v : undefined);
    return Object.assign({ p: u32(r.p), sd: u32(r.sd), seq: Number.isSafeInteger(r.seq) && r.seq >= 0 ? r.seq : undefined }, { job: r.job, key, judged: r.judged === true, video: n(r.video), stars: r.stars, tips: n(r.tips), tip: n(r.tip), paid: n(r.paid), lines, bill, tripled: r.tripled === true, shownStars: [1, 2, 3].includes(r.shownStars) ? r.shownStars : r.stars, prev: Math.min(999, n(r.prev)), mult: [1, 1.2, 1.5, 2].includes(r.mult) ? r.mult : 1, free: r.free === true }, pend && key ? { pend } : {});
  }
  // the latest day this save has seen (a save from before the game's day kept one: the days its limits were counted on)
  function latestDay(d) {
    const days = [d.maxDay, d.dailyDay, d.gift && d.gift.day].concat(d.modes ? ['wv', 'qp', 'pv'].map((k) => d.modes[k] && d.modes[k].day) : []).filter(dayOk);
    return days.length ? days.reduce((a, b) => (b > a ? b : a)) : null;
  }
  function sanitize(d) {
    const f = fresh();
    if (!d || typeof d !== 'object' || d.v !== 1) return f;
    const int = (v, dflt) => (Number.isSafeInteger(v) && v >= 0 ? v : dflt);
    const str = (v) => (typeof v === 'string' && /^\d{4}-\d\d-\d\d$/.test(v) ? v : null);
    const q = d.queue && Number.isSafeInteger(d.queue.job) && HSC.validPerson(d.queue.person) ? { job: d.queue.job, person: d.queue.person, profile: typeof d.queue.profile === 'string' ? d.queue.profile : null } : null;
    // a regular in the queue keeps his grown-out hair and beard only when both unpack cleanly
    const qr = d.queue && d.queue.regular, top = HSC.BEARD_MM ? HSC.BEARD_MM.length - 1 : 0;
    if (q && REG && qr && gridOk(qr.h, 5) && gridOk(qr.b, top) && gridOk(qr.u, top)) q.regular = { h: qr.h, b: qr.b, u: qr.u };
    const t = d.trial && Number.isSafeInteger(d.trial.job) && typeof d.trial.key === 'string' ? d.trial : null;
    // a save with a day book keeps its own day (it can be earlier than a limit's day after a clock put right)
    const day = d.days && typeof d.days === 'object' && dayOk(d.maxDay) ? d.maxDay : latestDay(d);
    return {
      v: 1, cuts: int(d.cuts, 0), homeSeen: d.homeSeen === true || int(d.cuts, 0) > 1, firstDay: str(d.firstDay) || f.firstDay,
      dailyDay: str(d.dailyDay), queue: q, trial: t, declines: int(d.declines, 0), pauseLeft: int(d.pauseLeft, 0),
      offerTurn: int(d.offerTurn, 0), seen: d.seen && typeof d.seen === 'object' ? d.seen : {},
      deck: cleanDecks(d.deck), last: cleanLast(d.last), sinceVip: int(d.sinceVip, 9), runs: cleanRuns(d.runs), regulars: cleanRegulars(d.regulars), sinceReg: int(d.sinceReg, 0), coins: Math.min(99999999, int(d.coins, 0)), lastRound: cleanRound(d.lastRound), combo: Math.min(999, int(d.combo, 0)), settings: cleanSettings(d.settings), modes: cleanModes(d.modes), gift: cleanGift(d.gift),
      maxDay: day, days: HSC.dayBook.clean(d.days, cleanDayEntry, day), jobSeq: int(d.jobSeq, 0), counted: typeof d.counted === 'string' && d.counted.length <= 160 ? d.counted : null,
    };
  }
  M.save = function () {
    if (M.client && M.client.saveProgress && M.data) M.client.saveProgress(KEY, M.data).catch(() => {});
  };
  // loaded before the game controller starts, so the first customer already follows the level
  HSC.metaInit = async function (client) {
    M.client = client;
    const d = client && client.loadProgress ? await client.loadProgress(KEY, null) : null;
    M.data = sanitize(d);
    oneTab(client);
  };
  // one game at a time: a newer tab takes over and this one pauses and stops saving (two tabs writing
  // the same saves would lose unlocks and progress). The tab in front always plays: coming back to a paused
  // tab, or the other tab closing while this one is in view, reloads it with the latest saves.
  function oneTab(client) { /* YouTube owns foreground, pause and resume. */ }

  M.level = () => levelOf(M.data ? M.data.cuts : 0);
  // how far the barber is through the current level, 0..1 (the home screen's XP bar)
  M.levelProgress = () => { const c = M.data ? M.data.cuts : 0, l = levelOf(c), a = cutsFor(l), b = cutsFor(l + 1); return b > a ? Math.max(0, Math.min(1, (c - a) / (b - a))) : 0; };
  // the game's day for every daily limit (gifts, videos, Quick Play pay, tasks, the daily VIP): the device's date,
  // kept by the day book (above). Moving to another day files the day left with what its limits used and brings
  // back the new day's own record, if it was used before; a limit with no record that day starts afresh.
  const caps = {}; // limits other modules keep in their own saves: name -> [get, set]
  M.dailyCap = (name, get, set) => { if (XCAP.test(name) && typeof get === 'function' && typeof set === 'function') caps[name] = [get, set]; };
  function leaveDay(d, day) {
    const e = { day }, md = d.modes;
    let used = false;
    if (d.gift && d.gift.day === day) { e.gift = d.gift; used = true; }
    if (md) for (const k of ['wv', 'qp', 'pv']) if (md[k] && md[k].day === day) { e[k] = md[k]; used = true; }
    if (d.dailyDay === day) { e.vip = true; used = true; }
    for (const [k, [get]] of Object.entries(caps)) {
      let v = null;
      try { v = get(); } catch (err) {}
      if (v && v.day === day) { (e.x || (e.x = {}))[k] = v; used = true; }
    }
    // the same objects, not copies: a claim still finishing for the day left (a video across midnight) lands in its record
    if (used) HSC.dayBook.put(d.days, e);
  }
  function enterDay(d, day, e) {
    const md = d.modes;
    d.gift = e.gift || null;
    if (md) for (const k of ['wv', 'qp', 'pv']) md[k] = e[k] || null;
    d.dailyDay = e.vip ? day : null;
    for (const [k, [, set]] of Object.entries(caps)) { try { set((e.x && e.x[k]) || null); } catch (err) {} }
  }
  M.today = () => {
    const now = dayKey(), d = M.data;
    if (!d) return now;
    if (!d.days) d.days = HSC.dayBook.fresh();
    if (!dayOk(d.maxDay)) { d.maxDay = now; M.save(); return now; }
    if (now === d.maxDay || !HSC.dayBook.may(d.days, d.maxDay, now)) return d.maxDay;
    // the new day's record is taken out first, so filing the day left can never push it out of the book
    const e = HSC.dayBook.take(d.days, now) || { day: now };
    leaveDay(d, d.maxDay);
    d.maxDay = now;
    enterDay(d, now, e);
    M.save();
    return now;
  };

  // ---- customers ----
  // what a customer may have at this level; `extra` forces a showcase feature or a VIP
  function generate(seed, level, extra = {}) {
    const R = HSC.rng((seed ^ 0x2c1b3c6d) >>> 0 || 1);
    const opts = extra.first ? {} : dealt(level, R);
    if (level < 3) { if (!opts.age || opts.age === 'old') opts.age = R.next() < 0.55 ? 'young' : 'middle'; opts.grey = 0; opts.beardGrey = 0; }
    if (level < 2) { opts.noLoss = true; delete opts.norwood; delete opts.baldType; }
    if (extra.feature === 'old') { opts.age = 'old'; delete opts.grey; delete opts.beardGrey; }
    if (extra.feature === 'loss') { delete opts.noLoss; delete opts.baldType; opts.norwood = ['3', '3v', '4', '5'][Math.floor(R.next() * 4)]; }
    // the very first customer is the tutorial's full head of hair; a VIP is context, never a physical upgrade
    if (extra.first) { opts.noLoss = true; delete opts.norwood; delete opts.baldType; opts.age = R.next() < 0.6 ? 'young' : 'middle'; opts.grey = 0; opts.beardGrey = 0; }
    // what this level or feature needs is selected from naturally generated customers, never written onto one
    const shaved = extra.first || level < 2, wantBeard = extra.feature === 'beard';
    if (shaved || wantBeard) delete opts.beard; // the dealt style gives way: selection decides
    // before level 4, hair loss stops at a Norwood 4 (the very bald crowns come later): selected too, never rewritten
    const crownOk = (x) => level >= 4 || !!extra.feature || !['5', '6', '7'].includes(x.bald.norwood);
    const fits = (x) => crownOk(x) && (shaved ? x.beard.style === 'clean' : !wantBeard || !['clean', 'stubble'].includes(x.beard.style.replace(/\d+$/, '')));
    // the fallback (an impossible run of seeds) asks the generator for what the level allows instead
    const cap = level < 4 && !extra.feature && !opts.noLoss && (opts.norwood == null || ['5', '6', '7'].includes(String(opts.norwood))) ? { norwood: '4' } : {};
    const p = HSC.selectPerson(seed >>> 0 || 1, opts, fits) || HSC.makePerson(seed >>> 0 || 1, Object.assign({}, opts, shaved ? { beard: 'clean' } : {}, cap));
    // the runs count the customer as finally made (after the VIP and showcase rules)
    if (M.data && !extra.first && level >= 2) { note('loss', p.bald.norwood !== '1' || p.bald.type !== 'none'); note('beard', p.beard.style !== 'clean'); }
    if (extra.vip) p.vip = true;
    if (extra.first) p.first = true;
    if (extra.daily) p.daily = extra.daily;
    return p;
  }
  M.makeVip = (seed) => generate(seed, M.level(), { vip: true });
  // the walk-in hair is decided with the customer, so the reveal hub can show them exactly
  M.profileFor = function (person, recent) {
    const W = HSC.walkIns;
    if (!W) return null;
    const fam = M.data ? dealFamily(person, HSC.rng(((person.seed >>> 0) ^ 0x7f4a7c15) >>> 0 || 1)) : null;
    const p = HSC.pickWalkIn(person, Array.isArray(recent) ? recent : [], fam);
    return p ? p.id : null;
  };

  // the customer for a job; `seed` is the game's own per-job seed
  HSC.personForJob = function (s, seed) {
    const d = M.data;
    if (d && d.queue && d.queue.job === s.jobId && HSC.validPerson(d.queue.person)) return Object.assign({}, d.queue.person, { job: s.jobId });
    const first = !!d && d.cuts === 0 && s.jobId === 1;
    // Quick Play is the open game: any customer can walk in at any level
    const level = HSC.modes && HSC.modes.current() === 'free' ? 99 : M.level();
    return Object.assign(generate(seed, level, first ? { first: true } : {}), { job: s.jobId });
  };

  // a haircut was finished: progress, and who comes in next
  M.onFinish = function (state) {
    const d = M.data;
    if (!d) return null;
    const before = levelOf(d.cuts);
    // level comes from paid work only: not a customer finished with no cut, Quick Play, an empty chair or a job seen twice
    const noWork = d.lastRound && d.lastRound.job === state.jobId && d.lastRound.judged && !d.lastRound.stars; // Rescue or Beards with no real work
    const paid = worked(state) && !noWork && !(HSC.modes && HSC.modes.econJob(state).kind === 'free') && !(HSC.repeatJob && HSC.repeatJob(state.jobId));
    // counted once per job (its pay key), so a reveal finished again after a reload never counts the cut twice
    const ck = d.lastRound && d.lastRound.job === state.jobId && d.lastRound.key ? d.lastRound.key : 'job' + state.jobId;
    if (paid && d.counted !== ck) { d.cuts += 1; d.counted = ck; rememberRegular(state); }
    const level = levelOf(d.cuts);
    const today = M.today();
    // next customer: the new level's feature > daily VIP (from the second day on; once per game day, so never twice
    // for one day whatever the clock does: the day book brings back a day's VIP with the day) > VIP walk-in > anyone
    const job = state.jobId + 1;
    // Career picks its own next customer (career-run.js): the daily VIP and due regulars wait for the other modes
    if (HSC.modes && HSC.modes.current() === 'career') { M.save(); return { levelUp: level > before, level, before, job }; }
    // the next customer was already chosen and shown: they stay (a daily VIP too)
    if (d.queue && d.queue.job === job && HSC.validPerson(d.queue.person)) {
      M.save();
      return { levelUp: level > before, level, before, job };
    }
    const seed = (((state.seed >>> 0) ^ Math.imul(job + 1, 0x9e3779b1)) >>> 0) || 1;
    let person, reg = null;
    // Quick Play is the open game: its next customer can be anyone, at any level
    const open = HSC.modes && HSC.modes.current() === 'free', gl = open ? 99 : level;
    const FEATURE = { 2: 'beard', 3: 'old', 4: 'loss' };
    // a VIP (full hair, a big beard) waits a customer when it would make a fourth of a kind in a row
    const vipFits = !streak('loss', false) && (level < 2 || !streak('beard', true));
    if (level > before && FEATURE[level]) {
      person = generate(seed, level, { feature: FEATURE[level] });
    } else if (d.dailyDay !== today && d.firstDay !== today && vipFits) {
      person = generate(hash('daily-' + today), gl, { vip: true, daily: today });
      d.dailyDay = today;
    } else if (level > before && level === 5 && vipFits) {
      person = generate(seed, level, { vip: true });
    } else if (!open && (reg = regularDue(level, seed))) {
      // a regular comes back with his last cut grown out
      person = reg.person;
      note('loss', person.bald.norwood !== '1' || person.bald.type !== 'none');
      note('beard', person.beard.style !== 'clean');
    } else {
      // VIPs walk in now and then, never two close together
      person = generate(seed, gl, level >= 5 && vipFits && (d.sinceVip || 0) >= 4 && HSC.rng(seed).next() < 0.18 ? { vip: true } : {});
    }
    d.sinceVip = person.vip ? 0 : (d.sinceVip || 0) + 1;
    if (REG) d.sinceReg = reg ? 0 : (d.sinceReg || 0) + 1;
    d.queue = reg ? { job, person, profile: reg.profile, regular: reg.regular } : { job, person, profile: M.profileFor(person, state.recentLooks) };
    M.save();
    return { levelUp: level > before, level, before, job };
  };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Rewards catalogue: complete clipper and gown designs built from these colours, metal finishes and
// patterns. The starting look is free; every other design unlocks with rewarded videos.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';

  const COLOURS = [
    // id, hex, tier (0 starter, 1 common, 2 uncommon, 3 special)
    ['charcoal', '#34363b', 0], ['jet', '#17181a', 0], ['silver', '#b9bec5', 0], ['red', '#c8262e', 0],
    ['steel', '#2f4f6a', 0], ['white', '#f2f1ec', 0], ['navy', '#1d2c50', 0],
    ['graphite', '#4c5058', 1], ['cream', '#efe3c6', 1], ['sand', '#d6c096', 1], ['tan', '#b88857', 1],
    ['brown', '#6a4329', 1], ['burgundy', '#6d1f2e', 1], ['orange', '#ef8420', 1], ['yellow', '#f2cf37', 1],
    ['green', '#2e9549', 1], ['forest', '#1e573a', 1], ['blue', '#2a60c6', 1], ['sky', '#78c1ee', 1],
    ['purple', '#6b3aa6', 1], ['pink', '#f29abf', 1], ['grey', '#8a8f96', 1],
    ['coral', '#ef6a56', 2], ['amber', '#f2a91c', 2], ['lime', '#a4d43b', 2], ['olive', '#6a6f35', 2],
    ['mint', '#9de0c0', 2], ['teal', '#14807c', 2], ['cyan', '#28b3d4', 2], ['indigo', '#3a2f8c', 2],
    ['violet', '#9a69dc', 2], ['lavender', '#c3b1e8', 2], ['magenta', '#d4337e', 2], ['rose', '#c46a79', 2],
    ['peach', '#f5b893', 2], ['mustard', '#c99a2a', 2], ['denim', '#4a6a92', 2], ['khaki', '#a89b6e', 2],
    ['neon-green', '#3bff6c', 3], ['neon-pink', '#ff3fa6', 3], ['neon-orange', '#ff7a1a', 3], ['neon-blue', '#2ad4ff', 3],
    ['pearl', '#f4efe6', 3], ['candy-red', '#e0102a', 3], ['royal-gold', '#d4a62a', 3], ['midnight', '#0e1230', 3],
  ];

  // clipper metal parts
  const FINISHES = [
    // id, light metal, dark metal, metalness, roughness, tier
    ['chrome', '#cfd5da', '#8a9298', 1, 0.22, 0],
    ['brushed', '#c4c8cc', '#8c9196', 1, 0.42, 1],
    ['gunmetal', '#6b7076', '#3e4248', 1, 0.3, 1],
    ['matte-black', '#3a3b3e', '#232427', 0.2, 0.62, 2],
    ['black-chrome', '#4a4d52', '#26282b', 1, 0.16, 2],
    ['gold', '#e3be5b', '#a8832c', 1, 0.2, 3],
    ['rose-gold', '#e7b0a0', '#b0705f', 1, 0.22, 3],
    ['copper', '#d98a5b', '#97522e', 1, 0.26, 2],
    ['titanium-blue', '#7f97d8', '#4a5aa3', 1, 0.24, 3],
    ['titanium-violet', '#a98ad6', '#6a4c9c', 1, 0.24, 3],
    ['white-ceramic', '#f1efea', '#c9c6bf', 0, 0.35, 3],
  ];

  // patterns: drawn on a canvas with the two chosen colours (see patterns.js)
  const CLIPPER_PATTERNS = [
    ['solid', 0], ['two-tone', 0], ['racing', 1], ['pinstripe', 1], ['carbon', 2], ['camo', 2], ['marble', 3],
    ['chevron', 1], ['dots', 1], ['fade', 2], ['checker', 1], ['flames', 3], ['honeycomb', 2], ['wood', 2],
    ['leopard', 3], ['zebra', 3], ['diamond-plate', 3], ['galaxy', 3],
  ];
  const GOWN_PATTERNS = [
    ['solid', 0], ['stripes', 0], ['pinstripe', 1], ['gingham', 1], ['tartan', 2], ['dots', 1], ['chevron', 2],
    ['houndstooth', 2], ['yoke', 1], ['fade', 2], ['argyle', 3], ['waves', 2], ['barber-pole', 3], ['floral', 3],
    ['palms', 3], ['scissors', 3], ['camo', 2], ['checker', 1],
  ];

  const colourHex = new Map(COLOURS.map(([id, hex]) => [id, hex]));
  const finishes = new Map(FINISHES.map(([id, light, dark, metal, rough]) => [id, { id, light, dark, metal, rough }]));

  // Complete, ready-made designs: the player picks a whole clipper or a whole gown. 1,000 clippers and
  // 600 gowns, generated once with colour-harmony rules (every pair of colours goes together, colours that
  // look the same side by side were merged, two-colour patterns have enough contrast to show) and frozen
  // here so that no design ever changes between versions. The first of each is the starting look (free);
  // the rest unlock with one rewarded video each. One clipper and one robe from these are on offer each
  // day (wardrobe.js).
  // Each design is 5 characters: colour / colour / finish-or-pattern / pattern-or-collar indices into the
  // lists above, then shelf * 2 + premium. Clipper: body, accent, finish, pattern. Gown: main, second,
  // pattern, collar.
  const CLIPPER_CODE = 'ABAAAFBDAAiKAACBJHCEeQCKGDBAJIVOGALfTAOPBeJANtCDBAMPABCCbDCEENAKGBaAJIOVFBLgBARPBmDCNbeABAfOCACtTCDEGPDKGEQCJICMFALVNFNPBDFHNQFCAADiCBCFEDCEtNAKGCZCJIiCHAKEXCNOBOCBNCMAAAMhAACGiACELXAIGYECJIOLFBLBMAEOBXDINBiDBAKJAACCLHDEVGAIGbBCHIKVHAKCOAGPBNHCNtYCAASODBCWbCDERZAIGOCCHIVMHAKbUCLPBeAINEBCAANaAACSgDCELiCKGhEDJIXVGALbXALPBgHANVgCBAXLABCEYCDEXGDKGYtCHIVRIALEJDRPBNAKNtEAAAOfAACCDDDEZRCIGCWFHJBSIBLbeDGPBOHHNCZAAAMYDBCBCFDFtFDIGGPAJIWLHBKQfAFOBDGKNaMDBAiGCBCUBHCEDaDIGhBFHJKiFALTKAEOBgHINtiCBAePABCKbDDEQRDIGUFCHIiVHBKLEDPPBODBNCZABAeCDBCGKCCEmCDKGfLCHIfRJBLCXDNOBOGJNVGCBANSCBCBMCDECRDIGeQAHIJFHAKbTDRPBTICNLeCBASLDBCgCGDFSWCIGfbAHISFIALgQCQPBeACNLfABAhPCACFLCDESUAIGViCJIiLFALLVFEPBTCANbiCBAWFCACXVCDENFDIGbBDJIEFJALGOCNOBDCHNCQABARfCBCSPCDEKSDIGfLAJIWFGALVaDRPBgAANJKCAAYMCBCLCFDFVhAKGBRAJIhFFALCNGGPBTIDNJCDAAXSDBCJLHDEJVHKGLtAHIbCIBLmFCLPBXFDNGYCBAMECBCLVDDEOVHIGFeIHJNCGBLJeAOPBTDINtYABAiSABChQCDEQGDKGWCDHITfJALbWDFOBDGCNbgCAAUbCACSWCDEFEJIHGNDJIXLHBKahDGPBOHJNaVAAAPTCACDVFCFfBIIHVBGJJFSJBLYMCPPBNCHNLfAAASJDBCCRDCEiBHIGetAJIBCFALJVHOPBgGHNFLCBADSDACBQADEWCCKGGDCJIONHAKZRANOBNAINGYDBATfAACCLADEGXAIGOCDJIGCJBLfLCRPBYDHNLbAAAgQDACSgCCECTAKGmVCHIKCGBLifDNOBgFCNLBDAAPhABCRBADEMUGIHXBCHINDGBLBLGFPBmDANFWDAAWSDBCiLDDEbJAIGgZCHIFNFBLTVJQPBXACNGfCAAUbDACSLADEVGAKGGVAHIbFIALQtDGPBNCBNFWAAAfPABCVRJCFVODKGbDAJIDMFALCOFRPBNAHNCDDBAWLDBCFeDCENVDIGUSCHIEVJALPMALPBDDANtCDAAXZAACGDCDEWCAIGUZAJISCIALYCCPPBDGHNaBCBAZtDACQRDCECBAIGfBJHJfCIALDVHFOBNFANLNCBAmBDBCLWGCFeYDIGPSAHINLHAKSPDRPBeCCNEiDBAZBDBCGFCCEPSCKGRJDJIVJFBLRFIGPBmAINaGDAAmVABCDVGDFJfCKGFSJHJMCHAKaBCFOBgHJNQBCBAYCDBCLXDCEhBHKGVFHHIgVFALPECFOBgGDNEJABAgaDACLCHCEVtIIHaPCHINBGALXVCMPBOAANGDDAAZTAACNBCDEWLGIHtiAHIebIALViFFPBOAKNEZCBARYDBCbCADEtWDKGPTDJIRFIALUBFGPBeIHNGZCAAUMCACXGACEbtDKGDNHJIhMHBKMaCMPBOACNQPCAATfDACOBCCENOHIGELAJIDCFALFVCNOBXFCNaLAAAZtABCfZDCEOBHKGYhCHIftIALGeAPPBgHBNbCDAAZFDACCYACEfYAIGteIJJMVGALFGCRPBgGBNQMCBADBCACVODDEhBCIGKGAHIBVHBKRZCLPBDDDNaNDBAfQCACVFJDFLKCKGDCDJIVBHAKbUDEOBgFHNJRDBAXFCACVFFCFhaDKGbBCJIKLHAKGfCRPBgFJNQVAAAfbABCtTICFFNFIHbKAHIVWGBLNEDOPBXDJNJZABAOSABCFhCCEFRCIGJSAHICMFBLLODMPBTDHNQeDBAPTABCVhDDEePCIGBPDJIMWFBLTBCMPBgFDNJBCBAeLCACYhACEMUCIGQgDJIKBFALTPDRPBOCINbFCBAeFAACZOACEiDFIHWMCJIhCGALMYDOPBmDBNBVCBAUQDBCPSDCEECAKGbMCHIhVFALFOAGPBOHKNFBAAAPEAACTbDDEJSDIGeGDHIMBFALCtCLPBTCKNBhAAAZtDBCMCHDEeZAKGfRIJJCDGBLFKHOPBNGANLNAAAYPCACYZCCEWCFIHCYCHIfFIBLFDGGPBDAANEWABAYhCACtFDDELfDKGSBJJJOCFALVOFNPBgCDNtNAAAMWCACOFDCEJVHIGOFFJJNVHAKOfCGPBmDINbtABAPMDACFOGDFgCCKGVRCJIKFFALMhHOPBYDCNCgCAASMCACbXDDECXHKGMaCHILOFALFBDOPBgAKNLODBAgVABCECDCESXCKGXVGJJCDHAKYSDGPBmAJNENDAARQABCXGADELBCIGBKGHJUBFBLBSAMPBXADNGJABADEDBCaNCDERBIIHLWGHJBFFALXZDLPBOFDNLCCBAKtDBCSLACEFPDKGYSCJICNFBLZCDEOBgFKNQfDAAPVABCEYADEXGCIGgBGHJDNHBKLWDQPBTCJNagABATiCBChCCCEFhCKGTbDHIWiHAKOFDNOBOGHNBtAAAeGDBCRCIDFCXAIGWaCHItBJALNCARPBOFJNVgDBAWSCACDBCCEEWCKGCKHJIONFBLKFDLPVODAATJDBCiDHCEVMCIGCMCHIFUFALBXGPPFtAAAUBABCJfACENEAKGVWCHIBfJBLfBAFOBhCAAgQCBCXbCCEtVAKGQVCJItbIBLBPAMPbDCAAYhAACtRADEbCIIHQFDHIFVGBLSDDRPJLAAAOfCACeGACETBJKHTCJHJGFIBLRQARPViABAUYCBCZeACEMhCIGPBCHILWFBLWQCOPEKAAADCCBCKFDDEYRDKGQWCJIbeJALBLGGPEWDBATPDBCiDFDFeKAIGPFAHIeTIALLSCEOFOABAmBCACXbCDEEXCIGFNHJIVFJALVgCEOaMCBAhEAACFRCDEWEDKGVBAHIXFGBLFQDPPQCDAARBDACOSADEDCFKHJfAHICSJALRfCRPaUAAARfCACfQADEFhGKHJeAJICGIALFtDLPteCAAKfDBCPfCDENFDKGOBDJICWHAKWFCGPbMCAAYSDBCabCDEDBHIGSgDHICLGALLGAFOVtCBAhYABCYfDCEJRAKGEXAJILXFALBVCGPCMCBAhSDBCGZCDEMQAKGFDHHIOCFBLeFCRPGBDAAgCDBCtTDCERQDKGOFFHJXBFBLBMAOPbfABAmCDBCEXADEPSAIGZBDJIBVIALhVFFPJRABAmVDACtbICFgBFKHKGCHIGeIBLfGJOPtTDAAmBDACVRDCECBJKHfZAJICFHAKVZDGPJVDAAfGDBCaPDCEBfDKGLOCHICSIALFDHRPaMABAhVAACPUCCEDSAKGJLDJIVhFBLWBCNOJZCAASECBCTFCDEhSAKGMPDHIBFJALiRCLPbiDBAKLABCbXACEYRCIGNFAHIFVIBLFXDLPCiCAAOCAACfODCEDaAIGGaCHILNFBLMYDLPQRABAUFDACTbADEfJCIGMUDJIVKFALBCHFOtBAAAfNCBCbfDDERiCKGMhCHIfRJALXBCPPFVDBAPECBCfBJDFOtAIGDEAHIBSIALbBIPPCXABAfZABCetIDFTBJIHOVDHIfFJALLEAPPaPDBAhaCBCbNDCEPVAKGTKAHILKFBLatCFOVODBAKBDAChBDDEZEDKGMSCJIMhHAKQCCPPtaABAefAACaQDDEbgAKGELCHINVGBLBgGNPEiABAYCCACYSDDEaMDIGtKCJIiFFALWLFLPaCDAAWbAACQhDDEfGJKHGZCHIfVJALibDLPCNDAAPtCBCYFADETaAKGSBCHIMFHBKmVARPCRDBAfbCACORDCEKLFIHUSDHIMFGBLQtCFOJtCBARJCACYUCDETYCKGYTDJITVJALEiDRPaBABANCCBCfXCCEhMGIHgZDJIJVGALNBGNPfJDBCbgCCELiDIGCQAJIeGIBLtLDMPECICFSDCKGtQDJIgVGALCgDEOabCCEbXAKGZEAHIOLFALFEANORtJDFaPAIGaeAHIOBGBLNBFEPGCDDEQMAKGJBGJJtfJALLTCGPDiGCFGiAKGePAJINCFALJfCOPLXDDEaGDIGSFIJJiLGALXLHQPaUCCERBDIGKCFJJhMFALitAEOMYCCETtIIHXZCHIBWFBLFBGQPPeDDEZOAKGZBCJICFIALTVCOPiVHCEGfAIGKLHHICLHAKLfDQPPTDCEaVCKGiBHJIOCHBKtTAPPiRADEXZDKGFgAJIUVGALUVANOQVDDEKFGIHUaCJIFhFALeBCNOgCHDEGCAKGFYCJICDFBLWQCEOJRADEEYAIGWECJIEFJBLNFFFPWFADEZSDIGMCHJINOGALRCIQPJZDCEORAIGNbCHILCGALNDGPPiVDCERYAKGiDDHIFtJALfbDLPWBGDFJVFIHPVCJIWVFBLteAGPKGCCEtRAIGNVHHIFOFALVtILPgZDCEbiANOUQACEaNAEOeCJDFPMAOPJZCCEEJCEOgBCCEYtCRPebACEBTJQPNOGDFPEDMPQWACEGXAOPKSCDEYMAOPWVGCFbtCEOTbJCFMFDFOhaDCEbUDMPPtDDEVWGGPUBFCFRLCLPQMADEeKCOPEMDCEGFIEPZgCCENEARPebIDFGLDLPfbJDFRVCMPUFGDFfNDNOTPDFOBDARPCKAMPDaDPPEFDMPNDANOieCGPPGCNOFRCNOiGDOPCDAFOTPCPPRCJEPOCGPPYECQPGCAGPWSDGPRfCEOSNCQPMBFFP';
  const GOWN_CODE = 'EFAFAaBABAhSCSCBUKUFCTJTGQWQWIWBABAWMIMCDiKiFDEGEGLaOaJeFAFABLILCFSRSEFmJmGKRNRJbFAFAQeBeCbKRKEagGgGiEQEILFAFAiSBSCEVHVFFBFBGDCNCJKBABABDIDCOZDZEhaFaGBTQTIfBABAaeBeCUSKSFbUJUGXSMSJVBABAiSISCFeDeEYBGBGWtQtISBABAGfIfCOLHLFJTFTGRJQJIOBABAbCICCgbEbEKRGRGXGQGIXBABAEJIJChBHBFMWJWGRVMVJDFAFAtLILCBgKgFtZFZGiLOLJPFAFAifIfCNbEbECKGKGtaNaJhBABAWFBFCXBDBERfFfGRZPZJRFAFABgCgCXBHBFgBJBGCLNLJFBABABMIMCFXDXEBCFCGeKNKJUBABABJIJCZYHYFabGbGiTPTJgFAFAORIRCfXDXEFhFhGSEMEJYBABAXLCLCEJRJESXLXGRLOLJGFAFASMIMCRKRKEFRGRGGZOZJQFAFATYIYCENRNEfOFOGDaOaJNBABAZRIRCBmEmEbWGWGgaNaJmBABALeBeCKeKeFEFFFGWGPGJiBABAeYIYCJGDGENOFOGQTPTJBFAFAGLBLCmBDBEQCFCGUZPZJTFAFARKBKCVWHWFJRJRGORMRJMFAFAGVBVCPGHGFFtFtGLXQXItFAFAKLBLCEFHFFtbLbGhbObJCBABAOLILChCECEFZLZGaiMiJJBABAtKCKCVMHMFWaGaGLXMXJZFAFAhaIaCQBEBERaLaGMCQCIeJIJCTCKCFYtGtGGXMXJViIiCiTRTEibLbGLXNXJCRIRChYDYEZSJSGfFMFJCZCZCbNDNEQELEGFbMbJOCBCCWLKLFGCLCGaTMTJVNINCLREREbhLhGFmMmJVOCOCDNKNFYRGRGZGQGIPTCTCfLDLEBbLbGtVMVJMEIECFeReEfXFXGgFQFIMECECiBDBEiTFTGahPhJEOCOCJZHZFbeJeGeJOJJFhBhCYMKMFGiFiGbgNgJYRCRCNEDEEhELEGNEMEJZtCtCXGKGFNGJGGitPtJVZIZCSXDXEgbFbGQfQfIfXBXCPUHUFEZLZGNSPSJXEBECGCECESZGZGhMQMISKCKCKEEEEOtLtGaMOMJOZBZCfiRiEDELEGmCMCJGeCeCOFEFEJVFVGEOOOJBRCRCGeEeEfYFYGFVQVIWCCCCWMDMEgCJCGWSNSJMCICCCtHtFUSFSGGeQeItTITCiaDaERLGLGUbNbJLFBFCCPKPFgSGSGBLQLIJbCbCVEEEEWQJQGBDQDIfNBNCJfEfEEKLKGfGMGJEYIYCYMDMEifFfGbWNWJSFIFCaVEVEaWJWGSgQgINGCGChSDSEDQGQGbUNUJFLBLCFQHQFPBGBGJTOTJVmBmChVEVEFfGfGWBMBJFXCXCShHhFKEFEGGWOWJCtCtCPCHCFXCLCGBUMUJXCCCCZFEFEtKJKGgQPQJZfCfCfFEFEBTLTGEDQDIZSCSCgBDBEOZFZGFGNGJMPCPCCZDZEEMGMGKLQLILOCOCBPEPENbLbGfQNQJBPCPCGXDXELtGtGCMQMISDIDCEDHDFJSFSGPSMSJVMIMCYUEUEPCFCGEJMJJZXIXCWEDEENBJBGLbQbIbeIeCgCECEFDGDGLRPRJJGIGCbWRWEBJGJGaMQMIFmImCNSHSFaLFLGXLOLJONINCNtKtFTiGiGMhMhJBaBaCeYEYELeLeGGZPZJieIeCQUDUEfQJQGJEOEJFEIECYEEEEhQJQGPFQFIQTBTCVYHYFCBJBGDBQBIeLCLCfZKZFGCFCGPeOeJBhChCQhHhFNCJCGtXMXJtCICCTYEYEPTLTGNtNtJMQIQCatKtFmFFFGfNMNJFNBNCKfKfFaPJPGLTQTIRiBiCCgHgFMBLBGWaPaJVMCMCRtEtEiDJDGaBMBJaRCRCJGKGFQTJTGGDQDIZfIfCLGEGEQCLCGSFMFJVYBYCYVDVEeZFZGUZOZJKtCtCGCKCFDNLNGbFNFJFbIbCPtDtETCFCGKBIBCYRHRFBVJVGZVIVChSHSFLtJtGXFIFCYBRBEQTLTGQRIRCEPDPESDJDGaPBPCUbRbEFELEGCMIMCJLHLFQWLWGSBCBCNfEfEKRJRGZSBSCNaEaEafFfGeLILCDBHBFMQLQGEXIXCeaKaFZBLBGOBIBCSYKYFCPGPGTZIZCDaKaFEQJQGetItCTiEiEQWFWGbiCiCFNDNEaBFBGSgCgCONDNEZSGSGBmBmCFVHVFWBLBGPSCSCFRHRFCZJZGFWBWCEVRVEMQJQGRCBCCtOHOFLGFGGPMIMCPSHSFFtGtGCDBDCXZRZEXGFGGgZBZCVDHDFLXGXGNVBVCeCKCFYBFBGQBBBCWBHBFeJJJGXSCSCFKRKEBPLPGSYCYCtCHCFGWLWGtYCYCPMDMEVmGmGBUBUCNFHFFXbFbGEiIiCBYEYEDEJEGCZBZCTBHBFBXGXGRYBYCeBEBEbeFeGbtBtCSEDEEJtLtGafIfCBmHmFteJeGMPBPCFYHYFJRGRGUPBPCUBRBEVXJXGZBCBCtYHYFTFJFGfbIbCSXKXFKBLBGXBBBCLVHVFUbLbGKfBfCQDKDFFTLTGafBfCeBRBEGfGfGZCBCCNGDGEUQGQGUbBbCQCKCFLEGEGYBBBCWaDaENEGEGDBCBCBSRSEMEFEGTVBVCTbHbFGFGFGLbCbCBgDgEbXGXGJTBTCZCDCEDQFQGitBtChFEFEbBLBGYTITCTfRfEPEJEGUMBMCFgKgFKbGbGKbCbCaDRDEitJtGEJCJCCRRREbMFMGVhBhCROROEtLGLGNOCOCeBDBENaFaGCYCYCRKDKEUZFZGGPCPCENENEKRFRGtWKWFXVGVGTPKPFOFJFGQDEDEJbGbGtZEZEXLFLGONRNEEXFXGKfEfEVWJWGMCKCFSOLOGEVDVEFhLhGNSDSEtRGRGCLRLEmBJBGfJEJEtXRXENSKSFWVKVFFOEOE';
  const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  const SHELVES = {
    clipper: ['classic', 'bright', 'stripes', 'checks', 'waves', 'metal', 'neon', 'wild'],
    gown: ['plain', 'stripes', 'checks', 'waves', 'wild'],
  };
  const CPAT = CLIPPER_PATTERNS.map((p) => p[0]), GPAT = GOWN_PATTERNS.map((p) => p[0]);
  const CNAME = COLOURS.map((c) => c[0]), FNAME = FINISHES.map((f) => f[0]);
  const designs = { clipper: [], gown: [] };
  const byKey = new Map();
  function decode(tool, code) {
    for (let i = 0; i * 5 < code.length; i++) {
      const v = [...code.slice(i * 5, i * 5 + 5)].map((ch) => B64.indexOf(ch));
      const parts = tool === 'clipper'
        ? { body: CNAME[v[0]], accent: CNAME[v[1]], finish: FNAME[v[2]], pattern: CPAT[v[3]] }
        : { main: CNAME[v[0]], second: CNAME[v[1]], pattern: GPAT[v[2]], collar: CNAME[v[3]] };
      const d = { key: tool + ':' + i, tool, id: String(i), i, shelf: SHELVES[tool][v[4] >> 1], premium: (v[4] & 1) === 1, parts };
      designs[tool].push(d);
      byKey.set(d.key, d);
    }
  }
  decode('clipper', CLIPPER_CODE);
  decode('gown', GOWN_CODE);
  const DEFAULT_LOOK = { clipper: '0', gown: '0' };
  const FREE = new Set(['clipper:0', 'gown:0']);
  // every pick is one rewarded video (the premium flag only marks the flashiest designs)
  const VIDEOS = () => 1;

  HSC.catalog = { COLOURS, FINISHES, colourHex, finishes, designs, byKey, SHELVES, DEFAULT_LOOK, FREE, VIDEOS };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Pattern painter: draws a seamless square tile of a pattern in two colours on a 2D canvas.
// The same tiles texture the 3D clipper / gown and fill the wardrobe swatches.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';

  const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const rgbHex = (c) => '#' + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const shade = (h, k) => rgbHex(hexRgb(h).map((v) => (k < 0 ? v * (1 + k) : v + (255 - v) * k)));
  const mix = (a, b, t) => rgbHex(hexRgb(a).map((v, i) => v + (hexRgb(b)[i] - v) * t));
  const lum = (h) => { const [r, g, b] = hexRgb(h); return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; };

  // draw fn at all 9 wrap offsets so shapes crossing the tile edge continue on the other side
  function wrapped(ctx, S, fn) {
    for (const ox of [-S, 0, S]) for (const oy of [-S, 0, S]) { ctx.save(); ctx.translate(ox, oy); fn(); ctx.restore(); }
  }
  function blob(ctx, x, y, r, R, n = 9) {
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2, rr = r * (0.7 + 0.5 * R.next());
      const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr;
      i ? ctx.quadraticCurveTo(x + Math.cos(a - Math.PI / n) * rr * 1.15, y + Math.sin(a - Math.PI / n) * rr * 1.15, px, py) : ctx.moveTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  }
  // smooth periodic value noise for marble / wood / galaxy (period S)
  function periodicNoise(R, cells) {
    const g = Array.from({ length: cells * cells }, () => R.next());
    const at = (x, y) => g[((y % cells) + cells) % cells * cells + (((x % cells) + cells) % cells)];
    return (u, v) => {
      const x = u * cells, y = v * cells, xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi;
      const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
      const a = at(xi, yi), b = at(xi + 1, yi), c = at(xi, yi + 1), d = at(xi + 1, yi + 1);
      return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
    };
  }
  function pixels(ctx, S, fn) {
    const img = ctx.createImageData(S, S);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const c = fn(x / S, y / S), o = (y * S + x) * 4;
      img.data[o] = c[0]; img.data[o + 1] = c[1]; img.data[o + 2] = c[2]; img.data[o + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }

  const P = {
    solid(ctx, S, a) { ctx.fillStyle = a; ctx.fillRect(0, 0, S, S); },
    'two-tone'(ctx, S, a, b) { ctx.fillStyle = a; ctx.fillRect(0, 0, S, S); ctx.fillStyle = b; ctx.fillRect(0, S * 0.5, S, S * 0.5); ctx.fillStyle = shade(b, -0.25); ctx.fillRect(0, S * 0.49, S, S * 0.025); },
    yoke(ctx, S, a, b) { ctx.fillStyle = a; ctx.fillRect(0, 0, S, S); ctx.fillStyle = b; ctx.fillRect(0, 0, S, S * 0.22); ctx.fillStyle = shade(a, -0.2); ctx.fillRect(0, S * 0.22, S, S * 0.012); },
    racing(ctx, S, a, b) { ctx.fillStyle = a; ctx.fillRect(0, 0, S, S); ctx.fillStyle = b; ctx.fillRect(S * 0.36, 0, S * 0.1, S); ctx.fillRect(S * 0.54, 0, S * 0.1, S); },
    stripes(ctx, S, a, b) { ctx.fillStyle = a; ctx.fillRect(0, 0, S, S); ctx.fillStyle = b; for (let i = 0; i < 4; i++) ctx.fillRect((i * S) / 4, 0, S / 8, S); },
    pinstripe(ctx, S, a, b) { ctx.fillStyle = a; ctx.fillRect(0, 0, S, S); ctx.fillStyle = b; for (let i = 0; i < 8; i++) ctx.fillRect((i * S) / 8, 0, Math.max(1.5, S / 110), S); },
    checker(ctx, S, a, b) { const n = 8, c = S / n; for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { ctx.fillStyle = (x + y) % 2 ? b : a; ctx.fillRect(x * c, y * c, c, c); } },
    gingham(ctx, S, a, b) {
      ctx.fillStyle = a; ctx.fillRect(0, 0, S, S);
      const n = 6, c = S / n;
      ctx.globalAlpha = 0.55; ctx.fillStyle = b;
      for (let i = 0; i < n; i += 2) { ctx.fillRect(i * c, 0, c, S); ctx.fillRect(0, i * c, S, c); }
      ctx.globalAlpha = 1;
    },
    tartan(ctx, S, a, b) {
      ctx.fillStyle = a; ctx.fillRect(0, 0, S, S);
      const bands = [[0.0, 0.18, b, 0.6], [0.3, 0.06, shade(a, -0.55), 0.7], [0.5, 0.2, b, 0.55], [0.74, 0.03, '#f2efe6', 0.8], [0.84, 0.05, shade(b, -0.5), 0.7]];
      for (const [p, w, c, al] of bands) { ctx.globalAlpha = al; ctx.fillStyle = c; ctx.fillRect(p * S, 0, w * S, S); ctx.fillRect(0, p * S, S, w * S); }
      ctx.globalAlpha = 1;
    },
    dots(ctx, S, a, b) {
      ctx.fillStyle = a; ctx.fillRect(0, 0, S, S); ctx.fillStyle = b;
      const n = 4, c = S / n;
      wrapped(ctx, S, () => { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { ctx.beginPath(); ctx.arc(x * c + (y % 2 ? c / 2 : 0) + c / 4, y * c + c / 2, c * 0.2, 0, 7); ctx.fill(); } });
    },
    chevron(ctx, S, a, b) {
      ctx.fillStyle = a; ctx.fillRect(0, 0, S, S); ctx.fillStyle = b;
      const n = 4, h = S / n;
      for (let i = -1; i <= n; i++) {
        ctx.beginPath();
        const y = i * h;
        ctx.moveTo(0, y); ctx.lineTo(S / 2, y + h / 2); ctx.lineTo(S, y); ctx.lineTo(S, y + h / 2); ctx.lineTo(S / 2, y + h); ctx.lineTo(0, y + h / 2);
        ctx.closePath(); ctx.fill();
      }
    },
    fade(ctx, S, a, b) { const g = ctx.createLinearGradient(0, 0, 0, S); g.addColorStop(0, a); g.addColorStop(1, b); ctx.fillStyle = g; ctx.fillRect(0, 0, S, S); },
    carbon(ctx, S, a, b) {
      const base = mix(a, '#101010', 0.6), n = 16, c = S / n;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const horiz = (Math.floor(x / 2) + Math.floor(y / 2)) % 2 === 0;
        const g = horiz ? ctx.createLinearGradient(x * c, y * c, x * c, (y + 1) * c) : ctx.createLinearGradient(x * c, y * c, (x + 1) * c, y * c);
        g.addColorStop(0, shade(base, -0.4)); g.addColorStop(0.5, shade(mix(base, b, 0.25), 0.25)); g.addColorStop(1, shade(base, -0.4));
        ctx.fillStyle = g; ctx.fillRect(x * c, y * c, c, c);
      }
    },
    camo(ctx, S, a, b, R) {
      const cols = [a, b, mix(a, b, 0.5), shade(mix(a, b, 0.3), -0.45)];
      ctx.fillStyle = cols[0]; ctx.fillRect(0, 0, S, S);
      for (let k = 1; k < 4; k++) {
        ctx.fillStyle = cols[k];
        for (let i = 0; i < 7; i++) { const x = R.next() * S, y = R.next() * S, r = S * (0.06 + 0.07 * R.next()); wrapped(ctx, S, () => { blob(ctx, x, y, r, HSC.rng(i * 31 + k)); blob(ctx, x + r * 0.8, y + r * 0.3, r * 0.8, HSC.rng(i * 17 + k)); }); }
      }
    },
    marble(ctx, S, a, b, R) {
      const n = periodicNoise(R, 6), n2 = periodicNoise(R, 12), A = hexRgb(a), B = hexRgb(b);
      pixels(ctx, S, (u, v) => {
        const t = Math.abs(Math.sin((u + v) * Math.PI * 4 + 6 * n(u, v) + 2 * n2(u, v)));
        const vein = Math.pow(1 - t, 6);
        return A.map((c, i) => c + (B[i] - c) * vein);
      });
    },
    wood(ctx, S, a, b, R) {
      const n = periodicNoise(R, 4), A = hexRgb(a), B = hexRgb(b);
      pixels(ctx, S, (u, v) => {
        const r = Math.sin((u * 10 + 3 * n(u, v)) * Math.PI * 2) * 0.5 + 0.5;
        const t = Math.pow(r, 3) * 0.75 + 0.15 * n(v, u);
        return A.map((c, i) => c + (B[i] - c) * t);
      });
    },
    galaxy(ctx, S, a, b, R) {
      const n = periodicNoise(R, 5), n2 = periodicNoise(R, 10), base = [10, 10, 24], A = hexRgb(a), B = hexRgb(b);
      pixels(ctx, S, (u, v) => {
        const t = n(u, v), s = n2(u, v);
        return base.map((c, i) => c + A[i] * Math.pow(t, 3) * 0.8 + B[i] * Math.pow(s, 4) * 0.7);
      });
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 90; i++) { ctx.globalAlpha = 0.4 + 0.6 * R.next(); ctx.fillRect(R.next() * S, R.next() * S, 1 + R.next() * 1.5, 1 + R.next() * 1.5); }
      ctx.globalAlpha = 1;
    },
    flames(ctx, S, a, b, R) {
      ctx.fillStyle = a; ctx.fillRect(0, 0, S, S);
      for (const [col, k] of [[b, 1], [mix(b, '#ffe08a', 0.6), 0.6]]) {
        ctx.fillStyle = col;
        for (let i = 0; i < 6; i++) {
          const x = (i / 6) * S + R.next() * S * 0.05, w = S * 0.16 * k, h = S * (0.45 + 0.35 * R.next()) * k;
          wrapped(ctx, S, () => {
            ctx.beginPath(); ctx.moveTo(x - w, S);
            ctx.bezierCurveTo(x - w, S - h * 0.5, x - w * 0.2, S - h * 0.7, x + w * 0.2, S - h);
            ctx.bezierCurveTo(x + w * 0.1, S - h * 0.6, x + w, S - h * 0.45, x + w, S);
            ctx.closePath(); ctx.fill();
          });
        }
      }
    },
    honeycomb(ctx, S, a, b) {
      ctx.fillStyle = a; ctx.fillRect(0, 0, S, S); ctx.strokeStyle = b; ctx.lineWidth = Math.max(1.5, S / 90);
      const r = S / 8, h = r * Math.sqrt(3);
      wrapped(ctx, S, () => {
        for (let row = 0; row * h * 0.5 < S + h; row++) for (let col = 0; col * r * 3 < S + 3 * r; col++) {
          const cx = col * r * 3 + (row % 2 ? r * 1.5 : 0), cy = row * h * 0.5;
          ctx.beginPath();
          for (let i = 0; i <= 6; i++) { const ang = (i / 6) * Math.PI * 2; ctx[i ? 'lineTo' : 'moveTo'](cx + r * Math.cos(ang), cy + r * Math.sin(ang)); }
          ctx.stroke();
        }
      });
    },
    leopard(ctx, S, a, b, R) {
      ctx.fillStyle = a; ctx.fillRect(0, 0, S, S);
      for (let i = 0; i < 16; i++) {
        const x = R.next() * S, y = R.next() * S, r = S * (0.045 + 0.03 * R.next());
        wrapped(ctx, S, () => {
          ctx.fillStyle = b; blob(ctx, x, y, r, HSC.rng(i + 5), 7);
          ctx.fillStyle = mix(a, b, 0.35); blob(ctx, x, y, r * 0.55, HSC.rng(i + 9), 6);
        });
      }
    },
    zebra(ctx, S, a, b) {
      ctx.fillStyle = a; ctx.fillRect(0, 0, S, S); ctx.fillStyle = b;
      for (let i = 0; i < 7; i++) {
        const x0 = (i / 7) * S;
        ctx.beginPath(); ctx.moveTo(x0, 0);
        for (let y = 0; y <= S; y += S / 16) ctx.lineTo(x0 + Math.sin((y / S) * Math.PI * 2 + i) * S * 0.04, y);
        for (let y = S; y >= 0; y -= S / 16) ctx.lineTo(x0 + S * 0.055 + Math.sin((y / S) * Math.PI * 2 + i + 0.8) * S * 0.05, y);
        ctx.closePath(); ctx.fill();
      }
    },
    'diamond-plate'(ctx, S, a, b) {
      const g = ctx.createLinearGradient(0, 0, S, S); g.addColorStop(0, shade(a, 0.15)); g.addColorStop(1, shade(a, -0.15));
      ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);
      const n = 8, c = S / n;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        ctx.save(); ctx.translate(x * c + c / 2, y * c + c / 2); ctx.rotate(((x + y) % 2 ? 1 : -1) * Math.PI / 4);
        ctx.fillStyle = shade(b, 0.3); ctx.fillRect(-c * 0.32, -c * 0.07, c * 0.64, c * 0.14);
        ctx.fillStyle = shade(b, -0.3); ctx.fillRect(-c * 0.32, c * 0.03, c * 0.64, c * 0.04);
        ctx.restore();
      }
    },
    houndstooth(ctx, S, a, b) {
      ctx.fillStyle = a; ctx.fillRect(0, 0, S, S); ctx.fillStyle = b;
      const n = 6, c = S / n;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const ox = x * c, oy = y * c, q = c / 4;
        ctx.beginPath();
        ctx.moveTo(ox, oy + 2 * q); ctx.lineTo(ox + 2 * q, oy); ctx.lineTo(ox + 3 * q, oy); ctx.lineTo(ox + 2 * q, oy + q);
        ctx.lineTo(ox + 4 * q, oy + q); ctx.lineTo(ox + 2 * q, oy + 3 * q); ctx.lineTo(ox + 2 * q, oy + 4 * q); ctx.lineTo(ox + q, oy + 4 * q);
        ctx.lineTo(ox + q, oy + 3 * q); ctx.lineTo(ox, oy + 4 * q);
        ctx.closePath(); ctx.fill();
      }
    },
    argyle(ctx, S, a, b) {
      ctx.fillStyle = a; ctx.fillRect(0, 0, S, S);
      const n = 2, w = S / n, h = S / n;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        ctx.fillStyle = (x + y) % 2 ? b : mix(a, b, 0.4);
        ctx.beginPath(); ctx.moveTo(x * w + w / 2, y * h); ctx.lineTo(x * w + w, y * h + h / 2); ctx.lineTo(x * w + w / 2, y * h + h); ctx.lineTo(x * w, y * h + h / 2); ctx.closePath(); ctx.fill();
      }
      ctx.strokeStyle = '#f2efe6'; ctx.lineWidth = Math.max(1, S / 160); ctx.setLineDash([S / 40, S / 40]);
      for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * w, 0); ctx.lineTo(i * w + S, S); ctx.stroke(); ctx.beginPath(); ctx.moveTo(i * w + S, 0); ctx.lineTo(i * w, S); ctx.stroke(); }
      ctx.setLineDash([]);
    },
    waves(ctx, S, a, b) {
      ctx.fillStyle = a; ctx.fillRect(0, 0, S, S); ctx.strokeStyle = b; ctx.lineWidth = S / 40;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        for (let x = 0; x <= S; x += S / 32) { const y = (i + 0.5) * (S / 6) + Math.sin((x / S) * Math.PI * 4) * S / 30; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.stroke();
      }
    },
    'barber-pole'(ctx, S, a, b) {
      ctx.fillStyle = '#f2efe6'; ctx.fillRect(0, 0, S, S);
      const cols = [a, '#f2efe6', b, '#f2efe6'], w = S / 4;
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, S, S); ctx.clip();
      for (let i = -4; i < 8; i++) {
        ctx.fillStyle = cols[((i % 4) + 4) % 4];
        ctx.beginPath(); ctx.moveTo(i * w, 0); ctx.lineTo(i * w + w, 0); ctx.lineTo(i * w + w - S, S); ctx.lineTo(i * w - S, S); ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    },
    floral(ctx, S, a, b, R) {
      ctx.fillStyle = a; ctx.fillRect(0, 0, S, S);
      for (let i = 0; i < 12; i++) {
        const x = R.next() * S, y = R.next() * S, r = S * (0.06 + 0.025 * R.next()), rot = R.next() * 6;
        wrapped(ctx, S, () => {
          ctx.fillStyle = b;
          for (let k = 0; k < 5; k++) { const ang = rot + (k / 5) * Math.PI * 2; ctx.beginPath(); ctx.ellipse(x + Math.cos(ang) * r, y + Math.sin(ang) * r, r * 0.75, r * 0.45, ang, 0, 7); ctx.fill(); }
          ctx.fillStyle = lum(b) > 0.5 ? shade(b, -0.5) : '#f6d44a'; ctx.beginPath(); ctx.arc(x, y, r * 0.42, 0, 7); ctx.fill();
        });
      }
    },
    palms(ctx, S, a, b, R) {
      ctx.fillStyle = a; ctx.fillRect(0, 0, S, S); ctx.fillStyle = b;
      for (let i = 0; i < 9; i++) {
        const x = R.next() * S, y = R.next() * S, s = S * (0.12 + 0.04 * R.next()), rot = R.next() * 6;
        wrapped(ctx, S, () => {
          for (let k = 0; k < 7; k++) {
            const ang = rot + (k / 7) * Math.PI * 2;
            ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(s * 0.5, -s * 0.36, s, 0); ctx.quadraticCurveTo(s * 0.5, s * 0.2, 0, 0); ctx.fill();
            ctx.restore();
          }
        });
      }
    },
    scissors(ctx, S, a, b) {
      ctx.fillStyle = a; ctx.fillRect(0, 0, S, S); ctx.strokeStyle = b; ctx.fillStyle = b; ctx.lineWidth = Math.max(3, S / 30);
      const n = 4, c = S / n;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        ctx.save(); ctx.translate(x * c + c / 2 + (y % 2 ? c / 2 : 0), y * c + c / 2); ctx.rotate(y % 2 ? 0.6 : -0.6);
        const s = c * 0.44;
        ctx.beginPath(); ctx.arc(-s * 0.45, s * 0.55, s * 0.26, 0, 7); ctx.stroke();
        ctx.beginPath(); ctx.arc(s * 0.45, s * 0.55, s * 0.26, 0, 7); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-s * 0.4, s * 0.38); ctx.lineTo(s * 0.2, -s * 0.85); ctx.lineTo(-s * 0.02, -s * 0.85); ctx.lineTo(-s * 0.18, s * 0.38); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.moveTo(s * 0.4, s * 0.38); ctx.lineTo(-s * 0.2, -s * 0.85); ctx.lineTo(s * 0.02, -s * 0.85); ctx.lineTo(s * 0.18, s * 0.38); ctx.closePath(); ctx.fill();
        ctx.restore();
      }
    },
  };

  HSC.drawPattern = function (ctx, S, name, a, b, seed = 7) {
    const fn = P[name] || P.solid;
    ctx.save();
    ctx.clearRect(0, 0, S, S);
    fn(ctx, S, a, b, HSC.rng(seed));
    ctx.restore();
  };
  HSC.colourTools = { hexRgb, rgbHex, shade, mix, lum };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Wardrobe (the hanger button): the clippers and robes the player owns, two rows at a time (arrows and a
// page number when there are more; the one worn first, then the newest), tap one to wear it. Each day
// there is exactly one new clipper and one new robe on offer (the same for every player that day), with
// a countdown to midnight: one rewarded video unlocks it and puts it on. When the day ends the offer is
// gone. The red dot on the hanger
// comes up once a day while a pick is waiting. Wordless: icons, numbers and pictures of the designs.
// Designs come from catalog.js; progress is saved through the platform storage.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  const C = () => HSC.catalog;
  const KEY = 'skin-fade-studio-rewards-v4';
  const INK = '#2a1d15';

  const W = {
    data: null, // { v, own: { clipper: bits, gown: bits } (base64), look: { clipper: id, gown: id }, progress: { key: videos }, dotDay, pick: { day, clipper: key, gown: key }, recent: [keys, newest last] }
    bits: null, // the owned designs, one bit each: { clipper: Uint8Array, gown: Uint8Array }
    client: null,
    game: null,
    clipper: null, // { body:[materials], accent:[...], light:[...], dark:[...] }
    gown: null, // { cloth, collar }
    T: null,
    tex: {},
    preview: { clipper: null, gown: null }, // try-on / trial designs shown without owning them
  };
  HSC.wardrobe = W;

  const today = () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
  // a day key as a local date (y-m-d), or null for a malformed one; day keys are compared by date, never as text
  // the day book (meta.js): a wrong clock in either direction never deals a day's picks twice, and a clock put right
  // gets its real day back; a build without it keeps the picks' day moving forward only
  const book = () => HSC.dayBook || { fresh: () => null, clean: () => null };
  const dateOf = (key) => { const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(key || ''); return m ? new Date(+m[1], m[2] - 1, +m[3]) : null; };
  const hash = (str) => { let h = 2166136261; for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };
  const TOOLS = ['clipper', 'gown'];
  const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const toB64 = (u8) => { let s = ''; for (let i = 0; i < u8.length; i += 3) { const n = (u8[i] << 16) | ((u8[i + 1] || 0) << 8) | (u8[i + 2] || 0); s += B64[n >> 18] + B64[(n >> 12) & 63] + B64[(n >> 6) & 63] + B64[n & 63]; } return s; };
  const fromB64 = (str, len) => { const u8 = new Uint8Array(len); if (!/^[A-Za-z0-9+/]*$/.test(str)) return u8; /* corrupt: nothing owned but the free designs */ let k = 0; for (let i = 0; i + 3 < str.length + 1 && k < len; i += 4) { const n = (B64.indexOf(str[i]) << 18) | (B64.indexOf(str[i + 1]) << 12) | (B64.indexOf(str[i + 2]) << 6) | B64.indexOf(str[i + 3]); for (const v of [n >> 16, (n >> 8) & 255, n & 255]) if (k < len) u8[k++] = v & 255; } return u8; };
  const bytes = (tool) => Math.ceil(C().designs[tool].length / 8);
  const split = (key) => { const c = key.indexOf(':'); return [key.slice(0, c), +key.slice(c + 1)]; };
  const owns = (key) => { const [t, i] = split(key); const b = W.bits && W.bits[t]; return !!b && i >= 0 && ((b[i >> 3] >> (i & 7)) & 1) === 1; };
  function setOwned(key) {
    const [t, i] = split(key);
    W.bits[t][i >> 3] |= 1 << (i & 7);
    W.data.own[t] = toB64(W.bits[t]);
  }

  function fresh() {
    return { v: 4, own: {}, look: Object.assign({}, C().DEFAULT_LOOK), progress: {}, dotDay: null, pickRewardDay: null, pick: null, days: book().fresh() };
  }
  function sanitize(d) {
    const f = fresh();
    if (!d || typeof d !== 'object' || d.v !== 4) d = f;
    W.bits = {};
    for (const t of TOOLS) W.bits[t] = typeof (d.own && d.own[t]) === 'string' ? fromB64(d.own[t], bytes(t)) : new Uint8Array(bytes(t));
    const pk = d.pick && typeof d.pick.day === 'string' && C().byKey.has(d.pick.clipper) && C().byKey.has(d.pick.gown) ? { day: d.pick.day, clipper: d.pick.clipper, gown: d.pick.gown } : null;
    const recent = Array.isArray(d.recent) ? d.recent.filter((k) => typeof k === 'string' && C().byKey.has(k)) : [];
    // the days whose picks were dealt (picks() below): each one's two designs, so that day never deals other ones
    const okPick = (e) => (e && typeof e.day === 'string' && C().byKey.has(e.clipper) && C().byKey.has(e.gown) ? { day: e.day, clipper: e.clipper, gown: e.gown } : null);
    const days = book().clean(d.days, okPick, pk && pk.day);
    const out = { v: 4, own: {}, look: Object.assign({}, f.look), progress: {}, dotDay: typeof d.dotDay === 'string' ? d.dotDay : null, pickRewardDay: typeof d.pickRewardDay === 'string' ? d.pickRewardDay : null, pick: pk, recent, days };
    W.data = out;
    for (const k of C().FREE) setOwned(k);
    for (const t of TOOLS) {
      out.own[t] = toB64(W.bits[t]);
      const id = d.look && d.look[t];
      if (id != null && owns(t + ':' + id)) out.look[t] = String(id);
    }
    if (d.progress && typeof d.progress === 'object') for (const [k, n] of Object.entries(d.progress)) if (C().byKey.has(k) && Number.isSafeInteger(n) && n > 0) out.progress[k] = n;
    // Preserve a credit earned under the retired two-video rule.
    for (const [k, n] of Object.entries(out.progress)) if (n >= C().VIDEOS(C().byKey.get(k))) {
      delete out.progress[k]; setOwned(k); out.recent = out.recent.filter((x) => x !== k).concat(k);
    }
    return out;
  }
  function save() {
    if (W.client && W.client.saveProgress) W.client.saveProgress(KEY, W.data).catch(() => {});
  }
  const track = (name, payload) => { try { W.client && W.client.sendAnalytics && W.client.sendAnalytics(name, payload); } catch (e) {} };

  // ---------------- 3D ----------------
  HSC.attachClipper = function (group) {
    HSC.clipperGroup = group; // tools.js (Android) adds its tools to the same hand
    // the game's clipper model; tell its parts apart by their original colours
    const parts = { body: new Set(), accent: new Set(), light: new Set(), dark: new Set() };
    const hex = (m) => (m && m.color ? m.color.getHexString() : '');
    group.traverse((o) => {
      if (!o.isMesh || o === group.userData.comb) return;
      const h = hex(o.material);
      if (h === '25282b') parts.body.add(o.material);
      else if (h === '141516') parts.accent.add(o.material);
      else if (h === 'cfd5da' || h === 'b9bfc4') parts.light.add(o.material);
      else if (h === '8a9298') parts.dark.add(o.material);
    });
    W.clipper = Object.fromEntries(Object.entries(parts).map(([k, s]) => [k, [...s]]));
    applyLook();
  };
  HSC.attachGown = function (robe, T) {
    W.T = T;
    const meshes = [];
    robe.traverse((o) => o.isMesh && meshes.push(o));
    // the robe is the larger mesh, the collar band the other
    meshes.sort((a, b) => b.geometry.attributes.position.count - a.geometry.attributes.position.count);
    W.gown = { cloth: meshes[0] && meshes[0].material, collar: meshes[1] && meshes[1].material, robe };
    applyLook();
  };

  function patternTexture(name, key, a, b, size, flipY, repeat) {
    if (!W.T) return null;
    const cv = document.createElement('canvas');
    cv.width = cv.height = size;
    HSC.drawPattern(cv.getContext('2d'), size, name, a, b, 11);
    const t = new W.T.Fg(cv);
    t.colorSpace = W.T.Lt;
    t.wrapS = t.wrapT = W.T.Pn;
    t.flipY = flipY;
    t.repeat.set(repeat[0], repeat[1]);
    t.anisotropy = 4;
    if (W.tex[key]) W.tex[key].dispose();
    W.tex[key] = t;
    return t;
  }
  const hexOf = (id) => C().colourHex.get(id) || '#888888';
  const finishOf = (id) => C().finishes.get(id) || C().finishes.get('chrome');
  const design = (tool, id) => C().byKey.get(tool + ':' + id) || C().byKey.get(tool + ':' + C().DEFAULT_LOOK[tool]);
  const worn = (tool) => design(tool, W.preview[tool] || W.data.look[tool]);

  function applyLook() {
    if (!W.data) return;
    if (W.clipper && W.T) {
      const c = worn('clipper').parts, body = hexOf(c.body), accent = hexOf(c.accent), fin = finishOf(c.finish);
      const tex = patternTexture(c.pattern, 'clipper', body, accent, 256, true, [2, 1]);
      for (const m of W.clipper.body) { m.color.set('#ffffff'); m.map = tex; m.needsUpdate = true; }
      for (const m of W.clipper.accent) m.color.set(accent);
      for (const [list, col] of [[W.clipper.light, fin.light], [W.clipper.dark, fin.dark]]) for (const m of list) {
        m.color.set(col); m.metalness = fin.metal; m.roughness = fin.rough; m.needsUpdate = true;
      }
    }
    if (W.gown && W.gown.cloth && W.T) {
      const g = worn('gown').parts, main = hexOf(g.main), second = hexOf(g.second);
      const tall = g.pattern === 'yoke' || g.pattern === 'fade';
      const tex = patternTexture(g.pattern, 'gown', main, second, 512, false, tall ? [6, 1] : [6, 2.5]);
      const cloth = W.gown.cloth;
      cloth.color.set('#ffffff');
      cloth.map = tex;
      if (cloth.sheenColor) cloth.sheenColor.set(HSC.colourTools.mix(main, '#ffffff', 0.45));
      cloth.needsUpdate = true;
      if (W.gown.collar) W.gown.collar.color.set(hexOf(g.collar));
    }
    if (W.gown && W.T && HSC.gownDress) HSC.gownDress(worn('gown'));
    HSC.clippingsCape && HSC.clippingsCape(W.gown && W.gown.robe);
  }

  // ---------------- pictures of the designs ----------------
  function drawClipper(cv, p) {
    const ctx = cv.getContext('2d'), k = cv.width / 440;
    ctx.clearRect(0, 0, cv.width, cv.height); ctx.save(); ctx.scale(k, k); ctx.lineJoin = 'round';
    const body = hexOf(p.body), accent = hexOf(p.accent), fin = finishOf(p.finish);
    const tile = document.createElement('canvas'); tile.width = tile.height = 256;
    HSC.drawPattern(tile.getContext('2d'), 256, p.pattern, body, accent, 11);
    const cx = 220, path = new Path2D();
    path.moveTo(cx - 70, 330); path.lineTo(cx - 84, 190); path.quadraticCurveTo(cx - 84, 70, cx, 62); path.quadraticCurveTo(cx + 84, 70, cx + 84, 190); path.lineTo(cx + 70, 330); path.closePath();
    ctx.save(); ctx.clip(path); ctx.drawImage(tile, cx - 100, 50, 200, 290); ctx.restore();
    const sh = ctx.createLinearGradient(cx - 84, 0, cx + 84, 0);
    sh.addColorStop(0, '#00000040'); sh.addColorStop(0.35, '#ffffff38'); sh.addColorStop(0.55, '#ffffff00'); sh.addColorStop(1, '#00000050');
    ctx.fillStyle = sh; ctx.fill(path); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(path);
    ctx.fillStyle = accent;
    for (const x of [cx - 62, cx + 48]) { ctx.beginPath(); ctx.roundRect(x, 150, 14, 140, 7); ctx.fill(); ctx.lineWidth = 3; ctx.stroke(); }
    ctx.beginPath(); ctx.roundRect(cx - 12, 108, 24, 46, 6); ctx.fill(); ctx.lineWidth = 3; ctx.stroke();
    const g = ctx.createLinearGradient(0, 330, 0, 380); g.addColorStop(0, fin.light); g.addColorStop(0.5, '#fff'); g.addColorStop(1, fin.dark);
    ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(cx - 96, 326, 192, 40, 8); ctx.fill(); ctx.lineWidth = 5; ctx.stroke();
    ctx.fillStyle = fin.dark; for (let i = 0; i < 17; i++) ctx.fillRect(cx - 90 + i * 11, 366, 6, 16);
    ctx.restore();
  }
  function drawGown(cv, p) {
    const ctx = cv.getContext('2d'), k = cv.width / 440;
    ctx.clearRect(0, 0, cv.width, cv.height); ctx.save(); ctx.scale(k, k); ctx.lineJoin = 'round';
    const main = hexOf(p.main), second = hexOf(p.second), collar = hexOf(p.collar);
    const tile = document.createElement('canvas'); tile.width = tile.height = 256;
    HSC.drawPattern(tile.getContext('2d'), 256, p.pattern, main, second, 11);
    const cx = 220, path = new Path2D();
    path.moveTo(cx - 60, 92); path.quadraticCurveTo(cx - 150, 120, cx - 175, 210); path.lineTo(cx - 190, 400);
    path.quadraticCurveTo(cx, 420, cx + 190, 400); path.lineTo(cx + 175, 210); path.quadraticCurveTo(cx + 150, 120, cx + 60, 92); path.closePath();
    ctx.save(); ctx.clip(path);
    // patterns drawn large enough that motifs (palms, scissors, flowers) read on a small gallery tile
    for (let y = 70; y < 430; y += 190) for (let x = cx - 200; x < cx + 200; x += 190) ctx.drawImage(tile, x, y, 190, 190);
    const sh = ctx.createLinearGradient(cx - 190, 0, cx + 190, 0); sh.addColorStop(0, '#00000045'); sh.addColorStop(0.4, '#ffffff22'); sh.addColorStop(1, '#00000045');
    ctx.fillStyle = sh; ctx.fillRect(0, 0, 440, 440); ctx.restore();
    ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(path);
    ctx.beginPath(); ctx.ellipse(cx, 96, 64, 22, 0, 0, Math.PI * 2); ctx.fillStyle = collar; ctx.fill(); ctx.lineWidth = 5; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, 92, 44, 13, 0, 0, Math.PI * 2); ctx.fillStyle = '#e4cdb0'; ctx.fill(); ctx.lineWidth = 3; ctx.stroke();
    ctx.restore();
  }
  // drawn on demand and kept for the most recent few hundred (tiles are drawn as they scroll into view)
  const pics = new Map();
  function picture(d, size = 160) {
    const key = d.key + '|' + size;
    let url = pics.get(key);
    if (url) { pics.delete(key); pics.set(key, url); return url; }
    const cv = document.createElement('canvas');
    cv.width = cv.height = size;
    (d.tool === 'clipper' ? drawClipper : drawGown)(cv, d.parts);
    url = cv.toDataURL();
    pics.set(key, url);
    if (pics.size > 300) pics.delete(pics.keys().next().value);
    return url;
  }

  // ---------------- unlocking ----------------
  // a platform with rewarded videos may also say whether one can play right now (Android: an ad loaded and consent
  // given); while it says no, every video button is hidden, and a platform that does not say keeps them
  const canVideo = () => !!(W.client && W.client.rewardedSupported && W.client.showRewarded
    && (typeof W.client.rewardedReady !== 'function' || W.client.rewardedReady()));
  async function watchVideo(placement) {
    const c = W.client;
    if (!canVideo()) return false;
    let ok = false;
    try { ok = !!(await c.showRewarded(placement)); } catch (e) {}
    if (ok) HSC.lastRewardAt = Date.now();
    return ok;
  }
  // a rewarded video in the last minute: the next interstitial is skipped
  HSC.watchVideo = watchVideo;
  const dailyPickAvailable = () => W.data.pickRewardDay !== today();
  // for progress.js (Android): award a design outright (the unlock bar, the calendar chest), wear it, draw it
  HSC.wardrobeApi = {
    owns: (key) => owns(key),
    picture: (d, size) => picture(d, size),
    todays: () => { const p = picks(); return [p.clipper, p.gown]; },
    worn: (tool) => W.data.look[tool],
    // today's pick for one completed video: the earned-reward callback is the only way it is granted
    async take(key) {
      const d = C().byKey.get(key), p = picks();
      if (!d || owns(key) || p[d.tool] !== key || !dailyPickAvailable()) return false;
      if (!(await watchVideo('unlock-item'))) return false;
      W.data.pickRewardDay = today();
      if (grant(d, 'daily') === 'unlocked') equip(d.tool, d.id);
      return true;
    },
    wear: (key) => { const d = C().byKey.get(key); if (d && owns(key)) equip(d.tool, d.id); },
    award(key, via) {
      const d = C().byKey.get(key);
      if (!d || owns(key)) return false;
      setOwned(key);
      W.data.recent = W.data.recent.filter((k) => k !== key).concat(key);
      track('rewards_unlock', { item: key, via });
      save();
      return true;
    },
  };
  HSC.nope = (el) => { el.classList.remove('hsc-nope'); void el.offsetWidth; el.classList.add('hsc-nope'); HSC.lifecycle.timeout(() => el.classList.remove('hsc-nope'), 500); };
  HSC.canVideo = canVideo;
  HSC.recentReward = () => !!HSC.lastRewardAt && Date.now() - HSC.lastRewardAt < 60000;
  // one watched video toward a design: 'unlocked' when it has all it needs, else 'progress'
  function grant(d, via) {
    if (owns(d.key)) return 'unlocked';
    const n = (W.data.progress[d.key] || 0) + 1;
    if (n >= C().VIDEOS(d)) {
      delete W.data.progress[d.key];
      setOwned(d.key);
      W.data.recent = W.data.recent.filter((k) => k !== d.key).concat(d.key);
      track('rewards_unlock', { item: d.key, via });
      save();
      return 'unlocked';
    }
    W.data.progress[d.key] = n;
    save();
    return 'progress';
  }
  function equip(tool, id) {
    W.data.look[tool] = id;
    if (W.preview[tool] === id) W.preview[tool] = null;
    save();
    applyLook();
  }
  // today's clipper and robe: the same for every player that day, never one the player owns; a new day
  // brings new picks. The days follow the day book (meta.js): a date one or two days back (a time zone crossed
  // westward) keeps the picks, a clock put right gets its real day back, and a day whose picks were dealt before
  // gets those same two designs back (taken ones stay taken), so moving the date back and forth deals nothing new
  // and every calendar day gives its two picks once at most
  // the daily picks come only from the Common and Uncommon designs (350 coins or less, never Rare or Premium): the
  // coin price where the shop sells (wardrobe-shop.js), else the same tier from the design's own data
  const cheap = (d) => {
    const S = HSC.wardrobeShop, cfg = HSC.economy && HSC.economy.CONFIG.wardrobe;
    if (S && S.price && cfg) return S.price(d) <= cfg.uncommon;
    if (d.premium) return false;
    const tier = (name, list) => { const r = name != null && list.find((x) => x[0] === name); return r ? r[r.length - 1] : 0; };
    const p = d.parts;
    return Math.max(0, ...[p.body, p.accent, p.main, p.second, p.collar].map((c) => tier(c, C().COLOURS)), tier(p.finish, C().FINISHES)) < 3;
  };
  // one day's design for a tool: from the day's own number, the next one not owned (nor free) among the cheap ones;
  // when every cheap one is owned, a cheap owned one (nothing to take that day), never a dear one
  function deal(day, t) {
    const all = C().designs[t], n = all.length, start = hash(day + '|' + t) % n;
    let fallback = null;
    for (let k = 0; k < n; k++) {
      const d = all[(start + k) % n];
      if (C().FREE.has(d.key) || !cheap(d)) continue;
      if (!owns(d.key)) return d.key;
      fallback = fallback || d.key;
    }
    return fallback || all[start].key;
  }
  // a pick dealt by an older version from the dear designs and not taken is dealt again from the cheap ones (once:
  // the new one is saved, and the same day always deals the same one); a taken one stays taken
  function cheapen(pick) {
    let changed = false;
    for (const t of TOOLS) {
      const d = C().byKey.get(pick[t]);
      if (d && !cheap(d) && !owns(d.key)) { delete W.data.progress[d.key]; pick[t] = deal(pick.day, t); changed = true; }
    }
    return changed;
  }
  function picks() {
    const day = today(), old = W.data.pick, B = HSC.dayBook;
    if (old && old.day === day) { if (cheapen(old)) save(); return old; }
    if (!W.data.days && B) W.data.days = B.fresh();
    if (B ? old && !B.may(W.data.days, old.day, day) : old && dateOf(old.day) && dateOf(day) < dateOf(old.day)) { if (cheapen(old)) save(); return old; }
    // the new day's record comes out of the book before the day left goes in, so it can never be pushed out
    const back = B && B.take(W.data.days, day);
    if (old) {
      for (const t of TOOLS) delete W.data.progress[old[t]];
      if (B) B.put(W.data.days, { day: old.day, clipper: old.clipper, gown: old.gown });
    }
    if (back) { cheapen(back); W.data.pick = back; save(); return back; }
    const pick = { day };
    for (const t of TOOLS) pick[t] = deal(day, t);
    W.data.pick = pick;
    save();
    return pick;
  }
  // time left on the pick's day, as the countdown shows it (h:mm:ss, or m:ss in the last hour); the pick's own
  // day, so a clock set back counts down to when that pick really goes, not to the device's midnight
  function timeLeft(day) {
    const now = new Date(), d = dateOf(day) || new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate()), end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    const t = Math.max(0, Math.floor((end - now) / 1000)), h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), sec = t % 60;
    const two = (v) => String(v).padStart(2, '0');
    // the ring around the pick drains with the day: green, orange from 6 h, red from 2 h, a heartbeat at the end
    return { text: h ? `${h}:${two(m)}:${two(sec)}` : `${m}:${two(sec)}`, low: t < 2 * 3600, lvl: t < 2 * 3600 ? 'r' : t < 6 * 3600 ? 'o' : 'g', last: t < 600, frac: Math.max(0, Math.min(1, (t * 1000) / Math.max(1, end - start))) };
  }

  // ---------------- UI ----------------
  // the UI scale: 1 on phones (short side 300-560 px), the short side / 560 above that so every screen keeps the same
  // proportions (4 at most, past a 4K screen's 3.86), down to 0.6 in tiny embeds
  HSC.uiScale = () => {
    const root = document.documentElement;
    const m = Math.min(root.clientWidth || innerWidth, root.clientHeight || innerHeight);
    return +(m < 300 ? Math.max(0.6, m / 300) : Math.min(1.65, 1 + Math.max(0, m - 560) / 1150)).toFixed(3);
  };
  HSC.applyScale = () => {
    const s = HSC.uiScale();
    if (s !== HSC.S) { HSC.S = s; document.documentElement.style.setProperty('--hsc-s', String(s)); }
  };
  HSC.applyScale();
  const RING = '<svg class="hsc-ring" viewBox="0 0 140 140" aria-hidden="true"><circle class="trk" cx="70" cy="70" r="62"/><g transform="rotate(-90 70 70) translate(0 140) scale(1 -1)"><circle class="arc out" cx="70" cy="70" r="62"/><circle class="arc col" cx="70" cy="70" r="62"/></g></svg>';
  const ICON = {
    hanger: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7a2 2 0 1 1 2-2"/><path d="M12 7v1.5L3 15a1.5 1.5 0 0 0 1 2.7h16a1.5 1.5 0 0 0 1-2.7l-9-6.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="12" cy="13" r="8.5"/><path d="M12 8.5V13l3 2"/><path d="M9.5 2.5h5"/></svg>',
    // the same icon as the game's clipper on / off button
    clipper: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="8" width="10" height="14" rx="3"/><path d="M6 4h12v4H6z"/><path d="M8 4V2M11 4V2M14 4V2M17 4V2"/></svg>',
    arrow: (dir) => `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="${dir < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}"/></svg>`,
    gown: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"><path d="M9 3h6l1 2 5 3-2 13H5L3 8l5-3z"/><path d="M9 3a3 3 0 0 0 6 0"/></svg>',
    close: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    tick: (s = 20) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
    spark: (s = 34) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}"><path d="M12 1.5l2.2 7.3 7.3 2.2-7.3 2.2L12 20.5l-2.2-7.3L2.5 11l7.3-2.2z" fill="#ffe14d" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  };
  // the one icon that means "watch a video": a little screen with a play triangle
  const AD = (s = 26) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}"><rect x="2.5" y="4.5" width="19" height="13.5" rx="2.6" fill="#fff6e6" stroke="${INK}" stroke-width="2.2"/><path d="M10 8.2v6.2l5.3-3.1z" fill="${INK}"/><path d="M8 21h8" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/></svg>`;
  HSC.AD_ICON = AD;
  // the video badge of a locked design
  const videoBadge = (d, s = 24) => {
    const need = C().VIDEOS(d), done = W.data.progress[d.key] || 0;
    return Array.from({ length: need }, (_, i) => (i < done ? `<b class="done">${ICON.tick(s * 0.7)}</b>` : AD(s))).join('');
  };

  const CSS = `
/* every control layer is laid out at phone size and drawn at the screen's scale (--hsc-s, set from the
   short side of the screen): percentages stay true to the screen, pixel sizes and gaps scale together */
.ui,#hsc-hud,#hsc-panel,#hsc-hub{zoom:var(--hsc-s,1)}
#hsc-hud,#hsc-panel,#hsc-hub{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
.hsc-art img,.hsc-tile img{pointer-events:none;-webkit-user-drag:none}
/* just after a screen goes away, the controls under the finger ignore the second tap of a double tap */
body.hsc-settle .ui button,body.hsc-settle #hsc-hud *,body.hsc-settle .hsc-replay{pointer-events:none!important}
#hsc-hud{position:fixed;left:0;top:0;z-index:20;pointer-events:none;font-family:"DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif;color:${INK};transition:opacity .25s}
#hsc-hud .hsc-row{position:absolute;display:flex;gap:8px;align-items:center}
.hsc-btn{pointer-events:auto;position:relative;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff6e6;border:3px solid ${INK};box-shadow:0 3px 0 ${INK};color:${INK};cursor:pointer;padding:0}
.hsc-btn:active{transform:translateY(3px);box-shadow:0 1px 0 ${INK}}
.hsc-dot{position:absolute;right:-4px;top:-4px;width:17px;height:17px;border-radius:50%;background:#ff3b30;border:2.5px solid ${INK};animation:hsc-dotpulse 1.2s ease-in-out infinite}
.hsc-dot[hidden]{display:none}
@keyframes hsc-dotpulse{50%{transform:scale(1.18)}}
.hsc-pill{pointer-events:auto;height:48px;padding:0 14px 0 10px;border-radius:24px;display:flex;gap:6px;align-items:center;background:#fff6e6;border:3px solid ${INK};box-shadow:0 3px 0 ${INK};font-weight:800;font-size:18px;font-variant-numeric:tabular-nums}
#hsc-panel{position:fixed;inset:0;z-index:30;display:none;background:#2a1d1599;font-family:"DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif;color:${INK};touch-action:manipulation}
#hsc-panel.open{display:flex;align-items:flex-end;justify-content:center}
.hsc-sheet{position:relative;width:min(100%,600px);max-height:min(92%,920px);overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y;display:flex;flex-direction:column;gap:12px;background:#fff6e6;border:3px solid ${INK};border-bottom:0;border-radius:26px 26px 0 0;box-shadow:0 -4px 0 ${INK};padding:12px max(12px,env(safe-area-inset-right)) max(14px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left))}
@media (orientation:landscape){#hsc-panel.open{align-items:center}.hsc-sheet{border-radius:26px;border-bottom:3px solid ${INK};box-shadow:0 5px 0 ${INK};width:min(96%,900px);max-height:94%}}
.hsc-head{display:flex;gap:8px;align-items:center}
.hsc-head .grow{flex:1}
.hsc-tab{width:60px;height:50px;border-radius:16px;display:flex;align-items:center;justify-content:center;background:#f1e4cc;border:3px solid ${INK};box-shadow:0 3px 0 ${INK};color:${INK};cursor:pointer;padding:0;position:relative}
.hsc-tab[aria-selected=true]{background:#ffb627}
.hsc-tab .hsc-dot{right:-6px;top:-6px;width:14px;height:14px}
.hsc-x{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff6e6;border:3px solid ${INK};box-shadow:0 3px 0 ${INK};cursor:pointer;color:${INK};padding:0}
.hsc-pickwrap{padding:4px 6px 0}
.hsc-coll{display:flex;flex-direction:column;gap:12px;padding:6px 6px 8px}
@media (orientation:landscape){.hsc-sheet{display:grid;grid-template-columns:minmax(0,40%) minmax(0,1fr);grid-template-rows:auto auto;column-gap:16px}.hsc-head{grid-column:1/3}.hsc-pickwrap{align-self:start}}
.hsc-pager{display:flex;align-items:center;justify-content:center;gap:16px}
.hsc-pager[hidden]{display:none}
.hsc-arrow{width:56px;height:50px;border-radius:25px;display:flex;align-items:center;justify-content:center;background:#ffb627;border:3px solid ${INK};box-shadow:0 3px 0 ${INK};color:${INK};cursor:pointer;padding:0}
.hsc-arrow:disabled{background:#e9dcc4;color:#a89a8a;box-shadow:0 1px 0 ${INK};cursor:default}
.hsc-arrow:not(:disabled):active{transform:translateY(3px);box-shadow:0 1px 0 ${INK}}
.hsc-page{min-width:70px;text-align:center;font-weight:900;font-size:19px;font-variant-numeric:tabular-nums}
.hsc-pick{position:relative;display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:24px;border:3px solid ${INK};box-shadow:0 5px 0 ${INK};background:radial-gradient(circle at 25% 50%,#fff,#ffe9a8 75%);color:${INK}}
.hsc-art{position:relative;flex:none;width:clamp(92px,34vw,140px);height:clamp(92px,34vw,140px);display:flex;align-items:center;justify-content:center}
.hsc-art img{width:81%;height:81%;position:relative}
.hsc-ring{position:absolute;inset:0;width:100%;height:100%}
.hsc-ring .arc{fill:none;stroke-linecap:round}
.hsc-ring .trk{fill:none;stroke:#e9dcc4;stroke-width:11}
.hsc-ring .out{stroke:${INK};stroke-width:15}
.hsc-ring .col{stroke-width:9;stroke:#3fbf5a;transition:stroke .4s}
.hsc-pick.o .hsc-ring .col{stroke:#ff9f1c}.hsc-pick.r .hsc-ring .col{stroke:#ff3b30}
.hsc-pick.taken img{opacity:.45}
.hsc-pick.last{background:radial-gradient(circle at 25% 50%,#fff,#ffc7b8 75%);animation:hsc-alarm 1s ease-in-out infinite}
.hsc-pick.last .hsc-art{animation:hsc-beat 1s ease-in-out infinite}
@keyframes hsc-alarm{0%,100%{box-shadow:0 5px 0 ${INK},0 0 0 4px #ff4d3d55,0 0 14px 4px #ff4d3d66}50%{box-shadow:0 5px 0 ${INK},0 0 0 7px #ff4d3d77,0 0 28px 10px #ff4d3d99}}
@keyframes hsc-beat{0%,45%,100%{transform:scale(1)}12%{transform:scale(1.08)}24%{transform:scale(1.01)}34%{transform:scale(1.06)}}
@media (prefers-reduced-motion:reduce){.hsc-pick.last,.hsc-pick.last .hsc-art{animation:none}}
@media (orientation:landscape) and (max-height:430px){.hsc-sheet{grid-template-columns:minmax(0,46%) minmax(0,1fr)}.hsc-art{width:clamp(80px,14vw,104px);height:clamp(80px,14vw,104px)}.hsc-timer{font-size:15px;padding:0 9px;gap:5px}.hsc-timer svg{width:17px;height:17px}}
.hsc-pick .right{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:10px}
.hsc-pick .right .hsc-vbtn{width:100%;max-width:250px}
/* the pick card sizes itself to its own column (landscape columns can be narrow): the picture gives way so the
   video button and the countdown always fit beside it */
.hsc-pickwrap{container-type:inline-size}
@container (max-width:345px){.hsc-art{width:108px;height:108px}}
@container (max-width:305px){.hsc-art{width:88px;height:88px}.hsc-timer{font-size:15px;padding:0 8px;gap:4px}.hsc-timer svg{width:17px;height:17px}}
@container (max-width:270px){.hsc-art{width:74px;height:74px}.hsc-pick{gap:8px;padding:8px}}
@media (max-width:360px){.hsc-timer{font-size:15px;padding:0 8px;gap:4px}.hsc-timer svg{width:17px;height:17px}.hsc-vbtn{height:62px}}
.hsc-vbtn{height:72px;border-radius:36px;display:flex;align-items:center;justify-content:center;gap:6px;background:#58c8f5;border:3px solid ${INK};box-shadow:0 4px 0 ${INK};cursor:pointer;color:${INK};padding:0;animation:hsc-breathe 1.3s ease-in-out infinite}
.hsc-vbtn:disabled{animation:none}
.hsc-vbtn:not(:disabled):active{transform:translateY(3px);box-shadow:0 1px 0 ${INK}}
.hsc-vbtn .done{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:#5ccf72;border:2px solid ${INK};color:${INK}}
.hsc-pick.taken .hsc-vbtn{background:#e9dcc4;color:#7d6e5f;box-shadow:0 2px 0 ${INK};animation:none;cursor:default}
@keyframes hsc-breathe{50%{transform:scale(1.04)}}
.hsc-timer{align-self:center;display:flex;align-items:center;gap:6px;height:34px;padding:0 12px;border-radius:17px;background:#fff6e6;border:2.5px solid ${INK};font-weight:900;font-size:17px;font-variant-numeric:tabular-nums}
.hsc-timer.g{background:#c8f0cf}.hsc-timer.o{background:#ffd27a}.hsc-timer.r{background:#ff3b30;color:#fff}
.hsc-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px 12px}
@media (orientation:landscape) and (min-height:431px){.hsc-grid{grid-template-columns:repeat(5,minmax(0,1fr))}}
.hsc-tile{position:relative;aspect-ratio:1;border-radius:18px;border:3px solid ${INK};box-shadow:0 3px 0 ${INK};background:radial-gradient(circle at 50% 40%,#fff,#f1e4cc 75%);display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer;color:${INK}}
.hsc-tile img{width:92%;height:92%;pointer-events:none}
.hsc-tile.cur{outline:4px solid #5ccf72;outline-offset:3px}
.hsc-tile .on{position:absolute;right:-10px;top:-10px;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#5ccf72;border:3px solid ${INK}}
.hsc-tile .new{position:absolute;left:-12px;top:-14px;filter:drop-shadow(0 2px 0 ${INK})}
.hsc-tile.ghost{border-style:dashed;box-shadow:none;background:#f6ecd8;opacity:.6;cursor:default}
.hsc-tile:not(.ghost):active{transform:translateY(3px)}
.hsc-pop{animation:hsc-popin .5s cubic-bezier(.3,1.6,.5,1)}
.hsc-pickwrap[hidden]{display:none}
/* no video came: a short shake, the button stays ready */
.hsc-nope{animation:hsc-nope .45s ease-in-out!important}
@keyframes hsc-nope{20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}
@keyframes hsc-popin{0%{transform:scale(.75)}100%{transform:scale(1)}}
/* the finish button sits on the same line and margin as the top-left buttons (the game's own CSS used 8 px from
   the top in landscape and 12 px from the right on short landscape screens, against the row's 12 / 8) */
@media (orientation:landscape){.ui[data-status] .bar{top:max(12px,env(safe-area-inset-top))}}
@media (orientation:landscape) and (max-height:430px){.ui[data-status] .bar{top:max(8px,env(safe-area-inset-top));right:max(8px,env(safe-area-inset-right))}}
/* the finish button in the top right: the same size as the buttons in the top left */
.ui .finish.seal,.ui[data-status=cutting] .ctl.finish.seal{width:48px!important;height:48px!important}
.ui .finish.seal svg:not(.seal-shape){width:24px;height:24px}
`;

  const ui = {
    tool: 'clipper',
    page: 0,
    el: {},
    busy: false,
    build() {
      const st = document.createElement('style');
      st.textContent = CSS;
      document.head.appendChild(st);
      const hud = document.createElement('div');
      hud.id = 'hsc-hud';
      hud.innerHTML = `<div class="hsc-row"><button class="hsc-btn hsc-rw" type="button" aria-label="Wardrobe">${ICON.hanger}<span class="hsc-dot" hidden></span></button></div>`;
      document.body.appendChild(hud);
      this.el.hud = hud;
      this.el.row = hud.querySelector('.hsc-row');
      this.el.btn = hud.querySelector('.hsc-rw');
      this.el.dot = hud.querySelector('.hsc-dot');
      this.el.btn.addEventListener('click', () => this.open());

      const panel = document.createElement('div');
      panel.id = 'hsc-panel';
      panel.innerHTML = `<div class="hsc-sheet" role="dialog" aria-label="Wardrobe">
        <div class="hsc-head">
          <button class="hsc-tab" data-tool="clipper" type="button" aria-label="Clippers">${ICON.clipper}<span class="hsc-dot" hidden></span></button>
          <button class="hsc-tab" data-tool="gown" type="button" aria-label="Robes">${ICON.gown}<span class="hsc-dot" hidden></span></button>
          <div class="grow"></div>
          ${HSC.setDetailSetting ? '<button class="hsc-btn hsc-detail" type="button" aria-label="Detail level"></button>' : ''}
          <button class="hsc-x" type="button" aria-label="Close">${ICON.close}</button>
        </div>
        <div class="hsc-pickwrap"></div>
        <div class="hsc-coll"><div class="hsc-grid"></div>
          <div class="hsc-pager" hidden><button class="hsc-arrow" data-dir="-1" type="button" aria-label="Previous">${ICON.arrow(-1)}</button><div class="hsc-page"></div><button class="hsc-arrow" data-dir="1" type="button" aria-label="Next">${ICON.arrow(1)}</button></div></div>
      </div>`;
      document.body.appendChild(panel);
      this.el.panel = panel;
      this.el.sheet = panel.querySelector('.hsc-sheet');
      this.el.pick = panel.querySelector('.hsc-pickwrap');
      this.el.grid = panel.querySelector('.hsc-grid');
      this.el.pager = panel.querySelector('.hsc-pager');
      this.el.pageNum = panel.querySelector('.hsc-page');
      panel.querySelectorAll('.hsc-arrow').forEach((b) => b.addEventListener('click', () => { this.page += +b.dataset.dir; this.render(); }));
      panel.querySelector('.hsc-head .hsc-x').addEventListener('click', () => this.close());
      panel.addEventListener('click', (e) => { if (e.target === panel) this.close(); });
      addEventListener('keydown', (e) => { if (e.key === 'Escape' && this.el.panel.classList.contains('open')) this.close(); });
      // turning the device with the panel open: two rows of the new width
      try { matchMedia('(orientation: landscape)').addEventListener('change', () => { if (this.el.panel.classList.contains('open')) this.render(); }); } catch (e) {}
      panel.querySelectorAll('.hsc-tab').forEach((b) => b.addEventListener('click', () => { this.tool = b.dataset.tool; this.page = 0; this.render(); }));
      // the Android build keeps its detail-level button
      this.el.detail = panel.querySelector('.hsc-detail');
      if (this.el.detail) this.el.detail.addEventListener('click', () => {
        const order = ['auto', 'low', 'high'], D = HSC.detail;
        HSC.setDetailSetting(order[(order.indexOf(D.setting) + 1) % order.length]);
        this.drawDetail();
      });
      const place = () => { if (HSC.executionPaused) return; HSC.applyScale(); this.place(); if (this.el.panel.classList.contains('open')) this.render(); };
      addEventListener('resize', place);
      // keeps the button in place, the red dot up to date, and the countdown ticking
      HSC.lifecycle.interval(() => {
        place();
        const open = this.el.panel.classList.contains('open');
        if (open && this.day !== picks().day) this.render(); // midnight: today's new picks replace yesterday's
        else if (open) this.tickTimer();
        this.dot();
      }, 1000);
      place();
      this.dot();
    },
    place() {
      // sit to the right of the game's sound button (or in its place if there is none); the row is drawn at
      // the UI scale, so screen positions are divided by it
      const audio = document.querySelector('.audio-toggle'), S = HSC.S || 1;
      const r = audio ? audio.getBoundingClientRect() : null;
      this.el.row.style.left = r && r.width ? r.right / S + 8 + 'px' : 'max(12px, env(safe-area-inset-left))';
      this.el.row.style.top = r && r.height ? r.top / S + 'px' : 'max(12px, env(safe-area-inset-top))';
    },
    // the red dot: once a day, while today's pick is waiting
    waiting(tool) { return canVideo() && dailyPickAvailable() && !owns(picks()[tool]); },
    dot() {
      if (!W.data || !this.el.dot) return;
      this.el.dot.hidden = !(W.data.dotDay !== today() && (this.waiting('clipper') || this.waiting('gown')));
      const fresh = W.data.dotDay !== today() || (this.openDot && this.el.panel.classList.contains('open'));
      this.el.panel.querySelectorAll('.hsc-tab').forEach((b) => { b.querySelector('.hsc-dot').hidden = !(fresh && this.waiting(b.dataset.tool)); });
    },
    open() {
      // open on the tab whose pick is still waiting
      if (!this.waiting(this.tool) && this.waiting(this.tool === 'clipper' ? 'gown' : 'clipper')) this.tool = this.tool === 'clipper' ? 'gown' : 'clipper';
      this.page = 0;
      this.render();
      this.openDot = W.data.dotDay !== today();
      this.dot();
      W.data.dotDay = today();
      save();
      this.el.panel.classList.add('open');
      this.fit();
      W.client && W.client.setPauseReason && W.client.setPauseReason('wardrobe', true);
      try { this.el.panel.querySelector('.hsc-x').focus({ preventScroll: true }); } catch (e) {}
    },
    close() {
      if (!this.el.panel.classList.contains('open')) return;
      this.el.panel.classList.remove('open');
      HSC.settle && HSC.settle();
      W.client && W.client.setPauseReason && W.client.setPauseReason('wardrobe', false);
      this.dot();
    },
    drawDetail() {
      if (!this.el.detail) return; // builds with one fixed detail level have no button
      const D = HSC.detail || { level: 'high', setting: 'auto' };
      const on = D.level === 'low' ? 1 : 3;
      const bar = (i, h) => `<rect x="${4 + i * 6}" y="${20 - h}" width="4.4" height="${h}" rx="1.2" fill="${i < on ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.6"/>`;
      this.el.detail.innerHTML = `<svg viewBox="0 0 24 24" width="26" height="26">${bar(0, 6)}${bar(1, 11)}${bar(2, 16)}${D.setting === 'auto' ? '<circle cx="5" cy="5" r="2.6" fill="#ff8a3d" stroke="currentColor" stroke-width="1.2"/>' : ''}</svg>`;
    },
    tickTimer() {
      const t = this.el.pick.querySelector('.hsc-timer');
      if (!t) return;
      const left = timeLeft(this.day);
      t.querySelector('span').textContent = left.text;
      const taken = !!t.dataset.taken, card = this.el.pick.querySelector('.hsc-pick');
      t.classList.toggle('low', left.low && !taken);
      for (const l of ['g', 'o', 'r']) { t.classList.toggle(l, !taken && left.lvl === l); card.classList.toggle(l, !taken && left.lvl === l); }
      card.classList.toggle('last', !taken && left.last);
      // what is left of the day, as an arc that empties anticlockwise towards the top (a red dot at the very end)
      const C = 2 * Math.PI * 62, len = Math.max(left.frac * C, left.frac > 0 ? 4 : 0);
      this.el.pick.querySelectorAll('.hsc-ring .arc').forEach((a) => a.setAttribute('stroke-dasharray', `${len.toFixed(1)} ${C.toFixed(1)}`));
    },
    render() {
      if (!W.data) return;
      this.drawDetail();
      const tool = this.tool, cur = W.data.look[tool];
      this.el.panel.querySelectorAll('.hsc-tab').forEach((b) => b.setAttribute('aria-selected', b.dataset.tool === tool ? 'true' : 'false'));
      // today's pick: one video and it is yours; the countdown runs to midnight
      const pk = picks(), d = C().byKey.get(pk[tool]), taken = owns(d.key);
      this.day = pk.day;
      // no rewarded videos on this platform: nothing to offer, only the wardrobe
      this.el.pick.hidden = !canVideo() || (!taken && !dailyPickAvailable());
      const need = C().VIDEOS(d), done = W.data.progress[d.key] || 0;
      const badge = taken ? ICON.tick(34) : Array.from({ length: need }, (_, i) => (i < done ? `<b class="done">${ICON.tick(20)}</b>` : AD(need > 1 ? 40 : 46))).join('');
      this.el.pick.innerHTML = `<div class="hsc-pick${taken ? ' taken' : ''}"><div class="hsc-art">${taken ? '' : RING}<img src="${picture(d, 260)}" alt=""></div>
        <div class="right"><button class="hsc-vbtn" type="button" ${taken ? 'disabled' : ''} aria-label="${taken ? 'Yours: a new one tomorrow' : "Today's pick: watch a video to get it"}">${badge}</button>
        <div class="hsc-timer" ${taken ? 'data-taken="1"' : ''} aria-label="Time left today">${ICON.clock}<span></span></div></div></div>`;
      this.el.pick.querySelector('.hsc-vbtn').addEventListener('click', () => this.take(d));
      this.tickTimer();
      // everything the player owns: the one worn first, then the newest; one empty slot at the end hints that
      // there is more to get. Two rows at a time (only those pictures are drawn), arrows for the rest.
      const rank = new Map(W.data.recent.map((k, n) => [k, n]));
      const owned = C().designs[tool].filter((x) => owns(x.key))
        .sort((a, b) => ((b.id === cur) - (a.id === cur)) || ((rank.has(b.key) ? rank.get(b.key) : -1) - (rank.has(a.key) ? rank.get(a.key) : -1)) || a.i - b.i);
      // two rows; one on squat portrait screens (tiny square embeds), where two rows of tiles cannot fit
      const land = matchMedia('(orientation: landscape)').matches;
      const rows = !land && innerHeight / (HSC.S || 1) < 520 ? 1 : 2;
      const cols = land && matchMedia('(min-height: 431px)').matches ? 5 : 4, per = cols * rows;
      const items = [...owned, null], pages = Math.ceil(items.length / per);
      this.page = Math.max(0, Math.min(pages - 1, this.page));
      this.el.grid.innerHTML = items.slice(this.page * per, this.page * per + per).map((x) => (x
        ? `<button type="button" class="hsc-tile${x.id === cur ? ' cur' : ''}" data-key="${x.key}" aria-label="${x.id === cur ? 'Wearing' : 'Wear this'}"><img src="${picture(x)}" alt="">${x.id === cur ? `<span class="on">${ICON.tick(18)}</span>` : ''}${x.key === this.fresh ? `<span class="new">${ICON.spark(30)}</span>` : ''}</button>`
        : '<div class="hsc-tile ghost"></div>')).join('');
      this.el.pager.hidden = pages <= 1;
      this.el.pageNum.textContent = `${this.page + 1}/${pages}`;
      const [prev, next] = this.el.pager.querySelectorAll('.hsc-arrow');
      prev.disabled = this.page === 0;
      next.disabled = this.page >= pages - 1;
      for (const b of this.el.grid.querySelectorAll('.hsc-tile[data-key]')) b.addEventListener('click', () => {
        const x = C().byKey.get(b.dataset.key);
        // the worn design leads the wardrobe: back to the first page to see it there
        if (W.data.look[x.tool] !== x.id) { equip(x.tool, x.id); this.page = 0; this.render(); this.pop(x.key); }
      });
      this.fit();
    },
    fit() {
      const sh = this.el.sheet;
      if (!sh || !this.el.panel.classList.contains('open')) return;
      // the tiles follow the sheet's width, so a smaller drawing reflows taller: refine a few times
      let z = 1;
      sh.style.zoom = '';
      for (let i = 0; i < 6 && sh.scrollHeight > sh.clientHeight + 1 && z > 0.55; i++) {
        z = Math.max(0.55, z * (sh.clientHeight / sh.scrollHeight) * 0.995);
        sh.style.zoom = String(z);
      }
    },
    pop(key) {
      const t = this.el.grid.querySelector(`[data-key="${key}"]`);
      if (t) { t.classList.remove('hsc-pop'); void t.offsetWidth; t.classList.add('hsc-pop'); }
    },
    // the platform says a rewarded video can (or can no longer) play: the pick card and the red dot follow at once
    // (not mid-video: the card is redrawn when that video ends)
    ready() {
      if (!W.data || !this.el || !this.el.pick || this.busy) return;
      if (this.el.panel.classList.contains('open')) this.render();
      this.dot();
    },
    async take(d) {
      if (this.busy || owns(d.key) || !dailyPickAvailable()) return;
      // a card drawn before the day changed offers yesterday's pick: show today's instead
      if (picks()[d.tool] !== d.key) { this.render(); return; }
      this.busy = true;
      const b = this.el.pick.querySelector('.hsc-vbtn');
      b.disabled = true;
      const ok = await watchVideo('unlock-item');
      this.busy = false;
      if (!ok && !canVideo()) { this.render(); this.dot(); return; } // no video can play now: the card goes away
      if (!ok) { b.disabled = false; HSC.nope && HSC.nope(b); return; }
      W.data.pickRewardDay = today();
      if (grant(d, 'daily') === 'unlocked') { equip(d.tool, d.id); this.fresh = d.key; this.page = 0; this.render(); this.pop(d.key); }
      else this.render();
    },
  };

  if (typeof addEventListener === 'function') addEventListener('hsc-rewarded-ready', () => { try { ui.ready(); } catch (e) {} });
  HSC.wardrobeApply = () => applyLook();
  // for other modules: the current look, pictures of designs, and a design previewed without owning it
  HSC.rewards = {
    canVideo,
    owns: (key) => !!W.data && owns(key),
    preview(tool, id) { W.preview[tool] = id || null; applyLook(); },
    clearPreview() { W.preview = { clipper: null, gown: null }; applyLook(); },
    picture: (d, size) => picture(d, size),
  };
  HSC.wardrobeInit = async function ({ client, game, savedData }) {
    W.client = client;
    W.game = game;
    const d = savedData !== undefined ? savedData : client && client.loadProgress ? await client.loadProgress(KEY, null) : null;
    W.data = sanitize(d);
    try { ui.build(); } catch (e) { console.error('customers: rewards UI failed', e); }
    try { HSC.hubInit && HSC.hubInit(); } catch (e) { console.error('customers: hub failed', e); }
    applyLook();
    save();
  };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Completion screen: after the reveal spin only the finished customer and the game's Continue arrow
// remain on screen; the top buttons hide. A chime plays as the reveal lands, and the gown is brushed off.
// Keeping the result free of a next-customer preview avoids an extra person swap, thumbnail render and
// GPU readback at the most memory-sensitive point of the haircut loop.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  const M = () => HSC.meta;

  // any person with any hair and beard grids, for the lookbook and the regulars album (collection.js);
  // the customer in the chair is put back after the one render
  HSC.portrait = function (person, hair, beard, angle, size) {
    const v = HSC.view, g = globalThis.skinFadeStudio;
    if (!v || !v.thumbnail || !g) return null;
    const s = g.getState();
    let url = null;
    HSC.snapshotting = true;
    try {
      HSC.setPerson(person);
      HSC.setBeard(beard || HSC.beardStartFor(person));
      if (HSC.setBrow) HSC.setBrow(null);
      if (v.setAppearance) v.setAppearance(person.hair.colour);
      url = v.thumbnail(hair, angle == null ? 160 : angle, 4, { size: size || 200, headOnly: true });
    } catch (e) {
      console.error('customers: portrait failed', e);
    } finally {
      try { HSC.setPerson(s.look.person); HSC.setBeard(s.beard); if (HSC.setBrow) HSC.setBrow(s.brow || null); if (v.setAppearance) v.setAppearance(s.look.colour != null ? s.look.colour : 1); } catch (e) {}
      HSC.snapshotting = false;
    }
    return url;
  };

  // ---------------- reveal sound ----------------
  // synthesised (no audio files): a soft whoosh as the camera spins, a bright bell chime when it lands
  const sfx = { ctx: null, out: null, noise: null };
  HSC.setRevealAudio = enabled => {
    if (!sfx.ctx || !sfx.out) return;
    sfx.out.gain.cancelScheduledValues(sfx.ctx.currentTime);
    sfx.out.gain.value = enabled ? 0.55 * (view()?.volume ?? 1) : 0;
    (enabled ? sfx.ctx.resume() : sfx.ctx.suspend()).catch(() => {});
  };
  const view = () => { try { return globalThis.skinFadeStudio.getView(); } catch (e) { return null; } };
  const audible = () => { const v = view(); return !!(v && v.audio && !v.paused); };
  function ac() {
    if (HSC.audio) { const c = HSC.audio.ctx({ ui: true }); if (c) { sfx.ctx = c; sfx.out = HSC.audio.bus('reveal', 0.55); } return c; } // Android: the one engine
    if (!sfx.ctx) {
      const C = globalThis.AudioContext || globalThis.webkitAudioContext;
      if (!C) return null;
      sfx.ctx = new C();
      sfx.out = sfx.ctx.createGain();
      sfx.out.connect(sfx.ctx.destination);
    }
    if (sfx.ctx.state === 'suspended') sfx.ctx.resume().catch(() => {});
    const v = view();
    sfx.out.gain.value = 0.55 * (v && typeof v.volume === 'number' ? v.volume : 1);
    return sfx.ctx;
  }
  function whoosh() {
    if (!audible()) return;
    const c = ac();
    if (!c) return;
    const t = c.currentTime;
    if (!sfx.noise) {
      sfx.noise = c.createBuffer(1, Math.round(c.sampleRate * 1.2), c.sampleRate);
      const d = sfx.noise.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const src = c.createBufferSource(), bp = c.createBiquadFilter(), gn = c.createGain();
    src.buffer = sfx.noise;
    bp.type = 'bandpass'; bp.Q.value = 1.2;
    bp.frequency.setValueAtTime(420, t); bp.frequency.exponentialRampToValueAtTime(2600, t + 0.75);
    gn.gain.setValueAtTime(0.0001, t); gn.gain.exponentialRampToValueAtTime(0.22, t + 0.3); gn.gain.exponentialRampToValueAtTime(0.0001, t + 1.05);
    src.connect(bp).connect(gn).connect(sfx.out);
    src.start(t); src.stop(t + 1.1);
  }
  function chime(levelUp) {
    if (!audible()) return;
    const c = ac();
    if (!c) return;
    const t0 = c.currentTime + 0.02;
    const notes = levelUp ? [1046.5, 1318.5, 1568, 2093, 2637] : [1046.5, 1318.5, 1568, 2093];
    notes.forEach((f, i) => {
      const t = t0 + i * 0.075;
      for (const [mul, amp] of [[1, 0.16], [2.76, 0.045], [5.4, 0.015]]) {
        const o = c.createOscillator(), g = c.createGain();
        o.type = 'sine'; o.frequency.value = f * mul;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(amp, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.3 / mul + 0.25);
        o.connect(g).connect(sfx.out);
        o.start(t); o.stop(t + 1.6);
      }
    });
    // a little sparkle on top
    for (let k = 0; k < 6; k++) {
      const t = t0 + 0.28 + k * 0.06 + Math.random() * 0.03;
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'triangle'; o.frequency.value = 3200 + Math.random() * 2600;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.03, t + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      o.connect(g).connect(sfx.out);
      o.start(t); o.stop(t + 0.15);
    }
  }

  // ---------------- UI ----------------
  const CSS = `
#hsc-hub{position:fixed;inset:0;z-index:19;pointer-events:none}
body.hsc-reveal #hsc-hud,body.hsc-spin #hsc-hud{opacity:0;pointer-events:none;visibility:hidden}
body.hsc-reveal #hsc-hud *{pointer-events:none}
body.hsc-reveal .ui .top{visibility:hidden}
/* Next stays well clear of the banner strip below the game */
body.hsc-reveal .training-continue{translate:0 -18px}
`;

  const st = { job: null, round: null, el: {}, built: false };

  function build() {
    if (st.built || !document.body) return;
    st.built = true;
    const style = document.createElement('style');
    style.textContent = CSS + TUT_CSS;
    document.head.appendChild(style);
    const hub = document.createElement('div');
    hub.id = 'hsc-hub';
    document.body.appendChild(hub);
    st.el = { hub };
    // a mouse or touch press does not leave a top button focused (Space / Enter stay with the game)
    document.addEventListener('click', (e) => { const a = document.activeElement; if (e.detail > 0 && a && a.tagName === 'BUTTON' && !a.closest('#hsc-panel')) HSC.lifecycle.timeout(() => a.blur(), 0); }, true);
    // the first tap anywhere lets the reveal sounds play later
    document.addEventListener('pointerdown', () => { if (audible()) ac(); }, true);
    // Next is one continuous natural break. Start the real shop buffer on the user's click, then let the engine request
    // its interstitial (if this result is eligible) while the host still has the original user activation. The engine's
    // shared beforeNextCustomer hook paints the same buffer again after the ad and immediately before the customer swap.
    const next = () => {
      const g = globalThis.skinFadeStudio, s = g && g.getState(), v = g && g.getView();
      if (!g || !s || !v || s.status !== 'reveal' || !v.revealComplete || v.busy) return false;
      if (HSC.nextCustomerLoading) HSC.nextCustomerLoading(true);
      leaveReveal();
      Promise.resolve(g.next()).then((ok) => {
        if (!ok && HSC.nextCustomerLoading) { if (st.round) st.round.left = false; HSC.nextCustomerLoading(false); tick(); }
      }, () => { if (st.round) st.round.left = false; if (HSC.nextCustomerLoading) HSC.nextCustomerLoading(false); tick(); });
      return true;
    };
    let previousContinue = null;
    document.addEventListener('click', e => {
      const button = e.target.closest?.('button');
      if (!button) return;
      if (e.detail && previousContinue && performance.now() - previousContinue.time < 280 &&
          Math.hypot(e.clientX - previousContinue.x, e.clientY - previousContinue.y) < 22 &&
          button.closest('.ui') && !button.matches('.training-continue')) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      if (!button.matches('.training-continue') || button.disabled || !next()) return;
      previousContinue = e.detail ? {x:e.clientX, y:e.clientY, time:performance.now()} : null;
      e.preventDefault();
      e.stopImmediatePropagation();
    }, true);
    // Keyboard Continue follows the identical path. Calling next() here also avoids the menu cover swallowing Enter
    // after it has been opened as the transition buffer.
    addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' || e.altKey || e.ctrlKey || e.metaKey || !next()) return;
      e.preventDefault();
      e.stopImmediatePropagation();
    }, true);
    HSC.lifecycle.interval(tick, 150);
  }
  HSC.onHaircutDone = function (state) {
    if (!M() || !M().data) return;
    build();
    const info = M().onFinish(state);
    st.round = { job: state.jobId, info, shown: false };
    HSC.brushClippings && HSC.brushClippings();
    whoosh();
  };

  // a short pause on input after a screen goes away: the second tap of a double tap would land on what
  // appears under the finger (the clipper button sits where next was)
  let settleT = 0;
  HSC.settle = () => { document.body.classList.add('hsc-settle'); HSC.lifecycle.clear(settleT); settleT = HSC.lifecycle.timeout(() => document.body.classList.remove('hsc-settle'), 450); };

  // the player left the reveal
  function leaveReveal() {
    const r = st.round;
    if (!r || r.left) return;
    r.left = true;
    st.el.hub && st.el.hub.classList.remove('show');
    document.body.classList.remove('hsc-reveal');
  }

  function tick() {
    const g = globalThis.skinFadeStudio;
    if (!g || !M() || !M().data) return;
    const s = g.getState(), v = g.getView();
    // Busy covers the ad request, the save and the actual customer swap. Only remove the buffer after all three are
    // complete; nextCustomerReady then gives the freshly dirtied renderer two frames to paint the new customer.
    if (s.status === 'cutting' && !v.busy && HSC.nextCustomerReady) HSC.nextCustomerReady();
    if (st.job !== s.jobId) {
      if (st.round && st.round.job !== s.jobId) { leaveReveal(); st.round = null; }
      st.job = s.jobId;
      }
    const q0 = M().data.queue;
    if (s.status === 'reveal' && !st.round && (!q0 || q0.job !== s.jobId + 1) && !HSC.otherTab) {
      // a reload during the reveal, and the haircut never reached the progress save (the tab closed between
      // the two saves): count it now, so the next customer is chosen and shown
      HSC.onHaircutDone(s);
    }
    if (s.status === 'reveal' && !st.round) {
      // a reload during the reveal
      const cuts = M().data.cuts, q = M().data.queue;
      const levelUp = cuts > 0 && M().levelOf(cuts) > M().levelOf(cuts - 1) && !!q && q.job === s.jobId + 1;
      st.round = { job: s.jobId, info: { levelUp, job: s.jobId + 1 }, shown: false };
    }
    document.body.classList.toggle('hsc-spin', s.status === 'reveal' && !v.revealComplete);
    const show = s.status === 'reveal' && v.revealComplete && st.round && st.round.job === s.jobId && !st.round.left;
    if (show && !st.el.hub.classList.contains('show')) {
      st.round.shown = true;
      st.el.hub.classList.add('show');
      document.body.classList.add('hsc-reveal');
      chime(!!(st.round.info && st.round.info.levelUp));
    }
    if (!show && st.el.hub.classList.contains('show')) { st.el.hub.classList.remove('show'); document.body.classList.remove('hsc-reveal'); }
  }

  // ---------------- first-time "turn the customer" hint ----------------
  // One layout on every screen: the turn icon beside a dotted arc, the hand sweeping along it, the group
  // centred above the head. Only the arc scales with the head (60% of its width, it shows the motion over
  // the head); the icon and the hand keep the size of the game's other buttons and hints. The whole hint
  // ends just above the top of the hair and keeps clear of the top buttons.
  // Geometry at arc scale k, relative to the anchor (the arc's left end), in px:
  //   arc box   x -8k..132k, y -30k..10k (ends at y 0, top of the curve at -18k)
  //   icon 38px x -8k-50..-8k-12, y -26..12          hand 44x48 from (-10,-6), sweeping 118k to the right
  HSC.tutSpinLayout = function (head0, vw0) {
    // the hint is drawn at the UI scale: lay it out in its own (scaled) pixels, hand back screen pixels
    const S = HSC.S || 1;
    const head = { x: head0.x / S, top: head0.top / S, left: head0.left / S, right: head0.right / S }, vw = vw0 / S;
    const out = spinLayout(head, vw, S);
    return { left: out.left * S, top: out.top * S, k: out.k };
  };
  function spinLayout(head, vw, S) {
    const W = head.right - head.left;
    const hairTop = head.top - 0.11 * W; // the scalp top from the game, plus the hair standing on it
    const gap = 8;
    const tops = [...document.querySelectorAll('.ui .top > *, .ui .top button, #hsc-hud .hsc-row')]
      .map((e) => e.getBoundingClientRect()).map((r) => ({ left: r.left / S, right: r.right / S, top: r.top / S, bottom: r.bottom / S, width: r.width })).filter((r) => r.width && r.top < 160);
    const place = (k) => {
      const gl = -8 * k - 50, gr = Math.max(132 * k, 118 * k + 34);
      const left = Math.max(8 - gl, Math.min(vw - 8 - gr, head.x - (gl + 132 * k) / 2));
      const top = hairTop - gap - 42;
      const box = { l: left + gl, t: top + Math.min(-26, -20 * k), r: left + gr };
      const limit = Math.max(8, ...tops.filter((r) => r.right > box.l && r.left < box.r).map((r) => r.bottom + 6));
      return { left, top, k, fits: box.t >= limit, room: top - limit, below: limit + Math.max(26, 20 * k) };
    };
    let k = Math.max(0.6, Math.min(2.6, (0.6 * W) / 140));
    let p = place(k);
    // too little room for a tall curve: flatten (shrink) the arc, the icon and hand stay
    if (!p.fits && p.room > 26) { k = Math.max(0.6, Math.min(k, p.room / 20)); p = place(k); }
    // no room above the head at all (tiny screens): just below the top buttons, never under them
    if (!p.fits) p = Object.assign({}, p, { top: p.below });
    return { left: p.left, top: p.top, k };
  }
  const TUT_CSS = `
.tutorial.tut-spin .tut-path{left:calc(-8px * var(--k,1));top:calc(-30px * var(--k,1));width:calc(140px * var(--k,1));height:calc(40px * var(--k,1))}
.tutorial.tut-spin .tut-trail{vector-effect:non-scaling-stroke}
.tutorial.tut-spin .tut-tool{left:calc(-8px * var(--k,1) - 50px);top:-26px}
.tutorial.tut-spin .tut-hand{animation-name:hsc-across}
@keyframes hsc-across{0%,12%{transform:translateX(0);opacity:0}20%{opacity:1}80%{transform:translateX(calc(118px * var(--k,1)));opacity:1}100%{transform:translateX(calc(118px * var(--k,1)));opacity:0}}`;

  HSC.tutStyle = function (h) {
    const S = HSC.S || 1;
    if (S === 1 || !h) return h;
    const o = Object.assign({}, h);
    for (const k of ['left', 'top']) if (typeof o[k] === 'string' && o[k].endsWith('px')) o[k] = parseFloat(o[k]) / S + 'px';
    return o;
  };

  HSC.hubInit = function () {
    build();
  };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Falling hair: every clipper pass releases cut pieces the length of what was removed, in the
// customer's colour (with grey strands) and curl. They flutter down with air drag, tumble, land on
// the gown and settle (sliding off steep folds), and stay there until the next customer.
// World units: about 1 unit = 10 cm.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  // The YouTube mobile profile renders at most 1,200 pieces. Allocating the prototype's full 12,000-piece CPU and
  // GPU buffers on those phones wastes several megabytes before the first cut and raises context-loss pressure.
  const MOBILE = !!(HSC.detail && HSC.detail.mobile);
  const MAX = HSC.PHENOTYPES ? (MOBILE ? Math.max(1200, HSC.detail.clipMax || 0) : 12000) : 4000;
  // On phones, three bends are visually sufficient at this effect's small on-screen size and halve the falling-hair
  // vertex load. Desktop keeps the original six-bend silhouette.
  const SEG = MOBILE ? 3 : 6;
  const EXC = !!HSC.PHENOTYPES;
  const G = 98; // gravity in world units / s^2
  const K = {
    pos: new Float32Array(MAX * 3), vel: new Float32Array(MAX * 3), dir: new Float32Array(MAX * 3), axis: new Float32Array(MAX * 3),
    spin: new Float32Array(MAX), len: new Float32Array(MAX), drag: new Float32Array(MAX), phase: new Float32Array(MAX),
    state: new Uint8Array(MAX), // 0 free, 1 falling, 2 sliding, 3 resting
    swept: new Uint8Array(MAX), // brushed off at the reveal: falls past the gown and out of sight
    through: new Uint8Array(MAX), // over a hole in the gown: 1 falls past it out of sight, 2 lands on the collar (land), 3 no collar found
    land: new Float32Array(MAX * 3),
    born: new Float64Array(MAX), col: new Float32Array(MAX * 3), curl: new Float32Array(MAX * 4),
    count: 0, next: 0, last: 0, moving: 0,
  };
  let mesh = null, geo = null, attrs = null, ctx = null, field = null, Rng = HSC.rng(4242);
  const CLIPQ = { value: 0 };

  const VERT = `
attribute vec4 iPos;   // xyz centre, w length
attribute vec3 iDir;   // unit direction of the piece
attribute vec4 iCurl;  // curl radius (x length), turns, phase, width
attribute vec3 iCol;
varying vec3 vCol; varying float vShade; varying float vEdge;
${EXC ? 'uniform float uClipQ; varying float vSpec;' : ''}
void main(){
  float t=position.y-.5;
  vec3 d=normalize(iDir);
  vec3 up=abs(d.y)<.95?vec3(0.0,1.0,0.0):vec3(1.0,0.0,0.0);
  vec3 a=normalize(cross(d,up)),b=cross(d,a);
  float L=iPos.w;
  float ph=t*iCurl.y*6.2831+iCurl.z;
  vec3 p=iPos.xyz+d*(t*L)+(a*cos(ph)+b*sin(ph))*iCurl.x*L;
  vec3 tang=normalize(d*L+(-a*sin(ph)+b*cos(ph))*iCurl.x*L*iCurl.y*6.2831+vec3(1e-5));
  vec3 view=normalize(cameraPosition-p);
  vec3 side=normalize(cross(tang,view)+vec3(1e-5));
  p+=side*position.x*iCurl.w;
  vCol=iCol; vEdge=position.x;
  float tangentLight=dot(tang,normalize(vec3(-.3,.8,.5)));
  vShade=.62+.5*sqrt(max(0.0,1.0-tangentLight*tangentLight));
  ${EXC ? `// prototype: the scalp hair's sharp highlight, and a little darker where a piece faces away
  vec3 hh=normalize(view+normalize(vec3(-.3,.8,.5)));float th=dot(tang,hh);
  vSpec=pow(sqrt(max(0.0,1.0-th*th)),48.0)*uClipQ;
  vShade=mix(vShade,.5+.62*sqrt(max(0.0,1.0-tangentLight*tangentLight)),uClipQ);` : ''}
  gl_Position=projectionMatrix*viewMatrix*vec4(p,1.0);
}`;
  const FRAG = `
varying vec3 vCol; varying float vShade; varying float vEdge;
${EXC ? 'varying float vSpec;' : ''}
void main(){
  if(abs(vEdge)>.98)discard;
  gl_FragColor=vec4(vCol*vShade${EXC ? '+vec3(1.0,.93,.84)*vSpec*.22' : ''},1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

  HSC.attachClippings = function (c) {
    ctx = c;
    const T = c.T;
    geo = new T.af();
    const pos = [], idx = [];
    for (let s = 0; s <= SEG; s++) {
      pos.push(-1, s / SEG, 0, 1, s / SEG, 0);
      if (s < SEG) { const u = s * 2; idx.push(u, u + 1, u + 2, u + 1, u + 3, u + 2); }
    }
    geo.setAttribute('position', new T.mt(pos, 3));
    geo.setIndex(idx);
    attrs = {
      iPos: new T.Ra(new Float32Array(MAX * 4), 4), iDir: new T.Ra(new Float32Array(MAX * 3), 3),
      iCurl: new T.Ra(new Float32Array(MAX * 4), 4), iCol: new T.Ra(new Float32Array(MAX * 3), 3),
    };
    for (const [k, a] of Object.entries(attrs)) { a.setUsage && a.setUsage(35048); geo.setAttribute(k, a); }
    geo.instanceCount = 0;
    mesh = new T.Ze(geo, new T.fr({ vertexShader: VERT, fragmentShader: FRAG, side: T.$t, uniforms: EXC ? { uClipQ: CLIPQ } : {} }));
    mesh.frustumCulled = false;
    mesh.renderOrder = 2;
    c.scene.add(mesh);
  };

  // heightfield of the gown's top surface (world space), rebuilt when the gown is attached / changed
  let robeRef = null;
  HSC.clippingsCape = function (robe) { if (robe) { robeRef = robe; field = null; } };
  // Playables / YouTube: the original gown surface (from vertices, gaps filled), unchanged
  function buildFieldWeb(robe) {
    try {
      robe.updateWorldMatrix(true, true);
      const pts = [];
      robe.traverse((o) => {
        if (!o.isMesh) return;
        const p = o.geometry.attributes.position, m = o.matrixWorld.elements;
        for (let i = 0; i < p.count; i++) {
          const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
          pts.push(m[0] * x + m[4] * y + m[8] * z + m[12], m[1] * x + m[5] * y + m[9] * z + m[13], m[2] * x + m[6] * y + m[10] * z + m[14]);
        }
      });
      let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
      for (let i = 0; i < pts.length; i += 3) { x0 = Math.min(x0, pts[i]); x1 = Math.max(x1, pts[i]); z0 = Math.min(z0, pts[i + 2]); z1 = Math.max(z1, pts[i + 2]); }
      const N = MOBILE ? 48 : 96, h = new Float32Array(N * N).fill(-1e9);
      const cell = (x, z) => [Math.min(N - 1, Math.max(0, Math.floor(((x - x0) / (x1 - x0)) * N))), Math.min(N - 1, Math.max(0, Math.floor(((z - z0) / (z1 - z0)) * N)))];
      for (let i = 0; i < pts.length; i += 3) { const [cx, cz] = cell(pts[i], pts[i + 2]); h[cz * N + cx] = Math.max(h[cz * N + cx], pts[i + 1]); }
      // fill gaps (and the neck opening) from neighbours
      for (let pass = 0; pass < (MOBILE ? 6 : 12); pass++) {
        const src = h.slice();
        for (let z = 0; z < N; z++) for (let x = 0; x < N; x++) {
          if (src[z * N + x] > -1e8) continue;
          let s = 0, n = 0;
          for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
            const v = src[Math.min(N - 1, Math.max(0, z + dz)) * N + Math.min(N - 1, Math.max(0, x + dx))];
            if (v > -1e8) { s += v; n++; }
          }
          if (n) h[z * N + x] = s / n;
        }
      }
      field = { N, h, x0, x1, z0, z1 };
    } catch (e) { console.error('customers: clippings field failed', e); }
  }
  // Android: the gown's top surface, rasterised from its triangles: each cell takes the highest gown surface over its centre.
  // Real holes stay holes (the neck opening, past the hem), so cut hair falls into the collar or off the gown instead
  // of resting on an invisible lid; only one-cell cracks between triangles are filled.
  function buildField(robe) {
    if (!EXC) return buildFieldWeb(robe);
    // The exact triangle rasterizer is a desktop-quality luxury. On low-memory phones its first-cut setup can monopolize
    // the main thread while filling a 192x192 cloth map. The established 96x96 vertex field gives the same visible
    // falling/landing behaviour without creating a first-interaction stall.
    if (MOBILE) return buildFieldWeb(robe);
    try {
      robe.updateWorldMatrix(true, true);
      const tris = [];
      let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
      robe.traverse((o) => {
        if (!o.isMesh) return;
        const p = o.geometry.attributes.position, ix = o.geometry.index, m = o.matrixWorld.elements;
        const W = (i) => { const x = p.getX(i), y = p.getY(i), z = p.getZ(i); return [m[0] * x + m[4] * y + m[8] * z + m[12], m[1] * x + m[5] * y + m[9] * z + m[13], m[2] * x + m[6] * y + m[10] * z + m[14]]; };
        const n = ix ? ix.count : p.count;
        for (let t = 0; t + 2 < n; t += 3) {
          const tr = [W(ix ? ix.getX(t) : t), W(ix ? ix.getX(t + 1) : t + 1), W(ix ? ix.getX(t + 2) : t + 2)];
          for (const v of tr) { x0 = Math.min(x0, v[0]); x1 = Math.max(x1, v[0]); z0 = Math.min(z0, v[2]); z1 = Math.max(z1, v[2]); }
          tris.push(tr);
        }
      });
      if (!tris.length) return;
      const N = 192, h = new Float32Array(N * N).fill(-1e9), sx = (x1 - x0) / N, sz = (z1 - z0) / N;
      const put = (cx, cz, y) => { if (cx >= 0 && cz >= 0 && cx < N && cz < N && y > h[cz * N + cx]) h[cz * N + cx] = y; };
      for (const [a, b, c] of tris) {
        const d = (b[2] - c[2]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[2] - c[2]);
        // triangles smaller than a cell still mark the cells their corners fall in; steep walls (the collar band's
        // sides) do not, so their top edge does not become a ledge a cell wide
        const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], w = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
        const ny = u[2] * w[0] - u[0] * w[2], nn = Math.hypot(u[1] * w[2] - u[2] * w[1], ny, u[0] * w[1] - u[1] * w[0]) || 1;
        if (Math.abs(ny) / nn > 0.3) for (const v of [a, b, c]) put(Math.floor((v[0] - x0) / sx), Math.floor((v[2] - z0) / sz), v[1]);
        if (Math.abs(d) < 1e-12) continue;
        const ax = Math.floor((Math.min(a[0], b[0], c[0]) - x0) / sx), bx = Math.floor((Math.max(a[0], b[0], c[0]) - x0) / sx);
        const az = Math.floor((Math.min(a[2], b[2], c[2]) - z0) / sz), bz = Math.floor((Math.max(a[2], b[2], c[2]) - z0) / sz);
        for (let cz = az; cz <= bz; cz++) for (let cx = ax; cx <= bx; cx++) {
          const x = x0 + (cx + 0.5) * sx, z = z0 + (cz + 0.5) * sz;
          const l1 = ((b[2] - c[2]) * (x - c[0]) + (c[0] - b[0]) * (z - c[2])) / d, l2 = ((c[2] - a[2]) * (x - c[0]) + (a[0] - c[0]) * (z - c[2])) / d, l3 = 1 - l1 - l2;
          if (l1 >= -1e-6 && l2 >= -1e-6 && l3 >= -1e-6) put(cx, cz, l1 * a[1] + l2 * b[1] + l3 * c[1]);
        }
      }
      // one-cell cracks: an empty cell with gown on at least 6 of its 8 neighbours
      const src = h.slice();
      for (let z = 1; z < N - 1; z++) for (let x = 1; x < N - 1; x++) {
        if (src[z * N + x] > -1e8) continue;
        let s = 0, n = 0;
        for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) { const v = src[(z + dz) * N + x + dx]; if (v > -1e8) { s += v; n++; } }
        if (n >= 6) h[z * N + x] = s / n;
      }
      // the triangles too, bucketed over the gown, so a piece that comes to rest sits on the exact cloth surface
      const TB = 48, tb = new Map(), tx = (x1 - x0) / TB, tz = (z1 - z0) / TB;
      for (const t of tris) {
        const ax = Math.floor((Math.min(t[0][0], t[1][0], t[2][0]) - x0) / tx), bx = Math.floor((Math.max(t[0][0], t[1][0], t[2][0]) - x0) / tx);
        const az = Math.floor((Math.min(t[0][2], t[1][2], t[2][2]) - z0) / tz), bz = Math.floor((Math.max(t[0][2], t[1][2], t[2][2]) - z0) / tz);
        for (let cz = az; cz <= bz; cz++) for (let cx = ax; cx <= bx; cx++) { const k = cz * TB + cx; if (!tb.has(k)) tb.set(k, []); tb.get(k).push(t); }
      }
      field = { N, h, x0, x1, z0, z1, TB, tb, tx, tz };
    } catch (e) { console.error('customers: clippings field failed', e); }
  }
  // the highest gown surface at (x, z) not far above y, and its upward normal, or null
  function clothAt(x, y, z) {
    if (!field || !field.tb) return null;
    const L = field.tb.get(Math.floor((z - field.z0) / field.tz) * field.TB + Math.floor((x - field.x0) / field.tx));
    if (!L) return null;
    let best = null, bh = -1e9;
    for (const [a, b, c] of L) {
      const d = (b[2] - c[2]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[2] - c[2]);
      if (Math.abs(d) < 1e-12) continue;
      const l1 = ((b[2] - c[2]) * (x - c[0]) + (c[0] - b[0]) * (z - c[2])) / d, l2 = ((c[2] - a[2]) * (x - c[0]) + (a[0] - c[0]) * (z - c[2])) / d, l3 = 1 - l1 - l2;
      if (l1 < -1e-6 || l2 < -1e-6 || l3 < -1e-6) continue;
      const hy = l1 * a[1] + l2 * b[1] + l3 * c[1];
      if (hy > bh && hy < y + 0.05) { bh = hy; best = [a, b, c]; }
    }
    if (!best) return null;
    const [a, b, c] = best, u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    let n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    if (n[1] < 0) n = n.map((q) => -q);
    const nl = Math.hypot(...n) || 1;
    return { y: bh, n: n.map((q) => q / nl) };
  }
  function heightAt(x, z) {
    if (!field) return -1e9;
    const { N, h, x0, x1, z0, z1 } = field;
    const fx = ((x - x0) / (x1 - x0)) * N - 0.5, fz = ((z - z0) / (z1 - z0)) * N - 0.5;
    if (fx < 0 || fz < 0 || fx > N - 1 || fz > N - 1) return -1e9;
    const ix = Math.floor(fx), iz = Math.floor(fz), tx = fx - ix, tz = fz - iz;
    const a = h[iz * N + ix], b = h[iz * N + Math.min(N - 1, ix + 1)], c = h[Math.min(N - 1, iz + 1) * N + ix], d = h[Math.min(N - 1, iz + 1) * N + Math.min(N - 1, ix + 1)];
    if (a < -1e8 || b < -1e8 || c < -1e8 || d < -1e8) return -1e9;
    return a + (b - a) * tx + (c - a) * tz + (a - b - c + d) * tx * tz;
  }

  function hairColour(kind) {
    const tint = ctx && ctx.uHairTint ? ctx.uHairTint.value : { x: 1, y: 1, z: 1 };
    const U = HSC.U;
    const greyF = kind === 'beard' ? U.uBeardGrey.value[0] : U.uGreyA.value[0];
    if (Rng.next() < greyF) { const g = 0.36 + 0.26 * Rng.next(); return [g, g * 0.98, g * 0.93]; }
    const bt = kind === 'beard' ? U.uBeardTint.value : [1, 1, 1];
    const k = 0.055 + 0.04 * Rng.next();
    return [k * tint.x * bt[0], k * 0.68 * tint.y * bt[1], k * 0.38 * tint.z * bt[2]];
  }

  // called by the renderer for each successful cut, with the blade hit and HSC.lastCut set by the controller
  HSC.emitClippings = function (hit, intensity) {
    if (!mesh || !hit || !hit.point) return false;
    if (!field && robeRef) buildField(robeRef);
    const cut = HSC.lastCut || { cells: 6, removed: 30, kind: 'scalp' };
    HSC.lastCut = null;
    const mmEach = Math.max(0.5, cut.removed / Math.max(1, cut.cells));
    const rate = (HSC.detail && HSC.detail.clipRate) || 1;
    const n = Math.min(Math.ceil(36 * rate), Math.ceil((cut.cells * 0.45 + cut.removed / 60) * rate));
    const across = hit.bladeAcross || [1, 0, 0], nrm = hit.normal;
    const curl = HSC.U.uStyleC.value, bcurl = HSC.U.uBStyleB.value;
    const isBeard = cut.kind === 'beard';
    const now = performance.now();
    const proto = EXC ? HSC.clipProto || 0 : 0;
    CLIPQ.value = proto ? 1 : 0;
    if (proto) return emitTufts(hit, cut, mmEach, rate, isBeard ? bcurl : curl, cut.kind, now);
    for (let k = 0; k < n; k++) {
      const i = alloc();
      const s = (Rng.next() - 0.5) * 0.23;
      const o = i * 3;
      K.pos[o] = hit.point.x + across[0] * s + nrm.x * 0.008;
      K.pos[o + 1] = hit.point.y + across[1] * s + nrm.y * 0.008;
      K.pos[o + 2] = hit.point.z + across[2] * s + nrm.z * 0.008;
      // flicked off the blade: outward from the head, plus a little scatter
      const out = 0.4 + 0.9 * Rng.next();
      K.vel[o] = nrm.x * out + (Rng.next() - 0.5) * 0.9;
      K.vel[o + 1] = nrm.y * out + (Rng.next() - 0.2) * 0.8;
      K.vel[o + 2] = nrm.z * out + (Rng.next() - 0.5) * 0.9;
      const d = [Rng.next() - 0.5, Rng.next() - 0.5, Rng.next() - 0.5], dl = Math.hypot(...d) || 1;
      const ax = [Rng.next() - 0.5, Rng.next() - 0.5, Rng.next() - 0.5], al = Math.hypot(...ax) || 1;
      K.dir.set(d.map((v) => v / dl), o);
      K.axis.set(ax.map((v) => v / al), o);
      K.spin[i] = (4 + 10 * Rng.next()) * (Rng.next() < 0.5 ? -1 : 1);
      // a piece is the removed length (varying), 1 mm ~ 0.01 world units
      const L = Math.max(0.004, mmEach * (0.5 + 0.7 * Rng.next()) * 0.01024);
      K.len[i] = L;
      // short fluff hangs in the air longer than long pieces
      K.drag[i] = 9 + 22 * (1 - Math.min(1, L / 0.12));
      K.phase[i] = Rng.next() * 6.28;
      K.state[i] = 1;
      K.swept[i] = 0; K.through[i] = 0;
      K.born[i] = now;
      K.col.set(hairColour(cut.kind), o);
      const cr = isBeard ? bcurl : curl;
      K.curl.set([cr[0] * 0.8, Math.max(0.3, cr[1] * Math.min(1, L / 0.15)), Rng.next() * 6.28, 0.0028 * (cr[3] || 1)], i * 4);
    }
    K.moving += n;
    K.dirty = true;
    return true;
  };
  // prototype: clipped hair leaves the blade as tufts of near-parallel pieces that hold together for a moment and
  // then drift apart (each piece's drag differs a little), with fine dust from short guards and a few loose pieces
  function litColour(c) {
    const lum = 0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2], lift = (HSC.U.uLift ? HSC.U.uLift.value : 0) * (1 - HSC.smooth(0.03, 0.14, lum));
    return c.map((v) => v * (1 + 2.2 * lift) * 1.15);
  }
  function emitTufts(hit, cut, mmEach, rate, cr, kind, now) {
    const across = hit.bladeAcross || [1, 0, 0], nrm = hit.normal;
    const pieces = Math.min(Math.ceil(90 * rate), Math.ceil((cut.cells * 1.1 + cut.removed / 25) * rate));
    let made = 0;
    while (made < pieces) {
      const short = mmEach < 2.5, size = short ? 1 : 3 + Math.floor(Rng.next() * 10);
      const s = (Rng.next() - 0.5) * 0.23, out = 0.35 + 0.8 * Rng.next();
      const c0 = [hit.point.x + across[0] * s + nrm.x * 0.008, hit.point.y + across[1] * s + nrm.y * 0.008, hit.point.z + across[2] * s + nrm.z * 0.008];
      const v0 = [nrm.x * out + (Rng.next() - 0.5) * 0.8, nrm.y * out + (Rng.next() - 0.2) * 0.7, nrm.z * out + (Rng.next() - 0.5) * 0.8];
      const d = [Rng.next() - 0.5, Rng.next() - 0.5, Rng.next() - 0.5], dl = Math.hypot(...d) || 1;
      const ax = [Rng.next() - 0.5, Rng.next() - 0.5, Rng.next() - 0.5], al = Math.hypot(...ax) || 1;
      const spin = (3 + 8 * Rng.next()) * (Rng.next() < 0.5 ? -1 : 1), L0 = Math.max(0.003, mmEach * (0.6 + 0.6 * Rng.next()) * 0.01024);
      // the same brightening the scalp strands get under the ring light, so cut hair matches the head
      const col = litColour(hairColour(kind));
      for (let m = 0; m < size && made < pieces; m++, made++) {
        const i = alloc(), o = i * 3, j = () => (Rng.next() - 0.5);
        // dust: very short bits, lighter and slower; tuft members sit side by side, almost parallel
        const L = short ? Math.max(0.002, L0 * (0.4 + 0.8 * Rng.next())) : L0 * (0.85 + 0.3 * Rng.next());
        K.pos[o] = c0[0] + j() * 0.012; K.pos[o + 1] = c0[1] + j() * 0.012; K.pos[o + 2] = c0[2] + j() * 0.012;
        K.vel[o] = v0[0] + j() * 0.12; K.vel[o + 1] = v0[1] + j() * 0.12; K.vel[o + 2] = v0[2] + j() * 0.12;
        const dd = [d[0] / dl + j() * 0.18, d[1] / dl + j() * 0.18, d[2] / dl + j() * 0.18], ddl = Math.hypot(...dd) || 1;
        K.dir.set(dd.map((v) => v / ddl), o);
        K.axis.set(ax.map((v) => v / al), o);
        K.spin[i] = spin * (0.85 + 0.3 * Rng.next());
        K.len[i] = L;
        K.drag[i] = (short ? 26 + 22 * Rng.next() : 8 + 16 * (1 - Math.min(1, L / 0.12))) * (0.85 + 0.3 * Rng.next());
        K.phase[i] = Rng.next() * 6.28;
        K.state[i] = 1;
        K.swept[i] = 0; K.through[i] = 0;
        K.born[i] = now;
        const shade = 0.9 + 0.2 * Rng.next();
        K.col.set(col.map((v) => v * shade), o);
        K.curl.set([cr[0] * 0.8, Math.max(0.3, cr[1] * Math.min(1, L / 0.15)), Rng.next() * 6.28, (short ? 0.0011 : 0.0014) * (cr[3] || 1)], i * 4);
      }
    }
    K.moving += made;
    K.dirty = true;
    return true;
  }
  // prototype "landing": pieces that touch bare skin below the hairline (neck, nape, ears, jaw) catch there about
  // 3 in 5 times, as clipped hair clings to a real customer, until the barber brushes off at the reveal. Contact is
  // tested against the customer's own (morphed) head mesh through a small grid of its skin vertices.
  let skin = null;
  function skinGrid() {
    if (skin) return skin;
    const Pt = ctx && ctx.Pt, st = HSC.debugState;
    if (!Pt || !st || !st.scalp) return null;
    const P = Pt.attributes.position.array, N = Pt.attributes.normal.array, cells = new Map(), C = 0.2;
    for (let v = 0; v < P.length / 3; v++) {
      const x = P[v * 3], y = P[v * 3 + 1], z = P[v * 3 + 2];
      if (st.scalp[v] > 0.05 || y < -1.6 || y > 1.4 || (z > 0.9 && Math.abs(x) < 1.2)) continue;
      const k = Math.floor(x / C) + ',' + Math.floor(y / C) + ',' + Math.floor(z / C);
      if (!cells.has(k)) cells.set(k, []);
      cells.get(k).push(v);
    }
    return (skin = { P, N, cells, C });
  }
  function neckCatch(i, o) {
    const vt = ctx && ctx.vt, g = skinGrid();
    if (!vt || !g) return false;
    const sc = vt.scale.x || 1, hx = (K.pos[o] - vt.position.x) / sc, hy = (K.pos[o + 1] - vt.position.y) / sc, hz = (K.pos[o + 2] - vt.position.z) / sc;
    if (hy < -1.7 || hy > 1.5 || Math.abs(hx) > 2.2 || hz < -2.2 || hz > 2.0) return false;
    const { P, N, cells, C } = g, cx = Math.floor(hx / C), cy = Math.floor(hy / C), cz = Math.floor(hz / C);
    let best = -1, bd = 0.045 * 0.045;
    for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (let c = -1; c <= 1; c++) {
      const L = cells.get((cx + a) + ',' + (cy + b) + ',' + (cz + c));
      if (L) for (const v of L) { const dx = P[v * 3] - hx, dy = P[v * 3 + 1] - hy, dz = P[v * 3 + 2] - hz, d = dx * dx + dy * dy + dz * dz; if (d < bd) { bd = d; best = v; } }
    }
    if (best < 0) return false;
    const nx = N[best * 3], ny = N[best * 3 + 1], nz = N[best * 3 + 2];
    const sticks = ((Math.imul(i + 1, 0x9e3779b1) >>> 0) % 10) < 6;
    if (sticks) {
      // lies on the skin along its surface
      K.pos[o] = vt.position.x + (P[best * 3] + nx * 0.012) * sc;
      K.pos[o + 1] = vt.position.y + (P[best * 3 + 1] + ny * 0.012) * sc;
      K.pos[o + 2] = vt.position.z + (P[best * 3 + 2] + nz * 0.012) * sc;
      const d = [K.dir[o], K.dir[o + 1], K.dir[o + 2]], dn = d[0] * nx + d[1] * ny + d[2] * nz;
      d[0] -= dn * nx; d[1] -= dn * ny; d[2] -= dn * nz;
      const l = Math.hypot(...d) || 1;
      K.dir[o] = d[0] / l; K.dir[o + 1] = d[1] / l; K.dir[o + 2] = d[2] / l;
      K.vel[o] = K.vel[o + 1] = K.vel[o + 2] = 0;
      K.state[i] = 3;
      return true;
    }
    // glances off the skin and keeps falling
    const vn = K.vel[o] * nx + K.vel[o + 1] * ny + K.vel[o + 2] * nz;
    if (vn < 0) { K.vel[o] -= 1.6 * vn * nx; K.vel[o + 1] -= 1.6 * vn * ny; K.vel[o + 2] -= 1.6 * vn * nz; }
    return false;
  }
  // Android: the falling-hair prototype sets the cap (12,000 for tufts and dust); other builds keep the detail profile's
  const cap = () => Math.min(MAX, EXC && HSC.CLIP_PROTOS ? HSC.CLIP_PROTOS[HSC.clipProto || 0].cap : (HSC.detail && HSC.detail.clipMax) || MAX);
  function alloc() {
    if (K.count < cap()) return K.count++;
    // reuse the oldest piece
    const i = K.next % cap();
    K.next = (i + 1) % cap();
    return i;
  }
  HSC.clipCap = function () {
    if (K.count > cap()) { K.count = cap(); K.next = 0; K.dirty = true; }
  };

  HSC.clearClippings = function () { skin = null; K.count = 0; K.next = 0; K.moving = 0; K.dirty = false; if (geo) geo.instanceCount = 0; };
  HSC.clippingsActive = () => K.moving > 0;
  // QA: the pieces and the gown they rest on (read only)
  HSC.clippingsDebug = () => ({ K, robe: robeRef, field });
  // counts by state (for tests): free, falling, sliding, resting
  HSC.clippingsStats = () => { const c = [0, 0, 0, 0]; let gone = 0, swept = 0; for (let i = 0; i < K.count; i++) { if (K.len[i] <= 0) gone++; else { c[K.state[i]]++; if (K.swept[i]) swept++; } } return { count: K.count, onShow: K.count - gone, falling: c[1], sliding: c[2], resting: c[3], swept, gone }; };

  // the barber brushes the gown off at the reveal: resting pieces are flicked outward in a sweep
  // across the gown, most of them falling off the shoulders and the lap
  HSC.brushClippings = function () {
    if (!mesh || !K.count) return;
    const rest = [];
    let cx = 0, cz = 0;
    for (let i = 0; i < K.count; i++) if (K.len[i] > 0 && !K.swept[i]) { rest.push(i); cx += K.pos[i * 3]; cz += K.pos[i * 3 + 2]; }
    if (!rest.length) return;
    cx /= rest.length; cz /= rest.length;
    rest.sort((a, b) => K.pos[a * 3] - K.pos[b * 3]);
    const waves = 6;
    for (let w = 0; w < waves; w++) {
      HSC.lifecycle.timeout(() => {
        const now = performance.now();
        const from = Math.floor((rest.length * w) / waves), to = Math.floor((rest.length * (w + 1)) / waves);
        for (let k = from; k < to; k++) {
          const i = rest[k], o = i * 3;
          if (K.len[i] <= 0 || K.swept[i]) continue;
          const wasMoving = K.state[i] !== 3;
          let dx = K.pos[o] - cx, dz = K.pos[o + 2] - cz;
          const l = Math.hypot(dx, dz) || 1;
          dx /= l; dz /= l;
          const sp = 3 + 2.5 * Rng.next();
          K.vel[o] = dx * sp + (Rng.next() - 0.5) * 0.6;
          K.vel[o + 1] = 1.2 + 1.4 * Rng.next();
          K.vel[o + 2] = dz * sp + 1.6 + (Rng.next() - 0.5) * 0.8;
          K.pos[o + 1] += 0.02;
          K.drag[i] = 1 + 1.2 * Rng.next(); // flicked pieces fly further than drifting fluff
          K.state[i] = 1;
          K.swept[i] = 1;
          K.born[i] = now;
          if (!wasMoving) K.moving++;
        }
        K.dirty = true;
      }, 500 + w * 170);
    }
  };

  // flick off only the loose pieces under the brush, in a band
  // across the gown at `frac` (0 = the customer's left edge of the pieces, 1 = the right), half-width `half`.
  // Returns how many pieces it removed (each piece counts once).
  HSC.dustClippings = function (frac, half) {
    if (!mesh || !K.count) return 0;
    let lo = Infinity, hi = -Infinity;
    for (let i = 0; i < K.count; i++) if (K.len[i] > 0 && !K.swept[i]) { const x = K.pos[i * 3]; if (x < lo) lo = x; if (x > hi) hi = x; }
    if (!(hi >= lo)) return 0;
    const span = Math.max(0.4, hi - lo), x0 = lo + (frac - half) * span, x1 = lo + (frac + half) * span, now = performance.now();
    let n = 0;
    for (let i = 0; i < K.count; i++) {
      const o = i * 3;
      if (K.len[i] <= 0 || K.swept[i] || K.pos[o] < x0 || K.pos[o] > x1) continue;
      const wasMoving = K.state[i] !== 3;
      K.vel[o] = (Rng.next() - 0.5) * 1.2; K.vel[o + 1] = 0.8 + Rng.next(); K.vel[o + 2] = 2.2 + 1.6 * Rng.next();
      K.pos[o + 1] += 0.02; K.drag[i] = 1 + Rng.next(); K.state[i] = 1; K.swept[i] = 1; K.born[i] = now;
      if (!wasMoving) K.moving++;
      n++;
    }
    if (n) K.dirty = true;
    return n;
  };

  HSC.stepClippings = function () {
    if (!mesh) return;
    const now = performance.now();
    if (!K.moving && !K.dirty) { K.last = now; return; }
    K.dirty = false;
    const dt = Math.min(0.033, K.last ? (now - K.last) / 1000 : 0.016);
    K.last = now;
    let moving = 0;
    const t = now / 1000;
    for (let i = 0; i < K.count; i++) {
      const st = K.state[i];
      if (st === 0 || st === 3) continue;
      const o = i * 3;
      let x = K.pos[o], y = K.pos[o + 1], z = K.pos[o + 2], vx = K.vel[o], vy = K.vel[o + 1], vz = K.vel[o + 2];
      if (st === 1) {
        // gravity, air drag and a little flutter
        const k = K.drag[i], ph = K.phase[i];
        vx += (Math.sin(t * 7 + ph) * 5) * dt;
        vz += (Math.cos(t * 6 + ph * 1.3) * 5) * dt;
        vy -= G * dt;
        const damp = Math.exp(-k * dt);
        vx *= damp; vy *= damp; vz *= damp;
        // tumble
        const a = [K.axis[o], K.axis[o + 1], K.axis[o + 2]], d = [K.dir[o], K.dir[o + 1], K.dir[o + 2]], ang = K.spin[i] * dt;
        const c = Math.cos(ang), s = Math.sin(ang), dot = a[0] * d[0] + a[1] * d[1] + a[2] * d[2];
        const cr = [a[1] * d[2] - a[2] * d[1], a[2] * d[0] - a[0] * d[2], a[0] * d[1] - a[1] * d[0]];
        for (let q = 0; q < 3; q++) K.dir[o + q] = d[q] * c + cr[q] * s + a[q] * dot * (1 - c);
      }
      if (!EXC) {
        // Playables / YouTube: the original landing, unchanged
        if (st !== 1) {
          // sliding down a steep fold of the gown
          vx *= Math.exp(-6 * dt); vz *= Math.exp(-6 * dt);
        }
        x += vx * dt; y += vy * dt; z += vz * dt;
        if (EXC && HSC.clipProto === 2 && st === 1 && !K.swept[i]) {
          K.pos[o] = x; K.pos[o + 1] = y; K.pos[o + 2] = z; K.vel[o] = vx; K.vel[o + 1] = vy; K.vel[o + 2] = vz;
          const caught = neckCatch(i, o);
          x = K.pos[o]; y = K.pos[o + 1]; z = K.pos[o + 2]; vx = K.vel[o]; vy = K.vel[o + 1]; vz = K.vel[o + 2];
          if (caught) continue;
        }
        const ground = K.swept[i] ? -1e9 : heightAt(x, z);
        if (y < ground + 0.004) {
          const e = 0.05;
          const gx = (heightAt(x + e, z) - heightAt(x - e, z)) / (2 * e), gz = (heightAt(x, z + e) - heightAt(x, z - e)) / (2 * e);
          const slope = Math.hypot(gx, gz);
          y = ground + 0.004;
          if (slope > 1.1 && Number.isFinite(slope) && slope < 50) {
            K.state[i] = 2;
            const sp = 0.9;
            vx = (-gx / slope) * sp; vz = (-gz / slope) * sp; vy = 0;
          } else {
            K.state[i] = 3;
            vx = vy = vz = 0;
            // lie flat on the cloth
            K.dir[o + 1] *= 0.15;
            const l = Math.hypot(K.dir[o], K.dir[o + 1], K.dir[o + 2]) || 1;
            K.dir[o] /= l; K.dir[o + 1] /= l; K.dir[o + 2] /= l;
          }
        }
        if (y < -4 || (!K.swept[i] && now - K.born[i] > 20000)) { K.state[i] = 3; vx = vy = vz = 0; if (y < -4) K.len[i] = 0; }
      } else {
      if (st !== 1) {
          // sliding down a steep fold of the gown: pulled downhill, slowed by the cloth
          const e = 0.03, gx = (heightAt(x + e, z) - heightAt(x - e, z)) / (2 * e), gz = (heightAt(x, z + e) - heightAt(x, z - e)) / (2 * e);
          if (Number.isFinite(gx) && Number.isFinite(gz) && Math.abs(gx) < 50 && Math.abs(gz) < 50) {
            const sl = Math.hypot(gx, gz) || 1, acc = G * 0.35 * Math.min(1, sl) / Math.sqrt(1 + sl * sl);
            vx += (-gx / sl) * acc * dt; vz += (-gz / sl) * acc * dt;
          }
          vx *= Math.exp(-4 * dt); vz *= Math.exp(-4 * dt); vy = 0;
        }
      x += vx * dt; y += vy * dt; z += vz * dt;
      if (EXC && HSC.clipProto === 2 && st === 1 && !K.swept[i]) {
        K.pos[o] = x; K.pos[o + 1] = y; K.pos[o + 2] = z; K.vel[o] = vx; K.vel[o + 1] = vy; K.vel[o + 2] = vz;
        const caught = neckCatch(i, o);
        x = K.pos[o]; y = K.pos[o + 1]; z = K.pos[o + 2]; vx = K.vel[o]; vy = K.vel[o + 1]; vz = K.vel[o + 2];
        if (caught) continue;
      }
      const ground = K.swept[i] || K.through[i] === 1 ? -1e9 : heightAt(x, z);
      // over the neck opening a falling piece meets the neck and slides down it onto the collar: it is given the
      // nearest cloth outward from the neck once, and settles there when it falls to that height
      if (st === 1 && !K.swept[i] && ground < -1e8 && (K.through[i] === 0 || K.through[i] === 2) && ctx && ctx.vt && field && field.tb) {
        const vt = ctx.vt, sc = vt.scale.x || 1;
        const hy = (y - vt.position.y) / sc;
        // looked for once the piece has fallen to about chin height (the collar is below the jaw)
        if (!K.through[i] && hy < -0.3) {
          K.through[i] = 3;
          const ax = vt.position.x, az = vt.position.z - 0.15 * sc;
          let rx = x - ax, rz = z - az;
          const rl = Math.hypot(rx, rz);
          if (rl > 1e-4 && rl < 1.6 * sc && hy > -2.6) {
            rx /= rl; rz /= rl;
            for (let step = 0.006; step < 0.35; step += 0.006) {
              const c2 = clothAt(x + rx * step, y + 0.4, z + rz * step);
              if (c2 && c2.y < y + 0.05) { K.through[i] = 2; K.land.set([x + rx * (step + 0.004), c2.y, z + rz * (step + 0.004)], o); break; }
            }
          }
        }
        if (K.through[i] === 2 && y <= K.land[o + 1] + 0.003) {
          x = K.land[o]; z = K.land[o + 2];
          const cl = clothAt(x, K.land[o + 1] + 0.02, z);
          y = (cl ? cl.y : K.land[o + 1]) + 0.003;
          vx = vy = vz = 0;
          K.state[i] = 3;
          K.through[i] = 0;
          const n = cl ? cl.n : [0, 1, 0], d = [K.dir[o], K.dir[o + 1], K.dir[o + 2]], dn = d[0] * n[0] + d[1] * n[1] + d[2] * n[2];
          d[0] -= dn * n[0]; d[1] -= dn * n[1]; d[2] -= dn * n[2];
          const l = Math.hypot(d[0], d[1], d[2]) || 1;
          K.dir[o] = d[0] / l; K.dir[o + 1] = d[1] / l; K.dir[o + 2] = d[2] / l;
          K.pos[o] = x; K.pos[o + 1] = y; K.pos[o + 2] = z; K.vel[o] = K.vel[o + 1] = K.vel[o + 2] = 0;
          continue;
        }
      }
      if (st === 2 && !(y < ground + 0.03)) {
        // slid off the edge of a fold (or into the neck opening): it falls again
        K.state[i] = 1;
        K.drag[i] = Math.max(K.drag[i], 6);
      } else if (y < ground + 0.004 || st === 2) {
        const e = 0.03;
        const gx = (heightAt(x + e, z) - heightAt(x - e, z)) / (2 * e), gz = (heightAt(x, z + e) - heightAt(x, z - e)) / (2 * e);
        const slope = Math.hypot(gx, gz), ok = Number.isFinite(slope) && slope < 50;
        y = ground + 0.004;
        const speed = Math.hypot(vx, vz);
        if (ok && slope > 1.1 && !(st === 2 && speed < 0.05)) {
          if (st !== 2) { K.state[i] = 2; vx = (-gx / slope) * 0.6; vz = (-gz / slope) * 0.6; }
          vy = 0;
        } else {
          K.state[i] = 3;
          vx = vy = vz = 0;
          // lie on the exact cloth under it, along the surface (no part of its direction across the surface)
          const cl = clothAt(x, y, z);
          let n = ok ? [-gx, 1, -gz] : [0, 1, 0];
          if (cl) { y = cl.y + 0.003; n = cl.n; }
          else if (field && field.tb) {
            // no cloth anywhere under it (the neck opening, just past a collar edge): it falls on through, out of
            // sight, never resting in the air
            K.state[i] = 1;
            K.through[i] = 1;
            vx = (Rng.next() - 0.5) * 0.2; vz = (Rng.next() - 0.5) * 0.2; vy = -0.2;
            K.pos[o] = x; K.pos[o + 1] = y; K.pos[o + 2] = z; K.vel[o] = vx; K.vel[o + 1] = vy; K.vel[o + 2] = vz;
            moving++;
            continue;
          }
          const nl2 = n[0] * n[0] + n[1] * n[1] + n[2] * n[2];
          const d = [K.dir[o], K.dir[o + 1], K.dir[o + 2]], dn = (d[0] * n[0] + d[1] * n[1] + d[2] * n[2]) / nl2;
          d[0] -= dn * n[0]; d[1] -= dn * n[1]; d[2] -= dn * n[2];
          const l = Math.hypot(d[0], d[1], d[2]) || 1;
          K.dir[o] = d[0] / l; K.dir[o + 1] = d[1] / l; K.dir[o + 2] = d[2] / l;
        }
      }
      if (y < -4) { K.state[i] = 3; vx = vy = vz = 0; K.len[i] = 0; }
      // a piece still moving long after it was cut has fallen away out of sight: stop it (never mid-air on show)
      else if (!K.swept[i] && now - K.born[i] > 20000 && K.state[i] !== 3) { K.state[i] = 3; vx = vy = vz = 0; K.len[i] = 0; }
      }
      K.pos[o] = x; K.pos[o + 1] = y; K.pos[o + 2] = z;
      K.vel[o] = vx; K.vel[o + 1] = vy; K.vel[o + 2] = vz;
      if (K.state[i] !== 3) moving++;
    }
    K.moving = moving;
    // upload
    const P = attrs.iPos.array, D = attrs.iDir.array, Cu = attrs.iCurl.array, Co = attrs.iCol.array;
    for (let i = 0; i < K.count; i++) {
      P[i * 4] = K.pos[i * 3]; P[i * 4 + 1] = K.pos[i * 3 + 1]; P[i * 4 + 2] = K.pos[i * 3 + 2]; P[i * 4 + 3] = K.len[i];
      D[i * 3] = K.dir[i * 3]; D[i * 3 + 1] = K.dir[i * 3 + 1]; D[i * 3 + 2] = K.dir[i * 3 + 2];
      for (let q = 0; q < 4; q++) Cu[i * 4 + q] = K.curl[i * 4 + q];
      Co[i * 3] = K.col[i * 3]; Co[i * 3 + 1] = K.col[i * 3 + 1]; Co[i * 3 + 2] = K.col[i * 3 + 2];
    }
    for (const a of Object.values(attrs)) a.needsUpdate = true;
    geo.instanceCount = K.count;
  };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1; plan Wave 4, docs/TOOL-ASMR-AUDIO-CONTRACT.md): the one audio engine
// for everything outside the frozen engine's clipper motor. One AudioContext, one master gain into a limiter, one
// cached noise buffer per recipe (nothing allocated per pointer sample), and variation seeded from
// toolId + eventSequence + layer, so a recording is reproducible and audio can never touch the simulation.
//
// Layers (contract section 5): mechanism and contact may sound without a state change; `result` is reachable only
// through effect(), which refuses a record with no committed delta.
//
// 100% original procedural Web Audio: no files, no third-party recordings (source type: original-procedural).
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  const view = () => { try { return globalThis.skinFadeStudio.getView(); } catch (e) { return null; } };
  const A = { ctx: null, master: null, limiter: null, buses: {}, bufs: new Map(), curves: new Map(), live: new Set(), acc: {} };
  const stats = { contexts: 0, buffers: 0, voices: 0, peakVoices: 0, mechanism: 0, contact: 0, result: 0, dropped: 0, refused: 0, byTool: {} };
  const MAX_VOICES = 24;

  // the context, created once on the first audible use; null while muted or paused (ui sounds ignore the pause)
  function prepareAudio() {
    if (!A.ctx) {
      const C = globalThis.AudioContext || globalThis.webkitAudioContext;
      if (!C) return null;
      A.ctx = new C(); stats.contexts++;
      A.master = A.ctx.createGain();
      // a limiter, so overlapping layers never clip
      const L = A.limiter = A.ctx.createDynamicsCompressor();
      L.threshold.value = -6; L.knee.value = 0; L.ratio.value = 20; L.attack.value = 0.002; L.release.value = 0.09;
      A.master.connect(L); L.connect(A.ctx.destination);
    }
    return A.ctx;
  }
  function ctx(o) {
    const v = view();
    if (!v || !v.audio || (v.paused && !(o && o.ui)) || !prepareAudio()) return null;
    if (A.ctx.state === 'suspended') A.ctx.resume().catch(() => {});
    A.master.gain.value = typeof v.volume === 'number' ? v.volume : 1;
    return A.ctx;
  }
  // a named sub-mix (tools, ui, reveal) with its own level into the master
  function bus(name, level) {
    const c = ctx({ ui: true });
    if (!c) return null;
    let b = A.buses[name];
    if (!b) { b = A.buses[name] = c.createGain(); b.connect(A.master); }
    b.gain.value = level;
    return b;
  }

  // ---- seeded variation ----
  const hash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); return (h ^ (h >>> 13)) >>> 0; };
  const unit = (tool, seq, layer) => hash(tool + ':' + seq + ':' + layer) / 4294967296;
  const between = (lo, hi, tool, seq, layer) => lo + (hi - lo) * unit(tool, seq, layer);
  const lcg = (seed) => { let a = seed >>> 0 || 1; return () => { a = (Math.imul(a, 1664525) + 1013904223) >>> 0; return a / 4294967296; }; };

  // ---- cached material ----
  // recipe: 'white' (a long plain noise) or 'grain' (the granular bite of blades through strands)
  function noiseBuffer(c, recipe) {
    const k = recipe + ':' + c.sampleRate;
    let b = A.bufs.get(k);
    if (b) return b;
    b = c.createBuffer(1, Math.round(c.sampleRate * 2), c.sampleRate);
    const d = b.getChannelData(0), R = lcg(hash(recipe));
    if (recipe === 'grain') for (let i = 0; i < d.length; i++) d[i] = (R() * 2 - 1) * (Math.floor(i / 70) % 3 === 0 ? 1.4 : 0.55 + 0.45 * R());
    else for (let i = 0; i < d.length; i++) d[i] = R() * 2 - 1;
    A.bufs.set(k, b); stats.buffers = A.bufs.size;
    return b;
  }
  // envelopes are cached curves, applied by a gain node: a new sound costs a few nodes, never a new buffer
  const SHAPES = {
    fall: (u) => 1 - u, arch: (u) => Math.sin(Math.PI * u), fall2: (u) => Math.pow(1 - u, 2), fall15: (u) => Math.pow(1 - u, 1.5),
    snap: (u) => Math.pow(1 - u, 1.6) * (u < 0.04 ? u / 0.04 : 1), tick: (u) => Math.pow(1 - u, 2.5),
  };
  function curve(shape, gain) {
    const k = shape + ':' + gain.toFixed(3);
    let a = A.curves.get(k);
    if (a) return a;
    a = new Float32Array(32);
    const f = SHAPES[shape] || SHAPES.fall;
    for (let i = 0; i < a.length; i++) a[i] = f(i / (a.length - 1)) * gain;
    if (A.curves.size > 256) A.curves.clear();
    A.curves.set(k, a);
    return a;
  }

  // ---- voices ----
  function track(src, nodes) {
    A.live.add(src); stats.voices = A.live.size; if (stats.voices > stats.peakVoices) stats.peakVoices = stats.voices;
    src.onended = () => { A.live.delete(src); stats.voices = A.live.size; for (const n of nodes) { try { n.disconnect(); } catch (e) {} } };
  }
  const room = () => { if (A.live.size < MAX_VOICES) return true; stats.dropped++; return false; };
  // one filtered noise burst. o: { len, type, f, q, gain, shape, at, sweep, recipe, seed: [tool, seq, layer], rate }
  function noise(o) {
    const c = ctx(), out = c && bus('tools', 0.7);
    if (!c || !out || !room()) return;
    const s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain(), t = c.currentTime + (o.at || 0), len = Math.max(0.004, o.len);
    const seed = o.seed || ['-', 0, 'n'];
    s.buffer = noiseBuffer(c, o.recipe || 'white');
    s.playbackRate.value = (o.rate || 1) * between(0.96, 1.04, seed[0], seed[1], seed[2]);
    fl.type = o.type || 'bandpass'; fl.frequency.setValueAtTime(o.f, t);
    if (o.sweep) fl.frequency.exponentialRampToValueAtTime(o.sweep, t + len);
    fl.Q.value = o.q || 0.7;
    g.gain.setValueCurveAtTime(curve(o.shape || 'fall', o.gain), t, len);
    s.connect(fl).connect(g).connect(out);
    track(s, [s, fl, g]);
    s.start(t, unit(seed[0], seed[1], seed[2] + 'o') * 1.6, len + 0.02);
  }
  function tone(o) {
    const c = ctx(), out = c && bus('tools', 0.7);
    if (!c || !out || !room()) return;
    const n = c.createOscillator(), g = c.createGain(), t = c.currentTime + (o.at || 0), len = o.len;
    n.type = o.type || 'sine'; n.frequency.setValueAtTime(o.f, t);
    if (o.f2) n.frequency.exponentialRampToValueAtTime(o.f2, t + len);
    g.gain.setValueAtTime(o.gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    n.connect(g).connect(out);
    track(n, [n, g]);
    n.start(t); n.stop(t + len + 0.02);
  }

  // ---- the tool sounds ----
  // mechanism and contact: what the tool itself does, whether or not it changed anything
  const MECH = {
    bottle: (q) => tone({ f: 620, len: 0.04, gain: 0.03, at: 0, f2: 480, seed: q }),
    trigger: (q) => { noise({ len: 0.012, type: 'highpass', f: 2600, gain: 0.3, seed: q }); },
    pump: (q) => { noise({ len: 0.02, type: 'bandpass', f: 900, q: 2, gain: 0.3, seed: q }); noise({ len: 0.02, type: 'bandpass', f: 1400, q: 2, gain: 0.2, at: 0.09, seed: q }); },
    towel: (q) => { noise({ len: 0.6, type: 'lowpass', f: 900, gain: 0.4, shape: 'arch', seed: q }); noise({ len: 1.6, type: 'bandpass', f: 5200, q: 0.9, gain: 0.06, shape: 'arch', at: 0.3, seed: q }); },
    cloth: (q) => noise({ len: 0.28, type: 'lowpass', f: 700, gain: 0.16, shape: 'arch', seed: q }),
    rub: (q) => noise({ len: 0.22, type: 'lowpass', f: between(600, 900, q[0], q[1], 'f'), q: 0.8, gain: 0.14, shape: 'arch', seed: q }),
    zip: (q) => noise({ len: 0.09, type: 'bandpass', f: 3800, q: 3, gain: 0.3, shape: 'arch', sweep: 6800, seed: q }),
    fire: (q) => noise({ len: 0.35, type: 'lowpass', f: 1400, gain: 0.3, shape: 'arch', seed: q }),
    whir: (q) => { tone({ f: 210, len: 0.18, gain: 0.03, type: 'sawtooth', seed: q }); noise({ len: 0.18, type: 'bandpass', f: 4200, q: 2, gain: 0.05, seed: q }); },
    puff: (q) => noise({ len: 0.3, type: 'lowpass', f: 1800, q: 0.6, gain: 0.3, shape: 'fall2', seed: q }),
    bristle: (q) => noise({ len: 0.25, type: 'bandpass', f: 3000, q: 0.8, gain: 0.07, shape: 'arch', seed: q }),
    crack: (q) => { for (const at of [0, 0.07, 0.13]) noise({ len: 0.012, type: 'highpass', f: 1800, q: 0.6, gain: 0.6, at, seed: [q[0], q[1], q[2] + at] }); },
    mineral: (q) => noise({ len: 0.16, type: 'bandpass', f: 2200, q: 1.5, gain: 0.05, shape: 'arch', seed: q }),
    snipClick: (q, on) => {
      if (!on) noise({ len: 0.04, type: 'bandpass', f: 7400, q: 1.6, gain: 0.22, shape: 'tick', seed: q });
      noise({ len: 0.007, type: 'highpass', f: 5000, gain: on ? 0.45 : 0.3, at: on ? 0.07 : 0.03, seed: q });
      const at = 0.07;
      for (const [f, g] of [[3150, 0.035], [4720, 0.022]]) tone({ f: f * between(0.98, 1.02, q[0], q[1], 'r' + f), len: 0.09, gain: g, at, seed: q });
    },
  };
  // result: only ever from a committed positive effect
  const RESULT = {
    scissors: (q, load) => noise({ len: 0.085, type: 'bandpass', f: 6200, q: 1.1, gain: 0.55 * load, shape: 'snap', recipe: 'grain', seed: q }),
    razor: (q, load) => noise({ len: 0.09, type: 'bandpass', f: between(3200, 3800, q[0], q[1], 'f'), q: 2.4, gain: 0.28 * load, shape: 'arch', recipe: 'grain', seed: q }),
    foil: (q, load) => { for (let i = 0; i < 3; i++) noise({ len: 0.012, type: 'highpass', f: 5200, q: 0.8, gain: 0.3 * load, at: between(0, 0.09, q[0], q[1], 'c' + i), seed: [q[0], q[1], q[2] + i] }); },
    spray: (q, load) => { noise({ len: 0.34, type: 'highpass', f: 4200, q: 0.7, gain: 0.2 * load, shape: 'fall15', seed: q }); },
    towel: (q, load) => noise({ len: 0.4, type: 'lowpass', f: 1100, gain: 0.22 * load, shape: 'arch', seed: q }),
    shavingSoap: (q, load) => noise({ len: 0.16, type: 'lowpass', f: 1000, q: 1, gain: 0.2 * load, shape: 'arch', seed: q }),
    shavingCream: (q, load) => noise({ len: 0.22, type: 'lowpass', f: 800, q: 1.3, gain: 0.26 * load, shape: 'arch', at: 0.05, seed: q }),
    lather: (q, load) => { noise({ len: 0.12, type: 'bandpass', f: between(1500, 2300, q[0], q[1], 'f'), q: 1.5, gain: 0.18 * load, shape: 'arch', seed: q }); for (let i = 0; i < 3; i++) tone({ f: between(700, 1600, q[0], q[1], 'b' + i), len: 0.03, gain: 0.03 * load, at: between(0, 0.1, q[0], q[1], 'a' + i), f2: 1400, seed: q }); },
    beardOil: (q, load) => { for (let i = 0; i < 2; i++) tone({ f: between(900, 1500, q[0], q[1], 'd' + i), len: 0.05, gain: 0.05 * load, at: i * 0.06, f2: 500, seed: q }); },
    beardBalm: (q, load) => noise({ len: 0.2, type: 'lowpass', f: 620, q: 1.4, gain: 0.24 * load, shape: 'arch', seed: q }),
    coldTowel: (q, load) => noise({ len: 0.3, type: 'lowpass', f: 1500, gain: 0.2 * load, shape: 'arch', seed: q }),
    alum: (q, load) => noise({ len: 0.18, type: 'bandpass', f: 2600, q: 1.2, gain: 0.12 * load, shape: 'arch', recipe: 'grain', seed: q }),
    aftershave: (q, load) => { noise({ len: 0.45, type: 'highpass', f: 2500, gain: 0.35 * load, shape: 'fall15', seed: q }); for (let i = 0; i < 6; i++) tone({ f: between(1800, 3400, q[0], q[1], 'p' + i), len: 0.05, gain: 0.04 * load, at: 0.05 + i * 0.05, seed: q }); },
    massage: (q, load) => noise({ len: 0.22, type: 'lowpass', f: 480, gain: 0.2 * load, shape: 'arch', seed: q }),
    talc: (q, load) => noise({ len: 0.2, type: 'bandpass', f: 3400, q: 0.8, gain: 0.16 * load, shape: 'arch', recipe: 'grain', seed: q }),
    pomade: (q, load) => noise({ len: 0.15, type: 'lowpass', f: 700, q: 1.2, gain: 0.2 * load, shape: 'arch', seed: q }),
    threading: (q, load) => { for (let i = 0; i < 3; i++) noise({ len: 0.01, type: 'highpass', f: 3200, gain: 0.3 * load, at: i * 0.03, seed: [q[0], q[1], q[2] + i] }); },
    singe: (q, load) => noise({ len: 0.18, type: 'highpass', f: 6000, q: 0.6, gain: 0.12 * load, seed: q }),
    nose: (q, load) => { for (let i = 0; i < 2; i++) noise({ len: 0.012, type: 'bandpass', f: 5200, q: 2, gain: 0.2 * load, at: i * 0.05, seed: [q[0], q[1], q[2] + i] }); },
  };
  // the real quantities behind each tool's load, and how much change must add up before the next accent
  const MAGNITUDE = {
    scissors: (e) => [Math.min(1, e.hairCells / 40), 0],
    razor: (e) => [Math.min(1, (e.hairCells + e.foamRemoved) / 12), 0.5],
    foil: (e) => [Math.min(1, e.hairCells / 12), 0.4],
    lather: (e) => [Math.min(1, e.foamMade / 200000), 0.5],
    talc: (e) => [Math.min(1, -(e.perFieldDeltas.debris || 0) / 8), 0.5],
    singe: (e) => [Math.min(1, e.removedLengthQuanta / 200), 0.5],
    nose: (e) => [Math.min(1, e.removedLengthQuanta / 300), 0.2],
    threading: (e) => [Math.min(1, e.hairCells / 6), 0.3],
    massage: (e) => [Math.min(1, (e.perFieldDeltas.relax || 0) / 600), 0.6],
    pomade: (e) => [Math.min(1, (e.perFieldDeltas.pomade || 0) / 10), 0.5],
  };
  const qOf = (e) => [e.toolId, e.eventSequence, 'result'];

  // a committed effect record. A record without a positive delta gets no result layer, whatever asked for it.
  function effect(e) {
    if (!e || !e.changed) { stats.refused++; return false; }
    const play = RESULT[e.toolId];
    if (!play) return false;
    const [mag, every] = (MAGNITUDE[e.toolId] || ((r) => [Math.min(1, (r.changedCount || 1) / 60), 0.4]))(e);
    A.acc[e.toolId] = (A.acc[e.toolId] || 0) + mag;
    if (A.acc[e.toolId] < every) return false; // a deterministic amount of real change between accents
    A.acc[e.toolId] = 0;
    stats.result++;
    stats.byTool[e.toolId] = (stats.byTool[e.toolId] || 0) + 1;
    play(qOf(e), Math.sqrt(Math.max(0, Math.min(1, mag))));
    return true;
  }
  function mechanism(name, q, arg) {
    stats.mechanism++;
    const f = MECH[name];
    if (f) f(q || [name, 0, 'mech'], arg);
  }
  // tool switch, pause, backgrounding, customer exit: everything scheduled stops, and nothing is replayed later
  function stop() {
    for (const s of A.live) { try { s.onended = null; s.stop(); s.disconnect(); } catch (e) {} }
    A.live.clear(); stats.voices = 0; A.acc = {};
  }
  HSC.onHostPause((paused) => { if (paused) stop(); });

  HSC.audio = { prepareAudio, ctx, bus, noise, tone, effect, mechanism, stop, stats: () => Object.assign({}, stats, { live: A.live.size }), noiseBuffer: (r) => { const c = ctx({ ui: true }); return c ? noiseBuffer(c, r || 'white') : null; }, seeded: between };
})(globalThis.HSC || (globalThis.HSC = {}));

});
