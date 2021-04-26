require('dotenv').config()
const io = require("socket.io-client");

// const HOST = 'http://localhost'
const HOST = process.env.HOST
const PORT = process.env.PORT

console.log(HOST)
console.log(PORT)
const socket = io(`${HOST}:${PORT}`)

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