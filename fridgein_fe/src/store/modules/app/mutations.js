import * as types from './mutation_types'

export default {
  [types.APP_UPDATE_USER]: (state, payload) => {
    state.userId = payload.userId
    state.email = payload.email
  }
}