exports.Login = function(req, res){// 获取列表
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
                            if(result.length) {
                                obj.status_code = 400;
                                obj.message = "当前IP已注册过";
                                res.json(obj)
                                db.close();
                            } else {
                                body.ip = ipAddress
                                let reg  = /^[a-z\d]+$/i;
                                if(reg.test(body.passworld) && body.passworld.length>5){
                                    dbs.collection("login").insertOne(body, function(err, resolve) {// 注册
                                        if (err) throw err;
                                        obj.status_code = 200;
                                        obj.message = "注册成功";
                                        res.json(obj)
                                        db.close();
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