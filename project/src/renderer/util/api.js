import request from "./request"
const config = {
    Route: "/api/router",// 导航
    SetConfig: "/api/setConfig",// 打包配置
    Login: "/api/login",// 登陆
    UserInfo: "/api/userInfo",// 会员信息
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