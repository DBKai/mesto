import './index.css';
import {
  config,
  profileEditButton,
  profileForm,
  profileNameInput,
  profileAboutInput,
  cardAddButton,
  cardTemplate,
  cardForm,
  avatarEditButton,
  avatarForm,
  profileFormButton,
  cardFormButton,
  avatarFormButton
} from '../scripts/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const imageViewPopup = new PopupWithImage('.popup_type_image-view');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
const cardPopup = new PopupWithForm('.popup_type_card', handleCardFormSubmit);
const confirmPopup = new PopupWithConfirmation('.popup_type_confirm', handleFormConfirm);
const avatarPopup = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit);

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
  renderer: (item) => {
    const card = createCard(item);
    addCardToList(card);
  }
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

function createCard(card) {
  const newCard = new Card({
    id: card._id,
    name: card.name,
    link: card.link,
    likes: card.likes,
    ownerId: card.owner._id,
    userId: userInfo._id
  }, cardTemplate, handleCardClick, handleRemoveCard, handleLikeCard);
  return newCard.generateCard();
}

function addCardToList(card) {
  cardList.addItem(card);
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
  profileFormButton.textContent = 'Сохранение...';
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
      profilePopup.close();
    })
    .catch(err => {
      console.log(`Ошибка: ${ err }`)
    })
    .finally(() => {
      profileFormButton.textContent = 'Сохранить';
    });
}

function handleCardFormSubmit(item) {
  cardFormButton.textContent = 'Создание...';
  api.addCard({
    name: item.name,
    link: item.link
  })
    .then(item => {
      const card = createCard(item);
      addCardToList(card);
      cardPopup.close();
    })
    .catch(err => {
      console.log(`Ошибка: ${ err }`);
    })
    .finally(() => {
      cardFormButton.textContent = 'Создать';
    });
}

function handleAvatarFormSubmit({ avatar }) {
  avatarFormButton.textContent = 'Сохранение...';
  api.setUserAvatar(avatar)
    .then(() => {
      userInfo.setUserAvatar(avatar);
      avatarPopup.close();
    })
    .catch(err => {
      console.log(`Ошибка: ${ err }`);
    })
    .finally(() => {
      avatarFormButton.textContent = 'Сохранить';
    });
}

function handleCardClick(name, link) {
  imageViewPopup.open(name, link);
}

function handleRemoveCard(cardId, card) {
  confirmPopup.open(cardId, card);
}

function handleFormConfirm(cardId, card) {
  api.removeCard(cardId)
    .then(() => {
      card.removeCard();
      confirmPopup.close();
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
      })
      .catch(err => {
        console.log(`Ошибка: ${ err }`);
      });
  } else {
    api.addLikeCard(cardId)
      .then((res) => {
        toggleLike(res.likes.length);
      })
      .catch(err => {
        console.log(`Ошибка: ${ err }`);
      });
  }
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
