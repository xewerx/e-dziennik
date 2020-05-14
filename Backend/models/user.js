const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: String,
    password: String,
    status: String
});

module.exports = mongoose.model('user', userSchema, 'users');