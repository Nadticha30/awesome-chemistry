document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Automatic Phone Mockup Slideshow ---
  const heroScreenImg = document.getElementById('hero-screen-img');
  const heroScreens = ['10.jpg', '11.jpg'];
  let currentScreenIdx = 0;

  if (heroScreenImg) {
    setInterval(() => {
      currentScreenIdx = (currentScreenIdx + 1) % heroScreens.length;
      // Smooth fade-out, swap src, fade-in
      heroScreenImg.style.opacity = '0';
      setTimeout(() => {
        heroScreenImg.src = heroScreens[currentScreenIdx];
        heroScreenImg.style.opacity = '1';
      }, 300);
    }, 4000);
  }

  // --- 2. Interactive Workflow Steps ---
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const workflowPanes = document.querySelectorAll('.workflow-pane');

  timelineSteps.forEach(step => {
    step.addEventListener('click', () => {
      const targetPaneId = step.getAttribute('data-target');
      
      // Update active states in timeline menu
      timelineSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      // Update active workflow pane
      workflowPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === targetPaneId) {
          pane.classList.add('active');
        }
      });
    });
  });

  // --- 3. Lightbox / Screenshot Modal ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const zoomableImages = document.querySelectorAll('.zoomable');

  zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
      const src = img.getAttribute('src');
      const caption = img.getAttribute('data-caption') || img.alt || 'Chemistry App Screenshot';
      
      if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        if (lightboxCaption) {
          lightboxCaption.textContent = caption;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable page scrolling while zoomed
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scroll
    }
  }

  // Escape key closes Lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // --- 4. Navigation Active State on Scroll ---
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 120)) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
});
