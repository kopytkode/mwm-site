document.getElementById("year").textContent = new Date().getFullYear();

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== FADE IN ON SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards, sections, and bio elements
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card, .bio, aside, .works-section h2').forEach(el => {
    el.classList.add('fade-in-element');
    observer.observe(el);
  });
});

// ===== MODAL LOGIC WITH ANIMATION =====
const modal = document.getElementById("modal");
const openBtn = document.getElementById("contactOpen");
const closeBtn = document.getElementById("modalClose");

openBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
  // Trigger animation
  setTimeout(() => modal.classList.add('modal-show'), 10);
});

const closeModal = () => {
  modal.classList.remove('modal-show');
  setTimeout(() => modal.style.display = "none", 300);
};

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ===== EXPANDABLE CARDS WITH SMOOTH TRANSITION =====
document.querySelectorAll(".expand").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const wasOpen = card.classList.contains("open");
    
    // Close all other cards
    document.querySelectorAll(".card.open").forEach(c => {
      if (c !== card) c.classList.remove("open");
    });
    
    card.classList.toggle("open");
    
    // Update button text
    btn.textContent = card.classList.contains("open") ? "Show Less" : "Learn More";
  });
});

// ===== NAVIGATION BAR BACKGROUND ON SCROLL =====
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  const nav = document.querySelector('.topnav');
  
  if (currentScroll > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== STAGGERED CARD ANIMATION =====
window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

// Note: Mobile menu toggle removed since you're only showing contact button on mobile