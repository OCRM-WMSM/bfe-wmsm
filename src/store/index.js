import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

import mutations from './mutations'
import actions from './actions'
import accounts from './accounts'
import eventlists from './eventlists'

Vue.use(Vuex)

const state = {
  locale: 'zh',
  user: {
    employeeId: '',
    name: '',
    gender: '',
    orgCode: '',
    empRole: '',
    lastMaintDate: '',
    onlineFlag: '',
    orgName: ''
  },
  token: null
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    accounts: accounts,
    eventlists: eventlists
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, stat) => Cookies.set(key, stat)
    })
  ]
})
