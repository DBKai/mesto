export default class Api {
  constructor(options) {
    this._url = options.url;
    this._token = options.token;
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._getJson)
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._getJson)
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._getJson)
  }

  addCard({ name, link }) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._getJson)
  }

  removeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      },
    })
      .then(this._getJson)
  }

  addLikeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      },
    })
      .then(this._getJson)
  }

  removeLikeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      },
    })
      .then(this._getJson)
  }

  setUserAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._getJson)
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
