const Reservation = require('../models/reservation.model');
const mongoose = require('mongoose');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');

exports.test = (req, res) => {
    res.send('HEALTH CHECK PASS');
};

exports.createReservation = (req, res, next) => {
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

    reservation.save(function (err) {
        if (err) {
            return next(err);
        }
        res.sendStatus(201);
    });
};

//todo error handling on invalid id
exports.getReservationDetails = async (req, res, next) => {
    await Reservation.findById(req.params.id, function (err, reservation) {
        if (err) {
            return next(err);
        }
        res.send(reservation);
    });
};

//todo finish this and error handling
exports.getAllReservedDates = async (req, res, next) => {
    const reservations = Reservation.find({});
    if (err) {
        return next(err);
    }
    console.log(reservations);
    res.send(reservations);
};

exports.updateReservation = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    await Reservation.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, reservation) {
        if (err) {
            return next(err);
        }
        res.send('Updated');
    });
};

exports.deleteReservation = async (req, res, next) => {
    await Reservation.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return next(err);
        }
        res.send('Deleted');
    });
};

exports.validate = () => {
    return [
        body('name', 'Name is too short or inexistent').exists().isLength({ min: 3 }),
        body('email', 'Invalid email').optional().isEmail(),
        body('phone', 'Invalid or inexistent phone number').isInt().exists(),
        body('date', 'Date is mandatory').exists().isISO8601()
    ];
};