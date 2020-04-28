
const CommentRepository = require('../comments/repository')
const Post = require('./model')

const PostRepository = {};

PostRepository.getAll = async () => {
    try {
        return await Post.find({}).select({comments: 0, __v:0});
    }catch(err) {
        console.log(err);
    }
}

PostRepository.getById = async (id) => {
    try {
        const post = await Post.findById(id).populate('comments');
        return post;
    } catch (err) {
        console.log(err);
    }
}

PostRepository.addPost = async (post, authorId) => {
    const newPost = new Post(
        {username: post.username ,
        nickname: post.nickname,
        authorId: authorId,
        title: post.title,
        text: post.text,
        date: post.date} 
    );
    return await newPost.save();
}

PostRepository.updatePost = async (id, post) => {
    try {
        let postUpdate = await Post.findByIdAndUpdate(id, post, {new: true});
        return await postUpdate;   
    } catch (err) {
        console.log(err);
    }
}

PostRepository.deletePost = async (id) => {
    try {
        let postDelete = await Post.findByIdAndDelete(id);
        return postDelete;
    } catch (err) {
        console.log(err);
    }
}


PostRepository.addComment = async (idPost, comment, authorId, postAuthId) => {
    try {
        const newComment = await CommentRepository.addComment(comment, authorId, postAuthId);
        let postUpdate = await Post.findByIdAndUpdate(idPost, {$push: {comments: newComment}}, {new: true});
        return postUpdate;
    } catch (err) {
        console.log(err);
    }
}

module.exports = PostRepository;