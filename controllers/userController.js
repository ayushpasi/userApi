const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const postUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Some data is missing" });
  }

  try {
    const existingUser = await UserModel.findOne({ where: { email: email } });

    if (existingUser) {
      return res.status(409).json({
        error: "This email is already taken. Please choose another one.",
      });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      console.log(err);
      // Only create a new user if all required data is present and the email doesn't exist
      const newUser = await UserModel.create({
        name,
        email,
        password: hash,
      });

      res.status(200).json({ message: "Registered successfully!" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  postUserSignUp,
};
