/**
 * LIVING BRIDGES — Cinematic Coming Soon Experience
 * Micro-interactions, ambient particles & mouse parallax
 */

document.addEventListener('DOMContentLoaded', () => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------------------------
  // 1. Subtle Mouse Parallax on Background
  // -------------------------------------------------------------------------
  const backdrop = document.getElementById('sceneBackdrop');
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  if (backdrop && !isReducedMotion && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * 12; // max 12px shift
      targetY = ((e.clientY - cy) / cy) * 8;
    });

    const renderParallax = () => {
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;
      backdrop.style.transform = `scale(1.04) translate3d(${mouseX.toFixed(2)}px, ${mouseY.toFixed(2)}px, 0)`;
      requestAnimationFrame(renderParallax);
    };
    renderParallax();
  }

  // -------------------------------------------------------------------------
  // 2. Floating Ambient Dust / Embers Canvas
  // -------------------------------------------------------------------------
  const canvas = document.getElementById('dustCanvas');
  if (canvas && !isReducedMotion) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const PARTICLE_COUNT = Math.min(35, Math.floor(window.innerWidth / 30));
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.45 - 0.1, // gently float upwards
      opacity: Math.random() * 0.5 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulseVal: Math.random() * Math.PI,
    }));

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulseVal += p.pulseSpeed;

        // Reset if offscreen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulseVal));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 237, 154, ${currentOpacity.toFixed(3)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(240, 237, 154, 0.4)';
        ctx.fill();
      });

      requestAnimationFrame(drawParticles);
    };

    drawParticles();
  }
});
