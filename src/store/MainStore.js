import {makeAutoObservable} from "mobx";

export default class MainStore {
  constructor() {
    this._tariffs = []
    this._faqs = []
    this._reviews = []
    this._users = []
    this._selecredReviewsMark = {}
    this._selectedReviewsIsChecked = {}
    this._selectedUsersRoleId = {}
    this._selectedUsersTariffId = {}
    this._favoriteingredients = []
    this._unlovedingredients = []

    this._pageFaqs = 1
    this._pageReviews = 1
    this._pageUsers = 1
    this._totalCountFaqs = 0
    this._totalCountReviews = 0
    this._totalCountUsers = 0
    this._limitFaqs = 3
    this._limitReviews = 3
    this._limitUsers = 3
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

  setUsers(users) {
    this._users = users
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
  setPageUsers(page) {
    this._pageUsers = page
  }
  setTotalCountFaqs(count) {
    this._totalCountFaqs = count
  }
  setTotalCountReviews(count) {
    this._totalCountReviews = count
  }
  setTotalCountUsers(count) {
    this._totalCountUsers = count
  }

  setSelectedReviewsMark(mark) {
    this.setPageReviews(1)
    this._selecredReviewsMark = mark
  }
  setSelectedReviewsIsChecked(isChecked) {
    this.setPageReviews(1)
    this._selectedReviewsIsChecked = isChecked
  }

  setSelectedUsersRoleId(roleId) {
    this.setPageUsers(1)
    this._selectedUsersRoleId = roleId
  }
  setSelectedUsersTariffId(tariffId) {
    this.setPageUsers(1)
    this._selectedUsersTariffId = tariffId
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
  get users() {
    return this._users
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
  get totalCountUsers() {
    return this._totalCountUsers
  }
  get pageFaqs() {
    return this._pageFaqs
  }
  get pageReviews() {
    return this._pageReviews
  }
  get pageUsers() {
    return this._pageUsers
  }
  get selectedReviewsMark() {
    return this._selecredReviewsMark
  }
  get selectedReviewsIsChecked() {
    return this._selectedReviewsIsChecked
  }
  get selectedUsersRoleId() {
    return this._selectedUsersRoleId
  }
  get selectedUsersTariffId() {
    return this._selectedUsersTariffId
  }
  get limitFaqs() {
    return this._limitFaqs
  }
  get limitReviews() {
    return this._limitReviews
  }
  get limitUsers() {
    return this._limitUsers
  }
}