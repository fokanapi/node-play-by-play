var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true    
}));

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dogs");

var dogs = require("./routes/dogs.js")(app);

app.get('/', function (req, res) {
    res.json({
        info: 'You are in Dog server',
    });
});

var server = app.listen(3001, function () {
    console.log('Dog server: listen to port 3001...');
});