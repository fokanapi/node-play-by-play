var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true    
}));

var pets = require("./routes/pets.js")(app);

app.get('/', function (req, res) {
    res.json({
        info: 'You are in Pet server',
    });
});

var server = app.listen(3002, function () {
    console.log('Pet server: listen to port 3002...');
});