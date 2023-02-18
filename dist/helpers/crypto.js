"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateServerSeed = exports.getRoll = void 0;
var crypto_1 = require("crypto");
var randomstring_1 = require("randomstring");
/**
 * Returns a random result between 0 (inclusive) and 100 (exclusive) using a client seed and nonce.
 * @param {Object} params
 * @param {string} params.clientSeed - A seed provided by the client for provability.
 * @param {number} params.nonce - The nonce for this roll, which should be incremented after each successive roll.
 */
function getRoll(_a) {
    var clientSeed = _a.clientSeed, nonce = _a.nonce, serverSeed = _a.serverSeed;
    // Combine the client seed, nonce, and server seed into a single string
    var seed = clientSeed + '-' + nonce + '-' + serverSeed;
    // Use the seed to generate a random number between 0 and 99
    return parseInt(crypto_1.default.createHash('sha256').update(seed).digest('hex').substr(0, 8), 16) % 100;
}
exports.getRoll = getRoll;
function generateServerSeed() {
    return randomstring_1.default.generate();
}
exports.generateServerSeed = generateServerSeed;
