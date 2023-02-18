"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
var lodash_1 = require("lodash");
var blocks = require("~/blocks");
var typeDefs = [];
exports.typeDefs = typeDefs;
var resolverFragments = [];
// define root types for extending later
typeDefs.push("\n  type Query\n  type Mutation\n  type Subscription\n");
for (var _i = 0, _a = Object.values(blocks); _i < _a.length; _i++) {
    var block = _a[_i];
    if (block.typeDefs) {
        typeDefs.push(block.typeDefs);
    }
    if (block.resolvers) {
        resolverFragments.push(block.resolvers);
    }
}
exports.resolvers = lodash_1.merge.apply(void 0, resolverFragments);
