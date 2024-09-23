import db from "../models";

export const LikePostServer = (userId, postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!postId) {
        return reject({
          err: -1,
          msg: "Missing postId",
        });
      }
      const post = await db.Post.findOne({ where: { id: postId } });
      if (!post) {
        return reject({
          err: -1,
          msg: "Post not found",
        });
      }
      const isExist = await db.Favorite.findOne({
        where: { postId, userId },
      });
      if (!isExist) {
        await db.Favorite.create({ postId, userId });
      }

      resolve({
        err: 0,
        msg: "Post like succeed!",
      });
    } catch (e) {
      console.log(e);
      reject({
        err: "-1",
        msg: "failed to like post",
      });
    }
  });
};

export const UnlikePostServer = (userId, postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!postId) {
        return reject({
          err: -1,
          msg: "Missing postId",
        });
      }
      const post = await db.Post.findOne({ where: { id: postId } });
      if (!post) {
        return reject({
          err: -1,
          msg: "Post not found",
        });
      }
      const isExist = await db.Favorite.findOne({
        where: { postId, userId },
      });
      if (isExist) {
        await db.Favorite.destroy({
          where: { postId, userId },
        });
      } else {
        return reject({
          err: -1,
          msg: "Post not liked by user",
        });
      }

      resolve({
        err: 0,
        msg: "Post unlike succeed!",
      });
    } catch (e) {
      console.log(e);
      reject({
        err: "-1",
        msg: "failed to unlike post",
      });
    }
  });
};
export const getFavoriteService = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Favorite.findAll({
        include: [
          {
            model: db.User, // Gọi model User
            as: "user",
          },
        ],
        raw: true,
      });
      resolve({
        err: 0,
        msg: response ? "OK" : "Failed to get Favorite.",
        response,
      });
    } catch (e) {
      reject({
        err: -1,
        msg: `Failed at Favorite service: ${e.message}`,
      });
    }
  });
