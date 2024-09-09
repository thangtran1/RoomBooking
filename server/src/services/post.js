import { Op } from "sequelize";
import db from "../models";
export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true, // vd image.image => gộp thành 1 objec image: [...]
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Get posts failed.",
        response,
      });
    } catch (e) {
      reject(e);
    }
  });

export const getPostsLimitService = (
  page,
  query,

  limit,
  priceNumber,

  areaNumber
) =>
  new Promise(async (resolve, reject) => {
    console.log("priceNumner: ", priceNumber);
    console.log("areaNumber: ", areaNumber);
    try {
      const queries = { ...query };

      // if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber };
      // if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber };

      if (priceNumber && priceNumber.length === 2)
        queries.priceNumber = { [Op.between]: priceNumber };
      if (areaNumber && areaNumber.length === 2)
        queries.areaNumber = { [Op.between]: areaNumber };
      const response = await db.Post.findAndCountAll({
        where: queries,
        raw: true,
        nest: true,
        offset: limit * (page - 1),
        limit: limit,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Get posts failed.",
        response,
      });
    } catch (e) {
      reject(e);
    }
  });

export const getNewPostService = async () => {
  try {
    const response = await db.Post.findAll({
      raw: true,
      nest: true,
      offset: 0,
      order: [["createdAt", "DESC"]],
      limit: +process.env.LIMIT,
      include: [
        { model: db.Image, as: "images", attributes: ["image"] },
        {
          model: db.Attribute,
          as: "attributes",
          attributes: ["price", "acreage", "published", "hashtag"],
        },
      ],
      attributes: ["id", "title", "star", "createdAt"],
    });

    return {
      err: response ? 0 : 1,
      msg: response ? "OK" : "Get posts failed.",
      response,
    };
  } catch (e) {
    throw e;
  }
};

export const getAllPosts = async (query) => {
  const limit = query.limit ? +query.limit : 10;
  const page = +query.page > 0 ? +query.page : 1;
  const priceCode = query.priceCode;
  const areaCode = query.areaCode;
  const categoryCode = query.categoryCode;
  const provinceCode = query.provinceCode;

  // const priceMin = query.priceMin;
  // const priceMax = query.priceMax;

  const wherePrice = {};
  const whereArea = {};
  const whereCategory = {};
  const whereProvince = {};

  // if (priceMin) wherePrice[Op.gte] = priceMin;
  // if (priceMax) wherePrice[Op.lte] = priceMax;

  if (areaCode) {
    whereArea.code = areaCode;
  }
  if (priceCode) {
    wherePrice.code = priceCode;
  }
  if (categoryCode) {
    whereCategory.code = categoryCode;
  }
  if (provinceCode) {
    whereProvince.code = provinceCode;
  }

  try {
    const response = await db.Post.findAndCountAll({
      raw: true,
      nest: true, // vd image.image => gộp thành 1 objec image: [...]
      offset: limit * (page - 1),
      limit: limit,
      // where: {
      //   priceNumber: { [Op.and]: wherePrice },
      // },
      include: [
        { model: db.Image, as: "images", attributes: ["image"] },
        { model: db.Category, as: "category", where: whereCategory },
        { model: db.Province, as: "province", where: whereProvince },
        { model: db.Price, as: "price", where: wherePrice },
        { model: db.Area, as: "area", where: whereArea },
        {
          model: db.Attribute,
          as: "attributes",
          attributes: ["price", "acreage", "published", "hashtag"],
        },
        { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
      ],
      attributes: [
        "id",
        "title",
        "star",
        "address",
        "description",
        "priceNumber",
      ],
    });

    return {
      err: response ? 0 : 1,
      msg: response ? "OK" : "Get posts failed.",
      response,
    };
  } catch (e) {
    console.log("🚀 ~ getAllPosts ~ e:", e);
    throw e;
  }
};
