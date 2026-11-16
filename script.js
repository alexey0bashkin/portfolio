// ============================================
//  ЛОГИКА РЕНДЕРА. Менять здесь почти не нужно —
//  весь контент в data.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initLightbox(); 
  renderHero();
  renderAbout();
  renderProjects();
  renderExperience();
  renderSkills();
  renderEducation();
  renderContacts();
  initNavbar();
  initScrollAnimations();
  initCounters();
  initProjectSpotlight();
  document.getElementById('year').textContent = new Date().getFullYear();
});

// ---------- HERO ----------
function renderHero() {
  const d = SITE_DATA.hero;
  document.getElementById('heroName').textContent = d.name;
  document.getElementById('heroRole').textContent = d.role;
  document.getElementById('heroTagline').textContent = d.tagline;
  document.getElementById('btnProjects').textContent = d.buttons.projects;

  const btnResume = document.getElementById('btnResume');
  btnResume.href = SITE_DATA.contacts.resumePath;
  btnResume.insertAdjacentHTML('beforeend', `<span>${d.buttons.resume}</span>`);

  initPhotoCarousel(d.photos || []);
}

function initPhotoCarousel(photos) {
  const carousel = document.getElementById('photoCarousel');
  if (!carousel) return;

  const track  = document.getElementById('carouselTrack');
  const dots   = document.getElementById('carouselDots');
  const prev   = document.getElementById('carouselPrev');
  const next   = document.getElementById('carouselNext');

  // Если фото нет — показываем заглушку
  if (!photos.length) {
    track.innerHTML = `<div class="carousel-slide placeholder"><span>◐</span></div>`;
    carousel.classList.add('single');
    return;
  }

  // Рендер слайдов
  track.innerHTML = photos.map((src, i) => `
    <div class="carousel-slide${i === 0 ? ' active' : ''}" data-index="${i}">
      <img src="${src}" alt="Фото ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}"
           onerror="this.parentElement.classList.add('no-img')">
    </div>
  `).join('');

  // Если одно фото — скрываем управление
  if (photos.length === 1) {
    carousel.classList.add('single');
    return;
  }

  // Точки
  dots.innerHTML = photos.map((_, i) =>
    `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Фото ${i + 1}"></button>`
  ).join('');

  const slides = [...track.querySelectorAll('.carousel-slide')];
  const dotEls = [...dots.querySelectorAll('.carousel-dot')];
  let current  = 0;
  let timer    = null;

  const goTo = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dotEls.forEach((d, i) => d.classList.toggle('active', i === current));
  };

  const startAuto = () => {
    stopAuto();
    timer = setInterval(() => goTo(current + 1), 5000);
  };
  const stopAuto = () => { if (timer) clearInterval(timer); timer = null; };

  prev.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  next.addEventListener('click', () => { goTo(current + 1); startAuto(); });
  dotEls.forEach((d, i) => d.addEventListener('click', () => { goTo(i); startAuto(); }));

  // Свайп на мобильных
  let startX = 0, isDragging = false;
  let _carouselSwiped = false;          // флаг: был ли свайп (чтобы не открывать лайтбокс)

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAuto();
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) {
      goTo(current + (dx < 0 ? 1 : -1));
      _carouselSwiped = true;           // помечаем, что это свайп, а не клик
    }
    startAuto();
  });

  // Пауза при наведении
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  // Клавиатура
  carousel.setAttribute('tabindex', '0');
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
  });

  // Клик по слайду — открыть лайтбокс на этом фото (навешиваем ОДИН раз)
  track.addEventListener('click', (e) => {
    const slide = e.target.closest('.carousel-slide');
    if (!slide || slide.classList.contains('no-img')) return;

    // Не открываем лайтбокс, если был свайп (защита от ложного клика после touchend)
    if (_carouselSwiped) {
      _carouselSwiped = false;
      return;
    }

    const idx = +slide.dataset.index;
    openLightbox(photos, idx, 'Фото профиля');
  });

  startAuto();
}

// ---------- ABOUT ----------
function renderAbout() {
  const d = SITE_DATA.about;
  document.getElementById('aboutTitle').textContent = d.title;
  const el = document.getElementById('aboutLead');
const txt = d.text.trim();
el.innerHTML = `<span class="dropcap">${txt.charAt(0)}</span>${txt.slice(1)}`;

  const grid = document.getElementById('statsGrid');
  grid.innerHTML = d.stats.map(s => `
    <div class="stat-item">
      <div class="stat-value" data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
}

// ---------- PROJECTS ----------
function renderProjects() {
  const d = SITE_DATA.projects;
  document.getElementById('projectsTitle').textContent = d.title;
  const grid = document.getElementById('projectsGrid');

  grid.innerHTML = d.items.map((p, i) => `
    <article class="project-case reveal ${p.featured ? 'featured' : ''}">
      <div class="case-index">${String(i + 1).padStart(2, '0')}</div>

       <div class="case-image" data-project-index="${i}" role="button" tabindex="0" aria-label="Открыть фото проекта ${p.name}">
        <img src="${(p.images && p.images[0]) || ''}" alt="${p.name}" loading="lazy"
             onerror="this.parentElement.classList.add('no-img')">
        <div class="case-image-overlay"></div>

        ${(p.images && p.images.length > 1) ? `<span class="case-photo-count">${p.images.length} фото</span>` : ''}
      </div>

      <div class="case-body">
        <div class="case-meta">
          <span class="case-stack">${p.stack.slice(0, 3).join(' · ')}</span>
        </div>

        <h3 class="case-title">${p.name}</h3>
        <p class="case-desc">${p.description}</p>

        <div class="case-result">
          <span class="result-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </span>
          <span class="result-text">${p.result}</span>
        </div>

        <div class="case-footer">
          <div class="case-tags">
            ${p.stack.map(s => `<span class="case-tag">${s}</span>`).join('')}
          </div>
          <div class="case-links">
            ${p.links.demo ? `
              <a href="${p.links.demo}" target="_blank" rel="noopener" class="case-link">
                <span>Демо</span>
                <svg><use href="#icon-external"/></svg>
              </a>` : ''}
            ${p.links.github ? `
              <a href="${p.links.github}" target="_blank" rel="noopener" class="case-link">
                <span>GitHub</span>
                <svg><use href="#icon-arrow-up-right"/></svg>
              </a>` : ''}
          </div>
        </div>
      </div>
    </article>
  `).join('');
    // Клик по фото проекта — открыть лайтбокс
  grid.addEventListener('click', (e) => {
    const imgBox = e.target.closest('.case-image');
    if (!imgBox || imgBox.classList.contains('no-img')) return;
    const idx = +imgBox.dataset.projectIndex;
    const project = d.items[idx];
    if (!project) return;
        // Передаём весь массив, как у фото профиля
    const photos = (project.images && project.images.length)
      ? project.images
      : [];
    if (!photos.length) return;
    openLightbox(photos, 0, project.name);
  });

  // Клавиатура: Enter/Space на картинке проекта
  grid.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const imgBox = e.target.closest('.case-image');
    if (!imgBox || imgBox.classList.contains('no-img')) return;
    e.preventDefault();
    imgBox.click();
  });
  
}


// ---------- EXPERIENCE ----------
function renderExperience() {
  const d = SITE_DATA.experience;
  document.getElementById('experienceTitle').textContent = d.title;
  const timeline = document.getElementById('timeline');

  timeline.innerHTML = d.items.map((e, i) => {
    const isCurrent = /настоящее время|н\.в\./i.test(e.period);

    // Инициалы для монограммы/фолбэка
    const initials = e.company
      .replace(/[^\p{L}\p{N}\s]/gu, '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('');
    const isDuo = initials.length >= 2;
    const initialsClass = `company-logo${isDuo ? ' is-duo' : ''}`;

    // Логотип: картинка (если есть) с фолбэком на монограмму
    const logoHtml = e.logo
      ? `
        <div class="company-logo company-logo--img" aria-hidden="true">
          <img src="${e.logo}" alt="" loading="lazy"
               onerror="this.parentElement.classList.remove('company-logo--img'); this.parentElement.classList.add('company-logo--fallback'); this.parentElement.innerHTML='<span>${initials || '•'}</span>'">
          <span class="company-logo-fallback">${initials || '•'}</span>
        </div>`
      : `<div class="${initialsClass}" aria-hidden="true"><span>${initials || '•'}</span></div>`;

    return `
      <div class="timeline-item reveal">
        <div class="timeline-marker">
          <span class="marker-dot"></span>
          ${i < d.items.length - 1 ? '<span class="marker-line"></span>' : ''}
        </div>

        <div class="timeline-card">
          <div class="timeline-period">
            ${e.period}
            ${isCurrent ? '<span class="badge-current">сейчас</span>' : ''}
          </div>

          <div class="timeline-head">
            ${logoHtml}
            <div class="timeline-heading">
              <h3 class="timeline-role">${e.role}</h3>
              <p class="timeline-company">${e.company}</p>
            </div>
          </div>

          <p class="timeline-desc">${e.description}</p>

          ${e.achievements.length ? `
            <ul class="timeline-achievements">
              ${e.achievements.map(a => `<li>${a}</li>`).join('')}
            </ul>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// ---------- SKILLS ----------
function renderSkills() {
  const d = SITE_DATA.skills;
  document.getElementById('skillsTitle').textContent = d.title;
  const grid = document.getElementById('skillsGrid');

  grid.innerHTML = d.groups.map(g => `
    <div class="skill-group reveal">
      <h4>${g.name}</h4>
      <ul class="skill-list">
        ${g.items.map(i => `
          <li class="skill-item" data-level="${i.level ?? 3}">
            <span class="skill-name">${i.name}</span>
            <span class="skill-bar" aria-hidden="true">
              <span class="skill-bar-fill" style="--lvl:${(i.level ?? 3) / 5}"></span>
            </span>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');
}

// ---------- EDUCATION ----------
function renderEducation() {
  const d = SITE_DATA.education;
  document.getElementById('educationTitle').textContent = d.title;
  const grid = document.getElementById('educationGrid');

  grid.innerHTML = d.items.map(e => `
    <div class="edu-card reveal">
      <div class="edu-period">${e.period}</div>
      <h3 class="edu-degree">${e.degree}</h3>
      <p class="edu-institution">${e.institution}</p>
    </div>
  `).join('') + `
    <div class="edu-courses reveal">
      <h4>Повышение квалификации</h4>
      <ul>${d.courses.map(c => `<li>${c}</li>`).join('')}</ul>
    </div>
  `;
}

// ---------- CONTACTS ----------
function renderContacts() {
  const d = SITE_DATA.contacts;
  document.getElementById('contactsTitle').textContent = 'Связаться';
  document.getElementById('contactsSubtitle').textContent = d.subtitle;

  const grid = document.getElementById('contactsGrid');
  // Email вынесен отдельно в contact-hero, поэтому фильтруем его
  const items = d.items.filter(c => c.label !== 'Email');

  grid.innerHTML = items.map(c => `
    <a href="${c.link}" target="_blank" rel="noopener" class="contact-card reveal">
      <svg class="contact-icon"><use href="#icon-${c.icon}"/></svg>
      <div>
        <div class="contact-label">${c.label}</div>
        <div class="contact-value">${c.value}</div>
      </div>
    </a>
  `).join('');
}

// ============================================
//  NAVBAR (premium)
// ============================================
function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const navPill  = document.getElementById('navPill');
  const toggle   = document.getElementById('navToggle');
  const mobile   = document.getElementById('mobileMenu');
  const progress = document.getElementById('navProgress');
  const links    = navLinks.querySelectorAll('a[data-section]');

  // --- Плавающая pill-подложка ---
  const movePill = (el) => {
    if (!el) { navPill.classList.remove('visible'); return; }
    const navRect = navLinks.getBoundingClientRect();
    const elRect  = el.getBoundingClientRect();
    navPill.style.width     = elRect.width + 'px';
    navPill.style.transform = `translateX(${elRect.left - navRect.left - 4}px)`;
    navPill.classList.add('visible');
  };

  // --- Скролл: скрытие навбара + прогресс + активный пункт ---
  let lastY = window.scrollY;
  const sections = [...document.querySelectorAll('section[id]')];

  const onScroll = () => {
    const y = window.scrollY;

    // скрытие/появление
    if (y > 200 && y > lastY) navbar.classList.add('hidden');
    else navbar.classList.remove('hidden');

    navbar.classList.toggle('scrolled', y > 50);

    // прогресс-бар
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${Math.min((y / docH) * 100, 100)}%`;

    // активная секция (scroll-spy)
    let current = null;
    for (const s of sections) {
      const top = s.offsetTop - 140;
      if (y >= top) current = s.id;
    }
    links.forEach(a => {
      const isActive = a.dataset.section === current;
      a.classList.toggle('active', isActive);
      if (isActive) movePill(a);
    });
    if (!links.length || ![...links].some(a => a.classList.contains('active'))) {
      navPill.classList.remove('visible');
    }

    lastY = y;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    const active = navLinks.querySelector('a.active');
    if (active) movePill(active);
  });
  onScroll();

  // --- Мобильное меню ---
  const closeMenu = () => {
    toggle.classList.remove('open');
    mobile.classList.remove('open');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = mobile.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobile.classList.contains('open')) closeMenu();
  });
}

// ============================================
//  SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const els = document.querySelectorAll('.reveal, .fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => observer.observe(el));
}

// ============================================
//  COUNTERS
// ============================================
function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-value').forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();
  const isInt = Number.isInteger(target);

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = (isInt ? Math.round(current) : current.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ============================================
//  PROJECT SPOTLIGHT (эффект «прожектора» за курсором)
// ============================================
function initProjectSpotlight() {
  const cards = document.querySelectorAll('.project-case');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
}


// ============================================
//  LIGHTBOX (просмотр фото на весь экран)
// ============================================
let _lb = null;

function initLightbox() {
  const el       = document.getElementById('lightbox');
  const img      = document.getElementById('lightboxImg');
  const caption  = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn  = document.getElementById('lightboxPrev');
  const nextBtn  = document.getElementById('lightboxNext');
  const dotsWrap = document.getElementById('lightboxDots');
  const backdrop = el.querySelector('.lightbox-backdrop');

  _lb = {
    el, img, caption, closeBtn, prevBtn, nextBtn, dotsWrap, backdrop,
    photos: [],
    current: 0,
    baseCaption: '',
    lastFocus: null,
  };

  // Закрытие
  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);

  // Листание
  prevBtn.addEventListener('click', () => lbGo(_lb.current - 1));
  nextBtn.addEventListener('click', () => lbGo(_lb.current + 1));

  // Клавиатура
  document.addEventListener('keydown', (e) => {
    if (!el.classList.contains('open')) return;
    if (e.key === 'Escape')     { closeLightbox(); }
    if (e.key === 'ArrowLeft')  { lbGo(_lb.current - 1); }
    if (e.key === 'ArrowRight') { lbGo(_lb.current + 1); }
  });

  // Свайп на мобильных
  let startX = 0, dragging = false;
  el.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    dragging = true;
  }, { passive: true });
  el.addEventListener('touchend', (e) => {
    if (!dragging) return;
    dragging = false;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) lbGo(_lb.current + (dx < 0 ? 1 : -1));
  });
}

function openLightbox(photos, index, caption) {
  if (!_lb || !photos || !photos.length) return;

  _lb.photos     = photos.slice();
  _lb.current    = index;
  _lb.baseCaption = caption || '';
  _lb.lastFocus  = document.activeElement;

  const el = _lb.el;

  // Режимы: single / multi
  el.classList.toggle('single', photos.length <= 1);
  el.classList.toggle('multi',  photos.length > 1);

  // Точки
  if (photos.length > 1) {
    _lb.dotsWrap.innerHTML = photos.map((_, i) =>
      `<button class="lightbox-dot${i === index ? ' active' : ''}" data-index="${i}" aria-label="Фото ${i + 1}"></button>`
    ).join('');
    // Пересоздаём обработчики на точках
    _lb.dotsWrap.querySelectorAll('.lightbox-dot').forEach(dot => {
      dot.addEventListener('click', () => lbGo(+dot.dataset.index));
    });
  } else {
    _lb.dotsWrap.innerHTML = '';
  }

  lbRender();

  el.classList.add('open');
  el.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-lock');

  // Фокус на кнопку закрытия
  setTimeout(() => _lb.closeBtn.focus(), 50);
}

function lbGo(index) {
  if (!_lb || !_lb.photos.length) return;
  const n = _lb.photos.length;
  _lb.current = (index + n) % n;
  lbRender();
}

function lbRender() {
  if (!_lb) return;
  const { img, caption, dotsWrap, photos, current, baseCaption } = _lb;

  img.src = photos[current];
  img.alt = baseCaption || `Фото ${current + 1}`;

  // Подпись: базовое имя + счётчик, если фото несколько
  if (photos.length > 1) {
    caption.textContent = `${baseCaption} — ${current + 1} / ${photos.length}`;
  } else {
    caption.textContent = baseCaption;
  }

  // Активная точка
  if (dotsWrap) {
    dotsWrap.querySelectorAll('.lightbox-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }
}

function closeLightbox() {
  if (!_lb) return;
  const el = _lb.el;
  el.classList.remove('open');
  el.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-lock');

  // Возвращаем фокус
  if (_lb.lastFocus && typeof _lb.lastFocus.focus === 'function') {
    _lb.lastFocus.focus();
  }

  // Очистка картинки после анимации
  setTimeout(() => {
    if (!el.classList.contains('open')) {
      _lb.img.src = '';
      _lb.img.alt = '';
    }
  }, 350);
}