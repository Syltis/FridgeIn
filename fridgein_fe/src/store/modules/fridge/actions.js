import * as types from './mutation_types'

export default {
  updateFood: ({ commit }, payload) => {
    commit(types.FRIDGE_UPDATE_FOOD, payload);
  },
  updateStock: ({ commit }, payload) => {
    commit(types.FRIDGE_UPDATE_STOCK, payload);
  }
}