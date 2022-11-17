const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shoeSchema = new Schema({

    name:{ type:String , required:true},

    description:{type:String , required:true},
 
    category:[{type:Schema.Types.ObjectId , ref:"Category" }],

    number_in_stock:{type:Number , required:true , unique:true},

    price:{type:Number , required:true},

    size:{
         type:Number , 
         enum:[ 6 ,7 ,8 ,9 ,10]
     }
     ,
     status:{
        type:String,
        enum:["Available" , "Not in stock"]
     },


})

module.exports = mongoose.model("Shoe" , shoeSchema);


