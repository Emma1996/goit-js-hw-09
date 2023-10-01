import flatpickr from 'flatpickr';
// Import suplimentar de stil
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init();

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let currentDate = null;
let timer = null;

// prepare html elements
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

// format values
const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

const onStartClick = () => {
  startBtn.disabled = true;

  // check to see wwhen the timer should be stopped
  setInterval(() => {
    if (new Date().getTime() >= currentDate.getTime()) {
      clearInterval(timer);
    }
  }, 900);

  // reclculate date details on each second
  timer = setInterval(() => {
    if (currentDate.getTime() > new Date().getTime()) {
      let { days, hours, minutes, seconds } = convertMs(
        currentDate.getTime() - new Date().getTime()
      );

      // put details on inputs
      dataDays.textContent = addLeadingZero(days);
      dataHours.textContent = addLeadingZero(hours);
      dataMinutes.textContent = addLeadingZero(minutes);
      dataSeconds.textContent = addLeadingZero(seconds);
    }
  }, 1000);
};
startBtn.addEventListener('click', () => onStartClick());

const validateDate = date => {
  if (date.getTime() < new Date().getTime()) {
    // invalid date => push notification
    Notiflix.Notify.failure('Please choose a date in the future');
    startBtn.disabled = true;
  } else {
    startBtn.disabled = false;
    currentDate = date;
  }
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validateDate(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);
