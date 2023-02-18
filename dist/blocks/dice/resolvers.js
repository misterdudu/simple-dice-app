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
var functions_1 = require("./functions");
var crypto_1 = require("~/helpers/crypto");
var user_1 = require("~/blocks/user");
var sha256_1 = require("sha256");
var randomstring_1 = require("randomstring");
var models_1 = require("./models");
var updateUserBalanceSafe_1 = require("../../helpers/updateUserBalanceSafe");
var sequelize_1 = require("sequelize");
var Query = {
    getBet: function (_, _a) {
        var id = _a.id;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user_1.User.findByPk(id)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    getBetList: function (_, _a) {
        var _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 10 : _c, _d = _a.filters, filters = _d === void 0 ? {} : _d;
        return __awaiter(void 0, void 0, void 0, function () {
            var parsedPage, parsedPageSize, offset, limit, filter, bets, totalPages;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        parsedPage = parseInt(page);
                        parsedPageSize = parseInt(pageSize);
                        offset = (parsedPage - 1) * parsedPageSize;
                        limit = parsedPageSize;
                        filter = {};
                        if (filters.userId) {
                            filter.userId = filters.userId;
                        }
                        if (filters.win !== undefined) {
                            filter.win = filters.win;
                        }
                        return [4 /*yield*/, models_1.Bet.findAndCountAll({
                                where: filter,
                                offset: offset,
                                limit: limit,
                                raw: true
                            })
                            // Calculate the total number of pages based on the total count and pageSize
                        ];
                    case 1:
                        bets = _e.sent();
                        totalPages = Math.ceil(bets.count / parsedPageSize);
                        // Return the paginated bets and metadata
                        return [2 /*return*/, {
                                page: parsedPage,
                                pageSize: parsedPageSize,
                                totalPages: totalPages,
                                totalBets: bets.count,
                                data: bets.rows
                            }];
                }
            });
        });
    },
    getBestBetPerUser: function (_, _a) {
        var _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 10 : _c;
        return __awaiter(void 0, void 0, void 0, function () {
            var offset, limit, _d, count, rows, totalPages, filteredBets;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        offset = (page - 1) * pageSize;
                        limit = pageSize;
                        return [4 /*yield*/, models_1.Bet.findAndCountAll({
                                attributes: ['id', 'userId', 'betAmount', 'chance', 'payout', 'win'],
                                where: {
                                    win: true
                                },
                                order: [[sequelize_1.Sequelize.literal('chance'), 'ASC']],
                                offset: offset,
                                limit: limit
                            })];
                    case 1:
                        _d = _e.sent(), count = _d.count, rows = _d.rows;
                        totalPages = Math.ceil(count / pageSize);
                        filteredBets = Object.values(rows.reduce(function (accumulator, currentValue) {
                            if (!accumulator[currentValue.userId] || currentValue.win) {
                                accumulator[currentValue.userId] = currentValue;
                            }
                            return accumulator;
                        }, {}));
                        return [2 /*return*/, {
                                page: page,
                                pageSize: pageSize,
                                totalPages: totalPages,
                                totalBets: count,
                                data: filteredBets
                            }];
                }
            });
        });
    }
};
var Mutation = {
    createBet: function (_, _a, _b) {
        var _c = _a.quantity, quantity = _c === void 0 ? 1 : _c, clientSeed = _a.clientSeed, testSpin = _a.testSpin, betAmount = _a.betAmount, chance = _a.chance;
        var user = _b.user;
        return __awaiter(void 0, void 0, void 0, function () {
            var userClientSeed, userServerSeed_1, newServerSeed, _d, bets_1, provFair, id, updatedUser, totalCost, userServerSeed, updated, bets, totalWon, newServerSeed, e_1, retry_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (quantity < 1 || quantity > 5)
                            throw new Error('Invalid params.');
                        if (!user)
                            throw new Error('Not Logged in');
                        userClientSeed = clientSeed ? clientSeed : randomstring_1.default.generate();
                        if (!testSpin) return [3 /*break*/, 2];
                        userServerSeed_1 = (0, crypto_1.generateServerSeed)();
                        newServerSeed = (0, sha256_1.default)(userServerSeed_1);
                        return [4 /*yield*/, (0, functions_1.diceBet)({
                                userId: '',
                                quantity: quantity,
                                betAmount: betAmount,
                                chance: chance,
                                userClientSeed: userClientSeed,
                                userServerSeed: userServerSeed_1,
                                testSpin: testSpin
                            })];
                    case 1:
                        _d = _e.sent(), bets_1 = _d.bets, provFair = _d.provFair;
                        return [2 /*return*/, { resp: true, bets: bets_1, provFair: provFair, newServerSeed: newServerSeed }];
                    case 2:
                        id = user.id;
                        return [4 /*yield*/, user_1.User.findByPk(id)];
                    case 3:
                        updatedUser = _e.sent();
                        totalCost = betAmount * quantity;
                        userServerSeed = updatedUser.serverSeed;
                        if (totalCost > updatedUser.balance)
                            throw new Error('Not enough balance to complete this request.');
                        return [4 /*yield*/, (0, updateUserBalanceSafe_1.updateUserBalanceSafe)(id, -totalCost)];
                    case 4:
                        updated = _e.sent();
                        if (!updated)
                            throw new Error('Please wait before placing another bet.');
                        return [4 /*yield*/, (0, functions_1.diceBet)({
                                userId: id,
                                quantity: quantity,
                                betAmount: betAmount,
                                chance: chance,
                                userClientSeed: userClientSeed,
                                userServerSeed: userServerSeed,
                                testSpin: testSpin
                            })];
                    case 5:
                        bets = (_e.sent()).bets;
                        totalWon = bets.reduce(function (ac, bet) { return ac + bet.payout; }, 0);
                        _e.label = 6;
                    case 6:
                        _e.trys.push([6, 8, , 12]);
                        newServerSeed = (0, crypto_1.generateServerSeed)();
                        return [4 /*yield*/, (0, updateUserBalanceSafe_1.updateUserBalanceSafe)(id, totalWon, newServerSeed)];
                    case 7:
                        _e.sent();
                        return [2 /*return*/, bets];
                    case 8:
                        e_1 = _e.sent();
                        retry_1 = true;
                        _e.label = 9;
                    case 9:
                        if (!retry_1) return [3 /*break*/, 11];
                        return [4 /*yield*/, new Promise(function (resolve) {
                                return setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var updated;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, (0, updateUserBalanceSafe_1.updateUserBalanceSafe)(id, totalWon)];
                                            case 1:
                                                updated = _a.sent();
                                                if (updated)
                                                    retry_1 = false;
                                                resolve();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, 1000);
                            })];
                    case 10:
                        _e.sent();
                        return [3 /*break*/, 9];
                    case 11: return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    }
};
exports.default = {
    Query: Query,
    Mutation: Mutation
};
