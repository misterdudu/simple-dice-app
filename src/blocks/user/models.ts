import bcrypt from 'bcrypt'
import { generateServerSeed } from '../../helpers/crypto'
import { DataTypes, Model } from 'sequelize'

interface UserAttributes {
    id: number
    name: string
    password: string
    registeredAt: Date
    balance: number
    serverSeed: string
    version: number
}

export class User extends Model<UserAttributes> implements UserAttributes {
    public id: number
    public name!: string
    public password!: string
    public registeredAt!: Date
    public balance!: number
    public serverSeed!: string
    public version!: number
}

User.init(
    {
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
    },
    {
        version: true,
        sequelize: require('../../core/sequelize').sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate: (user: UserAttributes) => {
                return bcrypt
                    .hash(user.password, 10)
                    .then((hash: string) => {
                        user.password = hash
                        user.serverSeed = generateServerSeed()
                    })
                    .catch((err: Error) => {
                        throw new Error(err.message)
                    })
            }
        }
    }
)
