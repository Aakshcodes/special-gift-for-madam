/**
 * =========================================================================
 * 🎵 ROMANTIC AUDIO ENGINE (Web Audio API Synthesizer + Custom MP3 Player)
 * =========================================================================
 * Provides zero-dependency, guaranteed-working romantic music-box melody
 * with chord progressions, plus sound effects for interactions.
 */

class RomanticAudioManager {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.4;
    this.customAudio = null;
    this.synthLoopTimer = null;
    this.currentNoteIndex = 0;
    this.synthChordIndex = 0;

    // Dreamy romantic notes & chord arpeggios (E major / Aadd9 / C#m7 / B)
    // Frequencies in Hz for a soft music box / celesta tone
    this.melodyChords = [
      // E major 9
      [329.63, 415.30, 493.88, 622.25, 659.25], 
      // C# minor 9
      [277.18, 329.63, 415.30, 493.88, 554.37], 
      // A add9
      [220.00, 277.18, 329.63, 493.88, 554.37], 
      // B sus4 -> B
      [246.94, 329.63, 369.99, 493.88, 622.25]  
    ];

    this.arpeggioPatterns = [
      [0, 1, 2, 4, 3, 2, 1, 3],
      [0, 2, 3, 4, 2, 1, 2, 3],
      [0, 1, 3, 4, 3, 2, 1, 2],
      [0, 2, 3, 4, 3, 1, 2, 4]
    ];

    this.tempo = 380; // ms per note (gentle and relaxing)
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;

    // If custom audio URL is set in config, prefer playing it
    if (window.MADAM_CONFIG && MADAM_CONFIG.music && MADAM_CONFIG.music.customAudioUrl) {
      if (!this.customAudio) {
        this.customAudio = new Audio(MADAM_CONFIG.music.customAudioUrl);
        this.customAudio.loop = true;
        this.customAudio.volume = this.volume;
      }
      this.customAudio.play().catch(e => {
        console.warn("Could not play custom audio, falling back to romantic music box synthesizer", e);
        this.startSynthMelody();
      });
    } else {
      this.startSynthMelody();
    }

    this.updateUI();
  }

  stop() {
    this.isPlaying = false;
    if (this.synthLoopTimer) {
      clearTimeout(this.synthLoopTimer);
      this.synthLoopTimer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.updateUI();
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  // --- Romantic Web Audio Synthesizer (Celesta / Music Box style) ---
  playMusicBoxNote(freq, timeOffset = 0, duration = 1.8) {
    if (!this.audioCtx || this.isMuted) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime + timeOffset;

    // Master Note Gain
    const noteGain = ctx.createGain();
    const peakVolume = this.volume * 0.12;

    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(peakVolume, now + 0.02); // quick soft strike
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // bell resonance

    // Primary bell tone (Sine)
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, now);

    // Warm soft harmonic overtone (Triangle with slight sparkle)
    const osc2 = ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2.01, now); // subtle crystalline shimmer

    const harmGain = ctx.createGain();
    harmGain.gain.setValueAtTime(peakVolume * 0.25, now);
    harmGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.6);

    // Soft lowpass filter to remove harshness
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);

    osc1.connect(noteGain);
    osc2.connect(harmGain);
    harmGain.connect(filter);
    noteGain.connect(filter);
    filter.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  startSynthMelody() {
    if (!this.isPlaying) return;

    const chord = this.melodyChords[this.synthChordIndex];
    const pattern = this.arpeggioPatterns[this.synthChordIndex % this.arpeggioPatterns.length];
    const noteIdxInChord = pattern[this.currentNoteIndex];
    const freq = chord[noteIdxInChord % chord.length];

    // Every 4 notes, also play a tender bass drone root
    if (this.currentNoteIndex === 0) {
      this.playMusicBoxNote(chord[0] / 2, 0, 3.2); // root base octave
    }

    this.playMusicBoxNote(freq, 0, 2.2);

    this.currentNoteIndex++;
    if (this.currentNoteIndex >= pattern.length) {
      this.currentNoteIndex = 0;
      this.synthChordIndex = (this.synthChordIndex + 1) % this.melodyChords.length;
    }

    this.synthLoopTimer = setTimeout(() => {
      this.startSynthMelody();
    }, this.tempo);
  }

  // --- Interactive Sound Effects ---
  playSparkleSound() {
    if (!this.isPlaying && !this.audioCtx) return;
    this.initContext();
    const ctx = this.audioCtx;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major glissando
    notes.forEach((freq, i) => {
      this.playMusicBoxNote(freq, i * 0.07, 1.2);
    });
  }

  playPopSound() {
    if (!this.audioCtx) this.initContext();
    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.12);

    gain.gain.setValueAtTime(this.volume * 0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playHeartbeatSound() {
    if (!this.audioCtx) this.initContext();
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const playThump = (timeOffset, f) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now + timeOffset);
      osc.frequency.exponentialRampToValueAtTime(45, now + timeOffset + 0.16);

      gain.gain.setValueAtTime(this.volume * 0.25, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + 0.2);
    };

    playThump(0, 95);     // Lub
    playThump(0.18, 85);   // Dub
  }

  playVirtualHugSound() {
    if (!this.audioCtx) this.initContext();
    this.playHeartbeatSound();
    setTimeout(() => {
      const chord = [392.00, 493.88, 587.33, 783.99, 987.77]; // Warm G major celestial chord
      chord.forEach((freq, idx) => {
        this.playMusicBoxNote(freq, idx * 0.08, 3.5);
      });
    }, 200);
  }

  updateUI() {
    const musicBtn = document.getElementById("musicToggleBtn");
    const musicWaves = document.getElementById("musicWaves");
    const musicTitle = document.getElementById("musicTitle");
    if (musicBtn) {
      if (this.isPlaying) {
        musicBtn.classList.add("playing");
        musicBtn.setAttribute("aria-label", "Pause romantic music");
        if (musicWaves) musicWaves.classList.add("active");
        if (musicTitle) musicTitle.textContent = "Playing Romantic Melody 🎵";
      } else {
        musicBtn.classList.remove("playing");
        musicBtn.setAttribute("aria-label", "Play romantic music");
        if (musicWaves) musicWaves.classList.remove("active");
        if (musicTitle) musicTitle.textContent = "Music Paused (Tap to play) 🤍";
      }
    }
  }
}

// Global instance
window.romanticAudio = new RomanticAudioManager();
