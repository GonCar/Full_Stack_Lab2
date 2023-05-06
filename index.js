// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const route = require('./routes/routes');
const ejs = require('ejs');
const { kStringMaxLength } = require('buffer');

const path = require('path');

// Set up express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
try {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Connecting to the database');

    const db = mongoose.connection;
    db.on('connected', console.log.bind(console,'MongoDB and Mongoose connected'));
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }

//midleware
app.use(express.json());
app.use('/api', route);
app.set('view engine', 'ejs');
const Album = require("./models/album");


app.get("/", (req, res) => {
  Album.find({}, function(err, albums){
    res.render('index', {
      albumsList: albums
    });
  })
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
