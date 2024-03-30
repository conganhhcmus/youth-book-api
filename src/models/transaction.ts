import moment from 'moment';
import mongoose, { Types } from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    sourceId: { type: Types.ObjectId, required: false },
    targetId: { type: Types.ObjectId, required: true, index: true },
    type: { type: Number, required: true, index: true },
    status: { type: Number, required: true, index: true },
    createTime: { type: Date, required: true },
    updateTime: { type: Date, required: false, default: () => moment().utc().toDate(), index: true },
    updateBy: { type: Types.ObjectId, required: false },
});

export default mongoose.model('Transaction', TransactionSchema);
