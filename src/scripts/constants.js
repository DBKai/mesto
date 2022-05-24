export const profileEditButton = document.querySelector('.profile__edit');
export const profileForm = document.querySelector('form[name="profile-form"]');
export const profileNameInput = document.querySelector('#profile-name');
export const profileAboutInput = document.querySelector('#profile-about');
export const cardAddButton = document.querySelector('.profile__card-add');
export const cardTemplate = document.querySelector('#card-template').content;
export const cardForm = document.querySelector('form[name="card-form"]');
export const avatarEditButton = document.querySelector('.profile__avatar-edit');
export const avatarForm = document.querySelector('form[name="avatar-form"]');
export const profileFormButton = profileForm.querySelector('.popup__button');
export const cardFormButton = cardForm.querySelector('.popup__button');
export const avatarFormButton = avatarForm.querySelector('.popup__button');
export const config = {
  formSelector: '.popup__form', // селектор формы
  inputSelector: '.popup__item', // селектор инпутов внутри этой формы
  errorContainer: 'popup__item_type_error', // селектор контейнеров для ошибок этой формы
  submitButtonSelector: '.popup__button', // селектор кнопки сабмита этой формы
  inputError: 'popup__item-error_active', // класс модификатор для инпутов при возникновении ошибки
  inactiveButtonClass: 'popup__button_inactive' // класс модификатор для дизэйбла кнопки
};
