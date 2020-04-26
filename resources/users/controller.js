const express = require('express');
const UserService = require('./service');


const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const newUser = await UserService.createUser(req.body);
        const createToken=  await UserService.createToken(req.body)
        res.status(201).send(newUser);
    }catch(err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
    
})



module.exports = router; 