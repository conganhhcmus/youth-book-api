import moment from 'moment';
import mongoose from 'mongoose';

const GenresSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    createTime: { type: Date, required: true },
    updateTime: { type: Date, required: false, default: () => moment().utc().toDate() },
    createBy: { type: String, required: true },
});

export default mongoose.model('Genres', GenresSchema);
