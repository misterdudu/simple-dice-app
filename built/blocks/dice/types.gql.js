import gql from 'graphql-tag';
export default gql `
    type Bet {
        id: Int
        userId: Int
        betAmount: Float
        chance: Float
        payout: Float
        win: Boolean
    }

    type PaginatedBets {
        bets: [Bet]
        totalCount: Int
    }

    type ProvFair {
        clientSeed: String
        serverSeed: String
        rollPF: [RollPF]
    }

    type RollPF {
        hash: String
        nonce: String
    }

    type BetList {
        data: [Bet]
        count: Int
        page: Int
        pageSize: Int
    }

    input Filters {
        userId: Int
        win: Boolean
    }

    extend type Query {
        getBet(id: Int): Bet
        getBetList(page: Int, pageSize: Int, filters: Filters): BetList
        getBestBetPerUser(page: Int, pageSize: Int): BetList
    }

    extend type Mutation {
        createBet(betAmount: Float, chance: Float, quantity: Int, testSpin: Boolean, clientSeed: String): [Bet]
    }
`;
