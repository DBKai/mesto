export default class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._errorContainer = config.errorContainer;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputError = config.inputError;
    this._inactiveButtonClass = config.inactiveButtonClass;
  }

  _checkInputValidity = (inputElement, errorElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _showInputError = (inputElement, errorElement) => {
    inputElement.classList.add(this._inputError);
    errorElement.classList.add(this._errorContainer);
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove(this._inputError);
    errorElement.classList.remove(this._errorContainer);
    errorElement.textContent = '';
  }

  _getErrorElement(inputElement) {
    return this._formSelector.querySelector(`#${inputElement.id}-error`);
  }

  _setSubmitButtonState = () => {
    const isValid = this._formSelector.checkValidity();
    const submitButton = this._formSelector.querySelector(this._submitButtonSelector);
    if (isValid) {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    } else {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    }
  }

  _setEventListeners = () => {
    const inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => this._setInputHandler(inputElement));
    });
  }

  _setInputHandler = (inputElement) => {
    const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
    this._checkInputValidity(inputElement, errorElement);
    this._setSubmitButtonState();
  }

  // Функция принимает объект с параметрами и устанавливает слушатели
  enableValidation = () => {
    this._formSelector.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}
