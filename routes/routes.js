const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Album = require("../models/album");

// Set up API routes
router.get('/albums', async (req, res) => {
    const albums = await Album.find();
    res.json(albums);
});

router.get('/albums/:title', async (req, res) => {
    const album = await Album.findOne({ title: req.params.title });
    if (!album) {
        res.status(404).json({ error: 'Album not found' });
    } else {
        res.json(album);
    }
});

router.post('/albums', async (req, res) => {
    const { title, artist, year } = req.body;
    const album = new Album({ title, artist, year });
    await album.save();
    res.status(201).json(album);
});

router.put('/albums/:_id', async (req, res) => {
    const album = await Album.findOne({ _id: req.params._id });
    if (!album) {
      res.status(404).json({ error: 'Album not found' });
    } else {
      const { title, artist, year } = req.body;
      album.title = title;
      album.artist = artist;
      album.year = year;
      await album.save();
      res.json(album);
    }
  });
  

router.delete('/albums/:_id', async (req, res) => {
    const album = await Album.findOne({ _id: req.params._id });
    if (!album) {
      res.status(404).json({ error: 'Album not found' });
    } else {
      await album.remove();
      res.json({ message: 'Album deleted' });
    }
  });
  

module.exports = router;
