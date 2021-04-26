const Koa = require('koa')
const app = new Koa()

const server = require('http').createServer(app.callback())

const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`)
    socket.emit('salut', 'Hello from server!')

    socket.on('salut', (msg) => {
        console.log(msg)
    })

    socket.on('message', (click) => {
        console.log(`${click} - ${socket.id}`)
        socket.emit('message', 'Click received')
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected #${socket.id}`)
    })
})

app.use(ctx => {
    ctx.body = 'Hello from Koa-SocketIO'
})

server.listen(4000, () => {
    console.log(`Server started at http://localhost:4000`)
})