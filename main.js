document.getElementById('year').textContent = new Date().getFullYear();

// ── Contact form ──────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('form-success');
  success.hidden = false;
  e.target.reset();
  setTimeout(() => { success.hidden = true; }, 5000);
}

// ── Nav shadow on scroll ──────────────────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10
    ? '0 2px 24px rgba(0,0,0,0.4)'
    : 'none';
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

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeMenu();
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
