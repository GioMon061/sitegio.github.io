// Registra il plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Inizializza Lenis per lo smooth scrolling
const lenis = new Lenis({
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

console.log("Lenis inizializzato correttamente.");

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

console.log("ScrollTrigger scrollerProxy configurato.");

// Sincronizza Lenis con ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

console.log("Lenis sincronizzato con ScrollTrigger.");

// Inizializza il preloader e le animazioni al caricamento della pagina
window.addEventListener("load", function () {
  handlePreloader();
  ScrollTrigger.refresh();
});

// Funzione per gestire il preloader e avviare le animazioni
function handlePreloader() {
  const preloader = document.getElementById("preloader");

  gsap.fromTo(".preloader-logo", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 2, ease: "power4.out" });

  gsap.to(preloader, {
    opacity: 0,
    delay: 2.5,
    duration: 1,
    ease: "power4.inOut",
    onComplete: function () {
      preloader.style.display = 'none';
      revealHeroText();
      revealMenu();
      initHorizontalScroll();
      animateScrollText();
      positionArrow();
      animateSections(); // Avvia l'animazione delle sezioni
      ScrollTrigger.refresh(); // Assicurati che tutto sia rinfrescato
    }
  });
}

// Animazioni per l'hero-text e il menu
function revealHeroText() {
  gsap.fromTo(".hero-text .reveal span", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.5, stagger: 0.1, ease: "power4.out" });
}

function revealMenu() {
  gsap.fromTo("nav a", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" });
}

// **Animazioni di Comparsa per le Sezioni durante lo Scrolling**
function animateSections() {
  console.log("Funzione animateSections chiamata correttamente.");

  const sections = ['#case-studies', '#about', '.come-posso-aiutarti', '.other-projects'];

  sections.forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 2.5, // Durata delle animazioni
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          scroller: document.body,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 0.5,
          once: false, // Rimuovi il once per animazioni continue se necessario
        },
      }
    );
  });
}

// **Animazione rotazione continua per scroll-text.svg**
function animateScrollText() {
  gsap.to('.scroll-text', {
    rotate: 360,
    duration: 15,
    repeat: -1,
    ease: 'linear'
  });
}

animateScrollText();

// **Posizionare la freccia al centro del cerchio senza rotazione**
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

// Inizializza lo scrolling orizzontale per la sezione "Casi Studio"
function initHorizontalScroll() {
  ScrollTrigger.matchMedia({
    "(min-width: 769px)": function () {
      const caseStudiesSection = document.querySelector('.case-studies-section');
      const caseStudiesWrapper = document.querySelector('.case-studies-wrapper');
      const caseStudies = document.querySelector('.case-studies');

      if (!caseStudies || !caseStudiesWrapper || !caseStudiesSection) return;

      const totalScroll = caseStudies.scrollWidth - caseStudiesWrapper.clientWidth;

      ScrollTrigger.create({
        trigger: caseStudiesSection,
        start: "top top",
        end: () => `+=${caseStudiesWrapper.clientHeight + totalScroll}`,
        pin: true,
        anticipatePin: 1,
        scrub: true,
        invalidateOnRefresh: true,
      });

      gsap.to(caseStudies, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: caseStudiesWrapper,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    },
    "(max-width: 768px)": function () {
      gsap.set('.case-studies', { x: 0 });
    }
  });
}

// Ripristina l'effetto marquee per la sezione "Altri Progetti"
document.addEventListener("DOMContentLoaded", function () {
  const projectLinks = document.querySelectorAll('.project__item');
  const marqueeInner = document.querySelectorAll('.marquee__inner');

  marqueeInner.forEach((marquee) => {
    marquee.innerHTML += marquee.innerHTML;
  });

  marqueeInner.forEach((marquee) => {
    marquee.style.visibility = 'hidden';
    marquee.style.opacity = '0';
  });

  projectLinks.forEach((item, index) => {
    const link = item.querySelector('.project__item-link');

    link.addEventListener('mouseenter', () => {
      gsap.to(link, { opacity: 0, duration: 0.2, ease: 'power2.out' });
      gsap.set(marqueeInner[index], { visibility: 'visible', opacity: 1 });
      gsap.to(marqueeInner[index], { x: '-100%', ease: 'none', duration: 20, repeat: -1 });
    });

    link.addEventListener('mouseleave', () => {
      gsap.to(marqueeInner[index], { x: '0%', opacity: 0, ease: 'power2.out', duration: 0.5, onComplete: () => { marqueeInner[index].style.visibility = 'hidden'; } });
      gsap.to(link, { opacity: 1, duration: 0.2, ease: 'power2.in' });
    });
  });
});

// Gestione del burger menu e overlay per il mobile
document.querySelector('.mobile-menu-toggle').addEventListener('click', function () {
  gsap.to('.mobile-menu-overlay', { 
    x: 0, 
    duration: 1.5, 
    ease: 'power4.out' 
  });

  // Anima le voci del menu mobile
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-overlay ul li');
  gsap.from(mobileMenuItems, {
    y: 50,
    opacity: 0,
    duration: 0.5,
    stagger: 0.2,
    ease: 'power4.out',
  });
});

// Chiusura del menu mobile
document.querySelector('.mobile-menu-close').addEventListener('click', function () {
  gsap.to('.mobile-menu-overlay', { 
    x: '100%', 
    duration: 0.5,
    ease: 'power4.out' 
  });
});


// Seleziona il cursore personalizzato esistente nell'HTML
const cursor = document.querySelector('.custom-cursor');

// Aggiungi l'evento di movimento del mouse per spostare il cursore
document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    ease: 'power3.out',
    duration: 0.15,
  });
});

// Aggiungi l'effetto di riduzione del cursore al passaggio sopra i link
const customCursor = document.querySelector('.custom-cursor');

window.addEventListener('mousemove', (e) => {
  gsap.to(customCursor, {
    x: e.clientX,
    y: e.clientY,
    ease: "power3.out",
    duration: 0.2,
  });
});

// Nascondi il cursore su link e pulsanti di navigazione
const navLinks = document.querySelectorAll('nav a, .nav-button, .continue-button, .services-button, .pdf-button, .call-to-action .button, .social-icons a');
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    gsap.to(customCursor, { opacity: 0, duration: 0.2 });
  });
  link.addEventListener('mouseleave', () => {
    gsap.to(customCursor, { opacity: 1, duration: 0.2 });
  });
});


// Freccia verso l'alto
document.addEventListener('DOMContentLoaded', function () {
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  // Gestione dello scroll per mostrare/nascondere il pulsante
  window.addEventListener('scroll', function () {
    // Verifica se lo scroll è sufficiente per mostrare il pulsante
    if (window.scrollY > 2000) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });

  // Azione al click per lo scroll verso l'alto
  scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});