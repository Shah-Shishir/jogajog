const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post");

router.get("/", (req, res, next) => {
  const limit = 10;
  const { page } = req.query;
  let total = 0;
  Post.countDocuments().then((count) => (total = count));
  Post.find()
    .select("_id description postedAt likes dislikes shares")
    .limit(limit)
    .skip((page - 1) * limit)
    .exec()
    .then((result) => {
      res.status(200).json({
        totalPages: Math.ceil(total / limit),
        currentPage: +page,
        totalPosts: total,
        postCount: result.length,
        posts: result,
      });
    })
    .catch((error) => res.status(500).json({ error }));
});

router.post("/", (req, res, next) => {
  const createdPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description,
  });
  createdPost
    .save()
    .then((result) =>
      res.status(201).json({
        message: "New post created successfully!",
        createdPost: result,
      })
    )
    .catch((error) => res.status(500).json({ error }));
});

router.get("/:postId", (req, res, next) => {
  const id = req.params.postId;
  Post.findById(id)
    .exec()
    .then((result) => {
      res.status(200).json({ post: result });
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        res.status(404).json({ message: `No valid post found with id ${id}` });
      } else {
        res.status(500).json({ error });
      }
    });
});

router.patch("/:postId", (req, res, next) => {
  const id = req.params.postId;
  Post.findByIdAndUpdate(id, {
    description: req.body.description,
  })
    .exec()
    .then((result) =>
      res.status(200).json({ message: "Post updated successfully!" })
    )
    .catch((error) => {
      if (error.kind === "ObjectId") {
        res.status(404).json({ message: `No valid post found with id ${id}` });
      } else {
        res.status(500).json({ error });
      }
    });
});

router.delete("/:postId", (req, res, next) => {
  const id = req.params.postId;
  Post.remove({ _id: id })
    .exec()
    .then((result) =>
      res.status(200).json({ message: "Post has been deleted !" })
    )
    .catch((error) => {
      if (error.kind === "ObjectId") {
        res.status(404).json({ message: `No valid post found with id ${id}` });
      } else {
        res.status(500).json({ error });
      }
    });
});

module.exports = router;
