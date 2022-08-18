document.addEventListener("DOMContentLoaded", () => {
let svg = document.querySelector(".svganimation");
function mouseOver() {
  svg.classList.add("active");
}
svg.addEventListener("mouseover", mouseOver, false);
});
/*
 *
 * lazy loading images implementation
 *
 */
document.addEventListener("DOMContentLoaded", function(){
  //console.log("DOM content loaded");
  let lazyImages = [].slice.call(document.querySelectorAll(".lazy"));
  //console.log("number of lazy images: ", lazyImages.length);


  //consider testing if intersection api support is available
  //
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.01
    }
    let observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
            // Each entry describes an intersection change for one observed
    // target element:
       // console.log("entry.boundingClientRect", entry.boundingClientRect);
       // console.log("entry.intersectionRatio", entry.intersectionRatio);
       // console.log("entry.intersectionRect", entry.intersectionRect);
       // console.log("entry.isIntersecting", entry.isIntersecting);
       // console.log("entry.rootBounds", entry.rootBounds);
       // console.log("entry.target", entry.target);
        entry.target.src = 
          entry.isIntersecting ? 
          entry.target.getAttribute("data-src") : 
          entry.target.src;
      });
    }

    let lazyImageObserver = new IntersectionObserver(
      observerCallback, 
      options);

    lazyImages.forEach(x => {
      lazyImageObserver.observe(x);
    });


});
