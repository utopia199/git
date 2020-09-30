import request from "./request"
const config = {
    Login: "/api/login",// 登录
}


let exports = new Object()
for(var k in config){
    let url = config[k]
    exports[k] = function (data,type){
        return request({
            url: url,
            method: type ? type : "post" ,
            data
        })
    }
}
export default exports