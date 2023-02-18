"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var model_1 = require("~/helpers/model");
var bcrypt_1 = require("bcrypt");
var crypto_1 = require("../../helpers/crypto");
var DataTypes = require('sequelize').DataTypes;
exports.User = (0, model_1.default)({
    name: 'User',
    schema: {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'username'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        registeredAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        balance: {
            type: DataTypes.INTEGER,
            defaultValue: 100
        },
        serverSeed: {
            type: DataTypes.STRING
        },
        version: DataTypes.INTEGER
    },
    options: {
        version: true,
        hooks: {
            beforeCreate: function (user) {
                return bcrypt_1.default
                    .hash(user.password, 10)
                    .then(function (hash) {
                    user.password = hash;
                    user.serverSeed = (0, crypto_1.generateServerSeed)();
                })
                    .catch(function (err) {
                    throw new Error(err);
                });
            }
        }
    }
});
