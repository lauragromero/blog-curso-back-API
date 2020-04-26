
const express = require('express');
//const generateToken = require('../middleware/generateToken')

//const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require("jsonwebtoken");

const SECRET_KEY = "SECRET_KEY" //normally store this in process.env.secret
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const username = req.body.username;
       // const opts = { expiresIn: 120 }; //token expires in 2min
        const token = jwt.sign({ username }, SECRET_KEY);
        console.log(token, 'hola')
        return res.status(200).json({ message: "Auth Passed", token });
    }catch(err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
    
})

module.exports= router