
import fs from "fs";
import api from "@/util/api.js"
import router from "@/router/index.js"
const state = {
  userInfo: new Object()
}

const getters = {
   
}

const actions = {
    getUserInfo({commit},data) {// 获取会员信息
        return new Promise((resolve,reject)=>{
            fs.readFile("./login.json",'utf-8',(err,data)=>{
                if(err) {
                    reject({message: "获取会员信息失败请重新登录"})
                    return 
                }else {
                    if(data && data !=="undefined") {
                        let userinfo = JSON.parse(data)
                        api.UserInfo({key: Object.values(userinfo)[0]}).then(res=>{
                            commit("SET_USER_INFO",res)
                            resolve(res)
                        }).catch(rej=>{

                        })
                    
                    } else {
                        reject({message: "获取会员信息失败请重新登录"})
                    }
                    
                }
            })
        })
        
    }
}

const mutations = {
    SET_USER_INFO(state,data) {
        delete data.status_code 
        data.head = data.head || require("../../assets/heade1.jpg")
        state.userInfo = data
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}