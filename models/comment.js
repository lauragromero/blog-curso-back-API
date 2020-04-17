
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    nickname: String,
    username: String,
    comment: String,
    date: { type: Date, default: Date.now },
    
})

const Comment = mongoose.model('Comment', CommentSchema); 
module.exports = Comment;