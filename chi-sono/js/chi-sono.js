// === Codice per le animazioni della pagina "Chi sono" ===
gsap.registerPlugin(ScrollTrigger);

// Animazioni a comparsa per il titolo e il testo
gsap.from(".about-title", {
  scrollTrigger: {
    trigger: ".about-title",
    start: "top 90%",
    toggleActions: "restart none none reset"
  },
  opacity: 0,
  y: 50,
  duration: 1.5,
  ease: "power2.out"
});

gsap.from(".about-text, .about-image", {
  scrollTrigger: {
    trigger: ".about-text",
    start: "top 85%",
    toggleActions: "restart none none reset"
  },
  opacity: 0,
  x: -50,
  duration: 1.2,
  ease: "power2.out",
  stagger: 0.3
});

gsap.from(".about-paragraph", {
  scrollTrigger: {
    trigger: ".about-paragraph",
    start: "top 85%",
    toggleActions: "restart none none reset"
  },
  opacity: 0,
  y: 50,
  duration: 1.2,
  ease: "power2.out",
  stagger: 0.3
});

// === Gestione del menu mobile con animazione personalizzata ===
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

// Chiusura del menu mobile con animazione
document.querySelector('.mobile-menu-close').addEventListener('click', function () {
  gsap.to('.mobile-menu-overlay', { 
    x: '100%', 
    duration: 0.5,
    ease: 'power4.out' 
  });
});

// Visibilità del menu desktop in base alla larghezza della finestra
const navMenu = document.querySelector("nav");
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    navMenu.classList.add("desktop-visible");
    document.querySelector('.mobile-menu-overlay').classList.remove("open");
  } else {
    navMenu.classList.remove('desktop-visible');
  }
});

// Verifica dello stato del menu in caricamento pagina
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) {
    navMenu.classList.add('desktop-visible');
  } else {
    navMenu.classList.remove('desktop-visible');
  }
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
const navLinks = document.querySelectorAll('nav a, .nav-button, .social-icons a');
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    gsap.to(customCursor, { opacity: 0, duration: 0.2 });
  });
  link.addEventListener('mouseleave', () => {
    gsap.to(customCursor, { opacity: 1, duration: 0.2 });
  });
});



