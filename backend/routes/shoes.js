const express = require("express");

const router = express.Router();

const Shoe = require('../controllers/shoes');

router.get('/',Shoe.HomePage);

router.get('/shoes',Shoe.ShoesList);

router.get('/shoe/:id',Shoe.ShoeDetail);

router.get('/shoe/create',Shoe.CreateShoeGet);

router.post('/shoe/create' ,Shoe.CreateShoePost);

router.put('/shoe/:id/update',Shoe.UpdateShoe);

router.delete('/shoe/:id/delete' , Shoe.DeleteShoe);

module.exports = router;

