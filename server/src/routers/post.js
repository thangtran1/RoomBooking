import express from "express";
import * as postController from "../controllers/post";
import verifyToken from "../middlewares/verifyToken";
const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/all", postController.getPosts);
router.get("/limit", postController.getPostsLimit);
router.get("/new-post", postController.getNewPosts);
router.get("/all-user", postController.getAllUser);
router.get("/getUserPost", postController.getPostUser);

// CRUD manager admin
router.delete("/delete-post", postController.deletePostAdmin);
router.put("/update-post/:id", postController.updatePostAdmin);

router.put("/approve-post", postController.approvePost);

router.use(verifyToken);

router.post(`/create-new`, postController.createNewPost);
router.get(`/limit-admin`, postController.getPostsLimitAdmin);

router.put(`/update`, postController.updatePost);

router.delete(`/delete`, postController.deletePost);

export default router;
