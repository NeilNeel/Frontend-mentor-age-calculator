"use strict";
// input container
const inputContainer = document.querySelectorAll(".input--container");
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
const errorMessage = {
  empty: "This field required",
  valid: "Cannot be a negative number",
  valid_day: "Must be a valid day",
  valid_month: "Must be a valid month",
  valid_year: "Must be a valid year",
  past_day: "Can't be in the future",
};
let flag = 1;

btnEnter.addEventListener("click", function (e) {
  const day = inputDayEl.value;
  const month = inputMonthEl.value;
  const year = inputYearEl.value;

  // checking if the user has not selected a future day

  inputContainer.forEach(function (e) {
    const inputEl = e.querySelector("input");
    const value = inputEl.value;
    if (
      Number(year) === Number(currYear) &&
      Number(month) > Number(currMonth)
    ) {
      displayError(inputEl, "add", "past_day");
      flag = 0;
    } else if (value === "" || value === null || value === 0) {
      displayError(inputEl, "add", "empty");
      flag = 0;
    } else if (value < 0) {
      displayError(inputEl, "add", "valid");
      flag = 0;
    } else if (inputEl.classList.contains("day--in")) {
      if (value > 31) {
        displayError(inputEl, "add", "valid_day");
        flag = 0;
        console.log(value);
      } else {
        displayError(inputEl, "remove");
        flag = 1;
      }
    } else if (inputEl.classList.contains("month--in")) {
      if (value > 12) {
        displayError(inputEl, "add", "valid_month");
        flag = 0;
      } else {
        displayError(inputEl, "remove");
        flag = 1;
      }
    } else if (inputEl.classList.contains("year--in")) {
      if (Number(value.toString().length) !== 4) {
        displayError(inputEl, "add", "valid_year");
        flag = 0;
      } else {
        displayError(inputEl, "remove");
        flag = 1;
      }
    } else {
      displayError(inputEl, "remove");
      flag = 1;
      console.log("else ");
    }
  });

  if (flag === 1) calAge(day, month, year);
});

inputContainer.forEach((e) => console.log(e));

function displayError(e, classState, msg) {
  const containerEl = e.closest(".input--container");
  const invalidMessageEl = containerEl.querySelector(".invalid");

  if (classState === "add") {
    invalidMessageEl.textContent = `${errorMessage[msg]}`;
    invalidMessageEl.classList.add("invalid--message");
    e.classList.add("invalid--input");
    containerEl.classList.add("invalid--container");
  } else if (classState === "remove") {
    invalidMessageEl.classList.remove("invalid--message");
    e.classList.remove("invalid--input");
    containerEl.classList.remove("invalid--container");
  }
}

// *******************************
// CALCULATING AGE
// *******************************
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

// *******************************
// DISPLAYING AGE
// *******************************
function displayAge(year, month, day) {
  outputDayEl.textContent = day;
  outputMonthEl.textContent = month;
  outputYearEl.textContent = year;
}
