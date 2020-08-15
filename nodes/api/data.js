const fs = require("fs")
exports.get =  function(req, res) {// 获取详情
    let obj = new Object();
    let body = req.body
    if( !Object.keys(body).length ){
        obj.status_code = 400;
        obj.message = "参数不能为空";
        res.json(obj);
    }else if(!body.type){
        obj.status_code = 400;
        obj.message = "type不能为空";
        res.json(obj);
    }else if(!body.id){
        obj.status_code = 400;
        obj.message = "id不能为空";
        res.json(obj);
    }else{
        global.GET_FILE_CONTENT('data.json').then(resolve=>{
            let data = new Array();
            if(resolve[body.type]){
                for(let i = 0 ; i < resolve[body.type].length; i++){
                    if( resolve[body.type][i].id === body.id ){
                        data = resolve[body.type][i]
                        break;
                    }
                }
                obj.status_code = 200;
                obj.items = data;
            } else {
                obj.status_code = 400;
                obj.message = "参数错误";
            }
            res.json(obj);    
        }).catch(err=>{

        })
    }
}
exports.set = function(req,res) {// 设置详情
    let obj = new Object();
    let body = req.body
    if ( !body.type ) {
        obj.status_code = 400;
        obj.message = "分类不能为空";
        res.json(obj);
    } else if( !body.id ) {
        obj.status_code = 400;
        obj.message = "列表ID不能为空";
        res.json(obj);
    } else {
        global.GET_FILE_CONTENT('data.json').then(resolve=>{
            let data = new Array(),
                isId = false;
            if(resolve[body.type]){
                for(let i = 0 ; i < resolve[body.type].length; i++){
                    if( resolve[body.type][i].id === body.id ){
                        isId = true
                        resolve[body.type][i].body = body.content
                        fs.writeFile('data.json', JSON.stringify(resolve), 'utf8', (err) => {
                            if (err) throw err;
                        });
                        break;
                    }
                }
                if( isId ) {
                    obj.status_code = 200;
                    obj.message = "修改成功";
                } else {
                    if(body.admin === 'admin'){// 判断是否是管理员
                        resolve[body.type].push({id: body.id, body: body.content})
                        fs.writeFile('data.json', JSON.stringify(resolve), 'utf8', (err) => {
                            if (err) throw err;
                        });
                        obj.status_code = 200;
                        obj.message = "修改成功";
                    }else{
                        obj.status_code = 400;
                        obj.message = "没有找到当前列表";
                    }
                    
                }
            } else {
                obj.status_code = 400;
                obj.message = "参数错误";
            }
            res.json(obj);
        }).catch(err=>{

        })
    }
}