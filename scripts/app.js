"use strict";

var closeButton = document.getElementById("helpButton");
var slider = document.getElementById("slideElement");
var form = document.getElementById("cycleForm");
var table = document.getElementById("table");
var cancelButton = document.getElementById("cancel");

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
}, {
  'city': 'City',
  'days': 'Mon, Tue, Wed',
  'email': 'folfx2014@example.com',
  'group': 'Sometimes',
  'name': 'Libby Folfax',
  'registration': {
    'date': '13/08/2018',
    'time': '11:29AM'
  }
}, {
  'city': 'City',
  'days': 'Fri, Sat',
  'email': 'nickd@example.com',
  'group': 'Always',
  'name': 'Nick Dean',
  'registration': {
    'date': '13/08/2018',
    'time': '11:29AM'
  }
}];

function createUserRow(user) {
  return "<li class='row'>\n    <ul class='row-container'>\n    <li>" + user.name + "</li>\n    <li>" + user.email + "</li>\n    <li>" + user.city + "</li>\n    <li>" + user.group + "</li>\n    <li>" + user.days + "</li>\n    <li>\n    <span>" + user.registration.date + "</span>\n    <span class='time'>" + user.registration.time + "</span>\n    </li>\n    <li class='trash' id='" + user.email + "'>\n      <i class='fas fa-trash-alt'></i>\n    </li>\n    </ul>\n    </li>";
}

function insertUserInTable(users) {
  var userTable = users.map(function (userData) {
    return createUserRow(userData);
  });
  table.insertAdjacentHTML('beforeend', userTable.join(''));
}

function deleteRow(e) {
  e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
}

function createUserListener(users) {
  var trashList = users.map(function (user) {
    return document.getElementById(user.email);
  });
  trashList.forEach(function (trashCan) {
    return trashCan.addEventListener('click', deleteRow);
  });
}

function getFormattedDate() {
  var period = void 0;
  var dateNow = new Date();
  var year = dateNow.getFullYear();
  var month = (dateNow.getMonth() + 1).toString().padStart(2, '0');
  var day = dateNow.getDate().toString().padStart(2, '0');
  var minutes = dateNow.getMinutes().toString().padStart(2, '0');
  var hours = dateNow.getHours();
  if (hours < 13) {
    period = 'AM';
  } else {
    period = 'PM';
    hours -= 12;
  }
  hours = hours.toString().padStart(2, '0');
  var date = day + "/" + month + "/" + year;
  var time = hours + ":" + minutes + period;
  return { date: date, time: time };
}

form.addEventListener("submit", function (e) {
  var formData = new FormData(form);
  var registration = getFormattedDate();
  var record = {
    'days': [],
    registration: registration,
    city: ''
  };
  e.preventDefault();
  formData.forEach(function (data, key) {
    return key === "days" ? record.days.push([data]) : record[key] = data;
  });
  insertUserInTable([record]);
  createUserListener([record]);
  e.target.reset();
});

cancelButton.addEventListener("click", function (e) {
  e.preventDefault();
  form.reset();
});

insertUserInTable(users);
createUserListener(users);