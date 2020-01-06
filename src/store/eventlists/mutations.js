import * as types from './mutation-types'

export default {
  [types.SAVE_EVENTLISTS](state, events) {
    state.events = events
  },

  [types.SAVE_VISABLEDAYS](state, days) {
    state.visableDays = days
  }

}
