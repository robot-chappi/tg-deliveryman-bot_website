import {$authHost, $host} from "./index";

export const createOrder = async (order) => {
  const {data} = await $authHost.post('api/order/', order)
  return data
}

export const getOrder = async (id) => {
  const {data} = await $authHost.get('api/order/' + id)
  return data
}

export const getAllOrders = async () => {
  const {data} = await $authHost.get('api/order/all')
  return data
}

export const getCompletedOrders = async () => {
  const {data} = await $authHost.get('api/order/all/completed')
  return data
}

export const getUserOrder = async (chatId) => {
  const {data} = await $host.get('api/order/user/' + chatId)
  return data
}

export const getUserOrders = async (chatId) => {
  const {data} = await $host.get('api/order/user/all/' + chatId)
  return data
}

export const deleteOrder = async (id) => {
  const {data} = await $authHost.delete('api/order/' + id)
  return data
}

export const deleteUserOrder = async (chatId) => {
  const {data} = await $host.delete('api/order/user/' + chatId)
  return data
}

export const deleteUserOrders = async (chatId) => {
  const {data} = await $host.delete('api/order/user/all/' + chatId)
  return data
}

export const patchOrder = async (id, order) => {
  const {data} = await $authHost.patch('api/order/' + id, order)
  return data
}