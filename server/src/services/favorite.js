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
        // Tăng likeCount trong bảng Post
        await db.Post.increment("likeCount", { by: 1, where: { id: postId } });
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
        // Giảm likeCount trong bảng Post
        await db.Post.decrement("likeCount", { by: 1, where: { id: postId } });
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
        where: { userId: userId },

        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone"],
          },
          {
            model: db.Post,
            as: "post",
            include: [
              {
                model: db.Image,
                as: "images",
                attributes: ["image"],
              },
              {
                model: db.Attribute,
                as: "attributes",
                attributes: ["price", "acreage", "published", "hashtag"],
              },
              { model: db.Price, as: "price" },
              { model: db.Area, as: "area" },
            ],
          },
        ],

        raw: true,
        nest: true,
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

// lấy bài đăng đc user like nhiều nh

export const getMostLikedPostService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Favorite.findAll({
        attributes: [
          "postId",
          [db.sequelize.fn("COUNT", db.sequelize.col("postId")), "likeCount"],
        ],
        include: [
          {
            model: db.Post,
            as: "post",
            include: [
              {
                model: db.Image,
                as: "images",
                attributes: ["image"],
              },
              {
                model: db.Attribute,
                as: "attributes",
                attributes: ["price", "acreage", "published", "hashtag"],
              },
              { model: db.Price, as: "price" },
              { model: db.Area, as: "area" },
            ],
          },
        ],
        group: ["postId"],
        order: [[db.sequelize.literal("likeCount"), "DESC"]],

        raw: true,
        nest: true,
      });
      resolve({
        err: 0,
        msg: response ? "OK" : "Failed to get most liked post.",
        response,
      });
    } catch (e) {
      reject({
        err: -1,
        msg: `Failed at getting most liked post: ${e.message}`,
      });
    }
  });
