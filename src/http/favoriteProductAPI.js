import {$authHost} from './index'

export const createFavoriteProduct = async (favoriteProduct) => {
  const {data} = await $authHost.post('api/favoriteproduct/', favoriteProduct)
  return data
}

export const getUserFavoriteProducts = async (userId) => {
  const {data} = await $authHost.get('api/favoriteproduct/user/all/' + userId)
  return data
}

export const deleteUserFavoriteProducts = async (userId) => {
  const {data} = await $authHost.delete('api/favoriteproduct/all/' + userId)
  return data
}

export const deleteUserFavoriteProduct = async (favoriteProduct) => {
  const {data} = await $authHost.delete('api/favoriteproduct/', favoriteProduct)
  return data
}
