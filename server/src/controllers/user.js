import * as service from "../services/user";
import db from "../models";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
export const getCurrent = async (req, res) => {
  const user = req.user;
  const userId = user?.id;

  if (!userId) {
    return res.status(400).json({
      err: 1,
      msg: "User ID not found in token",
    });
  }

  try {
    const response = await service.getOne(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at user controller: " + e,
      e,
    });
  }
};

//update user
export const updateUserUD = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, zalo, fbUrl, avatar } = req.body;

    if (!id || (!name && !zalo && !fbUrl && !avatar)) {
      return res.status(400).json({ msg: "Missing required fields1!" });
    }

    const user = await db.User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const updatedData = {
      name: name || user.name,
      zalo: zalo || user.zalo,
      fbUrl: fbUrl || user.fbUrl,
      avatar: avatar || user.avatar,
    };

    await user.update({ ...user, ...updatedData });

    return res
      .status(200)
      .json({ msg: "User updated successfully!", data: user });
  } catch (e) {
    console.error("Sequelize error:", e.errors);
    return res.status(500).json({ msg: `Failed to update user: ${e.message}` });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, phone, password, zalo, fbUrl } = req.body;
    if (!name || !phone || !password || !zalo) {
      return res.status(400).json({ msg: "Missing required fields2!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({
      name,
      phone,
      password: hashedPassword,
      zalo,
      fbUrl,
    });

    return res
      .status(201)
      .json({ msg: "User created successfully!", data: newUser });
  } catch (e) {
    console.error("Sequelize error:", e.errors);
    return res.status(500).json({ msg: `Failed to create user: ${e.message}` });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, password, zalo, fbUrl } = req.body;

    if (!name || !phone || !zalo) {
      return res.status(400).json({ msg: "Missing required fields3!" });
    }

    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const updateFields = {
      name,
      phone,
      zalo,
      fbUrl,
    };

    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    await db.User.update(updateFields, {
      where: { id },
    });

    const updatedUser = await db.User.findByPk(id);

    return res
      .status(200)
      .json({ msg: "User updated successfully!", data: updatedUser });
  } catch (e) {
    console.error("Sequelize error:", e.errors);
    return res.status(500).json({ msg: `Failed to update user: ${e.message}` });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        err: 1,
        msg: "Missing required ID",
      });
    }
    const response = await service.deleteUserService(id);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in deleteUser:", e);
    return res.status(500).json({
      err: -1,
      msg: `Failed at user controller: ${e.message}`,
    });
  }
};

export const updatePhone = async (req, res) => {
  const user = req.user;
  const userId = user?.id;

  const validatePhone = (phone) => {
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
    return phoneRegex.test(phone);
  };

  if (!userId) {
    return res.status(400).json({
      err: 1,
      msg: "User ID not found in token",
    });
  }

  const { phone } = req.body;
  if (!validatePhone(phone)) {
    return res.status(400).json({
      err: 1,
      msg: "Số điện thoại không hợp lệ!",
    });
  }

  try {
    const existingUser = await db.User.findOne({
      where: { phone, id: { [Op.ne]: userId } },
    });

    if (existingUser) {
      return res.status(400).json({
        err: 1,
        msg: "Số điện thoại đã được sử dụng bởi người dùng khác!",
      });
    }

    const response = await service.updateUser(userId, { phone });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at user controller: " + e,
      e,
    });
  }
};

export const updatePassword = async (req, res) => {
  const user = req.user;
  const userId = user?.id;

  if (!userId) {
    return res.status(400).json({
      err: 1,
      msg: "User ID not found in token",
    });
  }

  const { oldPassword, newPassword } = req.body;

  try {
    const userFromDb = await db.User.findOne({ where: { id: userId } });

    if (!userFromDb) {
      return res.status(404).json({
        err: 1,
        msg: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userFromDb.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({
        err: 1,
        msg: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const response = await service.updateUser(userId, {
      password: hashedPassword,
    });

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at user controller: " + e,
      e,
    });
  }
};

export const updateEmail = async (req, res) => {
  const user = req.user;
  const userId = user?.id;

  if (!userId) {
    return res.status(400).json({
      err: 1,
      msg: "User ID not found in token",
    });
  }

  const { email } = req.body;
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({
      err: 1,
      msg: "Invalid email format",
    });
  }
  try {
    const response = await service.updateUser(userId, { email });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at user controller: " + e,
      e,
    });
  }
};
