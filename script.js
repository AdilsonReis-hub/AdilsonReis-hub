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
const jijiHead = document.querySelector(".jiji-head");

document.addEventListener("mousemove", (e) => {
    if (!jijiHead) return;

    const rect = jijiHead.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Movimento horizontal
    let rotate = deltaX * 0.012;
    rotate = Math.max(-10, Math.min(10, rotate));

    // Movimento vertical bem sutil
    let moveY = deltaY * 0.004;
    moveY = Math.max(-3, Math.min(3, moveY));

    jijiHead.style.transform =
        `translateX(-50%) translateY(${moveY}px) rotate(${rotate}deg)`;
});