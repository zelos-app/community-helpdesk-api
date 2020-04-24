const validation = {
    addTicket: {
        name: {
            isString: true,
            escape: true
        },
        phone: {
            isInt: true
        },
        request: {
            isString: true,
            escape: true
        },
        area: {
            isMongoId: true
        },
        type: {
            isMongoId: true
        },
        address: {
            isString: true,
            escape: true,
            optional: true
        }
    }
}

module.exports = validation;