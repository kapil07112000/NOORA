/* ==========================================================================
   NOORA FAMOUS PERFUMES — GLOBAL SCRIPT
   1. Product Data        6. Wishlist
   2. Header / Nav         7. Newsletter + Contact Forms
   3. Scroll Reveal         8. FAQ Accordion
   4. Cart (localStorage)   9. Fragrance Recommender
   5. Shop Filter/Search/Sort  10. Back to top
   ========================================================================== */

/* ---------------------------------- 1. PRODUCT DATA ---------------------------------- */
const NOORA_PRODUCTS = [
  { id: 'p01', name: 'Noora Oud Royale', category: 'Luxury', family: 'Oud', price: 189, oldPrice: 220, rating: 4.9, badge: 'oud', desc: 'A commanding blend of aged oud, saffron and dark amber.', new: false },
  { id: 'p02', name: 'Noora Rose Elixir', category: 'Women', family: 'Floral', price: 129, oldPrice: null, rating: 4.8, badge: 'rose', desc: 'Damask rose layered over soft musk and warm vanilla.', new: false },
  { id: 'p03', name: 'Noora Amber Noir', category: 'Men', family: 'Oriental', price: 145, oldPrice: 165, rating: 4.7, badge: 'amber', desc: 'Smoky amber, leather and spiced cardamom at dusk.', new: false },
  { id: 'p04', name: 'Noora Velvet Musk', category: 'Unisex', family: 'Musky', price: 135, oldPrice: null, rating: 4.6, badge: 'musk', desc: 'A skin-close musk wrapped in creamy sandalwood.', new: true },
  { id: 'p05', name: 'Noora Bloom', category: 'Women', family: 'Floral', price: 115, oldPrice: null, rating: 4.8, badge: 'bloom', desc: 'Peony and white jasmine over a sheer citrus opening.', new: true },
  { id: 'p06', name: 'Noora Imperial', category: 'Luxury', family: 'Oriental', price: 210, oldPrice: null, rating: 5.0, badge: 'imperial', desc: 'The house signature — oud, rose and gilded amber.', new: false },
  { id: 'p07', name: 'Noora Citrus Vetiver', category: 'Men', family: 'Fresh', price: 99, oldPrice: 120, rating: 4.5, badge: 'citrus', desc: 'Bergamot and green vetiver for a crisp morning wear.', new: true },
  { id: 'p08', name: 'Noora White Oud', category: 'Unisex', family: 'Oud', price: 175, oldPrice: null, rating: 4.7, badge: 'white-oud', desc: 'A luminous take on oud, softened with white florals.', new: false },
  { id: 'p09', name: 'Noora Santal Rose', category: 'Women', family: 'Woody', price: 149, oldPrice: null, rating: 4.6, badge: 'santal', desc: 'Creamy sandalwood tangled with rose petals.', new: false },
  { id: 'p10', name: 'Noora Golden Fig', category: 'Unisex', family: 'Fresh', price: 105, oldPrice: 125, rating: 4.4, badge: 'fig', desc: 'Sun-warmed fig leaf, cedar and a whisper of coconut.', new: false },
  { id: 'p11', name: 'Noora Leather & Spice', category: 'Men', family: 'Woody', price: 159, oldPrice: null, rating: 4.8, badge: 'leather', desc: 'Supple leather, black pepper and smoked cedarwood.', new: false },
  { id: 'p12', name: 'Noora Jasmine Nuit', category: 'Women', family: 'Floral', price: 139, oldPrice: null, rating: 4.9, badge: 'jasmine', desc: 'Night-blooming jasmine over a base of dark musk.', new: true },
];

const FRAGRANCE_MATCH = {
  Fresh: 'p07', Woody: 'p11', Floral: 'p12', Oud: 'p01', Musky: 'p04', Oriental: 'p06'
};

/* ---------------------------------- Bottle SVG factory ---------------------------------- */
function bottleSVG(badge) {
  const palettes = {
    'oud': ['#8A3A1C', '#3D211A'], 'rose': ['#C56A7A', '#7C3448'], 'amber': ['#B4762F', '#5C3417'],
    'musk': ['#C79A6B', '#6B4A34'], 'bloom': ['#E3AFA0', '#A8455A'], 'imperial': ['#C79A4A', '#5A3418'],
    'citrus': ['#D9A24C', '#8A5A1E'], 'white-oud': ['#D9C2A6', '#8A6A45'], 'santal': ['#C68A66', '#6E3E2A'],
    'fig': ['#B5975E', '#5F4526'], 'leather': ['#7A4B2B', '#3A2317'], 'jasmine': ['#C9A5AE', '#6E3548']
  };
  const [c1, c2] = palettes[badge] || ['#BE5B29', '#9C3F55'];
  const gid = 'g-' + badge;
  return `<svg viewBox="0 0 300 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Perfume bottle illustration">
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
      <radialGradient id="bgr-${badge}" cx="50%" cy="35%" r="70%">
        <stop offset="0%" stop-color="#FAF3E7"/><stop offset="100%" stop-color="#F1E4D0"/>
      </radialGradient>
    </defs>
    <rect width="300" height="340" fill="url(#bgr-${badge})"/>
    <ellipse cx="150" cy="300" rx="90" ry="14" fill="#00000012"/>
    <rect x="118" y="46" width="64" height="30" rx="6" fill="${c2}"/>
    <rect x="132" y="20" width="36" height="30" rx="4" fill="#2B2019"/>
    <path d="M100 92 Q100 76 122 76 L178 76 Q200 76 200 92 L210 130 Q214 150 214 180 L214 264 Q214 288 190 288 L110 288 Q86 288 86 264 L86 180 Q86 150 90 130 Z" fill="url(#${gid})"/>
    <path d="M100 92 Q100 76 122 76 L140 76 L140 288 L110 288 Q86 288 86 264 L86 180 Q86 150 90 130 Z" fill="#ffffff" opacity="0.14"/>
    <rect x="104" y="168" width="92" height="56" rx="3" fill="#FAF3E7" opacity="0.92"/>
    <rect x="114" y="182" width="72" height="3" fill="${c2}" opacity="0.6"/>
    <rect x="114" y="192" width="50" height="3" fill="${c2}" opacity="0.4"/>
    <rect x="114" y="202" width="60" height="3" fill="${c2}" opacity="0.4"/>
  </svg>`;
}

/* ---------------------------------- 2. HEADER / NAV ---------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const transparentCapable = header.dataset.transparent === 'true';

  function updateHeader() {
    const scrolled = window.scrollY > 60;
    header.classList.toggle('is-solid', scrolled || !transparentCapable);
    header.classList.toggle('is-transparent', transparentCapable && !scrolled);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('is-open');
      mobileNav.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hamburger.classList.remove('is-open');
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
    }));
  }
}

/* ---------------------------------- 3. SCROLL REVEAL ---------------------------------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => obs.observe(el));
}

/* ---------------------------------- 4. CART ---------------------------------- */
const Cart = {
  KEY: 'noora_cart',
  get() { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch (e) { return []; } },
  save(items) { localStorage.setItem(this.KEY, JSON.stringify(items)); },
  add(productId) {
    const items = this.get();
    const existing = items.find(i => i.id === productId);
    if (existing) existing.qty += 1;
    else items.push({ id: productId, qty: 1 });
    this.save(items);
    renderCart();
    showToast('Added to your bag');
  },
  remove(productId) {
    this.save(this.get().filter(i => i.id !== productId));
    renderCart();
  },
  setQty(productId, qty) {
    const items = this.get();
    const item = items.find(i => i.id === productId);
    if (!item) return;
    item.qty = Math.max(1, qty);
    this.save(items);
    renderCart();
  },
  count() { return this.get().reduce((sum, i) => sum + i.qty, 0); },
  total() {
    return this.get().reduce((sum, i) => {
      const p = NOORA_PRODUCTS.find(p => p.id === i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  }
};

function renderCart() {
  document.querySelectorAll('.badge-count').forEach(b => b.textContent = Cart.count());

  const itemsWrap = document.querySelector('.cart-items');
  const totalEl = document.querySelector('.cart-total-val');
  if (!itemsWrap) return;

  const items = Cart.get();
  if (!items.length) {
    itemsWrap.innerHTML = '<p class="cart-empty">Your bag is empty. Discover a fragrance you will love.</p>';
  } else {
    itemsWrap.innerHTML = items.map(i => {
      const p = NOORA_PRODUCTS.find(p => p.id === i.id);
      if (!p) return '';
      return `<div class="cart-item" data-id="${p.id}">
        <div class="cart-item-media">${bottleSVG(p.badge)}</div>
        <div class="cart-item-body">
          <div class="cart-item-top">
            <span class="cart-item-name">${p.name}</span>
            <span class="price">$${p.price}</span>
          </div>
          <div class="qty-control">
            <button type="button" class="qty-minus" aria-label="Decrease quantity">&minus;</button>
            <span>${i.qty}</span>
            <button type="button" class="qty-plus" aria-label="Increase quantity">&plus;</button>
          </div>
          <button type="button" class="cart-item-remove">Remove</button>
        </div>
      </div>`;
    }).join('');
  }
  if (totalEl) totalEl.textContent = '$' + Cart.total().toFixed(2);
}

function initCart() {
  renderCart();
  const overlay = document.querySelector('.cart-overlay');
  const drawer = document.querySelector('.cart-drawer');
  const openBtns = document.querySelectorAll('.cart-icon');
  const closeBtn = document.querySelector('.cart-close');

  function openCart() {
    overlay?.classList.add('is-open');
    drawer?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    overlay?.classList.remove('is-open');
    drawer?.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  openBtns.forEach(b => b.addEventListener('click', (e) => { e.preventDefault(); openCart(); }));
  closeBtn?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', closeCart);

  document.querySelector('.cart-items')?.addEventListener('click', (e) => {
    const row = e.target.closest('.cart-item');
    if (!row) return;
    const id = row.dataset.id;
    if (e.target.classList.contains('cart-item-remove')) Cart.remove(id);
    if (e.target.classList.contains('qty-plus')) {
      const item = Cart.get().find(i => i.id === id);
      Cart.setQty(id, item.qty + 1);
    }
    if (e.target.classList.contains('qty-minus')) {
      const item = Cart.get().find(i => i.id === id);
      if (item.qty <= 1) Cart.remove(id); else Cart.setQty(id, item.qty - 1);
    }
  });

  document.querySelector('.checkout-btn')?.addEventListener('click', () => {
    if (!Cart.get().length) { showToast('Your bag is empty'); return; }
    showToast('Demo checkout — order received with thanks');
    Cart.save([]);
    renderCart();
    setTimeout(closeCart, 900);
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-cart-btn');
    if (btn && btn.dataset.id) Cart.add(btn.dataset.id);
  });
}

/* ---------------------------------- 6. WISHLIST ---------------------------------- */
const Wishlist = {
  KEY: 'noora_wishlist',
  get() { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch (e) { return []; } },
  toggle(id) {
    let items = this.get();
    if (items.includes(id)) items = items.filter(i => i !== id);
    else { items.push(id); showToast('Saved to wishlist'); }
    localStorage.setItem(this.KEY, JSON.stringify(items));
    return items.includes(id);
  }
};

function initWishlist() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.wishlist-btn');
    if (!btn) return;
    const active = Wishlist.toggle(btn.dataset.id);
    btn.classList.toggle('is-active', active);
  });
}

/* ---------------------------------- Product card render (shop + best sellers) ---------------------------------- */
function productCardHTML(p) {
  const wished = Wishlist.get().includes(p.id);
  const stars = '★★★★★'.slice(0, Math.round(p.rating)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(p.rating));
  return `<article class="product-card reveal" data-id="${p.id}" data-category="${p.category}" data-price="${p.price}" data-rating="${p.rating}" data-name="${p.name.toLowerCase()}" data-new="${p.new}">
    <div class="product-media">
      ${p.oldPrice ? `<span class="discount-badge">−${Math.round((1 - p.price / p.oldPrice) * 100)}%</span>` : (p.new ? `<span class="discount-badge">New</span>` : '')}
      <button type="button" class="wishlist-btn ${wished ? 'is-active' : ''}" data-id="${p.id}" aria-label="Toggle wishlist">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.9-10-9.3C.5 8 2 4.5 5.6 4.5c2 0 3.5 1.1 4.4 2.6.9-1.5 2.4-2.6 4.4-2.6C18 4.5 19.5 8 22 11.7 19.5 16.1 12 21 12 21z"/></svg>
      </button>
      ${bottleSVG(p.badge)}
    </div>
    <div class="product-info">
      <span class="product-category">${p.category} · ${p.family}</span>
      <h3 class="product-name">${p.name}</h3>
      <p class="product-desc">${p.desc}</p>
      <div class="product-rating"><span class="stars">${stars}</span><span>${p.rating}</span></div>
      <div class="product-footer">
        <div class="price-row">
          <span class="price">$${p.price}</span>
          ${p.oldPrice ? `<span class="price-old">$${p.oldPrice}</span>` : ''}
        </div>
        <button type="button" class="add-cart-btn" data-id="${p.id}" aria-label="Add to bag">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </button>
      </div>
    </div>
  </article>`;
}

function initBestSellers() {
  const grid = document.querySelector('[data-bestsellers]');
  if (!grid) return;
  const picks = ['p01', 'p02', 'p03', 'p04', 'p05', 'p06'];
  grid.innerHTML = picks.map(id => productCardHTML(NOORA_PRODUCTS.find(p => p.id === id))).join('');
  initReveal();
}

/* ---------------------------------- 5. SHOP: FILTER / SEARCH / SORT ---------------------------------- */
function initShop() {
  const grid = document.querySelector('[data-shop-grid]');
  if (!grid) return;

  let state = { category: 'All', query: '', sort: 'Featured' };

  function render() {
    let list = NOORA_PRODUCTS.slice();
    if (state.category === 'New Arrivals') list = list.filter(p => p.new);
    else if (state.category !== 'All') list = list.filter(p => p.category === state.category);
    if (state.query) list = list.filter(p => p.name.toLowerCase().includes(state.query) || p.family.toLowerCase().includes(state.query));

    if (state.sort === 'Price Low to High') list.sort((a, b) => a.price - b.price);
    else if (state.sort === 'Price High to Low') list.sort((a, b) => b.price - a.price);
    else if (state.sort === 'Best Rated') list.sort((a, b) => b.rating - a.rating);

    grid.innerHTML = list.map(productCardHTML).join('');
    document.querySelector('.results-empty')?.classList.toggle('is-visible', list.length === 0);
    initReveal();
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.category = btn.dataset.category;
      render();
    });
  });

  const searchInput = document.querySelector('.search-box input');
  searchInput?.addEventListener('input', (e) => {
    state.query = e.target.value.trim().toLowerCase();
    render();
  });

  const sortSelect = document.querySelector('.sort-select');
  sortSelect?.addEventListener('change', (e) => {
    state.sort = e.target.value;
    render();
  });

  render();
}

/* ---------------------------------- 7. NEWSLETTER + CONTACT FORMS ---------------------------------- */
function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;
  const msg = form.parentElement.querySelector('.form-msg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (!isValidEmail(input.value.trim())) {
      msg.textContent = 'Please enter a valid email address.';
      msg.className = 'form-msg error';
      return;
    }
    msg.textContent = 'Welcome to the Noora world — check your inbox soon.';
    msg.className = 'form-msg success';
    form.reset();
  });
}

function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const successBox = document.querySelector('.form-success');

  function setError(field, message) {
    const group = field.closest('.field-group');
    group.classList.toggle('has-error', !!message);
    group.querySelector('.field-error').textContent = message || '';
  }

  function validate() {
    let valid = true;
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const phone = form.querySelector('#phone');
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message');

    if (name.value.trim().length < 2) { setError(name, 'Please enter your full name.'); valid = false; } else setError(name, '');
    if (!isValidEmail(email.value.trim())) { setError(email, 'Please enter a valid email address.'); valid = false; } else setError(email, '');
    if (phone.value.trim() && !/^[0-9+\-() ]{7,}$/.test(phone.value.trim())) { setError(phone, 'Please enter a valid phone number.'); valid = false; } else setError(phone, '');
    if (!subject.value) { setError(subject, 'Please choose a subject.'); valid = false; } else setError(subject, '');
    if (message.value.trim().length < 10) { setError(message, 'Please write at least 10 characters.'); valid = false; } else setError(message, '');

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;
    successBox.classList.add('is-visible');
    form.reset();
    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

/* ---------------------------------- 8. FAQ ACCORDION ---------------------------------- */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('is-open');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ---------------------------------- 9. FRAGRANCE RECOMMENDER ---------------------------------- */
function initFragranceFinder() {
  const buttons = document.querySelectorAll('.family-btn');
  const resultBox = document.querySelector('.fragrance-result');
  if (!buttons.length || !resultBox) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const family = btn.dataset.family;
      const product = NOORA_PRODUCTS.find(p => p.id === FRAGRANCE_MATCH[family]);
      resultBox.innerHTML = `
        <span class="product-category">Recommended for ${family} lovers</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.desc}</p>
        <div class="price-row" style="justify-content:center;margin-top:14px;">
          <span class="price">$${product.price}</span>
        </div>
        <button type="button" class="btn btn-dark add-cart-btn-text" data-id="${product.id}" style="margin-top:20px;">Add to Bag</button>`;
      resultBox.classList.add('is-visible');
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  resultBox.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-cart-btn-text');
    if (btn) Cart.add(btn.dataset.id);
  });
}

/* ---------------------------------- 10. BACK TO TOP + TOAST ---------------------------------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

let toastTimer;
function showToast(text) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector('span').textContent = text;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

/* ---------------------------------- INIT ---------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initBestSellers();
  initShop();
  initCart();
  initWishlist();
  initNewsletter();
  initContactForm();
  initFAQ();
  initFragranceFinder();
  initBackToTop();
  initReveal();

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});
