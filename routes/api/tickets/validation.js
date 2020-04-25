const validation = {
    addTicket: {
        name: {
            isString: true,
            escape: true
        },
        phone: {
            isInt: true,
        },
        request: {
            isString: true,
            escape: true
        },
        area: {
            isMongoId: true
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