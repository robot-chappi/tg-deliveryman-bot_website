import {makeAutoObservable} from "mobx";

export default class ProductStore {
  constructor() {
    this._types = []
    this._categories = []
    this._products = []
    this._favoriteproducts = []
    this._product = {}
    this._selectedType = {}
    this._selectedCategory = {}
    this._page = 1
    this._totalCount = 0
    this._limit = 3
    makeAutoObservable(this)
  }

  setTypes(types) {
    this._types = types
  }
  setCategories(categories) {
    this._categories = categories
  }
  setProducts(products) {
    this._products = products
  }
  setFavoriteProducts(favoriteproducts) {
    this._favoriteproducts = favoriteproducts
  }

  setProduct(product) {
    this._product = product
  }

  setSelectedType(type) {
    this.setPage(1)
    this._selectedType = type
  }
  setSelectedCategory(category) {
    this.setPage(1)
    this._selectedCategory = category
  }
  setPage(page) {
    this._page = page
  }
  setTotalCount(count) {
    this._totalCount = count
  }

  get types() {
    return this._types
  }
  get categories() {
    return this._categories
  }
  get products() {
    return this._products
  }
  get favoriteproducts() {
    return this._favoriteproducts
  }
  get product() {
    return this._product
  }
  get selectedType() {
    return this._selectedType
  }
  get selectedCategory() {
    return this._selectedCategory
  }
  get totalCount() {
    return this._totalCount
  }
  get page() {
    return this._page
  }
  get limit() {
    return this._limit
  }
}