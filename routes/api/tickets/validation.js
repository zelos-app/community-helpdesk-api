let phoneRegex;
if (process.env.PHONE_PREFIX && process.env.PHONE_MINLENGTH && process.env.PHONE_MAXLENGTH) {
    phoneRegex = new RegExp(`^\\+${process.env.PHONE_PREFIX}\\d\{${process.env.PHONE_MINLENGTH},${process.env.PHONE_MAXLENGTH}}\$`)
} else {
    phoneRegex = /\+\d+/
}

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