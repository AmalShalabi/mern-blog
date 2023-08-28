const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/postControllers");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });


router.get("/post",  postControllers.getAllPosts);
router.get("/post/:id",  postControllers.getPost);
router.post(
  "/post",
  uploadMiddleware.single("file"),
  postControllers.createPost
);
router.put("/post", uploadMiddleware.single("file"), postControllers.updatePost);

module.exports = router;
