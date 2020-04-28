const express = require('express');
const  ValidatorCheckOffensiveWord = require('../../middleware/validatorOfensiveWors');
const CommentService = require('./service');
const router = express.Router();
const passport = require('../../passport');


router.put('/:id', passport.authenticate('jwt', { session: false }), ValidatorCheckOffensiveWord, async(req, res, next) => {
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

//poblisher solo puede borrar comentarios de sus entradas, admin todos
router.delete('/:id',passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    try {
        const role =  req.user.role;
        console.log(role)
        if(role === 'admin'){
            const id = req.params.id;
            const result = await CommentService.deleteComment(id);
            if (result !== null) {
                res.status(200).json(result);
            }else{
                res.status(404).json({message: 'Recurso no encontrado'})
            }
        }
        
    } catch (error) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
});

module.exports = router;