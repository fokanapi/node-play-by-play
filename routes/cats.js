var _ = require('lodash');
var Cat = require('../model/cats.js')

module.exports = function (app) {

    _cats = [];
    /* Create */
    app.post('/cat', function (req, res) {
        var newCat = new Cat(req.body);
        newCat.save(function (err) {
            if (err) {
                res.json({
                    info: 'error creating cat',
                    error: err
                });
            } else {
                res.json({
                    info: 'cat created successfully'
                });
            }
        });
    });

    /* Read */
    app.get('/cat', function (req, res) {
        Cat.find(
            function (err, cats) {
                if (err) {
                    res.json({
                        info: "error reading cats",
                        error: err
                    });
                }
                res.json({
                    info: "successfully loaded cats",
                    data: cats
                });
            }
        );
    });

    app.get('/cat/:id', function (req, res) {
        Cat.findById(req.params.id, function (err, cat) {
            if (err) {
                res.json({
                    info: "error finding cat",
                    error: err
                });
            }
            res.json({
                info: "successfully loaded cat",
                data: cat
            });
        });

    });

    /* Update */
    app.put('/cat/:id', function (req, res) {
        Cat.findById(req.params.id, function (err, cat) {
            if (err) {
                res.json({
                    info: "unable to find cat",
                    error: err
                });
            }
            if (cat) {
                _.merge(cat, req.body);
                cat.save(function (err) {
                    if (err) {
                        res.json({
                            info: "unable to update cat",
                            error: err
                        });
                    } else {
                        res.json({
                            info: "cat updated successfully",
                            data: cat
                        });
                    }
                });
            } else {
                res.json({
                    info: "unable to find cat"
                });
            }

        });

    });

    /* Delete */
    app.delete('/cat/:id', function (req, res) {
        Cat.findByIdAndRemove(req.params.id, function (err, cat) {
            if (err) {
                res.json({
                info: 'error removing cat'
            });
            }
            res.json({
                info: 'cat removed successfully'
            });
        });

    });
};