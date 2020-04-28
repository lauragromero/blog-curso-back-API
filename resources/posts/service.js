const PostRepository = require('./repository'); 

const PostService = {};

PostService.getAll = async () => {
    try {
        return await PostRepository.getAll();   
    } catch (err) {
        console.log(err);
    }
}

PostService.getById = async (id) => {
    try {
        const post = await PostRepository.getById(id);
        return post;
    } catch (err) {
        console.log(err);
    }
}

PostService.addPost = async (post, authorId) => {
    try {
        return await PostRepository.addPost(post, authorId);
    } catch (err) {
        console.log(err);
    }
}

PostService.updatePost = async (id, post) => {
    try {
        return await PostRepository.updatePost(id, post);
    } catch (err) {
        console.log(err);
    }
}

PostService.deletePost = async (id) => {
    try{
        return await PostRepository.deletePost(id);
    }catch(err){
        console.log(err);
    }
}

PostService.addComment = async (id, comment, authorId, postAuthId) => {
    try {
        return await PostRepository.addComment(id, comment, authorId, postAuthId);
    } catch (err) {
        console.log(err);
    }
}

module.exports=  PostService;