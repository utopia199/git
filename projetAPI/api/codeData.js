const fs = require("fs");
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
        console.log(req.body.path)
        if(req.body.svnUserName){
            if(req.body.svnUserPasswold) {
                let Client = require('svn-spawn');  
                let client = new Client({
                    cwd: req.body.path,
                    username: req.body.svnUserName,
                    password: req.body.svnUserPasswold,
                    noAuthCache: true,
                });
                client.update(function(err, data) {
                    if(err){
                        
                        res.json({
                            message: err,
                            status_code: 400
                        })
                        return 
                    }
                    // if(data.includes("Updated to revision")); {
                    res.json({
                        message: data,
                        status_code: 200
                    })
                    // }
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
}
