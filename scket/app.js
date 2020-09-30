var fs = require('fs'),
    http = require('http'),
    sio = require('socket.io');

var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(fs.readFileSync('./index.html'));
});
server.listen(4949, function() {
    console.log('Scket Server http://192.168.0.113:4949/');
});
io = sio.listen(server);
io.sockets.on('connection', function(socket) {
    socket.on('message', function(msg) {
        var clientIp = socket.request.connection.remoteAddress
        let datas = {ip: clientIp,message: msg}
        socket.broadcast.emit('message', datas);
        mongo(datas)
        socket.send(datas);
    });
    getmessage(me=>{
        me.forEach(function(msg) {
            socket.send(msg);
        })
    })
});
function mongo(data) {
    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb://127.0.0.1:27017/";
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if(err) throw err
        let dbs = db.db("node");
        dbs.collection("message").insertOne(data, function(err, resolve) {// 插入消息
            db.close();
        })
    })
}
function getmessage(call) {
    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb://127.0.0.1:27017/";
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if(err) throw err
        let dbs = db.db("node");

        dbs.collection("message").find().toArray((err,result)=>{
			if(err ) throw err
            call(result)
			db.close();
			
		})
    })
}