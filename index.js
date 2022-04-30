const express = require('express');
const mongoose = require('mongoose');
const contents = require('./routes/contents');
const { DB } = require('./config');
const port = 4000;

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["Get", "Post"]
    }
});

app.use(express.json());
app.io = io;
mongoose.connect(DB, { useNewUrlParser: true });

// Cors
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin','http://localhost:3000');
    res.header('Access-Control-Allow-Headers','content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With'); //允许的请求头
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    res.header('Access-Control-Allow-Credentials',true);
    next();
});

app.get('/', (_, res) => {
    res.send('Hello world!');
})

app.use('/contents', contents);

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(port, () => {
    console.log('Server running on *:', port);
})