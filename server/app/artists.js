const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const Artist = require('../models/Artist');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        let query;
        if (!req.user) {
            query = {published: true};
        }

        if (req.user && req.user.role === 'user') {
            query = {publisher: req.user._id};
        }

        if (req.user && req.user.role === 'admin') {
            query = {};
        }

        const artists = await Artist.find(query).sort('name');

        return res.send(artists);
    } catch (error) {
        return res.send(error);
    }
});

router.post('/:id/publish', auth, async (req, res) => {
    const artist = await Artist.findById(req.params.id);

    try {
        if (!artist) {
            return res.status(404).send('Oops');
        }

        artist.published = true;
        await artist.save();

        res.send({message: 'Published'});
    } catch (error) {
        res.send(error);
    }
});

router.post('/', [auth, upload.single('photo')], async (req, res) => {
    const artistData = req.body;

    try {
        if (req.file) {
            artistData.photo = req.file.filename;
        }

        const artist = new Artist(artistData);
        await artist.save();

        return res.send(artist);
    } catch (error) {
        return res.send(error);
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);

        await artist.delete();
        return res.send('Deleted');
    } catch (error) {
        return res.send(error);
    }
});

module.exports = router;