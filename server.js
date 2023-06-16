const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket) => {
    console.log('Клиент подключился');

    socket.on('message', (message) => {
        const characters = message.split('');
        let index = 0;
        const interval = setInterval(() => {
            if (index < characters.length) {
                socket.emit('character', characters[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 1000);
    });

    socket.on('disconnect', () => {
        console.log('Клиент отключился');
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
