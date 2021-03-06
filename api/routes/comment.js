const express = require("express");
const router = express.Router();
const Comments = require("../DBOperations/comments");
const Posts = require("../DBOperations/posts");
const Users = require("../DBOperations/users");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
const Ajv = require("ajv");

const ajv = new Ajv({ coerceTypes: true });
const schema = {
  type: "object",
  properties: {
    content: { type: "string" },
    post_id: { type: "string" },
    author_id: { type: "string" },
  },
  required: ["content", "post_id", "author_id"],
};

// get all comments
router.route("/").get(async (req, res) => {
  try {
    const comments = await Comments.getComments(Comment);
    res.status(200).send(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// add a new comment
router.route("/").post(async (req, res) => {
  const valid = ajv.validate(schema, req.body);
  if (!valid) {
    res.status(400).json({ error: ajv.errors });
    return;
  }
  try {
    const result = await Comments.addComment(Comment, req.body);
    const user = await Users.getUserById(User, result.author_id);
    const userCommentIds = user.comment_ids.push(result._id);
    await Users.updateUserById(result.author_id, {
      comment_ids: userCommentIds,
    });
    const post = await Posts.getPostById(Post, result.post_id);
    const postCommentIds = post.comment_ids.push(result._id);
    await Posts.updatePostById(result.post_id, { comment_ids: postCommentIds });
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get a comment by id
router.route("/:id").get(async (req, res) => {
  try {
    const comment = await Comments.getCommentById(Comment, req.body._id);
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update a comment by id
router.route("/:id").put(async (req, res) => {
  try {
    const obj = req.body;
    const { _id, ...rest } = obj;
    const comment = await Comments.updateCommentById(
      Comment,
      req.body._id,
      rest
    );
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a comment by comment id
router.route("/:commentId").delete(async (req, res) => {
  try {
    const comment = await Comments.getCommentById(
      Comment,
      req.params.commentId
    );
    const user = await Users.getUserById(User, comment.author_id);
    const userCommentIds = user.comment_ids.filter(
      (id) => id != req.params.commentId
    );
    await Users.updateUserById(comment.author_id, {
      comment_ids: userCommentIds,
    });
    const post = await Posts.getPostById(Post, comment.post_id);
    const postCommentIds = post.comment_ids.filter(
      (id) => id != req.params.commentId
    );
    await Posts.updatePostById(comment.post_id, {
      comment_ids: postCommentIds,
    });
    await Comments.deleteCommentById(Comment, req.params.commentId);
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
