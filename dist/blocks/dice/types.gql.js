"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.default = (0, graphql_tag_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type Bet {\n        id: Int\n        userId: Int\n        betAmount: Float\n        chance: Float\n        payout: Float\n        win: Boolean\n    }\n\n    type PaginatedBets {\n        bets: [Bet]\n        totalCount: Int\n    }\n\n    type ProvFair {\n        clientSeed: String\n        serverSeed: String\n        rollPF: [RollPF]\n    }\n\n    type RollPF {\n        hash: String\n        nonce: String\n    }\n\n    type BetList {\n        data: [Bet]\n        count: Int\n        page: Int\n        pageSize: Int\n    }\n\n    input Filters {\n        userId: Int\n        win: Boolean\n    }\n\n    extend type Query {\n        getBet(id: Int): Bet\n        getBetList(page: Int, pageSize: Int, filters: Filters): BetList\n        getBestBetPerUser(page: Int, pageSize: Int): BetList\n    }\n\n    extend type Mutation {\n        createBet(betAmount: Float, chance: Float, quantity: Int, testSpin: Boolean, clientSeed: String): [Bet]\n    }\n"], ["\n    type Bet {\n        id: Int\n        userId: Int\n        betAmount: Float\n        chance: Float\n        payout: Float\n        win: Boolean\n    }\n\n    type PaginatedBets {\n        bets: [Bet]\n        totalCount: Int\n    }\n\n    type ProvFair {\n        clientSeed: String\n        serverSeed: String\n        rollPF: [RollPF]\n    }\n\n    type RollPF {\n        hash: String\n        nonce: String\n    }\n\n    type BetList {\n        data: [Bet]\n        count: Int\n        page: Int\n        pageSize: Int\n    }\n\n    input Filters {\n        userId: Int\n        win: Boolean\n    }\n\n    extend type Query {\n        getBet(id: Int): Bet\n        getBetList(page: Int, pageSize: Int, filters: Filters): BetList\n        getBestBetPerUser(page: Int, pageSize: Int): BetList\n    }\n\n    extend type Mutation {\n        createBet(betAmount: Float, chance: Float, quantity: Int, testSpin: Boolean, clientSeed: String): [Bet]\n    }\n"])));
var templateObject_1;
