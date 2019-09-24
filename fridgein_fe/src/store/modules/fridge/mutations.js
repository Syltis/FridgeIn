import * as types from './mutation_types'

export default {
  [types.FRIDGE_UPDATE_FOOD]: (state, payload) => {
    state.food = payload;
  },
  [types.FRIDGE_UPDATE_STOCK]: (state, payload) => {
    state.stock = payload;
  },
  [types.FRIDGE_ADD_FOOD]: (state, payload) => {  
    state.food.push(payload);
    let newArr = [];
    payload.stockitem.forEach(element => {
      element.food = payload;
      element.food.stockitem = [];
      newArr.push(element);
    })
    state.stock.push(newArr);
  },
  [types.FRIDGE_DELETE_STOCK]: (state, payload) => {
    state.stock.forEach(element => {
      if (element.some(x => x.stockitemId == payload)) {
        for(var i = element.length - 1; i >= 0; --i) {
          if (element[i].stockitemId == payload) {
            element.splice(i, 1);
          }
        }
      }
    });
  }
}