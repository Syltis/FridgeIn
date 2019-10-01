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
    state.food.push(payload);
  },
  [types.FRIDGE_ADD_STOCK]: (state, payload) => {
    state.stock.push(payload);
  },
  [types.FRIDGE_ADD_STOCK_BYTYPE]: (state, payload) => {
    state.stockByType.push(payload);
  },
  [types.FRIDGE_SET_STOCK]: (state, payload) => {
    Vue.set(state.stock, payload.index, payload.data);
  },
  [types.FRIDGE_SET_STOCK_BYTYPE]: (state, payload) => {
    Vue.set(state.stockByType, payload.index, payload.data);
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
      if(s.length < 1) state.stock.splice(state.stock.indexOf(s), 1);
    });
  },
  [types.FRIDGE_DELETE_STOCK_BYTYPE]: (state, payload) => {
    state.stockByType.forEach(s => {
      if (s.some(x => x.stockitemId == payload)) {
        for (let i = s.length - 1; i >= 0; --i) {
          if (s[i].stockitemId == payload) {
            s.splice(i, 1);
          }
          
        }
        
      }
      if(s.length < 1) state.stockByType.splice(state.stockByType.indexOf(s), 1);
    })
  }
}