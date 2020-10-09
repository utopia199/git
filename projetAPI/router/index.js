const express=require("express");
const os = require("os");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");// 处理post参数 通过req.body获取
const fs = require("fs")
const sio = require('socket.io');

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
    
    next();
});


// 404 拦截
app.get('*', function(req, res){
    res.render( {
        title: 'No Found'
    })
});

app.post("/api/router", require("../api/router.js").Router);// 路由

app.post("/api/setConfig", require("../api/router.js").SetConfig);// 打包配置

app.post("/api/login", require("../api/user.js").Login);// 登陆、注册

app.post("/api/userInfo", require("../api/user.js").UserInfo);// 会员信息

app.post("/api/updata", require("../api/codeData.js").getUpdata);// 更新信息



const interfaces = require('os').networkInterfaces(); // 在开发环境中获取局域网中的本机iP地址
let IPAdress = '';
for(var devName in interfaces){  
  var iface = interfaces[devName];  
  for(var i=0;i<iface.length;i++){  
        var alias = iface[i];  
        if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
            IPAdress = alias.address;  
        }  
  }  
} 
app.listen(1528, IPAdress, function () {
    console.log("\nAPI地址为 http://"+IPAdress+':'+1528);
    
});
// socket开始

let socket = app.listen(1527, IPAdress, function () {
    console.log("\nsocket地址为 http://"+IPAdress+':'+1527);
    
});


// let io = sio.listen(socket);
// let lineNum = 0;
// io.sockets.on('connection', function(socket) {
//     socket.on('message', function (obj) {// 向大厅发送消息
//         global.GET_MONGONDB((dbs,db)=>{
//             dbs.collection("userInfo").find({key: obj.token }).toArray((err,reslut)=>{
//                 let userInfo = null
//                 if(reslut.length) {
//                     userInfo = {
//                         userName: reslut[0].userName,
//                         head: reslut[0].head,
//                         key: obj.token,
//                         message: obj.message,
//                         date: new Date().getTime()
//                     };
//                     io.sockets.emit('Message', userInfo);
//                     dbs.collection("message").insertOne(userInfo, function(err, resolve) {// 往数据库插入消息
//                         if(err){return }
//                         db.close()
//                     })
//                 }
                
               
//             })
//         })
//     });

//     socket.on("outLine",function(){// 离线
//         lineNum--
//     });

//     socket.on('OnLine', function (data) {// 用户上线发送状态
//         lineNum++
//         global.GET_MONGONDB((dbs,db)=>{
//             dbs.collection("userInfo").find({key: data}).toArray((err,reslut)=>{
//                 if(reslut.length) {
//                     let userInfo = {
//                         userName: reslut[0].userName,
//                         head: reslut[0].head,
//                         key: data,
//                         date: new Date().getTime(),
//                         num: lineNum
//                     };
//                     io.sockets.emit('State', userInfo);
//                     dbs.collection("message").find().toArray((err,result)=>{// 推送所有的消息
//                         if(err){ return }
//                         io.sockets.emit('Message', result);
//                         db.close()
//                     })
//                 }
//             })
//         })
//     });
// });

// socket结束

module.exports = app;