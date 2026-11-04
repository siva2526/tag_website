'use client';

// Web Audio API 8-bit sound synthesizer (no external audio files needed)

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('tag_sfx_enabled');
  return stored !== null ? stored === 'true' : true;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('tag_sfx_enabled', String(enabled));
  }
}

/** Subtle 8-bit button blip */
export function playBlip() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch {
    // AudioContext blocked or not supported
  }
}

/** Card / Member select tone */
export function playSelect() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // A5

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch {
    // Ignore audio error
  }
}

/** Modal / Inspect power-up sound */
export function playPowerUp() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (i + 1) * 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.06);
      osc.stop(ctx.currentTime + (i + 1) * 0.06);
    });
  } catch {
    // Ignore audio error
  }
}

/** Level-up / Konami code celebratory fanfare */
export function playLevelUp() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [392, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const startTime = ctx.currentTime + i * 0.08;
      const duration = i === notes.length - 1 ? 0.35 : 0.08;
      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  } catch {
    // Ignore audio error
  }
}

/** Elden Ring: Ominous death chime */
export function playYouDied() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, ctx.currentTime); // A2
    osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 1.2); // A1

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.5);
  } catch {}
}

/** Helldivers 2: Stratagem 500KG Bomb beacon & detonation */
export function playBombDrop() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Beacon beep
    [880, 1174, 1760].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const time = ctx.currentTime + idx * 0.1;
      gain.gain.setValueAtTime(0.08, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.08);
    });

    // Detonation boom
    const boomTime = ctx.currentTime + 0.4;
    const boomOsc = ctx.createOscillator();
    const boomGain = ctx.createGain();
    boomOsc.type = 'triangle';
    boomOsc.frequency.setValueAtTime(150, boomTime);
    boomOsc.frequency.exponentialRampToValueAtTime(30, boomTime + 0.8);
    boomGain.gain.setValueAtTime(0.2, boomTime);
    boomGain.gain.exponentialRampToValueAtTime(0.001, boomTime + 0.8);
    boomOsc.connect(boomGain);
    boomGain.connect(ctx.destination);
    boomOsc.start(boomTime);
    boomOsc.stop(boomTime + 0.8);
  } catch {}
}

/** Valorant: 5K Ace kill sound */
export function playAceChime() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [440, 554.37, 659.25, 830.61, 1108.73]; // A, C#, E, G#, C#
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const time = ctx.currentTime + idx * 0.07;
      const duration = idx === notes.length - 1 ? 0.4 : 0.07;
      gain.gain.setValueAtTime(0.1, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + duration);
    });
  } catch {}
}

/** Gacha 5-Star Pull: Shimmering harp arpeggio */
export function playWishPull() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98]; // C E G B C E G
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const time = ctx.currentTime + idx * 0.06;
      gain.gain.setValueAtTime(0.09, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.25);
    });
  } catch {}
}

/** Cyberpunk: Sandevistan time-dilation pulse */
export function playSandevistan() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch {}
}

/** Minecraft: Level-up ding */
export function playMinecraftDing() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1046.5, ctx.currentTime); // C6
    osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.1); // E6

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch {}
}

