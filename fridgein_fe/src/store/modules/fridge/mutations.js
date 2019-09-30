import * as types from './mutation_types'
import Vue from 'vue'

export const mutations = {
  [types.FRIDGE_UPDATE_FOOD]: (state, payload) => {
    state.food = payload;
  },
  [types.FRIDGE_UPDATE_STOCK]: (state, payload) => {
    state.stock = payload;
  },
  [types.FRIDGE_UPDATE_STOCK_BYTYPE]: (state, payload) => {
    state.stockByType = payload;
  },
  [types.FRIDGE_ADD_FOOD]: (state, payload) => {
    state.food.push(payload)
  },
  [types.FRIDGE_ADD_STOCK]: (state, payload) => {
    state.stock.push(payload)
  },
  [types.FRIDGE_SET_STOCK]: (state, payload, i) => {
    Vue.set(state.stock, i, payload);
  },
  [types.FRIDGE_DELETE_STOCK]: (state, payload) => {
    state.stock.forEach(s => {
      if (s.some(x => x.stockitemId == payload)) {
        for (var i = s.length - 1; i >= 0; --i) {
          if (s[i].stockitemId == payload) {
            s.splice(i, 1);
          }
        }
      }
    });
  },
  [types.FRIDGE_DELETE_STOCK_BYTYPE]: (state, payload) => {
    console.log(payload);
    console.log(state);
  }
}