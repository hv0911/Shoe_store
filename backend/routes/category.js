const express = require("express");

const router = express.Router();

const Category = require("../controllers/category");

router.get('/categories',Category.categoryList);

router.get('/category/:id',Category.categoryDetail);

router.get('/category/create',Category.createCategoryGet);

router.post('/category/create',Category.createCategoryPost);

router.put('/category/:id/update',Category.updateCategory);

router.delete('/category/:id/delete',Category.deleteCategory);

module.exports = router;