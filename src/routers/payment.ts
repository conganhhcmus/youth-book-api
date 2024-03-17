import {
    buyChapter,
    depositAccount,
    getAllBuyTransactionByUserId,
    getAllTransaction,
    getAllTransactionByUserId,
    updateTransactionById,
} from '@/controllers/payment';
import { verifyAccessToken } from '@/middlewares/authToken';
import { isAdminOrCollaborator } from '@/middlewares/usersValidation';
import { Router } from 'express';

export default (router: Router) => {
    router.post('/payment/deposit', verifyAccessToken, depositAccount);

    router.post('/payment/buy', verifyAccessToken, buyChapter);

    router.get('/transaction/:id', verifyAccessToken, getAllTransactionByUserId);

    router.get('/transaction/buy/:id', verifyAccessToken, getAllBuyTransactionByUserId);

    router.get('/transaction', verifyAccessToken, isAdminOrCollaborator, getAllTransaction);

    router.post('/transaction/:id', verifyAccessToken, isAdminOrCollaborator, updateTransactionById);
};
