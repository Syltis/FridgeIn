import * as types from './mutation_types'

export const actions = {
  updateUser: ({ commit }, payload) => {
    commit(types.APP_UPDATE_USER, payload)
  }
}