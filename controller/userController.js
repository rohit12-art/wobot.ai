const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  const { firstname, lastname, username, password } = req.body;

  if (!firstname || !lastname || !username || !password) {
    return res.status(422).send("Please fill the form properly.");
  }
  try {
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(422).send("User already exist");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      firstname,
      lastname,
      username,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).send("User registration succesfully ");
  } catch (error) {
    return res.status(200).send("Unexpected Error .Please try again later");
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json("Please fill the form correctly.");
  }
  try {
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.status(400).json("No user found.");
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      res.status(400).json("Invalid credentials");
    }
    let token = await jwt.sign(
      { username: existingUser.username, id: existingUser.id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(200).send({ message: "User Login sucessful", token });
  } catch (error) {
    res.status(400).json("Bad Request. Try again later");
  }
};

const fetchUserList = async (req, res) => {
  try {
    const data = await User.find({}, { username: 1 });
    return res.json(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const fetchUserDetails = async (req, res) => {
  try {
    const data = await User.find(
      {},
      { username: 1, firstname: 1, lastname: 1 }
    );
    return res.json(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  userRegister,
  userLogin,
  fetchUserList,
  fetchUserDetails,
};
