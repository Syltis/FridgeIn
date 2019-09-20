import * as types from './mutation_types'

export default {
  updateUser: ({ commit }, payload) => {
    commit(types.APP_UPDATE_USER, payload)
  }
}