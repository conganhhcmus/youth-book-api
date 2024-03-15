import { depositAccount, getAllTransaction, getAllTransactionByUserId, updateTransactionById } from '@/controllers/payment';
import { verifyAccessToken } from '@/middlewares/authToken';
import { isAdmin } from '@/middlewares/usersValidation';
import { Router } from 'express';

export default (router: Router) => {
    router.post('/payment/deposit', verifyAccessToken, depositAccount);

    router.get('/transaction/:id', verifyAccessToken, getAllTransactionByUserId);

    router.get('/transaction', verifyAccessToken, isAdmin, getAllTransaction);

    router.post('/transaction/:id', verifyAccessToken, isAdmin, updateTransactionById);
};
