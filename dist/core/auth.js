"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_session_1 = require("express-session");
var sequelize_1 = require("./sequelize");
var SequelizeStore = require('connect-session-sequelize')(express_session_1.default.Store);
var SESSION_SECRET = process.env.SESSION_SECRET;
// Enable persistent login sessions
global.sessionHandler = (0, express_session_1.default)({
    secret: SESSION_SECRET,
    name: 'AG-session',
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize_1.sequelize
    })
});
function applyMiddleware(_a) {
    var app = _a.app;
    app.use(global.sessionHandler);
}
var auth = { applyMiddleware: applyMiddleware };
exports.default = auth;
