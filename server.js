const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const countriesFilePath = path.join(__dirname, 'countries.json');
const countries = JSON.parse(fs.readFileSync(countriesFilePath, 'utf8'));

// Endpoint to get all countries
app.get('/v3.1/all', (req, res) => {
    const countryNames = countries.map(country => country.name.common);
    res.json(countryNames);
});

// Endpoint to get country by name
app.get('/v3.1/name/:countryName', (req, res) => {
    const countryName = req.params.countryName.toLowerCase();
    const country = countries.filter(c => c.name.common.toLowerCase() === countryName);
    if (country.length > 0) {
        res.json(country);
    } else {
        res.status(404).json({ message: 'Country not found' });
    }
});

app.listen(port, () => {
    console.log(`Mock server running at http://localhost:${port}`);
});