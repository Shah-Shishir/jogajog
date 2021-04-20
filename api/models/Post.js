const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Post", PostSchema);
