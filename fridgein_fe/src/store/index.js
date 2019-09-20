import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

import appModule from '@/store/modules/app'
import fridgeModule from '@/store/modules/fridge'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stockListComponentKey: 0,
        foodSelectComponentKey: 0,
        token: localStorage.getItem('user-token') || '',
        status: ''
    },
    plugins: [
        createPersistedState({
            paths: ["fridge"],
            storage: {
                getItem: key => Cookies.get(key),
                setItem: (key, value) =>
                    Cookies.set(key, value, { expires: 3, secure: true }),
                removeItem: key => Cookies.remove(key)
            }
        })
    ],
    getters: {
        STOCKCOMPONENTKEY(state) {
            return state.stockListComponentKey;

        },
        FOODCOMPONENTKEY(state) {
            return state.foodSelectComponentKey;
        },
        USER(state) {
            return state.user;
        }
    },
    mutations: {
        UPDATE_STOCKCOMPONENTKEY(state) {
            state.stockListComponentKey++;
        },
        UPDATE_FOODSELECTCOMPONENTKEY(state) {
            state.foodSelectComponentKey++;
        },
        SET_USER(state, user) {

            state.user.id = user.userId;
            state.user.email = user.email;
            state.user.name = user.name;
        }
    },
    actions: {
        RERENDER_STOCKLISTCOMPONENT(context) {
            context.commit('UPDATE_STOCKCOMPONENTKEY');
        },
        RERENDER_FOODSELECTCOMPONENT(context) {
            context.commit('UPDATE_FOODSELECTCOMPONENTKEY');
        },
        SET_USER(context, user) {
            context.commit('SET_USER', user);
        }
    },
    modules: {
        app: appModule,
        fridge: fridgeModule
    }
})