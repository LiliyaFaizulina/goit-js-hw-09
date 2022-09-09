import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import convertMs from './convertMs';

Notify.init({
  width: '350px',
  position: 'left-top',
  fontSize: '18px',
  failure: {
    background: 'rgba(249,8,8,0.8)',
    notiflixIconColor: 'rgba(187,10,34,0.8)',
  },
});

const refs = {
  inputDateTime: document.querySelector('[id="datetime-picker"]'),
  timer: document.querySelector('.timer'),
  fields: document.querySelectorAll('.field'),
  values: document.querySelectorAll('.value'),
  labels: document.querySelectorAll('.label'),
  startBtn: document.querySelector('[data-start]'),
};
const SELECTED_DATE_KEY = 'selected date';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notify.failure('Please choose a date in the future');
      setAttrDisabled(refs.startBtn);
    } else {
      refs.startBtn.removeAttribute('disabled');
      localStorage.setItem(SELECTED_DATE_KEY, selectedDates[0]);
    }
  },
};
const fp = flatpickr(refs.inputDateTime, options);
let intervalId = null;

setAttrDisabled(refs.startBtn);
refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick(e) {
  const selectedDate = new Date(localStorage.getItem(SELECTED_DATE_KEY));
  localStorage.removeItem(SELECTED_DATE_KEY);
  setAttrDisabled(e.target);
  setAttrDisabled(refs.inputDateTime);
  intervalId = setInterval(timer, 1000, selectedDate);
}

function timer(date) {
  const currentTime = new Date();
  const leftTime = date - currentTime;
  if (leftTime < 1) {
    refs.inputDateTime.removeAttribute('disabled');
    clearInterval(intervalId);
    return;
  }
  const timeData = convertMs(leftTime);

  for (const key in timeData) {
    document.querySelector(`[data-${key}]`).textContent = addLeadingZero(
      timeData[key]
    );
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function setAttrDisabled(ref) {
  ref.setAttribute('disabled', true);
}

refs.inputDateTime.style = 'padding: 10px; width: 220px; font-size: 20px';
refs.startBtn.style = 'margin-left: 20px; padding: 10px 20px; font-size: 20px';
refs.timer.style = 'margin-top: 20px; display: flex; gap: 20px';
refs.fields.forEach(
  field =>
    (field.style = 'display: flex; flex-direction: column; align-items: center')
);
refs.values.forEach(value => (value.style.fontSize = '50px'));
refs.labels.forEach(
  label =>
    (label.style =
      'text-transform: uppercase; font-size: 18px; font-weight: 500')
);
