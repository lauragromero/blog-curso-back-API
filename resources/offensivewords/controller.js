const express = require('express');
//import OffensiveValidator from '../../middlewares/offensive-validator';
const OffensiveWordService = require('./service');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const offensiveWords = await OffensiveWordService.getAll();
        res.status(200).json(offensiveWords);
    }catch(err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
    
})


router.post('/', async (req, res, next) => {
    try {
        const newOffensiveWord = await OffensiveWordService.addOffensiveWord(req.body);
        res.status(201).send(newOffensiveWord);
    }catch(err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const offensiveWord = req.body;
        const result = await OffensiveWordService.updateOffensiveWord(id, offensiveWord);
        if (result !== null) {
            res.status(200).json(result);
        }else{
            res.status(404).json({message: 'Word not found'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await OffensiveWordService.deleteOffensiveWord(id);
        if (result !== null) {
            res.status(200).json(result);
        }else{
            res.status(404).json({message: 'Word not found'})
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
});


module.exports= router;