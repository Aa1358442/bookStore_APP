import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    userType: ''
  },
  mutations: {
    modifyTips (state, msg) {
      state.userType = msg
    },
    modifyAcct (state, acct) {
      state.userAcct = acct
    },
    modifyPass (state, pass) {
      state.userPass = pass
    }
  },
  getters: {

  },
  actions: {

  }
})

export default store
