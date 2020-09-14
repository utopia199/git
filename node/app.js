const express = require("express");
const app = require('./router/index.js');
const path = require("path");
const fs = require("fs");
// npm install -g supervisor  解决修改代码后需要重新运行   supervisor app.js

// MongnoDB 数据库
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

global.GET_MONGONDB = function(callback) {// 连接数据库
    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb://127.0.0.1:27017/";
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if(err) throw err
        const dbs = db.db("node"); // 获取表
        callback(dbs,db)
    })
}

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