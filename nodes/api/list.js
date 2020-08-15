const fs = require("fs");
exports.get = function(req, res){// 获取列表
    let obj = new Object();
    global.GET_FILE_CONTENT('config.json').then(resolve=>{
        obj.status_code = 200;
        obj.items = resolve;
        res.json(obj);
    }).catch(err=>{

    })
};
exports.set = function(req, res){// 添加列表
    let body = req.body;
    
    let obj = new Object();
    global.GET_FILE_CONTENT('config.json').then(resolve=>{
        if( body.type ){// 添加列表
            if ( resolve[body.type] ) {
                obj.status_code = 200;
                let ls = resolve[body.type].children;
                let list = {
                    id: ls.length === 0 ? 1 : 1 + ls[ls.length-1].id  ,
                    title: body.name
                }
                resolve[body.type].children.push(list)
                
                fs.writeFile('config.json', JSON.stringify(resolve), 'utf8', (err) => {
                    if (!err) {
                        obj.status_code = 200;
                        obj.message = "成功";
                    }
                    res.json(obj);
                    return 
                    
                });
            } else {
                obj.status_code = 400;
                obj.message = "参数有误";
                res.json(obj);
            }
        } else if(body.types) {// 添加分类
            resolve[body.types] = {
                type_id: 1,
                title: body.name,
                children: []
            }
        } else {
            obj.status_code = 400;
            obj.message = "参数有误";
            res.json(obj);
        }
        
    }).catch(err=>{

    })
};