"use strict";

const ZohoEvent = require("./models").ZohoEvent;

module.exports = {
    create(model) {
        console.log(model);
        let event = new ZohoEvent({
            event_type: model.event_type,
            data: model.data || model
        });

        return new Promise((resolve, reject) => {
            event.save((err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result._id);
            });
        });
    },
    getEvent(id) {
        return new Promise((resolve, reject) => {
            ZohoEvent.findOne({ "_id": id }, (err, event) => {
                if (err) {
                    return reject(err);
                }

                return resolve(event);
            });
        });
    },
    update(id, model) {
        return new Promise((resolve, reject) => {
            ZohoEvent.findOneAndUpdate(
                { "_id": id }, 
                { 
                    "event_type": model.event_type,
                    "data": model.data
                }, 
                { new: true },
                (err, event) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(event);
                }
            );
        });
    },
    all() {
        return new Promise((resolve, reject) => {
            ZohoEvent.find({}, function(err, events) {
                resolve(events);  
              });
        });
    },
};