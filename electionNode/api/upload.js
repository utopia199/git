const path = require("path");
const formidable = require("formidable");
const fs = require("fs");
const util = require("util");
exports.uploadImage = function(req, res) {// 上传图片
    let body = req.body,
        obj = new Object();
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../uploads');   //文件保存的临时目录为当前项目下的tmp文件夹
    form.maxFieldsSize = 1 * 1024 * 1024;  //用户头像大小限制为最大1M  
    form.keepExtensions = true;        //使用文件的原扩展名
    form.parse(req, function(err, fields, files) {
        obj = files;
        obj.path = 'http://'+req.headers.host+'/uploads/'+files.file.path.split("uploads\\")[1];
        obj.status_code = 200;
        global.GET_MONGONDB((dbs, db) => {
            dbs.collection("userInfo").update({key: req.headers.token},{$set: {"head": obj.path}}, function(error, result){
                db.close();
            });
        })
        res.json(obj)
    });
}