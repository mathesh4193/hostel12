const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register function
exports.register = async (req, res) => {
  const { userId, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ userId, password: hashedPassword, role });

    res.status(201).json({
      message: 'User registered successfully',
      user: { userId: user.userId, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};


// Login function
exports.login = async (req, res) => {
  const { userId, password, role } = req.body;

  try {
    // Find the user by userId and role
    const user = await User.findOne({ userId, role });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,  // Make sure to set JWT_SECRET in your environment variables
      { expiresIn: '1h' }  // Expiry time for the token (optional)
    );

    // Send the token and user data (without password) in the response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { userId: user.userId, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};

