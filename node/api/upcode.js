exports.up = function (req,res){// 获取模板
   var Client = require('svn-spawn');
    var client = new Client({
        cwd: 'G:\\aoneQt',
        username: 'yegang666',
        password: '6fUTLStn!e',
        noAuthCache: true,
    });
    client.update(function(err, data) {
        if(err){
            throw err
        }
        if(data.includes("Updated to revision")); {
            res.json({
                message: data,
                status_code: 200
            })
        }
    });
    
}