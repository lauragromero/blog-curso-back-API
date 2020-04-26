const express = require('express');
const OffensiveValidator = require('../../middleware/validatorOfensiveWors'); 
const passport = require('../../passport');

const PostService = require('./service');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const posts = await PostService.getAll();
        res.status(200).json(posts);
    }catch(err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
    
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = await PostService.getById(id);
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
})

router.post('/',passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const newPost = await PostService.addPost(req.body);
        res.status(201).send(newPost);
    }catch(err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
})

router.put('/:id',passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = req.body;
        const result = await PostService.updatePost(id, post);
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

router.delete('/:id',passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await PostService.deletePost(id);
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


router.put('/:id/comment',passport.authenticate('jwt', { session: false }), OffensiveValidator,  async(req, res, next) => {
    try {
        const id = req.params.id;
        const comment = req.body;
        console.log('id', id);
        console.log('comment', comment);
        const postUpdate = await PostService.addComment(id, comment);
        res.status(200).json(postUpdate);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
});

module.exports= router;