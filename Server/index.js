const express = require('express');
const socketio = require('socket.io');
const http = require('http')
const PORT = process.env.PORT || 5003
const app = express();
const server = http.createServer(app)
const io = socketio(server);

const router= require('./router')








io.on('connection',(socket) =>{
    console.log('we are connected');
    socket.on('join', ({name,room})=> {
console.log(name, room);
    })


    socket.on('disconnect',()=>{
        console.log('we are finished')
    })
});




app.use(router);

server.listen(PORT, () => console.log(`its alive ! on port ${PORT}`));