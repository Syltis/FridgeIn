import * as types from './mutation_types'

export const actions = {
  updateFood: ({ commit }, payload) => {
    commit(types.FRIDGE_UPDATE_FOOD, payload);
  },
  updateStock: ({ commit }, payload) => {
    commit(types.FRIDGE_UPDATE_STOCK, payload);
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
    let newStock = [];
    payload.stockitem.forEach(s => {
      s.food = payload;
      s.food.stockitem = [];
      newStock.push(s);
    });
    commit(types.FRIDGE_ADD_STOCK, newStock);
  },
  deleteStock: ({ commit }, payload) => {
    commit(types.FRIDGE_DELETE_STOCK, payload);
  }
}