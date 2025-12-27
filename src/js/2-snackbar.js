// Підключення бібліотеки iziToast :
// Імпорт, описаний в документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Об'єкт посилань сторінки :
const refs = {
  inputDelay: document.querySelector('.delay-input'),
  btnCreate: document.querySelector('.btn-create'),
  formPromise: document.querySelector('.form'),
};

// Слухач події submit форми
refs.formPromise.addEventListener('submit', onSubmitPromise);

// Обробник події submit форми
function onSubmitPromise(event) {
  // Обнулення події за замовчуванням
  event.preventDefault();

  // Значення затримки для таймера InputDelay
  const delayTimer = refs.inputDelay.value;
  console.log(`delayTimer =`, delayTimer);

  // Значення модельоване завершення промісу - InputState
  const statePromise = refs.formPromise.elements.state.value;
  console.log(`statePromise =`, statePromise);

  // Create promise
  // Створення промісу
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (statePromise === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delayTimer}ms`);
      } else {
        reject(`❌ Rejected promise in ${delayTimer}ms`);
      }
    }, delayTimer);
  });

  //   Registering promise callbacks
  //   Реєстрація колбеків промісу
  promise.then(value => onResolve(value)).catch(error => onReject(error));

  // Перезавантаження форми та ощищення значень полів форми
  refs.formPromise.reset();
}

// Функція - успішне виконання промісу
function onResolve(value) {
  console.log('onResolve -', value);

  // Опції вікна сповіщення
  const iziToastSetting = {
    // theme: 'dark',
    timeout: 5000,
    closeOnEscape: true,
    position: 'topRight',
    backgroundColor: '#59A10D',
    progressBarColor: '#326101',
    // iconUrl: './img/success.svg',
    // ---iconColor: '',
    // title: 'OK',
    // ---titleColor: '#ffffff',
    // titleSize: '16',
    message: value,
    messageColor: '#ffffff',
    messageSize: '16',
  };

  // Показуємо вікно сповіщення з помилкою
  iziToast.show(iziToastSetting);
}

// Функція - помилка
function onReject(error) {
  console.log(`onReject -`, error);

  // Опції вікна сповіщення
  const iziToastSetting = {
    // theme: 'dark',
    timeout: 5000,
    closeOnEscape: true,
    position: 'topRight',
    backgroundColor: '#EF4040',
    progressBarColor: '#B51B1B',
    // iconUrl: './img/error.png',
    // ---iconColor: '',
    // title: 'Error',
    // ---titleColor: '#ffffff',
    // titleSize: '16',
    message: error,
    messageColor: '#ffffff',
    messageSize: '16',
  };

  // Показуємо вікно сповіщення з помилкою
  iziToast.show(iziToastSetting);
}
