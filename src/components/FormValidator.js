export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._errorContainer = config.errorContainer;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputError = config.inputError;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _checkInputValidity = (inputElement, errorElement) => {
    const isValid = inputElement.validity.valid;
    this._toggleInputError(isValid, inputElement, errorElement);
  }

  _toggleInputError = (isValid, inputElement, errorElement) => {
    errorElement.textContent = isValid ? '' : inputElement.validationMessage;
    inputElement.classList.toggle(this._inputError, !isValid);
    errorElement.classList.toggle(this._errorContainer, !isValid);
  }

  _getErrorElement(inputElement) {
    return this._form.querySelector(`#${inputElement.id}-error`);
  }

  _toggleButtonState = () => {
    const isValid = this._form.checkValidity();
    this._submitButton.disabled = !isValid;
    this._submitButton.classList.toggle(this._inactiveButtonClass, !isValid);
  }

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => this._setInputHandler(inputElement));
    });
  }

  _setInputHandler = (inputElement) => {
    const errorElement = this._getErrorElement(inputElement);
    this._checkInputValidity(inputElement, errorElement);
    this._toggleButtonState();
  }

  resetValidation = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      const errorElement = this._getErrorElement(inputElement);
      this._toggleInputError(true, inputElement, errorElement);
    });
  }

  enableValidation = () => {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}
