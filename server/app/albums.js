const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const Album = require('../models/Album');

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

        if (req.query.artist) {
            if (req.user && req.user.role === 'user') {
                query = {
                    artist: req.query.artist,
                    publisher: req.user._id,
                };
            }

            if (req.user && req.user.role === 'admin') {
                query = {artist: req.query.artist};
            }

            const albums = await Album.find(query).sort([['issueDate', 1]]);
            return res.send(albums);
        } else {
            if (req.user && req.user.role === 'user') {
                query = {
                    publisher: req.user._id,
                };
            }

            if (req.user && req.user.role === 'admin') {
                query = {};
            }

            const albums = await Album.find(query).sort([['issueDate', 1]]);
            return res.send(albums);
        }
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
                album: req.params.id,
                publisher: req.user._id,
            };
        }

        if (req.user && req.user.role === 'admin') {
            query = {album: req.params.id};
        }

        const album = await Album.find(query).populate('artist');
        return res.send(album);
    } catch (error) {
        return res.send(error);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const albumData = {
        title: req.body.title,
        artist: req.body.artist,
        issueDate: req.body.issueDate,
        publisher: req.user._id,
    };

    if (req.file) {
        albumData.image = req.file.filename;
    }

    const album = new Album(albumData);
    await album.save();

    return res.send(album);
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        await album.delete();

        return res.send('Deleted');
    } catch (error) {
        return res.send(error);
    }
});

router.post('/:id/publish', auth, async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).send('Not found');
        }

        album.published = true;
        await album.save();
    } catch (error) {
        return res.send(error);
    }
});


module.exports = router;