import moment from 'moment';
import mongoose, { Types } from 'mongoose';

const ViewerSchema = new mongoose.Schema({
    comicId: { type: Types.ObjectId, required: true, index: true },
    chapterId: { type: Types.ObjectId, required: true, index: true },
    userId: { type: Types.ObjectId, required: false, default: null, index: true },
    createTime: { type: Date, required: false, default: moment().utc().toDate(), index: true },
});

export default mongoose.model('Viewer', ViewerSchema);
