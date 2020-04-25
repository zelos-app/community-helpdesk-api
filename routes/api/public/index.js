const public = require('express').Router();
const { checkSchema, validationResult, matchedData } = require('express-validator');
const validation = require('./validation.js');
const appRoot = require('app-root-path');
const Ticket = require(appRoot + '/models/Ticket');
const Category = require(appRoot + '/models/Category');
const Area = require(appRoot + '/models/Area');
const Locale = require(appRoot + '/models/Locale');
const handleError = require(appRoot + '/middleware/HandleError');

// Submit a ticket
public.post('/tickets', checkSchema(validation.addTicket), async (req, res) => {
    // check for validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    // create a ticket
    const ticket = new Ticket();
    const data = matchedData(req);
    console.log(data)
    try {
        const id = await ticket.add({
            ...data
        });
        res.status(201).send({
            message: "ok",
            id: id
        });
    } catch (err) {
        handleError(err, res);
    }
})

public.get('/options', async (req, res) => {
    try {
        const category = new Category();
        const area = new Area();
        allCategories = await category.list("public");
        allAreas = await area.list("public");
        const result = {
            status: "ok",
            categories: allCategories,
            areas: allAreas,
            phone: {
                prefix: process.env.PHONE_PREFIX,
                minLength: process.env.PHONE_MINLENGTH,
                maxLength: process.env.PHONE_MAXLENGTH
            }
        }
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

public.get('/locales', async (req, res) => {
    try {
        const result = await new Locale().list("active");
        res.send(result);
    } catch (err) {
        handleError(err, res);
    }
})

module.exports = public;