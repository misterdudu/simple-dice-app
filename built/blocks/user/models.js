import bcrypt from 'bcrypt';
import { generateServerSeed } from '../../helpers/crypto';
import { DataTypes, Model } from 'sequelize';
export class User extends Model {
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'username'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registeredAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 100
    },
    serverSeed: {
        type: DataTypes.STRING
    },
    version: DataTypes.INTEGER
}, {
    version: true,
    sequelize: require('../../core/sequelize').sequelize,
    modelName: 'User',
    hooks: {
        beforeCreate: (user) => {
            return bcrypt
                .hash(user.password, 10)
                .then((hash) => {
                user.password = hash;
                user.serverSeed = generateServerSeed();
            })
                .catch((err) => {
                throw new Error(err.message);
            });
        }
    }
});
