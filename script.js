const btn = document.getElementById('themeBtn');
const icon = document.getElementById('themeIcon')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
let dark = prefersDark;
const menuBtn = document.getElementById('menuBtn');
const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');
const form = document.querySelector('.contact-form')


if (dark) {
  document.body.classList.add('dark');
  icon.className = 'mdi mdi-weather-sunny';
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  dark = e.matches;
  document.body.classList.toggle('dark', dark);
  icon.className = dark ? 'mdi mdi-weather-sunny' : 'mdi mdi-moon-waning-crescent';
});


btn.addEventListener("click", () => {
    dark = !dark
    document.body.classList.toggle('dark', dark);
    icon.className = dark ? "mdi mdi-weather-sunny" : "mdi mdi-weather-night"
});

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  menuIcon.className = isOpen ? 'mdi mdi-close' : 'mdi mdi-menu';
});


form.addEventListener('submit', async (e) =>{
  e.preventDefault();
  
  const data = new FormData(form);
  
  const res = await fetch(form.action, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (res.ok) {
    form.reset();
    const msg = document.getElementById('form-success');
    msg.style.display = 'block';
    setTimeout(() => {
      msg.style.display = 'none';
    }, 3000);
  }
})

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));