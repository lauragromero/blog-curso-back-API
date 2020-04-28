
const express = require('express');

const jwt = require("jsonwebtoken");

const SECRET_KEY = "SECRET_KEY" //normally store this in process.env.secret
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const user = req.user;
        const opts = { expiresIn: 3000 }; 
        const token = jwt.sign({ user: user.username, id: user._id, isAdmin: user.isAdmin}, SECRET_KEY, opts);
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