import { DEFAULT_PAGE_SIZE } from '@/constants/paging';
import { TransactionStatus, TransactionType } from '@/constants/payment';
import TransactionModel from '@/models/transaction';
import { TransactionResponse } from '@/types/transaction';
import moment from 'moment';
import { Types } from 'mongoose';

export const createTransaction = (values: Record<string, any>): Promise<TransactionResponse> =>
    new TransactionModel(values).save().then((trans) => trans.toObject());

export const getAllTransaction = async (option: number, status: number[], page: number, q: string, sort: {}) => {
    const date = moment().utc().endOf('day').subtract(option, 'days').toDate();
    const query =
        option !== 0
            ? { status: { $in: status }, updateTime: { $gt: date }, 'users.username': { $regex: '.*' + q + '.*', $options: 'i' } }
            : { status: { $in: status }, 'users.username': { $regex: '.*' + q + '.*', $options: 'i' } };
    const total = await TransactionModel.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'targetId',
                foreignField: '_id',
                as: 'users',
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'updateBy',
                foreignField: '_id',
                as: 'updateUsers',
            },
        },
        { $match: query },
    ]);

    let transaction = await TransactionModel.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'targetId',
                foreignField: '_id',
                as: 'users',
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'updateBy',
                foreignField: '_id',
                as: 'updateUsers',
            },
        },
        { $match: query },
        { $sort: sort },
        { $skip: DEFAULT_PAGE_SIZE * page - DEFAULT_PAGE_SIZE },
    ]);
    const limit = Math.min(DEFAULT_PAGE_SIZE, transaction.length);

    return { data: transaction.slice(0, limit), totalPage: Math.ceil(total.length / DEFAULT_PAGE_SIZE), currentPage: page };
};

export const getAllTransactionByUserId = async (userId: string, option: number, status: number[], page: number, sort: {}) => {
    const date = moment().utc().endOf('day').subtract(option, 'days').toDate();
    const query =
        option !== 0
            ? { status: { $in: status }, targetId: new Types.ObjectId(userId), updateTime: { $gt: date } }
            : { status: { $in: status }, targetId: new Types.ObjectId(userId) };
    const total = await TransactionModel.countDocuments(query).exec();
    const transaction = await TransactionModel.find(query)
        .sort(sort)
        .skip(DEFAULT_PAGE_SIZE * page - DEFAULT_PAGE_SIZE)
        .limit(DEFAULT_PAGE_SIZE);

    return { data: transaction, totalPage: Math.ceil(total / DEFAULT_PAGE_SIZE), currentPage: page };
};

export const getAllBuyTransactionByUserId = async (userId: string) => {
    const query = {
        type: TransactionType.buy,
        status: { $in: TransactionStatus.success },
        targetId: new Types.ObjectId(userId),
    };
    const transaction = await TransactionModel.find(query);

    return transaction;
};

export const updateTransactionById = (id: string, updateById: string, status: number) =>
    TransactionModel.findOneAndUpdate(
        { _id: new Types.ObjectId(id) },
        { $set: { status: status, updateBy: new Types.ObjectId(updateById), updateTime: moment().utc().toDate() } },
        { new: true },
    );

export const getTotalAmountByDays = async (days: number) => {
    const date = moment().utc().endOf('day').subtract(days, 'days').toDate();
    const query =
        days == 0
            ? { status: TransactionStatus.success, type: TransactionType.deposit }
            : {
                  status: TransactionStatus.success,
                  type: TransactionType.deposit,
                  updateTime: { $gt: date },
              };

    const transaction = await TransactionModel.aggregate([{ $match: query }]);

    return transaction.reduce((currentValue, transaction) => currentValue + (parseInt(transaction.amount) || 0), 0);
};
