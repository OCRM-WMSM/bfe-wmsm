import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const accounts = {
  state: {
    accountList: []
  },
  mutations: mutations,
  actions: actions,
  getters: getters
}

export default accounts
