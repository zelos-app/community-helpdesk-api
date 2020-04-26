const validation = {
    addTicket: {
        name: {
            isString: true,
            blacklist: '<>'
        },
        phone: {
            isInt: true
        },
        request: {
            isString: true,
            blacklist: '<>'
        },
        area: {
            isMongoId: true
        },
        category: {
            isMongoId: true
        },
        address: {
            isString: true,
            optional: true,
            blacklist: '<>'
        }
    }
}

module.exports = validation;