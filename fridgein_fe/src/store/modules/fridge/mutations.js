import * as types from './mutation_types'
import Vue from 'vue'

export const mutations = {
  [types.FRIDGE_UPDATE_FOOD]: (state, payload) => {
    state.food = payload;
  },
  [types.FRIDGE_UPDATE_STOCK]: (state, payload) => {
    state.stock = payload;
  },
  [types.FRIDGE_ADD_FOOD]: (state, payload) => {
    state.food.forEach(f => {
      if (f.name != payload.name
        && f.type != payload.type) {
        state.food.push(payload);
      }
    });
    let newArr = [];
    payload.stockitem.forEach(s => {
      s.food = payload;
      s.food.stockitem = [];
      newArr.push(s);
    });
    var newStock = true;
    if (state.stock.length > 0) {
      for (let i = 0; i < state.stock.length; i++) {
        console.log(state.stock[i][0]);
        console.log(newArr[0]);
        if (state.stock[i][0].food.name == newArr[0].food.name
          && state.stock[i][0].food.type == newArr[0].food.type
          && state.stock[i][0].purchaseDate == newArr[0].purchaseDate
          && state.stock[i][0].expirationDate == newArr[0].expirationDate) {
          const newStateStock = state.stock[i].concat(newArr); 
          Vue.set(state.stock, i, newStateStock);
          newStock = false;
          break;
        }
      }
    }
    if (newStock) {
      state.stock.push(newArr);
    }
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
  }
}