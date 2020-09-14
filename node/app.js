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
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    
    const dbase = db.db("node"); // 获取表
    // dbase.createCollection('log', function (err, res) { // 创建集合
    //     if (err) throw err;
    //     console.log("创建集合!");
    //     db.close();
    // });

    let myobj = { name: "操作日志1", url: "tyestq1111" };
    dbase.collection("log").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });

    // dbase.collection("log").find({}).toArray(function(err, result) { // 返回集合中所有数据
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });

    // var whereStr = {"name":'操作日志1'};  // 查询条件
    // dbase.collection("site").find(whereStr).toArray(function(err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });
    // var whereStr = {"name":'菜鸟教程'};  // 查询条件
    // var updateStr = {$set: { "url" : "https://www.runoob.com" }};
    // dbase.collection("site").updateOne(whereStr, updateStr, function(err, res) {
    //     if (err) throw err;
    //     console.log("文档更新成功");
    //     db.close();
    // });
});



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