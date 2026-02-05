// Contact Form Handler with Web3Forms
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const result = document.getElementById('result');
  const submitBtn = document.getElementById('submitBtn');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');

  // Modal open/close handlers
  const contactLink = document.querySelector('a[href="#contact"]');
  if (contactLink) {
    contactLink.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'flex';
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', function() {
      modal.style.display = 'none';
      form.reset();
      result.style.display = 'none';
    });
  }

  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      form.reset();
      result.style.display = 'none';
    }
  });

  // Form submission with AJAX
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Disable submit button to prevent double submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    result.style.display = 'none';

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Send form data via AJAX
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        // Success
        result.innerHTML = '<div style="color: #4ade80; padding: 10px; background: rgba(74, 222, 128, 0.1); border-radius: 8px;">✓ Message sent successfully! I\'ll get back to you soon.</div>';
        result.style.display = 'block';
        form.reset();
        
        // Close modal after 3 seconds
        setTimeout(() => {
          modal.style.display = 'none';
          result.style.display = 'none';
        }, 3000);
      } else {
        // Error
        console.log(response);
        result.innerHTML = '<div style="color: #f87171; padding: 10px; background: rgba(248, 113, 113, 0.1); border-radius: 8px;">✕ ' + json.message + '</div>';
        result.style.display = 'block';
      }
    })
    .catch(error => {
      console.log(error);
      result.innerHTML = '<div style="color: #f87171; padding: 10px; background: rgba(248, 113, 113, 0.1); border-radius: 8px;">✕ Something went wrong. Please try again.</div>';
      result.style.display = 'block';
    })
    .finally(() => {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
  });
});