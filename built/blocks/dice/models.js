import { DataTypes, Model } from 'sequelize';
export class Bet extends Model {
}
Bet.init({
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
}, {
    sequelize: require('../../core/sequelize').sequelize,
    modelName: 'Bet'
});
