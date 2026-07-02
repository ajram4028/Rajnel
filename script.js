/* ============================================================
   ELITE BUILD CO — PREMIUM JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     LOADING SCREEN
     ============================================================ */
  const loader = document.getElementById('loader');
  const loaderPercent = document.querySelector('.loader-percent');
  let progress = 0;

  const loaderInterval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loaderInterval);
      if (loaderPercent) loaderPercent.textContent = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'visible';
        triggerHeroAnimation();
      }, 400);
    }
    if (loaderPercent) loaderPercent.textContent = Math.floor(progress) + '%';
  }, 100);

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    }
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    if (follower) {
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
    }
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .service-card, .project-card, .gallery-item, .filter-btn, .testimonial-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
      if (follower) { follower.style.width = '60px'; follower.style.height = '60px'; }
    });
    el.addEventListener('mouseleave', () => {
      if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      if (follower) { follower.style.width = '36px'; follower.style.height = '36px'; }
    });
  });

  /* ============================================================
     NAVBAR
     ============================================================ */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
    toggleScrollTop();
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ============================================================
     SCROLL TO TOP
     ============================================================ */
  const scrollTopBtn = document.getElementById('scrollTop');

  function toggleScrollTop() {
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     SCROLL REVEAL ANIMATIONS
     ============================================================ */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ============================================================
     TIMELINE ANIMATION
     ============================================================ */
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length) {
    const tlObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 150);
        }
      });
    }, { threshold: 0.2 });
    timelineItems.forEach(item => tlObserver.observe(item));
  }

  /* ============================================================
     STATISTICS COUNTER
     ============================================================ */
  const statNumbers = document.querySelectorAll('.stat-number, .hero-stat-num');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.target || entry.target.textContent.replace(/[^0-9]/g, ''));
        const suffix = entry.target.dataset.suffix || entry.target.textContent.replace(/[0-9]/g, '').trim();
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(counter);
          }
          entry.target.textContent = Math.floor(current) + suffix;
        }, 16);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => {
    const text = num.textContent.trim();
    const numMatch = text.match(/(\d+)/);
    const suffix = text.replace(/\d/g, '');
    if (numMatch) {
      num.dataset.target = numMatch[1];
      num.dataset.suffix = suffix;
      countObserver.observe(num);
    }
  });

  /* ============================================================
     TESTIMONIALS SLIDER
     ============================================================ */
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  let activeTestimonial = 0;

  if (testimonialCards.length) {
    testimonialCards[0].classList.add('active');

    function switchTestimonial() {
      testimonialCards[activeTestimonial].classList.remove('active');
      activeTestimonial = (activeTestimonial + 1) % testimonialCards.length;
      testimonialCards[activeTestimonial].classList.add('active');
    }

    setInterval(switchTestimonial, 5000);

    testimonialCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        testimonialCards[activeTestimonial].classList.remove('active');
        activeTestimonial = index;
        testimonialCards[index].classList.add('active');
      });
    });
  }

  /* ============================================================
     GALLERY FILTER
     ============================================================ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => { item.style.display = 'none'; }, 350);
        }
      });
    });
  });

  /* ============================================================
     LIGHTBOX
     ============================================================ */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  let lightboxImages = [];
  let lightboxIndex = 0;

  if (lightbox) {
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        lightboxImages = Array.from(galleryItems).filter(i => i.style.display !== 'none');
        lightboxIndex = lightboxImages.indexOf(item);
        const img = item.querySelector('.gallery-img');
        if (img && lightboxImg) lightboxImg.src = img.src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', () => {
        lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        const img = lightboxImages[lightboxIndex].querySelector('.gallery-img');
        if (img && lightboxImg) { lightboxImg.style.opacity = '0'; setTimeout(() => { lightboxImg.src = img.src; lightboxImg.style.opacity = '1'; }, 200); }
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', () => {
        lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
        const img = lightboxImages[lightboxIndex].querySelector('.gallery-img');
        if (img && lightboxImg) { lightboxImg.style.opacity = '0'; setTimeout(() => { lightboxImg.src = img.src; lightboxImg.style.opacity = '1'; }, 200); }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('open')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
        if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
      }
    });
  }

  function closeLightbox() {
    if (lightbox) { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
  }

  /* ============================================================
     HERO ANIMATION
     ============================================================ */
  function triggerHeroAnimation() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '0';
      heroContent.style.transform = 'translateY(30px)';
      setTimeout(() => {
        heroContent.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }, 100);
    }
  }

  /* ============================================================
     PARALLAX SUBTLE
     ============================================================ */
  window.addEventListener('scroll', () => {
    const heroImg = document.querySelector('.hero-img-overlay');
    if (heroImg) {
      const scrollY = window.scrollY;
      heroImg.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
  });

  /* ============================================================
     CONTACT FORM
     ============================================================ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>Sending...</span>';
      btn.style.opacity = '0.7';
      setTimeout(() => {
        btn.innerHTML = '<span>✓ Message Sent!</span>';
        btn.style.background = '#155c44';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.opacity = '1';
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }

  /* ============================================================
     GOLD GLOW EFFECT ON HOVER
     ============================================================ */
  document.querySelectorAll('.service-card, .project-card, .service-full-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });


});



/* ============================================================
   9. CONTACT FORM — WHATSAPP SUBMISSION
   ============================================================ */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const WHATSAPP_NUMBER = '916385554182';

  const PROJECT_TYPE_LABELS = {
    residential: 'Residential Construction',
    commercial: 'Commercial Construction',
    interior: 'Interior Design',
    renovation: 'Renovation & Remodeling'
  };

  const BUDGET_LABELS = {
    'under-25': 'Under ₹25 Lakhs',
    '25-50': '₹25 - 50 Lakhs',
    '50-100': '₹50 - 100 Lakhs',
    '100-250': '₹100 - 250 Lakhs'
  };

  const TIMELINE_LABELS = {
    immediate: 'Immediate (Next 3 months)',
    '3-6': '3 - 6 Months',
    '6-12': '6 - 12 Months',
    planning: 'Still in Planning'
  };

  function buildWhatsAppMessage(data) {
    const lines = [];
    lines.push('Hello BANNA Construction! I would like to enquire about a project.');
    lines.push('');
    lines.push('*Name:* ' + data.name);
    lines.push('*Email:* ' + data.email);
    lines.push('*Phone:* ' + data.phone);

    if (data.projectType) {
      lines.push('*Project Type:* ' + (PROJECT_TYPE_LABELS[data.projectType] || data.projectType));
    }
    if (data.budget) {
      lines.push('*Estimated Budget:* ' + (BUDGET_LABELS[data.budget] || data.budget));
    }
    if (data.timeline) {
      lines.push('*Timeline:* ' + (TIMELINE_LABELS[data.timeline] || data.timeline));
    }

    lines.push('');
    lines.push('*Project Details:*');
    lines.push(data.message);

    return lines.join('\n');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    let firstInvalid = null;
    
    requiredFields.forEach(field => {
      if (field.value.trim() === '') {
        field.style.borderColor = '#ff6b6b';
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const formData = new FormData(form);
    const data = {
      name: (formData.get('name') || '').toString().trim(),
      email: (formData.get('email') || '').toString().trim(),
      phone: (formData.get('phone') || '').toString().trim(),
      projectType: (formData.get('projectType') || '').toString().trim(),
      budget: (formData.get('budget') || '').toString().trim(),
      timeline: (formData.get('timeline') || '').toString().trim(),
      message: (formData.get('message') || '').toString().trim()
    };

    // Update button state
    submitBtn.innerHTML = '<span>Opening WhatsApp...</span> <i class="fa fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.8';

    const message = buildWhatsAppMessage(data);
    const whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');

      submitBtn.innerHTML = '<span>Redirected to WhatsApp!</span> <i class="fa fa-check"></i>';
      submitBtn.style.background = 'linear-gradient(135deg, var(--secondary-lime), var(--secondary-lime-dark))';
      submitBtn.style.color = 'var(--text-dark)';

      const successMsg = document.createElement('div');
      successMsg.style.cssText = `
        margin-top: 20px;
        padding: 16px 20px;
        background: rgba(166, 206, 0, 0.1);
        border: 1px solid var(--secondary-lime);
        border-radius: 6px;
        color: var(--secondary-lime);
        font-size: 0.85rem;
        text-align: center;
      `;
      successMsg.innerHTML = '<i class="fa fa-check-circle" style="margin-right:8px;"></i> Your enquiry was sent to WhatsApp. Continue the chat to finish.';
      form.appendChild(successMsg);

      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        if (successMsg.parentNode) successMsg.parentNode.removeChild(successMsg);
      }, 5000);
    }, 600);
  });

  // Input validation feedback
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        input.style.borderColor = '#ff6b6b';
      } else {
        input.style.borderColor = 'var(--primary-blue)';
      }
    });

    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.style.borderColor = 'var(--primary-blue)';
      }
    });
  });
})();
