import {$authHost, $host} from "./index";

export const createType = async (type) => {
  const {data} = await $authHost.post('api/type/', type)
  return data
}

export const getTypes = async () => {
  const {data} = await $host.get('api/type/all')
  return data
}

export const getType = async (id) => {
  const {data} = await $host.get('api/type/' + id)
  return data
}

export const deleteType = async (id) => {
  const {data} = await $authHost.delete('api/type/' + id)
  return data
}

export const patchType = async (id, type) => {
  const {data} = await $authHost.patch('api/type/' + id, type)
  return data
}