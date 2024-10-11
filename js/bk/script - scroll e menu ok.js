// Inizializza il preloader e il resto delle animazioni dopo il caricamento della pagina
window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");

    // Animazione preloader
    gsap.fromTo(".preloader-logo", 
        { opacity: 0, y: 50 },  
        { opacity: 1, y: 0, duration: 2.5, ease: "power4.out" }
    );

    gsap.to(preloader, {
        opacity: 0,
        delay: 3.5,
        duration: 1,
        ease: "power4.inOut",
        onComplete: function() {
            preloader.style.display = 'none';  // Nasconde completamente il preloader
            revealHeroText(); // Chiama la funzione revealHeroText
            revealMenu(); // Avvia l'animazione del menu
            revealHeaderLine(); // Anima la linea dell'header
        }
    });

    // SPLT.js applicato all'hero-text (h1, senza p)
    splt({
        selector: '.hero-text .reveal',
        reveal: true
    });

    console.log('SPLT.js applicato a hero-text');
});

// Funzione per animare l'hero-text
function revealHeroText() {
    anime({
        targets: '.hero-text .reveal span', // Solo l'h1
        translateY: [100, 0],
        opacity: [0, 1],
        easing: 'cubicBezier(.71,-0.77,.43,1.67)',
        delay: anime.stagger(25),
        duration: 1000,
    });
}

// Funzione per animare il menu
function revealMenu() {
    // SPLT.js per dividere e rivelare le voci del menu
    splt({
        selector: 'nav a', // Selettore per le voci del menu
        reveal: true
    });

    anime({
        targets: 'nav a', // Seleziona le voci del menu
        translateY: [0, 20], // Spostale verticalmente come se uscissero da dietro un blocco
        opacity: [0, 1], // Fai comparire le voci con transizione opacità
        direction: 'alternate',
        loop: false, // Non ripetere l'animazione
        delay: anime.stagger(100), // Ritardo tra ogni voce del menu
        easing: 'cubicBezier(.71,-0.77,.43,1.67)',
    });
}

// Funzione per animare la linea dell'header
function revealHeaderLine() {
    const headerLine = document.querySelector('.header-line');
    gsap.to(headerLine, { 
        width: '100%', // Anima la larghezza da 0 a 100%
        duration: 1, // Durata di 1 secondo
        ease: 'power4.out' // Easing fluido
    });
}

// Inizializza Lenis per lo smooth scrolling
const lenis = new Lenis({
  duration: 1.5,  // Durata dello scrolling
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing per lo smooth scrolling
  smooth: true,
});

// Funzione per aggiornare lo scroll di Lenis
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// **Animazione rotazione continua per scroll-text.svg**
function animateScrollText() {
    gsap.to('.scroll-text', {
        rotate: 360, // Ruota di 360 gradi
        duration: 15, // Durata lunga per rotazione delicata
        repeat: -1,  // Ripeti la rotazione all'infinito
        ease: 'linear' // Rotazione fluida e continua
    });
}

// Chiamare la funzione per la rotazione delicata del testo
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

// Posizionare la freccia quando la pagina viene caricata
positionArrow();

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
