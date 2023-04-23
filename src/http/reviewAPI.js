import {$authHost, $host} from "./index";

export const createReview = async (review) => {
  const {data} = await $authHost.post('api/review/', review)
  return data
}

export const getReviews = async () => {
  const {data} = await $host.get('api/review/all')
  return data
}

export const getReview = async (id) => {
  const {data} = await $host.get('api/review/' + id)
  return data
}

export const getPaginationReviews = async (mark, isChecked, limit, page) => {
  const {data} = await $host.get('api/review/pagination', {params: {mark: mark, isChecked: isChecked, limit: limit, page: page}})
  return data
}

export const deleteReview = async (id) => {
  const {data} = await $authHost.delete('api/review/' + id)
  return data
}

export const patchReview = async (id, review) => {
  const {data} = await $authHost.patch('api/review/' + id, review)
  return data
}