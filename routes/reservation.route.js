const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservation.controller');

router.get('/test', reservationController.test);
router.post('/create', reservationController.validate(), reservationController.createReservation);
router.get('/:id', reservationController.getReservationDetails);
router.get('reservationdateslist', reservationController.getAllReservedDates);
router.put('/:id/update', reservationController.validate(), reservationController.updateReservation);
router.delete('/:id/delete', reservationController.deleteReservation);

module.exports = router;