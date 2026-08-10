const token = searchParam('token')

if (token) {
  localStorage.setItem("access_token", token)
}

const searchParam = (key) => new URLSearchParams(window.location.search).get(key);