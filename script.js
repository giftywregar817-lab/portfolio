/* 
   PORTFOLIO GIFTY WELIAN SIREGAR — script.js
   */

/* ─────────────────────────────────────────────
   DATA PROYEK (untuk detail halaman 3)
───────────────────────────────────────────── */
const projects = [
  {
    title: "Galton Board Simulation",
    tag: "Pemrograman",
    img: "assets/galton2.png",
    desc: "Membangun program simulasi pergerakan acak pada Galton Board melalui Google Colab guna mendemonstrasikan pembentukan kurva distribusi normal.",
    meta: [
      { label: "Tool", value: "Google Colab" },
      { label: "Kategori", value: "Matematika Diskrit" },
      { label: "Tahun", value: "2025" },
    ]
  },
  {
    title: "Koran Sindo Digital",
    tag: "Web Development",
    img: "assets/koranfix.png",
    desc: "Mendesain koran menggunakan Figma dengan menggunakan sistem grid multi-kolom yang presisi, manajemen gaya tipografi, dan hierarki visual yang efektif untuk meningkatkan keterbacaan berita. ",
    meta: [
      { label: "Tool", value: "Figma" },
      { label: "Kategori", value: "Desain UI" },
      { label: "Tahun", value: "2026" },
    ]
  },
  {
    title: "E-Commerce Website",
    tag: "Desain UI/UX",
    img: "assets/erd.png",
    desc: "Memodelkan struktur data  melalui diagram ERD sebagai fondasi utama dalam pengembangan sistem informasi e-commerce yang efisien, skalabel, dan terintegrasi",
    meta: [
      { label: "Tool", value: "Draw.io" },
      { label: "Kategori", value: "Desain Basis Data" },
      { label: "Tahun", value: "2026" },
    ]
  },
  {
    title: "Caffe in Aja",
    tag: "Desain UI",
    img: "assets/cafein2.png",
    desc: "Membangun prototipe desain CafeinAja dengan tata letak yang responsif  untuk memberikan pengalaman eksplorasi menu yang menarik bagi pengguna.",
    meta: [
      { label: "Tool", value: "Figma, Canva" },
      { label: "Kategori", value: "Desain UI Mobile" },
      { label: "Tahun", value: "2026" },
    ]
  },
  {
    title: "KohiShop",
    tag: "Presentasi",
    img: "assets/coding.png",
    desc: "Membangun program pemesanan KohiShop berbasis menggunakan Java, menerapkan konsep Object-Oriented Programming (OOP) untuk manajemen menu dan transaksi",
    meta: [
      { label: "Tool", value: "VS Code" },
      { label: "Kategori", value: "Pemrograman Java" },
      { label: "Tahun", value: "2026" },
    ]
  }
];

/* ─────────────────────────────────────────────
   1. TOPBAR — scroll & active link
───────────────────────────────────────────── */
const topbar = document.getElementById('topbar');
const navLinks = document.querySelectorAll('.topbar__link');
const sections = document.querySelectorAll('section[id]');

function updateTopbar() {
  // Shadow on scroll
  if (window.scrollY > 20) {
    topbar.classList.add('scrolled');
  } else {
    topbar.classList.remove('scrolled');
  }

  let current = '';
  sections.forEach(sec => {
  if (sec.id === 'project-detail') return;

  const top = sec.offsetTop - 120;

  if (window.scrollY >= top) {
    current = sec.id;
  }
});

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      // Jika section portfolio sedang tersembunyi, tampilkan dulu
      if (targetId === 'portfolio' && portfolioSection.style.display === 'none') {
        detailSection.style.display = 'none';
        portfolioSection.style.display = 'block';
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const top = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        });
      });
    }
  });
});

window.addEventListener('scroll', updateTopbar, { passive: true });
updateTopbar();

/* ─────────────────────────────────────────────
   2. FADE-UP SCROLL ANIMATION
───────────────────────────────────────────── */
const fadeElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // fire once
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

fadeElements.forEach(el => observer.observe(el));

/* ─────────────────────────────────────────────
   3. PORTFOLIO SLIDER
───────────────────────────────────────────── */
const slider = document.getElementById('portfolioSlider');
const btnPrev = document.getElementById('sliderPrev');
const btnNext = document.getElementById('sliderNext');
const indicatorsWrap = document.getElementById('sliderIndicators');

const CARD_W = 380 + 32; // card width + gap
const VISIBLE = 3;       // visible cards at once
const TOTAL = projects.length;
let currentSlide = 0;

// Build dot indicators
if (indicatorsWrap) {
  for (let i = 0; i < TOTAL; i++) {
    const dot = document.createElement('button');

    dot.className =
      'slider__dot' + (i === 0 ? ' active' : '');

    dot.setAttribute(
      'aria-label',
      `Slide ${i + 1}`
    );

    dot.addEventListener('click', () => goToSlide(i));

    indicatorsWrap.appendChild(dot);
  }
}

function goToSlide(index) {
  currentSlide = Math.max(0, Math.min(index, TOTAL - VISIBLE));
  slider.scrollTo({ left: currentSlide * CARD_W, behavior: 'smooth' });
  updateIndicators();
  updateSliderButtons();
}

function updateIndicators() {
  document.querySelectorAll('.slider__dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function updateSliderButtons() {
  btnPrev.style.opacity = currentSlide === 0 ? '0.35' : '1';
  btnNext.style.opacity = currentSlide >= TOTAL - VISIBLE ? '0.35' : '1';
}

btnPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
btnNext.addEventListener('click', () => goToSlide(currentSlide + 1));

slider.addEventListener('scroll', () => {
  const newSlide = Math.round(slider.scrollLeft / CARD_W);
  if (newSlide !== currentSlide) {
    currentSlide = newSlide;
    updateIndicators();
    updateSliderButtons();
  }
}, { passive: true });

// Mouse drag to scroll
let isDragging = false;
let startX = 0;
let scrollStart = 0;

slider.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
  scrollStart = slider.scrollLeft;
  slider.classList.add('grabbing');
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const dx = startX - e.clientX;
  slider.scrollLeft = scrollStart + dx;
});

window.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  slider.classList.remove('grabbing');
  const nearest = Math.round(slider.scrollLeft / CARD_W);
  goToSlide(nearest);
});

// Touch drag
let touchStartX = 0;
let touchScrollStart = 0;

slider.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchScrollStart = slider.scrollLeft;
}, { passive: true });

slider.addEventListener('touchmove', e => {
  const dx = touchStartX - e.touches[0].clientX;
  slider.scrollLeft = touchScrollStart + dx;
}, { passive: true });

slider.addEventListener('touchend', () => {
  const nearest = Math.round(slider.scrollLeft / CARD_W);
  goToSlide(nearest);
});

// Init
updateSliderButtons();

/* ─────────────────────────────────────────────
   4. PROJECT DETAIL 
───────────────────────────────────────────── */
const portfolioSection = document.getElementById('portfolio');
const detailSection = document.getElementById('project-detail');

function openProject(index) {
  const p = projects[index];

  document.getElementById("detailImg").src = p.img;
  document.getElementById("detailImg").alt = p.title;
  document.getElementById("detailTag").textContent = p.tag;
  document.getElementById("detailTitle").textContent = p.title;
  document.getElementById("detailBody").textContent =p.desc;

  const metaEl =
    document.getElementById("detailMeta");

  metaEl.innerHTML = "";

  p.meta.forEach(item => {
    metaEl.innerHTML += `
      <div class="detail__meta-row">
        <span class="detail__meta-label">
          ${item.label}
        </span>
        <span class="detail__meta-value">
          ${item.value}
        </span>
      </div>
    `;
  });

  portfolioSection.style.display = "none";
  detailSection.style.display = "block";

  window.scrollTo({
    top: detailSection.offsetTop - 70,
    behavior: "smooth"
  });
}

function closeProject() {
  
  detailSection.style.display = 'none';
  portfolioSection.style.display = 'block';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const top = portfolioSection.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// Expose globally (dipanggil dari onclick di HTML)
window.openProject = openProject;
window.closeProject = closeProject;

/* ─────────────────────────────────────────────
   5. HERO SCROLL HINT — hide after scrolling
───────────────────────────────────────────── */
const scrollHint = document.querySelector('.hero__scroll-hint');
if (scrollHint) {
  window.addEventListener('scroll', () => {
    scrollHint.style.opacity = window.scrollY > 80 ? '0' : '1';
  }, { passive: true });
}

/* ─────────────────────────────────────────────
   6. TIMELINE NODE ANIMATION
───────────────────────────────────────────── */
const timelineNodes = document.querySelectorAll('.timeline__node');
const timelineObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    timelineNodes.forEach((node, i) => {
      setTimeout(() => {
        node.style.transform = 'scale(1.3)';
        node.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
          node.style.transform = 'scale(1)';
        }, 300);
      }, i * 250);
    });
    timelineObserver.disconnect();
  }
}, { threshold: 0.5 });

const timeline = document.querySelector('.timeline');
if (timeline) timelineObserver.observe(timeline);

/* ─────────────────────────────────────────────
   7. SOFT SKILL CARD HOVER — stagger entrance
───────────────────────────────────────────── */
const softItems = document.querySelectorAll('.softskill__item');
const softObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      softItems.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, i * 100);
      });
      softObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

// Initial hidden state via JS (graceful: tidak hidden jika JS gagal)
softItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const softSection = document.getElementById('softskill');
if (softSection) softObserver.observe(softSection);

/* ─────────────────────────────────────────────
   8. CONTACT LINKS — efek klik
───────────────────────────────────────────── */
document.querySelectorAll('.contact__link').forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.getAttribute('href') === '#') {
      e.preventDefault();
    }
    this.style.transform = 'translateX(12px)';
    setTimeout(() => {
      this.style.transform = '';
    }, 200);
  });
});

/* ─────────────────────────────────────────────
   9. FOOTER — back to top smooth scroll
───────────────────────────────────────────── */
const backTop = document.querySelector('.footer__back-top');
if (backTop) {
  backTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
