const health = require('express').Router();
const mongoose = require("mongoose");

health.get('/', async (req, res) => {
    if (mongoose.connection.readyState) {
        res.send({healthy: true});
    }

})

module.exports = health;