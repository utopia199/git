const express = require("express");// npm install express --save
const app = require('./router/index.js');
const path = require("path");
const fs = require("fs");
const sio = require('socket.io');// npm install socket.io --save
// npm install -g supervisor  解决修改代码后需要重新运行   supervisor app.js

// MongnoDB 数据库
const MongoClient = require('mongodb').MongoClient;// npm install mongodb --save

global.GET_MONGONDB = function(callback,tab) {// 连接数据库 node
    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb://127.0.0.1:27017/";
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if(err) throw err
        let dbs = db.db("election");
        callback(dbs,db)
    })
}