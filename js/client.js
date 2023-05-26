const socket = io('http://localhost:2000');
// dom functionn
const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageinp')
const messagecontainer = document.querySelector(".container")
 var audio= new Audio('Msg sound.mp4')
// function which will append event info to the container
const append = (message, position) => {
    
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    
    if (position == 'left') {
        audio.play();
    }
}
// 

// ask new user for hid or her namr and let the server know 
const name = prompt("enter your name to join");
socket.emit('new-user-come',data);

// if a new user joins, recive his her name from the server
socket.on('user-joined', data => {
    append(`${data} joined the chat`, 'right' )
})

// if  server send a message recive it
socket.on('recived', data => {
    append(`${data.name}: ${data.message}`, 'left' )
})

// if a user server leaves the chat , append the info to the container 
socket.on('left', name => {
    append(` ${name} letf the chat `, 'left' )
})

// if the form gets submitted , send server the msg
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageinput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message)
    messageinput.value = ''
})
