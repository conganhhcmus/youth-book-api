import { Dashboard } from '@/types/dashboard';
import * as comicRepository from '@/repositories/comics';
import * as transactionRepository from '@/repositories/transaction';
import * as usersRepository from '@/repositories/users';

export const getDashboard = async (): Promise<Dashboard> => {
    const result = {
        payment: [],
    } as Dashboard;
    // total payment
    result.payment.push({
        name: 'payment-by-day',
        value: await transactionRepository.getTotalAmountByDays(1),
    });

    // total payment
    result.payment.push({
        name: 'payment-by-week',
        value: await transactionRepository.getTotalAmountByDays(7),
    });

    // total payment
    result.payment.push({
        name: 'payment-by-1-month',
        value: await transactionRepository.getTotalAmountByDays(30),
    });
    // total payment
    result.payment.push({
        name: 'payment-by-3-months',
        value: await transactionRepository.getTotalAmountByDays(3 * 30),
    });

    // total payment by year
    result.payment.push({
        name: 'payment-by-year',
        value: await transactionRepository.getTotalAmountByDays(365),
    });

    // total payment
    result.payment.push({
        name: 'total-payment',
        value: await transactionRepository.getTotalAmountByDays(0),
    });

    // total comics
    result.totalComics = {
        name: 'total-comics',
        value: await comicRepository.getTotalComics(),
    };

    // total views
    result.totalViews = {
        name: 'total-views',
        value: await comicRepository.getTotalViews(),
    };

    // total users
    result.totalUsers = {
        name: 'total-users',
        value: await usersRepository.getTotalUsers(),
    };

    return result;
};
