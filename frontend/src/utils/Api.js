class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }
  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse)
  };
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkResponse)
  }
  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._checkResponse)
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._checkResponse)
  }
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse)
  }
  takeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._checkResponse)
  }
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse)
  }
  editProfileAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._checkResponse)
  }
  _checkResponse(res) {
    // тут проверка ответа
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

const api = new Api({
  url: "https://localhost:4000",
  headers: {
    "Content-Type": "application/json",
    authorization: "47a79e91-e1f8-4d50-bfff-9e3aae581f27"
  }
});

export default api;