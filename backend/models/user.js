const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const auth = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

auth.plugin(uniqueValidator);

module.exports = mongoose.model('User', auth);