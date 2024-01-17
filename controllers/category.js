const Category = require('../models/Category');
// Le package fs expose des méthodes pour interagir avec le système de fichiers du serveur.
const fs = require('fs');

exports.createCategory = (req, res, next)=>{
   
    // const categoryObjet = JSON.parse(req.body.category);
    // JavaScript contenant toutes les informations requises du corps de requête 
    // analysé (en ayant supprimé en amont le faux_id envoyé par le front-end).
    delete req.body._id;
    const category = new Category({
        ...req.body
    })
    // const category = new Category({
    //     title: req.body.title
    // });

    // on enregister la modele dans mongoDB
    category.save()
        .then(() => res.status(201))
                    res.render('category', { message: 'New category seved !' } )                    
        .catch(error => res.status(400).json({error}));
    
};

exports.getAllCategory = (req, res, next) => {
    Category.find()
        .then(categorys => res.status(201).json(categorys))
        .catch(error => res.status(400).json({error}));          
};




