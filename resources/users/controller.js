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
    const isUser = await UserService.find(req.body.username)
    if (
        typeof req.body.username != 'string' ||
        typeof req.body.nickname != 'string' ||
        typeof req.body.password != 'string'
    ) {
        res.status(401).json({ message: 'invalid BODY'});
    } else if (isUser) {
        res.status(400).json({ message: 'Username is taken'})
    } else {
        try {
            const newUser = await UserService.createUser(req.body);
            res.status(201).send(newUser);
        }catch(err) {
            console.log(err);
            res.status(500).send(err);
        }finally {
            next();
        }
    }
    
})



module.exports = router; 