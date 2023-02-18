import crypto from 'crypto';
import randomstring from 'randomstring';
/**
 * Returns a random result between 0 (inclusive) and 100 (exclusive) using a client seed and nonce.
 * @param {Object} params
 * @param {string} params.clientSeed - A seed provided by the client for provability.
 * @param {number} params.nonce - The nonce for this roll, which should be incremented after each successive roll.
 * @param {string} params.serverSeed - The server seed used for provability.
 */
export function getRoll({ clientSeed, nonce, serverSeed }) {
    // Combine the client seed, nonce, and server seed into a single string
    const seed = clientSeed + '-' + nonce + '-' + serverSeed;
    // Use the seed to generate a random number between 0 and 99
    return parseInt(crypto.createHash('sha256').update(seed).digest('hex').substr(0, 8), 16) % 100;
}
export function generateServerSeed() {
    return randomstring.generate();
}
