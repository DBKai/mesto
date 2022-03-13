// Находим форму в DOM
let formElement = document.querySelector('.popup');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__item_profile_name');
let jobInput = formElement.querySelector('.popup__item_profile_job');
// Находим кнопку изменить в DOM
let profileEditButton = document.querySelector('.profile__edit');
// Находим кнопку закрыть в DOM
let popupCloseButton = formElement.querySelector('.popup__close');
// Находим элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
// Находим блок с карточками
let cardContainer = document.querySelector('.cards');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Вставляем новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

// Функция добавляет модификатор opened
function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formElement.classList.add('popup_opened');
}

// Функция удаляет модификатор opened
function closePopup() {
  formElement.classList.remove('popup_opened');
}

// Функция добавляет блок с карточкой
function addCard(cardTitle, imageSrc, imageAlt) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').src = imageSrc;
  cardElement.querySelector('.card__image').alt = imageAlt;

  cardContainer.append(cardElement);
}

function renderCards() {
  initialCards.forEach((item) => {
    addCard(item.name, item.link, item.name);
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
formElement.addEventListener('submit', formSubmitHandler);
// Прикрепляем обработчик события click на popup
// formElement.addEventListener('click', withinPopup);
// Прикрепляем обработчик togglePopup к кнопке Edit profile
profileEditButton.addEventListener('click', openPopup);
// Прикрепляем обработчик togglePopup к кнопке Закрыть popup
popupCloseButton.addEventListener('click', closePopup);
