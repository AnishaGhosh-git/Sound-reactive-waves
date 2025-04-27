document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('liquid-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = (window.innerWidth < 768) ? 150 : 300; // Increased particle count
    const particleSize = 1; // Much smaller particles
    const particleSpeed = 0.1; // Reduced speed
    const attractionRadius = 100; // Reduced attraction radius
    const attractionForce = 0.02; // Reduced attraction force
    const neonColor = 'rgba(127, 255, 0, 0.5)'; // Adjusted neon color
  
    let mouseX = null;
    let mouseY = null;
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * particleSpeed,
        vy: (Math.random() - 0.5) * particleSpeed,
      };
    }
  
    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    }
  
    function updateParticles() {
      particles.forEach(particle => {
        if (mouseX !== null && mouseY !== null) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < attractionRadius) {
            const force = (1 - distance / attractionRadius) * attractionForce;
            const angle = Math.atan2(dy, dx);
            particle.vx += Math.cos(angle) * force;
            particle.vy += Math.sin(angle) * force;
          }
        }
  
        particle.x += particle.vx;
        particle.y += particle.vy;
  
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      });
    }
  
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        ctx.fillStyle = neonColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  
    function animate() {
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    }
  
    resizeCanvas();
    initParticles();
    animate();
  
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  
    function handleMove(e) {
      if (e.touches) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
    }
  
    function handleEnd() {
      mouseX = null;
      mouseY = null;
    }
  
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
  
    window.addEventListener('mouseout', handleEnd);
    window.addEventListener('touchend', handleEnd);
  });