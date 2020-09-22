const fs = require("fs");
exports.getUpdata = function(req,res){ //获取更新日志
	let obj = new Object();
	let items = []
	global.GET_MONGONDB((dbs,db)=>{
		dbs.collection("updata").find().toArray(function(err, result) { // 返回集合中所有数据
			if (err) throw err;
			GetFile(global.href).then((files)=>{
				let oldArr = []
				let newArr = []
				for(var i = 0 ; i < files.length ; i++){
					if(files[i].indexOf('.') < 0){
						newArr.push(files[i])
					}
				}
				for(var b = 0 ; b < result.length ; b++){
					oldArr.push(result[b].name)
				}
				if(oldArr.length == newArr.length){
					db.close();
					result.map(sub=>{
						if(sub.item.length > 3){
							sub.item = sub.item.slice(-3)
						}
					})
					obj.status_code = 200;
					obj.items = result;
					res.json(obj)
				}else{
					let index = 0
					setData()
					function setData(){
						let data = {
							name: newArr[index],
							item:[]
						}
						if(index < newArr.length){
							if(oldArr.includes(newArr[index])){
								index++
								setData()
							}else{
								dbs.collection("updata").insert(data, function(err, resover) {
									if (err) throw err;
									index++
									setData()
								})
							}
						}else{
							dbs.collection("updata").find().toArray(function(err, result2){
								if (err) throw err;
								result2.map(sub=>{
									if(sub.item.length > 3){
										sub.item = sub.item.slice(-3)
									}
								})
								obj.status_code = 200;
								obj.items = result2;
								res.json(obj)
								db.close();
							})
						}
					}
				}
			})
		});
	})
};
exports.delMessage = function(req,res){ // 删除消息
	let body = req.body;
	let obj = new Object();
	global.GET_MONGONDB((dbs,db)=>{
		if(body){
			dbs.collection("message").remove({ip:body.ip,message: body.message},(err, result2)=>{
				if(err) throw err
				obj.status_code = 200;
				obj.message = '删除成功';
				res.json(obj)
				db.close();
			})
		} else {
			obj.status_code = 400;
			obj.message = 'id不能为空';
			res.json(obj)	
		}
	})
};

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