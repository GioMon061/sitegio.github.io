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

// Inizializza il preloader e le animazioni al caricamento della pagina
window.addEventListener("load", function () {
  handlePreloader();
  ScrollTrigger.refresh();
});

// Funzione per gestire il preloader e avviare le animazioni
function handlePreloader() {
  const preloader = document.getElementById("preloader");

  gsap.fromTo(".preloader-logo",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 2, ease: "power4.out" }
  );

  gsap.to(preloader, {
    opacity: 0,
    delay: 2.5,
    duration: 1,
    ease: "power4.inOut",
    onComplete: function () {
      preloader.style.display = 'none';
      revealHeroText(); // Avvia l'animazione dell'hero text
      revealMenu(); // Anima il menu
      initHorizontalScroll(); // Inizializza lo scrolling orizzontale
      initMarqueeEffects(); // Inizializza l'effetto marquee
      animateSectionsOnScroll(); // Anima le sezioni durante lo scrolling
      ScrollTrigger.refresh();
    }
  });
}

// Animazioni per l'hero-text e menu
function revealHeroText() {
  gsap.fromTo(".hero-text .reveal span", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" });
}
function revealMenu() {
  gsap.fromTo("nav a", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" });
}

// Animazione durante lo scrolling delle sezioni
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

  // Duplichiamo il contenuto del marquee per creare un loop continuo
  marqueeInner.forEach((marquee) => {
    marquee.innerHTML += marquee.innerHTML; // Duplica il contenuto
  });

  // Nascondiamo inizialmente il testo del marquee
  marqueeInner.forEach((marquee) => {
    marquee.style.visibility = 'hidden';
    marquee.style.opacity = '0';
  });

  // GSAP per animazione marquee su hover
  projectLinks.forEach((item, index) => {
    const link = item.querySelector('.project__item-link');

    link.addEventListener('mouseenter', () => {
      // Nascondiamo il link "/ Progetto 1" al passaggio del mouse
      gsap.to(link, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out'
      });

      // Fa partire l'animazione marquee con opacità piena e loop continuo
      gsap.set(marqueeInner[index], { // Forziamo visibilità e opacità al 100% immediatamente
        visibility: 'visible',
        opacity: 1
      });

      gsap.to(marqueeInner[index], {
        x: '-100%',
        ease: 'none',
        duration: 20, // Durata più lunga per rallentare l'animazione
        repeat: -1
      });
    });

    link.addEventListener('mouseleave', () => {
      // Riporta l'animazione alla posizione originale e nasconde il marquee
      gsap.to(marqueeInner[index], {
        x: '0%',
        opacity: 0,
        ease: 'power2.out',
        duration: 0.5,
        onComplete: () => {
          marqueeInner[index].style.visibility = 'hidden';
        }
      });

      // Ripristina il link "/ Progetto 1" quando esce dall'hover
      gsap.to(link, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.in'
      });
    });
  });
});

// Posiziona la freccia e anima il cerchio di scorrimento
function positionArrow() {
  gsap.set('.arrow-down', { xPercent: -50, yPercent: -50, position: 'absolute', top: '50%', left: '50%' });
}
function animateScrollText() {
  gsap.to('.scroll-text', { rotate: 360, duration: 15, repeat: -1, ease: 'linear' });
}
positionArrow();
animateScrollText();

// Gestione del menu mobile
document.querySelector('.mobile-menu-toggle').addEventListener('click', function () {
  gsap.to('.mobile-menu-overlay', { x: 0, duration: 1.5, ease: 'power4.out' });
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-overlay ul li');
  gsap.from(mobileMenuItems, { y: 50, opacity: 0, duration: 0.5, stagger: 0.2, ease: 'power4.out' });
});

// Chiusura del menu mobile
document.querySelector('.mobile-menu-close').addEventListener('click', function () {
  gsap.to('.mobile-menu-overlay', { x: '100%', duration: 0.5, ease: 'power4.out' });
});
