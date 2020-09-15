const fs = require("fs");
exports.get = function(req, res){// 获取列表
    let obj = new Object();
    // global.GET_FILE_CONTENT('config.json').then(resolve=>{
    //     obj.status_code = 200;
    //     obj.items = resolve;
    //     res.json(obj);
    // }).catch(err=>{

    // })
	global.GET_MONGONDB((dbs, db) => {
		dbs.collection("list").find().toArray((err,result)=>{
			if(err ) throw err
			obj.status_code = 200;
			obj.items = result;
			res.json(obj)
			db.close();
		})
	},"help")
};
exports.set = function(req, res){// 添加列表
    let body = req.body;
    let obj = new Object();

	if( !body.typeName ) {

		obj.status_code = 400;
		obj.message = "分类名称不能为空";
		res.json(obj)

	} else if(!body.name) {

		obj.status_code = 400;
		obj.message = "列表名称不能为空";
		res.json(obj)

	} else {

		global.GET_MONGONDB((dbs, db) => {
			let type = {
				typeName: body.typeName,
				list: [
					{name: body.name, info: null}
				]
			}
			let list ={name: body.name, info: null};
			
			dbs.collection("list").update({typeName: body.typeName},{$addToSet:{list:list}}, function(err, resolve) {
				if (err) throw err;
				if(resolve.result.n) {// 判断是否有typeName
					obj.status_code = 200;
					obj.message = "插入成功";
					res.json(obj);
					db.close();
				} else {
					dbs.collection("list").insertOne(type, function(err, resolve) {// 插入typeName
						if (err) {
							obj.status_code = 400;
							obj.message = err;
							res.json(obj);
							return 
						}
						obj.status_code = 200;
						obj.message = "插入成功";
						res.json(obj);
						db.close();
					})
				}
			})
		},"help")
	}
	
};
exports.edi = function(req,res){ //修改列表
	
};
exports.del = function(req, res){ //删除列表
	
};