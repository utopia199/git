const fs = require("fs");
const { spawn } = require('child_process');

exports.upCode = function (req,res){// 执行svnup
    if(req.body.path) {
        let Client = require('svn-spawn');  
        let client = new Client({
            cwd: req.body.path,
            username: 'yegang666',
            password: '6fUTLStn!e',
            noAuthCache: true,
        });
        client.update(function(err, data) {
            if(err){
                throw err
            }
            if(data.includes("Updated to revision")); {
                res.json({
                    message: data,
                    status_code: 200
                })
            }
        });
    } else {
        res.json({
            message: "path不能为空",
            status_code: 200
        })
    }
};