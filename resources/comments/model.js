
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    nickname: {type: 'String'},
    username: {type: 'String'},
    comment: {type: 'String'},
    authPost: {type: 'String'},
    date: { type: Date, default: Date.now },
    
})


module.exports = mongoose.model('comments', CommentSchema); ;