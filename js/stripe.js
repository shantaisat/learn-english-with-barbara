/* ══════════════════════════════════════════════
   stripe.js — Payment handling (mock Stripe)
   Replace STRIPE_PUBLIC_KEY and handleRealPayment
   with actual Stripe integration when ready.
   ══════════════════════════════════════════════ */

// When you're ready: replace with your real Stripe publishable key
// const STRIPE_PUBLIC_KEY = 'pk_live_your_key_here';

let stripePackName  = '';
let stripePackPrice = '';

// ── OPEN CHECKOUT ──────────────────────────────────────────────────────────────
function openStripe(packName, price) {
  stripePackName  = packName;
  stripePackPrice = price;
  const modal = document.getElementById('stripeModal');
  if (!modal) return;
  document.getElementById('stripe-title').textContent  = packName;
  document.getElementById('stripe-amount').textContent = '£' + price;
  document.getElementById('pay-amount').textContent    = '£' + price;
  document.getElementById('stripe-desc').textContent   = 'One-time payment · Instant access · Lifetime licence';
  document.getElementById('stripe-form-view').style.display   = 'block';
  document.getElementById('payment-processing').style.display = 'none';
  document.getElementById('payment-success').style.display    = 'none';
  document.getElementById('card-name').value = '';
  document.getElementById('card-num').value  = '';
  document.getElementById('card-exp').value  = '';
  document.getElementById('card-cvc').value  = '';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeStripe() {
  const modal = document.getElementById('stripeModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

// ── CARD FORMATTING ────────────────────────────────────────────────────────────
function formatCard(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = val.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 2) val = val.substring(0, 2) + ' / ' + val.substring(2);
  input.value = val;
}

// ── PROCESS PAYMENT ────────────────────────────────────────────────────────────
function processPayment() {
  const name = document.getElementById('card-name').value.trim();
  const num  = document.getElementById('card-num').value.replace(/\s/g, '');
  const exp  = document.getElementById('card-exp').value;
  const cvc  = document.getElementById('card-cvc').value;
  if (!name || num.length < 16 || !exp || cvc.length < 3) {
    alert('Please fill in all card details to continue.');
    return;
  }
  document.getElementById('stripe-form-view').style.display   = 'none';
  document.getElementById('payment-processing').style.display = 'block';

  // ── REAL STRIPE: Replace this timeout with a real Stripe API call ──
  // stripe.createPaymentMethod({ type:'card', card: cardElement })
  //   .then(result => handleRealPayment(result, stripePackPrice));
  // ──────────────────────────────────────────────────────────────────
  setTimeout(() => {
    document.getElementById('payment-processing').style.display = 'none';
    document.getElementById('payment-success').style.display    = 'block';
    unlockPackAfterPayment(stripePackName, stripePackPrice);
  }, 2200);
}

// ── UNLOCK PACK ────────────────────────────────────────────────────────────────
function unlockPackAfterPayment(packName, price) {
  if (!currentUser) return;
  const pack  = PRODUCT_LIST.find(p => p.name === packName || packName.includes(p.name));
  const today = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
  if (!currentUser.purchases) currentUser.purchases = [];
  currentUser.purchases.unshift({ pack: packName, date: today, amount: '£' + price });
  if (pack && !currentUser.ownedPacks.includes(pack.id)) {
    currentUser.ownedPacks.push(pack.id);
  } else if (packName.toLowerCase().includes('bundle')) {
    PRODUCT_LIST.forEach(p => { if (!currentUser.ownedPacks.includes(p.id)) currentUser.ownedPacks.push(p.id); });
  }
  localStorage.setItem('lewb_user', JSON.stringify(currentUser));
  const statPacks = document.getElementById('stat-packs');
  if (statPacks) statPacks.textContent = currentUser.ownedPacks.length;
}

function afterPayment() {
  closeStripe();
  showDashTab('packs');
  renderAllPacks();
  renderOwnedPacks();
  renderShopPacks();
  renderPurchaseHistory();
}

// ── CLOSE ON BACKDROP CLICK ────────────────────────────────────────────────────
window.addEventListener('click', e => {
  const modal = document.getElementById('stripeModal');
  if (modal && e.target === modal) closeStripe();
});
