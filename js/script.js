// Registra il plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Inizializza Lenis per lo smooth scrolling
const lenis = new Lenis({
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

// Configura il scrollerProxy di ScrollTrigger
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

// Sincronizza Lenis con ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Ottimizzazione immagini: lazy loading e supporto WebP
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  
  images.forEach(img => {
    // Applica lazy loading
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }

    // Fallback per immagini WebP
    if (!supportsWebP()) {
      const src = img.getAttribute("src");
      if (src && src.endsWith(".webp")) {
        img.setAttribute("src", src.replace(".webp", ".jpg")); // Cambia con il formato alternativo
      }
    }
  });
});

// Funzione per verificare il supporto a WebP
function supportsWebP() {
  const canvas = document.createElement("canvas");
  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
}

// Inizializza il preloader
window.addEventListener("load", function () {
  handlePreloader();
});

// Funzione per il preloader
function handlePreloader() {
  const preloader = document.getElementById("preloader");

  // Imposta un timeout massimo
  const safetyTimeout = setTimeout(() => {
    hidePreloader(preloader);
  }, 3000);

  // Nasconde il preloader dopo che tutte le risorse sono caricate
  window.addEventListener("load", () => {
    clearTimeout(safetyTimeout);
    hidePreloader(preloader);
  });
}

// Nasconde il preloader
function hidePreloader(preloader) {
  gsap.to(preloader, {
    opacity: 0,
    duration: 0.8,
    ease: "power4.inOut",
    onComplete: () => {
      preloader.style.display = "none";
      startAnimations();
      initHorizontalSnapScroll();
      initCustomCursor();
      ScrollTrigger.refresh();
    }
  });
}

// Avvia le animazioni della pagina
function startAnimations() {
  revealHeroText();
  revealMenu();
  animateSectionsOnScroll();
  ScrollTrigger.refresh();
}

// Animazioni per l'hero-text e il menu
function revealHeroText() {
  gsap.fromTo(".hero-text .reveal span", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" });
}

function revealMenu() {
  gsap.fromTo("nav a", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" });
}

// Inizializza il carosello
function initHorizontalSnapScroll() {
  const wrapper = document.querySelector('.case-studies-wrapper');
  const caseStudies = document.querySelector('.case-studies');
  const items = document.querySelectorAll('.case-study');
  const itemWidth = items[0]?.offsetWidth + 50 || 0;

  let currentIndex = 0;
  const maxIndex = Math.floor((caseStudies.scrollWidth - wrapper.clientWidth) / itemWidth);

  function updateScroll() {
    gsap.to(caseStudies, {
      x: -currentIndex * itemWidth,
      duration: 0.4,
      ease: 'power1.inOut'
    });
  }

  wrapper.addEventListener('scroll', updateScroll);
}

// Animazioni delle sezioni
function animateSectionsOnScroll() {
  gsap.utils.toArray('.about, .come-posso-aiutarti, .project-list').forEach((section) => {
    gsap.fromTo(section, { opacity: 0, y: 50 }, {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
        toggleActions: "play none none reverse",
      }
    });
  });
}

// Inizializza il cursore personalizzato
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      ease: 'power3.out',
      duration: 0.1
    });
  });

  const interactiveElements = document.querySelectorAll('nav a, .carousel-arrow, .case-study');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(cursor, { opacity: 0, duration: 0.2 }));
    el.addEventListener('mouseleave', () => gsap.to(cursor, { opacity: 1, duration: 0.2 }));
  });
}

// Funzione di fallback WebP già inclusa
function supportsWebP() {
  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}
