const express = require('express');
const socketio = require('socket.io');
const http = require('http')
const PORT = process.env.PORT || 5003
const app = express();
const server = http.createServer(app)

const {addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')
const io = socketio(server);
const db = require('./Database');

const router= require('./router')








io.on('connection',(socket) =>{

    console.log('we are connected');

    socket.on('join', ({name,room}, callback)=> {
        const {error, user} = addUser({id: socket.id,
                                       name,
                                       room,});
                                
                      

                db.query("INSERT INTO user (Nom, room) VALUES ('" + user.name + "', '" + user.room + "')", function (error, result) {
                     if(error) console.log(error)
                 });
                 db.query("INSERT INTO rooms (nom) VALUES ('" + user.room + "')", function (error, result) {
                    // ADD Room to DB .....  Add state of player too
                 });

                
        
            if(error) return callback(error) // calls the error of existing user

//emit : transmettre un event du back au front (avec le même string as first param)
// on : expecting an event for the back

            socket.emit('message', {user :'admin', text:`${user.name} ! Bienvenu !   Tu es dans la room :  ${user.room}`} ) //faire un coucou a new venu
            socket.broadcast.to(user.room).emit('message', {user :'admin' , text:` ${user.name} vient d'arriver `}); //dire aux autres a part lui...
            
            
            socket.join(user.room);
           
            io.to(user.room).emit('roomData', {room : user.room, users:getUsersInRoom(user.room)} );
            
            
            callback();
    });



    socket.on('playVid1', (data) => {
        const user = getUser(socket.id);
        console.log(user);
        //let current = io.to(user.room)
        console.log("playVid   "  + data)
        socket.broadcast.to(user.room).emit('playVid2', data)

    })

    socket.on('seek1',(data)=>{
        const user = getUser(socket.id);
        console.log("seeking front to     "+  data)
        socket.broadcast.to(user.room).emit('seek2', data)


    } )
    
    socket.on('seek3',(data)=>{
        const user = getUser(socket.id);
        console.log("seeking value to    "+  data)
        socket.broadcast.to(user.room).emit('seek4', data)
        
    } )

    

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        let current = io.to(user.room)
        current.emit('message', { user: user.name, text: message });
        db.query("INSERT INTO messages (sender, text, room) VALUES ('" + user.name + "', '" + message + "', '" + user.room + "')", function (error, result) {
            if(error)
            console.log(error)
        });
        current.emit('roomData', { room: user.room, users:getUsersInRoom(user.room) });
    
        callback();
      });

socket.on('videoChange1', (data) => {
    const user = getUser(socket.id);
    
    console.log(user);
    console.log("data" +data) 
    io.sockets.in(user.room).emit('videoChange2', data) //broadcast.to(user.room).
})
      

socket.on('Rewind1', () =>{
    const user = getUser(socket.id);
    io.sockets.in(user.room).emit('Rewind2')
}) ;

socket.on('Forward1', () => {
    const user = getUser(socket.id);
    io.sockets.in(user.room).emit('Forward2')
})


socket.on('FileUploadNotif', (data) => {
    const user= getUser(socket.id)
    socket.broadcast.to(user.room).emit('FileUploadNotif2',data,user.name)

})
     {/* socket.on('sync video', function(data) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            var roomnum = data.room
            var currTime = data.time
            var state = data.state
            var videoId = data.videoId
            var playerId = io.sockets.adapter.rooms['room-' + roomnum].currPlayer

            io.sockets.in("room-" + roomnum).emit('syncVideoClient', {
                time: currTime,
                state: state,
                videoId: videoId,
                playerId: playerId
            })
        }
    }); */}
    
    socket.on('reconnected', () => {
        io.to(user.room).emit('userReconnected', {})
    })
   
    

    socket.on('disconnect',()=>{
        console.log('we are finished')
        const user = removeUser(socket.id);
        if (user){
        io.to(user.room).emit('message', {user: 'admin', text:`${user.name} est mort`})
        io.to(user.room).emit('userDisconnected', {user: 'admin', text:`${user.name} est mort`})
        db.query("DELETE FROM user WHERE Nom='" + user.name + "'", function (error, result) {
            //DELETE all messages in an empty room
            
        });
       
    } 
    if (getUsersInRoom(user?.room)?.length == 0) {
        
       
       
        db.query("DELETE FROM messages WHERE room='" + user.room + "'", function (error, result) {
            //DELETE all messages in an empty room
        });

        db.query("DELETE FROM rooms WHERE nom='"+user.room+"'", function (error, result) {
            //DELETE all messages in an empty room
        });
        

    }

    
    })

});




app.use(router);

server.listen(PORT, () => console.log(`its alive ! on port ${PORT}`));