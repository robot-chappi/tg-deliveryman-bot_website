import {makeAutoObservable} from "mobx";

export default class MainStore {
  constructor() {
    this._tariffs = []
    this._faqs = []
    this._favoriteingredients = []
    this._unlovedingredients = []

    this._pageFaqs = 1
    this._totalCountFaqs = 0
    this._limitFaqs = 3
    makeAutoObservable(this)
  }

  setTariffs(tariffs) {
    this._tariffs = tariffs
  }

  setFaqs(faqs) {
    this._faqs = faqs
  }
  setFavoriteIngredients(favoriteIngredients) {
    this._favoriteingredients = favoriteIngredients
  }
  setUnlovedIngredients(unlovedIngredients) {
    this._unlovedingredients = unlovedIngredients
  }


  setPageFaqs(page) {
    this._pageFaqs = page
  }
  setTotalCountFaqs(count) {
    this._totalCountFaqs = count
  }

  get tariffs() {
    return this._tariffs
  }

  get faqs() {
    return this._faqs
  }
  get favoriteIngredientItems() {
    return this._favoriteingredients
  }
  get unlovedIngredientItems() {
    return this._unlovedingredients
  }

  get totalCountFaqs() {
    return this._totalCountFaqs
  }
  get pageFaqs() {
    return this._pageFaqs
  }
  get limitFaqs() {
    return this._limitFaqs
  }
}