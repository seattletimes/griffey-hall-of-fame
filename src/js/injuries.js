var $ = require("./lib/qsa");
var animate = require("./lib/animateScroll");

var clickedInjury = function(e) {
  $(".injuries .icon.active").forEach(i => i.classList.remove("active"));
  this.classList.add("active");

  var others = $('.item');
  
  others.forEach(o => o.classList.remove("show"));
  
  var pos = this.getAttribute("data-id");
  var desc = document.querySelector(`.item[data-id="${pos}"]`);
  desc.classList.add("show");

  var offscreen = desc.getBoundingClientRect().top < 0;

  if (offscreen) animate(desc);
  
};

$(".icon").forEach(i => i.addEventListener("click", clickedInjury));
