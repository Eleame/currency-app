const express = require('express');
const router = express.Router();
const Currency = require('../models/Currency');
const axios = require('axios');

// Check if the currency exists
const checkCurrencyExists = async (name) => {
    try {
        const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${name}&tsyms=USDT`);
        return response.data.USDT !== undefined;
    } catch (error) {
        return false;
    }
};

// Add a new currency
router.post('/', async (req, res) => {
    const { name, image } = req.body;

    console.log(`Adding new currency: ${name}`);

    const currencyExists = await checkCurrencyExists(name);
    if (!currencyExists) {
        console.log(`Currency ${name} does not exist`);
        return res.status(400).json({ error: 'Currency does not exist' });
    }

    try {
        const newCurrency = new Currency({ name, image });
        await newCurrency.save();
        console.log(`Currency ${name} added`);
        res.json(newCurrency);
    } catch (error) {
        console.error(`Error adding currency: ${error.message}`);
        res.status(500).json({ error: 'Failed to add currency' });
    }
});

// Get all currencies
router.get('/', async (req, res) => {
    try {
        const currencies = await Currency.find();
        console.log(`Fetched currencies: ${JSON.stringify(currencies)}`);
        res.json(currencies);
    } catch (error) {
        console.error(`Error fetching currencies: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch currencies' });
    }
});

// Add value to currency
router.post('/:id/values', async (req, res) => {
    const { id } = req.params;
    const { amount, time } = req.body;
    console.log(`Adding value to currency ${id}: ${amount} at ${time}`);

    try {
        const currency = await Currency.findById(id);
        currency.values.push({ amount, time });
        await currency.save();
        console.log(`Value added to currency ${id}`);
        res.json(currency);
    } catch (error) {
        console.error(`Error adding value: ${error.message}`);
        res.status(500).json({ error: 'Failed to add value' });
    }
});

// Update value
router.put('/:id/values/:valueId', async (req, res) => {
    const { id, valueId } = req.params;
    const { amount, time } = req.body;
    console.log(`Updating value ${valueId} for currency ${id}: ${amount} at ${time}`);

    try {
        const currency = await Currency.findById(id);
        const value = currency.values.id(valueId);
        value.amount = amount;
        value.time = time;
        await currency.save();
        console.log(`Value ${valueId} updated for currency ${id}`);
        res.json(currency);
    } catch (error) {
        console.error(`Error updating value: ${error.message}`);
        res.status(500).json({ error: 'Failed to update value' });
    }
});

// Delete value
router.delete('/:id/values/:valueId', async (req, res) => {
    const { id, valueId } = req.params;
    console.log(`Deleting value ${valueId} from currency ${id}`);

    try {
        const currency = await Currency.findById(id);
        currency.values = currency.values.filter(value => value._id.toString() !== valueId);
        await currency.save();
        console.log(`Value ${valueId} deleted from currency ${id}`);
        res.json(currency);
    } catch (error) {
        console.error(`Error deleting value: ${error.message}`);
        res.status(500).json({ error: 'Failed to delete value' });
    }
});

// Fetch currency price from CryptoCompare
router.get('/price/:currency', async (req, res) => {
    const { currency } = req.params;
    console.log(`Fetching price for currency ${currency}`);

    try {
        const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=USDT`);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching price: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch price' });
    }
});

module.exports = router;
