import express from 'express';
import mongoose from 'mongoose';
import Controller from '../controllers/controller';

const router = express.Router();

const db = process.env.DB;

mongoose.connect(
    db, { useNewUrlParser: true, useUnifiedTopology: true },
    function(err) {
        if (err) {
            console.error("Error! " + err);
        } else {
            console.log("Connected to mongodb");
        }
    }
);


router.get("/students", Controller.verifyTokenTeacher, Controller.getStudents);

router.get("/ratings", Controller.verifyTokenStudent, Controller.getRatings);

router.post("/students/add", Controller.verifyTokenTeacher, Controller.addRating);

router.delete("/students/delete", Controller.verifyTokenTeacher, Controller.deleteRating)

router.post("/login", Controller.login);

module.exports = router;
