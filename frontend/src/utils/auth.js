export const BASE_URL = 'https://api.aradion0va.nomoredomains.work'; //домен фронт

export function register(email, password) {

  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
    .then(res => checkResponse(res))
    .then((res) => {
      return res;
    });
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
    .then(res => checkResponse(res))
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
}

export function getToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  })
    .then(res => checkResponse(res))
    .then((data) => data);
}

function checkResponse(res) {
  // тут проверка ответа
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`)
}

export function logout() {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        response.json().then((data) => console.error(data.message));
        throw new Error();
      }
    })
    .catch((err) => {
      throw err
    });
};
