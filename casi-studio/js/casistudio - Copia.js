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

// === Gestione dello scroll orizzontale su desktop e tablet ===
function manageHorizontalScroll() {
  const isMobileOrTablet = window.matchMedia("(max-width: 1024px)").matches;

  if (!isMobileOrTablet) {
    const horizontalSections = gsap.utils.toArray('section.horizontal');

    horizontalSections.forEach(function (sec) {
      var thisPinWrap = sec.querySelector('.pin-wrap');
      var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');
      var lastItem = thisAnimWrap.querySelector('.item:last-child'); // Seleziona l'ultimo elemento

      var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth + 150); // Aumentato il margine per evitare il taglio

      gsap.fromTo(thisAnimWrap, {
        x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue()
      }, {
        x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          scroller: document.body,
          pinType: 'transform',
          start: "top top",
          end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth + 150), // Aumentato il margine
          pin: thisPinWrap,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress > 0.95) {
              lastItem.style.paddingRight = "150px"; // Aggiunto margine maggiore a destra
            } else {
              lastItem.style.paddingRight = "60px"; // Imposta il padding di default
            }
          }
        }
      });
    });
  } else {
    gsap.killTweensOf(".animation-wrap");
    document.querySelectorAll('.animation-wrap').forEach(function (animWrap) {
      animWrap.style.transform = 'none';
      animWrap.style.padding = '0 15px';
    });
  }
}

manageHorizontalScroll();
window.addEventListener('resize', manageHorizontalScroll);

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
// Chiudi il modale al clic del pulsante di chiusura
modalClose.addEventListener('click', closeModal);

// Chiudi il modale al clic all'esterno dell'area del contenuto
modal.addEventListener('click', function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

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
