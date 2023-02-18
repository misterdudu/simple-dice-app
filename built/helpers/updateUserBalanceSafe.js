import { sequelize } from '../core/sequelize';
import { User, USER_BALANCE_UPDATED } from '../blocks/user';
import pubsub from '../core/pubsub';
export async function updateUserBalanceSafe(id, amount, newServerSeed) {
    //To prevent user balance updates from overlapping, use optimistic locking with transactions in Sequelize.
    // Begin a transaction
    const transaction = await sequelize.transaction();
    try {
        // Retrieve the user record with the specified userId
        const user = await User.findByPk(id, { transaction });
        // Increment the user's balance and version
        if (newServerSeed)
            user.serverSeed = newServerSeed;
        user.balance += amount;
        user.version++;
        await user.save({ transaction });
        // Commit the transaction
        await transaction.commit();
        await pubsub.publish(USER_BALANCE_UPDATED, {
            userBalanceUpdated: { userId: id, balance: user.balance }
        });
        // Return the updated user record
        return true;
    }
    catch (error) {
        // Rollback the transaction
        await transaction.rollback();
        throw error;
    }
}
