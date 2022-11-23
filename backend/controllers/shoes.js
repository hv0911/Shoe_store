const Shoe = require('../models/shoes');
const { body, validationResult } = require('express-validator');
const async = require("async")
exports.HomePage = (req, res) => {

    res.send("Home Page: Not Implemented");

}

exports.ShoesList = (req, res, next) => {

    Shoe.find()
        .sort({ price: 1 })
        .populate("category")
        .exec((err, shoes) => {
            if (err) {
                return next(err);
            }

            if (shoes == null) {
                const err = new Error("Shoes not found");
                err.status = 404;
                return next(err);
            }

            res.status(201).json(shoes);
        });


}

exports.ShoeDetail = (req, res, next) => {
    Shoe.findById(req.params.id)
        .populate("category")
        .exec((err, shoe) => {
            if (err) {
                return next(err);
            }
            if (shoe === null) {
                const err = new Error("Shoe not found");
                err.status = 404;
                return next(err);
            }

            res.status(201).json(shoe);
        })
}


exports.CreateShoeGet = (req, res) => {
    res.send("Shoe Created!: Not implemented ");
}


exports.CreateShoePost = [

    body("name", "name must not be empty")
        .isLength({ min: 1 })
        .escape()
    ,
    body("description", "Description must not be empty")
        .isLength({ min: 1 })
        .escape()
    ,
    body("number_in_stock", "Stock Number must not be empty")
        .trim()
        .isInt()
        .isLength({ min: 5 })
        .escape()
    ,
    body("price", "Price must not be empty")
        .trim()
        .isInt()
        .escape()
    ,

    body("status").escape(),
    body("size").escape(),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
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








exports.UpdateShoe = [

    body("name", "name must not be empty")
        .isLength({ min: 1 })
        .escape()
    ,
    body("description", "Description must not be empty")
        .isLength({ min: 1 })
        .escape()
    ,
    body("number_in_stock", "Stock Number must not be empty")
        .trim()
        .isInt()
        .isLength({ min: 5 })
        .escape()
    ,
    body("price", "Price must not be empty")
        .trim()
        .isInt()
        .escape()
    ,

    body("status").escape(),
    body("size").escape(),
    body("category", "category is required")
        .escape()
        ,

        (req ,res ,next )=>{

            const errors = validationResult(req);

            const { name, description, category, number_in_stock, price, size, status } = req.body;

            const shoe = new Shoe({

                name: name,
                description: description,
                category: category,
                number_in_stock: number_in_stock,
                price: price,
                size: size,
                status: status,
                _id:req.params.id  // this is required 

            });

            if(!errors.isEmpty()){

                res.status(201).json({
                    errors:errors.array()
                });
                return ;
            }

            Shoe.findByIdAndUpdate(req.params.id , shoe , {} , (err , prevShoe)=>{
                if(err){
                    return next(err);
                }
                res.status(201).json({
                    prevShoe:prevShoe,
                    updatedShoe:shoe,
                    message:"Shoe updated"
                });
            })
        }

]

exports.DeleteShoe = (req, res , next ) => {
  
     async.parallel(
        {
            shoe(callback){
              Shoe.findById(req.params.id).exec(callback)
            },
        },
        (err,results)=>{

            if(err){
               return next(err)
            }

            if(results.shoe===null){
                res.status(404).json({
                    Message:"Shoe not found"
                })
            }else{
                Shoe.findByIdAndDelete(req.params.id , (err )=>{
                    if(err){
                        return next(err);
                    }
                
                    res.status(201).json({
                        message:"Shoe Deleted"
                    })
                })
            }
        }
     )
  

}



