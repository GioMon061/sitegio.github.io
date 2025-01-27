// Inizializzazione di smooth-scrollbar e GSAP
let bodyScrollBar = Scrollbar.init(document.body, { damping: 0.1, delegateTo: document });

// Collegamento di ScrollTrigger a smooth-scrollbar
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value;
    }
    return bodyScrollBar.scrollTop;
  },
});

bodyScrollBar.addListener(ScrollTrigger.update);

// Impostazione iniziale degli elementi per l'animazione
gsap.set('.servizi-title, .servizi-description, .servizio-card', { opacity: 0, y: 50 });

// Animazione di entrata del titolo
gsap.to('.servizi-title', {
  scrollTrigger: {
    trigger: '.servizi-title',
    scroller: document.body,
    start: 'top 80%',
    once: true, // L'animazione avviene solo una volta
  },
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: 'power3.out',
});

// Animazione di entrata della descrizione
gsap.to('.servizi-description', {
  scrollTrigger: {
    trigger: '.servizi-description',
    scroller: document.body,
    start: 'top 80%',
    once: true,
  },
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: 'power3.out',
});

// Animazione per tutte le card con un unico ScrollTrigger
gsap.to('.servizio-card', {
  scrollTrigger: {
    trigger: '.servizi-grid',
    scroller: document.body,
    start: 'top 80%',
    once: true, // L'animazione avviene solo una volta
  },
  opacity: 1,
  y: 0,
  duration: 0.8,
  stagger: 0.2, // Esegui le animazioni in sequenza per ogni card
  ease: 'power3.out',
});

// Funzione per gestire il comportamento del modal al click sui box
function handleCardExpansionWithModal() {
  const cards = document.querySelectorAll('.servizio-card');
  const modal = document.querySelector('.modal-overlay');
  const modalContent = document.querySelector('.modal-content');
  const modalBody = document.querySelector('.modal-body');
  const modalClose = document.querySelector('.modal-close');

  cards.forEach(card => {
    card.addEventListener('click', function () {
      const detailsContent = this.querySelector('.servizio-dettagli').innerHTML;
      const cardColor = window.getComputedStyle(this).getPropertyValue('--hover-color');

      // Inserisci il contenuto della card nel modal e applica il colore di sfondo
      modalBody.innerHTML = detailsContent;
      modalContent.style.backgroundColor = cardColor;

      // Ripristina il display e applica la classe show con un piccolo delay
      modal.style.display = 'flex';

      // Scorri automaticamente verso l'alto quando il modal viene aperto
      bodyScrollBar.scrollTo(0, 0); // Sposta all'inizio della pagina

      setTimeout(() => {
        modalContent.classList.add('show');
        modal.classList.add('show');
      }, 50);
    });
  });

  // Gestisce la chiusura del modal
  modalClose.addEventListener('click', () => {
    closeModal();
  });

  // Chiude il modal se si clicca fuori dal contenuto
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Funzione per chiudere il modal con animazione
  function closeModal() {
    modalContent.classList.remove('show'); // Rimuovi la classe 'show' per chiusura
    modal.classList.remove('show'); // Nascondi il modal
    setTimeout(() => {
      modal.style.display = 'none'; // Nascondi definitivamente dopo l'animazione
    }, 300); // Timeout per completare l'animazione
  }
}

// **Chiamata alla funzione per attivare i listener del modal**
handleCardExpansionWithModal(); // Aggiungi questa riga per attivare i listener del modal

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
const interactiveLinks = document.querySelectorAll('nav a, .nav-button, .social-icons a, .servizio-card');

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

// Funzione per aggiornare l'anno automaticamente
function updateYear() {
    const yearSpan = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
}

// Esegui la funzione quando la pagina è caricata
document.addEventListener("DOMContentLoaded", updateYear);
