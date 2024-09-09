import express from "express";
import * as postController from "../controllers/post";

const router = express.Router();

router.get("/", postController.getAllPosts);

router.get("/all", postController.getPosts);

// phân trang
router.get("/aaa", postController.getPostsLimit);

router.get("/new-post", postController.getNewPosts);

export default router;
