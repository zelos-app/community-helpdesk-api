const phoneRegex = new RegExp(`^\\+${process.env.PHONE_PREFIX}\\d\{${process.env.PHONE_MINLENGTH},${process.env.PHONE_MAXLENGTH}}\$`)

const validation = {
    addTicket: {
        name: {
            isString: true,
            escape: true
        },
        phone: {
            matches: {
                options: [phoneRegex, 'g']
            }
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