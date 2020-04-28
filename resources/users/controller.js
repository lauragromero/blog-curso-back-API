const express = require('express');
const UserService = require('./service');


const router = express.Router();



router.get('/', async (req, res, next) => {
    try{
        const allUsers = await UserService.getAllUsers();
        res.status(200).json(allUsers);
    }catch(err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
    
})

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