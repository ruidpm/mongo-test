const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClientSchema = new Schema({
    name: {type: String, required: true, max: 100},
    phone: {type: Number, required: true},
    email: {type: String}
});

module.exports = mongoose.model('Client', ClientSchema);