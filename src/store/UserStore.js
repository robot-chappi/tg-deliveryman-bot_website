import {makeAutoObservable} from 'mobx'

export default class UserStore {
  constructor() {
    this._isAuth = false
    this._isAdmin = false
    this._isCopywriter = false
    this._isAnalyst = false
    this._user = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }
  setIsAdmin(bool) {
    this._isAdmin = bool
  }
  setIsCopywriter(bool) {
    this._isCopywriter = bool
  }
  setIsAnalyst(bool) {
    this._isAnalyst = bool
  }
  setUser(user) {
    this._user = user
  }

  get isAuth() {
    return this._isAuth
  }
  get isAdmin() {
    return this._isAdmin
  }
  get isCopywriter() {
    return this._isCopywriter
  }
  get isAnalyst() {
    return this._isAnalyst
  }
  get user() {
    return this._user
  }
}