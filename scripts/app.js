"use strict";

var closeButton = document.getElementById("helpButton");
var slider = document.getElementById("slideElement");

closeButton.addEventListener("click", function () {
  if (slider.classList.contains("active")) {
    slider.classList.remove("active");
  } else {
    slider.classList.add("active");
  }
});

slider.addEventListener("transitionend", function () {
  if (slider.classList.contains("active")) {
    closeButton.innerText = "Close ↑";
  } else {
    closeButton.innerText = "Open ↓";
  }
});