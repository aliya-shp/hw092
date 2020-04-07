const express = require('express');

const Track = require('../models/Track');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        let query;

        if (!req.user) {
            query = {published: true};
        }

        if (req.user && req.user.role === 'user') {
            query = {
                album: req.query.album,
                publisher: req.user._id,
            };
        }

        if (req.user && req.user.role === 'admin') {
            query = {album: req.query.album};
        }

        const tracks = await Track.find(query).sort([['sequence', 1]]);
        return res.send(tracks);
    } catch (error) {
        return res.send(error);
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        let query;

        if (!req.user) {
            query = {published: true};
        }

        if (req.user && req.user.role === 'user') {
            query = {
                track: req.params.id,
                publisher: req.user._id,
            };
        }

        if (req.user && req.user.role === 'admin') {
            query = {track: req.params.id};
        }

        const tracks = await Track.find(query).populate('album');
        return res.send(tracks);
    } catch (error) {
        return res.send(error);
    }
});

router.post('/', auth, async (req, res) => {
    const trackData = {
        title: req.body.title,
        album: req.body.album,
        sequence: req.body.sequence,
        duration: req.body.duration,
        publisher: req.user._id,
    };

    const track = new Track(trackData);
    await track.save();

    return res.send(track);
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        await track.delete();

        return res.send('Deleted');
    } catch (error) {
        return res.send(error);
    }
});

router.post('/:id/publish', auth, async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);

        if (!track) {
            return res.status(404).send('Not found');
        }

        track.published = true;
        await track.save();
    } catch (error) {
        return res.send(error);
    }
});

module.exports = router;