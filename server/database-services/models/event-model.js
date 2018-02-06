"use strict";

let requiredValidationMessage = "{PATH} is required";
const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
let ZohoEvent;

let eventSchema = new Schema({
    event_type: {
        type: String
    },
    data: {
        type: Object
    },
    request: {
        type: Object
    }
});

eventSchema.pre("save", true, function (next, done) {
    let self = this;
    mongoose.models["ZohoEvent"].findOne({ email: self.email }, function (err, event) {
        if (err) {
            done(err);
        } else {
            done();
        }
    });
    next();
});

mongoose.model("ZohoEvent", eventSchema);
ZohoEvent = mongoose.model("ZohoEvent");
module.exports = ZohoEvent;