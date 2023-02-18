"use strict";
/**
 * Registers a sequelize model
 */
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("../core/sequelize");
function model(_a) {
    var name = _a.name, schema = _a.schema, options = _a.options;
    // register a new model
    return sequelize_1.sequelize.define(name, schema, options);
}
exports.default = model;
