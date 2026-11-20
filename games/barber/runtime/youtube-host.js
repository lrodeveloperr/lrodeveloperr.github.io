/* YouTube Playables host extras. Loaded after youtube-startup.js and before customers.js.
 *
 * 1. HSC.onHostPause(callback): the YouTube SDK's onPause/onResume (and ad breaks) as one signal.
 *    The shared modules' defensive "app went to the background" handlers (audio stop, lost pointers,
 *    career lease, rush clock, other-tab reload) use this instead of the Page Visibility API, which
 *    YouTube Playables forbids for pause handling. Behaviour is unchanged; only the trigger differs.
 *
 * 2. HSC.deviceStore: device-local graphics records (detail-adaptive.js) persisted in the YouTube cloud
 *    save. Web storage is null inside YouTube, so without this the adaptive policy's "the last launch
 *    crashed: start one tier lower" protection never sees the previous launch. Records are keyed by the
 *    device fingerprint, so one device's crash never lowers another device's graphics.
 */
(function (HSC) {
  'use strict';
  const SLOT = 'hsc-device-v1';
  const MAX_DEVICES = 6;

  // Give the pressed control a chance to paint before heavier work, but never wait indefinitely for animation
  // frames. A throttled/occluded WebView can delay rAF for seconds; the bounded fallback keeps every menu and
  // Continue action responsive. Host pause safety remains in HSC.whenYouTubeResumed(), which callers use next.
  HSC.afterInputPaint = () => new Promise(resolve => {
    let settled = false;
    const finish = () => { if (settled) return; settled = true; clearTimeout(fallback); resolve(); };
    const fallback = setTimeout(finish, 120);
    requestAnimationFrame(() => requestAnimationFrame(finish));
  });

  // ---- 1. host pause ----
  const pauseListeners = new Set();
  let hostPaused = false;
  HSC.onHostPause = function (callback) {
    pauseListeners.add(callback);
    return () => pauseListeners.delete(callback);
  };
  function notifyPause(paused) {
    if (paused === hostPaused) return;
    hostPaused = paused;
    for (const callback of [...pauseListeners]) {
      try { callback(paused); } catch (error) { console.error('host pause listener failed', error); }
    }
  }

  // ---- 2. device store ----
  const memory = new Map();
  let fingerprint = null, client = null, ready = false, timer = 0, writing = Promise.resolve();
  let devices = {}, loadedDevices = false, restored = false;
  HSC.deviceStore = {
    get: (key) => (memory.has(key) ? memory.get(key) : null),
    set(key, value) { memory.set(key, String(value)); persistSoon(); },
    remove(key) { memory.delete(key); persistSoon(); },
    // detail-adaptive registers the probe fingerprint while customers.js evaluates; its restore function is
    // defined later in the same script, so the restore attempt waits for the end of that script (microtask)
    bind(value) { fingerprint = String(value || 'unknown'); Promise.resolve().then(restore); },
  };
  // Runs once both halves exist, in either order: the cloud record (may load before the 3 MB game script
  // has run) and this device's fingerprint with the graphics module that applies it.
  function restore() {
    if (restored || !loadedDevices || !fingerprint || !(HSC.detail && HSC.detail.restoreDeviceRecord)) return;
    restored = true;
    const mine = devices[fingerprint] && typeof devices[fingerprint] === 'object' ? devices[fingerprint] : null;
    try { HSC.detail.restoreDeviceRecord(mine || {}); }
    catch (error) { console.error('device graphics record could not be restored', error); }
    ready = true;
    // write this launch's boot marker at once: a crash in the next seconds must be visible next time
    persistNow();
  }
  function snapshot() {
    const own = {};
    for (const [key, value] of memory) own[key] = value;
    const next = Object.assign({}, devices, { [fingerprint]: Object.assign({ at: Date.now() }, own) });
    const ids = Object.keys(next).sort((a, b) => (next[b].at || 0) - (next[a].at || 0)).slice(0, MAX_DEVICES);
    return Object.fromEntries(ids.map((id) => [id, next[id]]));
  }
  function persistNow() {
    if (!ready || !client || !fingerprint) return writing;
    devices = snapshot();
    writing = writing.catch(() => {}).then(() => client.saveProgress(SLOT, devices)).catch(() => {});
    return writing;
  }
  function persistSoon() {
    if (!ready) return;
    clearTimeout(timer);
    timer = setTimeout(persistNow, 200);
  }

  const clientPromise = HSC.youtubeClientPromise;
  if (!clientPromise) return;
  clientPromise.then(async (value) => {
    client = value;
    client.onStateChange((state) => notifyPause(state.executionPaused === true));
    let saved = null;
    try { saved = await client.loadProgress(SLOT, null); } catch (_) { return; } // protected/unreadable save: stay in memory
    devices = saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
    loadedDevices = true;
    restore();
  }).catch(() => {});
})(globalThis.HSC || (globalThis.HSC = {}));
