const closeButton = document.getElementById("helpButton");
const slider = document.getElementById("slideElement");
const form = document.getElementById("cycleForm");

closeButton.addEventListener("click", function() {
  if (slider.classList.contains("active")) {
    slider.classList.remove("active");
  } else {
    slider.classList.add("active");
  }
});

slider.addEventListener("transitionend", function() {
  if (slider.classList.contains("active")) {
    closeButton.innerText = "Close ↑";
  } else {
    closeButton.innerText = "Open ↓";
  }
});

form.addEventListener('submit', function(e) {
  const record = { days: [] };
  const formData = new FormData(form);
  e.preventDefault();
  formData.forEach((data, key) => 
    key === 'days' ?
      record.days.push([data]) :
      record[key] = data)
});