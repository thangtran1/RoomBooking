import * as postService from "../services/post";

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
  const { page, pricesNumber, areasNumber, ...query } = req.query;
  try {
    const response = await postService.getPostsLimitService(page, query, {
      pricesNumber,
      areasNumber,
    });
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
    });
  }
};
