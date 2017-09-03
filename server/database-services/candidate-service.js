"use strict";

const Candidate = require("./models").Candidate;

module.exports = {
    create(candidateObj) {
        console.log(candidateObj)
        let candidate = new Candidate({
            email: candidateObj.email,
            firstName: candidateObj.firstName,
            lastName: candidateObj.lastName,
            designation: candidateObj.currentDesignation,
            employer: candidateObj.currentEmployer,
            location: candidateObj.location,
            phone: candidateObj.phone,
            experience: candidateObj.yearsExperience,
            education: candidateObj.education,
            skills: candidateObj.topSkills,
            linkedIn: candidateObj.linkedIn
        });

        return new Promise((resolve, reject) => {
            candidate.save((err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result._id);
            });
        });
    },
    getCandidate(username) {
        return new Promise((resolve, reject) => {
            Candidate.findOne({ "email": username }, (err, candidate) => {
                if (err) {
                    return reject(err);
                }

                return resolve(candidate);
            });
        });
    },
    all() {
        return new Promise((resolve, reject) => {
            Candidate.find({}, function(err, candidates) {
                resolve(candidates);  
              });
        });
    },
};