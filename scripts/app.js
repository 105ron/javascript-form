"use strict";

(function () {
  Number.prototype.formatTime = function () {
    //add leading 0 to date and time when number < 10
    return this.toString().padStart(2, "0");
  };
  var closeButton = document.getElementById("helpButton");
  var slider = document.getElementById("slideElement");
  var form = document.getElementById("cycleForm");
  var table = document.getElementById("table");
  var cancelButton = document.getElementById("cancel");
  var users = [{
    city: "City",
    days: "Every day",
    email: "neutron@example.com",
    group: "Always",
    name: "James Issac Neutron",
    registration: {
      date: "13/08/2018",
      time: "11:29AM"
    }
  }, {
    city: "City",
    days: "Week Days",
    email: "carl@example.com",
    group: "Sometimes",
    name: "Carl Wheezer",
    registration: {
      date: "13/08/2018",
      time: "00:29AM"
    }
  }, {
    city: "City",
    days: "Weekends",
    email: "cindyvortex@example.com",
    group: "Never",
    name: "Cindy Vortex",
    registration: {
      date: "13/08/2018",
      time: "11:29AM"
    }
  }, {
    city: "City",
    days: "Mon, Wed, Fri",
    email: "sheen@example.com",
    group: "Sometimes",
    name: "Sheen Estevez",
    registration: {
      date: "13/08/2018",
      time: "11:29AM"
    }
  }, {
    city: "City",
    days: "Mon, Tue, Wed",
    email: "folfx2014@example.com",
    group: "Sometimes",
    name: "Libby Folfax",
    registration: {
      date: "13/08/2018",
      time: "11:29AM"
    }
  }, {
    city: "City",
    days: "Fri, Sat",
    email: "nickd@example.com",
    group: "Always",
    name: "Nick Dean",
    registration: {
      date: "13/08/2018",
      time: "11:29AM"
    }
  }];

  function createUserRow(user) {
    return "<li class='row'>\n      <ul class='row-container'>\n      <li>" + user.name + "</li>\n      <li>" + user.email + "</li>\n      <li>" + user.city + "</li>\n      <li>" + user.group + "</li>\n      <li>" + user.days + "</li>\n      <li>\n      <span>" + user.registration.date + "</span>\n      <span class='time'>" + user.registration.time + "</span>\n      </li>\n      <li class='trash' id='" + user.email + "'>\n      <i class='fas fa-trash-alt'></i>\n      </li>\n      </ul>\n      </li>";
  }

  function deleteRow(e) {
    //traverse dom from trash can to delete it parent li.row
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
  }
  function createUserListener(users) {
    //Given an array of users objects, find the trash icon by email and attach click event
    var trashList = users.map(function (user) {
      return document.getElementById(user.email);
    });
    trashList.forEach(function (trashCan) {
      return trashCan.addEventListener("click", deleteRow);
    });
  }

  function getFormattedDate() {
    //Find the time and format it correctly
    var formatCharacters = function formatCharacters(x) {
      return x.toString().padStart(2, "0");
    };
    var period = void 0;
    var dateNow = new Date();
    var year = dateNow.getFullYear();
    var month = (dateNow.getMonth() + 1).formatTime();
    var day = dateNow.getDate().formatTime();
    var minutes = dateNow.getMinutes().formatTime();
    var hours = dateNow.getHours();
    //convert 24 hour time to AM/PM
    if (hours < 13) {
      period = "AM";
    } else {
      period = "PM";
      hours -= 12;
    }
    hours = hours.formatTime();;
    var date = day + "/" + month + "/" + year;
    var time = hours + ":" + minutes + period;
    return { date: date, time: time };
  }

  function getformattedDays(days) {
    var regexDictionary = [{
      regex: /^S.{34}/,
      result: "Every day"
    }, {
      regex: /^M.{21}i, /,
      result: "Weeks Days"
    }, {
      regex: /^S.{6}t, /,
      result: "Weekends"
    }, {
      regex: /, $/,
      result: "" //Cleans trailing comma for any other cases
    }, {
      regex: /^/,
      result: "None" //User checked no boxes
    }];
    //Iterate array to find the correct regex and use it to send the formatted day
    var correctRegex = regexDictionary.find(function (dictionary) {
      return dictionary.regex.test(days);
    });
    return days.replace(correctRegex.regex, correctRegex.result);
  }

  function insertUserInTable(users) {
    //convert array of users objects into array html, join and insert into table
    var userTable = users.map(function (userData) {
      return createUserRow(userData);
    });
    table.insertAdjacentHTML("beforeend", userTable.join(""));
    createUserListener(users);
  }

  function invalidNameOrEmail(email, name) {
    var alertPhrase = "";
    if (email && document.getElementById(email)) {
      //only check if email is entered
      alertPhrase = "Email must be unique";
    }
    if (email.length < 6 || name.length < 2) {
      alertPhrase = "Please enter a name of 3 characters or more and email of 7 characters or more";
    }
    if (alertPhrase) {
      alert(alertPhrase);
      return true;
    }
    return false;
  }

  /* ****************************************
  IIF
  **************************************** */

  insertUserInTable(users);

  /* ****************************************
  Listeners
  **************************************** */

  cancelButton.addEventListener("click", function (e) {
    var form = document.getElementById("cycleForm");
    e.preventDefault();
    form.reset();
  });

  closeButton.addEventListener("click", function () {
    //Make the help button interactive
    if (slider.classList.contains("active")) {
      slider.classList.remove("active");
    } else {
      slider.classList.add("active");
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var form = document.getElementById("cycleForm");
    var formData = new FormData(form);
    var days = "";
    var registration = getFormattedDate(); //get registration date/time object
    var record = { registration: registration, city: "", name: "", email: "" };
    formData.forEach(function (data, key) {
      key === "days" ? days += data + ", " : record[key] = data;
    });
    record.days = getformattedDays(days); //convert days to weekend/weekdays string
    if (invalidNameOrEmail(record.email, record.name)) {
      return;
    } else {
      insertUserInTable([record]);
      e.target.reset(); //reset form fields
    }
  });

  slider.addEventListener("transitionend", function () {
    //change the help button label after the animation has finished sliding
    if (slider.classList.contains("active")) {
      closeButton.innerText = "Close ↑";
    } else {
      closeButton.innerText = "Open ↓";
    }
  });
})(); //end IIFE