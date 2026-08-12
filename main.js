document.getElementById('year').textContent = new Date().getFullYear();

function handleSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('form-success');
  success.hidden = false;
  e.target.reset();
  setTimeout(() => { success.hidden = true; }, 5000);
}

// Subtle nav shadow on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10
    ? '0 2px 24px rgba(0,0,0,0.4)'
    : 'none';
}, { passive: true });
