"use strict";

const router = require("express").Router(),
    statusCodeNotFound = 404;

const auth_secret = process.env['APP_AUTH_SECRET'] || "test_sectret";


module.exports = (app, data) => {
    router.get("/candidate", (req, res) => {
        let username = req.headers["x-username"];
        data.candidates.getCandidate(username)
            .then(candidate => {
                res.send({ success: true, result: candidate });
            })
            .catch(err => res.send({ error: err.message }));
    })
        .post("/candidate", (req, res) => {
            data.candidates.create(req.body)
                .then(id => {
                    res.send({ success: true, result: id });
                })
                .catch(err => res.send({ error: err.message }));
        })
        .put("/candidate", (req, res) => {
            let id = req.headers["x-candidate-id"];
            data.candidates.update(id, req.body)
                .then(candidate => {
                    res.send({ success: true, result: candidate });
                })
                .catch(err => res.send({ error: err.message }))
        })
        .put("/candidate/add-jobs", (req, res) => {
            let id = req.headers["x-candidate-id"];

            if (!req.body.jobs) {
                res.statusCode = 400;
                res.send("Jobs are missing!");
                return;
            }
            data.candidates.addJobs(id, req.body.jobs)
                .then(candidate => {
                    res.send({ success: true, result: candidate });
                })
                .catch(err => res.send({ error: err.message }))
        })
        .get("/candidates", (req, res) => {
            data.candidates.all()
                .then(candidates => {
                    res.send({ success: true, result: candidates });
                })
                .catch(err => res.send({ error: err.message }));
        })
        .get("/event", (req, res) => {
            let id = req.headers["x-event-id"],
                auth = req.headers["x-auth-secret"];
            
            if (!auth) {
                res.statusCode = 401;
                res.send("Authentication secret key not found!");
                return;
            } else if (auth != auth_secret) {
                res.statusCode = 401;
                res.send("Authentication secret not match!");
                return;
            }

            if (!id) {
                res.statusCode = 400;
                res.send("Event ID not found!");
                return;
            }

            data.events.getEvent(id)
                .then(event => {
                    res.send({ success: true, result: event });
                })
                .catch(err => res.send({ error: err.message }));
        })
        .get("/events", (req, res) => {
            let auth = req.headers["x-auth-secret"];
            
            if (!auth) {
                res.statusCode = 401;
                res.send("Authentication secret key not found!");
                return;
            } else if (auth != auth_secret) {
                res.statusCode = 401;
                res.send("Authentication secret not match!");
                return;
            }
            data.events.all()
                .then(events => {
                    res.send({ success: true, result: events });
                })
                .catch(err => res.send({ error: err.message }));
        })
        .post("/events", (req, res) => {
            data.events.create(req.body, req)
                .then(id => {
                    res.send({ success: true, result: id });
                })
                .catch(err => res.send({ error: err.message }));
        })
        .all("*", (req, res) => {
            res.status(statusCodeNotFound);
            res.send();
        });

    app.use(router);
};