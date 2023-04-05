import {$authHost, $host} from "./index";

export const createTypeOrder = async (typeorder) => {
  const {data} = await $authHost.post('api/typeorder/', typeorder)
  return data
}

export const getTypeOrders = async () => {
  const {data} = await $host.get('api/typeorder/all')
  return data
}

export const getTypeOrder = async (id) => {
  const {data} = await $host.get('api/typeorder/' + id)
  return data
}

export const deleteTypeOrder = async (id) => {
  const {data} = await $authHost.delete('api/typeorder/' + id)
  return data
}

export const patchTypeOrder = async (id, typeorder) => {
  const {data} = await $authHost.patch('api/typeorder/' + id, typeorder)
  return data
}