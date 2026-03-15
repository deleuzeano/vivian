// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// === MOBILE MENU ===
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// === GALLERY FILTER ===
const filtros = document.querySelectorAll('.filtro');
const items = document.querySelectorAll('.gallery-item');

filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    filtros.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    items.forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// === LIGHTBOX ===
let currentIndex = 0;
let visibleItems = [];

function getVisible() {
  return Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
}

document.querySelectorAll('.gallery-item').forEach((item, idx) => {
  item.addEventListener('click', () => {
    visibleItems = getVisible();
    currentIndex = visibleItems.indexOf(item);
    openLightbox(visibleItems[currentIndex].querySelector('img').src);
  });
});

function openLightbox(src) {
  document.getElementById('lb-img').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function prevImg(e) {
  e.stopPropagation();
  visibleItems = getVisible();
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  document.getElementById('lb-img').src = visibleItems[currentIndex].querySelector('img').src;
}

function nextImg(e) {
  e.stopPropagation();
  visibleItems = getVisible();
  currentIndex = (currentIndex + 1) % visibleItems.length;
  document.getElementById('lb-img').src = visibleItems[currentIndex].querySelector('img').src;
}

document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImg(e);
  if (e.key === 'ArrowRight') nextImg(e);
});

// === REVEAL ON SCROLL ===
const revealEls = document.querySelectorAll(
  '.sobre-text, .sobre-imgs, .servico-card, .contato-info, .contato-img, .section-header'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// Stagger para cards de serviço
const cards = document.querySelectorAll('.servico-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });
cards.forEach(card => cardObserver.observe(card));
