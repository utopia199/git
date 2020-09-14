
const fs = require("fs")
const path = require("path");
const os = require("os");
const { spawn } = require('child_process');
exports.getTemp = function (req,res){// 获取模板
    let obj = new Object();
    let body = req.body;
    let filesObj = [];
    fs.readdir(global.href,function (err,files) {
        if(err){
            throw err
        }
        let fil = [];
        files.forEach((data,index)=>{
            if(!data.includes('.')){
                fs.readdir(global.href+'\\'+data,function (err,filess) {
                    filesObj.push({
                        file: files[index],
                        nodemodules: fs.existsSync(global.href+'\\'+data + "\\node_modules")
                    })
                    if(index === files.length-1){
                        obj.status_code = 200;
                        obj.item = filesObj;
                        res.json(obj);
                    }
                })
            }
        })
    })
    global.GET_MONGONDB((dbs,db)=>{
        let items = {
            a01_pc: [
                {temp:"a01_pc",time: "2020-01-01 12:12:12",oldNum: 1, newNum:2}
            ]
        }
        dbs.collection("updata").insertMany(items, function(err, res) {
            if (err) throw err;
            console.log(res)
            db.close();
        });
    })
    
}
exports.install = function (req,res){// 初始化下载node
    let body = req.body;
    let obj = new Object();
    if( typeof body.temp === "string"){
        console.log("开始初始化-----",global.href + "\\" +body.temp)
        const serve = spawn('npm install',{
            cwd:global.href + "\\" + body.temp,
            shell: true
        })
        serve.once('close', function () {
            console.log("初始化完成-----",global.href + "\\" + body.temp)
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
     
        if(global.build){// 避免多终端打包
            obj.status_code = 400;
            obj.message =  body.temp+"打包进行中请稍后";
            res.json(obj);
            return 
        } else {
            global.build =true
        }
        
    
		if(body.temp && body.newEdition && body.oldEdition>=0){
            
			const serve = spawn('npm run build:up',{
                cwd:global.href + "\\" + body.temp,
                shell: true
			});
			// 执行完成触发
			serve.once('close', function () {
				//改名
				let Desktop = require('path').join(require('os').homedir(), 'Desktop'); // 桌面路径
				let oldpath = Desktop + "\\dist\\"+body.temp+"\\temp";
				let newpath = Desktop + "\\dist\\"+body.temp+"\\"+body.newEdition
				fs.rename(oldpath,newpath,function (err) {
						if(err){
                            obj.status_code = 400;
                            obj.message =  body.temp+"打包失败";
                            obj.path =  require('os').homedir();
                            res.json(obj);
                            global.build = false
                            return
						}
						if(!fs.existsSync(Desktop + "\\dist\\instructions.txt")){
							fs.writeFile(Desktop + "\\dist\\instructions.txt", "cb3_up\\static\\site-qt目录下,替换同名文件夹", 'utf8', (err) => {
								if (!err) {
									// 动态获取IP地址
									let networkInterfaces = os.networkInterfaces();
									let IParr = new Object()
									for(let k in networkInterfaces){
                                        IParr=(networkInterfaces[k])
									}
									let updata = {}
									updata.temp = body.temp
									updata.times = time(new Date())
									updata.name = IParr[1].address
									updata.oldNum = body.oldEdition
									updata.newNum = body.newEdition
									setUpdata(updata,obj,res)
								}
							});
						}else{
							// 动态获取IP地址
							let networkInterfaces = os.networkInterfaces();
							let IParr = new Object()
							for(let k in networkInterfaces){
                                IParr=(networkInterfaces[k])
							}
							let updata = {}
							updata.temp = body.temp
							updata.times = time(new Date())
							updata.name = IParr[1].address
							updata.oldNum = body.oldEdition
							updata.newNum = body.newEdition
							setUpdata(updata,obj,res)
						}
				});
			})
		}else{
			obj.status_code = 400;
			obj.message =  body.temp+"参数有误";
			res.json(obj);
			return
		}
}
exports.updata=function(req,res) {// 更新信息
    let body = req.body;
    let obj = new Object();
    if (body.temp) {// 设置
        // global.GET_FILE_CONTENT('log.json').then(resolve=>{
            let log = {
                time: time(new Date()),
                log: body.temp
            }

        //     resolve.items.push(log)

        //     if(resolve.items.length >=10){
        //         resolve.items.splice(0,resolve[data.temp].length-10)
        //     } 
        //     fs.writeFile('log.json', JSON.stringify(resolve), 'utf8', (err) => {
		// 		if(!err){
					// obj.status_code = 200;
					// obj.message =  "成功";
        //             res.json(obj); 
		// 		}
		// 	});
        // })
        // let myobj = [{ name: "操作日志1", url: "tyestq1111" },{ name: "操作日志2", url: "tyest22222" }]
    // dbase.collection("updata").insertMany(updata.items, function(err, res) {
    //     if (err) throw err;
    //     console.log("文档插入成功");
    //     db.close();
    // });
        global.GET_MONGONDB((dbs,db)=>{
            dbs.collection('log').insertMany(log, function(err, resl) {
                if (err) throw err;
                obj.status_code = 200;
                obj.message =  "成功";
                res.json(resl); 
                db.close();
            });
        })
    } else {// 获取
        global.GET_MONGONDB((dbs,db)=>{
            dbs.collection('log').find({}).toArray((err,reol)=>{
                if(err) throw err
                obj.status_code = 200;
                obj.items =  reol
                res.json(obj); 
                db.close()
            })
        })
        
    }
}
function time(tim) {//传时间戳
    let year, month, day, hour, minute, second, week
    year = tim.getFullYear();
    month = ('0' + (tim.getMonth() + 1)).slice(-2);
    day = ('0' + tim.getDate()).slice(-2);
    hour = ('0' + tim.getHours()).slice(-2);
    minute = ('0' + tim.getMinutes()).slice(-2);
    second = ('0' + tim.getSeconds()).slice(-2);
    return year+'/'+month+'/'+day +' '+hour+':'+minute+':'+second
}
function setUpdata(data,obj,res){ //添加更新日志
	global.GET_FILE_CONTENT('updata.json').then(resolve=>{
		if(resolve[data.temp]){
			resolve[data.temp].push({
				temp: data.temp,
				times: data.times,
				name: data.name,
				oldNum: data.oldNum,
				newNum: data.newNum
			})
            // 只留三条日志
            if(resolve[data.temp].length >=3){
                resolve[data.temp].splice(0,resolve[data.temp].length-3)
            }            
			fs.writeFile('updata.json', JSON.stringify(resolve), 'utf8', (err) => {
				if(!err){
					obj.status_code = 200;
					obj.message =  "打包成功";
					res.json(obj);
                    global.build = false
					return
				}
			});
		}
	})
}

