"use strict";

const express = require("express"),
    config = require("./constants");

const app = express();

let data = require("../database-services");
require("./database")(config);
require("./express")(config, app);
require("./routers")(app, data);

module.exports = app;