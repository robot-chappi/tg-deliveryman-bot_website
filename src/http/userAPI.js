import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createUser = async (user) => {
  const {data} = await $host.post('api/user/', user)
  return data
}

export const getUserToken = async (chatId) => {
  const {data} = await $host.post('api/user/token/' + chatId)
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const getUser = async (id) => {
  const {data} = await $authHost.get('api/user/' + id )
  return data
}

export const getMe = async (chatId) => {
  const {data} = await $host.get('api/user/me/' + chatId)
  return data
}

export const getMyFavoriteProductItem = async (chatId) => {
  const {data} = await $host.get('api/user/me/favoriteproduct/' + chatId)
  return data
}

export const getMyFavoriteIngredientItem = async (chatId) => {
  const {data} = await $host.get('api/user/me/favoriteingredient/' + chatId)
  return data
}

export const getMyUnlovedIngredientItem = async (chatId) => {
  const {data} = await $host.get('api/user/me/unlovedingredient/' + chatId)
  return data
}

export const getUsers = async () => {
  const {data} = await $authHost.get('api/user/all')
  return data;
}

export const deleteUser = async (id) => {
  const {data} = await $authHost.delete('api/user/' + id)
  return data;
}

export const patchUser = async (id, user) => {
  const {data} = await $authHost.patch('api/user/' + id, user)
  return data;
}
