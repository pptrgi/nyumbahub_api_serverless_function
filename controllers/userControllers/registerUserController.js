const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  // check for availability of the required fields in the request body
  if (
    !req?.body?.firstName ||
    !req?.body?.lastName ||
    !req?.body?.email ||
    !req?.body?.phone ||
    !req?.body?.password
  )
    return res
      .status(400)
      .json({ message: "name, email, phone and password are required" });

  const email = req.body.email;

  try {
    // check if this user already exists in the database
    const alreadyExistingUser = await User.findOne({ email });
    if (alreadyExistingUser)
      return res
        .status(409)
        .json({ conflict: `Email or phone already exists` });

    // encrypt the user's password
    if (req.body.password) {
      req.body.password = await bcrypt.hashSync(req.body.password, 10);
    }

    // create a new user with the provided details
    const newUser = await User.create(req.body);

    res
      .status(201)
      .json({ success: `User ${newUser.firstName} created successfully` });
  } catch (error) {
    console.log(error);
    // if the user provided valid details but can't be registered, there's a server error
    res.sendStatus(500);
  }
};

module.exports = registerUser;
