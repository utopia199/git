const fs = require("fs")
const CodePath = "F:\\aoneQt\\";// 代码路径
exports.getUpdata = function(req,res){ //获取更新日志
	let obj = new Object();
	global.GET_FILE_CONTENT('updata.json').then(resolve=>{
		GetFile("F:\\aoneQt").then((files)=>{
			for(let index = 0 ; index < files.length; index++) {
			    if(!files[index].includes('.') && !resolve[files[index]]){
			        resolve[files[index]] = []
			    }
			}
			fs.writeFile('updata.json', JSON.stringify(resolve), 'utf8', (err) => {
			    if (!err) {
			        obj.status_code = 200;
			        obj.items = resolve;
			    }
			    res.json(obj);
			    return 
			});
		})
	}).catch(err=>{
	
	})
};

exports.setUpdata = function(req,res){ //添加更新日志
	let body = req.body;
	let obj = new Object();
	global.GET_FILE_CONTENT('updata.json').then(resolve=>{
	    obj.status_code = 200;
	    obj.message = "添加成功";
	    res.json(obj);
	}).catch(err=>{
	
	})
}

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