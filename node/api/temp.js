
const fs = require("fs")
const path = require("path");
const os = require("os");
const CodePath = "G:\\aoneQt\\";// 代码路径
const { spawn } = require('child_process');
exports.getTemp = function (req,res){// 获取模板
    let obj = new Object();
    let body = req.body;
    let filesObj = [];
    GetTemp()
    function GetTemp() {
        let len = 1,
            i = 0,
            ll = [];
        GetFile(body.href).then(files=>{
            for(let index = 0 ; index < files.length; index++) {
                if(!files[index].includes('.')){
                    ll.push(files[index])
                }
            }
            len = ll.length
            pushList(body.href + "\\" + ll[i],type=>{
                filesObj.push({
                    file: ll[i],
                    nodemodules: type
                })
            })
        }).catch(err=>{
            obj.status_code = 400;
            obj.message = "路径有误";
            res.json(obj);
        })
        function pushList(href,callback) {
            GetFile(body.href + "\\" + ll[i]).then(files=>{
                if( i < len-1) {
                   callback( files.includes("node_modules"))
                    i++
                   pushList(body.href + "\\" + ll[i],callback)
                } else {
                    obj.status_code = 200;
                    obj.item = filesObj;
                    res.json(obj);
                }
            }).catch(()=>{
                obj.status_code = 400;
                obj.message = "路径有误";
                res.json(obj);
            })
        }
    }
}
exports.install = function (req,res){// 初始化下载node
    let body = req.body;
    let obj = new Object();
    if( typeof body.temp === "string"){
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
    if( body.temp && body.newEdition && body.oldEdition){
        const serve = spawn('npm run build:up',{
            cwd:CodePath + body.temp,
            shell: true
        });
        // 执行完成触发
        serve.once('close', function () {
            //改名
						let Desktop = require('path').join(require('os').homedir(), 'Desktop'); // 桌面路径
						let oldpath = Desktop + "\\temp";
						let newpath = Desktop + "\\"+body.newEdition
            fs.rename(oldpath,newpath,function (err) {
            	if(err){
            		throw Error("改名失败");
            		//...
            	}
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
            });
        })
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
			fs.writeFile('updata.json', JSON.stringify(resolve), 'utf8', (err) => {
				if(!err){
					obj.status_code = 200;
					obj.message =  "打包成功";
					res.json(obj);
				}
				return 
			});
		}
	})
}
