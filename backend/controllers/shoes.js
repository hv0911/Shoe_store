const Shoe = require('../models/shoes');
const { body, validationResult } = require('express-validator');

exports.HomePage = (req, res) => {

    res.send("Home Page: Not Implemented");

}

exports.ShoesList = (req, res) => {
    res.send("List of all the shoes: Not Implemented");
}

exports.ShoeDetail = (req, res) => {
    res.send("Detail of a Shoe:NOt Implemented");
}


exports.CreateShoeGet = (req, res) => {
    res.send("Shoe Created!: Not implemented ");
}


exports.CreateShoePost = [

    body("name","name must not be empty")
        .isLength({ min: 1 })
        .escape()
    ,
    body("description","Description must not be empty")
        .isLength({ min: 1 })
        .escape()
    ,
    body("number_in_stock","Stock Number must not be empty")
        .trim()
        .isInt()
        .isLength({min:5})
        .escape()
    ,
    body("price","Price must not be empty")
        .trim()
        .isInt()
        .escape()
    ,
   
    body("status").escape(),
    body("size").escape(),

    (req, res, next) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }else{
            const { name, description, category, number_in_stock, price, size, status } = req.body;

            const shoe = new Shoe({
    
                name: name,
                description: description,
                category: category,
                number_in_stock: number_in_stock,
                price: price,
                size: size,
                status: status,
    
            });
            shoe.save()

            res.status(201).json(shoe);
        }

        }

        

]








exports.UpdateShoe = (req, res) => {
    res.send("Shoe updated: Not implemented");
}

exports.DeleteShoe = (req, res) => {
    res.send("Shoe Deleted!: Not implemented");
}



