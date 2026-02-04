window.addEventListener('load', () => {
  // ===========================
  // Generate Orbiting Data Nodes (12 nodes)
  // ===========================
  const orbitsContainer = document.getElementById('ailab-orbits');
  if (orbitsContainer) {
    for (let i = 0; i < 12; i += 1) {
      const orbitWrapper = document.createElement('div');
      orbitWrapper.className = 'ailab-orbit';
      orbitWrapper.style.animation = `orbit-rotate ${20 + i * 2}s linear infinite`;
      orbitWrapper.style.animationDelay = `${i * 0.5}s`;

      const node = document.createElement('div');
      node.className = 'ailab-orbit__node';
      node.style.left = `${50 + 45 * Math.cos((i * Math.PI) / 6)}%`;
      node.style.top = `${50 + 45 * Math.sin((i * Math.PI) / 6)}%`;
      node.style.animationDelay = `${i * 0.2}s`;

      orbitWrapper.appendChild(node);
      orbitsContainer.appendChild(orbitWrapper);
    }
  }

  // ===========================
  // Generate Floating Particles (20 particles)
  // ===========================
  const particlesContainer = document.getElementById('ailab-particles');
  if (particlesContainer) {
    for (let i = 0; i < 20; i += 1) {
      const particle = document.createElement('div');
      const isBlue = i % 2 === 0;
      particle.className = `ailab-particle ailab-particle--${isBlue ? 'blue' : 'purple'}`;

      const x = Math.random() * 400 - 200;
      const y = Math.random() * 400 - 200;
      particle.style.transform = `translate(${x}px, ${y}px)`;
      particle.style.animationDuration = `${8 + Math.random() * 4}s`;
      particle.style.animationDelay = `${i * 0.2}s`;

      particlesContainer.appendChild(particle);
    }
  }

  // ===========================
  // Scroll-triggered entrance animations (IntersectionObserver)
  // ===========================
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(
            () => {
              entry.target.classList.add('is-visible');
            },
            parseInt(delay, 10),
          );
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    },
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // ===========================
  // Parallax scroll effect on the 3D core
  // ===========================
  const coreElement = document.querySelector('.ailab-core');
  if (coreElement) {
    window.addEventListener('scroll', () => {
      const { scrollY } = window;
      coreElement.style.transform = `translateY(${scrollY * 0.1}px)`;
    });
  }
});
