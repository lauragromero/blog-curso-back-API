'use strict';
const Word = require ('../models/words');

async function getWords(req, res) {
    let allWords = await Word.find().exec();
    res.json(allWords);
}

async function addNewWord(req, res){
    const wordReq = req.body;
    if (typeof wordReq.word != 'string' || typeof wordReq.level  != 'number') {
        res.sendStatus(400);
    } else {
        const newWord = await Word.create(req.body)
        res.json(newWord);
    }
};

async function deleteWord(req, res) {
    const id = req.params.id;
    const word = await Word.findById(id);
    if (!word) {
        res.sendStatus(404);
    } else {
        await Word.findByIdAndDelete(id);
        res.json(word);
    }
};

async function updateWord (req, res) {
    const id = req.params.id;
    const word = await Word.findById(id);
    if (!word) {
        res.sendStatus(404);
    } else {
        const wordReq = req.body;
        if (typeof wordReq.word != 'string' || typeof wordReq.level  != 'number') {
            res.sendStatus(400);
        } else {
            word.word = wordReq.word; 
            word.level = wordReq.level; 
            await word.save();
            res.json(word);
        }
    }
};


module.exports={
    getWords, 
    addNewWord,
    deleteWord,
    updateWord, 
}