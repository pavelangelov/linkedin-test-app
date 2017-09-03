"use strict";

const path = require("path");
const port = process.env.PORT || 4001;

let rootPath = path.normalize(path.join(__dirname, "/../"));


module.exports = {
    development: {
        db: process.env["MONGODB_URI"] || "mongodb://localhost:27017/linkedin-test-app",
        port: port,
        secret: "secret_key"
    },
    path: { rootPath }
};