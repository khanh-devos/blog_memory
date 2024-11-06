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
async function renderMathJax() {
  await new Promise((resolve) => {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, () => resolve()]);
  })
  .then(()=>{
    document.getElementById("right-side").style.opacity = '1';
  })
  .catch((err)=>{
    console.log(err);
  })
}

// Smoothen the fade-out or disappearing of the right side.
const delayFadeOut = (delayTime = 100)=>{

  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function(event) {
      if (link.href && link.href.startsWith(window.location.origin)) {
        event.preventDefault(); // Prevent default link behavior
        document.getElementById("right-side").style.opacity = '0';

        // Delay navigation to allow fade-out effect
        setTimeout(() => {
          window.location.href = link.href;
        }, delayTime);
      }
    });
  });
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

//move the right-side as zooming
window.addEventListener("resize", function() {
  moveRightSide();
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

// make sure Mathjax loaded fully before rendering, not dependent on DOM
window.addEventListener("load", async () => {
  if (typeof MathJax !== "undefined") {
    await renderMathJax();
  } else {
    console.error("MathJax failed to load.");
  }
});

// for turbo
document.addEventListener("turbo:load", async function() {
  delayFadeOut();
  typogramsTransform();
  moveRightSide();
  showSharedBtns();

});

// For Dom loading
document.addEventListener("DOMContentLoaded", async function(){
  delayFadeOut();
  typogramsTransform();
  moveRightSide();
  showSharedBtns();
});
