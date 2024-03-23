import { DEFAULT_PAGE_SIZE } from '@/constants/paging';
import { TransactionStatus } from '@/constants/payment';
import UserModel from '@/models/users';
import { User } from '@/types/users';
import { Types } from 'mongoose';

export const getUsers = async (page: number, q: string, type: string) => {
    const queryType = type === '0' ? {} : { 'transactions.0': { $exists: type === '1' } };
    const queryUsername = !!q ? { username: { $regex: '.*' + q + '.*', $options: 'i' } } : {};
    const total = await UserModel.aggregate([
        { $match: queryUsername },
        {
            $lookup: {
                from: 'transactions',
                localField: '_id',
                foreignField: 'targetId',
                pipeline: [
                    {
                        $match: {
                            status: TransactionStatus.success,
                        },
                    },
                ],
                as: 'transactions',
            },
        },
        { $match: queryType },
    ]);
    const users = await UserModel.aggregate([
        { $match: queryUsername },
        {
            $lookup: {
                from: 'transactions',
                localField: '_id',
                foreignField: 'targetId',
                pipeline: [
                    {
                        $match: {
                            status: TransactionStatus.success,
                        },
                    },
                ],
                as: 'transactions',
            },
        },
        { $match: queryType },
        { $sort: { createTime: -1 } },
        { $skip: DEFAULT_PAGE_SIZE * page - DEFAULT_PAGE_SIZE },
        { $limit: DEFAULT_PAGE_SIZE },
    ]);

    return { data: users, totalPage: Math.ceil(total.length / DEFAULT_PAGE_SIZE), currentPage: page };
};

export const getUserByUserName = (username: string) => UserModel.findOne({ username });

export const getUserByRefreshToken = (token: string) => UserModel.findOne({ refreshToken: token });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>): Promise<User> => new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values, { new: true });

export const updateWalletById = (id: string, amount: number) =>
    UserModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $inc: { wallet: amount } }, { new: true });

export const getTotalUsers = async () => await UserModel.countDocuments().exec();

export const updateAvatarById = async (id: string, avatarUrl: string, avatarId: string) =>
    await UserModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: { avatarImg: avatarUrl, avatarId: avatarId } });

export const updateStatusById = async (id: string) =>
    await UserModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, [{ $set: { isActive: { $eq: [false, '$isActive'] } } }]);
