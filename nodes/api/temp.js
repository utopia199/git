
const fs = require("fs")
const { spawn } = require('child_process');
exports.getTemp = function (req,res){// 获取模板
    let obj = new Object();
    let body = req.body;
    fs.readdir(body.href,function (err,files) {
        let filesObj = [];
        if(err){
            obj.status_code = 400;
            obj.message = "路径有误";
            res.json(obj);
            return
        }
        for(let i = 0 ; i < files.length; i++) {
            if(!files[i].includes('.')){
                filesObj.push(files[i])
            }
        }
        obj.status_code = 200;
        obj.item =  filesObj;
        res.json(obj);    
    })
}
exports.install = function (req,res){// 初始化下载node
    let body = req.body;
    let obj = new Object();
    if( body.temp ){
        console.log("开始初始化-----",'G:\\aoneQt\\' + body.temp)
        const serve = spawn('npm install',{
            cwd:'G:\\aoneQt\\' + body.temp,
            shell: true
        })

        serve.once('close', function () {
            console.log("初始化完成-----",'G:\\aoneQt\\' + body.temp)
            obj.status_code = 200;
            obj.message =  "初始化完成";
            res.json(obj);
        })
    } else {
        obj.status_code = 400;
        obj.message =  "参数有误";
        res.json(obj);
    }
    
}
exports.build = function (req,res){// 打包模板
    let body = req.body;
    let obj = new Object();
    if( body.temp ){
        console.log("开始打包-----",'G:\\aoneQt\\' + body.temp)
        const serve = spawn('npm run build',{
            cwd:'G:\\aoneQt\\' + body.temp,
            shell: true
        })

        // 执行完成触发
        serve.once('close', function () {
            console.log("打包完成-----",'G:\\aoneQt\\' + body.temp)
            obj.status_code = 200;
            obj.message =  "打包完成";
            res.json(obj);
        })
    } else {
        obj.status_code = 400;
        obj.message =  "参数有误";
        res.json(obj);
    }
}

