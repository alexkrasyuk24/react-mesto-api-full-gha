class ApiAuth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  register({ email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  checkAuth() {
    const JWT = localStorage.getItem("JWT");
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const apiAuth = new ApiAuth("https://auth.nomoreparties.co");

export default apiAuth;
