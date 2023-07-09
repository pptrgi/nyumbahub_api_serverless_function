const User = require("../../models/UserModel");

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

module.exports = getAllUsers;
