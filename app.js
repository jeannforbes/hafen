const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const crypto = require('crypto');
const victor = require('victor');

const PORT = process.env.PORT || 3000;

server.listen(PORT);

app.get('/', (req, res) => { res.sendFile('index.html', { root: './client' }); });
app.get('/favicon.ico', (req, res) => { res.sendFile('favicon.ico', { root: './client/media' }); });
app.get('/game.js', (req, res) => { res.sendFile('game.js', { root: './client/js' }); });
app.get('/world.js', (req, res) => { res.sendFile('world.js', { root: './client/js' }); });
app.get('/camera.js', (req, res) => { res.sendFile('camera.js', { root: './client/js' }); });
app.get('/map.js', (req, res) => { res.sendFile('map.js', { root: './client/js' }); });
app.get('/player.js', (req, res) => { res.sendFile('player.js', { root: './client/js' }); });
app.get('/dialogue.js', (req, res) => { res.sendFile('dialogue.js', { root: './client/js' }); });
app.get('/character.js', (req, res) => { res.sendFile('character.js', { root: './client/js' }); });

app.get('/default.world', (req, res) => { res.sendFile('default.world', { root: './client/json' }); });

app.get('/victor.js', function(req, res){ res.sendFile('victor.min.js', { root: './client/lib/victor-1.1.0/build' }); });

const rooms = {};

io.on('connect', (socket) => {

});