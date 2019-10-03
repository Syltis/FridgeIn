import * as types from './mutation_types'

export const actions = {
  updateFood: ({ commit }, payload) => {
    commit(types.FRIDGE_UPDATE_FOOD, payload);
  },
  updateNewStock: ({ commit }, payload) => {
    commit(types.FRIDGE_UPDATE_NEWSTOCK, payload);
  },
  addFood: ({ commit, state }, payload) => {
    var newFood = true;
    state.food.forEach(f => {
      if (f.name == payload.name
        && f.type == payload.type) {
        newFood = false;
      }
    });
    if (newFood) {
      commit(types.FRIDGE_ADD_FOOD, payload);
    }
    let newArr = [];
    payload.stockitem.forEach(s => {
      s.food = payload;
      s.food.stockitem = [];
      newArr.push(s);
    });
    console.log(newArr);
    commit(types.FRIDGE_ADD_STOCK, newArr);
    // var newStock = true;
    // if (state.stock.length > 0) {
    //   for (var i = 0; i < state.stock.length; i++) {
    //     if (state.stock[i].length > 0
    //       && state.stock[i][0].food.name == newArr[0].food.name
    //       && state.stock[i][0].food.type == newArr[0].food.type
    //       && state.stock[i][0].purchaseDate == newArr[0].purchaseDate
    //       && state.stock[i][0].expirationDate == newArr[0].expirationDate) {
    //       commit(types.FRIDGE_SET_STOCK, { data: state.stock[i].concat(newArr), index: i });
    //       newStock = false;
    //       break;
    //     }
    //   }
    // }
    // if (newStock) {
    //   commit(types.FRIDGE_ADD_STOCK, newArr);
    // }
  },
  addStock: ({ commit }, payload) => {
    commit(types.FRIDGE_ADD_STOCK, payload);
  },
  deleteStock: ({ commit }, payload) => {
    commit(types.FRIDGE_DELETE_STOCK, payload);
  }
}