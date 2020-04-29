const validation = {
    addTicket: {
        name: {
            isString: true
        },
        phone: {
            isInt: true
        },
        request: {
            isString: true
        },
        area: {
            isMongoId: true
        },
        category: {
            isMongoId: true
        },
        address: {
            isString: true,
            optional: true
        }
    }
}

module.exports = validation;