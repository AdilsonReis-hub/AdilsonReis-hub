const button = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');

button?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  button.setAttribute('aria-expanded', String(open));
  button.textContent = open ? '✕' : '☰';
});

document.querySelectorAll('.nav nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    button?.setAttribute('aria-expanded', 'false');
    if (button) button.textContent = '☰';
  });
});