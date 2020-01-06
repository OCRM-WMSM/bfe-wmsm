import * as types from './mutation-types'

export default {
  saveLocale({commit}, locale) {
    commit(types.SAVE_LOCALE, locale)
  },
  saveToken({commit}, token) {
    commit(types.SAVE_TOKEN, token)
  },
  saveUser({commit}, payload) {
    commit(types.SAVE_USER, payload.user)
    commit(types.SAVE_TOKEN, payload.token)
  },
  logout({commit}) {
    commit(types.LOGOUT)
  }
}
