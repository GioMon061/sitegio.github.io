// === Animazioni specifiche della pagina "Contatti" ===
gsap.registerPlugin(ScrollTrigger);

// Animazioni a comparsa per il titolo e il sottotitolo
gsap.from(".contatti-title, .contatti-description", {
  scrollTrigger: {
    trigger: ".contatti-header-content",
    start: "top 90%",
    toggleActions: "restart none none reset"
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out"
});

// === Cursore Personalizzato ===
const cursor = document.querySelector('.custom-cursor');
const customCursor = document.querySelector('.custom-cursor');

// Movimento del cursore personalizzato
document.addEventListener('mousemove', (e) => {
  gsap.to(customCursor, {
    x: e.clientX,
    y: e.clientY,
    ease: 'power3.out',
    duration: 0.15,
  });
});

// Selettori per tutti i link su cui vogliamo che il pallino sparisca
const interactiveLinks = document.querySelectorAll('nav a, .nav-button, .social-icons a, .contact-box a');

// Gestione del cursore per tutti i link e pulsanti
interactiveLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    customCursor.style.opacity = 0; // Nasconde il pallino
    link.style.cursor = "pointer";  // Mantiene il puntatore "manina"
  });

  link.addEventListener('mouseleave', () => {
    customCursor.style.opacity = 1; // Rende visibile il pallino
  });
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
