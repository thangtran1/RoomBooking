import * as postService from "../services/post";

import { getPostsLimitService } from "../services/post";
export const getPosts = async (req, res) => {
  try {
    const response = await postService.getPostsService();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller.",
      e,
    });
  }
};

export const getPostsLimit = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    priceNumber,
    areaNumber,
    limitPost,
    order,
    ...query
  } = req.query;

  try {
    const response = await getPostsLimitService(
      page,
      limit,
      priceNumber,
      areaNumber,
      { limitPost, order, ...query }
    );

    return res.status(200).json(response);
  } catch (e) {
    console.error("Error details:", e);

    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller.",
      error: e.message,
    });
  }
};

export const getNewPosts = async (req, res) => {
  try {
    const response = await postService.getNewPostService();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller.",
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const response = await postService.getAllPosts(req.query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller.",
      e,
    });
  }
};

export const createNewPost = async (req, res) => {
  try {
    const { categoryCode, title, priceNumber, areaNumber, label } = req.body;
    const { id } = req.user;
    if (!categoryCode || !title || !id || !priceNumber || !areaNumber || !label)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.createNewPostsService(req.body, id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller.",
      error: e.message || e,
      stack: e.stack,
    });
  }
};

export const getPostsLimitAdmin = async (req, res) => {
  const { page, ...query } = req.query;
  const { id } = req.user;
  try {
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.getPostsLimitAdminService(
      page,
      query,
      id
    );

    return res.status(200).json(response);
  } catch (e) {
    console.error("Error details:", e);

    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller.",
      error: e.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { postId, overviewId, imagesId, attributesId, ...payload } = req.body;
  const { id } = req.user;
  try {
    if (!postId || !id || !overviewId || !imagesId || !attributesId)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.updatePost(req.body);

    return res.status(200).json(response);
  } catch (e) {
    console.error("Error details:", e);

    return res.status(500).json({
      err: -1,
      msg: "Failed update post controller.",
      error: e.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.query;
  const { id } = req.user;
  try {
    if (!postId || !id)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.deletePost(postId);

    return res.status(200).json(response);
  } catch (e) {
    console.error("Error details:", e);

    return res.status(500).json({
      err: -1,
      msg: "Failed delete post controller.",
      error: e.message,
    });
  }
};
