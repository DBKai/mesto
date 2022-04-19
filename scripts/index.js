import { initialCards as cards } from '../scripts/cards.js';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import { config, imageView } from '../scripts/constants.js';
import { openPopup, closePopup, withinPopup } from '../scripts/utils.js';

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

// Функция читает массив и выводит карточки в DOM
function renderCards() {
  cards.forEach((item) => {
    const card = new Card(item, cardTemplate);
    addCard(card.generateCard());
  });
}

function addCard(card) {
  // Добавляем в начало контейнера с карточками
  cardContainer.prepend(card);
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
  const validation = new FormValidator(config, profileForm);
  validation.enableValidation();
  fillProfile(profileName.textContent, profileJob.textContent);
  openPopup(popupProfile);
}

function openAddCardForm() {
  const validation = new FormValidator(config, cardForm);
  validation.enableValidation();
  openPopup(popupCard);
}

function disableButton(form) {
  const submitButton = form.querySelector('.popup__button');
  submitButton.disabled = true;
  submitButton.classList.add('popup__button_inactive');
}

// Обработчик отправки формы
function profileFormSubmitHandler(event) {
  const form = event.currentTarget;
  setProfile(profileNameInput.value, profileJobInput.value);
  closePopup(popupProfile);
  form.reset();
}

// Обработчик отправки формы
function cardFormSubmitHandler(event) {
  const form = event.currentTarget;
  const card = new Card({ name: cardNameInput.value, link: cardLinkInput.value }, cardTemplate);
  addCard(card.generateCard());
  closePopup(popupCard);
  disableButton(form);
  form.reset();
}

renderCards();

// Прикрепляем обработчик отправки формы
profileForm.addEventListener('submit', profileFormSubmitHandler);
// Прикрепляем обработчик отправки формы
cardForm.addEventListener('submit', cardFormSubmitHandler);
// Прикрепляем обработчик к кнопке изменения профиля
profileEditButton.addEventListener('click', openProfile);
// Прикрепляем обработчик к кнопке добавить карточку
cardAddButton.addEventListener('click', openAddCardForm);
// Прикрепляем обработчик события click на popup
popupProfile.addEventListener('click', withinPopup);
popupCard.addEventListener('click', withinPopup);
imageView.addEventListener('click', withinPopup);
