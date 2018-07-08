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

form.addEventListener("submit", function(e) {
  const record = { days: [] };
  const formData = new FormData(form);
  e.preventDefault();
  formData.forEach(
    (data, key) =>
      key === "days" ? record.days.push([data]) : (record[key] = data)
  );
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
        <li>T</li>
      </ul>
    </li>`
  )
}

table.insertAdjacentHTML('beforeend',createUserRow(users[0]));
table.insertAdjacentHTML('beforeend',createUserRow(users[1]));
table.insertAdjacentHTML('beforeend',createUserRow(users[2]));
table.insertAdjacentHTML('beforeend',createUserRow(users[3]));