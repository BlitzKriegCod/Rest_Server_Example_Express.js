const mongoose = require("mongoose");

class DB {
  DB_Path = process.env.DB;

  constructor() {
    this.createConnection().then(() =>
      console.log("Connection with CafeCluster has been started".green)
    );
  }
  async createConnection() {
    try {
      await mongoose.connect(this.DB_Path, {
        serverSelectionTimeoutMS: 55000,
        socketTimeoutMS: 45000
      });
    } catch (err) {
      console.log("Ooops an error has been ocurred ".red, err, " !!!".red);
    }
  }
}
module.exports = DB;
