const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const roomRoutes = require("./routes/roomRoutes");

// Remove this duplicate routes object
// const routes = {
//   auth: require('./routes/authRoutes'),
//   leave: require('./routes/leaveRoutes'),
//   rooms: require('./routes/roomRoutes'),
// };

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Add a root route handler
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hostel Management API" });
});

// Use routes
app.use('/api/auth', authRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/rooms", roomRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
      .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
          app.listen(PORT + 1);
        } else {
          console.error(err);
        }
      });
  })
  .catch((err) => console.error(err));


