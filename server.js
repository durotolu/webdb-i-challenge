const express = require('express');

const server = express();

const accountRouter = require('./accountRouter');

server.use(express.json());

server.use('/api/accounts', accountRouter);

server.get('/', (req, res) => {
    res.send('<h3>DB Helpers with knex</h3>');
  });

module.exports = server;