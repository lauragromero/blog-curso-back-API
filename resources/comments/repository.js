const Comment = require ('./model');

const CommentRepository = {}

CommentRepository.addComment = async (comment) => {
    try {
        const newComment = new Comment(comment);
        return await newComment.save();   
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