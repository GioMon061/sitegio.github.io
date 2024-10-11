// Registra i plugin GSAP: ScrollTrigger e ScrollToPlugin
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Inizializza le animazioni e le interazioni una volta che la pagina è completamente caricata
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");

  // Anima il logo del preloader
  gsap.fromTo(
    ".preloader-logo",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 2.5, ease: "power4.out" }
  );

  gsap.to(preloader, {
    opacity: 0,
    delay: 3.5,
    duration: 1,
    ease: "power4.inOut",
    onComplete: function () {
      preloader.style.display = "none";
      Splitting(); // Inizializza Splitting.js
      revealHeroText(); // Anima il testo dell'hero section
      revealMenu(); // Anima le voci del menu
      animateScrollText(); // Riattiva l'animazione dell'indicatore di scroll
      initSmoothScrolling(); // Riattiva lo smooth scrolling
      initHorizontalScroll(); // Inizializza lo scroll orizzontale
      ScrollTrigger.refresh(); // Aggiorna tutti gli effetti ScrollTrigger
    },
  });
});

// Funzione per animare il testo dell'hero
function revealHeroText() {
  anime({
    targets: ".hero-text .reveal span",
    translateY: [100, 0],
    opacity: [0, 1],
    easing: "cubicBezier(.71,-0.77,.43,1.67)",
    delay: anime.stagger(25),
    duration: 1000,
  });
}

// Funzione per animare le voci del menu con Splitting
function revealMenu() {
  Splitting(); // Riapplica Splitting
  anime({
    targets: "nav a",
    translateY: [20, 0],
    opacity: [0, 1],
    delay: anime.stagger(100),
    easing: "cubicBezier(.71,-0.77,.43,1.67)",
    duration: 1200,
  });
}

// Integrazione degli Effetti Magnetic e Attract
const cursor = document.querySelector("#custom-cursor");

// Funzione per gestire il movimento del cursore
document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

// Effetto Magnetic per "Book a Call"
const bookCallLink = document.querySelector("nav a.book-call");
if (bookCallLink) {
  bookCallLink.addEventListener("mouseenter", () => {
    cursor.style.width = "50px";
    cursor.style.height = "50px";
    cursor.style.backgroundColor = "transparent"; // Rende il cursore trasparente per fondersi con l'elemento
    bookCallLink.style.setProperty("--fill-hover", "100%"); // Riempimento animato
  });
  bookCallLink.addEventListener("mouseleave", () => {
    cursor.style.width = "15px"; // Modifica la dimensione del cursore
    cursor.style.height = "15px";
    cursor.style.backgroundColor = "var(--nero)";
    bookCallLink.style.transform = "translate(0, 0)";
    bookCallLink.style.setProperty("--fill-hover", "0%"); // Reset riempimento
  });
  bookCallLink.addEventListener("mousemove", (e) => {
    const rect = bookCallLink.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    bookCallLink.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
}

// Effetto Attract per le altre voci della navigazione
const attractLinks = document.querySelectorAll("nav a:not(.book-call)");
attractLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursor.style.width = "30px";
    cursor.style.height = "30px";
    cursor.style.backgroundColor = "transparent";
    link.classList.add("hover-active"); // Aggiunge il cerchio in hover
  });
  link.addEventListener("mouseleave", () => {
    cursor.style.width = "15px"; // Piccolo cambiamento nella dimensione del cursore
    cursor.style.height = "15px";
    cursor.style.backgroundColor = "var(--nero)";
    link.classList.remove("hover-active");
    link.style.transform = "translate(0, 0)";
  });
  link.addEventListener("mousemove", (e) => {
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    link.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });
});

// Email Link Effetto Underline
const emailLinks = document.querySelectorAll(".email-link");
emailLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursor.style.width = "30px";
    cursor.style.height = "30px";
    cursor.style.backgroundColor = "transparent";
  });
  link.addEventListener("mouseleave", () => {
    cursor.style.width = "15px"; // Dimensione ridotta per adattare meglio
    cursor.style.height = "15px";
    cursor.style.backgroundColor = "var(--nero)";
  });
});

// Animazione di scroll per il testo dell'indicatore
function animateScrollText() {
  gsap.to(".scroll-text", {
    rotate: 360,
    duration: 15,
    repeat: -1,
    ease: "linear",
  });
}

// Funzione per ripristinare lo smooth scrolling
function initSmoothScrolling() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => 1 - Math.pow(1 - t, 3), // Easing personalizzato
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

// Inizializzazione dello Scroll Orizzontale
function initHorizontalScroll() {
  ScrollTrigger.matchMedia({
    "(min-width: 769px)": function () {
      const caseStudiesSection = document.querySelector(".case-studies-section");
      const caseStudiesWrapper = document.querySelector(".case-studies-wrapper");
      const caseStudies = document.querySelector(".case-studies");
      const totalScroll = caseStudies.scrollWidth - caseStudiesWrapper.clientWidth;

      gsap.to(caseStudies, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: caseStudiesSection,
          start: "top top",
          end: () => "+=" + totalScroll,
          scrub: 2.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    "(max-width: 768px)": function () {
      gsap.set(".case-studies", { x: 0 });
    },
  });
}

// Scroll dolce ai pulsanti di ancoraggio
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const targetSection = this.getAttribute("href");
      gsap.to(window, { scrollTo: targetSection, duration: 1 });
    }
  });
});
