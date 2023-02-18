import { merge } from 'lodash'
import * as blocks from '../blocks'

const typeDefs = []
const resolverFragments = []

// define root types for extending later
typeDefs.push(`
  type Query
  type Mutation
  type Subscription
`)

for (const block of Object.values(blocks)) {
    if (block.typeDefs) {
        typeDefs.push(block.typeDefs)
    }
    if (block.resolvers) {
        resolverFragments.push(block.resolvers)
    }
}

export { typeDefs }
export const resolvers = merge(...resolverFragments)
