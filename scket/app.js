var fs = require('fs'),
    http = require('http'),
    sio = require('socket.io');

var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(fs.readFileSync('./index.html'));
});
server.listen(4949, function() {
    console.log('Server listening at http://10.0.6.103:4949/');
});
io = sio.listen(server);
var messages = [];
io.sockets.on('connection', function(socket) {
    socket.on('message', function(msg) {
        var clientIp = socket.request.connection.remoteAddress
        messages.push({ip: clientIp,message: msg});
        socket.broadcast.emit('message', {ip: clientIp,message: msg});
        socket.send({ip: clientIp,message: msg});
    });
 
    messages.forEach(function(msg) {
        socket.send(msg);
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