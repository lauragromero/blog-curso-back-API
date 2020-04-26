'use strict'

const mongoose = require('mongoose');
const bodyParser = require ('body-parser')
const express = require('express');
const passport = require('passport');


const url = "mongodb://admin:admin@localhost:27018/blogDB?authSource=admin";
const port = process.env.PORT || 3002; 

const app = express();

const routes = require('./routes/routes')
//////

const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');



const users = require('./resources/users/service');


// const SECRET_KEY = process.env.SECRETKEY;
const SECRET_KEY = 'SECRET_KEY'

async function verify(username, password, done) {

    let user = await users.find(username);
    if (!user) {
        return done(null, false, { message: 'User not found' });
    }

    if (await users.verifyPassword(user, password)) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'Incorrect password' });
    }
}

passport.use(new BasicStrategy(verify));

app.use(passport.initialize());

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
}

passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {

    const user = await users.find(payload.username);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'User not found' });
    }

}));


//rutas
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());
app.use(express.json());
app.use('/', routes);

//conexión a la base de datos 
async function dbConnect() {

    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });
    
    console.log("Connected to Mongo");

}

async function main() {

    await dbConnect();

    app.listen(port, () => console.log(`Server started in port ${port}`));
}

main();

module.exports= app; 