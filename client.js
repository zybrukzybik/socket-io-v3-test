const io = require("socket.io-client");

const socket = io('http://localhost:4003')

socket.on('connect', () => {
    console.log('Connected')
})

socket.on('salut', (msg) => {
    console.log(msg)
    socket.emit('salut', `Hi, i'm connected!`)
})

socket.on('message', msg => {
    console.log(msg)
})

socket.on('disconnect', () => {
    console.log('Disconnected')
})