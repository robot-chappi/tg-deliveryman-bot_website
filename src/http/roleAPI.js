import {$authHost, $host} from "./index";

export const createRole = async (role) => {
  const {data} = await $authHost.post('api/role/', role)
  return data
}

export const getRoles = async () => {
  const {data} = await $host.get('api/role/all')
  return data
}

export const getRole = async (id) => {
  const {data} = await $authHost.get('api/role/' + id)
  return data
}

export const deleteRole = async (id) => {
  const {data} = await $authHost.delete('api/role/' + id)
  return data
}

export const patchRole = async (id, role) => {
  const {data} = await $authHost.patch('api/role/' + id, role)
  return data
}