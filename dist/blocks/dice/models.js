"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bet = void 0;
var model_1 = require("~/helpers/model");
var sequelize_1 = require("sequelize");
exports.Bet = (0, model_1.default)({
    name: 'Bet',
    schema: {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        betAmount: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false
        },
        chance: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false
        },
        payout: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false
        },
        win: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false
        }
    }
});
