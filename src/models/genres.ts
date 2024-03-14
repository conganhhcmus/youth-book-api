import mongoose from 'mongoose';

const GenresSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createTime: { type: Date, required: true },
    updateTime: { type: Date, required: false, default: new Date() },
    createBy: { type: String, required: true },
});

export default mongoose.model('Genres', GenresSchema);
