const mongoose = require('mongoose');

const valueSchema = new mongoose.Schema({
    amount: Number,
    time: Date
});

const currencySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    values: [valueSchema]
});

module.exports = mongoose.model('Currency', currencySchema);
