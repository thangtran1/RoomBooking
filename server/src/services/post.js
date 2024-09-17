import { Op, or, where } from "sequelize";
import db from "../models";
import { v4 as generateId } from "uuid";
import generateCode from "../ultis/generateCode";
import moment from "moment";
import generateDate from "../ultis/generateDate";
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
  limit,
  priceNumber,
  areaNumber,
  { limitPost, order, ...query }
) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;

      const queries = { ...query };
      queries.limit = +limitPost || +limit || +process.env.LIMIT;
      queries.offset = queries.limit * (page - 1);

      if (priceNumber && priceNumber.length === 2)
        query.priceNumber = { [Op.between]: priceNumber };
      if (areaNumber && areaNumber.length === 2)
        query.areaNumber = { [Op.between]: areaNumber };

      if (order) queries.order = [order];

      const response = await db.Post.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
        offset: offset * limit,
        ...queries,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
          { model: db.Overview, as: "overview" },
          {
            model: db.Label,
            as: "labelData",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
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

  const priceMin = query.priceMin;
  const priceMax = query.priceMax;

  const areaMin = query.areaMin;
  const areaMax = query.areaMax;

  const wherePrice = {};
  const whereArea = {};
  const whereCategory = {};
  const whereProvince = {};

  if (priceMin) wherePrice[Op.gte] = priceMin;
  if (priceMax) wherePrice[Op.lte] = priceMax;

  if (areaMin) whereArea[Op.gte] = areaMin;
  if (areaMax) whereArea[Op.lte] = areaMax;

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
      order: [["createdAt", "DESC"]],
      where: {
        priceNumber: { [Op.and]: wherePrice },
        areaNumber: { [Op.and]: whereArea },
      },
      include: [
        { model: db.Image, as: "images", attributes: ["image"] },
        { model: db.Category, as: "category", where: whereCategory },
        { model: db.Province, as: "province", where: whereProvince },
        { model: db.Price, as: "price" },
        { model: db.Area, as: "area" },
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
        "areaNumber",
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

export const createNewPostsService = (body, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const attributesId = generateId();
      const imagesId = generateId();
      const overviewId = generateId();
      const labelCode = generateCode(body.label);
      const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
      const currentDate = generateDate();
      await db.Post.create({
        id: generateId(),
        title: body.title,
        labelCode,
        address: body.address || null,
        attributesId,
        categoryCode: body.categoryCode,
        description: JSON.stringify(body.description) || null,
        userId,
        overviewId,
        imagesId,
        areaCode: body.areaCode || null,
        priceCode: body.priceCode || null,
        provinceCode: body?.province?.includes("Thành phố")
          ? generateCode(body?.province?.replace("Thành phố ", ""))
          : generateCode(body?.province?.replace("Tỉnh ", "")) || null,
        priceNumber: body.priceNumber,
        areaNumber: body.areaNumber,
      });

      await db.Attribute.create({
        id: attributesId,
        price:
          +body.priceNumber < 1
            ? `${+body.priceNumber * 1000000} đồng/tháng`
            : `${body.priceNumber} triệu/tháng`,
        acreage: `${body.areaNumber} m2`,
        published: moment(new Date()).format("DD/MM/YYYY"),
        hashtag,
      });
      await db.Image.create({
        id: imagesId,
        image: JSON.stringify(body.images),
      });
      await db.Overview.create({
        id: overviewId,
        code: hashtag,
        area: body.label,
        type: body?.category,
        target: body?.target,
        bonus: "Tin thường",
        created: currentDate.today,
        expired: currentDate.expireDay,
      });
      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body?.province?.replace("Thành phố ", "") },
            { value: body?.province?.replace("Tỉnh ", "") },
          ],
        },
        defaults: {
          code: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố ", ""))
            : generateCode(body?.province?.replace("Tỉnh ", "")),
          value: body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố ", "")
            : body?.province?.replace("Tỉnh ", ""),
        },
      });

      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        defaults: {
          code: labelCode,
          value: body.label,
        },
      });

      resolve({
        err: 0,
        msg: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });

export const getPostsLimitAdminService = (
  page,
  query,
  id // lấy all bài đăng in admin
) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = { ...query, userId: id };
      const response = await db.Post.findAndCountAll({
        where: queries,
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,
        // offset: limit * (page - 1),
        // limit: limit,
        order: [["createdAt", "DESC"]],
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },

          { model: db.Overview, as: "overview" },
        ],
        // attributes: ["id", "title", "star", "address", "description"],
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

export const updatePost = (
  { postId, overviewId, imagesId, attributesId, ...body } // cập nhật  bài đăng in admin
) =>
  new Promise(async (resolve, reject) => {
    try {
      const labelCode = generateCode(body.label);
      await db.Post.update(
        {
          title: body.title,
          labelCode,
          address: body.address || null,
          attributesId,
          categoryCode: body.categoryCode,
          description: JSON.stringify(body.description) || null,
          areaCode: body.areaCode || null,
          priceCode: body.priceCode || null,
          provinceCode: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố ", ""))
            : generateCode(body?.province?.replace("Tỉnh ", "")) || null,
          priceNumber: body.priceNumber,
          areaNumber: body.areaNumber,
        },
        {
          where: { id: postId },
        }
      );

      await db.Attribute.update(
        {
          price:
            +body.priceNumber < 1
              ? `${+body.priceNumber * 1000000} đồng/tháng`
              : `${body.priceNumber} triệu/tháng`,
          acreage: `${body.areaNumber} m2`,
        },
        {
          where: { id: attributesId },
        }
      );
      await db.Image.update(
        {
          image: JSON.stringify(body.images),
        },
        {
          where: { id: imagesId },
        }
      );
      await db.Overview.update(
        {
          area: body.label,
          type: body?.category,
          target: body?.target,
        },
        {
          where: { id: overviewId },
        }
      );
      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body?.province?.replace("Thành phố ", "") },
            { value: body?.province?.replace("Tỉnh ", "") },
          ],
        },
        defaults: {
          code: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố ", ""))
            : generateCode(body?.province?.replace("Tỉnh ", "")),
          value: body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố ", "")
            : body?.province?.replace("Tỉnh ", ""),
        },
      });

      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        defaults: {
          code: labelCode,
          value: body.label,
        },
      });

      resolve({
        err: 0,
        msg: "Updated",
      });
    } catch (e) {
      reject(e);
    }
  });

export const deletePost = (
  postId // xóa bài đăng in admin
) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.destroy({
        where: { id: postId },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        msg: response ? "Delete" : "No post delete.",
      });
    } catch (e) {
      reject(e);
    }
  });
