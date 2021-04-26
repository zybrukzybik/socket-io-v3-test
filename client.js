require('dotenv').config()
const io = require("socket.io-client");

const HOST = 'http://localhost'
// const HOST = process.env.HOST
const PORT = process.env.PORT

console.log(HOST)
console.log(PORT)
const socket = io(`${HOST}:${PORT}`)

socket.on('connect', () => {
    console.log('Connected')
})

socket.on('handshake', (msg) => {
    console.log(`Event handshake: ${msg}`)
    socket.emit('handshake', 'Hi from client')
})

socket.on('message', (msg) => {
    console.log(`Received: ${msg}`)
})

socket.on('disconnect', () => {
    console.log('Disconnected')
})

setTimeout(() => {
    socket.emit('message', 'Testing messages')
}, 3000)