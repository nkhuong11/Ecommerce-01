const jwt = require('jsonwebtoken');

// JWT is put on the Headers of the request for authentication with the format: Bearer JWT

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer token13123131
        console.log(token);
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decode;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authenticate failed'
        });
    }
}