const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        maxlength: 100
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
        red: 'Publisher',
        required: true
    },
    shipping: {
        required: true,
        type: Boolean
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    publish: {
        required: true,
        type: Boolean
    },
    images: {
        type: Array,
        default: []
    }
}, {timestamps:true, collection: 'product'});

const Product = mongoose.model('Product', productSchema);

module.exports = {Product}