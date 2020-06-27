const http = require('http');
const app = require('./app');

const port = process.env.now ? 8080 : 4000;

const server = http.createServer(app);

server.listen(port);
