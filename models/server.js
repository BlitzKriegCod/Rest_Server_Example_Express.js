const express = require("express");
const cors = require('cors')
const DB =require('../database/config')
class Server {
    userPath ='/api/users'
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.app.set('view engine', 'hbs')
    this.db = new DB();
    //Middlewares
    this.middelwares()
    //Routes
    this.routes();
    
  
  }
  routes() {
  this.app.use(this.userPath,require('../routes/user.routes'))
 
  
  }
  listen() {
    this.app.listen(this.port, () => console.log(`App listening on port ${this.port}!`.yellow));
    
  }
  middelwares(){
    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use(cors())
  }
}

module.exports = Server;
