import { initialCards as cards } from '../scripts/cards.js';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import config from '../scripts/constants.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

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

// Находим кнопку добавить карточку в DOM
const cardAddButton = document.querySelector('.profile__card-add');

// Находим шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

// Находим форму добавления карточки в DOM
const cardForm = document.querySelector('form[name="card-form"]');

const imageViewPopup = new PopupWithImage('.popup_type_image-view');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
const cardPopup = new PopupWithForm('.popup_type_card', handleCardFormSubmit);

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

const cardList = new Section(
  { items: cards,
    renderer: (item) => {
      const card = new Card(item, cardTemplate, handleCardClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  },
  '.cards'
);

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
  profilePopup.open();
}

function openCard() {
  cardForm.reset();
  formValidators[cardForm.getAttribute('name')].resetValidation();
  cardPopup.open();
}

// Обработчик отправки формы
function handleProfileFormSubmit(items) {
  setProfile(profileNameInput.value, profileJobInput.value);
  profilePopup.open();
}

// Обработчик отправки формы
function handleCardFormSubmit(items) {
  const card = new Card(items, cardTemplate, handleCardClick);
  const cardItem = card.generateCard();
  cardList.addItem(cardItem);
}

// Обработчик клика по карточке
function handleCardClick(name, link) {
  imageViewPopup.open(name, link);
}

imageViewPopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();
enableValidation(config);
cardList.renderItems();
profileEditButton.addEventListener('click', openProfile);
cardAddButton.addEventListener('click', openCard);
