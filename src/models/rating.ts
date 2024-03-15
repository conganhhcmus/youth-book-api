import mongoose, { Types } from 'mongoose';

const RatingSchema = new mongoose.Schema({
    value: { type: Number, required: true },
    comicId: { type: Types.ObjectId, required: false, default: '' },
    userId: { type: Types.ObjectId, required: true },
});

export default mongoose.model('Rating', RatingSchema);
