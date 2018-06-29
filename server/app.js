const express = require('express');
const app = express();
const morgan =require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const productRoutes = require('./api/routes/productRoutes');
const orderRoutes = require('./api/routes/orderRoutes');
const userRoutes = require('./api/routes/userRoutes');

mongoose.connect('mongodb://' + process.env.MLAB_USER_PASSWORD + '@ds135290.mlab.com:35290/e-commerce-database', () => {
    console.log('Connected to MongoDB')
});

app.use(morgan('dev'));
// Setup static folder for multer storage
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
// Setup CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers, "Origin, X-Requested-With, Content-Type, Accept, Authorization')
//     if (req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });




//Routes which shuold handle request
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); 
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app