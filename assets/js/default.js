//show shared buttons
const showSharedBtns = () => {
  var hash = window.location.hash.substring(1); // Removes the '#'
  const element = document.getElementById("shared-buttons");
  if (hash === "shared") {
    element.style.display = 'block';
  }
  else {
    element.style.display = 'none';
  }
}

// Trigger MathJax typesetting for the newly added content
const activateMathjax = ()=> {
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}


//move the right-side at mobile view
const moveRightSide = ()=>{
  const width = window.innerWidth;
  const leftSide = document.getElementById("left-side");
  const rightSide = document.getElementById("right-side");
  
  if (width <= 768) {
    rightSide.style.transform = `translate(0, ${leftSide.clientHeight}px)`;
  }
  else {
    rightSide.style.transform = `translate(0, 0)`;
  }
}

// 
window.addEventListener("resize", function() {
  const width = window.innerWidth;
  const leftSide = document.getElementById("left-side");
  const rightSide = document.getElementById("right-side");
  
  if (width <= 768) {
    rightSide.style.transform = `translate(0, ${leftSide.clientHeight}px)`;
  }
  else {
    rightSide.style.transform = `translate(0, 0)`;
  }
})

// for Typograms
const typogramsTransform = ()=>{
  // replace all of the <script type="text/typogram"> tags
  for (const script of document.querySelectorAll("script[type='text/typogram']")) {
    if (script.hasAttribute("disabled")) {
      continue;
    }
    //setTimeout(() => {
    const source = script.innerText;
    const zoom = Number(script.getAttribute("zoom") || 0.3);
    const debug = script.hasAttribute("grid");
    const svg = create(source, zoom, debug);

    script.parentNode.insertBefore(svg, script.nextSibling);
    script.setAttribute("disabled", true);
    
    //}, 0);
  }
}

document.addEventListener("turbo:load", function() {
  typogramsTransform();
  showSharedBtns();
  activateMathjax();
  moveRightSide();

});
document.addEventListener("DOMContentLoaded", function(){
  typogramsTransform();
  showSharedBtns();
  activateMathjax();
  moveRightSide();
});
