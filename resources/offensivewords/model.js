'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OffensiveWordsSchema = new Schema({
    word: {type: 'String'},
    level: {type: 'Number'}
})


module.exports = mongoose.model('offensiveWord', OffensiveWordsSchema)