const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    ids: {
        type: Array,
        required: true
    }
}, { collection: 'sessions' });

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;