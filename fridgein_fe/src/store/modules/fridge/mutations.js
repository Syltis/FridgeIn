import * as types from './mutation_types'
import Vue from 'vue'

export const mutations = {
  [types.FRIDGE_UPDATE_FOOD]: (state, payload) => {
    state.food = payload;
  },
  [types.FRIDGE_UPDATE_NEWSTOCK]: (state, payload) => {
    state.newStock = payload;
  },
  [types.FRIDGE_ADD_FOOD]: (state, payload) => {
    state.food.push(payload);
  },
  [types.FRIDGE_ADD_STOCK]: (state, payload) => {
    state.newStock = state.newStock.concat(payload);
    console.log("concatted");
    console.log(payload);
  },
  [types.FRIDGE_SET_STOCK]: (state, payload) => {
    Vue.set(state.stock, payload.index, payload.data);
  },
  [types.FRIDGE_DELETE_STOCK]: (state, payload) => {
    for (var i = state.newStock.length - 1; i >= 0; --i) {
      if (state.newStock[i].stockitemId == payload) {
        state.newStock.splice(i, 1);
      }
    }
  }
}