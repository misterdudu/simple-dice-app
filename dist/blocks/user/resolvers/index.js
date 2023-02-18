"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = require("./query");
var subscription_1 = require("./subscription");
var mutation_1 = require("./mutation");
exports.default = {
    Query: query_1.default,
    Mutation: mutation_1.default,
    Subscription: subscription_1.default
};
