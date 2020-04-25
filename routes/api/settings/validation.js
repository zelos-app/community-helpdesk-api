const validation = {
    updateSettings: {
        "workspace.name": {
            isString: true,
            escape: true
        },
        "zelos.confirmAssignment": {
            isBoolean: true
        },
        "zelos.confirmCompletion": {
            isBoolean: true
        },
        "zelos.subdomain": {
            isString: true,
            escape: true
        },
        "zelos.email": {
            isEmail: true,
            escape: true,
        },
        "zelos.password": {
            optional: true,
        },
        "sms.prefix": {
            isInt: true
        },
        "sms.sendRejectText": {
            isBoolean: true
        },
        "sms.sendAcceptText": {
            isBoolean: true
        },
        "sms.provider": {
            isString: true,
            escape: true
        },
        "templates.acceptText": {
            isString: true,
            escape: true
        },
        "templates.rejectText": {
            isString: true,
            escape: true
        },
        "templates.safetyWarning": {
            isString: true,
            escape: true,
            optional: true
        }
    }
}

module.exports = validation