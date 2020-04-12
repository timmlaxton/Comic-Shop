const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
    cloud_name:'process.env.CLOUD_NAME',
    api_key:'process.env.CLOUD_API_KEY',
    api_secret:'process.env.CLOUD_SECRET'
})

// Middleware
const { auth } = require('./middleware/auth');
const {admin} = require('./middleware/admin');

//Models//
const {User} = require('./models/user');
const {Publisher} = require('./models/publisher');
const {Product} = require('./models/product');
const {Character} = require('./models/character');

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
 
    next();
});



//Products

app.post('/api/product/shop/back_issues',(req,res)=>{

    var order = req.body.order ? req.body.order : "desc";
    var sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    var limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    var skip = parseInt(req.body.skip);
    var findArgs = {};

    for(var key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    findArgs['publish'] = true;


    Product.
    find(findArgs).
    populate('character').
    populate('publisher').
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit). 
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles

        })

    })
})


app.get('/api/product/articles', (req,res)=> {

    var order = req.query.order ? req.query.order : "asc";
    var sortBy = req.query.sortby ? req.query.sortBy : "_id";
    var limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.find().
    populate('character').
    populate('publisher').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.send(articles)
    })

})

app.get('/api/product/articles_by_id',(req,res)=>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Product.
    find({ '_id':{$in:items}}).
    populate('character').
    populated('publisher').
    exec((err,docs)=>{
        return res.status(200).send(docs)
    })
});


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

// Character
app.post('/api/product/character', auth,admin,(req,res)=> {
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


//Publisher
app.post('/api/product/publisher',auth,admin,(req,res)=>{
    const publisher = new Publisher(req.body);

    publisher.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            publisher:doc
        })
    })
});


app.get('/api/product/publishers', (req,res)=> {
    Publisher.find({},(err, publishers)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(publishers)
    })
});




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

app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        res.status(200).json({
            success: true,
            userdata: doc
            
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

app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate(
        { _id:req.user._id },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true
            })
        }
    )
})

app.post('/api/users/uploadimage',auth,admin,formidable(),(req,res)=>{
    cloudinary.uploader.upload(req.files.file.path,(result)=>{
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    },{
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    })
})

const port = process.env.PORT || 3002;
app.listen(port, ()=> {
    console.log(`Server running at ${port}`)
    
})