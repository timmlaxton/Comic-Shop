const mongoose = require('mongoose');

const shirtSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
},);

const Shirt = mongoose.model('Shirt', shirtSchema);

module.exports = {Shirt}

