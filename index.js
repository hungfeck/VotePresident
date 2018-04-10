const express = require('express');
const http = require('http');
const helper = require('./helpers/mongodb');
var app = express();
var server = http.createServer(app);
const io = require('socket.io')(server);
var port = 3003;

app.use(express.static(__dirname +'/public'));
io.on('connection', function (socket) {
    console.log('An user connection');
    var dataDefault = helper.GetData((data)=>{
        io.to(socket.id).emit("dataDefault", data);
    });

    socket.on('voted', function (data) {
        var updateData = helper.Vote(data,(ret)=>{  
            var data = helper.GetData((data)=>{
                io.emit("dataChange", data);
            });
        });
    });


  });

server.listen(port, function(){
    console.log("Server listen port "+port);
});


