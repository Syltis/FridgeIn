import * as types from './mutation_types'

export const mutations = {
  [types.FRIDGE_UPDATE_FOOD]: (state, payload) => {
    state.food = payload;
  },
  [types.FRIDGE_UPDATE_STOCK]: (state, payload) => {
    state.stock = payload;
  },
  [types.FRIDGE_ADD_FOOD]: (state, payload) => {
    state.food.push(payload);
  },
  [types.FRIDGE_ADD_STOCK]: (state, payload) => {
    state.stock = state.stock.concat(payload);
  },
  [types.FRIDGE_DELETE_STOCK]: (state, payload) => {
    for (var i = state.stock.length - 1; i >= 0; --i) {
      if (state.stock[i].stockitemId == payload) {
        state.stock.splice(i, 1);
      }
    }
  }
}