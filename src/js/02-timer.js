import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const dayEl = document.querySelector('[data-days]');
const hourEl = document.querySelector('[data-hours]');
const minEl = document.querySelector('[data-minutes]');
const secEl = document.querySelector('[data-seconds]');

btnStartEl.disabled = true;

let intervalId = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validateDate(selectedDates); 
  },
};

flatpickr(inputEl, options);

function validateDate(selectedDates) {

  selectedDate = selectedDates[0].getTime();

  if (selectedDate <= new Date().getTime()) {

    return Notify.failure('Please choose a date in the future');
  } else {
    btnStartEl.disabled = false;
    btnStartEl.addEventListener('click', () => {
      onStartTimer(selectedDate);
    });
  }
  }

function onStartTimer() {
  intervalId = setInterval(() => {
    const timerTime = selectedDate - new Date().getTime();
    stopInterval(timerTime);
    
    const { days, hours, minutes, seconds } = convertMs(timerTime);
    dayEl.textContent = addLeadingZero(days);
    hourEl.textContent = addLeadingZero(hours);
    minEl.textContent = addLeadingZero(minutes);
    secEl.textContent = addLeadingZero(seconds);
  }, 1000);
}

function stopInterval(timerTime) {
  if (timerTime < 1000) {
    clearInterval(intervalId);
    Notify.success(`Time is over`);
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}