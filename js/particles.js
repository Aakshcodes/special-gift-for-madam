/**
 * =========================================================================
 * ✨ ROMANTIC CANVAS PARTICLE SYSTEM
 * =========================================================================
 * Handles dreamy floating hearts, falling flower petals, glowing twinkling
 * stars, click/tap sparklers, and celebratory heart explosions.
 */

class RomanticParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.sparkles = [];
    this.petals = [];
    this.explosions = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.isRunning = true;
    this.lastTime = performance.now();

    this.heartColors = [
      "#f472b6", // pink-400
      "#fb7185", // rose-400
      "#f43f5e", // rose-500
      "#c084fc", // purple-400
      "#e879f9", // fuchsia-400
      "#fda4af", // rose-300
      "#ffffff"  // white sparkle
    ];

    this.petalColors = [
      "rgba(255, 182, 193, 0.8)", // light pink
      "rgba(255, 192, 203, 0.75)", // pink
      "rgba(254, 205, 211, 0.85)", // rose-200
      "rgba(253, 164, 175, 0.7)"  // rose-300
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
    document.addEventListener("visibilitychange", () => {
      this.isRunning = !document.hidden;
      if (this.isRunning) {
        this.lastTime = performance.now();
        this.animate();
      }
    });

    // Populate initial ambient particles
    this.createAmbientHearts(25);
    this.createAmbientPetals(18);
    this.createAmbientStars(40);

    // Bind tap / click sparklers
    window.addEventListener("pointerdown", (e) => this.handlePointerTap(e));
    window.addEventListener("pointermove", (e) => this.handlePointerMove(e));

    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  createAmbientHearts(count) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 14 + 10,
        speedY: -(Math.random() * 0.8 + 0.4),
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.25,
        color: this.heartColors[Math.floor(Math.random() * this.heartColors.length)],
        rotation: (Math.random() - 0.5) * 0.4,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.01
      });
    }
  }

  createAmbientPetals(count) {
    for (let i = 0; i < count; i++) {
      this.petals.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 12 + 8,
        speedY: Math.random() * 1.2 + 0.6,
        speedX: Math.random() * 1.0 - 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        color: this.petalColors[Math.floor(Math.random() * this.petalColors.length)],
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01
      });
    }
  }

  createAmbientStars(count) {
    for (let i = 0; i < count; i++) {
      this.sparkles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        maxAlpha: Math.random() * 0.5 + 0.4
      });
    }
  }

  handlePointerTap(e) {
    const x = e.clientX;
    const y = e.clientY;
    this.burstMiniHearts(x, y, 6);
  }

  handlePointerMove(e) {
    if (Math.random() > 0.4) return; // throttle
    const x = e.clientX;
    const y = e.clientY;
    this.sparkles.push({
      x: x + (Math.random() - 0.5) * 16,
      y: y + (Math.random() - 0.5) * 16,
      size: Math.random() * 2.5 + 1.5,
      alpha: 1,
      fadeSpeed: 0.025,
      isTrail: true
    });
  }

  burstMiniHearts(x, y, count = 8) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5);
      const speed = Math.random() * 3 + 2;
      this.explosions.push({
        x,
        y,
        size: Math.random() * 14 + 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        color: this.heartColors[Math.floor(Math.random() * this.heartColors.length)],
        alpha: 1,
        fadeSpeed: Math.random() * 0.02 + 0.015,
        gravity: 0.06,
        rotation: (Math.random() - 0.5) * 0.5,
        rotSpeed: (Math.random() - 0.5) * 0.1
      });
    }
  }

  // Large celebration burst for "Open Surprise" or "Virtual Hug"
  launchCelebrationExplosion(originX, originY, count = 120) {
    const x = originX || this.width / 2;
    const y = originY || this.height / 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 3;
      this.explosions.push({
        x,
        y,
        size: Math.random() * 20 + 12,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3.5,
        color: this.heartColors[Math.floor(Math.random() * this.heartColors.length)],
        alpha: 1,
        fadeSpeed: Math.random() * 0.012 + 0.008,
        gravity: 0.12,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        isGlow: Math.random() > 0.5
      });
    }
  }

  drawHeart(ctx, x, y, size, color, alpha, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.fillStyle = color;

    // Draw smooth bezier heart
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(
      -size / 2, -topCurveHeight * 0.8,
      -size, size / 3,
      0, size
    );
    // top right curve
    ctx.bezierCurveTo(
      size, size / 3,
      size / 2, -topCurveHeight * 0.8,
      0, topCurveHeight
    );
    ctx.closePath();
    ctx.fill();

    // 3D glossy highlight
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.beginPath();
    ctx.ellipse(-size * 0.28, size * 0.1, size * 0.12, size * 0.22, -0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawPetal(ctx, x, y, size, color, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.quadraticCurveTo(size * 0.7, 0, 0, size);
    ctx.quadraticCurveTo(-size * 0.7, 0, 0, -size);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw glowing stars
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const s = this.sparkles[i];
      if (s.isTrail) {
        s.alpha -= s.fadeSpeed;
        if (s.alpha <= 0) {
          this.sparkles.splice(i, 1);
          continue;
        }
      } else {
        s.alpha += s.pulseSpeed;
        if (s.alpha > s.maxAlpha || s.alpha < 0.2) {
          s.pulseSpeed = -s.pulseSpeed;
        }
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, s.alpha);
      this.ctx.fillStyle = "#ffffff";
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = "#fbcfe8";
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Draw ambient floating hearts
    for (let h of this.particles) {
      h.wobble += h.wobbleSpeed;
      h.x += h.speedX + Math.sin(h.wobble) * 0.6;
      h.y += h.speedY;
      h.rotation += h.rotSpeed;

      if (h.y < -30) {
        h.y = this.height + 20;
        h.x = Math.random() * this.width;
      }
      if (h.x < -20) h.x = this.width + 20;
      if (h.x > this.width + 20) h.x = -20;

      this.drawHeart(this.ctx, h.x, h.y, h.size, h.color, h.opacity, h.rotation);
    }

    // 3. Draw falling sakura petals
    for (let p of this.petals) {
      p.sway += p.swaySpeed;
      p.x += p.speedX + Math.sin(p.sway) * 0.8;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      if (p.y > this.height + 30) {
        p.y = -20;
        p.x = Math.random() * this.width;
      }

      this.drawPetal(this.ctx, p.x, p.y, p.size, p.color, p.rotation);
    }

    // 4. Draw explosion particles
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      const exp = this.explosions[i];
      exp.x += exp.vx;
      exp.y += exp.vy;
      exp.vy += exp.gravity;
      exp.vx *= 0.985;
      exp.rotation += exp.rotSpeed;
      exp.alpha -= exp.fadeSpeed;

      if (exp.alpha <= 0) {
        this.explosions.splice(i, 1);
        continue;
      }

      this.drawHeart(this.ctx, exp.x, exp.y, exp.size, exp.color, exp.alpha, exp.rotation);
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Global initialization helper
window.initRomanticParticles = function() {
  window.romanticParticles = new RomanticParticleSystem("particleCanvas");
};
