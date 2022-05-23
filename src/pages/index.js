import './index.css';
import { initialCards as cards } from '../scripts/cards.js';
import config from '../scripts/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// Находим кнопку изменить данные профиля в DOM
const profileEditButton = document.querySelector('.profile__edit');
// Находим форму изменения профиля в DOM
const profileForm = document.querySelector('form[name="profile-form"]');
// Находим поля формы изменения данных профиля в DOM
const profileNameInput = document.querySelector('#profile-name');
const profileAboutInput = document.querySelector('#profile-about');
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

const api = new Api({
  url: `https://nomoreparties.co/v1/cohort-41/`,
  token: `f6ceccbe-01ab-42c9-9385-e3a8b94b887a`
});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
});

api.getUserInfo()
  .then(user => {
    userInfo.setUserInfo({
      id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar
    });
  })
  .catch(err => {
    console.log(`Ошибка: ${ err }`);
  });

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
  profileAboutInput.value = user.about;
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
