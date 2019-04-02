import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, tokenKey = TokenKey) {
  return Cookies.set(tokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
