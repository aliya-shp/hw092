const express = require('express');
const auth = require('../middleware/auth');

const TrackHistory = require('../models/TrackHistory');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const trackHistoryData = req.body;
    trackHistoryData.dateTime = new Date().toISOString();
    trackHistoryData.user = req.user.id;

    try {
        const trackHistory = new TrackHistory(trackHistoryData);
        await trackHistory.save();

        return res.send(trackHistory);
    } catch (error) {
        return res.send(error);
    }
});

router.get('/', auth, async (req, res) => {
    try {
        let query;

        if (req.user && req.user.role === 'user') {
            query = {
                user: req.user._id,
            };
        }

        if (req.user && req.user.role === 'admin') {
            query = {};
        }

        const trackHistories = await TrackHistory.find(query).sort([['dateTime', -1]]).populate({path: 'track', populate: {path: 'album', populate: {path: 'artist'}}});
        return res.send(trackHistories);
    } catch (error) {
        return res.send(error);
    }
});

module.exports = router;