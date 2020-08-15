import axios from "axios"
const httpServer = axios.create({
    baseURL: process.env.VUE_APP_PROJET_API,// 接口api 地址
    timeout: 40000,
})
// 请求拦截
httpServer.interceptors.request.use(config=>{
    config.headers["device"] = "PC"
    config.headers['token'] = ""
    return config
})

// 响应拦截
httpServer.interceptors.response.use(response=>{
    const data = response.data
    if(data.status_code === 200) {
        return data
    }else if(data.status_code === 400){
        alert(data.message)
        return Promise.reject(data.message)
    } else {
        return Promise.reject(data.message)
    }
},error=>{
    console.log(error)
   return Promise.reject(error)
})
export default httpServer