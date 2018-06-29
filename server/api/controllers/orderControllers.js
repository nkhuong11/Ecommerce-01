const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

exports.order_getAll = (req, res, next) => {
    Order.find()
    .select('_id owner product quantity')
    .populate('owner', '_id name email')
    .populate('product', '_id name price')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    owner: doc.owner, 
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        description: 'ORDER_DETAIL',
                        url: 'http://localhost:3000/order/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}

exports.order_createOrder = (req, res, next) => {
    // Find the product ID in the 
    Product.findById(req.body.productId)
    .then(product => {
        if (!product){
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        //Check if ID of owner is available
        User.findById(req.body.owner)
            .then(owner => {
                if (!owner){
                    return res.status(404).json({
                        message: 'Owner ID not found'
                    });
                }
                // IF product ID and owner ID are vaid => create new order
                const order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    owner: req.body.owner,
                    quantity: req.body.quantity,
                    product: req.body.productId
                });
                return order.save();
            })
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Order created',
                    createdOrder: {
                        _id: result._id,
                        product: result.product,
                        quantity: result.quantity
                    },
                    request: {
                        type: 'GET',
                        description: 'ORDER_DETAIL',
                        url: 'http://localhost:3000/order/' + result._id
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })  
    })
}

exports.order_getDetail = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('owner', '_id name email')
        .populate('product', '_id name price')
        .exec()
        .then(order => {
            if(!order) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
    
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    description: 'GET_ALL_ORDER',
                    url: 'http://localhost:3000/order'
                }
            });
        }).catch(err => {
            res.status.json({
                error: err
            })
        });
}

exports.order_deleteOrder = (req, res, next) => {
    Order.findOneAndRemove({_id: req.params.productId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order deleted',
            request: {
                description: 'CREATE_ORDER',
                type: 'POST',
                url: 'http://localhost:3000/order',
                body: { 
                    productId: '_id', 
                    owner: '_id',
                    quantity: 'Number'
                }
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    } );
}