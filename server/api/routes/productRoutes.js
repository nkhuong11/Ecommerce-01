const express = require('express');
const router = express.Router();

//Controller
const ProductControllers  = require('../controllers/productControllers');


const checkAuth = require('../middleware/check-auth');


router.get('/', ProductControllers.product_getAll);

router.get('/:productId', ProductControllers.product_getDetail);

// Product { name: String, price: Number, quantity: Number (default: 1), description: String, imageUrl: String}
router.post('/', ProductControllers.product_createProduct);

router.patch('/:productId', ProductControllers.product_updateProduct);

router.delete('/:productId', ProductControllers.product_deleteProduct);



module.exports = router;