'use strict';

const express = require('express');
const passport = require('passport');
const authUser = require('./middleware/authUser');
const chekAuth = require('./middleware/chekAuth')

const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const SECRET_KEY = "SECRET_KEY"


const routes = express.Router(); 

routes.use(passport.initialize());

const verify = authUser.verify;
passport.use(new BasicStrategy(verify));


const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
}

passport.use(new JwtStrategy(jwtOpts, chekAuth))


module.exports = passport;