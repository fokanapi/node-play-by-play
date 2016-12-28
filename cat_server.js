var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true    
}));

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cats");

var cats = require("./routes/cats.js")(app);

app.get('/', function (req, res) {
    res.json({
        info: 'You are in Cat server',
    });
});

var server = app.listen(3000, function () {
    console.log('Cat server: listen to port 3000...');
});