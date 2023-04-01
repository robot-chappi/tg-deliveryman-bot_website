import {$authHost, $host} from "./index";

export const createFaq = async (faq) => {
  const {data} = await $authHost.post('api/faq/', faq)
  return data
}

export const getFaqs = async () => {
  const {data} = await $host.get('api/faq/all')
  return data
}

export const getPaginationFaqs = async (limit, page) => {
  const {data} = await $host.get('api/faq/pagination', {params: {limit: limit, page: page}})
  return data
}

export const getFaq = async (id) => {
  const {data} = await $host.get('api/faq/' + id)
  return data
}

export const deleteFaq = async (id) => {
  const {data} = await $authHost.delete('api/faq/' + id)
  return data
}

export const patchFaq = async (id, faq) => {
  const {data} = await $authHost.patch('api/faq/' + id, faq)
  return data
}