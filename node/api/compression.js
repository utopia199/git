const fs = require("fs")
const archiver = require('archiver'); // archiver可用于普通的打包压缩
const AdmZip = require('adm-zip');  //用于读取未解压的zip包
const p=require("path");

exports.compression = function(req,res){
	let obj = new Object()
	let Desktop = require('path').join(require('os').homedir(), 'Desktop'); // 桌面路径
	let filePath = Desktop+'\\dist' //获取文件路径
	let dirList = fs.readdirSync(filePath); //获取文件列表
	let zipPath = Desktop+'\\dist.zip';  //压缩包生成路径
	let path = Desktop+'\\dist';
	
	let level = 9;  //压缩等级
	//创建最终打包文件的输出流
	let output = fs.createWriteStream(zipPath);
	//生成archiver对象，打包类型为zip
	let archive = archiver('zip', {
	    zlib: {
	        level: level
	    }
	});
	
	//对文件夹进行压缩
	archive.directory(filePath, false);
	archive.pipe(output); //将打包对象与输出流关联
	
	//监听所有archive数据都写完
	output.on('close', function() {
		deleteFolder(path).then(()=>{
			obj.status_code = 200;
			obj.message =  "压缩成功";
			res.json(obj);
		})
	});
	archive.on('error', function(err) {
	    obj.status_code = 400;
	    obj.message = "压缩失败";
	    res.json(obj);
	});
	
	//打包
	archive.finalize();
	
	function deleteFolder(path) {
		return new Promise((reso,rej)=>{
			let files = [];
			if( fs.existsSync(path) ) {
			    files = fs.readdirSync(path);
			    files.forEach(function(file,index){
			        let curPath = path + "\\" + file;
							console.log(curPath)
			        if(fs.statSync(curPath).isDirectory()) {
			            deleteFolder(curPath);
			        } else {
			            fs.unlinkSync(curPath);
			        }
			    });
			    fs.rmdirSync(path);
					reso()
			}
		})
	}
}