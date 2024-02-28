"use strict";
// container
const inputContainerEl = document.querySelectorAll(".input--container");
// input elements
const inputDayEl = document.querySelector(".day--in");
const inputMonthEl = document.querySelector(".month--in");
const inputYearEl = document.querySelector(".year--in");
// button element
const btnEnter = document.querySelector(".btn");
// output element
const outputDayEl = document.querySelector(".day--out");
const outputMonthEl = document.querySelector(".month--out");
const outputYearEl = document.querySelector(".year--out");
// curretn date
const currentDate = new Date();
const currDay = currentDate.getDate();
const currMonth = currentDate.getMonth() + 1;
const currYear = currentDate.getFullYear();
// invalid
const invalidEl = document.querySelectorAll(".invalid");

btnEnter.addEventListener("click", function (e) {
  const inputDay = inputDayEl.value;
  const inputMonth = inputMonthEl.value;
  const inputYear = inputYearEl.value;

  if (inputDay === "" || inputMonth === "" || inputYear === "") {
    emptyInput();
  }
  calAge(inputDay, inputMonth, inputYear);
});
inputContainerEl.forEach((e) => console.log(e));

function emptyInput() {
  console.log("fuck you");
  invalidEl.forEach((element, index) => {
    element.classList.add("invalid--active");
  });
  inputDayEl.classList.add("invalid--input");
  inputMonthEl.classList.add("invalid--input");
  inputYearEl.classList.add("invalid--input");
  const pseudoStyle = `
  .input--container::before{
    color: hsl(0, 100%, 67%);
  }
  `;
  inputContainerEl.forEach((e) => e.classList.add("empty--input"));
}

function calAge(birthDay, birthMonth, birthYear) {
  let day = currDay - birthDay;
  let month = currMonth - birthMonth;
  let year = currYear - birthYear;
  //   year
  if (
    currMonth < birthMonth ||
    (currMonth === birthMonth && currDay < birthDay)
  )
    year--;
  //   month
  if (month < 0) month += 12;
  // day
  if (day < 0) {
    month--;
    day += 31;
  }
  displayAge(year, month, day);
}

function displayAge(year, month, day) {
  outputDayEl.textContent = day;
  outputMonthEl.textContent = month;
  outputYearEl.textContent = year;
}
