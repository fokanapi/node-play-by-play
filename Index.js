// var http = require("http");

// http.createServer(function (request, response) {
//     response.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });
//     response.end('Hello World');
// }).listen(3000, "127.0.0.1");

// console.log('Server running at my localhost');


var express = require("express");

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true    
}));

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dogs");

var cats = require("./routes/dogs.js")(app);

app.get('/', function (req, res) {
    // res.send('Hellow from get');
    res.json({
        name: 'kiks',
        age: 30
    });
});

var server = app.listen(3000, function () {
    console.log('listen to port 3000...');
});