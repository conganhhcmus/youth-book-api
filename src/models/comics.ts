import mongoose from 'mongoose';

const ComicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    thumbnail: { type: String, required: true },
    otherName: { type: [String], required: false, default: [] },
    follower: { type: Number, required: false, default: 0 },
    genres: { type: [String], required: true },
    status: { type: Number, required: false, default: 0 },
    totalViews: { type: Number, required: false, default: 0 },
    author: { type: String, required: false, default: 0 },
    createTime: { type: Date, required: true },
    updateTime: { type: Date, required: false, default: new Date() },
    createBy: { type: String, required: true },
});

export default mongoose.model('Comic', ComicSchema);
