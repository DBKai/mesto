export default class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
    return this._cardTemplate.querySelector('.card').cloneNode(true);
  }

  _setEventListeners = () => {
    // Клик по картинке
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    // Клик по кнопке лайк
    this._cardElement.querySelector('.card__like').addEventListener('click', this._likeCard);
    // Клик по кнопке удалить
    this._cardElement.querySelector('.card__remove').addEventListener('click', this._removeCard);
  }

  _likeCard = (event) => {
    event.target.classList.toggle('card__like_active');
  }

  _removeCard = (event) => {
    event.target.closest('.card').remove();
  }

  generateCard = () => {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();

    return this._cardElement;
  }
}
