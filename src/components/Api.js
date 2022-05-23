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
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
      });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
      });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  removeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      },
    })
      .then((res) => {
        if (res.ok) {
          return true;
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  addLikeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  removeLikeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
      });
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
      .catch(err => {
        console.log(err);
      });
  }

}
