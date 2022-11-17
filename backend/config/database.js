const mongoose = require('mongoose');

exports.connectDatabase = () =>{
    mongoose.connect(process.env.MONGOD_URI)
      .then(con => console.log(`Database connected: ${con.connection.host}`))
      .catch((err)=>console.log(err));
};