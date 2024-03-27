import userData from '@/db/users.json';
import transactionData from '@/db/transactions.json';
import UserModel from '@/models/users';
import TransactionModel from '@/models/transaction';
import { User } from '@/types/users';
import { hashPassword } from '@/helpers/auth';
import moment from 'moment';
import { Transaction } from '@/types/transaction';
import { TransactionStatus, TransactionType } from '@/constants/payment';
import { Types } from 'mongoose';

const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

const initialData = async () => {
    const password = '123456';
    const userList = await Promise.all(
        (userData as string[]).map(
            async (user) =>
                ({
                    username: user,
                    email: `${user}@gmail.com`,
                    password: await hashPassword(password),
                    isActive: true,
                    role: 0,
                    createTime: moment()
                        .subtract(getRandomNumber(7, 21), 'days')
                        .subtract(getRandomNumber(0, 60), 'hours')
                        .subtract(getRandomNumber(0, 60), 'minutes')
                        .utc()
                        .toDate(),
                }) as User,
        ),
    );

    const resultUser = await Promise.all(
        userList.map(
            async (user) =>
                await UserModel.updateOne(
                    {
                        username: user.username,
                    },
                    { $set: { ...user } },
                    { upsert: true },
                ),
        ),
    );

    const adminUser = await UserModel.findOne({ username: 'admin' });

    const transList = await Promise.all(
        (transactionData as { username: string; amount: number; time: string }[]).map(async (trans) => {
            const userQuery = await UserModel.findOne({ username: trans.username });
            return {
                targetId: userQuery._id.toString(),
                amount: trans.amount * 1000,
                type: TransactionType.deposit,
                status: TransactionStatus.success,
                createTime: moment(trans.time, 'hh:mm:ss DD/MM/YYYY').utc().toDate(),
                updateTime: moment(trans.time, 'hh:mm:ss DD/MM/YYYY').add(getRandomNumber(0, 5), 'minutes').utc().toDate(),
                updateBy: adminUser._id.toString(),
            } as Transaction;
        }),
    );

    const resultTransaction = await Promise.all(
        transList.map(async (trans) => {
            const result = await TransactionModel.updateOne(
                {
                    amount: trans.amount,
                    targetId: trans.targetId,
                    createTime: trans.createTime,
                },
                { $set: { ...trans } },
                { upsert: true },
            );

            // reset amount user

            await UserModel.findOneAndUpdate({ _id: new Types.ObjectId(trans.targetId) }, { $set: { wallet: 0 } });

            await UserModel.findOneAndUpdate({ _id: new Types.ObjectId(trans.targetId) }, { $inc: { wallet: trans.amount } }, { new: true });

            return result;
        }),
    );

    console.log(resultUser);
    console.log(resultTransaction);
};

export default initialData;
