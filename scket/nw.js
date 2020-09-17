let Service = require('node-windows').Service;
//  npm install node-windows --save
let svc = new Service({
  name: 'node_socket',    //服务名称
  description: 'node服务器', //描述
  script: './app.js' //nodejs项目要启动的文件路径
});
 
svc.on('install', () => {
  svc.start();
});
 
svc.install();