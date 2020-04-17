'use strict';

const express = require('express');
const postControllers = require ('../controllers/posts');
const posts = express.Router(); 


posts.post('/post',  postControllers.addNewPost);
posts.get('/post', postControllers.getPosts);
posts.get('/post/:id',postControllers.getPostById);
posts.delete('/post/:id', postControllers.deletePost);
posts.put('/post/:id',postControllers.updatePost);


module.exports = posts