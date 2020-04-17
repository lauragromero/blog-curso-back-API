'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// const CommentSchema = new Schema({
//     nickname: String,
//     username: String,
//     comment: String,
//     date: { type: Date, default: Date.now },
    
// })

const PostSchema = new Schema({
    username: String,
    nickname: String,
    title: String,
    text: String,
    date: { type: Date, default: Date.now },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comment"}

})

const Post = mongoose.model('Post', PostSchema)
module.exports = Post;