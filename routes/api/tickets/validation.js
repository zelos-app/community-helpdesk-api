const validation = {
    addTicket: {
        name: {
            isString: true,
            blacklist: '<>'
        },
        phone: {
            isInt: true,
        },
        request: {
            isString: true,
            blacklist: '<>'
        },
        area: {
            isMongoId: true
        },
        adress: {
            isString: true,
            optional: true,
            blacklist: '<>'
        },
        category: {
            isMongoId: true
        }
    },
    approveTicket: {
        notify: {
            optional: true,
            toBoolean: {
                strict: true,
            }
        }
    }
}

module.exports = validation;