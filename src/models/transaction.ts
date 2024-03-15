import moment from 'moment';
import mongoose, { Types } from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    sourceId: { type: Types.ObjectId, required: false },
    targetId: { type: Types.ObjectId, required: true },
    type: { type: Number, required: true },
    status: { type: Number, required: true },
    createTime: { type: Date, required: true },
    updateTime: { type: Date, required: false, default: moment().utc().toDate() },
});

export default mongoose.model('Transaction', TransactionSchema);
