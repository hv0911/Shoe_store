const express = require('express');
const app = express();

require("dotenv").config({path:"backend/config/config.env"});


// using middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// serving routes
const shoes = require("./routes/shoes");
const category = require("./routes/category");





app.use("/api/v1",shoes);
app.use("/api/v1",category);


module.exports = app;