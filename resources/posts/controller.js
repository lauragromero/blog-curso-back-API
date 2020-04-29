const express = require('express');
const OffensiveValidator = require('../../middleware/validatorOfensiveWors'); 
const passport = require('../../passport');

const PostService = require('./service');
const router = express.Router();

//todos pueden consultar los post 
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
        if (post !== null) {
            res.status(200).json(post);
        }else{
            res.status(404).json({message: 'Post not found'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
})


//solo pueden publicar si estás registrado 
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    
    try {
        const authorId = req.user._id;
        const newPost = await PostService.addPost(req.body, authorId);
        res.status(201).send(newPost);
    }catch(err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
})

// modificar un post, solo si eres admin o si ese post es de ese usuario 
router.put('/:id',passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    
    try {
        const authorId = req.user._id;
        const role =  req.user.role;
        const id = req.params.id;
        const post = req.body;
        const postID = await PostService.getById(id);
        console.log(postID.authorId, authorId)
        
        if(role === 'admin' || postID.authorId == authorId ){
            const result = await PostService.updatePost(id, post);
            if (result !== null) {
                res.status(200).json(result);
            }else{
                res.status(404).json({message: 'Post not found'})
            }
        }else{
            res.status(403).json({message: 'Can not modify this post'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
});

//borrar un post si eres admin o si ese post es del usuario
router.delete('/:id', passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    try {
        const authorId = req.user._id;
        const role =  req.user.role;
        const id = req.params.id;
        const postID = await PostService.getById(id);

        if(role=== 'admin' || postID.authorId == authorId ){
            const result = await PostService.deletePost(id);
            if (result !== null) {
                res.status(200).json(result);
            }else{
                res.status(404).json({message: 'Post not found'})
            }
        }else{
            res.status(403).json({message: 'Can not delete this post'})
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
});

//añadir comentarios tanto si eres admin como si eres publisher
router.put('/:id/comment',passport.authenticate('jwt', { session: false }), OffensiveValidator,  async(req, res, next) => {
    try {
        const authorId = req.user._id;
        const id = req.params.id;
        const postID = await PostService.getById(id);
        console.log(authorId, postID.authorId)
        const comment = req.body;
        const postUpdate = await PostService.addComment(id, comment, authorId, postID.authorId);

        if (postUpdate !== null) {
            res.status(200).json(postUpdate);
        }else{
            res.status(404).json({message: 'Comentario no añadido'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }finally {
        next();
    }
});

module.exports= router;