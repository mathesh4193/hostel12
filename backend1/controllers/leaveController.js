const Leave = require("../models/Leave");

exports.applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create({ ...req.body, studentId: req.user.id });
    res.status(201).json(leave);
  } catch {
    res.status(400).json({ message: "Failed to apply leave" });
  }
};

exports.getLeaves = async (req, res) => {
  const filter = req.user.role === "warden" ? {} : { studentId: req.user.id };
  const leaves = await Leave.find(filter).populate("studentId", "name email");
  res.json(leaves);
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(leave);
  } catch {
    res.status(400).json({ message: "Failed to update leave" });
  }
};