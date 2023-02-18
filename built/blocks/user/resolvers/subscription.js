import { USER_BALANCE_UPDATED } from '../events';
import { withFilter } from 'graphql-subscriptions';
import pubsub from '../../../core/pubsub';
const Subscription = {
    userBalanceUpdated: {
        subscribe: withFilter(() => pubsub.asyncIterator([USER_BALANCE_UPDATED]), (payload, variables) => {
            // console.log(payload, variables)
            return payload.userBalanceUpdated.userId === variables.userId;
        })
    }
};
export default Subscription;
