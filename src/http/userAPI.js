import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (user) => {
  const {data} = await $host.post('api/user/', user)
  return data
}

export const getToken = async (chatId) => {
  const {data} = await $host.post('api/user/token/' + chatId)
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const getUser = async (id) => {
  const {data} = await $authHost.get('api/user/' + id )
  return data
}
