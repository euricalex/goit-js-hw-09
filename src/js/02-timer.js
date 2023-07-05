import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < Date.now()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
  }
};

const datePicker = flatpickr('#datetime-picker', options);
let timerId = 0;

function onStartBtnClick() {
  const selectedDate = datePicker.selectedDates[0].getTime();
  const now = Date.now();
  const timeDifference = selectedDate - now;

  refs.startBtn.disabled = true;
  refs.datetimePicker.disabled = true;

  if (timeDifference <= 0) {
    refs.startBtn.disabled = false;
    updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    return;
  }

  timerId = setInterval(() => {
    const now = Date.now();
    const timeDifference = selectedDate - now;

    if (timeDifference <= 0) {
      clearInterval(timerId);
      refs.startBtn.disabled = false;
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    updateTimer(convertMs(timeDifference));
  }, 1000);
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

function updateTimer(time) {
  refs.days.textContent = addLeadingZero(time.days);
  refs.hours.textContent = addLeadingZero(time.hours);
  refs.minutes.textContent = addLeadingZero(time.minutes);
  refs.seconds.textContent = addLeadingZero(time.seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
