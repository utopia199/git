const md5 = require('md5-node');
exports.Login = function(req, res) {// 获取列表
    let body = req.body,
        obj = new Object();
    if(!body.userName){
        obj.status_code = 400;
        obj.message = "请填写用户名";
        res.json(obj)
    }else if(!body.passworld) {
        obj.status_code = 400;
        obj.message = "请填写密码";
        res.json(obj)
    } else {
        if(body.type) {// 注册
            let ipAddress,
                forwardedIpsStr = req.header("x-forwarded-for"); 
            if (forwardedIpsStr) {
                let forwardedIps = forwardedIpsStr.split(',');
                ipAddress = forwardedIps[0];
            }
            if (!ipAddress) {
                ipAddress = req.connection.remoteAddress;
            }
            global.GET_MONGONDB((dbs, db) => {
                
                dbs.collection("login").find({userName: body.userName}).toArray((err,result)=>{// 查询是否注册过
                    if(result.length){
                        obj.status_code = 400;
                        obj.message = "用户名已存在";
                        res.json(obj)
                        db.close();
                    } else {
                        dbs.collection("login").find({ip: ipAddress}).toArray((err,result)=>{// 查询是否注册过
                            if (err) throw err;
                            if(!result.length) {
                                obj.status_code = 400;
                                obj.message = "当前IP已注册过";
                                res.json(obj)
                                db.close();
                            } else {
                                body.ip = ipAddress
                                let reg  = /^[a-z\d]+$/i;
                                let key = md5(body.userName+body.passworld)
                                if(reg.test(body.passworld) && body.passworld.length>5){
                                    body.key = key
                                    dbs.collection("login").insertOne(body, function(err, resolve) {// 注册
                                        if (err) throw err;
                                        obj.status_code = 200;
                                        obj.key = key;
                                        obj.message = "注册成功";
                                        let userInfo = {
                                            userName:  body.userName,
                                            regIP:  ipAddress,
                                            head: null,
                                            key: key
                                        }
                                        dbs.collection("userInfo").insertOne(userInfo, function(err, resolve) {// 添加会员默认信息
                                            if (err) throw err;
                                            res.json(obj)
                                            db.close();
                                        });
                                    });
                                    
                                } else {
                                    obj.status_code = 400;
                                    obj.message = "密码是6-20位英文数字组合";
                                    res.json(obj)
                                    db.close();
                                }
                            }
                        })
                    }
                })
            })
        } else {// 登录
            global.GET_MONGONDB((dbs, db) => {
                dbs.collection("login").find({userName: body.userName}).toArray((err,result)=>{
                    if(!result.length){
                        obj.status_code = 400;
                        obj.message = "用户名错误";
                        res.json(obj)
                        db.close();
                        return
                    }
                    if(result[0].passworld === body.passworld) {
                        obj.status_code = 200;
                        obj.message = "登录成功";
                        obj.key = md5(body.userName+body.passworld)
                        res.json(obj)
                    } else {
                        obj.status_code = 400;
                        obj.message = "密码错误";
                        res.json(obj)
                    }
                    db.close();
                })
            })
        }
    }
};
exports.UserInfo = function(req,res) {// 获取会员信息
    let body = req.body,
        obj = new Object();
    
    global.GET_MONGONDB((dbs,db)=>{
        dbs.collection("userInfo").find({ key: body.key}).toArray((err,result)=>{
            if(err) {
                obj.status_code = 400;
                obj.message = "获取数据失败";
            } else {
                if(result.length){
                    obj.status_code = 200;
                    obj.userName = result[0].userName;
                    obj.regIP = result[0].regIP;
                    obj.head = result[0].head;
                
                } else {
                    obj.status_code = 401;
                    obj.message = "您已离线请重新登录";
                }
            }
            db.close();
            res.json(obj)
        })
    })
}