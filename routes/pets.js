var r = require("request").defaults({
    json: true
});

var async = require("async");

module.exports = function (app) {
    app.get(
        '/pets',
        function (req, res) {
            async.parallel({
                    dogs: function (callback) {
                        r({
                                uri: "http://localhost:3001/dog"
                            },
                            function (error, response, body) {
                                if (error) {
                                    callback({
                                        service: 'dog',
                                        error: error
                                    });
                                } else if (!error && response.statusCode === 200) {
                                    callback(null, body);
                                } else {
                                    callback(response.statusCode);
                                }
                            });
                    },
                    cats: function (callback) {
                        r({
                                uri: "http://localhost:3000/cat"
                            },
                            function (error, response, body) {
                                if (error) {
                                    callback({
                                        service: 'cat',
                                        error: error
                                    });
                                } else if (!error && response.statusCode === 200) {
                                    callback(null, body);
                                } else {
                                    callback(response.statusCode);
                                }
                            });
                    }
                },
                function (error, result) {
                    res.send({
                        error: error,
                        result: result
                    });
                }
            );
        });
};