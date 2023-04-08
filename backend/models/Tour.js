const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: String,
    avt: String,
    price: Number,
    tourists: Number,
    start: String,
    day: String,
}, {timestamps: true})

const Tour = mongoose.model('tours', tourSchema);

module.exports = Tour;

