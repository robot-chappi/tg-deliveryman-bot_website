import {$authHost, $host} from "./index";

export const createCategory = async (category) => {
  const {data} = await $authHost.post('api/category/', category)
  return data
}

export const getCategories = async () => {
  const {data} = await $host.get('api/category/all')
  return data
}

export const getCategory = async (id) => {
  const {data} = await $host.get('api/category/' + id)
  return data
}

export const deleteCategory = async (id) => {
  const {data} = await $authHost.delete('api/category/' + id)
  return data
}

export const patchCategory = async (id, category) => {
  const {data} = await $authHost.patch('api/category/' + id, category)
  return data
}