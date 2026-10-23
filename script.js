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

// A vitrine é alimentada por games.json. Nunca coloque chaves de jogos neste arquivo.
const catalog = document.querySelector('#game-catalog');
const searchInput = document.querySelector('#game-search');
const categorySelect = document.querySelector('#game-category');
let games = [];

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function renderGames() {
  if (!catalog) return;
  const query = (searchInput?.value || '').trim().toLocaleLowerCase('pt-BR');
  const category = categorySelect?.value || 'all';
  const filtered = games.filter(game => {
    const matchesQuery = `${game.title || ''} ${game.description || ''} ${game.category || ''}`
      .toLocaleLowerCase('pt-BR').includes(query);
    const matchesCategory = category === 'all' || game.category === category;
    return matchesQuery && matchesCategory;
  });

  if (!filtered.length) {
    const hasFilters = query || category !== 'all';
    catalog.innerHTML = `<div class="catalog-empty"><strong>${hasFilters ? 'Nenhum jogo encontrado' : 'A vitrine está sendo montada'}</strong>${hasFilters ? 'Tente outra busca ou categoria.' : 'Os jogos serão publicados aqui assim que a disponibilidade for confirmada. Volte em breve, reencarnado!'}</div>`;
    return;
  }

  catalog.innerHTML = filtered.map(game => {
    const available = game.status === 'available';
    const status = available ? 'Disponível' : 'Em breve';
    const icon = escapeHTML(game.icon || '🎮');
    const coverUrl = escapeHTML(game.cover_url || '');
    const points = Number(game.points) > 0 ? Number(game.points).toLocaleString('pt-BR') + ' pontos' : 'Ver na Twitch';
    const title = escapeHTML(game.title || 'Jogo');
    const description = escapeHTML(game.description || 'Detalhes em breve.');
    const gameCategory = escapeHTML(game.category || 'Outros');
    const action = available
      ? `<a class="game-action active" href="https://www.twitch.tv/jijirencarnado" target="_blank" rel="noopener">${points} <span aria-hidden="true">↗</span></a>`
      : '<span class="game-action" aria-disabled="true">Resgates ainda não disponíveis</span>';
    return `<article class="game-card">
      <div class="game-art">${coverUrl ? `<img src="${coverUrl}" alt="Capa de ${title}" loading="lazy">` : icon}</div>
      <div class="game-info"><span class="game-category">${gameCategory}</span><h3>${title}</h3>
      <p>${description}</p><span class="game-status ${available ? 'available' : ''}">${status}</span>${action}</div>
    </article>`;
  }).join('');
}

async function loadGames() {
  if (!catalog) return;
  try {
    const response = await fetch('games.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Não foi possível carregar o catálogo.');
    const data = await response.json();
    games = Array.isArray(data) ? data.filter(game => game && typeof game.title === 'string') : [];
    const categories = [...new Set(games.map(game => game.category).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect?.append(option);
    });
    renderGames();
  } catch {
    catalog.innerHTML = '<div class="catalog-empty"><strong>Não conseguimos carregar a vitrine agora.</strong>Tente atualizar a página daqui a pouco.</div>';
  }
}

searchInput?.addEventListener('input', renderGames);
categorySelect?.addEventListener('change', renderGames);
loadGames();