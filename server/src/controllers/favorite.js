import * as service from "../services/favorite";
import db from "../models";
import {
  getFavoriteService,
  getMostLikedPostService,
} from "../services/favorite";
export const LikePost = async (req, res) => {
  const postId = req.body.postId;
  const userId = req.user.id;

  try {
    const response = await service.LikePostServer(userId, postId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      e,
    });
  }
};

export const UnlikePost = async (req, res) => {
  const postId = req.body.postId;
  const userId = req.user.id;

  try {
    const response = await service.UnlikePostServer(userId, postId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      e,
    });
  }
};

export const getALlLikePost = async (req, res) => {
  const userId = req.user.id;

  try {
    const response = await getFavoriteService(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: `Failed to get liked posts: ${e.message}`,
    });
  }
};

// lấy bài đăng đc user like nhiều nh
export const getMostLikedPost = async (req, res) => {
  const userId = req.user.id;

  try {
    const response = await getMostLikedPostService(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: `Failed to get most liked post: ${e.message}`,
    });
  }
};
