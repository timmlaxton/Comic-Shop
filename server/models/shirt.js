const mongoose = require('mongoose');

const shirtSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    price:{
        required: true,
        type:  Number,
        maxlength: 255
    },
    shipping:{
        required: true,
        type: Boolean
    },
    available:{
        required: true,
        type: Boolean
    },
    sold:{
        type:Number,
        maxlength: 100,
        default: 0
    },
    publish:{
        required: true,
        type: Boolean
    },
    images:{
        type: Array,
        default: []
    }
},{timestamps: true, collection: 'Shirt' });

const Shirt = mongoose.model('Shirt', shirtSchema);

module.exports = {Shirt}

