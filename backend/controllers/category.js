
const Category = require('../models/category');
const { body, validationResult } = require("express-validator");

exports.categoryList = (req, res) => {

    res.send("List Of Category:Not Implemented");
}

exports.categoryDetail = (req, res) => {
    res.send("Detail of a Category:Not Implemented");
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

exports.updateCategory = (req, res) => {
    res.send("Updated! : Not implemented");
}

exports.deleteCategory = (req, res) => {
    res.send("Category Deleted!: Not implemented");
}