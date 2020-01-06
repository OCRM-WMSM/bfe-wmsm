import * as types from './mutation-types'

export default {
  [types.SAVE_TOKEN](state, token) {
    state.token = token
  },

  [types.SAVE_USER](state, user) {
    state.user = user
  },

  [types.LOGOUT](state) {
    state.token = null;
    state.user = {};
  },

  [types.SAVE_LOCALE](state, locale) {
    state.locale = locale
  }
}
