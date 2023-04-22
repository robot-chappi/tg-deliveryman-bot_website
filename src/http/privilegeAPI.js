import {$authHost, $host} from "./index";

export const createPrivilege = async (privilege) => {
  const {data} = await $authHost.post('api/privilege/', privilege)
  return data
}

export const getPrivileges = async () => {
  const {data} = await $host.get('api/privilege/all')
  return data
}

export const getPrivilege = async (id) => {
  const {data} = await $host.get('api/privilege/' + id)
  return data
}

export const deletePrivilege = async (id) => {
  const {data} = await $authHost.delete('api/privilege/' + id)
  return data
}

export const patchPrivilege = async (id, privilege) => {
  const {data} = await $authHost.patch('api/privilege/' + id, privilege)
  return data
}