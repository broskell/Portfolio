// ── Shared navigation & keyboard shortcuts ──────────────────────────────────

const pages = [
  { key: '1', label: 'Home',       href: 'index.html',     icon: '⌂' },
  { key: '2', label: 'About',      href: 'about.html',     icon: '◉' },
  { key: '3', label: 'Education',  href: 'education.html', icon: '◈' },
  { key: '4', label: 'Projects',   href: 'projects.html',  icon: '◆' },
  { key: '5', label: 'Tech Stack', href: 'techstack.html', icon: '◇' },
  { key: '6', label: 'Terminal',   href: 'terminal.html',  icon: '>_' },
  { key: '7', label: 'Contact',    href: 'contact.html',   icon: '✉' },
];

function buildNav() {
  const current = location.pathname.split('/').pop() || 'index.html';

  const navHTML = `
  <nav class="fixed top-0 left-0 right-0 h-16 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-900 flex items-center px-6 gap-8">
    <div class="font-mono text-yellow-400 text-xl tracking-widest font-bold shrink-0">SK</div>
    <div class="hidden md:flex items-center gap-1 flex-1 justify-center">
      ${pages.map(p => `
        <a href="${p.href}" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all duration-200 no-underline
          ${current === p.href
            ? 'text-yellow-400 bg-yellow-400/10 border-yellow-700/40'
            : 'text-neutral-500 border-transparent hover:text-white hover:bg-neutral-900 hover:border-neutral-700'
          }">
          <span>${p.icon}</span>
          <span>${p.label}</span>
          <span class="font-mono text-[10px] px-1 py-0.5 rounded bg-neutral-900 border ${current === p.href ? 'text-yellow-700 border-yellow-900' : 'text-neutral-600 border-neutral-700'} ml-0.5">⌃${p.key}</span>
        </a>
      `).join('')}
    </div>
    <button onclick="toggleMobileMenu()" class="md:hidden ml-auto flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1">
      <span class="block w-5 h-0.5 bg-neutral-400 rounded"></span>
      <span class="block w-5 h-0.5 bg-neutral-400 rounded"></span>
      <span class="block w-5 h-0.5 bg-neutral-400 rounded"></span>
    </button>
  </nav>
  <div id="mobile-menu" class="fixed top-16 left-0 right-0 z-40 bg-black border-b border-neutral-900 p-3 flex-col gap-1 hidden">
    ${pages.map(p => `
      <a href="${p.href}" class="flex items-center gap-3 px-4 py-3 rounded-xl no-underline font-semibold text-sm transition-all duration-200
        ${current === p.href ? 'text-yellow-400 bg-yellow-400/5' : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'}">
        <span>${p.icon}</span> ${p.label}
        <small class="ml-auto font-mono text-[10px] text-neutral-600">Ctrl+${p.key}</small>
      </a>
    `).join('')}
  </div>
  <div id="shortcut-toast" class="fixed z-[9999] left-1/2 font-mono text-sm text-yellow-400 bg-neutral-900 border border-yellow-900 px-5 py-2 rounded-full pointer-events-none whitespace-nowrap transition-all duration-300"
    style="bottom:70px;transform:translateX(-50%) translateY(10px);opacity:0;">
  </div>`;

  const nc = document.getElementById('nav-container');
  if (nc) nc.innerHTML = navHTML;

  const barHTML = `
  <div class="fixed bottom-0 left-0 right-0 h-14 z-50 bg-black/90 backdrop-blur-md border-t border-neutral-900 flex items-center justify-around">
    ${pages.map(p => `
      <a href="${p.href}" class="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg no-underline min-w-[44px] transition-all duration-200
        ${current === p.href ? 'text-yellow-400' : 'text-neutral-500 hover:text-white hover:bg-neutral-900'}">
        <span class="text-base leading-none">${p.icon}</span>
        <span class="text-[10px] font-semibold tracking-wide hidden sm:block">${p.label}</span>
      </a>
    `).join('')}
  </div>`;

  const bc = document.getElementById('bar-container');
  if (bc) bc.innerHTML = barHTML;
}

function toggleMobileMenu() {
  const m = document.getElementById('mobile-menu');
  m.classList.toggle('hidden');
  m.classList.toggle('flex');
}

function showToast(msg) {
  const t = document.getElementById('shortcut-toast');
  if (!t) return;
  t.textContent = msg;
  t.style.opacity = '1';
  t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(10px)';
  }, 1200);
}

document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && !e.shiftKey && !e.altKey) {
    const p = pages.find(x => x.key === e.key);
    if (p) {
      e.preventDefault();
      showToast('→ ' + p.label);
      setTimeout(() => location.href = p.href, 300);
    }
  }
});

document.addEventListener('DOMContentLoaded', buildNav);
