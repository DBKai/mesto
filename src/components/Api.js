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
}
