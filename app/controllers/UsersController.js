const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_TOKEN_PRD || process.env.JWT_TOKEN;

class UsersController {
  async register(req, res) {
    console.log(req.body);
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    try {
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      if (error.keyPattern["email"] == 1) {
        res.status(500).json({ error: "Email has already been registered" });
      } else {
        res.status(500).json({ error: "Error registering new user" });
      }
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ error: "Incorrect email or password" });
      } else {
        user.isCorrectPassword(password, function (err, same) {
          if (!same) {
            res.status(401).json({ error: "Incorrect password" });
          } else {
            const token = jwt.sign({ email }, secret, { expiresIn: "3d" });
            res.json({ user: user, token: token });
          }
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal error, please try again" });
    }
  }
}

module.exports = new UsersController();
