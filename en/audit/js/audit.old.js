gsap.registerPlugin(ScrollTrigger);

// Inizializzazione Lenis per smooth scrolling
const lenis = new Lenis({
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
  pinType: document.body.style.transform ? "transform" : "fixed",
});

lenis.on("scroll", ScrollTrigger.update);

// Impostazione iniziale degli elementi
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

animateSection('.audit-title');
animateSection('.audit-description');
animateSection('.audit-benefits');
animateSection('.audit-process');
animateSection('.audit-faq');
animateSection('.audit-cta');

// Cursore personalizzato
const customCursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
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
document.querySelector('.mobile-menu-toggle').addEventListener('click', function () {
  gsap.to('.mobile-menu-overlay', { x: 0, duration: 1.5, ease: 'power4.out' });
});

document.querySelector('.mobile-menu-close').addEventListener('click', function () {
  gsap.to('.mobile-menu-overlay', { x: '100%', duration: 0.5, ease: 'power4.out' });
});

document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.querySelector("nav");
  if (window.innerWidth >= 768) {
    navMenu.classList.add('desktop-visible');
  } else {
    navMenu.classList.remove('desktop-visible');
  }
});
