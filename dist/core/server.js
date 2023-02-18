"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var helmet_1 = require("helmet");
var cors_1 = require("cors");
var compression_1 = require("compression");
var cookie_parser_1 = require("cookie-parser");
var http_1 = require("http");
var url_1 = require("url");
var apollo_1 = require("~/core/apollo");
var auth_1 = require("~/core/auth");
var body_parser_1 = require("body-parser");
var sequelize_1 = require("./sequelize");
var _a = process.env.PORT, PORT = _a === void 0 ? 8085 : _a;
function startServer() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, app, httpServer, apolloUpgradeListener;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sequelize_1.sequelize.authenticate()];
                case 1:
                    _a.sent();
                    sequelize_1.sequelize
                        .sync()
                        .then(function () {
                        console.log('Database synchronized successfully');
                    })
                        .catch(function (error) {
                        console.error('Unable to synchronize the database:', error);
                    });
                    console.log('Connection has been established successfully.');
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.error('Unable to connect to the database:', e_1);
                    return [3 /*break*/, 3];
                case 3:
                    app = (0, express_1.default)();
                    // Always wear a helmet
                    app.use((0, helmet_1.default)());
                    // Parse cookies
                    app.use((0, cookie_parser_1.default)());
                    app.use(body_parser_1.default.urlencoded({ extended: true }));
                    app.use(body_parser_1.default.json());
                    // Enable cors
                    app.use((0, cors_1.default)({
                        allowedHeaders: [
                            'Allow-Control-Allow-Origin',
                            'Access-Control-Allow-Origin',
                            'Content-Type',
                            'Authorization'
                        ],
                        credentials: true,
                        origin: '*',
                        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                        preflightContinue: true
                    }));
                    // Enable GZIP compression
                    app.use((0, compression_1.default)());
                    auth_1.default.applyMiddleware({ app: app });
                    apollo_1.default.applyMiddleware({ app: app });
                    httpServer = (0, http_1.createServer)(app);
                    apollo_1.default.installSubscriptionHandlers(httpServer);
                    apolloUpgradeListener = httpServer.listeners('upgrade').slice(0)[0];
                    httpServer.removeAllListeners('upgrade');
                    httpServer.on('upgrade', function (req, socket, head) {
                        var pathname = url_1.default.parse(req.url).pathname;
                        if (pathname == '/graphql')
                            apolloUpgradeListener(req, socket, head);
                        else
                            socket.destroy();
                    });
                    // Start the server
                    httpServer.listen(PORT, function () {
                        console.log("Listening on port ".concat(PORT));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = startServer;
