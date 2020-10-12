const fs = require("fs");
const { spawn } = require('child_process');
exports.getUpdata = function(req,res){ //获取更新日志
    let body = req.body;
	let obj = new Object();
    if(body.codePath) {
        var resObj = [];
        global.GET_MONGONDB((dbs,db)=>{// 查询数据库所有模板的版本号
            dbs.collection("updata").find().toArray(function(err, result) {
                if (err) throw err;
                result.forEach(l=>{
                    let updat = {}
                    if(l.item.length){// 兼容以前的数据类型
                        updata = {
                            name: l.name,
                            version: l.item[l.item.length-1].newNum,
                            times: l.item[l.item.length-1].times
                        }
                    } else {
                        updata = {
                            name: l.name,
                            version: 0,
                            times: new Date().getTime()
                        }
                    }
                   
                    resObj.push(updata)
                })
                obj.item = resObj
                obj.status_code = 200
                res.json(obj)
            });
        })
    } else {
        obj.status_code = 400
        obj.message = body.codePath
        res.json(obj)
    }
};

exports.SvnUpdata = function (req,res) {// 更新代码
    if(req.body.path) {
        if(req.body.svnUserName){
            if(req.body.svnUserPasswold) {
                let Client = require('svn-spawn');  
                let client = new Client({
                    cwd: req.body.path,
                    username: req.body.svnUserName,
                    password: req.body.svnUserPasswold,
                    noAuthCache: false,
                });
                client.update(function(err, data) {
                    if(err){
                        res.json({
                            message: err,
                            status_code: 400,
                            username: req.body.svnUserName,
                            cwd: req.body.path,
                            password: req.body.svnUserPasswold,
                            client: client
                        })
                        return 
                    }

                    res.json({
                        message: data,
                        status_code: 200
                    })
                });
            } else {
                res.json({
                    message: "SVN密码不能为空",
                    status_code: 200
                })
            }
        } else {
            res.json({
                message: "SVN帐号不能为空",
                status_code: 200
            })
        }
       
    } else {
        res.json({
            message: "path不能为空",
            status_code: 200
        })
    }
};

exports.SvnCommit = function (req,res) {// 提交代码
    if(req.body.path) {
        if(req.body.svnUserName){
            if(req.body.svnUserPasswold) {
                let Client = require('svn-spawn');  
                let client = new Client({
                    cwd: req.body.path,
                    username: req.body.svnUserName,
                    password: req.body.svnUserPasswold,
                    noAuthCache: false,
                });
                
                client.addLocal(function(err, data) {
                    
                    client.commit('commit message here', function(err, data) {
                        if(err) {
                            res.json({
                                message: err,
                                status_code: 400,
                                username: req.body.svnUserName,
                                cwd: req.body.path,
                                password: req.body.svnUserPasswold,
                                client: client
                            })
                            return 
                        } else {
                            res.json({
                                message: data || "没有提交的代码",
                                status_code: 200
                            })
                        }
                    });
                });
            } else {
                res.json({
                    message: "SVN密码不能为空",
                    status_code: 200
                })
            }
        } else {
            res.json({
                message: "SVN帐号不能为空",
                status_code: 200
            })
        }
       
    } else {
        res.json({
            message: "path不能为空",
            status_code: 200
        })
    }
};
exports.Install = function (req,res) {// 初始化 下载 node_modules 包
    let body = req.body;
	let obj = new Object();
	if (typeof body.path === "string") {
		const serve = spawn('npm install', {
			cwd: body.path ,
			shell: true
		})
		serve.once('close', function() {
			obj.status_code = 200;
			obj.message = "初始化完成";
			res.json(obj);
		})
	} else {
		obj.status_code = 400;
		obj.message = "参数有误";
		res.json(obj);
	}
};

exports.Build = function(req, res) { // 打包模板
	let body = req.body;
	let obj = new Object();
	if (body.path && body.temp && body.version ) {
		const serve = spawn('npm run build:up', {
			cwd: body.path+'\\'+body.temp,
			shell: true
		});
		// 执行完成触发
		serve.once('close', function() {
			//改名
			let Desktop = require('path').join(require('os').homedir(), 'Desktop'); // 桌面路径
			let oldpath = Desktop + "\\dist\\" + body.temp + "\\temp";
			let newpath = Desktop + "\\dist\\" + body.temp + "\\" + body.version
			fs.rename(oldpath, newpath, function(err) {// 修改路径
				if (err) {
					obj.status_code = 400;
					obj.message = body.temp + "打包成功修改版本失败";
					obj.oldpath = oldpath;
					obj.newpath = newpath;
					res.json(obj);
				} else {
                    obj.status_code = 200;
                    obj.message = "打包成功";
                    res.json(obj);
                }
			});
		})
	} else {
		obj.status_code = 400;
		obj.message = body.path + "参数有误";
		res.json(obj);
	}
}
