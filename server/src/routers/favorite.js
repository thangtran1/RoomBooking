import express from "express";
import * as favoriteController from "../controllers/favorite";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();
router.use(verifyToken);
router.get("/get-all", favoriteController.getALlLikePost);
router.post("/likePost", favoriteController.LikePost);
router.post("/unlikePost", favoriteController.UnlikePost);
router.get("/getLikeMany", favoriteController.getMostLikedPost);
export default router;
