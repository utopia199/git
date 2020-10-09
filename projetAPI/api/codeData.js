const fs = require("fs");
exports.getUpdata = function(req,res){ //获取更新日志
    let body = req.body;
	let obj = new Object();
    if(body.codePath) {
        let fileObj = fs.readdirSync(body.codePath),// 获取路径下的所有文件夹
            arr = [],
            resObj = [];
        fileObj.forEach(file=>{// 遍历筛选出文件夹
            let stat = fs.lstatSync(body.codePath+'\\'+ file)
            if (stat.isDirectory() && !file.includes(".svn")) {
                arr.push(file)
            }
        })
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
        obj.message = "路径不能为空"
        res.json(obj)
    }
};
