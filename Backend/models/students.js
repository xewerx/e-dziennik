const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentsSchema = new Schema({
    login: String,
    name: String,
    surname: String,
    ratings:[{
        for: String,
        value: Number,
        date: Date
    }]
});

module.exports = mongoose.model('students', studentsSchema, 'IA');