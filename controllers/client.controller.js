const Client = require('../models/client.model');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');

exports.test = (req, res) => {
    res.send('HEALTH CHECK PASS');
};

exports.createClient = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

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

exports.getClientDetails = async (req, res, next) => {
    await Client.findById(req.params.id, function (err, client) {
        if (err) {
            return next(err);
        }
        res.send(client);
    });
};

exports.updateClient = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    await Client.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, client) {
        if (err) {
            return next(err);
        }
        res.send('Updated');
    });
};

exports.deleteClient = async (req, res, next) => {
    await Client.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return next(err);
        }
        res.send('Deleted');
    });
};

exports.validate = () => {
    return [
        body('name', 'Name is too short or inexistant').exists().isLength({ min: 3 }),
        body('email', 'Invalid email').optional().isEmail(),
        body('phone', 'Invalid or inexistant phone number').isInt().exists()
    ];
};