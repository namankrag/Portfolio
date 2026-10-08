/**
 * Interactive Neural Network & Particle Mesh Canvas
 * Author: Naman Kumar Agrawal Portfolio
 */

(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let signals = [];
  let mouse = { x: null, y: null, radius: 150 };

  // Configuration based on screen size
  function getParticleCount() {
    return window.innerWidth < 768 ? 40 : 85;
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  // Get accent color from CSS
  function getAccentColor() {
    const style = getComputedStyle(document.documentElement);
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const accent = style.getPropertyValue('--accent').trim() || '#06b6d4';
    return {
      accent: accent,
      isDark: theme === 'dark'
    };
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1.5;
      this.baseRadius = this.radius;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interactivity
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          this.x -= (dx / dist) * force;
          this.y -= (dy / dist) * force;
          this.radius = this.baseRadius * 1.6;
        } else {
          this.radius = this.baseRadius;
        }
      }
    }

    draw(accentInfo) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = accentInfo.isDark ? accentInfo.accent : '#64748b';
      ctx.shadowBlur = accentInfo.isDark ? 8 : 0;
      ctx.shadowColor = accentInfo.accent;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  class DataSignal {
    constructor(p1, p2) {
      this.p1 = p1;
      this.p2 = p2;
      this.progress = 0;
      this.speed = 0.015 + Math.random() * 0.02;
    }

    update() {
      this.progress += this.speed;
      return this.progress < 1;
    }

    draw(accentInfo) {
      const x = this.p1.x + (this.p2.x - this.p1.x) * this.progress;
      const y = this.p1.y + (this.p2.y - this.p1.y) * this.progress;
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = accentInfo.accent;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particles = [];
    signals = [];
    const count = getParticleCount();
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections(accentInfo) {
    const maxDist = window.innerWidth < 768 ? 100 : 140;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * (accentInfo.isDark ? 0.22 : 0.12);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = accentInfo.isDark ? `rgba(6, 182, 212, ${alpha})` : `rgba(100, 116, 139, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Occasionally spawn a data pulse packet along this edge
          if (Math.random() < 0.0003 && signals.length < 15) {
            signals.push(new DataSignal(particles[i], particles[j]));
          }
        }
      }
    }
  }

  let animationFrameId;

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const accentInfo = getAccentColor();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(accentInfo);
    }

    drawConnections(accentInfo);

    // Update and draw pulse signals
    signals = signals.filter(sig => {
      const active = sig.update();
      if (active) sig.draw(accentInfo);
      return active;
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    cancelAnimationFrame(animationFrameId);
    resize();
    animate();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Init
  resize();
  animate();
})();
