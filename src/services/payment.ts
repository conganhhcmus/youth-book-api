import { TransactionStatus, TransactionType } from '@/constants/payment';
import * as transactionRepository from '@/repositories/transaction';
import * as usersRepository from '@/repositories/users';
import { Transaction } from '@/types/transaction';
import moment from 'moment';

export const depositAccount = async (amount: number, userId: string) => {
    const data = {
        amount: amount,
        targetId: userId,
        type: TransactionType.deposit,
        status: TransactionStatus.pending,
        createTime: moment().utc().toDate(),
    } as Transaction;

    const result = await transactionRepository.createTransaction(data);

    return result;
};

export const buyChapter = async (amount: number, userId: string, chapterId: string) => {
    const data = {
        amount: -amount,
        sourceId: chapterId,
        targetId: userId,
        type: TransactionType.buy,
        status: TransactionStatus.success,
        createTime: moment().utc().toDate(),
    } as Transaction;

    const result = await transactionRepository.createTransaction(data);

    await usersRepository.updateWalletById(result.targetId as string, result.amount);

    return result;
};

export const getAllTransactionByUserId = async (userId: string, option: number, status: number[], page: number) => {
    const result = await transactionRepository.getAllTransactionByUserId(userId, option, status, page);

    return result;
};

export const getAllBuyTransactionByUserId = async (userId: string) => {
    const result = await transactionRepository.getAllBuyTransactionByUserId(userId);

    return result;
};

export const getAllTransaction = async (option: number, status: number[], page: number) => {
    const result = await transactionRepository.getAllTransaction(option, status, page);

    return result;
};

export const updateTransactionById = async (id: string, status: number) => {
    const result = await transactionRepository.updateTransactionById(id, status);
    if (result.status === TransactionStatus.success) {
        await usersRepository.updateWalletById(result.targetId as string, result.amount);
    }
    return result;
};
