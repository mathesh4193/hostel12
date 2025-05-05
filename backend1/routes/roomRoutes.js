const express = require("express");
const { addRoom, getRooms, allocateRoom } = require("../controllers/roomController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", auth, addRoom);
router.get("/", auth, getRooms);
router.post("/allocate", auth, allocateRoom);

module.exports = router;