// ============================================
// SKIN MIRACLE CLINIC — Interactive Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('mobileOverlay');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      overlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  const scrollTop = document.getElementById('scrollTop');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll to top button
    if (currentScroll > 600) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // Scroll to top
  if (scrollTop) {
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Active Nav Link Highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActiveLink() {
    const scrollY = window.pageYOffset + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

  // --- Intersection Observer for Scroll Animations ---
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPos = target.offsetTop - navHeight - 10;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
});

// --- Lightbox ---
function openLightbox(el) {
  const img = el.querySelector('img');
  if (img && img.src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Close lightbox on background click
document.addEventListener('click', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});
