const fs = require("fs");

exports.Login = function(req, res){// 获取列表
    let body = req.body,
        obj = new Object();
    if(!body.userName){
        obj.status_code = 400;
        obj.message = "请填写用户名";
    }else if(!body.passworld) {
        obj.status_code = 400;
        obj.message = "请填写密码";
    } else {
        obj.status_code = 200;
        obj.message = '登录成功';
        obj.token = 'sergsaergergesgresgdzxfberb';
    }
	// global.GET_MONGONDB((dbs, db) => {
	// 	dbs.collection("user").find().toArray((err,result)=>{
	// 		if(err ) throw err
			// obj.status_code = 200;
			// obj.message = '测试';
	// 		obj.items = result;
			res.json(obj)
	// 		db.close();
	// 	})
	// },"help")
};