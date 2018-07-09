const closeButton = document.getElementById("helpButton");
const slider = document.getElementById("slideElement");
const form = document.getElementById("cycleForm");
const table = document.getElementById("table");

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


const users = [
  {
    'city': 'City',
    'days': 'Every day',
    'email': 'neutron@example.com',
    'group': 'Always',
    'name': 'James Issac Neutron',
    'registration': {
      'date': '13/08/2018',
      'time': '11:29AM'
    }
  },
  {
    'city': 'City',
    'days': 'Week Days',
    'email': 'carl@example.com',
    'group': 'Sometimes',
    'name': 'Carl Wheezer',
    'registration': {
      'date': '13/08/2018',
      'time': '00:29AM'
    }
  },
  {
    'city': 'City',
    'days': 'Weekends',
    'email': 'cindyvortex@example.com',
    'group': 'Never',
    'name': 'Cindy Vortex',
    'registration': {
      'date': '13/08/2018',
      'time': '11:29AM'
    }
  },
  {
    'city': 'City',
    'days': 'Mon, Wed, Fri',
    'email': 'sheen@example.com',
    'group': 'Sometimes',
    'name': 'Sheen Estevez',
    'registration': {
      'date': '13/08/2018',
      'time': '11:29AM'
    }
  },
  {
    'city': 'City',
    'days': 'Mon, Tue, Wed',
    'email': 'folfx2014@example.com',
    'group': 'Sometimes',
    'name': 'Libby Folfax',
    'registration': {
      'date': '13/08/2018',
      'time': '11:29AM'
    }
  },
  {
    'city': 'City',
    'days': 'Fri, Sat',
    'email': 'nickd@example.com',
    'group': 'Always',
    'name': 'Nick Dean',
    'registration': {
      'date': '13/08/2018',
      'time': '11:29AM'
    }
  }
]

function createUserRow(user) {
  return (
    `<li class='row'>
    <ul class='row-container'>
    <li>${user.name}</li>
    <li>${user.email}</li>
    <li>${user.city}</li>
    <li>${user.group}</li>
    <li>${user.days}</li>
    <li>
    <span class='date'>${user.registration.date}</span>
    <span class='time'>${user.registration.time}</span>
    </li>
    <li class='trash' data-identifier='${user.email}'>
      <i class='fas fa-trash-alt'></i>
    </li>
    </ul>
    </li>`
  )
}

function insertUserInTable (users) {
  const userTable = users.map(function (userData) {
    return createUserRow(userData)
  });
  table.insertAdjacentHTML('beforeend', userTable.join(''))
}

function deleteRow(e) {
  console.log(e.target);
}

function createUserListener(users) {
  const table = document.getElementById("table");
  const trashList = users.map(user=>
    [...table.querySelectorAll(`[data-identifier="${user.email}"]`)]
  );
  const trashArray = [].concat(...trashList);
  console.log(trashArray);
  trashArray.forEach(trashCan =>
    trashCan.addEventListener('click', deleteRow)
  );
}

insertUserInTable(users);
createUserListener(users)


function getDate() {
  let period;
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = (dateNow.getMonth() + 1).toString().padStart(2, '0');
  const day = dateNow.getDate().toString().padStart(2, '0');
  const minutes = dateNow.getMinutes().toString().padStart(2, '0');
  let hours = dateNow.getHours();
  if (hours < 13) {
    period = 'AM';
  } else {
    period = 'PM';
    hours -=12;
  }
  hours = hours.toString().padStart(2, '0')
  const date = `${day}/${month}/${year}`
  const time = `${hours}:${minutes}${period}`;
  return {date, time};
}

form.addEventListener("submit", function(e) {
  const formData = new FormData(form);
  const registration = getDate();
  const record = {
    'days': [],
    registration,
    city: ''
  };
  e.preventDefault();
  formData.forEach((data, key) =>
      key === "days" ? record.days.push([data]) : (record[key] = data)
  );
  insertUserInTable([record]);
  createUserListener([record]);
});