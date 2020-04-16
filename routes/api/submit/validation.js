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
        type: {
            isMongoId: true
        }
    }
}

module.exports = validation;