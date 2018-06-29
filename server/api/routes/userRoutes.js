const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

//Controller
const userControllers = require('../controllers/userControllers');

router.get('/', userControllers.user_getAll);

router.get('/:userId', userControllers.user_getDetail);

// User { name: String, email: String, password: String}
router.post('/signup', userControllers.user_signUp);

router.post('/login', userControllers.user_signIn);

router.delete('/:userId', userControllers.user_deleteUser)


module.exports = router;
