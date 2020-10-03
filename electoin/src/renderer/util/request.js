import axios from "axios"
import router from "../router/index"
import fs from "fs"
const httpServer = axios.create({
    baseURL: 'http://192.168.0.113:9527/',// 接口api 地址
    timeout: 40000,
})
// 请求拦截
httpServer.interceptors.request.use(config=>{
    config.headers["device"] = "PC"
    config.headers['token'] = window.localStorage.getItem("key") || ""
    return config
})

// 响应拦截
httpServer.interceptors.response.use(response=>{
    const data = response.data
    if(data.status_code === 200) {
        return data
    }else if(data.status_code === 400){
        vm.$message.error(data.message);
        return Promise.reject(data.message)
    } else if(data.status_code === 401){// 需要到登录页面
        fs.writeFile("./login.json"),JSON.stringify({1:1}),err=>{
            if (err) {
                vm.$message.error("清除失败联系管理员");
                return Promise.reject(data.message)
            }
            this.$router.push('/home')
        }
        router.push('login')
        return Promise.reject(data.message)
    }else {
        return Promise.reject(data.message)
    }
},error=>{
  
   return Promise.reject(error)
})
export default httpServer