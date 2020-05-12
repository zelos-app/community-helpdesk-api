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

settings.get('/:category', async (req, res) => {
    if (validation.hasOwnProperty(req.params.category)) {
        try {
            let config = await new Config().get(req.params.category, true);
            config = config.toObject()
            delete config.tokens;
            delete config.password;
            res.send(config);
        } catch (err) {
            handleError(err, res);
        }
    } else {
        res.status("404").send("No such category")
    }
})

// I don't know how to pass request params to checkschema so I could do checkSchema(validation[category]) and avoid having multiple endpoints

settings.put('/workspace', async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({
    //         errors: errors.array(),
    //     });
    // }
    try {
        const result = await new Config().update("workspace", req.body);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

settings.put('/zelos', async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({
    //         errors: errors.array(),
    //     });
    // }
    try {
        const result = await new Config().update("zelos", req.body);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

settings.put('/sms', async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({
    //         errors: errors.array(),
    //     });
    // }
    try {
        const result = await new Config().update("sms", req.body);
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})


module.exports = settings;