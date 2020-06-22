'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    username: {type: 'String'},
    nickname: {type: 'String'},
    title: {type: 'String'},
    authorId: { type: 'String'},
    text: {type: 'String'},
    date: { type: Date, default: Date.now },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comments"}]

},  {collection: 'posts'})


module.exports = mongoose.model('posts', PostSchema);