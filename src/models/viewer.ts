import mongoose, { Types } from 'mongoose';

const ViewerSchema = new mongoose.Schema({
    comicId: { type: Types.ObjectId, required: true, index: true },
    chapterId: { type: Types.ObjectId, required: true, index: true },
    userId: { type: Types.ObjectId, required: false, default: null, index: true },
    createTime: { type: Date, required: true, index: true },
});

export default mongoose.model('Viewer', ViewerSchema);
