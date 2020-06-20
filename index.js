const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const RequestHandler = require('./controller/RequestHandler');
const reqHandler = new RequestHandler();

app.use(express.static('public'));
app.use(express.static('public/font'));
app.use(express.static('public/icons'));
app.use(express.static('public/style'));
app.use(express.static('public/scripts'));
app.use(express.static('public/media/img'));
app.use(express.static('public/media/video'));
app.use(express.static('public/presentation'));

io.on('connection', (socket) => {
    console.log('user connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('request time', () => {
        socket.emit('time', reqHandler.getTime());
    });

    socket.on('request weather', async () => {
        socket.emit('weather', await reqHandler.getWeather());
    });

    socket.on('request logos', () => {
        reqHandler.getLogos().then(res => {socket.emit('logos', res); });
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
