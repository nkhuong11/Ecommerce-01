const mongoose = require('mongoose');
const Product = require('../models/product');

exports.product_getAll = (req, res, next) => {
    Product.find()
    .select('name price _id quantity imageUrl')  
    .exec()
    .then(docs => {
        const response = {
            count : docs.length,
            product: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    quantity: doc.quantity,
                    imageUrl: doc.imageUrl,
                    description: req.body.description,
                    request: {
                        type: 'GET',
                        description: 'PRODUCT_DETAIL',
                        url: 'http://localhost:3000/product/' + doc._id,
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}


exports.product_getDetail = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id quantity imageUrl')
    .exec()
    .then(doc => {
        console.log('From database', doc);
        if (doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: 'GET_ALL_PRODUCTS',
                    url: 'http://localhost:3000/product'
                }
            });
        } else {
            res.status(404).json({
                message: 'No valid entry found for provided ID'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
}

exports.product_createProduct = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
    });
    product.save()
        .then(result => {
            res.status(200).json({
                message: 'Created product successfully ',
                createProduct: {
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    quantity: result.quantity,
                    imageUrl: result.imageUrl,
                    description: result.description,
                    request: {
                        type: 'GET',
                        description: 'PRODUCT_DETAIL',
                        url: 'http://localhost:3000/product/' + result._id,
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });  
}

exports.product_updateProduct = (req, res, next) => {
    const id = req.params.productId
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value; 
    }
    
    Product.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    description: 'PRODUCT_DETAIL',
                    url: 'http://localhost:3000/product/' + id,
                }
            });      
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
}

exports.product_deleteProduct = (req, res, next) => {
    const id = req.params.productId
    Product.findOneAndRemove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                description: 'CREATE_PRODUCT',
                type: 'POST',
                url: 'http://localhost:3000/product',
                body: { 
                    name: 'String', 
                    price: 'Number',
                    quantity: 'Number',
                    imageUrl: 'String'
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    } );
}