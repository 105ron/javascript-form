{
  const closeButton = document.getElementById("helpButton");
  const slider = document.getElementById("slideElement");
  const form = document.getElementById("cycleForm");
  const table = document.getElementById("table");
  const cancelButton = document.getElementById("cancel");
  const usersData = [
    {
      city: "City",
      days: "Every day",
      email: "neutron@example.com",
      group: "Always",
      name: "James Issac Neutron",
      registration: {
        date: "13/08/2018",
        time: "11:29AM",
      },
    },
    {
      city: "City",
      days: "Week Days",
      email: "carl@example.com",
      group: "Sometimes",
      name: "Carl Wheezer",
      registration: {
        date: "13/08/2018",
        time: "00:29AM",
      },
    },
    {
      city: "City",
      days: "Weekends",
      email: "cindyvortex@example.com",
      group: "Never",
      name: "Cindy Vortex",
      registration: {
        date: "13/08/2018",
        time: "11:29AM",
      },
    },
    {
      city: "City",
      days: "Mon, Wed, Fri",
      email: "sheen@example.com",
      group: "Sometimes",
      name: "Sheen Estevez",
      registration: {
        date: "13/08/2018",
        time: "11:29AM",
      },
    },
    {
      city: "City",
      days: "Mon, Tue, Wed",
      email: "folfx2014@example.com",
      group: "Sometimes",
      name: "Libby Folfax",
      registration: {
        date: "13/08/2018",
        time: "11:29AM",
      },
    },
    {
      city: "City",
      days: "Fri, Sat",
      email: "nickd@example.com",
      group: "Always",
      name: "Nick Dean",
      registration: {
        date: "13/08/2018",
        time: "11:29AM",
      },
    },
  ];

  function createUserRow(user) {
    return `<li class='row'>
      <ul class='row-container'>
      <li>${user.name}</li>
      <li>${user.email}</li>
      <li>${user.city}</li>
      <li>${user.group}</li>
      <li>${user.days}</li>
      <li>
      <span>${user.registration.date}</span>
      <span class='time'>${user.registration.time}</span>
      </li>
      <li class='trash' id='${user.email}'>
      <i class='fas fa-trash-alt'></i>
      </li>
      </ul>
      </li>`;
  }

  function deleteRow(e) {
    // Traverse dom from trash can to delete it parent li.row
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
  }
  function createUserListener(users) {
    // Given an array of users objects, find the trash icon by email and attach click event
    const trashList = users.map(user => document.getElementById(user.email));
    trashList.forEach(trashCan => trashCan.addEventListener("click", deleteRow));
  }

  function formatDateTime(number) {
    return number.toString().padStart(2, "0");
  }

  function getFormattedDate() {
    let period;
    const dateNow = new Date();
    const year = dateNow.getFullYear();
    const month = formatDateTime((dateNow.getMonth() + 1));
    const day = formatDateTime(dateNow.getDate());
    const minutes = formatDateTime(dateNow.getMinutes());
    let hours = dateNow.getHours();
    // Convert 24 hour time to AM/PM
    if (hours < 13) {
      period = "AM";
    } else {
      period = "PM";
      hours -= 12;
    }
    hours = formatDateTime(hours);
    const date = `${day}/${month}/${year}`;
    const time = `${hours}:${minutes}${period}`;
    return { date, time };
  }

  function getformattedDays(days) {
    const regexDictionary = [
      {
        regex: /^S.{34}/,
        result: "Every day",
      },
      {
        regex: /^M.{21}i, /,
        result: "Week Days",
      },
      {
        regex: /^S.{6}t, /,
        result: "Weekends",
      },
      {
        regex: /, $/,
        result: "", // Cleans trailing comma for any other cases
      },
      {
        regex: /^/,
        result: "None", // User checked no boxes
      },
    ];
    // Iterate array to find the correct regex and use it to send the formatted day
    const correctRegex = regexDictionary.find(dictionary => dictionary.regex.test(days));
    return days.replace(correctRegex.regex, correctRegex.result);
  }

  function insertUserInTable(users) {
    // Convert array of users objects into array html, join and insert into table
    const userTable = users.map(userData => createUserRow(userData));
    table.insertAdjacentHTML("beforeend", userTable.join(""));
    createUserListener(users);
  }

  function validNameOrEmail(email, name) {
    let alertPhrase = "";
    if (email && document.getElementById(email)) {
      // Only check if email is entered
      alertPhrase = "Email must be unique";
    }
    if (email.length < 6 || name.length < 2) {
      alertPhrase = `Please enter a name of 3 characters or more and email of 7 characters or more`;
    }
    if (alertPhrase) {
      alert(alertPhrase);
      return false;
    }
    return true;
  }

  /* ****************************************
  Add users to table
  **************************************** */

  insertUserInTable(usersData);

  /* ****************************************
  Listeners
  **************************************** */

  cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
  });

  closeButton.addEventListener("click", () => {
    // Make the help button interactive
    if (slider.classList.contains("active")) {
      slider.classList.remove("active");
    } else {
      slider.classList.add("active");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let days = "";
    const registration = getFormattedDate(); // Get registration date/time object
    const record = {
      registration,
      city: "",
      name: "",
      email: "",
    };
    const formData = new FormData(form);
    formData.forEach((data, key) => {
      if (key === "days") {
        days += `${data}, `;
      } else {
        record[key] = data;
      }
    });
    record.days = getformattedDays(days); // Convert days to weekend/weekdays string
    if (validNameOrEmail(record.email, record.name)) {
      insertUserInTable([record]);
      e.target.reset(); // Reset form fields
    }
  });

  slider.addEventListener("transitionend", () => {
    // Change the help button label after the animation has finished sliding
    if (slider.classList.contains("active")) {
      closeButton.innerText = "Close ↑";
    } else {
      closeButton.innerText = "Open ↓";
    }
  });
}
