const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        maxlength:100
    },
    character:{
        type: Schema.Types.ObjectId,
        ref: 'Character',
        required: true
    },
    issue: { 
        required: true,
        type: Number,
        maxlength: 255
    },
    description: {
        required: true,
        type: String,
        maxlength: 100
    },
    price: {
        required: true,
        type: Number,
        maxlength: 255
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'Publisher',
        required: true
    },
    shipping: {
        required: true,
        type: Boolean
    },
    publish: {
        required: true,
        type: Boolean
    },
    images: {
        type: Array,
        default: []
    }
}, {timestamps:true, collection: 'Product'});

const Product = mongoose.model('Product', productSchema);
module.exports = {Product}