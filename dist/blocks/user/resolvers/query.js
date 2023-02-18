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
var models_1 = require("../models");
var sequelize_1 = require("sequelize");
var Query = {
    getUser: function (_, _a) {
        var id = _a.id;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.User.findByPk(id)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    getUserList: function (_, _a) {
        var _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 50 : _c, nameFilter = _a.nameFilter, balanceFilter = _a.balanceFilter, registeredAtFilter = _a.registeredAtFilter;
        return __awaiter(void 0, void 0, void 0, function () {
            var where, count, data;
            var _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        where = {};
                        if (nameFilter) {
                            where.name = (_d = {},
                                _d[sequelize_1.Sequelize.Op.like] = "%".concat(nameFilter, "%"),
                                _d);
                        }
                        if (balanceFilter) {
                            where.balance = (_e = {},
                                _e[sequelize_1.Sequelize.Op.gte] = balanceFilter,
                                _e);
                        }
                        if (registeredAtFilter) {
                            where.registeredAt = (_f = {},
                                _f[sequelize_1.Sequelize.Op.gte] = registeredAtFilter,
                                _f);
                        }
                        return [4 /*yield*/, models_1.User.count({ where: where })];
                    case 1:
                        count = _g.sent();
                        return [4 /*yield*/, models_1.User.findAll({
                                where: where,
                                order: [['id', 'ASC']],
                                offset: (page - 1) * pageSize,
                                limit: pageSize,
                                raw: true
                            })];
                    case 2:
                        data = _g.sent();
                        return [2 /*return*/, {
                                data: data,
                                count: count,
                                page: page,
                                pageSize: pageSize
                            }];
                }
            });
        });
    }
};
exports.default = Query;