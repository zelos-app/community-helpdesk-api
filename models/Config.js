const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.PRIVATE_KEY);

const configSchema = new mongoose.Schema({
    workspace: {
        name: String
    },
    zelos: {
        subdomain: String,
        email: String,
        password: String,
        confirmAssignment: {type: Boolean, default: true},
        confirmCompletion: {type: Boolean, default: false},
        safetyWarning: {
            type: String,
            default: ""
        },
        tokens: Object,
    },
    sms: {
        prefix: {
            type: Number,
            default: 372
        },
        minLength: Number,
        maxLength: Number,
        sendRejectText: {type: Boolean, default: false},
        sendAcceptText: {type: Boolean, default: false},
        fromName: String,
        Infobip: {
            baseUrl: String,
            apiKey: String
        },
        acceptText: {
            type: String,
            default: "Your request has been accepted and published to volunteers in your area"
        },
        rejectText: {
            type: String,
            default: "Unfortunately we can't accept your request. It maybe have not met the requirements or was missing crucial details"
        }
    }
}, {
    minimize: false
});

const ConfigModel = mongoose.model('Config', configSchema)

class Config {
    constructor() {}

    async init() {
        const config = await this.get();
        if (!config) {
            console.log(`[i] No config found, initializing`);
            await this.initDatabase();
            await this.createDefaults();
        }
        await this.load();
    }

    async load() {
        const config = await this.get(null, true);
        const cryptr = new Cryptr(process.env.PRIVATE_KEY);
        // SMS settings
        process.env.INFOBIP_BASE_URL = config.sms.Infobip.baseUrl;
        process.env.INFOBIP_API_KEY = config.sms.Infobip.apiKey;
        process.env.SMS_FROM_NAME = config.sms.fromName;
        process.env.SEND_ACCEPT_TEXT = config.sms.sendAcceptText;
        process.env.SEND_REJECT_TEXT = config.sms.sendRejectText;
        process.env.PHONE_PREFIX = config.sms.prefix;
        process.env.PHONE_MINLENGHT = config.sms.minLength;
        process.env.PHONE_MAXLENGHT = config.sms.maxLength;
        // Zelos settings
        process.env.ZELOS_WORKSPACE = config.zelos.subdomain;
        process.env.ZELOS_USER_EMAIL = config.zelos.email;
        process.env.ZELOS_USER_PASSWORD = cryptr.decrypt(config.zelos.password);
        process.env.ZELOS_CONFIRM_ASSIGNMENT = config.zelos.confirmAssignment;
        process.env.ZELOS_CONFIRM_COMPLETION = config.zelos.confirmCompletion;
        // Workspace settings
        process.env.WORKSPACE_NAME = config.workspace.name;
    }

    async get(subject, toObject = false) {
        let config = await ConfigModel.findOne();
        if (subject) {
            return config[subject]
        } else {
            if (toObject) {
                return config.toObject();
            } else {
                return config
            }
        }
    }
    
    async update(category, data) {
        if (data.password) {
            data.password = cryptr.encrypt(data.password)
        }  
        const settings = {
            [category]: data
        }
        const config = await ConfigModel.findOne();
        config.set(settings)
        await config.save();
        this.load();
        return {
            status: "ok"
        }
    }

    async initDatabase() {
        try {
            console.log(`[i] Setting up a new database`);
            // Set up workspace details
            const config = new ConfigModel();
            config.workspace.name = process.env.INIT_WORKSPACE_NAME;
            // Create admin account
            console.log(`[d] Creating admin account for ${process.env.INIT_ADMIN_EMAIL}`);
            const User = require("./User");
            await new User().createAdmin(process.env.INIT_ADMIN_EMAIL, process.env.INIT_ADMIN_PASSWORD);
            // Set up Zelos connection
            config.zelos.subdomain = process.env.INIT_ZELOS_SUBDOMAIN;
            config.zelos.email = process.env.INIT_ZELOS_EMAIL;
            config.zelos.password = cryptr.encrypt(process.env.INIT_ZELOS_PASSWORD);
            await config.save();
        } catch (err) {
            console.error(`[!] Something went wrong during database setup:\n${err.stack}`)
        }
    }

    async createDefaults() {
        try {
            console.log(`[i] Creating default user and content`);
            await this.load();
            // Add sample category
            console.log(`[d] Adding sample category`);
            const Category = require('./Category');
            await new Category().add({name: "Sample Request Category", needsAddress: true});
            // Add default locale
            console.log(`[d] Adding default locale`);
            const Locale = require("./Locale");
            await new Locale().initDefault();
            // Add sample area
            console.log(`[d] Adding sample area`);
            const Area = require('./Area');
            await new Area().add({name: "Sample Area"});;
        } catch (err) {
            console.error(`[!] Something went wrong during database setup:\n${err.stack}`)
        }
        
    }
}

module.exports = Config;