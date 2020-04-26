'use strict';

const express = require('express');
const postControllers = require('../resources/posts/controller');
const commentControllers = require('../resources/comments/controller');
const offensiveWordControllers = require('../resources/offensivewords/controller');
const userController = require('../resources/users/controller');
const loginController = require('./login')
const passport = require('../passport');

const routes = express.Router(); 

routes.use(passport.initialize());

routes.use('/post',postControllers);
routes.use('/comment', commentControllers);
routes.use('/offensiveword', offensiveWordControllers);
routes.use('/user',userController);
routes.use('/login',passport.authenticate('basic', { session: false }), loginController)








module.exports = routes;