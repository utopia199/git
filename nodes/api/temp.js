

exports.getTemp = function (req,res){// 获取模板
    
}
exports.install = function (req,res){// 初始化下载node
   
}
exports.build = function (req,res){// 打包模板
    const { spawn,exec,fork } = require('child_process');
    const serve = spawn('npm run build',{
        cwd:'G:\\aoneQt\\a01_pc',
        shell: true
    })

    // 执行完成触发
    serve.once('close', function () {
        console.log('install success...')
    })
}

