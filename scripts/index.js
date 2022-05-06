import { initialCards as cards } from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import config from './constants.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// Находим кнопку изменить данные профиля в DOM
const profileEditButton = document.querySelector('.profile__edit');
// Находим форму изменения профиля в DOM
const profileForm = document.querySelector('form[name="profile-form"]');
// Находим поля формы изменения данных профиля в DOM
const profileNameInput = document.querySelector('#profile-name');
const profileJobInput = document.querySelector('#profile-job');
// Находим кнопку добавить карточку в DOM
const cardAddButton = document.querySelector('.profile__card-add');
// Находим шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;
// Находим форму добавления карточки в DOM
const cardForm = document.querySelector('form[name="card-form"]');
const imageViewPopup = new PopupWithImage('.popup_type_image-view');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
const cardPopup = new PopupWithForm('.popup_type_card', handleCardFormSubmit);
const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__job' });
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

function openProfile() {
  const user = userInfo.getUserInfo();
  profileNameInput.value = user.name;
  profileJobInput.value = user.job;
  formValidators[profileForm.getAttribute('name')].resetValidation();
  profilePopup.open();
}

function openCard() {
  formValidators[cardForm.getAttribute('name')].resetValidation();
  cardPopup.open();
}

function handleProfileFormSubmit(items) {
  userInfo.setUserInfo(items);
}

function handleCardFormSubmit(items) {
  const card = new Card(items, cardTemplate, handleCardClick);
  const cardItem = card.generateCard();
  cardList.addItem(cardItem);
}

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
