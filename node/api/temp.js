const fs = require("fs")
const path = require("path");
const os = require("os");
const {
	spawn
} = require('child_process');
exports.getTemp = function(req, res) { // 获取模板
	let obj = new Object();
	let body = req.body;
	let filesObj = [];
	let ipAddress;
	let forwardedIpsStr = req.header('x-forwarded-for'); 
	if (forwardedIpsStr) {
		let forwardedIps = forwardedIpsStr.split(',');
		ipAddress = forwardedIps[0];
	}
	if (!ipAddress) {
		ipAddress = req.connection.remoteAddress;
	}
	fs.readdir(global.href, function(err, files) {
		if (err) {
			throw err
		}
		let fil = [];
		files.forEach((data, index) => {
			if (!data.includes('.')) {
				filesObj.push({
					file: files[index],
					nodemodules: fs.existsSync(global.href + '\\' + data + "\\node_modules")
				})
				if (index === files.length - 1) {
					obj.status_code = 200;
					obj.item = filesObj;
					obj.ip = ipAddress
					res.json(obj);
				}
			}
		})
	})
	
}
exports.install = function(req, res) { // 初始化下载node
	let body = req.body;
	let obj = new Object();
	if (typeof body.temp === "string") {
		const serve = spawn('npm install', {
			cwd: global.href + "\\" + body.temp,
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
}
exports.build = function(req, res) { // 打包模板
	let body = req.body;
	let obj = new Object();

	if (global.build) { // 避免多终端打包
		obj.status_code = 400;
		obj.message = body.temp + "打包进行中请稍后";
		res.json(obj);
		return
	} else {
		global.build = true
	}


	if (body.temp && body.newEdition && body.oldEdition >= 0) {
		const serve = spawn('npm run build:up', {
			cwd: global.href + "\\" + body.temp,
			shell: true
		});
		// 执行完成触发
		serve.once('close', function() {
			//改名
			let Desktop = require('path').join(require('os').homedir(), 'Desktop'); // 桌面路径
			let oldpath = Desktop + "\\dist\\" + body.temp + "\\temp";
			let newpath = Desktop + "\\dist\\" + body.temp + "\\" + body.newEdition
			fs.rename(oldpath, newpath, function(err) {
				if (err) {
					obj.status_code = 400;
					obj.message = body.temp + "打包失败";
					obj.path = require('os').homedir();
					res.json(obj);
					global.build = false
					return
				}
				let ipAddress;
				let forwardedIpsStr = req.header('x-forwarded-for'); 
				if (forwardedIpsStr) {
					let forwardedIps = forwardedIpsStr.split(',');
					ipAddress = forwardedIps[0];
				}
				if (!ipAddress) {
					ipAddress = req.connection.remoteAddress;
				}
			
				if (!fs.existsSync(Desktop + "\\dist\\instructions.txt")) {
					fs.writeFile(Desktop + "\\dist\\instructions.txt", "cb3_up\\static\\site-qt目录下,替换同名文件夹", 'utf8', (err) => {
						if (!err) {
							let updata = {}
							updata.temp = body.temp
							updata.times = time(new Date())
							updata.name = ipAddress
							updata.oldNum = body.oldEdition
							updata.newNum = body.newEdition
							setUpdata(updata, obj, res)
						}
					});
				} else {
					let updata = {}
					updata.temp = body.temp
					updata.times = time(new Date())
					updata.name = ipAddress
					updata.oldNum = body.oldEdition
					updata.newNum = body.newEdition
					setUpdata(updata, obj, res)
				}
			});
		})
	} else {
		obj.status_code = 400;
		obj.message = body.temp + "参数有误";
		res.json(obj);
		return
	}
}
exports.updata = function(req, res) { // 更新信息
	let body = req.body;
	let obj = new Object();
	if (body.temp) { // 设置
		global.GET_MONGONDB((dbs, db) => {
			let log = {
				time: time(new Date()),
				userTime: new Date().getTime(),
				log: body.temp
			}
			dbs.collection("log").insert(log, function(err, resolve) {
				if (err) throw err;
				obj.status_code = 200;
				obj.message = "成功";
				res.json(obj)
				db.close();
			});
		})
	} else { // 获取
		global.GET_MONGONDB((dbs, db) => {// 只获取三天前的数据
			let end = new Date().getTime()-24*3*60*60*1000
			dbs.collection("log").find({userTime:{$gte:end}}).toArray(function(err, result){
				if (err) throw err;
				obj.status_code = 200;
				obj.items = result;
				res.json(obj)
				db.close();
			})
		})
	}
}

function time(tim) { //传时间戳
	let year, month, day, hour, minute, second, week
	year = tim.getFullYear();
	month = ('0' + (tim.getMonth() + 1)).slice(-2);
	day = ('0' + tim.getDate()).slice(-2);
	hour = ('0' + tim.getHours()).slice(-2);
	minute = ('0' + tim.getMinutes()).slice(-2);
	second = ('0' + tim.getSeconds()).slice(-2);
	return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second
}

function setUpdata(data, obj, res) { //添加更新日志
	global.GET_MONGONDB((dbs,db)=>{
		let setObj = {temp: data.temp,times: data.times,name: data.name,oldNum: data.oldNum,newNum: data.newNum}
		dbs.collection("updata").update({name:data.temp},{$addToSet:{item:setObj}}, function(err, resover) {
			if (err) throw err;
			obj.status_code = 200;
			obj.message = "打包成功";
			res.json(obj);
			global.build = false;
			db.close();
		})
	})
}
