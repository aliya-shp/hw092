const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    sequence: {
        type: Number,
        required: true,
    },
    published: {
        type: Boolean,
        default: false,
        enum: [false, true],
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;