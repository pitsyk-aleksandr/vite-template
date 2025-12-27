// Підключення бібліотеки flatpickr :
// Імпорт, описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// +++ Локалізація українською мовою
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';

// Підключення бібліотеки iziToast :
// Імпорт, описаний в документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Об'єкт параметрів функції flatpickr(selector, options)
const options = {
  allowInput: false,
  animate: true,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: {
    firstDayOfWeek: 1, // +++ start week on Monday
  },
  locale: Ukrainian, // +++ Локалізація українською мовою
  onClose(selectedDates) {
    // Вибрані в календарі дата/час - Unix.time
    const setDateTime = selectedDates[0].getTime();
    // Поточні дата/час Date.now() - Unix.time

    // Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future" і зроби кнопку «Start» не активною.
    if (setDateTime < Date.now()) {
      // alert('Please choose a date in the future');
      // Опції вікна сповіщення
      const iziToastSetting = {
        // theme: 'dark',
        timeout: 5000,
        closeOnEscape: true,
        position: 'center',
        backgroundColor: '#EF4040',
        progressBarColor: '#B51B1B',
        iconUrl: './img/error.svg',
        // ---iconColor: '',
        title: 'Error',
        titleColor: '#ffffff',
        titleSize: '16',
        message: 'Please choose a date in the future',
        messageColor: '#ffffff',
        messageSize: '16',
      };

      // Показуємо вікно сповіщення з помилкою
      iziToast.show(iziToastSetting);

      // Якщо користувач вибрав НЕвалідну дату, кнопка «Start» стає НЕактивною.
      refs.btnStart.disabled = true;
      return;
    }
    // Якщо користувач вибрав валідну дату, кнопка «Start» стає активною.
    refs.btnStart.disabled = false;
    // Змінній вибраної дати даємо обрану дату
    userSelectedDate = selectedDates[0];
    console.log('userSelectedDate', userSelectedDate);
  },
};

// Об'єкт посилань сторінки :
const refs = {
  inputDateTime: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  txtDays: document.querySelector('[data-days]'),
  txtHours: document.querySelector('[data-hours]'),
  txtMinutes: document.querySelector('[data-minutes]'),
  txtSeconds: document.querySelector('[data-seconds]'),
};

console.log(`inputDateTime`, refs.inputDateTime);
console.log(`btnStart`, refs.btnStart);
console.log(`txtDays`, refs.txtDays);
console.log(`txtHours`, refs.txtHours);
console.log(`txtMinutes`, refs.txtMinutes);
console.log(`txtSeconds`, refs.txtSeconds);

// ================================================================================
// Функція convertMs, де ms — різниця між кінцевою і поточною датою в мілісекундах.
// Для підрахунку значень -  Days Minutes Hours Seconds
// --------------------------------------------------------------------------------
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
// ================================================================================

// Змінна в якій буде лежати вибрана Data/Time
let userSelectedDate;
// Змінна для ідентифікатора інтервалу
let newTimer;

// Запуск календаря - вибору дати та часу під час редагування елемента Input
const calendar = flatpickr(refs.inputDateTime, options);

// Слухач події на кнопку Start
refs.btnStart.addEventListener('click', onBtnStart);

// Обробник події при кліку на кнопку Start
function onBtnStart(event) {
  console.log(`userSelectedDate - `, userSelectedDate);
  // кнопка «Start» стає НЕактивною.
  refs.btnStart.disabled = true;
  // Input стає НЕактивним.
  refs.inputDateTime.disabled = true;
  // Запускаємо таймер - виклик интервальної функції
  newTimer = setInterval(startTimer, 1000);
}

function startTimer() {
  // Різниця між заданим Date/Time та поточним Date/Time (ms)
  const timeMs = userSelectedDate.getTime() - Date.now();
  // Якщо час вичерпаний
  if (timeMs <= 0) {
    // Обнуляємо значення секунд для таймера на екрані
    refs.txtSeconds.textContent = addLeadingZero(0);
    // Зупиняємо віклики інтервальної функції
    clearInterval(newTimer);
    // Встановлюємо INPUT - доступним для редагування
    refs.inputDateTime.disabled = false;
    return;
  }
  // Якщо ще є час, то :
  // Конвертуємо міллісекунди в day/hours/minutes/seconds
  const { days, hours, minutes, seconds } = convertMs(timeMs);
  // Встановлюємо значення кожного span таймера
  refs.txtDays.textContent = addLeadingZero(days);
  refs.txtHours.textContent = addLeadingZero(hours);
  refs.txtMinutes.textContent = addLeadingZero(minutes);
  refs.txtSeconds.textContent = addLeadingZero(seconds);
}

// Функція додавання 0 спереду для однозначних чисел
function addLeadingZero(value) {
  if (value < 100) {
    return String(value).padStart(2, '0');
  } else {
    return String(value);
  }
}
