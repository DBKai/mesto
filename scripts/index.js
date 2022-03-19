const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/kirill-pershin-1088404-unsplash.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/kirill-pershin-1404681-unsplash.jpg'
  },
  {
    name: 'Домбай',
    link: './images/kirill-pershin-1556355-unsplash.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/kirill-pershin-1404681-unsplash.jpg'
  },
  {
    name: 'Домбай',
    link: './images/kirill-pershin-1556355-unsplash.jpg'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/kirill-pershin-1088404-unsplash.jpg'
  }
];

/*  Изменение профиля  */


// Находим кнопку изменить данные профиля в DOM
const profileEditButton = document.querySelector('.profile__edit');

// Находим форму изменения профиля в DOM
const popupProfile = document.querySelector('.popup_type_profile');

// Находим поля формы изменения данных профиля в DOM
const profileNameInput = popupProfile.querySelector('.popup__item_profile_name');
const profileJobInput = popupProfile.querySelector('.popup__item_profile_job');

// Находим элементы, куда должны быть вставлены значения полей из формы
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Находим блок с карточками
const cardContainer = document.querySelector('.cards');

// Находим кнопку добавить карточку в DOM
const cardAddButton = document.querySelector('.profile__card-add');

// Находим форму добавления карточки в DOM
const popupCard = document.querySelector('.popup_type_card');

// Находим поля формы карточки в DOM
const cardNameInput = popupCard.querySelector('.popup__item_card_name');
const cardLinkInput = popupCard.querySelector('.popup__item_card_link');

// Находим форму добавления просмотра полного изображения в DOM
const imageView = document.querySelector('.popup_type_image-view');

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function profileFormSubmitHandler(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Вставляем новые значения с помощью textContent
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(event);
}

// Функция добавляет модификатор opened
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция удаляет модификатор opened
function closePopup(event) {
  event.currentTarget.closest('.popup').classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function cardFormSubmitHandler(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  addCard(cardNameInput.value, cardLinkInput.value);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  closePopup(event);
}

// Функция добавляет блок с карточкой
function addCard(cardTitle, imageSrc) {
  const cardTemplate = document.querySelector('#card-template').content;
  // Клонируем template
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  // Заполняем данными
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').src = imageSrc;
  cardElement.querySelector('.card__image').alt = cardTitle;
  cardElement.querySelector('.card__like').addEventListener('click', likeCard);
  cardElement.querySelector('.card__remove').addEventListener('click', removeCard);
  cardElement.querySelector('.card__image').addEventListener('click', () => viewCard(cardTitle, imageSrc));
  // Добавляем в начало контейнера с карточками
  cardContainer.prepend(cardElement);
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
  imageView.querySelector('.popup__image').src = imageSrc;
  imageView.querySelector('.popup__caption').textContent = cardTitle;
  // Вешаем событие click на кнопку закрытия popup
  imageView.querySelector('.popup__close').addEventListener('click', closePopup);
  openPopup(imageView);
}

// Функция читает массив и выводит карточки в DOM
function renderCards() {
  initialCards.forEach((item) => {
    addCard(item.name, item.link);
  });
}

renderCards();

// Прикрепляем обработчик к кнопке изменения профиля
profileEditButton.addEventListener('click', (event) => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  // Вешаем событие click на кнопку закрытия popup
  popupProfile.querySelector('.popup__close').addEventListener('click', closePopup);
});

// Прикрепляем обработчик к кнопке добавить карточку
cardAddButton.addEventListener('click', () => {
  openPopup(popupCard);
  // Вешаем событие click на кнопку закрытия popup
  popupCard.querySelector('.popup__close').addEventListener('click', closePopup);
});

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupProfile.addEventListener('submit', profileFormSubmitHandler);
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupCard.addEventListener('submit', cardFormSubmitHandler);

// Функция определяет совершен ли клик по области popup
// function withinPopup(event) {
//   if (event.target === event.currentTarget) {
//     closePopup();
//   }
// }
// Прикрепляем обработчик события click на popup
// formElement.addEventListener('click', withinPopup);
