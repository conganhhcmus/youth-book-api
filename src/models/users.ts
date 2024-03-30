import moment from 'moment';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, index: true },
    email: { type: String, required: false, default: '' },
    fullName: { type: String, required: false, default: '' },
    role: { type: Number, required: false, default: 0 },
    wallet: { type: Number, required: false, default: 0 },
    avatarImg: { type: String, required: false },
    password: { type: String, required: true, select: false },
    refreshToken: { type: String, required: false, select: false },
    isActive: { type: Boolean, required: false, default: true },
    createTime: { type: Date, required: true },
    updateTime: { type: Date, required: false, default: () => moment().utc().toDate() },
    avatarId: { type: String, required: false },
});

export default mongoose.model('User', UserSchema);
