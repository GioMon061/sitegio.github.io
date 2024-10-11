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
  duration: 1.2,  // Durata dello scrolling
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing per lo smooth scrolling
  smooth: true,
});

// Funzione per aggiornare lo scroll di Lenis
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Funzione per attivare l'animazione delle sezioni specifiche durante lo scrolling
function animateSectionsOnScroll() {
    const sections = [
        document.querySelector('#case-studies'),
        document.querySelector('#about'),
        document.querySelector('.come-posso-aiutarti'),
        document.querySelector('.other-projects')
    ];

    sections.forEach(section => {
        if (section) { // Verifica se la sezione esiste nel DOM
            const sectionPos = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // Sezione visibile (con margine 50% per attivare l'animazione più tardi)
            if (sectionPos < windowHeight * 0.5 && !section.classList.contains('animated')) {
                gsap.fromTo(section, 
                    { opacity: 0, y: 100 },
                    { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' }
                );
                section.classList.add('animated'); // Aggiunge una classe per evitare che si ri-animino
            }
        }
    });
}

// Sincronizza Lenis con GSAP per far apparire le sezioni in tempo reale
lenis.on('scroll', animateSectionsOnScroll);

// Gestione del burger menu e overlay per il mobile
document.querySelector('.mobile-menu-toggle').addEventListener('click', function () {
  gsap.to('.mobile-menu-overlay', { 
    x: 0, 
    duration: 0.5, 
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
