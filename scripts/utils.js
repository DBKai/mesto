// Функция добавляет модификатор opened
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', _escUpHandler);
}

// Функция удаляет модификатор opened
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', _escUpHandler);
}

// Обработчик нажатия клавиши ESC
const _escUpHandler = (event) => {
  event.preventDefault();
  if (event.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// Функция определяет совершен ли клик по области popup
const withinPopup = (event) => {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
    closePopup(event.currentTarget);
  }
}

export { openPopup, closePopup, withinPopup };
