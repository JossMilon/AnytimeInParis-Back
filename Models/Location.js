const mongoose = require("mongoose");

const Location = mongoose.model("Location", {
    properties: {
        name: String,
        description: String
    },
    geography: {
        coordinates: Array,
    },
    openings: {
        "Monday": Array,
        "Tuesday": Array,
        "Wednesday": Array,
        "Thursday": Array,
        "Friday": Array,
        "Saturday": Array,
        "Sunday": Array
    }
});

module.exports = Location;