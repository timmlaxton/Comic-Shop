const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

// Middleware
const { auth } = require('./middleware/quth');
const {admin} = require('./middleware/admin');

//Models//
const {User} = require('./models/user');
const {Publisher} = require('./models/publisher');
const {Genre} = require('./models/genre');
const {Product} = require('/models/product');
const {Character} = require('./models/character');

app.all('/', function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    next();
});

// Character
app.post('/api.product/character', auth,admin,(req,res)=> {

    const character = new Character(req.body);

    character.save((err,doc) => {
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            character: doc
        })
    })
});

app.get('/api/product/characters', (req,res)=> {
    Character.find({},(err, characters)=> {
        if(err) return res.status(400).send(err);
        res.status(200).send(characters)
    })
});

//Products
app.get('/api/product/articles', (req,res)=> {

    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortby ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.find().
    populate('genre').
    populate('publisher').
    populate('character').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.send(articles)
    })

})

app.get('api/products/articles_by_id', (req,res)=> {
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array") {
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Product.
    find({'_id':{$in:items}}). 
    populate('genre'). 
    populate('publisher'). 
    populate('character').
    exec((err,docs)=> {
        return res.status(200).send(docs)
    })
})


app.post('/api/product/article', auth,admin, (req,res)=> {
    const product = new Product(req.body);

    product.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            article: doc
        })
    })
});

//Genre
app.post('/api/product/genre', auth,admin,(req,res)=> {

    const genre = new Genre(req.body);

    genre.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            genre:doc
        })
    })
});

app.get('/api/product/genres', (req,res)=> {
    Genre.find({},(err,genres)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(genres)
    })
})

//Publisher
app.post('/api/product/publisher', auth,admin,(req,res)=>{
    const publisher = new Publisher(req.body);

    publisher.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status.status(200).json({
            success: truw,
            publisher:doc
        })
    })
})


app.get('api/product/publisher', (req,res)=> {
    Publisher.find({},(err,publishers)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(publishers)
    })
})


//User
app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })

})

app.post('/api/user/register',(req,res)=>{
    const user = new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        res.status(200).json({
            success: true,
            userdata:doc
        })
    })
});

app.post('/api/users/login',(req,res)=> {
    
    User.findOne({'email':req.body.email}, (err, user)=>{
        if(!user) return res.json({loginSuccess:false,message: "Auth failed, email not found"});

        user.comparePassword(req.body.password,(err, isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false,message:'Wrong password'});

            user.generateToken((err,user)=> {
                if(err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                })

            })
        })

    })
})

app.get('/api/user/logged',auth,(req, res)=> {

User.findOneAndUpdate(
    {_id:req.user._id },
    {token: ""},
    (_err,doc)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).send({
        success: true
            
            })
        }
    )
})

const port = process.env.PORT || 3002;
app.listen(port, ()=> {
    console.log(`Server running at ${port}`)
    
})