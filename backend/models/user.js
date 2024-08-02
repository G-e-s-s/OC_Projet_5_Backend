const mongoose = require('mongoose');

const auth = mongoose.Schema({
    User: {
        email : { type: String, required: true },
        password : { type: String, required: true },
    }
});

module.exports = mongoose.model('Books', auth);