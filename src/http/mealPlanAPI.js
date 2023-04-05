import {$authHost, $host} from "./index";

export const createMealPlanProduct = async (mealPlanProduct) => {
  const {data} = await $authHost.post('api/mealplan/', mealPlanProduct)
  return data
}

export const createMealPlanProducts = async (mealPlanProducts) => {
  const {data} = await $authHost.post('api/mealplan/products', mealPlanProducts)
  return data
}

export const createOrderMealPlanProducts = async (mealPlanProducts) => {
  const {data} = await $authHost.post('api/mealplan/order/products', mealPlanProducts)
  return data
}

export const getMealPlanProducts = async (id) => {
  const {data} = await $authHost.get('api/mealplan/all/' + id)
  return data
}

export const getOrderMealPlanProducts = async (orderId) => {
  const {data} = await $host.get('api/mealplan/user/all/' + orderId)
  return data
}

export const deleteMealPlanProduct = async (mealPlanProduct) => {
  const {data} = await $authHost.delete('api/mealplan', mealPlanProduct)
  return data
}

export const deleteMealPlanProducts = async (id) => {
  const {data} = await $authHost.delete('api/mealplan/all/', id)
  return data
}

export const patchPriceMealPlan = async (id, price) => {
  const {data} = await $authHost.patch('api/mealplan/price/' + id, price)
  return data
}