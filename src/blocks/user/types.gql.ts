import gql from 'graphql-tag'

export default gql`
    extend type Query {
        getUser(id: Int): User
        getUserList: UserList!
        userServerSeed(id: String!): String
    }

    extend type Mutation {
        register(name: String, password: String): User!
        login(name: String!, password: String!): User!
        logout: Boolean!
    }

    extend type Subscription {
        userBalanceUpdated(userId: String!): UserBalance
    }

    type UserBalance {
        userId: String
        balance: Int
    }

    type UserList {
        data: [User]
        count: Int
        page: Int
        pageSize: Int
    }

    type User {
        id: Int
        name: String
        balance: Float
        password: String
    }
`
