import {$authHost, $host} from "./index";

export const createProduct = async (product) => {
  const {data} = await $authHost.post('api/product/', product, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
  return data
}

export const getProducts = async () => {
  const {data} = await $host.get('api/product/all')
  return data
}

export const getProductsWithIngredients = async () => {
  const {data} = await $host.get('api/product/all/ingredients')
  return data
}

export const getPaginationProducts = async (categoryId, typeId, limit, page) => {
  const {data} = await $host.get('api/product/pagination', {params: {categoryId: categoryId, typeId: typeId, limit: limit, page: page}})
  return data
}

export const getProduct = async (id) => {
  const {data} = await $host.get('api/product/' + id)
  return data
}

export const deleteProduct = async (id) => {
  const {data} = await $authHost.delete('api/product/' + id)
  return data
}

export const patchProduct = async (id, product) => {
  const {data} = await $authHost.patch('api/product/' + id, product)
  return data
}