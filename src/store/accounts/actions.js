import * as types from './mutation-types'

export default {
  saveAccounts({commit}, accounts) {
    commit(types.SAVE_ACCOUNTS, accounts)
  }
}
