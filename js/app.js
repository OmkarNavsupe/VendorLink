/* ==========================================================================
   VENDORLINK APPLICATION LOGIC
   Core App State, DOM Handlers, Dynamic Views, Modals & LocalStorage
   ========================================================================== */

(function () {
  'use strict';

  // --- STATE MANAGEMENT ---
  const state = {
    theme: localStorage.getItem('vl_theme') || 'dark',
    currentLocality: localStorage.getItem('vl_locality') || 'Wagholi, Pune',
    currentView: 'grid', // 'grid', 'map', 'board', 'favorites'
    selectedCategory: 'all',
    searchQuery: '',
    radiusFilter: 'all', // 'all', '0.5', '1', '2'
    sortBy: 'distance', // 'distance', 'rating', 'reviews', 'name'
    activeBoardTag: 'all',
    
    vendors: [],
    boardPosts: [],
    favorites: JSON.parse(localStorage.getItem('vl_favorites') || '[]'),
    selectedVendorId: null
  };

  // --- INITIALIZATION ---
  function init() {
    loadInitialData();
    applyTheme(state.theme);
    setupEventListeners();
    const locSelect = document.getElementById('localitySelect');
    if (locSelect) locSelect.value = state.currentLocality;
    renderCategories();
    updateUI();
  }

  function normalizeCategory(cat) {
    if (!cat) return 'Services';
    if (cat === 'Kiranas & Provisions') return 'Grocery';
    if (cat === 'Repair & Maintenance') return 'Mechanic';
    if (cat === 'Tailors & Stitching') return 'Clothing';
    if (cat === 'Home Food & Tiffins') return 'Home Food';
    if (cat === 'Local Artisans') return 'Artisans';
    if (cat === 'Services & Helpers') return 'Services';
    return cat;
  }

  function loadInitialData() {
    const savedVendors = localStorage.getItem('vl_vendors');
    if (savedVendors) {
      try {
        const parsed = JSON.parse(savedVendors);
        // Normalize categories for legacy saved data
        parsed.forEach(v => {
          v.category = normalizeCategory(v.category);
        });
        // Merge missing default vendors (e.g. Pune & new Medical/Mechanic/Textile shops) into existing list
        const existingIds = new Set(parsed.map(v => v.id));
        const missing = INITIAL_VENDORS.filter(v => !existingIds.has(v.id));
        state.vendors = [...missing, ...parsed];
      } catch (e) {
        state.vendors = INITIAL_VENDORS;
      }
    } else {
      state.vendors = INITIAL_VENDORS;
    }
    saveVendors();

    const savedPosts = localStorage.getItem('vl_board_posts');
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        const existingPostIds = new Set(parsedPosts.map(p => p.id));
        const missingPosts = INITIAL_BOARD_POSTS.filter(p => !existingPostIds.has(p.id));
        state.boardPosts = [...missingPosts, ...parsedPosts];
      } catch (e) {
        state.boardPosts = INITIAL_BOARD_POSTS;
      }
    } else {
      state.boardPosts = INITIAL_BOARD_POSTS;
    }
    saveBoardPosts();
  }

  function saveVendors() {
    localStorage.setItem('vl_vendors', JSON.stringify(state.vendors));
  }

  function saveBoardPosts() {
    localStorage.setItem('vl_board_posts', JSON.stringify(state.boardPosts));
  }

  function saveFavorites() {
    localStorage.setItem('vl_favorites', JSON.stringify(state.favorites));
  }

  // --- THEME SWITCHER ---
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vl_theme', theme);
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
    }
  }

  // --- EVENT LISTENERS SETUP ---
  function setupEventListeners() {
    // Theme Toggle
    document.getElementById('themeToggleBtn').addEventListener('click', () => {
      applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });

    // Locality Selector
    const locSelect = document.getElementById('localitySelect');
    locSelect.value = state.currentLocality;
    locSelect.addEventListener('change', (e) => {
      state.currentLocality = e.target.value;
      localStorage.setItem('vl_locality', state.currentLocality);
      showToast(`Switched neighborhood to ${state.currentLocality.split(',')[0]}`);
      updateUI();
    });

    // Search Input
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      clearBtn.classList.toggle('hidden', state.searchQuery === '');
      renderVendorGrid();
      renderMap();
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      clearBtn.classList.add('hidden');
      renderVendorGrid();
      renderMap();
    });

    // Radius Filter
    document.getElementById('radiusSelect').addEventListener('change', (e) => {
      state.radiusFilter = e.target.value;
      renderVendorGrid();
    });

    // Sort Selector
    document.getElementById('sortSelect').addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderVendorGrid();
    });

    // View Navigation Tabs (Desktop & Mobile)
    document.querySelectorAll('.tab-btn, .nav-item[data-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        switchView(view);
      });
    });

    // Reset Filters Button
    document.getElementById('resetFiltersBtn').addEventListener('click', resetFilters);

    // Modal Triggers & Closers
    const addBtn = document.getElementById('addVendorBtn');
    if (addBtn) addBtn.addEventListener('click', openAddVendorModal);
    
    const mobileAddBtn = document.getElementById('mobileAddVendorBtn');
    if (mobileAddBtn) mobileAddBtn.addEventListener('click', openAddVendorModal);

    document.getElementById('closeAddVendorModal').addEventListener('click', closeAddVendorModal);
    document.getElementById('cancelAddVendor').addEventListener('click', closeAddVendorModal);
    document.getElementById('addVendorForm').addEventListener('submit', handleAddVendorSubmit);

    document.getElementById('closeVendorModal').addEventListener('click', closeVendorModal);
    document.getElementById('vendorModal').addEventListener('click', (e) => {
      if (e.target.id === 'vendorModal') closeVendorModal();
    });

    document.getElementById('addPostBtn').addEventListener('click', openAddPostModal);
    document.getElementById('closeBoardPostModal').addEventListener('click', closeAddPostModal);
    document.getElementById('cancelAddPost').addEventListener('click', closeAddPostModal);
    document.getElementById('addBoardPostForm').addEventListener('submit', handleAddPostSubmit);

    // Clear category filter & view all shops buttons
    const clearCatBtn = document.getElementById('clearCategoryFilterBtn');
    if (clearCatBtn) {
      clearCatBtn.addEventListener('click', () => {
        state.selectedCategory = 'all';
        updateUI();
      });
    }

    const viewAllBtn = document.getElementById('viewAllShopsBtn');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', () => {
        state.selectedCategory = 'all';
        updateUI();
      });
    }

    document.querySelectorAll('.nav-to-grid').forEach(el => {
      el.addEventListener('click', () => switchView('grid'));
    });
  }

  // --- SWITCH VIEWS ---
  function switchView(viewName) {
    state.currentView = viewName;
    
    // Update Desktop Tab Buttons & Mobile Bottom Nav UI
    document.querySelectorAll('.tab-btn, .nav-item[data-view]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Toggle Panels
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.add('hidden');
    });
    document.getElementById(`${viewName}View`).classList.remove('hidden');

    // Show/Hide category section (only for grid & map)
    const categorySec = document.getElementById('categorySection');
    if (viewName === 'grid' || viewName === 'map') {
      categorySec.classList.remove('hidden');
    } else {
      categorySec.classList.add('hidden');
    }

    if (viewName === 'map') {
      renderMap();
    } else if (viewName === 'board') {
      renderBoard();
    } else if (viewName === 'favorites') {
      renderFavorites();
    }
  }

  function resetFilters() {
    state.selectedCategory = 'all';
    state.searchQuery = '';
    state.radiusFilter = 'all';
    state.sortBy = 'distance';

    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearch').classList.add('hidden');
    document.getElementById('radiusSelect').value = 'all';
    document.getElementById('sortSelect').value = 'distance';

    updateUI();
    showToast('Filters reset to default');
  }

  // --- CATEGORY MATCHING HELPER ---
  function matchesCategory(vendorCategory, targetCategory) {
    if (!targetCategory || targetCategory === 'all') return true;
    const v = (vendorCategory || '').toLowerCase().trim();
    const t = targetCategory.toLowerCase().trim();

    if (v === t) return true;

    // Smart aliases & synonym matching
    if (t === 'grocery' && (v.includes('grocery') || v.includes('kirana') || v.includes('provision') || v.includes('chakki') || v.includes('flour') || v.includes('oil'))) return true;
    if (t === 'mechanic' && (v.includes('mechanic') || v.includes('repair') || v.includes('bike') || v.includes('cycle') || v.includes('auto') || v.includes('hardware'))) return true;
    if (t === 'medical' && (v.includes('medical') || v.includes('chemist') || v.includes('pharmacy') || v.includes('druggist') || v.includes('health') || v.includes('surgical'))) return true;
    if (t === 'textiles' && (v.includes('textile') || v.includes('fabric') || v.includes('matching') || v.includes('handloom') || v.includes('paithani') || v.includes('linen') || v.includes('curtain'))) return true;
    if (t === 'clothing' && (v.includes('clothing') || v.includes('tailor') || v.includes('garment') || v.includes('boutique') || v.includes('stitching') || v.includes('alteration') || v.includes('kurta') || v.includes('saree'))) return true;
    if (t === 'home food' && (v.includes('food') || v.includes('tiffin') || v.includes('kitchen') || v.includes('bakery') || v.includes('cafe') || v.includes('misal') || v.includes('meal'))) return true;
    if (t === 'artisans' && (v.includes('artisan') || v.includes('craft') || v.includes('pottery') || v.includes('brass') || v.includes('tambat') || v.includes('handicraft'))) return true;
    if (t === 'services' && (v.includes('service') || v.includes('cobbler') || v.includes('locksmith') || v.includes('key') || v.includes('electrician') || v.includes('plumber') || v.includes('flower') || v.includes('helper'))) return true;

    return false;
  }

  // --- GET LOCALITY VENDOR COUNT FOR CATEGORY ---
  function getCategoryShopCount(catId) {
    const locPrefix = state.currentLocality.split(',')[0].toLowerCase().trim();
    return state.vendors.filter(v => {
      const locMatch = v.locality.toLowerCase().includes(locPrefix) || state.currentLocality.toLowerCase().includes(v.locality.split(',')[0].toLowerCase());
      if (!locMatch) return false;
      return matchesCategory(v.category, catId);
    }).length;
  }

  // --- RENDER VISUAL CATEGORY SHOWCASE CARDS ---
  function renderCategoryCards() {
    const grid = document.getElementById('categoryCardsGrid');
    if (!grid) return;

    // List of core shop sections to show in grid
    const sections = INITIAL_CATEGORIES.filter(c => c.id !== 'all');

    grid.innerHTML = sections.map(sec => {
      const count = getCategoryShopCount(sec.id);
      const isActive = state.selectedCategory === sec.id;
      return `
        <div class="category-card ${isActive ? 'active' : ''}" data-cat="${sec.id}">
          <div class="cat-card-icon-wrap">
            <i class="fa-solid ${sec.icon}"></i>
          </div>
          <div class="cat-card-content">
            <h3 class="cat-card-title">${sec.name}</h3>
            <p class="cat-card-desc">${sec.desc || ''}</p>
          </div>
          <div class="cat-card-badge">
            <span class="cat-shop-count">${count} ${count === 1 ? 'shop' : 'shops'}</span>
            <i class="fa-solid fa-chevron-right arrow-icon"></i>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.dataset.cat;
        state.selectedCategory = (state.selectedCategory === cat) ? 'all' : cat;
        updateUI();
        
        // Smooth scroll down to results if clicked
        const gridView = document.getElementById('gridView');
        if (gridView) {
          gridView.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // --- RENDER CATEGORY PILLS ---
  function renderCategories() {
    const container = document.getElementById('categoryContainer');
    if (!container) return;

    container.innerHTML = INITIAL_CATEGORIES.map(cat => {
      const count = getCategoryShopCount(cat.id);
      const isActive = state.selectedCategory === cat.id;
      return `
        <button class="category-pill ${isActive ? 'active' : ''}" data-cat="${cat.id}">
          <i class="fa-solid ${cat.icon}"></i>
          <span>${cat.label}</span>
          <span class="pill-count">(${count})</span>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state.selectedCategory = pill.dataset.cat;
        updateUI();
      });
    });
  }

  // --- UPDATE ACTIVE CATEGORY FILTER BANNER ---
  function updateCategoryBanner() {
    const banner = document.getElementById('activeCategoryBanner');
    if (!banner) return;

    if (state.selectedCategory && state.selectedCategory !== 'all') {
      const catObj = INITIAL_CATEGORIES.find(c => c.id === state.selectedCategory);
      const catName = catObj ? catObj.name : state.selectedCategory;
      const count = getCategoryShopCount(state.selectedCategory);
      const locName = state.currentLocality.split(',')[0];

      document.getElementById('bannerCategoryName').textContent = `${catName} (${count} registered)`;
      document.getElementById('bannerLocalityName').textContent = state.currentLocality;
      banner.classList.remove('hidden');
    } else {
      banner.classList.add('hidden');
    }
  }

  // --- FILTER & SORT VENDORS ---
  function getFilteredVendors() {
    return state.vendors.filter(v => {
      // Locality filter (matches city/area roughly)
      const locMatch = v.locality.toLowerCase().includes(state.currentLocality.split(',')[0].toLowerCase()) ||
                       state.currentLocality.toLowerCase().includes(v.locality.split(',')[0].toLowerCase());

      // Category filter with intelligent synonym & section matching
      const catMatch = matchesCategory(v.category, state.selectedCategory);

      // Radius filter
      let radiusMatch = true;
      if (state.radiusFilter !== 'all') {
        radiusMatch = v.distance <= parseFloat(state.radiusFilter);
      }

      // Search query filter (matches name, owner, category, description, offerings)
      let searchMatch = true;
      if (state.searchQuery) {
        const q = state.searchQuery;
        const offeringsText = (v.offerings || []).map(o => o.name).join(' ').toLowerCase();
        searchMatch = v.name.toLowerCase().includes(q) ||
                      v.owner.toLowerCase().includes(q) ||
                      v.category.toLowerCase().includes(q) ||
                      v.description.toLowerCase().includes(q) ||
                      offeringsText.includes(q) ||
                      matchesCategory(v.category, q);
      }

      return locMatch && catMatch && radiusMatch && searchMatch;
    }).sort((a, b) => {
      if (state.sortBy === 'distance') return a.distance - b.distance;
      if (state.sortBy === 'rating') return b.rating - a.rating;
      if (state.sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      if (state.sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }

  // --- UPDATE UI STATS & BADGES ---
  function updateUI() {
    const filtered = getFilteredVendors();
    const localityName = state.currentLocality.split(',')[0];

    // Stats Bar
    document.getElementById('currentLocalityText').textContent = localityName;
    document.getElementById('heroTitle').textContent = `Support ${localityName}'s Local Sellers & Crafters`;
    document.getElementById('statTotalVendors').textContent = state.vendors.length;
    document.getElementById('statVerified').textContent = state.vendors.filter(v => v.isVerified).length;

    // Fav & Board Badges
    document.getElementById('favBadge').textContent = state.favorites.length;
    document.getElementById('boardBadge').textContent = state.boardPosts.length;

    // Refresh Category Showcase Grid, Pills & Active Filter Banner
    renderCategoryCards();
    renderCategories();
    updateCategoryBanner();

    renderVendorGrid();
    if (state.currentView === 'map') renderMap();
  }

  // --- RENDER VENDOR GRID ---
  function renderVendorGrid() {
    const filtered = getFilteredVendors();
    const grid = document.getElementById('vendorGrid');
    const emptyState = document.getElementById('emptyGridState');
    document.getElementById('vendorCount').textContent = filtered.length;

    if (filtered.length === 0) {
      grid.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    grid.innerHTML = filtered.map(v => createVendorCardHTML(v)).join('');

    // Attach Card Event Handlers
    grid.querySelectorAll('.vendor-card').forEach(card => {
      const vId = card.dataset.id;
      
      // Click card to open detail modal (unless clicking direct action buttons)
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.action-btn') && !e.target.closest('.fav-toggle-btn')) {
          openVendorModal(vId);
        }
      });

      // Favorite toggle button
      const favBtn = card.querySelector('.fav-toggle-btn');
      if (favBtn) {
        favBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleFavorite(vId);
        });
      }

      // Action buttons (WhatsApp, Call)
      const waBtn = card.querySelector('.btn-wa');
      if (waBtn) {
        waBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openWhatsApp(vId);
        });
      }
      const callBtn = card.querySelector('.btn-call');
      if (callBtn) {
        callBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          window.location.href = `tel:${card.dataset.phone}`;
        });
      }
    });
  }

  // --- CARD HTML CREATOR ---
  function createVendorCardHTML(v) {
    const isFav = state.favorites.includes(v.id);
    const offeringsTags = (v.offerings || []).slice(0, 3).map(o => `
      <span class="tag-chip">${o.name} (${o.price})</span>
    `).join('');

    return `
      <div class="vendor-card" data-id="${v.id}" data-phone="${v.phone}">
        <div class="card-image-wrap">
          <img src="${v.image}" alt="${v.name}" class="card-img" loading="lazy" onError="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'">
          <div class="card-badges">
            <span class="status-badge ${v.isOpen ? 'open' : 'closed'}">
              ${v.isOpen ? '● Open Now' : '○ Closed'}
            </span>
            ${v.isVerified ? `
              <span class="verified-badge">
                <i class="fa-solid fa-circle-check"></i> Neighborhood Verified
              </span>
            ` : ''}
          </div>
          <button class="fav-toggle-btn ${isFav ? 'is-fav' : ''}" title="${isFav ? 'Remove from Saved' : 'Save this Spot'}">
            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>

        <div class="card-body">
          <div class="category-tag">${v.category}</div>
          <h3 class="vendor-title">${v.name}</h3>
          <div class="owner-meta"><i class="fa-regular fa-user"></i> ${v.owner}</div>
          
          <div class="location-info">
            <i class="fa-solid fa-location-dot text-primary"></i>
            <span>${v.distance} km away • ${v.address.split(',')[0]}</span>
          </div>

          <div class="offering-tags">
            ${offeringsTags}
          </div>

          <div class="card-footer">
            <div class="rating-score">
              <i class="fa-solid fa-star star-icon"></i>
              <span>${v.rating}</span>
              <span class="review-cnt">(${v.reviewsCount})</span>
            </div>

            <div class="card-actions">
              <button class="icon-btn btn-wa" title="WhatsApp Inquiry"><i class="fa-brands fa-whatsapp text-success"></i></button>
              <button class="icon-btn btn-call" title="Call Vendor"><i class="fa-solid fa-phone text-primary"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- TOGGLE FAVORITE ---
  function toggleFavorite(vendorId) {
    const idx = state.favorites.indexOf(vendorId);
    if (idx > -1) {
      state.favorites.splice(idx, 1);
      showToast('Removed from Saved Spots');
    } else {
      state.favorites.push(vendorId);
      showToast('Saved to your Neighborhood Spots ❤️');
    }
    saveFavorites();
    updateUI();
    if (state.currentView === 'favorites') renderFavorites();
  }

  // --- WHATSAPP LAUNCHER ---
  function openWhatsApp(vendorId) {
    const v = state.vendors.find(item => item.id === vendorId);
    if (!v) return;
    const phoneClean = (v.whatsapp || v.phone).replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hi ${v.name}, I discovered your store on VendorLink! I'm nearby in ${v.locality.split(',')[0]} and would like to inquire about your services/products.`);
    window.open(`https://wa.me/${phoneClean}?text=${message}`, '_blank');
  }

  // --- VENDOR DETAIL MODAL ---
  function openVendorModal(vendorId) {
    state.selectedVendorId = vendorId;
    const v = state.vendors.find(item => item.id === vendorId);
    if (!v) return;

    const modalContent = document.getElementById('modalDetailContent');
    const isFav = state.favorites.includes(v.id);

    const priceItems = (v.offerings || []).map(o => `
      <div class="price-item">
        <span>${o.name}</span>
        <span class="price-val">${o.price}</span>
      </div>
    `).join('');

    const reviewsItems = (v.reviews || []).map(r => `
      <div class="review-item">
        <div class="review-head">
          <strong>${r.author}</strong>
          <div>
            <span class="star-icon">★</span> <strong>${r.rating}</strong> • <span class="text-muted">${r.date}</span>
          </div>
        </div>
        <p class="text-sm text-muted">${r.text}</p>
      </div>
    `).join('');

    modalContent.innerHTML = `
      <div class="vendor-detail-header">
        <img src="${v.image}" alt="${v.name}" class="vendor-detail-img">
        <div class="vendor-detail-overlay">
          <div>
            <span class="category-tag text-white" style="color: #ffffff !important;">${v.category}</span>
            <h2 class="text-white" style="color: #ffffff !important; font-family: var(--font-heading); font-size: 1.6rem;">${v.name}</h2>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.9rem;"><i class="fa-solid fa-location-dot"></i> ${v.address}</p>
          </div>
          <button id="modalFavBtn" class="btn ${isFav ? 'btn-danger' : 'btn-secondary'}">
            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i> ${isFav ? 'Saved' : 'Save Spot'}
          </button>
        </div>
      </div>

      <div class="vendor-detail-body">
        <div class="detail-grid">
          <div class="detail-main">
            <h3 class="detail-section-title">About Business & Owner</h3>
            <p class="text-secondary" style="margin-bottom: 1.25rem;">${v.description}</p>

            <h3 class="detail-section-title">Key Offerings & Price List</h3>
            <div class="price-list">
              ${priceItems.length ? priceItems : '<p class="text-muted">Inquire directly for custom catalog & rates.</p>'}
            </div>

            <div class="reviews-section">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem;">
                <h3 class="detail-section-title" style="margin-bottom:0; border:none;">Neighborhood Reviews (${v.reviewsCount})</h3>
                <span class="rating-score"><i class="fa-solid fa-star star-icon"></i> ${v.rating} / 5</span>
              </div>
              <div class="reviews-list">
                ${reviewsItems.length ? reviewsItems : '<p class="text-muted">No reviews yet. Be the first neighbor to write a review!</p>'}
              </div>

              <!-- Add Review Form -->
              <div style="margin-top: 1.5rem; padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <h4 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">Write a Neighbor Review</h4>
                <form id="addReviewForm">
                  <div style="display:flex; gap: 0.75rem; margin-bottom: 0.5rem;">
                    <input type="text" id="revName" placeholder="Your Name" required style="flex:1;">
                    <select id="revRating" required style="width: 120px;">
                      <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                      <option value="4">⭐⭐⭐⭐ (4)</option>
                      <option value="3">⭐⭐⭐ (3)</option>
                      <option value="2">⭐⭐ (2)</option>
                      <option value="1">⭐ (1)</option>
                    </select>
                  </div>
                  <textarea id="revText" rows="2" placeholder="Share your experience with this vendor..." required style="width:100%; margin-bottom: 0.5rem;"></textarea>
                  <button type="submit" class="btn btn-primary" style="padding: 0.4rem 1rem; font-size: 0.85rem;">Submit Review</button>
                </form>
              </div>
            </div>
          </div>

          <div class="detail-sidebar">
            <div style="padding: 1.25rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color); display:flex; flex-direction:column; gap: 1rem;">
              <button id="modalWaActionBtn" class="btn btn-whatsapp full-width" style="width:100%;">
                <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
              </button>
              <button id="modalCallActionBtn" class="btn btn-primary full-width" style="width:100%;">
                <i class="fa-solid fa-phone"></i> Call ${v.phone}
              </button>

              <hr style="border:none; border-top:1px solid var(--border-color);">

              <div>
                <strong style="display:block; font-size: 0.825rem; color: var(--text-muted); text-transform:uppercase;">Owner Contact</strong>
                <span>${v.owner}</span>
              </div>

              <div>
                <strong style="display:block; font-size: 0.825rem; color: var(--text-muted); text-transform:uppercase;">Operating Hours</strong>
                <span>${v.timings}</span>
              </div>

              <div>
                <strong style="display:block; font-size: 0.825rem; color: var(--text-muted); text-transform:uppercase;">Accepted Payments</strong>
                <span>${v.payments.join(', ')}</span>
              </div>

              <div>
                <strong style="display:block; font-size: 0.825rem; color: var(--text-muted); text-transform:uppercase;">Languages Spoken</strong>
                <span>${v.languages.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('vendorModal').classList.remove('hidden');

    // Attach Detail Modal Dynamic Listeners
    document.getElementById('modalFavBtn').addEventListener('click', () => {
      toggleFavorite(v.id);
      openVendorModal(v.id); // refresh modal state
    });

    document.getElementById('modalWaActionBtn').addEventListener('click', () => openWhatsApp(v.id));
    document.getElementById('modalCallActionBtn').addEventListener('click', () => window.location.href = `tel:${v.phone}`);

    document.getElementById('addReviewForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('revName').value.trim();
      const rating = parseInt(document.getElementById('revRating').value, 10);
      const text = document.getElementById('revText').value.trim();

      if (!v.reviews) v.reviews = [];
      v.reviews.unshift({ author, rating, date: 'Just now', text });
      
      // Recalculate average rating
      const totalScore = v.reviews.reduce((acc, curr) => acc + curr.rating, 0);
      v.reviewsCount = v.reviews.length;
      v.rating = parseFloat((totalScore / v.reviewsCount).toFixed(1));

      saveVendors();
      showToast('Thank you! Your neighbor review has been added.');
      updateUI();
      openVendorModal(v.id);
    });
  }

  function closeVendorModal() {
    document.getElementById('vendorModal').classList.add('hidden');
    state.selectedVendorId = null;
  }

  // --- ADD VENDOR MODAL ---
  function openAddVendorModal() {
    document.getElementById('addVendorModal').classList.remove('hidden');
  }

  function closeAddVendorModal() {
    document.getElementById('addVendorModal').classList.add('hidden');
    document.getElementById('addVendorForm').reset();
  }

  function handleAddVendorSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('vName').value.trim();
    const category = document.getElementById('vCategory').value;
    const locality = document.getElementById('vLocality').value;
    const owner = document.getElementById('vOwner').value.trim();
    const phone = document.getElementById('vPhone').value.trim();
    const whatsapp = document.getElementById('vWhatsapp').value.trim() || phone;
    const address = document.getElementById('vAddress').value.trim();
    const distance = parseFloat(document.getElementById('vDistance').value) || 0.5;
    const timings = document.getElementById('vTimings').value.trim();
    const offeringsRaw = document.getElementById('vOfferings').value.trim();
    const description = document.getElementById('vDescription').value.trim() || 'Neighborhood vendor listing.';
    let image = document.getElementById('vImage').value.trim();

    if (!image) {
      // Default placeholder based on category
      const placeholders = {
        'Grocery': 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
        'Mechanic': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
        'Medical': 'https://images.unsplash.com/photo-1586015555751-63c25aa26388?auto=format&fit=crop&w=800&q=80',
        'Textiles': 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
        'Clothing': 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
        'Home Food': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
        'Artisans': 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
        'Services': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
      };
      image = placeholders[category] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80';
    }

    const offerings = offeringsRaw.split(',').map(item => {
      const parts = item.trim().split(' ');
      const price = parts[parts.length - 1].startsWith('₹') ? parts.pop() : 'Custom';
      return { name: parts.join(' ') || item.trim(), price };
    });

    const locCoord = (typeof LOCALITY_COORDINATES !== 'undefined' && LOCALITY_COORDINATES[locality]) 
      ? LOCALITY_COORDINATES[locality] 
      : { lat: 18.5074, lng: 73.8077 };
    const lat = locCoord.lat + (Math.random() - 0.5) * 0.008;
    const lng = locCoord.lng + (Math.random() - 0.5) * 0.008;

    const newVendor = {
      id: 'v-' + Date.now(),
      name,
      category,
      owner,
      phone,
      whatsapp,
      locality,
      address,
      distance,
      isOpen: true,
      isVerified: true,
      rating: 5.0,
      reviewsCount: 1,
      timings,
      payments: ['UPI', 'Cash'],
      languages: ['English', 'Local'],
      image,
      description,
      offerings,
      reviews: [{ author: 'Community Spotter', rating: 5, date: 'Just now', text: 'Newly added business listing verified by local neighbor.' }],
      mapCoords: { x: Math.floor(Math.random() * 60) + 20, y: Math.floor(Math.random() * 60) + 20, lat, lng }
    };

    state.vendors.unshift(newVendor);
    saveVendors();
    closeAddVendorModal();
    showToast(`🎉 Published ${name} listing successfully!`);

    // Switch locality to match if needed
    state.currentLocality = locality;
    document.getElementById('localitySelect').value = locality;
    localStorage.setItem('vl_locality', locality);
    
    updateUI();
  }

  // --- LEAFLET MAP API INITIALIZATION & RENDER ---
  let leafletMap = null;
  let mapMarkers = [];

  // Expose popup trigger functions on window scope
  window.vlOpenVendor = function(id) {
    openVendorModal(id);
  };
  window.vlOpenWa = function(id) {
    openWhatsApp(id);
  };

  function renderMap() {
    const filtered = getFilteredVendors();
    document.getElementById('mapLocalityName').textContent = state.currentLocality.split(',')[0];
    
    // 1. Render Sidebar list
    const sidebarList = document.getElementById('mapSidebarList');
    sidebarList.innerHTML = filtered.map(v => `
      <div class="map-item" data-id="${v.id}">
        <div style="font-weight:700; font-size:0.95rem;">${v.name}</div>
        <div class="text-sm text-muted">${v.category} • ${v.distance} km</div>
      </div>
    `).join('');

    const canvas = document.getElementById('mapCanvas');

    // 2. Leaflet API Integration
    if (typeof L !== 'undefined') {
      // Determine locality center coordinates
      const locCenter = (typeof LOCALITY_COORDINATES !== 'undefined' && LOCALITY_COORDINATES[state.currentLocality])
        ? LOCALITY_COORDINATES[state.currentLocality]
        : { lat: 18.5074, lng: 73.8077, zoom: 15 };

      if (!leafletMap) {
        // Initialize Leaflet Map instance
        canvas.innerHTML = ''; // clear DOM placeholder
        leafletMap = L.map('mapCanvas', {
          zoomControl: true,
          scrollWheelZoom: true
        }).setView([locCenter.lat, locCenter.lng], locCenter.zoom);

        // Add OpenStreetMap Tile Layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(leafletMap);
      } else {
        leafletMap.setView([locCenter.lat, locCenter.lng], locCenter.zoom);
        // Trigger resize invalidate after view switch
        setTimeout(() => leafletMap.invalidateSize(), 200);
      }

      // Clear existing markers
      mapMarkers.forEach(m => leafletMap.removeLayer(m));
      mapMarkers = [];

      // Add fresh Leaflet markers for filtered vendors
      const markerMap = {};

      filtered.forEach(v => {
        const lat = (v.mapCoords && v.mapCoords.lat) ? v.mapCoords.lat : locCenter.lat + (Math.random() - 0.5) * 0.01;
        const lng = (v.mapCoords && v.mapCoords.lng) ? v.mapCoords.lng : locCenter.lng + (Math.random() - 0.5) * 0.01;

        const categoryIcon = {
          'Kiranas & Provisions': 'fa-basket-shopping',
          'Tailors & Stitching': 'fa-scissors',
          'Home Food & Tiffins': 'fa-utensils',
          'Repair & Maintenance': 'fa-wrench',
          'Local Artisans': 'fa-palette',
          'Services & Helpers': 'fa-user-gear'
        }[v.category] || 'fa-store';

        const customIcon = L.divIcon({
          className: 'leaflet-custom-marker',
          html: `<div class="pin-head"><i class="fa-solid ${categoryIcon} pin-icon"></i></div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36]
        });

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(leafletMap);

        const popupHTML = `
          <div class="map-popup-card" style="padding: 0.5rem; min-width: 180px;">
            <h4 style="font-family: var(--font-heading); margin-bottom: 0.2rem; font-size: 0.95rem; font-weight: 700;">${v.name}</h4>
            <div class="text-sm text-primary" style="font-weight: 600; margin-bottom: 0.2rem;">${v.category}</div>
            <div class="text-sm text-muted" style="margin-bottom: 0.5rem; font-size: 0.775rem;"><i class="fa-solid fa-location-dot"></i> ${v.address}</div>
            <div style="display: flex; gap: 0.4rem;">
              <button onclick="window.vlOpenVendor('${v.id}')" class="btn btn-primary" style="padding: 0.35rem 0.7rem; font-size: 0.75rem;"><i class="fa-solid fa-circle-info"></i> Profile</button>
              <button onclick="window.vlOpenWa('${v.id}')" class="btn btn-whatsapp" style="padding: 0.35rem 0.7rem; font-size: 0.75rem;"><i class="fa-brands fa-whatsapp"></i> Chat</button>
            </div>
          </div>
        `;

        marker.bindPopup(popupHTML);
        mapMarkers.push(marker);
        markerMap[v.id] = { marker, lat, lng, vendor: v };
      });

      // Sidebar click handler: fly to marker & open popup
      if (sidebarList) {
        sidebarList.querySelectorAll('.map-item').forEach(item => {
          item.addEventListener('click', () => {
            const vId = item.dataset.id;
            if (markerMap[vId]) {
              leafletMap.flyTo([markerMap[vId].lat, markerMap[vId].lng], 16, { animate: true, duration: 1 });
              markerMap[vId].marker.openPopup();
            } else {
              openVendorModal(vId);
            }
          });
        });
      }

    } else {
      // Fallback SVG Map if Leaflet CDN fails to load
      canvas.innerHTML = filtered.map(v => {
        const categoryIcon = {
          'Kiranas & Provisions': 'fa-basket-shopping',
          'Tailors & Stitching': 'fa-scissors',
          'Home Food & Tiffins': 'fa-utensils',
          'Repair & Maintenance': 'fa-wrench',
          'Local Artisans': 'fa-palette',
          'Services & Helpers': 'fa-user-gear'
        }[v.category] || 'fa-store';

        const x = v.mapCoords ? v.mapCoords.x : 50;
        const y = v.mapCoords ? v.mapCoords.y : 50;

        return `
          <div class="map-pin" style="left: ${x}%; top: ${y}%;" data-id="${v.id}">
            <div class="pin-head">
              <i class="fa-solid ${categoryIcon} pin-icon"></i>
            </div>
          </div>
        `;
      }).join('');

      canvas.querySelectorAll('.map-pin').forEach(pin => {
        pin.addEventListener('click', () => openVendorModal(pin.dataset.id));
      });
    }
  }

  // --- COMMUNITY BOARD RENDER ---
  function renderBoard() {
    const feed = document.getElementById('boardFeed');
    let posts = state.boardPosts;

    // Filter by tag
    if (state.activeBoardTag !== 'all') {
      posts = posts.filter(p => p.tag === state.activeBoardTag);
    }

    // Attach Board tag filter buttons
    document.querySelectorAll('.board-tag-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tag === state.activeBoardTag);
      btn.onclick = () => {
        state.activeBoardTag = btn.dataset.tag;
        renderBoard();
      };
    });

    feed.innerHTML = posts.map(p => `
      <div class="board-card">
        <div class="board-card-header">
          <span class="post-tag-badge tag-${getPostTagClass(p.tag)}">${p.tag}</span>
          <span class="post-time">${p.time}</span>
        </div>
        <h3 class="board-title">${p.title}</h3>
        <div class="board-vendor-name"><i class="fa-solid fa-shop"></i> ${p.vendorName}</div>
        <p class="board-body">${p.content}</p>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top: auto; padding-top: 0.5rem; border-top: 1px solid var(--border-color);">
          <span class="text-sm text-muted"><i class="fa-solid fa-phone"></i> ${p.phone || 'Direct Call'}</span>
          <button class="btn btn-whatsapp board-wa-btn" data-phone="${p.phone}" data-title="${p.title}" style="padding:0.4rem 0.85rem; font-size:0.8rem;">
            <i class="fa-brands fa-whatsapp"></i> Inquiry
          </button>
        </div>
      </div>
    `).join('');

    feed.querySelectorAll('.board-wa-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const phoneClean = (btn.dataset.phone || '').replace(/[^0-9]/g, '');
        const message = encodeURIComponent(`Hi, I saw your update "${btn.dataset.title}" on the VendorLink Neighborhood Board! Is this still available?`);
        window.open(`https://wa.me/${phoneClean}?text=${message}`, '_blank');
      });
    });
  }

  function getPostTagClass(tag) {
    if (tag === 'Fresh Arrival') return 'fresh';
    if (tag === 'Special Menu') return 'special';
    if (tag === 'Discount') return 'discount';
    return 'notice';
  }

  function openAddPostModal() {
    document.getElementById('addBoardPostModal').classList.remove('hidden');
  }

  function closeAddPostModal() {
    document.getElementById('addBoardPostModal').classList.add('hidden');
    document.getElementById('addBoardPostForm').reset();
  }

  function handleAddPostSubmit(e) {
    e.preventDefault();
    const vendorName = document.getElementById('pVendor').value.trim();
    const tag = document.getElementById('pTag').value;
    const title = document.getElementById('pTitle').value.trim();
    const content = document.getElementById('pContent').value.trim();
    const phone = document.getElementById('pPhone').value.trim();

    const newPost = {
      id: 'b-' + Date.now(),
      vendorName,
      tag,
      title,
      content,
      time: 'Just now',
      phone,
      likes: 0
    };

    state.boardPosts.unshift(newPost);
    saveBoardPosts();
    closeAddPostModal();
    showToast('📢 Notice published to Neighborhood Board!');
    renderBoard();
    updateUI();
  }

  // --- SAVED SPOTS (FAVORITES) RENDER ---
  function renderFavorites() {
    const grid = document.getElementById('favVendorGrid');
    const empty = document.getElementById('emptyFavState');
    const favVendors = state.vendors.filter(v => state.favorites.includes(v.id));

    if (favVendors.length === 0) {
      grid.innerHTML = '';
      empty.classList.remove('hidden');
      return;
    }

    empty.classList.add('hidden');
    grid.innerHTML = favVendors.map(v => createVendorCardHTML(v)).join('');

    grid.querySelectorAll('.vendor-card').forEach(card => {
      const vId = card.dataset.id;
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.action-btn') && !e.target.closest('.fav-toggle-btn')) {
          openVendorModal(vId);
        }
      });

      card.querySelector('.fav-toggle-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(vId);
        renderFavorites();
      });
    });
  }

  // --- TOAST NOTIFICATION HELPER ---
  function showToast(msg) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-info text-primary"></i> <span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Launch app when DOM is ready
  document.addEventListener('DOMContentLoaded', init);

})();
