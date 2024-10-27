document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    // Animazione per il titolo dell'hero
    gsap.from(".about-title", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
            trigger: ".about-title",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Animazione per l'immagine e il testo di descrizione
    gsap.from(".about-image, .about-text", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".about-content",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    // Animazione per i paragrafi
    gsap.from(".about-paragraph", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".about-paragraph",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });

    // Cursore Personalizzato
    const customCursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        gsap.to(customCursor, {
            x: e.clientX,
            y: e.clientY,
            ease: 'power3.out',
            duration: 0.15,
        });
    });

    // Funzione del menu mobile
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    const menuClose = document.querySelector('.mobile-menu-close');

    menuToggle.addEventListener('click', function () {
        gsap.to('.mobile-menu-overlay', { x: 0, duration: 1.5, ease: 'power4.out' });
        const mobileMenuItems = document.querySelectorAll('.mobile-menu-overlay ul li');
        gsap.from(mobileMenuItems, {
            y: 50, opacity: 0, duration: 0.5, stagger: 0.2, ease: 'power4.out',
        });
    });

    menuClose.addEventListener('click', function () {
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

    if (window.innerWidth >= 768) {
        navMenu.classList.add('desktop-visible');
    } else {
        navMenu.classList.remove('desktop-visible');
    }
});

// Forza il repaint quando la pagina si ricarica
window.addEventListener('load', function() {
    document.body.style.display = 'none';
    document.body.offsetHeight; // Forza un repaint
    document.body.style.display = '';
});

// Forza il refresh delle animazioni GSAP quando la pagina diventa visibile
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible") {
        ScrollTrigger.refresh();
    }
});
