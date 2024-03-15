import { DEFAULT_PAGE_SIZE } from '@/constants/paging';
import TransactionModel from '@/models/transaction';
import { TransactionResponse } from '@/types/transaction';
import moment from 'moment';
import { Types } from 'mongoose';

export const createTransaction = (values: Record<string, any>): Promise<TransactionResponse> =>
    new TransactionModel(values).save().then((trans) => trans.toObject());

export const getAllTransaction = async (option: number, status: number[], page: number) => {
    const date = moment().utc().subtract(option, 'months').toDate();
    const query = option !== 0 ? { status: { $in: status }, createTime: { $gt: date } } : { status: { $in: status } };
    const total = await TransactionModel.countDocuments().exec();
    const transaction = await TransactionModel.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'targetId',
                foreignField: '_id',
                as: 'users',
            },
        },
        { $skip: DEFAULT_PAGE_SIZE * page - DEFAULT_PAGE_SIZE },
        { $limit: DEFAULT_PAGE_SIZE },
        { $match: query },
    ]);

    return { data: transaction, totalPage: Math.ceil(total / DEFAULT_PAGE_SIZE), currentPage: page };
};

export const getAllTransactionByUserId = async (userId: string, option: number, status: number[], page: number) => {
    const date = moment().utc().subtract(option, 'months').toDate();
    const query =
        option !== 0
            ? { status: { $in: status }, targetId: new Types.ObjectId(userId), createTime: { $gt: date } }
            : { status: { $in: status }, targetId: new Types.ObjectId(userId) };
    const total = await TransactionModel.countDocuments().exec();
    const transaction = await TransactionModel.find(query)
        .skip(DEFAULT_PAGE_SIZE * page - DEFAULT_PAGE_SIZE)
        .limit(DEFAULT_PAGE_SIZE);

    return { data: transaction, totalPage: Math.ceil(total / DEFAULT_PAGE_SIZE), currentPage: page };
};

export const updateTransactionById = (id: string, status: number) =>
    TransactionModel.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: { status: status } }, { new: true });
