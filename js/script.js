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
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Inizializza il preloader e le animazioni al caricamento della pagina
window.addEventListener("load", function () {
  handlePreloader();
});

function handlePreloader() {
  const preloader = document.getElementById("preloader");

  gsap.fromTo(
    ".preloader-logo",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 2, ease: "power4.out" }
  );

  gsap.to(preloader, {
    opacity: 0,
    delay: 2.5,
    duration: 1,
    ease: "power4.inOut",
    onComplete: function () {
      preloader.style.display = "none";
      startAnimations();
      initHorizontalSnapScroll(); // Reintrodotta la logica completa
      initCustomCursor();
      initTestimonialCarousel(); // Carosello testimonianze
      initSeeMoreButton();        // Pulsante "Vedi Altro" (reintrodotto)
      initCarouselIndicators();   // Indicatori carosello (reintrodotti)
      ScrollTrigger.refresh();
    },
  });
}

function startAnimations() {
  revealHeroText();
  revealMenu();
  animateSectionsOnScroll();
  ScrollTrigger.refresh();
}

function revealHeroText() {
  gsap.fromTo(
    ".hero-text .reveal span",
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" }
  );
}

function revealMenu() {
  gsap.fromTo(
    "nav a",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" }
  );
}

// Testimonials Carousel
function initTestimonialCarousel() {
  const slider = document.querySelector(".testimonial-slider");
  const cards = document.querySelectorAll(".testimonial-card");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  let currentIndex = 0; // Indice della card attiva

  // Inizializza la visibilità delle card
  cards.forEach((card, index) => {
    if (index === 0) {
      gsap.set(card, { opacity: 1, x: "0%" });
    } else {
      gsap.set(card, { opacity: 0, x: "100%" });
    }
  });

  function moveRight() {
    const nextIndex = (currentIndex + 1) % cards.length;
    gsap.to(cards[currentIndex], {
      x: "-100%",
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut",
    });
    gsap.fromTo(
      cards[nextIndex],
      { x: "100%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
      }
    );
    currentIndex = nextIndex;
  }

  function moveLeft() {
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    gsap.to(cards[currentIndex], {
      x: "100%",
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut",
    });
    gsap.fromTo(
      cards[prevIndex],
      { x: "-100%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
      }
    );
    currentIndex = prevIndex;
  }

  rightArrow.addEventListener("click", moveRight);
  leftArrow.addEventListener("click", moveLeft);
}

// Reintroduzione della logica completa per lo scrolling orizzontale
function initHorizontalSnapScroll() {
  const wrapper = document.querySelector('.case-studies-wrapper');
  const caseStudies = document.querySelector('.case-studies');
  const items = document.querySelectorAll('.case-study');
  const leftArrow = document.createElement('div');
  const rightArrow = document.createElement('div');
  let currentIndex = 0;
  const itemWidth = items[0].offsetWidth + 50; // Include il margine tra gli elementi

  leftArrow.classList.add('carousel-arrow', 'carousel-arrow-left');
  leftArrow.innerHTML = `<img src="img/left-arrow.svg" alt="Freccia Sinistra">`;
  leftArrow.style.display = 'none';

  rightArrow.classList.add('carousel-arrow', 'carousel-arrow-right');
  rightArrow.innerHTML = `<img src="img/right-arrow.svg" alt="Freccia Destra">`;

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

  wrapper.appendChild(leftArrow);
  wrapper.appendChild(rightArrow);

  function updateArrowVisibility() {
    leftArrow.style.display = currentIndex > 0 ? 'flex' : 'none';
    const maxIndex = Math.floor((caseStudies.scrollWidth - wrapper.clientWidth) / itemWidth);
    rightArrow.style.display = currentIndex < maxIndex ? 'flex' : 'none';
  }

  function moveRight() {
    const maxIndex = Math.floor((caseStudies.scrollWidth - wrapper.clientWidth) / itemWidth);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateScroll();
    }
  }

  function moveLeft() {
    if (currentIndex > 0) {
      currentIndex--;
      updateScroll();
    }
  }

  function updateScroll() {
    const offset = -currentIndex * itemWidth;
    gsap.to(caseStudies, {
      x: offset,
      duration: 0.4,
      ease: 'power1.inOut'
    });
    updateArrowVisibility();
  }

  leftArrow.addEventListener('click', moveLeft);
  rightArrow.addEventListener('click', moveRight);

  wrapper.addEventListener('mouseenter', () => {
    leftArrow.style.opacity = 1;
    rightArrow.style.opacity = 1;
  });

  wrapper.addEventListener('mouseleave', () => {
    leftArrow.style.opacity = 0;
    rightArrow.style.opacity = 0;
  });

  updateArrowVisibility();
}

function animateSectionsOnScroll() {
  gsap.utils.toArray(".about, .come-posso-aiutarti, .project-list").forEach((section) => {
    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

function initCustomCursor() {
  const cursor = document.querySelector(".custom-cursor");
  window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      ease: "power3.out",
      duration: 0.1,
    });
  });
}

// Funzione per il pulsante "Vedi Altro"
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

// Funzione per gli indicatori del carosello
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

document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 2000) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

function animateScrollText() {
  gsap.to(".scroll-text", {
    rotate: 360,
    duration: 15,
    repeat: -1,
    ease: "linear",
  });
}

animateScrollText();

function positionArrow() {
  gsap.set(".arrow-down", {
    xPercent: -50,
    yPercent: -50,
    position: "absolute",
    top: "50%",
    left: "50%",
  });
}

positionArrow();

document.querySelector(".mobile-menu-toggle").addEventListener("click", function () {
  gsap.to(".mobile-menu-overlay", { x: 0, duration: 1.5, ease: "power4.out" });
});

document.querySelector(".mobile-menu-close").addEventListener("click", function () {
  gsap.to(".mobile-menu-overlay", { x: "100%", duration: 0.5, ease: "power4.out" });
});

const navMenu = document.querySelector("nav");
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    navMenu.classList.add("desktop-visible");
  } else {
    navMenu.classList.remove("desktop-visible");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) {
    navMenu.classList.add("desktop-visible");
  } else {
    navMenu.classList.remove("desktop-visible");
  }
});
