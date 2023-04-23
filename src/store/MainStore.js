import {makeAutoObservable} from "mobx";

export default class MainStore {
  constructor() {
    this._tariffs = []
    this._faqs = []
    this._reviews = []
    this._selecredReviewsMark = {}
    this._selectedReviewsIsChecked = {}
    this._favoriteingredients = []
    this._unlovedingredients = []

    this._pageFaqs = 1
    this._pageReviews = 1
    this._totalCountFaqs = 0
    this._totalCountReviews = 0
    this._limitFaqs = 3
    this._limitReviews = 3
    makeAutoObservable(this)
  }

  setTariffs(tariffs) {
    this._tariffs = tariffs
  }

  setFaqs(faqs) {
    this._faqs = faqs
  }

  setReviews(reviews) {
    this._reviews = reviews
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
  setPageReviews(page) {
    this._pageReviews = page
  }
  setTotalCountFaqs(count) {
    this._totalCountFaqs = count
  }
  setTotalCountReviews(count) {
    this._totalCountReviews = count
  }

  setSelectedReviewsMark(mark) {
    this.setPageReviews(1)
    this._selecredReviewsMark = mark
  }
  setSelectedReviewsIsChecked(isChecked) {
    this.setPageReviews(1)
    this._selectedReviewsIsChecked = isChecked
  }
  get tariffs() {
    return this._tariffs
  }

  get faqs() {
    return this._faqs
  }
  get reviews() {
    return this._reviews
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
  get totalCountReviews() {
    return this._totalCountReviews
  }
  get pageFaqs() {
    return this._pageFaqs
  }
  get pageReviews() {
    return this._pageReviews
  }
  get selectedReviewsMark() {
    return this._selecredReviewsMark
  }
  get selectedReviewsIsChecked() {
    return this._selectedReviewsIsChecked
  }
  get limitFaqs() {
    return this._limitFaqs
  }
  get limitReviews() {
    return this._limitReviews
  }
}