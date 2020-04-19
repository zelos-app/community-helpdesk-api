const phoneRegex = new RegExp(`^\\+${process.env.PHONE_PREFIX}\\d\{${process.env.PHONE_MINLENGTH},${process.env.PHONE_MAXLENGTH}}\$`)

const validation = {
    addTicket: {
        name: {
            isString: true,
            escape: true
        },
        phone: {
            matches: {
                options: [phoneRegex, 'g'],
                errorMessage: `Phone number must start with +${process.env.PHONE_PREFIX} and be ${process.env.PHONE_MINLENGTH} to ${process.env.PHONE_MAXLENGTH} digits long`
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
        },
        address: {
            isString: true,
            escape: true,
            optional: true
        }
    }
}

module.exports = validation;