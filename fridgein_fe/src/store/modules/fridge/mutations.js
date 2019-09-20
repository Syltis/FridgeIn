import * as types from './mutation_types'

export default {
  [types.FRIDGE_UPDATE_FOOD]: (state, payload) => {
    state.food = payload
  },
  [types.FRIDGE_UPDATE_STOCK]: (state, payload) => {
    state.stock = payload
  }
}