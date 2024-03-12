import mongoose from 'mongoose';

const ChapterSchema = new mongoose.Schema({
    comicId: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: Number, required: true },
    content: { type: String, required: false },
    createTime: { type: Date, required: true },
    updateTime: { type: Date, required: false, default: new Date() },
});

export default mongoose.model('Chapter', ChapterSchema);
