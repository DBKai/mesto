// Находим форму изменения профиля в DOM
const profileForm = document.querySelector('.popup__profile');

// Находим поля формы профиля в DOM
const profileNameInput = profileForm.querySelector('.popup__item_profile_name');
const profileJobInput = profileForm.querySelector('.popup__item_profile_job');

// Находим форму добавления карточки в DOM
const cardForm = document.querySelector('.popup__card');

// Находим поля формы карточки в DOM
const cardNameInput = cardForm.querySelector('.popup__item_card_name');
const cardLinkInput = cardForm.querySelector('.popup__item_card_link');

// Находим кнопку изменить данные профиля в DOM
const profileEditButton = document.querySelector('.profile__edit');

// Находим кнопку добавить карточку в DOM
const cardAddButton = document.querySelector('.profile__card-add');

// Находим кнопку закрыть форму в DOM
const profileCloseButton = profileForm.querySelector('.popup__profile_close');

// Находим кнопку закрыть форму в DOM
const cardCloseButton = cardForm.querySelector('.popup__card_close');

// Находим элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Находим блок с карточками
const cardContainer = document.querySelector('.cards');

const initialCards = [
  {
    name: 'Карачаевск',
    link: '../images/kirill-pershin-1088404-unsplash.jpg',
    description: 'Карачаевск'
  },
  {
    name: 'Гора Эльбрус',
    link: '../images/kirill-pershin-1404681-unsplash.jpg',
    description: 'Гора Эльбрус'
  },
  {
    name: 'Домбай',
    link: '../images/kirill-pershin-1556355-unsplash.jpg',
    description: 'Домбай'
  },
  {
    name: 'Гора Эльбрус',
    link: '../images/kirill-pershin-1404681-unsplash.jpg',
    description: 'Гора Эльбрус'
  },
  {
    name: 'Домбай',
    link: '../images/kirill-pershin-1556355-unsplash.jpg',
    description: 'Домбай'
  },
  {
    name: 'Карачаево-Черкессия',
    link: '../images/kirill-pershin-1088404-unsplash.jpg',
    description: 'Карачаево-Черкессия'
  }
];

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function profileFormSubmitHandler (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Вставляем новые значения с помощью textContent
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closeProfilePopup();
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function cardFormSubmitHandler (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  addCard(cardNameInput.value, cardLinkInput.value, cardNameInput.value);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  closeCardPopup();
}

// Функция добавляет модификатор opened
function openProfilePopup(event) {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  profileForm.classList.add('popup_opened');
}

// Функция добавляет модификатор opened
function openCardPopup() {
  cardForm.classList.add('popup_opened');
}

// Функция удаляет модификатор opened
function closeProfilePopup(event) {
  profileForm.classList.remove('popup_opened');
}

// Функция удаляет модификатор opened
function closeCardPopup() {
  cardForm.classList.remove('popup_opened');
}

// Функция добавляет блок с карточкой
function addCard(cardTitle, imageSrc, imageDescription) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').src = imageSrc;
  cardElement.querySelector('.card__image').alt = imageDescription;

  cardContainer.prepend(cardElement);
}

// Функция читает массив и выводит карточки в DOM
function renderCards() {
  initialCards.forEach((item) => {
    addCard(item.name, item.link, item.description);
  });
}

renderCards();

// Функция определяет совершен ли клик по области popup
// function withinPopup(event) {
//   if (event.target === event.currentTarget) {
//     closePopup();
//   }
// }

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', profileFormSubmitHandler);
// Прикрепляем обработчик к кнопке изменения профиля
profileEditButton.addEventListener('click', openProfilePopup);
// Прикрепляем обработчик к кнопке Закрыть popup
profileCloseButton.addEventListener('click', closeProfilePopup);
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
cardForm.addEventListener('submit', cardFormSubmitHandler);
// Прикрепляем обработчик к кнопке добавить карточку
cardAddButton.addEventListener('click', openCardPopup);
// Прикрепляем обработчик к кнопке Закрыть popup
cardCloseButton.addEventListener('click', closeCardPopup);
// Прикрепляем обработчик события click на popup
// formElement.addEventListener('click', withinPopup);
