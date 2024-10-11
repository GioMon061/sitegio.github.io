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

// Animazione del titolo del Caso Studio
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

// Animazione della descrizione del Caso Studio
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

      // Modifica il valore finale per includere un margine maggiore
      var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth + 150); // Aumentato il margine per evitare il taglio

      // Applicazione dell'animazione GSAP
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
    // Disabilita scroll e trasformazioni su tablet e mobile
    gsap.killTweensOf(".animation-wrap");
    document.querySelectorAll('.animation-wrap').forEach(function (animWrap) {
      animWrap.style.transform = 'none';
      animWrap.style.padding = '0 15px';
    });
  }
}

manageHorizontalScroll();
window.addEventListener('resize', manageHorizontalScroll);

const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (isMobile) {
  document.querySelectorAll('.item').forEach(item => {
    item.style.transform = 'none';
  });
}

if (document.querySelector('.gsap-marker-scroller-start')) {		  
  const markers = gsap.utils.toArray('[class *= "gsap-marker"]');	
  bodyScrollBar.addListener(({ offset }) => gsap.set(markers, { marginTop: -offset.y }));
}

// === Gestione del menu mobile con animazione personalizzata ===
document.querySelector('.mobile-menu-toggle').addEventListener('click', function () {
  gsap.to('.mobile-menu-overlay', { 
    x: 0, 
    duration: 1.5, 
    ease: 'power4.out' 
  });

  const mobileMenuItems = document.querySelectorAll('.mobile-menu-overlay ul li');
  gsap.from(mobileMenuItems, {
    y: 50,
    opacity: 0,
    duration: 0.5,
    stagger: 0.2,
    ease: 'power4.out',
  });
});

document.querySelector('.mobile-menu-close').addEventListener('click', function () {
  gsap.to('.mobile-menu-overlay', { 
    x: '100%', 
    duration: 0.5,
    ease: 'power4.out' 
  });
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
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY + offsetY,
    ease: 'power3.out',
    duration: 0.15,
  });
});

// Selettori per tutti i link con gestione del cursore
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

// Nascondi il cursore su link e pulsanti di navigazione specifici
const navLinks = document.querySelectorAll('nav a, .nav-button, .social-icons a');
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    gsap.to(cursor, { opacity: 0, duration: 0.2 });
  });
  link.addEventListener('mouseleave', () => {
    gsap.to(cursor, { opacity: 1, duration: 0.2 });
  });
});
