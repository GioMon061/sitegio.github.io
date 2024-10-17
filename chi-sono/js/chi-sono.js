document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    // Animazione per il titolo dell'hero
    gsap.from(".about-title", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".about-title",
            start: "top 80%", // Inizia quando il titolo è visibile all'80%
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
            start: "top 85%", // Inizia quando il contenuto è visibile all'85%
            toggleActions: "play none none none"
        }
    });

    // Animazione per i paragrafi (opzionale, se presente del testo aggiuntivo)
    gsap.from(".about-paragraph", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.3, // Aggiunge un leggero ritardo per ogni paragrafo
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".about-paragraph",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });
});
