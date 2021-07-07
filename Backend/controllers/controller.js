import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Student from '../models/students'

export const verifyTokenTeacher = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
        return res.status(401).send("Unauthorized request");
    }
    let payload = jwt.verify(token, "verySecretKeyTeacher");
    if (!payload) {
        return res.status(401).send("Unauthorized request");
    }
    req.userId = payload.subject;
    next();
};

export const verifyTokenStudent = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
        return res.status(401).send("Unauthorized request");
    }
    let payload = jwt.verify(token, "verySecretKeyStudent");
    if (!payload) {
        return res.status(401).send("Unauthorized request");
    }
    req.userId = payload.subject;
    next();
};

export const deleteRating = (req, res) => {
    Students.updateOne({ login: req.body.login }, { $pull: { ratings: { _id: req.body.id } } },
        (err, user) => {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
            }
        }
    );
};

export const login = (req, res) => {
    let userData = req.body;
    User.findOne({ login: userData.login }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                res.status(401).send("Nieprawidłowy login lub hasło!");
            } else if (user.password !== userData.password) {
                res.status(401).send("Nieprawidłowy login lub hasło!");
            } else {
                let status = user.status;
                if (status === "teacher") {
                    let payload = { subject: userData._id };
                    let token = jwt.sign(payload, "verySecretKeyTeacher");
                    res.status(200).send({ token, status });
                } else if (status === "student") {
                    let payload = { subject: userData._id };
                    let token = jwt.sign(payload, "verySecretKeyStudent");
                    res.status(200).send({ token });
                } else res.status(401).send("Something went wrong");
            }
        }
    });
};

export const addRating = (req, res) => {
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
                Students.updateOne({ login: userData.login }, { $push: { ratings: raiting } },
                    (err, user) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(200).send("Ocena została dodana!");
                        }
                    }
                );
            } else {
                res.status(400).send("Podaj prawidłową wartość oceny!");
            }
        }
    });
};

export const getRatings = (req, res) => {
    Students.find({ login: req.query.login }).then((data) => {
        res.jsonp(data);
    });
};

export const getStudents = (req, res) => {
    Students.find({}).then((data) => {
        res.jsonp(data);
    });
};