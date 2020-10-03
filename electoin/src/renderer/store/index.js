import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState(),
    // createSharedMutations()// 多进程数据共享
  ],

  strict: process.env.NODE_ENV !== 'production'
})