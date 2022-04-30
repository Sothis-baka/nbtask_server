const PostModel = require('../../models/post');

const createPost = (input) => {
    // Set default value
    if(!input.title) input.title = 'Title';
    if(!input.question) input.question = 'Question';
    if(!input.answer) input.answer = 'Answer';

    const post = new PostModel(input);

    return post.save();
}

const updatePost = (input) => {
    return PostModel.findOneAndUpdate({ _id: input.postId }, input);
}

module.exports = { createPost, updatePost };