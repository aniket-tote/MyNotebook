const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

const addUser = async (name, email, password) => {
  let user = await User.findOne({ email: email });
  if (user) {
    throw new Error("User with this email already Exist");
  }
  //hashing
  const salt = await bcryptjs.genSalt(10);
  const secPass = await bcryptjs.hash(password, salt);

  newUser = await User.create({
    name: name,
    email: email,
    password: secPass,
  });
  return newUser;
}

const getUserById = async (id) => {
  const user = await User.findOne({ id: parseInt(id, 10) });
  if (!user) {
    throw new Error("User not found with id: " + id);
  }
  return user;
}

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("User not found with email: " + email);
  }
  return user;
}

const updateUserDetail = async (email, name) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("User not found with email: " + email);
  }
  if (email) {
    user.email = email;
  }
  if (name) {
    user.name = name;
  }
  await user.save();
  return true;
}

const updateUserPassword = async (id, password) => {
  const hash = await bcryptjs.hash(password, 10);
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $set: { password: hash } },
    { returnNewDocument: true }
  );
  return user;
}

module.exports = { addUser, getUserById, getUserByEmail, updateUserDetail, updateUserPassword }