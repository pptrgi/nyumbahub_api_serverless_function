const User = require("../../models/UserModel");

const blockUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) return res.sendStatus(400);

  try {
    const user = await User.findById({ _id: userId });
    if (!user) return res.sendStatus(404);

    const blockedUser = await User.findByIdAndUpdate(
      user._id,
      { isBlocked: true },
      { new: true }
    );
    res.status(200).json(blockedUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const unblockUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) return res.sendStatus(400);

  try {
    const user = await User.findById({ _id: userId });
    if (!user) return res.sendStatus(404);

    const unblockedUser = await User.findByIdAndUpdate(
      user._id,
      { isBlocked: false },
      { new: true }
    );
    res.status(200).json(unblockedUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = { blockUser, unblockUser };
