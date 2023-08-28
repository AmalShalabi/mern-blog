const Post = require("../models/postModel");
const fs = require("fs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllPosts = async (req, res) => {
  try {
    res.json(
      await Post.find()
        .populate("author", ["username"])
        .sort({ createdAt: -1 })
        .limit(20)
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const postDocument = await Post.findById(id).populate("author", [
      "username",
    ]);
    res.json(postDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createPost = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split("_");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_KEY, {}, async (err, info) => {
      if (err) throw err;
      const { title, summary, content } = req.body;
      const postDocument = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json(postDocument);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    let newPath = null;

    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split("_");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_KEY, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, summary, content } = req.body;
      const postDocument = await Post.findById(id);
      const isAuthor =
        JSON.stringify(postDocument.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json("You Are Not the author");
      }

      await postDocument.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDocument.cover,
      });
      res.json(postDocument);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllPosts, getPost, createPost, updatePost };
