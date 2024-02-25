import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: false, default: '' },
    fullName: { type: String, required: false, default: '' },
    role: { type: Number, required: false, default: 0 },
    password: { type: String, required: true, select: false },
    refreshToken: { type: String, required: false, select: false },
    isActive: { type: Boolean, required: false, default: true },
});

export default mongoose.model('User', UserSchema);
