document.getElementById('year').textContent = new Date().getFullYear();

// ── Contact form ──────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('form-success');
  success.hidden = false;
  e.target.reset();
  setTimeout(() => { success.hidden = true; }, 5000);
}

// ── Nav shadow on scroll + hero parallax ─────────────────────
const nav    = document.querySelector('.nav');
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.style.boxShadow = y > 10 ? '0 2px 24px rgba(0,0,0,0.4)' : 'none';
  if (heroBg) heroBg.style.transform = `translateY(${y * 0.28}px)`;
}, { passive: true });

// ── Hamburger / mobile overlay ────────────────────────────────
const hamburger = document.getElementById('nav-hamburger');
const overlay   = document.getElementById('nav-overlay');
const closeBtn  = document.getElementById('nav-overlay-close');
const overlayLinks = overlay.querySelectorAll('.overlay-link');

function openMenu() {
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  hamburger.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlayLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (overlay.classList.contains('is-open')) closeMenu();
    if (previewModal.classList.contains('is-open')) closePreview();
  }
  if (previewModal.classList.contains('is-open')) {
    if (e.key === 'ArrowLeft')  stepPreview(-1);
    if (e.key === 'ArrowRight') stepPreview(1);
  }
});

// ── Scroll reveal (IntersectionObserver) ─────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Collection preview modal ──────────────────────────────────
const previewModal    = document.getElementById('preview-modal');
const previewImg      = document.getElementById('preview-modal-img');
const previewTitle    = document.getElementById('preview-modal-title');
const previewCounter  = document.getElementById('preview-modal-counter');
const previewClose    = document.getElementById('preview-modal-close');
const previewBackdrop = document.getElementById('preview-modal-backdrop');
const previewPrev     = document.getElementById('preview-prev');
const previewNext     = document.getElementById('preview-next');
const previewSoon     = document.getElementById('preview-coming-soon');

let previewPhotos = [];
let previewIdx    = 0;

function showPhoto(idx) {
  previewIdx = ((idx % previewPhotos.length) + previewPhotos.length) % previewPhotos.length;
  previewImg.src = previewPhotos[previewIdx];
  previewCounter.textContent = `${previewIdx + 1} / ${previewPhotos.length}`;
}

function stepPreview(dir) { showPhoto(previewIdx + dir); }

function openPreview(card) {
  const title = card.querySelector('.collection-info h3').textContent;
  previewPhotos = JSON.parse(card.dataset.photos || '[]');
  previewTitle.textContent = title;

  if (previewPhotos.length === 0) {
    previewImg.hidden   = true;
    previewSoon.hidden  = false;
    previewPrev.hidden  = true;
    previewNext.hidden  = true;
    previewCounter.textContent = '';
  } else {
    previewImg.hidden   = false;
    previewSoon.hidden  = true;
    previewPrev.hidden  = false;
    previewNext.hidden  = false;
    showPhoto(0);
  }

  previewModal.classList.add('is-open');
  previewModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePreview() {
  previewModal.classList.remove('is-open');
  previewModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  previewImg.src = '';
}

// Preview button opens modal
document.querySelectorAll('.preview-btn').forEach(btn => {
  btn.addEventListener('click', () => openPreview(btn.closest('.collection-card')));
});

previewClose.addEventListener('click', closePreview);
previewBackdrop.addEventListener('click', closePreview);
previewPrev.addEventListener('click', () => stepPreview(-1));
previewNext.addEventListener('click', () => stepPreview(1));
