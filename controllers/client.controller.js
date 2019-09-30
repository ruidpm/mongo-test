const Client = require('../models/client.model');

exports.test = function (req, res) {
    res.send('TESTE');
};

exports.createClient = function (req, res) {
    let client = new Client({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    });

    client.save(function (err) {
        if (err) {
            return next(err);
        }
        res.sendStatus(201);
    });
};

exports.getClientDetails = async function (req, res) {
    await Client.findById(req.params.id, function (err, client) {
        if (err) {
            return next(err);
        }
        res.send(client);
    });
};

exports.updateClient = async function (req, res) {
    await Client.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, client) {
        if (err) {
            return next(err);
        }
        res.send('Updated');
    });
};

exports.deleteClient = async function (req, res) {
    await Client.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return next(err);
        }
        res.send('Deleted');
    });
};