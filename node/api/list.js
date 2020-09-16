const fs = require("fs");
exports.get = function(req, res){// 获取列表
    let obj = new Object();
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
			let list ={name: body.name, info: null, id: new Date().getTime()};
			let type = {
				typeName: body.typeName,
				list: [
					list
				]
			}
			
			dbs.collection("list").updateOne({typeName: body.typeName},{$addToSet:{list:list}}, function(err, resolve) {
				if (err) {
					obj.status_code = 400;
					obj.message = "插入失败";
					res.json(obj);
					db.close();
					return 
				}
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
exports.del = function(req, res){ //编辑删除列表
	let obj = new Object();
	let body = req.body;
	if(body.id && body.typeName){
		if(body.type === 1){// 删除
			global.GET_MONGONDB((dbs, db) => {
				dbs.collection('list').update({typeName: body.typeName},{ $pull: { "list" : { id: body.id } } },(err,result)=>{
					if(err) throw err
					if(result.result.n){
						obj.status_code = 200;
						obj.message = "删除成功";
						res.json(obj)
					} else {
						obj.status_code = 400;
						obj.message = "删除失败";
						res.json(obj)
					}
					db.close();
				})
			},"help")
		} else {// 更新
			global.GET_MONGONDB((dbs, db) => {
				dbs.collection('list').update({'list.id': body.id },{$set:{'list.$.name':body.name}},(err,result)=>{
					if(err) throw err
					if(result.result.n){
						obj.status_code = 200;
						obj.message = "更新成功";
						res.json(obj)
					} else {
						obj.status_code = 400;
						obj.message = "修改失败";
						res.json(obj)
					}
					db.close();
				})
			},"help")
		}
	} else {
		obj.status_code = 400;
		obj.message = "id不能为空";
		res.json(obj)
	}
};