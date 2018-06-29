
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_getAll = (req, res, next) => {
    User.find()
    .select('email')  
    .exec()
    .then(users => {
        const response = {
            count : users.length,
            users: users
            }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

exports.user_getDetail = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .select('_id name email userType')
    .exec()
    .then(user => {
        console.log('User detail: ', user);
        if (user){
            res.status(200).json({
                user: user,
                request: {
                    type: 'GET',
                    description: 'GET_ALL_USER',
                    url: 'http://localhost:3000/user'
                }
            });
        } else {
            res.status(404).json({
                message: 'No valid user found for provided ID'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
}



exports.user_signUp = (req, res, nest) => {
    User.find({email: req.body.email})
        .exec()
        .then(result => {
            if (result.length > 0) {
                // 409 : CONFLICT
                return res.status(409).json({
                    message: 'Mail is used'
                });
            } else {
                ///Check if admin is already already existed
                if (req.body.name == 'admin') {
                    User.find({name: req.body.name})
                        .exec()
                        .then(user => {
                            if (user.length > 0) {
                                return res.status(409).json({
                                    message: 'Admin is already existed'
                                });
                            }

                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                if (err){
                                    return res.status(500).json({
                                        error: err
                                    })
                                } else {
                                    const user = new User({
                                        _id: new mongoose.Types.ObjectId(),
                                        email: req.body.email,
                                        name: req.body.name,
                                        userType :  req.body.name == 'admin' ? 'admin': 'basic',
                                        password: hash
                                        });
            
                                    user.save()
                                        .then(result => {
                                            res.status(201).json({
                                                message: 'User Created',
                                            })
                                        })
                                        .catch(err => {
                                          console.log(err);
                                          res.status(500).json({
                                              error: err
                                          })  
                                        })
                                }
                            });
                        })
                }    
            }
        })
}

exports.user_signIn = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Authenticate failed'
            });
        }
        // decode and compare
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Authenticate failed'
                });
            }

            if (result){
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id,
                        userType: user[0].userType
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '8h'
                    }
                )
                return res.status(200).json({
                    message: 'Authenticate successful',
                    token: token
                })
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })  
    })
}

exports.user_deleteUser = (req, res, next) => {
    User.findOneAndRemove({_id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted',
                request: {
                    description: 'CREATE_USER',
                    type: 'POST',
                    url: 'http://localhost:3000/user',
                    body: { 
                        email: 'String', 
                        password: 'String'
                    }
                }
            })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}