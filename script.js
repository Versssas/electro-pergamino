const productos = [
  { nombre: "Cable unipolar", cat: "cables", label: "Cables", desc: "Cable unipolar normalizado, distintas secciones, para instalaciones domiciliarias e industriales." },
  { nombre: "Cable subterráneo", cat: "cables", label: "Cables", desc: "Cable subterráneo bipolar y trifásico para tendidos enterrados y acometidas." },
  { nombre: "Cable ignífugo", cat: "cables", label: "Cables", desc: "Línea ignífuga libre de halógenos para instalaciones que requieren mayor seguridad." },
  { nombre: "Tablero seccional de embutir", cat: "tableros", label: "Tableros", desc: "Tableros seccionales de embutir en distintas bocas, con o sin puerta." },
  { nombre: "Llave termomagnética", cat: "tableros", label: "Tableros", desc: "Llaves termomagnéticas de 1, 2 y 3 polos, distintos amperajes." },
  { nombre: "Disyuntor diferencial", cat: "tableros", label: "Tableros", desc: "Disyuntores diferenciales de alta sensibilidad para protección de personas." },
  { nombre: "Panel LED", cat: "iluminacion", label: "Iluminación", desc: "Paneles LED de embutir y aplicar, distintas potencias y temperaturas de color." },
  { nombre: "Proyector LED exterior", cat: "iluminacion", label: "Iluminación", desc: "Proyectores LED IP65 para fachadas, playones y espacios exteriores." },
  { nombre: "Tira LED", cat: "iluminacion", label: "Iluminación", desc: "Tiras LED decorativas, cortables, con y sin control remoto." },
  { nombre: "Caño de acero rígido", cat: "caneria", label: "Cañerías", desc: "Caños de acero rígidos y semipesados para instalaciones embutidas y a la vista." },
  { nombre: "Caño PVC autoextinguible", cat: "caneria", label: "Cañerías", desc: "Cañería PVC autoextinguible, curvas, conectores y accesorios." },
  { nombre: "Caja de pase", cat: "caneria", label: "Cañerías", desc: "Cajas de pase octogonales y rectangulares en distintas medidas." },
  { nombre: "Módulo de embutir", cat: "tomas", label: "Tomas y enchufes", desc: "Interruptores y tomas residenciales, líneas combinables por color y diseño." },
  { nombre: "Toma industrial", cat: "tomas", label: "Tomas y enchufes", desc: "Tomas y fichas industriales trifásicas, distintos amperajes." },
  { nombre: "Zapatilla y prolongador", cat: "tomas", label: "Tomas y enchufes", desc: "Zapatillas, prolongadores y adaptadores para uso doméstico e industrial." },
  { nombre: "Pinza y alicate certificado", cat: "herramientas", label: "Herramientas", desc: "Herramientas certificadas a 1000V para trabajo con tensión." },
  { nombre: "Pelacables automático", cat: "herramientas", label: "Herramientas", desc: "Pelacables automáticos y manuales para distintas secciones de cable." },
  { nombre: "Destornillador aislado", cat: "herramientas", label: "Herramientas", desc: "Destornilladores aislados, juegos completos para electricista." },
];

const CATALOGO_PAGE_SIZE = 6;
let catalogoExpandido = false;

function renderCatalogo(filtro) {
  const grid = document.getElementById('catalogoGrid');
  const verMasBtn = document.getElementById('catalogoVerMas');
  if (!grid) return;
  const items = filtro === 'todos' ? productos : productos.filter(p => p.cat === filtro);
  const visibles = catalogoExpandido ? items : items.slice(0, CATALOGO_PAGE_SIZE);
  grid.innerHTML = visibles.map(p => {
    const msg = encodeURIComponent(`Hola! Quería consultar disponibilidad y precio de: ${p.nombre}`);
    return `
    <div class="prod-card">
      <span class="prod-cat">${p.label}</span>
      <div class="prod-nombre">${p.nombre}</div>
      <p class="prod-desc">${p.desc}</p>
      <a class="prod-wsp" href="https://wa.me/5492477457559?text=${msg}" target="_blank">Consultar</a>
    </div>`;
  }).join('');
  if (verMasBtn) {
    verMasBtn.hidden = catalogoExpandido || items.length <= CATALOGO_PAGE_SIZE;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = Number(el.dataset.cardDelay || 0);
      el.style.transitionDelay = `${delay}s`;
      el.classList.add('visible');
      setTimeout(() => { el.style.transitionDelay = ''; }, (delay + 0.6) * 1000);
      cardObserver.unobserve(el);
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.cards .card').forEach((el, i) => {
    el.dataset.cardDelay = Math.min(i * 0.08, 0.4);
    cardObserver.observe(el);
  });

  renderCatalogo('todos');

  const filtros = document.getElementById('catalogoFiltros');
  const catalogoGrid = document.getElementById('catalogoGrid');

  const renderCatalogoAnimado = (cat) => {
    if (!catalogoGrid) {
      renderCatalogo(cat);
      return;
    }
    catalogoGrid.style.opacity = '0';
    catalogoGrid.style.transform = 'translateY(10px)';
    setTimeout(() => {
      renderCatalogo(cat);
      catalogoGrid.style.transform = 'translateY(-10px)';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          catalogoGrid.style.opacity = '1';
          catalogoGrid.style.transform = 'translateY(0)';
        });
      });
    }, 200);
  };

  if (filtros) {
    filtros.addEventListener('click', (e) => {
      const btn = e.target.closest('.filtro-btn');
      if (!btn) return;
      filtros.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      catalogoExpandido = false;
      renderCatalogoAnimado(btn.dataset.cat);
    });
  }

  const verMasBtn = document.getElementById('catalogoVerMas');
  if (verMasBtn) {
    verMasBtn.addEventListener('click', () => {
      catalogoExpandido = true;
      const activo = filtros ? filtros.querySelector('.filtro-btn.active') : null;
      renderCatalogoAnimado(activo ? activo.dataset.cat : 'todos');
    });
  }

  const nav = document.querySelector('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const heroLogo = document.querySelector('.hero-logo-bg');
  const hero = document.querySelector('.hero');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (heroLogo && hero && !prefersReducedMotion) {
    let scrollY = 0;
    let tiltX = 0;
    let tiltY = 0;
    const render = () => {
      const base = window.innerWidth <= 768 ? '' : 'translateY(-50%) ';
      heroLogo.style.transform =
        `${base}translateY(${scrollY}px) perspective(600px) rotateY(${tiltX}deg) rotateX(${tiltY}deg) scale(1.03)`;
    };

    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        const heroHeight = hero.offsetHeight;
        const y = window.scrollY;
        if (y < heroHeight) {
          scrollY = y * 0.35;
          const progress = y / heroHeight;
          tiltX = (progress - 0.5) * 26;
          tiltY = Math.sin(progress * Math.PI) * -10;
        }
        render();
        scrollTicking = false;
      });
    }, { passive: true });

    if (hasFinePointer) {
      let tiltTicking = false;
      hero.addEventListener('mousemove', (e) => {
        if (tiltTicking) return;
        tiltTicking = true;
        requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          tiltX = nx * 30;
          tiltY = -ny * 30;
          render();
          tiltTicking = false;
        });
      });
      hero.addEventListener('mouseleave', () => {
        tiltX = 0;
        tiltY = 0;
        render();
      });
    }

    if (!hasFinePointer) {
      let dragging = false;
      let startX = 0;
      let startY = 0;
      let baseTiltX = 0;
      let baseTiltY = 0;
      let lastX = 0;
      let lastY = 0;
      let lastTime = 0;
      let velX = 0;
      let velY = 0;
      let spinFrame = null;
      let axisLock = null;

      const stopSpin = () => {
        if (spinFrame) cancelAnimationFrame(spinFrame);
        spinFrame = null;
        heroLogo.style.transition = '';
      };

      const shortestEquivalent = (deg) => {
        let m = deg % 360;
        if (m > 180) m -= 360;
        if (m < -180) m += 360;
        return m;
      };

      const settleToFront = () => {
        tiltX = shortestEquivalent(tiltX);
        tiltY = shortestEquivalent(tiltY);
        render();
        heroLogo.offsetHeight;
        heroLogo.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        tiltX = 0;
        tiltY = 0;
        render();
        setTimeout(() => { heroLogo.style.transition = ''; }, 620);
      };

      const spinStep = () => {
        tiltX += velX;
        tiltY += velY;
        velX *= 0.95;
        velY *= 0.95;
        render();
        if (Math.abs(velX) > 0.02 || Math.abs(velY) > 0.02) {
          spinFrame = requestAnimationFrame(spinStep);
        } else {
          spinFrame = null;
          settleToFront();
        }
      };

      hero.addEventListener('touchstart', (e) => {
        if (!e.touches[0]) return;
        stopSpin();
        dragging = true;
        axisLock = null;
        startX = lastX = e.touches[0].clientX;
        startY = lastY = e.touches[0].clientY;
        lastTime = performance.now();
        baseTiltX = tiltX;
        baseTiltY = tiltY;
        velX = 0;
        velY = 0;
      }, { passive: true });

      hero.addEventListener('touchmove', (e) => {
        if (!dragging || !e.touches[0]) return;
        const now = performance.now();
        const dt = Math.max(now - lastTime, 1);
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;

        const dx = x - startX;
        const dy = y - startY;

        if (!axisLock && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
          axisLock = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        }

        if (axisLock === 'x') {
          tiltX = baseTiltX + dx * 0.3;
          velX = ((x - lastX) * 0.3 / dt) * 16;
        } else if (axisLock === 'y') {
          e.preventDefault();
          tiltY = baseTiltY - dy * 0.3;
          velY = (-(y - lastY) * 0.3 / dt) * 16;
        }

        lastX = x;
        lastY = y;
        lastTime = now;
        render();
      }, { passive: false });

      hero.addEventListener('touchend', () => {
        dragging = false;
        if (Math.abs(velX) > 0.05 || Math.abs(velY) > 0.05) {
          spinFrame = requestAnimationFrame(spinStep);
        } else {
          settleToFront();
        }
      });
    }
  }

  const countEl = document.querySelector('[data-count-to]');
  if (countEl) {
    const target = parseInt(countEl.dataset.countTo, 10);
    if (prefersReducedMotion) {
      countEl.textContent = `+${target}`;
    } else {
      const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const duration = 1200;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            countEl.textContent = `+${Math.round(eased * target)}`;
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          countObserver.unobserve(entry.target);
        });
      }, { threshold: 0.5 });
      countObserver.observe(countEl);
    }
  }

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
    document.querySelectorAll('.card').forEach(card => {
      let cardTicking = false;
      card.addEventListener('mouseenter', () => { card.style.zIndex = '5'; });
      card.addEventListener('mousemove', (e) => {
        if (cardTicking) return;
        cardTicking = true;
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform =
            `perspective(900px) rotateY(${nx * 7}deg) rotateX(${-ny * 7}deg) translateY(-3px) scale(1.01)`;
          cardTicking = false;
        });
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.zIndex = '';
      });
    });
  }

  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(navLinks)
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);
  if (sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(a => a.classList.toggle('active-link', a.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => sectionObserver.observe(s));
  }
});