const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  try {
    const {username, email, password } = req.body;
    console.log(email,password);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const hashPass= await bcrypt.hash(password,12);
    const user = await User.create({ email:email, password:hashPass, username:username, });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
  console.log(req.body);
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email", success: false });
    }

    // const auth = await bcrypt.compare(password, user.password);
    if (password===user.password) {
      return res.json({ message: "Incorrect password or email", success: false });
    }

    const token = createSecretToken(user._id);

    // ✅ Send token in JSON so frontend can store it
    res.json({
  success: true,
  message: "Login successful",
  token,
  user: {
    _id: user._id,       // ✅ include this
    email: user.email,
    username: user.username
  }
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};



module.exports.Logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: false,
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({ message: "User logged out successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};
