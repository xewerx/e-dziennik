const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Students = require("../models/students");

const Controller = require('../controllers/controller');

const db =
  "mongodb+srv://admin:admin@cluster0-tigrh.mongodb.net/eventsdb?retryWrites=true&w=majority";

mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
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
