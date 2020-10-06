exports.Router = function(req, res) {// 上传图片
    let body = req.body,
        obj = new Object();
    global.GET_MONGONDB((dbs,db)=>{
        dbs.collection("route").find().toArray((err,result)=>{
            if(err){
                res.json({status_code: 400,message: "数据获取失败"})
            } else {
                res.json({
                    status_code: 200,
                    items: result
                })
            }
            db.close()
        })
    })
}
exports.SetConfig = function(req, res) {// 设置打包配置
    let body = req.body,
        obj = new Object();
    global.GET_MONGONDB((dbs,db)=>{
        let set = {
            svnPath: body.svnPath,
            svnUserName: body.svnUserName,
            svnUserPasswold: body.svnUserPasswold,
            sendUser: body.sendUser,
            send: body.send,
        }
        dbs.collection("userInfo").updateOne({key: req.headers.token},{$set: set}, function(error, result){
            res.json({status_code: 200, message: "设置成功"})
            db.close();
        });
    })
}