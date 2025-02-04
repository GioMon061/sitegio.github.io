// === Inizializzazione di smooth-scrollbar ===
let bodyScrollBar = Scrollbar.init(document.body, { damping: 0.1, delegateTo: document });

// Resetta la posizione iniziale
bodyScrollBar.setPosition(0, 0);

// Sincronizza ScrollTrigger con Smooth Scrollbar
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value;
    }
    return bodyScrollBar.scrollTop;
  }
});

bodyScrollBar.addListener(ScrollTrigger.update);

// === Animazioni di entrata per titolo e descrizione ===
gsap.set('.case-study-title, .case-study-description', { opacity: 0, y: 50 });

gsap.to('.case-study-title', {
  scrollTrigger: {
    trigger: '.case-study-title',
    scroller: document.body,
    start: 'top 80%',
    once: true,
  },
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: 'power3.out',
});

gsap.to('.case-study-description', {
  scrollTrigger: {
    trigger: '.case-study-description',
    scroller: document.body,
    start: 'top 80%',
    once: true,
  },
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: 'power3.out',
});

// === Animazione a Comparsa dei Blocchi di Contenuto ===
gsap.set('.horizontal .item', { opacity: 0, y: 50 });

gsap.utils.toArray('.horizontal .item').forEach(container => {
  gsap.to(container, {
    scrollTrigger: {
      trigger: container,
      scroller: document.body,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  });
});

// === Funzionalità Lightbox ===
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

const clickableItems = document.querySelectorAll(".clickable-item");

clickableItems.forEach(item => {
  item.addEventListener("click", function () {
    const mediaType = this.getAttribute("data-type");
    const mediaSrc = this.getAttribute("data-src");

    lightbox.innerHTML = ''; // Pulisce il contenuto precedente

    if (mediaType === "image") {
      const img = document.createElement('img');
      img.src = mediaSrc;
      img.alt = 'Ingrandimento immagine';
      lightbox.appendChild(img);
    } else if (mediaType === "video") {
      const video = document.createElement('video');
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;

      // Aggiungi entrambe le sorgenti video (webm + mp4)
      const sourceWebm = document.createElement('source');
      sourceWebm.src = mediaSrc;
      sourceWebm.type = 'video/webm';

      const sourceMp4 = document.createElement('source');
      sourceMp4.src = mediaSrc.replace('.webm', '.mp4');
      sourceMp4.type = 'video/mp4';

      // Appendi le sorgenti al video
      video.appendChild(sourceWebm);
      video.appendChild(sourceMp4);

      lightbox.appendChild(video);
      video.play(); // Forza l'avvio del video
    }

    lightbox.classList.add('active');
    document.body.style.overflow = "hidden"; // Disabilita scroll del body
  });
});

// Chiudi lightbox con click su sfondo, immagine o tasto ESC
lightbox.addEventListener('click', (e) => {
  lightbox.classList.remove('active');
  document.body.style.overflow = "auto"; // Riabilita scroll del body
});

document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove('active');
    document.body.style.overflow = "auto";
  }
});

// === Gestione del menu mobile ===
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuClose = document.querySelector('.mobile-menu-close');

mobileMenuToggle.addEventListener('click', () => {
  gsap.to(mobileMenuOverlay, { x: 0, duration: 0.5, ease: 'power3.out' });
  mobileMenuOverlay.classList.add("open");
});

mobileMenuClose.addEventListener('click', () => {
  gsap.to(mobileMenuOverlay, { x: '100%', duration: 0.5, ease: 'power3.out' });
  mobileMenuOverlay.classList.remove("open");
});

const navMenu = document.querySelector("nav");
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    navMenu.classList.add("desktop-visible");
    mobileMenuOverlay.classList.remove("open");
  } else {
    navMenu.classList.remove('desktop-visible');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 768) {
    navMenu.classList.add('desktop-visible');
  } else {
    navMenu.classList.remove('desktop-visible');
  }
});

// === Cursore Personalizzato ===
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
  const offsetY = bodyScrollBar.scrollTop;
  gsap.to(cursor, { x: e.clientX, y: e.clientY + offsetY, ease: 'power3.out', duration: 0.15 });
});

const interactiveLinks = document.querySelectorAll('nav a, .nav-button, .social-icons a, section.horizontal .item a, footer a');

interactiveLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.style.opacity = 0;
    link.style.cursor = "pointer";
  });
  link.addEventListener('mouseleave', () => {
    cursor.style.opacity = 1;
  });
});
