import mongoose, { Types } from 'mongoose';
import moment from 'moment';

const ChapterSchema = new mongoose.Schema({
    comicId: { type: Types.ObjectId, required: true },
    name: { type: String, required: true },
    type: { type: Number, required: true },
    content: { type: String, required: false },
    price: { type: Number, required: false, default: 0 },
    createTime: { type: Date, required: true },
    updateTime: { type: Date, required: false, default: moment().utc().toDate() },
});

export default mongoose.model('Chapter', ChapterSchema);
