"use strict";

(function () {
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
    // Traverse dom from trash can to delete it parent li.row
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
  }
  function createUserListener(users) {
    // Given an array of users objects, find the trash icon by email and attach click event
    var trashList = users.map(function (user) {
      return document.getElementById(user.email);
    });
    trashList.forEach(function (trashCan) {
      return trashCan.addEventListener("click", deleteRow);
    });
  }

  function formatDateTime(number) {
    return number.toString().padStart(2, "0");
  }

  function getFormattedDate() {
    var period = void 0;
    var dateNow = new Date();
    var year = dateNow.getFullYear();
    var month = formatDateTime(dateNow.getMonth() + 1);
    var day = formatDateTime(dateNow.getDate());
    var minutes = formatDateTime(dateNow.getMinutes());
    var hours = dateNow.getHours();
    // Convert 24 hour time to AM/PM
    if (hours < 13) {
      period = "AM";
    } else {
      period = "PM";
      hours -= 12;
    }
    hours = formatDateTime(hours);
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
      result: "Week Days"
    }, {
      regex: /^S.{6}t, /,
      result: "Weekends"
    }, {
      regex: /, $/,
      result: "" // Cleans trailing comma for any other cases
    }, {
      regex: /^/,
      result: "None" // User checked no boxes
    }];
    // Iterate array to find the correct regex and use it to send the formatted day
    var correctRegex = regexDictionary.find(function (dictionary) {
      return dictionary.regex.test(days);
    });
    return days.replace(correctRegex.regex, correctRegex.result);
  }

  function insertUserInTable(users) {
    // Convert array of users objects into array html, join and insert into table
    var userTable = users.map(function (userData) {
      return createUserRow(userData);
    });
    table.insertAdjacentHTML("beforeend", userTable.join(""));
    createUserListener(users);
  }

  function invalidNameOrEmail(email, name) {
    var alertPhrase = "";
    if (email && document.getElementById(email)) {
      // Only check if email is entered
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
  Add users to table
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
    // Make the help button interactive
    if (slider.classList.contains("active")) {
      slider.classList.remove("active");
    } else {
      slider.classList.add("active");
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var days = "";
    var registration = getFormattedDate(); // Get registration date/time object
    var record = { registration: registration, city: "", name: "", email: "" };
    var form = document.getElementById("cycleForm");
    var formData = new FormData(form);
    formData.forEach(function (data, key) {
      key === "days" ? days += data + ", " : record[key] = data;
    });
    record.days = getformattedDays(days); // Convert days to weekend/weekdays string
    if (invalidNameOrEmail(record.email, record.name)) {
      return; // Don't let function finish if email or username isn't entered correctly
    } else {
      insertUserInTable([record]);
      e.target.reset(); // Reset form fields
    }
  });

  slider.addEventListener("transitionend", function () {
    // Change the help button label after the animation has finished sliding
    if (slider.classList.contains("active")) {
      closeButton.innerText = "Close ↑";
    } else {
      closeButton.innerText = "Open ↓";
    }
  });
})();