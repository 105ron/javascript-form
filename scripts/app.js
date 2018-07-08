"use strict";

var closeButton = document.getElementById("helpButton");
var slider = document.getElementById("slideElement");
var form = document.getElementById("cycleForm");
var table = document.getElementById("table");

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

form.addEventListener("submit", function (e) {
  var record = { days: [] };
  var formData = new FormData(form);
  e.preventDefault();
  formData.forEach(function (data, key) {
    return key === "days" ? record.days.push([data]) : record[key] = data;
  });
});

var users = [{
  'city': 'City',
  'days': 'Every day',
  'email': 'neutron@example.com',
  'group': 'Always',
  'name': 'James Issac Neutron',
  'registration': {
    'date': '13/08/2018',
    'time': '11:29AM'
  }
}, {
  'city': 'City',
  'days': 'Week Days',
  'email': 'carl@example.com',
  'group': 'Sometimes',
  'name': 'Carl Wheezer',
  'registration': {
    'date': '13/08/2018',
    'time': '00:29AM'
  }
}, {
  'city': 'City',
  'days': 'Weekends',
  'email': 'cindyvortex@example.com',
  'group': 'Never',
  'name': 'Cindy Vortex',
  'registration': {
    'date': '13/08/2018',
    'time': '11:29AM'
  }
}, {
  'city': 'City',
  'days': 'Mon, Wed, Fri',
  'email': 'sheen@example.com',
  'group': 'Sometimes',
  'name': 'Sheen Estevez',
  'registration': {
    'date': '13/08/2018',
    'time': '11:29AM'
  }
}];

function createUserRow(user) {
  return "<li class='row'>\n      <ul class='row-container'>\n        <li>" + user.name + "</li>\n        <li>" + user.email + "</li>\n        <li>" + user.city + "</li>\n        <li>" + user.group + "</li>\n        <li>" + user.days + "</li>\n        <li>\n          <span class='date'>" + user.registration.date + "</span>\n          <span class='time'>" + user.registration.time + "</span>\n        </li>\n        <li>T</li>\n      </ul>\n    </li>";
}

table.insertAdjacentHTML('beforeend', createUserRow(users[0]));
table.insertAdjacentHTML('beforeend', createUserRow(users[1]));
table.insertAdjacentHTML('beforeend', createUserRow(users[2]));
table.insertAdjacentHTML('beforeend', createUserRow(users[3]));