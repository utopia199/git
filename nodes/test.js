const fs = require("fs");
const { spawn } = require('child_process');
let firstHref = null,
    setTimeouts = null;
process.on('message', href => {
    firstHref = href
    fs.readdir(href,function(err,file){
        if(err){return}
        let type = "start npm install"
        if (file.includes("node_modules") ) {// 判断是否有node包
            build()
        } else {
            install()
        }
       
    })
});


function install() {
    const child_process = spawn("start npm install",{
        cwd: firstHref,
        shell: true,
    })
    inst()
    function inst() {
        let it = setTimeout(() => {
            fs.readdir(firstHref,function(err,file){
                if (file.includes("node_modules") ) {
                    build()
                    clearTimeout(it)
                    it = null 
                } else {
                    process.send("初始化中请稍后");
                    inst()
                }
            })
        },3000)
    }
    
}

function build() {
    const child_process = spawn("start npm run build",{
        cwd: firstHref,
        shell: true,
    })
    bT()
    function bT() {
        let buildTime = setTimeout(() => {
            fs.readdir(firstHref,function(err,file){
                if (file.includes("temp") ) {
                   process.send("打包中成功");
                   clearTimeout(buildTime)
                   buildTime = null
                } else {
                    process.send(process.argv.slice(2));
                    bT()
                  
                }
            })
        }, 3000);
    }
    

}

