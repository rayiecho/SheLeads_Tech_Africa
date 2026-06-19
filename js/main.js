// SHE LEADS TECH AFRICA — shared site behavior

document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Newsletter form (front-end only placeholder — no backend yet)
  const newsletterForms = document.querySelectorAll('.footer-newsletter form');
  newsletterForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('input');
      const button = form.querySelector('button');
      if (input && input.value.trim()) {
        const originalText = button.textContent;
        button.textContent = 'Subscribed ✓';
        input.value = '';
        setTimeout(function () {
          button.textContent = originalText;
        }, 2500);
      }
    });
  });
});
