// Функция принимает объект с параметрами и устанавливает слушатели
function enableValidation({formSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
}

const config = {
  formSelector: '.popup__form', // селектор формы
  inputSelector: '.popup__item', // селектор инпутов внутри этой формы
  errorContainer: 'popup__item_type_error', // селектор контейнеров для ошибок этой формы
  submitButtonSelector: '.popup__button', // селектор кнопки сабмита этой формы
  inputError: 'popup__item-error_active', // класс модификатор для инпутов при возникновении ошибки
  inactiveButtonClass: 'popup__button_inactive' // класс модификатор для дизэйбла кнопки
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(config);

function setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      setSubmitButtonState(formElement, submitButtonSelector, inactiveButtonClass);
    });
  });
}

function checkInputValidity(formElement, inputElement, {inputError, errorContainer}) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement,  inputError, errorContainer, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, inputError, errorContainer);
  }
}

function showInputError(formElement, inputElement, inputError, errorContainer, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorContainer);
};

function hideInputError(formElement, inputElement, inputError, errorContainer) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputError);
  errorElement.classList.remove(errorContainer);
  errorElement.textContent = '';
}

// Функция делает неактивной кнопку у невалидной формы
function setSubmitButtonState(formElement, submitButtonSelector, inactiveButtonClass) {
  const isValid = formElement.checkValidity();
  const submitButton = formElement.querySelector(submitButtonSelector);

  if (isValid) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  } else {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }
}
