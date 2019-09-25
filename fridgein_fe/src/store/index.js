import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import appModule from '@/store/modules/app'
import fridgeModule from '@/store/modules/fridge'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('user-token') || '',
        status: ''
    },
    plugins: [
        createPersistedState({
            paths: ["fridge"]
        })
    ],
    modules: {
        app: appModule,
        fridge: fridgeModule
    }
})