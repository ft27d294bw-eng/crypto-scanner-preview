/* Public release notice for the safe first deployment. RU / EN. */
(() => {
  'use strict';
  if (location.protocol === 'file:') return;
  fetch('/api/config', {cache:'no-store'}).then(r => r.ok ? r.json() : null).then(config => {
    if (!config?.publicPreview) return;
    document.documentElement.classList.add('cs-public-preview');
    const banner = document.createElement('div');
    banner.id = 'csPreviewBanner';
    banner.setAttribute('role', 'status');
    banner.className = 'cs-preview-banner';
    const dot = document.createElement('span');
    dot.className = 'cs-preview-dot';
    const copy = document.createElement('span');
    copy.id = 'csPreviewCopy';
    banner.append(dot, copy);
    const main = document.querySelector('.main-content');
    if (main) main.prepend(banner);
    const note = document.createElement('p');
    note.id = 'csPreviewAuthNote';
    note.className = 'cs-preview-auth-note';
    document.querySelector('.auth-card')?.appendChild(note);
    function update(){
      const lang = document.querySelector('.lang-switch [data-lang].active')?.dataset.lang || document.documentElement.lang || 'ru';
      const isEnglish = lang === 'en';
      copy.textContent = isEnglish
        ? 'PUBLIC PREVIEW · Market analytics only · No live trading or server accounts'
        : 'ПУБЛИЧНАЯ БЕТА · Аналитика рынка · Без торговли и серверных аккаунтов';
      note.textContent = isEnglish
        ? 'Email signup is disabled for this preview. Your profile, avatar and portfolio remain on this device only. Never enter passwords or sensitive financial data here.'
        : 'Регистрация по email временно отключена. Профиль, аватар и портфель хранятся только на этом устройстве. Не вводите пароли и личные финансовые данные.';
    }
    update();
    document.addEventListener('click', e => {
      if(e.target.closest('[data-lang]')) setTimeout(update, 0);
    });
  }).catch(() => {});
})();
