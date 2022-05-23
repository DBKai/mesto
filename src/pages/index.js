import './index.css';
import config from '../scripts/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
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
const confirmPopup = new PopupWithConfirmation('.popup_type_confirm', handleFormConfirm);
const avatarPopup = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit);
const avatarEditButton = document.querySelector('.profile__avatar-edit');
const avatarForm = document.querySelector('form[name="avatar-form"]');

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

const cardList = new Section({
  renderer: (item) => addCardToList(item)
}, '.cards');

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo({
      id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar
    });
    cardList.renderItems(cards);
  })
  .catch(err => {
    console.log(`Ошибка: ${ err }`);
  });

function addCardToList(card) {
  const newCard = new Card({
    id: card._id,
    name: card.name,
    link: card.link,
    likes: card.likes,
    ownerId: card.owner._id,
    userId: userInfo._id
  }, cardTemplate, handleCardClick, handleRemoveCard, handleLikeCard);
  const cardItem = newCard.generateCard();
  cardList.addItem(cardItem);
}

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

function openAvatar() {
  formValidators[avatarForm.getAttribute('name')].resetValidation();
  avatarPopup.open();
}

function handleProfileFormSubmit(item) {
  api.setUserInfo({
    name: item.name,
    about: item.about
  })
    .then(res => {
      userInfo.setUserInfo({
        name: res.name,
        about: res.about,
        avatar: res.avatar
      });
    })
    .catch(err => {
      console.log(`Ошибка: ${ err }`)
    })
    .finally(() => {
      profilePopup.close();
    });
}

function handleCardFormSubmit(item) {
  api.addCard({
    name: item.name,
    link: item.link
  })
    .then(card => addCardToList(card))
    .catch(err => {
      console.log(`Ошибка: ${ err }`);
    })
    .finally(() => {
      cardPopup.close();
    });
}

function handleCardClick(name, link) {
  imageViewPopup.open(name, link);
}

function handleRemoveCard(cardId, currentCard) {
  confirmPopup.open(cardId, currentCard);
}

function handleFormConfirm(cardId, currentCard) {
  api.removeCard(cardId)
    .then((isSuccess) => {
      if (isSuccess) {
        currentCard.remove();
      }
    })
    .catch(err => {
      console.log(`Ошибка: ${ err }`);
    });
}

function handleLikeCard(cardId, toggleLike, isLiked) {
  if (isLiked) {
    api.removeLikeCard(cardId)
      .then((res) => {
        toggleLike(res.likes.length);
      });
  } else {
    api.addLikeCard(cardId)
      .then((res) => {
        toggleLike(res.likes.length);
      });
  }
}

function handleAvatarFormSubmit({ avatar }) {
  api.setUserAvatar(avatar)
    .then((res) => {
      if (res.ok) {
        userInfo.setUserAvatar(avatar);
      }
    })
    .catch(err => {
      console.log(`Ошибка: ${ err }`);
    })
    .finally(() => {
      avatarPopup.close();
    });
}

imageViewPopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();
enableValidation(config);
profileEditButton.addEventListener('click', openProfile);
cardAddButton.addEventListener('click', openCard);
avatarEditButton.addEventListener('click', openAvatar);
