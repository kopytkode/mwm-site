document.getElementById("year").textContent = new Date().getFullYear();

// Modal logic
const modal = document.getElementById("modal");
const openBtn = document.getElementById("contactOpen");
const closeBtn = document.getElementById("modalClose");

openBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => (modal.style.display = "none"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Expandable cards
document.querySelectorAll(".expand").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    card.classList.toggle("open");
  });
});

// Optional fade-in animation for footer/social icons
window.addEventListener("scroll", () => {
  const footer = document.querySelector("footer");
  const rect = footer.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    footer.classList.add("visible");
  }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  // Create menu toggle button if it doesn't exist
  const topnav = document.querySelector('.topnav');
  const navlinks = document.querySelector('.navlinks');
  
  if (topnav && navlinks) {
    // Check if toggle button already exists
    let menuToggle = document.querySelector('.menu-toggle');
    
    if (!menuToggle) {
      // Create toggle button
      menuToggle = document.createElement('button');
      menuToggle.className = 'menu-toggle';
      menuToggle.innerHTML = '☰ Menu';
      menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
      menuToggle.setAttribute('aria-expanded', 'false');
      
      // Insert after brand
      const brand = document.querySelector('.brand');
      if (brand) {
        brand.parentNode.insertBefore(menuToggle, brand.nextSibling);
      } else {
        topnav.insertBefore(menuToggle, navlinks);
      }
    }
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', function() {
      const isOpen = navlinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen ? '✕ Close' : '☰ Menu';
    });
    
    // Close menu when clicking a link
    const navLinksItems = navlinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navlinks.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.innerHTML = '☰ Menu';
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = topnav.contains(event.target);
      if (!isClickInside && navlinks.classList.contains('open')) {
        navlinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '☰ Menu';
      }
    });
  }
});
