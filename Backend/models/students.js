const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentsSchema = new Schema({
    login: String,
    name: String,
    surname: String,
    raiting: Object
});

module.exports = mongoose.model('students', studentsSchema, 'IA');