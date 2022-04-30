const SessionModel = require('../../models/session');
const PostModel = require('../../models/post');
const { createPost } = require('./post');

const resetSession = async () => {
    // Empty DB
    await PostModel.deleteMany({});
    await SessionModel.deleteMany({});

    const post = await createPost({});
    const session = new SessionModel({
        ids: [[post._id]]
    });

    return session.save();
}

module.exports = { resetSession };