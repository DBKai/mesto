export const config = {
  formSelector: '.popup__form', // селектор формы
  inputSelector: '.popup__item', // селектор инпутов внутри этой формы
  errorContainer: 'popup__item_type_error', // селектор контейнеров для ошибок этой формы
  submitButtonSelector: '.popup__button', // селектор кнопки сабмита этой формы
  inputError: 'popup__item-error_active', // класс модификатор для инпутов при возникновении ошибки
  inactiveButtonClass: 'popup__button_inactive' // класс модификатор для дизэйбла кнопки
};

// Находим форму добавления просмотра полного изображения в DOM
export const imageView = document.querySelector('.popup_type_image-view');
