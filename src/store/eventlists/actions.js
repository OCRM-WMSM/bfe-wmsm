import * as types from './mutation-types'

export default {
  saveEventlists({commit}, events) {
    commit(types.SAVE_EVENTLISTS, events)
  },

  saveVisableDays({commit}, days) {
    commit(types.SAVE_VISABLEDAYS, days)
  }
}
