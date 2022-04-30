const SessionModel = require('../../models/session');
const PostModel = require('../../models/post');

const getSessionInfo = () => {
    return new Promise((res) => {
        SessionModel.find({})
            .then(data => res(data[0]))
    })
}

const getPost = (id) => {
    return new Promise((res) => {
        PostModel.findById(id).then(data => res(data))
    })
}

module.exports = { getSessionInfo, getPost };