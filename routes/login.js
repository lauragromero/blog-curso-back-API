
const express = require('express');

const jwt = require("jsonwebtoken");

const SECRET_KEY = "SECRET_KEY" 
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const user = req.user;
        const opts = { expiresIn: 3000 }; 
        const token = jwt.sign({ user: user.username, nickname:user.nickname, id: user._id, role: user.role}, SECRET_KEY, opts);
        return res.status(200).json({ message: "Auth Passed", token });
    }catch(err) {
        console.log(err);
        res.status(401).json({ message: 'User not found'});
        res.status(500).send(err);
    }finally {
        next();
    }
    
})

module.exports= router