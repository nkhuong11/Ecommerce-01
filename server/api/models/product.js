const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true,
    },
    quantity: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
        default: 'Not filled yet'
    },
    imageUrl: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema);