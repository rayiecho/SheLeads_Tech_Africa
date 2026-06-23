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

  // Contact page — inquiry quick-link cards sync with form select (front-end only)
  const inquiryCards = document.querySelectorAll('[data-inquiry-type]');
  const inquirySelect = document.getElementById('contact-inquiry-type');
  if (inquiryCards.length && inquirySelect) {
    function selectInquiryCard(card) {
      inquiryCards.forEach(function (c) { c.classList.remove('selected'); });
      card.classList.add('selected');
      inquirySelect.value = card.getAttribute('data-inquiry-type');
      document.getElementById('contact-form-card-anchor').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    inquiryCards.forEach(function (card) {
      card.addEventListener('click', function () { selectInquiryCard(card); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectInquiryCard(card);
        }
      });
    });
  }

  // Contact form submission (front-end only placeholder — no backend yet)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const card = contactForm.closest('.contact-form-card');
      const success = card.querySelector('.contact-success');
      contactForm.style.display = 'none';
      if (success) {
        success.classList.add('show');
        success.focus();
      }
    });
  }

  // Donate page — frequency toggle, amount selection, and honest preview modal (no real payment processing yet)
  const donateForm = document.getElementById('donate-form');
  if (donateForm) {
    const freqButtons = document.querySelectorAll('.donate-toggle button');
    const amountRadios = donateForm.querySelectorAll('input[name="donate-amount"]');
    const customInput = document.getElementById('custom-amount');
    const totalValue = document.getElementById('donate-total-value');
    let currentFreq = 'once';

    function getSelectedAmount() {
      const customVal = parseFloat(customInput.value);
      if (customVal > 0) return customVal;
      const checked = donateForm.querySelector('input[name="donate-amount"]:checked');
      return checked ? parseFloat(checked.value) : 0;
    }

    function updateTotal() {
      const amount = getSelectedAmount();
      const suffix = currentFreq === 'monthly' ? '/mo' : '';
      totalValue.textContent = '$' + (amount > 0 ? amount.toFixed(0) : '0') + suffix;
    }

    freqButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        freqButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentFreq = btn.getAttribute('data-freq');
        updateTotal();
      });
    });

    amountRadios.forEach(function (radio) {
      radio.addEventListener('change', function () {
        customInput.value = '';
        updateTotal();
      });
    });

    customInput.addEventListener('input', function () {
      if (parseFloat(customInput.value) > 0) {
        amountRadios.forEach(function (r) { r.checked = false; });
      }
      updateTotal();
    });

    updateTotal();

    donateForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const amount = getSelectedAmount();
      if (amount <= 0) {
        customInput.focus();
        return;
      }
      const modal = document.getElementById('donate-preview-modal');
      const modalAmount = modal.querySelector('.preview-modal-summary .amount');
      const modalFreq = modal.querySelector('.preview-modal-summary .freq');
      modalAmount.textContent = '$' + amount.toFixed(0);
      modalFreq.textContent = currentFreq === 'monthly' ? 'Monthly donation' : 'One-time donation';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const previewModal = document.getElementById('donate-preview-modal');
    if (previewModal) {
      const closeBtn = previewModal.querySelector('.modal-close');
      closeBtn.addEventListener('click', function () {
        previewModal.classList.remove('open');
        document.body.style.overflow = '';
      });
      previewModal.addEventListener('click', function (e) {
        if (e.target === previewModal) {
          previewModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // Partnership application form (front-end only placeholder — no backend yet)
  const partnerForm = document.getElementById('partner-apply-form');
  if (partnerForm) {
    partnerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const card = partnerForm.closest('.partner-form-card');
      const success = card.querySelector('.partner-success');
      partnerForm.style.display = 'none';
      if (success) {
        success.classList.add('show');
        success.focus();
      }
    });
  }

  // Partnership tier "Apply" buttons pre-select the tier in the form
  const tierSelect = document.getElementById('partner-tier-select');
  document.querySelectorAll('[data-tier-apply]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (tierSelect) {
        tierSelect.value = btn.getAttribute('data-tier-apply');
      }
      const formAnchor = document.getElementById('partner-apply-anchor');
      if (formAnchor) formAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Executive application form (front-end only placeholder — no backend yet)
  const execForm = document.getElementById('exec-apply-form');
  if (execForm) {
    execForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const card = execForm.closest('.exec-form-card');
      const success = card.querySelector('.exec-success');
      execForm.style.display = 'none';
      if (success) {
        success.classList.add('show');
        success.focus();
      }
    });
  }

  // Open role "Apply" buttons pre-select the role in the form
  const roleSelect = document.getElementById('exec-role-select');
  document.querySelectorAll('[data-role-apply]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (roleSelect) {
        roleSelect.value = btn.getAttribute('data-role-apply');
      }
      const formAnchor = document.getElementById('exec-apply-anchor');
      if (formAnchor) formAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
