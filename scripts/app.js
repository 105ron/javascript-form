"use strict";

var closeButton = document.getElementById("helpButton");
var slider = document.getElementById("slideElement");
var form = document.getElementById("cycleForm");

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

form.addEventListener('submit', function (e) {
  var record = { days: [] };
  var formData = new FormData(form);
  e.preventDefault();
  formData.forEach(function (data, key) {
    return key === 'days' ? record.days.push([data]) : record[key] = data;
  });
});