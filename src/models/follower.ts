import mongoose from 'mongoose';

const FollowerSchema = new mongoose.Schema({
    comicId: { type: String, required: true },
    userId: { type: String, required: true },
});

export default mongoose.model('Follower', FollowerSchema);
