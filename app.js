const Koa = require('koa')
const app = new Koa()

const PORT = 4003

const server = require('http').createServer(app.callback())

const io = require('socket.io')(server, {
    cors: {
        origin: [
            'http://localhost:63342',
            'http://localhost:3000',
            'http://localhost:4000',
            'null'
        ]
    },
    allowRequest: (req, cb) => {
        console.log(req.headers)
        cb(null, true)
    }
})

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`)

    socket.emit('handshake', 'Hi from server!')

    socket.on('handshake', (msg) => {
        console.log(`Event handshake: ${msg}`)
    })

    socket.on('message', (msg) => {
        console.log(`Received: ${msg} - from: ${socket.id}`)
        socket.emit('message', msg)
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected #${socket.id}`)
    })
})

app.use(ctx => {
    ctx.body = 'Hello from Koa-SocketIO'
})

server.listen(PORT, () => {
    console.log(server.address())
    console.log(`Server started at http://localhost:${PORT}`)
})