import { User } from '../models'
import bcrypt from 'bcrypt'
import { sequelize } from '../../../core/sequelize'

const Mutation = {
    register: async (parent, { name, password }, { req }) => {
        const user = await sequelize.models.User.create({ name, password })

        req.session.user = user

        return user
    },

    login: async (parent, { name, password }, { req }) => {
        const user = await User.findOne({ where: { name } })

        if (!user) {
            throw new Error('Invalid name.')
        }

        const valid = await bcrypt.compare(password, user.password)

        if (!valid) {
            throw new Error('Invalid password.')
        }

        req.session.user = user

        return user
    },

    logout: async (parent, args, { req, res }) => {
        return new Promise((resolve, reject) => {
            req.session.destroy(err => {
                if (err) {
                    reject(err)
                }

                res.clearCookie('connect.sid')

                resolve(true)
            })
        })
    }
}

export default Mutation
