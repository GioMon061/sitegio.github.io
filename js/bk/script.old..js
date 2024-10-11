const load = gsap.timeline({
    paused: "true"
})
load.to("#percent , #bar", {
    duration: .2,
    opacity: 0,
    zIndex: -1
})
load.to(".progress",{
    duration: .8,
    width: "0%"
})
load.from(".blocks", {
    duration: .8,
    opacity: 0,
    ease: "Power4.out"
}, "-=.5")
load.from("main", {
    duration: .5,
    y: 50,
    skewY: 10,
    opacity: 0
},"-=1")

var id, width = 1;
function loading(){
    id = setInterval(frame, 25);
}
function frame(){
    if(width>=100){
        clearInterval(id)
        load.play();
    }
    else{
        width++;
        document.getElementById("barconfirm").style.width = width + '%';
        document.getElementById("percent").innerHTML = width + '%';
    }
}
window.onload = function(){
    loading();
}

 const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      direction: "horizontal",
    });

    let blocks = document.querySelectorAll(".block[data-block-section]");
    scroll.on("scroll", (args) => {
      blocks.forEach((block) => {
        let attr = block.getAttribute("data-block-section");
        let section = document.querySelector(
          `section[data-block-section='${attr}']`
        );

        if (section.getBoundingClientRect().left <= block.offsetWidth * attr) {
          block.classList.add("fixed");
          block.classList.remove("init");
          block.classList.remove("active");
          block.style.left = "";
        } else if (
          section.getBoundingClientRect().left >=
          window.innerWidth - block.offsetWidth * (blocks.length - attr)
        ) {
          block.classList.add("init");
          block.classList.remove("active");
          block.classList.remove("fixed");
          block.style.left = "";
        } else {
          block.classList.add("active");
          block.classList.remove("init");
          block.classList.remove("fixed");
        }

        if (block.classList.contains("active")) {
          block.style.left = section.getBoundingClientRect().left + "px";
        }
      });
    });