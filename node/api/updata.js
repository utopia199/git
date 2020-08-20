const fs = require("fs")
exports.getUpdata = function(req,res){ //获取更新日志
	let obj = new Object();
	let body = req.body;
	global.GET_FILE_CONTENT('updata.json').then(resolve=>{
		GetFile(global.href).then((files)=>{
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