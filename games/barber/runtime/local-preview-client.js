/* Explicit standalone Sites target: local saves, no external SDK and no simulated ads. */
(function (HSC) {
  'use strict';
  const schemas = new Map([
    ['skin-fade-studio-session-v2', ['version', 19]],
    ['skin-fade-studio-meta-v1', ['v', 1]],
    ['skin-fade-studio-rewards-v4', ['v', 4]],
  ]);
  const previewKey = 'asmr-barber-youtube-save-v1';
  // Off-platform preview only. Sandboxed frames and strict privacy modes can deny localStorage;
  // the preview then keeps progress for this page load instead of failing to start.
  let previewMemory = null, previewStorageUnavailable = false;
  const previewStore = {
    get() {
      if (previewStorageUnavailable) return previewMemory;
      try { return globalThis.localStorage.getItem(previewKey); }
      catch (_) { previewStorageUnavailable = true; return previewMemory; }
    },
    set(data) {
      previewMemory = data;
      if (previewStorageUnavailable) return;
      try { globalThis.localStorage.setItem(previewKey, data); }
      catch (_) { previewStorageUnavailable = true; }
    },
  };
  const clone = value => JSON.parse(JSON.stringify(value));
  // v3.82 saved through Playgama Bridge: a flat {key: JSON string} object with no envelope.
  // Only objects whose every key is one of the game's own are migrated; anything else stays protected.
  const legacyBridgeSave = value => value && typeof value === 'object' && !Array.isArray(value) &&
    !Object.hasOwn(value, 'version') && Object.keys(value).every(key => key.startsWith('skin-fade-studio-'));
  function migrateBridgeSave(value) {
    const slots = {};
    for (const [key, item] of Object.entries(value)) {
      if (typeof item !== 'string') { slots[key] = item; continue; }
      try { slots[key] = JSON.parse(item); }
      catch (_) { throw new Error('Saved progress could not be decoded'); }
    }
    return {version: 1, slots};
  }
  const tooNew = () => Object.assign(new Error('Progress needs a newer game version'), {code: 'SAVE_TOO_NEW'});
  const tooLarge = () => Object.assign(new Error('Cloud save exceeds size limit'), {code: 'SAVE_TOO_LARGE'});
  // The save before an ad gets this long. A tap must not wait silently on a hung save: past this the ad is
  // refused, exactly as when the save fails, and the save itself carries on.
  const AD_SAVE_MS = 5000;
  // The first cloud read gets this long (McPlay fault tests: a read that never settles must not strand
  // the player; an 8 s read must still deliver the real save). Past it the session continues fresh and
  // write-protected, so data the SDK did not deliver is never replaced.
  const LOAD_BUDGET_MS = 10000;
  const LANGUAGE_BUDGET_MS = 2000;
  const cloudUnavailable = () => Object.assign(new Error('Cloud progress is unavailable for this session'), {code: 'CLOUD_UNAVAILABLE'});
  function withDeadline(work, ms) {
    let handle = 0;
    const deadline = new Promise((_, reject) => {
      handle = setTimeout(() => reject(Object.assign(new Error('Cloud progress load timed out'), {code: 'LOAD_TIMEOUT'})), ms);
    });
    return Promise.race([Promise.resolve().then(work), deadline]).finally(() => clearTimeout(handle));
  }
  function withinTime(promise, ms, message = 'Progress save timed out') {
    let timer = 0;
    const late = new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(message)), ms); });
    return Promise.race([promise, late]).finally(() => clearTimeout(timer));
  }

  // Transport-only, lossless run-length encoding for repeated numeric arrays. The
  // game continues to receive its original numbers and arrays, without quantization.
  // Small or irregular saves keep the existing v1 representation. Older releases
  // protect the new envelope as a future save rather than misreading packed arrays.
  function encodeSave(value) {
    const paths = [];
    // Previous versions stringified the entire save, parsed it back, stringified every candidate array repeatedly and
    // finally stringified the packed save. That duplicate whole-envelope work could block a low-memory phone at the
    // exact moment Career was seating a customer. Progress entries are already normalized through progressEntry(), so
    // this copy-on-write walk can pack only the arrays that change on the wire and stringify the envelope once.
    function copy(item, path) {
      if (!item || typeof item !== 'object') return item;
      if (Array.isArray(item)) {
        if (item.length >= 16 && paths.length < 1024 && path.length <= 64 && item.every(Number.isFinite)) {
          const runs = [];
          let rawChars = 2, runChars = 2;
          for (let i = 0; i < item.length;) {
            let end = i + 1;
            while (end < item.length && item[end] === item[i]) end++;
            const count = end - i, value = item[i];
            runs.push(count, value);
            runChars += String(count).length + String(value).length + (runs.length > 2 ? 2 : 1);
            for (let index = i; index < end; index++) rawChars += String(value).length + (index ? 1 : 0);
            i = end;
          }
          // Leave enough margin for the global codec fields as well as this path entry. Arrays that do not compress
          // decisively remain shared with the immutable snapshot and are serialized normally.
          if (rawChars - runChars > JSON.stringify(path).length + 96) { paths.push(path); return runs; }
          return item;
        }
        return item.map((entry, index) => copy(entry, [...path, String(index)]));
      }
      const out = {};
      for (const [key, entry] of Object.entries(item)) out[key] = copy(entry, [...path, key]);
      return out;
    }
    const slots = copy(value.slots, []);
    if (!paths.length) return JSON.stringify(value);
    return JSON.stringify({version: 2, codec: 'numeric-rle-v1', slots, arrays: paths});
  }
  function decodeSave(value) {
    if (value?.version !== 2 || value.codec !== 'numeric-rle-v1') return value;
    const invalid = () => new Error('Saved progress has an invalid compact format');
    if (!value.slots || typeof value.slots !== 'object' || Array.isArray(value.slots) ||
        !Array.isArray(value.arrays) || value.arrays.length > 1024) throw invalid();
    let expanded = 0;
    const seen = new Set();
    for (const path of value.arrays) {
      if (!Array.isArray(path) || !path.length || path.length > 64 ||
          path.some(key => typeof key !== 'string')) throw invalid();
      const identity = JSON.stringify(path);
      if (seen.has(identity)) throw invalid();
      seen.add(identity);
      let parent = value.slots;
      for (const key of path.slice(0, -1)) {
        if (!parent || typeof parent !== 'object' || !Object.hasOwn(parent, key)) throw invalid();
        parent = parent[key];
      }
      const key = path[path.length - 1];
      if (!parent || typeof parent !== 'object' || !Object.hasOwn(parent, key)) throw invalid();
      const runs = parent[key];
      if (!Array.isArray(runs) || runs.length % 2) throw invalid();
      let length = 0;
      for (let i = 0; i < runs.length; i += 2) {
        if (!Number.isSafeInteger(runs[i]) || runs[i] < 1 || !Number.isFinite(runs[i + 1])) throw invalid();
        length += runs[i];
        if (length + expanded > 3 * 1024 * 1024) throw invalid();
      }
      const array = new Array(length); let offset = 0;
      for (let i = 0; i < runs.length; i += 2) {
        array.fill(runs[i + 1], offset, offset + runs[i]); offset += runs[i];
      }
      parent[key] = array; expanded += length;
    }
    return {version: 1, slots: value.slots};
  }

  // Only game-owned UI work uses this scheduler. SDK callbacks remain responsive while paused.
  function scheduler() {
    let paused = false, disposed = false, sequence = 0;
    const tasks = new Map();
    function arm(task) {
      if (paused || disposed) return;
      task.at = performance.now() + task.remaining;
      task.handle = setTimeout(() => {
        task.handle = null;
        if (paused || disposed) return;
        if (!task.repeat) tasks.delete(task.id);
        task.fn();
        if (task.repeat && tasks.has(task.id)) { task.remaining = task.delay; arm(task); }
      }, task.remaining);
    }
    function add(fn, delay, repeat) {
      const id = ++sequence, task = {id, fn, delay: Math.max(0, delay || 0), remaining: Math.max(0, delay || 0), repeat, handle: null};
      if (!disposed) { tasks.set(id, task); arm(task); }
      return id;
    }
    return {
      timeout: (fn, delay) => add(fn, delay, false),
      interval: (fn, delay) => add(fn, delay, true),
      clear(id) { const task = tasks.get(id); if (task) clearTimeout(task.handle); tasks.delete(id); },
      setPaused(value) {
        if (paused === value) return;
        paused = value;
        for (const task of tasks.values()) {
          if (paused) { clearTimeout(task.handle); task.handle = null; task.remaining = Math.max(0, task.at - performance.now()); }
          else arm(task);
        }
      },
      dispose() { disposed = true; for (const task of tasks.values()) clearTimeout(task.handle); tasks.clear(); },
    };
  }
  HSC.lifecycle = scheduler();

  HSC.createLocalPreviewClient = async function ({preload = false} = {}) {
    HSC.isLocalPreview = true;
    const hosted = false;
    let disposed = false, loaded = false, cloudWritable = true, envelope = null, loadPromise;
    let queue = Promise.resolve(), game = null, hostAudio = true;
    let userAudio = true, adPending = false, ready = false, lastAttempt = -Infinity, interstitialAccepted = false;
    let acknowledgedCuts = 0, reportedCuts = 0, scorePending = false;
    // UTF-8 bytes of each slot's "key":value entry and of the envelope around them, so the size of the next
    // save is known before a slot enters the envelope.
    const entries = new Map(), reserved = new Map(), bytesOf = text => new TextEncoder().encode(text).byteLength;
    let frameBytes = 0, revision = 0, writtenRevision = -1;
    const reasons = new Set(), listeners = new Set(), cleanup = [];
    if (preload) reasons.add('startup');
    const state = () => ({paused: reasons.size > 0, executionPaused: reasons.has('host') || reasons.has('advertisement-request'), audioEnabled: hostAudio && userAudio && reasons.size === 0});
    const report = () => {};
    function blockGameInteraction(value) {
      // Never make the whole body inert: the host may mount its ad controls (the interstitial's close
      // button) as body children inside the game frame. Lock only the game's own roots.
      if (document.body) document.body.inert = false;
      if (typeof document.querySelectorAll !== 'function') return;
      for (const element of document.querySelectorAll('#game, #hsc-hud, #hsc-panel, #hsc-hub, #hsc-menu, #hsc-score')) element.inert = value;
    }
    function publish() {
      if (disposed) return;
      const next = state();
      HSC.executionPaused = next.executionPaused;
      HSC.lifecycle.setPaused(next.executionPaused);
      document.documentElement.classList.toggle('yt-paused', next.executionPaused);
      blockGameInteraction(next.executionPaused || reasons.has('startup'));
      game?.setPaused(next.paused);
      game?.setAudioEnabled(next.audioEnabled);
      HSC.setRevealAudio?.(next.audioEnabled);
      for (const callback of [...listeners]) callback(next);
      reportScore();
    }
    function pause(reason, value) { if (value) reasons.add(reason); else reasons.delete(reason); publish(); }
    function whenResumed() {
      if (disposed) return Promise.reject(new Error('Game disposed'));
      if (!state().executionPaused) return Promise.resolve();
      return new Promise((resolve, reject) => {
        const callback = next => {
          if (disposed || !next.executionPaused) { listeners.delete(callback); disposed ? reject(new Error('Game disposed')) : resolve(); }
        };
        listeners.add(callback);
      });
    }
    function afterPaint() {
      return new Promise((resolve, reject) => {
        let handle = 0;
        const update = next => {
          if (disposed) {
            if (handle) cancelAnimationFrame(handle);
            listeners.delete(update);
            reject(new Error('Game disposed'));
          } else if (next.executionPaused) {
            if (handle) cancelAnimationFrame(handle);
            handle = 0;
          } else if (!handle) {
            handle = requestAnimationFrame(() => { handle = 0; listeners.delete(update); resolve(); });
          }
        };
        listeners.add(update);
        update(state());
      });
    }
    // Available synchronously to the early bootstrap, before the SDK requests resolve.
    if (preload) HSC.whenYouTubeResumed = whenResumed;
    // web-only:start
    // A hidden, frozen or closing page pauses exactly like a host pause and writes its progress now;
    // showing it again resumes. A page brought back from the back-forward cache reloads: another tab
    // may have saved since it was put away.
    // One game at a time: the saves live in this browser's storage, so two tabs would overwrite each
    // other's progress. A tab claims the game the first moment it is in view (a tab opened in the background
    // waits unclaimed and unstarted, and the tab in use keeps playing). A newer claim takes over: the older tab
    // pauses completely (no input, no timers, no saves) and reloads with the latest saves when it is shown,
    // focused, tapped, clicked or typed in again, or when the newer tab closes while this one is in view.
    // Two tabs that claim together settle on the later claim (then the id), so one of them always plays.
    let tabs = null, otherTab = null, reloading = false, claimed = 0;
    const tabId = Math.random().toString(36).slice(2);
    try { tabs = new BroadcastChannel('skin-fade-studio-tabs'); } catch (_) {}
    const reload = () => { if (!reloading) { reloading = true; location.reload(); } };
    const claim = () => {
      if (claimed || !tabs) return;
      claimed = Date.now();
      try { tabs.postMessage({hi: 1, me: tabId, at: claimed}); } catch (_) {}
    };
    const leave = () => { pause('host', true); if (loaded && game) flush().catch(report); };
    // the claim comes before the pause lifts, so this tab reads the saves only once it owns them
    const shown = () => {
      if (document.visibilityState === 'hidden') return;
      if (HSC.otherTab) reload(); else { claim(); pause('host', false); }
    };
    const visibility = () => { if (document.visibilityState === 'hidden') leave(); else shown(); };
    const restored = event => { if (event.persisted) reload(); else shown(); };
    const closing = () => { leave(); try { tabs?.postMessage({bye: 1, me: tabId}); } catch (_) {} };
    // a paused older tab takes no input at all: a tap, click or key means the player picked this tab, which
    // reloads and takes over (a click on a window that already has focus sends no focus event)
    const woken = event => {
      if (!HSC.otherTab) return;
      event.preventDefault(); event.stopImmediatePropagation();
      reload();
    };
    const inputs = ['pointerdown', 'mousedown', 'touchstart', 'click', 'keydown'];
    if (tabs) {
      tabs.onmessage = event => {
        const message = event.data || {};
        if (!message.hi || message.me === tabId) {
          if (message.bye && message.me === otherTab && document.visibilityState === 'visible') reload();
          return;
        }
        // not claimed yet (never in view): nothing to give up or defend; this tab claims when it is shown.
        // A hello with no claim time is the game's own guard (customers/meta.js), sent by a tab that has already
        // claimed here: never answered, or a lone tab would answer itself and its own meta guard would yield.
        if (!claimed || !Number.isFinite(message.at)) return;
        const newer = message.at > claimed || (message.at === claimed && String(message.me) > tabId);
        // the newer claim plays: this tab stops like a host pause (the page goes inert) and never resumes in place
        if (newer) { otherTab = message.me; HSC.otherTab = true; pause('host', true); }
        // an older claim that may not have heard ours (its channel opened after we spoke): answer, so it yields
        else if (!HSC.otherTab) { try { tabs.postMessage({hi: 1, me: tabId, at: claimed}); } catch (_) {} }
      };
    }
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('freeze', leave);
    document.addEventListener('resume', shown);
    globalThis.addEventListener('pagehide', closing);
    globalThis.addEventListener('pageshow', restored);
    globalThis.addEventListener('focus', shown);
    for (const type of inputs) globalThis.addEventListener(type, woken, {capture: true, passive: false});
    cleanup.push(() => {
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('freeze', leave);
      document.removeEventListener('resume', shown);
      globalThis.removeEventListener('pagehide', closing);
      globalThis.removeEventListener('pageshow', restored);
      globalThis.removeEventListener('focus', shown);
      for (const type of inputs) globalThis.removeEventListener(type, woken, {capture: true});
      try { tabs?.close(); } catch (_) {}
    });
    if (document.visibilityState === 'hidden') pause('host', true);
    else claim();
    // web-only:end
    async function load() {
      if (loadPromise) return loadPromise;
      loadPromise = (async () => {
        await whenResumed();
        if (HSC.startupTiming) HSC.startupTiming.saveRequest = performance.now();
        const raw = previewStore.get();
        await whenResumed();
        let parsed = raw;
        if (typeof raw === 'string') {
          // The SDK owns the transport, not our save schema. A new account/test host may
          // return empty JSON rather than the empty string used by the first fixture.
          try { parsed = raw.trim() === '' ? null : JSON.parse(raw); }
          catch (_) {
            if (hosted) { useProtectedFreshSession(); return; }
            throw new Error('Saved progress could not be decoded');
          }
        }
        try { parsed = decodeSave(parsed); }
        catch (error) { if (hosted) { useProtectedFreshSession(); return; } throw error; }
        const empty = parsed == null || parsed === '' || parsed === false || parsed === 0 ||
          (typeof parsed === 'string' && parsed.trim() === '') ||
          (typeof parsed === 'object' && Object.keys(parsed).length === 0);
        if (empty) parsed = {version: 1, slots: {}};
        else if (legacyBridgeSave(parsed)) parsed = migrateBridgeSave(parsed);
        else {
          // A recognised future game envelope still needs the newer game (never silently reset). Anything
          // that is not this game's envelope (a truncated or foreign document) starts a write-protected
          // session instead of blocking startup.
          const gameEnvelope = parsed && typeof parsed === 'object' && !Array.isArray(parsed) &&
            Number.isFinite(parsed.version) && Object.hasOwn(parsed, 'slots');
          if (gameEnvelope && parsed.version > 1) throw tooNew();
          if (!gameEnvelope || parsed.version !== 1 || !parsed.slots || typeof parsed.slots !== 'object' || Array.isArray(parsed.slots)) {
            if (hosted) { useProtectedFreshSession(); return; }
            throw new Error('Saved progress has an unsupported format');
          }
        }
        for (const [key, [field, version]] of schemas) {
          const value = parsed.slots[key];
          if (value && Number.isFinite(value[field]) && value[field] > version) throw tooNew();
        }
        const settings = parsed.slots['skin-fade-studio-meta-v1']?.settings;
        if (settings && typeof settings === 'object') delete settings.lang;
        envelope = parsed;
        frameBytes = bytesOf(JSON.stringify(Object.assign({}, parsed, {slots: {}})));
        for (const [key, value] of Object.entries(parsed.slots)) entries.set(key, progressEntry(key, value));
        loaded = true;
        acknowledgedCuts = savedCuts(envelope);
        if (HSC.startupTiming) HSC.startupTiming.savesLoaded = performance.now();
      })();
      return loadPromise;
    }
    function savedCuts(value) {
      const meta = value.slots['skin-fade-studio-meta-v1'];
      if (meta?.v !== 1) return 0;
      const cuts = meta.cuts;
      return Number.isSafeInteger(cuts) && cuts > 0 ? cuts : 0;
    }
    function reportScore() {}
    function requireLoaded() {
      if (disposed) throw new Error('Game disposed');
      if (!loaded) throw new Error('Progress is protected until it loads successfully');
    }
    function writeInOrder(write) {
      requireLoaded();
      if (hosted && !cloudWritable) return Promise.reject(cloudUnavailable());
      const pending = queue.catch(() => {}).then(async () => {
        requireLoaded();
        await write();
      });
      queue = pending;
      return pending;
    }
    async function writeEnvelope(snapshot) {
      // web-only:start
      // A newer tab owns the saves now. Check again when the queued write actually runs,
      // so a save queued just before takeover cannot overwrite the active tab.
      if (HSC.otherTab) return;
      // web-only:end
      const data = encodeSave(snapshot), cuts = savedCuts(snapshot);
      if (bytesOf(data) >= 3 * 1024 * 1024) throw tooLarge();
      previewStore.set(data);
      acknowledgedCuts = cuts;
      reportScore();
    }
    function persist() {
      return writeInOrder(async () => {
        const sending = revision;
        // Finish and Continue can ask to save the same progress.
        if (sending === writtenRevision) return;
        await writeEnvelope(envelope);
        writtenRevision = sending;
      });
    }
    function progressEntry(key, value) {
      const text = JSON.stringify(value);
      return {key, text, size: bytesOf(JSON.stringify(key)) + 1 + bytesOf(text)};
    }
    function checkCapacity(updates) {
      const sizes = new Map([...entries].map(([key, entry]) => [key, entry.size]));
      for (const entry of updates) sizes.set(entry.key, entry.size);
      for (const [key, size] of reserved) sizes.set(key, Math.max(sizes.get(key) || 0, size));
      let bytes = frameBytes + Math.max(0, sizes.size - 1);
      for (const size of sizes.values()) bytes += size;
      if (bytes >= 3 * 1024 * 1024) throw tooLarge();
    }
    function setEntry(entry, value) {
      envelope.slots[entry.key] = value;
      entries.set(entry.key, entry);
      revision++;
    }
    async function saveCareerCommit(slotKey, record, pointerKey, pointer) {
      requireLoaded();
      if (hosted && !cloudWritable) throw cloudUnavailable();
      const updates = [progressEntry(slotKey, record), progressEntry(pointerKey, pointer)];
      if (updates.some(entry => reserved.has(entry.key))) throw new Error('Career save already pending');
      for (const entry of updates) reserved.set(entry.key, entry.size);
      try {
        checkCapacity([]);
        await writeInOrder(async () => {
          const sending = revision;
          const slots = {...envelope.slots};
          for (const entry of updates) slots[entry.key] = JSON.parse(entry.text);
          // One YouTube save stores both the committed record and its pointer.
          // Publish them to local readers only after the host acknowledges it.
          await writeEnvelope({...envelope, slots});
          const unchanged = sending === revision;
          for (const entry of updates) setEntry(entry, slots[entry.key]);
          if (unchanged) writtenRevision = revision;
        });
      } finally {
        for (const entry of updates) reserved.delete(entry.key);
      }
    }
    async function flush() {
      requireLoaded();
      if (game?.flush) return game.flush();
      return persist();
    }
    async function advertisement() { return false; }
    function destroy() {
      if (disposed) return;
      disposed = true;
      for (const unsubscribe of cleanup) if (typeof unsubscribe === 'function') unsubscribe();
      for (const callback of [...listeners]) callback(state());
      listeners.clear(); HSC.lifecycle.dispose(); game = null;
      document.documentElement.classList.remove('yt-paused');
      blockGameInteraction(false);
      HSC.setRevealAudio?.(false);
    }
    // The first cloud read and locale lookup are independent. Attach an immediate rejection
    // handler to the eager read; hC still consumes the original rejection and protects saves.
    if (preload) load().catch(() => {});
    const language = globalThis.navigator?.language || 'en';
    return {
      platformId: 'youtube', language: language || 'en', isLocalPreview: !hosted,
      get rewardedSupported() { return false; },
      get cloudProgressAvailable() { return cloudWritable; },
      async loadProgress(key, fallback) { await load(); const value = envelope.slots[key]; return value == null ? fallback : clone(value); },
      async saveProgress(key, value) {
        requireLoaded();
        if (reserved.has(key)) throw new Error('Career save already pending');
        const entry = progressEntry(key, value);
        if (entries.get(key)?.text !== entry.text) {
          checkCapacity([entry]);
          setEntry(entry, JSON.parse(entry.text));
        }
        return persist();
      },
      async deleteProgress(key) {
        requireLoaded();
        if (reserved.has(key)) throw new Error('Career save already pending');
        if (entries.delete(key)) { delete envelope.slots[key]; revision++; }
        return persist();
      },
      saveCareerCommit,
      flushProgress: flush, whenResumed, afterPaint, setPauseReason: pause,
      finishStartup() { pause('startup', false); },
      setUserAudioEnabled(value) { userAudio = !!value; publish(); },
      bindGame(value) { game = value; publish(); },
      onStateChange(callback) { listeners.add(callback); callback(state()); return () => listeners.delete(callback); },
      async gameReady() { await whenResumed(); if (!ready) { ready = true; if (HSC.startupTiming) HSC.startupTiming.gameReady = performance.now(); reportScore(); } },
      showInterstitial: () => advertisement('interstitial'),
      get lastInterstitialRequestAccepted() { return interstitialAccepted; },
      showRewarded: placement => advertisement('rewarded', placement),
      // The legacy game reports completion events here; no external analytics are sent.
      async sendAnalytics() {}, destroy,
    };
  };
})(globalThis.HSC || (globalThis.HSC = {}));
