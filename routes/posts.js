'use strict';

const express = require('express');
const postControllers = require ('../controllers/posts');
const commentControllers = require ('../controllers/comments');
const posts = express.Router(); 

//post
posts.post('/post',  postControllers.addNewPost);
posts.get('/post', postControllers.getPosts);
posts.get('/post/:id',postControllers.getPostById);
posts.delete('/post/:id', postControllers.deletePost);
posts.put('/post/:id',postControllers.updatePost);

//coments
posts.get('/post/:id/comment', commentControllers.getAllCommets);
posts.post('/post/:id', commentControllers.addNewComent);
posts.put('/post/:id/comment/:id', commentControllers.updateComment);
posts.delete('/post/:id/comment/:id', commentControllers.deleteComment);

module.exports = posts;