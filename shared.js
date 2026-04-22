// ── Shared navigation & keyboard shortcuts ──────────────────────────────────

const pages = [
  { key: '1', label: 'Home',       href: 'index.html',     icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>' },
  { key: '2', label: 'About',      href: 'about.html',     icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M440-280h80v-240h-80v240Zm68.5-331.5Q520-623 520-640t-11.5-28.5Q497-680 480-680t-28.5 11.5Q440-657 440-640t11.5 28.5Q463-600 480-600t28.5-11.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>' },
  { key: '3', label: 'Education',  href: 'education.html', icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M270-80q-45 0-77.5-30.5T160-186v-558q0-38 23.5-68t61.5-38l395-78v640l-379 76q-9 2-15 9.5t-6 16.5q0 11 9 18.5t21 7.5h450v-640h80v720H270Zm90-233 200-39v-478l-200 39v478Zm-80 16v-478l-15 3q-11 2-18 9.5t-7 18.5v457q5-2 10.5-3.5T261-293l19-4Zm-40-472v482-482Z"/></svg>' },
  { key: '4', label: 'Projects',   href: 'projects.html',  icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M160-240v-480 520-40Zm0 80q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v200h-80v-200H447l-80-80H160v480h200v80H160ZM584-56 440-200l144-144 56 57-87 87 87 87-56 57Zm192 0-56-57 87-87-87-87 56-57 144 144L776-56Z"/></svg>' },
  { key: '5', label: 'Tech Stack', href: 'techstack.html', icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M480-400 40-640l440-240 440 240-440 240Zm0 160L63-467l84-46 333 182 333-182 84 46-417 227Zm0 160L63-307l84-46 333 182 333-182 84 46L480-80Zm0-411 273-149-273-149-273 149 273 149Zm0-149Z"/></svg>' },
  { key: '6', label: 'Terminal',   href: 'terminal.html',  icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M480-160v-80h320v80H480ZM220-320l-56-56 183-184-183-184 56-56 240 240-240 240Z"/></svg>' },
  { key: '7', label: 'Contact',    href: 'contact.html',   icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>' },
];

function buildNav() {
  const current = location.pathname.split('/').pop() || 'index.html';

  const navHTML = `
  <nav class="fixed top-0 left-0 right-0 h-16 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-900 flex items-center px-6 gap-8">
    <div class="font-mono text-yellow-400 text-xl tracking-widest font-bold shrink-0">JK</div>
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
