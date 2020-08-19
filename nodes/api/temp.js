
const fs = require("fs")
const path = require("path");
const CodePath = "G:\\aoneQt\\";// 代码路径
const { spawn } = require('child_process');
exports.getTemp = function (req,res){// 获取模板
    let obj = new Object();
    let body = req.body;
    let filesObj = [];
     
    async function temp() {
       await GetFile(body.href).then((files,reject)=>{
            for(let i = 0 ; i < files.length; i++) {
                if(!files[i].includes('.')){
                //     GetFile(body.href + "\\" + files[i]).then(temps=>{
                        let nodemodules = false;
                //         if(temps){
                //             nodemodules = true
                //         }
                //         filesObj.push({
                //             file: files[i],
                //             nodemodules: nodemodules
                //         })
                //     }).catch(()=>{})
                    filesObj.push({
                        file: files[i],
                        nodemodules: nodemodules
                    })
                }
               
            }
            obj.status_code = 200;
            obj.item = filesObj;
            res.json(obj);
        }).catch(err=>{
            obj.status_code = 400;
            obj.message = "路径有误";
            res.json(obj);
        })
    }
    temp()
}
exports.install = function (req,res){// 初始化下载node
    let body = req.body;
    let obj = new Object();
    if( body.temp ){
        console.log("开始初始化-----",CodePath + body.temp)
        const serve = spawn('npm install',{
            cwd:CodePath + body.temp,
            shell: true
        })

        serve.once('close', function () {
            console.log("初始化完成-----",CodePath + body.temp)
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
    if( body.temp && body.edition){
        const serve = spawn('npm run build',{
            cwd:CodePath + body.temp,
            shell: true
        });
        


        

       
        
       
        // 执行完成触发
        serve.once('close', function () {
            console.log("打包完成-----执行拷贝",CodePath + body.temp)
            
            let Desktop = require('path').join(require('os').homedir(), 'Desktop') + "\\dist"; // 桌面路径
            fs.mkdirSync(Desktop);//创建dist文件夹
            copyFolder(CodePath + body.temp + "\\temp",Desktop).then(()=>{
                obj.status_code = 200;
                obj.message =  "已在桌面生成dist文件夹";
                res.json(obj);
            })
        })

        function copyFolder(from, to){ // 复制文件夹到指定目录
            return new Promise((resolve,reject)=>{
                let files = [];
                files = fs.readdirSync(from);
            
                files.forEach(file=> {// 遍历temp 文件夹

                    let targetPath = from + "/" + file;
                    let toPath = to + '/' + file;
                    if (fs.statSync(targetPath).isDirectory()) {// 判断temp下是否是文件夹

                        fs.mkdirSync(toPath);// 新建文件夹
                        fs.readdirSync(targetPath).forEach(data=>{// 遍历temp文件夹下面的文件夹
                            let tempFile = targetPath+"/"+ data;
                            let DesktopFile = toPath+"/"+ data;
                            if (fs.statSync(tempFile).isDirectory()) {// 判断temp下是否是文件夹

                                fs.mkdirSync(DesktopFile);// 新建temp下文件夹 的 文件夹
                                fs.readdirSync(tempFile).forEach(children=>{// 遍历temp文件夹下面的文件夹
                                    let tempFile1 = tempFile+"/"+ children;
                                    let DesktopFile1 = DesktopFile+"/"+ children;
                                    fs.copyFileSync(tempFile1, DesktopFile1);
                                })
                                
                            } else {
                                fs.copyFileSync(tempFile, DesktopFile);
                            }
                        })
                    } else {// 拷贝文件
                        fs.copyFileSync(targetPath, toPath);
                    }
                });
                resolve()
            })
        };
    } else {
        obj.status_code = 400;
        obj.message =  "参数有误";
        res.json(obj);
    }
}

function GetFile(href) {// 获取指定路径下的文件夹
    return new Promise((resolve,reject)=>{
        fs.readdir(href,function (err,files) {
            if(err){
                reject(false)
                throw err
            }
            resolve(files)
        })
    })
    
}

