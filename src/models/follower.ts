import mongoose, { Types } from 'mongoose';

const FollowerSchema = new mongoose.Schema({
    comicId: { type: Types.ObjectId, required: true },
    userId: { type: Types.ObjectId, required: true },
});

export default mongoose.model('Follower', FollowerSchema);
