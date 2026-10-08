/**
 * Main Application Logic & Interactivity
 * Author: Naman Kumar Agrawal Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initAccentEngine();
  initTypewriter();
  initScrollSpy();
  initScrollReveal();
  initStatsCounter();
  initSkillFilters();
  initAvatarUploader();
  initContactForm();
  initAudioFeedback();
  initResumeModal();
  initKeyboardShortcuts();
});

/* ==========================================================================
   1. THEME ENGINE (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIconDark = document.getElementById('theme-icon-dark');
  const themeIconLight = document.getElementById('theme-icon-light');

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('naman_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('naman_portfolio_theme', newTheme);
      playSfx('toggle');
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark 🌙' : 'Light ☀️'} mode`);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIconDark && themeIconLight) {
      if (theme === 'dark') {
        themeIconDark.classList.remove('hidden');
        themeIconLight.classList.add('hidden');
      } else {
        themeIconDark.classList.add('hidden');
        themeIconLight.classList.remove('hidden');
      }
    }
  }
}

/* ==========================================================================
   2. ACCENT COLOR ENGINE
   ========================================================================== */
function initAccentEngine() {
  const accentButtons = document.querySelectorAll('.accent-selector-btn');
  const savedAccent = localStorage.getItem('naman_portfolio_accent') || 'cyan';
  applyAccent(savedAccent);

  accentButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const accent = btn.getAttribute('data-color') || 'cyan';
      applyAccent(accent);
      localStorage.setItem('naman_portfolio_accent', accent);
      playSfx('click');
      showToast(`Accent updated to ${accent.toUpperCase()} ✨`);
    });
  });

  function applyAccent(accent) {
    document.documentElement.setAttribute('data-accent', accent);
    accentButtons.forEach(b => {
      if (b.getAttribute('data-color') === accent) {
        b.classList.add('ring-2', 'ring-white', 'scale-110');
      } else {
        b.classList.remove('ring-2', 'ring-white', 'scale-110');
      }
    });
  }
}

/* ==========================================================================
   3. TYPEWRITER DYNAMIC TEXT EFFECT
   ========================================================================== */
function initTypewriter() {
  const typewriterElem = document.getElementById('dynamic-typewriter');
  if (!typewriterElem) return;

  const roles = [
    "AI & Machine Learning Engineer",
    "Computer Vision & Biometrics Developer",
    "Predictive Analytics & Risk Modeler",
    "Full-Stack Web & Backend Engineer",
    "AIML Student @ BMSCE Bengaluru"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeLoop() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typewriterElem.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      typewriterElem.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      // Pause at full text
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* ==========================================================================
   4. SCROLL SPY & STICKY NAVIGATION
   ========================================================================== */
function initScrollSpy() {
  const nav = document.getElementById('main-nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    // Nav background glass effect on scroll
    if (window.scrollY > 40) {
      nav.classList.add('bg-slate-900/90', 'shadow-lg', 'backdrop-blur-md', 'border-b', 'border-slate-800/80');
    } else {
      nav.classList.remove('bg-slate-900/90', 'shadow-lg', 'border-b', 'border-slate-800/80');
    }

    // Active link highlighting
    let currentId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('text-cyan-400', 'font-semibold');
      } else {
        link.classList.remove('text-cyan-400', 'font-semibold');
      }
    });
  });

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      playSfx('click');
    });

    // Close mobile menu on item click
    mobileMenu.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

/* ==========================================================================
   5. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealItems = document.querySelectorAll('.reveal-item');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('revealed'));
  }
}

/* ==========================================================================
   6. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statElements = document.querySelectorAll('[data-counter-target]');
  let counted = false;

  const statsSection = document.getElementById('stats-grid');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statElements.forEach(el => {
          const target = parseFloat(el.getAttribute('data-counter-target'));
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          animateCounter(el, target, decimals, prefix, suffix, 1800);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);

  function animateCounter(elem, target, decimals, prefix, suffix, duration) {
    let startTimestamp = null;
    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = (easeOut * target).toFixed(decimals);
      elem.textContent = `${prefix}${current}${suffix}`;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        elem.textContent = `${prefix}${target.toFixed(decimals)}$${suffix}`.replace('$$', '$');
        elem.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      }
    }
    window.requestAnimationFrame(step);
  }
}

/* ==========================================================================
   7. FILTERABLE TECHNICAL SKILLS MATRIX
   ========================================================================== */
function initSkillFilters() {
  const filterButtons = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      
      // Update active tab styling
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playSfx('click');

      // Filter animation
      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   8. AVATAR PHOTO UPLOADER & PREVIEW TOOL
   ========================================================================== */
function initAvatarUploader() {
  const avatarUploadInput = document.getElementById('avatar-file-input');
  const avatarImg = document.getElementById('profile-avatar-img');
  const triggerBtn = document.getElementById('btn-change-avatar');

  if (triggerBtn && avatarUploadInput) {
    triggerBtn.addEventListener('click', () => {
      avatarUploadInput.click();
    });
  }

  if (avatarUploadInput && avatarImg) {
    avatarUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          avatarImg.src = event.target.result;
          playSfx('success');
          showToast('Profile photo updated in live preview! 📸');
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

/* ==========================================================================
   9. INTERACTIVE CONTACT FORM & CLIPBOARD ACTIONS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || 'Friend';
      const email = document.getElementById('contact-email')?.value || '';
      const subject = document.getElementById('contact-subject')?.value || 'Collaboration / Inquiry';
      const message = document.getElementById('contact-message')?.value || '';

      if (!name || !email || !message) {
        showToast('Please fill in all required fields ⚠️', 'warn');
        return;
      }

      // Generate mailto link
      const mailtoUrl = `mailto:namankrag@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
      
      playSfx('success');
      showToast('Opening your email client to send message... 🚀');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 600);
    });
  }

  // Copy to clipboard helper
  window.copyToClipboard = function(text, label) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        playSfx('click');
        showToast(`Copied ${label || 'text'} to clipboard! 📋`);
      });
    } else {
      showToast(`Copy manually: ${text}`);
    }
  };
}

/* ==========================================================================
   10. WEB AUDIO API SYNTHESIZED SFX
   ========================================================================== */
let audioCtx = null;
let soundEnabled = false;

function initAudioFeedback() {
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIconOn = document.getElementById('sound-icon-on');
  const soundIconOff = document.getElementById('sound-icon-off');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled && !audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (soundIconOn && soundIconOff) {
        soundIconOn.classList.toggle('hidden', !soundEnabled);
        soundIconOff.classList.toggle('hidden', soundEnabled);
      }
      if (soundEnabled) {
        playSfx('success');
        showToast('UI Sound feedback enabled 🔊');
      } else {
        showToast('Sound feedback muted 🔇');
      }
    });
  }
}

function playSfx(type) {
  if (!soundEnabled || !audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(780, now + 0.08);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'toggle') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (e) {
    // Silent fail for audio restrictions
  }
}

/* ==========================================================================
   11. RESUME PREVIEW MODAL
   ========================================================================== */
function initResumeModal() {
  const openButtons = document.querySelectorAll('.btn-open-resume-modal');
  const closeButtons = document.querySelectorAll('.btn-close-resume-modal');
  const modal = document.getElementById('resume-modal');

  openButtons.forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('open');
        playSfx('click');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeButtons.forEach(b => {
    b.addEventListener('click', () => {
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   12. KEYBOARD SHORTCUTS
   ========================================================================== */
function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Ignore if typing in input or textarea
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

    if (e.key.toLowerCase() === 't') {
      document.getElementById('theme-toggle-btn')?.click();
    } else if (e.key.toLowerCase() === 'p') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key.toLowerCase() === 'c') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'Escape') {
      const modal = document.getElementById('resume-modal');
      if (modal && modal.classList.contains('open')) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });
}

/* ==========================================================================
   13. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
