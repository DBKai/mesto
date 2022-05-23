export default class Card {
  constructor({ name, link, likes }, cardTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
    return this._cardTemplate.querySelector('.card').cloneNode(true);
  }

  _setEventListeners = () => {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    this._cardLike.addEventListener('click', this._likeCard);
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
    this._cardLike = this._cardElement.querySelector('.card__like');
    this._cardLikeCount = this._cardElement.querySelector('.card__like-count');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._cardLikeCount.textContent = this._likes === undefined ? 0 : this._likes.length;

    this._setEventListeners();

    return this._cardElement;
  }
}
