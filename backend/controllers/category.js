
const Category = require('../models/category');
const Shoe  = require("../models/shoes");
const { body, validationResult } = require("express-validator");
const async = require("async");
const { ShoesList } = require('./shoes');
const category = require('../models/category');
const { findByIdAndDelete } = require('../models/shoes');

exports.categoryList = (req, res) => {

    Category.find()
            .exec((err,categories)=>{

                if(err){
                    return next(err);
                }
                if(categories===null){
                    const err = new Error("Categories Not Found");
                    err.status = 404;
                    return next(err);
                }
                res.status(201).json(categories);

            })
  
}


exports.categoryDetail = (req, res ,next) => {
    
    async.parallel(

        {
            category(callback){
                Category.findById(req.params.id).exec(callback);
            },
            shoes(callback){
                Shoe.find({category:req.params.id}).exec(callback)
            },
        }
       , 
        (err,results)=>{
           
            if(err){
                return next(err);
            }
            if(results.category===null){
                const err = new Error("category not found");
                err.status = 404;
                return next(404);
            }
            
            res.status(201).json({
                category:results.category,
                shoes:results.shoes
            }) 
        }
    )

}


exports.createCategoryPost = [
    body("name", "Name must not be empty")
        .trim()
        .isLength({ min: 2 })
        .escape()
    ,
    body("description", "Name must not be empty")
        .isLength({ min: 5 })
        .escape()
    ,
    (req,res,next)=>{

        const errors = validationResult(req);

        if(!errors.isEmpty){
           return res.status(400).json({errors:errors.array()});
        }else{
            
            const { name,description } = req.body;
            const category = new Category({
                name:name,
                description:description,
            });
            category.save();

            res.status(201).json(category);
        }


    }

]

exports.createCategoryGet = (req, res) => {
    res.send("Category Created!: Not implemented");
}



exports.updateCategory = [
    body("name", "Name must not be empty")
        .trim()
        .isLength({ min: 2 })
        .escape()
    ,
    body("description", "Name must not be empty")
        .isLength({ min: 5 })
        .escape()
    ,

    (req , res ,next )=>{

        
        const errors = validationResult(req);
        
        const {name , description } = req.body;

        const category = new Category({
            name:name,
            description:description,
            _id:req.params.id     // this is required otherwise new id will assign

        });

        if(!errors.isEmpty()){
        
            res.status(404).json({
                errors:errors.array()
            })
        
            return ;
        }

        Category.findByIdAndUpdate(req.params.id , category , {} , (err , previous)=>{
            if(err){
                return next(err);
            }
            res.status(201).json({
                prevCategory:previous,
                updatedCategory:category,
                message:"Category Updated",
            });
        })

        
    }
    
]


exports.deleteCategory = (req, res) => {
 
    async.parallel(
     {
        category(callback){
            Category.findById(req.params.id).exec(callback);
        },
        shoes(callback){
            Shoe.find({category:req.params.id}).exec(callback);
        },

     },
     (err,results)=>{

        if(err){
            next(err);
        }

        if(results.shoes.length > 0 ){
            res.json({
                message:"Delete the shoes first ",
                shoes:results.shoes
            })
        }else{

            Category.findByIdAndDelete(req.params.id , (err)=>{
                if(err){
                    return next(err);
                }
                res.status(201).json({
                    message:"Category Deleted"
                })
            })

        }

     }
    )

}