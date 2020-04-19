'use strict';

const express = require('express');
const words = express.Router(); 
const wordControllers = require ('../controllers/words');

//word
words.post('/word',  wordControllers.addNewWord);
words.get('/word', wordControllers.getWords);
words.delete('/word/:id', wordControllers.deleteWord);
words.put('/word/:id',wordControllers.updateWord);



module.exports = words;