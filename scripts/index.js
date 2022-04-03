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

// Функция добавляет модификатор opened
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', escUpHandler);
}

// Функция удаляет модификатор opened
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', escUpHandler);
}

// Функция добавляет блок с карточкой
function generateCard(cardTitle, imageSrc) {
  // Клонируем template
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  // Заполняем данными
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardImage.src = imageSrc;
  cardImage.alt = cardTitle;
  cardElement.querySelector('.card__like').addEventListener('click', likeCard);
  cardElement.querySelector('.card__remove').addEventListener('click', removeCard);
  cardImage.addEventListener('click', () => viewCard(cardTitle, imageSrc));
  return cardElement;
}

function addCard(generateCard) {
  // Добавляем в начало контейнера с карточками
  cardContainer.prepend(generateCard);
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
  cardCaption.textContent = cardTitle;
  cardImage.src = imageSrc;
  cardImage.alt = cardTitle;
  openPopup(imageView);
}

// Функция читает массив и выводит карточки в DOM
function renderCards() {
  initialCards.forEach((item) => {
    addCard(generateCard(item.name, item.link));
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

// Функция определяет совершен ли клик по области popup
function withinPopup(event) {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
    closePopup(event.currentTarget);
  }
}

renderCards();

function openProfile() {
  fillProfile(profileName.textContent, profileJob.textContent);
  openPopup(popupProfile);
}

function openAddCardForm() {
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
  setProfile(profileNameInput.value, profileJobInput.value)
  closePopup(popupProfile);
  form.reset();
}

// Обработчик отправки формы
function cardFormSubmitHandler(event) {
  const form = event.currentTarget;
  addCard(generateCard(cardNameInput.value, cardLinkInput.value));
  closePopup(popupCard);
  disableButton(form);
  form.reset();
}

// Обработчик нажатия клавиши ESC
function escUpHandler(event) {
  event.preventDefault();
  if (event.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

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
