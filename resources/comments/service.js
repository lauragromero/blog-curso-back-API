const CommentRepository = require('./repository');
const CommentService = {}

CommentService.updateComment = async (idComment, comment) => {
    try {
        return await CommentRepository.updateComment(idComment, comment);
    } catch (err) {
        console.log(err);
    }
};

CommentService.deleteComment = async (idComment) => {
    try {
        return await CommentRepository.deleteComment(idComment);
    } catch (err) {
        console.log(err);
    }
};

module.exports = CommentService;