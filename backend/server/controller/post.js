const Post = require("../models/post");
const ObjectId = require("mongoose").Types.ObjectId;

const getPost = async (req, res) => {
  try {
    const post = await Post.find({});
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: { msg: "Post not found!" } });
  }
};

const getPostById = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const post = await Post.findOne({ _id: req.params.id });
      res.status(200).json(post);
    } else {
      res.status(500).json({ error: { msg: "Post not found!" } });
    }
  } catch {
    res.status(500).json({ error: { msg: "Post not found!" } });
  }
};

const createPost = async (req, res) => {
  if (
    (req.files &&
      req.files.length > 0 &&
      req.body.title &&
      req.body.discription &&
      req.body.category,
    req.body.author)
  ) {
    let postCreate;
    if (req.files && req.files.length > 0) {
      postCreate = await new Post({
        author: req.body.author,
        title: req.body.title,
        discription: req.body.discription,
        postAvatar: req.files[0].filename,
        category: req.body.category,
      });
    }
    try {
      await postCreate.save();
      res.status(200).json({
        msg: "Post create successfll",
        filename: { avatar: req.files[0].filename },
      });
    } catch (err) {
      res.status(500).json({ error: { msg: "Post create faild!" } });
    }
  } else {
    res.status(500).json({ error: { msg: "Every filed is required!" } });
  }
};

module.exports = { getPost, createPost, getPostById };
