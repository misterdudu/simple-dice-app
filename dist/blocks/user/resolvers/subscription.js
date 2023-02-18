"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("../events");
var graphql_subscriptions_1 = require("graphql-subscriptions");
var pubsub_1 = require("~/core/pubsub");
var Subscription = {
    userBalanceUpdated: {
        subscribe: (0, graphql_subscriptions_1.withFilter)(function () { return pubsub_1.default.asyncIterator([events_1.USER_BALANCE_UPDATED]); }, function (payload, variables) {
            // console.log(payload, variables)
            return payload.userBalanceUpdated.userId === variables.userId;
        })
    }
};
exports.default = Subscription;
