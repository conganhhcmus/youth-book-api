import mongoose from 'mongoose';

const ChapterSchema = new mongoose.Schema({
    comicId: { type: String, required: true },
    name: { type: String, required: true },
    typeId: { type: Number, required: true },
    content: { type: String, required: false },
    updateTime: { type: Date, required: true },
});

export default mongoose.model('Chapter', ChapterSchema);
