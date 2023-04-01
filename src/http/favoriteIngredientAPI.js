import {$authHost} from './index'

export const createFavoriteIngredient = async (favoriteIngredient) => {
  const {data} = await $authHost.post('api/favoriteingredient/', favoriteIngredient)
  return data
}

export const getUserFavoriteIngredients = async (userId) => {
  const {data} = await $authHost.get('api/favoriteingredient/user/all/' + userId)
  return data
}

export const getUserChatFavoriteIngredients = async (chatId) => {
  const {data} = await $authHost.get('api/favoriteingredient/user/all/chat/' + chatId)
  return data
}

export const deleteUserFavoriteIngredients = async (userId) => {
  const {data} = await $authHost.delete('api/favoriteingredient/all/' + userId)
  return data
}

export const deleteUserFavoriteIngredient = async (favorite_ingredient_id, favorite_ingredient_ingredient_id) => {
  const {data} = await $authHost.delete('api/favoriteingredient/',{params: {favorite_ingredient_id: favorite_ingredient_id, favorite_ingredient_ingredient_id: favorite_ingredient_ingredient_id}})
  return data
}
