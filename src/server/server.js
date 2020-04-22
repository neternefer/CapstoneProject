//Initialize data container
const projectData = {};
//Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));
//GET route
app.get('/all', (req, res) => {
    res.send(projectData);
});
//POST route
app.post('/add', (req, res) => {
    projectData['location'] = req.body.location;
    projectData['countryCode'] = req.body.countryCode;
    projectData['tripStart'] = req.body.tripStart;
    projectData['tripEnd'] = req.body.tripEnd;
    projectData['daysToDeparture'] = req.body.daysToDeparture;
    projectData['tripLength'] = req.body.tripLength;
    projectData['temp'] = req.body.temp;
    projectData['icon'] = req.body.icon;
    projectData['desc'] = req.body.desc;
    res.send(projectData);
});
//Express server
app.listen(5000, () => {
    console.log('Listening on port 5000...');
});

