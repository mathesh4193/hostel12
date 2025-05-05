const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: String,
  capacity: Number,
  occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Room", roomSchema);