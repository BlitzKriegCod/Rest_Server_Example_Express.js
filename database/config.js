const mongoose = require('mongoose')


class DB {
    DB_Path = process.env.DB
    

    constructor(){
        this.createConnection().then(() => console.log('Connection with CafeCluster has been started'.green)).catch((err)=>console.log('Ooops an error has been ocurred '.red,err,' !!!'.red))   
    }
   async createConnection(){
     
       await mongoose.connect(this.DB_Path,{  
        serverSelectionTimeoutMS: 55000,
        socketTimeoutMS: 45000})
    }
}
module.exports = DB