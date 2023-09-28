import Users from "../models/userSchema.js";

// Get user's information
export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Users.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.massage });
  }
};

// Get user's friend list
export const getUserFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Users.findById(userId);

    const friends = await Promise.all(
      user.friends.map((id) => Users.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.massage });
  }
};

// Add/Remove a friend
export const addRemoveFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await Users.findById(userId);
    const friend = await Users.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== userId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(userId);
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => Users.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.massage });
  }
};
