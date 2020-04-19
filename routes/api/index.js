const routes = require("express").Router();
const appRoot = require("app-root-path");
const authorize = require(appRoot + "/middleware/Auth");

const tickets = require("./tickets");
const categories = require("./categories");
const areas = require("./areas");
const users = require("./users");
const auth = require("./auth");
const submit = require("./submit");
const locales = require("./locales");
const public = require("./public")

routes.use("/tickets", authorize, tickets);
routes.use("/categories", authorize, categories);
routes.use("/areas", authorize, areas);
routes.use("/users", authorize, users);
routes.use("/auth", auth);
routes.use("/submit", submit);
routes.use("/locales", locales);
routes.use("/public", public);

module.exports = routes;
