const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 4000);
const server = http.createServer(app); //création serveur Node

server.listen(process.env.PORT || 4000);