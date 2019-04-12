import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';

Vue.use(Vuex);

const state = {
    accessToken: window.localStorage.getItem('accessToken'),
    userId: window.localStorage.getItem('userId')
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
