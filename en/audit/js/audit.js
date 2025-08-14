// JavaScript Document

gsap.registerPlugin(ScrollTrigger);

// Inizializzazione Lenis per smooth scrolling
const lenis = new Lenis({
  duration: 1.5,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Configura Lenis come scroller proxy per ScrollTrigger
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      lenis.scrollTo(value, { immediate: true });
    }
    return lenis.animatedScroll;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.body.style.transform ? 'transform' : 'fixed',
});

lenis.on('scroll', ScrollTrigger.update);

// Animazioni di sezione
gsap.set('.audit-title, .audit-description, .audit-benefits, .audit-process, .audit-faq, .audit-cta', { 
  opacity: 0, 
  y: 50 
});

const animateSection = (element, startPosition = 'top 80%') => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      scroller: document.body,
      start: startPosition,
      once: true,
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  });
};

['.audit-title', '.audit-description', '.audit-benefits', '.audit-process', '.audit-faq', '.audit-cta'].forEach(sel => animateSection(sel));

// Cursore personalizzato
const customCursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', e => {
  gsap.to(customCursor, {
    x: e.clientX,
    y: e.clientY,
    ease: 'power3.out',
    duration: 0.15,
  });
});

const interactiveLinks = document.querySelectorAll('nav a, .nav-button, .social-icons a, .audit-button');
interactiveLinks.forEach(link => {
  link.addEventListener('mouseenter', () => customCursor.style.opacity = 0);
  link.addEventListener('mouseleave', () => customCursor.style.opacity = 1);
});

// Menu mobile
document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
  gsap.to('.mobile-menu-overlay', { x: 0, duration: 1.5, ease: 'power4.out' });
});

document.querySelector('.mobile-menu-close').addEventListener('click', () => {
  gsap.to('.mobile-menu-overlay', { x: '100%', duration: 0.5, ease: 'power4.out' });
});

document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.querySelector('nav');
  if (window.innerWidth >= 768) {
    navMenu.classList.add('desktop-visible');
  } else {
    navMenu.classList.remove('desktop-visible');
  }

  // === Inizializzazione Lightbox per immagini e video ===
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  document.body.appendChild(lightbox);

  const items = document.querySelectorAll('.clickable-item');
  items.forEach(item => {
    item.addEventListener('click', function () {
      const type = this.dataset.type;
      const src = this.dataset.src;
      lightbox.innerHTML = '';

      if (type === 'image') {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Ingrandimento immagine';
        lightbox.appendChild(img);
      } else if (type === 'video') {
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;

        const webm = document.createElement('source');
        webm.src = src;
        webm.type = 'video/webm';
        video.appendChild(webm);

        const mp4 = document.createElement('source');
        mp4.src = src.replace('.webm', '.mp4');
        mp4.type = 'video/mp4';
        video.appendChild(mp4);

        lightbox.appendChild(video);
        video.play();
      }

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Chiudi lightbox con click sullo sfondo o ESC
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});
// JavaScript Document