const initialCards = [
  {
    name: 'Карачаевск',
    link: '../images/kirill-pershin-1088404-unsplash.jpg',
    description: 'Карачаевск'
  },
  {
    name: 'Гора Эльбрус',
    link: '../images/kirill-pershin-1404681-unsplash.jpg',
    description: 'Гора Эльбрус'
  },
  {
    name: 'Домбай',
    link: '../images/kirill-pershin-1556355-unsplash.jpg',
    description: 'Домбай'
  },
  {
    name: 'Гора Эльбрус',
    link: '../images/kirill-pershin-1404681-unsplash.jpg',
    description: 'Гора Эльбрус'
  },
  {
    name: 'Домбай',
    link: '../images/kirill-pershin-1556355-unsplash.jpg',
    description: 'Домбай'
  },
  {
    name: 'Карачаево-Черкессия',
    link: '../images/kirill-pershin-1088404-unsplash.jpg',
    description: 'Карачаево-Черкессия'
  }
];


/*  Изменение профиля  */


// Находим кнопку изменить данные профиля в DOM
const profileEditButton = document.querySelector('.profile__edit');

// Находим форму изменения профиля в DOM
const popupProfile = document.querySelector('.popup_profile');

// Находим поля формы изменения данных профиля в DOM
const profileNameInput = popupProfile.querySelector('.popup__item_profile_name');
const profileJobInput = popupProfile.querySelector('.popup__item_profile_job');

// Находим элементы, куда должны быть вставлены значения полей из формы
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Прикрепляем обработчик к кнопке изменения профиля
profileEditButton.addEventListener('click', (event) => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  // Вешаем событие click на кнопку закрытия popup
  popupProfile.querySelector('.popup__close').addEventListener('click', closePopup);
});

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function profileFormSubmitHandler(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Вставляем новые значения с помощью textContent
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(event);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupProfile.addEventListener('submit', profileFormSubmitHandler);

// Функция добавляет модификатор opened
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция удаляет модификатор opened
function closePopup(event) {
  event.currentTarget.closest('.popup').classList.remove('popup_opened');
}


/*  Добавление карточки  */


// Находим кнопку добавить карточку в DOM
const cardAddButton = document.querySelector('.profile__card-add');

// Находим форму добавления карточки в DOM
const popupCard = document.querySelector('.popup_card');

// Находим поля формы карточки в DOM
const cardNameInput = popupCard.querySelector('.popup__item_card_name');
const cardLinkInput = popupCard.querySelector('.popup__item_card_link');

// Прикрепляем обработчик к кнопке добавить карточку
cardAddButton.addEventListener('click', () => {
  openPopup(popupCard);
  // Вешаем событие click на кнопку закрытия popup
  popupCard.querySelector('.popup__close').addEventListener('click', closePopup);
});

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function cardFormSubmitHandler(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  addCard(cardNameInput.value, cardLinkInput.value);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  closePopup(event);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupCard.addEventListener('submit', cardFormSubmitHandler);


/*  Заполнение контейнера карточками  */


// Находим блок с карточками
const cardContainer = document.querySelector('.cards');

// Функция добавляет блок с карточкой
function addCard(cardTitle, imageSrc) {
  const cardTemplate = document.querySelector('#card-template').content;
  // Клонируем template
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  // Заполняем данными
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').src = imageSrc;
  cardElement.querySelector('.card__image').alt = cardTitle;
  // Добавляем в начало контейнера с карточками
  cardContainer.prepend(cardElement);
}

// Функция удаления карточки
function removeCard(card) {
  card.remove();
}

// Функция лайка карточки
function likeCard(event) {
  event.target.classList.toggle('card__like_active');
}

// Слушатель события click по элементам страницы
document.body.addEventListener('click', (event) => {
  const card = event.target.closest('.card');
  if (!card) return;
  if (event.target.classList.contains('card__like')) {
    likeCard(event);
  }
  if (event.target.classList.contains('card__remove')) {
    removeCard(card);
  }
})

// Открытие картинки в попапе
// При вызове функции обратного вызова слушателя, который сработает при нажатии на картинку,
// передайте в нее (в функцию) данные самой карточки. Внутри этой функции вам надо данные этой карточки
// положить в нужные места в разметке вашего попапа. После этого открыть попап.

// Функция читает массив и выводит карточки в DOM
function renderCards() {
  initialCards.forEach((item) => {
    addCard(item.name, item.link);
  });
}
renderCards();

// Функция определяет совершен ли клик по области popup
// function withinPopup(event) {
//   if (event.target === event.currentTarget) {
//     closePopup();
//   }
// }
// Прикрепляем обработчик события click на popup
// formElement.addEventListener('click', withinPopup);
