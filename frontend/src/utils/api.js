class Api {
  constructor({ baseUrl, headers }) {
    // тело конструктора
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "GET",
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "GET",
    }).then(this._checkResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._checkResponse);
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  unsetLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "6715cb7d-4f0e-4056-86d6-73d3f08499c0",
    "Content-Type": "application/json",
  },
});

export default api;
