const express = require('express');
const { router } = require('./routes/routes.js');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/', router);

server.listen(3000, function () {
    console.log('Porta 3000');
});
