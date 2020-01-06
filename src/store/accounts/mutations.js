import * as types from './mutation-types'

export default {
  [types.SAVE_ACCOUNTS](state, accounts) {
    state.accountList = accounts
  }
}
