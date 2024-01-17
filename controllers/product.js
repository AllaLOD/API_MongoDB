const { error } = require('console');
const Product = require('../models/Product');
const fs =require('fs');

exports.createProduct = (req, res, next)=>{

        delete req.body._id;
        const product = new Product({      
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                categoryId: req.body.categoryId,
                imageUrl: `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`     
        }); 
        //  on enregister le produit dans DB
        product.save()
                .then(() =>res.render('product', {message: 'Produit est enregestré'}))
                .catch(error=> res.status(400).json({error: "Problème d'enregistrement"}));
};

exports.getAllProducts = (req, res, next) =>{
        Product.find()
                .then(products =>res.status(200).json(products))
                .catch(error => res.status(400).json({error: 'Un problème'}));
};
