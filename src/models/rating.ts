import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
    value: { type: Number, required: true },
    comicId: { type: String, required: false, default: '' },
    userId: { type: String, required: true },
});

export default mongoose.model('Rating', RatingSchema);
