const submit = require('express').Router();

// Submit a ticket
submit.post('/', async (req, res) => {
    res.status(404).send("Deprecated. Use /api/public/tickets");
})

submit.get('/', async (req, res) => {
    res.status(404).send("Deprecated. Use /api/public/options");
})

module.exports = submit;