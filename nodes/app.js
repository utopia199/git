const express = require("express");
const app = require('./router/index.js');
const path = require("path");
const fs = require("fs");
// const querystring = require("querystring");
// npm install -g supervisor  解决修改代码后需要重新运行   supervisor app.js

var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost', // 主机名
//   user     : 'root',// 用户名
//   password : '123456b',// 密码
// //   database : 'demo'// 数据库名称
// });
 
// connection.connect();// 创建连接
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
// connection.query("CREATE DATABASE demo", (err, result) => {
//     if(err) throw err;
//     console.log(result);
//     res.send('Database created...');
// })




// 原本应该是操作数据库的方法
global.GET_FILE_CONTENT = function (file){// 读取文件内容
    return new Promise((resolve,reject)=>{
        fs.readFile(file,"utf-8",function(error,data){
            if( error ){
                reject(error)
            } else {
                let datas = JSON.parse(data)
                resolve(datas)    
            }
        })
    })
    
}
global.SET_FILE_CONTENT = function (req){// 写入文件内容
    
}