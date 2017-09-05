"use strict";

const Candidate = require("./models").Candidate;

module.exports = {
    create(candidateObj) {
        let now = new Date(),
            utc_now = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            
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
            linkedIn: candidateObj.linkedIn,
            createdOn: utc_now,
            lastUpdate: utc_now,
            assignedJobs: []
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
    update(id, candidateObj) {
        let now = Date.now();

        return new Promise((resolve, reject) => {
            Candidate.findOneAndUpdate(
                { "_id": id }, 
                { 
                    "email": candidateObj.email,
                    "firstName": candidateObj.firstName,
                    "lastName": candidateObj.lastName,
                    "designation": candidateObj.currentDesignation,
                    "employer": candidateObj.currentEmployer,
                    "location": candidateObj.location,
                    "phone": candidateObj.phone,
                    "experience": candidateObj.yearsExperience,
                    "education": candidateObj.education,
                    "skills": candidateObj.topSkills,
                    "linkedIn": candidateObj.linkedIn,
                    "lastUpdate": now,
                }, 
                { new: true },
                (err, user1) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user1);
                }
            );
        });
    },
    addJobs(id, jobsArr) {
        let now = Date.now();

        return new Promise((resolve, reject) => {
            Candidate.findOneAndUpdate(
                { "_id": id }, 
                { 
                    "lastUpdate": now,
                    "assignedJobs": jobsArr
                }, 
                { new: true },
                (err, user1) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user1);
                }
            );
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