import request from "./request"
const config = {
    Route: "/api/router",// 导航

    SetConfig: "/api/setConfig",// 打包配置

    Login: "/api/login",// 登陆

    UserInfo: "/api/userInfo",// 会员信息

    UpData: "/api/updata",// 更新的信息

    UpCode: "/api/upCode",// 更新代码

    CommCode: "/api/commCode",// 提交代码

    CodeInstall: "/api/install",// 初始化代码

    CodeBuild: "/api/build",// 打包代码
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