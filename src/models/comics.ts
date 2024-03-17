import { ComicStatusType } from '@/constants/comic';
import moment from 'moment';
import mongoose, { Types } from 'mongoose';

const ComicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    thumbnail: { type: String, required: true },
    otherName: { type: [String], required: false, default: [] },
    totalFollowers: { type: Number, required: false, default: 0 },
    genres: { type: [Types.ObjectId], required: true },
    status: { type: Number, required: false, default: ComicStatusType.updating },
    recommend: { type: Boolean, required: false, default: false },
    totalViews: { type: Number, required: false, default: 0 },
    author: { type: String, required: false, default: 0 },
    createTime: { type: Date, required: true },
    updateTime: { type: Date, required: false, default: moment().utc().toDate() },
    createBy: { type: String, required: true },
});

export default mongoose.model('Comic', ComicSchema);
