import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    login: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    ratings:[{
        for: String,
        value: String,
        date: Date
    }]
});

const Student = mongoose.model("Student", studentSchema);
export default Student;