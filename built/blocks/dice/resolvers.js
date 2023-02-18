import { diceBet } from './functions';
import { generateServerSeed } from '../../helpers/crypto';
import { User } from '../user';
import sha256 from 'sha256';
import randomstring from 'randomstring';
import { Bet } from './models';
import { updateUserBalanceSafe } from '../../helpers/updateUserBalanceSafe';
import { Sequelize } from 'sequelize';
const Query = {
    getBet: async (_, { id }) => {
        return await User.findByPk(id);
    },
    getBetList: async (_, { page = 1, pageSize = 10, filters = {} }) => {
        // Parse the page and pageSize parameters
        const parsedPage = page;
        const parsedPageSize = pageSize;
        // Calculate the offset and limit based on the page and pageSize
        const offset = (parsedPage - 1) * parsedPageSize;
        const limit = parsedPageSize;
        // Define the filter object based on the filters parameter
        const filter = {};
        if (filters.userId) {
            filter.userId = filters.userId;
        }
        if (filters.win !== undefined) {
            filter.win = filters.win;
        }
        // Retrieve the paginated bets with the specified filters
        const bets = await Bet.findAndCountAll({
            where: filter,
            offset,
            limit,
            raw: true
        });
        // Calculate the total number of pages based on the total count and pageSize
        const totalPages = Math.ceil(bets.count / parsedPageSize);
        // Return the paginated bets and metadata
        return {
            page: parsedPage,
            pageSize: parsedPageSize,
            totalPages,
            totalBets: bets.count,
            data: bets.rows
        };
    },
    getBestBetPerUser: async (_, { page = 1, pageSize = 10 }) => {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        const { count, rows } = await Bet.findAndCountAll({
            attributes: ['id', 'userId', 'betAmount', 'chance', 'payout', 'win'],
            where: {
                win: true
            },
            order: [[Sequelize.literal('chance'), 'ASC']],
            offset,
            limit
        });
        const totalPages = Math.ceil(count / pageSize);
        const filteredBets = Object.values(rows.reduce((accumulator, currentValue) => {
            if (!accumulator[currentValue.userId] || currentValue.win) {
                accumulator[currentValue.userId] = currentValue;
            }
            return accumulator;
        }, {}));
        return {
            page: page,
            pageSize,
            totalPages,
            totalBets: count,
            data: filteredBets
        };
    }
};
const Mutation = {
    createBet: async (_, { quantity = 1, clientSeed, testSpin, betAmount, chance }, { user }) => {
        if (quantity < 1 || quantity > 5)
            throw new Error('Invalid params.');
        if (!user)
            throw new Error('Not Logged in');
        const userClientSeed = clientSeed ? clientSeed : randomstring.generate();
        if (testSpin) {
            const userServerSeed = generateServerSeed();
            const newServerSeed = sha256(userServerSeed);
            const { bets, provFair } = await diceBet({
                userId: 0,
                quantity,
                betAmount,
                chance,
                userClientSeed,
                userServerSeed,
                testSpin
            });
            return { resp: true, bets, provFair, newServerSeed };
        }
        const { id } = user;
        const updatedUser = await User.findByPk(id);
        const totalCost = betAmount * quantity;
        const userServerSeed = updatedUser.serverSeed;
        if (totalCost > updatedUser.balance)
            throw new Error('Not enough balance to complete this request.');
        let updated = await updateUserBalanceSafe(id, -totalCost);
        if (!updated)
            throw new Error('Please wait before placing another bet.');
        const { bets } = await diceBet({
            userId: id,
            quantity,
            betAmount,
            chance,
            userClientSeed,
            userServerSeed,
            testSpin
        });
        const totalWon = bets.reduce((ac, bet) => ac + bet.payout, 0);
        // If this update balance we have to retry until we give the user his winning balance.
        try {
            const newServerSeed = generateServerSeed();
            await updateUserBalanceSafe(id, totalWon, newServerSeed);
            return bets;
        }
        catch (e) {
            let retry = true;
            while (retry) {
                await new Promise(resolve => setTimeout(async () => {
                    let updated = await updateUserBalanceSafe(id, totalWon);
                    if (updated)
                        retry = false;
                    resolve();
                }, 1000));
            }
        }
    }
};
export default {
    Query,
    Mutation
};
