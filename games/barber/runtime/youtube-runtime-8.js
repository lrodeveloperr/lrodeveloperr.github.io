(HSC.youtubeRuntime ||= []).push(() => {




// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1; owner-approved Option 1 "Your Shop", 5 November 2026): the barbershop
// behind the customer, built in 3D with Three.js r180 (three-r180.js, the same version as the game's engine) so it
// sits with the semi-realistic customer. The game's renderer, camera and controls are untouched: this module only
// renders pictures (the soft-focus backdrop, the shop screen, thumbnails) on its own small offscreen renderer.
//
// One base shop; every look is one choice per slot (SLOTS / PARTS). A regional shop (REGIONS) is a preset of parts
// with local materials and colours; never sacred objects or flags (docs/CAREER-SALON-BRANCH-PLAN.md section 7).
// The TV shows the player's own shop name (Settings); there is no sponsored content.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const THREE = HSC.THREE;
  if (!THREE) return;

  // ---- procedural textures (canvas): grain, wear and variation on every surface ----
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  function cv(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; }
  function noise(x, w, h, a, n) { for (let i = 0; i < n; i++) { const v = rnd() < 0.5 ? 0 : 255; x.fillStyle = `rgba(${v},${v},${v},${(rnd() * a) / 255})`; x.fillRect(rnd() * w, rnd() * h, 1 + rnd() * 2, 1 + rnd() * 2); } }
  const TEX = {
    checker() {
      const [c, x] = cv(512, 512), n = 4, s = 128;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const white = (i + j) % 2 === 0;
        x.fillStyle = white ? '#e7e2d8' : '#1b1b1f'; x.fillRect(i * s, j * s, s, s);
        x.save(); x.beginPath(); x.rect(i * s, j * s, s, s); x.clip();
        for (let k = 0; k < 3; k++) { x.strokeStyle = white ? `rgba(120,115,110,${0.15 + rnd() * 0.2})` : `rgba(90,90,100,${0.25 + rnd() * 0.25})`; x.lineWidth = 0.6 + rnd() * 1.2; x.beginPath(); let px = i * s + rnd() * s, py = j * s; x.moveTo(px, py); for (let t = 0; t < 10; t++) { px += (rnd() - 0.5) * 26; py += s / 9; x.lineTo(px, py); } x.stroke(); }
        x.restore();
      }
      noise(x, 512, 512, 12, 6000);
      x.strokeStyle = '#8c857b'; x.lineWidth = 2; for (let i = 0; i <= n; i++) { x.beginPath(); x.moveTo(i * s, 0); x.lineTo(i * s, 512); x.stroke(); x.beginPath(); x.moveTo(0, i * s); x.lineTo(512, i * s); x.stroke(); }
      return c;
    },
    wood(base, dark, w = 256, h = 256) {
      const [c, x] = cv(w, h);
      x.fillStyle = base; x.fillRect(0, 0, w, h);
      for (let i = 0; i < 110; i++) { x.strokeStyle = `rgba(${rnd() < 0.5 ? '30,15,8' : '120,80,50'},${0.05 + rnd() * 0.12})`; x.lineWidth = 0.6 + rnd() * 2; x.beginPath(); const p = rnd() * w; for (let t = 0; t <= 30; t++) { const q = (t / 30) * h, off = Math.sin(t * 0.3 + i) * 3; t ? x.lineTo(p + off, q) : x.moveTo(p + off, q); } x.stroke(); }
      for (let i = 0; i < 4; i++) { const g = x.createRadialGradient(rnd() * w, rnd() * h, 2, rnd() * w, rnd() * h, 30 + rnd() * 30); g.addColorStop(0, dark + '44'); g.addColorStop(1, '#0000'); x.fillStyle = g; x.fillRect(0, 0, w, h); }
      noise(x, w, h, 10, 2000);
      return c;
    },
    deco(bg = '#efe3cc', ink = '#dcc9a4', gold = '#c49a42') {
      const [c, x] = cv(512, 512);
      x.fillStyle = bg; x.fillRect(0, 0, 512, 512);
      const fan = (cx, cy, r) => { for (let k = 0; k < 4; k++) { x.beginPath(); x.arc(cx, cy, r - k * (r / 4.5), Math.PI, 2 * Math.PI); x.strokeStyle = k === 0 ? gold + '66' : ink; x.lineWidth = k === 0 ? 2 : 3; x.stroke(); } };
      for (let row = 0; row < 6; row++) for (let col = -1; col < 6; col++) fan(col * 128 + (row % 2) * 64 + 64, row * 96 + 90, 62);
      noise(x, 512, 512, 12, 6000);
      return c;
    },
    plaster(bg, speck = 'rgba(120,100,80,0.05)') {
      const [c, x] = cv(256, 256);
      x.fillStyle = bg; x.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 30; i++) { const g = x.createRadialGradient(rnd() * 256, rnd() * 256, 2, rnd() * 256, rnd() * 256, 30 + rnd() * 40); g.addColorStop(0, speck); g.addColorStop(1, '#0000'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); }
      noise(x, 256, 256, 8, 3000);
      return c;
    },
    subway() {
      const [c, x] = cv(256, 256);
      x.fillStyle = '#cfcac0'; x.fillRect(0, 0, 256, 256);
      for (let r = 0; r < 8; r++) for (let k = -1; k < 5; k++) { const ox = k * 64 + (r % 2) * 32, oy = r * 32; const g = x.createLinearGradient(0, oy, 0, oy + 32); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#f1eee6'); x.fillStyle = g; x.beginPath(); x.roundRect ? x.roundRect(ox + 2, oy + 2, 60, 28, 4) : x.rect(ox + 2, oy + 2, 60, 28); x.fill(); }
      return c;
    },
    slats(bg = '#efe6d6', slat = '#d9b48a') {
      const [c, x] = cv(256, 256);
      x.fillStyle = bg; x.fillRect(0, 0, 256, 256);
      const wd = TEX.wood(slat, '#a8805a', 32, 256);
      for (let i = 0; i < 8; i++) x.drawImage(wd, i * 32 + 5, 0, 22, 256);
      return c;
    },
    painted(style) {
      // blue-and-white hand-painted tile: Talavera and Iznik families (floral, not religious)
      const [c, x] = cv(256, 256), s = 64;
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
        const ox = i * s, oy = j * s, cx = ox + s / 2, cy = oy + s / 2;
        x.fillStyle = '#f7f3ea'; x.fillRect(ox, oy, s, s); x.strokeStyle = '#d8d2c4'; x.lineWidth = 2; x.strokeRect(ox + 1, oy + 1, s - 2, s - 2);
        if (style === 'talavera') {
          x.fillStyle = '#1f4fa8'; for (let a = 0; a < 8; a++) { x.save(); x.translate(cx, cy); x.rotate((a / 8) * Math.PI * 2); x.beginPath(); x.ellipse(0, -13, 4.5, 10, 0, 0, 7); x.fill(); x.restore(); }
          x.fillStyle = '#f2b632'; x.beginPath(); x.arc(cx, cy, 6, 0, 7); x.fill();
          x.fillStyle = '#1f4fa8'; for (const [dx, dy] of [[0, 0], [s, 0], [0, s], [s, s]]) { x.beginPath(); x.arc(ox + dx, oy + dy, 9, 0, 7); x.fill(); }
        } else {
          x.strokeStyle = '#1d4fa0'; x.lineWidth = 3; x.strokeRect(ox + 5, oy + 5, s - 10, s - 10);
          x.fillStyle = '#2aa6a0'; for (const sg of [-1, 1]) { x.beginPath(); x.ellipse(cx + sg * 9, cy + 5, 3.5, 11, sg * 0.5, 0, 7); x.fill(); }
          x.fillStyle = '#c8322e'; x.beginPath(); x.moveTo(cx, cy - 17); x.bezierCurveTo(cx + 9, cy - 12, cx + 7, cy - 1, cx, cy + 1); x.bezierCurveTo(cx - 7, cy - 1, cx - 9, cy - 12, cx, cy - 17); x.fill();
        }
      }
      return c;
    },
    terrazzo() {
      const [c, x] = cv(512, 512);
      x.fillStyle = '#ece7df'; x.fillRect(0, 0, 512, 512);
      const cols = ['#c9b8a6', '#8f9aa6', '#d98a6a', '#6f7f6a', '#f7f4ef', '#3a3a3e'];
      for (let i = 0; i < 700; i++) { x.fillStyle = cols[i % 6]; x.beginPath(); const r = 1.5 + rnd() * 5; x.ellipse(rnd() * 512, rnd() * 512, r, r * (0.5 + rnd() * 0.5), rnd() * 3, 0, 7); x.fill(); }
      return c;
    },
    herringbone() {
      const [c, x] = cv(512, 512);
      x.fillStyle = '#8a6a44'; x.fillRect(0, 0, 512, 512);
      const L = 80, W = 20;
      for (let r = -8; r < 30; r++) for (let k = -8; k < 30; k++) { const ox = k * W * 2 + r * W, oy = r * W * 2; x.fillStyle = (r + k) % 2 ? '#c8a274' : '#b48c5e'; x.fillRect(ox, oy, L, W - 1); x.fillStyle = (r + k) % 2 ? '#b48c5e' : '#c8a274'; x.fillRect(ox + L - W + 1, oy + W, W - 1, L); }
      noise(x, 512, 512, 10, 5000);
      return c;
    },
    terracotta() {
      const [c, x] = cv(512, 512), s = 512 / 6;
      x.fillStyle = '#9a5a3a'; x.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) { const v = rnd() * 22; x.fillStyle = `rgb(${196 - v},${112 - v * 0.6},${74 - v * 0.4})`; x.fillRect(i * s + 3, j * s + 3, s - 6, s - 6); }
      noise(x, 512, 512, 12, 5000);
      return c;
    },
    cement() {
      const [c, x] = cv(512, 512), s = 128;
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
        const ox = i * s, oy = j * s, cx = ox + s / 2, cy = oy + s / 2;
        x.fillStyle = '#f1ece2'; x.fillRect(ox, oy, s, s);
        x.fillStyle = '#5f8f8a'; x.beginPath(); x.moveTo(cx, oy + 10); x.lineTo(ox + s - 10, cy); x.lineTo(cx, oy + s - 10); x.lineTo(ox + 10, cy); x.fill();
        x.fillStyle = '#f1ece2'; x.beginPath(); x.arc(cx, cy, s * 0.22, 0, 7); x.fill();
        x.fillStyle = '#d9a35a'; x.beginPath(); x.arc(cx, cy, s * 0.1, 0, 7); x.fill();
        for (const [dx, dy] of [[0, 0], [s, 0], [0, s], [s, s]]) { x.beginPath(); x.arc(ox + dx, oy + dy, s * 0.14, 0, 7); x.fill(); }
      }
      return c;
    },
    indigo() {
      // hand-dyed indigo resist cloth (adire family): circles and lines
      const [c, x] = cv(256, 256);
      x.fillStyle = '#20356b'; x.fillRect(0, 0, 256, 256); x.strokeStyle = '#c9d6ee'; x.fillStyle = '#c9d6ee';
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
        const ox = i * 64, oy = j * 64, cx = ox + 32, cy = oy + 32;
        if ((i + j) % 2) { for (let r = 6; r < 28; r += 6) { x.lineWidth = 2; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke(); } }
        else { x.lineWidth = 2; for (let k = 0; k < 6; k++) { x.beginPath(); x.moveTo(ox + 7, oy + 9 + k * 9); x.lineTo(ox + 57, oy + 9 + k * 9); x.stroke(); } }
      }
      return c;
    },
    sky(warm) {
      const [c, x] = cv(512, 384);
      const g = x.createLinearGradient(0, 0, 0, 384); g.addColorStop(0, '#8ec9f2'); g.addColorStop(0.7, '#d9ecf7'); g.addColorStop(1, '#f2eee6'); x.fillStyle = g; x.fillRect(0, 0, 512, 384);
      for (let i = 0; i < 4; i++) { const cx = rnd() * 512, cy = 30 + rnd() * 100; for (let k = 0; k < 5; k++) { x.fillStyle = 'rgba(255,255,255,0.7)'; x.beginPath(); x.ellipse(cx + k * 15, cy + Math.sin(k) * 4, 20, 11, 0, 0, 7); x.fill(); } }
      const fac = warm ? ['#e8c9a0', '#d9a77a', '#f2dcc0', '#c98f6a'] : ['#e9e2d6', '#d8cdbd', '#c9d3dc', '#efe7d9'];
      let bx = -10;
      while (bx < 512) { const bw = 55 + rnd() * 70, bh = 130 + rnd() * 150, by = 384 - bh; x.fillStyle = fac[Math.floor(rnd() * 4)]; x.fillRect(bx, by, bw, bh); for (let wy = by + 10; wy < 350; wy += 22) for (let wx = bx + 7; wx < bx + bw - 12; wx += 17) { x.fillStyle = '#6f8aa0'; x.fillRect(wx, wy, 9, 13); } bx += bw + 4; }
      x.fillStyle = '#b9b2a6'; x.fillRect(0, 365, 512, 19);
      return c;
    },
    label(bg, ink, text, accent) {
      const [c, x] = cv(256, 64);
      x.fillStyle = bg; x.fillRect(0, 0, 256, 64);
      if (accent) { x.fillStyle = accent; x.fillRect(0, 5, 256, 3); x.fillRect(0, 56, 256, 3); }
      x.fillStyle = ink; x.font = '900 26px "Arial Rounded MT Bold", Arial'; x.textAlign = 'center'; x.textBaseline = 'middle';
      for (const cx of [64, 192]) x.fillText(text, cx, 33);
      return c;
    },
    chart() {
      // a classic style chart: pictures of cuts, no words
      const [c, x] = cv(256, 384);
      x.fillStyle = '#f4ecdc'; x.fillRect(0, 0, 256, 384); x.strokeStyle = '#2a2a2a'; x.lineWidth = 3; x.strokeRect(9, 9, 238, 366);
      for (let i = 0; i < 6; i++) {
        const cx = 70 + (i % 2) * 116, cy = 75 + Math.floor(i / 2) * 110;
        x.fillStyle = '#e8d8bc'; x.beginPath(); x.ellipse(cx, cy + 5, 31, 37, 0, 0, 7); x.fill();
        x.fillStyle = '#2a2016'; x.beginPath(); x.ellipse(cx, cy - 11, 32, [13, 20, 6, 26, 17, 10][i] + 15, 0, Math.PI, 2 * Math.PI); x.fill();
        x.fillStyle = '#c9a24a'; x.fillRect(cx - 20, cy + 50, 40, 3);
      }
      return c;
    },
    pole() {
      const [c, x] = cv(128, 256);
      x.fillStyle = '#f4f2ee'; x.fillRect(0, 0, 128, 256);
      const cols = ['#c8202c', '#f4f2ee', '#1f4fb4', '#f4f2ee'];
      for (let i = -8; i < 16; i++) { x.fillStyle = cols[((i % 4) + 4) % 4]; x.beginPath(); x.moveTo(0, i * 20); x.lineTo(128, i * 20 + 64); x.lineTo(128, i * 20 + 84); x.lineTo(0, i * 20 + 20); x.fill(); }
      return c;
    },
    peg() {
      const [c, x] = cv(256, 128);
      x.fillStyle = '#b8936a'; x.fillRect(0, 0, 256, 128); noise(x, 256, 128, 18, 2500);
      for (let i = 0; i < 32; i++) for (let j = 0; j < 16; j++) { x.fillStyle = '#3a2a1c'; x.beginPath(); x.arc(4 + i * 8, 4 + j * 8, 1.3, 0, 7); x.fill(); }
      return c;
    },
    tuft() {
      const [c, x] = cv(128, 128);
      x.fillStyle = '#808080'; x.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const cx = i * 32 + (j % 2) * 16, cy = j * 32 + 16, g = x.createRadialGradient(cx, cy, 1, cx, cy, 20); g.addColorStop(0, '#202020'); g.addColorStop(0.25, '#9a9a9a'); g.addColorStop(1, '#808080'); x.fillStyle = g; x.fillRect(cx - 20, cy - 20, 40, 40); }
      return c;
    },
    carbon() { const [c, x] = cv(128, 128); for (let i = 0; i < 16; i++) for (let j = 0; j < 16; j++) { x.fillStyle = (i + j) % 2 ? '#16171b' : '#23252b'; x.fillRect(i * 8, j * 8, 8, 8); } return c; },
    flame() {
      const [c, x] = cv(128, 256);
      x.fillStyle = '#a3121b'; x.fillRect(0, 0, 128, 256);
      for (let i = 0; i < 9; i++) { const cx = 10 + i * 14, g = x.createLinearGradient(0, 256, 0, 75); g.addColorStop(0, '#ffcf3a'); g.addColorStop(0.5, '#ff6a1a'); g.addColorStop(1, '#ff6a1a00'); x.fillStyle = g; x.beginPath(); x.moveTo(cx - 12, 256); x.bezierCurveTo(cx - 15, 190, cx + 5, 165, cx - 2, 85 + rnd() * 40); x.bezierCurveTo(cx + 13, 150, cx + 15, 200, cx + 12, 256); x.fill(); }
      return c;
    },
  };
  // the TV: the player's own shop name, fitted to the screen in every script; and the year it was named
  const RTL = /[֐-ࣿיִ-﷿ﹰ-﻿]/;
  function nameCanvas(name, year) {
    const w = 1024, h = 576, [c, x] = cv(w, h);
    const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#123a3a'); g.addColorStop(1, '#0a1a24'); x.fillStyle = g; x.fillRect(0, 0, w, h);
    const r = x.createRadialGradient(w / 2, h * 0.45, 10, w / 2, h * 0.45, h * 0.8); r.addColorStop(0, '#ffffff22'); r.addColorStop(1, '#0000'); x.fillStyle = r; x.fillRect(0, 0, w, h);
    const ink = '#ffe7a8';
    x.strokeStyle = ink; x.lineWidth = 10; x.lineCap = 'round';
    const cx = w / 2, cy = name ? 140 : h / 2 - 20, k = name ? 1 : 1.8;
    x.beginPath(); x.arc(cx - 70 * k, cy + 22 * k, 22 * k, 0, 7); x.stroke(); x.beginPath(); x.arc(cx - 70 * k, cy - 22 * k, 22 * k, 0, 7); x.stroke();
    x.beginPath(); x.moveTo(cx - 50 * k, cy + 14 * k); x.lineTo(cx + 80 * k, cy - 26 * k); x.moveTo(cx - 50 * k, cy - 14 * k); x.lineTo(cx + 80 * k, cy + 26 * k); x.stroke();
    x.textAlign = 'center'; x.textBaseline = 'middle';
    const fit = (text, max, size, min, weight) => { let s = size; do { x.font = `${weight} ${s}px "Arial Rounded MT Bold", "Noto Sans", Arial, sans-serif`; s -= 4; } while (x.measureText(text).width > max && s > min); };
    if (name) {
      x.direction = RTL.test(name) ? 'rtl' : 'ltr';
      fit(name, w * 0.86, 128, 36, 900); x.fillStyle = ink; x.fillText(name, w / 2, h * 0.58);
    }
    if (year) {
      const est = (HSC.t ? HSC.t('est') : 'Est. {y}').replace('{y}', year);
      x.direction = RTL.test(est) ? 'rtl' : 'ltr';
      fit(est, w * 0.6, 40, 20, 700); x.fillStyle = '#ffffffbf'; x.fillText(est, w / 2, name ? h * 0.8 : h * 0.78);
    }
    return c;
  }

  // ---- materials and models ----
  const tex = (canvas, rep = [1, 1], srgb = true) => { const t = new THREE.CanvasTexture(canvas); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep[0], rep[1]); if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };
  const M = {
    chrome: () => new THREE.MeshStandardMaterial({ color: '#e8ecf2', metalness: 1, roughness: 0.14 }),
    brushed: () => new THREE.MeshStandardMaterial({ color: '#c9ced6', metalness: 1, roughness: 0.32 }),
    brass: () => new THREE.MeshStandardMaterial({ color: '#c9a046', metalness: 1, roughness: 0.28 }),
    gold: () => new THREE.MeshStandardMaterial({ color: '#e2b84f', metalness: 1, roughness: 0.2 }),
    blackGloss: () => new THREE.MeshPhysicalMaterial({ color: '#0c0d10', metalness: 0.2, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.08 }),
    blackMatte: () => new THREE.MeshStandardMaterial({ color: '#151619', metalness: 0.1, roughness: 0.6 }),
    leather: (c, bump) => new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.4, bumpMap: bump || null, bumpScale: 1.4 }),
    glass: (c) => new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.08, transparent: true, opacity: 0.72, clearcoat: 1 }),
    wood: (base, dark, rep = [1, 1]) => new THREE.MeshStandardMaterial({ map: tex(TEX.wood(base, dark), rep), roughness: 0.55 }),
    white: () => new THREE.MeshPhysicalMaterial({ color: '#f4f2ee', roughness: 0.35, clearcoat: 0.6 }),
  };
  const rbox = (w, h, d, r, seg = 3) => new THREE.RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 1e-4, h / 2 - 1e-4, d / 2 - 1e-4));
  const mesh = (g, m, cast = true, recv = true) => { const o = new THREE.Mesh(g, m); o.castShadow = cast; o.receiveShadow = recv; return o; };

  function clipper(finish) {
    const g = new THREE.Group();
    const body = finish === 'carbon' ? new THREE.MeshPhysicalMaterial({ map: tex(TEX.carbon(), [2, 4]), roughness: 0.35, clearcoat: 1, metalness: 0.3 })
      : finish === 'flame' ? new THREE.MeshPhysicalMaterial({ map: tex(TEX.flame()), roughness: 0.3, clearcoat: 1, metalness: 0.5 })
        : finish === 'gold' ? M.gold() : M.chrome();
    const accent = finish === 'chrome' ? M.blackGloss() : M.gold();
    const s = new THREE.Shape(), W1 = 0.027, W2 = 0.022, H = 0.165;
    s.moveTo(-W2, 0); s.lineTo(W2, 0); s.quadraticCurveTo(W2 + 0.006, 0.01, W2 + 0.005, 0.03); s.lineTo(W1, H - 0.01); s.quadraticCurveTo(W1, H, W1 - 0.01, H);
    s.lineTo(-W1 + 0.01, H); s.quadraticCurveTo(-W1, H, -W1, H - 0.01); s.lineTo(-W2 - 0.005, 0.03); s.quadraticCurveTo(-W2 - 0.006, 0.01, -W2, 0);
    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.026, bevelEnabled: true, bevelThickness: 0.009, bevelSize: 0.008, bevelSegments: 4, curveSegments: 10 });
    geo.translate(0, 0, -0.013);
    const pos = geo.attributes.position, uv = geo.attributes.uv; for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + 0.04) / 0.08, pos.getY(i) / H);
    g.add(mesh(geo, body));
    const head = mesh(rbox(0.062, 0.022, 0.04, 0.006), M.brushed()); head.position.set(0, H + 0.016, 0); g.add(head);
    const blade = mesh(rbox(0.064, 0.008, 0.012, 0.002), M.chrome()); blade.position.set(0, H + 0.03, 0.006); g.add(blade);
    const sw = mesh(rbox(0.016, 0.03, 0.01, 0.005), accent); sw.position.set(0, 0.11, 0.022); g.add(sw);
    return g;
  }
  function chair(leather, metal) {
    const g = new THREE.Group(), met = metal === 'gold' ? M.gold() : M.chrome();
    const lea = M.leather(leather, tex(TEX.tuft(), [2, 2], false)), plain = M.leather(leather);
    const base = mesh(new THREE.CylinderGeometry(0.28, 0.3, 0.035, 40), met); base.position.y = 0.018; g.add(base);
    const pump = mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.32, 28), met); pump.position.y = 0.2; g.add(pump);
    const col = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.12, 20), met); col.position.y = 0.42; g.add(col);
    const seat = mesh(rbox(0.56, 0.14, 0.52, 0.06), plain); seat.position.set(0, 0.54, 0); g.add(seat);
    const back = mesh(rbox(0.52, 0.62, 0.13, 0.06), lea); back.position.set(0, 0.92, -0.22); back.rotation.x = -0.12; g.add(back);
    const head = mesh(rbox(0.26, 0.12, 0.1, 0.045), plain); head.position.set(0, 1.3, -0.27); g.add(head);
    const headBar = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.12, 10), met); headBar.position.set(0, 1.22, -0.29); g.add(headBar);
    for (const sd of [-1, 1]) {
      // the armrests sit on the seat's edge: a chrome side frame bolted to the seat carries a padded arm
      const frame = mesh(rbox(0.035, 0.2, 0.42, 0.012), met); frame.position.set(sd * 0.29, 0.6, 0); g.add(frame);
      const arm = mesh(rbox(0.085, 0.055, 0.48, 0.026), plain); arm.position.set(sd * 0.29, 0.725, 0.02); g.add(arm);
    }
    const foot = mesh(rbox(0.42, 0.025, 0.14, 0.01), met); foot.position.set(0, 0.2, 0.42); g.add(foot);
    for (const xx of [-0.14, 0.14]) {
      const a = new THREE.Vector3(xx, 0.5, 0.24), b = new THREE.Vector3(xx, 0.21, 0.4), st = mesh(new THREE.CylinderGeometry(0.012, 0.012, a.distanceTo(b), 10), met);
      st.position.copy(a.clone().add(b).multiplyScalar(0.5)); st.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()); g.add(st);
    }
    const pedal = mesh(rbox(0.2, 0.022, 0.035, 0.008), met); pedal.position.set(0.17, 0.08, 0.05); pedal.rotation.y = -0.35; g.add(pedal);
    const tread = mesh(rbox(0.07, 0.03, 0.05, 0.01), M.blackMatte()); tread.position.set(0.27, 0.085, 0.09); tread.rotation.y = -0.35; g.add(tread);
    return g;
  }
  function tin(label, lid = '#1a1b1f') {
    const g = new THREE.Group();
    const body = mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 32, 1, true), new THREE.MeshStandardMaterial({ map: tex(label), metalness: 0.4, roughness: 0.35 })); body.position.y = 0.02; g.add(body);
    const top = mesh(new THREE.CylinderGeometry(0.047, 0.047, 0.014, 32), new THREE.MeshStandardMaterial({ color: lid, metalness: 0.6, roughness: 0.25 })); top.position.y = 0.045; g.add(top);
    return g;
  }
  function bottle(glass, cap, label, h = 0.2) {
    const g = new THREE.Group();
    const prof = [[0, 0], [0.032, 0], [0.036, 0.006], [0.036, h * 0.62], [0.03, h * 0.72], [0.014, h * 0.8], [0.012, h * 0.88]].map(([x, y]) => new THREE.Vector2(x, y));
    g.add(mesh(new THREE.LatheGeometry(prof, 32), M.glass(glass)));
    const cp = mesh(new THREE.CylinderGeometry(0.016, 0.016, h * 0.14, 20), cap || M.blackGloss()); cp.position.y = h * 0.93; g.add(cp);
    if (label) { const lb = mesh(new THREE.CylinderGeometry(0.0365, 0.0365, h * 0.3, 32, 1, true, -1.2, 2.4), new THREE.MeshStandardMaterial({ map: tex(label), roughness: 0.6 })); lb.position.y = h * 0.32; lb.rotation.y = Math.PI / 2; g.add(lb); }
    return g;
  }
  function neonSign(pink, cyan) {
    const g = new THREE.Group();
    const tube = (pts, col, r = 0.008, closed = false) => mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(([x, y]) => new THREE.Vector3(x, y, 0.03)), closed), 80, r, 8, closed), new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 3 }), false, false);
    const ring = (cx, cy, r) => Array.from({ length: 14 }, (_, i) => [cx + Math.cos((i / 14) * Math.PI * 2) * r, cy + Math.sin((i / 14) * Math.PI * 2) * r]);
    g.add(tube(ring(-0.36, 0.07, 0.06), pink, 0.008, true)); g.add(tube(ring(-0.36, -0.09, 0.06), pink, 0.008, true));
    g.add(tube([[-0.3, 0.05], [-0.1, -0.02], [0.08, -0.1]], pink)); g.add(tube([[-0.3, -0.07], [-0.1, 0], [0.08, 0.08]], pink));
    g.add(tube([[0.14, 0.09], [0.42, 0.09], [0.42, 0.04], [0.14, 0.04], [0.14, 0.09]], cyan));
    for (let i = 0; i < 9; i++) g.add(tube([[0.16 + i * 0.032, 0.04], [0.16 + i * 0.032, -0.08]], cyan, 0.006));
    g.add(mesh(rbox(1.0, 0.36, 0.02, 0.03), new THREE.MeshPhysicalMaterial({ color: '#0a0c12', roughness: 0.15, clearcoat: 1, transparent: true, opacity: 0.85 })));
    g.userData.lights = [[pink, -0.2], [cyan, 0.28]];
    return g;
  }
  function pole() {
    const g = new THREE.Group(), st = tex(TEX.pole(), [1, 1.6]);
    g.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.72, 32), new THREE.MeshStandardMaterial({ map: st, roughness: 0.35, emissive: '#ffffff', emissiveMap: st, emissiveIntensity: 0.2 })));
    g.add(mesh(new THREE.CylinderGeometry(0.072, 0.072, 0.72, 32, 1, true), M.glass('#ffffff'), false));
    for (const s of [1, -1]) { const cap = mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.05, 32), M.chrome()); cap.position.y = s * 0.385; g.add(cap); }
    const dome = mesh(new THREE.SphereGeometry(0.075, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), M.chrome()); dome.position.y = 0.41; g.add(dome);
    const tip = mesh(new THREE.SphereGeometry(0.03, 16, 10), M.brass()); tip.position.y = 0.49; g.add(tip);
    return g;
  }
  function pendant(style) {
    const g = new THREE.Group();
    if (style === 'globe') { g.add(mesh(new THREE.SphereGeometry(0.15, 32, 20), new THREE.MeshStandardMaterial({ color: '#fffaf0', emissive: '#ffe2b0', emissiveIntensity: 1.2, roughness: 0.35 }), false)); const cap = mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.06, 20), M.brass()); cap.position.y = 0.16; g.add(cap); return g; }
    if (style === 'lantern') { const l = mesh(new THREE.SphereGeometry(0.16, 24, 18), new THREE.MeshStandardMaterial({ color: '#ffe9c4', emissive: '#ffcf8a', emissiveIntensity: 1.4, roughness: 0.9 }), false); l.scale.y = 1.25; g.add(l); for (const y of [0.2, -0.2]) { const c = mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.03, 20), M.blackMatte()); c.position.y = y; g.add(c); } return g; }
    const prof = [[0.012, 0.1], [0.03, 0.09], [0.05, 0.05], [0.16, -0.06], [0.17, -0.08]].map(([x, y]) => new THREE.Vector2(x, y));
    g.add(mesh(new THREE.LatheGeometry(prof, 32), new THREE.MeshStandardMaterial({ color: '#16181d', metalness: 0.7, roughness: 0.35, side: THREE.DoubleSide })));
    const b = mesh(new THREE.SphereGeometry(0.04, 16, 12), new THREE.MeshStandardMaterial({ color: '#fff3d6', emissive: '#ffd99a', emissiveIntensity: 3 }), false); b.position.y = -0.04; g.add(b);
    return g;
  }
  // a pendant in the room hangs on a black cord from a small ceiling cap (owner, 8 November 2026);
  // the shop's preview of the part shows the shade alone. userData.hang: the height from the light to the ceiling
  function hung(style) {
    const g = pendant(style), top = new THREE.Box3().setFromObject(g).max.y, L = 0.3;
    const blk = new THREE.MeshStandardMaterial({ color: '#16181d', metalness: 0.6, roughness: 0.4 });
    const cord = mesh(new THREE.CylinderGeometry(0.006, 0.006, L, 10), blk); cord.position.y = top + L / 2; g.add(cord);
    const cap = mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.03, 24), blk); cap.position.y = top + L - 0.015; g.add(cap);
    g.userData.hang = top + L;
    return g;
  }
  function plant(scale) {
    const g = new THREE.Group();
    const potP = [[0, 0], [0.13, 0], [0.16, 0.05], [0.18, 0.3], [0.19, 0.32], [0.17, 0.32], [0, 0.32]].map(([x, y]) => new THREE.Vector2(x, y));
    g.add(mesh(new THREE.LatheGeometry(potP, 32), new THREE.MeshPhysicalMaterial({ color: '#efe9df', roughness: 0.35, clearcoat: 0.6 })));
    const ls = new THREE.Shape(); ls.moveTo(0, 0); ls.bezierCurveTo(0.09, 0.08, 0.08, 0.26, 0, 0.34); ls.bezierCurveTo(-0.08, 0.26, -0.09, 0.08, 0, 0);
    const lg = new THREE.ShapeGeometry(ls, 8), greens = ['#2f6b3a', '#3c8048', '#28592f', '#467f3e'];
    for (let i = 0; i < 14; i++) {
      const piv = new THREE.Group(); piv.position.y = 0.3; piv.rotation.y = (i / 14) * Math.PI * 2 + rnd() * 0.3; g.add(piv);
      const arm = new THREE.Group(); arm.rotation.z = 0.5 + rnd() * 0.6; piv.add(arm);
      const len = 0.25 + rnd() * 0.35, stem = mesh(new THREE.CylinderGeometry(0.004, 0.006, len, 5), new THREE.MeshStandardMaterial({ color: '#335a2c' })); stem.position.y = len / 2; arm.add(stem);
      const leaf = mesh(lg, new THREE.MeshStandardMaterial({ color: greens[i % 4], roughness: 0.5, side: THREE.DoubleSide })); leaf.position.y = len; leaf.rotation.x = -0.6 - rnd() * 0.5; leaf.scale.setScalar(0.9 + rnd() * 0.6); arm.add(leaf);
    }
    g.scale.setScalar(scale);
    return g;
  }
  function mirrorModel(w, h, frameMat) {
    // no vanity bulbs: the light stays soft at the top of the picture (owner, 5 November 2026)
    const g = new THREE.Group(), r = 0.06, b = 0.07;
    const rr = (s, x, y, W, H, R) => { s.moveTo(x + R, y); s.lineTo(x + W - R, y); s.quadraticCurveTo(x + W, y, x + W, y + R); s.lineTo(x + W, y + H - R); s.quadraticCurveTo(x + W, y + H, x + W - R, y + H); s.lineTo(x + R, y + H); s.quadraticCurveTo(x, y + H, x, y + H - R); s.lineTo(x, y + R); s.quadraticCurveTo(x, y, x + R, y); };
    const outer = new THREE.Shape(); rr(outer, -w / 2 - b, -h / 2 - b, w + 2 * b, h + 2 * b, r + b * 0.5);
    const hole = new THREE.Path(); rr(hole, -w / 2, -h / 2, w, h, r); outer.holes.push(hole);
    g.add(mesh(new THREE.ExtrudeGeometry(outer, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.012, bevelSegments: 4, curveSegments: 10 }), frameMat));
    const gs = new THREE.Shape(); rr(gs, -w / 2, -h / 2, w, h, r);
    const gl = mesh(new THREE.ShapeGeometry(gs, 10), new THREE.MeshPhysicalMaterial({ color: '#b9c6c8', metalness: 0.75, roughness: 0.14, envMapIntensity: 0.9, clearcoat: 1, clearcoatRoughness: 0.05 }), false, true);
    gl.position.z = 0.012; g.add(gl);
    return g;
  }

  // ---- the modular parts: every shop is the same base with one choice per slot (the first is always neutral) ----
  const SLOTS = ['wall', 'lower', 'floor', 'mat', 'mirror', 'lights', 'shelf', 'chair', 'decor'];
  const PARTS = {
    wall: { deco: () => TEX.deco(), plaster: () => TEX.plaster('#f4efe6'), subway: () => TEX.subway(), mint: () => TEX.plaster('#cfe6d8', 'rgba(60,110,80,0.06)'), blush: () => TEX.plaster('#f2d9cf', 'rgba(150,80,60,0.06)'), ochre: () => TEX.plaster('#efc98a', 'rgba(160,90,30,0.08)'), hinoki: () => TEX.slats() },
    lower: { oak: { kind: 'wood', c: ['#b98a5a', '#8a6038'] }, walnut: { kind: 'wood', c: ['#7a4c30', '#4a2a18'] }, navy: { kind: 'paint', c: '#2f4766' }, teal: { kind: 'paint', c: '#2f7a76' }, sage: { kind: 'paint', c: '#8fae94' }, stone: { kind: 'paint', c: '#cfc8bc' }, talavera: { kind: 'tile', t: () => TEX.painted('talavera') }, iznik: { kind: 'tile', t: () => TEX.painted('iznik') } },
    floor: { checker: () => [TEX.checker(), 1.2], herringbone: () => [TEX.herringbone(), 2.2], terrazzo: () => [TEX.terrazzo(), 2.5], cement: () => [TEX.cement(), 1.6], terracotta: () => [TEX.terracotta(), 2.0], stone: () => [TEX.plaster('#d9d4cb', 'rgba(90,90,90,0.08)'), 2.0] },
    mat: { black: '#26282d', jute: '#c9a77a', red: '#9e2a2a', indigo: 'indigo', none: null },
    mirror: { brass: () => M.brass(), oak: () => M.wood('#b98a5a', '#8a6038'), black: () => M.blackGloss(), white: () => M.white() },
    lights: { industrial: 1, globe: 1, lantern: 1 },
    shelf: { classic: 1, coastal: 1, vintage: 1 },
    chair: { oxblood: '#7a1e1e', black: '#141414', cream: '#e9e1d2', green: '#1f4a34', mustard: '#c98a2a', navy: '#24395a' },
    decor: { chart: 1, plant: 1, indigo: 1 },
  };
  const OPTIONS = Object.fromEntries(SLOTS.map((k) => [k, Object.keys(PARTS[k])]));
  // regional shops: presets of parts with local materials (city names are the labels)
  const REGIONS = {
    classic: { wall: 'deco', lower: 'oak', floor: 'checker', mat: 'black', mirror: 'brass', lights: 'industrial', shelf: 'classic', chair: 'oxblood', decor: 'chart', neon: ['#ff3d9a', '#3df2ff'] },
    london: { wall: 'subway', lower: 'navy', floor: 'herringbone', mat: 'black', mirror: 'brass', lights: 'globe', shelf: 'vintage', chair: 'green', decor: 'chart', neon: ['#ffd36a', '#ffffff'] },
    tokyo: { wall: 'hinoki', lower: 'stone', floor: 'stone', mat: 'jute', mirror: 'black', lights: 'lantern', shelf: 'coastal', chair: 'black', decor: 'plant', neon: ['#3df2ff', '#ffffff'] },
    lagos: { wall: 'ochre', lower: 'teal', floor: 'terrazzo', mat: 'indigo', mirror: 'oak', lights: 'globe', shelf: 'classic', chair: 'mustard', decor: 'indigo', neon: ['#ffd36a', '#3df2ff'] },
    istanbul: { wall: 'plaster', lower: 'iznik', floor: 'terrazzo', mat: 'red', mirror: 'brass', lights: 'globe', shelf: 'vintage', chair: 'oxblood', decor: 'plant', neon: ['#3df2ff', '#ffd36a'] },
    mexico: { wall: 'plaster', lower: 'talavera', floor: 'terracotta', mat: 'jute', mirror: 'oak', lights: 'globe', shelf: 'coastal', chair: 'navy', decor: 'plant', neon: ['#ff3d9a', '#ffd36a'] },
    mumbai: { wall: 'mint', lower: 'oak', floor: 'cement', mat: 'red', mirror: 'brass', lights: 'globe', shelf: 'classic', chair: 'mustard', decor: 'chart', neon: ['#ff3d9a', '#3df2ff'] },
  };

  // ---- the room ----
  const WIN = { x0: -2.55, x1: -1.5, y0: 1.15, y1: 2.5 };
  function buildRoom(scene, parts, info) {
    const P = Object.assign({}, REGIONS.classic, parts);
    const hot = {}, W = 7.2, Hc = 3.2, wainH = 1.0;
    const lower = PARTS.lower[P.lower], frameMat = PARTS.mirror[P.mirror]();
    const trim = lower.kind === 'wood' ? lower.c : lower.kind === 'paint' ? [lower.c, lower.c] : ['#b98a5a', '#8a6038'];
    // floor and ceiling
    const [fc, tile] = PARTS.floor[P.floor]();
    const fl = mesh(new THREE.PlaneGeometry(10, 6), new THREE.MeshPhysicalMaterial({ map: tex(fc, [10 / tile, 6 / tile]), roughness: 0.32, clearcoat: 0.35, clearcoatRoughness: 0.25 }), false, true);
    fl.rotation.x = -Math.PI / 2; fl.position.set(0, 0, 3); scene.add(fl);
    const ce = mesh(new THREE.PlaneGeometry(10, 6), new THREE.MeshStandardMaterial({ color: '#f2ece2', roughness: 0.9 }), false, true); ce.rotation.x = Math.PI / 2; ce.position.set(0, Hc, 3); scene.add(ce);
    // the back wall with the window opening
    const ws = new THREE.Shape(); ws.moveTo(-W / 2 - 1, wainH); ws.lineTo(W / 2 + 1, wainH); ws.lineTo(W / 2 + 1, Hc); ws.lineTo(-W / 2 - 1, Hc); ws.lineTo(-W / 2 - 1, wainH);
    const hole = new THREE.Path(); hole.moveTo(WIN.x0, WIN.y0); hole.lineTo(WIN.x1, WIN.y0); hole.lineTo(WIN.x1, WIN.y1); hole.lineTo(WIN.x0, WIN.y1); hole.lineTo(WIN.x0, WIN.y0); ws.holes.push(hole);
    const wg = new THREE.ShapeGeometry(ws), uv = wg.attributes.uv, pp = wg.attributes.position; for (let i = 0; i < pp.count; i++) uv.setXY(i, pp.getX(i) / 1.2, pp.getY(i) / 1.2);
    scene.add(mesh(wg, new THREE.MeshStandardMaterial({ map: tex(PARTS.wall[P.wall]()), roughness: 0.82 }), false, true));
    const woodM = M.wood(trim[0], trim[1], [6, 1]);
    const crown = mesh(new THREE.BoxGeometry(W + 2, 0.16, 0.08), woodM); crown.position.set(0, Hc - 0.08, 0.04); scene.add(crown);
    const crownT = mesh(new THREE.BoxGeometry(W + 2, 0.025, 0.1), frameMat); crownT.position.set(0, Hc - 0.17, 0.05); scene.add(crownT);
    const lowerMat = lower.kind === 'wood' ? M.wood(lower.c[0], lower.c[1], [8, 1]) : lower.kind === 'tile' ? new THREE.MeshPhysicalMaterial({ map: tex(lower.t(), [(W + 2) / 0.6, wainH / 0.6]), roughness: 0.25, clearcoat: 0.8 }) : new THREE.MeshStandardMaterial({ color: lower.c, roughness: 0.55 });
    const wain = mesh(new THREE.BoxGeometry(W + 2, wainH, 0.04), lowerMat); wain.position.set(0, wainH / 2, 0.02); scene.add(wain);
    const rail = mesh(rbox(W + 2, 0.06, 0.07, 0.02), woodM); rail.position.set(0, wainH, 0.05); scene.add(rail);
    const base = mesh(new THREE.BoxGeometry(W + 2, 0.14, 0.06), M.wood(trim[1], '#000000', [8, 1])); base.position.set(0, 0.07, 0.05); scene.add(base);
    if (lower.kind !== 'tile') {
      const pm = lower.kind === 'wood' ? M.wood(lower.c[0], lower.c[1]) : new THREE.MeshStandardMaterial({ color: lower.c, roughness: 0.5 });
      for (let x = -W / 2 - 0.6; x < W / 2 + 0.6; x += 0.9) { const cx = x + 0.45, cy = 0.55, w = 0.72, h = 0.6; for (const [px, py, pw, ph] of [[cx, cy + h / 2, w, 0.03], [cx, cy - h / 2, w, 0.03], [cx - w / 2, cy, 0.03, h], [cx + w / 2, cy, 0.03, h]]) { const m = mesh(rbox(pw + 0.02, ph + 0.02, 0.03, 0.01), pm); m.position.set(px, py, 0.05); scene.add(m); } }
    }
    // window, the street outside, a sill plant and the neon picture (no words)
    const city = mesh(new THREE.PlaneGeometry(4.2, 3.0), new THREE.MeshBasicMaterial({ map: tex(TEX.sky(P.lower === 'talavera' || P.wall === 'ochre')) }), false, false);
    city.position.set((WIN.x0 + WIN.x1) / 2, 1.85, -1.6); scene.add(city);
    const wf = M.wood(trim[0], trim[1]);
    for (const [x, y, w, h] of [[(WIN.x0 + WIN.x1) / 2, WIN.y1 + 0.04, WIN.x1 - WIN.x0 + 0.16, 0.08], [(WIN.x0 + WIN.x1) / 2, WIN.y0 - 0.04, WIN.x1 - WIN.x0 + 0.2, 0.08], [WIN.x0 - 0.04, (WIN.y0 + WIN.y1) / 2, 0.08, WIN.y1 - WIN.y0 + 0.08], [WIN.x1 + 0.04, (WIN.y0 + WIN.y1) / 2, 0.08, WIN.y1 - WIN.y0 + 0.08], [(WIN.x0 + WIN.x1) / 2, WIN.y0 + (WIN.y1 - WIN.y0) * 0.62, WIN.x1 - WIN.x0, 0.04]]) { const m = mesh(rbox(w, h, 0.12, 0.01), wf); m.position.set(x, y, 0); scene.add(m); }
    const sill = mesh(rbox(WIN.x1 - WIN.x0 + 0.3, 0.04, 0.22, 0.01), wf); sill.position.set((WIN.x0 + WIN.x1) / 2, WIN.y0 - 0.09, 0.08); scene.add(sill);
    const sp = plant(0.45); sp.position.set(WIN.x0 + 0.2, WIN.y0 - 0.07, 0.1); scene.add(sp);
    const wn = neonSign(P.neon[0], P.neon[1]); wn.scale.setScalar(0.85); wn.position.set((WIN.x0 + WIN.x1) / 2, 2.2, 0.02); scene.add(wn);
    for (const [c, x] of wn.userData.lights) { const l = new THREE.PointLight(c, 0.6, 1.4, 2); l.position.set((WIN.x0 + WIN.x1) / 2 + x * 0.85, 2.2, 0.15); scene.add(l); }
    hot.window = new THREE.Vector3((WIN.x0 + WIN.x1) / 2, 2.2, 0.05);
    const pl = pole(); pl.position.set(-1.18, 1.75, 0.12); scene.add(pl);
    // the mirror station (no vanity bulbs) and the counter with the shelf products
    const mir = mirrorModel(1.5, 1.2, frameMat); mir.position.set(0, 1.78, 0.02); scene.add(mir);
    hot.mirror = new THREE.Vector3(0.5, 2.15, 0.05);
    const counter = mesh(rbox(2.0, 0.05, 0.3, 0.012), new THREE.MeshPhysicalMaterial({ color: '#f1ece4', roughness: 0.22, clearcoat: 0.8 })); counter.position.set(0, 1.04, 0.15); scene.add(counter);
    for (const x of [-0.82, 0.82]) { const br = mesh(rbox(0.04, 0.12, 0.25, 0.01), frameMat); br.position.set(x, 0.98, 0.13); scene.add(br); }
    const L = (bg, ink, t, ac) => TEX.label(bg, ink, t, ac);
    const SETS = {
      classic: () => [bottle('#2f8f55', M.blackGloss(), L('#f4efe4', '#1d3b28', 'TONIC', '#2f8f55'), 0.22), tin(L('#b8322a', '#fff', 'POMADE', '#f2d27a')), bottle('#d98a2b', M.gold(), L('#f4efe4', '#5a3412', 'BAY RUM', '#d98a2b'), 0.19), tin(L('#e0b544', '#2a1a08', 'WAX', '#7a4a12'), '#2a1a08')],
      coastal: () => [bottle('#4aa0d8', M.chrome(), L('#f4efe4', '#123a5a', 'AQUA', '#4aa0d8'), 0.2), tin(L('#2a4a8a', '#fff', 'CLAY', '#f2d27a'), '#e9edf3'), bottle('#9fd3c6', M.chrome(), L('#f4efe4', '#1d4a40', 'MIST', '#5aa99a'), 0.17), tin(L('#e9edf3', '#24395a', 'GEL', '#4aa0d8'), '#24395a')],
      vintage: () => [bottle('#7a3a1a', M.brass(), L('#efe3c8', '#3a1a0a', 'TONIC', '#7a3a1a'), 0.22), tin(L('#1f3b2c', '#efe3c8', 'POMADE', '#c9a046'), '#c9a046'), bottle('#c9a046', M.brass(), L('#efe3c8', '#3a2a0a', 'OIL', '#7a5a1a'), 0.17), tin(L('#5a1414', '#efe3c8', 'BALM', '#c9a046'), '#c9a046')],
    };
    const items = SETS[P.shelf]().concat(SETS[P.shelf]());
    const xs = [-0.86, -0.72, -0.58, -0.44, 0.44, 0.58, 0.72, 0.86];
    items.forEach((o, i) => { o.position.set(xs[i], 1.065, 0.16); o.scale.setScalar(1.55); o.rotation.y = (rnd() - 0.5) * 0.8; scene.add(o); });
    hot.shelf = new THREE.Vector3(0.42, 1.2, 0.2);
    const tn = neonSign(P.neon[0], P.neon[1]); tn.scale.setScalar(0.55); tn.position.set(0, 2.66, 0.03); scene.add(tn);
    // the TV: the player's shop name
    const tvx = 1.75, tvy = 2.3;
    const tvB = mesh(rbox(0.98, 0.58, 0.05, 0.015), M.blackGloss()); tvB.position.set(tvx, tvy, 0.05); scene.add(tvB);
    const st = tex(nameCanvas(info.name, info.year));
    const scr = mesh(new THREE.PlaneGeometry(0.94, 0.53), new THREE.MeshStandardMaterial({ map: st, emissive: '#ffffff', emissiveMap: st, emissiveIntensity: 0.9, roughness: 0.15 }), false, false);
    scr.position.set(tvx, tvy, 0.077); scene.add(scr);
    const tl = new THREE.PointLight('#ffe2b0', 0.4, 1.5, 2); tl.position.set(tvx, tvy, 0.35); scene.add(tl);
    hot.tv = new THREE.Vector3(tvx, tvy, 0.08);
    // the tool wall
    const peg = mesh(rbox(1.0, 0.62, 0.025, 0.01), new THREE.MeshStandardMaterial({ map: tex(TEX.peg()), roughness: 0.8 })); peg.position.set(1.75, 1.45, 0.03); scene.add(peg);
    ['carbon', 'flame', 'chrome', 'gold'].forEach((f, i) => { const c = clipper(f); c.scale.setScalar(1.9); c.position.set(1.38 + i * 0.24, 1.2, 0.08); c.rotation.y = -0.15; scene.add(c); });
    // decor: a style chart, a big plant or a framed indigo cloth
    const px = 2.75;
    if (P.decor === 'plant') { const bp = plant(1.15); bp.position.set(px, wainH + 0.02, 0.25); scene.add(bp); }
    else { const pf = mesh(rbox(0.56, 0.78, 0.04, 0.01), frameMat); pf.position.set(px, 1.85, 0.03); scene.add(pf); const pi = mesh(new THREE.PlaneGeometry(0.48, 0.7), new THREE.MeshStandardMaterial({ map: tex(P.decor === 'indigo' ? TEX.indigo() : TEX.chart()), roughness: 0.7 }), false, false); pi.position.set(px, 1.85, 0.055); scene.add(pi); }
    hot.decor = new THREE.Vector3(px, 1.85, 0.06);
    // the second chair and the waiting bench
    const ch = chair(PARTS.chair[P.chair], P.mirror === 'brass' && P.chair === 'black' ? 'gold' : 'chrome'); ch.position.set(2.5, 0, 0.6); ch.rotation.y = -0.75; scene.add(ch);
    hot.chair = new THREE.Vector3(2.5, 0.9, 0.6);
    const bm = M.leather(PARTS.chair[P.chair]);
    const bench = mesh(rbox(1.1, 0.12, 0.42, 0.05), bm); bench.position.set(-2.35, 0.48, 0.3); scene.add(bench);
    const bb = mesh(rbox(1.1, 0.45, 0.1, 0.05), bm); bb.position.set(-2.35, 0.78, 0.1); scene.add(bb);
    for (const x of [-2.8, -1.9]) { const leg = mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.42, 10), M.chrome()); leg.position.set(x, 0.21, 0.3); scene.add(leg); }
    // the mat in front of the station
    const mc = PARTS.mat[P.mat];
    if (mc) { const mm = mc === 'indigo' ? new THREE.MeshStandardMaterial({ map: tex(TEX.indigo(), [2, 1]), roughness: 0.95 }) : new THREE.MeshStandardMaterial({ color: mc, roughness: 0.85 }); const mt = mesh(rbox(1.5, 0.012, 0.9, 0.005), mm, false, true); mt.position.set(0, 0.006, 1.3); scene.add(mt); }
    hot.mat = new THREE.Vector3(0.45, 0.02, 1.0);
    hot.floor = new THREE.Vector3(-1.0, 0, 0.75);
    hot.wall = new THREE.Vector3(-0.85, 2.55, 0.02);
    hot.lower = new THREE.Vector3(-0.6, 0.5, 0.06);
    // pendants on cords from the ceiling, above the picture's top edge; their light still falls on the wall
    for (const x of [-2.2, 0, 2.2]) {
      const pd = hung(P.lights); pd.position.set(x, Hc - pd.userData.hang, 1.0); scene.add(pd);
      const sl = new THREE.SpotLight(P.lights === 'lantern' ? '#ffc98a' : '#ffe2b8', 2.6, 6, 0.95, 0.85, 2); sl.position.set(x, pd.position.y - 0.1, 1.0); sl.target.position.set(x * 0.9, 1.2, 0);
      sl.castShadow = info.shadows; sl.shadow.mapSize.set(512, 512); sl.shadow.bias = -0.0005; scene.add(sl); scene.add(sl.target);
    }
    hot.lights = new THREE.Vector3(0, 2.9, 0.4);
    // daylight
    scene.add(new THREE.HemisphereLight('#eaf4ff', '#d9c9b0', 0.85));
    const key = new THREE.DirectionalLight('#fff4e4', 1.1); key.position.set(1.2, 3.2, 5); key.target.position.set(0, 1.2, 0); key.castShadow = info.shadows; key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -4, right: 4, top: 3.5, bottom: -0.5 }); key.shadow.bias = -0.0005; scene.add(key); scene.add(key.target);
    const sun = new THREE.SpotLight('#fff3d6', 3, 5, 0.9, 0.9, 1.5); sun.position.set(-2.0, 2.0, -0.6); sun.target.position.set(-1.2, 0.6, 2); scene.add(sun); scene.add(sun.target);
    return hot;
  }

  // ---- views (cameras); the backdrop views start at the moulding above the mirror (owner, 5 November 2026) ----
  const VIEWS = {
    land: { pos: [0, 1.42, 5.0], look: [0, 1.48, 0], fov: 33 },
    port: { pos: [0.1, 1.2, 4.9], look: [0.95, 0.98, 0], fov: 44 },
    shop: { pos: [0.1, 1.5, 5.0], look: [0.1, 1.5, 0], fov: 46.6 },
    floor: { pos: [0.5, 2.35, 3.6], look: [0.3, 0.55, 0.6], fov: 52 },
    thumb: { pos: [0, 1.55, 4.2], look: [0, 1.7, 0], fov: 42 },
    // the Home screen: the whole shop, wide and unzoomed, with no customer
    homeP: { pos: [-0.9, 1.75, 6.6], look: [1.25, 0.72, 0], fov: 62 },
    homeL: { pos: [0.1, 1.42, 6.2], look: [0.1, 0.72, 0], fov: 42 },
    // the shop screen moves to the part being changed
    chair: { pos: [1.2, 1.35, 3.6], look: [2.3, 0.85, 0.5], fov: 40 },
    decor: { pos: [1.6, 1.5, 4.0], look: [2.7, 1.55, 0.1], fov: 38 },
    lights: { pos: [0.3, 1.5, 4.6], look: [0, 2.45, 0.8], fov: 46 },
  };

  // ---- rendering: one small offscreen renderer, scenes cached by look ----
  let R = null, envTex = null, releaseSnapshot = 0;
  const cache = new Map();
  function renderer() {
    HSC.lifecycle.clear(releaseSnapshot);
    releaseSnapshot = 0;
    if (R) return R;
    const c = document.createElement('canvas');
    R = new THREE.WebGLRenderer({ canvas: c, antialias: !HSC.detail.constrained, alpha: false, preserveDrawingBuffer: false, powerPreference: 'low-power' });
    R.setPixelRatio(1); R.shadowMap.enabled = !HSC.detail.constrained; R.shadowMap.type = THREE.PCFSoftShadowMap;
    R.toneMapping = THREE.ACESFilmicToneMapping; R.toneMappingExposure = 1.05;
    const pm = new THREE.PMREMGenerator(R); envTex = pm.fromScene(new THREE.RoomEnvironment(), 0.04).texture; pm.dispose();
    // This renderer is disposable: a lost context is replaced by a fresh canvas on the next picture. Do not cancel
    // the event, because canceling asks the browser to restore GPU resources that drop() has deliberately retired.
    c.addEventListener('webglcontextlost', () => { if (R?.domElement === c) drop(true); });
    return R;
  }
  function disposeScene(s) { s.traverse((o) => { if (o.geometry) o.geometry.dispose(); const ms = o.material ? [].concat(o.material) : []; for (const m of ms) { for (const k in m) if (m[k] && m[k].isTexture) m[k].dispose(); m.dispose(); } }); }
  function drop(contextAlreadyLost = false) {
    HSC.lifecycle.clear(releaseSnapshot);
    releaseSnapshot = 0;
    for (const v of cache.values()) disposeScene(v.scene);
    cache.clear();
    if (envTex) envTex.dispose();
    envTex = null;
    if (backdrop) backdrop.dispose();
    backdrop = null;
    if (R) {
      const old = R; R = null;
      old.dispose();
      // dispose() releases Three.js objects; explicitly losing the offscreen context also returns its driver-side
      // buffers immediately. Its output has already been copied to a 2D canvas, so this cannot alter the picture.
      if (!contextAlreadyLost && old.forceContextLoss) old.forceContextLoss();
      old.domElement.width = old.domElement.height = 1;
    }
  }
  function sceneFor(parts, info) {
    const key = JSON.stringify([parts, info.name, info.year, info.shadows]);
    if (cache.has(key)) { const v = cache.get(key); cache.delete(key); cache.set(key, v); return v; }
    seed = 7;
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#e9e2d6'); scene.environment = envTex; scene.environmentIntensity = 0.4;
    const hot = buildRoom(scene, parts, info);
    const v = { scene, hot };
    cache.set(key, v);
    while (cache.size > (HSC.detail.mobile ? 1 : 3)) { const [k0, v0] = cache.entries().next().value; disposeScene(v0.scene); cache.delete(k0); }
    return v;
  }
  // render a view of a look into a new 2D canvas; returns { canvas, hot } (hot spots in canvas pixels)
  function render(parts, view, w, h, info = {}) {
    const r = renderer();
    const { scene, hot } = sceneFor(parts, Object.assign({ name: '', year: 0, shadows: true }, info));
    const V = VIEWS[view] || VIEWS.land, cam = new THREE.PerspectiveCamera(V.fov, w / h, 0.05, 40);
    cam.position.set(...V.pos); cam.lookAt(...V.look); cam.updateMatrixWorld(true);
    const out = document.createElement('canvas'); out.width = w; out.height = h;
    const paint = out.getContext('2d');
    // Keep the finished picture at its exact requested resolution, but tile large snapshots so the second WebGL
    // context never asks weak drivers for a full 1080p drawing buffer beside the live haircut renderer.
    const tile = 1024;
    if (w * h <= tile * tile) {
      r.setSize(w, h, false); r.render(scene, cam); paint.drawImage(r.domElement, 0, 0);
    } else {
      const overlap = 2;
      for (let y = 0; y < h; y += tile) for (let x = 0; x < w; x += tile) {
        const x0 = Math.max(0, x - overlap), y0 = Math.max(0, y - overlap);
        const x1 = Math.min(w, x + Math.min(tile, w - x) + overlap);
        const y1 = Math.min(h, y + Math.min(tile, h - y) + overlap);
        const tw = x1 - x0, th = y1 - y0;
        cam.setViewOffset(w, h, x0, y0, tw, th);
        r.setSize(tw, th, false); r.render(scene, cam);
        paint.drawImage(r.domElement, 0, 0, tw, th, x0, y0, tw, th);
      }
      cam.clearViewOffset();
    }
    const pts = {};
    for (const [n, p] of Object.entries(hot)) { const q = p.clone().project(cam); pts[n] = [((q.x + 1) / 2) * w, ((1 - q.y) / 2) * h, q.z < 1]; }
    return { canvas: out, hot: pts };
  }
  function renderOnce(parts, view, w, h, info = {}) {
    try {
      const snapshot = render(parts, view, w, h, info);
      if (HSC.detail.constrained) drop();
      else releaseSnapshot = HSC.lifecycle.timeout(drop, 950);
      return snapshot;
    } catch (error) {
      drop();
      throw error;
    }
  }
  // a small product picture of one part option (for the shop's cards), transparent background
  const thumbs = new Map();
  function thumb(slot, opt, size = 160) {
    const k = slot + ':' + opt + ':' + size;
    if (thumbs.has(k)) return thumbs.get(k);
    let url;
    const flat = (c) => { const o = document.createElement('canvas'); o.width = o.height = size; const x = o.getContext('2d'); x.drawImage(c, 0, 0, size, size); return o.toDataURL('image/jpeg', 0.86); };
    if (slot === 'wall') url = flat(PARTS.wall[opt]());
    else if (slot === 'floor') url = flat(PARTS.floor[opt]()[0]);
    else if (slot === 'lower') { const p = PARTS.lower[opt]; url = flat(p.kind === 'tile' ? p.t() : p.kind === 'wood' ? TEX.wood(p.c[0], p.c[1]) : TEX.plaster(p.c, 'rgba(0,0,0,0.05)')); }
    else if (slot === 'mat') { const m = PARTS.mat[opt]; url = m === null ? '' : flat(m === 'indigo' ? TEX.indigo() : TEX.plaster(m, 'rgba(0,0,0,0.08)')); }
    else {
      // 3D product shot
      const r = renderer(), scene = new THREE.Scene(); scene.environment = envTex; scene.environmentIntensity = 0.9;
      let o;
      if (slot === 'chair') o = chair(PARTS.chair[opt], 'chrome');
      else if (slot === 'lights') o = pendant(opt);
      else if (slot === 'mirror') { o = new THREE.Group(); o.add(mirrorModel(0.6, 0.8, PARTS.mirror[opt]())); }
      else if (slot === 'decor') o = opt === 'plant' ? plant(1) : (() => { const g = new THREE.Group(); g.add(mesh(rbox(0.56, 0.78, 0.04, 0.01), M.brass())); const pi = mesh(new THREE.PlaneGeometry(0.48, 0.7), new THREE.MeshStandardMaterial({ map: tex(opt === 'indigo' ? TEX.indigo() : TEX.chart()) })); pi.position.z = 0.025; g.add(pi); return g; })();
      else if (slot === 'shelf') { o = new THREE.Group(); const S2 = { classic: ['#2f8f55', '#b8322a'], coastal: ['#4aa0d8', '#2a4a8a'], vintage: ['#7a3a1a', '#1f3b2c'] }[opt]; const b = bottle(S2[0], M.blackGloss(), TEX.label('#f4efe4', '#222', ' ', S2[0]), 0.22); b.position.x = -0.04; o.add(b); const t = tin(TEX.label(S2[1], '#fff', ' ', '#f2d27a')); t.position.x = 0.05; o.add(t); }
      scene.add(o);
      scene.add(new THREE.HemisphereLight('#ffffff', '#776655', 0.8));
      const dl = new THREE.DirectionalLight('#fff4e6', 2); dl.position.set(-1.2, 2.4, 1.6); scene.add(dl);
      const box = new THREE.Box3().setFromObject(o), c = box.getCenter(new THREE.Vector3()), s = box.getSize(new THREE.Vector3()), R0 = Math.max(s.x, s.y, s.z);
      o.rotation.y = slot === 'mirror' || slot === 'decor' ? 0 : -0.5;
      const cam = new THREE.PerspectiveCamera(30, 1, 0.01, 20); const d = (R0 * 0.62) / Math.tan(THREE.MathUtils.degToRad(15));
      cam.position.set(c.x, c.y + d * 0.15, c.z + d); cam.lookAt(c); cam.updateMatrixWorld(true);
      r.setClearColor(0x000000, 0); r.setSize(size, size, false); scene.background = null; r.render(scene, cam);
      url = r.domElement.toDataURL('image/png');
      disposeScene(scene);
    }
    thumbs.set(k, url);
    return url;
  }
  // ---- the store's product shots: a clipper or a gown from its design, lit like the shop, on a studio backdrop ----
  const shots = new Map();
  let backdrop = null;
  function studio() {
    if (backdrop) return backdrop;
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const x = c.getContext('2d'), g = x.createRadialGradient(128, 104, 10, 128, 128, 190);
    g.addColorStop(0, '#ffffff'); g.addColorStop(0.55, '#e4f1fb'); g.addColorStop(1, '#a9cdf0');
    x.fillStyle = g; x.fillRect(0, 0, 256, 256);
    backdrop = new THREE.CanvasTexture(c); backdrop.colorSpace = THREE.SRGBColorSpace;
    return backdrop;
  }
  function pattern(name, a, b, rep) {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    HSC.drawPattern(c.getContext('2d'), 256, name, a, b, 11);
    return tex(c, rep);
  }
  function clipperShot(p, C) {
    const hex = (id) => C.colourHex.get(id) || '#888888', fin = C.finishes.get(p.finish) || C.finishes.get('chrome');
    const g = new THREE.Group(), W1 = 0.03, W2 = 0.023, H = 0.17, s = new THREE.Shape();
    s.moveTo(-W2, 0); s.lineTo(W2, 0); s.quadraticCurveTo(W2 + 0.006, 0.01, W2 + 0.005, 0.03); s.lineTo(W1, H - 0.012); s.quadraticCurveTo(W1, H, W1 - 0.012, H);
    s.lineTo(-W1 + 0.012, H); s.quadraticCurveTo(-W1, H, -W1, H - 0.012); s.lineTo(-W2 - 0.005, 0.03); s.quadraticCurveTo(-W2 - 0.006, 0.01, -W2, 0);
    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.011, bevelSize: 0.009, bevelSegments: 6, curveSegments: 14 });
    geo.translate(0, 0, -0.015);
    const pos = geo.attributes.position, uv = geo.attributes.uv; for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + 0.04) / 0.08, pos.getY(i) / H);
    g.add(mesh(geo, new THREE.MeshPhysicalMaterial({ map: pattern(p.pattern, hex(p.body), hex(p.accent), [1, 2]), roughness: 0.34, clearcoat: 1, clearcoatRoughness: 0.18 })));
    const metal = (c) => new THREE.MeshStandardMaterial({ color: c, metalness: Math.max(0.6, fin.metal), roughness: Math.min(0.4, fin.rough) });
    const head = mesh(rbox(0.074, 0.026, 0.05, 0.008), metal(fin.light)); head.position.set(0, H + 0.02, 0); g.add(head);
    const base = mesh(rbox(0.078, 0.009, 0.016, 0.003), metal(fin.dark)); base.position.set(0, H + 0.036, 0.008); g.add(base);
    for (let i = 0; i < 19; i++) { const t = mesh(new THREE.BoxGeometry(0.0022, 0.01, 0.006), metal(fin.light)); t.position.set(-0.036 + i * 0.004, H + 0.045, 0.01); g.add(t); }
    const acc = new THREE.MeshPhysicalMaterial({ color: hex(p.accent), roughness: 0.3, clearcoat: 1 });
    const sw = mesh(rbox(0.018, 0.036, 0.012, 0.006), acc); sw.position.set(0, 0.112, 0.029); g.add(sw);
    for (const sd of [-1, 1]) { const gr = mesh(rbox(0.008, 0.09, 0.006, 0.003), acc); gr.position.set(sd * 0.03, 0.08, 0.024); g.add(gr); }
    g.rotation.set(-0.12, -0.5, -0.32);
    return g;
  }
  // the gown as it is in the game (gown.js), on a plain form, turned to show its neck and closure
  const made = new WeakMap();
  function gownGeo(g) {
    if (made.has(g)) return made.get(g);
    const o = new THREE.BufferGeometry();
    o.setAttribute('position', new THREE.BufferAttribute(g.pos, 3)); o.setAttribute('uv', new THREE.BufferAttribute(g.uv, 2)); o.setIndex(g.ix); o.computeVertexNormals();
    o.userData.keep = true; made.set(g, o);
    return o;
  }
  const PART = { paper: ['#f6f3ec', 0, 0.88], metal: ['#aab1b9', 0.6, 0.34], dark: ['#17191d', 0, 0.42], loop: ['#c9ccd0', 0, 0.95] };
  function gownShot(d, C) {
    const p = d.parts, hex = (id) => C.colourHex.get(id) || '#888888', s = HSC.gownShape(HSC.gownCut(d)), g = new THREE.Group();
    const tall = p.pattern === 'yoke' || p.pattern === 'fade';
    const std = (c, metal, rough) => new THREE.MeshStandardMaterial({ color: c, metalness: metal, roughness: rough, side: THREE.DoubleSide });
    const cloth = new THREE.MeshStandardMaterial({ map: pattern(p.pattern, hex(p.main), hex(p.second), tall ? [6, 1] : [6, 1.4]), roughness: 0.62, side: THREE.DoubleSide });
    g.add(new THREE.Mesh(gownGeo(s.cloth), cloth));
    g.add(new THREE.Mesh(gownGeo(s.band), std(s.colour === 'main' ? hex(p.main) : hex(p.collar), 0, s.tex === 'terry' ? 0.96 : s.tex === 'smooth' ? 0.42 : 0.62)));
    for (const x of s.parts) { const k = PART[x.kind], c = x.kind === 'self' ? hex(p.main) : x.kind === 'trim' ? hex(p.collar) : k[0]; g.add(new THREE.Mesh(gownGeo(x.grid), std(c, k ? k[1] : 0, k ? k[2] : 0.6))); }
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.25, 1.1, 40), std('#8e99a6', 0, 0.7));
    neck.position.set(0, -0.72, -0.35); g.add(neck);
    g.rotation.set(0.1, Math.PI - 0.55, 0);
    g.scale.setScalar(0.2);
    return g;
  }
  function item(d, size = 128) {
    // The catalogue already has a lightweight 2D renderer. On phones it is safer and faster than creating a second
    // WebGL context beside the live customer just to draw a cosmetic card.
    if (HSC.detail.constrained) throw new Error('constrained devices use 2D product art');
    const k = d.key + ':' + size;
    if (shots.has(k)) { const v = shots.get(k); shots.delete(k); shots.set(k, v); return v; }
    const r = renderer(), C = HSC.catalog, scene = new THREE.Scene(); scene.environment = envTex; scene.environmentIntensity = 0.85; scene.background = studio();
    const o = d.tool === 'clipper' ? clipperShot(d.parts, C) : gownShot(d, C);
    scene.add(o);
    scene.add(new THREE.HemisphereLight('#ffffff', '#99aabb', 0.7));
    const dl = new THREE.DirectionalLight('#fff4e6', 2); dl.position.set(-1.2, 2.4, 2); scene.add(dl);
    const box = new THREE.Box3().setFromObject(o), c = box.getCenter(new THREE.Vector3()), s = box.getSize(new THREE.Vector3()), R0 = Math.max(s.x, s.y);
    const cam = new THREE.PerspectiveCamera(28, 1, 0.01, 20), dist = (R0 * 0.6) / Math.tan(THREE.MathUtils.degToRad(14));
    cam.position.set(c.x, c.y + dist * 0.08, c.z + dist); cam.lookAt(c); cam.updateMatrixWorld(true);
    r.setSize(size, size, false); r.render(scene, cam);
    const url = r.domElement.toDataURL('image/jpeg', 0.88);
    scene.background = null;
    scene.traverse((x) => { if (x.geometry && !x.geometry.userData.keep) x.geometry.dispose(); if (x.material) { if (x.material.map) x.material.map.dispose(); x.material.dispose(); } });
    shots.set(k, url);
    // Data-URL product shots live in both JS and WebView image memory. Forty-eight covers the selected item, every
    // card on two phone screens and the two bundle previews, while preventing catalogue browsing from retaining
    // hundreds of decoded textures on potato devices. Evicted shots are regenerated without changing catalogue art.
    while (shots.size > 48) shots.delete(shots.keys().next().value);
    return url;
  }
  HSC.shop3d = { SLOTS, PARTS, OPTIONS, REGIONS, VIEWS, render, renderOnce, thumb, item, nameCanvas, drop, ok: () => { try { renderer(); return true; } catch (e) { return false; } } };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1; owner-approved Option 1 "Your Shop", 5 November 2026): the player's
// barbershop. The shop behind the customer is rendered in 3D (shop3d.js), light and in daylight, and softened like
// the original backdrop picture. It is modular: one choice per slot (wall, panels, floor, mat, mirror, lights,
// shelf, chair, decor), bought with coins on the economy's renovation curve (100 / 300 / 800 / 1750), and whole
// regional shops (the same base with local materials) for the price of the parts not owned yet. The TV shows the player's shop name, set in
// Settings; the first customer of a session opens on the shop with its name. No sponsored content.
// The game's renderer, camera and controls are untouched: only the picture behind them changes.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const KEY = 'skin-fade-studio-salon-v1';
  const K = '#10223f';
  const M = () => HSC.meta, S3 = () => HSC.shop3d;
  const t = (k) => (HSC.t ? HSC.t(k) : k);
  const I = (n, s) => (HSC.icon ? HSC.icon(n, s) : '');
  const PRICE = (HSC.economy && HSC.economy.CONFIG.salon) || [100, 300, 800, 1750];
  const NAME_MAX = 16;
  const SLOTS = ['wall', 'lower', 'floor', 'mat', 'mirror', 'lights', 'shelf', 'chair', 'decor'];
  // the options of each slot, in price order (the first is free and always owned); kept here so the save can be
  // checked without the 3D module
  const OPTIONS = {
    wall: ['deco', 'plaster', 'subway', 'mint', 'blush', 'ochre', 'hinoki'],
    lower: ['oak', 'walnut', 'navy', 'teal', 'sage', 'stone', 'talavera', 'iznik'],
    floor: ['checker', 'herringbone', 'terrazzo', 'cement', 'terracotta', 'stone'],
    mat: ['black', 'jute', 'red', 'indigo', 'none'],
    mirror: ['brass', 'oak', 'black', 'white'],
    lights: ['industrial', 'globe', 'lantern'],
    shelf: ['classic', 'coastal', 'vintage'],
    chair: ['oxblood', 'black', 'cream', 'green', 'mustard', 'navy'],
    decor: ['chart', 'plant', 'indigo'],
  };
  const REGION_IDS = ['classic', 'london', 'tokyo', 'lagos', 'istanbul', 'mexico', 'mumbai'];
  const priceOf = (slot, opt) => { const i = OPTIONS[slot].indexOf(opt); return i <= 0 || opt === 'none' ? 0 : PRICE[Math.min(i - 1, PRICE.length - 1)]; };
  const regionParts = (id) => { const r = S3() && S3().REGIONS[id]; if (!r) return null; const o = {}; for (const k of SLOTS) o[k] = r[k]; return o; };

  // ---- the save ----
  let S = null, client = null;
  const defaults = () => ({ wall: 'deco', lower: 'oak', floor: 'checker', mat: 'black', mirror: 'brass', lights: 'industrial', shelf: 'classic', chair: 'oxblood', decor: 'chart' });
  const fresh = () => ({ v: 2, region: 'classic', parts: defaults(), owned: Object.fromEntries(SLOTS.map((k) => [k, [OPTIONS[k][0]]])), regions: ['classic'], name: '', year: 0 });
  // the original 2D salon (v1): six slots with four upgrades, three shops; what was bought carries over as the
  // matching options of the same slots (and a finished shop owns all four of every slot)
  const V1 = { wall: 'wall', lower: 'lower', mirror: 'mirror', lights: 'lights', shelf: 'shelf', decor: 'decor' };
  function migrate(d) {
    const s = fresh();
    const done = Number.isInteger(d.shop) && d.shop > 0;
    for (const [old, slot] of Object.entries(V1)) {
      const tier = done ? 4 : Math.max(0, Math.min(4, d.tier && Number.isInteger(d.tier[old]) ? d.tier[old] : 0));
      const opts = OPTIONS[slot].slice(0, Math.min(tier, OPTIONS[slot].length - 1) + 1);
      s.owned[slot] = opts;
      s.parts[slot] = opts[opts.length - 1];
    }
    s.region = '';
    return s;
  }
  function cleanName(v) {
    if (typeof v !== 'string') return '';
    let n = v.normalize('NFC').replace(/[\u0000-\u001f\u007f-\u009f‎‏‪-‮⁦-⁩]/g, '').replace(/\s+/g, ' ').trim();
    const g = typeof Intl !== 'undefined' && Intl.Segmenter ? [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(n)].map((x) => x.segment) : Array.from(n);
    if (g.length > NAME_MAX) n = g.slice(0, NAME_MAX).join('').trim();
    return blocked(n) ? '' : n;
  }
  const graphemes = (n) => (typeof Intl !== 'undefined' && Intl.Segmenter ? [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(n)].length : Array.from(n).length);
  // a short list of the most common insults and slurs in the game's languages (the name shows on the player's
  // own screen and in their shared pictures)
  const BAD = ['fuck', 'shit', 'cunt', 'nigg', 'fag', 'bitch', 'whore', 'slut', 'rape', 'nazi', 'hitler', 'puta', 'mierda', 'pendej', 'caralh', 'porra', 'merde', 'salope', 'encul', 'fick', 'hure', 'scheiss', 'kahpe', 'orospu', 'sik', 'amk', 'блять', 'бля', 'хуй', 'пизд', 'сука', 'كس', 'شرموط', 'زب', 'चूत', 'भोसड', 'मादरचोद', 'kontol', 'anjing', 'ngentot', '씨발', '병신', 'クソ', 'ちんこ', 'まんこ'];
  function blocked(n) { const s = n.toLowerCase().replace(/[\s._\-*0]/g, (c) => (c === '0' ? 'o' : '')); return BAD.some((w) => s.includes(w)); }
  function sanitize(d) {
    if (!d || typeof d !== 'object') return fresh();
    if (d.v === 1) return migrate(d);
    if (d.v !== 2) return fresh();
    const s = fresh();
    for (const k of SLOTS) {
      const own = Array.isArray(d.owned && d.owned[k]) ? d.owned[k].filter((o) => OPTIONS[k].includes(o)) : [];
      s.owned[k] = [...new Set([OPTIONS[k][0], ...own])];
      const p = d.parts && d.parts[k];
      s.parts[k] = s.owned[k].includes(p) ? p : OPTIONS[k][0];
    }
    s.regions = [...new Set(['classic', ...(Array.isArray(d.regions) ? d.regions.filter((r) => REGION_IDS.includes(r)) : [])])];
    s.region = REGION_IDS.includes(d.region) ? d.region : '';
    s.name = cleanName(d.name);
    s.year = Number.isInteger(d.year) && d.year >= 2024 && d.year < 2200 ? d.year : 0;
    return s;
  }
  const save = () => { if (client && client.saveProgress && S) client.saveProgress(KEY, S).catch(() => {}); };
  const coins = () => (HSC.coins ? HSC.coins.get() : 0);

  // ---- the salon on show: the founding salon (S) or a career branch (career-run.js) ----
  const cur = () => S;
  const keep = () => save();

  // ---- buying and choosing ----
  const owns = (slot, opt) => priceOf(slot, opt) === 0 || S.owned[slot].includes(opt);
  function equip(slot, opt) { if (!owns(slot, opt)) return false; cur().parts[slot] = opt; cur().region = ''; keep(); changed(); return true; }
  async function buyPart(slot, opt) {
    if (owns(slot, opt)) return equip(slot, opt);
    const price = priceOf(slot, opt);
    if (coins() < price) return false;
    const ok = await (HSC.coins.buyItem || HSC.coins.spend)(price, 'salon', 'salon:part:' + slot + ':' + opt);
    if (!ok) return false;
    if (!owns(slot, opt)) S.owned[slot].push(opt);
    return equip(slot, opt);
  }
  function useRegion(id) {
    if (!S.regions.includes(id)) return false;
    const p = regionParts(id);
    for (const k of SLOTS) { if (!owns(k, p[k])) S.owned[k].push(p[k]); cur().parts[k] = p[k]; }
    cur().region = id; keep(); changed(); return true;
  }
  // a regional shop is a one-tap bundle of its parts: it costs exactly the parts not owned yet, at their own prices
  // (owner decision 5 November 2026: no shop cheaper than its parts, and no single price beyond the part curve's)
  function regionPrice(id) {
    const p = regionParts(id);
    if (!p || !S) return 0;
    return SLOTS.reduce((a, k) => a + (owns(k, p[k]) ? 0 : priceOf(k, p[k])), 0);
  }
  async function buyRegion(id) {
    if (S.regions.includes(id)) return useRegion(id);
    const price = regionPrice(id);
    if (coins() < price) return false;
    const ok = price ? await (HSC.coins.buyItem || HSC.coins.spend)(price, 'salon', 'salon:shop:' + id) : true;
    if (!ok) return false;
    if (!S.regions.includes(id)) S.regions.push(id);
    return useRegion(id);
  }
  // the unowned salon items, cheapest first (parts only: a shop is a bundle of them)
  function targets() {
    const out = [];
    for (const k of SLOTS) OPTIONS[k].forEach((o, i) => { if (i > 0 && !owns(k, o)) out.push({ key: 'salon:part:' + k + ':' + o, price: priceOf(k, o), slot: k }); });
    return out.sort((a, b) => a.price - b.price);
  }
  function setName(v) {
    let n = cleanName(v);
    if (n === t('shopname')) n = '';
    if (n === S.name) return n;
    S.name = n;
    if (!S.year) S.year = new Date().getFullYear();
    save(); changed();
    return n;
  }
  // what the career journal says was bought (career-run.js buyItem) is owned, even if this shop save was not
  // written after the purchase (a crash between the two writes); returns true when something was restored
  function reconcile() {
    if (!S || !HSC.econ || !HSC.econ.ready || !HSC.econ.ready() || !HSC.econ.entitlements) return false;
    let fixed = false;
    for (const k of HSC.econ.entitlements()) {
      const p = k.split(':');
      if (p[0] !== 'salon') continue;
      if (p[1] === 'part' && OPTIONS[p[2]] && OPTIONS[p[2]].includes(p[3]) && !owns(p[2], p[3])) { S.owned[p[2]].push(p[3]); fixed = true; }
      if (p[1] === 'shop' && REGION_IDS.includes(p[2]) && !S.regions.includes(p[2])) { S.regions.push(p[2]); fixed = true; }
    }
    if (fixed) save();
    return fixed;
  }
  // the neon colours come with the shop's region (or the classic ones for a mixed shop)
  const look = (parts) => Object.assign({}, parts || cur().parts, { neon: (S3() && S3().REGIONS[cur().region || 'classic'] || {}).neon || ['#ff3d9a', '#3df2ff'] });
  // until the player names it, the shop carries a default name in their language (labels.js 'shopname')
  const shown = () => S.name || t('shopname');
  const info = () => ({ name: shown(), year: S.year });

  // ---- the backdrop behind the customer ----
  const isClassicRoom = () => !S.name && (!cur().region || cur().region === 'classic') &&
    SLOTS.every(slot => cur().parts[slot] === OPTIONS[slot][0]);
  let applied = null, pending = 0, failed = false;
  function changed() { applied = null; schedule(); ui.refresh(); }
  function schedule() { HSC.lifecycle.clear(pending); pending = HSC.lifecycle.timeout(apply, 120); }
  function apply() {
    const root = document.querySelector('.game-root');
    if (!root || !S) return;
    // A second WebGL scene beside the live haircut renderer is the riskiest path on low-memory phones. The salon
    // editor still previews the player's choices, but gameplay and Home use the shipped room artwork on mobile.
    if (isClassicRoom() || HSC.detail.constrained) {
      if (applied !== 'classic') {
        root.classList.add('hsc-classic-room');
        root.style.removeProperty('background-image');
        applied = 'classic';
      }
      return;
    }
    if (failed || !S3()) return;
    const land = innerWidth > innerHeight, key = land + JSON.stringify([cur().parts, cur().region, shown(), S.year]);
    if (applied === key) return;
    if (HSC.activeHaircutGesture?.()) { schedule(); return; }
    try {
      // drawn small and softened: the haircut stays the sharpest thing on screen
      const long = HSC.detail.mobile ? 840 : 1100, short = HSC.detail.mobile ? 388 : 508;
      const w = land ? long : short, h = land ? short : long;
      const r = S3().renderOnce(look(), land ? 'land' : 'port', w, h, info());
      const b = document.createElement('canvas'); b.width = w; b.height = h;
      const d = b.getContext('2d');
      if ('filter' in d) d.filter = 'blur(2.5px)';
      d.drawImage(r.canvas, 0, 0);
      root.style.backgroundImage = `url("${b.toDataURL('image/jpeg', 0.86)}")`;
      root.classList.remove('hsc-classic-room');
      applied = key;
    } catch (e) { failed = true; console.warn('shop: 3D backdrop unavailable; keeping the picture', e); }
  }

  // ---- the shop screen ----
  const CSS = `
#hsc-salon-btn{padding:0}
#hsc-salon{position:fixed;inset:0;z-index:30;display:none;font-family:"Arial Rounded MT Bold","Nunito","Baloo 2",system-ui,sans-serif;color:${K};touch-action:manipulation;-webkit-user-select:none;user-select:none;background:#e9e2d6;overflow:hidden}
#hsc-salon.open{display:block}
#hsc-salon .view{position:absolute;left:0;top:0;right:0;overflow:hidden}
#hsc-salon .view img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity .25s}
#hsc-salon .view img.busy{opacity:.75}
/* the controls are zoomed by the UI scale, and inside a zoom env() is zoomed too: each inset is divided back by the
   scale (--il/--ir/--it/--ib, the true insets). --sw, the side sheet's width on a wide screen, is set by layout() */
#hsc-salon .sui,#hsc-reveal .sui{--il:calc(env(safe-area-inset-left) / var(--hsc-s,1));--ir:calc(env(safe-area-inset-right) / var(--hsc-s,1));--it:calc(env(safe-area-inset-top) / var(--hsc-s,1));--ib:calc(env(safe-area-inset-bottom) / var(--hsc-s,1))}
#hsc-salon .sui{position:absolute;inset:0;zoom:var(--hsc-s,1);pointer-events:none}
#hsc-salon .sui > *{pointer-events:auto}
#hsc-salon .j{position:relative;border:3px solid ${K};border-radius:20px;box-shadow:inset 0 -6px 0 #0003,inset 0 3px 0 #fff6,0 5px 0 ${K},0 8px 12px #0004;color:${K};font:inherit;font-weight:900;display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;padding:0 12px}
#hsc-salon .j:active{transform:translateY(4px);box-shadow:inset 0 -3px 0 #0003,inset 0 3px 0 #fff6,0 1px 0 ${K}}
#hsc-salon .j:disabled{filter:grayscale(.5);opacity:.6}
#hsc-salon .c-white{background:linear-gradient(#fff,#dfe8f4)}#hsc-salon .c-yellow{background:linear-gradient(#ffe682,#ffb21a)}#hsc-salon .c-green{background:linear-gradient(#9cf06c,#36b83a)}
/* the back button, the title and the coins: on a narrow picture the coins wrap under the title rather than push the
   back button off the screen or slide under the sheet */
#hsc-salon .bar{position:absolute;left:max(12px,var(--il));right:max(12px,var(--ir));top:max(12px,var(--it));display:flex;flex-wrap:wrap;align-items:center;gap:8px;pointer-events:none}
#hsc-salon .bar > *{pointer-events:auto}
#hsc-salon .x{width:52px;height:52px;border-radius:50%;padding:0}
#hsc-salon .x .hsc-ic{width:30px;height:30px}
#hsc-salon .title{display:flex;align-items:center;gap:6px;color:#fff;font-size:26px;-webkit-text-stroke:5px ${K};paint-order:stroke fill;text-shadow:0 3px 0 ${K}}
#hsc-salon .title .hsc-ic{width:38px;height:38px}
#hsc-salon .grow{flex:1}
#hsc-salon .chip{display:flex;align-items:center;gap:6px;height:44px;padding:0 14px 0 6px;border-radius:22px;background:#10223fcc;border:2px solid #ffffff30;color:#fff;font-size:18px;font-variant-numeric:tabular-nums}
#hsc-salon .chip .hsc-ic{width:32px;height:32px}
#hsc-salon .pins{position:absolute;inset:0;pointer-events:none}
#hsc-salon .pin{position:absolute;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:50%;background:#ffffffe8;border:3px solid ${K};box-shadow:0 4px 0 ${K},0 6px 12px #0006;font-size:26px;font-weight:900;line-height:1;color:${K};pointer-events:auto;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center}
#hsc-salon .pin.on{width:54px;height:54px;background:linear-gradient(#ffe682,#ffb21a)}
#hsc-salon .pin.on::after{content:"";position:absolute;inset:-11px;border-radius:50%;border:3px solid #ffc21a;box-shadow:0 0 16px #ffc21a;animation:hsc-pinp 1.4s ease-in-out infinite}
@keyframes hsc-pinp{50%{transform:scale(1.08);opacity:.7}}
#hsc-salon .sheet{position:absolute;left:0;right:0;bottom:0;box-sizing:border-box;display:flex;flex-direction:column;gap:10px;padding:14px max(14px,var(--ir)) max(16px,var(--ib)) max(14px,var(--il));background:linear-gradient(#fff,#e6f0fb);border-top:3px solid ${K};border-radius:28px 28px 0 0;box-shadow:0 -10px 30px #0005}
#hsc-salon.land .bar{right:calc(var(--sw,430px) + 12px)}
/* on its side the sheet stands at the right: the left inset (a notch on the far side) is the picture's, not the sheet's */
#hsc-salon.land .sheet{left:auto;top:0;width:var(--sw,430px);border-radius:0;border-top:0;border-left:3px solid ${K};padding-top:max(14px,var(--it));padding-left:14px}
#hsc-salon .namer{display:flex;align-items:center;gap:10px;flex:none;height:52px;padding:0 6px 0 12px;border-radius:14px;border:3px solid ${K};background:#fff;font-weight:900}
#hsc-salon .namer[hidden]{display:none}
#hsc-salon .namer label{flex:none;max-width:45%}
#hsc-salon .namer input{flex:1;min-width:0;height:44px;border:0;background:none;text-align:end;font:900 17px "Arial Rounded MT Bold","Nunito",system-ui,sans-serif;color:${K};outline:none}
#hsc-salon .cats{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding:2px 2px 8px;flex:none}
#hsc-salon .cats::-webkit-scrollbar{display:none}
/* a long category word (Catalan 'Decoració', Dutch 'Vloerkleed') widens its chip a little; the row already slides */
#hsc-salon .cats .j{flex:none;flex-direction:column;gap:2px;width:auto;min-width:66px;height:66px;border-radius:14px;font-size:12px;padding:0 4px}
#hsc-salon .cats .j.on{background:linear-gradient(#ffe682,#ffb21a)}
#hsc-salon .cats img{width:34px;height:34px;object-fit:cover;border-radius:7px;border:2px solid ${K}}
#hsc-salon .cats .hsc-lbl{max-width:100%}
#hsc-salon .cards{display:grid;grid-auto-flow:column;grid-auto-columns:calc((100% - 30px) / 4);gap:10px;overflow-x:auto;scrollbar-width:none;flex:1;min-height:120px;padding:2px 2px 8px}
/* on a short screen on its side a row of cards is never taller than the space it has, so its prices show */
#hsc-salon.land .cards{grid-auto-flow:row;grid-template-columns:1fr 1fr;grid-auto-columns:auto;overflow-y:auto;overflow-x:hidden;grid-auto-rows:min(150px,100%)}
#hsc-salon .cards::-webkit-scrollbar{display:none}
#hsc-salon .card{position:relative;display:flex;flex-direction:column;border-radius:16px;border:3px solid ${K};background:#fff;box-shadow:0 4px 0 ${K};overflow:hidden;cursor:pointer;padding:0;font:inherit;color:${K}}
#hsc-salon .card.sel{box-shadow:0 4px 0 ${K},0 0 0 4px #ffc21a}
#hsc-salon .card .art{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;background:radial-gradient(90% 80% at 50% 30%,#eaf6ff,#a9cdf0);overflow:hidden}
#hsc-salon .card .art img{width:100%;height:100%;object-fit:cover}
#hsc-salon .card .art img.obj{object-fit:contain;width:92%;height:92%}
#hsc-salon .card .foot{height:36px;flex:none;border-top:3px solid ${K};display:flex;align-items:center;justify-content:center;gap:4px;font-weight:900;font-size:16px;background:#fff}
#hsc-salon .card .foot .hsc-ic{width:22px;height:22px}
#hsc-salon .card .tag{position:absolute;left:6px;top:6px;padding:1px 9px;border-radius:9px;background:#ffffffe8;border:2px solid ${K};font-size:13px;font-weight:900;max-width:calc(100% - 42px);white-space:normal;text-wrap:balance;line-height:1.15;overflow:hidden}
/* a city's name on its card wraps (Japanese, Hausa) rather than lose its end */
#hsc-salon .card .tag{padding:1px 6px}
#hsc-salon .card .own{position:absolute;right:5px;top:5px;width:28px;height:28px;border-radius:50%;background:#36b83a;border:2.5px solid ${K};display:flex;align-items:center;justify-content:center}
#hsc-salon .card .own .hsc-ic{width:20px;height:20px}
#hsc-salon .act{display:flex;gap:10px;align-items:center;flex:none;min-height:52px}
#hsc-salon .act .nm{font-size:22px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
#hsc-salon .act .j{height:52px;font-size:20px;padding:0 18px;flex:none}
#hsc-salon .act .j .hsc-ic{width:26px;height:26px}
#hsc-salon .act .j[hidden]{display:none}
#hsc-salon .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;overflow-y:auto;scrollbar-width:none;flex:1;min-height:0;grid-auto-rows:128px;padding:2px}
#hsc-salon.land .grid{grid-auto-rows:150px}
#hsc-salon [hidden]{display:none!important}
#hsc-reveal{position:fixed;inset:0;z-index:40;display:none;overflow:hidden;font-family:"Arial Rounded MT Bold","Nunito",system-ui,sans-serif;color:${K};cursor:pointer}
#hsc-reveal.on{display:block;pointer-events:none;animation:hsc-rvin .12s ease-out}
#hsc-reveal.out{animation:hsc-rvout .16s ease-in forwards}
@keyframes hsc-rvin{from{opacity:0}}@keyframes hsc-rvout{to{opacity:0;visibility:hidden}}
#hsc-reveal img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:hsc-push 2.4s ease-out forwards}
@keyframes hsc-push{from{transform:scale(1.08)}to{transform:scale(1)}}
#hsc-reveal .shade{position:absolute;inset:0;background:linear-gradient(#0000 60%,#10223f66)}
#hsc-reveal .sui{position:absolute;inset:0;zoom:var(--hsc-s,1)}
#hsc-reveal .sign{position:absolute;left:50%;top:calc(max(14px,var(--it)) + 54px);transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;max-width:92%}
#hsc-reveal .sign b{max-width:100%;box-sizing:border-box;padding:10px 26px;border-radius:18px;background:linear-gradient(#fff,#f1e6d0);border:3px solid ${K};box-shadow:0 6px 0 ${K},0 12px 24px #0004;font-size:30px;letter-spacing:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;unicode-bidi:plaintext}
#hsc-reveal .sign b .hsc-ic{width:44px;height:44px}
#hsc-reveal .sign i{font-style:normal;padding:2px 12px;border-radius:13px;background:#36b83a;color:#fff;font-size:15px;font-weight:900}
#hsc-reveal .go{position:absolute;left:50%;bottom:calc(max(16px,var(--ib)) + 18px);transform:translateX(-50%);width:min(340px,80%);display:flex;flex-direction:column;align-items:center;gap:10px}
#hsc-reveal .mode{display:flex;align-items:center;gap:8px;height:52px;padding:0 20px;border-radius:26px;background:linear-gradient(#ffe682,#ffb21a);border:3px solid ${K};box-shadow:0 5px 0 ${K};font-size:22px;font-weight:900}
#hsc-reveal .mode .hsc-ic{width:34px;height:34px}
#hsc-reveal .bar{width:100%;height:16px;border-radius:8px;background:#10223f99;border:2px solid #fff6;overflow:hidden}
#hsc-reveal .bar i{display:block;height:100%;width:0;background:linear-gradient(#b5ff7a,#46c43a);border-radius:8px;animation:hsc-load .18s ease-in-out forwards}
@keyframes hsc-load{to{width:100%}}
@media (prefers-reduced-motion:reduce){#hsc-reveal img,#hsc-salon .pin.on::after{animation:none}}
`;
  const SLOT_ICON = { wall: 'wall', lower: 'lower', floor: 'floor', mat: 'mat', mirror: 'mirror', lights: 'lights', shelf: 'shelf', chair: 'chair', decor: 'decor' };
  const ui = {
    el: {}, built: false, tab: 'parts', slot: 'floor', pick: null, region: null, token: 0,
    build() {
      if (this.built || !document.body) return;
      this.built = true;
      const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
      const p = document.createElement('div'); p.id = 'hsc-salon'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Shop');
      p.innerHTML = `<div class="view"><img alt=""></div>
        <div class="sui"><div class="pins"></div>
          <div class="bar"><button class="j c-white x" type="button" aria-label="Back">${I('back', 30)}</button><div class="title">${I('salon', 38)}<span class="hsc-lbl" data-k="shop"></span></div><div class="grow"></div><div class="chip">${I('coin', 32)}<bdi></bdi></div></div>
          <div class="sheet">
            <div class="hsc-stabs" role="tablist"></div><div class="namer" hidden><label for="hsc-shop-name" class="hsc-lbl" data-k="shop_name"></label><input id="hsc-shop-name" type="text" maxlength="64" enterkeyhint="done" autocomplete="off" autocapitalize="characters" spellcheck="false"></div>
            <div class="act"><span class="nm"></span><span class="grow"></span><button class="j c-pink wishb" type="button" hidden></button><button class="j c-yellow buy" type="button"></button></div>
            <div class="cats"></div><div class="cards"></div><div class="grid"></div>
          </div></div>`;
      document.body.appendChild(p);
      this.el = { panel: p, img: p.querySelector('.view img'), view: p.querySelector('.view'), pins: p.querySelector('.pins'), sheet: p.querySelector('.sheet'), cats: p.querySelector('.cats'), cards: p.querySelector('.cards'), grid: p.querySelector('.grid'), nm: p.querySelector('.act .nm'), buy: p.querySelector('.act .buy'), coin: p.querySelector('.chip bdi') };
      p.querySelector('.x').addEventListener('click', () => this.close());
      p.querySelector('.bar .chip').addEventListener('click', () => { if (HSC.shop) HSC.shop.go('coins'); });
      const nm = p.querySelector('.namer input');
      let wait = 0;
      const name = () => { const want = nm.value.trim(), got = setName(want); if (want && !got && want !== t('shopname')) { nm.value = shown(); if (HSC.nope) HSC.nope(nm); } };
      nm.addEventListener('input', () => { HSC.lifecycle.clear(wait); wait = HSC.lifecycle.timeout(name, 700); });
      nm.addEventListener('change', () => { HSC.lifecycle.clear(wait); name(); });
      nm.addEventListener('keydown', (e) => { e.stopPropagation(); if (e.key === 'Enter' || e.key === 'Escape') nm.blur(); });
      nm.addEventListener('keyup', (e) => e.stopPropagation());
      this.el.buy.addEventListener('click', () => this.act());
      // the wishlist: mark the shown part or shop as the salon target (tap again to clear)
      this.el.wish = p.querySelector('.wishb');
      this.el.wish.addEventListener('click', async () => {
        const t2 = this.target();
        if (!t2 || !HSC.econ || !HSC.econ.wish) return;
        const cur2 = HSC.econ.wishes().salon;
        await HSC.econ.wish('salon', cur2 && cur2.key === t2.key ? null : t2);
        if (HSC.fx) HSC.fx.play('tap');
        this.render();
      });
      // back (Escape) leaves the shop like its back button (a panel opened over it closes first)
      addEventListener('keydown', (e) => { if (e.key === 'Escape' && this.open_() && !document.querySelector('#hsc-set.open,#hsc-panel.open')) this.close(); });
      addEventListener('resize', () => { schedule(); if (this.open_()) { this.layout(); this.draw(); } });
      HSC.lifecycle.interval(() => this.tick(), 500);
    },
    open_() { return this.el.panel && this.el.panel.classList.contains('open'); },
    // resume: back from the coins the picked part or shop was short of (one video closed the gap), so it is still picked
    open(tab, resume) {
      this.build(); this.el.panel.classList.add('open'); this.tab = tab || 'parts';
      const r = resume && this.resume && this.resume.tab === this.tab ? this.resume : null;
      this.resume = null;
      if (r) this.slot = r.slot;
      this.pick = r ? r.pick : null; this.region = r ? r.region : null;
      this.render();
    },
    hide() {
      if (!this.el.panel) return;
      this.pick = null; this.region = null; this.token++;
      this.el.panel.classList.remove('open');
      // The displayed shop is a normal image now; retain its exact pixels and release only the hidden GPU context.
      const shop = S3(); if (shop && shop.drop) shop.drop();
    },
    close() { if (HSC.fx) HSC.fx.play('back'); this.hide(); if (HSC.menu) HSC.menu.view('home', true); },
    button() {
      const row = document.querySelector('#hsc-hud .hsc-row');
      if (!row) return;
      if (!this.el.btn || !this.el.btn.isConnected) {
        const b = document.createElement('button');
        b.className = 'hsc-btn'; b.id = 'hsc-salon-btn'; b.type = 'button'; b.setAttribute('aria-label', 'Salon');
        b.innerHTML = I('salon', 30) + '<span class="hsc-dot" hidden></span>';
        b.addEventListener('click', () => this.open());
        row.insertBefore(b, row.children[1] || null);
        this.el.btn = b;
      }
    },
    // the look being shown: what is chosen, or a preview of what is picked
    previewParts() {
      if (this.tab === 'shops' && this.region) return regionParts(this.region);
      if (this.tab === 'parts' && this.pick) return Object.assign({}, cur().parts, { [this.slot]: this.pick });
      return cur().parts;
    },
    // Wide: the sheet at the side, 430 at the screen's scale but never more than half the screen (and the inset at its
    // side), so the picture keeps room for the back button, the title and the coins; when a long translation's tabs
    // do not fit one row there, the sheet grows by what they lack (to 62% of the screen at most: a second row of tabs
    // would cost the cards their room). Tall: the sheet below, near half the screen, but never shorter than its
    // contents need (tabs, the name and Buy, the parts and a row of cards: 344 plus the bottom margin and a second row
    // of tabs on a narrow phone, at the screen's scale), up to two thirds of the screen on a short or square one (and
    // that second row on top, so the cards and their prices stay whole)
    layout() {
      const land = innerWidth > innerHeight, z = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hsc-s')) || 1;
      const tabs = this.el.panel.querySelector('.hsc-stabs'), fit = () => (HSC.shop && HSC.shop.fit ? HSC.shop.fit(tabs) : 0);
      this.el.panel.classList.toggle('land', land);
      // half the screen for the sheet's contents: a safe-area inset at its side comes on top
      const inset = land ? Math.max(0, (parseFloat(getComputedStyle(this.el.sheet).paddingRight) || 14) - 14) * z : 0;
      let sheetPx = land ? Math.min(430 * z, innerWidth * 0.5 + inset) : 0;
      const side = () => { this.el.panel.style.setProperty('--sw', sheetPx / z + 'px'); this.el.view.style.right = land ? sheetPx + 'px' : '0'; };
      side();
      // the tabs fit the sheet's new width
      const short = fit();
      if (land && short > 0) { sheetPx = Math.min(sheetPx + Math.ceil(short) + 1, Math.max(sheetPx, innerWidth * 0.62)); side(); fit(); }
      let h = 0;
      if (!land) {
        this.el.sheet.style.height = '';
        const pad = parseFloat(getComputedStyle(this.el.sheet).paddingBottom) || 16;
        const rows = tabs ? Math.max(0, tabs.getBoundingClientRect().height / z - 44) : 0;
        h = Math.round(Math.min(Math.max(Math.min(innerHeight * 0.46 / z, 420), 344 + pad + rows), innerHeight * 0.66 / z + rows));
      }
      this.el.sheet.style.height = land ? '' : h + 'px';
      this.el.view.style.bottom = land ? '0' : Math.round((h - 20) * z) + 'px';
    },
    // render the shop into the view (sharp), with its hot spots
    draw() {
      // Keep the live customer renderer as the only mobile WebGL context. The salon remains fully usable, while its
      // editor uses the shipped room artwork and lightweight option icons instead of compiling and destroying a second
      // 3D scene on every visit.
      if (HSC.detail.constrained) {
        const src = innerWidth > innerHeight ? 'assets/classic-backdrop-landscape.webp' : 'assets/classic-backdrop-portrait.webp';
        if (this.el.img.getAttribute('src') !== src) this.el.img.src = src;
        this.el.img.classList.remove('busy');
        this.el.pins.innerHTML = '';
        return;
      }
      if (!S3()) return;
      const r = this.el.view.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5);
      const w = Math.max(64, Math.round(r.width * dpr)), h = Math.max(64, Math.round(r.height * dpr));
      const floorView = this.tab === 'parts' && (this.slot === 'floor' || this.slot === 'mat') && r.width < r.height * 1.1;
      const focus = this.tab === 'parts' && ['chair', 'decor', 'lights'].includes(this.slot) ? this.slot : null;
      const view = floorView ? 'floor' : focus || 'shop', tok = ++this.token;
      this.el.img.classList.add('busy');
      requestAnimationFrame(() => HSC.lifecycle.timeout(() => {
        if (tok !== this.token) return;
        try {
          const out = S3().render(look(this.previewParts()), view, w, h, info());
          this.el.img.src = out.canvas.toDataURL('image/jpeg', 0.9);
          this.pinsFor(out.hot, w / r.width, r);
        } catch (e) { console.warn('shop: render failed', e); }
        this.el.img.classList.remove('busy');
      }, 0));
    },
    pinsFor(hot, k, r) {
      const z = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hsc-s')) || 1;
      const html = [];
      // a pin is shown only where all of it (the picked one is 54 across) is in the free picture: below the bar, clear of
      // the sheet (the picture runs a little under it), and inside the side margins and safe-area insets
      const bar = this.el.panel.querySelector('.bar').getBoundingClientRect(), sh = this.el.sheet.getBoundingClientRect(), m = 27 * z;
      const land = this.el.panel.classList.contains('land');
      // on its side the picture runs to the screen's foot: a pin keeps clear of the gesture bar there too
      const x0 = bar.left - r.left + m, x1 = bar.right - r.left - m, y0 = bar.bottom - r.top + m, y1 = (land ? Math.min(r.height, innerHeight - insetB() - r.top) : Math.min(r.height, sh.top - r.top)) - m;
      if (this.tab === 'parts') for (const s of [...SLOTS, 'tv']) {
        const p = hot[s];
        if (!p || !p[2]) continue;
        const x = p[0] / k, y = p[1] / k;
        if (x < x0 || x > x1 || y < y0 || y > y1) continue;
        html.push(`<button class="pin ${s === this.slot ? 'on' : ''}" type="button" data-s="${s}" style="left:${(r.left + x) / z}px;top:${(r.top + y) / z}px" aria-label="${s}">${s === 'tv' ? I('styles', 26) : '+'}</button>`);
      }
      this.el.pins.innerHTML = html.join('');
      this.el.pins.querySelectorAll('.pin').forEach((b) => b.addEventListener('click', () => {
        if (HSC.fx) HSC.fx.play('down');
        if (b.dataset.s === 'tv') { this.tab = 'shops'; this.render(); return; }
        this.slot = b.dataset.s; this.pick = null; this.render();
      }));
    },
    render() {
      if (!this.open_()) return;
      const p = this.el.panel;
      const bar = p.querySelector('.hsc-stabs');
      if (HSC.shop) { bar.innerHTML = HSC.shop.tabs(this.tab); HSC.shop.wire(bar); }
      const nmr = p.querySelector('.namer'), nin = nmr.querySelector('input');
      nmr.hidden = this.tab !== 'shops';
      if (document.activeElement !== nin) nin.value = shown();
      this.el.cats.hidden = this.el.cards.hidden = this.tab !== 'parts';
      this.el.grid.hidden = this.tab !== 'shops';
      if (this.tab === 'parts') {
        this.el.cats.innerHTML = SLOTS.map((s) => `<button class="j ${s === this.slot ? 'c-yellow on' : 'c-white'}" type="button" data-s="${s}">${HSC.detail.constrained ? I(SLOT_ICON[s], 34) : `<img alt="" decoding="async" data-part-thumb="${s}" data-part-opt="${cur().parts[s]}" data-part-size="64">`}<span class="hsc-lbl" data-k="${SLOT_ICON[s]}"></span></button>`).join('');
        this.el.cats.querySelectorAll('.j').forEach((b) => b.addEventListener('click', () => { if (HSC.fx) HSC.fx.play('down'); this.slot = b.dataset.s; this.pick = null; this.render(); }));
        const obj = !['wall', 'lower', 'floor', 'mat'].includes(this.slot);
        this.el.cards.innerHTML = OPTIONS[this.slot].map((o) => {
          const own = owns(this.slot, o), on = cur().parts[this.slot] === o, sel = (this.pick || cur().parts[this.slot]) === o;
          const foot = on ? `<span style="color:#2f9e44">${I('tick', 22)}</span>` : own ? '' : `${I('coin', 22)}${priceOf(this.slot, o).toLocaleString(HSC.langTag ? HSC.langTag() : undefined)}`;
          return `<button class="card ${sel ? 'sel' : ''}" type="button" data-o="${o}"><span class="art">${HSC.detail.constrained ? I(o === 'none' ? 'lock' : SLOT_ICON[this.slot], 40) : o === 'none' ? I('lock', 40) : `<img class="${obj ? 'obj' : ''}" alt="" decoding="async" data-part-thumb="${this.slot}" data-part-opt="${o}" data-part-size="160">`}</span><span class="foot">${foot}</span>${on ? `<span class="own">${I('tick', 20)}</span>` : ''}</button>`;
        }).join('');
        this.el.cards.querySelectorAll('.card').forEach((b) => b.addEventListener('click', () => {
          if (HSC.fx) HSC.fx.play('down');
          const o = b.dataset.o;
          if (owns(this.slot, o)) { this.pick = null; equip(this.slot, o); this.render(); return; }
          this.pick = o; this.render();
        }));
      } else {
        this.el.grid.innerHTML = REGION_IDS.map((id) => {
          const own = S.regions.includes(id), on = cur().region === id, sel = (this.region || cur().region) === id;
          const foot = on ? `<span style="color:#2f9e44">${I('tick', 22)}</span>` : own ? '' : `${I('coin', 22)}${regionPrice(id).toLocaleString(HSC.langTag ? HSC.langTag() : undefined)}`;
          return `<button class="card ${sel ? 'sel' : ''}" type="button" data-r="${id}"><span class="art"><img alt="" data-r="${id}"></span><span class="tag hsc-lbl" data-k="${id === 'classic' ? 'classic' : 'c_' + id}"></span><span class="foot">${foot}</span>${on ? `<span class="own">${I('tick', 20)}</span>` : ''}</button>`;
        }).join('');
        this.el.grid.querySelectorAll('.card').forEach((b) => b.addEventListener('click', () => {
          if (HSC.fx) HSC.fx.play('down');
          const id = b.dataset.r;
          if (S.regions.includes(id)) { this.region = null; useRegion(id); this.render(); return; }
          this.region = id; this.render();
        }));
        this.regionThumbs();
      }
      this.actBar();
      this.layout();
      fill(p);
      this.el.coin.textContent = coins().toLocaleString(HSC.langTag ? HSC.langTag() : undefined);
      this.draw();
      if (this.tab === 'parts') this.partThumbs();
    },
    partThumbs() {
      const imgs = [...this.el.panel.querySelectorAll('img[data-part-thumb]')];
      let index = 0;
      const next = () => {
        const img = imgs[index++];
        if (!img?.isConnected || !this.open_() || this.tab !== 'parts' || !S3()) return;
        const {partThumb, partOpt, partSize} = img.dataset;
        try {
          const picture = S3().thumb(partThumb, partOpt, Number(partSize));
          if (picture) img.src = picture;
        } catch (error) { console.warn('shop: part picture failed', error); }
        if (index < imgs.length) HSC.lifecycle.timeout(next, 35);
      };
      HSC.afterInputPaint().then(() => HSC.lifecycle.timeout(next, 60));
    },
    // region pictures, one per idle moment (each is a separate scene)
    regionThumbs() {
      const imgs = [...this.el.grid.querySelectorAll('img[data-r]')];
      if (HSC.detail.constrained) {
        const colours = ['#d6b17a', '#9eb8d8', '#e5a5ad', '#d7a45c', '#6cc9c1', '#e6bd61', '#a8d2b6'];
        imgs.forEach((img, index) => {
          const art = img.parentElement;
          img.remove();
          art.style.background = `radial-gradient(circle at 50% 35%,#fff8,transparent 45%),${colours[index % colours.length]}`;
          art.insertAdjacentHTML('beforeend', I('salon', 40));
        });
        return;
      }
      const next = () => {
        const im = imgs.find((i) => !i.src);
        if (!im?.isConnected || !this.open_() || this.tab !== 'shops') return;
        const id = im.dataset.r;
        if (!regionThumb.has(id)) { try { regionThumb.set(id, S3().render(look(regionParts(id)), 'thumb', 320, 200, Object.assign(info(), { shadows: false })).canvas.toDataURL('image/jpeg', 0.85)); } catch (e) { console.warn('shop: region picture failed', id, e); regionThumb.set(id, ''); } }
        im.src = regionThumb.get(id) || 'data:,';
        HSC.lifecycle.timeout(next, 30);
      };
      HSC.lifecycle.timeout(next, 60);
    },
    // what the action bar is offering, if it is something to save for
    target() {
      if (this.tab === 'parts' && this.pick && !owns(this.slot, this.pick)) return { key: 'salon:part:' + this.slot + ':' + this.pick, price: priceOf(this.slot, this.pick) };
      if (this.tab === 'shops' && this.region && !S.regions.includes(this.region)) return { key: 'salon:shop:' + this.region, price: regionPrice(this.region) };
      return null;
    },
    wishBar() {
      const t2 = this.target(), wb = this.el.wish, w = HSC.econ && HSC.econ.wishes ? HSC.econ.wishes().salon : null;
      wb.hidden = !(t2 && t2.price > 0);
      if (wb.hidden) return;
      const on = !!(w && w.key === t2.key);
      wb.className = 'j wishb ' + (on ? 'c-pink' : 'c-white');
      wb.setAttribute('aria-pressed', on);
      wb.setAttribute('aria-label', t('a_wish'));
      wb.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28"><path d="M12 20.5S3 15 3 8.8A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 9 2.2C21 15 12 20.5 12 20.5z" fill="${on ? '#ff5c98' : 'none'}" stroke="${K}" stroke-width="2.4"/></svg>`;
    },
    actBar() {
      this.wishBar();
      const b = this.el.buy;
      if (this.tab === 'parts' && this.pick) {
        const pr = priceOf(this.slot, this.pick);
        this.el.nm.innerHTML = `<span class="hsc-lbl" data-k="${SLOT_ICON[this.slot]}"></span>`;
        b.hidden = false; b.className = 'j c-yellow buy'; b.innerHTML = I('coin', 26) + pr.toLocaleString(HSC.langTag ? HSC.langTag() : undefined); b.disabled = false; if (coins() < pr) b.dataset.short = '1'; else delete b.dataset.short;
      } else if (this.tab === 'shops' && this.region) {
        this.el.nm.innerHTML = `<span class="hsc-lbl" data-k="c_${this.region}"></span>`;
        b.hidden = false; b.className = 'j c-yellow buy'; b.innerHTML = I('coin', 26) + regionPrice(this.region).toLocaleString(HSC.langTag ? HSC.langTag() : undefined); b.disabled = false; if (coins() < regionPrice(this.region)) b.dataset.short = '1'; else delete b.dataset.short;
      } else {
        this.el.nm.innerHTML = `<span class="hsc-lbl" data-k="${this.tab === 'parts' ? SLOT_ICON[this.slot] : cur().region ? (cur().region === 'classic' ? 'classic' : 'c_' + cur().region) : 'shops'}"></span>`;
        b.hidden = true;
      }
    },
    async act() {
      const b = this.el.buy;
      if (b.dataset.short) { this.resume = { tab: this.tab, slot: this.slot, pick: this.pick, region: this.region }; const target = this.target(); if (target && HSC.econ && HSC.econ.wish) await HSC.econ.wish('salon', target); if (HSC.shop) HSC.shop.go('free'); return; }
      b.disabled = true;
      const ok = this.tab === 'parts' ? await buyPart(this.slot, this.pick) : await buyRegion(this.region);
      if (ok) { if (HSC.fx) HSC.fx.play('reward'); this.pick = null; this.region = null; } else if (HSC.fx) HSC.fx.play('nope');
      this.render();
    },
    refresh() { if (this.open_()) this.render(); },
    tick() { if (!S) return; this.button(); if (this.open_()) this.el.coin.textContent = coins().toLocaleString(HSC.langTag ? HSC.langTag() : undefined); },
  };
  const regionThumb = new Map();
  // label texts in the player's language, then fitted to their boxes
  // the bottom safe-area inset in screen pixels (inside the zoomed controls env() would be multiplied by the scale)
  let probe = null;
  function insetB() {
    if (!probe || !probe.isConnected) {
      probe = document.createElement('div');
      probe.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none;padding-bottom:env(safe-area-inset-bottom)';
      document.body.appendChild(probe);
    }
    return parseFloat(getComputedStyle(probe).paddingBottom) || 0;
  }
  function fill(root) { root.querySelectorAll('.hsc-lbl[data-k]').forEach((e) => { e.textContent = t(e.dataset.k); }); if (HSC.fitLabels) HSC.fitLabels(root); }

  // ---- the first customer of a session opens on the shop ----
  let revealed = false;
  // the Home screen's picture: the player's current shop, whole and unzoomed, with no customer in it
  let homePic = null, homeKey = null;
  function homePicture() {
    if (!S) return null;
    if (isClassicRoom() || HSC.detail.constrained) return innerWidth > innerHeight
      ? 'assets/classic-home-landscape.webp' : 'assets/classic-home-portrait.webp';
    if (failed || !S3()) return null;
    const land = innerWidth > innerHeight, key = land + ':' + innerWidth + 'x' + innerHeight + JSON.stringify([cur().parts, cur().region, shown(), S.year]);
    if (homePic && homeKey === key) return homePic;
    try {
      const dpr = Math.min(devicePixelRatio || 1, HSC.detail.mobile ? 1.15 : 2), rawW = Math.round(innerWidth * dpr), rawH = Math.round(innerHeight * dpr);
      // The picture is a full-screen JPEG backdrop, not an interactive render target. Bound its temporary WebGL
      // canvas to 1080p so a 4K/high-density launch cannot add a 33 MB colour buffer while the game renderer boots.
      const scale = Math.min(1, Math.sqrt((1920 * 1080) / Math.max(1, rawW * rawH)));
      const w = Math.max(1, Math.round(rawW * scale)), h = Math.max(1, Math.round(rawH * scale));
      homePic = S3().renderOnce(look(), land ? 'homeL' : 'homeP', w, h, info()).canvas.toDataURL('image/jpeg', 0.9);
      homeKey = key;
    } catch (e) { console.warn('shop: home picture unavailable', e); return null; }
    return homePic;
  }
  function reveal(mode) {
    if (revealed || !S || failed || !S3()) return;
    revealed = true;
    const pic = homePic || 'assets/home-fallback.jpg';
    let el = document.getElementById('hsc-reveal');
    if (!el) { el = document.createElement('div'); el.id = 'hsc-reveal'; document.body.appendChild(el); }
    const ICON = { career: 'play', requests: 'orders', free: 'freestyle', fix: 'rescue', beard: 'beards', rush: 'rush' };
    const LBL = { career: 'career', requests: 'orders', free: 'quick_play', fix: 'rescue', beard: 'beards', rush: 'rush' };
    const sign = document.createTextNode(shown());
    el.innerHTML = `<img alt=""><div class="shade"></div><div class="sui"><div class="sign"><b></b><i class="hsc-lbl" data-k="open"></i></div>
      <div class="go"><div class="mode">${I(ICON[mode] || 'play', 34)}<span class="hsc-lbl" data-k="${LBL[mode] || 'play'}"></span></div><div class="bar"><i></i></div></div></div>`;
    el.querySelector('img').src = pic;
    const b = el.querySelector('.sign b');
    if (sign) b.appendChild(sign); else b.innerHTML = I('salon', 44);
    fill(el);
    el.className = 'on';
    let gone = false;
    const end = () => { if (gone) return; gone = true; el.className = 'on out'; HSC.lifecycle.timeout(() => { el.className = ''; }, 170); };
    HSC.lifecycle.timeout(end, 200);
    if (HSC.fx) HSC.fx.play('open');
  }

  HSC.salon = {
    state: () => S, SLOTS, OPTIONS, REGIONS: REGION_IDS, NAME_MAX, priceOf, regionPrice, targets,
    name: () => (S ? S.name : ''), shown: () => (S ? shown() : ''), setName, cleanName, graphemes,
    buyPart, buyRegion, equip, useRegion, open: (tab, resume) => { reconcile(); ui.open(tab, resume); }, hide: () => ui.hide(), reveal, reconcile,
    // a career branch's look in place of the founding salon (null: the founding salon); which city is on show
    homePicture, owns, look: () => ({ parts: Object.assign({}, cur().parts), region: cur().region }),
    // tests
    _sanitize: sanitize, _migrate: migrate, _load: (d) => { S = sanitize(d); return S; },
  };
  HSC.salonDebug = () => S;

  async function boot() {
    // Home is the Android launch surface, so its salon save must be ready before the public gameplay API is exposed.
    // The HUD, meta save and coin model are the actual dependencies; waiting for skinFadeStudio here deadlocks the
    // furnished Home against the native splash handoff.
    if (!document.body || !M() || !M().data || !HSC.coins || !document.querySelector('#hsc-hud .hsc-row')) { HSC.lifecycle.timeout(boot, 300); return; }
    client = M().client;
    const d = client && client.loadProgress ? await client.loadProgress(KEY, null).catch(() => null) : null;
    S = sanitize(d);
    // the shop is founded the first time it is seen: its year shows under the name
    if (!S.year) { S.year = new Date().getFullYear(); save(); } else if (d && d.v === 1) save();
    ui.build(); ui.button();
    // once the career journal is up, restore anything it recorded as bought
    const sync = (n) => (reconcile() || (HSC.econ && HSC.econ.ready && HSC.econ.ready()) || n > 100 ? null : HSC.lifecycle.timeout(() => sync(n + 1), 300));
    sync(0);
    // the 3D shop is drawn once the game is up (the original picture shows until then)
    const go = () => (HSC.startupTiming?.gameReady ? HSC.lifecycle.timeout(apply, 1000) : HSC.lifecycle.timeout(go, 300));
    go();
  }
  boot();
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): coin prices for the wardrobe (docs/ECONOMY-BALANCE-MODEL.md section 14;
// implementation plan 3.5). The Shop (shop.js) sells through here, awarding through the wardrobe's own HSC.wardrobeApi.
//
//   tier     from the design's own data: flagged premium 2,400; a special colour or finish 900 (Rare), an uncommon
//            one 350, otherwise 120 (Common). The two free designs stay free. No price depends on the wallet.
//   buying   one journal commit holds the payment and the entitlement `wardrobe:<key>`; a design missing from the
//            wardrobe save is restored from the journal on boot
//   daily    today's two picks stay one video each, and also carry their normal coin price
// Cosmetic only: nothing here changes play, scoring or access.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const C = () => HSC.catalog, W = () => HSC.wardrobeApi;
  const P = () => (HSC.economy ? HSC.economy.CONFIG.wardrobe : { common: 120, uncommon: 350, rare: 900, premium: 2400 });
  const tierOf = (name, list) => { const r = list.find((x) => x[0] === name); return r ? r[r.length - 1] : 0; };
  // the catalog tier of a design: 0 starter/common, 2 uncommon, 3 special, premium above them
  function price(d) {
    if (!d || C().FREE.has(d.key)) return 0;
    if (d.premium) return P().premium;
    const p = d.parts, cols = [p.body, p.accent, p.main, p.second, p.collar].filter(Boolean).map((c) => tierOf(c, C().COLOURS));
    const top = Math.max(0, ...cols, p.finish ? tierOf(p.finish, C().FINISHES) : 0);
    return top >= 3 ? P().rare : top >= 2 ? P().uncommon : P().common;
  }
  const entKey = (key) => 'wardrobe:' + key;
  async function buy(key) {
    const d = C().byKey.get(key), a = W();
    if (!d || !a || a.owns(key)) return false;
    const pr = price(d);
    if (HSC.coins.get() < pr) return false;
    const ok = await (HSC.coins.buyItem || HSC.coins.spend)(pr, 'wardrobe', entKey(key));
    if (!ok) return false;
    a.award(key, 'coins');
    a.wear(key);
    return true;
  }
  // anything paid for in the journal is owned, even if the wardrobe's own save was lost
  function reconcile() {
    if (!HSC.econ || !HSC.econ.ready() || !W()) return false;
    for (const k of HSC.econ.entitlements()) if (k.startsWith('wardrobe:')) W().award(k.slice(9), 'restore');
    return true;
  }

  HSC.wardrobeShop = { price, buy, reconcile };
  if (typeof setInterval === 'function') {
    const sync = (n) => (reconcile() || n > 100 ? null : HSC.lifecycle.timeout(() => sync(n + 1), 400));
    sync(0);
  }
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1; owner-approved mockups, 6 November 2026): the Shop, one screen with a slider
// of five tabs and no pop-ups.
//
//   Free      the play-time Gift, the wishlist video and the three daily tasks
//   Coins     what real money buys: the Starter Pack, the coin packs and the Supporter Bundle. Each Buy shows Google
//             Play's own local price once billing has it, and just says Buy until then (owner, 7 November 2026).
//             HSC.billing is wired at packaging; until then nothing can be charged. What it must provide:
//               price(productId)  Play Billing's ProductDetails formatted price ('€1,09'), or null while unknown
//               buy(productId)    resolves true once bought; owned(productId) for the one-time packs
//               an 'hsc-billing-prices' event on window when prices arrive or change (the tab redraws)
//               on a pack's purchase, award the two designs HSC.shop.packItems(productId) names (wardrobe keys),
//               read at purchase time: they are exactly the ones the card showed
//   Shops     whole shop looks and the salon name (salon.js shows these over its own 3D picture)
//   Parts     the shop's parts (salon.js)
//   Clippers  every design with its coin price; the one in focus leads the page. Today's pick can also be had for
//   Gowns     one video, which goes through the wardrobe's own earned-reward callback
// Coins buy everything here: nothing is given away. Short of coins, Buy leads to the Coins tab: if one video closes the gap
// it leads the tab and then returns to the item; otherwise the smallest offer that covers the gap is marked.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const K = '#10223f', STEP = 9;
  const t = (k) => (HSC.t ? HSC.t(k) : k);
  // Shop reward and price coins are drawn at 18--26 px. Pass that intended size into icons.js so it uses the clean
  // phone-scale strike; CSS may still size each placement exactly as the approved layout requires.
  const I = (n, s) => (HSC.icon ? HSC.icon(n, s === undefined && n === 'coin' ? 22 : s) : '');
  const fmt = (n) => (HSC.num ? HSC.num(n) : n);
  const A = () => HSC.wardrobeApi, C = () => HSC.catalog, W = () => HSC.wardrobeShop;
  // the 3D product shot; the flat drawing only if 3D is unavailable on this device
  const art = (d, size) => { try { if (HSC.shop3d && HSC.shop3d.item) return HSC.shop3d.item(d, size); } catch (e) { console.warn('shop: 3D item unavailable', e); } return A().picture(d, size); };
  const TABS = [['free', 'free'], ['shops', 'shops'], ['parts', 'parts'], ['clipper', 'clippers'], ['gown', 'gowns']];
  const HEART = (on) => `<svg viewBox="0 0 24 24" width="26" height="26"><path d="M12 20.5S3 15 3 8.8A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 9 2.2C21 15 12 20.5 12 20.5z" fill="${on ? '#ff5c98' : 'none'}" stroke="${K}" stroke-width="2.2" stroke-linejoin="round"/></svg>`;
  const TICK = `<svg viewBox="0 0 24 24" width="26" height="26"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="${K}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const CSS = `
/* the tabs share the row by their words and never cut one: on a narrow screen fit() first brings the type down (to
   12 px at the least) and the gaps in (to 2 px); a row that still cannot fit (a long translation on a small phone)
   takes two rows of three at the usual size, every tab still 44 px; only if even that cannot fit does it slide
   sideways, the open tab in view */
.hsc-stabs{display:flex;gap:5px;flex:none;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;overscroll-behavior-x:contain}
.hsc-stabs::-webkit-scrollbar{display:none}
.hsc-stabs button{position:relative;flex:1 0 auto;min-width:44px;height:44px;padding:0 1px;border-radius:14px;border:3px solid ${K};background:#fff;color:${K};font:900 12.5px "Arial Rounded MT Bold","Nunito",system-ui,sans-serif;cursor:pointer;white-space:nowrap}
.hsc-stabs button.on{background:linear-gradient(#ffe682,#ffb21a)}
.hsc-stabs.two{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px 5px}
.hsc-stabs .dot{position:absolute;right:3px;top:3px;width:11px;height:11px;border-radius:50%;background:#f04436}
#hsc-menu .shop{grid-template-rows:48px auto minmax(0,1fr);overflow:hidden}
#hsc-menu .sbody{min-height:0;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding:2px 2px 12px;overscroll-behavior:contain}
#hsc-menu .sbody[hidden]{display:none}
#hsc-menu .hc{box-sizing:border-box;border:3px solid ${K};border-radius:22px;padding:12px;box-shadow:0 5px 0 ${K};color:${K};font-weight:900;flex:none}
#hsc-menu .hc.gift{display:grid;grid-template-columns:auto 1fr;gap:8px 12px;align-items:center;background:linear-gradient(#ffd6e6,#ff8db8)}
#hsc-menu .hc.gift.done{opacity:.6}
#hsc-menu .hc.gift .hsc-ic{width:72px;height:72px}
#hsc-menu .hc.gift .tm{font-size:26px;font-variant-numeric:tabular-nums}
#hsc-menu .btns{grid-column:1/-1;display:flex;gap:10px}
#hsc-menu .sb{position:relative;flex:1;min-width:0;height:50px;border-radius:16px;border:3px solid ${K};display:flex;align-items:center;justify-content:center;gap:6px;font:900 19px "Arial Rounded MT Bold","Nunito",system-ui,sans-serif;color:${K};box-shadow:0 4px 0 ${K};cursor:pointer;background:linear-gradient(#fff,#dfe8f2);font-variant-numeric:tabular-nums}
#hsc-menu .sb:active{transform:translateY(3px);box-shadow:0 1px 0 ${K}}
#hsc-menu .sb:disabled{opacity:.5;cursor:default}
#hsc-menu .sb.gold{background:linear-gradient(#ffe682,#ffb21a)}
#hsc-menu .sb.vid{background:linear-gradient(#a8e4ff,#3aa2f2)}
#hsc-menu .sb .hsc-ic{width:26px;height:26px}
#hsc-menu .sb.wish{flex:none;width:56px}
#hsc-menu .vr{flex:none;width:100%;height:60px;justify-content:space-between;padding:0 14px}
#hsc-menu .vr em{font-style:normal;font-size:15px}
#hsc-menu .hh{margin:4px 0 0;color:#fff;font-size:17px;font-weight:900}
/* a task's words wrap rather than being cut on a narrow phone; the row grows only if a translation needs a third line */
#hsc-menu .tk{flex:none;display:grid;grid-template-columns:minmax(0,1fr) minmax(48px,28%) 84px;align-items:center;gap:12px;min-height:60px;box-sizing:border-box;padding:5px 8px 5px 14px;border-radius:16px;border:3px solid ${K};background:#fff;color:${K};font-weight:900;font-size:15px}
#hsc-menu .tk .pgb{display:block;height:12px;border-radius:6px;background:#dbe5ef;overflow:hidden}
#hsc-menu .tk .pgb i{display:block;height:100%;background:linear-gradient(#b5ff7a,#46c43a)}
#hsc-menu .tk .sb{width:84px;height:44px;font-size:16px;border-width:2px;box-shadow:none}
#hsc-menu .tk > span:first-child{min-width:0;overflow-wrap:break-word;line-height:1.15}
#hsc-menu .tk .sb .hsc-ic{width:22px;height:22px}
#hsc-menu .cg2{flex:none;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
#hsc-menu .cp{box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 10px;border-radius:18px;border:3px solid ${K};background:#fff;color:${K};font-weight:900;font-size:22px;font-variant-numeric:tabular-nums;box-shadow:0 4px 0 ${K}}
#hsc-menu .cp .pile{display:flex;align-items:center;justify-content:center;width:100%;height:104px;background:radial-gradient(closest-side,#ffe9a066,#ffe9a000)}
#hsc-menu .cp .pile>span{position:relative;display:block}
#hsc-menu .cp .pile .hsc-ic{position:absolute;shape-rendering:geometricPrecision;filter:drop-shadow(0 2px 0 #7a4a004d)}
/* The 36 fine milled-rim marks read as grit when several small coins overlap. Keep the original coin SVG
   everywhere else, but simplify only the shop piles so the purchase cards stay clean at phone scale. */
#hsc-menu .cp .pile .hsc-ic>path:first-of-type{display:none}
/* a pack's Buy keeps the shop's one button size: flex:none, or the column squeezes it under the coins */
#hsc-menu .cp .sb{flex:none;width:100%;height:50px}
#hsc-menu .cp.hot{box-shadow:0 0 0 4px #5cff7a,0 4px 0 ${K};animation:hsc-hot 1.1s ease-in-out infinite}
@keyframes hsc-hot{50%{box-shadow:0 0 0 7px #5cff7a,0 4px 0 ${K}}}
@media (prefers-reduced-motion:reduce){#hsc-menu .cp.hot{animation:none}}
#hsc-menu .cp.big{flex:none;flex-direction:row;justify-content:space-between;gap:12px;padding:10px 12px;font-size:20px;background:linear-gradient(#fff6d8,#ffe08a)}
#hsc-menu .cp.big .sb{flex:none;width:auto;min-width:88px;max-width:46%;padding:0 6px;box-sizing:border-box}
/* a local price keeps the button's size: fitPrices() brings its type down (to 12 px) and lets it take two lines */
#hsc-menu .cp .sb.pr{white-space:nowrap;line-height:1.05;text-align:center;overflow-wrap:anywhere}
#hsc-menu .cp .sb.pr.wrap{white-space:normal}
#hsc-menu .cp.big .inc{flex:1;display:flex;align-items:center;gap:6px;min-width:0}
#hsc-menu .cp.big .inc img{width:42px;height:42px;object-fit:cover;border-radius:10px;border:2px solid ${K}}
#hsc-menu .cp.big .inc .hsc-ic{width:26px;height:26px;flex:none}
#hsc-menu .hc.pick{display:grid;grid-template-columns:42% minmax(0,1fr);gap:12px;align-items:center;background:linear-gradient(#fff6d8,#ffe08a)}
#hsc-menu .hc.pick img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:16px;border:3px solid ${K};box-sizing:border-box}
#hsc-menu .hc.pick .tx{display:flex;flex-direction:column;gap:8px;min-width:0}
#hsc-menu .hc.pick .btns{flex-wrap:wrap;gap:8px}
#hsc-menu .hc.pick .sb{height:50px;font-size:20px;flex:1 1 100%}
#hsc-menu .hc.pick .sb.wish{flex:1 1 100%;width:auto}
#hsc-menu .goal{flex:none;display:flex;align-items:center;gap:6px;color:#fff;font-weight:900;font-size:15px;font-variant-numeric:tabular-nums}
#hsc-menu .goal .pgb{display:block;flex:1;height:12px;border-radius:6px;background:#ffffff40;overflow:hidden}
#hsc-menu .goal .pgb i{display:block;height:100%;background:linear-gradient(#b5ff7a,#46c43a)}
#hsc-menu .goal .hsc-ic{width:20px;height:20px}
#hsc-menu .wg{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:8px;flex:none}
#hsc-menu .wi{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px;border-radius:16px;border:3px solid ${K};background:#fff;color:${K};font:900 15px "Arial Rounded MT Bold","Nunito",system-ui,sans-serif;font-variant-numeric:tabular-nums;cursor:pointer;min-height:48px;overflow:hidden}
#hsc-menu .wi img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:11px}
#hsc-menu .wi span{display:flex;align-items:center;gap:2px;height:22px}
#hsc-menu .wi .hsc-ic{width:18px;height:18px}
@media (orientation:landscape){#hsc-menu .hc.pick{grid-template-columns:130px minmax(0,1fr)}#hsc-menu .hc.pick .btns{flex-wrap:nowrap}#hsc-menu .hc.pick .sb,#hsc-menu .hc.pick .sb.wish{flex:1 1 0}}
`;
  const ui = {
    tab: 'free', need: 0, back: null, pick: { clipper: null, gown: null }, shown: STEP, job: 0, built: false,
    page: () => document.querySelector('#hsc-menu .page.shop'),
    // the shop's styles, the tabs' included: also wanted when the Shop opens straight on Parts or Shops (salon.js)
    css() { if (!this.built) { this.built = true; const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st); } },
    tabs(on, dot) { this.css(); return TABS.map(([k, l]) => `<button type="button" role="tab" data-tab="${k}" class="${k === on ? 'on' : ''}" aria-selected="${k === on}">${t(l)}${k === 'free' && dot ? '<span class="dot"></span>' : ''}</button>`).join(''); },
    wire(box) { box.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => { if (HSC.fx) HSC.fx.play('tap'); this.go(b.dataset.tab); })); this.fit(box); },
    // every word whole: the tabs' type (to 12 px) and then the gaps (to 2 px) step down only while the row is too wide;
    // a row that still does not fit takes two rows of three; if even those do not, the row slides and the open tab is
    // brought into view. Returns the screen pixels the one row lacked (0 when it fits), so the salon's side sheet can
    // grow by that much rather than stack its tabs
    fit(box) {
      if (!box || !box.isConnected || !box.clientWidth) return 0;
      // the whole-pixel scroll width can round away a tab that ends a fraction of a pixel past the row: measure the edges too
      const tabs = [...box.children], over = () => {
        if (box.scrollWidth > box.clientWidth + 0.5) return true;
        const r = box.getBoundingClientRect();
        return tabs.some((b) => { const x = b.getBoundingClientRect(); return x.left < r.left - 0.25 || x.right > r.right + 0.25; });
      };
      const plain = () => { box.style.gap = ''; tabs.forEach((b) => (b.style.fontSize = '')); };
      box.classList.remove('two'); plain();
      for (const [size, gap] of [[12, 5], [12, 3], [12, 2]]) { if (!over()) break; box.style.gap = gap + 'px'; tabs.forEach((b) => (b.style.fontSize = size + 'px')); }
      let short = 0;
      if (over()) {
        short = (box.scrollWidth - box.clientWidth) * (box.getBoundingClientRect().width / box.offsetWidth || 1);
        box.classList.add('two'); plain();
        if (over()) tabs.forEach((b) => (b.style.fontSize = '12px'));
      }
      const on = box.querySelector('.on');
      if (on && box.scrollWidth > box.clientWidth + 0.5) { const a = on.getBoundingClientRect(), r = box.getBoundingClientRect(); box.scrollLeft += ((a.left + a.right) - (r.left + r.right)) / 2 / (r.width / box.offsetWidth || 1); }
      return short;
    },
    ready() { const g = HSC.gift ? HSC.gift.state() : null; return !!((g && g.ready) || (HSC.tasks && HSC.tasks.ready())); },
    // the wishlisted item, when it can be had now or with one video: the moment the player most wants to spend
    near() {
      const w = HSC.econ && HSC.econ.wishTarget ? HSC.econ.wishTarget() : null;
      if (!w || !HSC.coins) return null;
      const gap = w.price - HSC.coins.get(), v = HSC.wishVideo ? HSC.wishVideo.state() : null;
      return gap <= 0 || (v && gap <= v.coins) ? w : null;
    },
    // the Shop button: straight to that item when it is close, otherwise the Free tab
    enter() {
      const w = this.near(), k = w ? w.key.split(':') : [];
      if (k[0] === 'wardrobe') { const key = w.key.slice(9), d = C().byKey.get(key); if (d) { this.pick[d.tool] = key; this.go(d.tool); return; } }
      this.go(k[0] !== 'salon' ? 'free' : k[1] === 'shop' ? 'shops' : 'parts');
    },
    // Shops and Parts live over the 3D picture; the other tabs on this page
    // resume: back to the item the coins were for, still picked
    go(tab, need = 0, back = null, resume = false) {
      // Stop any catalogue renderer before changing pages. Detached images used to keep generating after Free/Coins
      // opened, exhausting weak WebView tile memory and allowing an old pink/card tile to reappear over the new page.
      this.job++;
      const old = this.page() && this.page().querySelector('.sbody');
      if (old) { old.onscroll = null; old.scrollTop = 0; }
      this.tab = tab; this.need = need; this.back = back;
      if (tab === 'shops' || tab === 'parts') { if (HSC.salon) HSC.salon.open(tab, resume); return; }
      if (HSC.salon && HSC.salon.hide) HSC.salon.hide();
      this.shown = STEP;
      HSC.menu.view('shop');
      this.render();
    },
    render() {
      const pg = this.page();
      if (!pg) return;
      this.css();
      const bar = pg.querySelector('.hsc-stabs');
      bar.innerHTML = this.tabs(this.tab, this.ready());
      this.wire(bar);
      if (this.tab === 'free') this.free(); else if (this.tab === 'coins') this.coins(); else if (this.tab === 'clipper' || this.tab === 'gown') this.wear(this.tab);
    },
    free() {
      const box = this.page().querySelector('.sbody'), g = HSC.gift.state(), v = HSC.wishVideo ? HSC.wishVideo.state() : null, list = HSC.tasks ? HSC.tasks.list() : [], can = !!(HSC.canVideo && HSC.canVideo());
      box.onscroll = null; box.scrollTop = 0;
      const gift = g.done ? `<div class="hc gift done">${I('gift')}<span>${TICK}</span></div>`
        : g.ready ? `<div class="hc gift">${I('gift')}<span class="tm">${I('coin', 30)} +${fmt(g.pay)}</span><div class="btns"><button class="sb gold" type="button" data-g="1">${I('coin')}+${fmt(g.pay)}</button>${can ? `<button class="sb vid" type="button" data-g="2">${I('video')}+${fmt(g.pay * 2)}</button>` : ''}</div></div>`
          : `<div class="hc gift">${I('gift')}<span class="tm">${this.clock(g.left)}</span></div>`;
      const vid = v && v.left > 0 ? `<button class="sb vid vr" type="button" data-v="1"><span style="display:flex;align-items:center;gap:6px">${I('video')}${I('coin')}+${fmt(v.coins)}</span><em>${fmt(v.left)}</em></button>` : '';
      box.innerHTML = gift + vid + list.map((x, i) => `<div class="tk"><span>${x.text}</span><span class="pgb"><i style="width:${Math.round(100 * x.n / x.goal)}%"></i></span><button class="sb ${x.done && !x.claimed ? 'gold' : ''}" type="button" data-t="${i}" ${x.done && !x.claimed ? '' : 'disabled'}>${x.claimed ? TICK : I('coin') + fmt(x.pay)}</button></div>`).join('');
      void box.offsetHeight; // commit the replacement before a WebView reuses this scroll layer
      box.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', async () => { b.disabled = true; const n = await HSC.gift.claim(b.dataset.g === '2'); if (n === false) { b.disabled = false; if (HSC.nope) HSC.nope(b); return; } if (HSC.fx) HSC.fx.play('coin'); this.render(); }));
      const vb = box.querySelector('[data-v]');
      if (vb) vb.addEventListener('click', async () => { vb.disabled = true; await HSC.wishVideo.run(); this.render(); });
      box.querySelectorAll('[data-t]').forEach((b) => b.addEventListener('click', () => { if (HSC.tasks.claim(+b.dataset.t)) { if (HSC.fx) HSC.fx.play('coin'); this.render(); } }));
    },
    clock(s) { return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); },
    tick() {
      const pg = this.page();
      if (!pg || pg.hidden || this.tab !== 'free' || !HSC.gift) return;
      const g = HSC.gift.state(), el = pg.querySelector('.hc.gift .tm');
      if (g.ready !== this.wasReady) { this.wasReady = g.ready; this.render(); } else if (el && !g.ready && !g.done) el.textContent = this.clock(g.left);
    },
    // what the player sees first: worn, then owned, then today's pick and the rest by price
    list(tool) {
      const a = A(), today = new Set(a.todays()), worn = a.worn(tool), price = (d) => W().price(d);
      const rank = (d) => (d.id === worn ? 0 : a.owns(d.key) ? 1 : today.has(d.key) ? 2 : 3);
      return C().designs[tool].slice().sort((x, y) => (rank(x) - rank(y)) || (price(x) - price(y)) || (x.i - y.i));
    },
    focus(tool) {
      const a = A(), key = this.pick[tool] || a.todays()[tool === 'clipper' ? 0 : 1];
      let d = C().byKey.get(key);
      if (!d || d.tool !== tool) d = C().designs[tool].find((x) => x.id === a.worn(tool)) || C().designs[tool][0];
      return d;
    },
    wear(tool) {
      const box = this.page().querySelector('.sbody'), a = A(), d = this.focus(tool), own = a.owns(d.key), worn = d.id === a.worn(tool), pr = W().price(d);
      box.onscroll = null; box.scrollTop = 0;
      // A focus/buy/wear redraw returns to the first catalogue screen. Keeping a deep scroll count here used to ask a
      // weak phone to recreate every image the player had passed in one burst.
      this.shown = STEP;
      const today = a.todays().includes(d.key), can = !!(HSC.canVideo && HSC.canVideo()), coins = HSC.coins.get(), key = 'wardrobe:' + d.key;
      const wishes = HSC.econ && HSC.econ.wishes ? HSC.econ.wishes() : {}, wished = !!(wishes.cosmetic && wishes.cosmetic.key === key), target = HSC.econ && HSC.econ.wishTarget ? HSC.econ.wishTarget() : null;
      const btns = own ? `<button class="sb gold" type="button" data-a="wear" ${worn ? 'disabled' : ''}>${worn ? TICK : I('wardrobe')}</button>`
        : `<button class="sb gold" type="button" data-a="buy">${I('coin')}${fmt(pr)}</button>${today && can ? `<button class="sb vid" type="button" data-a="video">${I('video')}${t('free')}</button>` : ''}<button class="sb wish" type="button" data-a="wish" aria-pressed="${wished}" aria-label="${t('a_wish')}">${HEART(wished)}</button>`;
      const gap = target ? Math.max(0, target.price - coins) : 0;
      const goal = target ? `<div class="goal">${HEART(true)}${I('coin')}${fmt(target.price)}<span class="pgb"><i style="width:${Math.round(100 * Math.min(1, coins / Math.max(1, target.price)))}%"></i></span>${gap ? '−' + fmt(gap) : TICK}</div>` : '';
      box.innerHTML = `<div class="hc pick"><img class="preview-art" alt="" decoding="async"><div class="tx"><div class="btns">${btns}</div></div></div>${goal}<div class="wg"></div>`;
      box.querySelectorAll('[data-a]').forEach((b) => b.addEventListener('click', () => this.act(b, d)));
      this.all = this.list(tool).filter((x) => x.key !== d.key);
      this.tool = tool;
      const job = ++this.job, hero = box.querySelector('.preview-art');
      HSC.afterInputPaint().then(() => {
        if (job !== this.job || !hero.isConnected || !hero.closest('#hsc-menu.open .page:not([hidden])')) return;
        hero.src = art(d, 300);
        this.more(job, 0);
      });
      box.onscroll = () => { if (box.scrollTop + box.clientHeight > box.scrollHeight - 300 && this.shown < this.all.length) { const from = this.shown; this.shown += STEP; this.more(this.job, from); } };
    },
    // The grid fills one picture per frame. Nine cards keep the approved first screen full without making a weak
    // WebView decode dozens of JPEG data URLs in one burst; more are appended only as the player scrolls.
    more(job, from) {
      const grid = this.page().querySelector('.wg'), a = A(), rows = this.all.slice(from, this.shown), todo = [];
      if (!grid) return; // another tab took the page
      for (const d of rows) {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'wi'; b.dataset.k = d.key;
        b.innerHTML = `<img alt="" loading="lazy" decoding="async"><span>${a.owns(d.key) ? (d.id === a.worn(d.tool) ? TICK : I('wardrobe')) : I('coin') + fmt(W().price(d))}</span>`;
        b.addEventListener('click', () => { this.pick[d.tool] = d.key; this.render(); this.page().querySelector('.sbody').scrollTop = 0; });
        grid.appendChild(b);
        todo.push([b.querySelector('img'), d]);
      }
      const step = () => {
        if (job !== this.job || !grid.isConnected || !grid.closest('#hsc-menu.open .page:not([hidden])')) return;
        const next = todo.shift();
        if (next) { const [img, d] = next; if (img.isConnected) img.src = art(d, 144); }
        if (todo.length) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
    async act(b, d) {
      const kind = b.dataset.a, a = A();
      if (kind === 'wear') { a.wear(d.key); if (HSC.wardrobeApply) HSC.wardrobeApply(); this.render(); return; }
      if (kind === 'wish') { const w = HSC.econ.wishes().cosmetic, key = 'wardrobe:' + d.key; await HSC.econ.wish('cosmetic', w && w.key === key ? null : { key, price: W().price(d) }); this.render(); return; }
      if (kind === 'buy' && HSC.coins.get() < W().price(d)) { const key = 'wardrobe:' + d.key; if (HSC.econ && HSC.econ.wish) await HSC.econ.wish('cosmetic', { key, price: W().price(d) }); this.go('free'); return; }
      b.disabled = true;
      const ok = kind === 'buy' ? await W().buy(d.key) : await a.take(d.key);
      if (ok) { if (HSC.fx) HSC.fx.play('coin'); if (HSC.wardrobeApply) HSC.wardrobeApply(); } else { b.disabled = false; if (HSC.nope) HSC.nope(b); }
      this.render();
    },
  };
  addEventListener('resize', () => requestAnimationFrame(() => { document.querySelectorAll('.hsc-stabs').forEach((b) => ui.fit(b)); }));
  // an ad became ready or stopped being ready (Android): the open tab's video rows follow at once
  addEventListener('hsc-rewarded-ready', () => { const pg = ui.page(); if (pg && !pg.hidden) ui.render(); });
  HSC.shop = { go: (tab, need, back) => ui.go(tab === 'coins' ? 'free' : tab, need, back), enter: () => ui.enter(), dot: () => ui.ready() || !!ui.near(), render: () => ui.render(), tick: () => ui.tick(), ready: () => ui.ready(), tabs: (on) => ui.tabs(on, ui.ready()), wire: (el) => ui.wire(el), fit: (el) => ui.fit(el) };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): the clipper is the game's only tool, in every mode (owner decision,
// 6 November 2026). Its guards 0-4 do every job on hair, beards and brows; the cut itself stays in the frozen engine.
// This file names the guards for screen readers and tells the career which beard lengths the guards can leave.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  function arc() {
    const el = document.querySelector('.guard-arc');
    if (!el) return;
    const say = (node, key, args) => (HSC.setSpoken ? HSC.setSpoken(node, key, args) : node.setAttribute('aria-label', key));
    say(el, 'arc_clipper');
    el.querySelectorAll('.rung').forEach((b) => { const g = +b.textContent; say(b, 'a_guard', { g, mm: HSC.GUARD_MM ? HSC.GUARD_MM[g] : g }); });
  }
  HSC.relabelArc = arc;
  addEventListener('hsc-language', arc);
  new MutationObserver(() => { const el = document.querySelector('.guard-arc'); if (el && !el.dataset.hscSeen) { el.dataset.hscSeen = '1'; arc(); } }).observe(document.documentElement, { childList: true, subtree: true });
  // the blade follows curved skin a little, so the groove under the nose comes clean too
  HSC.beardDepth = 0.16;
  // on a beard, guard 0 shaves to the skin, so any beard can be taken off completely
  HSC.toolBeard = (g) => (+g === 0 ? 0 : HSC.GUARD_LEVEL[g]);
  // the beard lengths the guards leave: the career director offers only beard requests these can reach
  HSC.beardReach = () => [...new Set(Object.keys(HSC.GUARD_LEVEL || {}).map(HSC.toolBeard))].sort((a, b) => a - b);
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1; owner-approved items M1-M7, 5 November 2026): game modes, picked on the
// home screen (menu.js). Every mode keeps the interstitial after every cut, the undo videos and x3 tips.
//
//   requests  (M1) the career: a customer asks for a cut, 1-3 stars, tips, regulars, VIPs
//   free      (M2) Quick Play (the former freestyle; `free` stays the saved id): no request and no stars, no
//             progression; Finish brings the next customer. It is a Home action, not a Modes tile.
//   fix       (M3) Rescue: a clipper job gone wrong walks in, hair and sometimes beard (a gouge, tracks, a step, a crooked
//             line-up). There is no order and no stars: the barber rescues it on their own judgment, for a set pay once real
//             work is done (owner decision, 6 November 2026). Level 2.
//   beard     (M5) Beards: bearded customers, and the barber decides what to do. No order, no stars, a set pay. Level 2.
//   rush      (M7) Orders against a 45 s clock that ticks down: order, stars and the best pay of the modes, and the time left
//             adds coins. Never fails. The third customer in Orders is a one-off taste of it at its full pay; the mode itself
//             opens at level 6 (15 customers), free, with nothing that skips the wait. Career keeps these jobs from level 4.
// Inside Career the same rules hold, except that a showcase keeps its order and stars: a city's mastery is earned there.
// The mode, its current job (the flawed start and its repair) are saved with the progress.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const INK = '#10223f';
  const M = () => HSC.meta, G = () => globalThis.skinFadeStudio;
  const LIST = ['requests', 'free', 'fix', 'beard', 'rush'];
  const LEVEL = { career: 1, requests: 1, free: 1, fix: 2, beard: 2, rush: 6 };
  const CAREER_LEVEL = { fix: 2, beard: 2, rush: 4 }; // when Career may seat these jobs: the mode's own lock does not change Career
  const data = () => {
    const d = M() && M().data;
    if (!d) return null;
    if (!d.modes || typeof d.modes !== 'object') d.modes = { mode: 'requests', job: null };
    return d.modes;
  };
  const level = () => (M() && M().data ? M().level() : 1);
  // a mode the player has already played stays open
  const unlocked = (m) => level() >= LEVEL[m] || !!(data() && Array.isArray(data().tried) && data().tried.includes(m));
  const inCareer = (m) => level() >= (CAREER_LEVEL[m] || 1);
  // 'career' (career-run.js) is the main game; the listed modes are also playable on their own
  const CR = () => HSC.careerRun && HSC.careerRun.ready() ? HSC.careerRun : null;
  const current = () => { const md = data(); if (md && md.mode === 'career' && CR()) return 'career'; const m = md && LIST.includes(md.mode) ? md.mode : 'requests'; return unlocked(m) ? m : 'requests'; };
  const hash = (str) => { let h = 2166136261; for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619); return h >>> 0 || 1; };
  const today = () => (M() && M().today ? M().today() : new Date().toISOString().slice(0, 10));
  const K = () => HSC.requestKit;
  const pack = (a) => HSC.gridPack(a), unpack = (s, max) => (typeof s === 'string' ? HSC.gridUnpack(s, max) : null);
  const BTOP = () => (HSC.BEARD_MM ? HSC.BEARD_MM.length - 1 : 16);

  // ---- cuts that suit him and are worth cutting from this start, weighted (requests.js rules) ----
  function options(person, start) {
    const out = [];
    for (const st of K().STYLES) {
      if (st.fam === 'trim') continue;
      const w = K().askFor(st, person, start);
      if (!w) continue;
      const t = K().targetFor(st, start);
      if (K().worthCutting(start, t)) out.push([w, st, t]);
    }
    // only styles his hair can really make; if none fully fits, the closest list stays
    const honest = out.filter((o) => K().fits(o[1], start));
    return honest.length ? honest : out;
  }
  // the game avoids repeating itself: what was asked for or botched lately is far less likely to come up again. The list
  // is saved, and it only changes when a job is set or finished, so a request is the same after a reload. Career has its
  // own repetition rules (director.js), so its contracts stay purely seeded.
  const askId = (x) => (x && x.id) || x;
  const asked = () => { const md = data(); if (!md || current() === 'career') return []; return Array.isArray(md.ask) ? md.ask : (md.ask = []); };
  const recently = (x) => asked().includes(askId(x));
  const noteAsk = (x) => { const a = asked(); if (!data() || current() === 'career') return; a.push(askId(x)); if (a.length > 14) a.splice(0, a.length - 14); };
  function choose(R, opts) {
    const w = opts.map((o) => o[0] * (recently(o[1]) ? 0.1 : 1));
    let r = R.next() * w.reduce((a, b) => a + b, 0);
    for (let i = 0; i < opts.length; i++) if ((r -= w[i]) <= 0) return opts[i];
    return opts[opts.length - 1];
  }
  const U = (i) => (i % 128) / 128, V = (i) => Math.floor(i / 128) / 64;
  const du = (a, b) => { const d = Math.abs(a - b); return Math.min(d, 1 - d); };

  // ---- M3: a hair disaster ----
  // The barber before finished a cut, then got it wrong. The customer arrives with that finished cut and its mistakes
  // (owner decision, 9 November 2026: a rescue must look like a bad haircut, not a cut half done). Within the game's
  // parameters (one length per cell, levels 0-5, a clipper that only shortens) a cut can be bad in two ways:
  //   too short  gouge, chunks, tracks, a ledge (step), a bowl line, a fade taken too high on one side (fadehigh), one
  //              sideburn higher, a crooked neckline (nape), a crooked line-up, a stripe run up the head with no guard,
  //              a zigzag where the fade should be, one side of the top cut shorter (lopsided), a bite out of the
  //              front hairline (notch)
  //   left long  missed patches, one side not done (side), the blend skipped: a hard step (noblend)
  // The repair (the job's target) is what a barber does with a clipper: what was left long is cut to the style, a
  // one-sided mistake is matched on the other side, a crooked line is cut straight at its highest point, and a hole is
  // faded into the hair round it. It is never longer than what he walked in with, so it is always possible.
  const REPAIR_MIN = 120; // cells still longer than the repair: twice what counts as real work (MIN_WORK)
  const SEEN_MIN = 150; // cells at least two lengths (6 mm) off the style, or bare where the style keeps hair: a mistake that shows
  // two lengths apart (6 mm) shows, and so does hair against bare skin (3 mm regrowth on a shaved head)
  const shows = (a, b) => Math.abs(a - b) >= 2 || (Math.min(a, b) === 0 && Math.max(a, b) >= 1);
  const mirrorCell = (i) => (i & ~127) | ((128 - (i & 127)) & 127); // the same place on the other side of the head (front u = 0)
  // a faded repair: one length per 2.5 cells round the head and per 3.5 cells up it (hair grid cells are taller than wide)
  function fadeInto(t2, seeds) {
    const f = Float32Array.from(t2), q = seeds.slice(), inQ = new Uint8Array(8192);
    for (const i of q) inQ[i] = 1;
    const STEP_U = 1 / 2.5, STEP_V = 1 / 3.5;
    while (q.length) {
      const i = q.pop(); inQ[i] = 0;
      const cx = i & 127, cy = i >> 7;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        const yy = cy + dy; if (yy < 0 || yy > 63) continue;
        const n = yy * 128 + ((cx + dx + 128) & 127), c = f[i] + (dx ? STEP_U : STEP_V);
        if (c < f[n] - 1e-4) { f[n] = c; if (!inQ[n]) { inQ[n] = 1; q.push(n); } }
      }
    }
    for (let i = 0; i < 8192; i++) t2[i] = Math.min(t2[i], Math.round(f[i]));
  }
  function disaster(person, start, R, force, beard) {
    // a repair needs room to show a mistake: only styles that take a real amount off, the biggest change if none does
    const room = (t) => { let n = 0; for (let i = 0; i < 8192; i++) if (start[i] - t[i] >= 2) n++; return n; };
    const all = options(person, start).map((o) => [o, room(o[2])]);
    const big = all.filter((o) => o[1] >= 700), opts = big.length ? big.map((o) => o[0]) : all.length ? [all.reduce((a, b) => (b[1] > a[1] ? b : a))[0]] : [];
    // every Rescue customer has a disaster: with no cut that suits him, it is the cut he walked in with that went wrong
    const [, style, target] = opts.length ? choose(R, opts) : [0, K().byId.get('trim') || { id: 'trim', fam: 'trim' }, start.slice()];
    // where hair was left long can show (two lengths over the style), and where there is hair to take too short (on a
    // 3 mm buzz a slip to the skin shows as clearly as a hole in a longer top)
    const long = [], thick = [];
    for (let i = 0; i < 8192; i++) { if (start[i] > target[i] && shows(start[i], target[i])) long.push(i); if (target[i] >= 1) thick.push(i); }
    const canShort = thick.length >= 200, canLong = long.length >= 200;
    if (!canShort && !canLong) return null;
    let bad, fix, holes, names;
    const pick = (list) => list[Math.floor(R.next() * list.length)];
    // too short: down to `to` (never below the clipper's 0); a hole is faded in, a line or one side is put right by `fix`
    const short = (i, to, hole) => { const v = Math.max(0, Math.min(bad[i], to)); if (v < bad[i]) { bad[i] = v; if (hole) holes.push(i); } };
    const lng = (i) => { bad[i] = Math.max(bad[i], start[i]); }; // left at the length he walked in with
    const fixTo = (i, v) => fix.push(i, v);
    const oval = (u0, v0, ru, rv, f) => { for (let i = 0; i < 8192; i++) { const a = du(U(i), u0) / ru, b = (V(i) - v0) / rv; if (a * a + b * b < 1) f(i); } };
    // the lowest the style goes in this cell's column, below its height: the fade's own bottom length
    const colMin = new Int8Array(128).fill(9);
    for (let i = 0; i < 8192; i++) if (V(i) < 0.35 && target[i] > 0) colMin[i & 127] = Math.min(colMin[i & 127], target[i]);
    const KINDS = {
      // a clipper slipped: a deep oval hole, nearly to the skin
      gouge() { const c = pick(thick.filter((i) => target[i] >= 3).concat(thick)); oval(U(c), V(c), R.range(0.045, 0.07), R.range(0.08, 0.13), (i) => short(i, R.next() < 0.6 || target[i] < 3 ? 0 : 1, true)); },
      // bites taken out here and there
      chunks() { const big = thick.filter((i) => target[i] >= 3), from = big.length > 100 ? big : thick; for (let k = R.int(5, 8); k > 0; k--) { const c = pick(from), r = R.range(0.02, 0.032); oval(U(c), V(c), r, r * 2.2, (i) => short(i, target[i] - 3, true)); } },
      // guard lines: parallel stripes cut two lengths too short
      tracks() { const c = pick(thick), u0 = U(c), n = R.int(3, 5), gap = R.range(0.05, 0.075), w = R.range(0.01, 0.016), v0 = Math.max(0.15, V(c) - 0.3), v1 = Math.min(1, V(c) + 0.3); for (let i = 0; i < 8192; i++) if (V(i) > v0 && V(i) < v1) for (let k = 0; k < n; k++) if (du(U(i), (u0 + k * gap) % 1) < w) short(i, target[i] - 2, true); },
      // a ring cut at the wrong height, two lengths too short: a ledge
      step() { const v0 = R.range(0.35, 0.65), h = R.range(0.03, 0.05); for (const i of thick) if (Math.abs(V(i) - v0) < h) short(i, target[i] - 2, true); },
      // a home bowl cut: everything below a wobbly line taken right down, no blending
      bowl() { const v0 = R.range(0.4, 0.55), tilt = R.range(0.04, 0.1), ph = R.next(), to = R.int(0, 1); for (let i = 0; i < 8192; i++) if (V(i) < v0 + tilt * Math.sin((U(i) + ph) * Math.PI * 2)) short(i, to, true); },
      // the fade taken too high on one side; the repair takes the other side up to match
      fadehigh() { const u0 = R.next() < 0.5 ? 0.25 : 0.75, w = R.range(0.12, 0.18), top = R.range(0.42, 0.55); for (let i = 0; i < 8192; i++) if (du(U(i), u0) < w && V(i) < top && target[i] > 0) { short(i, Math.min(target[i], colMin[i & 127]), false); fixTo(mirrorCell(i), bad[i]); } },
      // one sideburn taken right up; the repair takes the other up to match
      sideburn() { const u0 = R.next() < 0.5 ? 0.25 : 0.75, w = R.range(0.04, 0.065), top = R.range(0.3, 0.42); for (let i = 0; i < 8192; i++) if (du(U(i), u0) < w && V(i) < top) { short(i, 0, false); fixTo(mirrorCell(i), 0); } },
      // a crooked neckline taken up into the nape; the repair is a straight line at its highest point
      nape() { const w = R.range(0.1, 0.16), top = R.range(0.12, 0.2), lean = R.range(0.3, 0.6) * (R.next() < 0.5 ? -1 : 1); for (let i = 0; i < 8192; i++) { const d = du(U(i), 0.5); if (d >= w) continue; if (V(i) < top * (1 + lean * (U(i) - 0.5) / w)) short(i, 0, false); if (V(i) < top * (1 + Math.abs(lean))) fixTo(i, 0); } },
      // a crooked line-up at the front: the edge cut up at a slant; the repair is a straight edge at its highest point
      lineup() { const u0 = R.range(-0.08, 0.08), w = R.range(0.14, 0.22), top = R.range(0.1, 0.18), sl = R.next() < 0.5 ? -1 : 1; for (let i = 0; i < 8192; i++) { const d = du(U(i), (u0 + 1) % 1); if (d >= w) continue; const sgn = ((U(i) - u0 + 1.5) % 1) - 0.5; if (V(i) < top * (0.5 + 0.5 * sl * sgn / w)) short(i, 0, false); if (V(i) < top) fixTo(i, 0); } },
      // the clipper run up the head with no guard on: one stripe to the skin
      stripe() { const c = pick(thick.filter((i) => V(i) > 0.35).concat(thick)), u0 = U(c), w = R.range(0.012, 0.02), v0 = Math.max(0.05, V(c) - R.range(0.25, 0.4)), v1 = Math.min(1, V(c) + R.range(0.2, 0.4)); for (let i = 0; i < 8192; i++) if (V(i) > v0 && V(i) < v1 && du(U(i), u0) < w) short(i, 0, true); },
      // the fade line wandered: a zigzag where it should run straight; the repair is a straight line at its highest point
      zigzag() { const v0 = R.range(0.2, 0.32), amp = R.range(0.05, 0.09), f = R.int(10, 16), ph = R.next(); for (let i = 0; i < 8192; i++) { if (!(target[i] > colMin[i & 127]) || colMin[i & 127] > 5) continue; const t = (U(i) * f + ph) % 1, line = v0 + amp * (1 - 2 * Math.abs(t - 0.5)); if (V(i) < line) short(i, colMin[i & 127], false); if (V(i) < v0 + amp) fixTo(i, colMin[i & 127]); } },
      // one side of the top taken two lengths shorter than the other; the repair takes the other side down to match
      lopsided() { const u0 = R.next() < 0.5 ? 0.25 : 0.75; for (let i = 0; i < 8192; i++) if (V(i) > 0.5 && du(U(i), u0) < 0.25 && target[i] >= 1) { short(i, target[i] - 2, false); fixTo(mirrorCell(i), bad[i]); } },
      // a bite out of the front hairline, faded in by the repair
      notch() { const u0 = R.range(-0.06, 0.06), v0 = R.range(0.04, 0.12); oval((u0 + 1) % 1, v0, R.range(0.025, 0.04), R.range(0.08, 0.14), (i) => short(i, 0, true)); },
      // the job left unfinished: patches missed, still at the length he walked in with
      missed() { if (long.length < 200) return; for (let k = R.int(3, 5); k > 0; k--) { const c = pick(long), r = R.range(0.035, 0.055); oval(U(c), V(c), r, r * 2, (i) => { if (start[i] > target[i] && shows(start[i], target[i])) lng(i); }); } },
      // one side never done
      side() { if (long.length < 200) return; const c = pick(long), u0 = U(c), w = R.range(0.16, 0.24); for (const i of long) if (du(U(i), u0) < w) lng(i); },
      // the blend skipped: the in-between lengths left long, so the top drops straight onto the sides
      noblend() { for (const i of long) if (target[i] > colMin[i & 127] && V(i) < 0.75) lng(i); },
    };
    // what really goes wrong depends on the hair: clipper tracks show in straight hair, a line-up is where tight curls go wrong
    const ty = (person.hair && person.hair.type) || '1b', coily = /^(3c|4)/.test(ty), straight = /^[12]/.test(ty);
    const odds = { gouge: 2, chunks: 1.2, step: 1.4, bowl: 0.6, fadehigh: 1.6, sideburn: 1.2, nape: 1.4, missed: 1.4, side: 1.2, noblend: 1.2, tracks: straight ? 2.2 : 0.5, lineup: coily ? 3 : 0.8, stripe: 1.2, zigzag: 1, lopsided: 1.2, notch: coily ? 1.4 : 0.8 };
    // a cut right down to the skin can only have been left long; a head with nothing left long only cut too short
    const LONG = ['missed', 'side', 'noblend'];
    for (const k of Object.keys(odds)) if (LONG.includes(k) ? !canLong : !canShort) delete odds[k];
    const seen = () => { let n = 0; for (let i = 0; i < 8192; i++) if (shows(bad[i], target[i])) n++; return n; };
    let t2;
    const make = (list) => {
      bad = target.slice(); fix = []; holes = []; names = list.slice();
      for (const n of names) KINDS[n]();
      // a mistake that does not show is not a rescue: add another until it does
      for (let k = 0; k < 4 && !force && seen() < SEEN_MIN; k++) { const left = Object.entries(odds).filter(([n]) => !names.includes(n)); if (!left.length) break; const n = choose(R, left.map(([k2, w]) => [w, k2]))[1]; names.push(n); KINDS[n](); }
      t2 = target.map((v, i) => Math.min(v, bad[i]));
      for (let k = 0; k < fix.length; k += 2) t2[fix[k]] = Math.min(t2[fix[k]], fix[k + 1]);
      fadeInto(t2, holes);
      for (let i = 0; i < 8192; i++) if (t2[i] > bad[i]) t2[i] = bad[i];
    };
    const draw = () => { const l = []; for (let n = R.next() < 0.45 ? 2 : 1; n > 0; n--) { const left = Object.entries(odds).filter(([k]) => !l.includes(k)); if (left.length) l.push(choose(R, left.map(([k, w]) => [w, k]))[1]); } return l; };
    const left = () => { let n = 0; for (let i = 0; i < 8192; i++) if (bad[i] > t2[i]) n++; return n; };
    make(force || draw());
    // a rescue always leaves a real repair to do and shows its mistakes; otherwise it is drawn again, or none is made
    const ok = () => left() >= REPAIR_MIN && seen() >= SEEN_MIN;
    for (let k = 0; k < 3 && !force && !ok(); k++) make(draw());
    // every Rescue customer has a disaster: the mistakes that always show on what he has
    for (const l of [['gouge', 'chunks'], ['bowl'], ['side', 'missed'], ['stripe', 'gouge', 'chunks']]) { if (force || ok()) break; if (l.every((n) => odds[n])) make(l); }
    if (!force && !(left() > 0 && seen() > 0)) return null;
    // a man with a beard may have had that botched too
    const fixBeard = Array.isArray(beard) && !force && R.next() < 0.45 ? beardDisaster(person, beard, R) : null;
    return { start: bad, target: t2, style, flaws: names, beard: fixBeard };
  }
  // A beard botched the same way: the barber before shaped it, then got one side or a line wrong, or left patches long.
  // The repair matches the good side to the bad one (or cuts what was left long), only ever with lengths the clipper's
  // guards reach, so it is always possible.
  const BEARD_SEEN = 60;
  function beardDisaster(person, start, R) {
    const j = beardJob(person, start, R);
    if (!j) return null;
    const reach = HSC.beardReach ? HSC.beardReach() : [0];
    const has = [], long = [];
    for (let i = 0; i < 8192; i++) { if (j.target[i] >= 3) has.push(i); if (start[i] - j.target[i] >= 2) long.push(i); }
    if (has.length < 150) return null;
    const BU = (i) => ((i & 127) + 0.5) / 128, BV = (i) => ((i >> 7) + 0.5) / 64, mirror = (i) => (i & ~127) | (127 - (i & 127));
    const vs = has.map(BV), lo = Math.min(...vs), hi = Math.max(...vs), side = R.next() < 0.5, half = (i) => (BU(i) < 0.5) === side;
    const bad = j.target.slice(), fix = [];
    // one side shorter, or a line cut up on one side: the other side is matched to it
    const oneSide = (i, to) => { if (to < bad[i]) { bad[i] = to; fix.push(mirror(i), to); } };
    // a length the guards reach, two or more lengths under the beard's usual length on that side
    let usual = 0; for (const i of has) usual = Math.max(usual, j.target[i]);
    const shorter = reach.filter((l) => l <= usual - 3);
    const KINDS = {
      // one side taken down a guard too far
      lopsided() { if (!shorter.length) return; const to = shorter[Math.floor(R.next() * shorter.length)]; for (const i of has) if (half(i) && j.target[i] - to >= 2) oneSide(i, to); },
      // the cheek line pushed up on one side
      cheek() { const top = hi - (hi - lo) * R.range(0.2, 0.34); for (const i of has) if (half(i) && BV(i) > top) oneSide(i, 0); },
      // the neckline pushed up on one side
      neck() { const low = lo + (hi - lo) * R.range(0.16, 0.3); for (const i of has) if (half(i) && BV(i) < low) oneSide(i, 0); },
      // patches left at the length he walked in with
      missed() { if (long.length < 100) return; for (let k = R.int(3, 5); k > 0; k--) { const c = long[Math.floor(R.next() * long.length)], u0 = BU(c), v0 = BV(c), r = R.range(0.03, 0.05); for (const i of long) { const a = (BU(i) - u0) / r, b = (BV(i) - v0) / (r * 1.6); if (a * a + b * b < 1) bad[i] = start[i]; } } },
    };
    const seen = () => { let n = 0; for (let i = 0; i < 8192; i++) if (Math.abs(bad[i] - j.target[i]) >= 2) n++; return n; };
    const order = [];
    for (let k = 0; k < 4 && seen() < BEARD_SEEN; k++) {
      const left = [[2, 'lopsided'], [2, 'cheek'], [1.5, 'neck'], [1.5, 'missed']].filter(([, n]) => !order.includes(n));
      const n = choose(R, left)[1]; order.push(n); KINDS[n]();
    }
    if (seen() < BEARD_SEEN) return null;
    const t2 = j.target.map((v, i) => Math.min(v, bad[i]));
    for (let k = 0; k < fix.length; k += 2) t2[fix[k]] = Math.min(t2[fix[k]], fix[k + 1]);
    return { start: bad, target: t2, style: j.style, flaw: order[0], flaws: order };
  }

  // ---- M7: a tidy-up: a finished cut with a little regrowth in one or two places ----
  // a tidy-up is never already finished: regrowth only shows where the style takes hair off, so a style that cuts little
  // in the grown zones could leave nothing to do. Too little grown back: every zone grows; still too little: another style
  const TIDY_MIN = 300; // cells grown back, so the job is real work (MIN_WORK below is what counts as worked)
  function tidy(person, start, R) {
    let opts = options(person, start);
    while (opts.length) {
      const pick = choose(R, opts), [, style, target] = pick;
      const s = target.slice();
      const grow = (i) => { s[i] = Math.min(start[i], Math.max(s[i], target[i] + 1)); };
      const ZONES = {
        nape() { for (let i = 0; i < 8192; i++) if (V(i) < 0.16) grow(i); },
        side() { const u0 = R.next(); for (let i = 0; i < 8192; i++) if (du(U(i), u0) < 0.14 && V(i) < 0.45) grow(i); },
        ring() { const v0 = R.range(0.25, 0.45); for (let i = 0; i < 8192; i++) if (Math.abs(V(i) - v0) < 0.06) grow(i); },
      };
      const grown = () => { let n = 0; for (let i = 0; i < 8192; i++) if (s[i] > target[i]) n++; return n; };
      for (const z of Object.keys(ZONES).sort(() => R.next() - 0.5).slice(0, R.next() < 0.5 ? 2 : 1)) ZONES[z]();
      // (the usual case draws nothing more, so tidy-ups that already had enough to do are unchanged)
      if (grown() < TIDY_MIN) for (const z of Object.keys(ZONES)) ZONES[z]();
      if (grown() >= TIDY_MIN) return { start: s, target, style };
      opts = opts.filter((o) => o !== pick);
    }
    return null;
  }

  // ---- M5: the beard he asks for, from the beard he walked in with ----
  // what a customer can ask for (docs/BEARD-MATRIX.md). Sparse growth asks for what it can really hold: a patchy beard
  // rarely asks for a full cheek line. Growth comes from the person's own density, never directly from his group.
  const BEARD_TO = ['corporate', 'boxed', 'rounded', 'hollywood', 'chincurtain', 'extended', 'goatee', 'vandyke', 'chinstrap', 'balbo', 'anchor', 'circle', 'stubble5', 'stubble1', 'soulpatch', 'moustache', 'mutton', 'friendly', 'sideburns', 'clean'];
  const FULL_LINE = ['corporate', 'boxed', 'rounded', 'friendly', 'mutton'];
  // every style with something to work on comes through the door
  const BEARDED = HSC.BEARD_ARRIVALS = Object.keys(HSC.BEARD_STYLES || {}).filter((k) => k !== 'clean' && k !== 'stubble1' && k !== 'stubble');
  function beardGrid(person, style) {
    const S = HSC.BEARD_STYLES[style] || {}, mm = {};
    for (const k of ['moustache', 'chin', 'cheeks', 'jaw', 'neck']) mm[k] = S[k] ? Math.min(person.beard.mm[k] || 99, (S[k][0] + S[k][1]) / 2) : 0;
    return HSC.beardStartFor(Object.assign({}, person, { beard: Object.assign({}, person.beard, { style, mm }) }));
  }
  function beardJob(person, start, R) {
    const opts = [];
    for (const st of BEARD_TO) {
      if (st === person.beard.style) continue;
      const g = beardGrid(person, st), t = start.map((v, i) => Math.min(v, g[i]));
      let n = 0;
      for (let i = 0; i < 8192; i++) if (start[i] - t[i] >= 2) n++;
      if (n >= 120) opts.push([(st === 'clean' ? 1.6 : 1) * (FULL_LINE.includes(st) ? Math.max(0.1, 1 - 1.4 * (person.beard.patchy || 0)) : 1), st, t]);
    }
    if (!opts.length) return null;
    const [, style, target] = choose(R, opts);
    return { style, target };
  }
  // the beard a known style asks for from this start (a saved order is rebuilt exactly, requests.js)
  const beardTarget = (person, start, style) => { const g = beardGrid(person, style); return start.map((v, i) => Math.min(v, g[i])); };
  // stars for a beard request: the share of his beard within one length of the asked beard, counted from where he
  // started (as requests.js does for hair): 60% for 2 stars, 85% for 3
  // The job (cells that need work) and a slip (cells that were right and are now wrong) are counted apart: the job
  // done is its share of the job, and a slip is weighed against the job's size but never against less than SLIP_FLOOR of
  // the beard, so a small job is not lost to one slip. A perfect beard is 3 stars, an untouched one none of the job.
  // (requests.js does the same for the hair)
  const SLIP_FLOOR = 0.2;
  function beardStars(s, r) {
    const st = s.startBeard, now = s.beard, t = r.beard;
    if (!Array.isArray(st) || !Array.isArray(now) || !t) return 1;
    let n = 0, job = 0, done = 0, slip = 0;
    for (let i = 0; i < 8192; i++) {
      if (!(st[i] > 0)) continue;
      n++;
      const ok = Math.abs(now[i] - t[i]) <= 1;
      if (Math.abs(st[i] - t[i]) > 1) { job++; if (ok) done++; } else if (!ok) slip++;
    }
    if (!n) return 1;
    const k = Math.max(0, Math.min(1, (job ? done / job : 1) - slip / Math.max(job, SLIP_FLOOR * n)));
    return k >= 0.85 ? 3 : k >= 0.6 ? 2 : 1;
  }

  // ---- who comes in ----
  // the last customer's group and age, so the next one is someone visibly different
  const lastSeat = { her: null, age: null };
  function modePerson(mode, job, seed) {
    const R = HSC.rng((seed ^ 0x6a09e667) >>> 0 || 1), d = M() && M().data;
    // Quick Play is the open game: besides the ordinary walk-ins, the whole beard catalogue comes through the door
    const walkIn = d && d.queue && d.queue.person, twin = !!walkIn && walkIn.heritage === lastSeat.her;
    if (mode === 'free' && (!d || !d.cuts || (R.next() >= 0.4 && !twin))) return null;
    // the beard studio selects a customer who already has a beard (never rewrites one); the fallback is only for an
    // impossible run of seeds, so the mode can never stall
    // every style has an even turn here, so a player meets the whole catalogue
    const want = BEARDED[hash('beard-' + seed) % BEARDED.length], s0 = seed >>> 0 || 1;
    const p = HSC.selectPerson(s0, {}, (x) => x.beard.style === want && x.heritage !== lastSeat.her && x.age !== lastSeat.age, 600) ||
      HSC.selectPerson(s0, {}, (x) => x.beard.style === want, 600) || HSC.makePerson(s0, { beard: want });
    return Object.assign(p, { job });
  }
  const wantsPerson = (m) => m === 'beard' || m === 'free';
  function hook() {
    // the customer for a new job (no queued customer) in a mode with its own customers
    const pfj = HSC.personForJob;
    HSC.personForJob = function (s, seed) {
      const d = M() && M().data, m = current();
      if (m === 'career') {
        const p = CR().person(s.jobId);
        if (p) return p;
        // the chapter is over (or the founding city is not chosen): the world map asks where to go next
        if (CR().needsChoice() && HSC.menu && HSC.menu.career) HSC.lifecycle.timeout(() => HSC.menu.career(), 0);
      }
      if (wantsPerson(m) && !(d && d.queue && d.queue.job === s.jobId)) { const p = modePerson(m, s.jobId, seed); if (p) return p; }
      return pfj.apply(this, arguments);
    };
    // after a finished cut the career picks who comes next; a mode with its own customers puts its own in the queue
    const of = M().onFinish;
    M().onFinish = function (state) {
      const r = of.apply(this, arguments), d = M().data, m = current();
      if (r && d && wantsPerson(m)) {
        const job = state.jobId + 1, seed = (((state.seed >>> 0) ^ Math.imul(job + 1, 0x9e3779b1)) >>> 0) || 1;
        const p = modePerson(m, job, seed);
        if (p) { d.queue = { job, person: p, profile: M().profileFor(p, state.recentLooks) }; M().save(); }
        if (d.queue && d.queue.person) { lastSeat.her = d.queue.person.heritage; lastSeat.age = d.queue.person.age; }
      }
      return r;
    };
    // a new job in a mode that brings its own start (a disaster, a tidy-up, a beard to shape)
    const ens = HSC.ensure;
    HSC.ensure = function (s) {
      const out = ens.apply(this, arguments);
      try { return start(out) || out; } catch (e) { console.error('customers: mode start failed', e); return out; }
    };
  }
  function start(s) {
    const m = current(), md = data();
    if (m === 'career') return CR().start(s);
    if (!md || !s || s.status !== 'cutting' || s.cutStrokeCount || !s.look || !s.look.person || s.look.person.first) return null;
    if (md.job && md.job.n === s.jobId) return null; // this job's start is already made (also after a reload)
    const p = s.look.person;
    // the taste of Rush: once, in Orders, from the third customer, while the mode is still locked
    const taste = m === 'requests' && !md.taste && M().data.cuts >= 2 && !unlocked('rush');
    if (m !== 'fix' && m !== 'rush' && m !== 'beard' && !taste) return null;
    const R = HSC.rng(((p.seed >>> 0) ^ Math.imul((s.jobId | 0) + 11, 0x5851f42d)) >>> 0 || 1);
    if (m === 'beard') {
      if (!Array.isArray(s.startBeard)) return null;
      const b = beardJob(p, s.startBeard, R);
      md.job = b ? { n: s.jobId, m, st: b.style, b: pack(b.target) } : { n: s.jobId, m, none: true };
      if (b) noteAsk(b.style);
      M().save();
      return null;
    }
    const kind = taste ? 'rush' : m;
    const j = kind === 'fix' ? disaster(p, s.startHair, R, null, s.startBeard) : tidy(p, s.startHair, R);
    if (!j) { md.job = { n: s.jobId, m: kind, none: true }; M().save(); return null; }
    md.job = { n: s.jobId, m: kind, st: j.style.id, t: pack(j.target) };
    if (j.beard) md.job.b = pack(j.beard.target);
    noteAsk(j.style); for (const f of j.flaws || []) noteAsk(f);
    if (j.beard) { noteAsk(j.beard.style); noteAsk(j.beard.flaw); }
    M().save();
    const out = Object.assign({}, s, { hair: j.start.slice(), startHair: j.start });
    if (j.beard) Object.assign(out, { beard: j.beard.start.slice(), startBeard: j.beard.start });
    return out;
  }

  // ---- jobs with no order: the barber's judgment decides, so nothing is scored, and a set pay needs real work ----
  const judged = (s) => {
    const m = current();
    if (m === 'fix' || m === 'beard') return true;
    const a = m === 'career' && CR() ? CR().active() : null;
    return !!(a && s && a.job === s.jobId && a.role !== 'showcase' && (a.mode === 'fix' || a.mode === 'beard'));
  };
  // The one test of real work, everywhere work decides something (pay, stars, level, videos, tasks, the Rush bonus and
  // taste, regulars, Career contracts): hair or beard really changed from where he sat down. The stroke counter is not
  // used: it counts pointer samples, stays raised after an undo and counts a brushed brow.
  const MIN_WORK = 60; // cells of hair or beard really changed: a stroke or two
  // a scored job (an order: Orders, Rush, a Career order) also needs this share of the order's own work done: one dab on
  // a big order is not a job (the median order has over a thousand cells to cut, a Rush tidy-up at least 300)
  const ORDER_SHARE = 0.2;
  const changedCells = (s, stop = Infinity) => {
    let n = 0;
    if (!s) return 0;
    for (const [a, b] of [[s.hair, s.startHair], [s.beard, s.startBeard]]) {
      if (!Array.isArray(a) || !Array.isArray(b)) continue;
      for (let i = 0; i < a.length; i++) if (a[i] !== b[i] && ++n >= stop) return n;
    }
    return n;
  };
  // the order's own work: cells longer than the order at the start (a beard within one length of its order already
  // scores, as beardStars counts it), and how many of them have been cut at all
  function orderWork(s, target, beard) {
    let need = 0, done = 0;
    for (const [now, st, t, tol] of [[s.hair, s.startHair, target, 0], [s.beard, s.startBeard, beard, 1]]) {
      if (!Array.isArray(now) || !Array.isArray(st) || !Array.isArray(t)) continue;
      for (let i = 0; i < t.length; i++) if (st[i] - t[i] > tol) { need++; if (now[i] < st[i]) done++; }
    }
    return { need, done };
  }
  // a job with no order still has a repair or a beard it was built for (Rescue, Beards; standalone or a Career contract)
  function repairOf(s) {
    const md = data(), j = md && md.job;
    if (current() !== 'career') return j && j.n === s.jobId && !j.none ? { t: j.m === 'beard' ? null : unpack(j.t, 5), b: j.b ? unpack(j.b, BTOP()) : null } : null;
    const a = CR() && CR().active();
    return a && a.job === s.jobId && a.request ? { t: a.request.t ? unpack(a.request.t, 5) : null, b: a.request.bt ? unpack(a.request.bt, BTOP()) : null } : null;
  }
  // real work. A scored job: MIN_WORK cells (all of the order's work when it has less) and ORDER_SHARE of the order
  // cut. A job without an order (Rescue, Beards, Quick Play, the tutorial): MIN_WORK cells, or the whole of a smaller
  // repair, so a perfect small rescue always counts
  function worked(s) {
    if (!s) return false;
    const r = HSC.requestFor ? HSC.requestFor(s) : null;
    if (r && (r.target || r.beard)) {
      const w = orderWork(s, r.target, r.beard);
      const need = w.need ? Math.min(MIN_WORK, w.need) : MIN_WORK;
      return changedCells(s, need) >= need && (!w.need || w.done >= ORDER_SHARE * w.need);
    }
    const rp = judged(s) ? repairOf(s) : null, w = rp ? orderWork(s, rp.t, rp.b) : null;
    const need = w && w.need ? Math.min(MIN_WORK, w.need) : MIN_WORK;
    return changedCells(s, need) >= need;
  }

  // ---- what each mode asks for (requests.js) ----
  const reqCache = { key: null, val: undefined };
  function request(s) {
    const m = current(), md = data(), p = s.look && s.look.person;
    if (judged(s)) return null;
    // a career chair without its contract (between chapters) asks for nothing
    if (m === 'career') { const r = CR().request(s); return r !== undefined ? r : null; }
    if (m === 'free') return null;
    const j = md && md.job && md.job.n === s.jobId ? md.job : null;
    // no tidy-up could be made for him: a Rush customer asks for an ordinary cut instead (still on the clock), so he is
    // never scored without an order
    if (!j || j.none) return m === 'beard' || m === 'fix' ? null : undefined;
    const key = s.jobId + ':' + j.m + ':' + j.st;
    if (reqCache.key === key) return reqCache.val;
    let val;
    if (j.m === 'beard') { const b = unpack(j.b, BTOP()); val = b ? { style: { id: 'beard:' + j.st, fam: 'beard' }, beard: b } : null; }
    else { const t = unpack(j.t, 5), b = j.b ? unpack(j.b, BTOP()) : null; val = t ? { style: K().byId.get(j.st) || { id: j.st, fam: 'fix' }, target: t, beard: b } : null; }
    reqCache.key = key; reqCache.val = val;
    return val;
  }

  // ---- tips and results ----
  // the clock counts play time only (not an ad, the app in the background, a menu or the Open splash) and the time
  // used is saved with the job, so a restart or a mode switch cannot give it back
  // A Career contract keeps its clock by the contract's id (Career seats a suspended contract on a new job number), any
  // other job by its job number; `ads` counts videos in progress, which always hold the clock
  const rush = { job: null, key: null, used: 0, last: 0, saved: -1, held: true, ads: 0, LIMIT: 45000 };
  HSC.onHostPause((paused) => { if (paused) rush.held = true; });
  addEventListener('blur', (e) => { if (e.target === window) rush.held = true; }); // the window, not a button losing focus
  // a host pause or an ad freezes this tick entirely, so watch the pause flag the client sets on <html> (client.js)
  try { new MutationObserver(() => { rush.held = true; }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] }); } catch (e) {}
  const timeLeft = () => (rush.job == null ? 0 : Math.max(0, rush.LIMIT - rush.used));
  // the economy (economy.js) prices every mode by its fee: no mode multiplies tips any more
  function tips(base) { return base; }
  // what the economy needs to know about this job's mode: the kind, a Rush time bonus (0-12). The bonus is for a job
  // done well and fast: only real work of 2 stars or more earns it (`stars`, from requests.js), so a dab and Finish
  // at once earns nothing from the clock
  function econJob(s, stars) {
    const m = current();
    const md = data(), taste = m === 'requests' && md && md.job && md.job.n === s.jobId && md.job.m === 'rush' && !md.job.none;
    const out = { kind: taste ? 'rush' : m === 'requests' || m === 'career' ? 'requests' : m };
    if (m === 'career' && CR() && CR().unscored()) out.kind = 'free'; // no contract in the chair: practice, no pay
    if (rush.job === s.jobId && stars >= 2 && worked(s)) out.rushBonus = Math.round(HSC.economy.CONFIG.rushMax * timeLeft() / rush.LIMIT);
    return out;
  }
  function done(s, stars) {
    const md = data();
    if (!md) return;
    const ca = current() === 'career' && CR() ? CR().active() : null, cid = ca && ca.job === s.jobId ? String(ca.id) : null;
    if (current() === 'career') CR().done(s, stars);
    // the taste is spent only once it has been finished with real work, so a customer skipped by changing mode, or
    // finished (or timed out) untouched, does not use it up
    if (current() === 'requests' && md.job && md.job.n === s.jobId && md.job.m === 'rush' && !md.job.none && stars > 0 && worked(s)) { md.taste = true; M().save(); }
    if (rush.job === s.jobId) { rush.job = null; rush.key = null; }
    if (md.clock && md.clock.n === s.jobId) { md.clock = null; M().save(); }
    if (cid && md.cclock && md.cclock.id === cid) { md.cclock = null; M().save(); }
  }

  // ---- switching ----
  // one switch at a time: a second tap while the first is still saving would skip a second customer
  let switching = false;
  async function setMode(m) {
    if (switching) return false;
    switching = true;
    try { return await switchTo(m); } finally { switching = false; }
  }
  async function switchTo(m) {
    const md = data(), g = G();
    const was = current(); // read before any wait, so it is the mode the player is really leaving
    if (m === 'career') {
      if (!CR() || !(await CR().ensure())) return false;
      const view = g?.getView(), state = g?.getState();
      if (view && (view.paused || view.busy || (state.status === 'reveal' && !view.revealComplete))) return false;
    }
    else if (!md || !LIST.includes(m) || !unlocked(m)) return false;
    // leaving the career chair: its contract keeps the work done so far and waits for the barber (suspended)
    if (was === 'career' && m !== 'career' && g) await CR().suspend(g.getState());
    md.mode = m;
    md.tried = Array.isArray(md.tried) ? md.tried : [];
    if (!md.tried.includes(m)) md.tried.push(m); // a mode is no longer new once played
    M().save();
    if (!g) return true;
    const s = g.getState();
    // a new customer for the new mode (the one in the chair keeps his cut in freestyle and the career)
    const keep = s.status === 'cutting' && was === m && (m !== 'career' || !!(CR().active() && CR().active().job === s.jobId));
    if (!keep && s.status === 'cutting' && g.skip) { md.job = null; if (M().data.queue && M().data.queue.job === s.jobId + 1) M().data.queue = null; await g.skip(); }
    else if (!keep && s.status === 'reveal' && g.next) { if (M().data.queue && M().data.queue.job === s.jobId + 1) M().data.queue = null; await g.next(); }
    return true;
  }
  // ---- UI: the mode badge on the menu button, the rush clock ----
  const ICON = {
    requests: `<svg viewBox="0 0 48 48" width="56" height="56"><circle cx="20" cy="27" r="11" fill="#e9c9a8" stroke="${INK}" stroke-width="2.4"/><path d="M9.5 25c0-7 4.5-11 10.5-11s10.5 4 10.5 11c-3-3-7-4.5-10.5-4.5S12.5 22 9.5 25z" fill="#5a3b1f" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/><path d="M28 6h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-7l-4 4v-4h-3a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z" fill="#fff" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/><path d="M31.5 14.5c0-3 1.6-4.6 3.5-4.6s3.5 1.6 3.5 4.6" fill="#5a3b1f"/></svg>`,
    free: `<svg viewBox="0 0 48 48" width="56" height="56"><rect x="16" y="16" width="16" height="26" rx="5" fill="#ffb627" stroke="${INK}" stroke-width="2.4"/><path d="M15 17v-6h18v6" fill="#c9cfd6" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/><path d="M8 8l2 4M40 8l-2 4M6 20h4M42 20h-4M24 2v4" stroke="#ffb627" stroke-width="3" stroke-linecap="round"/></svg>`,
    fix: `<svg viewBox="0 0 48 48" width="56" height="56"><circle cx="24" cy="28" r="13" fill="#e9c9a8" stroke="${INK}" stroke-width="2.4"/><path d="M11.5 26c0-8 5.5-12.5 12.5-12.5S36.5 18 36.5 26l-4-3-2.5 4-3-5-3 6-3-6-2.5 3.5-3-3z" fill="#5a3b1f" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/><g transform="rotate(-35 34 12)"><rect x="25" y="8" width="18" height="8" rx="4" fill="#ffd9a8" stroke="${INK}" stroke-width="2.2"/><rect x="31" y="8" width="6" height="8" fill="#f2b880" stroke="${INK}" stroke-width="1.6"/></g></svg>`,
    beard: `<svg viewBox="0 0 48 48" width="56" height="56"><circle cx="24" cy="20" r="13" fill="#e9c9a8" stroke="${INK}" stroke-width="2.4"/><path d="M11 18c0 15 6 25 13 25s13-10 13-25c-3 5-7 7-13 7s-10-2-13-7z" fill="#5a3b1f" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/><path d="M18 28c2 1.6 4 2 6 2s4-.4 6-2" stroke="#e9c9a8" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`,
    rush: `<svg viewBox="0 0 48 48" width="56" height="56"><circle cx="24" cy="26" r="16" fill="#fff" stroke="${INK}" stroke-width="2.4"/><path d="M20 4h8M24 4v6M38 12l3-3" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/><path d="M26 14l-6 13h6l-3 11 9-15h-6l3-9z" fill="#ffc83d" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/></svg>`,
  };
  const NAME = { requests: 'Customer requests', free: 'Quick Play', fix: 'Hair disasters', beard: 'Beard studio', rush: 'Rush hour' };
  const LOCK = `<svg viewBox="0 0 24 24" width="22" height="22"><rect x="5" y="10.5" width="14" height="10" rx="2.4" fill="#ffc83d" stroke="${INK}" stroke-width="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="${INK}" stroke-width="2"/></svg>`;
  const STAR = (on) => `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" fill="${on ? '#ffc83d' : 'none'}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"${on ? '' : ' stroke-dasharray="2.6 2.2" opacity=".55"'}/></svg>`;
  const TICK = '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#10223f" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const CSS = `
#hsc-rush{--c:#46c43a;--p:1;position:fixed;z-index:21;left:50%;pointer-events:none;top:calc(env(safe-area-inset-top) / var(--hsc-s,1) + 8px);transform:translateX(-50%);display:none;width:60px;height:60px;box-sizing:border-box;border-radius:50%;border:3px solid ${INK};background:conic-gradient(var(--c) calc(var(--p) * 1turn),#c9d6e4 0);box-shadow:inset 0 2px 0 #fff9,0 4px 0 ${INK},0 6px 8px #0004;zoom:var(--hsc-s,1)}
#hsc-rush.on{display:block}
#hsc-rush span{position:absolute;inset:5px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:linear-gradient(#fff,#e4f3ff);box-shadow:inset 0 0 0 2px #10223f22;color:${INK};font:900 1em "Arial Rounded MT Bold","Nunito",system-ui,sans-serif;font-variant-numeric:tabular-nums}
#hsc-rush.mid{--c:#ffb21a}
#hsc-rush.low{--c:#f04436;animation:hsc-rushb .5s ease-in-out infinite}
#hsc-rush.low span{color:#d11f14}
#hsc-rush.end{animation-duration:.25s}
@keyframes hsc-rushb{50%{transform:translateX(-50%) scale(1.14)}}
body.hsc-reveal #hsc-rush{display:none}
.hsc-toast{position:fixed;z-index:41;left:0;top:0;zoom:var(--hsc-s,1);transform-origin:50% 50%;display:flex;align-items:center;gap:8px;padding:10px 18px;border-radius:26px;background:#fff6e6;border:3px solid ${INK};box-shadow:0 4px 0 ${INK};font:900 24px "DM Sans",system-ui,sans-serif;color:${INK};animation:hsc-toast 1.8s ease-out forwards;pointer-events:none}
@keyframes hsc-toast{0%{opacity:0;transform:translateY(20%) scale(.6)}15%{opacity:1;transform:scale(1.05)}25%{transform:none}80%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-20%)}}
@media (prefers-reduced-motion:reduce){#hsc-rush.low{animation:none}}
`;
  const COIN = HSC.icon ? HSC.icon('coin', 30) : `<svg viewBox="0 0 24 24" width="30" height="30"><circle cx="12" cy="12" r="9.5" fill="#ffc83d" stroke="${INK}" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="none" stroke="#c98a12" stroke-width="1.8"/></svg>`; // the theme's one coin (icons.js)
  const ui = {
    el: {}, built: false,
    build() {
      if (this.built || !document.body) return;
      this.built = true;
      const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
      const r = document.createElement('div'); r.id = 'hsc-rush'; r.setAttribute('aria-hidden', 'true'); r.innerHTML = '<span></span>';
      document.body.append(r);
      Object.assign(this.el, { rush: r });
      HSC.lifecycle.interval(() => this.tick(), 100);
    },
    toast(kind) {
      const t = document.createElement('div'); t.className = 'hsc-toast';
      t.innerHTML = kind === 'round' ? `${ICON.rush.replace(/56/g, '40')}${COIN}<span>+50</span>` : '';
      // drawn at the UI scale like every layer, and placed in a free spot off the customer's head (requests.js)
      t.style.cssText = 'visibility:hidden;animation:none';
      document.body.appendChild(t);
      const S = HSC.S || 1, r = t.getBoundingClientRect();
      const p = HSC.uiPlace ? HSC.uiPlace.spot(r.width, r.height) : { x: (innerWidth - r.width) / 2, y: innerHeight * 0.12, k: 1 };
      const z = S * p.k;
      t.style.cssText = `zoom:${z};left:${p.x / z}px;top:${p.y / z}px`;
      HSC.lifecycle.timeout(() => t.remove(), 1900);
    },
    // the clock's centre on the top row, in screen px: the middle of the screen, unless the customer's head reaches
    // up there (a landscape phone, the head tilted): then the nearest free spot on the row beside his head, clear of
    // the top buttons. It never takes a touch, so if no spot is free it stays in the middle over the hair
    clockX(home) {
      const W = innerWidth, size = home.height, half = size / 2, S = HSC.S || 1, gap = 6 * S;
      const mid = W / 2, row = { t: home.top, b: home.bottom };
      const hd = HSC.uiPlace && HSC.uiPlace.head ? HSC.uiPlace.head() : null;
      const at = (x) => ({ l: x - half, r: x + half, ...row });
      const hit = (a, b) => a.l < b.r + gap && a.r > b.l - gap && a.t < b.b + gap && a.b > b.t - gap;
      if (!hd || !hit(at(mid), hd)) return mid;
      const btns = [...document.querySelectorAll('#hsc-menu-btn,.ui .top button,#hsc-hud .hsc-row button')].map((e) => e.getBoundingClientRect()).filter((b) => b.width > 1).map((b) => ({ l: b.left, r: b.right, t: b.top, b: b.bottom }));
      const xs = [hd.l - gap - half - 0.5, hd.r + gap + half + 0.5];
      for (const b of btns) xs.push(b.r + gap + half + 0.5, b.l - gap - half - 0.5);
      let best = null;
      for (const x of xs) {
        const a = at(x);
        if (a.l < 8 * S || a.r > W - 8 * S || hit(a, hd) || btns.some((b) => hit(a, b))) continue;
        if (best == null || Math.abs(x - mid) < Math.abs(best - mid)) best = x;
      }
      return best == null ? mid : best;
    },
    // the mode tiles on the home screen (menu.js calls this when it opens)
    tick() {
      const g = G();
      if (!g || !M() || !M().data) return;
      const s = g.getState(), m = current();
      // the rush clock starts when a tidy-up customer sits down
      const ca = m === 'career' && CR() ? CR().active() : null;
      const jb = data().job, ownJob = jb && jb.n === s.jobId && !jb.none;
      // a Rush customer with no tidy-up asks for an ordinary cut (request above), still against the clock
      const cr = ca && ca.mode === 'rush' && ca.job === s.jobId ? ca : null;
      const rushing = s.status === 'cutting' && (m === 'rush' ? !!(jb && jb.n === s.jobId) : m === 'requests' ? !!(ownJob && jb.m === 'rush') : !!cr);
      const now = performance.now(), md = data(), key = cr ? 'c:' + cr.id : 'j:' + s.jobId;
      if (rushing && (rush.job !== s.jobId || rush.key !== key)) {
        const c = cr ? (md.cclock && md.cclock.id === String(cr.id) ? md.cclock.ms : 0) : md.clock && md.clock.n === s.jobId ? md.clock.ms : 0;
        Object.assign(rush, { job: s.jobId, key, used: c, last: now, held: true, saved: Math.floor(c / 5000) });
      }
      if (!rushing && s.status === 'cutting') { rush.job = null; rush.key = null; }
      if (rushing) {
        const v = g.getView ? g.getView() : null;
        // a video in progress (an undo, a wish) always holds the clock, whether or not the host has paused the game yet
        const hold = rush.ads > 0 || HSC.executionPaused || (v && v.paused) || document.querySelector('#hsc-menu.open, #hsc-reveal.on');
        // real play time counts in full, even on a busy device; the step after any hold (an ad, a menu, the splash,
        // the app in the background, see the visibility listener) never counts, so a pause is never charged
        const dt = Math.min(5000, Math.max(0, now - rush.last)), wasHeld = rush.held;
        rush.last = now; rush.held = !!hold;
        if (!hold && !wasHeld) rush.used = Math.min(rush.LIMIT, rush.used + dt);
        // saved every 5 s of play and whenever the clock is held (a pause, a menu, the app leaving), not every second:
        // each save writes the whole save file
        const step = Math.floor(rush.used / 5000);
        if (md && (step !== rush.saved || (hold && !wasHeld))) {
          rush.saved = step;
          if (cr) md.cclock = { id: String(cr.id), ms: Math.round(rush.used) }; else md.clock = { n: s.jobId, ms: Math.round(rush.used) };
          M().save();
        }
        // time is up: the haircut ends exactly as if Finish were pressed (the engine refuses while paused; the next tick retries)
        if (rush.used >= rush.LIMIT && !hold) g.finish();
      }
      const ms = timeLeft(), left = Math.ceil(ms / 1000), el = this.el.rush;
      el.classList.toggle('on', rushing);
      el.classList.toggle('mid', rushing && left <= 20 && left > 10);
      el.classList.toggle('low', rushing && left <= 10);
      el.classList.toggle('end', rushing && left <= 5);
      if (!rushing) { this.beat = null; return; }
      // on the same line as the Home and Finish buttons, at their scale
      const home = document.querySelector('#hsc-menu-btn'), r = home && home.getBoundingClientRect(), S = HSC.S || 1;
      if (r && r.height) { const size = r.height / S; Object.assign(el.style, { width: size + 'px', height: size + 'px', top: r.top / S + 'px', fontSize: size * 0.4 + 'px', left: this.clockX(r) / S + 'px' }); }
      el.style.setProperty('--p', (ms / rush.LIMIT).toFixed(3));
      el.querySelector('span').textContent = left;
      // tick, tock, each second; twice as fast in the last ten; a bell at zero
      const beat = ms <= 0 ? 'end' : left <= 10 ? 'h' + Math.ceil(ms / 500) : 's' + left;
      if (beat !== this.beat) {
        const first = this.beat == null;
        this.beat = beat; this.flip = !this.flip;
        if (!first && HSC.fx) HSC.fx.play(beat === 'end' ? 'bell' : this.flip ? 'tick' : 'tock');
      }
    },
  };

  // every rewarded video goes through HSC.watchVideo (the wardrobe owns it and its earned callback): this only counts
  // the videos in progress for the Rush clock, then hands over unchanged, with the same result
  function holdForVideos() {
    const wv = HSC.watchVideo;
    if (typeof wv !== 'function' || wv.__rushHeld) return;
    const held = async function () { rush.ads++; rush.held = true; try { return await wv.apply(this, arguments); } finally { rush.ads = Math.max(0, rush.ads - 1); rush.held = true; } };
    held.__rushHeld = true; held.__routed = wv.__routed;
    HSC.watchVideo = held;
  }
  const boot = () => {
    if (globalThis.skinFadeStudio && HSC.meta && HSC.meta.data && HSC.requestKit && document.body && HSC.ensure && HSC.personForJob) { hook(); holdForVideos(); ui.build(); }
    else HSC.lifecycle.timeout(boot, 200);
  };
  boot();
  HSC.modes = {
    current, unlocked, inCareer, list: LIST, level: LEVEL, set: setMode,
    request: (s) => request(s), judged, worked, changedCells, MIN_WORK, tips, done, beardStars, beardJob, beardTarget, econJob, recently, noteAsk,
    unscored: () => { const m = current(); return m === 'free' || (m === 'career' && CR().unscored()); },
    icon: (m) => ICON[m],
    // the job builders, for the career catalog (career-catalog.js)
    build: { options, disaster, beardDisaster, tidy, beardJob, beardGrid },
    // a mode just unlocked and not played yet
    isNew: (m) => { const md = data(); return m !== 'requests' && unlocked(m) && !(md && Array.isArray(md.tried) && md.tried.includes(m)); },
  };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): the city registry (docs/EVERGREEN-GAME-IMPLEMENTATION-HANDOFF.md
// section 6; CITY-CUSTOMER-VARIABILITY.md section 10; owner decision 5 November 2026: "36 cities, neutral").
//
// The handoff's 36 candidate cities, each a record with a stable id. Every record uses the neutral shared
// population table (the game's global heritage weights) at low confidence, and is marked for research and owner
// review: no city has an invented community, style, tattoo or practice table. When a city's researched table
// arrives it replaces only that record's fields and raises TABLE_VERSION.
//
// The coverage group is internal (geographic balance checks only): it never sets rewards, difficulty, prices,
// prestige or the map order. The map lists cities alphabetically in the player's language.
// Names are presentation only; ids never change after release.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  // registry version: a career's tour roster records it; a roster from an older registry is migrated once
  const TABLE_VERSION = 2;
  const LANGS = ['en', 'es', 'pt', 'fr', 'de', 'ar', 'ja', 'ko', 'id', 'hi', 'tr', 'ru'];
  // id, coverage group, then the name in each language above (machine-drafted; human review pending)
  const ROWS = [
    ['lagos', 'africa', 'Lagos', 'Lagos', 'Lagos', 'Lagos', 'Lagos', 'لاغوس', 'ラゴス', '라고스', 'Lagos', 'लागोस', 'Lagos', 'Лагос'],
    ['kinshasa', 'africa', 'Kinshasa', 'Kinsasa', 'Kinshasa', 'Kinshasa', 'Kinshasa', 'كينشاسا', 'キンシャサ', '킨샤사', 'Kinshasa', 'किंशासा', 'Kinşasa', 'Киншаса'],
    ['nairobi', 'africa', 'Nairobi', 'Nairobi', 'Nairóbi', 'Nairobi', 'Nairobi', 'نيروبي', 'ナイロビ', '나이로비', 'Nairobi', 'नैरोबी', 'Nairobi', 'Найроби'],
    ['johannesburg', 'africa', 'Johannesburg', 'Johannesburgo', 'Joanesburgo', 'Johannesburg', 'Johannesburg', 'جوهانسبرغ', 'ヨハネスブルグ', '요하네스버그', 'Johannesburg', 'जोहान्सबर्ग', 'Johannesburg', 'Йоханнесбург'],
    ['cairo', 'africa', 'Cairo', 'El Cairo', 'Cairo', 'Le Caire', 'Kairo', 'القاهرة', 'カイロ', '카이로', 'Kairo', 'काहिरा', 'Kahire', 'Каир'],
    ['casablanca', 'africa', 'Casablanca', 'Casablanca', 'Casablanca', 'Casablanca', 'Casablanca', 'الدار البيضاء', 'カサブランカ', '카사블랑카', 'Casablanca', 'कासाब्लांका', 'Kazablanka', 'Касабланка'],
    ['london', 'europe', 'London', 'Londres', 'Londres', 'Londres', 'London', 'لندن', 'ロンドン', '런던', 'London', 'लंदन', 'Londra', 'Лондон'],
    ['paris', 'europe', 'Paris', 'París', 'Paris', 'Paris', 'Paris', 'باريس', 'パリ', '파리', 'Paris', 'पेरिस', 'Paris', 'Париж'],
    ['berlin', 'europe', 'Berlin', 'Berlín', 'Berlim', 'Berlin', 'Berlin', 'برلين', 'ベルリン', '베를린', 'Berlin', 'बर्लिन', 'Berlin', 'Берлин'],
    ['madrid', 'europe', 'Madrid', 'Madrid', 'Madri', 'Madrid', 'Madrid', 'مدريد', 'マドリード', '마드리드', 'Madrid', 'मैड्रिड', 'Madrid', 'Мадрид'],
    ['warsaw', 'europe', 'Warsaw', 'Varsovia', 'Varsóvia', 'Varsovie', 'Warschau', 'وارسو', 'ワルシャワ', '바르샤바', 'Warsawa', 'वारसॉ', 'Varşova', 'Варшава'],
    ['istanbul', 'west-asia', 'Istanbul', 'Estambul', 'Istambul', 'Istanbul', 'Istanbul', 'إسطنبول', 'イスタンブール', '이스탄불', 'Istanbul', 'इस्तांबुल', 'İstanbul', 'Стамбул'],
    ['riyadh', 'west-asia', 'Riyadh', 'Riad', 'Riad', 'Riyad', 'Riad', 'الرياض', 'リヤド', '리야드', 'Riyadh', 'रियाद', 'Riyad', 'Эр-Рияд'],
    ['dubai', 'west-asia', 'Dubai', 'Dubái', 'Dubai', 'Dubaï', 'Dubai', 'دبي', 'ドバイ', '두바이', 'Dubai', 'दुबई', 'Dubai', 'Дубай'],
    ['amman', 'west-asia', 'Amman', 'Amán', 'Amã', 'Amman', 'Amman', 'عمّان', 'アンマン', '암만', 'Amman', 'अम्मान', 'Amman', 'Амман'],
    ['delhi', 'south-asia', 'Delhi', 'Delhi', 'Délhi', 'Delhi', 'Delhi', 'دلهي', 'デリー', '델리', 'Delhi', 'दिल्ली', 'Delhi', 'Дели'],
    ['mumbai', 'south-asia', 'Mumbai', 'Bombay', 'Mumbai', 'Bombay', 'Mumbai', 'مومباي', 'ムンバイ', '뭄바이', 'Mumbai', 'मुंबई', 'Mumbai', 'Мумбаи'],
    ['karachi', 'south-asia', 'Karachi', 'Karachi', 'Karachi', 'Karachi', 'Karatschi', 'كراتشي', 'カラチ', '카라치', 'Karachi', 'कराची', 'Karaçi', 'Карачи'],
    ['dhaka', 'south-asia', 'Dhaka', 'Daca', 'Daca', 'Dacca', 'Dhaka', 'دكا', 'ダッカ', '다카', 'Dhaka', 'ढाका', 'Dakka', 'Дакка'],
    ['colombo', 'south-asia', 'Colombo', 'Colombo', 'Colombo', 'Colombo', 'Colombo', 'كولومبو', 'コロンボ', '콜롬보', 'Kolombo', 'कोलंबो', 'Kolombo', 'Коломбо'],
    ['tokyo', 'east-asia', 'Tokyo', 'Tokio', 'Tóquio', 'Tokyo', 'Tokio', 'طوكيو', '東京', '도쿄', 'Tokyo', 'टोक्यो', 'Tokyo', 'Токио'],
    ['seoul', 'east-asia', 'Seoul', 'Seúl', 'Seul', 'Séoul', 'Seoul', 'سول', 'ソウル', '서울', 'Seoul', 'सियोल', 'Seul', 'Сеул'],
    ['shanghai', 'east-asia', 'Shanghai', 'Shanghái', 'Xangai', 'Shanghai', 'Shanghai', 'شنغهاي', '上海', '상하이', 'Shanghai', 'शंघाई', 'Şanghay', 'Шанхай'],
    ['jakarta', 'east-asia', 'Jakarta', 'Yakarta', 'Jacarta', 'Jakarta', 'Jakarta', 'جاكرتا', 'ジャカルタ', '자카르타', 'Jakarta', 'जकार्ता', 'Cakarta', 'Джакарта'],
    ['manila', 'east-asia', 'Manila', 'Manila', 'Manila', 'Manille', 'Manila', 'مانيلا', 'マニラ', '마닐라', 'Manila', 'मनीला', 'Manila', 'Манила'],
    ['bangkok', 'east-asia', 'Bangkok', 'Bangkok', 'Bangkok', 'Bangkok', 'Bangkok', 'بانكوك', 'バンコク', '방콕', 'Bangkok', 'बैंकॉक', 'Bangkok', 'Бангкок'],
    ['new-york', 'north-america', 'New York', 'Nueva York', 'Nova York', 'New York', 'New York', 'نيويورك', 'ニューヨーク', '뉴욕', 'New York', 'न्यूयॉर्क', 'New York', 'Нью-Йорк'],
    ['los-angeles', 'north-america', 'Los Angeles', 'Los Ángeles', 'Los Angeles', 'Los Angeles', 'Los Angeles', 'لوس أنجلوس', 'ロサンゼルス', '로스앤젤레스', 'Los Angeles', 'लॉस एंजिल्स', 'Los Angeles', 'Лос-Анджелес'],
    ['toronto', 'north-america', 'Toronto', 'Toronto', 'Toronto', 'Toronto', 'Toronto', 'تورونتو', 'トロント', '토론토', 'Toronto', 'टोरंटो', 'Toronto', 'Торонто'],
    ['montreal', 'north-america', 'Montreal', 'Montreal', 'Montreal', 'Montréal', 'Montreal', 'مونتريال', 'モントリオール', '몬트리올', 'Montreal', 'मॉन्ट्रियल', 'Montreal', 'Монреаль'],
    ['mexico-city', 'latin-america', 'Mexico City', 'Ciudad de México', 'Cidade do México', 'Mexico', 'Mexiko-Stadt', 'مكسيكو سيتي', 'メキシコシティ', '멕시코시티', 'Kota Meksiko', 'मेक्सिको सिटी', 'Meksiko', 'Мехико'],
    ['sao-paulo', 'latin-america', 'São Paulo', 'São Paulo', 'São Paulo', 'São Paulo', 'São Paulo', 'ساو باولو', 'サンパウロ', '상파울루', 'São Paulo', 'साओ पाउलो', 'São Paulo', 'Сан-Паулу'],
    ['buenos-aires', 'latin-america', 'Buenos Aires', 'Buenos Aires', 'Buenos Aires', 'Buenos Aires', 'Buenos Aires', 'بوينس آيرس', 'ブエノスアイレス', '부에노스아이레스', 'Buenos Aires', 'ब्यूनस आयर्स', 'Buenos Aires', 'Буэнос-Айрес'],
    ['kingston', 'latin-america', 'Kingston', 'Kingston', 'Kingston', 'Kingston', 'Kingston', 'كينغستون', 'キングストン', '킹스턴', 'Kingston', 'किंग्स्टन', 'Kingston', 'Кингстон'],
    ['sydney', 'oceania', 'Sydney', 'Sídney', 'Sydney', 'Sydney', 'Sydney', 'سيدني', 'シドニー', '시드니', 'Sydney', 'सिडनी', 'Sidney', 'Сидней'],
    ['auckland', 'oceania', 'Auckland', 'Auckland', 'Auckland', 'Auckland', 'Auckland', 'أوكلاند', 'オークランド', '오클랜드', 'Auckland', 'ऑकलैंड', 'Auckland', 'Окленд'],
  ];
  // the handoff's internal coverage allocation (section 6.2): a registry that breaks it fails validation
  const COVERAGE = { africa: 6, europe: 5, 'west-asia': 4, 'south-asia': 5, 'east-asia': 6, 'north-america': 4, 'latin-america': 4, oceania: 2 };

  // Who comes to each city (owner-directed, 6 November 2026): the city's main group and a strong second group. A city
  // is never uniform: career-catalog.js blends these with the neutral table. Provisional until sourced and reviewed.
  const PEOPLE = {
    lagos: ['west-african', 'east-african'], kinshasa: ['west-african', 'east-african'], nairobi: ['east-african', 'south-asian'], johannesburg: ['east-african', 'north-european'],
    cairo: ['mena', 'east-african'], casablanca: ['mena', 'mediterranean'], london: ['north-european', 'south-asian'], paris: ['mediterranean', 'mena'],
    berlin: ['north-european', 'mena'], madrid: ['mediterranean', 'latino'], warsaw: ['north-european', 'mediterranean'], istanbul: ['mena', 'mediterranean'],
    riyadh: ['mena', 'south-asian'], dubai: ['mena', 'south-asian'], amman: ['mena', 'mediterranean'], delhi: ['south-asian', 'mixed'], mumbai: ['south-asian', 'mixed'],
    karachi: ['south-asian', 'mena'], dhaka: ['south-asian', 'southeast-asian'], colombo: ['south-asian', 'southeast-asian'], tokyo: ['east-asian', 'southeast-asian'],
    seoul: ['east-asian', 'southeast-asian'], shanghai: ['east-asian', 'southeast-asian'], jakarta: ['southeast-asian', 'east-asian'], manila: ['southeast-asian', 'east-asian'],
    bangkok: ['southeast-asian', 'east-asian'], 'new-york': ['mixed', 'latino'], 'los-angeles': ['mixed', 'latino'], toronto: ['mixed', 'south-asian'], montreal: ['mixed', 'mediterranean'],
    'mexico-city': ['latino', 'indigenous-american'], 'sao-paulo': ['latino', 'mixed'], 'buenos-aires': ['mediterranean', 'latino'], kingston: ['west-african', 'mixed'],
    sydney: ['mixed', 'pacific-islander'], auckland: ['pacific-islander', 'north-european'],
  };
  // Local habits (owner-directed, 6 November 2026; provisional until sourced and reviewed): the age mix [young, middle, old],
  // the share of men with facial hair, which haircut families lean up or down, and how much more or less often than the
  // game's base rate men have a visible tattoo or an ear piercing. All are soft weights on residents: a city
  // never fixes a man's age, beard or cut, and no cut is ever ruled out.
  const YOUNG = [0.5, 0.38, 0.12], EVEN = [0.36, 0.42, 0.22], OLDER = [0.26, 0.42, 0.32];
  const FADE = { fade: 1.6, skin: 1.4, temple: 1.3 }, CLASSIC = { classic: 1.5, taper: 1.3, crew: 1.2 }, NEAT = { taper: 1.5, classic: 1.3, trim: 1.2 }, MODERN = { undercut: 1.5, fade: 1.3, taper: 1.2 };
  const HABITS = {
    tokyo: { age: OLDER, beard: 0.3, cuts: NEAT, tattoo: 0.25, ear: 1 }, seoul: { age: OLDER, beard: 0.3, cuts: NEAT, tattoo: 0.3, ear: 1.2 }, jakarta: { age: YOUNG, beard: 0.35, cuts: MODERN, tattoo: 0.4, ear: 0.7 }, manila: { age: YOUNG, beard: 0.3, cuts: MODERN, tattoo: 0.8, ear: 0.9 },
    mumbai: { age: YOUNG, beard: 0.6, cuts: MODERN, tattoo: 0.4, ear: 0.8 }, karachi: { age: YOUNG, beard: 0.7, cuts: NEAT, tattoo: 0.15, ear: 0.3 }, istanbul: { age: EVEN, beard: 0.6, cuts: MODERN, tattoo: 0.6, ear: 0.6 }, cairo: { age: YOUNG, beard: 0.6, cuts: NEAT, tattoo: 0.15, ear: 0.3 },
    lagos: { age: YOUNG, beard: 0.5, cuts: FADE, tattoo: 0.5, ear: 1 }, kingston: { age: EVEN, beard: 0.5, cuts: FADE, tattoo: 1.1, ear: 1.8 }, nairobi: { age: YOUNG, beard: 0.5, cuts: FADE, tattoo: 0.5, ear: 0.9 }, london: { age: EVEN, beard: 0.5, cuts: CLASSIC, tattoo: 1.6, ear: 1.3 },
    berlin: { age: OLDER, beard: 0.55, cuts: CLASSIC, tattoo: 1.8, ear: 1.3 }, madrid: { age: OLDER, beard: 0.55, cuts: CLASSIC, tattoo: 1.3, ear: 1.2 }, 'mexico-city': { age: EVEN, beard: 0.45, cuts: FADE, tattoo: 1.4, ear: 1 }, 'sao-paulo': { age: EVEN, beard: 0.5, cuts: FADE, tattoo: 1.8, ear: 1.5 },
    'new-york': { age: EVEN, beard: 0.5, cuts: FADE, tattoo: 2.2, ear: 1.6 }, auckland: { age: EVEN, beard: 0.5, cuts: CLASSIC, tattoo: 2.2, ear: 1.1 },
  };
  // the 18 cities Career launches with (owner, 6 November 2026); the rest stay here, switched off, for later updates
  const LAUNCH = new Set(['tokyo', 'seoul', 'jakarta', 'manila', 'mumbai', 'karachi', 'istanbul', 'cairo', 'lagos', 'kingston', 'nairobi', 'london', 'berlin', 'madrid', 'mexico-city', 'sao-paulo', 'new-york', 'auckland']);
  // one city record (CITY-CUSTOMER-VARIABILITY.md section 10). A null table means "use the neutral fallback";
  // every fallback field is low confidence and the record stays in research review until sourced.
  function record(row) {
    const [id, group] = row, names = {};
    LANGS.forEach((l, i) => { names[l] = row[2 + i]; });
    return {
      id, group, names, enabled: LAUNCH.has(id),
      geography: 'metro',
      population: null,               // resident community weights: null = the neutral global table
      people: PEOPLE[id] || null,     // the provisional main and second group (see PEOPLE)
      habits: HABITS[id] || null,     // the provisional local age, beard and haircut weights (see HABITS)
      visitor: { share: 0.12, mix: null }, // bounded visitor share; mix null = neutral world table
      ages: null, styles: null, beards: null, practice: null, tattoo: null, motifs: null, piercing: null, culture: null,
      starter: 'universal',           // starter-set and unlock profile: the universal viability floor
      salonRefs: [], sources: [],
      confidence: 'low', review: 'research', tableVersion: TABLE_VERSION,
    };
  }
  const CITIES = ROWS.map(record);

  // reason codes for a record that may not ship (empty list = valid)
  const VISITOR_MAX = 0.4;
  function validateCity(c) {
    const r = [];
    if (!c || typeof c !== 'object') return ['not-a-record'];
    if (typeof c.id !== 'string' || !/^[a-z][a-z0-9-]{1,31}$/.test(c.id)) r.push('id');
    if (!COVERAGE[c.group]) r.push('group');
    if (!c.names || typeof c.names.en !== 'string' || !c.names.en) r.push('name-en');
    for (const l of LANGS) if (!c.names || typeof c.names[l] !== 'string' || !c.names[l].trim()) r.push('name-' + l);
    if (c.population != null) {
      const g = c.population.groups, w = g && Object.values(g);
      if (!w || !w.length || w.some((x) => !(x >= 0)) || Math.abs(w.reduce((a, b) => a + b, 0) - 1) > 1e-6) r.push('population-sum');
      if (!['high', 'medium', 'low'].includes(c.population.confidence)) r.push('population-confidence');
    }
    if (!c.visitor || !(c.visitor.share >= 0 && c.visitor.share <= VISITOR_MAX)) r.push('visitor-share');
    if (c.starter !== 'universal' && typeof c.starter !== 'string') r.push('starter');
    if (!['high', 'medium', 'low'].includes(c.confidence)) r.push('confidence');
    if (!['research', 'cultural', 'owner', 'approved'].includes(c.review)) r.push('review');
    if (!Number.isSafeInteger(c.tableVersion) || c.tableVersion < 1) r.push('table-version');
    // a sourced table must cite its sources; the neutral fallback needs none
    if ((c.population || c.styles || c.tattoo || c.culture) && !(Array.isArray(c.sources) && c.sources.length)) r.push('unsourced-table');
    return r;
  }
  function validateRegistry(list) {
    const r = [], ids = new Set(), count = {};
    for (const c of list) {
      for (const x of validateCity(c)) r.push(c && c.id + ':' + x);
      if (c && ids.has(c.id)) r.push(c.id + ':duplicate');
      if (c) { ids.add(c.id); count[c.group] = (count[c.group] || 0) + 1; }
    }
    if (list.length > 36) r.push('more-than-36');
    for (const [g, n] of Object.entries(COVERAGE)) if ((count[g] || 0) !== n) r.push('coverage:' + g);
    return r;
  }

  HSC.CITIES = CITIES;
  HSC.CITIES_VERSION = TABLE_VERSION;
  HSC.cityRegistry = { TABLE_VERSION, LANGS, COVERAGE, VISITOR_MAX, PEOPLE, validateCity, validateRegistry, record };
  // the city's name in the player's language (English as the fallback; the stable id if unknown)
  HSC.cityName = (id) => {
    const c = CITIES.find((x) => x.id === id);
    if (!c) return id;
    // the language pack's city_<id> (labels-packs.js), then this table by base language, then English
    const l = HSC.lang ? HSC.lang() : 'en';
    return (HSC.tHas && HSC.tHas('city_' + id)) || c.names[l] || c.names[l.split('-')[0]] || c.names.en;
  };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): the career's state machine (docs/CAREER-MAP-LOGIC.md,
// CAREER-MODE-ARCHITECTURE.md, CAREER-SAVE-AND-QA-CONTRACT.md; owner-approved 5 November 2026).
//
// Pure logic, no screen code: every event takes a career state and returns a new one (the input is never
// changed), so a commit can validate before it writes (career-save.js) and the logic runs in unit tests.
//
//   create      choose a home (founding) city: the career begins with the 30-contract home licence
//   licence     six home chapters of five contracts; contract 30 opens the world map and World Tour 1
//   chapter     a city visit of five roles: local order, specialist, relationship, surprise, showcase
//   tours       every city in the tour's frozen roster once; tours never end (Barber Legend N)
//   complete    idempotent: a contract id completes once; replays may only raise mastery
//
// Completion is derived from position, not a growing set: a contract is done when its slot is behind the
// city's visit pointer, so the save does not grow with play (section 4 of the save contract).
// Ranks are derived from committed facts, never stored (section 2 of the save contract).
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  const VERSION = 1;
  const LICENCE = 30, SLOTS = 5;
  const ROLES = ['local', 'specialist', 'relationship', 'surprise', 'showcase'];
  const RANKS = ['apprentice', 'licensed', 'professional', 'specialist', 'master', 'owner', 'world', 'legend'];
  // mastery: a style, city, mode, tool or service counts as mastered at 3 stars (completion is recorded apart)
  const MASTER_STARS = 3;
  // a city is mastered after three completed chapters with a 3-star showcase in it
  const CITY_MASTER_CHAPTERS = 3;

  const clone = (o) => JSON.parse(JSON.stringify(o));
  const int = (v) => Number.isSafeInteger(v) && v >= 0;
  function hash32(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619); return h >>> 0; }

  // ---- the city registry (data; docs/CITY-CUSTOMER-VARIABILITY.md section 10) ----
  // Cities are records with stable ids. Until the owner's researched roster is supplied, a test registry may be
  // installed; the career code never depends on a particular city.
  const registry = { cities: new Map(), version: 0 };
  function setCities(list, version) {
    registry.cities = new Map(list.map((c) => [c.id, c]));
    registry.version = version | 0;
  }
  const enabledIds = () => [...registry.cities.values()].filter((c) => c.enabled !== false).map((c) => c.id).sort();

  // ---- a new career ----
  // UNSET: the placeholder home city of a career whose founding city is not chosen yet. The journal and wallet are
  // created at startup (economy), before the player opens Career; the first Career visit asks for the city and
  // `found` renames the placeholder. Careers from the one-city build used the same id, so they migrate the same way.
  const UNSET = 'home';
  function create(cityId, seed) {
    if (cityId !== UNSET && !registry.cities.has(cityId)) throw new Error('career: unknown city ' + cityId);
    const s = {
      v: VERSION, rev: 0, seed: (seed >>> 0) || 1, founding: cityId, base: cityId,
      licence: { next: 0 },
      tour: null, // created when the licence completes
      current: { city: cityId, visit: 0, slot: 0, practice: false }, // the licence plays as home chapters
      cities: {},
      mastery: { style: {}, mode: {}, tool: {}, service: {}, city: {} },
      completedModes: [],
      showcases: 0,
      last: null, // the last committed completion (returned again for a duplicate event)
    };
    cityRec(s, cityId);
    return s;
  }
  function cityRec(s, id) {
    if (!s.cities[id]) s.cities[id] = { visits: 0, chapters: 0, showcaseBest: 0, established: false, estTour: 0, awards: [] };
    const c = s.cities[id];
    // the four-part city mastery (branch plan section 10), bounded: 3-star styles cut here, the modes, tools and
    // services used validly here, returning-regular visits here, and the tours with a 3-star showcase here
    if (!Array.isArray(c.styles)) c.styles = [];
    if (!Number.isSafeInteger(c.regVisits)) c.regVisits = 0;
    if (!Number.isSafeInteger(c.gold)) c.gold = 0;
    return c;
  }

  // ---- where the career is ----
  function phase(s) {
    if (!s) return 'none';
    if (s.licence.next < LICENCE) return 'licence';
    if (s.current) return 'chapter';
    return 'map';
  }
  // the home licence's chapter (1-6) and slot (0-4) of the next contract
  const licencePos = (s) => ({ chapter: Math.floor(s.licence.next / SLOTS) + 1, slot: s.licence.next % SLOTS });
  // the contract position currently offered: { city, visit, slot, role, tour }
  function position(s) {
    const p = phase(s);
    if (p === 'licence') { const l = licencePos(s); return { city: s.founding, visit: l.chapter - 1, slot: l.slot, role: ROLES[l.slot], tour: 0, licence: true, chapter: l.chapter }; }
    if (p === 'chapter') return { city: s.current.city, visit: s.current.visit, slot: s.current.slot, role: ROLES[s.current.slot], tour: s.tour.n, practice: !!s.current.practice };
    return null;
  }
  // career seed + tour + city + visit + slot (section 5 of the save contract)
  function contractId(s, pos) {
    pos = pos || position(s);
    if (!pos) return null;
    return [s.seed.toString(36), pos.licence ? 'L' : 't' + pos.tour, pos.city, 'v' + pos.visit, 's' + pos.slot].join(':');
  }
  const contractSeed = (id, revision) => hash32(id + '#' + (revision | 0)) || 1;

  // ---- the founding city (map logic section 3, phase A) ----
  const needsFounding = (s) => !!s && s.founding === UNSET && !registry.cities.has(UNSET);
  // choose the founding city: the placeholder becomes the chosen city everywhere it is recorded. A career from the
  // one-city build also gets its open tour's full roster here (defect D2): its tour number is kept, so no rank or
  // Legend number is lost, and the roster can no longer close a whole tour with one chapter.
  function found(s, cityId) {
    if (!needsFounding(s)) return { state: s, error: 'already-founded' };
    const rec = registry.cities.get(cityId);
    if (!rec || rec.enabled === false || cityId === UNSET) return { state: s, error: 'city-unavailable' };
    const n = clone(s), sw = (id) => (id === UNSET ? cityId : id), uniq = (a) => [...new Set(a.map(sw))];
    const old = n.cities[UNSET];
    delete n.cities[UNSET];
    const c = cityRec(n, cityId);
    if (old) {
      c.visits = Math.max(c.visits, old.visits); c.chapters += old.chapters; c.showcaseBest = Math.max(c.showcaseBest, old.showcaseBest);
      if (old.established && !c.established) { c.established = true; c.estTour = old.estTour; }
      c.awards = c.awards.concat(old.awards || []);
      for (const x of old.styles || []) if (!c.styles.includes(x) && c.styles.length < 64) c.styles.push(x);
      c.regVisits += old.regVisits | 0; c.gold += old.gold | 0;
    }
    if (UNSET in n.mastery.city) { n.mastery.city[cityId] = Math.max(n.mastery.city[cityId] || 0, n.mastery.city[UNSET]); delete n.mastery.city[UNSET]; }
    n.founding = cityId; n.base = sw(n.base);
    if (n.current) n.current.city = sw(n.current.city);
    if (n.tour) {
      n.tour.done = uniq(n.tour.done); n.tour.na = uniq(n.tour.na).filter((id) => id !== cityId); n.tour.roster = uniq(n.tour.roster);
      if ((n.tour.rosterVersion | 0) < registry.version) {
        n.tour.roster = enabledIds();
        if (!n.tour.roster.includes(cityId)) n.tour.roster.push(cityId);
        n.tour.rosterVersion = registry.version;
        n.tour.done = n.tour.done.filter((id) => n.tour.roster.includes(id));
        n.tour.na = [];
        n.tour.migrated = true;
      }
    }
    n.last = null; // its ids named the placeholder
    n.rev++;
    return { state: n };
  }

  // ---- the map ----
  // cities still to visit in the current tour (not done, not marked not-applicable, still enabled)
  function remaining(s) {
    if (!s.tour) return [];
    return s.tour.roster.filter((id) => !s.tour.done.includes(id) && !s.tour.na.includes(id));
  }
  // every enabled city may be visited: an incomplete one advances the tour, a completed one is practice
  function selectable(s) { return phase(s) === 'map' && !needsFounding(s) ? enabledIds() : []; }
  function selectCity(s, cityId) {
    if (phase(s) !== 'map') return { state: s, error: 'not-on-map' };
    if (needsFounding(s)) return { state: s, error: 'needs-founding' };
    if (!registry.cities.has(cityId) || registry.cities.get(cityId).enabled === false) return { state: s, error: 'city-unavailable' };
    const n = clone(s);
    const practice = !remaining(n).includes(cityId);
    n.current = { city: cityId, visit: cityRec(n, cityId).visits, slot: 0, practice };
    return { state: n };
  }
  // ---- completion (idempotent) ----
  // result: { id, stars (1-3), valid (meaningful work), mode, style, tools[], services[] }
  function isDone(s, id) {
    // a contract is done when its position is behind the pointer for its city
    const parts = String(id).split(':');
    if (parts.length !== 5 || parts[0] !== s.seed.toString(36)) return false;
    const city = parts[2], visit = +parts[3].slice(1), slot = +parts[4].slice(1);
    if (parts[1] === 'L') return city === s.founding && visit * SLOTS + slot < s.licence.next;
    const c = s.cities[city];
    if (!c) return false;
    if (visit < c.visits) return true;
    return !!(s.current && s.current.city === city && s.current.visit === visit && slot < s.current.slot);
  }
  function recordMastery(n, r) {
    const up = (table, key) => { if (key == null) return; table[key] = Math.max(table[key] || 0, r.stars | 0); };
    up(n.mastery.style, r.style); up(n.mastery.mode, r.mode);
    for (const t of r.tools || []) up(n.mastery.tool, t);
    if (r.mode && !n.completedModes.includes(r.mode)) n.completedModes.push(r.mode);
  }
  // what a valid job in a city adds to that city's mastery record
  function cityWork(n, city, r) {
    const c = cityRec(n, city);
    if ((r.stars | 0) >= MASTER_STARS && r.style != null && !c.styles.includes(r.style) && c.styles.length < 64) c.styles.push(String(r.style));
    if (r.regular) c.regVisits++;
  }
  // city mastery: every part complete (a city stays playable forever after; mastery adds no power)
  const MASTERY_NEED = { chapters: CITY_MASTER_CHAPTERS, styles: 4, regVisits: 2 };
  function cityMastery(s, id) {
    const c = s.cities[id];
    if (!c) return { completion: 0, style: 0, relationship: 0, all: false };
    const part = (v, need) => Math.max(0, Math.min(1, (v | 0) / need));
    const out = {
      completion: c.showcaseBest >= MASTER_STARS ? part(c.chapters, MASTERY_NEED.chapters) : Math.min(0.99, part(c.chapters, MASTERY_NEED.chapters)),
      style: part((c.styles || []).length, MASTERY_NEED.styles),
      relationship: part(c.regVisits, MASTERY_NEED.regVisits),
    };
    out.all = out.completion >= 1 && out.style >= 1 && out.relationship >= 1;
    return out;
  }
  // the branch's state (branch plan section 4): unvisited, visiting, established, growing, mastered, legend
  function branchState(s, id) {
    const c = s.cities[id];
    if (!c || (!c.visits && !c.chapters && !(s.current && s.current.city === id))) return 'unvisited';
    if (!c.established) return 'visiting';
    const m = cityMastery(s, id);
    if (m.all && (c.gold | 0) >= 3) return 'legend';
    if (m.all) return 'mastered';
    return c.chapters > 1 ? 'growing' : 'established';
  }
  function complete(s, r) {
    if (!r || !r.id) return { state: s, error: 'no-result' };
    if (isDone(s, r.id)) {
      // a repeated event or a replay of a passed contract: progress never moves again; better work may still
      // raise mastery; a repeat of the last event returns the result already committed
      const prior = s.last && s.last.id === r.id ? s.last : { id: r.id, replay: true };
      if (!r.valid) return { state: s, result: prior, duplicate: true };
      const n = clone(s); recordMastery(n, r); return { state: n, result: prior, duplicate: true };
    }
    const id = contractId(s);
    if (r.id !== id) return { state: s, error: 'not-current' };
    // no meaningful work: no completion, no progress; the slot stays (map logic section 5)
    if (!r.valid) return { state: s, result: { id: r.id, incomplete: true } };
    const n = clone(s), pos = position(n);
    recordMastery(n, r);
    cityWork(n, pos.city, r);
    const out = { id: r.id, stars: r.stars | 0, events: [] };
    if (pos.licence) {
      n.licence.next++;
      if (pos.slot === SLOTS - 1) { const c = cityRec(n, n.founding); c.chapters++; c.visits = Math.max(c.visits, pos.visit + 1); showcase(n, n.founding, r.stars, out, 0); }
      n.current.slot = n.licence.next % SLOTS; n.current.visit = Math.floor(n.licence.next / SLOTS);
      if (n.licence.next === LICENCE) {
        // the licence is complete: the map opens and the home city counts for World Tour 1
        n.tour = { n: 1, roster: enabledIds(), rosterVersion: registry.version, done: [n.founding], na: [] };
        if (!n.tour.roster.includes(n.founding)) n.tour.roster.push(n.founding);
        n.current = null;
        out.events.push('licence-complete');
        closeTourIfDone(n, out);
      }
    } else {
      n.current.slot++;
      if (n.current.slot === SLOTS) {
        const c = cityRec(n, pos.city);
        c.visits++; c.chapters++;
        showcase(n, pos.city, r.stars, out, n.tour.n);
        if (!pos.practice && !n.tour.done.includes(pos.city)) n.tour.done.push(pos.city);
        n.current = null;
        out.events.push('chapter-complete');
        closeTourIfDone(n, out);
      }
    }
    n.rev++;
    n.last = out;
    return { state: n, result: out };
  }
  function showcase(n, city, stars, out, tourN) {
    const c = cityRec(n, city);
    c.showcaseBest = Math.max(c.showcaseBest, stars | 0);
    // a 3-star showcase in a new tour counts toward the Legend branch (one per tour, so it stays bounded)
    if ((stars | 0) >= MASTER_STARS && c.goldTour !== tourN) { c.gold = (c.gold | 0) + 1; c.goldTour = tourN; }
    n.showcases++;
    if (!c.established) { c.established = true; c.estTour = tourN; out.events.push('branch-established:' + city); }
    n.mastery.city[city] = Math.max(n.mastery.city[city] || 0, stars | 0);
  }
  // a tour closes when every roster city is done or not-applicable; the next copies the enabled roster
  function closeTourIfDone(n, out) {
    if (!n.tour || remaining(n).length) return;
    n.tour = { n: n.tour.n + 1, roster: enabledIds(), rosterVersion: registry.version, done: [], na: [] };
    out.events.push('tour-complete:' + (n.tour.n - 1));
  }

  // ---- roster changes (map logic section 13; save contract section 9) ----
  // call after the registry changes: a disabled city in the active roster becomes not-applicable
  function reconcile(s) {
    // a career still on the placeholder city keeps its tour untouched until `found` migrates it
    if (!s || !s.tour || needsFounding(s)) return s;
    const n = clone(s), on = new Set(enabledIds());
    for (const id of n.tour.roster) if (!on.has(id) && !n.tour.done.includes(id) && !n.tour.na.includes(id)) n.tour.na.push(id);
    if (n.current && !on.has(n.current.city)) n.current.suspendedCity = true;
    const out = { events: [] };
    if (!n.current) closeTourIfDone(n, out);
    return n;
  }

  // ---- ranks (derived; map logic section 4) ----
  function stats(s) {
    const cities = Object.entries(s.cities);
    const toursDone = s.tour ? s.tour.n - 1 : 0;
    const showcaseCities = cities.filter(([, c]) => c.established).length;
    const mastered = cities.filter(([id]) => cityMastery(s, id).all).length;
    const styleMasteries = Object.values(s.mastery.style).filter((v) => v >= MASTER_STARS).length;
    // the founding city is the home salon (branch plan sections 3 and 5); a branch is a city beyond it
    const branches = cities.filter(([id, c]) => c.established && id !== s.founding).length;
    return { toursDone, showcaseCities, showcases: s.showcases, mastered, styleMasteries, branches, modes: s.completedModes.length };
  }
  // specialistModes: the specialist modes currently eligible for career play.
  // An earned rank is kept (map logic section 4): a mode added later, or a city disabled, never demotes a player;
  // the highest rank reached is saved as `rankBest` and wins over a lower computed rank.
  function rank(s, specialistModes) {
    if (!s) return null;
    const now = rankNow(s, specialistModes), best = Number.isSafeInteger(s.rankBest) ? s.rankBest : 0;
    return RANKS.indexOf(now.id) >= best ? now : { id: RANKS[Math.min(best, RANKS.indexOf('owner'))] };
  }
  // the rank to save after a commit (the index of the highest rank reached)
  function rankIndex(s, specialistModes) { return Math.max(Number.isSafeInteger(s.rankBest) ? s.rankBest : 0, RANKS.indexOf(rankNow(s, specialistModes).id)); }
  function rankNow(s, specialistModes) {
    const st = stats(s), size = Math.max(1, enabledIds().length), three = Math.min(3, size), branchesNeeded = Math.min(3, Math.max(1, size - 1));
    const spec = (specialistModes || []).every((m) => s.completedModes.includes(m));
    if (st.toursDone >= 2) return { id: 'legend', legend: st.toursDone - 1 };
    if (st.toursDone >= 1) return { id: 'world' };
    if (st.branches >= branchesNeeded && st.mastered >= three && st.styleMasteries >= 12 && spec && st.showcaseCities >= three && s.licence.next >= LICENCE) return { id: 'owner' };
    if (st.mastered >= three && st.styleMasteries >= 12 && spec && st.showcaseCities >= three && s.licence.next >= LICENCE) return { id: 'master' };
    if (spec && st.showcaseCities >= three && s.licence.next >= LICENCE) return { id: 'specialist' };
    if (st.showcaseCities >= three && s.licence.next >= LICENCE) return { id: 'professional' };
    if (s.licence.next >= LICENCE) return { id: 'licensed' };
    return { id: 'apprentice' };
  }

  // ---- invariants (checked before every commit) ----
  function validate(s) {
    const bad = [];
    if (!s || s.v !== VERSION) bad.push('version');
    if (!int(s.rev)) bad.push('rev');
    if (!registry.cities.has(s.founding) && !(s.cities && s.cities[s.founding])) bad.push('founding');
    if (!int(s.licence && s.licence.next) || s.licence.next > LICENCE) bad.push('licence');
    if (s.licence.next < LICENCE && (!s.current || s.current.city !== s.founding)) bad.push('licence-city');
    if (s.licence.next >= LICENCE && !s.tour) bad.push('tour-missing');
    if (s.tour) {
      if (!int(s.tour.n) || s.tour.n < 1) bad.push('tour-n');
      for (const id of s.tour.done) if (!s.tour.roster.includes(id)) bad.push('done-outside-roster:' + id);
    }
    if (s.current && (!int(s.current.slot) || s.current.slot >= SLOTS)) bad.push('slot');
    if (s.rankBest != null && (!int(s.rankBest) || s.rankBest >= RANKS.length)) bad.push('rank-best');
    return bad;
  }

  // ---- regulars (director section 12): the relationship stage from completed visits ----
  const REG_STAGES = [['signature', 7], ['trusted', 4], ['familiar', 2], ['recognized', 1]];
  const regularStage = (visits) => { for (const [id, n] of REG_STAGES) if ((visits | 0) >= n) return id; return null; };

  HSC.career = {
    regularStage, REG_STAGES, cityMastery, branchState, MASTERY_NEED,
    VERSION, LICENCE, SLOTS, ROLES, RANKS, MASTER_STARS,
    UNSET, needsFounding, found,
    setCities, enabledIds, create, phase, position, contractId, contractSeed, remaining, selectable, selectCity,
    isDone, complete, reconcile, rank, rankIndex, stats, validate, hash32, clone,
    city: (id) => registry.cities.get(id) || null,
  };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): the career contract director (docs/CAREER-CONTRACT-DIRECTOR.md,
// CAREER-MAP-LOGIC.md sections 6, 8-11; CITY-CUSTOMER-VARIABILITY.md section 4; owner-approved 5 November 2026).
//
// It builds each career job from validated parts, in the spec's order:
//   seed -> role grammar -> customer source -> customer -> starting condition -> achievable requests ->
//   difficulty limits -> hard anti-repeat -> weights (city tendency, novelty, lane rotation) -> pick -> re-validate
// and relaxes only soft rules when nothing survives, ending at a guaranteed standard Orders job.
//
// Pure logic. It talks to the game through a catalog (career-catalog.js builds it from the real customers, hair
// grids and modes; the tests use a synthetic one):
//   catalog.modes                       { id: { lane(start, request), specialist, eligible(ctx) } }
//   catalog.customer(seed, ctx)          -> { person, traits: { silhouette, texture, beard, age } }
//   catalog.starts(customer, mode, ctx)  -> [ { id, silhouette, beard, damage, cost: {...}, build } ]
//   catalog.requests(customer, start, mode, ctx) -> [ { id, family, beardGoal, services, cost: {...}, weight } ]
//   catalog.validate(contract, ctx)      -> [] or [reason codes]
//   catalog.baseline(customer, ctx)      -> a standard Orders { start, request } that always exists
//   catalog.presence(contract)           -> optional 'hair|beard' broad state, e.g. 'short|stubble' (map logic §9)
//   catalog.timeNeeded(contract)         -> optional seconds a timed job needs (checked against its timer)
// Every random choice is drawn from streams seeded by purpose, so adding a roll in one place cannot change
// another (save contract section 5).
// Fairness (director section 9): fair decks for style families, service sets and regulars give a capped underuse
// bonus to what has not been offered since the deck last refilled; a fourth customer in a row with the same broad
// hair presence, or the same facial-hair state, is refused while another customer can be drawn (map logic §9); required progression stays within two bands of
// the player's recent comfort band (map logic section 8); a timed job must fit its timer with safety margins.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  const REVISION = 1; // contract-generation revision: part of every contract seed
  const RING = 200; // effective-duplicate exclusion window
  const LANE_WINDOW = 8, LANE_MAX = 3;
  const BUDGET = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 6]; // band -> complexity budget (director section 6)
  const SPECIALIST = ['fix', 'beard', 'rush'];
  const SURPRISE = ['rescue', 'rush', 'visitor', 'vip'];
  const VIP_GAP = 8, REGULAR_GAP = 3;
  const ATTEMPTS = 6; // per relaxation stage: generation never loops indefinitely
  const PRESENCE_TRIES = 24; // customer draws the normal stage may spend avoiding a fourth same-state customer
  const UNDERUSE = 2.5; // the capped bonus for a deck card not offered since the deck refilled
  const DECK_MAX = 48; // bounded deck memory per deck (save contract section 4)
  const RUSH_LIMIT = 45; // seconds on the Rush clock (modes.js)

  // ---- deterministic streams ----
  function rng(seed) {
    let a = seed >>> 0 || 1;
    const next = () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    return { next, int: (n) => Math.floor(next() * n), pick: (arr) => arr[Math.floor(next() * arr.length)] };
  }
  const hash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0 || 1; };
  const stream = (seed, purpose) => rng(hash(seed + '/' + purpose));
  function weighted(R, items, w) {
    const total = items.reduce((a, it) => a + Math.max(0, w(it)), 0);
    if (!(total > 0)) return items.length ? items[0] : null;
    let x = R.next() * total;
    for (const it of items) { x -= Math.max(0, w(it)); if (x <= 0) return it; }
    return items[items.length - 1];
  }

  // ---- director memory (bounded; save contract section 4) ----
  function fresh() {
    return { turn: 0, sig: [], lanes: [], last: null, decks: {}, cool: { vip: -99, surprise: [], disasterChapter: -99, chapter: 0 }, regs: {}, band: { adj: 0, recent: [], ok: [] }, chapterLog: [], presence: [], used: {} };
  }
  // an open deck of what has been offered since it last refilled (style families, service sets, regulars): a card
  // still in the deck gets the underuse bonus; once every candidate's card is used, the deck refills
  function usedOf(dir, name) { dir.used = dir.used || {}; return (dir.used[name] = Array.isArray(dir.used[name]) ? dir.used[name] : []); }
  function underuse(dir, name, card, all) {
    const u = usedOf(dir, name);
    if (all.every((c) => u.includes(c))) return 1; // the deck is spent for these candidates: no one is favoured
    return u.includes(card) ? 1 : UNDERUSE;
  }
  function useCard(dir, name, card, all) {
    const u = usedOf(dir, name);
    if (all.length && all.every((c) => u.includes(c))) u.length = 0; // refill
    if (!u.includes(card)) u.push(card);
    if (u.length > DECK_MAX) u.splice(0, u.length - DECK_MAX);
  }
  // would this broad state make a fourth in a row (hair presence or facial-hair state, each on its own)?
  function presenceRepeat(dir, p) {
    const last = Array.isArray(dir.presence) ? dir.presence.slice(-3) : [];
    if (!p || last.length < 3 || last.some((x) => !x)) return false;
    const [h, b] = p.split('|');
    return last.every((x) => x.split('|')[0] === h) || last.every((x) => x.split('|')[1] === b);
  }
  const svcKey = (c) => (c.request.services && c.request.services.length ? c.request.services.slice().sort().join('+') : null);
  // a fair deck: cards are consumed before it refills; an invalid card stays for a later compatible contract
  function deckDraw(dir, name, cards, R, ok) {
    const d = dir.decks[name] && dir.decks[name].left ? dir.decks[name] : (dir.decks[name] = { left: [] });
    if (!d.left.length || !d.left.some((c) => cards.includes(c))) d.left = cards.slice().sort(() => R.next() - 0.5);
    const valid = d.left.filter((c) => cards.includes(c) && ok(c));
    if (!valid.length) return null;
    const c = valid[0];
    d.left = d.left.filter((x) => x !== c);
    return c;
  }

  // ---- difficulty bands (map logic section 8) ----
  function band(core, dir, pos) {
    let lo, hi;
    if (pos.licence) { const ch = pos.chapter; lo = 0; hi = Math.min(3, Math.floor((ch - 1) / 2) + 1); }
    else if (core.tour.n === 1) { lo = 2; hi = 5; }
    else { lo = Math.min(9, 3 + Math.floor((core.tour.n - 2) / 2)); hi = 10; }
    // the preferred band moves with demonstrated mastery, never more than two above the comfort band: the highest
    // band of the player's recent good (2-3 star) results, or the tier's floor before there are any
    const base = Math.min(hi, lo + Math.max(0, dir.band.adj));
    const ok = Array.isArray(dir.band.ok) ? dir.band.ok : [], comfort = ok.length ? Math.max(...ok) : lo;
    return Math.max(lo, Math.min(hi, base, comfort + 2));
  }
  function noteResult(dir, stars, valid, atBand) {
    const r = dir.band.recent;
    if (!Array.isArray(dir.band.ok)) dir.band.ok = [];
    if (valid && stars >= 2 && Number.isSafeInteger(atBand)) { dir.band.ok.push(atBand); if (dir.band.ok.length > 4) dir.band.ok.shift(); }
    r.push(valid ? stars : 0); if (r.length > 4) r.shift();
    const last2 = r.slice(-2);
    if (last2.length === 2 && last2.every((x) => x >= 3)) { dir.band.adj = Math.min(dir.band.adj + 1, 6); r.length = 0; }
    else if (last2.length === 2 && last2.every((x) => x <= 1)) { dir.band.adj = Math.max(dir.band.adj - 1, -2); r.length = 0; }
  }

  // ---- the role grammar (map logic section 6; director section 10) ----
  // the licence teaches in order: chapter themes decide which specialist and surprise jobs are allowed
  // home chapter 3 teaches repairs with a first beard as its surprise; chapter 4 makes beards the specialist job
  const LICENCE_SPEC = { 1: [], 2: [], 3: ['fix'], 4: ['beard'], 5: ['rush'], 6: SPECIALIST };
  const LICENCE_SURPRISE = { 1: [], 2: ['visitor'], 3: ['beard'], 4: ['rescue', 'visitor'], 5: ['rush', 'visitor', 'vip'], 6: SURPRISE };
  function roleMode(pos, dir, catalog, R, ctx, chapterModes, chapterLanes) {
    const eligible = (m) => catalog.modes[m] && (!catalog.modes[m].eligible || catalog.modes[m].eligible(ctx));
    if (pos.role === 'local') return { mode: 'requests' };
    if (pos.role === 'relationship') return { mode: 'requests', regular: true };
    if (pos.role === 'specialist') {
      let cards = (pos.licence ? LICENCE_SPEC[pos.chapter] : SPECIALIST).filter(eligible);
      // not the previous chapter's specialist when another is eligible
      const prev = dir.cool.lastSpecialist;
      if (cards.length > 1) cards = cards.filter((m) => m !== prev);
      // plan the chapter's three lanes: if no lane-bringing surprise (rescue, rush) will be free this chapter,
      // the specialist brings the new lane itself (beards share the precision lane with ordinary cuts)
      const surpriseFree = ['rescue', 'rush'].filter((c) => !dir.cool.surprise.includes(c) && !(c === 'rescue' && dir.cool.chapter - dir.cool.disasterChapter <= 1));
      if (!surpriseFree.length && cards.length > 1) { const own = cards.filter((m) => m !== 'beard'); if (own.length) cards = own; }
      const m = cards.length ? deckDraw(dir, 'spec', cards, R, () => true) : null;
      return { mode: m || 'requests' };
    }
    if (pos.role === 'surprise') {
      let cards = (pos.licence ? LICENCE_SURPRISE[pos.chapter] : SURPRISE).slice();
      cards = cards.filter((c) => !dir.cool.surprise.includes(c));
      if (dir.cool.chapter - dir.cool.disasterChapter <= 1) cards = cards.filter((c) => c !== 'rescue');
      if (dir.turn - dir.cool.vip < VIP_GAP) cards = cards.filter((c) => c !== 'vip');
      cards = cards.filter((c) => (c === 'rescue' ? eligible('fix') : c === 'rush' ? eligible('rush') : c === 'beard' ? eligible('beard') : true));
      // a chapter needs three lanes: when it still lacks one, the surprise brings recovery or pressure
      // (a visitor or VIP order can bring transformation or precision, whichever the chapter lacks)
      const LANE_OF = { rescue: ['recovery'], rush: ['pressure'], visitor: ['transformation', 'precision'], vip: ['transformation', 'precision'], beard: ['precision'] };
      if (chapterLanes && chapterLanes.size < 3) { const fresh = cards.filter((c) => LANE_OF[c].some((l) => !chapterLanes.has(l))); if (fresh.length) cards = fresh; }
      const c = cards.length ? deckDraw(dir, 'surprise', cards, R, () => true) : null;
      if (c === 'rescue') return { mode: 'fix', surprise: c };
      if (c === 'rush') return { mode: 'rush', surprise: c };
      if (c === 'visitor') return { mode: 'requests', surprise: c, source: 'visitor' };
      if (c === 'vip') return { mode: 'requests', surprise: c, source: 'vip' };
      if (c === 'beard') return { mode: 'beard', surprise: null };
      return { mode: 'requests', surprise: null };
    }
    // showcase: at most two skills already practised in this chapter, never a new one
    const practised = [...new Set(chapterModes)].filter(eligible);
    const pick = practised.length ? R.pick(practised) : 'requests';
    return { mode: pick, showcase: true, skills: practised.slice(0, 2) };
  }

  // ---- novelty (director sections 7-8) ----
  const signature = (c) => [c.mode, c.start.silhouette, c.request.family, c.start.beard + '>' + (c.request.beardGoal || '-'), c.modifier || '-'].join('|');
  const axes = (c) => ({ silhouette: c.start.silhouette, family: c.request.family, lane: c.lane, beard: c.request.beardGoal || c.start.beard, services: (c.request.services || []).join(','), pressure: c.modifier || '-' });
  function hardRepeat(dir, c) {
    if (dir.sig.includes(signature(c))) return 'repeat-signature';
    if (dir.last && dir.last.family === c.request.family && dir.last.altFamilies > 1) return 'repeat-style';
    return null;
  }
  function changedAxes(dir, c) {
    if (!dir.last) return 6;
    const a = axes(c), b = dir.last.axes;
    return Object.keys(a).filter((k) => a[k] !== b[k]).length;
  }
  function laneOverused(dir, lane, alternatives) {
    const recent = dir.lanes.slice(-LANE_WINDOW);
    return recent.filter((l) => l === lane).length >= LANE_MAX && alternatives > 1;
  }

  // ---- the generation transaction (map logic section 10) ----
  // core: career state (career.js); dir: director memory (mutated copy returned); ctx: { city, regulars, level, ... }
  function generate(core, dir0, catalog, ctx) {
    const C = HSC.career, pos = C.position(core);
    if (!pos) return { error: 'no-position' };
    const dir = JSON.parse(JSON.stringify(dir0 || fresh()));
    // a replaced offer (career-run.js replace) draws again with its replacement count in the seed: same id and slot
    const reroll = (ctx && ctx.reroll) | 0;
    const id = C.contractId(core, pos), seed = C.contractSeed(reroll ? id + '~r' + reroll : id, REVISION) + '';
    const R = stream(seed, 'role');
    const chapterModes = dir.chapterLog.filter((e) => e.city === pos.city && e.visit === pos.visit).map((e) => e.mode);
    const chapterLanes = new Set(dir.chapterLog.filter((e) => e.city === pos.city && e.visit === pos.visit).map((e) => e.lane));
    const role = roleMode(pos, dir, catalog, R, ctx, chapterModes, chapterLanes);
    const prefBand = band(core, dir, pos);
    const reasons = {};
    const tally = (codes) => { for (const c of codes) reasons[c] = (reasons[c] || 0) + 1; };

    // customer source: a scheduled regular, a visitor, a VIP or a resident
    let source = role.source || 'resident', regular = null;
    if (role.regular) {
      const regs = (ctx.regulars || []).filter((g) => dir.turn - (dir.regs[g.key] == null ? -99 : dir.regs[g.key]) >= REGULAR_GAP && g.lastChapter !== dir.cool.chapter - 1);
      // the regulars' fair deck: one not seen since the deck refilled comes first
      if (regs.length) {
        const keys = regs.map((g) => g.key), fresh = regs.filter((g) => underuse(dir, 'regular', g.key, keys) > 1);
        regular = stream(seed, 'regular').pick(fresh.length ? fresh : regs); source = 'regular';
        useCard(dir, 'regular', regular.key, keys);
      }
    }

    // a Trusted regular (four visits) may come for a specialist or service job, a Signature regular (seven) for the
    // chapter's showcase (director section 12); stages unlock variety only, never reward or easier scoring
    if (!regular && (pos.role === 'specialist' || pos.role === 'showcase') && ctx.regulars && ctx.regulars.length) {
      const need = pos.role === 'showcase' ? 7 : 4, fitsMode = (g) => role.mode !== 'beard' || !!(g.person && g.person.beard && g.person.beard.style !== 'clean' && !/^stubble/.test(g.person.beard.style));
      const pool = ctx.regulars.filter((g) => (g.visits | 0) >= need && fitsMode(g) && dir.turn - (dir.regs[g.key] == null ? -99 : dir.regs[g.key]) >= REGULAR_GAP);
      const Ro = stream(seed, 'regular-overlay');
      if (pool.length && Ro.next() < 0.3) { regular = Ro.pick(pool); source = 'regular'; useCard(dir, 'regular', regular.key, pool.map((g) => g.key)); }
    }

    // a city's bounded visitor share (CITY-CUSTOMER-VARIABILITY.md, residents and visitors): an ordinary resident slot
    // may bring a visitor instead. Never in the licence's first chapter, and never in place of a regular or a VIP.
    if (source === 'resident' && !regular && catalog.visitorShare && !(pos.licence && pos.chapter < 2) && stream(seed, 'visitor-share').next() < catalog.visitorShare(ctx.city)) source = 'visitor';

    // stages relax only soft rules; physical feasibility, tools, cultural rules and timers are never relaxed
    const STAGES = [
      { name: 'normal' },
      { name: 'reroll' },
      { name: 'no-context', noContext: true },
      { name: 'no-modifier', noContext: true, noModifier: true },
      { name: 'lower-band', noContext: true, noModifier: true, bandDrop: 1 },
      { name: 'broad-style', noContext: true, noModifier: true, bandDrop: 1, broad: true },
      { name: 'baseline-request', noContext: true, noModifier: true, bandDrop: 2, broad: true, baselineRequest: true },
      { name: 'next-specialist', noContext: true, noModifier: true, bandDrop: 2, broad: true, baselineRequest: true, swapMode: true },
    ];
    let chosen = null, stageUsed = null;
    for (let si = 0; si < STAGES.length && !chosen; si++) {
      const st = STAGES[si];
      let mode = role.mode;
      if (st.swapMode && mode !== 'requests') mode = SPECIALIST.find((m) => m !== mode && catalog.modes[m] && (!catalog.modes[m].eligible || catalog.modes[m].eligible(ctx))) || 'requests';
      const b = Math.max(0, prefBand - (st.bandDrop || 0)), budget = BUDGET[b];
      // the normal stage may draw more customers, only to avoid a fourth same-state customer in a row
      const tries = si === 0 ? PRESENCE_TRIES : ATTEMPTS;
      for (let a = 0; a < tries && !chosen; a++) {
        if (a >= ATTEMPTS && !(reasons['presence-repeat'] > 0)) break;
        const S = stream(seed, 'stage' + si + 'a' + a);
        const cust = regular ? catalog.customer(regular.seed, Object.assign({}, ctx, { source: 'regular', regular, mode })) : catalog.customer(hash(seed + 'c' + si + a), Object.assign({}, ctx, { source, R: S, mode }));
        if (!cust) { tally(['no-customer']); continue; }
        const starts = catalog.starts(cust, mode, ctx) || [];
        if (!starts.length) { tally(['no-start']); continue; }
        const cands = [];
        for (const start of starts) {
          let reqs = st.baselineRequest ? [(catalog.baseline(cust, ctx, start) || {}).request].filter(Boolean) : catalog.requests(cust, start, mode, Object.assign({}, ctx, { broad: !!st.broad })) || [];
          for (const request of reqs) {
            const cost = Object.assign({}, start.cost || {}, request.cost || {});
            const spend = (cost.precision || 0) + (cost.transform || 0) + (cost.repair || 0) + (cost.services || 0) + (cost.time || 0);
            if (spend > budget && !st.baselineRequest) { tally(['over-budget']); continue; }
            if ((cost.time || 0) >= 2 && (cost.precision || 0) >= 2) { tally(['timer-with-precision']); continue; }
            const modifier = st.noModifier ? null : role.surprise && role.surprise !== 'visitor' && role.surprise !== 'vip' ? role.surprise : null;
            const lane = catalog.modes[mode].lane(start, request);
            const c = { mode, start, request, modifier, lane, customer: cust, source, context: st.noContext ? null : regular ? 'regular' : source === 'vip' ? 'vip' : source === 'visitor' ? 'visitor' : null };
            const hard = hardRepeat(dir, c);
            if (hard && !st.baselineRequest) { tally([hard]); continue; }
            const v = catalog.validate(c, ctx);
            if (v.length) { tally(v); continue; }
            // a timed job must fit its clock with animation, tool-switch and accessibility margins (never relaxed)
            if (mode === 'rush' && catalog.timeNeeded && catalog.timeNeeded(c) > RUSH_LIMIT) { tally(['timer-too-short']); continue; }
            c.presence = catalog.presence ? catalog.presence(c) : null;
            cands.push(c);
          }
        }
        if (!cands.length) continue;
        // this customer would be the fourth in a row with the same broad hair presence or facial-hair state: draw
        // another customer first (the last attempt of a stage accepts him; a regular is who he is)
        if (!regular && a < tries - 1 && cands.every((c) => presenceRepeat(dir, c.presence))) { tally(['presence-repeat']); continue; }
        // soft weights: city tendency and suitability (from the catalog), underuse, lane rotation, axis change
        const laneAlts = new Set(cands.map((c) => c.lane)).size;
        for (const c of cands) if (dir.last) c.request.altFamilies = new Set(cands.map((x) => x.request.family)).size;
        // a chapter covers at least three lanes and three starting silhouettes: favour what it has not had yet
        const chLog = dir.chapterLog.filter((e) => e.city === pos.city && e.visit === pos.visit);
        const chLanes = new Set(chLog.map((e) => e.lane)), chSil = new Set(chLog.map((e) => e.silhouette));
        // from the third job on, a chapter still short of three lanes takes a lane it has not had when it can
        let pool = cands;
        if (pos.slot >= 2 && chLanes.size < 3) { const fresh = cands.filter((c) => !chLanes.has(c.lane)); if (fresh.length) pool = fresh; }
        if (!regular) { const other = pool.filter((c) => !presenceRepeat(dir, c.presence)); if (other.length) pool = other; }
        const fams = [...new Set(pool.map((c) => c.request.family))], svcs = [...new Set(pool.map(svcKey).filter(Boolean))];
        const pick = weighted(S, pool, (c) => {
          let w = c.request.weight == null ? 1 : c.request.weight;
          if (laneOverused(dir, c.lane, laneAlts)) w *= 0.15;
          if (pos.slot >= 1 && !chLanes.has(c.lane)) w *= chLanes.size < 3 ? 12 : 2.5;
          if (!chSil.has(c.start.silhouette)) w *= chSil.size < 3 && pos.slot >= 3 ? 8 : 2;
          const ch = changedAxes(dir, c);
          if (ch < 2) w *= 0.2;
          // underuse (capped): a style family or service set not offered since its deck refilled
          w *= underuse(dir, 'family', c.request.family, fams);
          if (svcKey(c)) w *= underuse(dir, 'services', svcKey(c), svcs);
          return w;
        });
        if (pick && !regular && presenceRepeat(dir, pick.presence)) tally(['presence-forced']);
        if (pick) { chosen = pick; stageUsed = st.name; useCard(dir, 'family', pick.request.family, fams); if (svcKey(pick)) useCard(dir, 'services', svcKey(pick), svcs); }
      }
    }
    if (!chosen) {
      // the standard Orders builder always exists (director section 13); it seats a resident, so no regular
      regular = null;
      const cust = catalog.customer(hash(seed + 'base'), Object.assign({}, ctx, { source: 'resident', R: stream(seed, 'base') }));
      const b = catalog.baseline(cust, ctx);
      chosen = { mode: 'requests', start: b.start, request: b.request, modifier: null, lane: catalog.modes.requests.lane(b.start, b.request), customer: cust, source: 'resident', context: null };
      stageUsed = 'standard-orders';
      chosen.presence = catalog.presence ? catalog.presence(chosen) : null;
      if (!regular && presenceRepeat(dir, chosen.presence)) tally(['presence-forced']);
    }

    // second validation, then record the job in the director's bounded memory
    const recheck = stageUsed === 'standard-orders' ? [] : catalog.validate(chosen, ctx);
    const contract = {
      id, seed: +seed, revision: REVISION, reroll, tour: pos.tour, city: pos.city, visit: pos.visit, slot: pos.slot, role: pos.role,
      licence: !!pos.licence, practice: !!pos.practice, mode: chosen.mode, lane: chosen.lane, source: chosen.source,
      regular: regular ? regular.key : null, context: chosen.context, modifier: chosen.modifier,
      customer: chosen.customer, start: chosen.start, request: chosen.request,
      band: prefBand, stage: stageUsed, validated: recheck.length === 0, reasons,
      presence: chosen.presence || (catalog.presence ? catalog.presence(chosen) : null),
    };
    commitMemory(dir, contract, pos);
    return { contract, dir, reasons };
  }
  function commitMemory(dir, c, pos) {
    dir.turn++;
    dir.sig.push(signature(c)); if (dir.sig.length > RING) dir.sig.splice(0, dir.sig.length - RING);
    dir.lanes.push(c.lane); if (dir.lanes.length > LANE_WINDOW) dir.lanes.shift();
    dir.last = { family: c.request.family, axes: axes(c), altFamilies: c.request.altFamilies || 1 };
    dir.chapterLog.push({ city: pos.city, visit: pos.visit, mode: c.mode, lane: c.lane, silhouette: c.start.silhouette });
    dir.presence = (Array.isArray(dir.presence) ? dir.presence : []).concat([c.customer && c.presence ? c.presence : null]).slice(-4);
    if (dir.chapterLog.length > 10) dir.chapterLog.splice(0, dir.chapterLog.length - 10);
    if (c.source === 'vip') dir.cool.vip = dir.turn;
    if (c.regular) dir.regs[c.regular] = dir.turn;
    if (pos.role === 'specialist') dir.cool.lastSpecialist = c.mode;
    if (pos.role === 'surprise') {
      const cat = c.modifier || (c.source === 'vip' ? 'vip' : c.source === 'visitor' ? 'visitor' : null);
      if (cat) { dir.cool.surprise.push(cat); if (dir.cool.surprise.length > 2) dir.cool.surprise.shift(); }
      if (c.mode === 'fix') dir.cool.disasterChapter = dir.cool.chapter;
    }
    if (pos.role === 'showcase') dir.cool.chapter++;
    // keep the regular map bounded to the cities' regular slots
    const keys = Object.keys(dir.regs);
    if (keys.length > 64) for (const k of keys.sort((a, b) => dir.regs[a] - dir.regs[b]).slice(0, keys.length - 64)) delete dir.regs[k];
  }

  HSC.director = { REVISION, RING, BUDGET, SPECIALIST, SURPRISE, RUSH_LIMIT, fresh, generate, noteResult, signature, band };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): the career's save journal (docs/CAREER-SAVE-AND-QA-CONTRACT.md
// sections 3, 6, 8 and 10; owner-approved 5 November 2026).
//
// The host's storage has no transactions, so a career commit writes two journal records in turn:
//   1. copy the last committed record and apply the event in memory; check every invariant
//   2. raise the revision; write the inactive slot with a checksum, marked uncommitted
//   3. read it back and verify it; mark it committed; point at it
// On load the highest committed revision with a valid checksum that passes sanitizing wins, so an interrupted
// write always leaves the previous complete career (never a mix of the two). A record from a newer game
// version is kept untouched and never overwritten.
// The career save is separate from progress, advertising, consent and wardrobe saves.
//
// Hardening (save contract section 8): records migrate one schema version at a time (deterministic and
// idempotent), every section is sanitized field by field (types, bounds, collection sizes), a record is budgeted
// by what it really takes in the host's save envelope (both journal records live there, beside the progress,
// session and wardrobe saves, and the envelope refuses anything from 3 MiB): above 1 MiB it warns, above 1.25 MiB
// the regulars' saved cuts are trimmed and what still does not fit is refused before it is written. A commit whose
// base revision is older than a valid committed record of another surface is refused as stale, a record from a
// newer game version makes the whole career read-only (never a frozen half), and when the page is hidden the lease
// is released: the next write first reloads the latest committed record.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  const SCHEMA = 2;
  // per journal record, in envelope bytes (UTF-8 of the record as saved, its body string escaped): two records fit
  // the 3 MiB envelope with half a MiB left for every other save
  const WARN_BYTES = 1024 * 1024, MAX_BYTES = 1.25 * 1024 * 1024;
  // the regulars: one regular's saved cut (hair, beard, his usual beard) and all regulars together
  const REG_GRID_BYTES = 20000, REGS_BYTES = 400 * 1024;
  const enc = typeof TextEncoder !== 'undefined' ? new TextEncoder() : null;
  const sizeOf = (rec) => { const j = JSON.stringify(rec); return enc ? enc.encode(j).length : j.length * 3; };
  // one migration per schema step: MIGRATE[n] turns a schema-n body into a schema-(n+1) body
  const MIGRATE = {
    // 1 -> 2 (Wave 2): sections that schema 1 left optional get their empty defaults; nothing else changes
    1: (b) => Object.assign({ regs: {}, pop: {}, ent: [] }, b),
  };
  function migrate(body, from) {
    let b = body;
    for (let v = from; v < SCHEMA; v++) { if (!MIGRATE[v]) return null; b = MIGRATE[v](b); }
    return b;
  }
  const KEYS = ['barber-career-j0', 'barber-career-j1'], PTR = 'barber-career-ptr';
  const checksum = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return (h >>> 0).toString(36) + ':' + s.length; };
  // prototype keys are refused anywhere in a saved record
  function safe(v, depth = 0) {
    if (depth > 12) return false;
    if (v && typeof v === 'object') {
      for (const k of Object.keys(v)) { if (k === '__proto__' || k === 'constructor' || k === 'prototype') return false; if (!safe(v[k], depth + 1)) return false; }
    }
    return true;
  }
  function seal(body, rev, committed) {
    const json = JSON.stringify(body);
    return { schema: SCHEMA, rev, committed, sum: checksum(json), body: json };
  }
  function open(rec) {
    if (!rec || typeof rec !== 'object') return { bad: 'missing' };
    if (rec.schema > SCHEMA) return { tooNew: true, rec };
    if (!Number.isSafeInteger(rec.schema) || rec.schema < 1 || !Number.isSafeInteger(rec.rev) || rec.rev < 0 || typeof rec.body !== 'string') return { bad: 'shape' };
    if (checksum(rec.body) !== rec.sum) return { bad: 'checksum' };
    let body;
    try { body = JSON.parse(rec.body); } catch (e) { return { bad: 'json' }; }
    if (!safe(body)) return { bad: 'prototype' };
    if (rec.schema < SCHEMA) { body = migrate(body, rec.schema); if (!body) return { bad: 'migration' }; }
    return { rec, body };
  }
  // ---- per-field sanitizing ----
  const obj = (v) => !!v && typeof v === 'object' && !Array.isArray(v);
  const str = (v, max) => typeof v === 'string' && v.length <= max;
  const nat = (v, max) => Number.isSafeInteger(v) && v >= 0 && v <= max;
  const ID = /^[a-z0-9][a-z0-9_-]{0,31}$/;
  // regulars: per city (a stable id), at most six, each with an identity key, a seed, a person and packed grids
  function cleanRegs(r) {
    const out = {};
    if (!obj(r)) return out;
    for (const city of Object.keys(r).slice(0, 64)) {
      if (!ID.test(city) || !Array.isArray(r[city])) continue;
      const list = r[city].filter((g) => obj(g) && str(g.key, 40) && Number.isSafeInteger(g.seed) && obj(g.person) && nat(g.visits, 1e6) &&
        (g.h == null || str(g.h, 24000)) && (g.b == null || str(g.b, 24000)) && (g.u == null || str(g.u, 24000)) && (g.usual == null || str(g.usual, 60)));
      if (list.length) out[city] = list.slice(-6);
    }
    return trimRegs(out);
  }
  // Regulars are the part of a career that grows with play. A regular whose saved cut is oversized keeps his
  // identity without it (he walks in on a fresh start); over the total budget, the regulars seen longest ago lose
  // their saved cuts first, then their records. Changes `regs` in place and returns it.
  function trimRegs(regs, budget = REGS_BYTES) {
    if (!obj(regs)) return {};
    const all = [], len = (v) => (typeof v === 'string' ? v.length : 0);
    const strip = (g) => { delete g.h; delete g.b; delete g.u; };
    for (const city of Object.keys(regs)) {
      if (!Array.isArray(regs[city])) { delete regs[city]; continue; }
      for (const g of regs[city]) { if (len(g.h) + len(g.b) + len(g.u) > REG_GRID_BYTES) strip(g); all.push([city, g]); }
    }
    let size = JSON.stringify(regs).length;
    if (size <= budget) return regs;
    all.sort((x, y) => (x[1].lastDay | 0) - (y[1].lastDay | 0));
    for (const [, g] of all) {
      if (size <= budget) break;
      if (g.h == null && g.b == null && g.u == null) continue;
      const before = JSON.stringify(g).length; strip(g); size -= before - JSON.stringify(g).length;
    }
    for (const [city, g] of all) {
      if (size <= budget) break;
      const list = regs[city], i = list ? list.indexOf(g) : -1;
      if (i < 0) continue;
      size -= JSON.stringify(g).length + 1; list.splice(i, 1);
      if (!list.length) delete regs[city];
    }
    return regs;
  }
  // population deficits: per city, a bounded number per group
  function cleanPop(p) {
    const out = {};
    if (!obj(p)) return out;
    for (const city of Object.keys(p).slice(0, 64)) {
      if (!ID.test(city) || !obj(p[city])) continue;
      const d = {};
      for (const g of Object.keys(p[city]).slice(0, 64)) { const v = p[city][g]; if (/^\d{1,3}$/.test(g) && typeof v === 'number' && Number.isFinite(v)) d[g] = Math.max(-2, Math.min(4, v)); }
      out[city] = d;
    }
    return out;
  }
  // the active contract: its shape and sizes (career-run.js checks that it is this career's playable contract)
  const STATES = ['offered', 'active', 'suspended', 'incomplete', 'completed'];
  function cleanActive(a) {
    if (!obj(a) || !str(a.id, 120) || !STATES.includes(a.state) || !obj(a.person) || !obj(a.start) || !str(a.start.h, 24000) || !obj(a.request)) return null;
    if (a.start.b != null && !str(a.start.b, 24000)) return null;
    if (a.work != null && !(obj(a.work) && str(a.work.h, 24000) && (a.work.b == null || str(a.work.b, 24000)))) return null;
    if (a.work && a.work.br != null && !str(a.work.br, 24000)) a.work.br = null; // damaged brows: the checkpoint keeps the rest
    if (a.job != null && !nat(a.job, 1e9)) a.job = null;
    if (a.doneJob != null && !nat(a.doneJob, 1e9)) delete a.doneJob;
    return a;
  }
  // the director's memory: bounded rings; a damaged one starts fresh (it only shapes variety)
  function cleanDir(d) {
    const D = HSC.director;
    if (!obj(d) || !Array.isArray(d.sig) || !Array.isArray(d.lanes) || !Array.isArray(d.chapterLog)) return D.fresh();
    d.sig = d.sig.filter((x) => typeof x === 'string' && x.length < 400).slice(-(D.RING || 64));
    d.lanes = d.lanes.filter((x) => typeof x === 'string' && x.length < 40).slice(-64);
    d.chapterLog = d.chapterLog.filter(obj).slice(-10);
    return d;
  }
  // the parts of a career record: core (career.js), dir (director.js), regs (per-city regulars), active contract
  function sanitize(body) {
    const C = HSC.career;
    if (!body || typeof body !== 'object' || !body.core) return null;
    const bad = C.validate(body.core);
    if (bad.length) return null;
    const out = { core: body.core, dir: cleanDir(body.dir), regs: cleanRegs(body.regs), active: cleanActive(body.active) };
    out.pop = cleanPop(body.pop);
    // the economy (economy.js): a damaged record is dropped, and the first commit re-migrates the mirrored coins
    const e = body.eco;
    if (e && typeof e === 'object' && Number.isSafeInteger(e.balance) && Number.isSafeInteger(e.paid) && Array.isArray(e.ledger) && Array.isArray(e.keys) && e.sources && e.sinks) out.eco = e;
    if (body.ecoLegacy) out.ecoLegacy = true;
    // entitlements bought with coins (item keys such as salon:part:wall:plaster); bounded by the catalog
    if (Array.isArray(body.ent)) out.ent = body.ent.filter((k) => typeof k === 'string' && k.length < 80).slice(-500);
    // the wishlist: at most one target per kind, each a shop key and its price
    if (obj(body.wish)) {
      out.wish = {};
      for (const k of ['salon', 'cosmetic']) { const w = body.wish[k]; if (obj(w) && str(w.key, 80) && nat(w.price, 1e7)) out.wish[k] = { key: w.key, price: w.price }; }
    }
    // branches: one per city id; a damaged look is dropped (the salon shows the neutral look), the record stays
    if (obj(body.branches)) {
      out.branches = {};
      for (const city of Object.keys(body.branches).slice(0, 64)) {
        const br = body.branches[city];
        if (!ID.test(city) || !obj(br)) continue;
        out.branches[city] = { v: nat(br.v, 99) ? br.v : 1, theme: str(br.theme, 32) ? br.theme : 'neutral', parts: obj(br.parts) ? br.parts : null, region: str(br.region, 32) ? br.region : '', fit: nat(br.fit, 4) ? br.fit : 0, objects: Array.isArray(br.objects) ? br.objects.filter((x) => str(x, 40)).slice(0, 16) : [] };
      }
    }
    // the portfolio's own section: seals, claimed reward ids and at most 24 favourite cards within their budgets;
    // a damaged card is dropped, never the career (portfolio contract section 14)
    if (obj(body.port)) {
      const P = HSC.portfolio, p = body.port, seals = {};
      if (obj(p.seals)) for (const k of Object.keys(p.seals).slice(0, 512)) if (str(k, 120) && p.seals[k] === 1) seals[k] = 1;
      let cards = Array.isArray(p.cards) ? p.cards.filter((c) => (P ? P.validCard(c) : obj(c))).slice(0, 24) : [];
      while (cards.length && JSON.stringify(cards).length > 384 * 1024) cards = cards.slice(0, -1);
      out.port = { v: 1, edition: str(p.edition, 16) ? p.edition : 'p1', seals, claimed: Array.isArray(p.claimed) ? p.claimed.filter((x) => str(x, 160)).slice(0, 512) : [], cards, migrated: p.migrated === true };
    }
    return out;
  }

  // storage: { get(key) -> Promise(value|null), set(key, value) -> Promise }
  function journal(storage) {
    let head = null; // { slot, rev, body }
    let lease = Symbol('lease'), tooNewSeen = false;
    async function load() {
      const recs = await Promise.all(KEYS.map((k) => storage.get(k).catch(() => null)));
      let best = null, newer = false;
      recs.forEach((rec, slot) => {
        const o = open(rec);
        if (o.tooNew) { newer = true; return; }
        if (o.bad || !o.rec.committed) return;
        const body = sanitize(o.body);
        if (!body) return;
        if (!best || o.rec.rev > best.rev) best = { slot, rev: o.rec.rev, body };
      });
      // a newer game version wrote here: the career is read-only until the update (save contract section 8). Even
      // beside an older readable record, writing would only ever be refused as stale against the newer one
      if (newer) { head = null; tooNewSeen = true; return { tooNew: true }; }
      head = best;
      return best ? { body: best.body, rev: best.rev, newerExists: false } : { body: null, newerExists: false };
    }
    // apply(body) -> new body (pure); the event is applied to a copy of the last committed body
    let released = false;
    async function commit(apply) {
      // a released journal (the page was hidden) reloads before it writes again, so it never overwrites what another
      // surface wrote meanwhile; a write is never dropped (a reward credit may arrive while an ad covers the page)
      if (released) await load2();
      if (tooNewSeen) { const e = new Error('career-save: saved by a newer game version'); e.tooNew = true; throw e; }
      const mine = lease;
      // a newer revision written by another surface: this one is stale and must reload first (section 10). Only a
      // record that really loads counts: a pointer to a damaged record (which load skipped) does not freeze saving
      const ptr = await storage.get(PTR).catch(() => null);
      if (head && ptr && Number.isSafeInteger(ptr.rev) && ptr.rev > head.rev && (ptr.slot === 0 || ptr.slot === 1)) {
        const o = open(await storage.get(KEYS[ptr.slot]).catch(() => null));
        if (o.tooNew || (!o.bad && o.rec.committed && o.rec.rev > head.rev && sanitize(o.body))) { const e = new Error('career-save: stale base revision'); e.stale = true; throw e; }
      }
      const base = head ? JSON.parse(JSON.stringify(head.body)) : null;
      const next = apply(base);
      if (!next || !next.core) throw new Error('career-save: empty commit');
      const bad = HSC.career.validate(next.core);
      if (bad.length) throw new Error('career-save: invariant ' + bad.join(','));
      const rev = (head ? head.rev : 0) + 1, slot = head ? 1 - head.slot : 0;
      let pending = seal(next, rev, false);
      // size budget (section 4): over it, the regulars' saved cuts are trimmed hard; what still does not fit is
      // refused before anything is written, and a warning comes well before it
      let bytes = sizeOf(pending);
      if (bytes > MAX_BYTES && obj(next.regs)) { next.regs = trimRegs(next.regs, REGS_BYTES / 4); pending = seal(next, rev, false); bytes = sizeOf(pending); }
      if (bytes > MAX_BYTES) { const e = new Error('career-save: record too large (' + bytes + ' bytes)'); e.tooLarge = true; throw e; }
      if (bytes > WARN_BYTES) console.warn('career-save: record is ' + bytes + ' bytes (limit ' + MAX_BYTES + ')');
      if (storage.saveCommitted) {
        await storage.saveCommitted(KEYS[slot], {...pending, committed: true}, PTR, {slot, rev});
        head = {slot, rev, body:next};
        return next;
      }
      await storage.set(KEYS[slot], pending);
      if (mine !== lease) throw new Error('career-save: lease lost');
      const back = open(await storage.get(KEYS[slot]));
      if (back.bad || back.rec.rev !== rev) throw new Error('career-save: read-back failed');
      await storage.set(KEYS[slot], Object.assign({}, pending, { committed: true }));
      // the committed record is the commit (load never reads the pointer); a failed pointer write is caught up next time
      head = { slot, rev, body: next };
      await storage.set(PTR, { slot, rev }).catch((e) => console.warn('career-save: pointer not written', e));
      return next;
    }
    // another surface took over, or the page was hidden: stop writing until the journal is loaded again
    const release = () => { lease = Symbol('lease'); released = true; };
    const load2 = async () => { tooNewSeen = false; const r = await load(); released = false; return r; };
    return { load: load2, commit, release, released: () => released, current: () => (head ? head.body : null), rev: () => (head ? head.rev : 0) };
  }

  HSC.careerSave = { SCHEMA, KEYS, PTR, WARN_BYTES, MAX_BYTES, REGS_BYTES, REG_GRID_BYTES, journal, checksum, sanitize, open, migrate, trimRegs, sizeOf };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): the career director's catalog, built from the game itself
// (docs/CAREER-CONTRACT-DIRECTOR.md section 3-5; CITY-CUSTOMER-VARIABILITY.md sections 3-9).
//
//   customers   resident (the city's weighted-fair population scheduler), visitor, VIP, or a returning regular
//               (restored, never rerolled); the game's own person generator draws the physical traits
//   starts      a walk-in cut, a regular's grown-out last cut, a hair disaster, a tidy-up or a beard to shape
//   requests    every style the engine can build that suits the person and is shorter than the start
//   validate    returns reason codes: nothing to grow back, tools and services unlocked, beard present, ...
//   baseline    a trim one length shorter everywhere: always achievable from any start with hair to cut
//
// City tables (population mix, style and tattoo tendencies) are data. Until the owner's researched tables arrive
// every city uses the neutral shared table: the game's global heritage weights, marked low confidence. Nothing
// here derives a style, tattoo or behaviour from heritage; heritage only picks plausible physical appearance.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const M = () => HSC.meta;
  const H = () => HSC.HERITAGE || [];
  const K = () => HSC.requestKit, B = () => HSC.modes && HSC.modes.build;
  const level = () => (M() && M().data ? M().level() : 1);
  const BIG_DROP = 2600; // total levels removed: above this a cut is a transformation, below a precision job

  // ---- the neutral population table (low confidence; city research replaces it per city) ----
  function neutralTable() { const t = {}; H().forEach((h, i) => { t[i] = h.w; }); return { groups: t, confidence: 'low', source: 'neutral-global' }; }
  // a sourced population table wins; otherwise the city's main group is about two-thirds of its customers, a second group
  // about one in seven, and the neutral table the rest, so no city is ever uniform
  const MAIN = 0.65, SECOND = 0.15;
  function tableFor(cityId) {
    const c = HSC.career && HSC.career.city(cityId);
    if (c && c.population) return c.population;
    const n = neutralTable(), ids = H().map((h) => h.id), [a, b] = (c && c.people) || [];
    if (ids.indexOf(a) < 0 || ids.indexOf(b) < 0) return n;
    const tot = Object.values(n.groups).reduce((x, y) => x + y, 0), g = {};
    for (const k in n.groups) g[k] = (1 - MAIN - SECOND) * (n.groups[k] / tot);
    g[ids.indexOf(a)] += MAIN; g[ids.indexOf(b)] += SECOND;
    return { groups: g, confidence: 'low', source: 'owner-provisional' };
  }
  // the weighted-fair scheduler (variability section 4): each draw adds every group's share to its deficit, the
  // largest deficit is chosen (seeded tie-break) and loses one; deficits persist per city and are bounded
  // Choosing does not change the saved deficits: a generation transaction tries several candidates, and only the
  // customer of the contract finally offered is counted (commitGroup), once.
  function step(pop, cityId) {
    const t = tableFor(cityId).groups, ids = Object.keys(t), total = ids.reduce((a, k) => a + t[k], 0) || 1;
    const d0 = pop[cityId] || {}, d = {};
    for (const k of ids) d[k] = Math.max(-2, Math.min(4, (d0[k] || 0) + t[k] / total));
    return { ids, d };
  }
  function drawGroup(pop, cityId, R) {
    const { ids, d } = step(pop, cityId);
    let best = null;
    for (const k of ids) if (best == null || d[k] > d[best] + 1e-9 || (Math.abs(d[k] - d[best]) < 1e-9 && R.next() < 0.5)) best = k;
    return +best;
  }
  function commitGroup(pop, cityId, group) {
    const { d } = step(pop, cityId);
    if (!(String(group) in d)) return pop;
    d[group] -= 1;
    pop[cityId] = d;
    return pop;
  }

  const traitsOf = (p, silhouette) => ({ silhouette, texture: (p.hair && p.hair.type) || '1b', beard: p.beard.style, age: p.years });
  function makeCatalog(env) {
    // env: { pop (per-city deficits, saved), regs (per-city regulars, saved), recent walk-ins }
    const catalog = {
      modes: {
        requests: { lane: (st, rq) => (rq.drop >= BIG_DROP ? 'transformation' : 'precision') },
        fix: { lane: () => 'recovery', specialist: true, eligible: () => (HSC.modes.inCareer || HSC.modes.unlocked)('fix') },
        beard: { lane: () => 'precision', specialist: true, eligible: () => (HSC.modes.inCareer || HSC.modes.unlocked)('beard') },
        rush: { lane: () => 'pressure', specialist: true, eligible: () => (HSC.modes.inCareer || HSC.modes.unlocked)('rush') },
      },
      // the city's own setting, kept inside the registry's bound; the 12% neutral fallback until a city is researched
      visitorShare(cityId) {
        const c = (HSC.CITIES || []).find((x) => x.id === cityId), v = c && c.visitor;
        return v && v.share >= 0 ? Math.min(v.share, HSC.cityRegistry.VISITOR_MAX) : 0;
      },
      customer(seed, ctx) {
        if (ctx.source === 'regular' && ctx.regular && ctx.regular.person) {
          const p = Object.assign({}, ctx.regular.person);
          return { person: p, regular: ctx.regular, traits: traitsOf(p, 'grown:' + (ctx.regular.usual || 'own') + ':' + ctx.regular.visits) };
        }
        const R = HSC.rng(seed);
        const opts = {};
        // residents follow the city's population scheduler; visitors and VIPs use the neutral world table
        if (ctx.source === 'resident') opts.heritage = drawGroup(env.pop, ctx.city, R);
        const draw = ctx.source === 'resident' ? { city: ctx.city, group: opts.heritage } : null;
        // residents also follow their city's habits: its age mix, and how many men wear facial hair
        const home = ctx.source === 'resident' && HSC.career && HSC.career.city(ctx.city), habit = home && home.habits;
        if (habit) { const a = R.next(), [y, m] = habit.age; opts.age = a < y ? 'young' : a < y + m ? 'middle' : 'old'; }
        const bearded = habit && ctx.mode !== 'beard' ? R.next() < habit.beard : null;
        // Beards selects someone who already has a beard to shape; it never writes one onto a customer
        const want = ctx.mode === 'beard' ? HSC.BEARD_ARRIVALS[seed % HSC.BEARD_ARRIVALS.length] : null;
        const p = want ? HSC.selectPerson(seed, opts, (x) => x.beard.style === want, 600) || HSC.makePerson(seed, Object.assign({}, opts, { beard: want })) : bearded != null ? HSC.selectPerson(seed, opts, (x) => (x.beard.style !== 'clean') === bearded, 60) || HSC.makePerson(seed, opts) : HSC.makePerson(seed, opts);
        if (!p) return null;
        if (habit) p.local = { tattoo: habit.tattoo, ear: habit.ear }; // what is usual where he lives (extras.js)
        if (ctx.source === 'vip') p.vip = true;
        // a visitor's origin is recorded: the neutral world table until a city's visitor mix is researched
        if (ctx.source === 'visitor') p.visitor = { origin: 'neutral-world', v: 1 };
        return { person: p, traits: traitsOf(p, null), draw };
      },
      starts(cu, mode, ctx) {
        const p = cu.person, W = HSC.walkIns, R = HSC.rng((p.seed ^ 0x9e3779b9) >>> 0);
        let walk, profile;
        if (cu.regular && cu.regular.h) {
          // a regular comes back with his last cut grown out (two to four weeks)
          const h = HSC.gridUnpack(cu.regular.h, 5), b = HSC.gridUnpack(cu.regular.b, HSC.BEARD_MM.length - 1), u = HSC.gridUnpack(cu.regular.u, HSC.BEARD_MM.length - 1);
          // regrowth follows the career calendar: about a week per chapter (five contracts) since his last visit,
          // one to six weeks; a record from before the calendar keeps the old two-to-four-week rhythm
          const weeks = Number.isSafeInteger(cu.regular.lastDay) && Number.isSafeInteger(ctx && ctx.turn) ? Math.max(1, Math.min(6, Math.round((ctx.turn - cu.regular.lastDay) / 5))) : 2 + (cu.regular.visits % 3);
          if (h && b && u) { const g = HSC.regularGrow(h, b, u, weeks); walk = g.hair; cu.startBeard = g.beard; profile = 'grown:' + (cu.regular.usual || 'own') + ':w' + weeks; }
        }
        if (!walk) { const w = HSC.pickWalkIn(p, (env.recent || []).slice(-4)); if (!w) return []; walk = W.build(w); profile = w.id; }
        const beard0 = cu.startBeard || HSC.beardStartFor(p);
        const base = { silhouette: profile, beard: p.beard.style, hair: walk, beardGrid: beard0, cost: {} };
        if (mode === 'fix') { const j = B().disaster(p, walk, R, null, beard0); return j ? [Object.assign({}, base, { id: 'disaster', silhouette: profile + ':botched:' + j.flaws.join('+'), hair: j.start, beardGrid: j.beard ? j.beard.start : beard0, job: j, cost: { repair: 1 } })] : []; }
        if (mode === 'rush') { const j = B().tidy(p, walk, R); return j ? [Object.assign({}, base, { id: 'tidy', silhouette: profile + ':tidy', hair: j.start, job: j, cost: { time: 1 } })] : []; }
        if (mode === 'beard') return p.beard.style === 'clean' || /^stubble/.test(p.beard.style) ? [] : [Object.assign({}, base, { id: 'beard' })];
        return [Object.assign({}, base, { id: cu.regular ? 'regular' : 'walkin' })];
      },
      requests(cu, st, mode, ctx) {
        const p = cu.person, kit = K();
        // a rescue's complexity is its repair (the start's cost), not a second precision charge, so the licence's
        // rescue chapter (bands 1-2, budget 1) offers real repairs instead of falling back to a trim
        if (mode === 'fix' || mode === 'rush') return [{ id: st.job.style.id, family: st.job.style.fam || 'fix', target: st.job.target, beardGoal: st.job.beard ? st.job.beard.style : undefined, beardTarget: st.job.beard ? st.job.beard.target : undefined, drop: dropOf(st.hair, st.job.target), cost: { precision: 0 }, weight: 1 }];
        if (mode === 'beard') {
          const j = B().beardJob(p, st.beardGrid, HSC.rng((p.seed ^ 0x51ed27) >>> 0));
          return j ? [{ id: 'beard:' + j.style, family: 'beard:' + j.style, beardGoal: j.style, beardTarget: j.target, cost: { precision: ['goatee', 'vandyke', 'anchor', 'balbo', 'circle'].includes(j.style) ? 1 : 0 }, weight: 1, drop: 0 }] : [];
        }
        // orders: every suitable, achievable cut. A Familiar regular (two visits) asks for his usual, or a mild
        // variation of it (the same family), more often (director section 12)
        const R0 = cu.regular, fam = R0 && R0.usual && HSC.requestKit && HSC.requestKit.byId.get(R0.usual);
        const lean = (style) => (!R0 || (R0.visits | 0) < 2 ? 1 : R0.usual === style.id ? 4 : fam && fam.fam === style.fam ? 2 : 1);
        // the city's popular cuts lean up; every suitable cut stays possible
        const home = ctx && ctx.city && HSC.career ? HSC.career.city(ctx.city) : null, cuts = (home && home.habits && home.habits.cuts) || {};
        const opts = B().options(p, st.hair).map(([w, style, target]) => ({ id: style.id, family: style.fam + ':' + (style.contour || ''), target, drop: dropOf(st.hair, target), cost: { precision: ['part', 'crew', 'temple', 'taper'].includes(style.contour) ? 1 : 0 }, weight: w * lean(style) * (cuts[style.fam] || 1) }));
        // about half of the men with a beard want it done too: one order for the hair and the beard
        // (the first two licence chapters teach the hair alone)
        const bj = !ctx.early && (p.seed & 1) === 0 ? B().beardJob(p, st.beardGrid, HSC.rng((p.seed ^ 0x51ed29) >>> 0)) : null;
        if (bj) for (const o of opts) Object.assign(o, { beardGoal: bj.style, beardTarget: bj.target });
        // the broad stage (director fallback 5): a plausible style without its usual weighting, still feasible
        return ctx.broad ? opts.map((o) => Object.assign(o, { weight: 1 })) : opts;
      },
      validate(c) {
        const r = [];
        const t = c.request.target, h = c.start.hair;
        if (t) { for (let i = 0; i < 8192; i++) if (t[i] > h[i]) { r.push('needs-growth'); break; } }
        if (c.request.beardTarget) { const b = c.start.beardGrid; for (let i = 0; i < 8192; i++) if (c.request.beardTarget[i] > b[i]) { r.push('beard-needs-growth'); break; } }
        if (c.mode === 'beard' && !c.request.beardTarget) r.push('no-beard-target');
        if (c.mode !== 'beard' && t && dropOf(h, t) < 150) r.push('nothing-to-cut');
        if (c.mode !== 'requests' && !(HSC.modes.inCareer || HSC.modes.unlocked)(c.mode)) r.push('mode-locked');
        // owned tools: a beard request is offered only if the unlocked tools can bring 85% of the beard it changes
        // within one length of the target (the 3-star line); the scalp is always reachable with the clipper's guards
        if (c.request.beardTarget && HSC.beardReach) {
          const reach = HSC.beardReach(), b = c.start.beardGrid, t = c.request.beardTarget;
          let need = 0, ok = 0;
          for (let i = 0; i < 8192; i++) {
            if (!(t[i] < b[i])) continue;
            need++;
            if (reach.some((l) => l <= b[i] && Math.abs(l - t[i]) <= 1)) ok++;
          }
          if (need && ok / need < 0.85) r.push('tool-unavailable');
        }
        return r;
      },
      // the broad state he sits down with (map logic section 9): hair shaved / short / medium / long by the mean
      // scalp length, and facial hair clean / stubble / beard by the mean length of the grown beard cells
      presence(c) {
        const h = c.start.hair, b = c.start.beardGrid, MM = HSC.BEARD_MM;
        let hs = 0, hn = 0, bs = 0, bn = 0;
        if (h) for (let i = 0; i < 8192; i += 5) { hs += h[i]; hn++; }
        if (b) for (let i = 0; i < 8192; i += 5) if (b[i] > 0) { bs += MM[b[i]]; bn++; }
        const m = hn ? hs / hn : 0, bm = bn ? bs / bn : 0;
        const hair = m < 0.6 ? 'shaved' : m < 2 ? 'short' : m < 3.5 ? 'medium' : 'long';
        const beard = bn < 80 ? 'clean' : bm <= 2 ? 'stubble' : 'beard';
        return hair + '|' + beard;
      },
      // seconds a Rush tidy-up needs: the regrowth to clear at a steady clipper pace (about 200 cells a second for
      // the 0.56-wide clipper), plus pick-up, a tool switch
      // and the reveal, then a 1.5x accessibility margin (director section 6)
      timeNeeded(c) {
        const h = c.start.hair, t = c.request.target;
        if (!h || !t) return 0;
        let cells = 0;
        for (let i = 0; i < 8192; i++) if (h[i] > t[i]) cells++;
        return (cells / 200 + 3 + 2 + 3) * 1.5;
      },
      baseline(cu, ctx, st) {
        const s0 = st || (catalog.starts(cu, 'requests', ctx) || [])[0];
        if (!s0) return null;
        const target = s0.hair.map((v) => Math.max(0, v - 1));
        return { start: s0, request: { id: 'trim', family: 'trim', target, drop: dropOf(s0.hair, target), cost: {}, weight: 1 } };
      },
    };
    return catalog;
  }
  function dropOf(a, b) { let d = 0; for (let i = 0; i < 8192; i++) d += Math.max(0, a[i] - b[i]); return d; }

  HSC.careerCatalog = { make: makeCatalog, neutralTable, tableFor, drawGroup, commitGroup, dropOf };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): the career in the game (docs/CAREER-MAP-LOGIC.md sections 5, 10, 12;
// CAREER-SAVE-AND-QA-CONTRACT.md section 7; owner-approved 5 November 2026).
//
//   play      makes sure a career exists and a contract is offered (generated, then committed to the journal
//             before the customer is shown), then seats that customer
//   seat      the contract supplies the person, the starting hair and beard, the request
//   done      at the reveal: one-star valid work completes the contract (idempotent), mastery and regulars are
//             recorded, the director learns the result, and the next contract is generated and committed
//   resume    an offered or active contract survives a restart exactly (it is saved whole)
// The career save is its own journal (career-save.js); nothing here touches coins, prices or advertising.
//
// Cities: the 18-city registry (cities.js), every city on the neutral population table until its research lands.
// A career is created at startup on a placeholder home city (the economy needs the journal); the first Career visit
// asks for the founding city (found), and each finished chapter returns to the world map for the player's choice.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const M = () => HSC.meta, G = () => globalThis.skinFadeStudio;
  const pack = (a) => HSC.gridPack(a), unpack = (s, max) => (typeof s === 'string' ? HSC.gridUnpack(s, max) : null);
  const BTOP = () => (HSC.BEARD_MM ? HSC.BEARD_MM.length - 1 : 16);
  const run = { j: null, body: null, catalog: null, ready: false, busy: null };
  const C = () => HSC.career, D = () => HSC.director;
  const SPECIALIST = () => D().SPECIALIST.filter((m) => HSC.modes && (HSC.modes.inCareer || HSC.modes.unlocked)(m));

  async function init(client) {
    C().setCities(HSC.CITIES || [], HSC.CITIES_VERSION || 1);
    run.j = HSC.careerSave.journal({
      get: (k) => client.loadProgress(k, null),
      set: (k, v) => client.saveProgress(k, v),
      saveCommitted: client.saveCareerCommit,
    });
    const r = await run.j.load();
    if (r.tooNew) { run.tooNew = true; return; }
    run.body = r.body ? Object.assign({ pop: {}, regs: {} }, r.body) : null;
    if (run.body && run.body.core) run.body.core = C().reconcile(run.body.core);
    if (run.body && !activeOk(run.body)) {
      console.warn('career: the saved contract was damaged; a fresh contract for the same slot replaces it');
      await commit((b) => { const body = JSON.parse(JSON.stringify(b)); body.active = null; return withNextContract(body); });
    }
    if (!run.body && E()) {
      // Establish the journal and signed wallet during startup, not only after the player first opens Career.
      // Orders and every standalone mode therefore use the same ledger, bills and idempotency from customer one.
      // the founding city is the player's choice on their first Career visit (map logic phase A)
      const seed = (Math.random() * 4294967296) >>> 0 || 1;
      await commit(() => withEco({ core: C().create(C().UNSET, seed), dir: D().fresh(), regs: {}, pop: {}, active: null }));
      mirror();
    } else if (run.body && !run.body.eco && E()) await commit((b) => withEco(b));
    run.ready = !E() || !!run.body;
    if (run.ready) try { replay(); } catch (e) { console.error('career: replay at the reveal failed', e); }
  }
  // ---- the economy (economy.js) lives in the same journal, so a job, its milestones and the next contract
  // land in one commit; the first career body migrates the progress save's coins and level (never paid twice) ----
  const E = () => HSC.economy;
  function withEco(b) {
    if (b.eco || !E()) return b;
    const d = (M() && M().data) || {};
    const body = Object.assign({}, b);
    body.eco = E().migrate(E().fresh(), { coins: d.coins || 0, level: M() && M().level ? M().level() : 1 });
    body.ecoLegacy = (d.cuts || 0) > 0; // an existing player has had a first haircut already
    return body;
  }
  // the progress save mirrors the balance (not below zero) so other builds and the fallback show the same coins
  function mirror() { const d = M() && M().data; if (d && run.body && run.body.eco) { d.coins = Math.max(0, run.body.eco.balance); M().save(); } }
  // the result is reported only once the journal holds it: a commit that failed after its apply step granted and
  // charged nothing, so it reports nothing (null)
  function ecoCommit(fn) {
    let out = null;
    return commit((b) => { const body = JSON.parse(JSON.stringify(withEco(b))); const r = fn(body.eco); out = r; if (r && r.eco) body.eco = r.eco; return body; }).then((b) => { mirror(); return b ? out : null; });
  }
  HSC.econ = {
    ready: () => !!(run.ready && run.body && run.body.eco && E()),
    balance: () => (run.body && run.body.eco ? run.body.eco.balance : 0),
    state: () => run.body && run.body.eco,
    earn: (key, cat, n) => ecoCommit((eco) => E().apply(eco, { key, type: 'earn', cat, amount: Math.max(0, Math.round(n)) })),
    spend: (key, cat, price) => ecoCommit((eco) => E().buy(eco, key, cat, price)).then((r) => !!(r && !r.error)),
    // a purchase and what it buys land in one journal commit (implementation contract section 4): the item key is
    // kept in the career's entitlement list, so the shop can never lose a paid item or keep an unpaid one
    buyItem: (key, cat, price) => {
      let out = null;
      return commit((b) => {
        const body = JSON.parse(JSON.stringify(withEco(b)));
        const r = E().buy(body.eco, key, cat, price);
        out = r;
        if (r.error) return body;
        if (!r.duplicate) body.eco = r.eco;
        const ent = (body.ent = Array.isArray(body.ent) ? body.ent : []);
        if (!ent.includes(key)) ent.push(key);
        // a bought wish is done
        if (body.wish) for (const k of Object.keys(body.wish)) if (body.wish[k] && body.wish[k].key === key) body.wish[k] = null;
        return body;
      }).then((b) => { mirror(); return !!(b && out && !out.error); }); // bought only once the commit has landed
    },
    owns: (key) => !!(run.body && Array.isArray(run.body.ent) && run.body.ent.includes(key)),
    entitlements: () => (run.body && Array.isArray(run.body.ent) ? run.body.ent.slice() : []),
    // until the career journal has loaded (or failed to), coin credits wait so a startup write cannot be lost
    starting: () => !run.initDone,
    payJob: (key, job) => ecoCommit((eco) => {
      const r = E().payJob(eco, key, job);
      // the first paid haircut pays its milestone on every path, not only in Career (balance model section 9)
      if (!r.error && !r.duplicate && r.eco.paid === 1 && !(run.body && run.body.ecoLegacy)) {
        const m = E().payMilestones(r.eco, [['first-haircut', E().CONFIG.milestones.firstHaircut]]);
        r.eco = m.eco; if (m.paid.length) run.milestones = m.paid;
      }
      return r;
    }),
    triple: (key, tip) => ecoCommit((eco) => E().tripleTip(eco, key, tip)),
    // the shift's highlighted modes, among those unlocked, and whether a job in this mode earns the bonus now
    demand: () => (run.body && run.body.eco ? E().demandModes(run.body.eco.paid, eligibleModes()) : []),
    demandMatch: (mode) => !!(run.body && run.body.eco && E().demandMatch(run.body.eco, mode, eligibleModes())),
    bill: () => (run.body && run.body.eco ? E().billDue(run.body.eco) : null),
    // the wishlist: one salon target and one cosmetic (economy architecture, "Wishlist"), kept in the journal
    wish: (kind, target) => commit((b) => { const body = JSON.parse(JSON.stringify(b)); body.wish = target ? { [kind]: target } : {}; return body; }),
    wishes: () => (run.body && run.body.wish) || {},
    // what milestones paid since the last look, for the result screen
    takeMilestones: () => { const m = run.milestones; run.milestones = null; return Array.isArray(m) ? m.reduce((a, x) => a + (Array.isArray(x) ? x[1] : x.amount || 0), 0) : 0; },
    // the player's one target, whichever shop it came from; an item owned by any route stops being a target
    // a malformed or stale saved wish (an item this build does not sell) is cleared, never allowed to break a shop
    wishTarget: () => {
      const w = (run.body && run.body.wish) || {};
      for (const kind of ['salon', 'cosmetic']) {
        const t = w[kind];
        if (!t) continue;
        let owned;
        try { owned = wishOwned(t.key); } catch (e) { owned = null; }
        if (owned === null) { dropWish(kind, t && t.key); continue; }
        return owned ? null : t;
      }
      return null;
    },
    // ordinary work per paid contract after the bill: what a gap is measured in (a safe default before any history)
    perJob: () => { const e = run.body && run.body.eco; return e && e.paid >= 5 ? Math.max(10, Math.round(((e.sources.job || 0) - (e.sinks.bill || 0)) / e.paid)) : 30; },
  };
  // whether a wished item is owned: true / false, or null when the key names nothing this build sells
  function wishOwned(key) {
    if (typeof key !== 'string') return null;
    if (run.body && Array.isArray(run.body.ent) && run.body.ent.includes(key)) return true;
    const k = key.split(':');
    if (k[0] === 'salon') {
      const S = HSC.salon, st = S && S.state ? S.state() : null;
      if (!st || !S.OPTIONS || !S.REGIONS) return false; // the salon has not loaded yet: the wish waits
      // a part: salon:part:<slot>:<option>
      if (k[1] === 'part' && k.length === 4) return Array.isArray(S.OPTIONS[k[2]]) && S.OPTIONS[k[2]].includes(k[3]) ? !!S.owns(k[2], k[3]) : null;
      // a regional shop: salon:shop:<city>, owned once it is in the salon's regions (priceOf knows only parts)
      if (k[1] === 'shop' && k.length === 3) return S.REGIONS.includes(k[2]) ? !!(Array.isArray(st.regions) && st.regions.includes(k[2])) : null;
      return null;
    }
    if (k[0] === 'wardrobe' && key.length > 9) {
      const W = HSC.wardrobeApi, cat = HSC.catalog;
      if (!W || !W.owns || !cat || !cat.byKey) return false;
      return cat.byKey.has(key.slice(9)) ? !!W.owns(key.slice(9)) : null;
    }
    return null;
  }
  // clears one bad wish, once (the shop renders often)
  function dropWish(kind, key) {
    run.dropping = run.dropping || {};
    if (run.dropping[kind] === key) return;
    run.dropping[kind] = key;
    console.warn('career: a saved wish names nothing on sale and is cleared', key);
    commit((b) => { const body = JSON.parse(JSON.stringify(b)); if (body.wish && body.wish[kind] && body.wish[kind].key === key) delete body.wish[kind]; return body; });
  }
  const eligibleModes = () => ['requests', 'fix', 'beard', 'rush'].filter((m) => !HSC.modes || (HSC.modes.inCareer || HSC.modes.unlocked)(m));
  // resolves to the committed body, or null when nothing was committed (callers report success only on a body)
  // a completion still owed (its write failed, below) is written first, ahead of whatever this commit carries
  const commit = (fn) => { if (run.owed && !run.completing) retryOwed(); return (run.busy = (run.busy || Promise.resolve()).then(() => run.j.commit((b) => fn(b || run.body))).then((b) => { run.body = b; return b; }).catch(async (e) => {
    console.error('career: commit failed', e);
    // another surface wrote a newer career: take it (the event is not applied twice; the player repeats it)
    if (e && e.stale) { try { const r = await run.j.load(); if (r.tooNew) run.tooNew = true; else if (r.body) run.body = Object.assign({ pop: {}, regs: {} }, r.body); } catch (e2) {} }
    return null;
  })); };
  // the foreground owns the career (save contract section 10): hidden, it releases the lease; its next write reloads
  if (HSC.onHostPause) HSC.onHostPause((hidden) => {
    if (!run.j) return;
    if (hidden) { run.busy = (run.busy || Promise.resolve()).then(() => run.j.release()); return; }
    // back in front: pick up anything another surface committed meanwhile
    if (run.j.released()) run.busy = (run.busy || Promise.resolve()).then(() => run.j.load()).then((r) => { if (r && r.body) run.body = Object.assign({ pop: {}, regs: {} }, r.body); }).catch(() => {});
  });

  // ---- the contract ----
  function packContract(c) {
    const st = c.start, rq = c.request;
    return {
      id: c.id, seed: c.seed, revision: c.revision, reroll: c.reroll | 0, city: c.city, tour: c.tour, visit: c.visit, slot: c.slot, role: c.role,
      licence: c.licence, mode: c.mode, lane: c.lane, source: c.source, regular: c.regular, context: c.context, modifier: c.modifier, band: c.band,
      // how it was made: the fallback stage and whether the final recheck passed (director section 11)
      stage: c.stage || null, validated: c.validated !== false,
      person: c.customer.person, start: { profile: st.silhouette, h: pack(st.hair), b: pack(st.beardGrid) },
      request: { id: rq.id, family: rq.family, t: rq.target ? pack(rq.target) : null, bt: rq.beardTarget ? pack(rq.beardTarget) : null, beardGoal: rq.beardGoal || null, services: rq.services || null },
      state: 'offered', job: null,
    };
  }
  function ctxFor(body, reroll = 0) {
    const pos = C().position(body.core);
    // turn: the career calendar (one turn per generated contract); a regular's regrowth follows it, never the clock
    return { early: !!(pos && pos.licence && pos.chapter <= 2), city: pos ? pos.city : body.core.founding, level: M().level(), turn: (body.dir && body.dir.turn) | 0,
      reroll: reroll | 0, regulars: (body.regs[pos ? pos.city : body.core.founding] || []).map((g) => Object.assign({ key: g.key }, g)) };
  }
  // Generate the next contract in a transaction-owned body. The journal already gives commit callbacks a private
  // deep copy; cloning that large body again here can provoke a major collection on a city tap after a long shift.
  function fillNextContract(body, reroll = 0) {
    // A customer is generated only after the city is real. Generating against the hidden founding placeholder used to
    // advance the director and build several 8,192-cell target grids, then throw that unseen customer away when the
    // player chose a city. Apart from slowing the first Career tap, that phantom also biased the first visible draw.
    if (C().needsFounding(body.core) || C().phase(body.core) === 'map') { body.active = null; return body; }
    const catalog = HSC.careerCatalog.make({ pop: body.pop, regs: body.regs, recent: [] });
    const g = D().generate(body.core, body.dir, catalog, ctxFor(body, reroll));
    if (!g.contract) return body;
    body.dir = g.dir;
    // count the offered customer in the city's population scheduler, once
    const draw = g.contract.customer && g.contract.customer.draw;
    if (draw && HSC.careerCatalog.commitGroup) HSC.careerCatalog.commitGroup(body.pop, draw.city, draw.group);
    body.active = packContract(g.contract);
    return body;
  }
  // Pure wrapper for callers that do not own their input.
  function withNextContract(b) { return fillNextContract(JSON.parse(JSON.stringify(b))); }
  // a career exists and a contract is offered; returns the active contract
  // one ensure at a time: two callers at once (the mode switch and the hero) must not both found a career
  function ensure(cityId) { return (run.ensuring = (run.ensuring || Promise.resolve()).then(() => ensureNow(cityId))); }
  async function ensureNow(cityId) {
    if (!run.ready) return null;
    if (!run.body) {
      const founding = cityId || C().UNSET;
      const seed = (Math.random() * 4294967296) >>> 0 || 1; // the career seed is drawn once and saved
      await commit(() => fillNextContract(withEco({ core: C().create(founding, seed), dir: D().fresh(), regs: {}, pop: {}, active: null })));
      mirror();
    } else if (!run.body.active && !C().needsFounding(run.body.core) && C().phase(run.body.core) !== 'map') {
      await commit((b) => fillNextContract(b));
    }
    return run.body && run.body.active;
  }

  // ---- seating the contract's customer (modes.js asks these while the career mode is on) ----
  const act = () => run.body && run.body.active;
  // Contract states (save contract section 7): offered (drawn, not worked) -> active (in the chair) -> completed;
  // incomplete is accepted from older saves (new finishes retire that chair); suspended means the player left for
  // another mode with work done, so the checkpointed customer comes back with that work.
  // The contract follows the career chair: when Career seats a new chair job (after a mode switch, a reload of an
  // unfinished contract or a legacy incomplete finish), the contract moves to that job instead of being stranded.
  // real work: cells of hair or beard changed from the start (modes.js worked is the one definition; brows excluded)
  const worked = (s) => (HSC.modes && HSC.modes.worked ? HSC.modes.worked(s) : s.cutStrokeCount > 0);
  // any cell of hair or beard changed from the start: less than worked asks of a finish, yet still the player's cut,
  // so a checkpoint keeps it and a walk-in with it is never skipped away
  const changed = (s) => (HSC.modes && HSC.modes.changedCells ? HSC.modes.changedCells(s, 1) > 0 : worked(s));
  // brows (HSC.BROW_N cells, 2 full, 1 short, 0 shaved) pack the grids' run-length way; gridUnpack is fixed at 8192
  function unpackBrow(str) {
    const n = HSC.BROW_N;
    if (!n || typeof str !== 'string' || str.length > 24000) return null;
    const out = new Array(n), re = /([A-C])([0-9a-z]{1,4})/y;
    let i = 0, m;
    while (re.lastIndex < str.length && (m = re.exec(str))) { const k = parseInt(m[2], 36); if (!k || i + k > n) return null; out.fill(m[1].charCodeAt(0) - 65, i, i + k); i += k; }
    return i === n && re.lastIndex === str.length ? out : null;
  }
  const browsTouched = (s) => Array.isArray(s.brow) && s.brow.some((v) => v !== 2);
  // a finished contract whose completion could not be written: it is not seated again from his start (the cut and
  // the pay the result screen showed would be lost); it is written again first (owed, in done)
  const owes = (a) => !!(run.owed && a && run.owed.id === a.id);
  function person(job) {
    if (run.owed) retryOwed();
    const a = act();
    // while a finished contract's result is still being written no chair is given it: Next pressed during that save
    // must not seat him again, nor credit the next contract to him (the chair is re-seated when it lands, done)
    if (!a || a.state === 'completed' || run.completing === a.id || owes(a)) return null;
    // a new chair: an earlier chair's finish no longer applies (the engine's job numbers may start again)
    if (a.job !== job) { a.job = job; a.seated = null; delete a.doneJob; }
    return Object.assign({}, a.person, { job });
  }
  function start(s) {
    if (run.owed) retryOwed();
    const a = act();
    if (!a || run.completing === a.id || owes(a) || a.job !== s.jobId || s.cutStrokeCount) return null;
    // only the contract's own customer takes the contract's chair
    const p = s.look && s.look.person;
    if (!p || !a.person || p.seed !== a.person.seed) return null;
    const h = unpack(a.start.h, 5), b = unpack(a.start.b, BTOP());
    if (!h) return null;
    // this chair is already his (a reload): unless it no longer starts from his hair, which is a new chair that
    // carries the same number because the engine's job numbers started again
    if (a.seated === s.jobId && !(Array.isArray(s.startHair) && s.startHair.length === h.length && s.startHair.some((v, i) => v !== h[i]))) return null;
    a.seated = s.jobId;
    // a suspended contract resumes at its checkpoint (hair, beard and brows); scoring still counts from where he walked in
    const w = a.work, wh = w && unpack(w.h, 5), wb = w && unpack(w.b, BTOP()), wbr = w && unpackBrow(w.br);
    if (a.state === 'offered' || a.state === 'suspended' || a.state === 'incomplete') a.state = 'active';
    // seated again: an earlier incomplete finish no longer blocks this chair's result, even if the engine's job
    // numbers have started again and this chair has the same number
    delete a.doneJob;
    // the seat is saved (the state and this job), so a reload at this chair or at its reveal finds its contract
    const seat = Object.assign({}, a);
    commit((body) => { if (body.active && body.active.id === seat.id) { body.active = Object.assign({}, body.active, { state: seat.state, job: seat.job, seated: seat.seated }); delete body.active.doneJob; } return body; });
    const out = Object.assign({}, s, { hair: (wh || h).slice(), startHair: h, cutStrokeCount: w ? w.strokes | 0 : 0 });
    if (b) Object.assign(out, { beard: (wb || b).slice(), startBeard: b });
    if (wbr && Array.isArray(s.brow) && s.brow.length === wbr.length) { out.brow = wbr; if (HSC.setBrow) HSC.setBrow(wbr); }
    return out;
  }
  // the contract's customer has meaningful work (a checkpoint, or the chair changed from the start)
  function hasWork(a, s) {
    if (!a) return false;
    if (a.work && a.work.changed) return true;
    if (!s || a.job !== s.jobId || a.seated !== s.jobId) return false;
    // trimmed brows are kept with the checkpoint too, though they alone are not work that completes a contract
    return changed(s) || browsTouched(s);
  }
  // leaving the career chair for another mode: work is checkpointed (suspended), an untouched contract is offered again
  async function suspend(s) {
    const a = act();
    if (!a || !s || a.job !== s.jobId || s.status !== 'cutting') return;
    const work = hasWork(a, s) ? { h: pack(s.hair), b: pack(s.beard), br: Array.isArray(s.brow) && HSC.BROW_N && s.brow.length === HSC.BROW_N ? pack(s.brow) : null, strokes: Math.max(a.work ? a.work.strokes | 0 : 0, s.cutStrokeCount | 0), changed: true } : null;
    a.job = null; a.seated = null;
    await commit((b) => {
      const body = JSON.parse(JSON.stringify(b));
      if (!body.active || body.active.id !== a.id) return body;
      Object.assign(body.active, { job: null, seated: null, state: work ? 'suspended' : a.state === 'incomplete' ? 'incomplete' : 'offered' });
      if (work) body.active.work = work;
      Object.assign(a, { state: body.active.state, work: body.active.work });
      return body;
    });
  }
  const reqCache = { key: null, val: null };
  function request(s) {
    const a = act();
    if (!a || a.job !== s.jobId) return undefined;
    // An incomplete finish replaces the offer at the same Career position, so its contract id deliberately stays
    // the same while the reroll, seed, customer and request all change. Cache the generated offer, not only the
    // position id, or the replacement customer can inherit the retired customer's order and target grid.
    const key = a.id + ':' + (a.reroll | 0) + ':' + a.seed;
    if (reqCache.key === key) return reqCache.val;
    let val = null;
    const bt = a.request.bt ? unpack(a.request.bt, BTOP()) : null, t = a.request.t ? unpack(a.request.t, 5) : null;
    // an order may be for the hair, the beard, or both
    if (t) val = { style: (HSC.requestKit && HSC.requestKit.byId.get(a.request.id)) || { id: a.request.id, fam: a.request.family }, target: t, beard: bt };
    else if (bt) val = { style: { id: a.request.id, fam: 'beard' }, beard: bt };
    reqCache.key = key; reqCache.val = val;
    return val;
  }
  // the chair holds no contract (between chapters, before a city is chosen): nothing is scored or paid
  const unscored = () => { const a = act(), g = G(); return !a || !g || a.job !== g.getState().jobId; };

  // ---- the reveal: commit the result, learn from it, prepare the next job ----
  // what the result screen promised for this contract: the job as it was scored (requests.js), or, after a restart
  // at the reveal (HSC.lastJob is gone), the same job rebuilt from the saved result and the contract
  function jobOf(a, s) {
    if (HSC.lastJob && HSC.lastJob.key === a.id) return HSC.lastJob.job;
    const d = M() && M().data, lr = d && d.lastRound;
    if (!lr || lr.key !== a.id || lr.job !== s.jobId) return null;
    const lines = Array.isArray(lr.lines) ? lr.lines : [], rush = lines.find((l) => l[0] === 'rush'), p = a.person || {};
    // the amounts come from the economy's own rules (payout), never from the saved numbers
    return { kind: a.role === 'showcase' ? 'showcase' : a.mode, stars: lr.stars, judged: !!lr.judged, valid: true, regular: !!p.regular || !!a.regular, vip: !!p.vip, rushBonus: rush ? rush[1] | 0 : 0, demandMatch: lines.some((l) => l[0] === 'demand') };
  }
  // o: a completion owed from an earlier failed write (retryOwed), decided as it was then: the mode, the order and
  // the result screen may have moved on since, but what was shown is what is written
  function done(s, stars, o) {
    const a = act();
    if (!a || a.job !== s.jobId || run.completing === a.id) return;
    if (a.doneJob === s.jobId) return; // this chair's result is already written (an incomplete finish seen again)
    // only the contract's own customer completes it (a chair seated while a result was still being written is not his)
    const sp = s.look && s.look.person;
    if (sp && a.person && sp.seed !== a.person.seed) return;
    // from here until the result is written, no chair is given this contract (person, start)
    run.completing = a.id;
    let postedBill = null;
    // meaningful work (map logic §5): cells really changed from where he walked in (a checkpoint's work included)
    const judged = o ? o.judged : !!(HSC.modes && HSC.modes.judged && HSC.modes.judged(s)); // a Rescue or Beards contract: real work is what counts
    const valid = o ? o.valid : judged ? stars > 0 : HSC.modes && HSC.modes.worked ? worked(s) : s.cutStrokeCount > 0 || !!(a.work && a.work.changed);
    const result = { id: a.id, stars: valid ? Math.max(1, stars | 0) : 0, valid, regular: !!a.regular, mode: a.mode, style: a.request.id, tools: ['clipper'] };
    const pj = o ? o.pj : jobOf(a, s);
    commit((b) => {
      const body = JSON.parse(JSON.stringify(withEco(b)));
      const pos = C().position(body.core);
      const r = C().complete(body.core, result);
      if (r.error) { console.error('career: completion refused', r.error); return body; }
      body.core = r.state;
      body.core.rankBest = C().rankIndex(body.core, SPECIALIST()); // an earned rank is never lost
      D().noteResult(body.dir, result.stars, valid, a.band);
      if (!valid) {
        // Continue means the same thing as it does in Quick Play and the other modes: retire the finished chair and
        // bring in another customer. A weak/untouched Career result still earns no pay or progression, but it must not
        // silently recycle the same person and make the Continue arrow look broken. The career position stays put;
        // the director draws a fresh contract/customer for that same slot and learns from the failed result.
        if (body.active && body.active.id === a.id) body.active = null;
        return fillNextContract(body, (a.reroll | 0) + 1);
      }
      // the job's pay and any career milestones it reached (economy, idempotent by contract id and milestone id)
      if (body.eco && E() && !r.duplicate) {
        if (pj) { const paid = E().payJob(body.eco, a.id, Object.assign({}, pj, { valid: true })); body.eco = paid.eco; postedBill = paid.bill || null; }
        const first = body.eco.paid <= 1 && !body.ecoLegacy;
        const list = E().milestonesFor((r.result && r.result.events) || [], pos, first);
        if (pos && C().cityMastery(body.core, pos.city).all) list.push(['mastery:' + pos.city, E().CONFIG.milestones.cityMastery]);
        const m = E().payMilestones(body.eco, list);
        body.eco = m.eco;
        if (m.paid.length) run.milestones = m.paid;
      }
      // a relationship job makes (or keeps) a regular; regulars keep their identity and their last cut
      if (a.role === 'relationship' || a.regular) {
        const list = (body.regs[a.city] = body.regs[a.city] || []);
        const key = a.regular || 'g' + a.person.seed;
        const rec = list.find((g) => g.key === key) || (list.push({ key, seed: a.person.seed, person: a.person, visits: 0 }), list[list.length - 1]);
        rec.visits++; rec.usual = a.request.id; rec.lastChapter = (body.dir.cool || {}).chapter || 0; rec.lastDay = (body.dir.turn | 0);
        rec.h = pack(s.hair); rec.b = pack(s.beard); rec.u = a.start.b;
        if (list.length > 6) list.splice(0, list.length - 6);
        // the regulars are the part of a career that grows with play: their saved cuts stay within a byte budget
        if (HSC.careerSave.trimRegs) body.regs = HSC.careerSave.trimRegs(body.regs);
      }
      body.active = null;
      return withNextContract(body);
    }).then((landed) => {
      run.completing = null;
      if (!landed) {
      // nothing was written. A valid finish (the result screen has shown its pay) is owed: it is written again on
        // the next commit or the next chair, keyed by the contract id so it is never paid twice, and the contract is
        // not seated again from his start meanwhile. An invalid finish has no owed pay or progress.
        const b = act();
        run.owed = valid && b && b.id === a.id && b.state !== 'completed' ? o || { id: a.id, s: keep(s), stars, judged, valid, pj } : null;
        return;
      }
      if (run.owed && run.owed.id === a.id) run.owed = null;
      mirror();
      const n = act(), d = M() && M().data, g = G(), cur = g && g.getState();
      if (postedBill && d && d.lastRound && d.lastRound.key === a.id && !d.lastRound.bill) {
        d.lastRound.bill = postedBill; d.lastRound.lines = (d.lastRound.lines || []).concat(postedBill.lines || []); M().save();
      }
      if (!n || !d) return;
      // Next was pressed while the result was being written: the chair got an ordinary walk-in, not a contract. If he
      // is still untouched he is replaced by the contract's customer straight away (the game's own skip, as a mode
      // switch does); once cut he is practice and the contract waits for the next chair
      if (cur && cur.jobId > s.jobId) {
        const mine = cur.look && cur.look.person && cur.look.person.seed === n.person.seed && n.job === cur.jobId;
        const untouched = cur.status === 'cutting' && !(cur.cutStrokeCount > 0) && !changed(cur) && !browsTouched(cur);
        if (!mine && untouched && g.skip && HSC.modes && HSC.modes.current() === 'career') {
          const job = cur.jobId + 1;
          n.job = null;
          if (n.state === 'offered') d.queue = { job, person: Object.assign({}, n.person, { job }), profile: n.start.profile };
          else if (d.queue && d.queue.job === job) d.queue = null;
          M().save();
          g.skip();
        }
        return;
      }
      // the next career customer waits for the next chair (the reveal screen shows him)
      if (n.state === 'offered') { n.job = s.jobId + 1; d.queue = { job: s.jobId + 1, person: Object.assign({}, n.person, { job: s.jobId + 1 }), profile: n.start.profile }; M().save(); }
    });
  }
  // the finished chair as it was at the reveal (the engine's state moves on to the next customer)
  const keep = (s) => { const out = Object.assign({}, s); for (const k of ['hair', 'startHair', 'beard', 'startBeard', 'brow']) if (s[k] && s[k].slice) out[k] = s[k].slice(); return out; };
  // write an owed completion again (commit, person, start); dropped once its contract is no longer the active one
  function retryOwed() {
    const o = run.owed, a = act();
    if (!o || run.completing) return;
    if (!a || a.id !== o.id || a.state === 'completed') { run.owed = null; return; }
    a.job = o.s.jobId; a.seated = o.s.jobId;
    done(o.s, o.stars, o);
    if (run.completing !== a.id) run.owed = null; // refused before writing: never left blocking his chair
  }
  // the app closed at a reveal before its Career result was written: when the career is ready again and the game is
  // back at that reveal, the completion is made now (idempotent: the contract id keys the pay and the progress)
  function replay() {
    const a = act(), g = G(), s = g && g.getState(), d = M() && M().data, lr = d && d.lastRound;
    if (!a || !s || !lr || s.status !== 'reveal' || lr.key !== a.id || lr.job !== s.jobId || run.completing === a.id || a.doneJob === s.jobId) return;
    if (!s.look || !s.look.person || !a.person || s.look.person.seed !== a.person.seed) return;
    a.job = s.jobId; a.seated = s.jobId;
    done(s, lr.stars);
  }
  // a damaged active contract (bad grids, a person that no longer validates, or not this career position) is
  // replaced by a fresh contract for the same slot; earlier progress is untouched (save contract section 7)
  function activeOk(body) {
    const a = body.active;
    if (!a) return true;
    if (a.state === 'completed') return false;
    const pos = C().position(body.core);
    if (!pos || a.id !== C().contractId(body.core)) return false;
    if (!a.person || (HSC.validPerson && !HSC.validPerson(a.person))) return false;
    if (!unpack(a.start && a.start.h, 5)) return false;
    if (a.request && a.request.t && !unpack(a.request.t, 5)) return false;
    if (a.work && !unpack(a.work.h, 5)) return false;
    return true;
  }
  // what Career needs from the player before it can seat a contract: 'found' (the founding city), 'map' (the next
  // city, after a chapter or the licence) or null
  function needsChoice() {
    const b = run.body;
    if (!b) return null;
    if (C().needsFounding(b.core)) return 'found';
    if (C().phase(b.core) === 'map' && !b.active) return 'map';
    return null;
  }
  const inProgress = (a) => !!(a && a.state !== 'offered' && a.state !== 'incomplete');
  // the founding city: the placeholder becomes the chosen city in the career, its regulars and its milestone keys;
  // an offered contract is drawn again in the chosen city, work in progress keeps its customer
  async function found(cityId) {
    let ok = false;
    if (!run.body || !C().needsFounding(run.body.core)) return false;
    const landed = await commit((b) => {
      const r = C().found(b.core, cityId);
      if (r.error) return b;
      const body = b, U = C().UNSET;
      body.core = r.state; ok = true;
      if (body.regs[U]) { body.regs[cityId] = (body.regs[cityId] || []).concat(body.regs[U]).slice(-6); delete body.regs[U]; }
      if (body.pop[U]) delete body.pop[U];
      // milestones already paid for the placeholder stay paid for the chosen city
      if (body.eco) {
        const ren = (k) => k.split(':').map((p) => (p === U ? cityId : p)).join(':');
        for (const k of body.eco.keys.slice()) if (k.split(':').includes(U) && !body.eco.keys.includes(ren(k))) body.eco.keys.push(ren(k));
        if (Array.isArray(body.eco.milestones)) body.eco.milestones = body.eco.milestones.map(ren);
      }
      const a = body.active;
      if (!inProgress(a)) {
        body.active = null;
        // Older saves may contain the invisible placeholder offer. No Career work could have been played before
        // founding, so its director history is also phantom and must not influence the first real customer.
        body.dir = D().fresh();
        return fillNextContract(body);
      }
      a.id = a.id.split(':').map((p, i) => (i === 2 && p === U ? cityId : p)).join(':');
      if (a.city === U) a.city = cityId;
      return body;
    });
    return ok && !!landed;
  }
  // the world map's choice: the next chapter's city (refused while a contract is in progress)
  async function chooseCity(id) {
    let ok = false;
    const b0 = run.body;
    if (!b0 || inProgress(b0.active) || C().phase(b0.core) !== 'map' || !C().selectable(b0.core).includes(id)) return false;
    const landed = await commit((b) => {
      const sel = C().selectCity(b.core, id);
      if (sel.error) return b;
      const body = b;
      body.core = sel.state; body.active = null; ok = true;
      return fillNextContract(body);
    });
    return ok && !!landed;
  }

  HSC.careerRun = {
    init, ensure, person, start, request, unscored, done, suspend, chooseCity, found, needsChoice, replay,
    body: () => run.body, ready: () => run.ready, active: act,
    // a career saved by a newer game version: kept untouched; Career asks for an update (save contract section 8)
    tooNew: () => !!run.tooNew,
    rank: () => (run.body ? C().rank(run.body.core, SPECIALIST()) : null),
  };
  // start once the progress save and the game are up
  const boot = () => {
    const client = M() && M().client;
    if (!client || !HSC.careerSave || !HSC.career || !HSC.director || !HSC.careerCatalog || !G()) return HSC.lifecycle.timeout(boot, 300);
    init(client).catch((e) => console.error('career: load failed', e)).then(() => { run.initDone = true; });
  };
  boot();
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): the career's city choice (docs/CAREER-MAP-LOGIC.md).
//
//   card    the Career card says where the career stands, or that a city must be chosen
//   map     appears only when Career needs a city: the founding city, then the next city after the licence and after
//           every chapter (a city already done this tour is a practice visit). No city is ranked or shows income,
//           difficulty or a reward multiplier. The first customer loads at once after a choice.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const K = '#10223f';
  const t = (k) => (HSC.t ? HSC.t(k) : k);
  const I = (n, s) => (HSC.icon ? HSC.icon(n, s) : '');
  const CR = () => (HSC.careerRun && HSC.careerRun.ready() ? HSC.careerRun : null);
  const FLAG = { tokyo: '🇯🇵', seoul: '🇰🇷', jakarta: '🇮🇩', manila: '🇵🇭', mumbai: '🇮🇳', karachi: '🇵🇰', istanbul: '🇹🇷', cairo: '🇪🇬', lagos: '🇳🇬', kingston: '🇯🇲', nairobi: '🇰🇪', london: '🇬🇧', berlin: '🇩🇪', madrid: '🇪🇸', 'mexico-city': '🇲🇽', 'sao-paulo': '🇧🇷', 'new-york': '🇺🇸', auckland: '🇳🇿' };
  const CSS = `
#hsc-menu .map{grid-template-rows:48px minmax(0,1fr)}
/* a row is at least as tall as its city needs (a name on two lines on a narrow phone), so no name is cut */
#hsc-menu .cities{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:minmax(auto,1fr);gap:9px;min-height:0;overflow-y:auto;padding:4px 2px 12px}
#hsc-menu .city{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-height:84px;padding:6px 4px;border-radius:16px}
#hsc-menu .city .fl{font-size:40px;line-height:1.1}
#hsc-menu .city.done{background:linear-gradient(#e6fbdf,#c9f0bd)}
#hsc-menu .city .tk{position:absolute;right:7px;top:5px;color:#2f9e44;font-size:20px}
#hsc-menu .city .hsc-lbl{flex:none;font-size:14px;width:100%;white-space:normal;line-height:1.1}
#hsc-menu .upd{grid-column:1/-1;display:flex;flex-direction:column;align-items:center;gap:14px;padding:28px 18px;border-radius:22px;background:linear-gradient(#fff,#e4f3ff);border:3px solid ${K};color:${K};font-weight:900;font-size:20px;text-align:center}
#hsc-menu .upd p{margin:0;max-width:30ch;line-height:1.3}
`;
  const ui = {
    built: false,
    build() {
      const m = document.getElementById('hsc-menu');
      if (this.built || !m) return !!this.built;
      this.built = true;
      const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
      const page = document.createElement('div');
      page.className = 'page map'; page.hidden = true; page.setAttribute('role', 'dialog'); page.setAttribute('aria-label', 'Map');
      page.innerHTML = `<div class="mhead"><button class="j c-white back" type="button" aria-label="Back">${I('back')}</button><div class="title">${I('map')}<span class="hsc-lbl" data-k="map"></span></div></div><div class="cities hsc-same"></div>`;
      m.appendChild(page);
      page.querySelector('.back').addEventListener('click', () => { if (HSC.fx) HSC.fx.play('back'); HSC.menu.view('home', true); });
      return true;
    },
    render(v) {
      if (!this.build()) return;
      const cr = CR(), m = document.getElementById('hsc-menu');
      if (v === 'map' && HSC.careerRun && HSC.careerRun.tooNew()) { this.update(m.querySelector('.page.map')); return; }
      if (!cr) return;
      const body = cr.body(), need = cr.needsChoice(), pos = body && !need ? HSC.career.position(body.core) : null;
      const sub = m.querySelector('.hero .sub');
      if (sub) sub.textContent = need ? t('choose_city') : pos ? (HSC.cityName ? HSC.cityName(pos.city) : pos.city) + ' · ' + (pos.slot + 1) + '/5' : '';
      if (v === 'map') this.map(m.querySelector('.page.map'), body);
    },
    // a career saved by a newer version: nothing is shown or written, only the way forward
    update(page) {
      page.querySelector('.title').innerHTML = `${I('map')}<span class="hsc-lbl" data-k="career">${t('career')}</span>`;
      page.querySelector('.cities').innerHTML = `<div class="upd" role="status">${I('lock', 72)}<p data-k="update_needed">${t('update_needed')}</p></div>`;
    },
    map(page, body) {
      const C = HSC.career, grid = page.querySelector('.cities'), cr = CR();
      const need = cr ? cr.needsChoice() : null, core = body && body.core, tour = core && core.tour;
      page.querySelector('.title').innerHTML = `${I('map')}<span class="hsc-lbl" data-k="${need === 'found' ? 'pick_city' : 'next_city'}">${t(need === 'found' ? 'pick_city' : 'next_city')}</span>`;
      const name = (id) => (HSC.cityName ? HSC.cityName(id) : id);
      let coll;
      try { coll = new Intl.Collator(HSC.langTag ? HSC.langTag() : 'en'); } catch (e) { coll = new Intl.Collator('en'); }
      const ids = C.enabledIds().sort((a, b) => coll.compare(name(a), name(b)));
      const sel = need === 'map' ? new Set(C.selectable(core)) : null;
      grid.innerHTML = ids.map((id) => {
        const done = !!(tour && tour.done.includes(id));
        const pick = need === 'found' || (need === 'map' && sel.has(id) && !done);
        return `<button class="j city c-white${done ? ' done' : ''}${pick ? ' pick' : ''}" type="button" data-c="${id}"${id === this.pendingCity ? ' disabled aria-busy="true"' : ''}>
          <span class="fl" aria-hidden="true">${FLAG[id] || ''}</span><span class="hsc-lbl"><bdi>${name(id)}</bdi></span>${done ? '<b class="tk">✓</b>' : ''}
        </button>`;
      }).join('');
      grid.querySelectorAll('.city').forEach((b) => b.addEventListener('click', async () => {
        const r = CR(), id = b.dataset.c, want = r && r.needsChoice();
        if (!want) { if (HSC.nope) HSC.nope(b); return; }
        if (this.pendingCity) return;
        this.pendingCity = id;
        b.disabled = true;
        b.setAttribute('aria-busy', 'true');
        const onMap = () => !page.hidden && !!page.closest('#hsc-menu.open');
        try {
          await HSC.whenYouTubeResumed();
          if (!onMap() || r.needsChoice() !== want) return;
          const ok = want === 'found' ? await r.found(id) : await r.chooseCity(id);
          if (!onMap()) return;
          if (!ok) { HSC.nope?.(grid.querySelector('[aria-busy=true]') || b); return; }
          if (HSC.fx) HSC.fx.play('swish');
          if (r.needsChoice()) { this.render('map'); return; }
          if (!(await HSC.menu.play('career', null, true)) && onMap()) HSC.menu.view('home', true);
        } finally {
          this.pendingCity = null;
          b.disabled = false;
          b.removeAttribute('aria-busy');
          for (const current of grid.querySelectorAll('.city[aria-busy=true]')) {
            current.disabled = false;
            current.removeAttribute('aria-busy');
          }
        }
      }));
    },
  };
  HSC.careerUI = { render: (v) => ui.render(v) };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1; owner-approved item T3, 5 November 2026): the play-time gift.
// Gifts open after 10, 20 and 30 minutes of play in a day: 20, 40 and 60 coins (owner decision 6 November 2026; was
// 25 / 50 / 75), and a video doubles a gift.
// Only real play counts: the app in front, a customer in the chair, and a touch within the last minute, so leaving
// the phone untouched earns nothing (AdMob treats unattended screens as invalid traffic).
// The Shop's Free tab (shop.js) shows the time left, or the gift to take.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const AT = HSC.economy.CONFIG.gift.at, PAY = HSC.economy.CONFIG.gift.pay;
  const M = () => HSC.meta, G = () => globalThis.skinFadeStudio;
  let lastTouch = 0, dirty = 0;
  addEventListener('pointerdown', () => { lastTouch = Date.now(); }, true);
  function data() {
    const d = M() && M().data;
    if (!d) return null;
    const day = M().today(); // the game's day (meta.js): a day's gifts come back with the day, so the clock cannot reopen them
    if (!d.gift || d.gift.day !== day) d.gift = { day, sec: 0, got: 0 };
    return d.gift;
  }
  function state() {
    const g = data();
    if (!g) return { ready: false, done: false, left: 0, pay: 0, frac: 0 };
    const done = g.got >= AT.length, from = g.got ? AT[g.got - 1] : 0, to = done ? 0 : AT[g.got];
    return { done, ready: !done && g.sec >= to, left: done ? 0 : Math.max(0, Math.ceil(to - g.sec)), pay: done ? 0 : PAY[g.got], frac: done ? 1 : Math.min(1, (g.sec - from) / (to - from)) };
  }
  // one second of play
  HSC.lifecycle.interval(() => {
    const g = data(), game = G();
    if (!g || !game || HSC.executionPaused || Date.now() - lastTouch > 60000) return;
    const s = game.getState();
    if (s.status !== 'cutting' && s.status !== 'reveal') return;
    if (document.querySelector('#hsc-menu.open')) return;
    g.sec = Math.min(86400, g.sec + 1);
    if (++dirty >= 15) { dirty = 0; M().save(); }
  }, 1000);

  // one claim at a time, and the gift is fixed (its day and number) before the video: a second tap during the video
  // cannot claim the same gift again, nor a later one, and midnight during the video does not change which gift it is.
  // The gift counts as taken only once its coins have landed: a failed coin commit leaves it to take again (same key,
  // so it is paid once), and a doubling video already watched for it is remembered, so the retry pays double with no
  // new video
  let claiming = false;
  async function claim(double) {
    if (claiming) return false;
    const g = data(), st = state();
    if (!g || !st.ready || !HSC.coins) return false;
    const day = g.day, i = g.got;
    let n = st.pay;
    claiming = true;
    try {
      if (g.dbl === i) n *= 2;
      else if (double) {
        const ok = HSC.watchVideo ? await HSC.watchVideo('gift-double') : false;
        if (!ok) return false;
        n *= 2;
        g.dbl = i;
        M().save();
      }
      let r;
      try { r = await HSC.coins.add(n, 'gift', 'gift:' + day + ':' + i); } catch (e) { r = null; } // keyed: a repeated claim pays once
      // the economy's result when it reports one; nothing back is the local purse (credited at once) or a queued credit
      if (r !== undefined && !(r && !r.error)) return false;
      g.got = Math.max(g.got, i + 1);
      if (g.dbl != null && g.dbl < g.got) delete g.dbl;
      M().save();
      return n;
    } finally { claiming = false; }
  }

  HSC.gift = { state, claim };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1; owner decision 6 November 2026): the Collection.
//
// The customers the barber has really worked with, newest first, and nothing else: a customer appears only once he
// has been cut. There are no placeholders and no totals, because a list of what is still to come would make the game
// look scripted. Each entry keeps the before and after, the stars, the mode and the city; someone who comes back
// moves to the top with his visit count. Every mode counts. The latest 24 are kept, in their own save.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const KEY = 'skin-fade-studio-customers-v1', MAX = 24, W = 64, H = 32;
  const K = '#10223f';
  const M = () => HSC.meta;
  const t = (k) => (HSC.t ? HSC.t(k) : k);
  const I = (n, s) => (HSC.icon ? HSC.icon(n, s) : '');
  const BTOP = () => (HSC.BEARD_MM ? HSC.BEARD_MM.length - 1 : 16);
  const MODE_WORD = { career: 'career', requests: 'orders', free: 'quick_play', fix: 'rescue', beard: 'beards', rush: 'rush' };
  const STAR = (on) => `<svg viewBox="0 0 24 24" width="1em" height="1em"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" fill="${on ? '#ffc21a' : 'none'}" stroke="${on ? K : '#9fb0c4'}" stroke-width="2.4" stroke-linejoin="round"/></svg>`;

  // ---- a picture's worth of hair, small: each 128x64 grid as 64x32 cells of 3 bits ----
  function encode(grid, top) {
    if (!Array.isArray(grid) || grid.length !== 8192) return null;
    const bits = new Uint8Array(Math.ceil(W * H * 3 / 8));
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = 2 * y * 128 + 2 * x, m = (grid[i] + grid[i + 1] + grid[i + 128] + grid[i + 129]) / 4;
      const q = Math.max(0, Math.min(7, Math.round(top > 7 ? m * 7 / top : m)));
      const b = (y * W + x) * 3;
      for (let k = 0; k < 3; k++) if (q & (1 << k)) bits[(b + k) >> 3] |= 1 << ((b + k) & 7);
    }
    let bin = '';
    for (const v of bits) bin += String.fromCharCode(v);
    return btoa(bin);
  }
  function decode(str, top) {
    if (typeof str !== 'string') return null;
    let bin;
    try { bin = atob(str); } catch (e) { return null; }
    if (bin.length !== Math.ceil(W * H * 3 / 8)) return null;
    const out = new Array(8192);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const b = (y * W + x) * 3;
      let q = 0;
      for (let k = 0; k < 3; k++) if (bin.charCodeAt((b + k) >> 3) & (1 << ((b + k) & 7))) q |= 1 << k;
      const v = top > 7 ? Math.round(q * top / 7) : q, i = 2 * y * 128 + 2 * x;
      out[i] = out[i + 1] = out[i + 128] = out[i + 129] = v;
    }
    return out;
  }

  // ---- the list ----
  let list = [], client = null;
  const valid = (c) => !!c && typeof c === 'object' && !!HSC.validPerson && HSC.validPerson(c.p) && Number.isSafeInteger(c.job) && typeof c.bh === 'string' && typeof c.ah === 'string' && Number.isSafeInteger(c.n) && c.n >= 1;
  const save = () => { if (client && client.saveProgress) client.saveProgress(KEY, { v: 1, list }).catch(() => {}); };
  // one finished customer: a retry updates his entry, someone coming back moves to the top with one more visit
  function record(s, city) {
    const p = s.look && s.look.person, d = M() && M().data, last = d && d.lastRound;
    if (!p || !(HSC.modes && HSC.modes.worked ? HSC.modes.worked(s) : s.cutStrokeCount > 0) || !last || last.job !== s.jobId) return;
    const old = list.find((c) => c.p.seed === p.seed), again = !!(old && old.job === s.jobId);
    const req = HSC.requestFor ? HSC.requestFor(s) : null, top = BTOP();
    const rec = { job: s.jobId, p, n: old ? old.n + (again ? 0 : 1) : 1, stars: last.free || last.judged ? 0 : last.stars | 0, mode: HSC.modes ? HSC.modes.current() : 'requests',
      city: city || null, style: req && req.style ? req.style.id : null, bh: encode(s.startHair, 5), ah: encode(s.hair, 5), bb: encode(s.startBeard, top), ab: encode(s.beard, top) };
    if (!rec.bh || !rec.ah) return;
    list = [rec].concat(list.filter((c) => c !== old)).slice(0, MAX);
    save();
  }
  const done = HSC.onHaircutDone;
  HSC.onHaircutDone = function (state) {
    // the contract's city, before the career moves on to the next one
    const a = HSC.modes && HSC.modes.current() === 'career' && HSC.careerRun ? HSC.careerRun.active() : null, city = a && a.job === state.jobId ? a.city : null;
    const r = done ? done.apply(this, arguments) : undefined;
    try { record(state, city); } catch (e) { console.error('customers: collection failed', e); }
    return r;
  };

  // ---- the screen ----
  const CSS = `
#hsc-menu .port{grid-template-rows:48px minmax(0,1fr)}
#hsc-menu .port .plist{min-height:0;overflow-y:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));grid-auto-rows:max-content;gap:12px;padding:4px 2px 12px}
#hsc-menu .port .pc{box-sizing:border-box;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:6px;padding:6px;border-radius:20px;border:3px solid ${K};background:linear-gradient(#fff,#e4f3ff);color:${K};font-weight:900}
#hsc-menu .port .pc img{width:100%;aspect-ratio:1;border-radius:14px;background:radial-gradient(circle at 50% 35%,#fff,#e4d2b4)}
#hsc-menu .port .pc .to .hsc-ic{width:18px;height:18px}
#hsc-menu .port .pc .facts{grid-column:1/-1;display:flex;align-items:center;gap:5px;font-size:13px;min-width:0;min-height:26px}
#hsc-menu .port .pc .facts .hsc-ic{width:26px;height:26px}
#hsc-menu .port .pc .st{display:flex;font-size:18px}
#hsc-menu .port .pc .at{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#hsc-menu .port .pc .n{margin-inline-start:auto;display:flex;align-items:center;gap:3px}
#hsc-menu .port .none{grid-column:1/-1;align-self:center;margin:calc(18vh / var(--hsc-s,1)) auto 0;padding:18px 24px;border-radius:22px;border:3px solid ${K};background:linear-gradient(#fff,#e4f3ff);color:${K};font-weight:900;font-size:20px;text-align:center}
`;
  const ui = {
    built: false,
    build() {
      const m = document.getElementById('hsc-menu');
      if (this.built || !m) return !!this.built;
      this.built = true;
      const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
      const pg = document.createElement('div');
      pg.className = 'page port'; pg.hidden = true; pg.setAttribute('role', 'dialog');
      pg.innerHTML = `<div class="mhead"><button class="j c-white back" type="button" aria-label="Back">${I('back')}</button><div class="title">${I('styles')}<span class="hsc-lbl" data-k="collection"></span></div></div><div class="plist"></div>`;
      m.appendChild(pg);
      pg.querySelector('.back').addEventListener('click', () => { if (HSC.fx) HSC.fx.play('back'); HSC.menu.view('home', true); });
      return true;
    },
    render() {
      if (!this.build()) return;
      const pg = document.querySelector('#hsc-menu .page.port'), box = pg.querySelector('.plist');
      pg.setAttribute('aria-label', t('collection'));
      if (!list.length) { box.innerHTML = `<div class="none">${t('no_customers')}</div>`; return; }
      box.innerHTML = list.map((c, i) => `<div class="pc" data-i="${i}"><img alt="" data-s="b"><span class="to">${I('play')}</span><img alt="" data-s="a">
        <div class="facts">${c.stars ? `<span class="st">${[1, 2, 3].map((x) => STAR(x <= c.stars)).join('')}</span>` : ''}<span class="at"><bdi>${c.city && HSC.cityName ? HSC.cityName(c.city) : t(MODE_WORD[c.mode] || 'orders')}</bdi></span>${c.n > 1 ? `<span class="n">${I('regulars')}${HSC.num ? HSC.num(c.n) : c.n}</span>` : ''}</div></div>`).join('');
      const job = ++this.job, todo = [...box.querySelectorAll('img')];
      // Keep portrait generation out of the activation frame and stop on navigation.
      const step = () => {
        if (job !== this.job || !pg.closest('#hsc-menu.open .page:not([hidden])')) return;
        if (todo.length && todo[0].isConnected) {
          const img = todo.shift(), c = list[+img.closest('.pc').dataset.i], b = img.dataset.s === 'b';
          try { const u = HSC.portrait(c.p, decode(b ? c.bh : c.ah, 5), decode(b ? c.bb : c.ab, BTOP()), 120, 160); if (u) img.src = u; } catch (e) { console.error('customers: collection picture failed', e); }
        }
        if (todo.length && todo[0].isConnected) HSC.lifecycle.timeout(step, 30);
      };
      HSC.afterInputPaint().then(() => HSC.lifecycle.timeout(step, 0));
    },
    job: 0,
  };
  async function boot() {
    if (!M() || !M().client || !HSC.validPerson) { HSC.lifecycle.timeout(boot, 300); return; }
    client = M().client;
    const d = client.loadProgress ? await client.loadProgress(KEY, null).catch(() => null) : null;
    list = d && Array.isArray(d.list) ? d.list.filter(valid).slice(0, MAX) : [];
  }
  boot();
  HSC.collection = { open: () => { ui.build(); HSC.menu.view('port'); ui.render(); }, list: () => list, encode, decode };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): a concise text settings list in the menu. Every setting is the
// player's choice; the defaults keep the game exactly as it was. Android policy actions register into this list.
//
//   hand         left-handed layout: the guards and the clipper button move to the left, the tool button to the
//                right (mirrored with CSS; the 3D clipper and its placement under the finger are unchanged)
//   sound        on or off: the game's own switch, kept here so the play screen stays clear
// Saved with the barber's progress (meta.js).
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const INK = '#10223f';
  const M = () => HSC.meta;
  const DEF = { left: false };
  const get = () => Object.assign({}, DEF, (M() && M().data && M().data.settings) || {});
  function set(k, v) {
    const d = M() && M().data;
    if (!d) return;
    d.settings = Object.assign(get(), { [k]: v });
    M().save();
    apply();
  }

  // ---- what each setting does ----
  function apply() {
    const s = get(), b = document.body;
    if (!b) return;
    b.classList.toggle('hsc-left', s.left);
    if (ui.el.panel) ui.render();
  }

  // ---- icons ----
  const CLOSE = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  const GEAR = `<svg viewBox="0 0 24 24" width="40" height="40"><path d="M10.3 2.5h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9-2.6-.5v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8z" fill="#c9cfd6" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="12" r="3.6" fill="#fff6e6" stroke="${INK}" stroke-width="1.6"/></svg>`;
  // on and off differ in shape, not only colour: a tick or a cross in the knob, which also moves
  const TICK = '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#10223f" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const CROSS = '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11" fill="none" stroke="#10223f" stroke-width="3.2" stroke-linecap="round"/></svg>';

  const CSS = `
#hsc-set-btn svg{width:40px;height:40px}
#hsc-set{position:fixed;inset:0;z-index:32;display:none;background:#0d3f86b8;font-family:"DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif;color:${INK};touch-action:manipulation;zoom:var(--hsc-s,1)}
#hsc-set.open{display:flex;align-items:flex-end;justify-content:center}
#hsc-set .sheet{position:relative;width:min(100%,520px);max-height:92%;overflow-y:auto;display:flex;flex-direction:column;gap:10px;background:#fff6e6;border:3px solid ${INK};border-bottom:0;border-radius:26px 26px 0 0;box-shadow:0 -4px 0 ${INK};padding:14px max(14px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(14px,env(safe-area-inset-left))}
@media (orientation:landscape){#hsc-set.open{align-items:center}#hsc-set .sheet{border-radius:26px;border-bottom:3px solid ${INK};box-shadow:0 5px 0 ${INK}}}
#hsc-set .head{display:flex;align-items:center;justify-content:space-between}
#hsc-set .head h2{margin:0 8px;font:900 26px/1.1 "Arial Rounded MT Bold","Nunito",system-ui,sans-serif}
#hsc-set .x{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff6e6;border:3px solid ${INK};box-shadow:0 3px 0 ${INK};cursor:pointer;color:${INK};padding:0}
#hsc-set .row{display:flex;align-items:center;gap:12px;min-height:60px;padding:8px 12px;border-radius:18px;border:3px solid ${INK};background:#fff}
/* the label keeps its words whole; the language list gives way on a narrow phone (it shows the language's name) */
#hsc-set .label{flex:1 0 auto;min-width:0;font:800 16px/1.2 "DM Sans",system-ui,sans-serif}
#hsc-set .hands{display:flex;gap:8px;flex:none}
#hsc-set .hand{min-width:76px;height:48px;border-radius:14px;border:3px solid ${INK};background:#f1e4cc;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0 12px;font:800 15px/1 system-ui,sans-serif;color:${INK}}
#hsc-set .hand[aria-pressed=true]{background:#ffe08a;box-shadow:0 0 0 3px #ffb627}
#hsc-set .slide{flex:0 1 240px;display:flex;align-items:center;gap:8px}
#hsc-set .slide output{min-width:54px;text-align:end;font:800 14px/1 system-ui,sans-serif;font-variant-numeric:tabular-nums}
#hsc-set input[type=range]{flex:1;height:48px;margin:0;background:transparent;-webkit-appearance:none;appearance:none;touch-action:none}
#hsc-set input[type=range]::-webkit-slider-runnable-track{height:12px;border-radius:6px;background:#e9dcc4;border:2.5px solid ${INK}}
#hsc-set input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:40px;height:40px;margin-top:-16px;border-radius:50%;background:#ffb627;border:3px solid ${INK};box-shadow:0 3px 0 ${INK}}
#hsc-set select{flex:0 1 180px;min-width:0;max-width:58%;height:48px;border-radius:14px;border:3px solid ${INK};background:#fff;padding:0 10px;font:800 16px/1 system-ui,sans-serif;color:${INK}}
@keyframes hsc-shake{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
#hsc-set .sw{position:relative;width:88px;height:48px;border-radius:24px;border:3px solid ${INK};background:#e9dcc4;cursor:pointer;padding:0;flex:none}
#hsc-set .sw .k{position:absolute;top:3px;left:3px;width:36px;height:36px;border-radius:50%;background:#fff;border:2.5px solid ${INK};display:flex;align-items:center;justify-content:center;transition:left .15s}
#hsc-set .sw[aria-checked=true]{background:#8fd18f}
#hsc-set .sw[aria-checked=true] .k{left:41px}
#hsc-set .actions{display:flex;flex-direction:column;gap:10px}
#hsc-set .action{width:100%;justify-content:space-between;cursor:pointer;color:${INK};font:800 16px/1.2 "DM Sans",system-ui,sans-serif;text-align:start}
#hsc-set .action[hidden]{display:none}
#hsc-set .action::after{content:"›";font-size:30px;line-height:1}
#hsc-set .action:focus-visible,#hsc-set .hand:focus-visible,#hsc-set .sw:focus-visible{outline:4px solid #3aa2f2;outline-offset:2px}
/* a page of its own, in the home screen's colours */
#hsc-set{background:radial-gradient(120% 90% at 50% 0%,#38d1e8,#1679c9 55%,#0d3f86);font-family:"Arial Rounded MT Bold","Nunito","Baloo 2",system-ui,sans-serif}
#hsc-set.open{align-items:flex-start;justify-content:center}
/* the page is zoomed by the UI scale, and inside a zoom env() is zoomed too: each safe-area inset is divided back by
   the scale, so the rows keep clear of a notch at the side and of the gesture bar below */
#hsc-set .sheet{width:min(100%,600px);height:100%;max-height:none;background:none;border:0;box-shadow:none;border-radius:0;padding:max(12px,calc(env(safe-area-inset-top) / var(--hsc-s,1))) max(12px,calc(env(safe-area-inset-right) / var(--hsc-s,1))) max(14px,calc(env(safe-area-inset-bottom) / var(--hsc-s,1))) max(12px,calc(env(safe-area-inset-left) / var(--hsc-s,1)));gap:12px}
#hsc-set .head{justify-content:flex-start;gap:10px;height:48px;flex:none}
#hsc-set .head h2{margin:0;color:#fff;-webkit-text-stroke:3px ${INK};paint-order:stroke fill;text-shadow:0 3px 0 ${INK}}
#hsc-set .x{border-radius:16px;background:linear-gradient(#fff,#dfe8f2);box-shadow:inset 0 -5px 0 #0002,0 4px 0 ${INK}}
#hsc-set .row{min-height:72px;box-shadow:0 4px 0 ${INK}}
#hsc-set .action{font:900 19px/1.2 "Arial Rounded MT Bold","Nunito",system-ui,sans-serif!important}
#hsc-set .label{font:900 19px/1.2 "Arial Rounded MT Bold","Nunito",system-ui,sans-serif}
/* a phone on its side: the rows in two columns, so every one of them, Privacy and Ad choices included, is in view
   without scrolling (one column needs about 500 px of height) */
@media (orientation:landscape) and (max-height:500px){
  #hsc-set .sheet{width:min(100%,860px);display:grid;grid-template-columns:repeat(2,minmax(0,1fr));align-content:start;gap:8px 10px}
  #hsc-set .head{grid-column:1/-1}
  #hsc-set .actions{display:contents}
  #hsc-set .row{min-height:64px}
}
/* the sound switch lives in Settings */
.ui .audio-toggle{display:none!important}
/* left-handed: the guards and the clipper button on the left, the tool button on the right */
body.hsc-left .ui .guard-arc{right:auto;left:max(12px,env(safe-area-inset-left));transform:scaleX(-1)}
body.hsc-left .ui .guard-arc .rung{scale:-1 1}
body.hsc-left .ui .clip-toggle{right:auto;left:max(12px,env(safe-area-inset-left))}
/* item 33: touch targets of at least 48dp; the guards and the share button (46dp) get a 2dp invisible margin, so
   nothing changes in how they look */
.ui .guard-arc .rung::after,.hsc-native-share::after{content:"";position:absolute;inset:-2px;border-radius:50%}
`;

  const ui = {
    el: {}, built: false,
    build() {
      if (this.built || !document.body) return;
      this.built = true;
      const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
      const p = document.createElement('div'); p.id = 'hsc-set';
      p.innerHTML = `<div class="sheet" role="dialog" aria-label="Settings">
        <div class="head"><button class="x" type="button" aria-label="Back">${HSC.icon ? HSC.icon('back', 26) : CLOSE}</button><h2 data-t="settings">Settings</h2></div>
        <div class="row"><span class="label" data-t="hand">Hand</span><div class="hands">
          <button class="hand" type="button" data-left="1" aria-label="Left"><span data-t="left">Left</span></button>
          <button class="hand" type="button" data-left="0" aria-label="Right"><span data-t="right">Right</span></button></div></div>
        <div class="actions"></div>
      </div>`;
      document.body.appendChild(p);
      this.el.panel = p;
      p.querySelector('.x').addEventListener('click', () => this.close());
      p.addEventListener('click', (e) => { if (e.target === p) this.close(); });
      p.querySelectorAll('.hand').forEach((b) => b.addEventListener('click', () => set('left', b.dataset.left === '1')));
      addEventListener('keydown', (e) => { if (e.key === 'Escape' && p.classList.contains('open')) this.close(); });
      HSC.lifecycle.interval(() => this.tick(), 120);
      apply();
    },
    actions: new Map(),
    addAction(action) {
      if (!action || !action.id || typeof action.run !== 'function' || this.actions.has(action.id)) return false;
      this.actions.set(action.id, Object.assign({}, action));
      if (this.el.panel) this.renderActions();
      return true;
    },
    renderActions() {
      const box = this.el.panel && this.el.panel.querySelector('.actions');
      if (!box) return;
      for (const action of this.actions.values()) {
        let b = box.querySelector(`[data-action="${action.id}"]`);
        if (!b) {
          b = document.createElement('button'); b.type = 'button'; b.dataset.action = action.id;
          b.className = 'row action' + (action.className ? ' ' + action.className : '');
          b.addEventListener('click', () => action.run()); box.appendChild(b);
        }
        const label = HSC.t ? HSC.t(action.label) : action.fallback || action.label;
        b.textContent = label; b.setAttribute('aria-label', label);
        b.hidden = typeof action.visible === 'function' ? !action.visible() : false;
      }
    },
    labels() {
      const p = this.el.panel;
      if (!p) return;
      p.setAttribute('dir', HSC.rtl && HSC.rtl() ? 'rtl' : 'ltr');
      p.querySelectorAll('[data-t]').forEach((el) => { el.textContent = HSC.t ? HSC.t(el.dataset.t) : el.dataset.t; });
      for (const [sel, key] of [['[data-left="1"]', 'left'], ['[data-left="0"]', 'right']]) {
        const el = p.querySelector(sel); if (el) el.setAttribute('aria-label', HSC.t ? HSC.t(key) : key);
      }
      this.renderActions();
    },
    render() {
      const s = get(), p = this.el.panel;
      p.querySelectorAll('.hand').forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.left === '1') === s.left)));
      this.labels();
    },
    open() {
      this.build();
      this.render();
      this.el.panel.classList.add('open');
    },
    close() { this.el.panel.classList.remove('open'); },
    tick() {
      // the settings button goes in the HUD row; the menu (menu.js) takes it in as a tile
      const row = document.querySelector('#hsc-hud .hsc-row');
      if (row && !document.getElementById('hsc-set-btn')) {
        const b = document.createElement('button');
        b.className = 'hsc-btn'; b.id = 'hsc-set-btn'; b.type = 'button'; b.setAttribute('aria-label', 'Settings');
        b.innerHTML = GEAR + '<span class="hsc-dot" hidden></span>';
        b.addEventListener('click', () => this.open());
        row.appendChild(b);
      }
    },
  };
  addEventListener('hsc-language', () => { if (ui.el.panel) { ui.labels(); ui.render(); } });
  const boot = () => { if (globalThis.skinFadeStudio && document.querySelector('#hsc-hud .hsc-row') && HSC.meta && HSC.meta.data) ui.build(); else HSC.lifecycle.timeout(boot, 300); };
  boot();
  HSC.settings = { get, set, prepare: () => ui.build(), open: () => ui.open(), addAction: (action) => ui.addAction(action), refresh: () => ui.renderActions() };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1; owner-chosen layout (option 2) and theme (Jelly Gold), 5 November 2026):
// the home screen.
// The cutting screen keeps only the cutting itself. Home is the owner-chosen Bottom Dock (docs/UI-OPTIONS.md):
//
//   picture  the player's current barbershop, whole and unzoomed, with no customer (salon.js homePicture)
//   top row  the level badge and its progress on the left, the coins on the right
//   play     Quick Play first and Career second (docs/MAIN-MENU-AND-MODE-ROUTING-CONTRACT.md, owner-locked), in thumb reach
//   dock     Modes, Shop, Collection, Settings. Shop (shop.js) is one screen of five tabs; Collection is the customers
//            the barber has really worked with.
// The features' own buttons wait out of sight in .hold, so each panel opens exactly as before.
// Every launch starts here. An unfinished customer remains behind Home and can be resumed by closing it.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const K = '#10223f';
  const t = (k) => (HSC.t ? HSC.t(k) : k);
  const I = (n, s) => (HSC.icon ? HSC.icon(n, s) : '');
  let launchRequested = false, launchOpened = false, launchSettled = false;
  let launchPicture = '', launchPictureReady = false, launchPaintQueued = false;
  let launchFallback = false, launchFallbackTimer = 0;
  let homeBackdrop = '';
  const LAUNCH_FALLBACK = 'assets/home-fallback.jpg';
  const LAUNCH_FALLBACK_MS = Number.isFinite(HSC.__testHomeFallbackMs) ? Math.max(0, HSC.__testHomeFallbackMs) : 12000;
  const launchWaiters = [];
  // Give the browser a chance to composite the shop-and-spinner buffer before or after a customer transition. The
  // timeout keeps a backgrounded WebView (where requestAnimationFrame may stop) from blocking the mode switch.
  const painted = () => new Promise((resolve) => {
    let done = false;
    const finish = () => { if (done) return; done = true; HSC.lifecycle.clear(timer); resolve(); };
    const timer = HSC.lifecycle.timeout(finish, 120);
    requestAnimationFrame(() => requestAnimationFrame(finish));
  });
  // each feature's own button and where it goes on the home screen
  const PLACE = [['#hsc-set-btn', '.hold'], ['.hsc-rw', '.hold'], ['#hsc-salon-btn', '.hold']];
  // the panels that open over the home screen, and every layer that covers the chair
  const PANELS = '#hsc-salon.open,#hsc-set.open,#hsc-panel.open';
  const COVERS = '#hsc-menu.open,#hsc-reveal.on,' + PANELS;
  // The game reads its keys (guard, turn, clipper, finish, next) on the window and only stops for its own pause. While a
  // screen covers the chair, or a form control (the language list, the shop name) has focus, no key reaches it: the
  // haircut behind the home screen never changes. Stopped on the document, so the screens' own controls still get
  // every key first (Tab, typing, a list's arrows, Enter or Space on a button); Escape stays with the screens' back.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') return;
    const el = e.target, form = el && el.closest && el.closest('input,select,textarea,[contenteditable]:not([contenteditable=false])');
    if (form || document.querySelector(COVERS)) e.stopPropagation();
  });
  const MODE_ICON = { requests: 'orders', free: 'freestyle', fix: 'rescue', beard: 'beards', rush: 'rush' };
  const MODE_WORD = Object.assign({}, MODE_ICON, { free: 'quick_play' });
  const MODE_LINE = { requests: 'm_requests', fix: 'm_fix', beard: 'm_beard', rush: 'm_rush' };
  const MODE_COLOUR = { requests: 'green', free: 'yellow', fix: 'red', beard: 'orange', rush: 'purple' };
  const STAR = (on) => `<svg viewBox="0 0 24 24" width="1em" height="1em"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" fill="${on ? '#ffc21a' : 'none'}" stroke="${on ? K : '#fff'}" stroke-width="2.4" stroke-linejoin="round"${on ? '' : ' stroke-dasharray="2.6 2.2"'}/></svg>`;
  // what each mode pays, shown on its card: numbers and icons only
  // Truthful minimums from economy.js. A trailing + means skill or time can add more.
  const REWARD = { requests: () => I('coin') + '24+', fix: () => I('coin') + '30', beard: () => I('coin') + '28', rush: () => I('coin') + '11+' };
  const CSS = `
#hsc-menu-btn{padding:0}
/* this layer is zoomed by the UI scale, and inside a zoom env(), vw and vh are zoomed too: each is divided back by
   the scale so an inset or a share of the screen stays its true size on every screen. --sl/--sr/--st/--sb are the
   page's side, top and bottom margins: 12 px (14 at the bottom) or the device's safe-area inset, whichever is larger */
#hsc-menu{--sl:max(12px,calc(env(safe-area-inset-left) / var(--hsc-s,1)));--sr:max(12px,calc(env(safe-area-inset-right) / var(--hsc-s,1)));--st:max(12px,calc(env(safe-area-inset-top) / var(--hsc-s,1)));--ib:calc(env(safe-area-inset-bottom) / var(--hsc-s,1));--sb:max(14px,var(--ib));--vw:calc(1vw / var(--hsc-s,1));--vh:calc(1vh / var(--hsc-s,1))}
#hsc-menu{position:fixed;inset:0;z-index:29;zoom:var(--hsc-s,1);display:none;pointer-events:auto;touch-action:manipulation;font-family:"Arial Rounded MT Bold","Nunito","Baloo 2",system-ui,-apple-system,"Segoe UI",sans-serif;color:${K};-webkit-user-select:none;user-select:none;overflow:hidden;background:radial-gradient(120% 90% at 50% 0%,#38d1e8,#1679c9 55%,#0d3f86)}
#hsc-menu::before{content:"";position:absolute;inset:-50%;background:repeating-linear-gradient(-35deg,#ffffff12 0 22px,#0000 22px 60px);animation:hsc-pole 14s linear infinite;pointer-events:none}
#hsc-menu::after{content:"";position:absolute;inset:0;background:radial-gradient(60% 40% at 50% 112%,#ffd76a66,#0000);pointer-events:none}
@keyframes hsc-pole{to{transform:translateX(60px)}}
#hsc-menu.open{display:block}
#hsc-menu .hold{display:none}
#hsc-menu .mode-loading{position:absolute;inset:0;z-index:8;display:none;align-items:flex-end;justify-content:center;box-sizing:border-box;padding:0 20px max(30px,env(safe-area-inset-bottom));background:linear-gradient(#10223f0a,#10223f38);pointer-events:auto}
#hsc-menu .mode-loading i{display:block;width:48px;height:48px;box-sizing:border-box;border:6px solid #ffffff80;border-top-color:#fff;border-radius:50%;filter:drop-shadow(0 3px 3px #10223f88);animation:hsc-mode-loading .72s linear infinite}
#hsc-menu.launching .mode-loading{display:flex}
#hsc-menu.launching .page{visibility:hidden;pointer-events:none}
@keyframes hsc-mode-loading{to{transform:rotate(1turn)}}
#hsc-menu .page{position:relative;z-index:1;box-sizing:border-box;height:100%;max-width:600px;margin:0 auto;display:grid;gap:12px;padding:var(--st) var(--sr) var(--sb) var(--sl)}
#hsc-menu .page[hidden]{display:none}
/* the game's own sheet also uses .top and .home: pin this grid so nothing outside places its parts */
#hsc-menu .page{grid-template-areas:none;grid-template-columns:minmax(0,1fr);grid-auto-flow:row}
#hsc-menu .page > *{grid-area:auto;margin:0}
#hsc-menu .page.in{animation:hsc-pagein .14s cubic-bezier(.2,1.3,.4,1)}
#hsc-menu .page.back-in{animation:hsc-pageback .14s cubic-bezier(.2,1.3,.4,1)}
@keyframes hsc-pagein{from{transform:translateX(16%) scale(.96);opacity:0}}
@keyframes hsc-pageback{from{transform:translateX(-16%) scale(.96);opacity:0}}
#hsc-menu .home{grid-template-rows:48px minmax(0,1fr) auto auto}
#hsc-menu .modes{grid-template-rows:48px minmax(0,1fr)}
/* ---- jelly: the shared button ---- */
#hsc-menu .j{position:relative;box-sizing:border-box;border:3px solid ${K};border-radius:22px;box-shadow:inset 0 -7px 0 #0003,inset 0 3px 0 #fff6,0 6px 0 ${K},0 10px 14px #0005;cursor:pointer;color:${K};font:inherit;padding:0;transition:transform .32s cubic-bezier(.3,1.8,.5,1),box-shadow .2s}
#hsc-menu .j::before{content:"";position:absolute;left:10%;right:10%;top:5%;height:24%;border-radius:999px;background:linear-gradient(#ffffffc8,#fff0);pointer-events:none}
#hsc-menu .j:active{transform:translateY(5px) scale(1.03,.95);box-shadow:inset 0 -4px 0 #0003,inset 0 3px 0 #fff6,0 1px 0 ${K},0 4px 6px #0005;transition:transform .06s,box-shadow .06s}
#hsc-menu .j:focus-visible{outline:4px solid #4fc3ff;outline-offset:3px}
@media (hover:hover){#hsc-menu .j:hover{filter:brightness(1.06) saturate(1.05)}}
#hsc-menu .c-green{background:linear-gradient(#9cf06c,#36b83a)}#hsc-menu .c-yellow{background:linear-gradient(#ffe682,#ffb21a)}#hsc-menu .c-pink{background:linear-gradient(#ffb8d4,#ff5c98)}#hsc-menu .c-blue{background:linear-gradient(#a8e4ff,#3aa2f2)}#hsc-menu .c-orange{background:linear-gradient(#ffc98a,#ff7d2e)}#hsc-menu .c-mint{background:linear-gradient(#b6f5d8,#2fc68f)}#hsc-menu .c-white{background:linear-gradient(#fff,#dfe8f2)}#hsc-menu .c-purple{background:linear-gradient(#e4b8ff,#9c4ef0)}#hsc-menu .c-red{background:linear-gradient(#ffa59b,#f04436)}
#hsc-menu .hsc-ic{display:block;flex:none}
#hsc-menu .hsc-lbl{display:block;max-width:100%;white-space:nowrap;overflow:hidden;text-align:center;font-weight:900;line-height:1.2}
#hsc-menu .hsc-dot{position:absolute;right:-7px;top:-7px;width:22px;height:22px;z-index:2}
/* ---- top row: everything 48 tall on one centre line ---- */
#hsc-menu .top{display:flex;align-items:center;gap:8px;min-width:0;height:48px}
#hsc-menu .chip{box-sizing:border-box;display:flex;align-items:center;gap:6px;height:44px;flex:none;padding:0 14px 0 6px;border-radius:22px;background:#10223fcc;border:2px solid #ffffff30;color:#fff;font-weight:900;font-size:18px;line-height:1;font-variant-numeric:tabular-nums;white-space:nowrap;unicode-bidi:isolate}
#hsc-menu .chip .hsc-ic{width:32px;height:32px}
#hsc-menu .lvl{box-sizing:border-box;display:flex;align-items:center;gap:8px;height:48px;padding-inline-end:14px;border-radius:24px;background:#10223fcc;border:2px solid #ffffff30;flex:0 1 auto;min-width:0}
#hsc-menu .lvl .lv{width:48px;height:48px;margin:-2px;flex:none}
#hsc-menu .lvl .lv .hsc-ic{width:100%;height:100%}
#hsc-menu .xp{width:clamp(32px,calc(12 * var(--vw)),90px);height:12px;border-radius:6px;background:#ffffff35;overflow:hidden}
#hsc-menu .xp i{display:block;height:100%;background:linear-gradient(#b5ff7a,#46c43a);border-radius:6px;transition:width .6s}
#hsc-menu .coins{margin-inline-start:auto}
/* ---- Home: the shop on show, the play cards in thumb reach, the dock ---- */
#hsc-menu.athome{background:#2a2622 center/cover no-repeat}
#hsc-menu.athome::before,#hsc-menu.athome::after{display:none}
#hsc-menu .home{max-width:none}
#hsc-menu .home .top{position:relative}
#hsc-menu .grow{min-height:0}
#hsc-menu .duo{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:12px;width:100%;max-width:640px;margin:0 auto;height:clamp(92px,calc(14 * var(--vh)),132px)}
#hsc-menu .qp,#hsc-menu .hero{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-width:0;border:0;border-radius:20px;color:#fff;box-shadow:inset 0 2px 0 #fff5,0 6px 0 var(--edge),0 10px 16px #0005}
#hsc-menu .j.qp::before,#hsc-menu .j.hero::before{display:none}
#hsc-menu .qp{--edge:#c9921a;background:linear-gradient(#ffd55c,#ffb820);color:${K}}
#hsc-menu .hero{--edge:#2f8f3c;background:linear-gradient(#5fd06a,#37ae48)}
#hsc-menu .j.qp:active,#hsc-menu .j.hero:active{box-shadow:inset 0 2px 0 #fff5,0 1px 0 var(--edge)}
#hsc-menu .qp .hsc-lbl{font-size:clamp(19px,calc(5.4 * var(--vw)),26px);white-space:normal;line-height:1.05;text-wrap:balance;padding:0 8px}
#hsc-menu .hero .hsc-lbl{font-size:clamp(23px,calc(6.6 * var(--vw)),32px)}
/* the Career line (a city, or 'Choose your city') takes a second line in a long language (Tamil) instead of an ellipsis */
#hsc-menu .hero .sub{font-size:14px;font-weight:800;opacity:.95;max-width:92%;white-space:normal;text-wrap:balance;line-height:1.1;overflow:hidden}
#hsc-menu .hero .sub:empty{display:none}
/* the dock runs edge to edge under the page's own margins (the safe-area insets included), and its buttons stay
   inside them: clear of a notch at the sides and 8 px above the gesture bar. Its four columns are equal unless a
   label needs more (German's 'Einstellungen'): that column takes its word's width and the others share the rest;
   only if the four words together are too wide do they step down (to 12 px, dockFit()) and then wrap */
#hsc-menu .dock{display:grid;grid-template-columns:repeat(4,1fr);width:calc(100% + var(--sl) + var(--sr));margin:6px calc(-1 * var(--sr)) calc(-1 * var(--sb)) calc(-1 * var(--sl));padding:6px var(--sr) calc(8px + var(--ib)) var(--sl);box-sizing:border-box;background:#fff;box-shadow:0 -3px 0 #d5dde8}
#hsc-menu .dock button{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;height:62px;background:none;border:0;padding:0;font:inherit;color:${K};cursor:pointer;border-radius:14px}
#hsc-menu .dock button:active{background:#eef3fa}
#hsc-menu .dock button:focus-visible{outline:4px solid #4fc3ff}
#hsc-menu .dock .hsc-ic{width:32px;height:32px}
#hsc-menu .dock .hsc-lbl{font-size:14px;width:100%}
#hsc-menu .dock.wrap .hsc-lbl{white-space:normal;line-height:1.05;overflow-wrap:anywhere}
#hsc-menu .dock .hsc-dot{right:calc(50% - 26px);top:2px;width:14px;height:14px}
/* ---- the modes screen ---- */
#hsc-menu .mhead{display:flex;align-items:center;gap:10px;height:48px}
/* the back button keeps its 48 px beside a long title (Croatian 'Načini igre'): the title shrinks instead */
#hsc-menu .back{flex:none;width:48px;height:48px;border-radius:16px;display:flex;align-items:center;justify-content:center}
#hsc-menu .back .hsc-ic{width:28px;height:28px}
/* right to left (Arabic, Hebrew, Persian, Urdu): Back points right, and a reward reads as written ('24+', '+5') */
#hsc-menu[dir=rtl] .back .hsc-ic{transform:scaleX(-1)}
#hsc-menu .mode .reward{direction:ltr;unicode-bidi:isolate}
#hsc-menu .title{display:flex;align-items:center;gap:8px;min-width:0;color:#fff;font-weight:900;font-size:clamp(22px,calc(6 * var(--vw)),34px);-webkit-text-stroke:3px ${K};paint-order:stroke fill;text-shadow:0 3px 0 ${K}}
#hsc-menu .title .hsc-ic{width:44px;height:44px}
#hsc-menu .title .hsc-lbl{overflow:visible;min-width:0}
#hsc-menu .mhead .coins{margin-inline-start:auto}
#hsc-menu .mgrid{display:grid;grid-template-columns:minmax(0,1fr);grid-auto-rows:minmax(0,1fr);gap:12px;min-height:0;padding:4px 2px 10px}
#hsc-menu .mode{display:flex;align-items:center;gap:12px;padding:8px 14px;overflow:hidden;text-align:start;border-radius:22px}
#hsc-menu .mode .ico{flex:none;width:84px;height:84px;max-height:100%;border-radius:20px;background:#ffffff66;display:flex;align-items:center;justify-content:center}
#hsc-menu .mode .ico .hsc-ic{width:58px;height:58px}
#hsc-menu .mode .tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
#hsc-menu .mode .hsc-lbl{font-size:clamp(20px,calc(7 * var(--vw)),28px);text-align:start}
#hsc-menu .mode .ln{font-size:15px;font-weight:800;line-height:1.15;overflow-wrap:break-word;hyphens:auto}
#hsc-menu .mode .reward{flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:62px;padding:6px 8px;border-radius:16px;background:${K};color:#ffe682;font-weight:900;font-size:17px;font-variant-numeric:tabular-nums}
#hsc-menu .mode .reward .hsc-ic{width:24px;height:24px}
#hsc-menu .mode .reward em{font-style:normal;font-size:13px;color:#9cf06c}
#hsc-menu .mode .lock{position:absolute;left:0;right:0;bottom:0;z-index:2;display:flex;align-items:center;gap:8px;height:34px;box-sizing:border-box;padding:0 12px;border-radius:0 0 inherit inherit;background:#10223fd9;color:#fff;font-weight:900;font-size:15px;font-variant-numeric:tabular-nums}
#hsc-menu .mode .lock .hsc-ic{width:22px;height:22px;flex:none}
#hsc-menu .mode .lock .lb{flex:1;height:10px;border-radius:5px;background:#ffffff40;overflow:hidden}
#hsc-menu .mode .lock .lb i{display:block;height:100%;background:linear-gradient(#b5ff7a,#46c43a)}
#hsc-menu .mgrid > *{animation:hsc-popin .16s cubic-bezier(.2,1.5,.4,1) both}
#hsc-menu .mgrid > *:nth-child(2){animation-delay:.01s}#hsc-menu .mgrid > *:nth-child(3){animation-delay:.02s}#hsc-menu .mgrid > *:nth-child(4){animation-delay:.03s}
/* wide screens (phones on their side, tablets on their side, PC): the play card on the left, the blocks on the right */
@media (orientation:landscape){
  #hsc-menu .page{max-width:1280px}
  /* Home is the shop on show: it fills any screen, so the dock spans the whole width on wide and ultra-wide ones */
  #hsc-menu .page.home{max-width:none}
  /* a wide screen keeps the shop in view: slim cards and a one-line dock */
  #hsc-menu .duo{height:clamp(68px,calc(17 * var(--vh)),108px);max-width:560px}
  #hsc-menu .dock button{flex-direction:row;gap:8px;height:44px}
  #hsc-menu .dock .hsc-lbl{width:auto}
  #hsc-menu .dock .hsc-ic{width:28px;height:28px}
  #hsc-menu .mgrid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (prefers-reduced-motion:reduce){#hsc-menu::before,#hsc-menu .page,#hsc-menu .mgrid > *,#hsc-menu .mode-loading i{animation:none!important}}
body.hsc-reveal #hsc-menu-btn{visibility:hidden}
/* ---- every panel in the same family: navy ink, a jelly-blue backdrop, white-to-blue sheets, the rounded type ---- */
#hsc-salon,#hsc-set,#hsc-panel{font-family:"Arial Rounded MT Bold","Nunito","Baloo 2",system-ui,-apple-system,"Segoe UI",sans-serif!important}
#hsc-panel{background:#0d3f86b8!important;color:${K}!important}
#hsc-salon .sheet,#hsc-panel .hsc-sheet{background:linear-gradient(#ffffff,#e4f3ff)!important;border-color:${K}!important}
#hsc-salon .x,#hsc-panel .hsc-x{background:linear-gradient(#fff,#dfe8f2)!important;border-color:${K}!important;box-shadow:inset 0 -4px 0 #0002,inset 0 2px 0 #fff9,0 3px 0 ${K}!important;color:${K}!important}
/* ---- the cutting screen, in the same jelly style (looks only: every control keeps its size and place) ---- */
#hsc-hud .hsc-btn,#hsc-undo,.ui .audio-toggle{background:linear-gradient(#fff,#dfe8f2)!important;border:3px solid ${K}!important;box-shadow:inset 0 -5px 0 #0002,inset 0 2px 0 #fff9,0 4px 0 ${K},0 6px 8px #0004!important;color:${K}}
#hsc-menu-btn{background:linear-gradient(#ffe682,#ffb21a)!important}
#hsc-undo{background:linear-gradient(#ffa59b,#f04436)!important;color:#fff}
.ui .guard-arc .rung{background:linear-gradient(#fff,#dfe8f2)!important;border:3px solid ${K}!important;box-shadow:inset 0 -4px 0 #0002,inset 0 2px 0 #fff9,0 3px 0 ${K},0 5px 6px #0004!important;color:${K}}
.ui .guard-arc .rung[aria-checked=true]{background:linear-gradient(#ffe682,#ffb21a)!important;box-shadow:inset 0 -5px 0 #0002,inset 0 2px 0 #fff9,0 4px 0 ${K},0 6px 8px #0004!important}
.ui .clip-toggle{background:linear-gradient(#fff,#dfe8f2)!important;border:3px solid ${K}!important;box-shadow:inset 0 -7px 0 #0002,inset 0 3px 0 #fff9,0 6px 0 ${K},0 9px 12px #0005!important;color:${K}}
.ui .clip-toggle.on{background:linear-gradient(#a8e4ff,#3aa2f2)!important}
#hsc-hud .hsc-pill{background:#10223fcc!important;border:2px solid #ffffff30!important;box-shadow:0 3px 8px #0004!important;color:#fff}
#hsc-hud .hsc-pill .hsc-combo{color:${K}}
.ui .seal .seal-shape{filter:drop-shadow(0 5px 0 ${K}) drop-shadow(0 8px 6px #0004)}
.ui .seal .seal-shape polygon{stroke:${K}}
/* one icon set in the chair too: the frozen game's own glyphs are hidden and the set's drawn in their place */
.ui .audio-toggle>svg{opacity:0}
.ui .audio-toggle[aria-pressed=true]{background:${HSC.iconCss ? HSC.iconCss('sound') : 'none'} center/66% no-repeat,linear-gradient(#fff,#dfe8f2)!important}
.ui .audio-toggle[aria-pressed=false]{background:${HSC.iconCss ? HSC.iconCss('mute') : 'none'} center/66% no-repeat,linear-gradient(#fff,#dfe8f2)!important}
.ui .ctl.finish.seal>svg{opacity:0}
.ui .ctl.finish.seal,.ui[data-status=cutting] .ctl.finish.seal{border-radius:50%;border:3px solid ${K}!important;box-shadow:inset 0 -5px 0 #0002,inset 0 2px 0 #fff9,0 4px 0 ${K},0 6px 8px #0004!important;background:url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 12.5l4.6 4.6L19 7.5" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>')}") center/62% no-repeat,linear-gradient(#5fd06a,#2f9e44)!important}
#hsc-hud .hsc-btn:active,#hsc-undo:active,.ui .audio-toggle:active,.ui .guard-arc .rung:active,.ui .clip-toggle:active{box-shadow:inset 0 -3px 0 #0002,inset 0 2px 0 #fff9,0 1px 0 ${K}!important}
/* the order bubble and the result, in the same style: the frozen game's cream and brown stop at the cutting screen */
#hsc-req,#hsc-score .tip,.hsc-toast{background:linear-gradient(#fff,#e4f3ff)!important;border-color:${K}!important;box-shadow:inset 0 -4px 0 #0001,inset 0 2px 0 #fff9,0 4px 0 ${K},0 6px 8px #0004!important}
#hsc-req,#hsc-score,#hsc-rush,.hsc-toast,#hsc-hub{font-family:"Arial Rounded MT Bold","Nunito","Baloo 2",system-ui,-apple-system,"Segoe UI",sans-serif!important}
#hsc-req::after,#hsc-req::before{background:linear-gradient(#fff,#e4f3ff)!important}
#hsc-req img{background:radial-gradient(circle at 50% 35%,#fff,#bcd3e8)!important}
.ui .training-continue,.ui .continue{background:linear-gradient(#ffe682,#ffb21a)!important;border:3px solid ${K}!important;box-shadow:inset 0 -7px 0 #0002,inset 0 3px 0 #fff9,0 5px 0 ${K},0 8px 10px #0005!important;color:${K}!important}
.ui .training-continue:not(:disabled):active,.ui .continue:not(:disabled):active{box-shadow:inset 0 -3px 0 #0002,inset 0 2px 0 #fff9,0 1px 0 ${K}!important}
#hsc-score .x3{box-shadow:inset 0 -4px 0 #0002,inset 0 2px 0 #fff9,0 4px 0 ${K},0 6px 8px #0004!important}
/* a feature button that appears in the top row before the home screen takes it in is never shown there */
#hsc-hud .hsc-row .hsc-rw,#hsc-hud .hsc-row #hsc-salon-btn,#hsc-hud .hsc-row #hsc-set-btn{display:none!important}
`;
  const ui = {
    el: {},
    build(row) {
      const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
      const b = document.createElement('button');
      b.className = 'hsc-btn'; b.id = 'hsc-menu-btn'; b.type = 'button'; b.setAttribute('aria-label', 'Menu');
      b.innerHTML = I('home', 30) + '<span class="hsc-dot" hidden></span>';
      b.addEventListener('click', () => this.open());
      row.insertBefore(b, row.firstChild);
      // the home screen sits above every cutting-screen layer (the panels it opens sit above it)
      const m = document.createElement('div'); m.id = 'hsc-menu';
      m.innerHTML = `<div class="hold"></div><div class="mode-loading" aria-hidden="true"><i></i></div>
        <div class="page home" role="dialog" aria-label="Menu">
          <div class="top"><div class="lvl"><span class="lv"></span><div class="xp"><i></i></div></div><div class="chip coins">${I('coin')}<bdi></bdi></div></div>
          <div class="grow"></div>
          <div class="duo">
            <button class="j qp" type="button" aria-label="Quick Play"><span class="hsc-lbl" data-k="quick_play"></span></button>
            <button class="j hero" type="button" aria-label="Career"><span class="hsc-lbl" data-k="career"></span><span class="sub"></span></button>
          </div>
          <nav class="dock">${[['modes', 'modes', 'modes'], ['shop', 'salon', 'shop'], ['collection', 'styles', 'collection'], ['settings', 'gear', 'settings']].map(([b, ic, k]) => `<button type="button" data-b="${b}">${I(ic)}<span class="hsc-lbl" data-k="${k}"></span><span class="hsc-dot" hidden></span></button>`).join('')}</nav>
        </div>
        <div class="page shop" hidden role="dialog" aria-label="Shop">
          <div class="mhead"><button class="j c-white back" type="button" aria-label="Back">${I('back')}</button><div class="title">${I('salon')}<span class="hsc-lbl" data-k="shop"></span></div><div class="chip coins">${I('coin')}<bdi></bdi></div></div>
          <div class="hsc-stabs" role="tablist"></div><div class="sbody"></div>
        </div>
        <div class="page modes" hidden role="dialog" aria-label="Modes">
          <div class="mhead"><button class="j c-white back" type="button" aria-label="Back">${I('back')}</button><div class="title">${I('modes')}<span class="hsc-lbl" data-k="modes"></span></div><div class="chip coins">${I('coin')}<bdi></bdi></div></div>
          <div class="mgrid hsc-same"></div>
        </div>`;
      document.body.appendChild(m);
      // Quick Play and Career are peers: Quick Play is pressure-free play, Career only ever resumes the career
      m.querySelector('.qp').addEventListener('click', () => this.play('free'));
      m.querySelector('.hero').addEventListener('click', () => this.play('career'));
      m.querySelector('[data-b=modes]').addEventListener('click', () => { if (HSC.fx) HSC.fx.play('swish'); this.view('modes'); });
      m.querySelector('[data-b=shop]').addEventListener('click', () => { if (HSC.fx) HSC.fx.play('swish'); if (HSC.shop) HSC.shop.enter(); });
      // the coin counter is the way to more coins
      m.querySelectorAll('.coins').forEach((c) => { c.style.cursor = 'pointer'; c.addEventListener('click', () => { if (HSC.fx) HSC.fx.play('swish'); if (HSC.shop) HSC.shop.go('free'); }); });
      m.querySelector('[data-b=settings]').addEventListener('click', () => { if (HSC.fx) HSC.fx.play('swish'); if (HSC.settings) HSC.settings.open(); });
      m.querySelector('[data-b=collection]').addEventListener('click', () => { if (HSC.fx) HSC.fx.play('swish'); if (HSC.collection) HSC.collection.open(); });
      m.querySelectorAll('.page.modes .back,.page.shop .back').forEach((b) => b.addEventListener('click', () => { if (HSC.fx) HSC.fx.play('back'); this.view('home', true); }));
      // back (Escape) closes only the top layer: a panel over the home screen handles it itself. Decided before any
      // panel's own handler runs (capture), so the Escape that closes a panel never also closes the home screen
      addEventListener('keydown', (e) => {
        if (e.key !== 'Escape' || !m.classList.contains('open') || document.querySelector(PANELS)) return;
        if (m.querySelector('.page.home').hidden) this.view('home', true);
        // Fresh Home has no haircut underneath it. Reuse the Android back contract so Escape
        // closes Home only when the player has genuinely started changing the current customer.
        else if (HSC.menuBack) HSC.menuBack();
      }, true);
      addEventListener('resize', () => { if (m.classList.contains('open')) requestAnimationFrame(() => { this.fit(); this.backdrop(); }); });
      Object.assign(this.el, { btn: b, menu: m, row });
      this.tick();
      try { new MutationObserver(() => this.tick()).observe(row, { childList: true }); } catch (e) {}
      HSC.lifecycle.interval(() => this.tick(), 250);
      settleLaunchHome();
    },
    labels() {
      const m = this.el.menu;
      if (!m) return;
      m.setAttribute('dir', HSC.rtl && HSC.rtl() ? 'rtl' : 'ltr');
      m.querySelectorAll('.hsc-lbl[data-k]').forEach((el) => { el.textContent = t(el.dataset.k); });
      m.querySelector('.hero').setAttribute('aria-label', t('career'));
      m.querySelector('.qp').setAttribute('aria-label', t('quick_play'));
      requestAnimationFrame(() => this.fit());
    },
    // every label whole: each one steps its type down (labels.js), then the dock's four together
    fit() {
      const m = this.el.menu;
      if (HSC.fitLabels) HSC.fitLabels(m);
      this.dockFit();
    },
    dockFit() {
      const d = this.el.menu && this.el.menu.querySelector('.page.home .dock');
      if (!d || !d.offsetParent) return;
      const ls = [...d.querySelectorAll('.hsc-lbl')], over = () => d.scrollWidth > d.clientWidth + 0.5;
      d.classList.remove('wrap');
      if (!over()) return;
      // one size for all four, so the dock keeps one baseline
      let s = Math.min(...ls.map((l) => parseFloat(getComputedStyle(l).fontSize) || 14)), guard = 40;
      ls.forEach((l) => (l.style.fontSize = s + 'px'));
      while (over() && s > 12 && guard--) { s = Math.max(12, s - 0.5); ls.forEach((l) => (l.style.fontSize = s + 'px')); }
      if (over()) d.classList.add('wrap');
    },
    open() {
      // A Career chapter may open its city map while the between-customer buffer is still covering the chair.
      // Remember that deliberate open so clearing the buffer reveals the map instead of closing it again.
      if (this.customerSeating) this.customerKeepOpen = true;
      this.el.menu.classList.add('open');
      this.view('home');
      this.refresh();
    },
    loading(on) {
      const m = this.el.menu;
      if (!m) return;
      if (on) {
        // Reuse the exact furnished-shop picture already shown by Home. No extra WebGL scene or texture is created.
        const url = homeBackdrop || launchPicture || LAUNCH_FALLBACK;
        m.style.backgroundImage = `url(${JSON.stringify(url)})`;
        m.classList.add('athome', 'launching');
        m.setAttribute('aria-busy', 'true');
      } else {
        m.classList.remove('launching');
        m.removeAttribute('aria-busy');
        this.backdrop();
      }
    },
    customerLoading(on) {
      const m = this.el.menu;
      if (!m) return;
      if (on) {
        if (this.customerSeating) return;
        this.customerSeating = true;
        this.customerKeepOpen = m.classList.contains('open');
        this.loading(true);
        m.classList.add('open', 'between-customers');
      } else {
        if (!this.customerSeating) return;
        const keepOpen = this.customerKeepOpen;
        this.customerSeating = false;
        this.customerKeepOpen = false;
        this.customerFinishing = false;
        m.classList.remove('between-customers');
        this.loading(false);
        if (!keepOpen) m.classList.remove('open');
      }
    },
    customerReady() {
      if (!this.customerSeating || this.customerFinishing) return;
      this.customerFinishing = true;
      // J() marks the renderer dirty before the save finishes. Two animation frames let that required customer frame
      // render and composite before the buffer is removed; the bounded painted() fallback still protects background tabs.
      painted().then(() => { if (this.customerSeating) this.customerLoading(false); });
    },
    // Home shows the shop itself: the same 3D room the player furnishes, drawn wide
    backdrop() {
      const m = this.el.menu, home = !m.querySelector('.page.home').hidden;
      m.classList.toggle('athome', home);
      if (!home) { m.style.backgroundImage = ''; return null; }
      const starting = launchRequested && !HSC.startupTiming.gameReady;
      const rendered = !starting && !HSC.__testForceHomeFallback && HSC.salon?.homePicture?.();
      const url = rendered || (launchFallback ? LAUNCH_FALLBACK : null);
      if (url) { homeBackdrop = url; m.style.backgroundImage = `url("${url}")`; return url; }
      m.classList.remove('athome'); // covered by Android's platform splash during a launch; other hosts keep the theme
      return null;
    },
    close() { this.el.menu.classList.remove('open'); },
    view(v, back) {
      const m = this.el.menu;
      for (const p of m.querySelectorAll('.page')) {
        const on = p.classList.contains(v);
        p.hidden = !on;
        p.classList.remove('in', 'back-in');
        const firstHome = v === 'home' && launchRequested && !launchSettled;
        if (on && m.classList.contains('open') && !firstHome) {
          void p.offsetWidth;
          p.classList.add(back ? 'back-in' : 'in');
        }
      }
      if (v === 'modes') this.modes();
      this.backdrop();
      if (HSC.careerUI) HSC.careerUI.render(v);
      this.labels();
    },
    async play(mode, card = this.el.menu.querySelector(mode === 'free' ? '.qp' : '.hero')) {
      if (this.seating) return false;
      const M = HSC.modes;
      if (!M || (mode !== 'career' && !M.unlocked(mode))) { if (HSC.nope) HSC.nope(card); return false; }
      // A ready Career that needs a city opens its map immediately; no customer work has begun, so no loader belongs
      // there. A Career still initializing is allowed to continue into the shared loading buffer below.
      if (mode === 'career' && HSC.careerRun && HSC.careerRun.ready()) {
        if (HSC.careerRun.tooNew()) { this.view('map'); return false; }
        if (HSC.careerRun.needsChoice()) { if (HSC.fx) HSC.fx.play('swish'); this.view('map'); return false; }
      }
      this.seating = true;
      this.loading(true);
      await painted();
      try {
        // Android may expose Home while the heavyweight customer renderer finishes compiling behind it. The furnished
        // shop and spinner now stay visible while that genuine prerequisite and the first customer finish loading.
        if (HSC.androidGameplayReady === false) await new Promise((resolve) => addEventListener('hsc-gameplay-ready', resolve, { once: true }));
        if (mode === 'career' && HSC.careerRun && HSC.careerRun.tooNew()) { this.view('map'); return false; }
        if (!M.unlocked(mode) || (mode === 'career' && !(HSC.careerRun && HSC.careerRun.ready()))) { if (HSC.nope) HSC.nope(card); return false; }
        // Career waits for the player's city choice (the founding city, or the next city after a chapter).
        if (mode === 'career' && HSC.careerRun.needsChoice()) { if (HSC.fx) HSC.fx.play('swish'); this.view('map'); return false; }
        await HSC.whenYouTubeResumed();
        if (!this.el.menu.classList.contains('open') || !(await M.set(mode))) return false;
        await painted();
        if (HSC.fx) HSC.fx.play('swish');
        // The existing first-session shop reveal can prepare while the loading buffer is still covering the chair.
        if (HSC.salon) HSC.salon.reveal(mode);
        this.close();
        return true;
      } finally {
        this.seating = false;
        this.loading(false);
      }
    },
    modes() {
      const M = HSC.modes, grid = this.el.menu.querySelector('.mgrid');
      if (!M) return;
      // Quick Play is a Home card, never a Modes tile (its saved id `free` stays in the mode list)
      grid.innerHTML = M.list.filter((k) => k !== 'free').map((k) => {
        const lock = !M.unlocked(k);
        // a locked mode stays readable, and shows how close the barber is: customers done out of customers needed, as a bar
        const goal = HSC.meta.cutsFor(M.level[k]), cuts = HSC.meta.data.cuts;
        const hot = !lock && HSC.econ && HSC.econ.demandMatch && HSC.econ.demandMatch(k); // this shift's demand bonus, while it can still pay
        // a mode in demand shows its bonus, so the player can see why to go there
        const eco = HSC.economy && HSC.economy.CONFIG, fee = eco && eco.fee[k], bonus = hot && fee ? Math.min(eco.demand.max, Math.round((fee[0] - fee[1]) * eco.demand.share)) : 0;
        return `<button class="j mode c-${MODE_COLOUR[k]}" type="button" data-m="${k}"${lock ? ' aria-disabled="true"' : ''}><span class="ico">${I(MODE_ICON[k])}</span><span class="tx"><span class="hsc-lbl" data-k="${MODE_WORD[k]}"></span><span class="ln">${t(MODE_LINE[k])}</span></span><span class="reward">${REWARD[k]()}${hot && bonus ? `<em>+${bonus}</em>` : ''}</span>${lock ? `<span class="lock">${I('lock')}<span class="lb"><i style="width:${Math.round(100 * Math.min(1, cuts / goal))}%"></i></span><b>${HSC.num ? HSC.num(cuts) : cuts}/${HSC.num ? HSC.num(goal) : goal}</b></span>` : ''}</button>`;
      }).join('');
      grid.querySelectorAll('.mode').forEach((b) => b.addEventListener('click', () => {
        if (b.getAttribute('aria-disabled')) { if (HSC.nope) HSC.nope(b); return; }
        this.play(b.dataset.m, b);
      }));
    },
    // the live parts of the home screen
    refresh() {
      const d = HSC.meta && HSC.meta.data, m = this.el.menu;
      if (!d) return;
      m.querySelectorAll('.coins bdi').forEach((el) => { const n = HSC.coins ? HSC.coins.get() : d.coins || 0; el.textContent = HSC.num ? HSC.num(n) : n; });
      m.querySelector('.xp i').style.width = Math.round((HSC.meta.levelProgress ? HSC.meta.levelProgress() : 0) * 100) + '%';
      // the level badge, and the Shop's dot when something free is waiting
      const lv = m.querySelector('.lvl .lv'), L = HSC.meta.level();
      if (lv.dataset.n !== String(L) && HSC.levelBadge) { lv.dataset.n = String(L); lv.innerHTML = HSC.levelBadge(L); }
      m.querySelector('[data-b=shop] .hsc-dot').hidden = !(HSC.shop && HSC.shop.dot());
      if (HSC.shop) HSC.shop.tick();
    },
    tick() {
      const m = this.el.menu;
      if (m.classList.contains('open') && HSC.fitLabels && [...m.querySelectorAll('.hsc-lbl')].some((e) => e.offsetParent && e.scrollWidth > e.clientWidth + 0.5)) HSC.fitLabels(m);
      // the dock as a whole (after a language change, say): fitLabels() above sees only one label at a time
      if (m.classList.contains('open')) { const d = m.querySelector('.page.home .dock'); if (d && d.offsetParent && d.scrollWidth > d.clientWidth + 0.5) this.dockFit(); }
      // The menu can precede both the salon save and the 3D renderer on a cold start. Retry the lightweight handoff
      // until both are ready; homePicture caches the successful render, so this stops doing work immediately after it.
      if (m.classList.contains('open') && !m.style.backgroundImage && !m.querySelector('.page.home').hidden) this.backdrop();
      if (launchRequested && !launchSettled) settleLaunchHome();
      // move each feature button into its place as it appears
      for (const [sel, slot] of PLACE) {
        const btn = document.querySelector('#hsc-hud .hsc-row ' + sel);
        if (!btn) continue;
        m.querySelector(slot).appendChild(btn);
      }
      // the home button's dot: anything waiting on the home screen
      this.el.btn.querySelector('.hsc-dot').hidden = !(HSC.shop && HSC.shop.dot());
      if (m.classList.contains('open')) this.refresh();
    },
  };
  // Android calls this after the first usable game frame and before releasing the platform launch screen. That makes
  // Home the first interactive frame without making the renderer wait behind an already-open overlay.
  function settleLaunchHome() {
    if (!launchRequested || !ui.el.menu) return false;
    if (launchSettled) return true;
    // Rendering the furnished salon can take measurable synchronous time on a slow device. Start the reveal delay
    // after that work, so Android never uncovers Home partway through its page-in animation.
    if (!launchOpened) { launchOpened = true; ui.open(); }
    const url = ui.backdrop();
    if (!url) return false;
    if (launchPicture !== url) {
      launchPicture = url;
      launchPictureReady = false;
      const image = new Image();
      const ready = () => {
        if (launchPicture !== url) return;
        launchPictureReady = true;
        settleLaunchHome();
      };
      image.onload = ready;
      image.src = url;
      if (image.complete && image.naturalWidth) ready();
      return false;
    }
    if (!launchPictureReady || launchPaintQueued) return launchSettled;
    launchPaintQueued = true;
    // Do not tell Android to uncover the WebView until the decoded picture has crossed two compositor frames.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      launchSettled = true;
      launchPaintQueued = false;
      HSC.lifecycle.clear(launchFallbackTimer);
      while (launchWaiters.length) launchWaiters.shift()(true);
    }));
    return false;
  }
  // the features put their buttons in the HUD row; once it exists the home screen takes them in
  const boot = () => { const row = document.querySelector('#hsc-hud .hsc-row'); if (row && document.getElementById('hsc-hud')) ui.build(row); else HSC.lifecycle.timeout(boot, 200); };
  boot();
  // a language change re-renders the open page (career strip, mode cards) in the new language
  addEventListener('hsc-language', () => {
    const m = ui.el.menu;
    if (!m) return;
    ui.labels();
    const pg = m.querySelector('.page:not([hidden])');
    const v = pg && [...pg.classList].find((c) => !['page', 'in', 'back-in'].includes(c));
    if (v === 'modes') ui.modes();
    if (v && HSC.careerUI) HSC.careerUI.render(v);
  });
  // Android keeps its icon-free platform splash over the renderer preparation. Other hosts can still open Home
  // independently; whenever gameplay becomes ready, refresh its furnished barbershop picture.
  addEventListener('hsc-gameplay-ready', () => {
    const m = ui.el.menu;
    if (m && m.classList.contains('open') && !m.querySelector('.page.home').hidden) ui.backdrop();
  });
  // career(): the home screen on the world map (a city must be chosen before the career can seat anyone)
  HSC.menu = { open: () => ui.open(), close: () => ui.close(), view: (v, back) => ui.view(v, back), career: () => { if (!ui.el.menu) return; ui.open(); ui.view('map'); }, play: (m) => ui.play(m) };
  // Next starts this buffer on the player's actual click, before the host decides whether an interstitial is due.
  // The ad, when present, owns the screen above it. The engine calls beforeNextCustomer only after that break, so the
  // same buffer then paints before the expensive customer/material swap. Reward buttons never call either hook.
  HSC.nextCustomerLoading = (on) => ui.customerLoading(on);
  HSC.beforeNextCustomer = async () => { ui.customerLoading(true); await painted(); };
  HSC.nextCustomerReady = () => ui.customerReady();
  HSC.openLaunchHome = function () {
    launchRequested = true;
    launchFallback = true;
    if (!launchFallbackTimer) launchFallbackTimer = HSC.lifecycle.timeout(() => {
      if (launchSettled) return;
      launchFallback = true;
      settleLaunchHome();
    }, LAUNCH_FALLBACK_MS);
    if (settleLaunchHome()) return Promise.resolve(true);
    return new Promise((resolve) => {
      launchWaiters.push(resolve);
    });
  };
  // a haircut is under way: the customer in the chair has been touched
  const inProgress = () => {
    const g = globalThis.skinFadeStudio, s = g && g.getState();
    if (!s || s.status !== 'cutting') return false;
    if (s.cutStrokeCount > 0) return true;
    const moved = (a, b) => Array.isArray(a) && Array.isArray(b) && a.some((v, i) => v !== b[i]);
    return moved(s.hair, s.startHair) || moved(s.beard, s.startBeard);
  };
  // the Android back button: the Open splash goes first, then the top panel, then the modes screen back to home; from
  // the chair it opens the home screen. On the home screen it goes back to a haircut under way (touch has no other way
  // back to it); with nothing under way it is not handled (Android leaves the app as usual)
  HSC.menuBack = function () {
    const m = ui.el.menu;
    if (!m) return false;
    // the splash covers everything: back only lets it go (the haircut it opens on stays)
    const splash = document.querySelector('#hsc-reveal.on');
    if (splash) { if (!splash.classList.contains('out')) splash.click(); return true; }
    for (const sel of ['#hsc-salon.open .x', '#hsc-set.open .x']) {
      const x = document.querySelector(sel);
      if (x) { x.click(); return true; }
    }
    if (m.classList.contains('open')) {
      if (m.querySelector('.page.home').hidden) { ui.view('home', true); return true; }
      if (inProgress()) { if (HSC.fx) HSC.fx.play('back'); ui.close(); return true; }
      return false;
    }
    // the reveal spin plays out first: the result and the next customer are settled only when it lands
    const g = globalThis.skinFadeStudio;
    if (g && g.getState().status === 'reveal' && !g.getView().revealComplete) return true;
    ui.open();
    return true;
  };
})(globalThis.HSC || (globalThis.HSC = {}));

});
