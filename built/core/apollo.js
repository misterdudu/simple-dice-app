import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
const context = async ({ req, res }) => {
    const user = req.session?.user ?? null;
    return { req, res, user };
};
const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    introspection: true,
    playground: true
});
export default apollo;
