const Post = require("../models/Post");
const send_formatted_response = require("../middleware/send_formatted_response");

// Create a new post
exports.createPost = async (req, res) => {
  const { caption } = req.body;
  const imageUrl = req.file ? req.file.cloudinaryUrl : null;
  const userId = req.user.id;

  try {
    const newPost = new Post({
      caption,
      imageUrl,
      user: userId,
    });

    await newPost.save();
    res
      .status(201)
      .json(
        send_formatted_response(newPost, true, "Post created successfully")
      );
  } catch (error) {
    res
      .status(500)
      .json(send_formatted_response(error, false, "Error creating post"));
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username");
    res
      .status(200)
      .json(send_formatted_response(posts, true, "Posts fetched successfully"));
  } catch (error) {
    res
      .status(500)
      .json(send_formatted_response(error, false, "Error fetching posts"));
  }
};
