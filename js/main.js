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

  // Program application form (front-end only placeholder — no backend yet)
  const applyForm = document.getElementById('program-apply-form');
  if (applyForm) {
    applyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formCard = applyForm.closest('.apply-form-card');
      const successBlock = formCard.querySelector('.form-success');
      applyForm.style.display = 'none';
      if (successBlock) {
        successBlock.classList.add('show');
        successBlock.focus();
      }
    });
  }

  // Event registration modal (front-end only placeholder — no backend yet)
  const modalOverlay = document.getElementById('register-modal');
  if (modalOverlay) {
    const modalCard = modalOverlay.querySelector('.modal-card');
    const modalForm = modalOverlay.querySelector('.modal-form');
    const modalSuccess = modalOverlay.querySelector('.modal-success');
    const modalEventLabel = modalOverlay.querySelector('.modal-event-label');
    const modalTitle = modalOverlay.querySelector('.modal-title-text');
    const closeBtn = modalOverlay.querySelector('.modal-close');
    let lastFocused = null;

    function openModal(eventName, eventDate) {
      lastFocused = document.activeElement;
      modalEventLabel.textContent = eventDate;
      modalTitle.textContent = eventName;
      modalForm.style.display = 'block';
      modalForm.reset();
      modalSuccess.classList.remove('show');
      modalOverlay.classList.add('open');
      const firstInput = modalForm.querySelector('input');
      if (firstInput) firstInput.focus();
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll('[data-register-event]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openModal(btn.getAttribute('data-event-name'), btn.getAttribute('data-event-date'));
      });
    });

    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
    });

    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      modalForm.style.display = 'none';
      modalSuccess.classList.add('show');
    });
  }

  // Become a Member — multi-step signup flow (front-end only placeholder — no backend yet)
  const flowCard = document.querySelector('.flow-card');
  if (flowCard) {
    const panels = Array.from(flowCard.querySelectorAll('.flow-panel'));
    const stepCircles = Array.from(document.querySelectorAll('.flow-step-circle'));
    const stepLabels = Array.from(document.querySelectorAll('.flow-step-label'));
    let currentStep = 0;

    function renderStep() {
      panels.forEach(function (panel, i) {
        panel.classList.toggle('active', i === currentStep);
      });
      stepCircles.forEach(function (circle, i) {
        circle.classList.remove('active', 'done');
        if (i < currentStep) {
          circle.classList.add('done');
          circle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M20 6L9 17l-5-5"/></svg>';
        } else if (i === currentStep) {
          circle.classList.add('active');
          circle.textContent = (i + 1).toString();
        } else {
          circle.textContent = (i + 1).toString();
        }
      });
      stepLabels.forEach(function (label, i) {
        label.classList.toggle('active', i === currentStep);
      });
      flowCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.querySelectorAll('[data-flow-next]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const panel = btn.closest('.flow-panel');
        const requiredFields = panel.querySelectorAll('[required]');
        let valid = true;
        requiredFields.forEach(function (field) {
          if (!field.checkValidity()) {
            valid = false;
            field.reportValidity();
          }
        });
        if (!valid) return;
        if (currentStep < panels.length - 1) {
          currentStep++;
          renderStep();
        }
      });
    });

    document.querySelectorAll('[data-flow-back]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (currentStep > 0) {
          currentStep--;
          renderStep();
        }
      });
    });

    const resendBtn = document.querySelector('[data-resend-email]');
    if (resendBtn) {
      resendBtn.addEventListener('click', function () {
        const originalText = resendBtn.textContent;
        resendBtn.textContent = 'Sent ✓';
        resendBtn.disabled = true;
        setTimeout(function () {
          resendBtn.textContent = originalText;
          resendBtn.disabled = false;
        }, 3000);
      });
    }

    // Photo upload preview (front-end only)
    const photoInput = document.getElementById('profile-photo-input');
    const photoCircle = document.querySelector('.photo-upload-circle');
    if (photoInput && photoCircle) {
      photoInput.addEventListener('change', function () {
        const file = photoInput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            photoCircle.style.backgroundImage = 'url(' + e.target.result + ')';
            photoCircle.style.backgroundSize = 'cover';
            photoCircle.style.backgroundPosition = 'center';
            photoCircle.innerHTML = '';
          };
          reader.readAsDataURL(file);
        }
      });
    }

    renderStep();
  }
});
