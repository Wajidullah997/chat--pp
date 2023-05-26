const { Socket } = require("socket.io");

// Node server which will handle socket io connection

const io = require('socket.io')(2000)

const users = {};

io.on('connection', socket => {
    //  if any user joins let other users connected to the server know!
    socket.on('new-user-joined', name => {
        // console.log("new user",name)
        users[socket.id] = name;
        socket.broadcost.emit('data', name);
    });
    // if some one sends a message ,brodcost it to other people
    socket.on('send', message => {
        socket.broadcost.emit('recived', { message: message, name: users[socket.id] })
    });
})

    // if some one leaves the chat, let others know
socket.on('disconnect', message => {
    socket.broadcost.emit('left', users[socket.id] )
delete users[socket.id];
});
