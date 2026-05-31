// ===== BOOK DATA =====
const books = [
  { id: 1,  title: "The Midnight Library",   author: "Matt Haig",          genre: "Fiction",    status: "available", distance: "1.2 km",  color: "#111111", provider: "dreamingreader" },
  { id: 2,  title: "Atomic Habits",           author: "James Clear",        genre: "Self-Help",  status: "available", distance: "3.4 km",  color: "#e891bb", provider: "habitgirl22" },
  { id: 3,  title: "Dune",                    author: "Frank Herbert",       genre: "Fantasy",    status: "borrowed",  distance: "2.1 km",  color: "#111111", provider: "scifimax" },
  { id: 4,  title: "Normal People",           author: "Sally Rooney",       genre: "Fiction",    status: "available", distance: "0.8 km",  color: "#f9b8d4", provider: "booklovermia" },
  { id: 5,  title: "Sapiens",                 author: "Yuval Noah Harari",  genre: "Non-Fiction",status: "available", distance: "4.7 km",  color: "#333333", provider: "curiosityclub" },
  { id: 6,  title: "The Alchemist",           author: "Paulo Coelho",       genre: "Fiction",    status: "available", distance: "1.9 km",  color: "#e891bb", provider: "dreamingmylifeaway" },
  { id: 7,  title: "A Brief History of Time", author: "Stephen Hawking",    genre: "Science",    status: "borrowed",  distance: "6.3 km",  color: "#111111", provider: "stargazer99" },
  { id: 8,  title: "The Power of Now",        author: "Eckhart Tolle",      genre: "Self-Help",  status: "available", distance: "2.5 km",  color: "#f9b8d4", provider: "mindfulreads" },
  { id: 9,  title: "Pride and Prejudice",     author: "Jane Austen",        genre: "Romance",    status: "available", distance: "3.1 km",  color: "#e891bb", provider: "classicslover" },
  { id: 10, title: "The Hitchhiker's Guide",  author: "Douglas Adams",      genre: "Fiction",    status: "available", distance: "5.0 km",  color: "#111111", provider: "42books" },
  { id: 11, title: "Educated",                author: "Tara Westover",      genre: "Non-Fiction",status: "borrowed",  distance: "7.2 km",  color: "#333333", provider: "nonficfan" },
  { id: 12, title: "The Name of the Wind",    author: "Patrick Rothfuss",   genre: "Fantasy",    status: "available", distance: "1.5 km",  color: "#111111", provider: "fantasyrealm" },
];

// ===== RENDER BOOKS =====
function renderBooks(list) {
  const grid = document.getElementById('bookGrid');
  if (!grid) return;
  if (list.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:40px 0;">No books found. Try a different search.</p>';
    return;
  }
  grid.innerHTML = list.map(book => `
    <div class="book-card" onclick="openBookModal(${book.id})">
      <div class="book-cover" style="background:${book.color}">
        <span>${book.title}</span>
      </div>
      <div class="book-card-info">
        <h4>${book.title}</h4>
        <p>${book.author}</p>
        <span class="book-status status-${book.status}">
          ${book.status === 'available'
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><polyline points="20 6 9 17 4 12"/></svg>Available'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Borrowed'}
        </span>
        <div class="book-distance">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>${book.distance} away
        </div>
        <div class="book-provider">Provided by: ${book.provider}</div>
      </div>
    </div>
  `).join('');
}

// ===== FILTER BOOKS =====
function filterBooks() {
  const query  = document.getElementById('searchInput').value.toLowerCase();
  const genre  = document.getElementById('genreFilter').value;
  const status = document.getElementById('availFilter').value;

  const filtered = books.filter(b => {
    const matchText  = b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query) || b.genre.toLowerCase().includes(query);
    const matchGenre = !genre  || b.genre === genre;
    const matchStatus= !status || b.status === status;
    return matchText && matchGenre && matchStatus;
  });
  renderBooks(filtered);
}

// ===== BOOK MODAL =====
function openBookModal(id) {
  const book = books.find(b => b.id === id);
  if (!book) return;

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="modal-cover" style="background:${book.color}">
        <span>${book.title}</span>
      </div>
      <div class="modal-info">
        <h3>${book.title}</h3>
        <p class="modal-author">${book.author} · ${book.genre}</p>
        <span class="book-status status-${book.status}">
          ${book.status === 'available'
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><polyline points="20 6 9 17 4 12"/></svg>Available to Borrow'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Currently Borrowed'}
        </span>
        <p class="modal-distance">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>${book.distance} from your location
        </p>
        ${book.status === 'available'
          ? `<button class="btn-primary" style="width:100%;margin-top:16px" onclick="requestBook('${book.title}')">Request to Borrow</button>`
          : `<button class="btn-secondary" style="width:100%;margin-top:16px" disabled>Join Waitlist</button>`
        }
        <p style="font-size:0.78rem;color:#888;margin-top:8px;text-align:center">Provided by: ${book.provider}</p>
        <button class="btn-secondary" style="width:100%;margin-top:10px" onclick="this.closest('.modal-overlay').remove()">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  refreshIcons();
}

function requestBook(title) {
  showToast(`Request sent for "${title}" — the owner will be notified.`);
  document.querySelector('.modal-overlay')?.remove();
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('toast-show'), 10);
  setTimeout(() => { toast.classList.remove('toast-show'); setTimeout(() => toast.remove(), 300); }, 3500);
}

// ===== SWIPE FEATURE =====
const swipeBooks = [
  { title: "The Midnight Library", author: "Matt Haig · Fiction",       color: "#8b5e3c" },
  { title: "Atomic Habits",         author: "James Clear · Self-Help",   color: "#4a7c59" },
  { title: "Dune",                  author: "Frank Herbert · Fantasy",   color: "#c49a6c" },
  { title: "Normal People",         author: "Sally Rooney · Fiction",    color: "#7b4f8a" },
  { title: "Sapiens",               author: "Yuval Harari · Non-Fiction",color: "#2980b9" },
];
let swipeIndex = 0;

function updateSwipeCard() {
  const book = swipeBooks[swipeIndex % swipeBooks.length];
  const card = document.getElementById('swipeCard');
  if (!card) return;
  card.style.transition = 'none';
  card.style.transform = 'scale(1) rotate(0deg)';
  document.getElementById('swipeCover').style.background = book.color;
  document.getElementById('swipeTitle').textContent = book.title;
  document.getElementById('swipeAuthor').textContent = book.author;
}

function swipeBook(direction) {
  const card = document.getElementById('swipeCard');
  const hint = document.getElementById('swipeHint');
  if (!card) return;

  const tx = direction === 'right' ? 300 : -300;
  card.style.transition = 'transform 0.4s ease';
  card.style.transform = `translateX(${tx}px) rotate(${direction === 'right' ? 15 : -15}deg)`;

  if (direction === 'right') {
    hint.textContent = 'Added to your wishlist!';
    showToast(`"${swipeBooks[swipeIndex % swipeBooks.length].title}" added to your wishlist!`);
  } else {
    hint.textContent = 'Skipped!';
  }

  setTimeout(() => {
    swipeIndex++;
    updateSwipeCard();
    hint.textContent = 'Try swiping!';
  }, 450);
}

// ===== MAP (LEAFLET) =====
function initMap() {
  const mapEl = document.getElementById('leafletMap');
  if (!mapEl || typeof L === 'undefined') return;

  // Centre on Berlin as a demo city
  const map = L.map('leafletMap').setView([52.52, 13.405], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Public bookshelves (green)
  const bookshelves = [
    { lat: 52.530, lng: 13.380, name: "Bücherschrank Mitte",       books: 14 },
    { lat: 52.510, lng: 13.430, name: "Bücherschrank Kreuzberg",   books: 9  },
    { lat: 52.545, lng: 13.410, name: "Bücherschrank Prenzlauer Berg", books: 21 },
    { lat: 52.500, lng: 13.370, name: "Bücherschrank Schöneberg",  books: 7  },
    { lat: 52.535, lng: 13.450, name: "Bücherschrank Friedrichshain", books: 16 },
  ];

  const greenIcon = L.divIcon({ className: '', html: '<div style="background:#4a7c59;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>' });
  const blueIcon  = L.divIcon({ className: '', html: '<div style="background:#2980b9;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>' });
  const orangeIcon= L.divIcon({ className: '', html: '<div style="background:#e891bb;width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>' });

  bookshelves.forEach(s => {
    L.marker([s.lat, s.lng], { icon: greenIcon })
      .addTo(map)
      .bindPopup(`<strong>${s.name}</strong><br>${s.books} books available`);
  });

  // Users with books (blue) — approximate locations
  const users = [
    { lat: 52.518, lng: 13.395, name: "Sophie M.",  books: 5 },
    { lat: 52.525, lng: 13.415, name: "Leon K.",    books: 3 },
    { lat: 52.508, lng: 13.440, name: "Anna W.",    books: 8 },
    { lat: 52.540, lng: 13.390, name: "Max B.",     books: 2 },
    { lat: 52.515, lng: 13.460, name: "Julia S.",   books: 6 },
  ];

  users.forEach(u => {
    L.marker([u.lat, u.lng], { icon: blueIcon })
      .addTo(map)
      .bindPopup(`<strong>${u.name}</strong><br>${u.books} books available to borrow`);
  });

  // "Your" location
  L.marker([52.52, 13.405], { icon: orangeIcon })
    .addTo(map)
    .bindPopup('<strong>Your Location</strong><br>Approximate area shown for privacy')
    .openPopup();

  // 50 km radius circle
  L.circle([52.52, 13.405], { radius: 50000, color: '#f9b8d4', fillColor: '#f9b8d4', fillOpacity: 0.06, weight: 2, dashArray: '6,6' }).addTo(map);
}

// ===== NAVBAR MOBILE =====
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// ===== MODAL STYLES (injected) =====
const modalStyles = `
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.5);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999; padding: 20px;
  }
  .modal-box {
    background: #fdf6ec; border-radius: 20px; overflow: hidden;
    max-width: 360px; width: 100%; position: relative;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  }
  .modal-close {
    position: absolute; top: 12px; right: 12px;
    background: rgba(255,255,255,0.8); border: none; border-radius: 50%;
    width: 32px; height: 32px; cursor: pointer; font-size: 1rem; z-index: 1;
  }
  .modal-cover {
    height: 200px; display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem; font-weight: 600; color: white; text-align: center; padding: 20px;
  }
  .modal-info { padding: 24px; }
  .modal-info h3 { font-family: 'Playfair Display', serif; margin-bottom: 6px; }
  .modal-author { color: #7a6652; font-size: 0.9rem; margin-bottom: 12px; }
  .modal-distance { font-size: 0.85rem; color: #7a6652; margin-top: 10px; }
  .toast {
    position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(20px);
    background: #111; color: white; padding: 14px 24px; border-radius: 50px;
    font-size: 0.9rem; opacity: 0; transition: all 0.3s; z-index: 99999; white-space: nowrap;
  }
  .toast-show { opacity: 1; transform: translateX(-50%) translateY(0); }
`;

const styleTag = document.createElement('style');
styleTag.textContent = modalStyles;
document.head.appendChild(styleTag);

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderBooks(books);
  updateSwipeCard();
  initMap();
  // Render all static Lucide icons
  if (typeof lucide !== 'undefined') lucide.createIcons();
});

// Re-run createIcons after dynamic content (modals) is injected
function refreshIcons() {
  if (typeof lucide !== 'undefined') lucide.createIcons();
}
