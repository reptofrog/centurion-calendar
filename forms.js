'use strict';

const userID = 'user_sxIe2CeqHF8Rgh0wIAIHd';
const userID2 = 'user_tQiWZk4eSz1bgeYxFuqY9';

let popupSource = 0; // 0 — кнопка в header, 1 — кнопка "Подобрать решение"

function fillPhoneInput(target) {
  if (target.value === '') {
    target.value = '+7 (';
    setTimeout(() => {target.selectionStart = target.selectionEnd = target.value.length;}, 1);
  }
}


////////////////////////////////////////////////////////////////
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// CALENDAR EMAILJS

let calendarButton = document.querySelector('.calendar-button');
let calendarButtonText = document.querySelector('.calendar-button-text');
let calendarButtonSpinner = document.querySelector('.calendar-button-spinner');
let calendarButtonCheckmark = document.querySelector('.calendar-button-checkmark');
let calendarName = document.querySelector('.calendar-name');
let calendarPhone = document.querySelector('.calendar-phone');
let calendarError = document.querySelector('.calendar-error');

function clickHandlerCalendarButton() {
  function getValue(el) {
    return el[0].getAttribute('data-value');
  }

  function showError() {calendarError.classList.add('calendar-error--is-shown');}
  function hideError() {calendarError.classList.remove('calendar-error--is-shown');}

  let name = calendarName.value;
  let phone = calendarPhone.value;
  
  if (arrChoosed.length === 0) {
    calendarError.textContent = 'Пожалуйста, выберите день';
    showError();
    return
  }
  
  if (arrChoosedTime.length === 0) {
    calendarError.textContent = 'Пожалуйста, выберите время';
    showError();
    return
  }
  
  if (name === '') {
    calendarError.textContent = 'Пожалуйста, укажите имя';
    showError();
    return
  }
  
  if (phone.length < 18) {
    calendarError.textContent = 'Пожалуйста, укажите номер телефона';
    showError();
    return
  }

  hideError();
  calendarButtonText.textContent = 'Отправка';
  calendarButton.classList.add('calendar-button--deactivated');
  calendarButtonSpinner.classList.add('calendar-button-spinner--is-shown');
  calendarButtonCheckmark.classList.remove('calendar-button-checkmark--is-shown');

  let templateParams = {
    fromName: name,
    fromPhone: phone,
    date: getValue(arrChoosed),
    time: getValue(arrChoosedTime),
  };

  emailjs.send('service_gmail', 'template_calendar', templateParams, userID2)
  .then(function(response) {
    calendarButtonText.textContent = 'Заявка отправлена';
    calendarButton.classList.remove('calendar-button--deactivated');
    calendarButtonSpinner.classList.remove('calendar-button-spinner--is-shown');
    calendarButtonCheckmark.classList.add('calendar-button-checkmark--is-shown');
    console.log('EmailJS — письмо отправлено', response.status, response.text);
    ym(86782616,'reachGoal','form_zapis_office')
  }, function(error) {
    calendarButtonText.textContent = 'Ошибка отправки';
    calendarButton.classList.remove('calendar-button--deactivated');
    calendarButtonSpinner.classList.remove('calendar-button-spinner--is-shown');
    console.log('Ошибка EmailJS!', error);
  });
}

calendarPhone.addEventListener('click', (ev) => {fillPhoneInput(ev.target)});
calendarButton.addEventListener('click', clickHandlerCalendarButton);

////////////////////////////////////////////////////////////////
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// MASKING

const maskNameOptions = {
  mask: /^(\p{L}|\p{Z}){0,50}$/iu,
};

const maskPhoneOptions = {
  mask: '+{7} (000) 000-00-00'
};

let _maskCalendarName = IMask(calendarName, maskNameOptions);
let _maskCalendarPhone = IMask(calendarPhone, maskPhoneOptions);
