const settings = require('express').Router();
const { checkSchema, validationResult, matchedData} = require('express-validator');
const validation = require('./validation.js');
const appRoot = require('app-root-path');
const Config = require(appRoot + "/models/Config");
const handleError = require(appRoot + '/middleware/HandleError');

settings.get('/', async (req, res) => {
    try {
        const config = await new Config().get(null, true);
        delete config.zelos.tokens;
        delete config.zelos.password;
        res.send(config);
    } catch (err) {
        handleError(err, res);
    }
})

settings.put('/', checkSchema(validation.updateSettings), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }
    try {
        const result = await new Config().update(req.body);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

module.exports = settings;