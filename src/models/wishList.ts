import mongoose, { Types } from 'mongoose';

const WishListSchema = new mongoose.Schema({
    comicId: { type: Types.ObjectId, required: true },
    userId: { type: Types.ObjectId, required: true },
});

export default mongoose.model('WishList', WishListSchema);
