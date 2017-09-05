"use strict";

let requiredValidationMessage = "{PATH} is required";
const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
let Candidate;

let candidateSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    employer: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    linkedIn: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date
    },
    lastUpdate: {
        type: Date
    },
    assignedJobs: []
});

candidateSchema.pre("save", true, function (next, done) {
    let self = this;
    mongoose.models["Candidate"].findOne({ email: self.email }, function (err, candidate) {
        if (err) {
            done(err);
        } else if (candidate) {
            self.invalidate("email", "Candidate already exist!");
            done(new Error("Candidate already exist!"));
        } else {
            done();
        }
    });
    next();
});

mongoose.model("Candidate", candidateSchema);
Candidate = mongoose.model("Candidate");
module.exports = Candidate;