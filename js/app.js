/* ==========================================================================
   PROJECT JEFI — app.js
   Source of truth for content: PROJECT_JEFI_Storyboard_v1_0_LOCKED.md
   Source of truth for behavior/motion: VISUAL_DESIGN_v1_0.md
   Enhancement pass: bilingual EN/FA content dictionary (no runtime
   translation — every string below is authored, not machine-translated),
   RTL support, atmosphere/parallax, richer ACT VI crate, keepsake block,
   infected-body easter egg.
   No locked story text is altered here — this file only sequences and
   presents it.
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * 0. ENVIRONMENT
   * ------------------------------------------------------------------ */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) document.body.classList.add('no-anim');

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const bdi = (s) => `<bdi dir="ltr">${s}</bdi>`;

  /* ------------------------------------------------------------------ *
   * 1. ICONS — original, line-based, non-official. currentColor themed.
   * ------------------------------------------------------------------ */
  const ICONS = {
    file: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 2h7l3 3v13H5V2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M12 2v3h3" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M7.5 10h5M7.5 12.5h5M7.5 15h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    </svg>`,
    lock: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4.5" y="9" width="11" height="8" rx="1" stroke="currentColor" stroke-width="1.4"/>
      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`,
    classroom: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="4" width="16" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/>
      <path d="M9 15v3M15 15v3M7 21h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M12 7.2v3.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="12" cy="12.4" r="0.9" fill="currentColor"/>
    </svg>`,
    gradeFive: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.4"/>
      <circle cx="12" cy="12" r="4.4" stroke="currentColor" stroke-width="1.4"/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
    </svg>`,
    football: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.4"/>
      <path d="M12 8.4l3 2.2-1.1 3.5H10.1L9 10.6l3-2.2zM12 4v2.2M12 20v-2.2M4.4 9.3l2 .8M17.6 9.3l-2 .8M4.4 15l2-.8M17.6 15l-2-.8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    </svg>`,
    tochal: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 19l5-9 4 5 2.5-4L21 19H2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M5 6l14 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      <rect x="12.4" y="8.7" width="3.4" height="2.6" rx="0.4" transform="rotate(20 12.4 8.7)" stroke="currentColor" stroke-width="1.2"/>
    </svg>`,
    sms: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="1" stroke="currentColor" stroke-width="1.4"/>
      <path d="M8 9h8M8 12.2h8M8 15.4h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M7 17.5l2.4 2.4L14 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>
    </svg>`,
    speakerOn: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 8v4h3l4 3V5L7 8H4z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M13.2 7.2a4 4 0 0 1 0 5.6M15.6 5a7.4 7.4 0 0 1 0 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    </svg>`,
    speakerOff: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 8v4h3l4 3V5L7 8H4z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M13 8l4 4M17 8l-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    </svg>`,
    /* Original, abstract "veteran survivor" silhouette — deliberately not
       a reproduction of any official asset. Locked per storyboard §ACT VI. */
    silhouette: `<svg viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 6c-4 0-7 3-7 7v1.5c-2 .3-3.5 1.8-3.5 3.7 0 2 1.8 3.6 4 3.6h13c2.2 0 4-1.6 4-3.6 0-1.9-1.5-3.4-3.5-3.7V13c0-4-3-7-7-7z"
        fill="currentColor"/>
      <path d="M9 17.5c0-1.2 1.3-2.3 3-2.6M31 17.5c0-1.2-1.3-2.3-3-2.6" stroke="currentColor" stroke-width="1"/>
      <path d="M13 26c0-2.8 3.1-5 7-5s7 2.2 7 5v6l3 22H10l3-22v-6z" fill="currentColor" opacity="0.92"/>
      <path d="M13 32l-5 9M27 32l5 9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`,
    /* Original abstract "fallen infected" — a crumpled prone shape, not a
       reproduction of any official character or artwork. */
    infected: `<svg viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="30" cy="27" rx="26" ry="2.4" fill="black" opacity="0.35"/>
      <path d="M4 20c3-3 7-2 10-4 4-2.5 6-6 10-6 3 0 4 2 7 2 4 0 6-3 10-3 4 0 8 3 11 6 2 2 3 4 2 6-1 2-4 2-7 2-6 0-11-2-16-2-6 0-9 3-15 3-4 0-9-1-12-2-1-.4-1.5-1.8 0-2z"
        fill="currentColor"/>
      <circle cx="14" cy="15" r="2.6" fill="currentColor"/>
      <path d="M12.3 13.6l3.4 3M15.7 13.6l-3.4 3" stroke="var(--warning-red)" stroke-width="0.9" stroke-linecap="round"/>
      <path d="M22 12l3-3M40 11l-2-4M47 15l3-2" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
    </svg>`
  };

  /* ------------------------------------------------------------------ *
   * 2. AUDIO ENGINE — fully synthesized (Web Audio API), no external
   *    files. Silent-by-default, lazy, muted-safe, never autoplays
   *    before the first user gesture.
   * ------------------------------------------------------------------ */
  /* Per-Act mix targets. drone/wind/hiss/pulse are linear gains (all very low);
     cutoff is the drone's low-pass; bpm drives the sub "heartbeat" (0 = none);
     events are the rare distant sounds that can occur in that Act. */
  const SCENES = {
    1: { drone: 0.027, cutoff: 135, wind: 0.010, hiss: 0.007, pulse: 0,    bpm: 0,  events: ['blip', 'static', 'clang'] },
    2: { drone: 0.029, cutoff: 145, wind: 0.011, hiss: 0.008, pulse: 0,    bpm: 0,  events: ['blip', 'static', 'clang'] },
    3: { drone: 0.035, cutoff: 190, wind: 0.015, hiss: 0.006, pulse: 0,    bpm: 0,  events: ['clang', 'creak', 'thud'] },
    5: { drone: 0.042, cutoff: 250, wind: 0.014, hiss: 0.008, pulse: 0.05, bpm: 46, events: ['thud', 'creak', 'blip'] },
    6: { drone: 0.048, cutoff: 215, wind: 0.018, hiss: 0.010, pulse: 0.06, bpm: 54, events: ['clang', 'thud', 'static'] }
  };

  class AudioEngine {
    constructor() {
      this.ctx = null;
      this.master = null;
      this.muted = false;
      this._warm = null;
      this._amb = null;
      this._scene = 1;
    }
    ensure() {
      if (this.ctx) return this.ctx;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try {
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.gain.value = this.muted ? 0 : 0.5;
        this.master.connect(this.ctx.destination);
      } catch (e) { this.ctx = null; }
      return this.ctx;
    }
    unlock() {
      const ctx = this.ensure();
      if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
    }
    setMuted(m) {
      this.muted = m;
      if (this.master) this.master.gain.value = m ? 0 : 0.5;
    }
    _noiseBuffer(duration) {
      const ctx = this.ctx;
      const buffer = ctx.createBuffer(1, Math.max(1, ctx.sampleRate * duration), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      return buffer;
    }
    playNoise({ duration = 0.3, freq = 1500, type = 'bandpass', gain = 0.14 }) {
      const ctx = this.ensure();
      if (!ctx || this.muted) return;
      try {
        const src = ctx.createBufferSource();
        src.buffer = this._noiseBuffer(duration);
        const filter = ctx.createBiquadFilter();
        filter.type = type;
        filter.frequency.value = freq;
        const g = ctx.createGain();
        const now = ctx.currentTime;
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(gain, now + 0.01);
        g.gain.linearRampToValueAtTime(0, now + duration);
        src.connect(filter); filter.connect(g); g.connect(this.master);
        src.start(now); src.stop(now + duration + 0.05);
      } catch (e) { /* audio is optional — fail silent */ }
    }
    playTone({ freq = 440, duration = 0.15, type = 'sine', gain = 0.15, glideTo = null, delay = 0 }) {
      const ctx = this.ensure();
      if (!ctx || this.muted) return;
      try {
        const osc = ctx.createOscillator();
        osc.type = type; osc.frequency.value = freq;
        const g = ctx.createGain();
        const now = ctx.currentTime + delay;
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(gain, now + 0.012);
        g.gain.exponentialRampToValueAtTime(0.001, now + duration);
        if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, now + duration);
        osc.connect(g); g.connect(this.master);
        osc.start(now); osc.stop(now + duration + 0.03);
      } catch (e) { /* audio is optional — fail silent */ }
    }
    staticBurst() { this.playNoise({ duration: 0.6, freq: 2000, type: 'bandpass', gain: 0.1 }); }
    systemBeep() { this.playTone({ freq: 660, duration: 0.16, gain: 0.12 }); this.playTone({ freq: 880, duration: 0.14, gain: 0.09, delay: 0.14 }); }
    scanBlip() { this.playTone({ freq: 1300, duration: 0.07, type: 'square', gain: 0.045 }); }
    uiClick() { this.playTone({ freq: 950, duration: 0.035, type: 'square', gain: 0.05 }); }
    thud() { this.playTone({ freq: 95, duration: 0.4, type: 'sine', gain: 0.2, glideTo: 38 }); }
    chime() { this.playTone({ freq: 1046, duration: 0.5, type: 'triangle', gain: 0.1 }); this.playTone({ freq: 1568, duration: 0.65, type: 'triangle', gain: 0.08, delay: 0.09 }); }
    glitch() { this.playNoise({ duration: 0.18, freq: 3200, type: 'highpass', gain: 0.12 }); }
    tensionPulse() { this.playTone({ freq: 52, duration: 0.5, type: 'sine', gain: 0.08 }); }
    /* short dull impact: filtered noise + a low knock */
    hit() {
      this.playNoise({ duration: 0.12, freq: 900, type: 'lowpass', gain: 0.11 });
      this.playTone({ freq: 150, duration: 0.16, type: 'triangle', gain: 0.1, glideTo: 70 });
    }
    /* restrained collapse: deep thud, a scrape of noise, a faint metal rattle */
    collapse() {
      this.playTone({ freq: 72, duration: 0.55, type: 'sine', gain: 0.2, glideTo: 34 });
      this.playNoise({ duration: 0.4, freq: 450, type: 'lowpass', gain: 0.08 });
      this.playTone({ freq: 1400, duration: 0.18, type: 'triangle', gain: 0.02, delay: 0.32 });
    }
    infectedNoise() {   // startle sting + wet, low groan: short and original
      this.playTone({ freq: 1900, duration: 0.09, type: 'square', gain: 0.03, glideTo: 900 });
      this.playNoise({ duration: 0.24, freq: 520, type: 'lowpass', gain: 0.09, });
      this.playTone({ freq: 150, duration: 0.34, type: 'sawtooth', gain: 0.055, glideTo: 62, delay: 0.05 });
    }
    infectedRise() {   // sharper startle + a quick two-step scramble away
      this.playTone({ freq: 340, duration: 0.2, type: 'sawtooth', gain: 0.09, glideTo: 950 });
      this.playNoise({ duration: 0.16, freq: 1900, type: 'highpass', gain: 0.065 });
      this.playTone({ freq: 95, duration: 0.13, type: 'triangle', gain: 0.07, delay: 0.16, glideTo: 50 });
      this.playTone({ freq: 115, duration: 0.13, type: 'triangle', gain: 0.06, delay: 0.32, glideTo: 58 });
    }
    warmPadStart() {
      const ctx = this.ensure();
      if (!ctx || this.muted || this._warm) return;
      try {
        const o1 = ctx.createOscillator(); o1.type = 'sine'; o1.frequency.value = 130.81;
        const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = 196.0;
        const g = ctx.createGain(); g.gain.value = 0;
        o1.connect(g); o2.connect(g); g.connect(this.master);
        const now = ctx.currentTime;
        g.gain.linearRampToValueAtTime(0.045, now + 2.2);
        o1.start(); o2.start();
        this._warm = { o1, o2, g };
      } catch (e) { /* optional */ }
    }

    /* ---------------- cinematic ambience (synthesized) ----------------
       Layers: a dissonant low drone (a minor-second pair that slowly beats),
       a sub "heartbeat" pulse, slow-moving wind, faint radio hiss, and rare
       distant events (metal clang, far thud, creak, radio blips). Everything
       shares a generated reverb for space. setScene(act) reshapes the mix per
       Act; setTension() tightens it during the ACT VI encounter. All routed
       through this.master, so the mute control silences it all. Starts only
       after the first tap (no autoplay). */
    _impulse(seconds) {
      const ctx = this.ctx, len = Math.floor(ctx.sampleRate * seconds);
      const buf = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let c = 0; c < 2; c++) {
        const d = buf.getChannelData(c);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
      }
      return buf;
    }
    startAmbience() {
      const ctx = this.ensure();
      if (!ctx || this._amb) return;
      try {
        const bed = ctx.createGain(); bed.gain.value = 0; bed.connect(this.master);
        const revIn = ctx.createGain();
        const rev = ctx.createConvolver(); rev.buffer = this._impulse(2.6);
        const revOut = ctx.createGain(); revOut.gain.value = 0.5;
        revIn.connect(rev); rev.connect(revOut); revOut.connect(bed);

        const nodes = [];
        const osc = (type, f) => { const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; nodes.push(o); return o; };
        const loopNoise = (sec) => { const n = ctx.createBufferSource(); n.buffer = this._noiseBuffer(sec); n.loop = true; nodes.push(n); return n; };

        // drone: a deep sub layer + a minor-second pair + octave triangle,
        // warmed by a low-pass. Two independent slow LFOs drift the pair's
        // tuning and the triangle's pitch at different, non-looping rates
        // (23s and 16.7s periods) so the beating never settles into a
        // predictable, "loopy" pulse — it just slowly, unsettlingly moves.
        const droneFilter = ctx.createBiquadFilter(); droneFilter.type = 'lowpass'; droneFilter.frequency.value = 170; droneFilter.Q.value = 0.7;
        const droneGain = ctx.createGain(); droneGain.gain.value = 0;
        const sub = osc('sine', 32);                 // felt more than heard — deepens the whole bed
        const d1 = osc('sine', 55), d2 = osc('sine', 58.27), d3 = osc('triangle', 110.4);
        const detuneLfo = osc('sine', 0.043); const detuneG = ctx.createGain(); detuneG.gain.value = 0.9; detuneLfo.connect(detuneG); detuneG.connect(d2.frequency);
        const lfo = osc('sine', 0.06); const lfoG = ctx.createGain(); lfoG.gain.value = 1.6; lfo.connect(lfoG); lfoG.connect(d3.frequency);
        // very slow overall swell so the bed breathes rather than sitting static (~38s cycle)
        const breathLfo = osc('sine', 0.026); const breathG = ctx.createGain(); breathG.gain.value = 0.0085; breathLfo.connect(breathG); breathG.connect(droneGain.gain);
        sub.connect(droneFilter); d1.connect(droneFilter); d2.connect(droneFilter); d3.connect(droneFilter);
        droneFilter.connect(droneGain); droneGain.connect(bed); droneGain.connect(revIn);

        // wind: band-passed noise whose centre frequency drifts slowly, pitched
        // lower/darker than a surface whistle, on a long non-repeating buffer
        const windSrc = loopNoise(9);
        const windF = ctx.createBiquadFilter(); windF.type = 'bandpass'; windF.frequency.value = 340; windF.Q.value = 1.2;
        const windLfo = osc('sine', 0.037); const windLfoG = ctx.createGain(); windLfoG.gain.value = 160; windLfo.connect(windLfoG); windLfoG.connect(windF.frequency);
        const windGain = ctx.createGain(); windGain.gain.value = 0;
        windSrc.connect(windF); windF.connect(windGain); windGain.connect(bed); windGain.connect(revIn);

        // distant radio hiss with a slow flutter, on a long non-repeating buffer
        const hissSrc = loopNoise(7);
        const hissF = ctx.createBiquadFilter(); hissF.type = 'highpass'; hissF.frequency.value = 3200;
        const hissGain = ctx.createGain(); hissGain.gain.value = 0;
        const trem = osc('sine', 0.3); const tremG = ctx.createGain(); tremG.gain.value = 0.003; trem.connect(tremG); tremG.connect(hissGain.gain);
        hissSrc.connect(hissF); hissF.connect(hissGain); hissGain.connect(bed);

        const pulseGain = ctx.createGain(); pulseGain.gain.value = 0; pulseGain.connect(bed);

        nodes.forEach((n) => n.start());
        bed.gain.linearRampToValueAtTime(1, ctx.currentTime + 3.5);
        this._amb = { bed, revIn, droneFilter, droneGain, windGain, hissGain, pulseGain, nodes,
                      tension: 0, stopped: false, eventTimer: null, pulseTimer: null };
        this._applyScene(1.5);
        this._scheduleEvent();
        this._schedulePulse();
      } catch (e) { /* audio is optional — fail silent */ }
    }
    _applyScene(tc = 1.2) {
      const a = this._amb; if (!a) return;
      const s = SCENES[this._scene] || SCENES[1], t = a.tension, now = this.ctx.currentTime;
      a.droneGain.gain.setTargetAtTime(s.drone * (1 + t * 0.5), now, tc);
      a.droneFilter.frequency.setTargetAtTime(s.cutoff + t * 380, now, tc);
      a.windGain.gain.setTargetAtTime(s.wind * (1 + t * 0.6), now, tc);
      a.hissGain.gain.setTargetAtTime(s.hiss * (1 + t * 0.8), now, tc);
      a.pulseGain.gain.setTargetAtTime(s.pulse ? s.pulse * (1 + t * 0.7) : 0, now, tc);
    }
    setScene(n) { if (SCENES[n]) this._scene = n; this._applyScene(1.6); }
    setTension(t) { if (!this._amb) return; this._amb.tension = Math.max(0, Math.min(1, t)); this._applyScene(0.4); }
    duck(amount = 0.35, seconds = 1.4) {
      const a = this._amb; if (!a) return;
      const now = this.ctx.currentTime;
      a.bed.gain.cancelScheduledValues(now);
      a.bed.gain.setTargetAtTime(amount, now, 0.08);
      a.bed.gain.setTargetAtTime(1, now + seconds, 0.6);
    }
    _schedulePulse() {
      const a = this._amb; if (!a || a.stopped) return;
      const s = SCENES[this._scene], bpm = s && s.bpm ? s.bpm + a.tension * 26 : 0;
      a.pulseTimer = setTimeout(() => { if (bpm && !this.muted) this._thump(); this._schedulePulse(); }, bpm ? 60000 / bpm : 1500);
    }
    _thump() {  // low "lub-dub", felt more than heard (triangle so small speakers still hint at it)
      const ctx = this.ctx, a = this._amb; if (!ctx || !a) return;
      [0, 0.22].forEach((off, i) => {
        const o = ctx.createOscillator(); o.type = 'triangle';
        const g = ctx.createGain(), t0 = ctx.currentTime + off;
        o.frequency.setValueAtTime(i ? 56 : 66, t0); o.frequency.exponentialRampToValueAtTime(34, t0 + 0.22);
        g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(i ? 0.7 : 1, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.27);
        o.connect(g); g.connect(a.pulseGain); o.start(t0); o.stop(t0 + 0.3);
      });
    }
    _scheduleEvent() {
      const a = this._amb; if (!a || a.stopped) return;
      a.eventTimer = setTimeout(() => {
        if (!this._amb || this._amb.stopped) return;
        if (!this.muted) { const list = (SCENES[this._scene] || SCENES[1]).events; this._event(list[Math.floor(Math.random() * list.length)]); }
        this._scheduleEvent();
      }, 19000 + Math.random() * 23000); // very sparse: roughly one distant event every 19–42s
    }
    /* rare distant events: quiet, panned, low-passed and reverberant so they read as "far away" */
    _event(kind) {
      const ctx = this.ctx, a = this._amb; if (!ctx || !a) return;
      const now = ctx.currentTime;
      const out = ctx.createGain(); out.connect(a.bed); out.connect(a.revIn);
      let dst = out;
      if (ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = Math.random() * 1.6 - 0.8; p.connect(out); dst = p; }
      const far = ctx.createBiquadFilter(); far.type = 'lowpass'; far.frequency.value = 2000; far.connect(dst);
      const tone = (f, dur, type, g, delay = 0, glide = null) => {
        const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, now + delay);
        if (glide) o.frequency.exponentialRampToValueAtTime(glide, now + delay + dur);
        const e = ctx.createGain(); e.gain.setValueAtTime(0, now + delay);
        e.gain.linearRampToValueAtTime(g, now + delay + 0.012); e.gain.exponentialRampToValueAtTime(0.0008, now + delay + dur);
        o.connect(e); e.connect(far); o.start(now + delay); o.stop(now + delay + dur + 0.05);
      };
      const noise = (dur, freq, g, type = 'bandpass') => {
        const n = ctx.createBufferSource(); n.buffer = this._noiseBuffer(dur);
        const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq;
        const e = ctx.createGain(); e.gain.setValueAtTime(0, now); e.gain.linearRampToValueAtTime(g, now + 0.02); e.gain.linearRampToValueAtTime(0, now + dur);
        n.connect(f); f.connect(e); e.connect(far); n.start(now); n.stop(now + dur + 0.05);
      };
      if (kind === 'clang') {                  // inharmonic partials = distant struck metal
        const base = 420 + Math.random() * 220;
        [[1, 0.05, 1.7], [2.76, 0.03, 1.1], [5.4, 0.018, 0.7], [8.93, 0.01, 0.4]].forEach(([m, g, d]) => tone(base * m, d, 'sine', g));
      } else if (kind === 'thud') {            // something heavy, far off
        tone(72, 0.55, 'sine', 0.1, 0, 32); noise(0.3, 260, 0.05, 'lowpass');
      } else if (kind === 'creak') {           // slow groan of stressed metal/wood
        const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.setValueAtTime(210, now); o.frequency.exponentialRampToValueAtTime(140, now + 1.2);
        const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 8; f.frequency.setValueAtTime(520, now); f.frequency.exponentialRampToValueAtTime(360, now + 1.2);
        const e = ctx.createGain(); e.gain.setValueAtTime(0, now); e.gain.linearRampToValueAtTime(0.022, now + 0.4); e.gain.linearRampToValueAtTime(0, now + 1.25);
        o.connect(f); f.connect(e); e.connect(far); o.start(now); o.stop(now + 1.3);
      } else if (kind === 'blip') {            // a distant radio picking up something
        tone(1180, 0.07, 'sine', 0.02); tone(1180, 0.07, 'sine', 0.02, 0.16); tone(880, 0.12, 'sine', 0.02, 0.34);
      } else {                                 // 'static': a short crackle of interference
        noise(0.35, 1800, 0.03);
      }
    }
    /* soft rising air-swell on every Act change */
    transition() {
      const ctx = this.ctx; if (!ctx || this.muted) return;
      const now = ctx.currentTime;
      const src = ctx.createBufferSource(); src.buffer = this._noiseBuffer(1.1);
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.2;
      f.frequency.setValueAtTime(300, now); f.frequency.exponentialRampToValueAtTime(2200, now + 0.9);
      const g = ctx.createGain(); g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(0.05, now + 0.5); g.gain.linearRampToValueAtTime(0, now + 1.0);
      src.connect(f); f.connect(g); g.connect(this.master); if (this._amb) g.connect(this._amb.revIn);
      src.start(now); src.stop(now + 1.15);
      this.playTone({ freq: 46, duration: 0.9, type: 'sine', gain: 0.06, glideTo: 62 });
    }
    /* ACT VI arrival: a distant rotor-like pass that swells and recedes */
    flyover() {
      const ctx = this.ctx; if (!ctx || this.muted) return;
      const now = ctx.currentTime, dur = 3.6;
      const src = ctx.createBufferSource(); src.buffer = this._noiseBuffer(dur);
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 0.9;
      f.frequency.setValueAtTime(180, now); f.frequency.linearRampToValueAtTime(380, now + dur * 0.5); f.frequency.linearRampToValueAtTime(200, now + dur);
      const am = ctx.createGain(); am.gain.value = 0.5;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 9; const lfoG = ctx.createGain(); lfoG.gain.value = 0.5; lfo.connect(lfoG); lfoG.connect(am.gain);
      const env = ctx.createGain(); env.gain.setValueAtTime(0, now); env.gain.linearRampToValueAtTime(0.06, now + dur * 0.5); env.gain.linearRampToValueAtTime(0, now + dur);
      let tail = env;
      src.connect(f); f.connect(am); am.connect(env);
      if (ctx.createStereoPanner) {
        const p = ctx.createStereoPanner(); p.pan.setValueAtTime(-0.7, now); p.pan.linearRampToValueAtTime(0.7, now + dur); env.connect(p); tail = p;
      }
      tail.connect(this.master); if (this._amb) tail.connect(this._amb.revIn);
      src.start(now); lfo.start(now); src.stop(now + dur + 0.05); lfo.stop(now + dur + 0.05);
    }
    /* the crate opens: dread resolves into a warm major swell */
    revealSwell() {
      const ctx = this.ctx; if (!ctx || this.muted) return;
      const now = ctx.currentTime;
      [146.83, 220, 293.66, 369.99].forEach((f, i) => {
        const o = ctx.createOscillator(); o.type = i % 2 ? 'sine' : 'triangle'; o.frequency.value = f;
        const g = ctx.createGain(); g.gain.setValueAtTime(0, now + i * 0.06);
        g.gain.linearRampToValueAtTime(0.03, now + 0.6 + i * 0.06); g.gain.exponentialRampToValueAtTime(0.0008, now + 3.6);
        o.connect(g); g.connect(this.master); if (this._amb) g.connect(this._amb.revIn);
        o.start(now); o.stop(now + 3.7);
      });
      this.duck(0.45, 2.2);
    }
    fileOpen() {
      this.playNoise({ duration: 0.16, freq: 1400, type: 'bandpass', gain: 0.045 });
      this.playTone({ freq: 210, duration: 0.24, type: 'sine', gain: 0.05, glideTo: 150 });
    }
    achievement() {   // small, soft two-note "unlocked" ping
      this.playTone({ freq: 880, duration: 0.35, type: 'triangle', gain: 0.06 });
      this.playTone({ freq: 1320, duration: 0.5, type: 'triangle', gain: 0.05, delay: 0.11 });
    }
    stopAmbience(fadeSeconds = 1.5) {
      const amb = this._amb;
      if (!amb) return;
      amb.stopped = true;
      clearTimeout(amb.eventTimer); clearTimeout(amb.pulseTimer);
      try {
        const now = this.ctx.currentTime;
        amb.bed.gain.cancelScheduledValues(now);
        amb.bed.gain.setTargetAtTime(0, now, fadeSeconds / 3);
        setTimeout(() => amb.nodes.forEach((n) => { try { n.stop(); } catch (e) { /* already stopped */ } }), fadeSeconds * 1000 + 300);
      } catch (e) { /* optional */ }
      this._amb = null;
    }
  }
  const audio = new AudioEngine();

  /* ------------------------------------------------------------------ *
   * 3. TYPEWRITER — reveals text one unit at a time. EN uses per-
   *    character units (fine for Latin script). FA uses per-WORD units:
   *    Persian is cursive-joined, so wrapping individual characters in
   *    separate spans breaks letterform shaping — words are the smallest
   *    safe unit. Full text is always present in the DOM immediately
   *    (screen readers get it right away); only visual opacity staggers.
   * ------------------------------------------------------------------ */
  function typeText(container, text, opts = {}) {
    const { charDelay = 26, lineGap = 260, startDelay = 0, instant = false, granularity = 'char' } = opts;
    container.innerHTML = '';
    const reduced = document.body.classList.contains('no-anim') || instant;
    const lines = text.split('\n');
    let cumulative = startDelay;
    const unitDelay = granularity === 'word' ? Math.max(charDelay * 4, 90) : charDelay;
    lines.forEach((line) => {
      const lineEl = document.createElement('span');
      lineEl.className = 'tw-line';
      if (line.length === 0) {
        lineEl.innerHTML = '&nbsp;';
      } else if (granularity === 'word') {
        const tokens = line.split(/(\s+)/).filter((t) => t.length > 0);
        tokens.forEach((tok) => {
          const span = document.createElement('span');
          span.className = 'tw-char';
          span.textContent = tok;
          if (!reduced) span.style.animationDelay = cumulative + 'ms';
          lineEl.appendChild(span);
          if (tok.trim().length > 0) cumulative += unitDelay;
        });
      } else {
        Array.from(line).forEach((ch) => {
          const span = document.createElement('span');
          span.className = 'tw-char';
          span.textContent = ch;
          if (!reduced) span.style.animationDelay = cumulative + 'ms';
          lineEl.appendChild(span);
          cumulative += charDelay;
        });
      }
      container.appendChild(lineEl);
      cumulative += lineGap;
    });
    return reduced ? 0 : cumulative;
  }

  /* ------------------------------------------------------------------ *
   * 4. CONTENT — bilingual dictionary. EN is verbatim from
   *    PROJECT_JEFI_Storyboard_v1_0_LOCKED.md. FA is an original,
   *    natively-written Persian rendering of the same lines (not a
   *    machine translation) preserving tone, dry humor, and pacing.
   *
   *    TERMINOLOGY POLICY (applied consistently everywhere below):
   *    - Product name "LEFT 4 DEAD 2", ACT labels, and every .log
   *      filename stay in Latin in both languages (never translated).
   *    - Names used as system/dossier tag VALUES (RECIPIENT:, SENDER:,
   *      the ID-card NAME field) stay in Latin caps, matching the other
   *      all-caps tag values around them (STATUS: ACTIVE, etc).
   *    - Names used in ACT VII's warm narrative prose (the one place a
   *      name appears in flowing, personal sentence rather than a
   *      system tag) use natural Persian spelling (امیر) — Latin script
   *      there would read as a foreign intrusion in the one moment the
   *      site stops sounding like a system and starts sounding human.
   *    - Any Latin/technical run inside a Persian string is wrapped in
   *      bdi() at render time for correct bidi isolation.
   * ------------------------------------------------------------------ */
  const CONTENT = {
    en: {
      pageTitle: 'SURVIVOR FILE // 002',
      pageDescription: 'A classified survivor database. Something is hidden inside it.',
      h1: 'Project Jefi — a survivor file',
      headerStatus: 'SECURE CHANNEL // REC',
      muteLabel: 'Mute sound',
      unmuteLabel: 'Unmute sound',

      act1Body: '[ SIGNAL DETECTED ]\n\nINCOMING TRANSMISSION...\n\n> ESTABLISHING SECURE CONNECTION\n> DECRYPTING SOURCE...',
      act1Cta: '[ TAP TO RECEIVE ]',

      act2LabelTitle: 'SURVIVOR FILE',
      act2Rows: [
        { label: 'NAME', value: 'AMIR-MOHAMMAD "JEFI" JAFAR' },
        { label: 'STATUS', value: 'ACTIVE', status: true },
        { label: 'FIRST CONTACT', value: 'GRADE 3, ELEMENTARY SCHOOL' },
        { label: 'SURVIVING TOGETHER SINCE', value: 'GRADE 03' }
      ],
      act2Cta: '[ TAP TO VIEW ARCHIVE ]',

      act3Heading: 'ARCHIVE ACCESS GRANTED',
      act3Sub: '5 INCIDENT FILES FOUND',
      act3Prompt: '[ SELECT A FILE TO CONTINUE ]',
      act3Continue: '[ CONTINUE ]',
      incidentLogLabel: 'INCIDENT LOG',
      fileLabel: 'FILE',
      declassifiedTag: '[DECLASSIFIED]',
      archiveBack: '\u2039 ARCHIVE',
      statusAvailable: 'AVAILABLE',
      statusClassified: 'CLASSIFIED',
      statusDeclassified: 'DECLASSIFIED',
      ariaClassifiedLocked: 'Classified file, locked until two other files are opened',
      ariaClassifiedUnlockable: 'Classified file, tap to declassify',
      ariaOpenFilePrefix: 'Open ',
      announceStillClassified: 'File still classified. Open two more files first.',

      act5Label: 'ARCHIVE COMPLETE.',
      act5Heading: 'ONE MISSION REMAINS.',
      act5Objective: 'OBJECTIVE: SURVIVE ANOTHER YEAR.',
      act5Difficulty: 'DIFFICULTY: UNKNOWN.',
      act5BackupLabel: 'BACKUP:',
      act5BackupValue: 'CONFIRMED.',
      act5Cta: '[ ACCEPT MISSION ]',

      act6Heading: '[ SUPPLY DROP INCOMING ]',
      act6Cta: '[ TAP TO CONFIRM DELIVERY ]',
      act6ContentsLabel: 'CONTENTS:',
      act6Title: 'LEFT 4 DEAD 2',
      act6RecipientLabel: 'RECIPIENT:',
      act6RecipientValue: 'JEFI',
      act6SenderLabel: 'SENDER:',
      act6SenderValue: 'AMIR',
      act6Continue: '[ CONTINUE ]',
      act6Hint: 'HOSTILE BLOCKING THE DROP. TAP TO ENGAGE.',
      act6HintDown: 'HOSTILE DOWN. DROP ZONE CLEAR.',
      foeLabel: 'Infected blocking the supply crate. Tap to hit it.',
      foeLabelDown: 'The infected is down.',

      act7Lines: ['SYSTEM OVERRIDE', 'THIS WAS NEVER A SYSTEM.', 'IT WAS ME.'],
      act7Signature: '\u2014 AMIR',
      act7Message: 'Jefi, happy birthday.\n\nIf there\u2019s one thing I\u2019ve learned from all these years, it\u2019s that life is more like a strange mission than a precise plan.\n\nWe\u2019re not always meant to know what the next stage is, or for everything to go according to plan.\n\nWhat matters is that, in the middle of all these adventures, we don\u2019t lose ourselves \u2014 and we don\u2019t forget that sometimes you just have to laugh and keep going.\n\nSo don\u2019t take it too hard; the world is already hard enough on its own.\n\nLive, make memories, and enjoy the journey.\n\nHappy birthday, buddy.\n\n\u2014 AMIR',
      act7Cta: '[ KEEP THIS FILE ]',
      act7KeptNote: 'File kept.',

      keepsakeTitle: "A SURVIVOR'S KEEPSAKE",
      keepsakeCaption: 'A frame from the fight. Yours to keep.',
      keepsakeSaveCta: 'SAVE THIS MEMORY',

      silhouetteEggLabel: "An old survivor's silhouette, half-forgotten in the corner.",
      infectedEggLabel: 'Something in the corner. Probably nothing.',
      infectedToastTitle1: 'FIELD DISCOVERY',
      infectedToastBody1: 'STATUS: DEFINITELY DEAD',
      infectedToastBody1Updated: 'STATUS: NOT DEAD.',
      infectedToastTitle2: 'ACHIEVEMENT UNLOCKED',
      infectedToastBody2: 'YOU LOOKED CLOSER.'
    },

    fa: {
      pageTitle: 'پرونده بازمانده // شناسه ۰۰۲',
      pageDescription: 'یک پایگاه‌داده‌ی محرمانه از بازمانده‌ها. یک چیزی توی آن پنهان است.',
      h1: 'پروژه جفی — یک پرونده‌ی بازمانده',
      headerStatus: 'کانال امن // ضبط',
      muteLabel: 'قطع صدا',
      unmuteLabel: 'فعال‌سازی صدا',

      act1Body: '[ سیگنال شناسایی شد ]\n\nدر حال دریافت ارسال...\n\n> برقراری ارتباط امن\n> در حال رمزگشایی منبع...',
      act1Cta: '[ لمس کن برای دریافت ]',

      act2LabelTitle: 'پرونده‌ی بازمانده',
      act2Rows: [
        { label: 'نام', value: 'AMIR-MOHAMMAD "JEFI" JAFAR' },
        { label: 'وضعیت', value: 'فعال', status: true },
        { label: 'اولین برخورد', value: 'کلاس سوم، دبستان' },
        { label: 'بقای مشترک، از', value: 'کلاس سوم' }
      ],
      act2Cta: '[ لمس کن برای مشاهده\u200cی آرشیو ]',

      act3Heading: 'دسترسی به آرشیو تأیید شد',
      act3Sub: '۵ پرونده‌ی حادثه پیدا شد',
      act3Prompt: '[ یک فایل را برای ادامه انتخاب کن ]',
      act3Continue: '[ ادامه ]',
      incidentLogLabel: 'گزارش حادثه',
      fileLabel: 'فایل',
      declassifiedTag: '[افشا شده]',
      archiveBack: '\u2039 آرشیو',
      statusAvailable: 'در دسترس',
      statusClassified: 'محرمانه',
      statusDeclassified: 'افشا شده',
      ariaClassifiedLocked: 'فایل محرمانه؛ قفل تا باز شدن دو فایل دیگر',
      ariaClassifiedUnlockable: 'فایل محرمانه، برای افشا لمس کن',
      ariaOpenFilePrefix: 'باز کردن ',
      announceStillClassified: 'این فایل هنوز محرمانه است. اول دو فایل دیگر را باز کن.',

      act5Label: 'آرشیو کامل شد.',
      act5Heading: 'یک مأموریت باقی مانده.',
      act5Objective: 'هدف: یک سال دیگر دوام بیاور.',
      act5Difficulty: 'سطح سختی: نامشخص.',
      act5BackupLabel: 'پشتیبانی:',
      act5BackupValue: 'تأیید شد.',
      act5Cta: '[ پذیرفتن مأموریت ]',

      act6Heading: '[ محموله در حال رسیدن است ]',
      act6Cta: '[ لمس کن برای تأیید دریافت ]',
      act6ContentsLabel: 'محتویات:',
      act6Title: 'LEFT 4 DEAD 2',
      act6RecipientLabel: 'گیرنده:',
      act6RecipientValue: 'JEFI',
      act6SenderLabel: 'فرستنده:',
      act6SenderValue: 'AMIR',
      act6Continue: '[ ادامه ]',
      act6Hint: 'یک آلوده جلوی محموله را گرفته. برای درگیری لمس کن.',
      act6HintDown: 'آلوده از پا افتاد. مسیر محموله باز است.',
      foeLabel: 'آلوده‌ای که جلوی محموله را گرفته. برای ضربه زدن لمس کن.',
      foeLabelDown: 'آلوده از پا افتاده است.',

      act7Lines: ['تسخیر سیستم', 'این هیچ‌وقت یک سیستم نبود.', 'من بودم.'],
      act7Signature: '\u2014 امیر',
      act7Message: 'جفی، تولدت مبارک.\n\nاگر از تمام این سال\u200cها یک چیز یاد گرفته باشم، این است که زندگی بیشتر شبیه یک مأموریت عجیب است تا یک نقشه\u200cی دقیق.\n\nهمیشه قرار نیست بدانیم مرحله\u200cی بعد چیست، یا همه\u200cچیز طبق برنامه پیش برود.\n\nمهم این است که وسط تمام این ماجراها، خودمان را گم نکنیم و یادمان نرود گاهی فقط باید خندید و ادامه داد.\n\nپس زیادی سخت نگیر؛ دنیا خودش به اندازه\u200cی کافی سخت هست.\n\nزندگی کن، خاطره بساز و از مسیر لذت ببر.\n\nتولدت مبارک، رفیق.\n\n\u2014 امیر',
      act7Cta: '[ این فایل رو نگه دار ]',
      act7KeptNote: 'نگه داشته شد.',

      keepsakeTitle: 'یادگاری یک بازمانده',
      keepsakeCaption: 'یک قاب از این نبرد. مال خودت، برای همیشه.',
      keepsakeSaveCta: 'این خاطره رو نگه دار',

      silhouetteEggLabel: 'سایه‌ی یک بازمانده‌ی قدیمی، فراموش‌شده در گوشه‌ای.',
      infectedEggLabel: 'یه چیزی توی گوشه هست. احتمالاً چیزی نیست.',
      infectedToastTitle1: 'کشف میدانی',
      infectedToastBody1: 'وضعیت: صد در صد مرده',
      infectedToastBody1Updated: 'وضعیت: مرده نبود.',
      infectedToastTitle2: 'دستاورد باز شد',
      infectedToastBody2: 'دقیق‌تر نگاه کردی.'
    }
  };

  /* INCIDENTS: filenames are identical across languages (never translated —
     they are system identifiers). bodyLines are the narrative paragraph
     only; the "INCIDENT LOG // <file>" / "FILE: <file>" header lines are
     assembled at render time so the filename can be bdi-isolated. */
  const INCIDENTS = [
    {
      id: 'classroom', icon: 'classroom', file: 'CLASSROOM_INCIDENT.log', theme: 'default',
      bodyLines: {
        en: 'DURING A CLASS, TWO SURVIVORS COULD NOT STOP LAUGHING.\nTHE INSTRUCTOR WAS NOT AMUSED.\nCLASSIFICATION: MAXIMUM DISRUPTION, ZERO REGRET.',
        fa: 'سر یک کلاس، دو بازمانده اصلاً نمی‌تونستن جلوی خنده‌شون رو بگیرن.\nمعلم اصلاً خوشش نیومد.\nطبقه‌بندی: حداکثر اخلال، صفر پشیمانی.'
      }
    },
    {
      id: 'grade-five', icon: 'gradeFive', file: 'GRADE_FIVE.log', theme: 'default',
      bodyLines: {
        en: 'SURVIVOR WAS SUBJECT TO... "TACTICAL TEASING"\nBY TWO FELLOW CADETS.\nLOOKING BACK: MOSTLY HARMLESS. MOSTLY.',
        fa: 'بازمانده هدف یه سری... «اذیت‌های تاکتیکی» قرار گرفت\nاز طرف دو تا هم‌رزم دیگه.\nحالا که فکرش رو می‌کنیم: بیشترش بی‌ضرر بود. بیشترش.'
      }
    },
    {
      id: 'football', icon: 'football', file: 'FOOTBALL.log', theme: 'default',
      bodyLines: {
        en: 'MULTIPLE JOINT OPERATIONS ON THE FIELD.\nRESULT: STRONGER BOND, WORSE KNEES.',
        fa: 'چندین عملیات مشترک توی زمین.\nنتیجه: پیوند قوی‌تر، زانوهای داغون‌تر.'
      }
    },
    {
      id: 'tochal', icon: 'tochal', file: 'TOCHAL_EXPEDITION.log', theme: 'cold-blue',
      bodyLines: {
        en: 'A COLD-WEATHER EXPEDITION TO HIGHER GROUND.\nCABLE TRANSIT SECURED. NEW TERRITORY DISCOVERED.\nONE OF THE FEW MISSIONS WORTH REMEMBERING IN FULL DETAIL.',
        fa: 'یک عملیات در هوای سرد به سمت ارتفاعات.\nعبور با تله‌کابین با موفقیت انجام شد. قلمرو جدید کشف شد.\nیکی از معدود مأموریت‌هایی که ارزش داره با تمام جزئیات به یاد بمونه.'
      }
    },
    {
      id: 'sms', icon: 'sms', file: '[ REDACTED ].log', declassifiedFile: 'PSYOP_INCIDENT.log', theme: 'default', gated: true,
      bodyLines: {
        en: 'ONE SURVIVOR CONDUCTED A SUSTAINED COMMUNICATION ASSAULT\nON THE OTHER. TARGET WAS, BRIEFLY, VERY CONCERNED.\nUPON IDENTIFYING THE SOURCE: FULL DECLASSIFICATION TO LAUGHTER.\nSTATUS: FORGIVEN. NEVER FORGOTTEN.',
        fa: 'یک بازمانده یه حمله‌ی ارتباطیِ بی‌وقفه\nروی اون یکی انجام داد. هدف، برای مدت کوتاهی، واقعاً نگران شد.\nبعد از شناسایی منبع: افشای کامل، تبدیل به خنده.\nوضعیت: بخشیده شد. هیچ‌وقت فراموش نشد.'
      }
    }
  ];

  /* ------------------------------------------------------------------ *
   * 5. STATE
   * ------------------------------------------------------------------ */
  let savedLang = 'en';
  try { savedLang = sessionStorage.getItem('jefi_lang') || 'en'; } catch (e) { /* private mode etc */ }

  const state = {
    lang: savedLang === 'fa' ? 'fa' : 'en',
    currentAct: 1,
    openedIncidents: new Set(),
    smsDeclassified: false,
    openIncidentId: null,
    infectedFound: false,
    infectedTaps: 0,
    infectedRisen: false,
    foeHits: 0,
    foeDown: false,
    crateOpened: false
  };
  const L = () => CONTENT[state.lang];

  /* ------------------------------------------------------------------ *
   * 6. DOM REFS
   * ------------------------------------------------------------------ */
  const header = $('#system-header');
  const statusDot = $('#status-dot');
  const muteToggle = $('#mute-toggle');
  const langEnBtn = $('#lang-en');
  const langFaBtn = $('#lang-fa');
  const acts = { 1: $('#act-1'), 2: $('#act-2'), 3: $('#act-3'), 5: $('#act-5'), 6: $('#act-6'), 7: $('#act-7') };
  const incidentView = $('#incident-view');
  const bound = new Set();
  function ensureBound(n, fn) { if (!bound.has(n)) { fn(); bound.add(n); } }

  function pulseHeader() {
    statusDot.classList.add('status-dot--active');
    setTimeout(() => statusDot.classList.remove('status-dot--active'), 500);
  }

  let announcer;
  function announce(msg) {
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.className = 'visually-hidden';
      announcer.setAttribute('aria-live', 'polite');
      document.body.appendChild(announcer);
    }
    announcer.textContent = '';
    requestAnimationFrame(() => { announcer.textContent = msg; });
  }

  /* ------------------------------------------------------------------ *
   * 7. ACT NAVIGATION
   * ------------------------------------------------------------------ */
  function hideAct(n) {
    const el = acts[n];
    if (!el) return;
    el.hidden = true;
  }

  function goToAct(n, { flicker = false } = {}) {
    const from = acts[state.currentAct];
    const to = acts[n];
    const reduced = document.body.classList.contains('no-anim');
    const fadeDuration = n === 7 ? 1000 : 320;
    pulseHeader();

    const mount = () => {
      if (from && from !== to) hideAct(state.currentAct);
      to.hidden = false;
      to.classList.add('is-entering');
      state.currentAct = n;
      if (n === 7) {
        document.body.classList.add('theme-warm');
        audio.stopAmbience();
        audio.warmPadStart();
      } else {
        audio.setScene(n);
      }
      audio.transition();
      if (n === 6) setTimeout(() => audio.flyover(), 500);
      requestAnimationFrame(() => requestAnimationFrame(() => to.classList.remove('is-entering')));
      ACT_INIT[n] && ACT_INIT[n](false);
    };

    if (flicker && !reduced) {
      from.classList.add('is-flickering');
      setTimeout(() => { from.classList.remove('is-flickering'); mount(); }, 250);
      return;
    }

    if (from && from !== to && !reduced) {
      from.classList.add('is-exiting');
      setTimeout(() => { from.classList.remove('is-exiting'); mount(); }, fadeDuration);
    } else {
      mount();
    }
  }

  /* ------------------------------------------------------------------ *
   * 8. ACT I — THE TRANSMISSION
   * ------------------------------------------------------------------ */
  function bindAct1() {
    const cta = $('#act1-cta');
    cta.addEventListener('click', () => {
      audio.unlock();
      audio.staticBurst();
      setTimeout(() => audio.systemBeep(), 150);
      audio.startAmbience();
      cta.classList.add('is-pressed');
      setTimeout(() => goToAct(2, { flicker: true }), 180);
    });
  }
  function renderAct1(instant) {
    const t = L();
    const body = $('#act1-body');
    const cta = $('#act1-cta');
    cta.textContent = t.act1Cta;
    if (!instant) cta.style.visibility = 'hidden';
    const gran = state.lang === 'fa' ? 'word' : 'char';
    const total = typeText(body, t.act1Body, { charDelay: 24, lineGap: 320, instant, granularity: gran });
    if (instant) cta.style.visibility = 'visible';
    else setTimeout(() => { cta.style.visibility = 'visible'; }, total);
  }
  function initAct1(instant) { ensureBound(1, bindAct1); renderAct1(instant); }

  /* ------------------------------------------------------------------ *
   * 9. ACT II — SURVIVOR IDENTIFIED
   * ------------------------------------------------------------------ */
  function bindAct2() {
    const cta = $('#act2-cta');
    cta.addEventListener('click', () => {
      audio.uiClick();
      cta.classList.add('is-pressed');
      setTimeout(() => goToAct(3), 200);
    });
  }
  function renderAct2(instant) {
    const t = L();
    const labelTitle = $('#act2-label-title');
    const rowsWrap = $('#act2-rows');
    const cta = $('#act2-cta');
    const keyart = $('#act2-keyart');
    labelTitle.textContent = t.act2LabelTitle;
    cta.textContent = t.act2Cta;
    rowsWrap.innerHTML = '';
    const reduced = document.body.classList.contains('no-anim') || instant;
    t.act2Rows.forEach((row) => {
      const rowEl = document.createElement('div');
      rowEl.className = 'dossier__row' + (reduced ? '' : ' is-redacted');
      rowEl.innerHTML = `
        <span class="dossier__label">${row.label}</span>
        <span class="dossier__value">${row.status ? '<span class="status-indicator"><span class="status-indicator__dot"></span>' + row.value + '</span>' : row.value}</span>
        <span class="scan-line" aria-hidden="true"></span>`;
      rowsWrap.appendChild(rowEl);
    });
    const rowEls = $$('.dossier__row', rowsWrap);
    if (reduced) {
      keyart.classList.add('is-focused');
      cta.style.visibility = 'visible';
    } else {
      cta.style.visibility = 'hidden';
      rowEls.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('is-scanning');
          audio.scanBlip();
          setTimeout(() => el.classList.remove('is-redacted'), 260);
        }, i * 380);
      });
      setTimeout(() => keyart.classList.add('is-focused'), 200);
      setTimeout(() => { cta.style.visibility = 'visible'; }, rowEls.length * 380 + 300);
    }
  }
  function initAct2(instant) { ensureBound(2, bindAct2); renderAct2(instant); }

  /* ------------------------------------------------------------------ *
   * 10. ACT III — THE MEMORY ARCHIVE (index)
   * ------------------------------------------------------------------ */
  function renderArchiveList(animate) {
    const t = L();
    const list = $('#archive-list');
    list.innerHTML = '';
    INCIDENTS.forEach((inc, i) => {
      const li = document.createElement('li');
      li.className = 'archive-item';
      const opened = state.openedIncidents.has(inc.id);
      const gateMet = state.openedIncidents.size >= 2;
      const stillLocked = inc.gated && !opened;

      if (stillLocked) {
        li.classList.add('archive-item--locked');
        if (gateMet) li.classList.add('is-unlockable');
      }

      const displayName = stillLocked ? inc.file : (inc.gated ? inc.declassifiedFile : inc.file);
      const statusText = stillLocked ? t.statusClassified : (inc.gated ? t.statusDeclassified : t.statusAvailable);
      const iconKey = stillLocked ? 'lock' : inc.icon;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'archive-item__button' + (animate ? '' : ' is-instant');
      btn.style.setProperty('--stagger-delay', animate ? (i * 90) + 'ms' : '0ms');
      btn.setAttribute('aria-label', stillLocked
        ? (gateMet ? t.ariaClassifiedUnlockable : t.ariaClassifiedLocked)
        : t.ariaOpenFilePrefix + displayName);
      btn.innerHTML = `
        <span class="archive-item__icon">${ICONS[iconKey]}</span>
        <span class="archive-item__name">&gt;&nbsp;${bdi(displayName)}</span>
        <span class="archive-item__status">${statusText}</span>
      `;
      btn.addEventListener('click', () => onIncidentTap(inc, btn));
      li.appendChild(btn);
      list.appendChild(li);
    });

    const continueCta = $('#act3-cta');
    if (continueCta) {
      continueCta.style.visibility = state.openedIncidents.size >= INCIDENTS.length ? 'visible' : 'hidden';
    }
  }

  function onIncidentTap(inc, btnEl) {
    const t = L();
    const gateMet = state.openedIncidents.size >= 2;
    if (inc.gated && !state.openedIncidents.has(inc.id) && !gateMet) {
      audio.uiClick();
      btnEl.classList.add('is-glitching');
      setTimeout(() => btnEl.classList.remove('is-glitching'), 200);
      announce(t.announceStillClassified);
      return;
    }
    audio.uiClick();

    if (inc.gated && !state.smsDeclassified) {
      btnEl.classList.add('is-glitching');
      audio.glitch();
      setTimeout(() => {
        state.smsDeclassified = true;
        openIncident(inc);
      }, 190);
      return;
    }
    openIncident(inc);
  }

  /* ------------------------------------------------------------------ *
   * 11. ACT IV — INCIDENT REPORTS (full-screen overlay over ACT III)
   * ------------------------------------------------------------------ */
  function renderIncidentContent(inc) {
    const t = L();
    const icon = $('#incident-icon');
    const title = $('#incident-title');
    const body = $('#incident-body');
    icon.innerHTML = ICONS[inc.icon];
    incidentView.classList.toggle('theme-cold-blue', inc.theme === 'cold-blue');
    title.textContent = t.incidentLogLabel;

    const filename = inc.gated ? inc.declassifiedFile : inc.file;
    let headerHtml;
    if (inc.gated) {
      headerHtml = `${t.incidentLogLabel} // ${t.declassifiedTag}\n${t.fileLabel}: ${bdi(filename)}`;
    } else {
      headerHtml = `${t.incidentLogLabel} // ${bdi(filename)}`;
    }
    const narrative = inc.bodyLines[state.lang] || inc.bodyLines.en;
    body.innerHTML = `${headerHtml}\n\n${narrative}`;
  }

  function openIncident(inc) {
    state.openIncidentId = inc.id;
    audio.fileOpen();
    renderIncidentContent(inc);
    incidentView.hidden = false;
    requestAnimationFrame(() => incidentView.classList.add('is-open'));
    state.openedIncidents.add(inc.id);
    renderArchiveList(false);
  }

  function closeIncident() {
    incidentView.classList.remove('is-open');
    state.openIncidentId = null;
    setTimeout(() => { incidentView.hidden = true; }, 260);
  }

  /* ------------------------------------------------------------------ *
   * 12. ACT V — THE LAST MISSION
   * ------------------------------------------------------------------ */
  function bindAct5() {
    const cta = $('#act5-cta');
    cta.addEventListener('click', () => {
      audio.uiClick();
      cta.classList.add('is-pressed');
      setTimeout(() => goToAct(6), 200);
    });
  }
  function renderAct5(instant) {
    const t = L();
    const label = $('#act5-label');
    const heading = $('#act5-heading');
    const objective = $('#act5-objective');
    const difficulty = $('#act5-difficulty');
    const backup = $('#act5-backup');
    const fill = $('#act5-fill');
    const cta = $('#act5-cta');

    label.textContent = t.act5Label;
    heading.textContent = t.act5Heading;
    objective.textContent = t.act5Objective;
    difficulty.textContent = t.act5Difficulty;
    backup.querySelector('.backup-label').textContent = t.act5BackupLabel;
    backup.querySelector('.status-value').textContent = t.act5BackupValue;
    cta.textContent = t.act5Cta;

    const reduced = document.body.classList.contains('no-anim') || instant;
    if (reduced) {
      fill.style.width = '100%';
      fill.classList.add('is-complete');
      backup.classList.add('is-visible');
      cta.style.visibility = 'visible';
      return;
    }

    backup.classList.remove('is-visible');
    fill.style.width = '0%';
    fill.classList.remove('is-complete');
    cta.style.visibility = 'hidden';
    requestAnimationFrame(() => { fill.style.width = '100%'; });
    setTimeout(() => { backup.classList.add('is-visible'); audio.tensionPulse(); }, 1500);
    setTimeout(() => { fill.classList.add('is-complete'); cta.style.visibility = 'visible'; }, 2500);
  }
  function initAct5(instant) { ensureBound(5, bindAct5); renderAct5(instant); }

  /* ------------------------------------------------------------------ *
   * 13. ACT VI — SUPPLY DROP
   * ------------------------------------------------------------------ */
  const FOE_HITS_NEEDED = 5;

  function bindAct6() {
    const cta = $('#act6-cta');
    const cont = $('#act6-continue');
    const foe = $('#act6-foe');
    const stage = $('#act6-stage');

    /* reticle: follows a fine pointer while it hovers the target; on touch
       it appears at the tap point and locks on. Purely cosmetic. */
    const reticle = $('#act6-reticle');
    const placeReticle = (clientX, clientY) => {
      const r = stage.getBoundingClientRect();
      reticle.style.left = (clientX - r.left) + 'px';
      reticle.style.top = (clientY - r.top) + 'px';
    };
    foe.addEventListener('pointermove', (e) => {
      if (state.foeDown || e.pointerType === 'touch') return;
      placeReticle(e.clientX, e.clientY);
      reticle.classList.add('is-visible');
    });
    foe.addEventListener('pointerleave', () => { if (!state.foeDown) reticle.classList.remove('is-visible'); });

    foe.addEventListener('click', (e) => {
      if (state.foeDown || state.crateOpened) return;
      // keyboard activation reports no pointer position: aim at the middle of the target
      const box = foe.getBoundingClientRect();
      const x = e.detail > 0 ? e.clientX : box.left + box.width / 2;
      const y = e.detail > 0 ? e.clientY : box.top + box.height * 0.35;
      hitFoe(x, y, placeReticle);
    });

    // the delivery button only exists (is revealed) once the infected is
    // down — see dropFoe(); this guard is a defensive no-op by then.
    cta.addEventListener('click', () => {
      if (state.crateOpened || !state.foeDown) return;
      openCrate();
    });

    cont.addEventListener('click', () => {
      audio.uiClick();
      cont.classList.add('is-pressed');
      setTimeout(() => goToAct(7), 250);
    });

    const egg = $('#act6-egg');
    let eggTaps = 0;
    egg.addEventListener('click', () => {
      eggTaps += 1;
      egg.style.opacity = Math.min(0.22 + eggTaps * 0.12, 0.7);
      audio.scanBlip();
    });
  }

  function updatePips() {
    $$('#act6-pips i').forEach((el, i) => el.classList.toggle('is-spent', i < state.foeHits));
  }

  function hitFoe(x, y, placeReticle) {
    const layer = $('#act6-foe-layer');
    const reticle = $('#act6-reticle');
    state.foeHits += 1;
    audio.hit();
    audio.setTension(state.foeHits / FOE_HITS_NEEDED);

    placeReticle(x, y);
    reticle.classList.add('is-visible');
    reticle.classList.remove('is-lock'); void reticle.offsetWidth; reticle.classList.add('is-lock');

    layer.style.setProperty('--slump', String(state.foeHits));
    layer.classList.remove('is-hit'); void layer.offsetWidth; layer.classList.add('is-hit');
    setTimeout(() => layer.classList.remove('is-hit'), 280);
    updatePips();

    if (state.foeHits >= FOE_HITS_NEEDED) {
      setTimeout(() => dropFoe(), 180);
    } else {
      setTimeout(() => { if (!state.foeDown) reticle.classList.remove('is-visible'); }, 420);
    }
  }

  function dropFoe() {
    if (state.foeDown) return;
    state.foeDown = true;
    state.foeHits = FOE_HITS_NEEDED;
    updatePips();
    const layer = $('#act6-foe-layer');
    const stage = $('#act6-stage');
    const reticle = $('#act6-reticle');
    const dust = $('#act6-dust');
    layer.style.setProperty('--slump', String(FOE_HITS_NEEDED));
    layer.classList.add('is-down');
    $('#act6-foe').disabled = true;
    reticle.classList.remove('is-visible');
    $('#act6-hint').textContent = L().act6HintDown;
    $('#act6-foe').setAttribute('aria-label', L().foeLabelDown);

    setTimeout(() => {
      audio.collapse();
      audio.duck(0.3, 1.3);
      audio.setTension(0);
      dust.classList.remove('is-puffing'); void dust.offsetWidth; dust.classList.add('is-puffing');
    }, 380);
    setTimeout(() => {
      stage.classList.add('is-clear');
      // only now does the delivery button exist for the user
      const cta = $('#act6-cta');
      cta.classList.remove('is-gone');
      cta.disabled = false;
      cta.style.visibility = 'visible';
    }, 700);
  }

  function openCrate() {
    if (state.crateOpened) return;
    state.crateOpened = true;
    const cta = $('#act6-cta');
    const cont = $('#act6-continue');
    const crate = $('#act6-crate');
    const stage = $('#act6-stage');
    const flash = $('#act6-flash');
    const reveal = $('#act6-reveal');
    const meta = $('#act6-meta');

    audio.thud();
    cta.disabled = true;
    cta.classList.add('is-gone');
    const statusBox = $('#act6-status');
    statusBox.classList.add('is-hidden', 'is-gone');
    stage.classList.add('is-clear', 'is-open');
    crate.classList.add('is-open');

    setTimeout(() => {
      flash.classList.add('is-flashing');
      audio.chime();
      audio.revealSwell();
      reveal.classList.add('is-visible');
    }, 420);
    setTimeout(() => { meta.classList.add('is-visible'); }, 900);
    setTimeout(() => { cont.style.visibility = 'visible'; }, 1300);
  }

  function renderAct6(instant) {
    const t = L();
    $('#act6-heading').textContent = t.act6Heading;
    $('#act6-cta').textContent = t.act6Cta;
    $('#act6-contents-label').textContent = t.act6ContentsLabel;
    $('#act6-title').textContent = t.act6Title;
    $('#act6-recipient-label').textContent = t.act6RecipientLabel;
    $('#act6-recipient-value').innerHTML = bdi(t.act6RecipientValue);
    $('#act6-sender-label').textContent = t.act6SenderLabel;
    $('#act6-sender-value').innerHTML = bdi(t.act6SenderValue);
    $('#act6-continue').textContent = t.act6Continue;
    $('#act6-hint').textContent = state.foeDown ? t.act6HintDown : t.act6Hint;
    $('#act6-foe').setAttribute('aria-label', state.foeDown ? t.foeLabelDown : t.foeLabel);

    if (!instant) {
      // fresh entry into ACT VI: start the scene from its blocked state
      state.foeHits = 0; state.foeDown = false; state.crateOpened = false;
      $('#act6-crate').classList.remove('is-open');
      const stage = $('#act6-stage');
      stage.classList.remove('is-open', 'is-clear');
      const layer = $('#act6-foe-layer');
      layer.classList.remove('is-down', 'is-hit');
      layer.style.setProperty('--slump', '0');
      $('#act6-foe').disabled = false;
      $('#act6-status').classList.remove('is-hidden', 'is-gone');
      updatePips();
      $('#act6-reveal').classList.remove('is-visible');
      $('#act6-meta').classList.remove('is-visible');
      $('#act6-continue').style.visibility = 'hidden';
      // delivery button does not exist until the infected is defeated
      const cta = $('#act6-cta');
      cta.classList.add('is-gone');
      cta.disabled = true;
      cta.style.visibility = 'hidden';
    }
  }
  function initAct6(instant) { ensureBound(6, bindAct6); renderAct6(instant); }

  /* ------------------------------------------------------------------ *
   * 14. ACT VII — FINAL TRANSMISSION
   * ------------------------------------------------------------------ */
  function bindAct7() {
    const cta = $('#act7-cta');
    cta.addEventListener('click', () => {
      audio.uiClick();
      cta.classList.add('is-kept');
      cta.disabled = true;
      $('#act7-kept-note').textContent = L().act7KeptNote;
    });
  }
  function renderAct7(instant) {
    const t = L();
    const linesWrap = $('#act7-lines');
    const signature = $('#act7-signature');
    const message = $('#act7-message');
    const cta = $('#act7-cta');
    const keepsake = $('#act7-keepsake');
    const keepsakeTitle = $('#keepsake-title');
    const keepsakeCaption = $('#keepsake-caption');
    const keepsakeSave = $('#keepsake-save');
    const keptNote = $('#act7-kept-note');

    cta.textContent = t.act7Cta;
    keepsakeTitle.textContent = t.keepsakeTitle;
    keepsakeCaption.textContent = t.keepsakeCaption;
    keepsakeSave.textContent = t.keepsakeSaveCta;
    keptNote.textContent = cta.disabled ? t.act7KeptNote : '';
    message.textContent = t.act7Message;

    const reduced = document.body.classList.contains('no-anim') || instant;

    if (reduced) {
      linesWrap.innerHTML = '';
      t.act7Lines.forEach((line) => {
        const el = document.createElement('p');
        el.className = 'heading warm-heading';
        el.textContent = line;
        linesWrap.appendChild(el);
      });
      signature.textContent = t.act7Signature;
      message.style.opacity = 1;
      keepsake.classList.add('is-visible');
      cta.style.visibility = 'visible';
      return;
    }

    linesWrap.innerHTML = '';
    signature.textContent = '';
    message.style.opacity = 0;
    keepsake.classList.remove('is-visible');
    cta.style.visibility = 'hidden';

    const gran = state.lang === 'fa' ? 'word' : 'char';
    const lineGap = 850;
    let delay = 600;

    t.act7Lines.forEach((line) => {
      const el = document.createElement('p');
      el.className = 'heading warm-heading';
      linesWrap.appendChild(el);
      setTimeout(() => typeText(el, line, { charDelay: 30, lineGap: 0, granularity: gran }), delay);
      delay += lineGap;
    });

    setTimeout(() => { signature.textContent = t.act7Signature; }, delay);
    delay += lineGap;

    setTimeout(() => { message.style.transition = 'opacity 900ms ease-in-out'; message.style.opacity = 1; }, delay);
    delay += 700;

    setTimeout(() => { keepsake.classList.add('is-visible'); }, delay);
    delay += 500;

    setTimeout(() => { cta.style.visibility = 'visible'; }, delay);
  }
  function initAct7(instant) { ensureBound(7, bindAct7); renderAct7(instant); }

  const ACT_INIT = {
    1: initAct1,
    2: initAct2,
    3: (instant) => {
      const t = L();
      $('#act3-heading').textContent = t.act3Heading;
      $('#act3-sub').textContent = t.act3Sub;
      $('#act3-prompt').textContent = t.act3Prompt;
      // stagger-in only on a genuine fresh navigation, never on a
      // language-switch refresh (which must swap text instantly)
      renderArchiveList(!instant);
    },
    5: initAct5,
    6: initAct6,
    7: initAct7
  };

  /* ------------------------------------------------------------------ *
   * 15. LANGUAGE SYSTEM
   * ------------------------------------------------------------------ */
  function applyLanguage(lang, { persist = true } = {}) {
    if (lang !== 'en' && lang !== 'fa') return;
    state.lang = lang;
    const t = L();

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-fa', lang === 'fa');
    if (persist) { try { sessionStorage.setItem('jefi_lang', lang); } catch (e) { /* ignore */ } }

    langEnBtn.setAttribute('aria-pressed', String(lang === 'en'));
    langFaBtn.setAttribute('aria-pressed', String(lang === 'fa'));

    document.title = t.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.pageDescription);

    $('#page-h1').textContent = t.h1;
    $('#header-status-text').textContent = t.headerStatus;
    muteToggle.setAttribute('aria-label', audio.muted ? t.unmuteLabel : t.muteLabel);
    $('#incident-back').textContent = t.archiveBack;
    $('#act3-cta').textContent = t.act3Continue;
    $('#act3-infected-egg').setAttribute('aria-label', t.infectedEggLabel);
    $('#act6-egg').setAttribute('aria-label', t.silhouetteEggLabel);

    // re-render whatever is currently on screen, instantly — no replayed
    // entrance choreography, per the "switch instantly" requirement
    if (ACT_INIT[state.currentAct]) ACT_INIT[state.currentAct](true);

    if (!incidentView.hidden && state.openIncidentId) {
      const inc = INCIDENTS.find((i) => i.id === state.openIncidentId);
      if (inc) renderIncidentContent(inc);
    }
  }

  function bindLanguageToggle() {
    langEnBtn.addEventListener('click', () => { if (state.lang !== 'en') { audio.uiClick(); applyLanguage('en'); } });
    langFaBtn.addEventListener('click', () => { if (state.lang !== 'fa') { audio.uiClick(); applyLanguage('fa'); } });
  }

  /* ------------------------------------------------------------------ *
   * 16. ACHIEVEMENT / DISCOVERY TOAST
   * ------------------------------------------------------------------ */
  let toastTimer = null;
  function showToast(title1, body1, title2, body2) {
    const toast = $('#toast');
    $('#toast-line1-title').textContent = title1;
    $('#toast-line1-body').textContent = body1;
    $('#toast-line2-title').textContent = title2;
    $('#toast-line2-body').textContent = body2;
    toast.hidden = false;
    void toast.offsetWidth; // force a reflow so the fade-in still animates, without waiting on a frame callback
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => { toast.hidden = true; }, 400);
    }, 3600);
  }

  /* ------------------------------------------------------------------ *
   * 17. HIDDEN EASTER EGG — infected body, ACT III environmental corner.
   *     Optional, never required for progression.
   * ------------------------------------------------------------------ */
  const EGG_RISE_TAPS = 6;
  function bindInfectedEgg() {
    const egg = $('#act3-infected-egg');
    egg.addEventListener('click', () => {
      if (state.infectedRisen) return;
      state.infectedTaps = (state.infectedTaps || 0) + 1;
      const t = L();

      if (!state.infectedFound) {
        state.infectedFound = true;
        showToast(t.infectedToastTitle1, t.infectedToastBody1, t.infectedToastTitle2, t.infectedToastBody2);
        setTimeout(() => audio.achievement(), 260);
      }

      if (state.infectedTaps < EGG_RISE_TAPS) {
        egg.classList.add('is-twitching');
        audio.infectedNoise();
        setTimeout(() => egg.classList.remove('is-twitching'), 300);
        return;
      }

      // the surprise: it wasn't dead — rise, brief angry movement, leave
      state.infectedRisen = true;
      egg.classList.add('is-rising');
      audio.infectedRise();
      setTimeout(() => {
        showToast(t.infectedToastTitle1, t.infectedToastBody1Updated, t.infectedToastTitle2, t.infectedToastBody2);
      }, 550);
      setTimeout(() => {
        egg.disabled = true;
        egg.classList.add('is-gone-forever');
      }, 1100);
    });
  }

  /* ------------------------------------------------------------------ *
   * 18. ATMOSPHERE / RESTRAINED PARALLAX (desktop, pointer-fine only)
   * ------------------------------------------------------------------ */
  function initAtmosphere() {
    const atmo = $('#atmosphere');
    if (!atmo) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let raf = null;
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        atmo.style.transform = `translate(${x * -8}px, ${y * -6}px)`;
        raf = null;
      });
    }, { passive: true });
  }

  /* ------------------------------------------------------------------ *
   * 19. HEADER / MUTE CONTROL
   * ------------------------------------------------------------------ */
  function initHeader() {
    muteToggle.innerHTML = ICONS.speakerOn;
    muteToggle.setAttribute('aria-pressed', 'false');
    muteToggle.addEventListener('click', () => {
      const nowMuted = !audio.muted;
      audio.setMuted(nowMuted);
      muteToggle.innerHTML = nowMuted ? ICONS.speakerOff : ICONS.speakerOn;
      muteToggle.setAttribute('aria-pressed', String(nowMuted));
      muteToggle.setAttribute('aria-label', nowMuted ? L().unmuteLabel : L().muteLabel);
    });
  }

  function initStaticControls() {
    $('#incident-back').addEventListener('click', closeIncident);
    $('#act3-cta').addEventListener('click', () => {
      audio.uiClick();
      $('#act3-cta').classList.add('is-pressed');
      setTimeout(() => goToAct(5), 200);
    });
    bindInfectedEgg();
    bindLanguageToggle();
  }

  /* ------------------------------------------------------------------ *
   * 20. BOOT
   * ------------------------------------------------------------------ */
  document.addEventListener('visibilitychange', () => {
    if (!audio.ctx) return;
    if (document.hidden) audio.ctx.suspend().catch(() => {});
    else audio.ctx.resume().catch(() => {});
  });

  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initStaticControls();
    initAtmosphere();
    applyLanguage(state.lang, { persist: false });
    initAct1(false);
  });
})();
