const validation = {
    zelos: {
        confirmAssignment: {
            isBoolean: true
        },
        confirmCompletion: {
            isBoolean: true
        },
        subdomain: {
            isString: true,
            escape: true
        },
        email: {
            isEmail: true,
            escape: true,
        },
        password: {
            optional: true,
        },
    },
    workspace: {
        name: {
            isString: true,
            escape: true
        }
    },
    sms: {
        prefix: {
            isInt: true
        },
        sendRejectText: {
            isBoolean: true
        },
        sendAcceptText: {
            isBoolean: true
        },
        provider: {
            isString: true,
            escape: true
        },
        acceptText: {
            isString: true,
            escape: true
        },
        rejectText: {
            isString: true,
            escape: true
        },
    }
}

module.exports = validation