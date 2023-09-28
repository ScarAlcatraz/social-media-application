import Users from "../models/userSchema.js";
import Posts from "../models/postSchema.js";

// Create a Post
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await Users.findById(userId);

    const newPost = new Posts({
      userId: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description: description,
      userPicturePath: user.picturePath,
      picturePath: picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const posts = await Posts.find();

    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.massage });
  }
};

// Get posts for the feed
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.massage });
  }
};

// Get posts of a user
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Posts.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.massage });
  }
};

// Like/Unlike a post
export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Posts.find({ postId });
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Posts.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.massage });
  }
};
