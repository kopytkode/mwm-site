document.getElementById("year").textContent = new Date().getFullYear();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.bio, aside, .works-section h2').forEach(el => {
    el.classList.add('fade-in-element');
    observer.observe(el);
  });
});

// ===== MODAL LOGIC =====
const modal = document.getElementById("modal");
const openBtn = document.getElementById("contactOpen");
const closeBtn = document.getElementById("modalClose");

openBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
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

// ===== EXPANDABLE CARDS =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(".card").forEach((card) => {
    // Set the card's background image from data attribute
    const imgSrc = card.dataset.image;
    if (imgSrc) {
      card.querySelector('.card-img-bg').style.backgroundImage = `url('${imgSrc}')`;
    }

    const btn = card.querySelector('.expand');
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const wasOpen = card.classList.contains("open");

      // Close all other open cards
      document.querySelectorAll(".card.open").forEach(c => {
        if (c !== card) {
          c.classList.remove("open");
          const otherBtn = c.querySelector('.expand');
          if (otherBtn) otherBtn.textContent = "Learn More";
        }
      });

      card.classList.toggle("open");
      btn.textContent = card.classList.contains("open") ? "Show Less" : "Learn More";
    });
  });
});

// ===== STAGGERED CARD APPEARANCE =====
window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 150 + index * 100);
  });
});

// ===== NAV SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const nav = document.querySelector('.topnav');
  if (window.pageYOffset > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});
