const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const Students = require("../models/students");

const db = "mongodb+srv://admin:admin@cluster0-tigrh.mongodb.net/eventsdb?retryWrites=true&w=majority";


mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
  if (err) {
    console.error("Error! " + err);
  } else {
    console.log("Connected to mongodb");
  }
});

router.get("/students", (req, res) => {
    Students.find({ })
    .then((data) => {
        res.jsonp(data);
    })   
});


router.post("/login", (req, res) => {

  let userData = req.body;

  User.findOne({login: userData.login}, (err, user) => {
    console.log(user)
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        res.status(401).send("Invalid Login");
        
      } else if (user.password !== userData.password) {
        res.status(401).send("Invalid Password");
      } else {
        res.status(200).send(user);
      }
    }
  }); 
});

module.exports = router;
