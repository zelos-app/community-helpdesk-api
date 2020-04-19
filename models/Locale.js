const mongoose = require('mongoose');
const createError = require('http-errors');

const localeSchema = new mongoose.Schema({
    name: {type: String, dropDups: true},
    code: {type: String, dropDups: true},
    active: {type: Boolean, default: false},
    landing: {
        content: {
            header: {type: String, default: "Community Helpdesk"},
            body: {type: String, default: "This app allows you to request help from volunteers or volunteer to help others"}
        },
        buttons: {
            request: {type: String, default: "I need help"},
            offer: {type: String, default: "I want to help"}
        }
    },
    selectCategory: {
        content: {
            header: {type: String, default: "Select the kind of help you need"},
            body: {type: String, default: "Choose the category that's closest to what you need"},
            or: {type: String, default: "or"}
        },
        buttons: {
            back: {type: String, default: "Go Back"}
        }
    },
    writeRequest: {
        content: {
            header: {type: String, default: "How could people help you?"},
            body: {type: String, default: "Please describe your problem"}
        },
        placeholders: {
            request: {type: String, default: "For example: I need groceries delivered, will place the order online myself"}
        },
        buttons: {
            back: {type: String, default: "Back"},
            next: {type: String, default: "Next"}
        }
    },
    addContact: {
        content: {
            header: {type: String, default: "Leave your contact details"},
            body: {type: String, default: "How can helpers find and contact you?"}
        },
        placeholders: {
            name: {type: String, default: "Name"},
            phone: {type: String, default: "Phone"},
            address: {type: String, default: "Address"},
            area: {type: String, default: "Area"}
        },
        buttons: {
            back: {type: String, default: "Back"},
            next: {type: String, default: "Sumbit"}
        }
    },
    confirmation: {
        content: {
            header: {type: String, default: "Request received"},
            body: {type: String, default: "We'll notify you as soon as your request has been accepted!"}
        },
        buttons: {
            home: {type: String, default: "Home"}
        }
    }
}, {
    minimize: false
});

const LocaleModel = mongoose.model('Locale', localeSchema)

class Locale {
    async list(filter) {
        const locales = await LocaleModel.find();
        if (filter === "active") {
            const activeLocales = locales.map(el => {
                if (el.active) return el
            })
            return activeLocales;
        } else if (filter === "all") {
            return locales;
        }
        
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
        console.log(result);
        return {status: "ok"}
    }
    async initDefault() {
        try {
            const defaultLocale = await this.add("English", "en");
            await this.update(defaultLocale.id, {active: true})
            console.log(`[i] Added default locale`)
        } catch (err) {
            if (err.status !== 409) {
                throw err;
            }
        }
    }
}

module.exports = Locale;