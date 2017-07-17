import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  idCard:'360622199202035337',
  idName: '胡公满',
  authCode:'',
  steps:0,
  authTitle:'',
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})