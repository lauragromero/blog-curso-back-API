const express = require('express');
const  ValidatorCheckOffensiveWord = require('../../middleware/validatorOfensiveWors');
const CommentService = require('./service');
const router = express.Router();
const passport = require('../../passport');


router.put('/:id', ValidatorCheckOffensiveWord, async(req, res, next) => {
    try {
        const id = req.params.id;
        const comment = req.body;
        const result = await CommentService.updateComment(id, comment);
        if (result !== null) {
            res.status(200).json(result);
        }else{
            res.status(404).json({message: 'Recurso no encontrado'})
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
        const result = await CommentService.deleteComment(id);
        if (result !== null) {
            res.status(200).json(result);
        }else{
            res.status(404).json({message: 'Recurso no encontrado'})
        }
    } catch (error) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
});

module.exports = router;