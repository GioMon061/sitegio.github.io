// === Inizializzazione di smooth-scrollbar ===
let bodyScrollBar = Scrollbar.init(document.body, { damping: 0.1, delegateTo: document });

bodyScrollBar.setPosition(0, 0);
bodyScrollBar.track.xAxis.element.remove();

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
gsap.set('.project-title, .project-description', { opacity: 0, y: 50 });

gsap.to('.project-title', {
  scrollTrigger: {
    trigger: '.project-title',
    scroller: document.body,
    start: 'top 80%',
    once: true,
  },
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: 'power3.out',
});

gsap.to('.project-description', {
  scrollTrigger: {
    trigger: '.project-description',
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
gsap.set('.flex-container', { opacity: 0, y: 50 });

gsap.utils.toArray('.flex-container').forEach(container => {
  gsap.to(container, {
    scrollTrigger: {
      trigger: container,
      scroller: document.body,
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse',
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  });
});

// === Funzionalità Lightbox (come nel caso studio) ===
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
      video.src = mediaSrc;
      lightbox.appendChild(video);
    }

    lightbox.classList.add('active');
    document.body.style.overflow = "hidden"; // Disabilita scroll del body
  });
});

// Chiudi lightbox con click su sfondo o tasto ESC
lightbox.addEventListener('click', (e) => {
  lightbox.classList.remove('active');
  document.body.style.overflow = "auto"; 
});

document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove('active');
    document.body.style.overflow = "auto";
  }
});

// === Gestione del menu mobile con animazione personalizzata ===
document.querySelector('.mobile-menu-toggle').addEventListener('click', function () {
  gsap.to('.mobile-menu-overlay', { x: 0, duration: 1.5, ease: 'power4.out' });
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-overlay ul li');
  gsap.from(mobileMenuItems, {
    y: 50, opacity: 0, duration: 0.5, stagger: 0.2, ease: 'power4.out',
  });
});

document.querySelector('.mobile-menu-close').addEventListener('click', function () {
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

const interactiveLinks = document.querySelectorAll('nav a, .nav-button, .social-icons a, .flex-container a, footer a');

interactiveLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.style.opacity = 0;
    link.style.cursor = "pointer";
  });
  link.addEventListener('mouseleave', () => {
    cursor.style.opacity = 1;
  });
});
