const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const loadingScreen = document.getElementById('loadingScreen');
const backToTop = document.getElementById('backToTop');
const reveals = document.querySelectorAll('.reveal');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
}

const updateThemeIcon = () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  themeToggle.querySelector('.toggle-icon').textContent = isDark ? '🌙' : '☀️';
};

updateThemeIcon();

themeToggle.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
  updateThemeIcon();
});

window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 900);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => observer.observe(el));

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 520);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
