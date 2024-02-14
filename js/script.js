// Gsap Intro Split Text Animation
tl = new TimelineMax ({});
        tl
        .staggerFrom ('.intro-anim', 1.5, {y: "100%", ease:Power4.easeOut}, 0.15);


//Gsap Menu

 var tl = gsap.timeline({
            paused: "true"
        });
        tl.to(".menu",{
            duration: 1,
            x: "0%",
            ease: Expo.easeInOut
        });
        tl.fromTo("li",{
            y:"-100%",
            opacity: 0
        },{
            duration: .5,
            opacity: 1,
            y: "0%",
            stagger: 0.25
        });
        
        function toggle(){
            tl.play();
        }
        function togglec(){
            tl.reverse();
        };

// Cursor

var cursor = $(".cursor"),
    follower = $(".cursor-follower");

var posX = 0,
    posY = 0;

var mouseX = 0,
    mouseY = 0;

TweenMax.to({}, 0.016, {
  repeat: -1,
  onRepeat: function() {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;
    
    TweenMax.set(follower, {
        css: {    
        left: posX - 12,
        top: posY - 12
        }
    });
    
    TweenMax.set(cursor, {
        css: {    
        left: mouseX,
        top: mouseY
        }
    });
  }
});

$(document).on("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

$(".link").on("mouseenter", function() {
    cursor.addClass("active");
    follower.addClass("active");
});
$(".link").on("mouseleave", function() {
    cursor.removeClass("active");
    follower.removeClass("active");
});


// Locomotive / Scroll Trigger effects
        var scroller = new LocomotiveScroll({
                el: document.querySelector('[data-scroll-container]'),
                smooth: true
            })
            
            gsap.registerPlugin(ScrollTrigger)

            scroller.on('scroll', ScrollTrigger.update)

ScrollTrigger.scrollerProxy(
    '.container', {
        scrollTop(value) {
            return arguments.length ?
            scroller.scrollTo(value, 0, 0) :
            scroller.scroll.instance.scroll.y
        },
        getBoundingClientRect() {
            return {
                left: 0, top: 0, 
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    }
)


ScrollTrigger.create({
    trigger: '.image-mask',
    scroller: '.container',
    start: 'top+=30% 50%',
    end: 'bottom-=40% 50%',
    animation: gsap.to('.image-mask', {backgroundSize: '120%'}),
    scrub: 2,
    // markers: true
})


ScrollTrigger.addEventListener('refresh', () => scroller.update())


ScrollTrigger.refresh();


let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
    clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees. 

ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);
    // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
    }
  }
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".skewElem", {transformOrigin: "right center", force3D: true});