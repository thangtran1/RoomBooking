import db from "../models";

export const getCategoriesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
      });
      resolve({
        err: 0,
        msg: response ? "OK" : "Failed to get Category.",
        response,
      });
    } catch (e) {
      reject({
        err: -1,
        msg: `Failed at category service: ${e.message}`,
      });
    }
  });

export const createCategoryService = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.create(data);
      resolve({
        err: 0,
        msg: "Category created successfully.",
        response,
      });
    } catch (e) {
      reject({
        err: -1,
        msg: `Failed at category service: ${e.message}`,
      });
    }
  });

export const updateCategoryService = (id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.update(data, { where: { id } });
      resolve({
        err: 0,
        msg: "Category updated successfully.",
        response,
      });
    } catch (e) {
      reject({
        err: -1,
        msg: `Failed at category service: ${e.message}`,
      });
    }
  });

export const deleteCategoryService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.destroy({ where: { id } });
      resolve({
        err: 0,
        msg: "Category deleted successfully.",
        response,
      });
    } catch (e) {
      reject({
        err: -1,
        msg: `Failed at category service: ${e.message}`,
      });
    }
  });
