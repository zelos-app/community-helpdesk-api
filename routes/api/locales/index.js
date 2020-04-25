const locales = require('express').Router();
// const { checkSchema, validationResult } = require('express-validator');
// const validation = require('./validation.js');
const appRoot = require('app-root-path');
const handleError = require(appRoot + '/middleware/HandleError');
const Locale = require(appRoot + '/models/Locale');

// Create a locale
locales.post('/', async (req, res) => {
    try {
        const result = await new Locale().add(req.body.name, req.body.code);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

// List all locales
locales.get('/', async (req, res) => {
    try {
        const active = req.query.active ? true : false
        const result = await new Locale().list(active);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

// Get a locale
locales.get('/:id', async (req, res) => {
    try {
        const result = await new Locale().get(req.params.id);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

// Update a locale
locales.put('/:id', async (req, res) => {
    try {
        const result = await new Locale().update(req.params.id, req.body);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

module.exports = locales;