import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './schema'
import type { Request, Response } from 'express'
import { Session } from 'express-session'

interface Context {
    req: Request
    res: Response
    user: {
        id: number
        name: string
        balance: number
    } | null
}

interface IRequestWithSession extends Request {
    session: Session
}

const context = async ({ req, res }: { req: IRequestWithSession; res: Response }): Promise<Context> => {
    const user = req.session?.user ?? null

    return { req, res, user }
}

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    introspection: true,
    playground: true
})

export default apollo
