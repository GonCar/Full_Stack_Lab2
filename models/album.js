const mongoose = require("mongoose");

// Define music album schema and model
const albumSchema = new mongoose.Schema({
    id: Number,
    title: String,
    artist: String,
    year: Number
  });
  
module.exports = mongoose.model('Album', albumSchema);