const express = require('express');
// declaration de const "mongoose"
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');

// import route pour category, product...
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const path = require('path');

const app = express();

// connexione à MongoDB à completer
mongoose.connect('mongodb+srv://<user>:password...')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !')); 

// on ajoute les headers à notre reponse (comme dans API_reste)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Content-Type:'image/jpeg'");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// express prends toutes les requetes et met en disponisation les bodys de requettes
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //add this line

// on ajoute le moteur de tamplate et la route vers index.ejs à demarrage de application
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// routes attendues pour frontend externe
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);

// routes pour enregistrer les statick (images, JS,CSS ...) 
// sont enregistrés dans le dossier public !!!

//  routes pour afficher l'image de MongoDB
app.use('/public/images/', express.static(path.join(__dirname, '/public/images')));



// route pour se render sur page index.ejs  avec affichage de tous les produits
app.get('/', (req, res) => {
    Product.find()
    .then(products => 
                // console.log(categorys).
                res.render('index', {products: products }))
                .catch(error=> res.status(400).json({error: 'Un  problème'}));  
});

// route pour la page category.ejs
app.get('/category', (req,res) =>{
    res.render('category', { message: ''});
});


// route pour affichage allCategorys sur la page de API avec function d'affichage 
app.get('/allCategorys', (req,res) =>{
    Category.find()
    .then(categorys => 
                // console.log(categorys).
                res.render('allCategorys', {categorys: categorys}))
    .catch(error=> res.status(400).json({error: 'Un  problème'}));         
    
});

// route pour la page  productCreate.ejs avec formulaire de creation , nous avons besoin
// afficher nos categorys
app.get('/productCreate', (req,res) =>{
    Category.find()
    .then(categorys => 
        //  console.log(categorys).}
                res.render('productCreate', {categorys: categorys}))
    .catch(error=> res.status(400).json({error: 'Un  problème'}));
});

app.get('/product', (req,res) =>{
    res.render('product', { message: ''});
});


module.exports = app;