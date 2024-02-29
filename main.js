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

// invalid
const invalidEl = document.querySelectorAll(".invalid");
const errorMessage = {
  empty: "This field required",
  valid: "Cannot be a negative number",
  valid_day: "Must be a valid day",
  valid_month: "Must be a valid month",
  valid_year: "Must be a valid year",
  future: "Can't be in the future",
};

// days in month
const daysInMonth = {
  1: 31,
  2: 29,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

const currDate = new Date();

const inputs = document.querySelectorAll("input");

btnEnter.addEventListener("click", function (e) {
  const day = Number(inputDayEl.value);
  const month = Number(inputMonthEl.value);
  const year = Number(inputYearEl.value);

  if (requiredField([...inputs])) {
    if (isValidDate(day, month, year)) {
      calAge(day, month, year);
    } else setDefault();
  } else setDefault();
});

// *******************************
// VALID DATE CHECK
// *******************************
function isValidDate(day, month, year) {
  let isValid = true;

  const givenDate = new Date(year, month - 1, day);
  if (daysInMonth[month] < day) {
    setError(inputDayEl, errorMessage.valid_day);
    console.log("Fuck me ,Oh YEAH!!!");
    isValid = false;
  } else if (currDate < givenDate) {
    if (year === currDate.getFullYear() && month === currDate.getMonth()) {
      setError(inputDayEl.errorMessage.future);
    }
    if (year === currDate.getFullYear()) {
      setError(inputMonthEl, errorMessage.future);
    }
    isValid = false;
  } else if (day > 31 || month > 12 || Number(year.toString().length) !== 4) {
    if (day > 31) setError(inputDayEl, errorMessage.valid_day);
    if (month > 12) setError(inputMonthEl, errorMessage.valid_month);
    if (Number(year.toString().length) !== 4)
      setError(inputYearEl, errorMessage.valid_year);
    isValid = false;
  }
  return isValid;
}

// *******************************
// DEAFAULT VALUE
// *******************************
function setDefault() {
  outputDayEl.textContent = "--";
  outputMonthEl.textContent = "--";
  outputYearEl.textContent = "--";
}

// *******************************
// EMPTY FIELD CHECK
// *******************************
function requiredField(inputs) {
  let hasValue = true;

  [...inputs].forEach(function (e) {
    const value = Number(e.value.trim());
    if (value === "" || Number(value) === 0 || value === NaN) {
      setError(e, errorMessage.empty);
      hasValue = false;
    } else removeError(e);
  });
  return hasValue;
}

// *******************************
// CONTROL ERROR MESSAGE
// *******************************
function setError(input, errorText) {
  const parent = input.parentElement;
  const errorItem = parent.querySelector(".invalid");
  errorItem.innerHTML = errorText;
  parent.classList.add("invalid--container");
  input.classList.add("invalid--input");
  errorItem.classList.add("invalid--message");
}

function removeError(input) {
  const parent = input.parentElement;
  const errorItem = parent.querySelector(".invalid");
  parent.classList.remove("invalid--container");
  input.classList.remove("invalid--input");
  errorItem.classList.remove("invalid--message");
}
// *******************************
// CALCULATING AGE
// *******************************
function calAge(b, m, y) {
  let day = currDate.getDate() - b;
  let month = currDate.getMonth() + 1 - m;
  let year = currDate.getFullYear() - y;
  //   year
  if (
    currDate.getMonth() + 1 < m ||
    (currDate.getMonth() + 1 === m && currDate.getDate() < b)
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
