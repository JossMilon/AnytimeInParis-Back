//Importing packages
const express = require("express");
const formidable = require("express-formidable");
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

//DB setup
mongoose.connect(process.env.MONGODB_URI);

//Importing models
const Location = require("./Models/Location");

const app = express();
app.use(formidable());

app.get("/", async (req, res) => {
    try {
        const response = await Location.find();
        console.log(response);
        res.status(200).json(response)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
});

app.post("/add-location", async (req, res) => {
    try {
        const name = req.fields.name;
        const description = req.fields.description;
        const latitude = req.fields.latitude;
        const longitude = req.fields.longitude;
        const monday = req.fields.monday;
        const tuesday = req.fields.tuesday;
        const wednesday = req.fields.wednesday;
        const thursday = req.fields.thursday;
        const friday = req.fields.friday;
        const satursday = req.fields.satursday;
        const sunday = req.fields.sunday;
        const alreadyExist = await Location.find({ "properties.name": name });
        if (name === undefined || latitude === undefined || longitude === undefined) {
            res.status(400).json({ message: `Il manque des informations pour ajouter ce lieu.`})
        }
        else if (alreadyExist.length !== 0) {
            res.status(400).json({message: `Le lieu ${name} a déjà été ajouté 🙃.`});
        }
        else {
            const newLocation = new Location({
                properties: {
                    name: name,
                    description: description
                },
                geography: {
                    coordinates: [latitude, longitude],
                },
                openings: {
                    "Monday": monday,
                    "Tuesday": tuesday,
                    "Wednesday": wednesday,
                    "Thursday": thursday,
                    "Friday": friday,
                    "Saturday": satursday,
                    "Sunday": sunday
                }
            });
            await newLocation.save()
            res.status(200).json({message: `Le nouveau lieu ${name} vient d'être ajouté 😄`});
        }        
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server has started on port ${process.env.PORT || 3000}...`)
})