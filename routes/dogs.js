var _ = require('lodash');
var Dog = require('../model/dogs.js')

module.exports = function (app) {

    _dogs = [];
    /* Create */
    app.post('/dog', function (req, res) {
        var newDog = new Dog(req.body);
        newDog.save(function (err) {
            if (err) {
                res.json({
                    info: 'error creating dog',
                    error: err
                });
            } else {
                res.json({
                    info: 'dog created successfully'
                });
            }
        });
    });

    /* Read */
    app.get('/dog', function (req, res) {
        Dog.find(
            function (err, dogs) {
                if (err) {
                    res.json({
                        info: "error reading dogs",
                        error: err
                    });
                }
                setTimeout(function () {
                    res.json({
                        info: "successfully loaded dogs",
                        data: dogs
                    })
                }, 7000);
            }
        );
    });

    app.get('/dog/:id', function (req, res) {
        Dog.findById(req.params.id, function (err, dog) {
            if (err) {
                res.json({
                    info: "error finding dog",
                    error: err
                });
            }
            res.json({
                info: "successfully loaded dog",
                data: dog
            });
        });

    });

    /* Update */
    app.put('/dog/:id', function (req, res) {
        Dog.findById(req.params.id, function (err, dog) {
            if (err) {
                res.json({
                    info: "unable to find dog",
                    error: err
                });
            }
            if (dog) {
                _.merge(dog, req.body);
                dog.save(function (err) {
                    if (err) {
                        res.json({
                            info: "unable to update dog",
                            error: err
                        });
                    } else {
                        res.json({
                            info: "dog updated successfully",
                            data: dog
                        });
                    }
                });
            } else {
                res.json({
                    info: "unable to find dog"
                });
            }

        });

    });

    /* Delete */
    app.delete('/dog/:id', function (req, res) {
        Dog.findByIdAndRemove(req.params.id, function (err, dog) {
            if (err) {
                res.json({
                    info: 'error removing dog'
                });
            }
            res.json({
                info: 'dog removed successfully'
            });
        });

    });
};