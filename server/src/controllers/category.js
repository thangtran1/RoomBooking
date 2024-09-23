import * as service from "../services/category";
import db from "../models";
export const getCategories = async (req, res) => {
  try {
    const response = await service.getCategoriesService();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: `Failed at category controller: ${e.message}`,
    });
  }
};

// export const createCategory = (req, res) => {
//   res.send("create category");
// };

// create category

export const createCategory = async (req, res) => {
  try {
    const { code, value, header, subheader } = req.body;

    if (!code || !value || !header) {
      return res.status(400).json({ msg: "Missing required fields!" });
    }

    // Nếu dữ liệu hợp lệ, tiếp tục tạo danh mục
    const newCategory = await db.Category.create({
      code,
      value,
      header,
      subheader,
    });

    return res
      .status(201)
      .json({ msg: "Category created successfully!", data: newCategory });
  } catch (e) {
    return res
      .status(500)
      .json({ msg: `Failed to create category: ${e.message}` });
  }
};
// update category

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, value, description } = req.body;
    if (!id || !code || !value) {
      return res.status(400).json({
        err: 1,
        msg: "Missing required fields",
      });
    }
    const response = await service.updateCategoryService(id, req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: `Failed at category controller: ${e.message}`,
    });
  }
};

//delete category

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        err: 1,
        msg: "Missing required ID",
      });
    }
    const response = await service.deleteCategoryService(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: `Failed at category controller: ${e.message}`,
    });
  }
};
