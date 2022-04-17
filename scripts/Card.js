export default class Card {
  constructor(data, templateSelector, viewCard) {
    this._imageSrc = data.link;
    this._cardTitle = data.name;
    this._templateSelector = templateSelector;
    this._viewCard = viewCard;
  }

  _getTemplate() {
    return this._templateSelector.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    // Клик по картинке
    this._cardImage.addEventListener('click', () => this._viewCard(this._cardTitle, this._imageSrc));
    // Клик по кнопке лайк
    this._cardElement.querySelector('.card__like').addEventListener('click', this._likeCard);
    // Клик по кнопке удалить
    this._cardElement.querySelector('.card__remove').addEventListener('click', this._removeCard);
  }

  _likeCard(event) {
    event.target.classList.toggle('card__like_active');
  }

  _removeCard(event) {
    event.target.closest('.card').remove();
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardImage.src = this._imageSrc;
    this._cardImage.alt = this._cardTitle;
    this._cardElement.querySelector('.card__title').textContent = this._cardTitle;
    this._setEventListeners();

    return this._cardElement;
  }
}
