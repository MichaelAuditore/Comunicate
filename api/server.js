const http = require('http');
const app = require('./api');
const { createTables } = require('./db_connection');
const port = process.env.PORT || 3001;
const hostname = '127.0.0.1';

http.createServer(app).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    createTables();
});