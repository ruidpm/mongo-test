const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReservationSchema = new Schema({
    name: {type: String, required: true, max: 100},
    phone: {type: Number, required: true},
    email: {type: String},
    date: {type: Date, required: true}
});

module.exports = mongoose.model('Reservation', ReservationSchema);