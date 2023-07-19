const User = require("../../models/UserModel");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    // fetch all the users in the db
    const allUsers = await User.find();

    // respond with the found users
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// GET ONE USER
const getOneUser = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.sendStatus(401);

  try {
    // find the user with passed id
    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);

    // respond with the found user
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  // from the logged in user, get their email
  const userEmail = req.userEmail;
  if (!userEmail) return res.sendStatus(401);

  try {
    // find the user with this email
    const currentUser = await User.findOne({ email: userEmail });
    if (!currentUser) return res.sendStatus(403);

    const updateUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
      },
      { new: true }
    );

    res.status(201).json(updateUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  const { userEmail } = req; // after login
  if (!userEmail) return res.sendStatus(403);

  try {
    const foundUser = await User.findOne({ email: userEmail });
    if (!foundUser) return res.sendStatus(204); // 204

    // delete user
    await User.findByIdAndDelete(foundUser._id);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = { getAllUsers, getOneUser, updateUser, deleteUser };
