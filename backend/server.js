const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5011;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/currencydb');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const currenciesRouter = require('./routes/currencies');
app.use('/api/currencies', currenciesRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
