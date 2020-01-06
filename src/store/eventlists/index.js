import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const eventlists = {
  state: {
    events: [],
    visableDays: []
  },
  mutations: mutations,
  actions: actions,
  getters: getters
}

export default eventlists
