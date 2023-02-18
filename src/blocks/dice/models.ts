import { DataTypes, Model } from 'sequelize'

export interface BetAttributes {
    id: number
    userId: number
    betAmount: number
    chance: number
    payout: number
    win: boolean
}

export class Bet extends Model<BetAttributes> implements BetAttributes {
    public id: number
    public userId!: number
    public betAmount!: number
    public chance!: number
    public payout!: number
    public win!: boolean
}

Bet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        betAmount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        chance: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        payout: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        win: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize: require('../../core/sequelize').sequelize,
        modelName: 'Bet'
    }
)
