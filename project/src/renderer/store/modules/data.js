import fs from "fs"
import api from "../../util/api"
const state = {
  apiUrl: "",
  socketUrl: "",
  key: null,
  userInfo: new Object()
}

const mutations = {
  GET_STATE(state,data) {
    state.apiUrl = data.api
    state.socketUrl = data.scocket
    state.key = data.key
  },

  GET_USER_INFO(state,data) {
    delete data.status_code
    state.userInfo = data
  }
}

const actions = {
  GET_STATE({commit}) {// 获取初始配置
    return new Promise((resolve,reject)=>{
      let config = JSON.parse(fs.readFileSync('./axiosConfig.json', 'utf-8'));
      commit("GET_STATE",config)
      if(config.key) {// 判断是否是登陆
        api.UserInfo().then(res=>{
          commit("GET_USER_INFO",res)
          resolve(config)
        }).catch(err=>{
          reject(err)
        })
      }
      
    })
  },

  GET_USER_INFO({commit}) {// 获取用户信息
    return new Promise((resolve,reject)=>{
      api.UserInfo().then(res=>{
        resolve(res)
        commit("GET_USER_INFO",res)
      }).catch(err=>{
        reject(err)
      })
    })
    
  }
}

export default {
  state,
  mutations,
  actions,
}
