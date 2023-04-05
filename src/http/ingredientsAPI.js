import {$authHost, $host} from "./index";

export const createIngredient = async (ingredient) => {
  const {data} = await $authHost.post('api/ingredient/', ingredient)
  return data
}

export const getIngredients = async () => {
  const {data} = await $host.get('api/ingredient/all')
  return data
}

export const getIngredient = async (id) => {
  const {data} = await $host.get('api/ingredient/' + id)
  return data
}

export const deleteIngredient = async (id) => {
  const {data} = await $authHost.delete('api/ingredient/' + id)
  return data
}

export const patchIngredient = async (id, ingredient) => {
  const {data} = await $authHost.patch('api/ingredient/' + id, ingredient)
  return data
}