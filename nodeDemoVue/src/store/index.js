import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    typeList: null
  },
  mutations: {
    SET_ASIDE(state,data) {// 设置侧边栏
      state.typeList = data.items
    }
  },
  actions: {
  },
  modules: {
  }
})
