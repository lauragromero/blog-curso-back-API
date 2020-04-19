'use strict'

const db = require ('../models');

async function getAllCommets (req, res) {
    db.Comment.find({}, function(err, cmn) {
        db.Comment.populate(cmn, {path: "Comment"},function(err, cmn){
            res.status(200).send(cmn);
        }); 
    });
};

async function addNewComent(req, res) {
    const commentReq = req.body;
    console.log(commentReq)
    if (typeof commentReq.username != 'string' || typeof commentReq.nickname  != 'string' || typeof  commentReq.comment != 'string') {
        res.sendStatus(400);
    } else {
        const dbComment = await db.Comment.create(req.body)
        const dbPost = await db.Post.findOneAndUpdate({ _id: req.params.id }, { comments: dbComment._id }, { new: true });
        await res.json(dbPost);
    }
    // db.Comment.create(req.body)
    // .then(function(dbComment) {
    //   return db.Post.findOneAndUpdate({ _id: req.params.id }, { comments: dbComment._id }, { new: true });
    // })
    // .then(function(dbPost) {
    //   res.json(dbPost);
    // })
    // .catch(function(err) {
    //   res.json(err);
    // });
    
};

async function updateComment(req, res){
    const id = req.params.id;
    const cmnt = await db.Comment.findById(id);
    if (!cmnt) {
        res.sendStatus(404);
    } else {
        const commentReq = req.body;
        if (typeof commentReq.username != 'string' || typeof commentReq.nickname  != 'string' || typeof  commentReq.comment != 'string') {
            res.sendStatus(400);
        } else {
            cmnt.username = commentReq.username; 
            cmnt.nickname = commentReq.nickname; 
            cmnt.comment = commentReq.comment; 
            cmnt.date = commentReq.date; 

            await cmnt.save();
            res.json(cmnt);
        }
    }

}; 

async function deleteComment(req, res){
    const id = req.params.id;
    const comment = await db.Comment.findById(id);
    if (!comment) {
        res.sendStatus(404);
    } else {
        await db.Comment.findByIdAndDelete(id);
        res.json(comment);
    }
}

module.exports = {
    getAllCommets, 
    addNewComent, 
    updateComment, 
    deleteComment
}