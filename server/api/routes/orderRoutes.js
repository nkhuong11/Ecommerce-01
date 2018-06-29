const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

//Controllers
const OrderControllers  = require('../controllers/orderControllers');


// Handling     /routes

router.get('/', OrderControllers.order_getAll);

router.post('/', OrderControllers.order_createOrder);

router.get('/:orderId', OrderControllers.order_getDetail);

router.delete('/:productId', OrderControllers.order_deleteOrder);





module.exports = router;