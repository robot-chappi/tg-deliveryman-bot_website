import {$authHost} from './index'

export const createUnlovedIngredient = async (unlovedIngredient) => {
  const {data} = await $authHost.post('api/unlovedingredient/', unlovedIngredient)
  return data
}

export const getUserUnlovedIngredients = async (userId) => {
  const {data} = await $authHost.get('api/unlovedingredient/user/all/' + userId)
  return data
}

export const getUserChatUnlovedIngredients = async (chatId) => {
  const {data} = await $authHost.get('api/unlovedingredient/user/all/chat/' + chatId)
  return data
}

export const deleteUserUnlovedIngredients = async (userId) => {
  const {data} = await $authHost.delete('api/unlovedingredient/all/' + userId)
  return data
}

export const deleteUserUnlovedIngredient = async (unloved_ingredient_id, unloved_ingredient_ingredient_id) => {
  const {data} = await $authHost.delete('api/unlovedingredient/',{params: {unloved_ingredient_id: unloved_ingredient_id, unloved_ingredient_ingredient_id: unloved_ingredient_ingredient_id}})
  return data
}
