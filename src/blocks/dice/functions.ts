import { Bet } from './models'
import { getRoll } from '../../helpers/crypto'

/**
 * Execute a dice bet and returns the results
 */
export async function diceBet({
    userId,
    quantity,
    betAmount,
    chance,
    userServerSeed,
    userClientSeed,
    testSpin
}: {
    userId: number
    quantity: number
    betAmount: number
    chance: number
    userServerSeed: string
    userClientSeed: string
    testSpin: boolean
}) {
    try {
        const bets = []
        const rollPF = []
        const payout = 100 / chance

        for (let i = 0; i < quantity; i++) {
            const roll = getRoll({ nonce: i, serverSeed: userServerSeed, clientSeed: userClientSeed })
            let win = roll > 100 - chance
            const finalPayout = win ? payout * betAmount : 0

            let bet

            if (!testSpin) bet = await Bet.create({ userId, betAmount, chance, payout: finalPayout, win })

            bets.push({ win, payout: finalPayout, betAmount, chance, userId, id: bet.id })
            rollPF.push({ nonce: i, hash: userServerSeed })
        }

        return { bets, provFair: { rollPF } }
    } catch (error) {
        console.error(error)
    }
}
