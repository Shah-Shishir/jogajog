const express = require("express");
const router = express.Router();

const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

router.get("/", getPosts);

router.post("/", createPost);

router.get("/:postId", getPost);

router.patch("/:postId", updatePost);

router.delete("/:postId", deletePost);

module.exports = router;
