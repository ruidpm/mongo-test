const Reservation = require('../models/reservation.model');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');

exports.test = (req, res) => {
    res.send('HEALTH CHECK PASS');
};

exports.createReservation = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    let reservation = new Reservation({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        date: new Date(req.body.date)
    });

    try {
        await reservation.save(function (err) {
            if (err) {
                return next(err);
            }
            res.sendStatus(201);
        });
    } catch (e) {
        res.sendStatus(500);
    }
};

exports.getReservationDetails = async (req, res, next) => {
    try {
        await Reservation.findById(req.params.id, function (err, reservation) {
            if (err) {
                return next(err);
            }
            res.send(reservation || 404);
        });
    } catch (e) {
        res.sendStatus(404);
    };
};

exports.getAllReservedDates = async (req, res, next) => {
    try {
        await Reservation.find({}, function (err, reservations) {
            if (err) {
                return next(err);
            }

            let reservedDates = [];
            reservations.map(reservation => {
                reservedDates.push(reservation.date);
            });
            res.send(reservedDates);
        });
    } catch (e) {
        res.sendStatus(500);
    };
};

exports.updateReservation = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        await Reservation.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, reservation) {
            if (err) {
                return next(err);
            }
            res.send('Updated');
        });
    } catch (e) {
        res.sendStatus(400);
    };
};

exports.deleteReservation = async (req, res, next) => {
    try {
        await Reservation.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                return next(err);
            }
            res.send('Deleted');
        });
    } catch (e) {
        res.sendStatus(400);
    };
};

exports.validate = () => {
    return [
        body('name', 'Name is too short or inexistent').exists().isLength({ min: 3 }),
        body('email', 'Invalid email').optional().isEmail(),
        body('phone', 'Invalid or inexistent phone number').isInt().exists(),
        body('date', 'Date is mandatory').exists().isISO8601()
    ];
};