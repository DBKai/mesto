import { openPopup } from "../scripts/utils.js";
import { imageView } from '../scripts/constants.js';

export default class Card {
  constructor(data, templateSelector) {
    this._imageSrc = data.link;
    this._cardTitle = data.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate = () => {
    return this._templateSelector.querySelector('.card').cloneNode(true);
  }

  _setEventListeners = () => {
    // Клик по картинке
    this._cardImage.addEventListener('click', this._openImageView);
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

  _viewCard = () => {
    const cardImage = imageView.querySelector('.popup__image');
    const cardCaption = imageView.querySelector('.popup__caption');

    cardCaption.textContent = this._cardTitle;
    cardImage.src = this._imageSrc;
    cardImage.alt = this._cardTitle;

    return imageView;
  }

  _openImageView = () => {
    openPopup(this._viewCard());
  }

  generateCard = () => {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardImage.src = this._imageSrc;
    this._cardImage.alt = this._cardTitle;
    this._cardElement.querySelector('.card__title').textContent = this._cardTitle;
    this._setEventListeners();

    return this._cardElement;
  }
}
