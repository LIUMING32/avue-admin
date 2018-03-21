import Cookies from 'js-cookie'
import store from '@/store'
const TokenKey = 'x-access-token'
//cookie的设置，删除，获取
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
