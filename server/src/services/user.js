import { where } from "sequelize";
import db from "../models";

export const getOne = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ["password", "avatar"],
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get user.",
        response,
      });
    } catch (e) {
      console.error("Error fetching user:", e);
      reject(e);
    }
  });

// update user

export const updateUserService = async (id, data) => {
  try {
    const user = await db.User.findOne({ where: { id } });
    if (!user) {
      return {
        err: -1,
        msg: "User not found.",
      };
    }
    await user.update(data);
    return {
      err: response ? 0 : 1,
      msg: "User updated successfully.",
      response: user,
    };
  } catch (e) {
    return {
      err: -1,
      msg: `Failed at user service: ${e.message}`,
    };
  }
};

export const createUserService = async (data) => {
  try {
    const response = await db.User.create(data);
    return {
      err: 0,
      msg: "User created successfully.",
      response,
    };
  } catch (e) {
    return {
      err: -1,
      msg: `Failed at user service: ${e.message}`,
    };
  }
};

export const updateCategoryService = (id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.update(data, { where: { id } });
      resolve({
        err: 0,
        msg: "User updated successfully.",
        response,
      });
    } catch (e) {
      reject({
        err: -1,
        msg: `Failed at user service: ${e.message}`,
      });
    }
  });

export const deleteUserService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.destroy({ where: { id } });
      resolve({
        err: 0,
        msg: "User deleted successfully.",
        response,
      });
    } catch (e) {
      console.error("Error in deleteUserService:", e); // Log chi tiết lỗi
      reject({
        err: -1,
        msg: `Failed at user service: ${e.message}`,
      });
    }
  });
