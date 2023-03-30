import {$authHost, $host} from "./index";

export const createTariff = async (tariff) => {
  const {data} = await $authHost.post('api/tariff/', tariff)
  return data
}

export const getTariffs = async () => {
  const {data} = await $host.get('api/tariff/all')
  return data
}

export const getTariff = async (id) => {
  const {data} = await $host.get('api/tariff/' + id)
  return data
}

export const deleteTariff = async (id) => {
  const {data} = await $authHost.delete('api/tariff/' + id)
  return data
}

export const patchTariff = async (id, tariff) => {
  const {data} = await $authHost.patch('api/tariff/' + id, tariff)
  return data
}