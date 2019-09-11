import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stockListComponentKey: 0,
        foodSelectComponentKey: 0,
    },
    getters: {
        STOCKCOMPONENTKEY (state) {
            return state.stockListComponentKey;
            
        },
        FOODCOMPONENTKEY (state) {
            return state.foodSelectComponentKey;
        },
    },
    mutations: {
        UPDATE_STOCKCOMPONENTKEY (state) {
            state.stockListComponentKey++;
        },
        UPDATE_FOODSELECTCOMPONENTKEY (state) {
            state.foodSelectComponentKey++;
        }
    },
    actions: {
        RERENDER_STOCKLISTCOMPONENT (context) {
            context.commit('UPDATE_STOCKCOMPONENTKEY');
        },
        RERENDER_FOODSELECTCOMPONENT (context) {
            context.commit('UPDATE_FOODSELECTCOMPONENTKEY');
        }
    }
})