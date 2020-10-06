import axios from "axios"
import store from "../store/index.js"
import fs from "fs"
import router from "../router/index"
let api = JSON.parse(fs.readFileSync('./axiosConfig.json', 'utf-8'));

const httpServer = axios.create({
    baseURL: api.api,// 接口api 地址
    timeout: 40000,
})

// 请求拦截
httpServer.interceptors.request.use(config=>{
    config.headers['token'] = store.state.data.key
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
        let config = JSON.parse(fs.readFileSync('./axiosConfig.json', 'utf-8'));
        delete config.key 
        fs.writeFileSync('./axiosConfig.json', JSON.stringify(config))
        store.dispatch("GET_STATE").then(()=>{
            router.push('login')
        })
        return Promise.reject(data.message)

    }else {

        return Promise.reject(data.message)

    }
},error=>{
  
   return Promise.reject(error)
})
export default httpServer