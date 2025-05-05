const Room = require("../models/Room");

exports.addRoom = async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json(room);
};

exports.getRooms = async (req, res) => {
  const rooms = await Room.find().populate("occupants", "name email");
  res.json(rooms);
};

exports.allocateRoom = async (req, res) => {
  const { roomId, studentId } = req.body;
  const room = await Room.findById(roomId);
  if (room.occupants.length >= room.capacity) {
    return res.status(400).json({ message: "Room full" });
  }
  room.occupants.push(studentId);
  await room.save();
  res.json(room);
};