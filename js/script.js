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

// Ottimizzazione immagini: lazy loading e fallback per WebP
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  
  images.forEach(img => {
    // Applica loading="lazy" a tutte le immagini se non già presente
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }

    // Se il browser non supporta WebP, usa un fallback
    if (!supportsWebP()) {
      const src = img.getAttribute("src");
      if (src && src.endsWith(".webp")) {
        img.setAttribute("src", src.replace(".webp", ".jpg")); // O .webp se necessario
      }
    }
  });
});

// Funzione per verificare il supporto a WebP
function supportsWebP() {
  const canvas = document.createElement("canvas");
  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
}

// Inizializza il preloader e le animazioni al caricamento della pagina
window.addEventListener("load", function () {
  handlePreloader();
});

// Funzione per gestire il preloader e avviare le animazioni
function handlePreloader() {
  const preloader = document.getElementById("preloader");

  // Timeout massimo di sicurezza per il preloader
  const safetyTimeout = setTimeout(() => {
    hidePreloader(preloader);
  }, 3000); // Nasconde il preloader dopo 3 secondi

  // Quando il DOM è pronto, inizia l'animazione del preloader
  document.addEventListener("DOMContentLoaded", () => {
    gsap.fromTo(".preloader-logo", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
    );
  });

  // Quando tutte le risorse sono caricate, nascondi il preloader
  window.addEventListener("load", () => {
    clearTimeout(safetyTimeout); // Cancella il timeout di sicurezza
    hidePreloader(preloader);
  });
}

// Funzione per nascondere il preloader
function hidePreloader(preloader) {
  gsap.to(preloader, {
    opacity: 0,
    duration: 1,
    ease: "power4.inOut",
    onComplete: () => {
      preloader.style.display = "none";
      startAnimations(); // Avvia le animazioni della pagina
      initHorizontalSnapScroll();
      initCustomCursor();
      ScrollTrigger.refresh();
    }
  });
}

// Funzione per iniziare le animazioni della pagina
function startAnimations() {
  revealHeroText();
  revealMenu();
  animateSectionsOnScroll();
  ScrollTrigger.refresh();
}

// Animazioni per l'hero-text e menu
function revealHeroText() {
  gsap.fromTo(".hero-text .reveal span", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" });
}

function revealMenu() {
  gsap.fromTo("nav a", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" });
}

// Funzione per inizializzare il carosello con snapping
function initHorizontalSnapScroll() {
  const wrapper = document.querySelector('.case-studies-wrapper');
  const caseStudies = document.querySelector('.case-studies');
  const items = document.querySelectorAll('.case-study');
  const leftArrow = document.createElement('div');
  const rightArrow = document.createElement('div');
  let currentIndex = 0;
  const itemWidth = items[0].offsetWidth + 50; // Include il margine tra gli elementi

  // Configura le frecce minimali con SVG personalizzati
  leftArrow.classList.add('carousel-arrow', 'carousel-arrow-left');
  leftArrow.innerHTML = `<img src="img/left-arrow.svg" alt="Freccia Sinistra">`;
  leftArrow.style.display = 'none';

  rightArrow.classList.add('carousel-arrow', 'carousel-arrow-right');
  rightArrow.innerHTML = `<img src="img/right-arrow.svg" alt="Freccia Destra">`;

  // Stili per le frecce solo in JS
  leftArrow.style.cssText = `
    position: absolute;
    top: 32%;
    left: 0px;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  rightArrow.style.cssText = `
    position: absolute;
    top: 32%;
    right: 0px;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  // Aggiungi le frecce al DOM
  wrapper.appendChild(leftArrow);
  wrapper.appendChild(rightArrow);

  // Funzione per aggiornare la visibilità delle frecce
  function updateArrowVisibility() {
    leftArrow.style.display = currentIndex > 0 ? 'flex' : 'none';
    const maxIndex = Math.floor((caseStudies.scrollWidth - wrapper.clientWidth) / itemWidth);
    rightArrow.style.display = currentIndex < maxIndex ? 'flex' : 'none';
  }

  // Funzione per muoversi a destra
  function moveRight() {
    const maxIndex = Math.floor((caseStudies.scrollWidth - wrapper.clientWidth) / itemWidth);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateScroll();
    }
  }

  // Funzione per muoversi a sinistra
  function moveLeft() {
    if (currentIndex > 0) {
      currentIndex--;
      updateScroll();
    }
  }

  // Funzione per aggiornare lo scroll
  function updateScroll() {
    const offset = -currentIndex * itemWidth;
    gsap.to(caseStudies, {
      x: offset,
      duration: 0.4,
      ease: 'power1.inOut'
    });
    updateArrowVisibility();
  }

  // Event listeners per le frecce
  leftArrow.addEventListener('click', moveLeft);
  rightArrow.addEventListener('click', moveRight);

  // Mostra le frecce quando l'utente è in hover
  wrapper.addEventListener('mouseenter', () => {
    leftArrow.style.opacity = 1;
    rightArrow.style.opacity = 1;
  });

  // Nasconde le frecce quando l'utente esce dall'area
  wrapper.addEventListener('mouseleave', () => {
    leftArrow.style.opacity = 0;
    rightArrow.style.opacity = 0;
  });

  // Inizializza la visibilità delle frecce
  updateArrowVisibility();
}

// Funzione per animare le sezioni durante lo scrolling
function animateSectionsOnScroll() {
  gsap.utils.toArray('.about, .come-posso-aiutarti, .project-list').forEach((section) => {
    gsap.fromTo(section, {
      opacity: 0,
      y: 50,
    }, {
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

// Funzione per inizializzare il cursore personalizzato
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

  const interactiveElements = document.querySelectorAll('nav a, .nav-button, .continue-button, .carousel-arrow, .case-study, .services-button, .pdf-button, .call-to-action .button, #scroll-to-top, .social-icons a');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    });

  });
}

// Freccia verso l'alto
document.addEventListener('DOMContentLoaded', function () {
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 2000) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });

  scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Animazione rotazione continua per scroll-text.svg
function animateScrollText() {
  gsap.to('.scroll-text', {
    rotate: 360,
    duration: 15,
    repeat: -1,
    ease: 'linear'
  });
}

animateScrollText();

// Posizionare la freccia al centro del cerchio senza rotazione
function positionArrow() {
  gsap.set('.arrow-down', {
    xPercent: -50,
    yPercent: -50,
    position: 'absolute',
    top: '50%',
    left: '50%'
  });
}

positionArrow();

// Gestione del menu mobile con animazione personalizzata
document.querySelector('.mobile-menu-toggle').addEventListener('click', function () {
  gsap.to('.mobile-menu-overlay', { x: 0, duration: 1.5, ease: 'power4.out' });
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-overlay ul li');
  gsap.from(mobileMenuItems, {
    y: 50, opacity: 0, duration: 0.5, stagger: 0.2, ease: 'power4.out',
  });
});

document.querySelector('.mobile-menu-close').addEventListener('click', function () {
  gsap.to('.mobile-menu-overlay', { x: '100%', duration: 0.5, ease: 'power4.out' });
});

const navMenu = document.querySelector("nav");
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    navMenu.classList.add("desktop-visible");
    document.querySelector('.mobile-menu-overlay').classList.remove("open");
  } else {
    navMenu.classList.remove('desktop-visible');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) {
    navMenu.classList.add('desktop-visible');
  } else {
    navMenu.classList.remove('desktop-visible');
  }
});

// Funzione per il pulsante "Vedi Altro" per mostrare ulteriori Casi Studio
function initSeeMoreButton() {
  const seeMoreButton = document.querySelector('.see-more-button');
  if (seeMoreButton) {
    seeMoreButton.addEventListener('click', function (event) {
      event.preventDefault(); 
      const hiddenProjects = document.querySelectorAll('.case-study.hidden-mobile');
      if (hiddenProjects.length > 0) {
        hiddenProjects.forEach((project) => {
          project.classList.remove('hidden-mobile');
        });
        seeMoreButton.style.display = 'none'; 
      }
    });
  }
}

initSeeMoreButton();

// Funzione per inizializzare gli indicatori
function initCarouselIndicators() {
  const wrapper = document.querySelector('.case-studies-wrapper');
  const caseStudies = document.querySelectorAll('.case-study');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  if (!indicatorsContainer || caseStudies.length === 0) return;

  caseStudies.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('carousel-indicator');
    if (index === 0) indicator.classList.add('active');
    indicatorsContainer.appendChild(indicator);
  });

  function updateIndicators() {
    const scrollLeft = wrapper.scrollLeft;
    const itemWidth = caseStudies[0].offsetWidth + parseInt(window.getComputedStyle(caseStudies[0]).marginRight);
    const activeIndex = Math.round(scrollLeft / itemWidth);
    document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
      indicator.classList.toggle('active', index === activeIndex);
    });
  }

  wrapper.addEventListener('scroll', updateIndicators);
}

document.addEventListener('DOMContentLoaded', initCarouselIndicators);

document.addEventListener("DOMContentLoaded", () => {
  const supportsWebP = () => {
    const canvas = document.createElement("canvas");
    return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  };

  if (supportsWebP()) {
    const images = document.querySelectorAll("img");
    images.forEach(img => {
      const src = img.getAttribute("src");
      if (src && src.match(/\.(jpg|jpeg|png)$/)) {
        img.setAttribute("src", src.replace(/\.(jpg|jpeg|png)$/, ".webp"));
      }
    });
  }
});