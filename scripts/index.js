import { initialCards as cards } from '../scripts/cards.js';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import config from '../scripts/constants.js';

// Находим кнопку изменить данные профиля в DOM
const profileEditButton = document.querySelector('.profile__edit');

// Находим попап формы изменения профиля в DOM
const popupProfile = document.querySelector('.popup_type_profile');

// Находим форму изменения профиля в DOM
const profileForm = document.querySelector('form[name="profile-form"]');

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

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

function createCard(item) {
  const card = new Card(item, cardTemplate, handleCardClick);
  const cardItem = card.generateCard();
  return cardItem;
}

function addCard(card) {
  // Добавляем в начало контейнера с карточками
  cardContainer.prepend(card);
}

// Функция читает массив и выводит карточки в DOM
function renderCards() {
  cards.forEach((item) => {
    const card = createCard(item);
    addCard(card);
  });
}

function setProfile(name, job) {
  profileName.textContent = name;
  profileJob.textContent = job;
}

function fillProfile(name, job) {
  profileNameInput.value = name;
  profileJobInput.value = job;
}

function openProfile() {
  profileForm.reset();
  fillProfile(profileName.textContent, profileJob.textContent);
  formValidators[profileForm.getAttribute('name')].resetValidation();
  openPopup(popupProfile);
}

function openCard() {
  cardForm.reset();
  formValidators[cardForm.getAttribute('name')].resetValidation();
  openPopup(popupCard);
}

// Функция добавляет модификатор opened
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscKey);
}

// Функция удаляет модификатор opened
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscKey);
}

// Обработчик нажатия клавиши ESC
function handleEscKey(event) {
  event.preventDefault();
  if (event.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// Обработчик отправки формы
function profileFormSubmitHandler(event) {
  const form = event.currentTarget;
  setProfile(profileNameInput.value, profileJobInput.value);
  closePopup(popupProfile);
  formValidators[profileForm.getAttribute('name')].resetValidation();
  form.reset();
}

// Обработчик отправки формы
function cardFormSubmitHandler(event) {
  const form = event.currentTarget;
  const card = createCard({ name: cardNameInput.value, link: cardLinkInput.value });
  addCard(card);
  closePopup(popupCard);
  formValidators[cardForm.getAttribute('name')].resetValidation();
  form.reset();
}

// Обработчик клика по карточке
function handleCardClick(name, link) {
  cardCaption.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  openPopup(imageView);
}

// Прикрепляем обработчики события click на popup
function addPopupCloseListeners() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup_opened') ||
      event.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
    });
  });
}

enableValidation(config);
renderCards();
addPopupCloseListeners();

// Прикрепляем обработчик отправки формы
profileForm.addEventListener('submit', profileFormSubmitHandler);
// Прикрепляем обработчик отправки формы
cardForm.addEventListener('submit', cardFormSubmitHandler);
// Прикрепляем обработчик к кнопке изменения профиля
profileEditButton.addEventListener('click', openProfile);
// Прикрепляем обработчик к кнопке добавить карточку
cardAddButton.addEventListener('click', openCard);
