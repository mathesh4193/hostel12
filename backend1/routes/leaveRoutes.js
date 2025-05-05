const express = require("express");
const { applyLeave, getLeaves, updateLeaveStatus } = require("../controllers/leaveController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", auth, applyLeave);
router.get("/", auth, getLeaves);
router.patch("/:id", auth, updateLeaveStatus);

module.exports = router;