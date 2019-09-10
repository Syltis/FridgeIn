import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stockComponentKey: 0
    },
    getters: {
        STOCKCOMPONENTKEY (state) {
            return state.stockComponentKey;
        }
    },
    mutations: {
        UPDATE_STOCKCOMPONENTKEY (state) {
            state.stockComponentKey++;
        }
    },
    actions: {
        RERENDER_STOCKLISCOMPONENT (context) {
            context.commit('UPDATE_STOCKCOMPONENTKEY');
        }
    }
})