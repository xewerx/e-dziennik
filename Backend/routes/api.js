const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const Students = require("../models/students");

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

router.get("/students", (req, res) => {
  Students.find({}).then((data) => {
    res.jsonp(data);
  });
});

router.post("/students/add", (req, res) => {
  let userData = req.body;
  Students.findOne({ login: userData.login }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (
        userData.ratingAdd == 1 ||
        userData.ratingAdd == 2 ||
        userData.ratingAdd == 3 ||
        userData.ratingAdd == 4 ||
        userData.ratingAdd == 5 ||
        userData.ratingAdd == 6
      ) {
        const raiting = {
          for: userData.forAdd,
          value: userData.ratingAdd,
          date: new Date(),
        };
        Students.updateOne(
          { login: userData.login },
          { $push: { ratings: raiting } },
          (err, user) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).send("Ocena została dodana!");
            }
          }
        );
      } else {
        res.status(400).send("Podaj prawidłową wartość oceny");
      }
    }
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;
  User.findOne({ login: userData.login }, (err, user) => {
    console.log(user);
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
