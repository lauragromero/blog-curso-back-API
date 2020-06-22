const Comment = require ('./model');

const CommentRepository = {}

CommentRepository.addComment = async (comment, authorId, postAuthId) => {
    console.log(authorId, postAuthId)
    try {
        const newComment = new Comment(
            {username: comment.username ,
            nickname: comment.nickname,
            comment: comment.comment,
            authPost: postAuthId,
            });
        console.log(newComment)
        return await newComment.save();   
    } catch (err) {
        console.log(err);
    }
}


CommentRepository.getById = async (id) => {
    try {
        const comment = await Comment.findById(id);
        return comment;
    } catch (err) {
        console.log(err);
    }
}
CommentRepository.updateComment = async (id, comment) => {
    try {
        let commentUpdate = await Comment.findByIdAndUpdate(id, comment, {new: true});
        return commentUpdate;   
    } catch (err) {
        console.log(err);
    }
}

CommentRepository.deleteComment = async (id) => {
    try {
        let commentDelete = await Comment.findByIdAndDelete(id);
        return commentDelete;
    } catch (err) {
        console.log(err);
    }
}

module.exports= CommentRepository;