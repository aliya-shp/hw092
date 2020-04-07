const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    description: {
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

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;