const bodyEl = document.querySelector('body');
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let intervalId = null;
btnStopEl.disabled = true;

btnStartEl.addEventListener('click', (event) => {
  event.target.disabled = true;
  btnStopEl.disabled = false;

  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

btnStopEl.addEventListener('click', (event) => {
  event.target.disabled = true;
  btnStartEl.disabled = false;

  clearInterval(intervalId);
});