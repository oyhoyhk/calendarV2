var date = new Date();
var today = new Date();
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const logout = document.getElementById('logout');

if (logout) {
  logout.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/auth/logout');
    xhr.send();
    xhr.status = 301;
    xhr.onload = () => {
      window.location.reload();
    }
  })
}


prev.addEventListener("click", gotoPrevMonth);
next.addEventListener("click", gotoNextMonth);

const right = document.getElementById('date');
right.addEventListener('click', () => {
  const nowDate = new Date();
  setCalendar(nowDate);
})

setCalendar(date);

function gotoPrevMonth() {
  date.setMonth(date.getMonth() - 1);
  setCalendar(date);
}

function gotoNextMonth() {
  date.setMonth(date.getMonth() + 1);
  setCalendar(date);
}

function setCalendar(date) {
  const calendar = document.querySelector("#calendar tbody");
  const center = document.getElementById("month");
  const right = document.getElementById("date");

  center.textContent = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  right.textContent = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;
  calendar.innerHTML = "";

  const firstDay = new Date();
  firstDay.setMonth(date.getMonth());
  firstDay.setDate(1);
  const lastDay = new Date();
  lastDay.setMonth(date.getMonth() + 1);
  lastDay.setDate(0);
  const weeks = firstDay.getDay() + lastDay.getDate() > 35 ? 6 : 5;
  const countDate = new Date();
  countDate.setMonth(date.getMonth());
  countDate.setDate(1);
  countDate.setDate(-firstDay.getDay() + 1);
  console.log(countDate);
  for (let i = 0; i < weeks; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const td = document.createElement("td");
      const div = document.createElement("div");
      div.classList.add("day");
      div.textContent = countDate.getDate();
      if (
        countDate.getFullYear() * 1 < firstDay.getFullYear() * 1 ||
        countDate.getMonth() < firstDay.getMonth()
      ) {
        div.classList.add("prevMonth");
        td.addEventListener("click", gotoPrevMonth);
      }

      if (
        countDate.getFullYear() * 1 > firstDay.getFullYear() * 1 ||
        countDate.getMonth() > firstDay.getMonth()
      ) {
        div.classList.add("nextMonth");
        td.addEventListener("click", gotoNextMonth);
      }
      if (countDate.getDay() === 0) {
        div.style.color = "red";
      } else if (countDate.getDay() === 6) {
        div.style.color = "blue";
      }
      countDate.setDate(countDate.getDate() + 1);
      td.appendChild(div);
      tr.appendChild(td);
    }
    calendar.appendChild(tr);
  }
}