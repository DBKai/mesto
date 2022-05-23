export default class Card {
  constructor({ id, name, link, likes, ownerId, userId }, cardTemplate, handleCardClick, handleRemoveCard) {
    this._id = id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._ownerId = ownerId;
    this._userId = userId;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
  }

  _getTemplate = () => {
    return this._cardTemplate.querySelector('.card').cloneNode(true);
  }

  _setEventListeners = () => {
    this._cardImage.addEventListener('click', this._clickCard);
    this._cardLike.addEventListener('click', this._likeCard);
    if (this._cardRemove !== null) {
      this._cardRemove.addEventListener('click', this._removeCard);
    }
  }

  _clickCard = () => {
    this._handleCardClick(this._name, this._link)
  }

  _likeCard = (event) => {
    event.target.classList.toggle('card__like_active');
  }

  _removeCard = () => {
    this._handleRemoveCard(this._id, this._cardElement);
  }

  generateCard = () => {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardLike = this._cardElement.querySelector('.card__like');
    this._cardLikeCount = this._cardElement.querySelector('.card__like-count');
    this._cardRemove = this._cardElement.querySelector('.card__remove');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._cardLikeCount.textContent = this._likes === undefined ? 0 : this._likes.length;

    if (this._userId !== undefined && this._userId !== this._ownerId) {
      this._cardRemove.remove();
    }

    this._setEventListeners();

    return this._cardElement;
  }
}
