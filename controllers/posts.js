'use strict';
const Post = require ('../models/post');

function toResponse(doc) {
    
    if(doc instanceof Array){
        return doc.map(elem => toResponse(elem));
    } else {
        let ret = doc.toObject({ versionKey: false });
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
    }    
}

async function getPosts(req, res) {
    let allPosts = await Post.find().exec();
    res.json(allPosts);


}

async function addNewPost(req, res){
    const post = req.body;
    if (typeof post.username  != 'string' || typeof post.nickname  != 'string' || typeof  post.title != 'string' ||
    typeof  post.text != 'string') {
        res.sendStatus(400);
    } else {
        
        const newPost = new Post({
            username: post.username ,
            nickname: post.nickname,
            title: post.title,
            text: post.text,
            date: post.date,
            comments: post.comments
            
        });
        
        await newPost.save();

        res.json(toResponse(newPost));
    }
}

async function getPostById (req, res){
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) {
        res.sendStatus(404);
    } else {
        res.json(toResponse(post));
    }
}

async function deletePost(req, res) {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) {
        res.sendStatus(404);
    } else {
        await Post.findByIdAndDelete(id);
        res.json(toResponse(post));
    }
}

async function updatePost (req, res) {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) {
        res.sendStatus(404);
    } else {
        const postReq = req.body;
        //Validation
        if (typeof postReq.username != 'string' || typeof postReq.nickname  != 'string' || typeof  postReq.title != 'string' || typeof  postReq.text != 'string') {
            res.sendStatus(400);
        } else {
            //Update model
            post.username = postReq.username; 
            post.nickname = postReq.nickname; 
            post.title = postReq.title; 
            post.text = postReq.text; 
            post.date = postReq.date; 
            post.comments = postReq.comments;

            //Save
            await post.save();
            
            //Return updated resource
            res.json(toResponse(post));
        }
    }
};



module.exports={
    getPosts, 
    addNewPost,
    getPostById,
    deletePost,
    updatePost
}
