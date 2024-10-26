//show shared buttons
document.addEventListener("turbo:load", function() {
  var hash = window.location.hash.substring(1); // Removes the '#'
  const element = document.getElementById("shared-buttons");
  if (hash === "shared") {
    element.style.display = 'block';
  }
  else {
    element.style.display = 'none';
  }
});

// Trigger MathJax typesetting for the newly added content
document.addEventListener("turbo:load", function() {
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
});

//move the right-side at mobile view
document.addEventListener("turbo:load", function() {
  const width = window.innerWidth;
  const leftSide = document.getElementById("left-side");
  const rightSide = document.getElementById("right-side");
  
  if (width <= 768) {
    rightSide.style.transform = `translate(0, ${leftSide.clientHeight}px)`;
  }
  else {
    rightSide.style.transform = `translate(0, 0)`;
  }
});

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