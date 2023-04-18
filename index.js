// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const route = require('./routes/routes');

const path = require('path');

// Set up express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
try {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Connected to the database');

    const db = mongoose.connection;
    db.on('connected', console.log.bind(console,'MongoDB and Mongoose connected'));
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }

//midleware
app.use('/api', route);
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
