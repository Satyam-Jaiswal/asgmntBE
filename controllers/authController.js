const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const send_formatted_response = require("../middleware/send_formatted_response");

// Register a new user
exports.register = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res
      .status(201)
      .json(
        send_formatted_response(
          { user: newUser },
          true,
          "User registered successfully"
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(send_formatted_response(error, false, "Error registering user"));
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json(send_formatted_response({}, false, "User not found"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json(send_formatted_response({}, false, "Invalid credentials"));
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json(
      send_formatted_response(
        {
          user: { id: user._id, username: user.username, email: user.email },
          token,
        },
        true,
        "User logged in successfully"
      )
    );
  } catch (error) {
    res
      .status(500)
      .json(send_formatted_response(error, false, "Error logging in"));
  }
};

// Google OAuth
exports.googleAuth = async (req, res) => {
  const { googleId, email, username } = req.body;

  try {
    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({ googleId, email, username });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json(
      send_formatted_response(
        {
          user: { id: user._id, username: user.username, email: user.email },
          token,
        },
        true,
        "Google authentication successful"
      )
    );
  } catch (error) {
    res
      .status(500)
      .json(
        send_formatted_response(
          error,
          false,
          "Error with Google authentication"
        )
      );
  }
};

// Verify token
exports.verifyToken = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res
      .status(200)
      .json(
        send_formatted_response(
          { valid: true, decoded },
          true,
          "Token is valid"
        )
      );
  } catch (error) {
    res
      .status(401)
      .json(send_formatted_response(error, false, "Invalid token"));
  }
};

// Reset forgotten password
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json(send_formatted_response({}, false, "User not found"));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json(send_formatted_response({}, true, "Password reset successfully"));
  } catch (error) {
    res
      .status(500)
      .json(send_formatted_response(error, false, "Error resetting password"));
  }
};

// Reset password using token
exports.resetPasswordWithToken = async (req, res) => {
  const { token, oldPassword, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json(send_formatted_response({}, false, "User not found"));
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json(send_formatted_response({}, false, "Invalid old password"));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json(send_formatted_response({}, true, "Password reset successfully"));
  } catch (error) {
    res
      .status(500)
      .json(send_formatted_response(error, false, "Error resetting password"));
  }
};
