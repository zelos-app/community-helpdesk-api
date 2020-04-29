const mongoose = require('mongoose');
const createError = require('http-errors');

const localeSchema = new mongoose.Schema({
    name: {type: String, dropDups: true},
    code: {type: String, dropDups: true},
    active: {type: Boolean, default: false},
    landing: {
        content: {
            header: {type: String, default: "Zelos Community Helpdesk"},
            body: {type: String, default: "Zelos Community Helpdesk connects people who need help with volunteers who are willing to help others"}
        },
        buttons: {
            request: {type: String, default: "I need help"},
            offer: {type: String, default: "I want to help"}
        }
    },
    selectCategory: {
        content: {
            header: {type: String, default: "Select the kind of help you need"},
            body: {type: String, default: "Choose a category that’s closest to the kind of help you need"},
            or: {type: String, default: "or"}
        },
        buttons: {
            back: {type: String, default: "Go Back"}
        }
    },
    writeRequest: {
        content: {
            header: {type: String, default: "How can we help you?"},
            body: {type: String, default: "Please describe what kind of help you need."}
        },
        placeholders: {
            request: {type: String, default: "For example: I need groceries delivered. I will place the order online myself and would like a volunteer to pick them up and bring them home for me"}
        },
        buttons: {
            back: {type: String, default: "Back"},
            next: {type: String, default: "Next"}
        }
    },
    addContact: {
        content: {
            header: {type: String, default: "Please leave your contact details"},
            body: {type: String, default: "Write your address and phone number so your assigned helper can find and contact you."}
        },
        placeholders: {
            name: {type: String, default: "Name"},
            phone: {type: String, default: "Phone"},
            address: {type: String, default: "Address"},
            area: {type: String, default: "Area"}
        },
        buttons: {
            back: {type: String, default: "Back"},
            next: {type: String, default: "Submit"}
        }
    },
    confirmation: {
        content: {
            header: {type: String, default: "Your help request has been received"},
            body: {type: String, default: "We are now processing your request and will send you a message as soon as your request has been accepted. Have a nice day!"}
        },
        buttons: {
            home: {type: String, default: "Home"}
        }
    },
    appLanding: {
        content: {
            header: {type: String, default: "Help someone in your community!"},
            body: {type: String, default: "- Install the Zelos Team Management app by clicking the buttons below.\n- Join the workspace \"COVID-help-ESTONIA\"\n-Join groups of locations near you\n- Get notifications about people in need in your area"}
        }
    }
}, {
    minimize: false
});

const LocaleModel = mongoose.model('Locale', localeSchema)

class Locale {
    async list(active) {
        const filter = active ? {active: true} : null
        const locales = await LocaleModel.find(filter);
        return locales; 
    }
    async add(name, code) {
        const result = await LocaleModel.findOne({code: code});
        if (result) {
            const err = createError(409, {
                message: {status: "error", message: `${result.name} (${result.code}) already exists`}
            });
            throw err;
        }
        const locale = new LocaleModel({name: name, code: code});
        await locale.save();
        return {status: "ok", id: locale._id};
    }
    async get(id) {
        const locale = await LocaleModel.findById(id);
        if (locale) {
            return locale;
        } else {
            const err = createError(404, {
                message: {status: "error", message: `Not found`}
            });
            throw err;
        }
    }
    async update(id, fields) {
        const result = await LocaleModel.updateOne({ _id: id }, {...fields});
        return {status: "ok"}
    }
    async initDefault() {
        try {
            const defaultLocale = await this.add("English", "en");
            await this.update(defaultLocale.id, {active: true})
        } catch (err) {
            if (err.status !== 409) {
                throw err;
            }
        }
    }
}

module.exports = Locale;