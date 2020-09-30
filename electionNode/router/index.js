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

app.post("/api/login", require("../api/user.js").Login);// 登录



// 动态获取IP地址
let networkInterfaces = os.networkInterfaces();
let IParr = new Object()
for(let k in networkInterfaces){
    IParr=(networkInterfaces[k])
}

let server = app.listen(9527, IParr[1].address, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("\n地址为 http://%s:%s", host, port);
    
});
global.build = false // 判断是否是在执行打包

module.exports = app;