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
gsap.set('.flex-container', { opacity: 0, y: 50 }); // Imposta lo stato iniziale

gsap.utils.toArray('.flex-container').forEach(container => {
  gsap.to(container, {
    scrollTrigger: {
      trigger: container,
      scroller: document.body,
      start: 'top 80%', // Inizia l'animazione quando il blocco entra nell'80% del viewport
      end: 'top 20%', // Fino a quando il blocco è al 20% del viewport
      toggleActions: 'play none none reverse', // Gioca l'animazione e inverte all'uscita
    },
    opacity: 1,
    y: 0,
    duration: 0.8, // Durata dell'animazione
    ease: 'power3.out', // Easing per l'entrata fluida
  });
});


// === Funzionalità Modale per Immagini e Video ===
const modal = document.getElementById("media-modal");
const modalImage = document.getElementById("modal-image");
const modalVideo = document.getElementById("modal-video");
const videoIframe = document.getElementById("video-iframe");
const modalClose = document.querySelector(".media-modal-close");

const clickableItems = document.querySelectorAll(".clickable-item");

clickableItems.forEach(item => {
  item.addEventListener("click", function () {
    const mediaType = this.getAttribute("data-type");
    const mediaSrc = this.getAttribute("data-src");

    if (mediaType === "image") {
      showModal();
      modalImage.style.display = "block";
      modalVideo.style.display = "none";
      modalImage.src = mediaSrc;
    } else if (mediaType === "video") {
      showModal();
      modalImage.style.display = "none";
      modalVideo.style.display = "block";
      videoIframe.src = mediaSrc;
      adjustVideoSize(); // Regola la dimensione del video quando viene caricato
    }
  });
});

// Mostra il modale e centra l'elemento
function showModal() {
  // Sincronizza con la posizione dello scroll virtuale
  const scrollOffsetX = bodyScrollBar.scrollLeft;
  const scrollOffsetY = bodyScrollBar.scrollTop;

  modal.style.left = `${scrollOffsetX + window.innerWidth / 2}px`;
  modal.style.top = `${scrollOffsetY + window.innerHeight / 2}px`;
  
  modal.style.display = "flex";
  document.body.classList.add("modal-active"); // Disabilita scroll principale
  setTimeout(() => {
    modal.classList.add("media-modal-show");
  }, 50);
}

// Chiusura della finestra modale
modalClose.onclick = function () {
  closeModal();
};

window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};

// Funzione per chiudere il modale e ripristinare gli stati
function closeModal() {
  modal.classList.remove("media-modal-show");
  document.body.classList.remove("modal-active"); // Riabilita scroll principale
  setTimeout(() => {
    modal.style.display = "none";
    videoIframe.src = ""; // Resetta l'URL del video per fermarlo
    modalImage.src = ""; // Resetta l'URL dell'immagine
  }, 300);
}

// Funzione per regolare la dimensione del video
function adjustVideoSize() {
  const videoWidth = videoIframe.videoWidth;
  const videoHeight = videoIframe.videoHeight;
  const aspectRatio = videoWidth / videoHeight;

  if (aspectRatio > 1) { // Se il video è più largo che alto
    videoIframe.style.width = "80vw";
    videoIframe.style.height = "auto";
  } else { // Se il video è più alto che largo
    videoIframe.style.width = "auto";
    videoIframe.style.height = "80vh";
  }
}

// Aggiungi un evento per ridimensionare il video quando viene caricato
videoIframe.addEventListener('loadeddata', adjustVideoSize);

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
