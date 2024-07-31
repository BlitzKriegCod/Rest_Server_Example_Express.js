const hbs = require('hbs')
require("dotenv").config();
require('colors');

const Server = require('./models/server')


const server = new Server();
server.listen()