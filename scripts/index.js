// Находим кнопку изменить данные профиля в DOM
const profileEditButton = document.querySelector('.profile__edit');

// Находим попап формы изменения профиля в DOM
const popupProfile = document.querySelector('.popup_type_profile');

// Находим форму изменения профиля в DOM
const profileForm = document.querySelector('form[name="profile-form"]');

const popupProfileClose = popupProfile.querySelector('.popup__close');

// Находим поля формы изменения данных профиля в DOM
const profileNameInput = popupProfile.querySelector('#profile-name');
const profileJobInput = popupProfile.querySelector('#profile-job');

// Находим элементы, куда должны быть вставлены значения полей из формы
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Находим блок с карточками
const cardContainer = document.querySelector('.cards');

// Находим кнопку добавить карточку в DOM
const cardAddButton = document.querySelector('.profile__card-add');

// Находим шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

// Находим попап формы добавления карточки в DOM
const popupCard = document.querySelector('.popup_type_card');

// Находим форму добавления карточки в DOM
const cardForm = document.querySelector('form[name="card-form"]');

// Находим поля формы карточки в DOM
const cardNameInput = popupCard.querySelector('#card-name');
const cardLinkInput = popupCard.querySelector('#card-link');

// Находим форму добавления просмотра полного изображения в DOM
const imageView = document.querySelector('.popup_type_image-view');

const cardImage = imageView.querySelector('.popup__image');
const cardCaption = imageView.querySelector('.popup__caption');
const popupImageViewClose = imageView.querySelector('.popup__close');

const popupCardClose =  popupCard.querySelector('.popup__close');

// Функция добавляет модификатор opened
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция удаляет модификатор opened
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функция добавляет блок с карточкой
function generateCard(cardTitle, imageSrc) {
  // Клонируем template
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  // Заполняем данными
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardImage.src = imageSrc;
  cardImage.alt = cardTitle;
  cardElement.querySelector('.card__like').addEventListener('click', likeCard);
  cardElement.querySelector('.card__remove').addEventListener('click', removeCard);
  cardImage.addEventListener('click', () => viewCard(cardTitle, imageSrc));
  return cardElement;
}

function addCard(generateCard) {
  // Добавляем в начало контейнера с карточками
  cardContainer.prepend(generateCard);
}

// Функция удаления карточки
function removeCard(event) {
  event.target.closest('.card').remove();
}

// Функция лайка карточки
function likeCard(event) {
  event.target.classList.toggle('card__like_active');
}

// Функция просмотра и редактирования карточки
function viewCard(cardTitle, imageSrc) {
  cardCaption.textContent = cardTitle;
  cardImage.src = imageSrc;
  cardImage.alt = cardTitle;
  openPopup(imageView);
}

// Функция читает массив и выводит карточки в DOM
function renderCards() {
  initialCards.forEach((item) => {
    addCard(generateCard(item.name, item.link));
  });
}

// Обработчик отправки формы
function profileFormSubmitHandler(event) {
  event.preventDefault();

  const form = event.currentTarget;

  // Вставляем новые значения с помощью textContent
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  form.reset();
  closePopup(popupProfile);
}

// Обработчик отправки формы
function cardFormSubmitHandler(event) {
  event.preventDefault();

  const form = event.currentTarget;
  addCard(generateCard(cardNameInput.value, cardLinkInput.value));
  form.reset();
  setSubmitButtonState(form);
  closePopup(popupCard);
}

// Обработчик событий нажатия клавиш в Input
function formInputHandler(event) {
  const form = event.currentTarget;
  const input = event.target;

  setCustomError(input);
  setFieldError(form, input);
  setSubmitButtonState(form);
}

// Функция присваивает текст ошибки
function setCustomError(input) {
  const validity = input.validity;
  input.setCustomValidity('');

  if (validity.valueMissing) {
    input.setCustomValidity('Вы пропустили это поле.');
  }

  if (validity.tooShort || validity.tooLong) {
    const currentLength = input.value.length;
    const minLength = input.getAttribute('minlength');
    input.setCustomValidity(`Минимальное количество символов: ${minLength}. Длина текста сейчас: ${currentLength}.`);
  }

  if (validity.typeMismatch) {
    input.setCustomValidity(`Введите адрес сайта.`);
  }
}

// Функция показывает текст ошибки пользователю
function setFieldError(form, input) {
  const span = form.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage;
}

// Функция делает неактивной кнопку у невалидной формы
function setSubmitButtonState(form) {
  const button = form.querySelector('.popup__button');
  const isValid = form.checkValidity();

  if (isValid) {
    button.classList.remove('popup__button_inactive');
    button.disabled = false;
  } else {
    button.classList.add('popup__button_inactive');
    button.disabled = true;
  }
}

// Функция определяет совершен ли клик по области popup
function withinPopup(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

renderCards();

// Прикрепляем обработчик к кнопке изменения профиля
profileEditButton.addEventListener('click', (event) => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(popupProfile);
});

// Прикрепляем обработчик к кнопке добавить карточку
cardAddButton.addEventListener('click', () => {
  openPopup(popupCard);
});

// Прикрепляем обработчик отправки формы
profileForm.addEventListener('submit', profileFormSubmitHandler);
// Прикрепляем обработчик нажатия на кнопки в input
profileForm.addEventListener('input', formInputHandler);
// Прикрепляем обработчик отправки формы
cardForm.addEventListener('submit', cardFormSubmitHandler);
// Прикрепляем обработчик нажатия на кнопки в input
cardForm.addEventListener('input', formInputHandler);
// Вешаем событие click на кнопку закрытия popup
popupProfileClose.addEventListener('click', () => closePopup(popupProfile));
// Вешаем событие click на кнопку закрытия popup
popupCardClose.addEventListener('click', () => closePopup(popupCard));
// Вешаем событие click на кнопку закрытия popup
popupImageViewClose.addEventListener('click', () => closePopup(imageView));
// Прикрепляем обработчик события click на popup
popupProfile.addEventListener('click', withinPopup);
popupCard.addEventListener('click', withinPopup);
