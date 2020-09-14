const express = require("express");
const app = require('./router/index.js');
const path = require("path");
const fs = require("fs");
// npm install -g supervisor  解决修改代码后需要重新运行   supervisor app.js
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://127.0.0.1:27017/";
 
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    // if (err) throw err;
//   console.log("数据库已创建!");
//   db.close();
   
// });
// dbo.collection("node"). find({}).toArray(function(err, result) { // 返回集合中所有数据
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });


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