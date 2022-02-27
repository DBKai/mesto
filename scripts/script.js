let formElement = document.querySelector('.popup');

let nameInput = formElement.querySelector('.popup__item_profile_name');
let jobInput = formElement.querySelector('.popup__item_profile_job');

let profileEditButton = document.querySelector('.profile__edit');
let popupCloseButton = formElement.querySelector('.popup__close');
let popupSaveButton = formElement.querySelector('.popup__save');

function formSubmitHandler (evt) {
    evt.preventDefault();

    let name = nameInput.value;
    let job = jobInput.value;

    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');

    profileName.textContent = name;
    profileJob.textContent = job;
}

function togglePopup() {
  formElement.classList.toggle('popup_opened');
}

formElement.addEventListener('click', (event) => {
  if(event.target === event.currentTarget) {
    togglePopup();
  }
});

formElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
popupSaveButton.addEventListener('click', togglePopup);
