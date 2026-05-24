/* ══════════════════════════════════════════════
   auth.js — Authentication & session management
   ══════════════════════════════════════════════ */

let currentUser = JSON.parse(localStorage.getItem('lewb_user') || 'null');

// ── PAGE ROUTING ───────────────────────────────────────────────────────────────
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + pageId);
  if (el) el.classList.add('active');
}

function showAuthTab(tab) {
  showPage('login');
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  const tabEl  = document.getElementById('tab-' + tab);
  const formEl = document.getElementById('form-' + tab);
  if (tabEl)  tabEl.classList.add('active');
  if (formEl) formEl.classList.add('active');
}

function showDashTab(tab) {
  const tabs = ['home','packs','shop','profile','purchases'];
  document.querySelectorAll('.dash-nav-tab').forEach((t,i) => t.classList.toggle('active', tabs[i] === tab));
  document.querySelectorAll('.dash-sub-page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('dashtab-' + tab);
  if (el) el.classList.add('active');
  if (tab === 'packs')     renderAllPacks();
  if (tab === 'shop')      renderShopPacks();
  if (tab === 'purchases') renderPurchaseHistory();
}

// ── LOGIN ──────────────────────────────────────────────────────────────────────
function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  if (!email || !pass) {
    showError(errEl, '❌ Please enter your email and password.');
    return;
  }
  if (email === DEMO_USER.email && pass === 'demo1234') {
    loginAs({ ...DEMO_USER });
  } else {
    showError(errEl, '❌ Incorrect email or password. Try the demo account below.');
  }
}

function loginDemo() {
  loginAs({ ...DEMO_USER });
}

function loginAs(user) {
  currentUser = user;
  localStorage.setItem('lewb_user', JSON.stringify(user));
  updateNav(true);
  loadDashboard();
  showPage('dashboard');
}

// ── REGISTER ───────────────────────────────────────────────────────────────────
function handleRegister() {
  const fname = document.getElementById('reg-fname').value.trim();
  const lname = document.getElementById('reg-lname').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-password').value;
  const goal  = document.getElementById('reg-goal').value;
  const errEl = document.getElementById('reg-error');
  const succEl = document.getElementById('reg-success');
  if (!fname || !lname || !email || !pass || !goal) {
    showError(errEl, '❌ Please fill in all fields.');
    return;
  }
  const newUser = { name:fname, fullName:`${fname} ${lname}`, email, ownedPacks:[], memberSince:'Today', purchases:[], goal };
  const confirmEl = document.getElementById('confirm-email-display');
  if (confirmEl) confirmEl.textContent = email;
  succEl.classList.add('show');
  setTimeout(() => { succEl.classList.remove('show'); loginAs(newUser); }, 1800);
}

// ── LOGOUT ─────────────────────────────────────────────────────────────────────
function handleLogout() {
  currentUser = null;
  localStorage.removeItem('lewb_user');
  updateNav(false);
  showPage('login');
}

// ── FORGOT PASSWORD ────────────────────────────────────────────────────────────
function showForgot() {
  alert('Password reset — email integration coming soon!\n\nFor the demo:\nEmail: demo@learnwithbarbara.com\nPassword: demo1234');
}

// ── NAV UPDATE ─────────────────────────────────────────────────────────────────
function updateNav(loggedIn) {
  const nav = document.getElementById('navActions');
  if (!nav) return;
  if (loggedIn && currentUser) {
    nav.innerHTML = `
      <span style="color:rgba(255,255,255,0.65);font-size:13px;font-weight:700;">👋 Hi, ${currentUser.name}!</span>
      <button class="btn-nav-cta" onclick="showPage('dashboard')">My Dashboard</button>
      <button class="btn-nav" onclick="handleLogout()">Logout</button>`;
  } else {
    nav.innerHTML = `
      <button class="btn-nav" onclick="showAuthTab('login')">Login</button>
      <button class="btn-nav-cta" onclick="showAuthTab('register')">Get Started →</button>`;
  }
}

// ── HELPERS ────────────────────────────────────────────────────────────────────
function showError(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3500);
}

// ── INIT ───────────────────────────────────────────────────────────────────────
function initAuth() {
  if (currentUser) {
    loadDashboard();
    showPage('dashboard');
    updateNav(true);
  } else {
    showPage('login');
    updateNav(false);
  }
}
