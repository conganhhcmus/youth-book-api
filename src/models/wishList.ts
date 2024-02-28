import mongoose from 'mongoose';

const WishListSchema = new mongoose.Schema({
    comicId: { type: String, required: true },
    userId: { type: String, required: true },
});

export default mongoose.model('WishList', WishListSchema);
