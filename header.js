// PME BTP — Shared Header Component
// Included on all pages via <script src="/header.js"></script>

(function() {
  // Pages registry — add new pages here
  const pages = [
    { url: '/', label: 'Accueil', tag: 'Accueil', title: 'Tous les documents' },
    { url: '/offre-clement.html', label: 'Offre d\'emploi', tag: 'Offre d\'emploi', title: 'Commercial — Clément' },
    { url: '/playbook-csm.html', label: 'Playbook', tag: 'Playbook', title: 'Customer Success — 100 jours' },
    { url: '/mission-csm.html', label: 'Offre de mission', tag: 'Mission freelance', title: 'CSM — Customer Success Manager' },
    { url: '/offre-cos.html', label: 'Offre de mission', tag: 'Mission freelance', title: 'Chief of Staff / Dir. Opérations' },
    { url: '/candidatures.html', label: 'Outil interne', tag: 'Outil interne', title: 'Suivi Candidatures' },
    { url: '/kaki-dashboard.html', label: 'Due Diligence', tag: 'Due Diligence', title: 'KAKI — Dashboard Financier' },
    { url: '/pmebtp-dashboard.html', label: 'Analyse CA', tag: 'Analyse CA', title: 'Clients & CA — Dashboard' },
  ];

  // Inject shared styles
  const style = document.createElement('style');
  style.textContent = `
    .pmebtp-header {
      background: #ffffff;
      border-bottom: 3px solid #d14718;
      padding: 20px 0;
      position: sticky;
      top: 0;
      z-index: 10;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }
    .pmebtp-header-inner {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .pmebtp-logo-link {
      text-decoration: none;
      display: block;
      transition: opacity 0.2s;
    }
    .pmebtp-logo-link:hover { opacity: 0.7; }
    .pmebtp-logo {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .pmebtp-logo span:first-child { color: #d14718; }
    .pmebtp-logo span:last-child { color: #111; }
    .pmebtp-logo-sub {
      font-size: 11px;
      color: #999;
      font-weight: 500;
      margin-top: 2px;
    }
    .pmebtp-header-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .pmebtp-header-link {
      font-size: 13px;
      color: #999;
      text-decoration: none;
      transition: color 0.2s;
    }
    .pmebtp-header-link:hover { color: #d14718; }
    .pmebtp-nav-dropdown { position: relative; }
    .pmebtp-nav-toggle {
      font-size: 13px;
      font-weight: 600;
      color: #666;
      background: #fafafa;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      padding: 8px 14px;
      cursor: pointer;
      transition: border-color 0.2s;
      font-family: inherit;
    }
    .pmebtp-nav-toggle:hover { border-color: #d14718; }
    .pmebtp-nav-menu {
      display: none;
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      background: #ffffff;
      border: 1.5px solid #e5e5e5;
      border-radius: 10px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.1);
      min-width: 280px;
      z-index: 100;
      overflow: hidden;
    }
    .pmebtp-nav-menu.open { display: block; }
    .pmebtp-nav-menu a {
      display: block;
      padding: 12px 16px;
      font-size: 13px;
      font-weight: 500;
      color: #333;
      text-decoration: none;
      border-bottom: 1px solid #e5e5e5;
      transition: background 0.15s;
    }
    .pmebtp-nav-menu a:last-child { border-bottom: none; }
    .pmebtp-nav-menu a:hover { background: #fdf2ee; }
    .pmebtp-nav-menu a.active { background: #fdf2ee; border-left: 3px solid #d14718; }
    .pmebtp-nav-menu a .nav-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: #d14718;
      display: block;
      margin-bottom: 2px;
    }
    @media (max-width: 600px) {
      .pmebtp-header-link { display: none; }
    }
  `;
  document.head.appendChild(style);

  // Find current page name for toggle label
  const currentPath = window.location.pathname;
  const currentPage = pages.find(p => currentPath === p.url || (p.url !== '/' && currentPath.endsWith(p.url)));
  const toggleLabel = currentPage ? currentPage.title : 'Navigation';

  const navLinks = pages.map(p => {
    const isActive = currentPath === p.url || (p.url !== '/' && currentPath.endsWith(p.url));
    return `<a href="${p.url}" class="${isActive ? 'active' : ''}"><span class="nav-label">${p.tag}</span>${p.title}</a>`;
  }).join('');

  // Build header HTML
  const header = document.createElement('div');
  header.className = 'pmebtp-header';
  header.innerHTML = `
    <div class="pmebtp-header-inner">
      <a href="/" class="pmebtp-logo-link">
        <div class="pmebtp-logo"><span>PME</span><span>BTP</span></div>
        <div class="pmebtp-logo-sub">Service Emploi spécialisé depuis 27 ans</div>
      </a>
      <div class="pmebtp-header-right">
        <a href="https://www.pmebtp.com" target="_blank" class="pmebtp-header-link">pmebtp.com ↗</a>
        <div class="pmebtp-nav-dropdown">
          <button class="pmebtp-nav-toggle">${toggleLabel} ▾</button>
          <div class="pmebtp-nav-menu">${navLinks}</div>
        </div>
      </div>
    </div>
  `;

  // Insert at top of body
  document.body.insertBefore(header, document.body.firstChild);

  // Toggle menu
  const toggle = header.querySelector('.pmebtp-nav-toggle');
  const menu = header.querySelector('.pmebtp-nav-menu');
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('open');
  });
  document.addEventListener('click', () => menu.classList.remove('open'));
})();
