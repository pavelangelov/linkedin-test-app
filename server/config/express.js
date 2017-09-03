"use strict";

const express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser");

module.exports = (config, app) => {
    // here load other routs
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    let secretKey = process.env["SECRET_KEY"] || config.development.secret;
    app.use(cookieParser(secretKey));
    app.use("/static", express.static(`${config.path.rootPath}/public`));
};