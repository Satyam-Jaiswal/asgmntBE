const Post = require("../models/Post");

// Create a new post
exports.createPost = async (req, res) => {
  const { caption, imageUrl } = req.body;
  const userId = req.user.id;

  try {
    const newPost = new Post({
      caption,
      imageUrl,
      user: userId,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};
