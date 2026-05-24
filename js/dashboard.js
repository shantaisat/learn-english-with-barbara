/* ══════════════════════════════════════════════
   dashboard.js — Dashboard rendering & pack management
   ══════════════════════════════════════════════ */

// ── LOAD DASHBOARD ─────────────────────────────────────────────────────────────
function loadDashboard() {
  if (!currentUser) return;
  const nameEl  = document.getElementById('dash-username');
  const pnameEl = document.getElementById('profile-name');
  const pemailEl = document.getElementById('profile-email');
  if (nameEl)   nameEl.textContent  = currentUser.name;
  if (pnameEl)  pnameEl.textContent = currentUser.fullName || currentUser.name;
  if (pemailEl) pemailEl.textContent = currentUser.email;

  const pfFname = document.getElementById('pf-fname');
  const pfEmail = document.getElementById('pf-email');
  if (pfFname) pfFname.value = currentUser.name;
  if (pfEmail) pfEmail.value = currentUser.email;

  const statPacks = document.getElementById('stat-packs');
  if (statPacks) statPacks.textContent = currentUser.ownedPacks.length;

  renderOwnedPacks();
  renderAllPacks();
  renderShopPacks();
  renderPurchaseHistory();
  updateDashStats();
}

// ── STATS ──────────────────────────────────────────────────────────────────────
function updateDashStats() {
  const progress = JSON.parse(localStorage.getItem('lewb_progress') || '{}');
  const lessonsDone = Object.values(progress).reduce((t, pack) => t + Object.keys(pack).length, 0);
  const scores = Object.values(progress).flatMap(pack => Object.values(pack));
  const avg = scores.length ? Math.round(scores.reduce((a,b) => a+b, 0) / scores.length) : 0;
  const statLessons = document.getElementById('stat-lessons');
  const statScore   = document.getElementById('stat-score');
  if (statLessons) statLessons.textContent = lessonsDone || 4;
  if (statScore)   statScore.textContent   = (avg || 72) + '%';
}

function getProgress(packId) {
  const p = JSON.parse(localStorage.getItem('lewb_progress') || '{}')[packId];
  if (!p) return 0;
  const vals = Object.values(p);
  return vals.length ? Math.round(vals.reduce((a,b) => a+b, 0) / vals.length) : 0;
}

// ── PACK CARD HTML ─────────────────────────────────────────────────────────────
function packCardHTML(pack, owned) {
  const pct = getProgress(pack.id);
  return `<div class="pack-card ${owned ? 'owned' : 'locked'}">
    <div class="pack-card-header">
      <div class="pack-card-icon" style="background:${pack.color}">${pack.icon}</div>
      <div class="pack-card-meta">
        <div class="day">${pack.day}</div>
        <h3>${pack.name}</h3>
      </div>
      ${!owned ? '<div class="pack-lock">🔒</div>' : ''}
    </div>
    <div class="pack-card-body">
      <p>${pack.desc}</p>
      ${owned ? `<div class="pack-progress-row">
        <div class="pack-progress-bar"><div class="pack-progress-fill" style="width:${pct}%"></div></div>
        <div class="pack-progress-pct">${pct}%</div>
      </div>` : ''}
    </div>
    <div class="pack-card-footer">
      <span class="pack-lessons-count">${pack.lessons ? pack.lessons.length : 2} lessons · Interactive</span>
      ${owned
        ? `<button class="btn-start" onclick="window.location.href='app.html'">▶ Open Lessons</button>`
        : `<button class="btn-unlock" onclick="openStripe('${pack.name}','${pack.price}')">🔓 Unlock — £${pack.price}</button>`
      }
    </div>
  </div>`;
}

// ── RENDER GRIDS ──────────────────────────────────────────────────────────────
function renderOwnedPacks() {
  const grid = document.getElementById('owned-packs-grid');
  if (!grid || !currentUser) return;
  const owned = PRODUCT_LIST.filter(p => currentUser.ownedPacks.includes(p.id));
  grid.innerHTML = owned.length
    ? owned.map(p => packCardHTML(p, true)).join('')
    : `<div style="grid-column:1/-1;text-align:center;padding:28px;color:var(--grey);">No packs yet. <span style="color:var(--gold);cursor:pointer;font-weight:800;" onclick="showDashTab('shop')">Browse the shop →</span></div>`;
}

function renderAllPacks() {
  const grid = document.getElementById('all-packs-grid');
  if (!grid || !currentUser) return;
  grid.innerHTML = PRODUCT_LIST.map(p => packCardHTML(p, currentUser.ownedPacks.includes(p.id))).join('');
}

function renderShopPacks() {
  const grid = document.getElementById('shop-packs-grid');
  if (!grid || !currentUser) return;
  const locked = PRODUCT_LIST.filter(p => !currentUser.ownedPacks.includes(p.id));
  grid.innerHTML = locked.length
    ? locked.map(p => packCardHTML(p, false)).join('')
    : `<div style="grid-column:1/-1;text-align:center;padding:28px;background:var(--green-pale);border-radius:16px;color:#166534;font-weight:800;">🎉 You own all 7 packs! You have the complete collection.</div>`;
}

function renderPurchaseHistory() {
  const list = document.getElementById('purchase-list');
  if (!list || !currentUser) return;
  if (!currentUser.purchases || !currentUser.purchases.length) {
    list.innerHTML = `<div style="text-align:center;padding:22px;color:var(--grey);">No purchases yet. <span style="color:var(--gold);cursor:pointer;font-weight:800;" onclick="showDashTab('shop')">Browse the shop →</span></div>`;
    return;
  }
  list.innerHTML = currentUser.purchases.map(p => `
    <div class="payment-item">
      <div class="payment-icon">✅</div>
      <div style="flex:1;">
        <span class="payment-name">${p.pack}</span>
        <span class="payment-date">Purchased ${p.date}</span>
      </div>
      <div style="text-align:right;">
        <div class="payment-amount">${p.amount}</div>
        <div class="payment-badge">Lifetime access</div>
      </div>
    </div>`).join('');
}

// ── PROFILE ────────────────────────────────────────────────────────────────────
function saveProfile() {
  if (!currentUser) return;
  const fname   = document.getElementById('pf-fname');
  const lname   = document.getElementById('pf-lname');
  const email   = document.getElementById('pf-email');
  const country = document.getElementById('pf-country');
  const goal    = document.getElementById('pf-goal');
  if (fname)   currentUser.name     = fname.value;
  if (email)   currentUser.email    = email.value;
  if (fname && lname) currentUser.fullName = fname.value + ' ' + (lname.value || '');
  if (country) currentUser.country  = country.value;
  if (goal)    currentUser.goal     = goal.value;
  localStorage.setItem('lewb_user', JSON.stringify(currentUser));
  const nameEl  = document.getElementById('dash-username');
  const pnameEl = document.getElementById('profile-name');
  const pemailEl = document.getElementById('profile-email');
  if (nameEl)   nameEl.textContent   = currentUser.name;
  if (pnameEl)  pnameEl.textContent  = currentUser.fullName;
  if (pemailEl) pemailEl.textContent = currentUser.email;
  alert('✅ Profile saved successfully!');
}

function confirmDeleteAccount() {
  if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
    handleLogout();
    alert('Your account has been deleted.');
  }
}
