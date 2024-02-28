import mongoose from 'mongoose';

const MarkerSchema = new mongoose.Schema({
    comicId: { type: String, required: true },
    userId: { type: String, required: true },
    chapterId: { type: String, required: true },
});

export default mongoose.model('Marker', MarkerSchema);
