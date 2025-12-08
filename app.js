// ============================ HAMBURGER MENU ============================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

// Optional: close mobile menu when link clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});

// ============================ CONTENT HUB TABS ============================
const tabs = document.querySelectorAll('.tab');
const contentGrid = document.querySelector('.content-grid');

if (tabs && contentGrid) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const type = tab.dataset.tab; // e.g., "articles", "shorts", etc.
      
      // show/hide content cards based on data-type
      const cards = contentGrid.querySelectorAll('.content-card');
      cards.forEach(card => {
        if (type === 'all' || card.dataset.type === type) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ============================ SMOOTH SCROLL (OPTIONAL) ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
