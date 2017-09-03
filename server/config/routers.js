"use strict";

const router = require("express").Router(),
    statusCodeNotFound = 404;


module.exports = (app, data) => {
    router.get("/candidate", (req, res) => {
        let username = req.headers["x-username"];
        data.candidates.getCandidate(username)
            .then(candidate => {
                res.send({ success: true, result: candidate });
            })
            .catch(err => res.send({ error: err.message }))
    })
    .post("/candidate", (req, res) => {
        data.candidates.create(req.body)
            .then(id => {
                res.send({ success: true, result: id });
            })
            .catch(err => res.send({ error: err.message }));
    })
    .get("/candidates", (req, res) => {
        data.candidates.all()
            .then(candidates => {
                res.send({success: true, result: candidates});
            })
            .catch(err => res.send({error: err.message }));
    })
    .all("*", (req, res) => {
        res.status(statusCodeNotFound);
        res.send();
    });

    app.use(router);
};