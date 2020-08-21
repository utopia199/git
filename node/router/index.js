const express=require("express");
const os = require("os");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");// 处理post参数 通过req.body获取
const fs = require("fs")

app.use(express.static("./"));// 访问Html

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置跨域访问
app.all("*", function(req, res, next) {
    // 设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    // 允许的header类型
    res.header("Access-Control-Allow-Headers","content-type,token,device");
    // 跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","POST,GET");
    res.header("Access-Content-Type","application/x-www-form-urlencoded");
    // 通过请求头获取代码的路径
    if (req.url === '/api/getDataBase') {
        global.href = req.headers.path
    }
    next();
});


// 404 拦截
app.get('*', function(req, res){
    res.render( {
        title: 'No Found'
    })
});

app.post("/api/type/list", require("../api/list.js").get);// 列表路由

app.post("/api/getData", require("../api/data.js").get);// 获取详情

app.post("/api/setData", require("../api/data.js").set);// 设置详情

app.post("/api/addList", require("../api/list.js").set);// 获取详情

app.post("/api/delList", require("../api/list.js").del);// 删除详情

app.post("/api/ediList", require("../api/list.js").edi);// 修改详情

app.post("/api/getDataBase", require("../api/temp.js").getTemp);// 获取模板

app.post("/api/getUpdata", require("../api/updata.js").getUpdata);// 获取更新日志

app.post("/api/install", require("../api/temp.js").install);// 初始化

app.post("/api/build", require("../api/temp.js").build);// 打包

app.post("/api/upcode", require("../api/upcode").upCode);// 更新代码

app.post("/api/getAdmin", require("../api/upcode").adminCode);// 获取网站后台代码

app.post("/api/adminInstall", require("../api/upcode").adminInstall);// 初始化网站后台代码

app.post("/api/adminBuild", require("../api/upcode").adminBuild);// 打包网站后台代码


// 动态获取IP地址
let networkInterfaces = os.networkInterfaces();
let IParr = new Object()
for(let k in networkInterfaces){
    IParr=(networkInterfaces[k])
}

let server = app.listen(9191, IParr[1].address, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("\n地址为 http://%s:%s", host, port);
    
});

module.exports = app;