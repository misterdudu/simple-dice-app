import { User } from '../models'
import { Op } from 'sequelize'

interface UserListArgs {
    page?: number
    pageSize?: number
    nameFilter?: string
    balanceFilter?: number
    registeredAtFilter?: Date
}

const Query = {
    getUser: async (_, { id }: { id: number }) => {
        return await User.findByPk(id)
    },

    getUserList: async (
        _,
        { page = 1, pageSize = 50, nameFilter, balanceFilter, registeredAtFilter }: UserListArgs
    ) => {
        const where = {}

        if (nameFilter) {
            where['name'] = {
                [Op.like]: `%${nameFilter}%`
            }
        }

        if (balanceFilter) {
            where['balance'] = {
                [Op.gte]: balanceFilter
            }
        }

        if (registeredAtFilter) {
            where['registeredAt'] = {
                [Op.gte]: registeredAtFilter
            }
        }

        const count = await User.count({ where })
        const data = await User.findAll({
            where,
            order: [['id', 'ASC']],
            offset: (page - 1) * pageSize,
            limit: pageSize,
            raw: true
        })

        return {
            data,
            count,
            page,
            pageSize
        }
    }
}

export default Query
