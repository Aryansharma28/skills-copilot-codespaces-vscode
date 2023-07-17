// Import required modules
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Import models
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

// Import authentication middleware
const { ensureAuthenticated } = require('../config/auth');

// Create an Express web server
const app = express();

// Body parser middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes and route handlers
app.get('/api/posts', async (req, res) => {
  try {
    // Fetch posts from the database
    const posts = await Post.find();

    // Send the response with the posts in JSON format
    res.json(posts);
  } catch (error) {
    // Handle errors if any occur during database operations or processing
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post(
  '/api/posts',
  ensureAuthenticated, // Authentication middleware to protect this route
  [check('title').notEmpty(), check('content').notEmpty()],
  async (req, res) => {
    // Validate incoming data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new post based on the incoming data
      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user._id, // Assuming user is authenticated and `req.user` contains user information
      });

      // Save the new post to the database
      await newPost.save();

      // Send a success response
      res.json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      // Handle errors if any occur during database operations or processing
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
