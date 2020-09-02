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
exports.adminCode = function (req,res){// 获取后台代码
    if(req.body.path) {
        fs.readdir(req.body.path,function (err,files) {
            if(err){
                throw err
            }
            let arr = [];
            files.forEach(data=>{
                if(!data.includes('.')){
                    arr.push(data)    
                }
            })
            res.json({
                item: arr,
                status_code: 200
            })
        })
    } else {
        res.json({
            message: "path不能为空",
            status_code: 400
        })
    }
};
exports.adminInstall = function (req,res){// 初始化网站后台代码
    
    if(typeof req.body.temp === "object") {
        let body = req.body,
            obj = new Object(),
            index = 0,
            tempLen = body.temp.length-1;
        
        install()
        function install() {
            const serve = spawn('npm install',{
                cwd:body.href + "\\" + body.temp[index],
                shell: true
            })
            serve.once('close', function () {
                console.log(body.href + "\\" + body.temp[index]+"---初始化完成")
               index++
               
                if(index > tempLen){
                    obj.status_code = 200;
                    obj.message =  "初始化完成";
                    res.json(obj);
                } else {
                    install()
                }
            })
        }
    } else {
        res.json({
            message: "path不能为空",
            status_code: 400
        })
    }
};
exports.adminBuild = function (req,res){// 打包网站后台代码
    
    if(body.newEdition) {
        const serve = spawn('npm run build:up',{
            cwd:global.href + "\\" + body.temp,
            shell: true
        });
        // 执行完成触发
        serve.once('close', function () {
            //改名
            let Desktop = require('path').join(require('os').homedir(), 'Desktop'); // 桌面路径
            let oldpath = Desktop + "\\admin\\"+body.temp+"\\temp";
            let newpath = Desktop + "\\admin\\"+body.temp+"\\"+body.newEdition
            fs.rename(oldpath,newpath,function (err) {
                if(err){
                    obj.status_code = 400;
                    obj.message =  body.temp+"打包失败";
                    res.json(obj);
                    return
                }
                res.json({
                    message: "打包成功",
                    status_code: 200
                })
               
            });
        })
    } else {
        res.json({
            message: "请输入版本号",
            status_code: 400
        })
    }
};
