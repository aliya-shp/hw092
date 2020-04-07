const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    issueDate: {
        type: String,
        required: true,
    },
    image: {
        type: String,
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

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;