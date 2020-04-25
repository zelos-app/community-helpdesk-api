const routes = require("express").Router();
const appRoot = require("app-root-path");
const authenticate = require(appRoot + "/middleware/Authenticate");
const authorize = require(appRoot + "/middleware/Authorize");

const tickets = require("./tickets");
const categories = require("./categories");
const areas = require("./areas");
const users = require("./users");
const auth = require("./auth");
const locales = require("./locales");
const public = require("./public");
const settings = require("./settings");
const health = require("./health");

// to be deprecated
const submit = require("./submit");
routes.use("/submit", submit);

routes.use("/tickets", authenticate, tickets);
routes.use("/categories", authenticate, authorize, categories);
routes.use("/areas", authenticate, authorize, areas);
routes.use("/users", authenticate, authorize, users);
routes.use("/auth", auth);
routes.use("/locales", authenticate, authorize, locales);
routes.use("/public", public);
routes.use("/settings", authenticate, authorize, settings);
routes.use("/health", health), 

module.exports = routes;
